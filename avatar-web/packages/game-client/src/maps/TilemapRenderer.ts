import { Graphics, Image } from '@avatar/j2me-compat';

export interface MapData {
  id: number;
  widthTiles: number;  // e in ir.java
  heightTiles: number; // f in ir.java
  tiles: Int16Array;   // d in ir.java
  collision: Int16Array; // g in ir.java
}

export class TilemapRenderer {
  public static readonly TILE_SIZE = 24; // i = 24 in ir.java
  public static readonly TILES_PER_ROW = 7; // 168 px / 24 px = 7 tiles

  public mapData?: MapData;
  public tilesetImage?: Image;
  public bgImage?: Image;
  public cloudImage?: Image;

  public isNight: boolean = false;
  public cameraX: number = 0;
  public cameraY: number = 0;

  // Authentic background mapping from ir.java line 98 (byte[] h)
  public static readonly BG_TYPE_BY_MAP: Record<number, number> = {
    0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1,
    9: 0,
    10: 0,
    11: 1,
    12: 3, 13: 3, 14: 3, 15: 3, 16: 3,
    17: 2,
    18: -1, 19: -1, 20: -1,
    21: 0, 22: 0, 23: 0,
    24: 2, 25: 2
  };

  /**
   * Authentic Map Height formula from ir.java lines 1050-1115
   * When mapId is by2 from server, client switches on (n2 - 1) which is exactly mapId!
   */
  public static getMapHeightTiles(mapId: number): number {
    switch (mapId) {
      case 107: return 16;
      case 25:
      case 21: return 7;
      case 9: return 8;
      case 20:
      case 57:
      case 58:
      case 59:
      case 62:
      case 63:
      case 64:
      case 100:
      case 101:
      case 103:
      case 104:
      case 109: return 11;
      case 60:
      case 61:
      case 65: return 5;
      case 18: return 10;
      case 17: return 6;
      case 108: return 8;
      case 19: return 13;
      case 10: return 9;
      default: return 8;
    }
  }

  public async loadMap(mapId: number): Promise<void> {
    const hour = new Date().getHours();
    this.isNight = hour >= 18 || hour < 6;
    const nightSuffix = this.isNight ? '1' : '0';

    try {
      // In Java ME (ae.java line 486 & ir.java line 966):
      // For server mapId (by2), the client loads binary file `by2 + 1`!
      const fileId = mapId + 1;
      const mapRes = await fetch(`/assets/maps/${fileId}`);
      if (!mapRes.ok) {
        console.warn(`[TilemapRenderer] Could not load map binary for map ${mapId} (file ${fileId})`);
        return;
      }
      const buffer = await mapRes.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      const heightTiles = TilemapRenderer.getMapHeightTiles(mapId);
      const widthTiles = Math.floor(bytes.length / heightTiles);
      const totalTiles = widthTiles * heightTiles;

      const tiles = new Int16Array(totalTiles);
      const collision = new Int16Array(totalTiles);

      for (let i = 0; i < totalTiles; i++) {
        const val = bytes[i];
        tiles[i] = val === 255 ? -1 : val;
      }

      // Authentic special tile marker transformation from ir.java (lines 1370-1550, 1869, 2262)
      // Any tile marker index >= 126 is resolved into its underlying visual ground/road tile
      for (let i = 0; i < totalTiles; i++) {
        const t = tiles[i];
        if (t === 139) {
          // ir.a(hn2, d): resolve to horizontal neighbor
          tiles[i] = (i % widthTiles === 0) ? tiles[i + 1] : tiles[i - 1];
        } else if (t === 140) {
          tiles[i] = 55;
        } else if (t === 141) {
          tiles[i] = i + widthTiles < totalTiles ? tiles[i + widthTiles] : 0;
        } else if (t === 152) {
          tiles[i] = mapId === 25 ? 55 : 0;
        } else if (t === 153) {
          tiles[i] = Math.floor(i / widthTiles) === 0 ? 43 : 6;
        } else if (t === 155 || t === 156) {
          tiles[i] = 55;
        } else if (t === 204) {
          tiles[i] = 43;
        } else if (t >= 126) {
          tiles[i] = (i > 0 && tiles[i - 1] >= 0 && tiles[i - 1] < 126) ? tiles[i - 1] : 0;
        }
      }

      // Compute base / collision matrix g[] as in ir.java lines 1260-1285
      for (let i = 0; i < totalTiles; i++) {
        const t = tiles[i];
        if (t === -4) {
          collision[i] = 80;
        } else if (t === -5) {
          collision[i] = 88;
        } else if (t === -1) {
          collision[i] = 88;
        } else if (t >= 120 && t <= 123) {
          collision[i] = 80;
        } else if (t >= 114 && t <= 119) {
          collision[i] = 80;
        } else if (t === 67 || t === 85) {
          collision[i] = 92;
        } else if (t >= 20 && t <= 23) {
          collision[i] = 79;
        } else if (t < 7) {
          collision[i] = 80;
        } else if (t >= 44 && t <= 55) {
          collision[i] = 80;
        } else if (t === 111 || t === 112) {
          collision[i] = 80;
        } else {
          collision[i] = 88;
        }
      }

      this.mapData = {
        id: mapId,
        widthTiles,
        heightTiles,
        tiles,
        collision
      };

      console.log(`[TilemapRenderer] Loaded map ${mapId} (file ${fileId}): ${widthTiles}x${heightTiles} tiles (${widthTiles * 24}x${heightTiles * 24}px)`);

      // 2. Load tileset image
      const tilesetUrl = `/assets/tileset/tileset${nightSuffix}.png`;
      this.tilesetImage = await Image.createImage(tilesetUrl);

      // 3. Load background image (e.g. 0.png for sky / clouds, 00.png / 10.png / 20.png / 30.png for scenery)
      this.bgImage = undefined;
      this.cloudImage = undefined;

      const bgType = TilemapRenderer.BG_TYPE_BY_MAP[mapId] ?? -1;
      if (bgType !== -1) {
        try {
          const bgUrl = `/assets/bg/${bgType}${nightSuffix}.png`;
          this.bgImage = await Image.createImage(bgUrl);
        } catch (err) {
          // Optional landscape background
        }
      }

      try {
        const cloudUrl = `/assets/bg/${nightSuffix}.png`;
        this.cloudImage = await Image.createImage(cloudUrl);
      } catch (err) {
        // Optional cloud background
      }
    } catch (err) {
      console.error('[TilemapRenderer] Load error:', err);
    }
  }

  public updateCamera(targetX: number, targetY: number, screenW: number, screenH: number): void {
    if (!this.mapData) return;

    const mapWidthPx = this.mapData.widthTiles * TilemapRenderer.TILE_SIZE;
    const mapHeightPx = this.mapData.heightTiles * TilemapRenderer.TILE_SIZE;

    // Center camera on target
    let camX = targetX - Math.floor(screenW / 2);
    let camY = targetY - Math.floor(screenH / 2);

    // Clamp camera within map bounds
    if (mapWidthPx > screenW) {
      camX = Math.max(0, Math.min(mapWidthPx - screenW, camX));
    } else {
      camX = Math.floor((mapWidthPx - screenW) / 2);
    }

    if (mapHeightPx > screenH) {
      camY = Math.max(0, Math.min(mapHeightPx - screenH, camY));
    } else {
      camY = Math.floor((mapHeightPx - screenH) / 2);
    }

    this.cameraX = camX;
    this.cameraY = camY;
  }

  public paint(g: Graphics, screenW: number, screenH: number): void {
    if (!this.mapData || !this.tilesetImage) return;

    const tileSize = TilemapRenderer.TILE_SIZE;
    const { widthTiles, heightTiles, tiles } = this.mapData;

    // 1. Paint background sky / mountains / clouds
    const skyColor = this.isNight ? 0x000015 : 0x5DBEF7;
    g.setColor(skyColor);
    g.fillRect(0, 0, screenW, screenH);

    // Clouds layer (0.png / 1.png)
    if (this.cloudImage) {
      const cW = this.cloudImage.getWidth();
      const parallaxCloud = -Math.floor(this.cameraX * 0.12) % cW;
      const cloudY = Math.max(-20, 15 - Math.floor(this.cameraY * 0.1));
      for (let x = parallaxCloud - cW; x < screenW + cW; x += cW) {
        g.drawImage(this.cloudImage, x, cloudY, 0);
      }
    }

    // Scenery landscape layer (00.png, 10.png, 20.png, 30.png)
    if (this.bgImage) {
      const bgW = this.bgImage.getWidth();
      const parallaxX = -Math.floor(this.cameraX * 0.3) % bgW;
      const bgY = Math.max(0, 40 - Math.floor(this.cameraY * 0.2));
      for (let x = parallaxX - bgW; x < screenW + bgW; x += bgW) {
        g.drawImage(this.bgImage, x, bgY, 0);
      }
    }

    // 2. Visible tile range based on camera viewport
    const startTileX = Math.max(0, Math.floor(this.cameraX / tileSize));
    const endTileX = Math.min(widthTiles, Math.ceil((this.cameraX + screenW) / tileSize));
    const startTileY = Math.max(0, Math.floor(this.cameraY / tileSize));
    const endTileY = Math.min(heightTiles, Math.ceil((this.cameraY + screenH) / tileSize));

    // 3. Render map tiles
    for (let ty = startTileY; ty < endTileY; ty++) {
      for (let tx = startTileX; tx < endTileX; tx++) {
        const tileIdx = tiles[ty * widthTiles + tx];
        if (tileIdx < 0) continue;

        // In ir.java lines 873-874 & ht.java line 21:
        // this.c = image.getHeight() / tileSize (18 vertical tiles per column!)
        // n2 = n3 / ir.c.c (column)
        // row = n3 % ir.c.c (row)
        const numRows = 18; // 432 / 24
        const col = Math.floor(tileIdx / numRows);
        const row = tileIdx % numRows;
        const srcX = col * tileSize;
        const srcY = row * tileSize;

        // Screen destination coordinates relative to camera
        const destX = tx * tileSize - this.cameraX;
        const destY = ty * tileSize - this.cameraY;

        g.drawRegion(
          this.tilesetImage,
          srcX,
          srcY,
          tileSize,
          tileSize,
          0,
          destX,
          destY,
          0
        );
      }
    }
  }

  public isBlocked(worldX: number, worldY: number): boolean {
    if (!this.mapData) return false;
    const { widthTiles, heightTiles, collision } = this.mapData;

    const tx = Math.floor(worldX / TilemapRenderer.TILE_SIZE);
    const ty = Math.floor(worldY / TilemapRenderer.TILE_SIZE);

    if (tx < 0 || tx >= widthTiles || ty < 0 || ty >= heightTiles) {
      return true; // Out of bounds
    }

    // Tile collision code check (80 and 51 are walkable paths)
    const c = collision[ty * widthTiles + tx];
    return !(c === 80 || c === 51 || c === 88 || c === 0);
  }
}

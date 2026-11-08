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
  public bgPatternImage?: Image;

  public isNight: boolean = false;
  public cameraX: number = 0;
  public cameraY: number = 0;

  public static getMapHeightTiles(mapId: number): number {
    const index = mapId - 1;
    switch (index) {
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
      // 1. Load map binary bytes
      const mapRes = await fetch(`/assets/maps/${mapId}`);
      if (!mapRes.ok) {
        console.warn(`[TilemapRenderer] Could not load map binary for map ${mapId}`);
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

      console.log(`[TilemapRenderer] Loaded map ${mapId}: ${widthTiles}x${heightTiles} tiles (${widthTiles * 24}x${heightTiles * 24}px)`);

      // 2. Load tileset image
      const tilesetUrl = `/assets/tileset/tileset${nightSuffix}.png`;
      this.tilesetImage = await Image.createImage(tilesetUrl);

      // 3. Load background image (e.g. 0.png for sky / clouds, 00.png / 01.png for mountains)
      try {
        const bgUrl = `/assets/bg/0${nightSuffix}.png`;
        this.bgImage = await Image.createImage(bgUrl);
      } catch (err) {
        // Optional background
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

    // 1. Paint background sky / mountains
    const skyColor = this.isNight ? 0x0C1929 : 0x5DBEF7;
    g.setColor(skyColor);
    g.fillRect(0, 0, screenW, screenH);

    if (this.bgImage) {
      const bgW = this.bgImage.getWidth();
      const bgH = this.bgImage.getHeight();
      const parallaxX = -Math.floor(this.cameraX * 0.3) % bgW;
      for (let x = parallaxX - bgW; x < screenW + bgW; x += bgW) {
        g.drawImage(this.bgImage, x, 60, 0);
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

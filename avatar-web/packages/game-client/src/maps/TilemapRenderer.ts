import { Graphics, Image } from '@avatar/j2me-compat';

export interface MapData {
  id: number;
  widthTiles: number;  // e in ir.java
  heightTiles: number; // f in ir.java
  tiles: Int16Array;   // d in ir.java
  collision: Int16Array; // g in ir.java
}

export interface MapObjectInstance {
  partId: number;
  x: number;          // World X in pixels (foot anchor center)
  y: number;          // World Y in pixels (foot anchor bottom)
  layer: number;      // 0: Y-sorted ground/structure, 1: overhead canopy
  image?: Image;
}

export class TilemapRenderer {
  public static readonly TILE_SIZE = 24; // i = 24 in ir.java
  public static readonly TILES_PER_ROW = 7; // 168 px / 24 px = 7 tiles

  public mapData?: MapData;
  public mapObjects: MapObjectInstance[] = [];
  public tilesetImage?: Image;
  public bgImage?: Image;
  public cloudImage?: Image;

  private objectImageCache: Map<number, Image> = new Map();

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
      this.mapObjects = [];

      for (let i = 0; i < totalTiles; i++) {
        const val = bytes[i];
        tiles[i] = val === 255 ? -1 : val;
      }

      // Authentic special tile marker decoding & MapObject spawning from ir.java lines 1308-1600
      const spawnedObjects: MapObjectInstance[] = [];

      for (let i = 0; i < totalTiles; i++) {
        const t = tiles[i];
        const col = i % widthTiles;
        const row = Math.floor(i / widthTiles);
        const px = col * TilemapRenderer.TILE_SIZE;
        const py = row * TilemapRenderer.TILE_SIZE;

        if (t === 127) {
          // Casino Palace / Airport Terminal (Part 830)
          spawnedObjects.push({ partId: 830, x: px + 36, y: py + TilemapRenderer.TILE_SIZE - 2, layer: 0 });
          tiles[i] = 96;
        } else if (t === 128) {
          // Entrance Gate / Arch (Part 828)
          spawnedObjects.push({ partId: 828, x: px + 12, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (i + widthTiles < totalTiles) ? tiles[i + widthTiles] : 5;
        } else if (t === 129 || t === 160) {
          // Mall / Supermarket (Part 829 or 836 in suburbs)
          const part = (mapId === 17) ? 836 : 829;
          spawnedObjects.push({ partId: part, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = 96;
        } else if (t === 141) {
          // Barn gate / Park lamp post (Part 840)
          spawnedObjects.push({ partId: 840, x: px + 12, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (i + widthTiles < totalTiles) ? tiles[i + widthTiles] : 5;
        } else if (t === 143) {
          // Farm Silo / Ecological Pavilion (Part 831)
          spawnedObjects.push({ partId: 831, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (i + widthTiles < totalTiles) ? tiles[i + widthTiles] : 51;
        } else if (t === 144) {
          // Well / Farm Water Tank (Part 841)
          spawnedObjects.push({ partId: 841, x: px + 12, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = 5;
        } else if (t === 147 || t === 161) {
          // Storefront (Part 832)
          spawnedObjects.push({ partId: 832, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = 96;
        } else if (t === 148 || t === 162) {
          // Airport hangar / Suburban shop (Part 833 or 836)
          const part = (mapId === 17) ? 836 : 833;
          spawnedObjects.push({ partId: part, x: px + 48, y: py + TilemapRenderer.TILE_SIZE - 2, layer: 0 });
          tiles[i] = 96;
        } else if (t === 149) {
          // Airport Radar Tower (Part 834)
          spawnedObjects.push({ partId: 834, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = 4;
        } else if (t === 150) {
          // Farm Windmill (Part 842)
          spawnedObjects.push({ partId: 842, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (mapId === 25) ? 4 : 0;
        } else if (t === 151) {
          // Farm Coop / Barn Stall (Part 843)
          spawnedObjects.push({ partId: 843, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = 0;
        } else if (t === 152) {
          // Wooden Fence / Park Railing (Part 835)
          spawnedObjects.push({ partId: 835, x: px + 12, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (mapId === 25) ? 55 : 0;
        } else if (t === 159) {
          // Water Fountain / Garden Pond (Part 848)
          spawnedObjects.push({ partId: 848, x: px + 24, y: py + TilemapRenderer.TILE_SIZE - 4, layer: 0 });
          tiles[i] = (mapId === 25) ? 5 : ((mapId === 13) ? 0 : 4);
        } else if (t === 172) {
          // Shade Tree Type 1 (Part 836)
          spawnedObjects.push({ partId: 836, x: px + 37, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 96;
        } else if (t === 173 || t === 179) {
          // Tree Type 2 (Part 837)
          spawnedObjects.push({ partId: 837, x: px + 48, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 96;
        } else if (t === 174) {
          // Tree Type 3 (Part 838)
          spawnedObjects.push({ partId: 838, x: px + 48, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 96;
        } else if (t === 175) {
          // Residential House Type A (Part 830)
          spawnedObjects.push({ partId: 830, x: px + 36, y: py + TilemapRenderer.TILE_SIZE - 2, layer: 0 });
          tiles[i] = 96;
        } else if (t === 176) {
          // Residential House Type B (Part 829)
          spawnedObjects.push({ partId: 829, x: px + 36, y: py + TilemapRenderer.TILE_SIZE - 2, layer: 0 });
          tiles[i] = 96;
        } else if (t === 177) {
          // Residential House Type C (Part 832)
          spawnedObjects.push({ partId: 832, x: px + 36, y: py + TilemapRenderer.TILE_SIZE - 2, layer: 0 });
          tiles[i] = 96;
        } else if (t === 186) {
          // Fishing Pier / River Dock (Part 847)
          spawnedObjects.push({ partId: 847, x: px + 11, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 43;
        } else if (t === 190) {
          // Casino Game Table 1 (Part 1029)
          spawnedObjects.push({ partId: 1029, x: px + 36, y: py + 20, layer: 0 });
          tiles[i] = 4;
        } else if (t === 192) {
          // Casino Game Table 2 (Part 1034)
          spawnedObjects.push({ partId: 1034, x: px + 36, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 193) {
          // Gaming Chair (Part 1032)
          spawnedObjects.push({ partId: 1032, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 194) {
          // Gaming Sofa (Part 1030)
          spawnedObjects.push({ partId: 1030, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 195) {
          // Shopping Display Rack 1 (Part 1037)
          spawnedObjects.push({ partId: 1037, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 196) {
          // Shopping Display Rack 2 (Part 1035)
          spawnedObjects.push({ partId: 1035, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 197) {
          // Clothing Mannequin (Part 1033)
          spawnedObjects.push({ partId: 1033, x: px + 12, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 198) {
          // Suburban Park Bench (Part 1036)
          spawnedObjects.push({ partId: 1036, x: px + 12, y: py + 20, layer: 0 });
          tiles[i] = 4;
        } else if (t === 199) {
          // Suburban Street Lamp (Part 1031)
          spawnedObjects.push({ partId: 1031, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 200) {
          // Lucky Wheel Machine (Part 1075)
          spawnedObjects.push({ partId: 1075, x: px + 24, y: py + 24, layer: 0 });
          tiles[i] = 4;
        } else if (t === 201) {
          // Decorative Plant (Part 1094)
          spawnedObjects.push({ partId: 1094, x: px + 24, y: py + 20, layer: 0 });
          tiles[i] = 5;
        } else if (t === 202) {
          // Residential Mailbox / Post (Part 4)
          spawnedObjects.push({ partId: 4, x: px + 24, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 96;
        } else if (t === 204) {
          // Park Entrance Arch (Part 846)
          spawnedObjects.push({ partId: 846, x: px + 12, y: py + TilemapRenderer.TILE_SIZE, layer: 0 });
          tiles[i] = 43;
        } else if (t === 139) {
          // Waypoint: resolve to neighbor
          tiles[i] = (i % widthTiles === 0) ? tiles[i + 1] : tiles[i - 1];
        } else if (t === 140) {
          tiles[i] = 55;
        } else if (t >= 126) {
          tiles[i] = (i > 0 && tiles[i - 1] >= 0 && tiles[i - 1] < 126) ? tiles[i - 1] : 0;
        }
      }

      // Preload images for all spawned map objects
      const uniquePartIds = Array.from(new Set(spawnedObjects.map(o => o.partId)));
      await Promise.all(uniquePartIds.map(async (partId) => {
        if (!this.objectImageCache.has(partId)) {
          try {
            const img = await Image.createImage(`/assets/home/${partId}.png`);
            this.objectImageCache.set(partId, img);
          } catch (e) {
            console.warn(`[TilemapRenderer] Could not load object sprite /assets/home/${partId}.png`);
          }
        }
      }));

      // Bind loaded images to spawned objects
      for (const obj of spawnedObjects) {
        obj.image = this.objectImageCache.get(obj.partId);
      }
      this.mapObjects = spawnedObjects;

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

      console.log(`[TilemapRenderer] Loaded map ${mapId} (file ${fileId}): ${widthTiles}x${heightTiles} tiles, ${spawnedObjects.length} objects spawned`);

      // 2. Load tileset image
      const tilesetUrl = `/assets/tileset/tileset${nightSuffix}.png`;
      this.tilesetImage = await Image.createImage(tilesetUrl);

      // 3. Load background image
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

  /**
   * Layer 0 & Layer 1: Sky, Parallax, and Ground Tilemap
   */
  public paint(g: Graphics, screenW: number, screenH: number): void {
    if (!this.mapData || !this.tilesetImage) return;

    const tileSize = TilemapRenderer.TILE_SIZE;
    const { widthTiles, heightTiles, tiles } = this.mapData;

    // 1. Paint background sky / mountains / clouds (Layer 0)
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

    // 3. Render base ground tiles (Layer 1)
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

    const c = collision[ty * widthTiles + tx];
    return c === 88 || c === 92;
  }
}

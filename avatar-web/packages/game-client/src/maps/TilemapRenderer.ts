import { Graphics, Image } from '@avatar/j2me-compat';
import { MapItemType, DynamicMapItem } from '../network/NetworkSession.js';

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
  isDynamic?: boolean;
  dynamicType?: number;
  dynamicId?: number;
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

      let i = 0;
      while (i < totalTiles) {
        const t = tiles[i];
        const col = i % widthTiles;
        const row = Math.floor(i / widthTiles);
        const px = col * TilemapRenderer.TILE_SIZE;
        const py = row * TilemapRenderer.TILE_SIZE;

        // Check if marker requires special object handling
        if (
          t === 127 || t === 128 || t === 129 || t === 141 || t === 143 || t === 144 ||
          t === 147 || t === 148 || t === 149 || t === 150 || t === 151 || t === 152 ||
          t === 159 || t === 160 || t === 161 || t === 162 || t === 172 || t === 173 ||
          t === 174 || t === 175 || t === 176 || t === 177 || t === 178 || t === 179 ||
          t === 186 || t === 190 || t === 192 || t === 193 || t === 194 || t === 195 ||
          t === 196 || t === 197 || t === 198 || t === 199 || t === 200 || t === 201 ||
          t === 202 || t === 204 || t === 98
        ) {
          // Calculate consecutive identical marker tiles in the current row
          let consecutive = 1;
          while (
            i + consecutive < totalTiles &&
            Math.floor((i + consecutive) / widthTiles) === row &&
            tiles[i + consecutive] === t
          ) {
            consecutive++;
          }
          const spanPx = consecutive * TilemapRenderer.TILE_SIZE;
          const centerX = px + Math.floor(spanPx / 2);

          let floorReplacement = 96;
          let partId = -1;
          let objX = centerX;
          let objY = py + TilemapRenderer.TILE_SIZE - 4;

          if (t === 127) {
            partId = 830;
            objX = px + 36;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 128) {
            partId = 828;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = (i + widthTiles < totalTiles) ? tiles[i + widthTiles] : 5;
          } else if (t === 129 || t === 160) {
            partId = (mapId === 17) ? 836 : 829;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 96;
          } else if (t === 141) {
            partId = 840;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = (i + widthTiles < totalTiles) ? tiles[i + widthTiles] : 5;
          } else if (t === 143) {
            partId = 831;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 51;
          } else if (t === 144) {
            partId = 841;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 5;
          } else if (t === 147 || t === 161) {
            partId = 832;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 96;
          } else if (t === 148 || t === 162) {
            partId = (mapId === 17) ? 836 : 833;
            objX = px + 48;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 149) {
            partId = 834;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 4;
          } else if (t === 150) {
            partId = 842;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = (mapId === 25) ? 4 : 0;
          } else if (t === 151) {
            partId = 843;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = 0;
          } else if (t === 152) {
            partId = 835;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = (mapId === 25) ? 55 : 0;
          } else if (t === 159) {
            partId = 848;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 4;
            floorReplacement = (mapId === 25) ? 5 : ((mapId === 13) ? 0 : 4);
          } else if (t === 172) {
            partId = 836;
            objX = px + 37;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 96;
          } else if (t === 173 || t === 179) {
            partId = 837;
            objX = px + 48;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 96;
          } else if (t === 174) {
            partId = 838;
            objX = px + 48;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 96;
          } else if (t === 175) {
            partId = 830;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 176) {
            partId = 829;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 177) {
            partId = 832;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 178) {
            partId = 830;
            objX = px + 24;
            objY = py + TilemapRenderer.TILE_SIZE - 2;
            floorReplacement = 96;
          } else if (t === 186) {
            partId = 974;
            objX = px + 24;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 17;
          } else if (t === 190) {
            partId = 1029;
            objX = px + 36;
            objY = py + 20;
            floorReplacement = 4;
          } else if (t === 192) {
            partId = 1034;
            objX = px + 36;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 193) {
            partId = 1032;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 194) {
            partId = 1030;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 195) {
            partId = 1037;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 196) {
            partId = 1035;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 197) {
            partId = 1033;
            objX = px + 12;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 198) {
            partId = 1036;
            objX = px + 12;
            objY = py + 20;
            floorReplacement = 4;
          } else if (t === 199) {
            partId = 1031;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 200) {
            partId = 1075;
            objX = px + 24;
            objY = py + 24;
            floorReplacement = 4;
          } else if (t === 201) {
            partId = 1094;
            objX = px + 24;
            objY = py + 20;
            floorReplacement = 5;
          } else if (t === 202) {
            partId = 4;
            objX = px + 24;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 96;
          } else if (t === 98 || t === 204) {
            partId = 846;
            objX = centerX;
            objY = py + TilemapRenderer.TILE_SIZE;
            floorReplacement = 43;
          }

          if (partId > 0) {
            spawnedObjects.push({ partId, x: objX, y: objY, layer: 0 });
          }

          for (let k = 0; k < consecutive; k++) {
            tiles[i + k] = floorReplacement;
          }

          i += consecutive;
          continue;
        } else if (t === 139) {
          // Waypoint: resolve to neighbor
          tiles[i] = (i % widthTiles === 0) ? tiles[i + 1] : tiles[i - 1];
        } else if (t === 140) {
          tiles[i] = 55;
        } else if (t >= 126) {
          tiles[i] = (i > 0 && tiles[i - 1] >= 0 && tiles[i - 1] < 126) ? tiles[i - 1] : 0;
        }

        i++;
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

  public async setDynamicMapItems(mapItemTypes: MapItemType[], mapItems: DynamicMapItem[]): Promise<void> {
    // Remove old dynamic items
    this.mapObjects = this.mapObjects.filter(o => !o.isDynamic);
    if (!mapItemTypes || !mapItems || mapItems.length === 0) return;

    const typeMap = new Map<number, MapItemType>();
    for (const t of mapItemTypes) {
      typeMap.set(t.id, t);
    }

    const newDynamicObjects: MapObjectInstance[] = [];
    for (const it of mapItems) {
      const itemType = typeMap.get(it.typeID);
      if (!itemType) continue;

      const worldX = it.tileX * TilemapRenderer.TILE_SIZE + itemType.dx;
      const worldY = it.tileY * TilemapRenderer.TILE_SIZE + itemType.dy;

      newDynamicObjects.push({
        partId: itemType.imgID,
        x: worldX,
        y: worldY,
        layer: 0,
        isDynamic: true,
        dynamicType: it.type,
        dynamicId: it.typeID
      });
    }

    const uniquePartIds = Array.from(new Set(newDynamicObjects.map(o => o.partId)));
    await Promise.all(uniquePartIds.map(async (partId) => {
      if (!this.objectImageCache.has(partId)) {
        try {
          const img = await Image.createImage(`/assets/home/${partId}.png`);
          this.objectImageCache.set(partId, img);
        } catch {
          try {
            const img = await Image.createImage(`/assets/item/${partId}.png`);
            this.objectImageCache.set(partId, img);
          } catch (e) {
            console.warn(`[TilemapRenderer] Could not load dynamic object sprite ${partId}`);
          }
        }
      }
    }));

    for (const obj of newDynamicObjects) {
      obj.image = this.objectImageCache.get(obj.partId);
      this.mapObjects.push(obj);
    }

    console.log(`[TilemapRenderer] Added ${newDynamicObjects.length} dynamic map items`);
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
      camY = Math.max(0, Math.min(mapHeightPx - screenH, targetY - Math.floor(screenH / 2)));
    } else {
      // Road sits flush against the bottom edge of the screen (0px gap)
      camY = mapHeightPx - screenH;
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
      const bgH = this.bgImage.getHeight();
      const parallaxX = -Math.floor(this.cameraX * 0.3) % bgW;
      const groundTopY = screenH - heightTiles * tileSize;
      const bgY = Math.max(0, groundTopY - bgH + 30);
      for (let x = parallaxX - bgW; x < screenW + bgW; x += bgW) {
        g.drawImage(this.bgImage, x, bgY, 0);
      }
    }

    // 2. Visible tile range based on camera viewport (seamlessly covers full screenW)
    const startTileX = Math.floor(this.cameraX / tileSize);
    const endTileX = Math.ceil((this.cameraX + screenW) / tileSize);
    const startTileY = Math.max(0, Math.floor(this.cameraY / tileSize));
    const endTileY = Math.min(heightTiles, Math.ceil((this.cameraY + screenH) / tileSize));

    // 3. Render base ground tiles (Layer 1)
    for (let ty = startTileY; ty < endTileY; ty++) {
      for (let tx = startTileX; tx < endTileX; tx++) {
        // Clamp column to [0, widthTiles - 1] so ground/sidewalk/road tiles seamlessly repeat to the screen borders
        const clampedCol = Math.max(0, Math.min(widthTiles - 1, tx));
        let tileIdx = tiles[ty * widthTiles + clampedCol];
        if (tileIdx < 0) continue;

        // Outside boundary, avoid duplicating doorways or markers, retain asphalt/sidewalk
        if (tx < 0 || tx >= widthTiles) {
          if (tileIdx > 120 || tileIdx < 0) {
            tileIdx = 96;
          }
        }

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

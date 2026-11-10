/**
 * FarmScreen.ts
 * Authentic WebGL2-rendered Farm System Screen (Map 25) for Avatar Teamobi 2.5.8.
 * Faithful visual fidelity matching original Java ME client (ir.java & go.java).
 * Integrates TilemapRenderer, original map objects, authentic cracked soil, and server authority.
 */

import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { BitmapFont } from '../renderer/BitmapFont.js';
import { AvatarRenderer } from '../characters/AvatarRenderer.js';
import { FarmModel, LandItemState, CROP_DEFINITIONS } from './FarmModel.js';
import { FarmNetworkHandler } from './FarmNetworkHandler.js';
import { FarmActionController, FarmToolMode } from './FarmActionController.js';

export interface LocalPlayerState {
  id: number;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  dir: number; // 0: Down, 1: Up, 2: Left, 3: Right
  state: 'idle' | 'walk';
  wearing: number[];
  frame: number;
}

export class FarmScreen extends GameScreen {
  public model: FarmModel;
  public handler: FarmNetworkHandler;
  public controller: FarmActionController;

  public skinPainter: UISkinPainter;
  public font: BitmapFont;
  public localPlayer: LocalPlayerState;

  // Authentic Map 25 Procedural Tilemap Engine
  public mapTiles: Int16Array = new Int16Array(336);
  public isMapLoaded = false;
  public isNight = false;

  // Screen dimensions
  public screenW = 640;
  public screenH = 480;

  // Farm camera
  public cameraX = 0;
  public cameraY = 0;

  // Farm sprite image cache
  private spriteCache: Map<string, Image> = new Map();
  private loadingSprites: Set<string> = new Set();

  // Floating notifications
  private feedbackText: string = 'Chào mừng bạn đến với Nông Trại Avatar!';
  private feedbackColor: string = '#facc15';
  private feedbackTimer: number = 100;

  // Animation ticks
  private animTick = 0;

  // Active Menu / Dialogs
  public isMenuOpen = false;
  public isConfirmOpenLand = false;

  // Callbacks
  public onExitToWorldMap?: () => void;

  constructor(
    handler: FarmNetworkHandler,
    skinPainter: UISkinPainter,
    font: BitmapFont
  ) {
    super();
    this.handler = handler;
    this.model = handler.model;
    this.controller = new FarmActionController(this.model, this.handler);
    this.skinPainter = skinPainter;
    this.font = font;

    // Initial player position: standing on the dirt path near farm entrance (x=830, y=690)
    this.localPlayer = {
      id: this.handler.network.myUserId || 1,
      name: 'Nông dân',
      x: 830,
      y: 690,
      targetX: 830,
      targetY: 690,
      dir: 1, // Facing Up
      state: 'idle',
      wearing: [1, 2, 3],
      frame: 0
    };

    this.controller.onActionFeedback = (text, color) => {
      this.feedbackText = text;
      this.feedbackColor = color || '#facc15';
      this.feedbackTimer = 90;
    };

    this.handler.onNotification = (msg) => {
      this.feedbackText = msg;
      this.feedbackColor = '#38bdf8';
      this.feedbackTimer = 100;
    };

    // Load authentic Map 25 binary and authentic HD assets
    this.loadMap25().catch((err) => {
      console.error('[FarmScreen] Failed to load Map 25 assets:', err);
    });
  }

  private async loadMap25(): Promise<void> {
    // 1. Preload authentic HD graphics from Avatar-Sv-master-master (both Day & Night)
    await Promise.all([
      this.preloadSprite('tileset_day', '/assets/tileset/tileset_hd_day.png'),
      this.preloadSprite('tileset_night', '/assets/tileset/tileset_hd_night.png'),
      this.preloadSprite('clouds_day', '/assets/bg/clouds_farm_day.png'),
      this.preloadSprite('clouds_night', '/assets/bg/clouds_farm_night.png'),
      this.preloadSprite('horizon_day', '/assets/bg/horizon_farm_day.png'),
      this.preloadSprite('horizon_night', '/assets/bg/horizon_farm_night.png'),
      this.preloadSprite('house1029', '/assets/home/1029.png'),
      this.preloadSprite('barn834', '/assets/home/834.png'),
      this.preloadSprite('tree243', '/assets/home/243.png'),
      this.preloadSprite('gate847', '/assets/home/847.png'),
      this.preloadSprite('sign848', '/assets/home/848.png'),
      this.preloadSprite('lilypad849', '/assets/home/849.png'),
      this.preloadSprite('starfruitTree', '/assets/farm/43.png'),
      this.preloadSprite('starfruitFruit', '/assets/farm/46.png'),
      this.preloadSprite('cell0', '/assets/farm_ui/cell0.png'),
      this.preloadSprite('buyLand', '/assets/farm_ui/buyLand.png'),
      this.preloadSprite('w', '/assets/farm_ui/w.png'),
      this.preloadSprite('g', '/assets/farm_ui/g.png'),
      this.preloadSprite('cut', '/assets/farm_ui/cut.png'),
      this.preloadSprite('focus', '/assets/farm_ui/focus.png'),
      this.preloadSprite('coin', '/assets/farm_ui/coin.png')
    ]);

    // 2. Load 336-byte Map 25 binary extracted from Avatar258.jar
    try {
      const res = await fetch('/assets/maps/25');
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const raw = new Uint8Array(buffer);
        for (let i = 0; i < 336; i++) {
          const val = raw[i];
          // Authentic special marker decoding from ir.java lines 1280-1745
          if (val === 149 || val === 190 || val === 189 || val === 142 || val === 187 || val === 188 || val === 28) {
            this.mapTiles[i] = 4;
          } else if (val === 140 || val === 155 || val === 152) {
            this.mapTiles[i] = 55;
          } else if (val === 110) {
            this.mapTiles[i] = 31;
          } else if (val === 159 || val === 156 || val === 158) {
            this.mapTiles[i] = 5;
          } else if (val === 182) {
            this.mapTiles[i] = 39;
          } else if (val === 183) {
            this.mapTiles[i] = 13;
          } else if (val === 157) {
            this.mapTiles[i] = 111;
          } else {
            this.mapTiles[i] = val === 255 ? -1 : val;
          }
        }
        this.isMapLoaded = true;
        console.log('[FarmScreen] Authentic Map 25 tilemap loaded successfully');
      }
    } catch (err) {
      console.error('[FarmScreen] Failed to load /assets/maps/25:', err);
    }
  }

  private async preloadSprite(key: string, url: string): Promise<Image | undefined> {
    try {
      const img = await Image.createImage(url);
      this.spriteCache.set(key, img);
      return img;
    } catch (err) {
      console.warn(`[FarmScreen] Failed to load sprite ${key} from ${url}`);
      return undefined;
    }
  }

  private loadSprite(key: string, url: string): Image | undefined {
    if (this.spriteCache.has(key)) {
      return this.spriteCache.get(key);
    }
    if (!this.loadingSprites.has(key)) {
      this.loadingSprites.add(key);
      Image.createImage(url)
        .then((img) => {
          this.spriteCache.set(key, img);
          this.loadingSprites.delete(key);
        })
        .catch(() => {
          this.loadingSprites.delete(key);
        });
    }
    return undefined;
  }

  private getCropSprite(spriteId: number): Image | undefined {
    return this.loadSprite(`crop_${spriteId}`, `/assets/farm/${spriteId}.png`);
  }

  public onResize(width: number, height: number): void {
    this.screenW = width;
    this.screenH = height;
  }

  // --- Game Loop (20 Simulation Ticks/s) ---

  public update(): void {
    this.animTick++;

    if (this.feedbackTimer > 0) {
      this.feedbackTimer--;
    }

    // Move player smoothly towards target
    const dx = this.localPlayer.targetX - this.localPlayer.x;
    const dy = this.localPlayer.targetY - this.localPlayer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 4) {
      const speed = 5;
      const nextX = this.localPlayer.x + (dx / dist) * speed;
      const nextY = this.localPlayer.y + (dy / dist) * speed;

      // Authentic Farm Map 25 boundaries: width 2016px, walkable ground height 460..715px
      this.localPlayer.x = Math.max(50, Math.min(1960, nextX));
      this.localPlayer.y = Math.max(460, Math.min(715, nextY));
      this.localPlayer.state = 'walk';

      if (Math.abs(dx) > Math.abs(dy)) {
        this.localPlayer.dir = dx > 0 ? 3 : 2; // 3: Right, 2: Left
      } else {
        this.localPlayer.dir = dy > 0 ? 0 : 1; // 0: Down, 1: Up
      }
      this.localPlayer.frame = 1 + (Math.floor(this.animTick / 3) % 4);
    } else {
      this.localPlayer.x = this.localPlayer.targetX;
      this.localPlayer.y = this.localPlayer.targetY;
      this.localPlayer.state = 'idle';
      this.localPlayer.frame = 0;
    }

    // Camera smoothly follows player across Map 25 panorama (2016x772)
    const MAP_WIDTH = 2016;
    const MAP_HEIGHT = 772;
    let camX = Math.round(this.localPlayer.x - this.screenW / 2);
    if (MAP_WIDTH > this.screenW) {
      camX = Math.max(0, Math.min(MAP_WIDTH - this.screenW, camX));
    } else {
      camX = Math.floor((MAP_WIDTH - this.screenW) / 2);
    }

    let camY = Math.max(0, MAP_HEIGHT - this.screenH);
    if (this.screenH >= MAP_HEIGHT) {
      camY = 0;
    }
    this.cameraX = camX;
    this.cameraY = camY;

    // Client-side crop growth progression display tick
    for (const cell of this.model.lands) {
      if (cell.type >= 0 && cell.localPlantedTimestamp) {
        const elapsedMinutes = Math.floor((Date.now() - cell.localPlantedTimestamp) / 60000);
        cell.plantedMinutes = Math.max(cell.plantedMinutes, elapsedMinutes);
        const meta = CROP_DEFINITIONS[cell.type];
        if (meta && cell.plantedMinutes >= meta.growMinutes) {
          cell.isHarvestable = true;
        }
      }
    }

    // Idle animal movement inside chicken coop (x: 100..260, y: 500..640)
    for (const a of this.model.animals) {
      a.moveTimer++;
      if (a.moveTimer > 80) {
        a.moveTimer = 0;
        a.targetX = 120 + Math.floor(Math.random() * 120);
        a.targetY = 520 + Math.floor(Math.random() * 80);
      }
      a.x += (a.targetX - a.x) * 0.04;
      a.y += (a.targetY - a.y) * 0.04;
    }
  }

  // --- Rendering Pipeline (WebGL2 Native Procedural Map 25 Engine) ---

  public paint(g: Graphics): void {
    const w = this.screenW;
    const h = this.screenH;

    const isForcedDay = typeof window !== 'undefined' && (new URLSearchParams(window.location.search).has('day') || (window as any).__FORCE_DAY);
    const hour = new Date().getHours();
    this.isNight = isForcedDay ? false : (hour >= 18 || hour < 6);
    const suffix = this.isNight ? 'night' : 'day';

    // 1. Paint authentic sky blue background (#5DBEF7 Day or #000015 Night)
    const skyColor = this.isNight ? 0x000015 : 0x5DBEF7;
    g.setColor(skyColor);
    g.fillRect(0, 0, w, h);

    // 2. Paint Authentic Parallax Clouds (clouds_farm_day.png / may20.png)
    const cloudImg = this.spriteCache.get(`clouds_${suffix}`);
    if (cloudImg) {
      const cW = cloudImg.getWidth();
      const parallaxCloud = -Math.floor(this.cameraX * 0.15) % cW;
      const cloudY = Math.max(-20, -Math.floor(this.cameraY * 0.05));
      for (let x = parallaxCloud - cW; x < w + cW; x += cW) {
        g.drawImage(cloudImg, x, cloudY, 0);
      }
    }

    // 3. Paint Authentic Parallax Horizon Landscape (horizon_farm_day.png / 20.png)
    const horizonImg = this.spriteCache.get(`horizon_${suffix}`);
    if (horizonImg) {
      const hW = horizonImg.getWidth();
      const hH = horizonImg.getHeight();
      const parallaxX = -Math.floor(this.cameraX * 0.35) % hW;
      // Horizon sits right behind ground top fence (y = 388 - hH + 40)
      const horizonY = 388 - hH + 40 - this.cameraY;
      for (let x = parallaxX - hW; x < w + hW; x += hW) {
        g.drawImage(horizonImg, x, horizonY, 0);
      }
    }

    // 4. Paint Authentic Ground Tilemap (42 cols x 8 rows, HD 48px tile size, Column-Major Indexing)
    const tilesetImg = this.spriteCache.get(`tileset_${suffix}`);
    if (tilesetImg && this.isMapLoaded) {
      const tileSize = 48;
      const groundY = 388;
      const numRowsInTileset = 18; // 864px / 48px = 18 rows per column (ht.java & ir.java)

      const startCol = Math.max(0, Math.floor(this.cameraX / tileSize));
      const endCol = Math.min(42, Math.ceil((this.cameraX + w) / tileSize));
      const startRow = Math.max(0, Math.floor((this.cameraY - groundY) / tileSize));
      const endRow = Math.min(8, Math.ceil((this.cameraY + h - groundY) / tileSize));

      for (let r = startRow; r < endRow; r++) {
        const destY = groundY + r * tileSize - this.cameraY;
        for (let c = startCol; c < endCol; c++) {
          const tileId = this.mapTiles[r * 42 + c];
          if (tileId < 0) continue;

          // In ir.java lines 873-874:
          // col = tileId / numRows, row = tileId % numRows (column-major)
          const tc = Math.floor(tileId / numRowsInTileset);
          const tr = tileId % numRowsInTileset;
          const destX = c * tileSize - this.cameraX;

          g.drawRegion(
            tilesetImg,
            tc * tileSize,
            tr * tileSize,
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

    // Apply Camera Translation for Dynamic World Entities
    g.translate(-this.cameraX, -this.cameraY);

    // 5. Paint Authentic Map Objects (Nhà Bếp, Chuồng Rơm, Cây Khế, Cây to, Cổng vào, Signpost, Biển MUA)
    this.paintSceneryObjects(g);

    // 6. Paint Land Plots with Authentic Soil (cell0.png), Crops & "MUA" sign
    this.paintLandPlots(g);

    // 7. Paint Animals (Chickens moving inside coop)
    this.paintAnimals(g);

    // 8. Paint Local Player Avatar (10-layer rendering)
    this.paintPlayer(g);

    // 9. Paint Dynamic Farm Guide Elements (Yellow "Vào" arrows)
    this.paintFarmOverlays(g);

    // Restore Camera Translation
    g.translate(this.cameraX, this.cameraY);

    // 10. Paint Top Status Bar & HUD (Xu, Lượng, Menu button, Mail notification)
    this.paintHUD(g, w, h);

    // 11. Paint Notification Toast (if active)
    this.paintNotificationToast(g, w, h);

    // 12. Paint Softkeys Bar (Left: Menu, Center: Chọn, Right: Về phố)
    this.paintSoftkeys(g, w, h);

    // 13. Paint Modals / Menus / Dialogs
    this.paintModals(g, w, h);
  }

  /**
   * Paint authentic scenery objects matching Avatar 2.5.8 Java ME (ir.java & go.java)
   */
  private paintSceneryObjects(g: Graphics): void {
    const groundY = 388;
    const tileSize = 48;

    // 1. Big trees behind top fence (cols 8, 28, 34 in row 0)
    const tree243 = this.spriteCache.get('tree243');
    if (tree243) {
      const tW = tree243.getWidth();
      const tH = tree243.getHeight();
      for (const col of [8, 28, 34]) {
        const tx = Math.floor((col + 0.5) * tileSize - tW / 2);
        const ty = groundY + tileSize - tH + 10;
        g.drawImage(tree243, tx, ty, 0);
      }
    }

    // 2. Nhà Bếp (Kitchen building with chef hat) at col 9..11
    const houseImg = this.spriteCache.get('house1029');
    if (houseImg) {
      const hx = Math.floor((9 + 1.6) * tileSize - houseImg.getWidth() / 2);
      const hy = groundY + 2 * tileSize - houseImg.getHeight() - 8;
      g.drawImage(houseImg, hx, hy, 0);
    }

    // 3. Chuồng Rơm (Hay barn) at col 13..15
    const barnImg = this.spriteCache.get('barn834');
    if (barnImg) {
      const bx = Math.floor((13 + 1.6) * tileSize - barnImg.getWidth() / 2);
      const by = groundY + 2 * tileSize - barnImg.getHeight() - 8;
      g.drawImage(barnImg, bx, by, 0);
    }

    // 4. Cây Khế (Starfruit Tree) at col 19
    const starfruitTreeImg = this.spriteCache.get('starfruitTree');
    if (starfruitTreeImg) {
      const sx = Math.floor((19 + 0.5) * tileSize - starfruitTreeImg.getWidth() / 2);
      const sy = groundY + 2 * tileSize - starfruitTreeImg.getHeight() - 8;
      g.drawImage(starfruitTreeImg, sx, sy, 0);

      // Starfruit fruits hanging on branches
      const fruitImg = this.spriteCache.get('starfruitFruit');
      if (fruitImg) {
        const fruitOffsets: [number, number][] = [[-25, -50], [-10, -70], [15, -45], [25, -65], [0, -40]];
        const centerX = sx + Math.floor(starfruitTreeImg.getWidth() / 2);
        const centerY = sy + starfruitTreeImg.getHeight();
        for (const [fx, fy] of fruitOffsets) {
          g.drawImage(fruitImg, centerX + fx, centerY + fy, 0);
        }
      }

      // "Lv1" gold level badge
      g.setColor(0xFACC15);
      this.font.drawString(g, 'Lv1', sx + starfruitTreeImg.getWidth() - 10, sy + 15, 0);
    }

    // 5. Exit Gateway / Entrance Sign 847 at col 17, row 7 (ir.java case 110)
    const gateImg = this.spriteCache.get('gate847');
    if (gateImg) {
      const gx = Math.floor((17 + 0.5) * tileSize - gateImg.getWidth() / 2);
      const gy = groundY + 8 * tileSize - gateImg.getHeight() - 4;
      g.drawImage(gateImg, gx, gy, 0);

      // Owner name badge above exit sign
      const ownerName = this.model.userId === this.handler.network.myUserId
        ? (this.localPlayer.name || 'akawasi999')
        : `User ${this.model.userId}`;
      this.font.drawString(g, ownerName, gx + Math.floor(gateImg.getWidth() / 2), gy - 12, 2);
    }

    // 7. "MUA" signpost at Chicken coop (col 6, row 3) and Fish pond (col 35, row 6)
    const buyLandImg = this.spriteCache.get('buyLand');
    if (buyLandImg) {
      const cx = Math.floor((6 + 0.5) * tileSize - buyLandImg.getWidth() / 2);
      const cy = groundY + 4 * tileSize - buyLandImg.getHeight() - 8;
      g.drawImage(buyLandImg, cx, cy, 0);

      const px = Math.floor((35 + 0.5) * tileSize - buyLandImg.getWidth() / 2);
      const py = groundY + 7 * tileSize - buyLandImg.getHeight() - 8;
      g.drawImage(buyLandImg, px, py, 0);
    }

    // 8. Lily pads in Fish Pond (Ao Cá at cols 36..40, rows 2..6)
    const lilypadImg = this.spriteCache.get('lilypad849');
    if (lilypadImg) {
      // Top lilypad (col 38, row 3.2)
      g.drawImage(lilypadImg, Math.floor(38 * tileSize + 8), Math.floor(groundY + 3.2 * tileSize), 0);
      // Left lilypad (col 37.2, row 4.5)
      g.drawImage(lilypadImg, Math.floor(37.2 * tileSize + 4), Math.floor(groundY + 4.5 * tileSize), 0);
      // Bottom-right lilypad (col 39.2, row 5.2)
      g.drawImage(lilypadImg, Math.floor(39.2 * tileSize), Math.floor(groundY + 5.2 * tileSize), 0);
    }
  }

  /**
   * Paint authentic farm overlays (animated yellow arrows, owner badge)
   */
  private paintFarmOverlays(g: Graphics): void {
    const arrowBounce = Math.floor((this.animTick % 12) / 4);

    // 1. Animated Yellow "Vào" arrow on Nhà Bếp doorway (x = 502, y = 422)
    this.paintYellowArrow(g, 502, 422 + arrowBounce, 'Vào');

    // 2. Animated Yellow "Vào" arrow on Chuồng Rơm / Hay Barn doorway (x = 691, y = 420)
    this.paintYellowArrow(g, 691, 420 + arrowBounce, 'Vào');

    // 3. Exit Signpost animated yellow "Vào" arrow (x = 830, y = 715)
    this.paintYellowArrow(g, 830, 715 + arrowBounce, 'Vào');
  }

  /**
   * Paint yellow guide arrow with text (matching original Avatar "Vào" arrow)
   */
  private paintYellowArrow(g: Graphics, x: number, y: number, text: string): void {
    this.font.drawString(g, text, x, y - 10, 2);
    // Downward yellow triangle
    g.setColor(0xFACC15);
    for (let row = 0; row < 5; row++) {
      g.fillRect(x - (4 - row), y + row, (4 - row) * 2 + 1, 1);
    }
  }

  /**
   * Paint Land Plots with Authentic Soil (cell0.png), Crops & "MUA" sign
   */
  private paintLandPlots(g: Graphics): void {
    const cell0Img = this.spriteCache.get('cell0');
    const soilWaterImg = this.spriteCache.get('w');
    const buyLandImg = this.spriteCache.get('buyLand');
    const focusImg = this.spriteCache.get('focus');
    const cutImg = this.spriteCache.get('cut');

    for (let i = 0; i < this.model.lands.length; i++) {
      const cell = this.model.lands[i];
      const px = cell.posX;
      const py = cell.posY;
      const cw = FarmModel.CELL_WIDTH;
      const ch = FarmModel.CELL_HEIGHT;

      // 1. Locked plot
      if (cell.type === -2) {
        if (i === this.model.landSize) {
          // Highlight next unlockable plot with authentic "MUA" signpost
          if (buyLandImg) {
            g.drawImage(buyLandImg, px + 3, py - 6, 0);
          } else {
            g.setColor(0xFACC15);
            this.font.drawString(g, 'MUA', px + Math.floor(cw / 2), py + 14, 2);
          }
        }
        continue;
      }

      // 2. Unlocked Soil Plot: render authentic cracked soil texture (cell0.png)
      if (cell0Img) {
        // cell0 is 52x56, center on 48x48 plot
        g.drawImage(cell0Img, px - 2, py - 4, 0);
      } else {
        g.setColor(0x8D6E50);
        g.fillRect(px + 2, py + 2, cw - 4, ch - 4);
      }

      // Watered soil indicator
      if (cell.isWatered) {
        if (soilWaterImg) {
          g.drawImage(soilWaterImg, px + 28, py + 24, 0);
        } else {
          g.setColor(0x4A2F1B);
          g.fillRect(px + 4, py + 4, cw - 8, ch - 8);
        }
      }

      // 3. Plant / Crop Sprite
      if (cell.type >= 0) {
        const spriteId = this.model.getCropSpriteId(cell);
        const cropImg = this.getCropSprite(spriteId);

        if (cropImg) {
          const imgW = cropImg.getWidth();
          const imgH = cropImg.getHeight();
          const drawX = px + Math.floor((cw - imgW) / 2);
          const drawY = py + ch - imgH - 4;
          g.drawImage(cropImg, drawX, drawY, 0);
        } else {
          // Lightweight placeholder while crop sprite loads
          const stage = this.model.getGrowthStage(cell);
          g.setColor(stage >= 7 ? 0xFACC15 : 0x4ADE80);
          g.fillRect(px + 14, py + 14, 20, 24);
        }

        // Ripe sickle indicator
        const stage = this.model.getGrowthStage(cell);
        if (cell.isHarvestable || stage === 7) {
          if (cutImg) {
            g.drawImage(cutImg, px + cw - 18, py + 2, 0);
          } else {
            g.setColor(0xFACC15);
            g.fillRect(px + cw - 12, py + 4, 8, 8);
          }
        }
      }

      // 4. Cursor Focus Selection Box
      if (i === this.controller.focusedCellIndex) {
        if (focusImg) {
          g.drawImage(focusImg, px + 10, py + 10, 0);
        } else {
          g.setColor(0xFACC15);
          g.drawRect(px + 2, py + 2, cw - 4, ch - 4);
        }
      }
    }
  }

  /**
   * Paint idle chickens/animals in chicken coop
   */
  private paintAnimals(g: Graphics): void {
    for (const a of this.model.animals) {
      const ax = Math.floor(a.x);
      const ay = Math.floor(a.y);

      // Authentic white hen with red comb and yellow beak
      g.setColor(0xFFFFFF);
      g.fillRect(ax, ay + 2, 10, 8);
      g.setColor(0xE2E8F0);
      g.fillRect(ax + 2, ay + 4, 6, 5);
      // Red comb
      g.setColor(0xEF4444);
      g.fillRect(ax + 6, ay - 1, 3, 3);
      // Yellow beak
      g.setColor(0xF59E0B);
      g.fillRect(ax + 9, ay + 3, 3, 2);
      // Feet
      g.setColor(0xF59E0B);
      g.fillRect(ax + 2, ay + 10, 2, 2);
      g.fillRect(ax + 6, ay + 10, 2, 2);
    }
  }

  /**
   * Paint Local Player Avatar
   */
  private paintPlayer(g: Graphics): void {
    const px = Math.floor(this.localPlayer.x);
    const py = Math.floor(this.localPlayer.y);

    // Foot shadow
    g.setColor(0x111827);
    g.fillArc(px - 9, py - 2, 18, 6, 0, 360);

    // Render 10-layer avatar
    AvatarRenderer.paintAvatar(
      g,
      px,
      py,
      this.localPlayer.wearing,
      this.localPlayer.dir,
      this.localPlayer.frame,
      this.localPlayer.name,
      true,
      this.font
    );
  }

  /**
   * Paint authentic Avatar 2.5.8 HUD (Top status bar with Menu, Mail, and Xu counter)
   */
  private paintHUD(g: Graphics, w: number, h: number): void {
    const coinImg = this.spriteCache.get('coin');

    // 1. Top Left Menu button [ = ]
    g.setColor(0x1E293B);
    g.fillRect(6, 6, 26, 22);
    g.setColor(0x64748B);
    g.drawRect(6, 6, 26, 22);
    g.setColor(0xFFFFFF);
    g.fillRect(10, 11, 18, 2);
    g.fillRect(10, 16, 18, 2);
    g.fillRect(10, 21, 18, 2);

    // 2. Top Left Mail Notification button [ ✉ ! ]
    g.setColor(0x1E293B);
    g.fillRect(36, 6, 26, 22);
    g.setColor(0x64748B);
    g.drawRect(36, 6, 26, 22);
    g.setColor(0xFFFFFF);
    g.drawRect(40, 11, 18, 12);
    g.drawLine(40, 11, 49, 18);
    g.drawLine(49, 18, 58, 11);
    // Red notification circle (!)
    g.setColor(0xEF4444);
    g.fillArc(56, 4, 8, 8, 0, 360);
    g.setColor(0xFFFFFF);
    g.fillRect(59, 6, 2, 3);
    g.fillRect(59, 10, 2, 1);

    // 3. Top Right Xu & Lượng Counter
    const xuVal = Number(this.model.userXu || 0).toLocaleString('vi-VN');
    const xuStr = `${xuVal} Xu`;
    const xuStrW = this.font.stringWidth(xuStr);
    const startXuX = w - xuStrW - 24;

    if (coinImg) {
      g.drawImage(coinImg, startXuX, 10, 0);
    }
    this.font.drawString(g, xuStr, startXuX + 14, 10, 0);

    // Farm Owner Label
    const ownerTitle = this.model.userId === this.handler.network.myUserId
      ? `Nông trại của bạn (Cấp ${this.model.farmLevel || 1})`
      : `Nông trại: User #${this.model.userId}`;
    this.font.drawString(g, ownerTitle, 68, 10, 0);
  }

  /**
   * Paint bottom classic softkeys (Menu, Chọn, Về phố)
   */
  private paintSoftkeys(g: Graphics, w: number, h: number): void {
    const barH = 24;
    const barY = h - barH;

    // Dark translucent background strip
    g.setColor(0x0F172A);
    g.fillRect(0, barY, w, barH);
    g.setColor(0x334155);
    g.fillRect(0, barY, w, 1);

    // Left softkey: Menu
    this.font.drawString(g, 'Menu', 12, barY + 5, 0);

    // Center softkey: Chọn
    this.font.drawString(g, 'Chọn', Math.floor(w / 2), barY + 5, 2);

    // Right softkey: Về phố
    this.font.drawString(g, 'Về phố', w - 12, barY + 5, 1);
  }

  /**
   * Paint floating toast notification
   */
  private paintNotificationToast(g: Graphics, w: number, h: number): void {
    if (this.feedbackTimer <= 0) return;

    const toastW = Math.min(420, w - 40);
    const toastH = 24;
    const tx = Math.floor((w - toastW) / 2);
    const ty = 34;

    g.setColor(0x0F172A);
    g.fillRect(tx, ty, toastW, toastH);
    g.setColor(0xFACC15);
    g.drawRect(tx, ty, toastW, toastH);

    this.font.drawString(g, this.feedbackText, Math.floor(w / 2), ty + 6, 2);
  }

  /**
   * Paint active modal windows (Menu, Seed Picker, Shop, Warehouse, Confirm Land)
   */
  private paintModals(g: Graphics, w: number, h: number): void {
    if (this.isMenuOpen) {
      this.paintMenuModal(g, w, h);
    } else if (this.controller.isSeedPickerOpen) {
      this.paintSeedPickerModal(g, w, h);
    } else if (this.controller.isShopOpen) {
      this.paintShopModal(g, w, h);
    } else if (this.controller.isWarehouseOpen) {
      this.paintWarehouseModal(g, w, h);
    } else if (this.isConfirmOpenLand) {
      this.paintConfirmOpenLandModal(g, w, h);
    }
  }

  /**
   * Authentic Avatar Menu Popup
   */
  private paintMenuModal(g: Graphics, w: number, h: number): void {
    const items = [
      { id: 'plant', label: 'Gieo hạt' },
      { id: 'harvest', label: 'Thu hoạch cây chín' },
      { id: 'open_land', label: 'Mở thêm ô đất' },
      { id: 'shop', label: 'Cửa hàng hạt giống' },
      { id: 'warehouse', label: 'Nhà kho nông sản' },
      { id: 'exit', label: 'Rời nông trại' }
    ];

    const mw = 180;
    const mh = items.length * 28 + 32;
    const mx = 10;
    const my = h - mh - 28;

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    // Title
    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 22);
    this.font.drawString(g, 'NÔNG TRẠI', mx + Math.floor(mw / 2), my + 5, 2);

    for (let i = 0; i < items.length; i++) {
      const iy = my + 24 + i * 28;
      g.setColor(i % 2 === 0 ? 0x1E293B : 0x0F172A);
      g.fillRect(mx + 2, iy, mw - 4, 26);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, items[i].label, mx + 10, iy + 6, 0);
    }
  }

  private paintSeedPickerModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(260, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '🌾 CHỌN HẠT GIỐNG ĐỂ GIEO', mx + Math.floor(mw / 2), my + 6, 2);

    // Close button [X]
    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
    if (seeds.length === 0) {
      this.font.drawString(g, 'Kho của bạn chưa có hạt giống nào!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Hãy vào Cửa Hàng để mua hạt giống.', mx + Math.floor(mw / 2), my + 85, 2);
      return;
    }

    let yOff = my + 34;
    for (const [seedId, count] of seeds) {
      const meta = CROP_DEFINITIONS[seedId];
      const name = meta ? meta.name : `Hạt #${seedId}`;

      g.setColor(0x1E293B);
      g.fillRect(mx + 8, yOff, mw - 16, 28);
      g.setColor(0xFACC15);
      this.font.drawString(g, `${name} (Còn: ${count})`, mx + 16, yOff + 7, 0);

      // Sown button
      g.setColor(0x16A34A);
      g.fillRect(mx + mw - 68, yOff + 4, 54, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, 'Gieo', mx + mw - 41, yOff + 6, 2);

      yOff += 32;
      if (yOff > my + mh - 34) break;
    }
  }

  private paintShopModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(340, w - 20);
    const mh = Math.min(270, h - 50);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '🏪 CỬA HÀNG HẠT GIỐNG', mx + Math.floor(mw / 2), my + 6, 2);

    // Close button [X]
    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    const crops = Object.values(CROP_DEFINITIONS);
    let yOff = my + 32;
    for (const c of crops) {
      g.setColor(0x1E293B);
      g.fillRect(mx + 8, yOff, mw - 16, 28);

      g.setColor(0xFFFFFF);
      this.font.drawString(g, `${c.name} (${c.growMinutes}p)`, mx + 14, yOff + 7, 0);

      // Buy button with Xu price
      g.setColor(0xCA8A04);
      g.fillRect(mx + mw - 78, yOff + 4, 68, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, `${c.seedPriceXu} Xu`, mx + mw - 44, yOff + 6, 2);

      yOff += 32;
      if (yOff > my + mh - 34) break;
    }
  }

  private paintWarehouseModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(250, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '📦 NHÀ KHO NÔNG SẢN', mx + Math.floor(mw / 2), my + 6, 2);

    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    const cropEntries = Array.from(this.model.crops.entries()).filter(([_, c]) => c > 0);
    if (cropEntries.length === 0) {
      this.font.drawString(g, 'Nhà kho hiện tại đang trống!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Hãy gieo trồng và thu hoạch để có nông sản.', mx + Math.floor(mw / 2), my + 85, 2);
      return;
    }

    let yOff = my + 34;
    for (const [cropId, count] of cropEntries) {
      const meta = CROP_DEFINITIONS[cropId];
      const name = meta ? meta.name : `Nông sản #${cropId}`;
      const sellTotal = count * (meta ? meta.sellPriceXu : 10);

      g.setColor(0x1E293B);
      g.fillRect(mx + 8, yOff, mw - 16, 28);
      g.setColor(0x4ADE80);
      this.font.drawString(g, `${name}: ${count} củ/quả`, mx + 16, yOff + 7, 0);

      g.setColor(0x059669);
      g.fillRect(mx + mw - 76, yOff + 4, 66, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, `Bán: ${sellTotal}`, mx + mw - 43, yOff + 6, 2);

      yOff += 32;
      if (yOff > my + mh - 34) break;
    }
  }

  private paintConfirmOpenLandModal(g: Graphics, w: number, h: number): void {
    const mw = 280;
    const mh = 140;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0xFACC15);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 24);
    this.font.drawString(g, 'MỞ THÊM ĐẤT TRỒNG', mx + Math.floor(mw / 2), my + 5, 2);

    const plotNum = this.model.landSize + 1;
    this.font.drawString(g, `Bạn có muốn mở ô đất thứ ${plotNum}?`, mx + Math.floor(mw / 2), my + 45, 2);
    this.font.drawString(g, 'Giá mở: 500 Xu từ tài khoản của bạn', mx + Math.floor(mw / 2), my + 68, 2);

    // Button [Đồng ý]
    g.setColor(0x16A34A);
    g.fillRect(mx + 20, my + 95, 100, 28);
    g.setColor(0xFFFFFF);
    this.font.drawString(g, 'Đồng ý', mx + 70, my + 102, 2);

    // Button [Hủy]
    g.setColor(0xDC2626);
    g.fillRect(mx + mw - 120, my + 95, 100, 28);
    g.setColor(0xFFFFFF);
    this.font.drawString(g, 'Hủy bỏ', mx + mw - 70, my + 102, 2);
  }

  // --- Pointer & Input Handling ---

  public pointerPressed(screenX: number, screenY: number): void {
    const w = this.screenW;
    const h = this.screenH;

    // 1. Handle Active Modals
    if (this.isMenuOpen) {
      this.handleMenuClick(screenX, screenY, w, h);
      return;
    }
    if (this.controller.isSeedPickerOpen) {
      this.handleSeedPickerClick(screenX, screenY, w, h);
      return;
    }
    if (this.controller.isShopOpen) {
      this.handleShopClick(screenX, screenY, w, h);
      return;
    }
    if (this.controller.isWarehouseOpen) {
      this.handleWarehouseClick(screenX, screenY, w, h);
      return;
    }
    if (this.isConfirmOpenLand) {
      this.handleConfirmOpenLandClick(screenX, screenY, w, h);
      return;
    }

    // 2. Handle HUD clicks (Top Left Menu [ = ], Mail [ ✉ ], Top Softkeys)
    if (screenY <= 32) {
      if (screenX <= 32) {
        // Toggle Menu
        this.isMenuOpen = !this.isMenuOpen;
        return;
      }
      if (screenX > 32 && screenX <= 64) {
        // Mail notification
        this.feedbackText = 'Bạn chưa có thư mới nào từ bưu điện!';
        this.feedbackTimer = 80;
        return;
      }
    }

    // 3. Handle Bottom Softkeys (Menu, Chọn, Về phố)
    const barH = 28;
    if (screenY >= h - barH) {
      if (screenX <= 80) {
        // Left: Menu
        this.isMenuOpen = true;
        return;
      }
      if (screenX >= w - 80) {
        // Right: Về phố
        if (this.onExitToWorldMap) {
          this.onExitToWorldMap();
        }
        return;
      }
      // Center: Chọn current focused plot
      this.controller.handleCellClick(this.controller.focusedCellIndex);
      return;
    }

    // 4. World Coordinates (Account for Camera translation)
    const worldX = screenX + this.cameraX;
    const worldY = screenY + this.cameraY;

    // Check click on Exit Signpost (x = 800..860, y = 680..755)
    if (worldX >= 800 && worldX <= 860 && worldY >= 680 && worldY <= 755) {
      if (this.onExitToWorldMap) {
        this.onExitToWorldMap();
      }
      return;
    }

    // Check click on Next Locked Plot ("MUA" signpost at plot index === landSize)
    if (this.model.landSize < this.model.maxLandPlots) {
      const nextPlot = this.model.lands[this.model.landSize];
      if (nextPlot) {
        if (
          worldX >= nextPlot.posX - 4 &&
          worldX <= nextPlot.posX + FarmModel.CELL_WIDTH + 4 &&
          worldY >= nextPlot.posY - 4 &&
          worldY <= nextPlot.posY + FarmModel.CELL_HEIGHT + 4
        ) {
          this.localPlayer.targetX = nextPlot.posX + 24;
          this.localPlayer.targetY = nextPlot.posY + 24;
          this.isConfirmOpenLand = true;
          return;
        }
      }
    }

    // Check click on Land Plots
    const clickedPlotIdx = this.findPlotAt(worldX, worldY);
    if (clickedPlotIdx >= 0) {
      const plot = this.model.lands[clickedPlotIdx];
      this.localPlayer.targetX = plot.posX + 24;
      this.localPlayer.targetY = plot.posY + 24;
      this.controller.handleCellClick(clickedPlotIdx);
      return;
    }

    // Otherwise, move player to tapped position (clamped to walkable farm boundaries)
    this.localPlayer.targetX = Math.max(50, Math.min(1960, worldX));
    this.localPlayer.targetY = Math.max(460, Math.min(715, worldY));
  }

  private findPlotAt(worldX: number, worldY: number): number {
    for (let i = 0; i < this.model.lands.length; i++) {
      const p = this.model.lands[i];
      if (
        worldX >= p.posX &&
        worldX <= p.posX + FarmModel.CELL_WIDTH &&
        worldY >= p.posY &&
        worldY <= p.posY + FarmModel.CELL_HEIGHT
      ) {
        return i;
      }
    }
    return -1;
  }

  private handleMenuClick(screenX: number, screenY: number, w: number, h: number): void {
    const items = ['plant', 'harvest', 'open_land', 'shop', 'warehouse', 'exit'];
    const mw = 180;
    const mh = items.length * 28 + 32;
    const mx = 10;
    const my = h - mh - 28;

    if (screenX < mx || screenX > mx + mw || screenY < my || screenY > my + mh) {
      this.isMenuOpen = false;
      return;
    }

    const clickedIdx = Math.floor((screenY - (my + 24)) / 28);
    this.isMenuOpen = false;

    if (clickedIdx === 0) {
      // Gieo hạt
      this.controller.isSeedPickerOpen = true;
    } else if (clickedIdx === 1) {
      // Thu hoạch cây chín
      this.controller.harvestAllMature();
    } else if (clickedIdx === 2) {
      // Mở đất
      this.isConfirmOpenLand = true;
    } else if (clickedIdx === 3) {
      // Cửa hàng
      this.controller.isShopOpen = true;
    } else if (clickedIdx === 4) {
      // Nhà kho
      this.controller.isWarehouseOpen = true;
    } else if (clickedIdx === 5) {
      // Rời nông trại
      if (this.onExitToWorldMap) this.onExitToWorldMap();
    }
  }

  private handleSeedPickerClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(260, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Close [X] or outside
    if (x >= mx + mw - 25 && x <= mx + mw && y >= my && y <= my + 26) {
      this.controller.isSeedPickerOpen = false;
      return;
    }
    if (x < mx || x > mx + mw || y < my || y > my + mh) {
      this.controller.isSeedPickerOpen = false;
      return;
    }

    const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
    let yOff = my + 34;
    for (const [seedId, count] of seeds) {
      if (y >= yOff && y <= yOff + 28) {
        this.controller.selectSeed(seedId);
        return;
      }
      yOff += 32;
      if (yOff > my + mh - 34) break;
    }
  }

  private handleShopClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(340, w - 20);
    const mh = Math.min(270, h - 50);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 25 && x <= mx + mw && y >= my && y <= my + 26) {
      this.controller.isShopOpen = false;
      return;
    }
    if (x < mx || x > mx + mw || y < my || y > my + mh) {
      this.controller.isShopOpen = false;
      return;
    }

    const crops = Object.values(CROP_DEFINITIONS);
    let yOff = my + 32;
    for (const c of crops) {
      if (y >= yOff && y <= yOff + 28 && x >= mx + mw - 80) {
        if (this.model.userXu < c.seedPriceXu) {
          if (this.controller.onActionFeedback) {
            this.controller.onActionFeedback('Bạn không đủ Xu để mua hạt giống này!', '#ef4444');
          }
          return;
        }
        this.handler.buySeed(c.id, 1, 1);
        if (this.controller.onActionFeedback) {
          this.controller.onActionFeedback(`Đã mua 1 hạt giống ${c.name}!`, '#4ade80');
        }
        return;
      }
      yOff += 32;
      if (yOff > my + mh - 34) break;
    }
  }

  private handleWarehouseClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(250, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 25 && x <= mx + mw && y >= my && y <= my + 26) {
      this.controller.isWarehouseOpen = false;
      return;
    }
    if (x < mx || x > mx + mw || y < my || y > my + mh) {
      this.controller.isWarehouseOpen = false;
      return;
    }
  }

  private handleConfirmOpenLandClick(x: number, y: number, w: number, h: number): void {
    const mw = 280;
    const mh = 140;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Button [Đồng ý]
    if (x >= mx + 20 && x <= mx + 120 && y >= my + 95 && y <= my + 125) {
      this.isConfirmOpenLand = false;
      this.handler.openLand(1); // 1 = Xu
      if (this.controller.onActionFeedback) {
        this.controller.onActionFeedback('Đang gửi yêu cầu mở ô đất lên máy chủ...', '#facc15');
      }
      return;
    }

    // Button [Hủy] or outside
    if ((x >= mx + mw - 120 && x <= mx + mw - 20 && y >= my + 95 && y <= my + 125) ||
        x < mx || x > mx + mw || y < my || y > my + mh) {
      this.isConfirmOpenLand = false;
      return;
    }
  }
}

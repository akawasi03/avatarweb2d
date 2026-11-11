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
  public isKitchenOpen = false;
  public isBarnOpen = false;
  public isStarfruitOpen = false;
  public isPondOpen = false;
  public isCropActionOpen = false;
  public selectedPlotIndex = 0;

  // Dialog selection states
  public selectedMenuIndex = 0;
  public selectedKitchenRecipe = 0;
  public selectedBarnAction = 0;
  public selectedStarfruitAction = 0;
  public selectedPondAction = 0;
  public selectedCropAction = 0;
  public selectedShopTab: 'seeds' | 'animals' | 'fertilizer' = 'seeds';
  public selectedShopIndex = 0;
  public shopQuantity = 1;

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

    // Initial player position: standing on the dirt path near farm entrance (x=888, y=670)
    this.localPlayer = {
      id: this.handler.network.myUserId || 1,
      name: 'Nông dân',
      x: 888,
      y: 670,
      targetX: 888,
      targetY: 670,
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
      console.error('[FarmScreen] Failed to load Map 25 binary:', err);
    });

    this.loadAssets().catch((err) => {
      console.error('[FarmScreen] Failed to load farm assets:', err);
    });
  }

  private async loadAssets(): Promise<void> {
    await Promise.all([
      this.preloadSprite('clouds_day', '/assets/bg/clouds_farm_day.png'),
      this.preloadSprite('clouds_night', '/assets/bg/clouds_farm_night.png'),
      this.preloadSprite('horizon_day', '/assets/bg/horizon_farm_day.png'),
      this.preloadSprite('horizon_night', '/assets/bg/horizon_farm_night.png'),
      this.preloadSprite('tileset_day', '/assets/tileset/tileset_hd_day.png'),
      this.preloadSprite('tileset_night', '/assets/tileset/tileset_hd_night.png'),
      this.preloadSprite('soil_cracked', '/assets/farm_ui/soil_cracked.png'),
      this.preloadSprite('gate847', '/assets/home/847.png'),
      this.preloadSprite('mua848', '/assets/home/848.png'),
      this.preloadSprite('tree244', '/assets/home/244.png'),
      this.preloadSprite('pond840', '/assets/home/840.png'),
      this.preloadSprite('tree834', '/assets/farm/43.png'),
      this.preloadSprite('starfruit', '/assets/farm/46.png'),
      this.preloadSprite('nha_bep', '/assets/home/1029.png'),
      this.preloadSprite('chuong_lon', '/assets/home/834.png'),
      this.preloadSprite('fence838', '/assets/home/838.png'),
      this.preloadSprite('fence839', '/assets/home/839.png'),
      this.preloadSprite('coin', '/assets/farm_ui/coin.png')
    ]);
  }

  private async loadMap25(): Promise<void> {
    try {
      const res = await fetch('/assets/maps/25');
      if (res.ok) {
        const buf = await res.arrayBuffer();
        const u8 = new Uint8Array(buf);
        const count = Math.min(336, u8.length);
        for (let i = 0; i < count; i++) {
          const val = u8[i];
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

      // Authentic Farm Map 25 boundaries: width 2016px, walkable ground height 420..715px
      this.localPlayer.x = Math.max(50, Math.min(1960, nextX));
      this.localPlayer.y = Math.max(420, Math.min(715, nextY));
      this.localPlayer.state = 'walk';

      if (Math.abs(dx) > Math.abs(dy)) {
        this.localPlayer.dir = dx > 0 ? 3 : 2; // 3: Right, 2: Left
      } else {
        this.localPlayer.dir = dy > 0 ? 0 : 1; // 0: Down, 1: Up
      }
      this.localPlayer.frame = 1 + (Math.floor(this.animTick / 3) % 4);

      // Mid-walk trigger check
      this.checkMidWalkTriggers();
    } else {
      this.localPlayer.x = this.localPlayer.targetX;
      this.localPlayer.y = this.localPlayer.targetY;
      this.localPlayer.state = 'idle';
      this.localPlayer.frame = 0;
      this.checkTriggerZones();
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

  /**
   * Fast trigger check while walking through doorways or exit
   */
  private checkMidWalkTriggers(): void {
    const px = this.localPlayer.x;
    const py = this.localPlayer.y;

    // Exit threshold
    if (Math.abs(px - 888) <= 45 && py >= 660) {
      if (this.onExitToWorldMap) this.onExitToWorldMap();
    }
  }

  /**
   * Check interactive zones when player stops walking
   */
  private checkTriggerZones(): void {
    const px = this.localPlayer.x;
    const py = this.localPlayer.y;

    // 1. Exit Path & Wooden Sign back to Cổng Nông Trại
    if (Math.abs(px - 888) <= 55 && py >= 640) {
      if (this.onExitToWorldMap) {
        this.onExitToWorldMap();
      }
      return;
    }

    // 2. Doorway into Nhà Bếp
    if (Math.abs(px - 502) <= 45 && Math.abs(py - 430) <= 30) {
      this.isKitchenOpen = true;
      return;
    }

    // 3. Doorway into Chuồng Rơm
    if (Math.abs(px - 691) <= 45 && Math.abs(py - 430) <= 30) {
      this.isBarnOpen = true;
      return;
    }

    // 4. Beside Cây Khế
    if (Math.abs(px - 810) <= 50 && Math.abs(py - 460) <= 35) {
      this.isStarfruitOpen = true;
      return;
    }

    // 5. Beside Ao Cá
    if (px >= 1450 && px <= 1750 && py >= 480 && py <= 600) {
      this.isPondOpen = true;
      return;
    }
  }

  // --- Rendering Pipeline (WebGL2 Native Procedural Map 25 Engine) ---

  public paint(g: Graphics): void {
    const w = this.screenW;
    const h = this.screenH;

    const isForcedDay = typeof window !== 'undefined' && (new URLSearchParams(window.location.search).has('day') || (window as any).__FORCE_DAY);
    const hour = new Date().getHours();
    this.isNight = isForcedDay ? false : (hour >= 18 || hour < 6);

    // 1. Clear Screen with Vivid Day / Night Sky Color
    if (this.isNight) {
      g.setColor(0x000015);
    } else {
      g.setColor(0x5DBEF7);
    }
    g.fillRect(0, 0, w, h);

    // 2. Parallax Sky Clouds
    const cloudSuffix = this.isNight ? 'night' : 'day';
    const cloudsImg = this.spriteCache.get(`clouds_${cloudSuffix}`);
    if (cloudsImg) {
      const cw = cloudsImg.getWidth();
      const paraX = -Math.floor(this.cameraX * 0.15) % cw;
      const startX = paraX > 0 ? paraX - cw : paraX;
      for (let cx = startX; cx < w; cx += cw) {
        g.drawImage(cloudsImg, cx, Math.max(0, 100 - this.cameraY), 0);
      }
    }

    // 3. Parallax Green Horizon
    const horSuffix = this.isNight ? 'night' : 'day';
    const horizonImg = this.spriteCache.get(`horizon_${horSuffix}`);
    if (horizonImg) {
      const hw = horizonImg.getWidth();
      const paraX = -Math.floor(this.cameraX * 0.35) % hw;
      const startX = paraX > 0 ? paraX - hw : paraX;
      const horY = Math.max(0, 360 - this.cameraY);
      for (let hx = startX; hx < w; hx += hw) {
        g.drawImage(horizonImg, hx, horY, 0);
      }
    }

    // Apply Camera Translation for World-Space Elements
    g.translate(-this.cameraX, -this.cameraY);

    // 4. Paint Tilemap Base
    this.paintTilemap(g);

    // 5. Paint Scenery Objects (Buildings, Trees, Pond, Fence, Signs)
    this.paintSceneryObjects(g);

    // 6. Paint Land Plots & Crops
    this.paintLandPlots(g);

    // 7. Paint Animals
    this.paintAnimals(g);

    // 8. Paint Player Avatar
    this.paintPlayer(g);

    // 9. Paint Overlays (Guide arrows, wooden nameplates)
    this.paintFarmOverlays(g);

    // Restore Camera Translation for Screen-Space HUD & Modals
    g.translate(this.cameraX, this.cameraY);

    // 10. Paint HUD
    this.paintHUD(g, w, h);

    // 11. Paint Floating Feedback Toast
    if (this.feedbackTimer > 0) {
      this.paintNotificationToast(g, w, h);
    }

    // 12. Paint Active Modals
    this.paintModals(g, w, h);
  }

  private paintTilemap(g: Graphics): void {
    const suffix = this.isNight ? 'night' : 'day';
    const tileSheet = this.spriteCache.get(`tileset_${suffix}`) || this.spriteCache.get('tileset_day');
    if (!tileSheet || !this.isMapLoaded) return;

    const tileSize = 48;
    const groundY = 388;
    const numRowsInTileset = 18;

    const startCol = Math.max(0, Math.floor(this.cameraX / tileSize));
    const endCol = Math.min(42, Math.ceil((this.cameraX + this.screenW) / tileSize));

    for (let r = 0; r < 8; r++) {
      const destY = groundY + r * tileSize;
      for (let c = startCol; c < endCol; c++) {
        const tileIdx = this.mapTiles[r * 42 + c];
        if (tileIdx >= 0) {
          const tc = Math.floor(tileIdx / numRowsInTileset);
          const tr = tileIdx % numRowsInTileset;
          const destX = c * tileSize;
          const srcX = tc * tileSize;
          const srcY = tr * tileSize;
          g.drawRegion(tileSheet, srcX, srcY, tileSize, tileSize, 0, destX, destY, 0);
        }
      }
    }
  }

  private paintSceneryObjects(g: Graphics): void {
    const tree244 = this.spriteCache.get('tree244');
    if (tree244) {
      g.drawImage(tree244, -30, 320, 0);
      g.drawImage(tree244, 1344, 320, 0);
      g.drawImage(tree244, 1860, 320, 0);
    }

    const nhaBep = this.spriteCache.get('nha_bep');
    if (nhaBep) {
      g.drawImage(nhaBep, 418, 428, 0);
    }

    const chuongLon = this.spriteCache.get('chuong_lon');
    if (chuongLon) {
      g.drawImage(chuongLon, 602, 432, 0);
    }

    const treeImg = this.spriteCache.get('tree834');
    if (treeImg) {
      g.drawImage(treeImg, 842, 440, 0);
      const starfruit = this.spriteCache.get('starfruit');
      if (starfruit) {
        g.drawImage(starfruit, 882, 510, 0);
        g.drawImage(starfruit, 898, 524, 0);
        g.drawImage(starfruit, 922, 518, 0);
        g.drawImage(starfruit, 940, 528, 0);
      }
      this.font.drawString(g, 'Lv1', 948, 416, 2);
    }

    const pondImg = this.spriteCache.get('pond840');
    if (pondImg) {
      g.drawImage(pondImg, 1618, 520, 0);
    }

    const gateImg = this.spriteCache.get('gate847');
    if (gateImg) {
      g.drawImage(gateImg, 888, 652, 0);
    }
  }

  private paintFarmOverlays(g: Graphics): void {
    const arrowBounce = Math.floor((this.animTick % 12) / 4);

    // 1. "Vào" Arrow above Nhà Bếp
    this.paintYellowArrow(g, 502, 422 + arrowBounce, 'Vào');

    // 2. "Vào" Arrow above Chuồng Rơm
    this.paintYellowArrow(g, 691, 420 + arrowBounce, 'Vào');

    // 3. "Vào" Arrow above Exit Sign
    this.paintYellowArrow(g, 888, 666 + arrowBounce, 'Vào');

    // Nameplate above Exit Sign
    const name = this.localPlayer.name || 'akawasi..';
    const plateText = name.length > 7 ? name.substring(0, 6) + '..' : name;
    this.font.drawString(g, plateText, 888, 674, 2);
  }

  private paintYellowArrow(g: Graphics, x: number, y: number, text: string): void {
    this.font.drawString(g, text, x, y - 10, 2);
    g.setColor(0xFACC15);
    for (let row = 0; row < 6; row++) {
      g.fillRect(x - (5 - row), y + row, (5 - row) * 2 + 1, 1);
    }
  }

  private paintLandPlots(g: Graphics): void {
    const soilImg = this.spriteCache.get('soil_cracked');
    const muaImg = this.spriteCache.get('mua848');

    for (let i = 0; i < this.model.lands.length; i++) {
      const plot = this.model.lands[i];
      const px = plot.posX;
      const py = plot.posY;

      if (plot.type !== -2 && soilImg) {
        g.drawImage(soilImg, px, py, 0);
      }

      if (plot.type === -2 && i === this.model.landSize && muaImg) {
        g.drawImage(muaImg, px + 10, py + 12, 0);
      }

      if (plot.type >= 0) {
        const meta = CROP_DEFINITIONS[plot.type];
        if (meta) {
          const stage = this.model.getGrowthStage(plot);
          const spriteId = meta.stageImgs[stage] ?? meta.stageImgs[0];
          const cropImg = this.getCropSprite(spriteId);
          if (cropImg) {
            const cx = px + Math.floor((FarmModel.CELL_WIDTH - cropImg.getWidth()) / 2);
            const cy = py + FarmModel.CELL_HEIGHT - cropImg.getHeight() - 4;
            g.drawImage(cropImg, cx, cy, 0);
          }
        }
      }
    }
  }

  private paintAnimals(g: Graphics): void {
    for (const a of this.model.animals) {
      const animalSprite = this.loadSprite(`animal_${a.id}`, `/assets/farm/${a.id}.png`);
      if (animalSprite) {
        g.drawImage(animalSprite, Math.round(a.x), Math.round(a.y), 0);
      } else {
        g.setColor(0xFACC15);
        g.fillArc(Math.round(a.x), Math.round(a.y), 16, 12, 0, 360);
      }
    }
  }

  private paintPlayer(g: Graphics): void {
    const px = Math.round(this.localPlayer.x);
    const py = Math.round(this.localPlayer.y);

    g.setColor(0x111827);
    g.fillArc(px - 9, py - 2, 18, 6, 0, 360);

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

  private paintHUD(g: Graphics, w: number, h: number): void {
    const coinImg = this.spriteCache.get('coin');

    // Menu button [ = ]
    g.setColor(0x1E293B);
    g.fillRect(6, 6, 26, 22);
    g.setColor(0x64748B);
    g.drawRect(6, 6, 26, 22);
    g.setColor(0xFFFFFF);
    g.fillRect(10, 11, 18, 2);
    g.fillRect(10, 16, 18, 2);
    g.fillRect(10, 21, 18, 2);

    // Mail icon [ ✉ ]
    g.setColor(0x1E293B);
    g.fillRect(38, 6, 26, 22);
    g.setColor(0x64748B);
    g.drawRect(38, 6, 26, 22);
    g.setColor(0xFFFFFF);
    this.font.drawString(g, '✉', 51, 10, 2);

    // Top Center Title
    const title = this.model.ownerName ? `Nông trại của ${this.model.ownerName}` : 'Nông trại của bạn (Cấp 1)';
    this.font.drawString(g, title, Math.floor(w / 2), 10, 2);

    // Top Right Xu Balance
    const xuVal = Number(this.model.userXu || 0);
    const xuStr = `${xuVal.toLocaleString('vi-VN')} Xu`;
    const textW = xuStr.length * 7;
    const startX = w - textW - 32;

    if (coinImg) {
      g.drawImage(coinImg, startX, 8, 0);
    }
    this.font.drawString(g, xuStr, startX + 22, 10, 0);
  }

  private paintNotificationToast(g: Graphics, w: number, h: number): void {
    const toastW = Math.min(w - 40, this.feedbackText.length * 8 + 24);
    const tx = Math.floor((w - toastW) / 2);
    const ty = 34;

    g.setColor(0x0F172A);
    g.fillRect(tx, ty, toastW, 22);
    g.setColor(0xFACC15);
    g.drawRect(tx, ty, toastW, 22);

    this.font.drawString(g, this.feedbackText, Math.floor(w / 2), ty + 5, 2);
  }

  // =========================================================================
  // Authentic 1:1 J2ME Dialogs & Modals
  // =========================================================================

  private paintModals(g: Graphics, w: number, h: number): void {
    if (this.isMenuOpen) {
      this.paintMenuModal(g, w, h);
    } else if (this.isKitchenOpen) {
      this.paintKitchenModal(g, w, h);
    } else if (this.isBarnOpen) {
      this.paintBarnModal(g, w, h);
    } else if (this.isStarfruitOpen) {
      this.paintStarfruitModal(g, w, h);
    } else if (this.isPondOpen) {
      this.paintPondModal(g, w, h);
    } else if (this.isCropActionOpen) {
      this.paintCropActionModal(g, w, h);
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
   * 1. Authentic Quick Menu
   */
  private paintMenuModal(g: Graphics, w: number, h: number): void {
    const mw = 220;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'NÔNG TRẠI');

    const items = [
      '1. Gieo hạt giống',
      '2. Thu hoạch tất cả cây chín',
      '3. Mở thêm ô đất trồng',
      '4. Cửa Hàng Hạt Giống',
      '5. Nhà Kho Nông Sản',
      '6. Nấu ăn (Nhà Bếp)',
      '7. Chuồng Nuôi Gia Súc',
      '8. Trở về Cổng Nông Trại'
    ];

    let rowY = my + 32;
    for (let i = 0; i < items.length; i++) {
      const isSel = i === this.selectedMenuIndex;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 22, items[i], isSel);
      rowY += 24;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 12, my + mh - 26, 90, 20, 'Chọn', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 102, my + mh - 26, 90, 20, 'Đóng', 'secondary');
  }

  /**
   * 2. Authentic Nhà Bếp (Cooking Recipes) Dialog
   */
  private paintKitchenModal(g: Graphics, w: number, h: number): void {
    const mw = 320;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'NHÀ BẾP NÔNG TRẠI');

    this.font.drawString(g, 'Công thức nấu ăn từ nông sản tự trồng:', mx + 12, my + 34, 0);

    const recipes = [
      { name: '1. Cơm chiên trứng', req: '1 Trứng + 2 Cà chua', exp: '+50 NL' },
      { name: '2. Canh chua cá lóc', req: '1 Cá + 2 Cà chua + 1 Dứa', exp: '+80 NL' },
      { name: '3. Nước ép dưa hấu', req: '3 Dưa hấu', exp: '+30 NL' },
      { name: '4. Bắp xào bơ', req: '3 Bắp + 1 Bơ', exp: '+40 NL' },
      { name: '5. Trứng ốp la', req: '2 Trứng', exp: '+25 NL' }
    ];

    let rowY = my + 52;
    for (let i = 0; i < recipes.length; i++) {
      const r = recipes[i];
      const isSel = i === this.selectedKitchenRecipe;
      const text = `${r.name} (${r.req})`;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, r.exp);
      rowY += 28;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 28, 130, 22, 'Nấu món ăn', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 146, my + mh - 28, 130, 22, 'Đóng', 'secondary');
  }

  /**
   * 3. Authentic Chuồng Rơm (Livestock / Barn) Dialog
   */
  private paintBarnModal(g: Graphics, w: number, h: number): void {
    const mw = 310;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CHUỒNG NUÔI GIA SÚC');

    this.font.drawString(g, 'Tình trạng: 2 Heo, 1 Bò, 4 Gà (Khỏe mạnh)', mx + 12, my + 34, 0);

    const actions = [
      '1. Cho gia súc, gia cầm ăn',
      '2. Thu hoạch trứng gà & vắt sữa bò',
      '3. Tiêm phòng dịch bệnh & tăng đề kháng',
      '4. Dọn dẹp vệ sinh chuồng trại',
      '5. Mua thêm con giống vào chuồng'
    ];

    let rowY = my + 54;
    for (let i = 0; i < actions.length; i++) {
      const isSel = i === this.selectedBarnAction;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
      rowY += 26;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 125, 20, 'Thực hiện', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 141, my + mh - 26, 125, 20, 'Đóng', 'secondary');
  }

  /**
   * 4. Authentic Cây Khế Dialog
   */
  private paintStarfruitModal(g: Graphics, w: number, h: number): void {
    const mw = 300;
    const mh = 240;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CÂY KHẾ NÔNG TRẠI');

    this.font.drawString(g, 'Cây Khế Cấp 1: Có 10 trái khế chín vàng mọng', mx + 12, my + 34, 0);

    const actions = [
      '1. Thu hoạch khế chín (+500 Xu)',
      '2. Tưới nước chăm sóc cây khế',
      '3. Bón phân hữu cơ (+100 EXP Nông Trại)',
      '4. Nâng cấp lên Cấp 2 (10.000 Xu)'
    ];

    let rowY = my + 56;
    for (let i = 0; i < actions.length; i++) {
      const isSel = i === this.selectedStarfruitAction;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
      rowY += 26;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 120, 20, 'Chọn', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 136, my + mh - 26, 120, 20, 'Đóng', 'secondary');
  }

  /**
   * 5. Authentic Ao Cá Dialog
   */
  private paintPondModal(g: Graphics, w: number, h: number): void {
    const mw = 300;
    const mh = 240;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'AO CÁ NÔNG TRẠI');

    this.font.drawString(g, 'Tình trạng: 5 cá chép đang bơi lội, nước trong lành', mx + 12, my + 34, 0);

    const actions = [
      '1. Thả thêm cá giống mới (1.000 Xu)',
      '2. Rải thức ăn cho cá',
      '3. Vớt cá lớn / Thu hoạch (+thịt cá)',
      '4. Mở rộng diện tích ao cá'
    ];

    let rowY = my + 56;
    for (let i = 0; i < actions.length; i++) {
      const isSel = i === this.selectedPondAction;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
      rowY += 26;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 120, 20, 'Thực hiện', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 136, my + mh - 26, 120, 20, 'Đóng', 'secondary');
  }

  /**
   * 6. Authentic Chăm Sóc Ô Đất Dialog
   */
  private paintCropActionModal(g: Graphics, w: number, h: number): void {
    const mw = 310;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    const plot = this.model.lands[this.selectedPlotIndex];
    const meta = plot ? CROP_DEFINITIONS[plot.type] : undefined;
    const cropName = meta ? meta.name : 'Cây trồng';
    const stage = plot ? this.model.getGrowthStage(plot) : 0;
    const stageNames = ['Hạt mầm', 'Nảy mầm', 'Cây non', 'Cây lớn', 'Trổ hoa', 'Kết trái', 'Chín vàng'];
    const stageText = stageNames[Math.min(stage, 6)];

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, `CHĂM SÓC Ô ĐẤT #${this.selectedPlotIndex + 1}`);

    this.font.drawString(g, `Cây: ${cropName} | Giai đoạn: ${stageText}`, mx + 12, my + 34, 0);

    const actions = [
      '1. Tưới nước bổ sung độ ẩm',
      '2. Bón phân (giảm 50% thời gian chín)',
      '3. Bắt sâu bọ & làm cỏ dại',
      '4. Thu hoạch nông sản (nếu đã chín)',
      '5. Cuốc đất / Phá bỏ cây'
    ];

    let rowY = my + 54;
    for (let i = 0; i < actions.length; i++) {
      const isSel = i === this.selectedCropAction;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
      rowY += 26;
    }

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 125, 20, 'Thực hiện', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 141, my + mh - 26, 125, 20, 'Đóng', 'secondary');
  }

  /**
   * 7. Authentic Chọn Hạt Giống Dialog
   */
  private paintSeedPickerModal(g: Graphics, w: number, h: number): void {
    const mw = 320;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CHỌN HẠT GIỐNG ĐỂ GIEO');

    const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
    if (seeds.length === 0) {
      this.font.drawString(g, 'Kho của bạn chưa có hạt giống nào!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Hãy vào Cửa Hàng để mua hạt giống.', mx + Math.floor(mw / 2), my + 85, 2);
      this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, 'Đóng', 'secondary');
      return;
    }

    let yOff = my + 36;
    for (const [seedId, count] of seeds) {
      const meta = CROP_DEFINITIONS[seedId];
      const name = meta ? meta.name : `Hạt #${seedId}`;
      const text = `${name} (Còn lại: ${count})`;
      this.skinPainter.paintAuthenticOption(g, mx + 8, yOff, mw - 16, 26, text, false, 'Gieo hạt');
      yOff += 28;
      if (yOff > my + mh - 36) break;
    }

    this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, 'Đóng', 'secondary');
  }

  /**
   * 8. Authentic Cửa Hàng Hạt Giống Dialog
   */
  private paintShopModal(g: Graphics, w: number, h: number): void {
    const mw = 340;
    const mh = 280;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CỬA HÀNG NÔNG TRẠI');

    // Tabs
    const tabW = Math.floor((mw - 24) / 3);
    const tabY = my + 32;

    const tabs: Array<{ id: 'seeds' | 'animals' | 'fertilizer'; label: string }> = [
      { id: 'seeds', label: 'Hạt giống' },
      { id: 'animals', label: 'Vật nuôi' },
      { id: 'fertilizer', label: 'Phân bón' }
    ];

    for (let i = 0; i < tabs.length; i++) {
      const t = tabs[i];
      const isSelected = this.selectedShopTab === t.id;
      const tx = mx + 12 + i * tabW;

      g.setColor(isSelected ? 0xFBBF24 : 0xFEF3C7);
      g.fillRect(tx, tabY, tabW - 4, 20);
      g.setColor(isSelected ? 0xD97706 : 0x78350F);
      g.drawRect(tx, tabY, tabW - 4, 20);
      this.font.drawString(g, t.label, tx + Math.floor((tabW - 4) / 2), tabY + 4, 2);
    }

    // Items
    let items: Array<{ id: number; name: string; price: number; detail: string }> = [];
    if (this.selectedShopTab === 'seeds') {
      items = Object.values(CROP_DEFINITIONS).map(c => ({
        id: c.id,
        name: c.name,
        price: c.seedPriceXu,
        detail: `${c.growMinutes} phút`
      }));
    } else if (this.selectedShopTab === 'animals') {
      items = [
        { id: 1, name: 'Gà con', price: 5000, detail: 'Lấy trứng' },
        { id: 2, name: 'Vịt con', price: 4000, detail: 'Lấy trứng' },
        { id: 3, name: 'Heo giống', price: 10000, detail: 'Lấy thịt' },
        { id: 4, name: 'Bò sữa giống', price: 20000, detail: 'Vắt sữa' }
      ];
    } else {
      items = [
        { id: 1, name: 'Phân bón loại 1', price: 500, detail: '-50% thời gian' },
        { id: 2, name: 'Thuốc trừ sâu', price: 300, detail: 'Diệt sâu bọ' },
        { id: 3, name: 'Thuốc hồi phục', price: 400, detail: 'Hồi sinh cây' }
      ];
    }

    let rowY = my + 58;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const isSel = i === this.selectedShopIndex;
      const text = `${item.name} (${item.detail})`;
      const priceText = `${item.price.toLocaleString('vi-VN')} Xu`;

      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, priceText);
      rowY += 28;
    }

    // Bottom Quantity & Action Buttons
    const botY = my + mh - 30;

    g.setColor(0xFEF3C7);
    g.fillRect(mx + 12, botY, 70, 22);
    g.setColor(0x78350F);
    g.drawRect(mx + 12, botY, 70, 22);

    this.font.drawString(g, '-', mx + 20, botY + 4, 2);
    this.font.drawString(g, `${this.shopQuantity}`, mx + 47, botY + 4, 2);
    this.font.drawString(g, '+', mx + 74, botY + 4, 2);

    this.skinPainter.paintAuthenticButton(g, mx + 95, botY, 115, 22, 'Mua vật phẩm', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 110, botY, 98, 22, 'Đóng', 'secondary');
  }

  /**
   * 9. Authentic Nhà Kho Nông Sản Dialog
   */
  private paintWarehouseModal(g: Graphics, w: number, h: number): void {
    const mw = 320;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'NHÀ KHO NÔNG SẢN');

    const cropEntries = Array.from(this.model.crops.entries()).filter(([_, c]) => c > 0);
    if (cropEntries.length === 0) {
      this.font.drawString(g, 'Nhà kho hiện tại đang trống!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Hãy gieo trồng và thu hoạch để có nông sản.', mx + Math.floor(mw / 2), my + 85, 2);
      this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, 'Đóng', 'secondary');
      return;
    }

    let yOff = my + 36;
    for (const [cropId, count] of cropEntries) {
      const meta = CROP_DEFINITIONS[cropId];
      const name = meta ? meta.name : `Nông sản #${cropId}`;
      const sellTotal = count * (meta ? meta.sellPriceXu : 10);
      const text = `${name}: ${count} củ/quả`;
      const priceText = `Bán: ${sellTotal.toLocaleString('vi-VN')} Xu`;

      this.skinPainter.paintAuthenticOption(g, mx + 8, yOff, mw - 16, 26, text, false, priceText);
      yOff += 28;
      if (yOff > my + mh - 36) break;
    }

    this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, 'Đóng', 'secondary');
  }

  /**
   * 10. Authentic Mở Thêm Ô Đất Dialog
   */
  private paintConfirmOpenLandModal(g: Graphics, w: number, h: number): void {
    const mw = 280;
    const mh = 150;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'MỞ THÊM ĐẤT TRỒNG');

    const plotNum = this.model.landSize + 1;
    this.font.drawString(g, `Bạn có muốn mở ô đất thứ ${plotNum}?`, mx + Math.floor(mw / 2), my + 45, 2);
    this.font.drawString(g, 'Giá mở: 500 Xu từ tài khoản của bạn', mx + Math.floor(mw / 2), my + 68, 2);

    this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 30, 115, 24, 'Đồng ý', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 131, my + mh - 30, 115, 24, 'Hủy bỏ', 'secondary');
  }

  // =========================================================================
  // Pointer & Input Handling
  // =========================================================================

  public pointerPressed(screenX: number, screenY: number): void {
    const w = this.screenW;
    const h = this.screenH;

    // 1. Handle Active Modals
    if (this.isMenuOpen) {
      this.handleMenuClick(screenX, screenY, w, h);
      return;
    }
    if (this.isKitchenOpen) {
      this.handleKitchenClick(screenX, screenY, w, h);
      return;
    }
    if (this.isBarnOpen) {
      this.handleBarnClick(screenX, screenY, w, h);
      return;
    }
    if (this.isStarfruitOpen) {
      this.handleStarfruitClick(screenX, screenY, w, h);
      return;
    }
    if (this.isPondOpen) {
      this.handlePondClick(screenX, screenY, w, h);
      return;
    }
    if (this.isCropActionOpen) {
      this.handleCropActionClick(screenX, screenY, w, h);
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

    // 2. Handle HUD clicks (Top Left Menu [ = ], Mail [ ✉ ])
    if (screenY <= 32) {
      if (screenX <= 32) {
        this.isMenuOpen = !this.isMenuOpen;
        return;
      }
      if (screenX > 32 && screenX <= 64) {
        this.feedbackText = 'Bạn chưa có thư mới nào từ bưu điện!';
        this.feedbackTimer = 80;
        return;
      }
    }

    // 3. World Coordinates
    const worldX = screenX + this.cameraX;
    const worldY = screenY + this.cameraY;

    // A. Click on Exit Signpost or Exit Path (x = 830..950, y = 620..740)
    if (worldX >= 820 && worldX <= 960 && worldY >= 620 && worldY <= 740) {
      const dist = Math.hypot(this.localPlayer.x - 888, this.localPlayer.y - 670);
      if (dist <= 50) {
        if (this.onExitToWorldMap) this.onExitToWorldMap();
      } else {
        this.localPlayer.targetX = 888;
        this.localPlayer.targetY = 670;
        this.feedbackText = 'Đang tiến ra Cổng Nông Trại...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // B. Click on Nhà Bếp (x: 418..560, y: 350..470)
    if (worldX >= 418 && worldX <= 560 && worldY >= 350 && worldY <= 470) {
      const dist = Math.hypot(this.localPlayer.x - 502, this.localPlayer.y - 430);
      if (dist <= 50) {
        this.isKitchenOpen = true;
      } else {
        this.localPlayer.targetX = 502;
        this.localPlayer.targetY = 430;
        this.feedbackText = 'Đang đến Nhà Bếp...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // C. Click on Chuồng Rơm (x: 602..750, y: 350..470)
    if (worldX >= 602 && worldX <= 750 && worldY >= 350 && worldY <= 470) {
      const dist = Math.hypot(this.localPlayer.x - 691, this.localPlayer.y - 430);
      if (dist <= 50) {
        this.isBarnOpen = true;
      } else {
        this.localPlayer.targetX = 691;
        this.localPlayer.targetY = 430;
        this.feedbackText = 'Đang đến Chuồng Nuôi...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // D. Click on Cây Khế (x: 820..960, y: 380..520)
    if (worldX >= 820 && worldX <= 960 && worldY >= 380 && worldY <= 520) {
      const dist = Math.hypot(this.localPlayer.x - 888, this.localPlayer.y - 480);
      if (dist <= 60) {
        this.isStarfruitOpen = true;
      } else {
        this.localPlayer.targetX = 888;
        this.localPlayer.targetY = 480;
        this.feedbackText = 'Đang đến Cây Khế...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // E. Click on Ao Cá (x: 1550..1850, y: 520..740)
    if (worldX >= 1550 && worldX <= 1850 && worldY >= 520 && worldY <= 740) {
      const dist = Math.hypot(this.localPlayer.x - 1520, this.localPlayer.y - 580);
      if (dist <= 80) {
        this.isPondOpen = true;
      } else {
        this.localPlayer.targetX = 1520;
        this.localPlayer.targetY = 580;
        this.feedbackText = 'Đang đến Ao Cá...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // F. Click on Next Locked Plot ("MUA" signpost)
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

    // G. Click on Land Plots
    const clickedPlotIdx = this.findPlotAt(worldX, worldY);
    if (clickedPlotIdx >= 0) {
      const plot = this.model.lands[clickedPlotIdx];
      this.localPlayer.targetX = plot.posX + 24;
      this.localPlayer.targetY = plot.posY + 24;

      if (plot.type === -1) {
        // Empty plot -> open Seed Picker
        this.controller.focusedCellIndex = clickedPlotIdx;
        this.controller.isSeedPickerOpen = true;
      } else if (plot.type >= 0) {
        // Growing / mature plot -> open Crop Action dialog
        this.selectedPlotIndex = clickedPlotIdx;
        this.isCropActionOpen = true;
      }
      return;
    }

    // H. General Walk-to Click
    this.localPlayer.targetX = Math.max(50, Math.min(1960, worldX));
    this.localPlayer.targetY = Math.max(420, Math.min(715, worldY));
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

  // --- Modal Click Handlers ---

  private handleMenuClick(screenX: number, screenY: number, w: number, h: number): void {
    const mw = 220;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (screenX < mx || screenX > mx + mw || screenY < my || screenY > my + mh) {
      this.isMenuOpen = false;
      return;
    }

    // Close [X]
    if (screenX >= mx + mw - 24 && screenX <= mx + mw && screenY >= my && screenY <= my + 24) {
      this.isMenuOpen = false;
      return;
    }

    let rowY = my + 32;
    for (let i = 0; i < 8; i++) {
      if (screenX >= mx + 8 && screenX <= mx + mw - 8 && screenY >= rowY && screenY <= rowY + 22) {
        this.selectedMenuIndex = i;
        this.executeMenuItem(i);
        return;
      }
      rowY += 24;
    }

    // Click [ Chọn ]
    if (screenX >= mx + 12 && screenX <= mx + 102 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
      this.executeMenuItem(this.selectedMenuIndex);
      return;
    }

    // Click [ Đóng ]
    if (screenX >= mx + mw - 102 && screenX <= mx + mw - 12 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
      this.isMenuOpen = false;
      return;
    }
  }

  private executeMenuItem(index: number): void {
    this.isMenuOpen = false;
    switch (index) {
      case 0:
        this.controller.isSeedPickerOpen = true;
        break;
      case 1:
        this.controller.harvestAllMature();
        break;
      case 2:
        this.isConfirmOpenLand = true;
        break;
      case 3:
        this.controller.isShopOpen = true;
        break;
      case 4:
        this.controller.isWarehouseOpen = true;
        break;
      case 5:
        this.isKitchenOpen = true;
        break;
      case 6:
        this.isBarnOpen = true;
        break;
      case 7:
        if (this.onExitToWorldMap) this.onExitToWorldMap();
        break;
    }
  }

  private handleKitchenClick(x: number, y: number, w: number, h: number): void {
    const mw = 320;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isKitchenOpen = false;
      return;
    }

    let rowY = my + 52;
    for (let i = 0; i < 5; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
        this.selectedKitchenRecipe = i;
        return;
      }
      rowY += 28;
    }

    // [ Nấu món ăn ]
    if (x >= mx + 16 && x <= mx + 146 && y >= my + mh - 28 && y <= my + mh - 6) {
      const recipes = ['Cơm chiên trứng', 'Canh chua cá lóc', 'Nước ép dưa hấu', 'Bắp xào bơ', 'Trứng ốp la'];
      this.handler.cookDish(this.selectedKitchenRecipe);
      this.feedbackText = `Đang nấu ${recipes[this.selectedKitchenRecipe]}...`;
      this.feedbackTimer = 80;
      this.isKitchenOpen = false;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 146 && x <= mx + mw - 16 && y >= my + mh - 28 && y <= my + mh - 6) {
      this.isKitchenOpen = false;
      return;
    }
  }

  private handleBarnClick(x: number, y: number, w: number, h: number): void {
    const mw = 310;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isBarnOpen = false;
      return;
    }

    let rowY = my + 54;
    for (let i = 0; i < 5; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedBarnAction = i;
        return;
      }
      rowY += 26;
    }

    // [ Thực hiện ]
    if (x >= mx + 16 && x <= mx + 141 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.handler.doCattleAction(this.selectedBarnAction);
      const actions = ['Cho ăn', 'Thu hoạch trứng/sữa', 'Tiêm phòng', 'Vệ sinh chuồng', 'Mua con giống'];
      this.feedbackText = `Đã thực hiện: ${actions[this.selectedBarnAction]}!`;
      this.feedbackTimer = 80;
      this.isBarnOpen = false;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 141 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.isBarnOpen = false;
      return;
    }
  }

  private handleStarfruitClick(x: number, y: number, w: number, h: number): void {
    const mw = 300;
    const mh = 240;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isStarfruitOpen = false;
      return;
    }

    let rowY = my + 56;
    for (let i = 0; i < 4; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedStarfruitAction = i;
        return;
      }
      rowY += 26;
    }

    // [ Chọn ]
    if (x >= mx + 16 && x <= mx + 136 && y >= my + mh - 26 && y <= my + mh - 6) {
      if (this.selectedStarfruitAction === 0) {
        // Thu hoạch khế
        this.handler.harvestStarfruit();
        this.feedbackText = 'Thu hoạch khế thành công! +500 Xu vào tài khoản!';
        this.feedbackTimer = 80;
      } else if (this.selectedStarfruitAction === 1) {
        this.feedbackText = 'Đã tưới nước cho cây khế!';
        this.feedbackTimer = 60;
      } else if (this.selectedStarfruitAction === 2) {
        this.feedbackText = 'Đã bón phân cho cây khế! +100 EXP Nông Trại';
        this.feedbackTimer = 60;
      } else if (this.selectedStarfruitAction === 3) {
        this.handler.upgradeStarfruit();
        this.feedbackText = 'Đã gửi yêu cầu nâng cấp cây khế lên Cấp 2!';
        this.feedbackTimer = 80;
      }
      this.isStarfruitOpen = false;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 136 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.isStarfruitOpen = false;
      return;
    }
  }

  private handlePondClick(x: number, y: number, w: number, h: number): void {
    const mw = 300;
    const mh = 240;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isPondOpen = false;
      return;
    }

    let rowY = my + 56;
    for (let i = 0; i < 4; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedPondAction = i;
        return;
      }
      rowY += 26;
    }

    // [ Thực hiện ]
    if (x >= mx + 16 && x <= mx + 136 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.handler.doFishAction(this.selectedPondAction);
      const actions = ['Thả cá giống mới', 'Rải thức ăn cho cá', 'Thu hoạch cá', 'Nâng cấp ao cá'];
      this.feedbackText = `Đã thực hiện: ${actions[this.selectedPondAction]}!`;
      this.feedbackTimer = 80;
      this.isPondOpen = false;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 136 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.isPondOpen = false;
      return;
    }
  }

  private handleCropActionClick(x: number, y: number, w: number, h: number): void {
    const mw = 310;
    const mh = 260;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isCropActionOpen = false;
      return;
    }

    let rowY = my + 54;
    for (let i = 0; i < 5; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedCropAction = i;
        return;
      }
      rowY += 26;
    }

    // [ Thực hiện ]
    if (x >= mx + 16 && x <= mx + 141 && y >= my + mh - 26 && y <= my + mh - 6) {
      if (this.selectedCropAction === 0) {
        this.feedbackText = 'Đã tưới nước cho ô đất!';
        this.feedbackTimer = 60;
      } else if (this.selectedCropAction === 1) {
        this.feedbackText = 'Đã bón phân! Rút ngắn thời gian sinh trưởng!';
        this.feedbackTimer = 60;
      } else if (this.selectedCropAction === 2) {
        this.feedbackText = 'Đã bắt sâu bọ và làm sạch cỏ dại!';
        this.feedbackTimer = 60;
      } else if (this.selectedCropAction === 3) {
        this.controller.handleCellClick(this.selectedPlotIndex);
      } else if (this.selectedCropAction === 4) {
        this.feedbackText = 'Đã cuốc đất và làm sạch ô đất!';
        this.feedbackTimer = 60;
      }
      this.isCropActionOpen = false;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 141 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
      this.isCropActionOpen = false;
      return;
    }
  }

  private handleSeedPickerClick(x: number, y: number, w: number, h: number): void {
    const mw = 320;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.controller.isSeedPickerOpen = false;
      return;
    }

    const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
    let yOff = my + 36;
    for (const [seedId] of seeds) {
      if (y >= yOff && y <= yOff + 26) {
        this.controller.selectSeed(seedId);
        if (this.controller.focusedCellIndex >= 0) {
          this.handler.plantSeed(this.controller.focusedCellIndex, seedId);
        }
        return;
      }
      yOff += 28;
      if (yOff > my + mh - 36) break;
    }

    // [ Đóng ]
    if (y >= my + mh - 28 && y <= my + mh - 6) {
      this.controller.isSeedPickerOpen = false;
      return;
    }
  }

  private handleShopClick(x: number, y: number, w: number, h: number): void {
    const mw = 340;
    const mh = 280;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.controller.isShopOpen = false;
      return;
    }

    // Tabs
    const tabW = Math.floor((mw - 24) / 3);
    const tabY = my + 32;
    if (y >= tabY && y <= tabY + 20) {
      if (x >= mx + 12 && x < mx + 12 + tabW) {
        this.selectedShopTab = 'seeds';
        this.selectedShopIndex = 0;
        return;
      }
      if (x >= mx + 12 + tabW && x < mx + 12 + tabW * 2) {
        this.selectedShopTab = 'animals';
        this.selectedShopIndex = 0;
        return;
      }
      if (x >= mx + 12 + tabW * 2 && x <= mx + mw - 12) {
        this.selectedShopTab = 'fertilizer';
        this.selectedShopIndex = 0;
        return;
      }
    }

    // Item selection
    let rowY = my + 58;
    const count = this.selectedShopTab === 'seeds' ? 5 : (this.selectedShopTab === 'animals' ? 4 : 3);
    for (let i = 0; i < count; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
        this.selectedShopIndex = i;
        return;
      }
      rowY += 28;
    }

    // Quantity selector: [ - ] [ 1 ] [ + ]
    const botY = my + mh - 30;
    if (y >= botY && y <= botY + 22) {
      if (x >= mx + 12 && x <= mx + 35) {
        this.shopQuantity = Math.max(1, this.shopQuantity - 1);
        return;
      }
      if (x >= mx + 55 && x <= mx + 82) {
        this.shopQuantity = Math.min(99, this.shopQuantity + 1);
        return;
      }
    }

    // [ Mua vật phẩm ]
    if (x >= mx + 95 && x <= mx + 210 && y >= botY && y <= botY + 22) {
      const itemId = this.selectedShopIndex + 1;
      this.handler.buySeed(itemId, this.shopQuantity);
      this.feedbackText = `Đã gửi yêu cầu mua ${this.shopQuantity} vật phẩm!`;
      this.feedbackTimer = 60;
      return;
    }

    // [ Đóng ]
    if (x >= mx + mw - 110 && x <= mx + mw - 12 && y >= botY && y <= botY + 22) {
      this.controller.isShopOpen = false;
      return;
    }
  }

  private handleWarehouseClick(x: number, y: number, w: number, h: number): void {
    const mw = 320;
    const mh = 250;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.controller.isWarehouseOpen = false;
      return;
    }

    // Sell item rows
    const cropEntries = Array.from(this.model.crops.entries()).filter(([_, c]) => c > 0);
    let yOff = my + 36;
    for (const [cropId, count] of cropEntries) {
      if (y >= yOff && y <= yOff + 26) {
        this.controller.sellProduce(cropId, 1);
        return;
      }
      yOff += 28;
      if (yOff > my + mh - 36) break;
    }

    // [ Đóng ]
    if (y >= my + mh - 28 && y <= my + mh - 6) {
      this.controller.isWarehouseOpen = false;
      return;
    }
  }

  private handleConfirmOpenLandClick(x: number, y: number, w: number, h: number): void {
    const mw = 280;
    const mh = 150;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // [ Đồng ý ]
    if (x >= mx + 16 && x <= mx + 131 && y >= my + mh - 30 && y <= my + mh - 6) {
      this.isConfirmOpenLand = false;
      this.handler.openLand(1); // 1 = Xu
      this.feedbackText = 'Đang gửi yêu cầu mở ô đất lên máy chủ...';
      this.feedbackTimer = 60;
      return;
    }

    // [ Hủy bỏ ]
    if (x >= mx + mw - 131 && x <= mx + mw - 16 && y >= my + mh - 30 && y <= my + mh - 6) {
      this.isConfirmOpenLand = false;
      return;
    }
  }
}

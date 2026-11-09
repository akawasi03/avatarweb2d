/**
 * FarmScreen.ts
 * Authentic WebGL2-rendered Farm System Screen (Map 25) for Avatar Teamobi 2.5.8.
 * Integrates FarmModel, FarmNetworkHandler, FarmActionController, and BitmapFont.
 */

import { Graphics, Image, Sprite } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { BitmapFont } from '../renderer/BitmapFont.js';
import { AvatarRenderer } from '../characters/AvatarRenderer.js';
import { FarmModel, LandItemState, CROP_DEFINITIONS, CropMetadata } from './FarmModel.js';
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

    this.localPlayer = {
      id: this.handler.network.myUserId || 1,
      name: 'Nông dân',
      x: 200,
      y: 220,
      targetX: 200,
      targetY: 220,
      dir: 0,
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

    // Preload critical farm assets
    this.loadSprite('buyLand', '/assets/farm/buyLand.png');
    this.loadSprite('cut', '/assets/farm/cut.png');
    this.loadSprite('coin', '/assets/farm/coin.png');
    this.loadSprite('focus', '/assets/farm/focus.png');
    this.loadSprite('w', '/assets/farm/w.png');
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

    // Fade out notification
    if (this.feedbackTimer > 0) {
      this.feedbackTimer--;
    }

    // Move player smoothly towards target
    const dx = this.localPlayer.targetX - this.localPlayer.x;
    const dy = this.localPlayer.targetY - this.localPlayer.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 3) {
      const speed = 4;
      this.localPlayer.x += (dx / dist) * speed;
      this.localPlayer.y += (dy / dist) * speed;
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

    // Center camera on player with smooth lerping
    const targetCamX = Math.floor(this.localPlayer.x - this.screenW / 2);
    const targetCamY = Math.floor(this.localPlayer.y - this.screenH / 2);
    this.cameraX += Math.floor((targetCamX - this.cameraX) * 0.15);
    this.cameraY += Math.floor((targetCamY - this.cameraY) * 0.15);

    // Clamp camera within map bounds (Map 25 is roughly 800 x 500)
    this.cameraX = Math.max(0, Math.min(800 - this.screenW, this.cameraX));
    this.cameraY = Math.max(0, Math.min(500 - this.screenH, this.cameraY));

    // Client-side crop growth progress tick
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

    // Idle animal movement
    for (const a of this.model.animals) {
      a.moveTimer++;
      if (a.moveTimer > 60) {
        a.moveTimer = 0;
        a.targetX = 420 + Math.floor(Math.random() * 80);
        a.targetY = 150 + Math.floor(Math.random() * 60);
      }
      a.x += (a.targetX - a.x) * 0.05;
      a.y += (a.targetY - a.y) * 0.05;
    }
  }

  // --- Rendering Pipeline (WebGL2 Native via Graphics) ---

  public paint(g: Graphics): void {
    const w = this.screenW;
    const h = this.screenH;

    // 1. Paint Landscape (Sky & Lush Farm Grass)
    this.paintScenery(g, w, h);

    // Apply Camera Translation for World Entities
    g.translate(-this.cameraX, -this.cameraY);

    // 2. Farm Background Elements (Barn, Pond, Fence, Cottage)
    this.paintFarmStructures(g);

    // 3. Paint Land Grid (30 Plots with Soil, Plants & Indicators)
    this.paintLandGrid(g);

    // 4. Paint Animals
    this.paintAnimals(g);

    // 5. Paint Local Player Avatar
    this.paintPlayer(g);

    // Restore Camera Translation
    g.translate(this.cameraX, this.cameraY);

    // 6. Paint Top Status Bar (Xu, Lượng, Farm Owner Name)
    this.paintTopBar(g, w, h);

    // 7. Paint Bottom Action Toolbar (Tools & Buttons)
    this.paintActionToolbar(g, w, h);

    // 8. Paint Feedback Toast Notification
    this.paintNotificationToast(g, w, h);

    // 9. Paint Active Modals / Popups (if open)
    this.paintModals(g, w, h);
  }

  private paintScenery(g: Graphics, w: number, h: number): void {
    // Sky gradient fill
    g.setColor(0x70C7FA);
    g.fillRect(0, 0, w, Math.floor(h * 0.4));

    // Rolling green hills horizon
    g.setColor(0x52A838);
    g.fillRect(0, Math.floor(h * 0.35), w, Math.floor(h * 0.65));

    // Farm pasture grass
    g.setColor(0x438E2C);
    g.fillRect(0, Math.floor(h * 0.45), w, Math.floor(h * 0.55));
  }

  private paintFarmStructures(g: Graphics): void {
    // 1. Cottage / Nhà Nông Dân (Upper Left: x=30, y=70, w=100, h=90)
    g.setColor(0xA35A28);
    g.fillRect(30, 90, 95, 65); // Walls
    g.setColor(0xC93B2B); // Red Roof
    g.fillRect(20, 65, 115, 25);
    g.setColor(0x5A3015);
    g.fillRect(65, 115, 25, 40); // Wooden Door
    g.setColor(0x8EE5F8);
    g.fillRect(40, 105, 18, 18); // Window 1
    g.fillRect(98, 105, 18, 18); // Window 2

    // 2. Starfruit Tree / Cây Khế Thần Thoại (Upper Right: x=390, y=50)
    g.setColor(0x663B18);
    g.fillRect(435, 95, 18, 55); // Trunk
    // Leaf canopy
    g.setColor(0x277A1A);
    g.fillRect(395, 45, 95, 60);
    g.setColor(0x3AA327);
    g.fillRect(405, 55, 75, 45);
    // Golden ripe starfruits
    const fruitCount = Math.min(8, Math.max(3, this.model.starFruitFruit || 5));
    const fruitSpots = [
      { x: 410, y: 65 }, { x: 430, y: 55 }, { x: 455, y: 60 }, { x: 470, y: 75 },
      { x: 420, y: 85 }, { x: 445, y: 80 }, { x: 460, y: 90 }, { x: 435, y: 70 }
    ];
    g.setColor(0xFACC15);
    for (let i = 0; i < fruitCount; i++) {
      const pt = fruitSpots[i];
      g.fillRect(pt.x, pt.y, 7, 7);
      g.setColor(0xFFFBEB);
      g.fillRect(pt.x + 2, pt.y + 1, 3, 3); // Glint
      g.setColor(0xFACC15);
    }

    // 3. Cow Barn / Chuồng Bò (Upper Center-Right: x=460, y=140)
    g.setColor(0x8B4513);
    g.fillRect(455, 140, 110, 75); // Barn base
    g.setColor(0x654321);
    g.fillRect(450, 130, 120, 18); // Roof
    g.setColor(0xF3E5AB);
    g.fillRect(465, 160, 90, 45); // Hay floor
    this.font.drawString(g, 'Chuồng Gia Súc', 510, 133, 2);

    // 4. Fish Pond / Hồ Cá (Bottom Right: x=460, y=260)
    g.setColor(0x2E6FA7);
    g.fillRect(455, 255, 125, 80); // Pond water
    g.setColor(0x3B88C3);
    g.fillRect(460, 260, 115, 70); // Shimmer
    g.setColor(0x7CB9E8);
    // Water ripples
    const rippleOff = (this.animTick % 20) > 10 ? 2 : 0;
    g.fillRect(480 + rippleOff, 280, 25, 2);
    g.fillRect(520 - rippleOff, 305, 30, 2);
    this.font.drawString(g, 'Hồ Cá', 517, 265, 2);

    // 5. Wooden Perimeter Fence (Bờ rào trang trại)
    g.setColor(0xD2B48C);
    for (let fx = 20; fx < 600; fx += 24) {
      g.fillRect(fx, 40, 4, 25);
      g.fillRect(fx, 48, 24, 3);
      g.fillRect(fx, 58, 24, 3);
    }
  }

  private paintLandGrid(g: Graphics): void {
    const focusImg = this.spriteCache.get('focus');
    const cutImg = this.spriteCache.get('cut');
    const buyLandImg = this.spriteCache.get('buyLand');
    const waterImg = this.spriteCache.get('w');

    for (let i = 0; i < this.model.lands.length; i++) {
      const cell = this.model.lands[i];
      const px = cell.posX;
      const py = cell.posY;
      const cw = FarmModel.CELL_WIDTH;
      const ch = FarmModel.CELL_HEIGHT;

      // Unopened / Locked Land Plot
      if (cell.type === -2) {
        g.setColor(0x3E7B27); // Darker rough grass
        g.fillRect(px, py, cw - 4, ch - 4);
        g.setColor(0x2F601D);
        g.drawRect(px, py, cw - 4, ch - 4);

        if (i === this.model.landSize) {
          // Highlight next unlockable plot
          if (buyLandImg) {
            g.drawImage(buyLandImg, px + Math.floor(cw / 2) - 8, py + Math.floor(ch / 2) - 8, 0);
          } else {
            g.setColor(0xFACC15);
            this.font.drawString(g, '+', px + Math.floor(cw / 2) - 2, py + 4, 0);
          }
        }
        continue;
      }

      // Opened Land Plot (Soil)
      if (cell.isWatered) {
        g.setColor(0x4A2F1B); // Moist dark brown soil
      } else {
        g.setColor(0x754C29); // Dry plowed soil
      }
      g.fillRect(px, py, cw - 4, ch - 4);

      // Soil ridge texture highlights
      g.setColor(cell.isWatered ? 0x362111 : 0x5C3B1F);
      g.fillRect(px + 4, py + 6, cw - 12, 3);
      g.fillRect(px + 4, py + 14, cw - 12, 3);
      g.fillRect(px + 4, py + 21, cw - 12, 3);

      // Plot border
      g.setColor(cell.isWatered ? 0x2A190D : 0x482E19);
      g.drawRect(px, py, cw - 4, ch - 4);

      // Plant / Crop Sprite
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
          // Fallback colored crop representation while loading
          const stage = this.model.getGrowthStage(cell);
          if (stage < 3) {
            g.setColor(0x4ADE80); // Small seedling sprout
            g.fillRect(px + Math.floor(cw / 2) - 3, py + 10, 6, 8);
          } else if (stage < 7) {
            g.setColor(0x22C55E); // Growing bush
            g.fillRect(px + Math.floor(cw / 2) - 8, py + 6, 16, 14);
          } else {
            g.setColor(0xEF4444); // Ripe fruit
            g.fillRect(px + Math.floor(cw / 2) - 10, py + 2, 20, 18);
          }
        }

        // Mature Ripe Sparkle Indicator
        const stage = this.model.getGrowthStage(cell);
        if (cell.isHarvestable || stage === 7) {
          if (cutImg) {
            g.drawImage(cutImg, px + cw - 18, py - 6, 0);
          } else {
            g.setColor(0xFACC15);
            g.fillRect(px + cw - 12, py - 2, 8, 8);
          }
        } else if (!cell.isWatered) {
          // Thirsty Water Icon
          if (waterImg) {
            g.drawImage(waterImg, px + 2, py - 4, 0);
          } else {
            g.setColor(0x38BDF8);
            g.fillRect(px + 2, py - 2, 6, 6);
          }
        }
      }

      // Cursor Focus Box
      if (i === this.controller.focusedCellIndex) {
        if (focusImg) {
          g.drawImage(focusImg, px - 2, py - 2, 0);
        } else {
          g.setColor(0xFACC15);
          g.drawRect(px - 1, py - 1, cw - 2, ch - 2);
          g.drawRect(px - 2, py - 2, cw, ch);
        }
      }
    }
  }

  private paintAnimals(g: Graphics): void {
    for (const a of this.model.animals) {
      const ax = Math.floor(a.x);
      const ay = Math.floor(a.y);

      // Chickens
      g.setColor(0xFFFBEB);
      g.fillRect(ax, ay, 12, 10); // Body
      g.setColor(0xF59E0B);
      g.fillRect(ax + 10, ay + 2, 4, 3); // Beak
      g.setColor(0xEF4444);
      g.fillRect(ax + 4, ay - 3, 4, 4); // Comb
    }
  }

  private paintPlayer(g: Graphics): void {
    const px = Math.floor(this.localPlayer.x);
    const py = Math.floor(this.localPlayer.y);

    // Player Shadow
    g.setColor(0x1F2937);
    g.fillRect(px - 10, py - 2, 20, 5);

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

  private paintTopBar(g: Graphics, w: number, h: number): void {
    // Backdrop
    g.setColor(0x0F172A);
    g.fillRect(0, 0, w, 28);
    g.setColor(0x334155);
    g.fillRect(0, 27, w, 1);

    // Owner Title
    const title = this.model.userId === this.handler.network.myUserId
      ? `🌾 NÔNG TRẠI CỦA BẠN (Cấp ${this.model.farmLevel})`
      : `🌾 NÔNG TRẠI: #${this.model.userId}`;
    this.font.drawString(g, title, 8, 7, 0);

    // Xu & Lượng Counter
    const xuStr = `💰 ${Number(this.model.userXu).toLocaleString('vi-VN')} Xu`;
    this.font.drawString(g, xuStr, Math.floor(w * 0.55), 7, 0);

    // Exit Button
    g.setColor(0xDC2626);
    g.fillRect(w - 78, 4, 72, 20);
    g.setColor(0xFFFFFF);
    this.font.drawString(g, 'Về Phố', w - 42, 7, 2);
  }

  private paintActionToolbar(g: Graphics, w: number, h: number): void {
    const barH = 34;
    const barY = h - barH;

    // Dark sleek bottom toolbar
    g.setColor(0x0F172A);
    g.fillRect(0, barY, w, barH);
    g.setColor(0x334155);
    g.fillRect(0, barY, w, 1);

    const buttons = [
      { label: 'Gieo Hạt', color: 0x16A34A, action: () => (this.controller.isSeedPickerOpen = true) },
      { label: 'Tưới Nước', color: 0x0284C7, action: () => this.controller.setTool(FarmToolMode.WATER) },
      { label: 'Thu Hoạch', color: 0xCA8A04, action: () => this.controller.harvestAllMature() },
      { label: 'Cửa Hàng', color: 0x9333EA, action: () => (this.controller.isShopOpen = true) },
      { label: 'Nhà Kho', color: 0x475569, action: () => (this.controller.isWarehouseOpen = true) },
      { label: 'Mở Đất', color: 0x059669, action: () => this.controller.handleCellClick(this.model.landSize) }
    ];

    const btnW = Math.min(84, Math.floor((w - 12) / buttons.length));
    const startX = Math.floor((w - btnW * buttons.length) / 2);

    for (let i = 0; i < buttons.length; i++) {
      const btn = buttons[i];
      const bx = startX + i * btnW + 2;
      const by = barY + 5;
      const bw = btnW - 4;
      const bh = 24;

      g.setColor(btn.color);
      g.fillRect(bx, by, bw, bh);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, btn.label, bx + Math.floor(bw / 2), by + 5, 2);
    }
  }

  private paintNotificationToast(g: Graphics, w: number, h: number): void {
    if (this.feedbackTimer <= 0) return;

    const toastW = Math.min(380, w - 40);
    const toastH = 22;
    const tx = Math.floor((w - toastW) / 2);
    const ty = 34;

    g.setColor(0x0F172A);
    g.fillRect(tx, ty, toastW, toastH);
    g.setColor(0xFACC15);
    g.drawRect(tx, ty, toastW, toastH);

    this.font.drawString(g, this.feedbackText, Math.floor(w / 2), ty + 5, 2);
  }

  private paintModals(g: Graphics, w: number, h: number): void {
    // 1. Seed Picker Modal
    if (this.controller.isSeedPickerOpen) {
      this.paintSeedPickerModal(g, w, h);
    }
    // 2. Farm Shop Modal
    else if (this.controller.isShopOpen) {
      this.paintFarmShopModal(g, w, h);
    }
    // 3. Warehouse Modal
    else if (this.controller.isWarehouseOpen) {
      this.paintWarehouseModal(g, w, h);
    }
  }

  private paintSeedPickerModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(240, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Modal background card
    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x475569);
    g.drawRect(mx, my, mw, mh);

    // Header
    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '🌾 CHỌN HẠT GIỐNG ĐỂ GIEO', mx + Math.floor(mw / 2), my + 6, 2);

    // Close [X]
    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    // Seed list
    const seeds = Array.from(this.model.seeds.entries());
    if (seeds.length === 0) {
      this.font.drawString(g, 'Kho chưa có hạt giống nào!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Vui lòng bấm Cửa Hàng để mua thêm.', mx + Math.floor(mw / 2), my + 85, 2);
      return;
    }

    let yOffset = my + 34;
    for (const [seedId, count] of seeds) {
      const meta = CROP_DEFINITIONS[seedId];
      const name = meta ? meta.name : `Hạt #${seedId}`;

      g.setColor(0x334155);
      g.fillRect(mx + 10, yOffset, mw - 20, 26);

      g.setColor(0xFACC15);
      this.font.drawString(g, `${name} (Còn: ${count})`, mx + 18, yOffset + 6, 0);

      g.setColor(0x16A34A);
      g.fillRect(mx + mw - 65, yOffset + 3, 50, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, 'Chọn', mx + mw - 40, yOffset + 6, 2);

      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  private paintFarmShopModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(340, w - 20);
    const mh = Math.min(260, h - 50);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x475569);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '🏪 CỬA HÀNG NÔNG TRẠI (MUA BẰNG XU)', mx + Math.floor(mw / 2), my + 6, 2);

    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    const crops = Object.values(CROP_DEFINITIONS);
    let yOffset = my + 32;
    for (const c of crops) {
      g.setColor(0x334155);
      g.fillRect(mx + 10, yOffset, mw - 20, 26);

      g.setColor(0xFFFFFF);
      this.font.drawString(g, `${c.name} (${c.growMinutes}p)`, mx + 16, yOffset + 6, 0);

      g.setColor(0xCA8A04);
      g.fillRect(mx + mw - 80, yOffset + 3, 68, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, `${c.seedPriceXu} Xu`, mx + mw - 46, yOffset + 6, 2);

      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  private paintWarehouseModal(g: Graphics, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(240, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x475569);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '📦 NHÀ KHO NÔNG SẢN', mx + Math.floor(mw / 2), my + 6, 2);

    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    const cropEntries = Array.from(this.model.crops.entries());
    if (cropEntries.length === 0) {
      this.font.drawString(g, 'Nhà kho trống!', mx + Math.floor(mw / 2), my + 60, 2);
      this.font.drawString(g, 'Hãy chăm sóc cây và thu hoạch để có nông sản.', mx + Math.floor(mw / 2), my + 85, 2);
      return;
    }

    let yOffset = my + 34;
    for (const [cropId, count] of cropEntries) {
      const meta = CROP_DEFINITIONS[cropId];
      const name = meta ? meta.name : `Nông sản #${cropId}`;
      const sellTotal = count * (meta ? meta.sellPriceXu : 10);

      g.setColor(0x334155);
      g.fillRect(mx + 10, yOffset, mw - 20, 26);

      g.setColor(0x4ADE80);
      this.font.drawString(g, `${name}: ${count} củ/quả`, mx + 16, yOffset + 6, 0);

      g.setColor(0x059669);
      g.fillRect(mx + mw - 75, yOffset + 3, 62, 20);
      g.setColor(0xFFFFFF);
      this.font.drawString(g, `Bán: ${sellTotal}`, mx + mw - 44, yOffset + 6, 2);

      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  // --- Input & Touch Handling ---

  public pointerPressed(screenX: number, screenY: number): void {
    const w = this.screenW;
    const h = this.screenH;

    // Check Top Bar [Về Phố] Button
    if (screenY <= 28 && screenX >= w - 78) {
      if (this.onExitToWorldMap) {
        this.onExitToWorldMap();
      }
      return;
    }

    // Check Active Modal interactions
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

    // Check Action Toolbar Buttons
    const barH = 34;
    const barY = h - barH;
    if (screenY >= barY) {
      this.handleToolbarClick(screenX, barY, w);
      return;
    }

    // World coordinates (Account for camera offset)
    const worldX = screenX + this.cameraX;
    const worldY = screenY + this.cameraY;

    // Check Starfruit Tree Click (x: 400..490, y: 50..120)
    if (worldX >= 390 && worldX <= 490 && worldY >= 50 && worldY <= 120) {
      const harvested = this.model.starFruitFruit || 5;
      this.model.starFruitFruit = 0;
      this.model.userXu += harvested * 50;
      if (this.controller.onActionFeedback) {
        this.controller.onActionFeedback(`Đã hái ${harvested} quả khế! (+${harvested * 50} Xu)`, '#facc15');
      }
      return;
    }

    // Check Land Grid Click
    const clickedCellIndex = this.findCellAt(worldX, worldY);
    if (clickedCellIndex >= 0) {
      this.localPlayer.targetX = this.model.lands[clickedCellIndex].posX + 24;
      this.localPlayer.targetY = this.model.lands[clickedCellIndex].posY + 14;
      this.controller.handleCellClick(clickedCellIndex);
      return;
    }

    // Otherwise, move player to tapped spot
    this.localPlayer.targetX = worldX;
    this.localPlayer.targetY = worldY;
  }

  private findCellAt(worldX: number, worldY: number): number {
    for (let i = 0; i < this.model.lands.length; i++) {
      const cell = this.model.lands[i];
      if (
        worldX >= cell.posX &&
        worldX <= cell.posX + FarmModel.CELL_WIDTH &&
        worldY >= cell.posY &&
        worldY <= cell.posY + FarmModel.CELL_HEIGHT
      ) {
        return i;
      }
    }
    return -1;
  }

  private handleToolbarClick(screenX: number, barY: number, w: number): void {
    const buttons = [
      () => (this.controller.isSeedPickerOpen = true),
      () => this.controller.setTool(FarmToolMode.WATER),
      () => this.controller.harvestAllMature(),
      () => (this.controller.isShopOpen = true),
      () => (this.controller.isWarehouseOpen = true),
      () => this.controller.handleCellClick(this.model.landSize)
    ];

    const btnW = Math.min(84, Math.floor((w - 12) / buttons.length));
    const startX = Math.floor((w - btnW * buttons.length) / 2);

    for (let i = 0; i < buttons.length; i++) {
      const bx = startX + i * btnW;
      if (screenX >= bx && screenX < bx + btnW) {
        buttons[i]();
        return;
      }
    }
  }

  private handleSeedPickerClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(240, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Close button
    if (x >= mx + mw - 25 && y >= my && y <= my + 26) {
      this.controller.isSeedPickerOpen = false;
      return;
    }

    // Seed row buttons
    const seeds = Array.from(this.model.seeds.entries());
    let yOffset = my + 34;
    for (const [seedId] of seeds) {
      if (y >= yOffset && y <= yOffset + 26) {
        this.controller.selectSeed(seedId);
        return;
      }
      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  private handleShopClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(340, w - 20);
    const mh = Math.min(260, h - 50);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Close button
    if (x >= mx + mw - 25 && y >= my && y <= my + 26) {
      this.controller.isShopOpen = false;
      return;
    }

    // Buy crop rows
    const crops = Object.values(CROP_DEFINITIONS);
    let yOffset = my + 32;
    for (const c of crops) {
      if (y >= yOffset && y <= yOffset + 26) {
        if (this.model.userXu >= c.seedPriceXu) {
          this.handler.buySeed(c.id, 1, 1);
          this.model.userXu -= c.seedPriceXu;
          const cur = this.model.seeds.get(c.id) || 0;
          this.model.seeds.set(c.id, cur + 1);
          if (this.controller.onActionFeedback) {
            this.controller.onActionFeedback(`Đã mua 1 hạt giống ${c.name}! (-${c.seedPriceXu} Xu)`, '#4ade80');
          }
        } else {
          if (this.controller.onActionFeedback) {
            this.controller.onActionFeedback('Bạn không đủ Xu để mua hạt giống này!', '#ef4444');
          }
        }
        return;
      }
      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  private handleWarehouseClick(x: number, y: number, w: number, h: number): void {
    const mw = Math.min(320, w - 20);
    const mh = Math.min(240, h - 60);
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (x >= mx + mw - 25 && y >= my && y <= my + 26) {
      this.controller.isWarehouseOpen = false;
      return;
    }

    const cropEntries = Array.from(this.model.crops.entries());
    let yOffset = my + 34;
    for (const [cropId, count] of cropEntries) {
      if (y >= yOffset && y <= yOffset + 26) {
        const meta = CROP_DEFINITIONS[cropId];
        const sellTotal = count * (meta ? meta.sellPriceXu : 10);
        this.model.userXu += sellTotal;
        this.model.crops.delete(cropId);
        if (this.controller.onActionFeedback) {
          this.controller.onActionFeedback(`Đã bán toàn bộ ${meta?.name || 'nông sản'}! (+${sellTotal} Xu)`, '#facc15');
        }
        return;
      }
      yOffset += 30;
      if (yOffset > my + mh - 35) break;
    }
  }

  public keyPressed(keyCode: number): void {
    // Arrow keys & Numpad navigation
    const cols = FarmModel.GRID_COLS;
    if (keyCode === 52 || keyCode === -3) { // Left
      this.controller.focusedCellIndex = Math.max(0, this.controller.focusedCellIndex - 1);
    } else if (keyCode === 54 || keyCode === -4) { // Right
      this.controller.focusedCellIndex = Math.min(this.model.lands.length - 1, this.controller.focusedCellIndex + 1);
    } else if (keyCode === 50 || keyCode === -1) { // Up
      this.controller.focusedCellIndex = Math.max(0, this.controller.focusedCellIndex - cols);
    } else if (keyCode === 56 || keyCode === -2) { // Down
      this.controller.focusedCellIndex = Math.min(this.model.lands.length - 1, this.controller.focusedCellIndex + cols);
    } else if (keyCode === 53 || keyCode === 13) { // Fire / Enter: action on focused plot
      this.controller.handleCellClick(this.controller.focusedCellIndex);
    } else if (keyCode === 49) { // 1: Seed picker
      this.controller.isSeedPickerOpen = !this.controller.isSeedPickerOpen;
    } else if (keyCode === 51) { // 3: Harvest all
      this.controller.harvestAllMature();
    } else if (keyCode === 55) { // 7: Shop
      this.controller.isShopOpen = !this.controller.isShopOpen;
    }
  }
}

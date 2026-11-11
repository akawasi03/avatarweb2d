/**
 * FarmGateScreen.ts
 * Authentic WebGL2-rendered Cổng Nông Trại Screen (Map 23) for Avatar Teamobi 2.5.8.
 * Faithful visual fidelity matching original Java ME client and official HD assets.
 * 
 * Features:
 * - Seamless 3-layer HD backdrop (layer_0, layer_1, layer_2) forming 1302px panorama.
 * - Parallax Day/Night Sky and Horizon background.
 * - NPC lai.buon with conical hat (nón lá), áo bà ba, fishing rod, and red flower emblem.
 * - Authentic Wooden "FARM" Gate with animated downward yellow "Vào" arrow.
 * - "CỬA HÀNG" (Farm Shop) building with animated downward yellow "Vào" arrow.
 * - "Xe Kem Đồ Ăn Nhanh" (fast food / ice-cream cart) scenery on the right.
 * - Bottom exit with animated downward yellow "Vào" arrow back to World Map.
 * - Interactive walking, click-to-move, camera tracking, and classic softkeys.
 */

import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { BitmapFont } from '../renderer/BitmapFont.js';
import { AvatarRenderer } from '../characters/AvatarRenderer.js';
import { LocalPlayerState } from './FarmScreen.js';
import { FarmActionController } from './FarmActionController.js';
import { NetworkSession } from '../network/NetworkSession.js';

export class FarmGateScreen extends GameScreen {
  public network: NetworkSession;
  public skinPainter: UISkinPainter;
  public font: BitmapFont;
  public controller?: FarmActionController;

  // Local player state
  public localPlayer: LocalPlayerState;

  // NPC lai.buon (ID 850)
  public npcLaiBuon = {
    id: 850,
    name: 'lai.buon',
    x: 140,
    y: 280,
    dir: 0, // Facing down
    frame: 0,
    wearing: [273, 326, 0, 82, 73, 297, 442] // Nón lá, áo bà ba, fishing rod
  };

  // Screen dimensions
  public screenW = 640;
  public screenH = 480;

  // Camera offset
  public cameraX = 0;
  public cameraY = 0;

  // Map dimensions
  public readonly MAP_WIDTH = 1296;
  public readonly MAP_HEIGHT = 466;

  // Walkable bounds
  // Main dirt road: x = 50..1250, y = 300..415
  // Gate path: x = 395..475, y = 220..300
  // Store path: x = 720..790, y = 230..300
  // Lai buon path: x = 110..180, y = 265..300

  // Asset Cache
  private spriteCache: Map<string, Image> = new Map();
  public isAssetsLoaded = false;
  public isNight = false;

  // Animation ticks
  private animTick = 0;

  // Active UI
  public isMenuOpen = false;
  public isShopOpen = false;
  public isLaiBuonDialogOpen = false;

  // Floating notifications
  private feedbackText: string = 'Chào mừng bạn đến với Cổng Nông Trại!';
  private feedbackColor: string = '#facc15';
  private feedbackTimer: number = 100;

  // Callbacks
  public onEnterFarm?: (userId?: number) => void;
  public onExitToWorldMap?: () => void;

  constructor(
    network: NetworkSession,
    skinPainter: UISkinPainter,
    font: BitmapFont,
    controller?: FarmActionController
  ) {
    super();
    this.network = network;
    this.skinPainter = skinPainter;
    this.font = font;
    this.controller = controller;

    // Initial position on dirt road facing the FARM gate
    this.localPlayer = {
      id: this.network.myUserId || 1,
      name: 'Nông dân',
      x: 434,
      y: 360,
      targetX: 434,
      targetY: 360,
      dir: 1, // Facing Up towards the gate
      state: 'idle',
      wearing: [1, 2, 3],
      frame: 0
    };

    // Load authentic HD gate assets
    this.loadAssets().catch((err) => {
      console.error('[FarmGateScreen] Failed to load gate assets:', err);
    });
  }

  private async loadAssets(): Promise<void> {
    await Promise.all([
      this.preloadSprite('clouds_day', '/assets/bg/clouds_farm_day.png'),
      this.preloadSprite('clouds_night', '/assets/bg/clouds_farm_night.png'),
      this.preloadSprite('horizon_day', '/assets/bg/horizon_farm_day.png'),
      this.preloadSprite('horizon_night', '/assets/bg/horizon_farm_night.png'),
      this.preloadSprite('backdrop', '/assets/farm_gate/map23_backdrop.png'),
      this.preloadSprite('gateArch', '/assets/farm_gate/gate_arch.png'),
      this.preloadSprite('fruitStall', '/assets/farm_gate/fruit_stall.png'),
      this.preloadSprite('shopBuilding', '/assets/farm_gate/cua_hang.png'),
      this.preloadSprite('xeKem', '/assets/farm_gate/xe_kem.png'),
      this.preloadSprite('coin', '/assets/farm_ui/coin.png')
    ]);

    this.isAssetsLoaded = true;
    console.log('[FarmGateScreen] Authentic HD gate assets loaded successfully');
  }

  private async preloadSprite(key: string, url: string): Promise<Image | undefined> {
    try {
      const img = await Image.createImage(url);
      this.spriteCache.set(key, img);
      return img;
    } catch (err) {
      console.warn(`[FarmGateScreen] Failed to load sprite ${key} from ${url}:`, err);
      return undefined;
    }
  }

  /**
   * Main Simulation Update (20 ticks/sec)
   */
  public update(): void {
    this.animTick++;

    if (this.feedbackTimer > 0) {
      this.feedbackTimer--;
    }

    // 1. Move player towards target position with authentic collision
    if (this.localPlayer.x !== this.localPlayer.targetX || this.localPlayer.y !== this.localPlayer.targetY) {
      this.localPlayer.state = 'walk';
      const dx = this.localPlayer.targetX - this.localPlayer.x;
      const dy = this.localPlayer.targetY - this.localPlayer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const speed = 4; // Authentic walk speed

      if (dist <= speed) {
        this.localPlayer.x = this.localPlayer.targetX;
        this.localPlayer.y = this.localPlayer.targetY;
        this.localPlayer.state = 'idle';
        this.checkTriggerZones();
      } else {
        const nextX = this.localPlayer.x + Math.round((dx / dist) * speed);
        const nextY = this.localPlayer.y + Math.round((dy / dist) * speed);

        // Update direction
        if (Math.abs(dx) > Math.abs(dy)) {
          this.localPlayer.dir = dx > 0 ? 3 : 2; // Right : Left
        } else {
          this.localPlayer.dir = dy > 0 ? 0 : 1; // Down : Up
        }

        // Walkable bounds check
        if (this.isWalkable(nextX, nextY)) {
          this.localPlayer.x = nextX;
          this.localPlayer.y = nextY;
        } else if (this.isWalkable(nextX, this.localPlayer.y)) {
          this.localPlayer.x = nextX;
        } else if (this.isWalkable(this.localPlayer.x, nextY)) {
          this.localPlayer.y = nextY;
        } else {
          // Blocked
          this.localPlayer.targetX = this.localPlayer.x;
          this.localPlayer.targetY = this.localPlayer.y;
          this.localPlayer.state = 'idle';
        }
      }

      // Animate walk frames (0, 1, 2)
      if (this.animTick % 3 === 0) {
        this.localPlayer.frame = (this.localPlayer.frame + 1) % 3;
      }
    } else {
      this.localPlayer.state = 'idle';
      this.localPlayer.frame = 0;
    }

    // 2. Camera tracking
    this.updateCamera();
  }

  /**
   * Authentic walkable area calculation
   */
  private isWalkable(x: number, y: number): boolean {
    // 1. Out of horizontal bounds
    if (x < 40 || x > 1260) return false;

    // 2. Main dirt road (horizontal thoroughfare)
    if (y >= 290 && y <= 415) return true;

    // 3. Path leading up through FARM gate
    if (x >= 395 && x <= 475 && y >= 210 && y < 290) return true;

    // 4. Path leading up into CỬA HÀNG store
    if (x >= 715 && x <= 790 && y >= 220 && y < 290) return true;

    // 5. Grass area in front of NPC lai.buon
    if (x >= 100 && x <= 180 && y >= 260 && y < 290) return true;

    // Non-walkable lawns and structures
    return false;
  }

  /**
   * Check interactive zones when player stops walking
   */
  private checkTriggerZones(): void {
    // 1. Inside FARM Gate
    if (Math.abs(this.localPlayer.x - 434) <= 45 && this.localPlayer.y <= 230) {
      this.promptEnterFarm();
      return;
    }

    // 2. Inside CỬA HÀNG Store Entrance
    if (Math.abs(this.localPlayer.x - 755) <= 40 && this.localPlayer.y <= 240) {
      this.openShop();
      return;
    }

    // 3. Beside Fruit Stall (x = 600, y = 320)
    if (Math.abs(this.localPlayer.x - 600) <= 50 && Math.abs(this.localPlayer.y - 320) <= 30) {
      this.openLaiBuonDialog();
      return;
    }

    // 4. Beside NPC lai.buon
    if (Math.abs(this.localPlayer.x - 140) <= 45 && Math.abs(this.localPlayer.y - 280) <= 30) {
      this.openLaiBuonDialog();
      return;
    }

    // 4. At Bottom Exit to City
    if (Math.abs(this.localPlayer.x - 434) <= 50 && this.localPlayer.y >= 400) {
      this.promptExitToWorldMap();
      return;
    }
  }

  /**
   * Smooth Camera Tracking centered on player
   */
  private updateCamera(): void {
    const targetCamX = this.localPlayer.x - Math.floor(this.screenW / 2);
    const maxCamX = Math.max(0, this.MAP_WIDTH - this.screenW);
    this.cameraX = Math.max(0, Math.min(targetCamX, maxCamX));

    // Vertical camera: keep ground aligned with bottom of viewport
    if (this.screenH >= this.MAP_HEIGHT) {
      this.cameraY = 0;
    } else {
      const targetCamY = this.localPlayer.y - Math.floor(this.screenH / 2);
      const maxCamY = this.MAP_HEIGHT - this.screenH;
      this.cameraY = Math.max(0, Math.min(targetCamY, maxCamY));
    }
  }

  /**
   * Main WebGL2 Paint Routine
   */
  public paint(g: Graphics): void {
    const w = g.getClipWidth();
    const h = g.getClipHeight();
    this.screenW = w;
    this.screenH = h;

    // 1. Fill Daytime / Night Sky Background
    const isForcedDay = typeof window !== 'undefined' && (new URLSearchParams(window.location.search).has('day') || (window as any).__FORCE_DAY);
    const hour = new Date().getHours();
    this.isNight = isForcedDay ? false : (hour >= 18 || hour < 6);

    if (this.isNight) {
      g.setColor(0x000015); // Dark Night Sky (O[1] in ir.java)
    } else {
      g.setColor(0x5DBEF7); // Vivid Blue Day Sky (O[0] in ir.java)
    }
    g.fillRect(0, 0, w, h);

    // Calculate vertical offset so ground anchors at bottom of screen
    const groundBaseY = Math.max(0, h - this.MAP_HEIGHT);

    // 2. Paint Parallax Clouds and Sky
    this.paintParallaxSky(g, w, groundBaseY);

    // 3. Paint Parallax Horizon (Far rolling green hills)
    this.paintParallaxHorizon(g, w, groundBaseY);

    // Apply Camera Translation for World Space
    g.translate(-this.cameraX, -this.cameraY + groundBaseY);

    // 4. Paint Authentic 3-Layer Composite Gate Backdrop
    this.paintGateBackdrop(g);

    // 5. Paint Static Scenery (Xe Kem Đồ Ăn Nhanh)
    this.paintScenery(g);

    // 6. Paint NPC lai.buon
    this.paintNpcLaiBuon(g);

    // 7. Paint Local Player Avatar (10-layer rendering)
    this.paintPlayer(g);

    // 8. Paint Dynamic Guide Indicators (Yellow downward "Vào" arrows)
    this.paintGuideArrows(g);

    // Restore Camera Translation
    g.translate(this.cameraX, this.cameraY - groundBaseY);

    // 9. Paint HUD (Menu, Player Info, Xu, Softkeys)
    this.paintHUD(g, w, h);

    // 10. Paint Dialogs / Menus if open
    if (this.isMenuOpen) {
      this.paintQuickMenu(g, w, h);
    } else if (this.isLaiBuonDialogOpen) {
      this.paintLaiBuonDialog(g, w, h);
    } else if (this.isShopOpen) {
      this.paintShopDialog(g, w, h);
    }
  }

  /**
   * Parallax Sky & Clouds
   */
  private paintParallaxSky(g: Graphics, screenW: number, groundBaseY: number): void {
    const suffix = this.isNight ? 'night' : 'day';
    const cloudsImg = this.spriteCache.get(`clouds_${suffix}`);
    if (!cloudsImg) return;

    const cloudW = cloudsImg.getWidth();
    const cloudH = cloudsImg.getHeight();
    const parallaxX = -Math.floor(this.cameraX * 0.15) % cloudW;
    const startX = parallaxX > 0 ? parallaxX - cloudW : parallaxX;
    const cloudY = Math.max(0, groundBaseY - 30);

    for (let x = startX; x < screenW; x += cloudW) {
      g.drawImage(cloudsImg, x, cloudY, 0);
    }
  }

  /**
   * Parallax Horizon (Green Fields in background)
   */
  private paintParallaxHorizon(g: Graphics, screenW: number, groundBaseY: number): void {
    const suffix = this.isNight ? 'night' : 'day';
    const horizonImg = this.spriteCache.get(`horizon_${suffix}`);
    if (!horizonImg) return;

    const horW = horizonImg.getWidth();
    const parallaxX = -Math.floor(this.cameraX * 0.35) % horW;
    const startX = parallaxX > 0 ? parallaxX - horW : parallaxX;
    const horY = groundBaseY + 80;

    for (let x = startX; x < screenW; x += horW) {
      g.drawImage(horizonImg, x, horY, 0);
    }
  }

  /**
   * Paint authentic seamless composite backdrop (Map 23)
   * Pristine original panorama: Left oak tree, wooden fence, FARM gate, CỬA HÀNG, right twisted tree.
   */
  private paintGateBackdrop(g: Graphics): void {
    const backdrop = this.spriteCache.get('backdrop');
    if (backdrop) {
      g.drawImage(backdrop, 0, 0, 0);
    }
  }

  /**
   * Paint Authentic Scenery:
   * 1. Gate Arch (ID 831) at the entrance to Farm
   * 2. Fruit & Vegetable Stall (ID 1214) between FARM gate and CỬA HÀNG
   * 3. CỬA HÀNG building (ID 835)
   * 4. Xe Kem Đồ Ăn Nhanh (ID 842) on the lawn to the right of CỬA HÀNG
   */
  private paintScenery(g: Graphics): void {
    // 1. Gate arch (ID 831) at the entrance to Farm
    const gateArch = this.spriteCache.get('gateArch');
    if (gateArch) {
      g.drawImage(gateArch, 341, 146, 0);
    }

    // 2. Fruit & Vegetable Stall (ID 1214) between FARM gate and CỬA HÀNG
    const fruitStall = this.spriteCache.get('fruitStall');
    if (fruitStall) {
      g.drawImage(fruitStall, 518, 140, 0);
    }

    // 3. CỬA HÀNG building (ID 835)
    const shop = this.spriteCache.get('shopBuilding');
    if (shop) {
      g.drawImage(shop, 658, 144, 0);
    }

    // 4. Xe Kem Đồ Ăn Nhanh (ID 842) on the lawn to the right of CỬA HÀNG
    const xeKem = this.spriteCache.get('xeKem');
    if (xeKem) {
      g.drawImage(xeKem, 888, 176, 0);
    }
  }

  /**
   * Paint NPC lai.buon with conical hat, áo bà ba, and fishing rod
   */
  private paintNpcLaiBuon(g: Graphics): void {
    const nx = this.npcLaiBuon.x;
    const ny = this.npcLaiBuon.y;

    // Foot shadow
    g.setColor(0x111827);
    g.fillArc(nx - 9, ny - 2, 18, 6, 0, 360);

    // 10-layer avatar rendering for NPC with authentic red rosette badge
    AvatarRenderer.paintAvatar(
      g,
      nx,
      ny,
      this.npcLaiBuon.wearing,
      this.npcLaiBuon.dir,
      this.npcLaiBuon.frame,
      this.npcLaiBuon.name,
      false,
      this.font
    );
  }

  /**
   * Paint Local Player Avatar
   */
  private paintPlayer(g: Graphics): void {
    const px = this.localPlayer.x;
    const py = this.localPlayer.y;

    // Foot shadow
    g.setColor(0x111827);
    g.fillArc(px - 9, py - 2, 18, 6, 0, 360);

    // 10-layer avatar rendering
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
   * Paint animated yellow downward arrows ("Vào") matching authentic Avatar 2.5.8
   */
  private paintGuideArrows(g: Graphics): void {
    const bounce = Math.floor((this.animTick % 12) / 4);

    // 1. "FARM" Wooden Gate Entrance (x = 434, y = 230)
    this.paintYellowArrow(g, 434, 230 + bounce, 'Vào');

    // 2. Fruit Stall / Sạp hàng trái cây nông sản (x = 600, y = 235)
    this.paintYellowArrow(g, 600, 235 + bounce, 'Vào');

    // 3. "CỬA HÀNG" Store Doorway (x = 760, y = 240)
    this.paintYellowArrow(g, 760, 240 + bounce, 'Vào');

    // 4. NPC lai.buon (x = 140, y = 245)
    this.paintYellowArrow(g, 140, 245 + bounce, 'Vào');

    // 5. Bottom Exit to World Map / City (x = 434, y = 405)
    this.paintYellowArrow(g, 434, 405 + bounce, 'Vào');
  }

  private paintYellowArrow(g: Graphics, x: number, y: number, text: string): void {
    this.font.drawString(g, text, x, y - 10, 2);
    // Downward yellow triangle
    g.setColor(0xFACC15);
    for (let row = 0; row < 6; row++) {
      g.fillRect(x - (5 - row), y + row, (5 - row) * 2 + 1, 1);
    }
  }

  /**
   * Paint Top HUD Status Bar
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

    // 2. Center Banner / Title
    const title = 'Cổng nông trại (Map 23)';
    this.font.drawString(g, title, Math.floor(w / 2), 10, 2);

    // 3. Right Status: Player Xu
    const xuVal = Number(this.controller?.model.userXu || 0);
    const xuStr = `${xuVal.toLocaleString('vi-VN')} Xu`;
    const textW = xuStr.length * 7;
    const startX = w - textW - 32;

    if (coinImg) {
      g.drawImage(coinImg, startX, 8, 0);
    }
    this.font.drawString(g, xuStr, startX + 22, 10, 0);

    // 4. Floating Feedback text
    if (this.feedbackTimer > 0) {
      const boxW = Math.min(w - 40, this.feedbackText.length * 8 + 24);
      const boxX = Math.floor((w - boxW) / 2);
      const boxY = 36;

      g.setColor(0x0F172A);
      g.fillRect(boxX, boxY, boxW, 22);
      g.setColor(0x38BDF8);
      g.drawRect(boxX, boxY, boxW, 22);
      this.font.drawString(g, this.feedbackText, Math.floor(w / 2), boxY + 4, 2);
    }
  }

  /**
   * Quick Menu Dialog
   */
  private paintQuickMenu(g: Graphics, w: number, h: number): void {
    const mw = 180;
    const mh = 140;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    this.font.drawString(g, '--- CỔNG NÔNG TRẠI ---', mx + Math.floor(mw / 2), my + 8, 2);

    const items = [
      '1. Vào Nông Trại',
      '2. Cửa Hàng Hạt Giống',
      '3. Gặp Lái Buôn',
      '4. Về Thành Phố',
      '5. Đóng Menu'
    ];

    let itemY = my + 30;
    for (const item of items) {
      this.font.drawString(g, item, mx + 16, itemY, 0);
      itemY += 20;
    }
  }

  /**
   * NPC lai.buon Dialog
   */
  private paintLaiBuonDialog(g: Graphics, w: number, h: number): void {
    const dw = 260;
    const dh = 150;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(dx, dy, dw, dh);
    g.setColor(0xFACC15);
    g.drawRect(dx, dy, dw, dh);

    this.font.drawString(g, '👨🌾 LÁI BUÔN NÔNG SẢN', dx + Math.floor(dw / 2), dy + 10, 2);
    this.font.drawString(g, 'Chào bà con! Tôi chuyên thu mua', dx + Math.floor(dw / 2), dy + 35, 2);
    this.font.drawString(g, 'nông sản và cung cấp các loại', dx + Math.floor(dw / 2), dy + 55, 2);
    this.font.drawString(g, 'hạt giống năng suất cao nhất!', dx + Math.floor(dw / 2), dy + 75, 2);

    // Action button: Vào Cửa Hàng
    g.setColor(0x16A34A);
    g.fillRect(dx + 20, dy + 105, 100, 26);
    g.setColor(0xFFFFFF);
    this.font.drawString(g, 'Cửa Hàng', dx + 70, dy + 110, 2);

    // Close button
    g.setColor(0x475569);
    g.fillRect(dx + 140, dy + 105, 100, 26);
    this.font.drawString(g, 'Đóng', dx + 190, dy + 110, 2);
  }

  /**
   * Seed Store Dialog
   */
  private paintShopDialog(g: Graphics, w: number, h: number): void {
    const mw = 280;
    const mh = 220;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    g.setColor(0x0F172A);
    g.fillRect(mx, my, mw, mh);
    g.setColor(0x38BDF8);
    g.drawRect(mx, my, mw, mh);

    g.setColor(0x1E293B);
    g.fillRect(mx, my, mw, 26);
    this.font.drawString(g, '🏪 CỬA HÀNG HẠT GIỐNG', mx + Math.floor(mw / 2), my + 6, 2);

    // Close [X]
    g.setColor(0xEF4444);
    g.fillRect(mx + mw - 22, my + 4, 18, 18);
    this.font.drawString(g, 'X', mx + mw - 13, my + 6, 2);

    // Seeds list
    const seeds = [
      { id: 1, name: 'Cà chua', price: 100, exp: 5 },
      { id: 2, name: 'Cà rốt', price: 150, exp: 8 },
      { id: 3, name: 'Khóm', price: 300, exp: 15 },
      { id: 4, name: 'Dưa hấu', price: 500, exp: 25 },
      { id: 5, name: 'Bắp', price: 200, exp: 10 }
    ];

    let rowY = my + 35;
    for (const seed of seeds) {
      g.setColor(0x1E293B);
      g.fillRect(mx + 10, rowY, mw - 20, 30);
      g.setColor(0x334155);
      g.drawRect(mx + 10, rowY, mw - 20, 30);

      this.font.drawString(g, `${seed.id}. ${seed.name} (${seed.price} Xu)`, mx + 20, rowY + 8, 0);

      // Buy button
      g.setColor(0x16A34A);
      g.fillRect(mx + mw - 70, rowY + 4, 52, 22);
      this.font.drawString(g, 'Mua', mx + mw - 44, rowY + 7, 2);

      rowY += 34;
    }
  }

  // =========================================================================
  // User Input & Interaction Handling
  // =========================================================================

  public pointerPressed(x: number, y: number): void {
    const w = this.screenW;
    const h = this.screenH;

    // 1. Check Dialog Interactions
    if (this.isLaiBuonDialogOpen) {
      const dw = 260;
      const dh = 150;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      // Click "Cửa Hàng"
      if (x >= dx + 20 && x <= dx + 120 && y >= dy + 105 && y <= dy + 131) {
        this.isLaiBuonDialogOpen = false;
        this.isShopOpen = true;
        return;
      }
      // Click "Đóng"
      if (x >= dx + 140 && x <= dx + 240 && y >= dy + 105 && y <= dy + 131) {
        this.isLaiBuonDialogOpen = false;
        return;
      }
      return;
    }

    if (this.isShopOpen) {
      const mw = 280;
      const mh = 220;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      // Close button [X]
      if (x >= mx + mw - 26 && x <= mx + mw && y >= my && y <= my + 26) {
        this.isShopOpen = false;
        return;
      }
      // Buy buttons
      let rowY = my + 35;
      for (let i = 1; i <= 5; i++) {
        if (x >= mx + mw - 70 && x <= mx + mw - 18 && y >= rowY + 4 && y <= rowY + 26) {
          if (this.controller) {
            this.controller.buySeed(i, 1);
            this.feedbackText = `Đã gửi yêu cầu mua hạt giống #${i}`;
            this.feedbackTimer = 60;
          }
          return;
        }
        rowY += 34;
      }
      return;
    }

    if (this.isMenuOpen) {
      const mw = 180;
      const mh = 140;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      const clickedIdx = Math.floor((y - (my + 30)) / 20);
      this.isMenuOpen = false;

      if (clickedIdx === 0) {
        this.promptEnterFarm();
      } else if (clickedIdx === 1) {
        this.openShop();
      } else if (clickedIdx === 2) {
        this.openLaiBuonDialog();
      } else if (clickedIdx === 3) {
        this.promptExitToWorldMap();
      }
      return;
    }

    // 2. Top Left Hamburger Menu Button
    if (x >= 6 && x <= 32 && y >= 6 && y <= 28) {
      this.isMenuOpen = !this.isMenuOpen;
      return;
    }

    // 4. World Space Taps / Clicks
    const groundBaseY = Math.max(0, h - this.MAP_HEIGHT);
    const worldX = x + this.cameraX;
    const worldY = y + this.cameraY - groundBaseY;

    // A. Click on / near "FARM" gate -> Walk and Enter
    if (Math.abs(worldX - 434) < 55 && worldY <= 260 && worldY >= 140) {
      this.localPlayer.targetX = 434;
      this.localPlayer.targetY = 220;
      this.feedbackText = 'Đang tiến vào cổng Nông Trại...';
      this.feedbackTimer = 50;
      return;
    }

    // B. Click on / near "CỬA HÀNG" store -> Walk and Open
    if (Math.abs(worldX - 755) < 55 && worldY <= 265 && worldY >= 140) {
      this.localPlayer.targetX = 755;
      this.localPlayer.targetY = 230;
      this.feedbackText = 'Đang đi đến Cửa Hàng...';
      this.feedbackTimer = 50;
      return;
    }

    // C. Click on / near Fruit & Vegetable Stall -> Walk and Talk with Lái Buôn
    if (worldX >= 500 && worldX <= 690 && worldY >= 180 && worldY <= 340) {
      this.localPlayer.targetX = 600;
      this.localPlayer.targetY = 320;
      this.feedbackText = 'Đang đến sạp hàng nông sản...';
      this.feedbackTimer = 50;
      return;
    }

    // D. Click on / near NPC lai.buon -> Walk and Talk
    if (Math.abs(worldX - 140) < 55 && worldY <= 300 && worldY >= 200) {
      this.localPlayer.targetX = 140;
      this.localPlayer.targetY = 270;
      this.feedbackText = 'Đang gặp Lái Buôn...';
      this.feedbackTimer = 50;
      return;
    }

    // E. Click on / near Xe Kem / Fast Food Cart -> Walk to cart
    if (worldX >= 860 && worldX <= 990 && worldY >= 160 && worldY <= 300) {
      this.localPlayer.targetX = 930;
      this.localPlayer.targetY = 280;
      this.feedbackText = 'Xe kem & đồ ăn nhanh';
      this.feedbackTimer = 50;
      return;
    }

    // D. Click on / near Bottom Exit Arrow -> Walk and Exit
    if (Math.abs(worldX - 434) < 60 && worldY >= 380) {
      this.localPlayer.targetX = 434;
      this.localPlayer.targetY = 410;
      this.feedbackText = 'Đang ra ngoài Thành Phố...';
      this.feedbackTimer = 50;
      return;
    }

    // E. General Walk-to Click
    const clampedX = Math.max(50, Math.min(worldX, 1250));
    const clampedY = Math.max(300, Math.min(worldY, 410));
    this.localPlayer.targetX = clampedX;
    this.localPlayer.targetY = clampedY;
  }

  public keyPressed(keyCode: number): void {
    const step = 20;

    switch (keyCode) {
      case -1: // Up
      case 50: // '2'
      case 119: // 'w'
      case 87:
        if (this.isWalkable(this.localPlayer.x, this.localPlayer.y - step)) {
          this.localPlayer.targetY = this.localPlayer.y - step;
        }
        break;

      case -2: // Down
      case 56: // '8'
      case 115: // 's'
      case 83:
        if (this.isWalkable(this.localPlayer.x, this.localPlayer.y + step)) {
          this.localPlayer.targetY = this.localPlayer.y + step;
        }
        break;

      case -3: // Left
      case 52: // '4'
      case 97: // 'a'
      case 65:
        if (this.isWalkable(this.localPlayer.x - step, this.localPlayer.y)) {
          this.localPlayer.targetX = this.localPlayer.x - step;
        }
        break;

      case -4: // Right
      case 54: // '6'
      case 100: // 'd'
      case 68:
        if (this.isWalkable(this.localPlayer.x + step, this.localPlayer.y)) {
          this.localPlayer.targetX = this.localPlayer.x + step;
        }
        break;

      case -5: // Center / Fire / OK
      case 53: // '5'
      case 13: // Enter
      case 32: // Space
        this.interactNearest();
        break;
    }
  }

  private interactNearest(): void {
    const px = this.localPlayer.x;
    const py = this.localPlayer.y;

    // Distances
    const distGate = Math.hypot(px - 434, py - 220);
    const distStore = Math.hypot(px - 755, py - 230);
    const distLaiBuon = Math.hypot(px - 140, py - 270);
    const distExit = Math.hypot(px - 434, py - 410);

    const minDist = Math.min(distGate, distStore, distLaiBuon, distExit);

    if (minDist === distGate && distGate < 120) {
      this.promptEnterFarm();
    } else if (minDist === distStore && distStore < 120) {
      this.openShop();
    } else if (minDist === distLaiBuon && distLaiBuon < 120) {
      this.openLaiBuonDialog();
    } else if (minDist === distExit && distExit < 100) {
      this.promptExitToWorldMap();
    } else {
      this.isMenuOpen = true;
    }
  }

  public promptEnterFarm(): void {
    console.log('[FarmGateScreen] Transitioning into Private Farm (Map 25)...');
    this.feedbackText = 'Đang vào Nông Trại của bạn...';
    this.feedbackTimer = 60;
    if (this.onEnterFarm) {
      this.onEnterFarm(this.network.myUserId || 1);
    }
  }

  public promptExitToWorldMap(): void {
    console.log('[FarmGateScreen] Returning to World Map (Thành phố)...');
    if (this.onExitToWorldMap) {
      this.onExitToWorldMap();
    }
  }

  public openShop(): void {
    this.isShopOpen = true;
    this.feedbackText = 'Đang mở Cửa Hàng Hạt Giống';
    this.feedbackTimer = 60;
  }

  public openLaiBuonDialog(): void {
    this.isLaiBuonDialogOpen = true;
  }
}

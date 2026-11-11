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
 * - "Sạp Hoa Quả" (Fruit & Vegetable Stall) with animated downward yellow "Vào" arrow.
 * - "Xe Kem Đồ Ăn Nhanh" (fast food / ice-cream cart) scenery on the right.
 * - Bottom exit with animated downward yellow "Vào" arrow back to World Map.
 * - Interactive walking, click-to-move, camera tracking, and classic softkeys.
 * - Authentic 1:1 J2ME Dialog skin (warm parchment, dark wood header, golden highlight).
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

  // Asset Cache
  private spriteCache: Map<string, Image> = new Map();
  public isAssetsLoaded = false;
  public isNight = false;

  // Animation ticks
  private animTick = 0;

  // Active Dialog / Modal States
  public isMenuOpen = false;
  public isShopOpen = false;
  public isLaiBuonDialogOpen = false;
  public isFruitStallOpen = false;
  public isFastFoodOpen = false;

  // Selection states
  public selectedMenuIndex = 0;
  public selectedLaiBuonIndex = 0;
  public selectedShopTab: 'seeds' | 'animals' | 'fertilizer' = 'seeds';
  public selectedShopItemIndex = 0;
  public shopQuantity = 1;
  public selectedFruitIndex = 0;
  public selectedFastFoodIndex = 0;

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
      this.preloadSprite('gateArch', '/assets/farm_gate/gate_arch.png'),
      this.preloadSprite('fruitStall', '/assets/farm_gate/fruit_stall.png'),
      this.preloadSprite('shopBuilding', '/assets/farm_gate/cua_hang.png'),
      this.preloadSprite('xeKem', '/assets/farm_gate/xe_kem.png'),
      this.preloadSprite('fence838', '/assets/home/838.png'),
      this.preloadSprite('tree244', '/assets/home/244.png'),
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
          this.checkTriggerZones();
        }

        // Mid-walk trigger check (seamless entry when touching threshold)
        this.checkMidWalkTriggers();
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

    // 6. Grass path in front of Xe Kem
    if (x >= 890 && x <= 970 && y >= 260 && y < 290) return true;

    // Non-walkable lawns and structures
    return false;
  }

  /**
   * Fast trigger check while walking through doorways
   */
  private checkMidWalkTriggers(): void {
    // 1. Passing through FARM gate arch threshold
    if (Math.abs(this.localPlayer.x - 434) <= 40 && this.localPlayer.y <= 225) {
      this.promptEnterFarm();
      return;
    }

    // 2. Passing through Bottom Exit threshold
    if (Math.abs(this.localPlayer.x - 434) <= 45 && this.localPlayer.y >= 405) {
      this.promptExitToWorldMap();
      return;
    }
  }

  /**
   * Check interactive zones when player stops walking
   */
  private checkTriggerZones(): void {
    // 1. Inside FARM Gate
    if (Math.abs(this.localPlayer.x - 434) <= 45 && this.localPlayer.y <= 235) {
      this.promptEnterFarm();
      return;
    }

    // 2. Inside CỬA HÀNG Store Entrance
    if (Math.abs(this.localPlayer.x - 755) <= 45 && this.localPlayer.y <= 245) {
      this.openShop();
      return;
    }

    // 3. Beside Fruit Stall (x = 600, y = 310)
    if (Math.abs(this.localPlayer.x - 600) <= 50 && Math.abs(this.localPlayer.y - 310) <= 35) {
      this.openFruitStall();
      return;
    }

    // 4. Beside NPC lai.buon (x = 140, y = 280)
    if (Math.abs(this.localPlayer.x - 140) <= 45 && Math.abs(this.localPlayer.y - 280) <= 35) {
      this.openLaiBuonDialog();
      return;
    }

    // 5. Beside Xe Kem (x = 930, y = 280)
    if (Math.abs(this.localPlayer.x - 930) <= 50 && Math.abs(this.localPlayer.y - 280) <= 35) {
      this.openFastFoodDialog();
      return;
    }

    // 6. At Bottom Exit to City
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

    // 9. Paint HUD (Menu, Player Info, Xu, Feedback)
    this.paintHUD(g, w, h);

    // 10. Paint Dialogs / Menus if open (Authentic 1:1 J2ME design)
    if (this.isMenuOpen) {
      this.paintQuickMenu(g, w, h);
    } else if (this.isLaiBuonDialogOpen) {
      this.paintLaiBuonDialog(g, w, h);
    } else if (this.isShopOpen) {
      this.paintShopDialog(g, w, h);
    } else if (this.isFruitStallOpen) {
      this.paintFruitStallDialog(g, w, h);
    } else if (this.isFastFoodOpen) {
      this.paintFastFoodDialog(g, w, h);
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
   * Paint authentic landscape, fence, grass and dirt roads (Map 23)
   */
  private paintGateBackdrop(g: Graphics): void {
    // 1. Top wooden fence running across the screen (y = 140)
    const fence = this.spriteCache.get('fence838');
    if (fence) {
      const fW = fence.getWidth();
      for (let x = 0; x < this.MAP_WIDTH; x += fW) {
        g.drawImage(fence, x, 140, 0);
      }
    }

    // 2. Big lush trees behind top fence
    const tree = this.spriteCache.get('tree244');
    if (tree) {
      g.drawImage(tree, -30, 10, 0);
      g.drawImage(tree, 1150, 10, 0);
    }

    // 3. Green grass base (y = 180 to bottom)
    const grassColor = this.isNight ? 0x225515 : 0x55B92B;
    g.setColor(grassColor);
    g.fillRect(0, 180, this.MAP_WIDTH, this.MAP_HEIGHT - 180);

    // 4. Earth dirt pathways
    const roadColor = this.isNight ? 0x6E5E3D : 0xD2BE8C;
    g.setColor(roadColor);

    // Left vertical dirt path leading to the "FARM" gate arch (x = 380..470, y = 190..310)
    g.fillRect(380, 190, 95, 120);

    // Right vertical dirt path leading to the "CỬA HÀNG" shop (x = 720..810, y = 190..310)
    g.fillRect(720, 190, 95, 120);

    // Main horizontal dirt roadway (y = 300 to 425)
    g.fillRect(0, 300, this.MAP_WIDTH, 125);

    // 5. Road bottom embankment / cobblestone curb (y = 425 to 466)
    const curbColor = this.isNight ? 0x483D27 : 0xA08C5F;
    g.setColor(curbColor);
    g.fillRect(0, 425, this.MAP_WIDTH, 41);
    g.setColor(this.isNight ? 0x382F1E : 0x8C7A53);
    g.fillRect(0, 425, this.MAP_WIDTH, 3);
  }

  /**
   * Paint Authentic Scenery:
   * 1. Gate Arch (ID 831) at the entrance to Farm
   * 2. Fruit & Vegetable Stall (ID 1214) between FARM gate and CỬA HÀNG
   * 3. CỬA HÀNG building (ID 835)
   * 4. Xe Kem Đồ Ăn Nhanh (ID 842) on the lawn to the right of CỬA HÀNG
   */
  private paintScenery(g: Graphics): void {
    const gateArch = this.spriteCache.get('gateArch');
    if (gateArch) {
      g.drawImage(gateArch, 341, 146, 0);
    }

    const fruitStall = this.spriteCache.get('fruitStall');
    if (fruitStall) {
      g.drawImage(fruitStall, 518, 140, 0);
    }

    const shop = this.spriteCache.get('shopBuilding');
    if (shop) {
      g.drawImage(shop, 658, 144, 0);
    }

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

  // =========================================================================
  // Authentic 1:1 J2ME Dialogs & Menus
  // =========================================================================

  /**
   * 1. Authentic Quick Menu
   */
  private paintQuickMenu(g: Graphics, w: number, h: number): void {
    const mw = 220;
    const mh = 210;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CỔNG NÔNG TRẠI');

    const items = [
      '1. Vào Nông Trại (Map 25)',
      '2. Cửa Hàng Hạt Giống',
      '3. Gặp Lái Buôn (lai.buon)',
      '4. Sạp Hoa Quả Nông Sản',
      '5. Xe Kem & Đồ Ăn Nhanh',
      '6. Về Lại Thành Phố'
    ];

    let rowY = my + 34;
    for (let i = 0; i < items.length; i++) {
      const isSel = i === this.selectedMenuIndex;
      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, items[i], isSel);
      rowY += 26;
    }

    // Action buttons
    this.skinPainter.paintAuthenticButton(g, mx + 12, my + mh - 26, 90, 20, 'Chọn', 'primary');
    this.skinPainter.paintAuthenticButton(g, mx + mw - 102, my + mh - 26, 90, 20, 'Đóng', 'secondary');
  }

  /**
   * 2. Authentic NPC lai.buon Dialog
   */
  private paintLaiBuonDialog(g: Graphics, w: number, h: number): void {
    const dw = 300;
    const dh = 240;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, 'LÁI BUÔN NÔNG SẢN');

    // Speech bubble info
    this.font.drawString(g, 'Lái Buôn:', dx + 12, dy + 34, 0);
    this.font.drawString(g, '"Chào bà con! Tôi thu mua nông sản', dx + 12, dy + 48, 0);
    this.font.drawString(g, 'với giá tốt nhất và cung cấp phân bón!"', dx + 12, dy + 62, 0);

    const options = [
      '1. Bán nông sản đã thu hoạch',
      '2. Bán tất cả nông sản trong kho',
      '3. Mua phân bón cao cấp (500 Xu)'
    ];

    let rowY = dy + 82;
    for (let i = 0; i < options.length; i++) {
      const isSel = i === this.selectedLaiBuonIndex;
      this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 24, options[i], isSel);
      rowY += 26;
    }

    // Action buttons
    this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, 'Chọn', 'primary');
    this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, 'Đóng', 'secondary');
  }

  /**
   * 3. Authentic CỬA HÀNG (Farm Store) Dialog
   */
  private paintShopDialog(g: Graphics, w: number, h: number): void {
    const mw = 340;
    const mh = 280;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, 'CỬA HÀNG NÔNG TRẠI');

    // Tabs: [ Hạt giống ] [ Vật nuôi ] [ Phân bón ]
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

    // Item List
    let items: Array<{ id: number; name: string; price: number; detail: string }> = [];

    if (this.selectedShopTab === 'seeds') {
      items = [
        { id: 1, name: 'Cà chua', price: 100, detail: '5 phút' },
        { id: 2, name: 'Cà rốt', price: 150, detail: '8 phút' },
        { id: 3, name: 'Khóm (Dứa)', price: 300, detail: '15 phút' },
        { id: 4, name: 'Dưa hấu', price: 500, detail: '25 phút' },
        { id: 5, name: 'Bắp (Ngô)', price: 200, detail: '10 phút' }
      ];
    } else if (this.selectedShopTab === 'animals') {
      items = [
        { id: 1, name: 'Gà con', price: 5000, detail: 'Nuôi lấy trứng' },
        { id: 2, name: 'Vịt con', price: 4000, detail: 'Nuôi lấy trứng' },
        { id: 3, name: 'Heo giống', price: 10000, detail: 'Nuôi lấy thịt' },
        { id: 4, name: 'Bò sữa giống', price: 20000, detail: 'Vắt sữa tươi' }
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
      const isSel = i === this.selectedShopItemIndex;
      const text = `${item.name} (${item.detail})`;
      const priceText = `${item.price.toLocaleString('vi-VN')} Xu`;

      this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, priceText);
      rowY += 28;
    }

    // Bottom Quantity & Action Buttons
    const botY = my + mh - 30;

    // Quantity selector: [ - ] [ 1 ] [ + ]
    g.setColor(0xFEF3C7);
    g.fillRect(mx + 12, botY, 70, 22);
    g.setColor(0x78350F);
    g.drawRect(mx + 12, botY, 70, 22);

    this.font.drawString(g, '-', mx + 20, botY + 4, 2);
    this.font.drawString(g, `${this.shopQuantity}`, mx + 47, botY + 4, 2);
    this.font.drawString(g, '+', mx + 74, botY + 4, 2);

    // Buy Button
    this.skinPainter.paintAuthenticButton(g, mx + 95, botY, 115, 22, 'Mua vật phẩm', 'primary');

    // Close Button
    this.skinPainter.paintAuthenticButton(g, mx + mw - 110, botY, 98, 22, 'Đóng', 'secondary');
  }

  /**
   * 4. Authentic Sạp Hoa Quả (Fruit Stall) Dialog
   */
  private paintFruitStallDialog(g: Graphics, w: number, h: number): void {
    const dw = 300;
    const dh = 240;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, 'SẠP HOA QUẢ & NÔNG SẢN');

    this.font.drawString(g, 'Cô Chủ Sạp:', dx + 12, dy + 34, 0);
    this.font.drawString(g, '"Hoa quả tươi mới hái, ngon ngọt thanh mát!', dx + 12, dy + 48, 0);
    this.font.drawString(g, 'Bà con ghé sạp xem giá hoặc bán nông sản nhé!"', dx + 12, dy + 62, 0);

    const options = [
      '1. Bán Dưa hấu tươi (500 Xu/quả)',
      '2. Bán Cà chua mọng (150 Xu/quả)',
      '3. Bán Cà rốt tươi (200 Xu/củ)',
      '4. Bán Bắp ngọt (250 Xu/bắp)'
    ];

    let rowY = dy + 82;
    for (let i = 0; i < options.length; i++) {
      const isSel = i === this.selectedFruitIndex;
      this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 24, options[i], isSel);
      rowY += 26;
    }

    this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, 'Bán hàng', 'primary');
    this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, 'Đóng', 'secondary');
  }

  /**
   * 5. Authentic Xe Kem Đồ Ăn Nhanh Dialog
   */
  private paintFastFoodDialog(g: Graphics, w: number, h: number): void {
    const dw = 300;
    const dh = 250;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, 'XE KEM & ĐỒ ĂN NHANH');

    this.font.drawString(g, 'Thực đơn nạp lại năng lượng cho nông dân:', dx + 12, dy + 34, 0);

    const menu = [
      { name: '1. Kem ốc quế', price: 50, energy: '+20 Năng lượng' },
      { name: '2. Kem ly dâu tây', price: 100, energy: '+40 Năng lượng' },
      { name: '3. Bánh mì thịt giòn', price: 200, energy: '+80 Năng lượng' },
      { name: '4. Nước mía ngọt mát', price: 50, energy: '+25 Năng lượng' }
    ];

    let rowY = dy + 54;
    for (let i = 0; i < menu.length; i++) {
      const item = menu[i];
      const isSel = i === this.selectedFastFoodIndex;
      const text = `${item.name} (${item.energy})`;
      const priceText = `${item.price} Xu`;

      this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 26, text, isSel, priceText);
      rowY += 28;
    }

    this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, 'Mua ăn ngay', 'primary');
    this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, 'Đóng', 'secondary');
  }

  // =========================================================================
  // User Input & Interaction Handling
  // =========================================================================

  public pointerPressed(x: number, y: number): void {
    const w = this.screenW;
    const h = this.screenH;

    // 1. Check Dialog Interactions
    if (this.isLaiBuonDialogOpen) {
      this.handleLaiBuonClick(x, y, w, h);
      return;
    }

    if (this.isShopOpen) {
      this.handleShopClick(x, y, w, h);
      return;
    }

    if (this.isFruitStallOpen) {
      this.handleFruitStallClick(x, y, w, h);
      return;
    }

    if (this.isFastFoodOpen) {
      this.handleFastFoodClick(x, y, w, h);
      return;
    }

    if (this.isMenuOpen) {
      this.handleMenuClick(x, y, w, h);
      return;
    }

    // 2. Top Left Hamburger Menu Button [ = ]
    if (x >= 6 && x <= 32 && y >= 6 && y <= 28) {
      this.isMenuOpen = !this.isMenuOpen;
      return;
    }

    // 3. World Space Taps / Clicks
    const groundBaseY = Math.max(0, h - this.MAP_HEIGHT);
    const worldX = x + this.cameraX;
    const worldY = y + this.cameraY - groundBaseY;

    // A. Click on / near "FARM" gate arch -> Walk and Enter
    if (Math.abs(worldX - 434) < 55 && worldY <= 260 && worldY >= 140) {
      const dist = Math.hypot(this.localPlayer.x - 434, this.localPlayer.y - 220);
      if (dist <= 45) {
        this.promptEnterFarm();
      } else {
        this.localPlayer.targetX = 434;
        this.localPlayer.targetY = 220;
        this.feedbackText = 'Đang tiến vào cổng Nông Trại...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // B. Click on / near "CỬA HÀNG" store -> Walk and Open
    if (Math.abs(worldX - 755) < 55 && worldY <= 265 && worldY >= 140) {
      const dist = Math.hypot(this.localPlayer.x - 755, this.localPlayer.y - 230);
      if (dist <= 45) {
        this.openShop();
      } else {
        this.localPlayer.targetX = 755;
        this.localPlayer.targetY = 230;
        this.feedbackText = 'Đang đi đến Cửa Hàng...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // C. Click on / near Fruit & Vegetable Stall -> Walk and Open Stall
    if (worldX >= 500 && worldX <= 670 && worldY >= 160 && worldY <= 320) {
      const dist = Math.hypot(this.localPlayer.x - 600, this.localPlayer.y - 310);
      if (dist <= 50) {
        this.openFruitStall();
      } else {
        this.localPlayer.targetX = 600;
        this.localPlayer.targetY = 310;
        this.feedbackText = 'Đang đến sạp hoa quả nông sản...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // D. Click on / near NPC lai.buon -> Walk and Talk
    if (Math.abs(worldX - 140) < 55 && worldY <= 300 && worldY >= 200) {
      const dist = Math.hypot(this.localPlayer.x - 140, this.localPlayer.y - 275);
      if (dist <= 50) {
        this.openLaiBuonDialog();
      } else {
        this.localPlayer.targetX = 140;
        this.localPlayer.targetY = 275;
        this.feedbackText = 'Đang gặp Lái Buôn...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // E. Click on / near Xe Kem / Fast Food Cart -> Walk to cart
    if (worldX >= 860 && worldX <= 990 && worldY >= 160 && worldY <= 300) {
      const dist = Math.hypot(this.localPlayer.x - 930, this.localPlayer.y - 280);
      if (dist <= 50) {
        this.openFastFoodDialog();
      } else {
        this.localPlayer.targetX = 930;
        this.localPlayer.targetY = 280;
        this.feedbackText = 'Đang đến xe kem & đồ ăn nhanh...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // F. Click on / near Bottom Exit Arrow -> Walk and Exit
    if (Math.abs(worldX - 434) < 60 && worldY >= 380) {
      const dist = Math.hypot(this.localPlayer.x - 434, this.localPlayer.y - 410);
      if (dist <= 50) {
        this.promptExitToWorldMap();
      } else {
        this.localPlayer.targetX = 434;
        this.localPlayer.targetY = 410;
        this.feedbackText = 'Đang ra ngoài Thành Phố...';
        this.feedbackTimer = 50;
      }
      return;
    }

    // G. General Walk-to Click
    const clampedX = Math.max(50, Math.min(worldX, 1250));
    const clampedY = Math.max(300, Math.min(worldY, 410));
    this.localPlayer.targetX = clampedX;
    this.localPlayer.targetY = clampedY;
  }

  // --- Modal Click Handlers ---

  private handleLaiBuonClick(x: number, y: number, w: number, h: number): void {
    const dw = 300;
    const dh = 240;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    // Close button [X]
    if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
      this.isLaiBuonDialogOpen = false;
      return;
    }

    // Options selection
    let rowY = dy + 82;
    for (let i = 0; i < 3; i++) {
      if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedLaiBuonIndex = i;
        return;
      }
      rowY += 26;
    }

    // Action button [ Chọn ]
    if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      if (this.selectedLaiBuonIndex === 0) {
        // Bán nông sản
        if (this.controller) {
          this.controller.isWarehouseOpen = true;
          this.isLaiBuonDialogOpen = false;
        }
      } else if (this.selectedLaiBuonIndex === 1) {
        // Bán tất cả
        if (this.controller) {
          this.controller.sellAllHarvested();
          this.feedbackText = 'Đã bán tất cả nông sản cho Lái Buôn!';
          this.feedbackTimer = 80;
          this.isLaiBuonDialogOpen = false;
        }
      } else if (this.selectedLaiBuonIndex === 2) {
        // Mua phân bón
        if (this.controller) {
          this.controller.buySeed(10, 1); // Buy fertilizer item
          this.feedbackText = 'Đã mua 1 bao phân bón cao cấp!';
          this.feedbackTimer = 80;
        }
      }
      return;
    }

    // Close button [ Đóng ]
    if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      this.isLaiBuonDialogOpen = false;
      return;
    }
  }

  private handleShopClick(x: number, y: number, w: number, h: number): void {
    const mw = 340;
    const mh = 280;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    // Close button [X]
    if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
      this.isShopOpen = false;
      return;
    }

    // Tabs
    const tabW = Math.floor((mw - 24) / 3);
    const tabY = my + 32;
    if (y >= tabY && y <= tabY + 20) {
      if (x >= mx + 12 && x < mx + 12 + tabW) {
        this.selectedShopTab = 'seeds';
        this.selectedShopItemIndex = 0;
        return;
      }
      if (x >= mx + 12 + tabW && x < mx + 12 + tabW * 2) {
        this.selectedShopTab = 'animals';
        this.selectedShopItemIndex = 0;
        return;
      }
      if (x >= mx + 12 + tabW * 2 && x <= mx + mw - 12) {
        this.selectedShopTab = 'fertilizer';
        this.selectedShopItemIndex = 0;
        return;
      }
    }

    // Items list selection
    let rowY = my + 58;
    const itemCount = this.selectedShopTab === 'seeds' ? 5 : (this.selectedShopTab === 'animals' ? 4 : 3);
    for (let i = 0; i < itemCount; i++) {
      if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
        this.selectedShopItemIndex = i;
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

    // Buy Button
    if (x >= mx + 95 && x <= mx + 210 && y >= botY && y <= botY + 22) {
      if (this.controller) {
        const itemId = this.selectedShopItemIndex + 1;
        this.controller.buySeed(itemId, this.shopQuantity);
        this.feedbackText = `Đã gửi yêu cầu mua ${this.shopQuantity} vật phẩm!`;
        this.feedbackTimer = 60;
      }
      return;
    }

    // Close Button
    if (x >= mx + mw - 110 && x <= mx + mw - 12 && y >= botY && y <= botY + 22) {
      this.isShopOpen = false;
      return;
    }
  }

  private handleFruitStallClick(x: number, y: number, w: number, h: number): void {
    const dw = 300;
    const dh = 240;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
      this.isFruitStallOpen = false;
      return;
    }

    let rowY = dy + 82;
    for (let i = 0; i < 4; i++) {
      if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 24) {
        this.selectedFruitIndex = i;
        return;
      }
      rowY += 26;
    }

    // Action button [ Bán hàng ]
    if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      if (this.controller) {
        const cropId = this.selectedFruitIndex === 0 ? 4 : (this.selectedFruitIndex === 1 ? 1 : (this.selectedFruitIndex === 2 ? 2 : 5));
        this.controller.sellProduce(cropId, 1);
        this.feedbackText = 'Đã bán 1 phần nông sản vào sạp hoa quả!';
        this.feedbackTimer = 60;
      }
      return;
    }

    // Close button
    if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      this.isFruitStallOpen = false;
      return;
    }
  }

  private handleFastFoodClick(x: number, y: number, w: number, h: number): void {
    const dw = 300;
    const dh = 250;
    const dx = Math.floor((w - dw) / 2);
    const dy = Math.floor((h - dh) / 2);

    if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
      this.isFastFoodOpen = false;
      return;
    }

    let rowY = dy + 54;
    for (let i = 0; i < 4; i++) {
      if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 26) {
        this.selectedFastFoodIndex = i;
        return;
      }
      rowY += 28;
    }

    // Buy Button [ Mua ăn ngay ]
    if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      const items = ['Kem ốc quế', 'Kem ly dâu', 'Bánh mì thịt', 'Nước mía'];
      this.feedbackText = `Đã thưởng thức ${items[this.selectedFastFoodIndex]}! Hồi phục năng lượng!`;
      this.feedbackTimer = 80;
      this.isFastFoodOpen = false;
      return;
    }

    // Close Button
    if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
      this.isFastFoodOpen = false;
      return;
    }
  }

  private handleMenuClick(screenX: number, screenY: number, w: number, h: number): void {
    const mw = 220;
    const mh = 210;
    const mx = Math.floor((w - mw) / 2);
    const my = Math.floor((h - mh) / 2);

    if (screenX < mx || screenX > mx + mw || screenY < my || screenY > my + mh) {
      this.isMenuOpen = false;
      return;
    }

    // Click on option rows
    let rowY = my + 34;
    for (let i = 0; i < 6; i++) {
      if (screenX >= mx + 8 && screenX <= mx + mw - 8 && screenY >= rowY && screenY <= rowY + 24) {
        this.selectedMenuIndex = i;
        this.executeMenuItem(i);
        return;
      }
      rowY += 26;
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
        this.promptEnterFarm();
        break;
      case 1:
        this.openShop();
        break;
      case 2:
        this.openLaiBuonDialog();
        break;
      case 3:
        this.openFruitStall();
        break;
      case 4:
        this.openFastFoodDialog();
        break;
      case 5:
        this.promptExitToWorldMap();
        break;
    }
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
    const distFruit = Math.hypot(px - 600, py - 310);
    const distLaiBuon = Math.hypot(px - 140, py - 275);
    const distXeKem = Math.hypot(px - 930, py - 280);
    const distExit = Math.hypot(px - 434, py - 410);

    const minDist = Math.min(distGate, distStore, distFruit, distLaiBuon, distXeKem, distExit);

    if (minDist === distGate && distGate < 120) {
      this.promptEnterFarm();
    } else if (minDist === distStore && distStore < 120) {
      this.openShop();
    } else if (minDist === distFruit && distFruit < 120) {
      this.openFruitStall();
    } else if (minDist === distLaiBuon && distLaiBuon < 120) {
      this.openLaiBuonDialog();
    } else if (minDist === distXeKem && distXeKem < 120) {
      this.openFastFoodDialog();
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

  public openFruitStall(): void {
    this.isFruitStallOpen = true;
  }

  public openFastFoodDialog(): void {
    this.isFastFoodOpen = true;
  }
}

import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { IFont } from '../renderer/BitmapFont.js';

/**
 * Authentic Avatar Teamobi 2.5.8 Region Definition
 * Mapped 1:1 with Java Server map IDs and original game coordinates
 */
export interface WorldRegion {
  id: number;
  index: number;
  key: string;
  name: string;
  mapId: number;    // Server Map ID
  spawnX: number;
  spawnY: number;
  normPinX: number;
  normPinY: number;
  normTextX: number;
  normTextY: number;
}

export interface FloatingCloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
  alpha: number;
  type: number; // 0 for clmini, 1 for cl00
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: 0,
    index: 0,
    key: 'residential',
    name: 'Khu nhà ở',
    mapId: 21,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.2520,
    normPinY: 0.1880,
    normTextX: 0.2520,
    normTextY: 0.1360
  },
  {
    id: 1,
    index: 1,
    key: 'ecological',
    name: 'Khu sinh thái',
    mapId: 13,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.7850,
    normPinY: 0.2240,
    normTextX: 0.7850,
    normTextY: 0.1780
  },
  {
    id: 2,
    index: 2,
    key: 'airport',
    name: 'Sân bay',
    mapId: 20,
    spawnX: 120,
    spawnY: 144,
    normPinX: 0.9380,
    normPinY: 0.3050,
    normTextX: 0.9380,
    normTextY: 0.2600
  },
  {
    id: 3,
    index: 3,
    key: 'entertainment',
    name: 'Khu giải trí',
    mapId: 9,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.4420,
    normPinY: 0.4600,
    normTextX: 0.4420,
    normTextY: 0.3380
  },
  {
    id: 4,
    index: 4,
    key: 'shopping',
    name: 'Khu mua sắm',
    mapId: 23,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.7220,
    normPinY: 0.4720,
    normTextX: 0.7220,
    normTextY: 0.4260
  },
  {
    id: 5,
    index: 5,
    key: 'park',
    name: 'Công viên',
    mapId: 11,
    spawnX: 504,
    spawnY: 150,
    normPinX: 0.2280,
    normPinY: 0.6020,
    normTextX: 0.2280,
    normTextY: 0.5520
  },
  {
    id: 6,
    index: 6,
    key: 'suburbs',
    name: 'Khu ngoại ô',
    mapId: 17,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.5360,
    normPinY: 0.8350,
    normTextX: 0.5360,
    normTextY: 0.7950
  },
  {
    id: 7,
    index: 7,
    key: 'farm',
    name: 'Nông trại',
    mapId: 25,
    spawnX: 120,
    spawnY: 72,
    normPinX: 0.8140,
    normPinY: 0.8380,
    normTextX: 0.8140,
    normTextY: 0.7980
  }
];

/**
 * Authentic Avatar Teamobi World Map Screen (HD Client)
 * Pixel-for-pixel recreation of the official mobile/HD selection interface
 */
export class WorldMapScreen extends GameScreen {
  // HD Assets
  public minimapImage?: HTMLImageElement;
  public bpImage?: HTMLImageElement;       // effect/b_p.png (selected balloon: 96x112)
  public kImage?: HTMLImageElement;        // effect/k.png (building frames: 80x640)
  public sicImage?: HTMLImageElement;      // effect/sic.png (unselected pin badge: 30x36)
  public cl0Image?: HTMLImageElement;      // clmini0.png
  public cl1Image?: HTMLImageElement;      // cl00.png
  public btnHamburger?: HTMLImageElement;  // Top-left menu button
  public btnMail?: HTMLImageElement;       // Top-left mail button with badge

  public skinPainter?: UISkinPainter;
  public font?: IFont;

  // Viewport dimensions
  public screenW = 1024;
  public screenH = 768;

  // Selection & Animation
  public regions: WorldRegion[] = [];
  public selectedIdx = 3; // Default: Khu giải trí
  public hoveredIdx = -1;
  public animTick = 0;

  // Clouds
  public clouds: FloatingCloud[] = [];

  // Marquee announcement
  public marqueeText = 'HOT:Inuyasa/Kagome đã từ 00:00 08/11 đến 23:59 09/11, Nạp tích luỹ nhận quà khủng... Chào mừng cư dân đến với Thành phố Avatar Diệu Kỳ!';
  public marqueeOffset = 100;
  public marqueeWidth = 1200;

  // Traveling / Connecting state
  public isTraveling = false;
  public travelTicks = 0;
  public selectedRegion: WorldRegion | null = null;

  // Top-left button hitboxes
  private hamburgerBounds = { x: 14, y: 8, w: 46, h: 46 };
  private mailBounds = { x: 70, y: 8, w: 48, h: 48 };

  // Callbacks
  public onSelectRegion?: (region: WorldRegion) => void;
  public onBackToHome?: () => void;

  constructor(skinPainter?: UISkinPainter, font?: IFont) {
    super();
    this.skinPainter = skinPainter;
    this.font = font;

    this.regions = WORLD_REGIONS.map(r => ({ ...r }));
    this.initClouds();
    this.loadAssets();
  }

  private initClouds(): void {
    this.clouds = [
      { x: 120, y: 60, speed: 0.35, scale: 0.85, alpha: 0.65, type: 0 },
      { x: 380, y: 460, speed: 0.45, scale: 1.10, alpha: 0.70, type: 0 }, // Center buildings cloud
      { x: 720, y: 110, speed: 0.30, scale: 0.90, alpha: 0.60, type: 1 },
      { x: 50, y: 660, speed: 0.40, scale: 0.95, alpha: 0.65, type: 0 },  // Bottom-left river cloud
      { x: 920, y: 520, speed: 0.32, scale: 1.00, alpha: 0.60, type: 1 }
    ];
  }

  public async loadAssets(): Promise<void> {
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new (window as any).Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn(`[WorldMapScreen] Failed to load image: ${src}`);
          resolve(img);
        };
        img.src = src;
      });
    };

    try {
      const [
        minimap,
        bp,
        k,
        sic,
        cl0,
        cl1,
        hamb,
        mail
      ] = await Promise.all([
        loadImage('/assets/maps/minimap_hd.png'),
        loadImage('/assets/ui/b_p_hd.png'),
        loadImage('/assets/ui/k_hd.png'),
        loadImage('/assets/ui/sic_hd.png'),
        loadImage('/assets/ui/clmini_hd.png'),
        loadImage('/assets/ui/cl00_hd.png'),
        loadImage('/assets/ui/btn_hamburger.png'),
        loadImage('/assets/ui/btn_mail.png')
      ]);

      this.minimapImage = minimap;
      this.bpImage = bp;
      this.kImage = k;
      this.sicImage = sic;
      this.cl0Image = cl0;
      this.cl1Image = cl1;
      this.btnHamburger = hamb;
      this.btnMail = mail;

      console.log('[WorldMapScreen] All HD World Map assets loaded successfully!');
    } catch (e) {
      console.warn('[WorldMapScreen] Asset load error:', e);
    }
  }

  public onResize(width: number, height: number): void {
    this.screenW = Math.max(320, width);
    this.screenH = Math.max(240, height);

    // Responsive button bounds
    const uiScale = Math.min(1.0, Math.max(0.65, this.screenH / 700));
    const btnSize = Math.round(48 * uiScale);
    this.hamburgerBounds = { x: 12, y: 8, w: btnSize, h: btnSize };
    this.mailBounds = { x: 18 + btnSize, y: 8, w: btnSize, h: btnSize };
  }

  public update(): void {
    this.animTick++;

    // Update drifting clouds
    for (const c of this.clouds) {
      c.x += c.speed;
      if (c.x > this.screenW + 250) {
        c.x = -350;
        c.y = Math.floor(Math.random() * (this.screenH - 120)) + 30;
      }
    }

    // Update top marquee text
    this.marqueeOffset -= 1.4;
    if (this.marqueeOffset < -this.marqueeWidth) {
      this.marqueeOffset = this.screenW;
    }

    // Traveling transition
    if (this.isTraveling) {
      this.travelTicks++;
      if (this.travelTicks >= 15 && this.selectedRegion) {
        this.isTraveling = false;
        if (this.onSelectRegion) {
          this.onSelectRegion(this.selectedRegion);
        }
      }
    }
  }

  public confirmSelection(): void {
    if (this.isTraveling) return;
    const r = this.regions[this.selectedIdx];
    if (r) {
      this.selectedRegion = r;
      this.isTraveling = true;
      this.travelTicks = 0;
    }
  }

  /**
   * Directional arrow key navigation between regions
   */
  public handleKeyNav(direction: 'up' | 'down' | 'left' | 'right'): void {
    if (this.isTraveling) return;
    let n2 = this.selectedIdx;

    if (direction === 'down') {
      if (n2 === 0) n2 = 5;
      else if (n2 === 1) n2 = 4;
      else if (n2 === 3) n2 = 6;
      else if (n2 === 2) n2 = 7;
      else if (n2 === 4) n2 = 7;
    } else if (direction === 'up') {
      if (n2 === 4) n2 = 1;
      else if (n2 === 5) n2 = 0;
      else if (n2 === 6) n2 = 3;
      else if (n2 === 7) n2 = 4;
      else if (n2 === 3) n2 = 0;
    } else if (direction === 'right') {
      if (n2 === 0) n2 = 3;
      else if (n2 === 1) n2 = 2;
      else if (n2 === 3) n2 = 4;
      else if (n2 === 4) n2 = 2;
      else if (n2 === 6) n2 = 7;
      else if (n2 === 5) n2 = 3;
    } else if (direction === 'left') {
      if (n2 === 1) n2 = 3;
      else if (n2 === 2) n2 = 1;
      else if (n2 === 3) n2 = 0;
      else if (n2 === 6) n2 = 5;
      else if (n2 === 7) n2 = 6;
      else if (n2 === 4) n2 = 3;
    }

    this.selectedIdx = n2;
  }

  public keyPressed(keyCode: number): void {
    if (this.isTraveling) return;

    switch (keyCode) {
      case 50: // Key 2 / UP
      case -1:
      case 38:
        this.handleKeyNav('up');
        break;
      case 56: // Key 8 / DOWN
      case -2:
      case 40:
        this.handleKeyNav('down');
        break;
      case 52: // Key 4 / LEFT
      case -3:
      case 37:
        this.handleKeyNav('left');
        break;
      case 54: // Key 6 / RIGHT
      case -4:
      case 39:
        this.handleKeyNav('right');
        break;
      case 13: // ENTER / SPACE / FIRE
      case 32:
      case 53:
        this.confirmSelection();
        break;
      case 27: // ESC
        if (this.onBackToHome) {
          this.onBackToHome();
        }
        break;
    }
  }

  public pointerPressed(x: number, y: number): void {
    if (this.isTraveling) return;

    // 1. Hamburger button click
    if (
      x >= this.hamburgerBounds.x &&
      x <= this.hamburgerBounds.x + this.hamburgerBounds.w &&
      y >= this.hamburgerBounds.y &&
      y <= this.hamburgerBounds.y + this.hamburgerBounds.h
    ) {
      if (this.onBackToHome) {
        this.onBackToHome();
      }
      return;
    }

    // 2. Mail button click
    if (
      x >= this.mailBounds.x &&
      x <= this.mailBounds.x + this.mailBounds.w &&
      y >= this.mailBounds.y &&
      y <= this.mailBounds.y + this.mailBounds.h
    ) {
      alert('Hòm thư thông báo: Thành phố Avatar chào đón bạn tham gia sự kiện đặc biệt!');
      return;
    }

    // 3. Region click detection
    const scale = Math.min(1.0, Math.max(0.65, this.screenH / 700));
    const hitRadius = Math.round(52 * scale);

    for (let i = 0; i < this.regions.length; i++) {
      const r = this.regions[i];
      const px = Math.round(r.normPinX * this.screenW);
      const py = Math.round(r.normPinY * this.screenH);
      const tx = Math.round(r.normTextX * this.screenW);
      const ty = Math.round(r.normTextY * this.screenH);

      // Hit area covers both the pin badge and the text above it
      const distPin = Math.hypot(x - px, y - py);
      const distText = Math.hypot(x - tx, y - ty);

      if (distPin <= hitRadius || distText <= hitRadius) {
        if (this.selectedIdx === i) {
          // Double-click/tap on selected region: immediately enter!
          this.confirmSelection();
        } else {
          // Select clicked region
          this.selectedIdx = i;
        }
        return;
      }
    }
  }

  public pointerMoved(x: number, y: number): void {
    const scale = Math.min(1.0, Math.max(0.65, this.screenH / 700));
    const hitRadius = Math.round(50 * scale);

    this.hoveredIdx = -1;
    for (let i = 0; i < this.regions.length; i++) {
      const r = this.regions[i];
      const px = Math.round(r.normPinX * this.screenW);
      const py = Math.round(r.normPinY * this.screenH);
      const tx = Math.round(r.normTextX * this.screenW);
      const ty = Math.round(r.normTextY * this.screenH);

      if (Math.hypot(x - px, y - py) <= hitRadius || Math.hypot(x - tx, y - ty) <= hitRadius) {
        this.hoveredIdx = i;
        break;
      }
    }
  }

  public paint(g: Graphics): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;
    if (!ctx) return;

    // 1. Draw Fullscreen HD Minimap (Zero black bars!)
    if (this.minimapImage && this.minimapImage.complete && this.minimapImage.naturalWidth > 0) {
      ctx.drawImage(this.minimapImage, 0, 0, this.screenW, this.screenH);
    } else {
      ctx.fillStyle = '#6bb252';
      ctx.fillRect(0, 0, this.screenW, this.screenH);
    }

    // 2. Draw Soft Floating Clouds
    this.drawClouds(ctx);

    // 3. Draw 8 Regions (Pins, Speech Balloon, and Names)
    this.drawRegions(ctx);

    // 4. Draw Top Marquee Announcement Bar
    this.drawTopMarquee(ctx);

    // 5. Draw Top-Left Buttons (Hamburger Menu & Mail with (!) badge)
    this.drawTopButtons(ctx);

    // 6. Draw Traveling/Connecting Overlay if active
    if (this.isTraveling && this.selectedRegion) {
      this.drawConnectingOverlay(ctx, this.selectedRegion.name);
    }
  }

  private drawClouds(ctx: CanvasRenderingContext2D): void {
    for (const c of this.clouds) {
      const img = (c.type === 0 && this.cl0Image?.complete) ? this.cl0Image : this.cl1Image;
      if (!img || !img.complete || img.naturalWidth === 0) continue;

      ctx.save();
      ctx.globalAlpha = c.alpha;
      const cw = Math.round(img.naturalWidth * c.scale * (this.screenH / 800));
      const ch = Math.round(img.naturalHeight * c.scale * (this.screenH / 800));
      ctx.drawImage(img, Math.round(c.x), Math.round(c.y), cw, ch);
      ctx.restore();
    }
  }

  private drawRegions(ctx: CanvasRenderingContext2D): void {
    const scale = Math.min(1.0, Math.max(0.68, this.screenH / 700));

    // First draw unselected regions so that selected region renders on top
    for (let i = 0; i < this.regions.length; i++) {
      if (i !== this.selectedIdx) {
        this.drawSingleRegion(ctx, this.regions[i], i, false, scale);
      }
    }

    // Then draw selected region
    if (this.selectedIdx >= 0 && this.selectedIdx < this.regions.length) {
      this.drawSingleRegion(ctx, this.regions[this.selectedIdx], this.selectedIdx, true, scale);
    }
  }

  private drawSingleRegion(
    ctx: CanvasRenderingContext2D,
    r: WorldRegion,
    index: number,
    isSelected: boolean,
    scale: number
  ): void {
    const screenX = Math.round(r.normPinX * this.screenW);
    const screenY = Math.round(r.normPinY * this.screenH);

    if (isSelected) {
      // -------------------------------------------------------------
      // SELECTED REGION: Big Speech Balloon (b_p.png) + Building Icon (k.png)
      // -------------------------------------------------------------
      const bw = Math.round(96 * scale);
      const bh = Math.round(112 * scale);
      const bx = screenX - Math.floor(bw / 2);
      const by = screenY - bh;

      // Draw speech balloon
      if (this.bpImage && this.bpImage.complete && this.bpImage.naturalWidth > 0) {
        ctx.drawImage(this.bpImage, bx, by, bw, bh);
      } else {
        // Fallback balloon card
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh - 16, 12);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Draw building icon from k.png (frame index)
      if (this.kImage && this.kImage.complete && this.kImage.naturalWidth > 0) {
        const frameW = 80;
        const frameH = 80;
        const kw = Math.round(80 * scale);
        const kh = Math.round(80 * scale);
        const kx = bx + Math.floor((bw - kw) / 2);
        const ky = by + Math.floor((bw - kw) / 2) + Math.round(4 * scale);

        ctx.drawImage(
          this.kImage,
          0,
          index * frameH,
          frameW,
          frameH,
          kx,
          ky,
          kw,
          kh
        );
      }

      // Draw Region Name directly above balloon: Bold Yellow Text with Solid Black Stroke
      const fontSize = Math.round(16 * scale + 2);
      const textY = by - Math.round(6 * scale);
      this.drawYellowText(ctx, r.name, screenX, textY, fontSize, 3.5);

    } else {
      // -------------------------------------------------------------
      // UNSELECTED REGION: Clean Pin Badge (sic.png) + Bobbing Animation
      // -------------------------------------------------------------
      const bob = Math.sin((this.animTick * 0.12) + index * 0.9) * (3.5 * scale);
      const pw = Math.round(30 * scale);
      const ph = Math.round(36 * scale);
      const px = screenX - Math.floor(pw / 2);
      const py = screenY - ph + Math.round(bob);

      // Draw hover glow if hovered
      if (index === this.hoveredIdx) {
        ctx.save();
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 10;
        ctx.fillStyle = 'rgba(250, 204, 21, 0.4)';
        ctx.beginPath();
        ctx.arc(screenX, screenY - ph / 2 + bob, pw / 2 + 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw authentic pin badge
      if (this.sicImage && this.sicImage.complete && this.sicImage.naturalWidth > 0) {
        ctx.drawImage(this.sicImage, px, py, pw, ph);
      } else {
        // Fallback pin badge
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(screenX, py + 12, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // Draw Region Name directly above pin: Yellow Text with Solid Black Stroke
      const fontSize = Math.round(13 * scale + 2);
      const textY = py - Math.round(6 * scale);
      this.drawYellowText(ctx, r.name, screenX, textY, fontSize, 2.5);
    }
  }

  /**
   * Authentic Avatar Yellow Text with Black Stroke
   */
  private drawYellowText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    strokeWidth: number
  ): void {
    ctx.save();
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    // Black solid outline
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = '#000000';
    ctx.strokeText(text, x, y);

    // Inner bright yellow fill (#FFE840 / #FFF200)
    ctx.fillStyle = '#FFF017';
    ctx.fillText(text, x, y);

    ctx.restore();
  }

  private drawTopMarquee(ctx: CanvasRenderingContext2D): void {
    const bannerH = 34;
    const bannerY = 0;
    const bannerStartX = this.mailBounds.x + this.mailBounds.w + 16;
    const bannerW = Math.max(100, this.screenW - bannerStartX);

    // Dark semi-transparent strip
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.fillRect(bannerStartX, bannerY, bannerW, bannerH);

    // Top border highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(bannerStartX, bannerY, bannerW, 1);

    // Text clipping
    ctx.beginPath();
    ctx.rect(bannerStartX + 8, bannerY, bannerW - 16, bannerH);
    ctx.clip();

    ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textBaseline = 'middle';

    const textY = bannerY + Math.floor(bannerH / 2);
    let curX = bannerStartX + this.marqueeOffset;

    // Measure once
    if (this.marqueeWidth === 1200) {
      this.marqueeWidth = ctx.measureText(this.marqueeText).width + 80;
    }

    // Draw "HOT:" in red, remainder in clean white
    const hotPrefix = 'HOT:';
    const restText = this.marqueeText.slice(hotPrefix.length);

    ctx.fillStyle = '#ef4444';
    ctx.fillText(hotPrefix, curX, textY);
    const prefixW = ctx.measureText(hotPrefix).width;

    ctx.fillStyle = '#ffffff';
    ctx.fillText(restText, curX + prefixW, textY);

    ctx.restore();
  }

  private drawTopButtons(ctx: CanvasRenderingContext2D): void {
    // 1. Hamburger Menu Button
    if (this.btnHamburger && this.btnHamburger.complete && this.btnHamburger.naturalWidth > 0) {
      ctx.drawImage(
        this.btnHamburger,
        this.hamburgerBounds.x,
        this.hamburgerBounds.y,
        this.hamburgerBounds.w,
        this.hamburgerBounds.h
      );
    } else {
      // Fallback
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(this.hamburgerBounds.x, this.hamburgerBounds.y, this.hamburgerBounds.w, this.hamburgerBounds.h, 10);
      ctx.fill();
      ctx.restore();
    }

    // 2. Mail Button with Notification Badge
    if (this.btnMail && this.btnMail.complete && this.btnMail.naturalWidth > 0) {
      ctx.drawImage(
        this.btnMail,
        this.mailBounds.x,
        this.mailBounds.y,
        this.mailBounds.w,
        this.mailBounds.h
      );
    } else {
      // Fallback
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(this.mailBounds.x, this.mailBounds.y, this.mailBounds.w, this.mailBounds.h, 10);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawConnectingOverlay(ctx: CanvasRenderingContext2D, regionName: string): void {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, this.screenW, this.screenH);

    const dialogW = Math.min(360, this.screenW - 40);
    const dialogH = 100;
    const dx = Math.floor((this.screenW - dialogW) / 2);
    const dy = Math.floor((this.screenH - dialogH) / 2);

    // Modal card
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(dx, dy, dialogW, dialogH, 14);
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Đang di chuyển đến ${regionName}...`, dx + dialogW / 2, dy + 42);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Đang tải tài nguyên bản đồ và kết nối máy chủ...', dx + dialogW / 2, dy + 68);

    ctx.restore();
  }
}

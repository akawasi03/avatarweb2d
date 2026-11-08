import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { IFont } from '../renderer/BitmapFont.js';

export interface WorldRegion {
  id: number;
  key: string;
  name: string;
  subtitle: string;
  mapId: number;
  spawnX: number;
  spawnY: number;
  // Bounding box in original 1600 x 900 map coordinates
  box: { x: number; y: number; w: number; h: number };
  pin: { x: number; y: number };
  badgeColor: string;
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: 1,
    key: 'residential',
    name: 'Khu nhà ở',
    subtitle: 'Khu dân cư, biệt thự, nhà riêng',
    mapId: 22,
    spawnX: 120,
    spawnY: 200,
    box: { x: 25, y: 10, w: 440, h: 260 },
    pin: { x: 240, y: 140 },
    badgeColor: '#38bdf8'
  },
  {
    id: 2,
    key: 'airport',
    name: 'Sân bay',
    subtitle: 'Đường băng, phi trường Hawaii',
    mapId: 25,
    spawnX: 120,
    spawnY: 200,
    box: { x: 1140, y: 15, w: 440, h: 165 },
    pin: { x: 1360, y: 95 },
    badgeColor: '#f43f5e'
  },
  {
    id: 3,
    key: 'ecological',
    name: 'Khu sinh thái',
    subtitle: 'Hồ sinh thái, đảo ngọc, câu cá',
    mapId: 13,
    spawnX: 120,
    spawnY: 200,
    box: { x: 470, y: 10, w: 260, h: 260 },
    pin: { x: 600, y: 140 },
    badgeColor: '#10b981'
  },
  {
    id: 4,
    key: 'park',
    name: 'Công viên',
    subtitle: 'Vườn hoa trung tâm, tượng đài',
    mapId: 11,
    spawnX: 120,
    spawnY: 200,
    box: { x: 150, y: 390, w: 230, h: 300 },
    pin: { x: 265, y: 540 },
    badgeColor: '#22c55e'
  },
  {
    id: 5,
    key: 'shopping',
    name: 'Khu mua sắm',
    subtitle: 'Phố thương mại, cửa hàng, ATM',
    mapId: 23,
    spawnX: 120,
    spawnY: 200,
    box: { x: 390, y: 280, w: 680, h: 310 },
    pin: { x: 730, y: 435 },
    badgeColor: '#f59e0b'
  },
  {
    id: 6,
    key: 'entertainment',
    name: 'Khu giải trí',
    subtitle: 'Trường đua thú, sòng bài casino',
    mapId: 9,
    spawnX: 120,
    spawnY: 200,
    box: { x: 1090, y: 200, w: 340, h: 290 },
    pin: { x: 1260, y: 345 },
    badgeColor: '#a855f7'
  },
  {
    id: 7,
    key: 'suburbs',
    name: 'Khu ngoại ô',
    subtitle: 'Đồi cỏ ven sông, câu cá tự nhiên',
    mapId: 17,
    spawnX: 120,
    spawnY: 200,
    box: { x: 20, y: 660, w: 460, h: 220 },
    pin: { x: 220, y: 760 },
    badgeColor: '#84cc16'
  },
  {
    id: 8,
    key: 'farm',
    name: 'Nông trại',
    subtitle: 'Ruộng đồng trù phú, chăn nuôi',
    mapId: 18,
    spawnX: 120,
    spawnY: 200,
    box: { x: 680, y: 660, w: 900, h: 220 },
    pin: { x: 1100, y: 760 },
    badgeColor: '#eab308'
  }
];

export class WorldMapScreen extends GameScreen {
  public minimapImage?: Image;
  public bannerImage?: Image;
  public skinPainter?: UISkinPainter;
  public font?: IFont;

  public screenW = 240;
  public screenH = 320;

  // Render viewport mapping
  public drawW = 1600;
  public drawH = 900;
  public offsetX = 0;
  public offsetY = 0;
  public scale = 1.0;

  // Interaction state
  public hoveredRegion: WorldRegion | null = null;
  public selectedRegion: WorldRegion | null = null;
  public isTraveling = false;
  public travelTicks = 0;
  public animTick = 0;

  // UI elements
  public backButton = { x: 12, y: 8, w: 110, h: 26, isHovered: false };

  // Callbacks
  public onSelectRegion?: (region: WorldRegion) => void;
  public onBackToHome?: () => void;

  constructor(skinPainter?: UISkinPainter, font?: IFont) {
    super();
    this.skinPainter = skinPainter;
    this.font = font;
    this.loadAssets();
  }

  public async loadAssets(): Promise<void> {
    try {
      const [minimapRes, bannerRes] = await Promise.all([
        fetch('/assets/maps/minimap.png'),
        fetch('/assets/maps/minimapbanner.png')
      ]);

      if (minimapRes.ok) {
        const buf = await minimapRes.arrayBuffer();
        this.minimapImage = await Image.createImage(new Uint8Array(buf));
      }

      if (bannerRes.ok) {
        const buf = await bannerRes.arrayBuffer();
        this.bannerImage = await Image.createImage(new Uint8Array(buf));
      }
    } catch (e) {
      console.warn('[WorldMapScreen] Asset loading warning:', e);
    }
  }

  public onResize(width: number, height: number): void {
    this.screenW = width;
    this.screenH = height;

    if (width < 450) {
      this.backButton.w = 65;
    } else {
      this.backButton.w = 110;
    }

    // Define explicit safe bounds so the 1600x900 minimap is NEVER obscured by header or footer
    const topSafe = 44;     // Top navigation bar + margin
    const bottomSafe = 36;  // Bottom instruction footer + margin
    const sideMargin = 12;  // Left & right border cushions

    const availW = Math.max(100, width - sideMargin * 2);
    const availH = Math.max(100, height - topSafe - bottomSafe);

    const baseW = 1600;
    const baseH = 900;
    const scale = Math.min(availW / baseW, availH / baseH);

    this.scale = scale;
    this.drawW = Math.round(baseW * scale);
    this.drawH = Math.round(baseH * scale);

    // Perfectly centered within the safe visible area
    this.offsetX = Math.round(sideMargin + (availW - this.drawW) / 2);
    this.offsetY = Math.round(topSafe + (availH - this.drawH) / 2);
  }

  public update(): void {
    this.animTick++;

    if (this.isTraveling) {
      this.travelTicks++;
      if (this.travelTicks > 30 && this.selectedRegion && this.onSelectRegion) {
        const reg = this.selectedRegion;
        this.selectedRegion = null;
        this.isTraveling = false;
        this.travelTicks = 0;
        this.onSelectRegion(reg);
      }
    }
  }

  // Convert canvas pixel coords to 1600x900 map space
  public screenToMap(sx: number, sy: number): { x: number; y: number } {
    if (this.scale <= 0) return { x: 0, y: 0 };
    return {
      x: (sx - this.offsetX) / this.scale,
      y: (sy - this.offsetY) / this.scale
    };
  }

  // Convert 1600x900 map coords to screen canvas space
  public mapToScreen(mx: number, my: number): { x: number; y: number } {
    return {
      x: Math.round(this.offsetX + mx * this.scale),
      y: Math.round(this.offsetY + my * this.scale)
    };
  }

  public getRegionAt(mapX: number, mapY: number): WorldRegion | null {
    // 1. Direct hit inside bounding box
    for (const r of WORLD_REGIONS) {
      if (
        mapX >= r.box.x &&
        mapX <= r.box.x + r.box.w &&
        mapY >= r.box.y &&
        mapY <= r.box.y + r.box.h
      ) {
        return r;
      }
    }

    // 2. Proximity to pin (within 50px radius in map coordinates)
    for (const r of WORLD_REGIONS) {
      const dx = mapX - r.pin.x;
      const dy = mapY - r.pin.y;
      if (dx * dx + dy * dy <= 2500) {
        return r;
      }
    }

    return null;
  }

  public pointerMoved(x: number, y: number): void {
    if (this.isTraveling) return;

    // Check back button
    this.backButton.isHovered =
      x >= this.backButton.x &&
      x <= this.backButton.x + this.backButton.w &&
      y >= this.backButton.y &&
      y <= this.backButton.y + this.backButton.h;

    // Check regions
    const mapPos = this.screenToMap(x, y);
    this.hoveredRegion = this.getRegionAt(mapPos.x, mapPos.y);
  }

  public pointerPressed(x: number, y: number): void {
    if (this.isTraveling) return;

    // 1. Check Back Button
    if (
      x >= this.backButton.x &&
      x <= this.backButton.x + this.backButton.w &&
      y >= this.backButton.y &&
      y <= this.backButton.y + this.backButton.h
    ) {
      if (this.onBackToHome) {
        this.onBackToHome();
      }
      return;
    }

    // 2. Check Region Selection
    const mapPos = this.screenToMap(x, y);
    const region = this.getRegionAt(mapPos.x, mapPos.y);
    if (region) {
      this.selectedRegion = region;
      this.isTraveling = true;
      this.travelTicks = 0;
    }
  }

  public paint(g: Graphics): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;

    // 1. Solid letterbox background
    g.setColor(0x0f172a); // Slate 900
    g.fillRect(0, 0, this.screenW, this.screenH);

    // 2. Render Minimap Background
    if (this.minimapImage) {
      g.drawScaledImage(
        this.minimapImage,
        this.offsetX,
        this.offsetY,
        this.drawW,
        this.drawH
      );
    }

    // 3. Render Region Highlights & Pins
    for (const r of WORLD_REGIONS) {
      const isHovered = this.hoveredRegion?.id === r.id;
      const isSelected = this.selectedRegion?.id === r.id;
      const boxS = {
        x: Math.round(this.offsetX + r.box.x * this.scale),
        y: Math.round(this.offsetY + r.box.y * this.scale),
        w: Math.round(r.box.w * this.scale),
        h: Math.round(r.box.h * this.scale)
      };
      const pinS = this.mapToScreen(r.pin.x, r.pin.y);

      if (ctx) {
        if (isHovered || isSelected) {
          // Animated glow rectangle over active region
          const alpha = 0.15 + Math.sin(this.animTick * 0.2) * 0.08;
          ctx.save();
          ctx.fillStyle = r.badgeColor + Math.round(alpha * 255).toString(16).padStart(2, '0');
          ctx.fillRect(boxS.x, boxS.y, boxS.w, boxS.h);

          // Glowing border
          ctx.strokeStyle = r.badgeColor;
          ctx.lineWidth = Math.max(2, Math.round(2 * this.scale));
          ctx.strokeRect(boxS.x, boxS.y, boxS.w, boxS.h);
          ctx.restore();
        }

        // Concentric beacon pulse at region pin
        const pulseRadius = ((this.animTick * 1.5 + r.id * 10) % 30);
        const pulseAlpha = Math.max(0, 1 - pulseRadius / 30);
        ctx.save();
        ctx.beginPath();
        ctx.arc(pinS.x, pinS.y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseAlpha * 0.7})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Pin badge circle
        const pinSize = isHovered ? 12 : 9;
        ctx.beginPath();
        ctx.arc(pinS.x, pinS.y, pinSize, 0, Math.PI * 2);
        ctx.fillStyle = r.badgeColor;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner core
        ctx.beginPath();
        ctx.arc(pinS.x, pinS.y, isHovered ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();

        // Region name pill: For bottom regions (pin.y > 650), draw pill ABOVE pin to avoid overlap
        ctx.save();
        ctx.font = 'bold 11px Arial, sans-serif';
        const nameText = r.name;
        const textMetrics = ctx.measureText(nameText);
        const pillW = textMetrics.width + 16;
        const pillH = 20;
        const pillX = pinS.x - Math.floor(pillW / 2);
        const isBottomRegion = r.pin.y > 650;
        const pillY = isBottomRegion ? (pinS.y - pillH - 12) : (pinS.y + 12);

        // Pill background
        ctx.fillStyle = isHovered ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)';
        ctx.strokeStyle = isHovered ? r.badgeColor : '#94a3b8';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(pillX, pillY, pillW, pillH, 6);
        } else {
          ctx.rect(pillX, pillY, pillW, pillH);
        }
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = isHovered ? '#ffffff' : '#e2e8f0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nameText, pinS.x, pillY + 10);
        ctx.restore();
      }
    }

    // 4. Banner Tooltip on Hover / Selected
    const activeRegion = this.selectedRegion || this.hoveredRegion;
    if (activeRegion && ctx) {
      const pinS = this.mapToScreen(activeRegion.pin.x, activeRegion.pin.y);
      const bannerW = 200;
      const bannerH = 56;
      const isBottom = activeRegion.pin.y > 650;
      let bx = pinS.x - Math.floor(bannerW / 2);
      let by = isBottom ? (pinS.y - bannerH - 35) : (pinS.y - 75);

      // Keep inside screen bounds
      bx = Math.max(10, Math.min(this.screenW - bannerW - 10, bx));
      by = Math.max(48, Math.min(this.screenH - 36 - bannerH, by));

      ctx.save();
      // Drop shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Banner card
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = activeRegion.badgeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bx, by, bannerW, bannerH, 8);
      } else {
        ctx.rect(bx, by, bannerW, bannerH);
      }
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Banner Text
      ctx.save();
      ctx.textAlign = 'center';

      // Region Title
      ctx.font = 'bold 13px Arial, sans-serif';
      ctx.fillStyle = activeRegion.badgeColor;
      ctx.fillText(activeRegion.name.toUpperCase(), bx + bannerW / 2, by + 18);

      // Subtitle / Description
      ctx.font = '11px Arial, sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(activeRegion.subtitle, bx + bannerW / 2, by + 34);

      // Action hint
      ctx.font = 'italic 10px Arial, sans-serif';
      ctx.fillStyle = '#facc15';
      ctx.fillText('▶ Nhấp để di chuyển đến đây', bx + bannerW / 2, by + 48);
      ctx.restore();
    }

    // 5. Top Header Navigation Bar
    if (ctx) {
      ctx.save();
      // Header backdrop
      const grad = ctx.createLinearGradient(0, 0, 0, 42);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0.7)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, this.screenW, 42);

      // Border bottom
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 42);
      ctx.lineTo(this.screenW, 42);
      ctx.stroke();

      // Title in center (or adjusted for compact screens)
      const isCompact = this.screenW < 450;
      const titleText = isCompact ? 'CHỌN KHU VỰC' : 'BẢN ĐỒ THẾ GIỚI - CHỌN KHU VỰC';
      const titleX = isCompact ? Math.round(this.backButton.x + this.backButton.w + (this.screenW - (this.backButton.x + this.backButton.w)) / 2) : Math.round(this.screenW / 2);
      ctx.font = isCompact ? 'bold 12px Arial, sans-serif' : 'bold 14px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(titleText, titleX, 21);

      // Back Button at Top-Left
      const bb = this.backButton;
      ctx.fillStyle = bb.isHovered ? 'rgba(239, 68, 68, 0.85)' : 'rgba(30, 41, 59, 0.9)';
      ctx.strokeStyle = bb.isHovered ? '#ffffff' : '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(bb.x, bb.y, bb.w, bb.h, 6);
      } else {
        ctx.rect(bb.x, bb.y, bb.w, bb.h);
      }
      ctx.fill();
      ctx.stroke();

      // Back Button Text
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isCompact ? '◀ VỀ' : '◀ TRANG CHỦ', bb.x + bb.w / 2, bb.y + bb.h / 2);
      ctx.restore();
    }

    // 6. Bottom Instruction / Status Footer Bar
    if (ctx) {
      ctx.save();
      const footerH = 28;
      const footerY = this.screenH - footerH;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(0, footerY, this.screenW, footerH);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, footerY);
      ctx.lineTo(this.screenW, footerY);
      ctx.stroke();

      const isCompact = this.screenW < 450;
      const hintText = isCompact
        ? 'Chạm địa điểm trên bản đồ để di chuyển'
        : 'Rê chuột hoặc chạm vào địa điểm trên bản đồ để di chuyển đến khu vực tương ứng';
      ctx.font = isCompact ? '10px Arial, sans-serif' : '11px Arial, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        hintText,
        this.screenW / 2,
        footerY + footerH / 2
      );
      ctx.restore();
    }

    // 7. Traveling / Transition Loading Modal Overlay
    if (this.isTraveling && this.selectedRegion && ctx) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, this.screenW, this.screenH);

      const modalW = 280;
      const modalH = 120;
      const modalX = Math.floor((this.screenW - modalW) / 2);
      const modalY = Math.floor((this.screenH - modalH) / 2);

      // Card
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = this.selectedRegion.badgeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(modalX, modalY, modalW, modalH, 10);
      } else {
        ctx.rect(modalX, modalY, modalW, modalH);
      }
      ctx.fill();
      ctx.stroke();

      // Spinner dots
      const dots = '.'.repeat((Math.floor(this.animTick / 5) % 4));
      ctx.textAlign = 'center';
      ctx.font = 'bold 14px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(
        `Đang di chuyển đến ${this.selectedRegion.name}${dots}`,
        this.screenW / 2,
        modalY + 40
      );

      ctx.font = '12px Arial, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(
        `Đang kết nối máy chủ & tải bản đồ (Map ${this.selectedRegion.mapId})...`,
        this.screenW / 2,
        modalY + 70
      );

      // Loading progress line
      const barW = 200;
      const barH = 6;
      const barX = Math.floor((this.screenW - barW) / 2);
      const barY = modalY + 90;

      ctx.fillStyle = '#334155';
      ctx.fillRect(barX, barY, barW, barH);

      const progress = Math.min(1.0, this.travelTicks / 30);
      ctx.fillStyle = this.selectedRegion.badgeColor;
      ctx.fillRect(barX, barY, Math.round(barW * progress), barH);

      ctx.restore();
    }
  }
}

import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { IFont } from '../renderer/BitmapFont.js';

/**
 * Authentic Avatar Teamobi 2.5.8 Region Definition
 * Mapped 1:1 from ea.java (citiMap tile 69) and ae.java (t() & s())
 */
export interface WorldRegion {
  id: number;
  index: number;
  key: string;
  name: string;
  col: number;      // a in kb.java
  row: number;      // b in kb.java
  partId: number;   // d in kb.java (n3 + 819)
  mapId: number;    // server map id (from ae.java / p.java)
  spawnX: number;
  spawnY: number;
  animTick: number; // e in kb.java (0..8 for bobbing)
}

export interface CloudEntry {
  x: number;
  y: number;
  type: number; // 0 for cl0, 1 for cl1
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: 0,
    index: 0,
    key: 'residential',
    name: 'Khu nhà ở',
    col: 8,
    row: 5,
    partId: 819,
    mapId: 11,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 1,
    index: 1,
    key: 'ecological',
    name: 'Khu sinh thái',
    col: 25,
    row: 6,
    partId: 820,
    mapId: 13,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 2,
    index: 2,
    key: 'airport',
    name: 'Sân bay',
    col: 30,
    row: 8,
    partId: 821,
    mapId: 20,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 3,
    index: 3,
    key: 'entertainment',
    name: 'Khu giải trí',
    col: 14,
    row: 12,
    partId: 822,
    mapId: 9,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 4,
    index: 4,
    key: 'shopping',
    name: 'Khu mua sắm',
    col: 23,
    row: 12,
    partId: 823,
    mapId: 23,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 5,
    index: 5,
    key: 'park',
    name: 'Công viên',
    col: 7,
    row: 15,
    partId: 824,
    mapId: 11,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 6,
    index: 6,
    key: 'suburbs',
    name: 'Khu ngoại ô',
    col: 17,
    row: 21,
    partId: 825,
    mapId: 17,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  },
  {
    id: 7,
    index: 7,
    key: 'farm',
    name: 'Nông trại',
    col: 26,
    row: 21,
    partId: 826,
    mapId: 10,
    spawnX: 120,
    spawnY: 200,
    animTick: 0
  }
];

/**
 * Authentic CityMap Screen (ea.java & ae.java)
 * Native WebGL implementation reproducing Java ME Client pixel-perfect
 */
export class WorldMapScreen extends GameScreen {
  // Original Assets
  public ctImage?: Image;   // main/ct.png (tileset: 16 x 1121, 70 tiles)
  public kImage?: Image;    // effect/k.png (40x320: 8 frames of 40x40)
  public bpImage?: Image;   // effect/b_p.png (48x56: selection balloon pointer)
  public sicImage?: Image;  // effect/sIc.png (15x18: small unselected flag)
  public cl0Image?: Image;  // effect/cl0.png (34x17 cloud)
  public cl1Image?: Image;  // effect/cl1.png (54x24 cloud)

  public skinPainter?: UISkinPainter;
  public font?: IFont;

  // Tilemap (citiMap: 34 cols x 26 rows = 884 bytes)
  public readonly mapCols = 34; // s in ea.java
  public readonly mapRows = 26; // t in ea.java
  public readonly tileSize = 16; // u in ea.java
  public tilemapData: Uint8Array = new Uint8Array(884);

  // Screen & Viewport
  public screenW = 240;
  public screenH = 320;
  public c = 0; // offset X when screen > map
  public d = 0; // offset Y when screen > map
  public maxCamX = 0; // A in ea.java
  public maxCamY = 0; // E in ea.java

  // Camera & Smooth interpolation
  public camX = 0; // f in ea.java
  public camY = 0; // g in ea.java
  public targetCamX = 0; // x in ea.java
  public targetCamY = 0; // B in ea.java
  private camXVel = 0; // y in ea.java
  private camYVel = 0; // C in ea.java

  // Drag & Swipe physics
  private isPointerDown = false;
  private pointerStartX = 0;
  private pointerStartY = 0;
  private camStartX = 0;
  private camStartY = 0;
  private dragVelocityX = 0;
  private dragVelocityY = 0;
  private lastDragX = 0;
  private lastDragY = 0;
  private hasDragged = false;

  // Selected Region & Animations
  public regions: WorldRegion[] = [];
  public selectedIdx = 3; // ea.b().e = 3 (Khu giải trí) in ae.java line 1519
  public clouds: CloudEntry[] = [];
  public animTick = 0;

  // Transition & Action
  public isTraveling = false;
  public travelTicks = 0;
  public selectedRegion: WorldRegion | null = null;

  // Callbacks
  public onSelectRegion?: (region: WorldRegion) => void;
  public onBackToHome?: () => void;

  constructor(skinPainter?: UISkinPainter, font?: IFont) {
    super();
    this.skinPainter = skinPainter;
    this.font = font;

    // Clone regions
    this.regions = WORLD_REGIONS.map(r => ({ ...r }));

    // Initialize 7 drifting clouds (ea.java lines 225-229)
    this.initClouds();

    // Load assets
    this.loadAssets();
  }

  private initClouds(): void {
    this.clouds = [];
    const totalW = this.mapCols * this.tileSize;
    const totalH = this.mapRows * this.tileSize;
    for (let i = 0; i < 7; i++) {
      this.clouds.push({
        x: Math.round(i * (totalW / 10) + 50),
        y: Math.round(Math.floor(Math.random() * 10) * (totalH / 10) + 20),
        type: Math.floor(Math.random() * 2)
      });
    }
  }

  public async loadAssets(): Promise<void> {
    try {
      const [citiMapRes, ctRes, kRes, bpRes, sicRes, cl0Res, cl1Res] = await Promise.all([
        fetch('/assets/normal/citiMap'),
        fetch('/assets/main/ct.png'),
        fetch('/assets/effect/k.png'),
        fetch('/assets/effect/b_p.png'),
        fetch('/assets/effect/sIc.png'),
        fetch('/assets/effect/cl0.png'),
        fetch('/assets/effect/cl1.png')
      ]);

      if (citiMapRes.ok) {
        const buf = await citiMapRes.arrayBuffer();
        this.tilemapData = new Uint8Array(buf);
      }

      const [ctBuf, kBuf, bpBuf, sicBuf, cl0Buf, cl1Buf] = await Promise.all([
        ctRes.arrayBuffer(),
        kRes.arrayBuffer(),
        bpRes.arrayBuffer(),
        sicRes.arrayBuffer(),
        cl0Res.arrayBuffer(),
        cl1Res.arrayBuffer()
      ]);

      this.ctImage = await Image.createImage(new Uint8Array(ctBuf));
      this.kImage = await Image.createImage(new Uint8Array(kBuf));
      this.bpImage = await Image.createImage(new Uint8Array(bpBuf));
      this.sicImage = await Image.createImage(new Uint8Array(sicBuf));
      this.cl0Image = await Image.createImage(new Uint8Array(cl0Buf));
      this.cl1Image = await Image.createImage(new Uint8Array(cl1Buf));

      console.log('[WorldMapScreen] Loaded original Java ME CityMap assets successfully!');
      this.centerOnSelected(true);
    } catch (e) {
      console.warn('[WorldMapScreen] Asset loading warning:', e);
    }
  }

  public onResize(width: number, height: number): void {
    this.screenW = width;
    this.screenH = height;

    const totalW = this.mapCols * this.tileSize; // 544
    const totalH = this.mapRows * this.tileSize; // 416

    this.c = Math.max(0, Math.floor((width - totalW) / 2));
    this.d = Math.max(0, Math.floor((height - 24 - totalH) / 2));

    this.maxCamX = Math.max(0, totalW - width);
    this.maxCamY = Math.max(0, totalH - height + 24);

    this.clampTargetCamera();
  }

  private centerOnSelected(immediate = false): void {
    const r = this.regions[this.selectedIdx];
    if (!r) return;

    this.targetCamX = Math.round(r.col * this.tileSize + 8 - this.screenW / 2);
    this.targetCamY = Math.round(r.row * this.tileSize - this.screenH / 2);
    this.clampTargetCamera();

    if (immediate) {
      this.camX = this.targetCamX;
      this.camY = this.targetCamY;
      this.camXVel = 0;
      this.camYVel = 0;
    }
  }

  private clampTargetCamera(): void {
    if (this.targetCamX < 0) this.targetCamX = 0;
    if (this.targetCamX > this.maxCamX) this.targetCamX = this.maxCamX;
    if (this.targetCamY < 0) this.targetCamY = 0;
    if (this.targetCamY > this.maxCamY) this.targetCamY = this.maxCamY;
  }

  public update(): void {
    this.animTick++;

    // 1. Traveling state
    if (this.isTraveling) {
      this.travelTicks++;
      if (this.travelTicks > 24 && this.selectedRegion && this.onSelectRegion) {
        const reg = this.selectedRegion;
        this.selectedRegion = null;
        this.isTraveling = false;
        this.travelTicks = 0;
        this.onSelectRegion(reg);
      }
      return;
    }

    // 2. Region pin bobbing animation (unselected regions)
    for (let i = 0; i < this.regions.length; i++) {
      if (i !== this.selectedIdx) {
        this.regions[i].animTick = (this.regions[i].animTick + 1) % 9;
      }
    }

    // 3. Inertia damp after drag
    if (!this.isPointerDown) {
      if (Math.abs(this.dragVelocityX) > 0.5) {
        this.targetCamX += this.dragVelocityX;
        this.dragVelocityX *= 0.85;
      } else {
        this.dragVelocityX = 0;
      }
      if (Math.abs(this.dragVelocityY) > 0.5) {
        this.targetCamY += this.dragVelocityY;
        this.dragVelocityY *= 0.85;
      } else {
        this.dragVelocityY = 0;
      }
      this.clampTargetCamera();
    }

    // 4. Camera Smooth Interpolation (ea.java lines 307-330)
    if (this.camY !== this.targetCamY) {
      const diffY = (this.targetCamY - this.camY) << 2;
      this.camYVel += diffY;
      this.camY += (this.camYVel >> 4);
      this.camYVel &= 0x0F;
    }
    if (this.camX !== this.targetCamX) {
      const diffX = (this.targetCamX - this.camX) << 2;
      this.camXVel += diffX;
      this.camX += (this.camXVel >> 4);
      this.camXVel &= 0x0F;
    }

    // Clamp camera within map
    if (this.camX < 0) { this.camX = 0; this.targetCamX = 0; }
    if (this.camX > this.maxCamX) { this.camX = this.maxCamX; this.targetCamX = this.maxCamX; }
    if (this.camY < 0) { this.camY = 0; this.targetCamY = 0; }
    if (this.camY > this.maxCamY) { this.camY = this.maxCamY; this.targetCamY = this.maxCamY; }

    // 5. Cloud drifting animation (ea.java lines 331-342)
    const totalW = this.mapCols * this.tileSize;
    const totalH = this.mapRows * this.tileSize;
    for (const cloud of this.clouds) {
      cloud.x -= (cloud.type + (this.animTick % 5 === 1 ? 1 : 0));
      if (cloud.x < -this.c - 50) {
        cloud.x = this.c + Math.floor(Math.random() * 4) * 50 + totalW;
        cloud.y = Math.floor(Math.random() * 10) * Math.floor(totalH / 10) + 10;
        cloud.type = Math.floor(Math.random() * 2);
      }
    }
  }

  /**
   * Directional arrow key navigation (o.java lines 12-73)
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

    if (n2 !== this.selectedIdx) {
      this.selectedIdx = n2;
      this.centerOnSelected();
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
      case 13: // ENTER / FIRE / KEY 5
      case 53:
      case -7: // Right softkey (Chọn)
        this.confirmSelection();
        break;
      case -6: // Left softkey (Menu)
        if (this.onBackToHome) {
          this.onBackToHome();
        }
        break;
    }
  }

  public pointerPressed(x: number, y: number): void {
    if (this.isTraveling) return;

    // 1. Softkey Bar taps
    const softkeyY = this.screenH - 24;
    if (y >= softkeyY) {
      if (x < 70) {
        // Left Softkey: "Menu"
        if (this.onBackToHome) {
          this.onBackToHome();
        }
        return;
      }
      if (x >= Math.floor(this.screenW / 2) - 40 && x <= Math.floor(this.screenW / 2) + 40) {
        // Center Softkey: "Chọn"
        this.confirmSelection();
        return;
      }
    }

    // 2. Check region taps (ea.java lines 363-371)
    // Box bounds: (this.c + r.col * u + u/2 - 24 - camX, this.d + r.row * u - 56 - camY, 48, 56)
    for (let i = 0; i < this.regions.length; i++) {
      const r = this.regions[i];
      const boxX = this.c + r.col * this.tileSize + Math.floor(this.tileSize / 2) - 24 - this.camX;
      const boxY = this.d + r.row * this.tileSize - 56 - this.camY;
      const boxW = 48;
      const boxH = 56;

      if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
        if (this.selectedIdx === i) {
          // Tap on already selected region -> enter!
          this.confirmSelection();
        } else {
          // Select region and smoothly scroll camera
          this.selectedIdx = i;
          this.centerOnSelected();
        }
        return;
      }
    }

    // 3. Initiate Drag / Swipe
    this.isPointerDown = true;
    this.pointerStartX = x;
    this.pointerStartY = y;
    this.camStartX = this.camX;
    this.camStartY = this.camY;
    this.lastDragX = x;
    this.lastDragY = y;
    this.dragVelocityX = 0;
    this.dragVelocityY = 0;
    this.hasDragged = false;
  }

  public pointerDragged(x: number, y: number): void {
    if (!this.isPointerDown || this.isTraveling) return;

    const dx = x - this.pointerStartX;
    const dy = y - this.pointerStartY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      this.hasDragged = true;
    }

    this.dragVelocityX = this.lastDragX - x;
    this.dragVelocityY = this.lastDragY - y;
    this.lastDragX = x;
    this.lastDragY = y;

    this.targetCamX = this.camStartX - dx;
    this.targetCamY = this.camStartY - dy;
    this.clampTargetCamera();
  }

  public pointerReleased(x: number, y: number): void {
    this.isPointerDown = false;
  }

  public pointerMoved(x: number, y: number): void {
    // Mouse hover preview support
  }

  public paint(g: Graphics): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;

    // 1. Clear background: graphics.setColor(0); graphics.fillRect(0, 0, w, q);
    g.setColor(0x000000);
    g.fillRect(0, 0, this.screenW, this.screenH);

    // 2. Camera Translation
    const transX = this.c - this.camX;
    const transY = this.d - this.camY;
    g.translate(transX, transY);

    // 3. Render 34x26 Tilemap (ea.java lines 478-484)
    if (this.ctImage && this.tilemapData.length >= 884) {
      const minCol = Math.max(0, Math.floor((this.camX - this.c) / this.tileSize));
      const maxCol = Math.min(this.mapCols - 1, Math.ceil((this.camX - this.c + this.screenW) / this.tileSize));
      const minRow = Math.max(0, Math.floor((this.camY - this.d) / this.tileSize));
      const maxRow = Math.min(this.mapRows - 1, Math.ceil((this.camY - this.d + this.screenH) / this.tileSize));

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          const tileVal = this.tilemapData[row * this.mapCols + col];
          // Each tile in ct.png is 16x16, stacked vertically (70 tiles)
          const sy = (tileVal % 70) * this.tileSize;
          g.drawRegion(
            this.ctImage,
            0,
            sy,
            this.tileSize,
            this.tileSize,
            0,
            col * this.tileSize,
            row * this.tileSize,
            0
          );
        }
      }
    }

    // 4. Render Region Markers (ea.java lines 486-503)
    for (let i = 0; i < this.regions.length; i++) {
      const r = this.regions[i];
      const pinCenterX = r.col * this.tileSize + Math.floor(this.tileSize / 2);
      const pinBottomY = r.row * this.tileSize;

      if (i === this.selectedIdx) {
        // Selected Region: Draw b_p.png (48x56) at anchor BOTTOM | HCENTER (33)
        if (this.bpImage) {
          g.drawImage(this.bpImage, pinCenterX - 24, pinBottomY - 56, 0);
        }
        // Draw 40x40 building icon from k.png frame i at (pinCenterX, pinBottomY - 12)
        if (this.kImage) {
          g.drawRegion(
            this.kImage,
            0,
            i * 40,
            40,
            40,
            0,
            pinCenterX - 20,
            pinBottomY - 12 - 40,
            0
          );
        }
      } else {
        // Unselected Region: Draw sIc.png (15x18) bobbing up and down
        const bob = Math.floor(r.animTick / 3);
        if (this.sicImage) {
          g.drawImage(this.sicImage, pinCenterX - 7, pinBottomY - bob - 18, 0);
        }
      }
    }

    // 5. Render Region Text Labels (ea.java lines 504-525)
    for (let i = 0; i < this.regions.length; i++) {
      const r = this.regions[i];
      let n4 = r.col * this.tileSize;
      let n5 = r.row * this.tileSize;

      // Viewport clamping from ea.java
      if (n5 < this.camY + 50) n5 = this.camY + 50;
      if (n5 > this.camY + this.screenH - 20) n5 = this.camY + this.screenH - 20;
      if (n4 < this.camX + 20) n4 = this.camX + 20;
      if (n4 > this.camX + this.screenW - 47) n4 = this.camX + this.screenW - 47;

      const isSelected = (i === this.selectedIdx);
      const bob = Math.floor(r.animTick / 3);
      const labelY = n5 - (isSelected ? 70 : 35) - (isSelected ? 0 : bob);
      const labelX = n4 + 10;

      this.renderTextWithOutline(g, r.name, labelX, labelY, isSelected);
    }

    // 6. Render Floating Clouds (ea.java lines 526-534)
    for (const cloud of this.clouds) {
      if (
        cloud.x > this.camX - 30 &&
        cloud.x < this.camX + 30 + this.screenW &&
        cloud.y > this.camY - 20 &&
        cloud.y < this.camY + 20 + this.screenH
      ) {
        const cloudImg = cloud.type === 0 ? this.cl0Image : this.cl1Image;
        if (cloudImg) {
          g.drawImage(cloudImg, cloud.x, cloud.y, 0);
        }
      }
    }

    // Reset Camera Translation
    g.translate(-transX, -transY);

    // 7. HUD Overlays (12+ badge, 2.5.8 version, and Softkeys)
    this.renderHud(g);

    // 8. Traveling Loading Transition Popup
    if (this.isTraveling && this.selectedRegion) {
      this.renderTravelingPopup(g);
    }
  }

  private renderTextWithOutline(
    g: Graphics,
    text: string,
    x: number,
    y: number,
    isSelected: boolean
  ): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;
    if (ctx) {
      ctx.save();
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1px black outline for authentic J2ME bitmap contrast
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeText(text, x, y);

      ctx.fillStyle = isSelected ? '#ffffff' : '#f8fafc';
      ctx.fillText(text, x, y);
      ctx.restore();
    } else if (this.font) {
      this.font.drawString(g, text, x, y, 2);
    }
  }

  private renderHud(g: Graphics): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;

    // Top-left: "12+" badge (matching original Java client)
    if (ctx) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(4, 4, 26, 14);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.strokeRect(4, 4, 26, 14);

      ctx.font = 'bold 10px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('12+', 17, 11);
      ctx.restore();
    }

    // Top-right: "2.5.8" version string (bright green bitmap font in original)
    if (ctx) {
      ctx.save();
      ctx.font = 'bold 11px monospace, sans-serif';
      ctx.fillStyle = '#22c55e';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText('2.5.8', this.screenW - 6, 6);
      ctx.restore();
    }

    // Bottom Softkey Bar
    const barH = 22;
    const barY = this.screenH - barH;

    if (ctx) {
      ctx.save();
      // Translucent bottom bar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(0, barY, this.screenW, barH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, barY, this.screenW, barH);

      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textBaseline = 'middle';

      // Left softkey: "Menu"
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('Menu', 8, barY + barH / 2);

      // Center: "Chọn"
      ctx.fillStyle = '#fde047';
      ctx.textAlign = 'center';
      ctx.fillText('Chọn', Math.floor(this.screenW / 2), barY + barH / 2);

      ctx.restore();
    }
  }

  private renderTravelingPopup(g: Graphics): void {
    const ctx = g.ctx as CanvasRenderingContext2D | undefined;
    if (!ctx || !this.selectedRegion) return;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, this.screenW, this.screenH);

    const popW = Math.min(220, this.screenW - 30);
    const popH = 64;
    const popX = Math.floor((this.screenW - popW) / 2);
    const popY = Math.floor((this.screenH - popH) / 2);

    // Dialog card
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(popX, popY, popW, popH);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(popX, popY, popW, popH);

    // Text: "Đang vào [Tên khu vực]..."
    const dots = '.'.repeat((Math.floor(this.travelTicks / 5) % 4));
    ctx.font = 'bold 12px Arial, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Đang vào ${this.selectedRegion.name}${dots}`, popX + popW / 2, popY + 24);

    // Mini progress bar
    const barW = popW - 40;
    const barH = 6;
    const barX = popX + 20;
    const barY = popY + 44;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(barX, barY, barW, barH);

    const progress = Math.min(1, this.travelTicks / 24);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(barX, barY, Math.round(barW * progress), barH);

    ctx.restore();
  }
}

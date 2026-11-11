import { Graphics, Image, Sprite } from '@avatar/j2me-compat';
import { IFont } from '../renderer/BitmapFont.js';

export interface PartFrame {
  img: number;
  dx: number;
  dy: number;
}

export interface AvatarPartInfo {
  id: number;
  name: string;
  type: number;
  zorder: number;
  gender: number;
  level: number;
  animation: PartFrame[];
}

export interface ImageSliceInfo {
  image_id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export class AvatarRenderer {
  private static partsMap: Map<number, AvatarPartInfo> = new Map();
  private static slicesMap: Map<number, ImageSliceInfo> = new Map();
  private static atlasImages: Map<number, Image> = new Map();
  private static itemImages: Map<number, Image> = new Map();
  private static shadowImage?: Image;
  private static isInitialized = false;

  public static async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // 1. Load shadow image
      try {
        this.shadowImage = await Image.createImage('/assets/effect/s0.png');
      } catch (err) {
        console.warn('[AvatarRenderer] Could not load shadow image:', err);
      }

      // 2. Load avatar parts metadata
      const partsRes = await fetch('/assets/data/avatar_parts.json');
      if (partsRes.ok) {
        const partsJson = await partsRes.json();
        for (const [idStr, p] of Object.entries<any>(partsJson)) {
          this.partsMap.set(parseInt(idStr, 10), p);
        }
        console.log(`[AvatarRenderer] Loaded ${this.partsMap.size} avatar parts.`);
      }

      // 3. Load avatar image atlas slices
      const slicesRes = await fetch('/assets/data/avatar_img_data.json');
      if (slicesRes.ok) {
        const slicesJson = await slicesRes.json();
        for (const [idStr, s] of Object.entries<any>(slicesJson)) {
          this.slicesMap.set(parseInt(idStr, 10), s);
        }
        console.log(`[AvatarRenderer] Loaded ${this.slicesMap.size} image slices.`);
      }

      this.isInitialized = true;
    } catch (err) {
      console.error('[AvatarRenderer] Init error:', err);
    }
  }

  public static async getAtlasImage(imageId: number): Promise<Image | undefined> {
    if (this.atlasImages.has(imageId)) {
      return this.atlasImages.get(imageId);
    }
    try {
      const img = await Image.createImage(`/res/big/${imageId}.png`);
      this.atlasImages.set(imageId, img);
      return img;
    } catch (err) {
      console.warn(`[AvatarRenderer] Failed to load atlas image ${imageId}:`, err);
      return undefined;
    }
  }

  public static async getItemImage(itemId: number): Promise<Image | undefined> {
    if (this.itemImages.has(itemId)) {
      return this.itemImages.get(itemId);
    }
    try {
      const img = await Image.createImage(`/res/item/${itemId}.png`);
      this.itemImages.set(itemId, img);
      return img;
    } catch (err) {
      console.warn(`[AvatarRenderer] Failed to load item image ${itemId}:`, err);
      return undefined;
    }
  }

  /**
   * Preload textures for a list of wearing items
   */
  /**
   * Categorize any avatar part into the authentic 10-layer rendering order:
   * 1: Cánh sau (Wings, Cape, Backpack, Tails, Back Auras)
   * 2: Thân (Base body / skin)
   * 3: Quần (Pants, shorts, skirts)
   * 4: Áo (Shirts, jackets, dresses, tops)
   * 5: Đầu (Head shape: tròn, mập, nhọn)
   * 6: Khuôn mặt (Facial expressions, mouth, blushing, face masks)
   * 7: Mắt (Eyes: đen, xanh, etc.)
   * 8: Tóc (Hair)
   * 9: Nón (Hats, caps, helmets, crowns, hairpins, glasses, earrings)
   * 10: Cầm tay (Handheld items: weapons, balloons, candies, flowers, lanterns, flags)
   */
  public static getPartLayer(part: AvatarPartInfo): number {
    const name = (part.name || '').toLowerCase();
    const z = part.zorder ?? 0;

    // 1. Cánh sau / Back items (Wings, Cape, Backpack, Tails, Back Auras, UFO discs)
    const isBackItem = (
      name.includes('cánh') ||
      name.includes('phi phong') ||
      name.includes('áo choàng') ||
      name.includes('đuôi') ||
      name.includes('balo') ||
      name.includes('cặp sách') ||
      name.includes('hào quang') ||
      name.includes('đĩa bay') ||
      name.includes('phi thuyền')
    ) && !(
      name.includes('cài tóc') ||
      name.includes('vương miện') ||
      name.includes('mảnh ghép') ||
      name.includes('thuốc') ||
      name.includes('kính')
    );
    if (isBackItem || z === 3 || z === 5 || z === 6) {
      return 1;
    }

    // 2. Thân (Body / Skin if explicitly present)
    if (z === 8 || (name.includes('thân') && !name.includes('áo') && !name.includes('kiếm'))) {
      return 2;
    }

    // 3. Quần (Pants, Shorts, Skirts)
    const isPants = (
      z === 10 ||
      name.includes('quần') ||
      name.includes('váy') ||
      name.includes('short') ||
      name.includes('quần đùi') ||
      name.includes('quần tây')
    ) && !name.includes('áo');
    if (isPants) {
      return 3;
    }

    // 4. Áo (Shirts, Jackets, Dresses, Tops)
    const isShirt = (
      z === 20 ||
      name.includes('áo') ||
      name.includes('sơ mi') ||
      name.includes('thun') ||
      name.includes('comple') ||
      name.includes('vest') ||
      name.includes('đầm') ||
      name.includes('yếm')
    ) && !name.includes('choàng');
    if (isShirt) {
      return 4;
    }

    // 5. Đầu (Base Head shape: tròn, mập, nhọn)
    const isHead = (
      z === 30 ||
      name.includes('tròn') ||
      name.includes('mập') ||
      name.includes('nhọn') ||
      name.includes('mặt tròn') ||
      name.includes('mặt nhọn') ||
      name.includes('đầu trọc')
    ) && !name.includes('mắt') && !name.includes('mũ') && !name.includes('nón');
    if (isHead) {
      return 5;
    }

    // 6. Khuôn mặt (Face expressions, mouth, blushing, face masks, beards)
    const isFace = (
      z === 52 ||
      name.includes('khẩu trang') ||
      name.includes('lêu lêu') ||
      name.includes('má hồng') ||
      name.includes('mũi hề') ||
      name.includes('mặt nạ') ||
      name.includes('râu') ||
      name.includes('ngậm')
    ) && !name.includes('mắt');
    if (isFace) {
      return 6;
    }

    // 7. Mắt (Eyes)
    const isEyes = (
      z === 40 ||
      name.startsWith('mat ') ||
      name.includes('mắt') ||
      name === 'đen' ||
      name === 'xanh nước biển' ||
      name === 'nâu'
    ) && !name.includes('kính');
    if (isEyes) {
      return 7;
    }

    // 8. Tóc (Hair)
    const isHair = (
      z === 50 ||
      name.includes('tóc') ||
      name.includes('dựng đứng') ||
      name.includes('trẻ con') ||
      name.includes('búp bê') ||
      name.includes('sành điệu')
    ) && !(
      name.includes('cài tóc') ||
      name.includes('kẹp tóc') ||
      name.includes('hoa cài tóc') ||
      name.includes('băng đô') ||
      name.includes('nón') ||
      name.includes('mũ')
    );
    if (isHair) {
      return 8;
    }

    // 9. Nón (Hats, Caps, Helmets, Crowns, Hairpins, Glasses, Earrings)
    const isHat = (
      z === 53 ||
      z === 54 ||
      z === 60 ||
      name.includes('nón') ||
      name.includes('mũ') ||
      name.includes('vương miện') ||
      name.includes('kính') ||
      name.includes('băng đô') ||
      name.includes('tai mèo') ||
      name.includes('sừng') ||
      name.includes('tai chuột') ||
      name.includes('cài tóc') ||
      name.includes('kẹp tóc') ||
      name.includes('bông tai') ||
      name.includes('hoa cài')
    );
    if (isHat) {
      return 9;
    }

    // 10. Cầm tay (Handheld items: weapons, balloons, flowers, swords, shields, flags, lanterns)
    const isHandheld = (
      z === 70 ||
      name.includes('cầm') ||
      name.includes('bong bóng') ||
      name.includes('kẹo') ||
      name.includes('hoa') ||
      name.includes('kiếm') ||
      name.includes('đàn') ||
      name.includes('chong chóng') ||
      name.includes('quạt') ||
      name.includes('gậy') ||
      name.includes('trượng') ||
      name.includes('khiên') ||
      name.includes('cờ') ||
      name.includes('cục vàng') ||
      name.includes('kem') ||
      name.includes('vũ khí') ||
      name.includes('lồng đèn') ||
      name.includes('thiệp')
    );
    if (isHandheld) {
      return 10;
    }

    // Fallback based on zorder
    if (z <= 5) return 1;
    if (z <= 10) return 3;
    if (z <= 20) return 4;
    if (z <= 30) return 5;
    if (z <= 40) return 7;
    if (z <= 50) return 8;
    if (z <= 60) return 9;
    return 10;
  }

  public static async preloadWearing(wearing: number[]): Promise<void> {
    const listToPreload = [...wearing, 0, 4]; // Always preload default head (0) and eyes (4)
    for (const partId of listToPreload) {
      const part = this.partsMap.get(partId);
      if (!part || !part.animation) continue;

      for (const frame of part.animation) {
        const imgId = frame.img;
        if (imgId >= 2000) {
          this.getItemImage(imgId).catch(() => {});
        } else if (imgId >= 0) {
          const slice = this.slicesMap.get(imgId);
          if (slice) {
            this.getAtlasImage(slice.image_id).catch(() => {});
          }
        }
      }
    }
  }

  /**
   * Render multi-layered animated avatar according to Java client logic (hn.java, ld.java, fa.java)
   */
  public static paintAvatar(
    g: Graphics,
    x: number,
    y: number,
    wearing: number[],
    direct: number, // 0: Down, 1: Up, 2: Left, 3: Right
    frame: number = 0, // 0: idle, 1..4: walk, 5: sit
    name?: string,
    isLocal: boolean = false,
    font?: IFont,
    chatMessage?: string
  ): void {
    // 1. Draw character shadow (ir.r)
    if (this.shadowImage) {
      const shadowX = x - Math.floor(this.shadowImage.getWidth() / 2);
      const shadowY = y - 3;
      g.drawImage(this.shadowImage, shadowX, shadowY, 0);
    } else {
      g.setColor(0x333333);
      g.fillArc(x - 9, y - 2, 18, 6, 0, 360);
    }

    // 2. Determine facing direction & horizontal flip transform
    // J2ME: direct == 2 (Left) uses Sprite.TRANS_MIRROR (flip horizontal)
    const isMirrored = direct === 2;
    const transform = isMirrored ? Sprite.TRANS_MIRROR : Sprite.TRANS_NONE;

    // 3. Collect wearing parts and auto-inject default Head (0) and Eyes (4) if absent
    const wearingList = [...wearing];
    let hasHead = false;
    let hasEyes = false;
    for (const partId of wearingList) {
      const part = this.partsMap.get(partId);
      if (part) {
        const layer = AvatarRenderer.getPartLayer(part);
        if (layer === 5) hasHead = true;
        if (layer === 7) hasEyes = true;
      }
    }

    // Default head: ID 0 ('tròn') ensures face skin is drawn behind eyes/hair
    if (!hasHead) {
      wearingList.push(0);
    }
    // Default eyes: ID 4 ('đen')
    if (!hasEyes) {
      wearingList.push(4);
    }

    const partsToRender: AvatarPartInfo[] = [];
    for (const partId of wearingList) {
      const part = this.partsMap.get(partId);
      if (part) {
        partsToRender.push(part);
      }
    }

    // Primary sort: authentic 10-layer order:
    // Cánh sau (1) -> Thân (2) -> Quần (3) -> Áo (4) -> Đầu (5) -> Khuôn mặt (6) -> Mắt (7) -> Tóc (8) -> Nón (9) -> Cầm tay (10)
    // Secondary sort: original part zorder
    partsToRender.sort((a, b) => {
      const layerA = AvatarRenderer.getPartLayer(a);
      const layerB = AvatarRenderer.getPartLayer(b);
      if (layerA !== layerB) {
        return layerA - layerB;
      }
      return a.zorder - b.zorder;
    });

    // 4. Render each layer
    for (const part of partsToRender) {
      if (!part.animation || part.animation.length === 0) continue;

      const frameData = part.animation[frame % part.animation.length];
      if (!frameData) continue;

      const imgId = frameData.img;
      const dx = frameData.dx;
      const dy = frameData.dy;

      // Case A: Standalone item image (imgId >= 2000)
      if (imgId >= 2000) {
        const itemImg = this.itemImages.get(imgId);
        if (itemImg) {
          const w = itemImg.getWidth();
          const h = itemImg.getHeight();
          const drawX = isMirrored ? x - dx - w : x + dx;
          const drawY = y + dy;
          g.drawRegion(itemImg, 0, 0, w, h, transform, drawX, drawY, 0);
        } else {
          this.getItemImage(imgId); // trigger async load
        }
      }
      // Case B: Atlas sprite slice (imgId < 2000)
      else if (imgId >= 0) {
        const slice = this.slicesMap.get(imgId);
        if (slice) {
          const atlasImg = this.atlasImages.get(slice.image_id);
          if (atlasImg) {
            const drawX = isMirrored ? x - dx - slice.w : x + dx;
            const drawY = y + dy;
            g.drawRegion(
              atlasImg,
              slice.x,
              slice.y,
              slice.w,
              slice.h,
              transform,
              drawX,
              drawY,
              0
            );
          } else {
            this.getAtlasImage(slice.image_id); // trigger async load
          }
        }
      }
    }

    // 5. Draw Name Tag with subtle dark backdrop pill for 100% contrast & readability
    if (name) {
      const tx = g.getTranslateX();
      const ty = g.getTranslateY();
      const screenX = x + tx;
      const screenTagY = y - 46 + ty;
      const ctx = g.ctx as CanvasRenderingContext2D | undefined;
      const nameW = font ? font.stringWidth(name) : name.length * 6;
      const isLaiBuon = name === 'lai.buon';
      const extraFlowerW = isLaiBuon ? 12 : 0;
      const tagX = screenX - Math.floor((nameW + extraFlowerW) / 2);

      if (ctx) {
        ctx.save();
        // Dark backdrop pill
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(tagX - 4, screenTagY - 1, nameW + extraFlowerW + 8, 14, 3);
        } else {
          ctx.rect(tagX - 4, screenTagY - 1, nameW + extraFlowerW + 8, 14);
        }
        ctx.fill();

        // 1px border
        ctx.strokeStyle = isLocal ? '#facc15' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Red flower rosette for lai.buon
        if (isLaiBuon) {
          const flX = tagX + nameW + 6;
          const flY = screenTagY + 6;
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(flX, flY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(flX, flY, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // High contrast text with 1px drop shadow
        ctx.font = 'bold 11px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textCenterX = screenX - (isLaiBuon ? 6 : 0);

        // Shadow
        ctx.fillStyle = '#000000';
        ctx.fillText(name, textCenterX + 1, screenTagY + 7);

        // Foreground color
        if (isLocal) {
          ctx.fillStyle = '#fde047'; // Bright gold for local player
        } else if (name.includes('Lovanga') || name.includes('Tài Xỉu') || name.includes('Vé số') || name.includes('đấu giá') || name.includes('quay số') || isLaiBuon) {
          ctx.fillStyle = '#38bdf8'; // Bright cyan for NPCs
        } else {
          ctx.fillStyle = '#ffffff'; // Crisp white for other players
        }
        ctx.fillText(name, textCenterX, screenTagY + 6);
        ctx.restore();
      } else if (font) {
        font.drawString(g, name, x, y - 46, 2);
      }
    }

    // 6. Draw Chat Bubble (bounded & multi-line wrapped to prevent covering players)
    if (chatMessage && chatMessage.length > 0) {
      const ctx = g.ctx as CanvasRenderingContext2D | undefined;
      const maxBubbleW = 140;

      // Wrap text into at most 2 lines
      let lines: string[] = [];
      if (font) {
        lines = font.splitText(chatMessage, maxBubbleW - 14);
      } else {
        lines = [chatMessage];
      }

      if (lines.length > 2) {
        lines = [lines[0], lines[1].slice(0, 16) + '...'];
      }

      let maxLineW = 30;
      if (font) {
        for (const l of lines) {
          maxLineW = Math.max(maxLineW, font.stringWidth(l));
        }
      } else if (ctx) {
        ctx.font = '11px Arial, sans-serif';
        for (const l of lines) {
          maxLineW = Math.max(maxLineW, ctx.measureText(l).width);
        }
      }

      const tx = g.getTranslateX();
      const ty = g.getTranslateY();
      const screenX = x + tx;
      const screenY = y + ty;

      const bubbleW = Math.min(maxBubbleW, Math.round(maxLineW + 14));
      const bubbleH = lines.length * 13 + 6;
      const bx = screenX - Math.floor(bubbleW / 2);
      const by = screenY - 56 - bubbleH;

      if (ctx) {
        ctx.save();
        // Drop shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        // Bubble white card
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(bx, by, bubbleW, bubbleH, 4);
        } else {
          ctx.rect(bx, by, bubbleW, bubbleH);
        }
        ctx.fill();
        ctx.stroke();

        // Pointer triangle down towards head
        ctx.beginPath();
        ctx.moveTo(screenX - 3, by + bubbleH);
        ctx.lineTo(screenX, by + bubbleH + 4);
        ctx.lineTo(screenX + 3, by + bubbleH);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#1e293b';
        ctx.stroke();

        ctx.restore();

        // Text lines inside bubble
        ctx.save();
        ctx.font = '10px Arial, sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], screenX, by + 7 + i * 13);
        }
        ctx.restore();
      }
    }
  }
}

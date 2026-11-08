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
  public static async preloadWearing(wearing: number[]): Promise<void> {
    for (const partId of wearing) {
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

    // 3. Collect wearing parts and sort by zOrder
    const partsToRender: AvatarPartInfo[] = [];
    for (const partId of wearing) {
      const part = this.partsMap.get(partId);
      if (part) {
        partsToRender.push(part);
      }
    }

    // Sort ascending by zOrder (e.g. 10: pants, 20: body, 30: head, 40: eyes, 50: hair, 52: hat/mask)
    partsToRender.sort((a, b) => a.zorder - b.zorder);

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

    // 5. Draw Name Tag (matching hn.java line 284)
    if (name && font) {
      const tagY = y - 46;
      font.drawString(g, name, x, tagY, 2);
    }

    // 6. Draw Chat Bubble
    if (chatMessage && chatMessage.length > 0 && font) {
      const msgW = Math.min(font.stringWidth(chatMessage), 140);
      const bubbleW = msgW + 10;
      const bubbleH = 15;
      const bx = x - Math.floor(bubbleW / 2);
      const by = y - 65;

      // Bubble background & 1px dark border
      g.setColor(0xFFFFFF);
      g.fillRect(bx, by, bubbleW, bubbleH);
      g.setColor(0x1B3F47);
      g.drawRect(bx, by, bubbleW - 1, bubbleH - 1);

      // Bubble pointer down
      g.setColor(0xFFFFFF);
      g.fillRect(x - 2, by + bubbleH - 1, 4, 3);
      g.setColor(0x1B3F47);
      g.drawLine(x - 2, by + bubbleH + 1, x, by + bubbleH + 3);
      g.drawLine(x + 2, by + bubbleH + 1, x, by + bubbleH + 3);

      // Text inside bubble
      font.drawString(g, chatMessage, x, by + 3, 2);
    }
  }
}

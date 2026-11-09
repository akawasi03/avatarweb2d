import { Sprite } from '../sprite/Sprite.js';
import { Image } from '../image/Image.js';
import { IRenderBackend, RenderMetrics } from './IRenderBackend.js';
import { WebGL2Renderer } from './WebGL2Renderer.js';

export interface RenderContext2D {
  save(): void;
  restore(): void;
  translate(x: number, y: number): void;
  scale(x: number, y: number): void;
  rotate(angle: number): void;
  beginPath(): void;
  rect(x: number, y: number, w: number, h: number): void;
  clip(): void;
  clearRect(x: number, y: number, w: number, h: number): void;
  fillRect(x: number, y: number, w: number, h: number): void;
  strokeRect(x: number, y: number, w: number, h: number): void;
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  stroke(): void;
  fill(): void;
  roundRect?(x: number, y: number, w: number, h: number, radii: number | number[]): void;
  ellipse?(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  arc?(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  drawImage(image: any, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
  fillStyle: any;
  strokeStyle: any;
  lineWidth?: any;
  lineJoin?: any;
  miterLimit?: any;
  font?: any;
  textAlign?: any;
  textBaseline?: any;
  strokeText?(text: string, x: number, y: number): void;
  fillText?(text: string, x: number, y: number): void;
}

export class Graphics implements IRenderBackend {
  public static readonly HCENTER = 1;
  public static readonly VCENTER = 2;
  public static readonly LEFT = 4;
  public static readonly RIGHT = 8;
  public static readonly TOP = 16;
  public static readonly BOTTOM = 32;
  public static readonly BASELINE = 64;

  public backend?: IRenderBackend;
  public ctx?: RenderContext2D;

  private tx = 0;
  private ty = 0;
  private clipX = 0;
  private clipY = 0;
  private clipW = 99999;
  private clipH = 99999;
  private currentColor = 0;

  constructor(target?: IRenderBackend | RenderContext2D) {
    if (!target) return;
    if ('fillRect' in target && 'drawRegion' in target && 'flush' in target) {
      this.backend = target as IRenderBackend;
      const webgl = target as WebGL2Renderer;
      if (webgl.textCtx) {
        this.ctx = new Proxy(webgl.textCtx, {
          get(tgt: any, prop: string | symbol) {
            webgl.markTextUsed();
            const val = tgt[prop];
            return typeof val === 'function' ? val.bind(tgt) : val;
          },
          set(tgt: any, prop: string | symbol, value: any) {
            webgl.markTextUsed();
            tgt[prop] = value;
            return true;
          }
        });
      }
    } else {
      this.ctx = target as RenderContext2D;
    }
  }

  public beginFrame(width: number, height: number): void {
    if (this.backend?.beginFrame) {
      this.backend.beginFrame(width, height);
    } else if (this.ctx) {
      this.ctx.restore();
      this.ctx.save();
      this.ctx.clearRect(0, 0, width, height);
      this.tx = 0;
      this.ty = 0;
    }
  }

  public endFrame(): void {
    if (this.backend?.endFrame) {
      this.backend.endFrame();
    }
  }

  public flush(): void {
    if (this.backend?.flush) {
      this.backend.flush();
    }
  }

  public getMetrics(): RenderMetrics {
    if (this.backend?.getMetrics) {
      return this.backend.getMetrics();
    }
    return { drawCalls: 1, quadCount: 0, batchCount: 1 };
  }

  public translate(x: number, y: number): void {
    this.tx += x;
    this.ty += y;
    if (this.backend) {
      this.backend.translate(x, y);
    }
  }

  public getTranslateX(): number {
    return this.backend ? this.backend.getTranslateX() : this.tx;
  }

  public getTranslateY(): number {
    return this.backend ? this.backend.getTranslateY() : this.ty;
  }

  public setColor(rgb: number): void {
    this.currentColor = rgb;
    if (this.backend) {
      this.backend.setColor(rgb);
    } else if (this.ctx) {
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      const colorStr = `rgb(${r},${g},${b})`;
      this.ctx.fillStyle = colorStr;
      this.ctx.strokeStyle = colorStr;
    }
  }

  public getColor(): number {
    return this.backend ? this.backend.getColor() : this.currentColor;
  }

  public setClip(x: number, y: number, width: number, height: number): void {
    this.clipX = x;
    this.clipY = y;
    this.clipW = width;
    this.clipH = height;

    if (this.backend) {
      this.backend.setClip(x, y, width, height);
    } else if (this.ctx) {
      this.ctx.restore();
      this.ctx.save();
      this.ctx.translate(this.tx, this.ty);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.clip();
      this.setColor(this.currentColor);
    }
  }

  public clipRect(x: number, y: number, width: number, height: number): void {
    const x1 = Math.max(this.clipX, x);
    const y1 = Math.max(this.clipY, y);
    const x2 = Math.min(this.clipX + this.clipW, x + width);
    const y2 = Math.min(this.clipY + this.clipH, y + height);
    this.setClip(x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1));
  }

  public getClipX(): number {
    return this.backend ? this.backend.getClipX() : this.clipX;
  }

  public getClipY(): number {
    return this.backend ? this.backend.getClipY() : this.clipY;
  }

  public getClipWidth(): number {
    return this.backend ? this.backend.getClipWidth() : this.clipW;
  }

  public getClipHeight(): number {
    return this.backend ? this.backend.getClipHeight() : this.clipH;
  }

  public fillRect(x: number, y: number, width: number, height: number): void {
    if (this.backend) {
      this.backend.fillRect(x, y, width, height);
    } else if (this.ctx) {
      this.ctx.fillRect(x, y, width, height);
    }
  }

  public drawRect(x: number, y: number, width: number, height: number): void {
    if (this.backend) {
      this.backend.drawRect(x, y, width, height);
    } else if (this.ctx) {
      this.ctx.strokeRect(x, y, width, height);
    }
  }

  public drawRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight = arcWidth): void {
    if (this.backend) {
      this.backend.drawRoundRect(x, y, width, height, arcWidth, arcHeight);
    } else if (this.ctx) {
      const radius = Math.min(arcWidth, arcHeight) / 2;
      this.ctx.beginPath();
      if (typeof this.ctx.roundRect === 'function') {
        this.ctx.roundRect(x, y, width, height, radius);
      } else {
        this.ctx.rect(x, y, width, height);
      }
      this.ctx.stroke();
    }
  }

  public fillRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight = arcWidth): void {
    if (this.backend) {
      this.backend.fillRoundRect(x, y, width, height, arcWidth, arcHeight);
    } else if (this.ctx) {
      const radius = Math.min(arcWidth, arcHeight) / 2;
      this.ctx.beginPath();
      if (typeof this.ctx.roundRect === 'function') {
        this.ctx.roundRect(x, y, width, height, radius);
      } else {
        this.ctx.rect(x, y, width, height);
      }
      this.ctx.fill();
    }
  }

  public fillArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void {
    if (this.backend) {
      this.backend.fillArc(x, y, width, height, startAngle, arcAngle);
    } else if (this.ctx) {
      this.ctx.beginPath();
      const rx = width / 2;
      const ry = height / 2;
      const cx = x + rx;
      const cy = y + ry;
      const sa = (startAngle * Math.PI) / 180;
      const ea = ((startAngle + arcAngle) * Math.PI) / 180;
      if (typeof this.ctx.ellipse === 'function') {
        this.ctx.ellipse(cx, cy, rx, ry, 0, sa, ea);
      } else if (typeof this.ctx.arc === 'function') {
        this.ctx.arc(cx, cy, rx, sa, ea);
      }
      this.ctx.fill();
    }
  }

  public drawArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void {
    if (this.backend) {
      this.backend.drawArc(x, y, width, height, startAngle, arcAngle);
    } else if (this.ctx) {
      this.ctx.beginPath();
      const rx = width / 2;
      const ry = height / 2;
      const cx = x + rx;
      const cy = y + ry;
      const sa = (startAngle * Math.PI) / 180;
      const ea = ((startAngle + arcAngle) * Math.PI) / 180;
      if (typeof this.ctx.ellipse === 'function') {
        this.ctx.ellipse(cx, cy, rx, ry, 0, sa, ea);
      } else if (typeof this.ctx.arc === 'function') {
        this.ctx.arc(cx, cy, rx, sa, ea);
      }
      this.ctx.stroke();
    }
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number): void {
    if (this.backend) {
      this.backend.drawLine(x1, y1, x2, y2);
    } else if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }

  private calculateAnchor(x: number, y: number, width: number, height: number, anchor: number): { x: number; y: number } {
    let outX = x;
    let outY = y;

    if ((anchor & Graphics.RIGHT) !== 0) {
      outX -= width;
    } else if ((anchor & Graphics.HCENTER) !== 0) {
      outX -= Math.floor(width / 2);
    }

    if ((anchor & Graphics.BOTTOM) !== 0) {
      outY -= height;
    } else if ((anchor & Graphics.VCENTER) !== 0) {
      outY -= Math.floor(height / 2);
    }

    return { x: outX, y: outY };
  }

  public drawImage(image: Image | any, x: number, y: number, anchor = 0): void {
    if (this.backend) {
      this.backend.drawImage(image, x, y, anchor);
      return;
    }
    const pt = this.calculateAnchor(x, y, image.width || image.naturalWidth || 0, image.height || image.naturalHeight || 0, anchor);
    const el = image.element || image;
    if (this.ctx && el) {
      this.ctx.drawImage(el, 0, 0, image.width, image.height, pt.x, pt.y, image.width, image.height);
    }
  }

  public drawScaledImage(image: Image | any, x: number, y: number, width: number, height: number, anchor = 0): void {
    if (this.backend) {
      this.backend.drawScaledImage(image, x, y, width, height, anchor);
      return;
    }
    const pt = this.calculateAnchor(x, y, width, height, anchor);
    const el = image.element || image;
    if (this.ctx && el) {
      this.ctx.drawImage(el, 0, 0, image.width || width, image.height || height, pt.x, pt.y, width, height);
    }
  }

  public drawRegion(
    image: Image | any,
    x_src: number,
    y_src: number,
    width: number,
    height: number,
    transform: number,
    x_dst: number,
    y_dst: number,
    anchor = 0
  ): void {
    if (this.backend) {
      this.backend.drawRegion(image, x_src, y_src, width, height, transform, x_dst, y_dst, anchor);
      return;
    }

    let destW = width;
    let destH = height;
    if (
      transform === Sprite.TRANS_ROT90 ||
      transform === Sprite.TRANS_ROT270 ||
      transform === Sprite.TRANS_MIRROR_ROT90 ||
      transform === Sprite.TRANS_MIRROR_ROT270
    ) {
      destW = height;
      destH = width;
    }

    const pt = this.calculateAnchor(x_dst, y_dst, destW, destH, anchor);
    const el = image.element || image;

    if (!this.ctx || !el) {
      return;
    }

    if (transform === Sprite.TRANS_NONE) {
      this.ctx.drawImage(el, x_src, y_src, width, height, pt.x, pt.y, width, height);
      return;
    }

    this.ctx.save();
    this.ctx.translate(pt.x + destW / 2, pt.y + destH / 2);

    switch (transform) {
      case Sprite.TRANS_MIRROR:
        this.ctx.scale(-1, 1);
        break;
      case Sprite.TRANS_ROT180:
        this.ctx.rotate(Math.PI);
        break;
      case Sprite.TRANS_MIRROR_ROT180:
        this.ctx.scale(1, -1);
        break;
      case Sprite.TRANS_ROT90:
        this.ctx.rotate(Math.PI / 2);
        break;
      case Sprite.TRANS_ROT270:
        this.ctx.rotate((3 * Math.PI) / 2);
        break;
      case Sprite.TRANS_MIRROR_ROT90:
        this.ctx.scale(-1, 1);
        this.ctx.rotate(Math.PI / 2);
        break;
      case Sprite.TRANS_MIRROR_ROT270:
        this.ctx.scale(-1, 1);
        this.ctx.rotate((3 * Math.PI) / 2);
        break;
    }

    this.ctx.drawImage(el, x_src, y_src, width, height, -width / 2, -height / 2, width, height);
    this.ctx.restore();
  }
}

import { Graphics, Image } from '@avatar/j2me-compat';
import { CommandAction } from './GameScreen.js';
import { IFont } from '../renderer/BitmapFont.js';
import { FrameImage } from '../renderer/FrameImage.js';

export class UISkinPainter {
  // Original je.d color palette from gw.java
  public static readonly JE_D = [6201499, 2378578, 8705740, 2716523, 16701696, 70];
  public static readonly COLOR_BG = 8705740;         // #84D6CC (cyan body fill)
  public static readonly COLOR_BORDER1 = 2378578;     // #244B52 (dark cyan border)
  public static readonly COLOR_BORDER2 = 6201499;     // #5EA09B (accent border)
  public static readonly COLOR_SELECTED = 14279153;   // #D9E1F1 (highlight)

  public font?: IFont;
  public roundCorners?: FrameImage;

  constructor(font?: IFont, roundCornersImg?: Image) {
    this.font = font;
    if (roundCornersImg) {
      this.roundCorners = new FrameImage(roundCornersImg, 8, 8);
    }
  }

  public paintWindow(g: Graphics, x: number, y: number, w: number, h: number, style = 0): void {
    const col0 = UISkinPainter.JE_D[style] ?? UISkinPainter.COLOR_BORDER2;
    const col1 = UISkinPainter.JE_D[style + 1] ?? UISkinPainter.COLOR_BORDER1;
    const col2 = UISkinPainter.JE_D[2] ?? UISkinPainter.COLOR_BG;
    const col3 = UISkinPainter.JE_D[3] ?? 2716523;

    // Outer frame
    this.paintBorderLayer(g, x, y, w, h, col0, col1, 0);
    // Inner frame
    this.paintBorderLayer(g, x + 3, y + 3, w - 6, h - 6, col2, col3, 1);
  }

  private paintBorderLayer(
    g: Graphics,
    x: number,
    y: number,
    w: number,
    h: number,
    fillCol: number,
    lineCol: number,
    cornerStyle: number
  ): void {
    if (this.roundCorners) {
      const baseFrame = cornerStyle << 2;
      this.roundCorners.drawFrame(baseFrame + 0, x, y, 0, 0, g);
      this.roundCorners.drawFrame(baseFrame + 1, x + w - 8, y, 0, 0, g);
      this.roundCorners.drawFrame(baseFrame + 2, x, y + h - 8, 0, 0, g);
      this.roundCorners.drawFrame(baseFrame + 3, x + w - 8, y + h - 8, 0, 0, g);
    }

    g.setColor(fillCol);
    g.fillRect(x + 8, y, w - 16, 8);
    g.fillRect(x + 8, y + h - 8, w - 16, 7);
    g.fillRect(x, y + 8, w, h - 16);

    g.setColor(lineCol);
    g.fillRect(x + 8, y, w - 16, 1);
    g.fillRect(x + 8, y + h - 1, w - 16, 1);
    g.fillRect(x, y + 8, 1, h - 16);
    g.fillRect(x + w - 1, y + 8, 1, h - 16);
  }

  public paintButton(g: Graphics, x: number, y: number, w: number, h: number, selected = false): void {
    if (selected) {
      g.setColor(0xFFA500); // Orange highlight
      g.fillRect(x, y, w, h);
      g.setColor(0xFFFFFF);
      g.drawRect(x, y, w - 1, h - 1);
    } else {
      g.setColor(0xEEEEEE);
      g.fillRect(x, y, w, h);
      g.setColor(UISkinPainter.COLOR_BORDER1);
      g.drawRect(x, y, w - 1, h - 1);
    }
  }

  public paintSoftkeys(
    g: Graphics,
    left?: CommandAction,
    center?: CommandAction,
    right?: CommandAction,
    screenW = 240,
    screenH = 320
  ): void {
    const barH = 22;
    const barY = screenH - barH;

    // Dark bottom bar
    g.setColor(0x222222);
    g.fillRect(0, barY, screenW, barH);
    g.setColor(0x444444);
    g.drawLine(0, barY, screenW, barY);

    if (this.font) {
      if (left) {
        this.font.drawString(g, left.caption, 6, barY + 4, 0);
      }
      if (center) {
        this.font.drawString(g, center.caption, Math.floor(screenW / 2), barY + 4, 2);
      }
      if (right) {
        this.font.drawString(g, right.caption, screenW - 6, barY + 4, 1);
      }
    }
  }
}

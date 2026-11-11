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

  // =========================================================================
  // Authentic Avatar 2.5.8 J2ME Dialog & Menu Renderer (1:1 Fidelity)
  // =========================================================================

  /**
   * Paints an authentic J2ME warm-cream parchment window with double border,
   * dark wood header pill, and optional [X] close button.
   */
  public paintAuthenticDialog(
    g: Graphics,
    x: number,
    y: number,
    w: number,
    h: number,
    title: string
  ): void {
    // 1. Semi-transparent backdrop shadow
    g.setColor(0x000000);
    g.fillRect(x + 4, y + 4, w, h);

    // 2. Warm cream parchment background (#FEF3C7)
    g.setColor(0xFEF3C7);
    g.fillRect(x, y, w, h);

    // 3. Inner lighter parchment content pane (#FFFBEB)
    g.setColor(0xFFFBEB);
    g.fillRect(x + 4, y + 28, w - 8, h - 32);

    // 4. Double borders: outer dark chocolate wood (#451A03), inner amber gold (#D97706)
    g.setColor(0x451A03);
    g.drawRect(x, y, w - 1, h - 1);
    g.drawRect(x + 1, y + 1, w - 3, h - 3);

    g.setColor(0xD97706);
    g.drawRect(x + 3, y + 3, w - 7, h - 7);

    // 5. Header dark wood banner capsule (#78350F)
    const headerH = 24;
    g.setColor(0x78350F);
    g.fillRect(x + 4, y + 4, w - 8, headerH);
    g.setColor(0xF59E0B); // Gold banner border
    g.drawRect(x + 4, y + 4, w - 9, headerH);

    // 6. Header Title in bold white
    if (this.font) {
      this.font.drawString(g, title.toUpperCase(), x + Math.floor(w / 2), y + 7, 2);
    }

    // 7. Close button [X]
    g.setColor(0xDC2626);
    g.fillRect(x + w - 22, y + 6, 16, 16);
    g.setColor(0xFEF2F2);
    g.drawRect(x + w - 22, y + 6, 15, 15);
    if (this.font) {
      this.font.drawString(g, 'X', x + w - 14, y + 8, 2);
    }
  }

  /**
   * Paints a menu option item row.
   * Highlighted rows use golden amber background with red bullet indicator.
   */
  public paintAuthenticOption(
    g: Graphics,
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    isSelected = false,
    extraInfo?: string
  ): void {
    if (isSelected) {
      // Golden Amber highlight capsule (#FBBF24)
      g.setColor(0xFBBF24);
      g.fillRect(x, y, w, h);
      g.setColor(0xD97706);
      g.drawRect(x, y, w - 1, h - 1);

      // Red/orange selection triangle pointer
      g.setColor(0xDC2626);
      const midY = y + Math.floor(h / 2);
      g.fillArc(x + 6, midY - 3, 6, 6, 0, 360);

      // Dark chocolate text (#451A03)
      if (this.font) {
        this.font.drawString(g, text, x + 16, y + Math.floor((h - 12) / 2), 0);
        if (extraInfo) {
          this.font.drawString(g, extraInfo, x + w - 10, y + Math.floor((h - 12) / 2), 1);
        }
      }
    } else {
      // Unselected row: subtle cream background
      g.setColor(0xFDE68A);
      g.drawLine(x + 4, y + h - 1, x + w - 4, y + h - 1);

      // Dark amber text (#78350F)
      if (this.font) {
        this.font.drawString(g, text, x + 10, y + Math.floor((h - 12) / 2), 0);
        if (extraInfo) {
          this.font.drawString(g, extraInfo, x + w - 10, y + Math.floor((h - 12) / 2), 1);
        }
      }
    }
  }

  /**
   * Paints an authentic button with J2ME tactile styling.
   */
  public paintAuthenticButton(
    g: Graphics,
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    variant: 'primary' | 'secondary' | 'danger' = 'primary',
    isFocused = false
  ): void {
    let bg = 0xD97706; // Amber
    let border = 0x92400E;
    let textCol = 0xFFFFFF;

    if (variant === 'secondary') {
      bg = 0x78350F; // Dark wood
      border = 0x451A03;
    } else if (variant === 'danger') {
      bg = 0xDC2626; // Crimson
      border = 0x991B1B;
    }

    if (isFocused) {
      bg = 0xF59E0B;
      border = 0xFEF3C7;
    }

    g.setColor(bg);
    g.fillRect(x, y, w, h);
    g.setColor(border);
    g.drawRect(x, y, w - 1, h - 1);

    // Bevel highlight
    g.setColor(0xFEF3C7);
    g.drawLine(x + 1, y + 1, x + w - 2, y + 1);

    if (this.font) {
      this.font.drawString(g, text, x + Math.floor(w / 2), y + Math.floor((h - 12) / 2), 2);
    }
  }
}

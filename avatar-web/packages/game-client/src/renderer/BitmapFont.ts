import { Graphics, Image } from '@avatar/j2me-compat';

export interface IFont {
  drawString(g: Graphics, text: string, x: number, y: number, anchor: number): void;
  stringWidth(text: string): number;
  getHeight(): number;
  splitText(text: string, maxWidth: number): string[];
}

export class BitmapFont implements IFont {
  public glyphChars = '';
  public glyphWidths: number[] = [];
  public fontHeight = 12;
  public fontImage?: Image;

  constructor(metadataBytes?: Uint8Array, fontImage?: Image) {
    if (metadataBytes) {
      this.loadMetadata(metadataBytes);
    }
    if (fontImage) {
      this.fontImage = fontImage;
    }
  }

  public loadMetadata(bytes: Uint8Array): void {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let pos = 0;
    const utfLen = view.getUint16(pos, false);
    pos += 2;
    this.glyphChars = new TextDecoder('utf-8').decode(bytes.subarray(pos, pos + utfLen));
    pos += utfLen;

    this.glyphWidths = [];
    for (let i = 0; i < this.glyphChars.length; i++) {
      this.glyphWidths.push(bytes[pos++]);
    }
    this.fontHeight = bytes[pos++];
  }

  public mapChar(ch: string): string {
    if (this.glyphChars.indexOf(ch) !== -1) return ch;
    const lower = ch.toLowerCase();
    if (this.glyphChars.indexOf(lower) !== -1) return lower;
    return ch;
  }

  public stringWidth(text: string): number {
    let width = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text.charAt(i);
      if (ch === ' ') {
        width += (this.glyphWidths[0] || 6) >> 1;
      } else {
        const mappedCh = this.mapChar(ch);
        const idx = this.glyphChars.indexOf(mappedCh);
        if (idx >= 0 && idx < this.glyphWidths.length) {
          width += this.glyphWidths[idx];
        } else {
          width += (this.glyphWidths[0] || 6);
        }
      }
    }
    return width;
  }

  public getHeight(): number {
    return this.fontHeight;
  }

  public drawString(g: Graphics, text: string, x: number, y: number, anchor = 0): void {
    if (!text || text.length === 0) return;

    const totalWidth = this.stringWidth(text);
    let drawX = x;
    if (anchor === 1) {
      drawX = x - totalWidth; // Right align
    } else if (anchor === 2) {
      drawX = x - (totalWidth >> 1); // Center align
    }

    for (let i = 0; i < text.length; i++) {
      const ch = text.charAt(i);
      if (ch === ' ') {
        drawX += (this.glyphWidths[0] || 6) >> 1;
      } else {
        const mappedCh = this.mapChar(ch);
        let idx = this.glyphChars.indexOf(mappedCh);
        if (idx === -1) idx = 0;
        const charW = this.glyphWidths[idx] || 6;

        if (this.fontImage) {
          g.drawRegion(
            this.fontImage,
            0,
            idx * this.fontHeight,
            this.fontImage.width,
            this.fontHeight,
            0,
            drawX,
            y,
            20 // J2ME: LEFT (4) | TOP (16) = 20
          );
        }
        drawX += charW;
      }
    }
  }

  public splitText(text: string, maxWidth: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const w of words) {
      const testLine = currentLine.length === 0 ? w : `${currentLine} ${w}`;
      if (this.stringWidth(testLine) <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        currentLine = w;
      }
    }
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    return lines;
  }
}

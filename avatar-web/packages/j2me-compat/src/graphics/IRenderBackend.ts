import { Image } from '../image/Image.js';

export interface RenderMetrics {
  drawCalls: number;
  quadCount: number;
  batchCount: number;
}

export interface IRenderBackend {
  translate(x: number, y: number): void;
  getTranslateX(): number;
  getTranslateY(): number;
  setColor(rgb: number): void;
  getColor(): number;
  setClip(x: number, y: number, width: number, height: number): void;
  clipRect(x: number, y: number, width: number, height: number): void;
  getClipX(): number;
  getClipY(): number;
  getClipWidth(): number;
  getClipHeight(): number;
  fillRect(x: number, y: number, width: number, height: number): void;
  drawRect(x: number, y: number, width: number, height: number): void;
  drawRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight?: number): void;
  fillRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight?: number): void;
  fillArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void;
  drawArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void;
  drawLine(x1: number, y1: number, x2: number, y2: number): void;
  drawImage(image: Image, x: number, y: number, anchor?: number): void;
  drawScaledImage(image: Image, x: number, y: number, width: number, height: number, anchor?: number): void;
  drawRegion(
    image: Image,
    x_src: number,
    y_src: number,
    width: number,
    height: number,
    transform: number,
    x_dst: number,
    y_dst: number,
    anchor?: number
  ): void;
  beginFrame?(width: number, height: number): void;
  endFrame?(): void;
  flush?(): void;
  getMetrics?(): RenderMetrics;
}

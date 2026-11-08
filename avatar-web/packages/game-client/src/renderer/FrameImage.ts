import { Graphics, Image } from '@avatar/j2me-compat';

export class FrameImage {
  public frameWidth: number;
  public frameHeight: number;
  public totalFrames: number;
  public image: Image;

  constructor(image: Image, frameWidth: number, frameHeight: number) {
    this.image = image;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.totalFrames = Math.floor(image.height / frameHeight);
  }

  public drawFrame(frameIdx: number, x: number, y: number, transform: number, anchor: number, g: Graphics): void {
    if (frameIdx >= 0 && frameIdx < this.totalFrames) {
      g.drawRegion(
        this.image,
        0,
        frameIdx * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        transform,
        x,
        y,
        anchor
      );
    }
  }

  public drawGridFrame(
    frameX: number,
    frameY: number,
    x: number,
    y: number,
    transform: number,
    anchor: number,
    g: Graphics
  ): void {
    g.drawRegion(
      this.image,
      frameX * this.frameWidth,
      frameY * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      transform,
      x,
      y,
      anchor
    );
  }
}

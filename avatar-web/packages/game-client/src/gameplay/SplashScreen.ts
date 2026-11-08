import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';

export class SplashScreen extends GameScreen {
  private timer = 0;
  public logoImage?: Image;
  public onFinished?: () => void;

  constructor(logoImage?: Image, onFinished?: () => void) {
    super();
    this.logoImage = logoImage;
    this.onFinished = onFinished;
  }

  public update(): void {
    this.timer++;
    if (this.timer >= 52) {
      if (this.onFinished) {
        this.onFinished();
      }
    }
  }

  public paint(g: Graphics): void {
    const w = 240;
    const h = 320;

    // Background fill black
    g.setColor(0x000000);
    g.fillRect(0, 0, w, h);

    // Draw TeaMobi logo centered
    if (this.logoImage && this.timer > 1) {
      g.drawImage(this.logoImage, Math.floor(w / 2), Math.floor(h / 2), Graphics.HCENTER | Graphics.VCENTER);
    }
  }
}

import { Canvas, Graphics, RenderContext2D } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';

export class GameCanvas extends Canvas {
  public static instance: GameCanvas;
  public currentScreen?: GameScreen;
  public graphics: Graphics;

  public isRunning = false;
  private lastTick = 0;
  private readonly FPS = 20;
  private readonly FRAME_TIME = 1000 / 20; // 50ms per frame

  constructor(ctx?: RenderContext2D) {
    super();
    this.width = 240;
    this.height = 320;
    this.graphics = new Graphics(ctx);
    GameCanvas.instance = this;
  }

  public setCurrentScreen(screen: GameScreen): void {
    if (this.currentScreen) {
      this.currentScreen.hide();
    }
    this.currentScreen = screen;
    screen.show();
    screen.onResize(this.width, this.height);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    if (this.currentScreen) {
      this.currentScreen.onResize(width, height);
    }
  }

  public startLoop(onFrame?: () => void): void {
    this.isRunning = true;
    this.lastTick = Date.now();

    const loop = () => {
      if (!this.isRunning) return;
      const now = Date.now();
      const elapsed = now - this.lastTick;

      if (elapsed >= this.FRAME_TIME) {
        this.lastTick = now - (elapsed % this.FRAME_TIME);
        this.tick();
        this.repaint();
        if (onFrame) onFrame();
      }

      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(loop);
      } else {
        setTimeout(loop, 10);
      }
    };

    loop();
  }

  public stopLoop(): void {
    this.isRunning = false;
  }

  public tick(): void {
    if (this.currentScreen) {
      this.currentScreen.update();
    }
  }

  public paint(g: Graphics): void {
    g.translate(0, 0);
    if (this.currentScreen) {
      this.currentScreen.paint(g);
    }
  }

  public repaint(): void {
    this.paint(this.graphics);
  }

  public keyPressed(keyCode: number): void {
    if (this.currentScreen) {
      this.currentScreen.keyPressed(keyCode);
    }
  }

  public keyReleased(keyCode: number): void {
    if (this.currentScreen) {
      this.currentScreen.keyReleased(keyCode);
    }
  }

  public pointerPressed(x: number, y: number): void {
    if (this.currentScreen) {
      this.currentScreen.pointerPressed(x, y);
    }
  }

  public pointerReleased(x: number, y: number): void {
    if (this.currentScreen) {
      this.currentScreen.pointerReleased(x, y);
    }
  }

  public pointerMoved(x: number, y: number): void {
    if (this.currentScreen) {
      this.currentScreen.pointerMoved(x, y);
    }
  }

  public pointerDragged(x: number, y: number): void {
    if (this.currentScreen) {
      this.currentScreen.pointerDragged(x, y);
    }
  }
}

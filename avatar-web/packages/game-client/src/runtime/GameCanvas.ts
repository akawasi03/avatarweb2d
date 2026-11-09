import { Canvas, Graphics, IRenderBackend, RenderContext2D } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';

export class GameCanvas extends Canvas {
  public static instance: GameCanvas;
  public currentScreen?: GameScreen;
  public graphics: Graphics;

  public isRunning = false;
  private lastTime = 0;
  private accumulator = 0;
  private readonly TICK_RATE = 20; // 20 simulation ticks/sec
  private readonly TICK_INTERVAL = 1000 / 20; // 50ms per tick

  // Frame timing & FPS tracking
  public currentFPS = 60;
  private frameCount = 0;
  private fpsLastTime = 0;

  constructor(target?: IRenderBackend | RenderContext2D) {
    super();
    this.width = 1024;
    this.height = 768;
    this.graphics = new Graphics(target);
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
    this.lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this.fpsLastTime = this.lastTime;
    this.accumulator = 0;

    const loop = (currentTime: number) => {
      if (!this.isRunning) return;

      const now = currentTime || (typeof performance !== 'undefined' ? performance.now() : Date.now());
      let elapsed = now - this.lastTime;
      if (elapsed > 250) {
        // Prevent spiral of death on background/tab switch
        elapsed = 250;
      }
      this.lastTime = now;
      this.accumulator += elapsed;

      // 1. Fixed Simulation Ticks (Strictly 20 ticks / second)
      while (this.accumulator >= this.TICK_INTERVAL) {
        this.tick();
        this.accumulator -= this.TICK_INTERVAL;
      }

      // 2. Alpha for Positional Interpolation (0.0 <= alpha < 1.0)
      const alpha = Math.max(0.0, Math.min(1.0, this.accumulator / this.TICK_INTERVAL));

      // 3. Independent High-Performance Rendering (Targeting 60+ FPS)
      this.graphics.beginFrame(this.width, this.height);
      this.paint(this.graphics, alpha);
      this.graphics.endFrame();

      // FPS tracking
      this.frameCount++;
      if (now - this.fpsLastTime >= 1000) {
        this.currentFPS = Math.round((this.frameCount * 1000) / (now - this.fpsLastTime));
        this.frameCount = 0;
        this.fpsLastTime = now;
      }

      if (onFrame) onFrame();

      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(loop);
      } else {
        setTimeout(() => loop(Date.now()), 16);
      }
    };

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(loop);
    } else {
      setTimeout(() => loop(Date.now()), 16);
    }
  }

  public stopLoop(): void {
    this.isRunning = false;
  }

  public tick(): void {
    if (this.currentScreen) {
      this.currentScreen.update();
    }
  }

  public paint(g: Graphics, alpha: number = 1.0): void {
    if (this.currentScreen) {
      this.currentScreen.paint(g, alpha);
    }
  }

  public repaint(): void {
    this.graphics.beginFrame(this.width, this.height);
    this.paint(this.graphics, 1.0);
    this.graphics.endFrame();
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

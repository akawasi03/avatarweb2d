import { Graphics } from '../graphics/Graphics.js';

export abstract class Canvas {
  public static readonly UP = 1;
  public static readonly DOWN = 6;
  public static readonly LEFT = 2;
  public static readonly RIGHT = 5;
  public static readonly FIRE = 8;
  public static readonly GAME_A = 9;
  public static readonly GAME_B = 10;
  public static readonly GAME_C = 11;
  public static readonly GAME_D = 12;

  public static readonly KEY_NUM0 = 48;
  public static readonly KEY_NUM1 = 49;
  public static readonly KEY_NUM2 = 50;
  public static readonly KEY_NUM3 = 51;
  public static readonly KEY_NUM4 = 52;
  public static readonly KEY_NUM5 = 53;
  public static readonly KEY_NUM6 = 54;
  public static readonly KEY_NUM7 = 55;
  public static readonly KEY_NUM8 = 56;
  public static readonly KEY_NUM9 = 57;
  public static readonly KEY_STAR = 42;
  public static readonly KEY_POUND = 35;

  public width = 240;
  public height = 320;
  public fullScreen = false;

  public setFullScreenMode(mode: boolean): void {
    this.fullScreen = mode;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getGameAction(keyCode: number): number {
    switch (keyCode) {
      case Canvas.KEY_NUM2:
      case -1: // Standard UP key
        return Canvas.UP;
      case Canvas.KEY_NUM8:
      case -2: // Standard DOWN key
        return Canvas.DOWN;
      case Canvas.KEY_NUM4:
      case -3: // Standard LEFT key
        return Canvas.LEFT;
      case Canvas.KEY_NUM6:
      case -4: // Standard RIGHT key
        return Canvas.RIGHT;
      case Canvas.KEY_NUM5:
      case -5: // Standard FIRE / OK key
      case 13: // Enter
        return Canvas.FIRE;
      default:
        return 0;
    }
  }

  public getKeyCode(gameAction: number): number {
    switch (gameAction) {
      case Canvas.UP: return Canvas.KEY_NUM2;
      case Canvas.DOWN: return Canvas.KEY_NUM8;
      case Canvas.LEFT: return Canvas.KEY_NUM4;
      case Canvas.RIGHT: return Canvas.KEY_NUM6;
      case Canvas.FIRE: return Canvas.KEY_NUM5;
      default: return 0;
    }
  }

  public hasPointerEvents(): boolean {
    return true;
  }

  public abstract paint(g: Graphics): void;

  public repaint(): void {
    // Overridden by renderer / game loop
  }

  public serviceRepaints(): void {
    // Flush paint requests immediately
  }

  public keyPressed(keyCode: number): void {}
  public keyReleased(keyCode: number): void {}
  public pointerPressed(x: number, y: number): void {}
  public pointerDragged(x: number, y: number): void {}
  public pointerReleased(x: number, y: number): void {}
  public sizeChanged(w: number, h: number): void {
    this.width = w;
    this.height = h;
  }
}

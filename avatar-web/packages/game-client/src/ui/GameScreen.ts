import { Graphics } from '@avatar/j2me-compat';

export interface CommandAction {
  caption: string;
  actionId: number;
  subType?: number;
}

export abstract class GameScreen {
  public leftCmd?: CommandAction;
  public centerCmd?: CommandAction;
  public rightCmd?: CommandAction;
  public isVisible = false;

  public show(): void {
    this.isVisible = true;
  }

  public hide(): void {
    this.isVisible = false;
  }

  public abstract update(): void;
  public abstract paint(g: Graphics, alpha?: number): void;

  public keyPressed(keyCode: number): void {}
  public keyReleased(keyCode: number): void {}
  public pointerPressed(x: number, y: number): void {}
  public pointerReleased(x: number, y: number): void {}
  public pointerMoved(x: number, y: number): void {}
  public pointerDragged(x: number, y: number): void {}
  public onResize(width: number, height: number): void {}
}

import { Image, IRenderBackend, RenderContext2D } from '@avatar/j2me-compat';
import { GameCanvas } from '../runtime/GameCanvas.js';
import { SplashScreen } from '../gameplay/SplashScreen.js';
import { LoginScreen } from '../gameplay/LoginScreen.js';
import { WorldMapScreen } from '../gameplay/WorldMapScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { BitmapFont } from '../renderer/BitmapFont.js';
import { AvArchiveLoader } from '../assets/AvArchiveLoader.js';

export class GameMidlet {
  public canvas: GameCanvas;
  public splashScreen: SplashScreen;
  public loginScreen: LoginScreen;
  public worldMapScreen: WorldMapScreen;
  public skinPainter: UISkinPainter;
  public font: BitmapFont;

  constructor(target?: IRenderBackend | RenderContext2D) {
    this.canvas = new GameCanvas(target);
    this.font = new BitmapFont();
    this.skinPainter = new UISkinPainter(this.font);

    this.loginScreen = new LoginScreen(this.skinPainter, this.font);
    this.worldMapScreen = new WorldMapScreen(this.skinPainter, this.font);
    this.splashScreen = new SplashScreen(undefined, () => {
      this.canvas.setCurrentScreen(this.loginScreen);
    });

    this.canvas.setCurrentScreen(this.splashScreen);
  }

  public async initAssets(
    logoPngBytes?: Uint8Array,
    fontMetadataBytes?: Uint8Array,
    fontPngBytes?: Uint8Array,
    bgAvBytes?: Uint8Array
  ): Promise<void> {
    if (logoPngBytes) {
      this.splashScreen.logoImage = await Image.createImage(logoPngBytes);
    }
    if (fontMetadataBytes && fontPngBytes) {
      this.font.loadMetadata(fontMetadataBytes);
      this.font.fontImage = await Image.createImage(fontPngBytes);
    }
    if (bgAvBytes) {
      const bgLoader = new AvArchiveLoader();
      bgLoader.loadFromBytes(bgAvBytes);
      const bg0 = bgLoader.getImage('0.png');
      if (bg0 instanceof Promise) {
        this.loginScreen.bgImages.push(await bg0);
      } else if (bg0) {
        this.loginScreen.bgImages.push(bg0);
      }
    }
  }

  public start(): void {
    this.canvas.startLoop();
  }

  public stop(): void {
    this.canvas.stopLoop();
  }
}

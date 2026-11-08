import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { IFont } from '../renderer/BitmapFont.js';

export class LoginScreen extends GameScreen {
  public selectedIndex = 0; // Highlight first option by default
  public options = ['Chơi mới', 'Đổi tài khoản'];
  public isQuickSelectMode = true; // es.v == true

  public bgImages: Image[] = [];
  public bannerLogo?: Image;
  public skinPainter: UISkinPainter;
  public font?: IFont;

  // Exact window coordinates from es.java & gw.java
  // es2.l = 176, es2.m = 130, winX = 120 - 88 = 32, winY = 160 - 65 + 5 = 100
  public winX = 32;
  public winY = 100;
  public winW = 176;
  public winH = 130;
  public itemH = 36;
  public offsetY = 10;

  constructor(skinPainter: UISkinPainter, font?: IFont) {
    super();
    this.skinPainter = skinPainter;
    this.font = font;

    this.leftCmd = { caption: 'Menu', actionId: 0 };
    this.centerCmd = { caption: 'Chọn', actionId: 1 };
    this.rightCmd = { caption: 'Đóng', actionId: 2 };
  }

  public update(): void {
    // Animation / idle ticks
  }

  public onResize(width: number, height: number): void {
    this.winX = Math.floor((width - this.winW) / 2);
    this.winY = Math.floor((height - this.winH) / 2);
  }

  public keyPressed(keyCode: number): void {
    if (keyCode === 50 || keyCode === -1) { // UP
      this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
    } else if (keyCode === 56 || keyCode === -2) { // DOWN
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
    } else if (keyCode === 53 || keyCode === -5 || keyCode === 13 || keyCode === -6) { // FIRE / SELECT / LEFT SOFTKEY
      this.onSelectOption(this.selectedIndex >= 0 ? this.selectedIndex : 0);
    } else if (keyCode === -7) { // RIGHT SOFTKEY (Đóng)
      this.selectedIndex = -1;
    }
  }

  public pointerMoved(x: number, y: number): void {
    if (x >= this.winX && x <= this.winX + this.winW && y >= this.winY + this.offsetY) {
      const idx = Math.floor((y - (this.winY + this.offsetY)) / this.itemH);
      if (idx >= 0 && idx < this.options.length) {
        this.selectedIndex = idx;
      }
    }
  }

  public pointerPressed(x: number, y: number): void {
    const screenH = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.height) || 320;
    // 1. Softkeys at bottom (y >= screenH - 25)
    if (y >= screenH - 25) {
      if (x <= 80) {
        // Left Softkey: Menu / Chọn
        this.selectedIndex = 0;
        this.onSelectOption(0);
      } else if (x > 80 && x < 160) {
        // Center Softkey: Chọn
        this.onSelectOption(this.selectedIndex >= 0 ? this.selectedIndex : 0);
      } else {
        // Right Softkey: Đóng
        this.selectedIndex = -1;
      }
      return;
    }

    // 2. Options inside window
    if (x >= this.winX && x <= this.winX + this.winW && y >= this.winY + this.offsetY) {
      const idx = Math.floor((y - (this.winY + this.offsetY)) / this.itemH);
      if (idx >= 0 && idx < this.options.length) {
        this.selectedIndex = idx;
        this.onSelectOption(idx);
      }
    }
  }

  public onSelectOption(index: number): void {
    if (index === 0) {
      // "Chơi mới" -> Trigger Login
      const btn = document.getElementById('loginBtn');
      if (btn) btn.click();
    } else if (index === 1) {
      // "Đổi tài khoản" -> Focus username input
      const uInput = document.getElementById('usernameInput');
      if (uInput) {
        uInput.focus();
        (uInput as HTMLInputElement).select();
      }
    }
  }

  public paint(g: Graphics): void {
    const screenW = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.width) || 240;
    const screenH = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.height) || 320;

    this.winX = Math.floor((screenW - this.winW) / 2);
    this.winY = Math.floor((screenH - this.winH) / 2);

    // 1. Paint background landscape (sky & ground)
    g.setColor(0x5DBEF7);
    g.fillRect(0, 0, screenW, screenH);

    // Ground horizon
    g.setColor(0x3B8C30);
    g.fillRect(0, Math.floor(screenH * 0.6), screenW, Math.floor(screenH * 0.4));

    // Scenery images
    for (const bgImg of this.bgImages) {
      if (bgImg) {
        const bgW = bgImg.getWidth();
        for (let bx = 0; bx < screenW; bx += bgW) {
          g.drawImage(bgImg, bx, Math.floor(screenH * 0.5), 0);
        }
      }
    }

    // 2. Avatar Banner Logo at top
    if (this.bannerLogo) {
      g.drawImage(this.bannerLogo, Math.floor(screenW / 2), Math.max(25, this.winY - 45), Graphics.HCENTER | Graphics.VCENTER);
    } else if (this.font) {
      this.font.drawString(g, 'AVATAR 258', Math.floor(screenW / 2), Math.max(25, this.winY - 45), 2);
    }

    // 3. Main Dialog Box
    this.skinPainter.paintWindow(g, this.winX, this.winY, this.winW, this.winH);

    if (this.isQuickSelectMode) {
      // Draw highlight if selectedIndex != -1
      if (this.selectedIndex !== -1) {
        g.setColor(UISkinPainter.COLOR_SELECTED);
        g.fillRect(this.winX + 5, this.winY + this.offsetY + this.selectedIndex * this.itemH, this.winW - 10, this.itemH);
      }

      // Draw menu options text centered
      if (this.font) {
        for (let i = 0; i < this.options.length; i++) {
          const textY = this.winY + this.offsetY + i * this.itemH + Math.floor(this.itemH / 2) - Math.floor(this.font.getHeight() / 2);
          this.font.drawString(
            g,
            this.options[i],
            Math.floor(screenW / 2),
            textY,
            2 // Center align
          );
        }
      }
    } else {
      // Form fields (Username, Password)
      if (this.font) {
        this.font.drawString(g, 'Tài khoản:', this.winX + 15, this.winY + 15, 0);
        g.setColor(0xFFFFFF);
        g.fillRect(this.winX + 15, this.winY + 30, this.winW - 30, 22);
        g.setColor(0x333333);
        g.drawRect(this.winX + 15, this.winY + 30, this.winW - 30, 22);

        this.font.drawString(g, 'Mật khẩu:', this.winX + 15, this.winY + 58, 0);
        g.setColor(0xFFFFFF);
        g.fillRect(this.winX + 15, this.winY + 73, this.winW - 30, 22);
        g.setColor(0x333333);
        g.drawRect(this.winX + 15, this.winY + 73, this.winW - 30, 22);
      }
    }

    // 4. Softkeys bar at bottom
    this.skinPainter.paintSoftkeys(g, this.leftCmd, this.centerCmd, this.rightCmd, screenW, screenH);
  }
}

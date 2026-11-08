/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class hl
extends gx {
    public byte a;
    public byte b;
    private byte h = (byte)10;
    private byte i = (byte)-1;
    private byte j = (byte)-1;
    private byte k;
    private byte l = (byte)6;
    public short c;
    public short d;
    public short[] e;
    public short[] f;
    public int g;
    private int m = 0;

    public hl(jz jz2) {
    }

    public final void b() {
        this.k = (byte)(this.k + 1);
        if (this.k >= 10) {
            this.k = 0;
        }
        if (this.l < 9) {
            this.l = (byte)(this.l + 1);
        }
        ++this.m;
        if (this.m >= 6) {
            this.m = 0;
        }
        ++this.y;
        if (this.y == 12) {
            this.y = 0;
        }
        if (this.aw < (ir.e + 1) * ir.i) {
            if (this.e != null && this.b < this.e.length && cz.b().e <= 0) {
                this.aw += this.f[this.b];
                this.H = this.f[this.b] == 0 ? (byte)2 : (byte)1;
                byte by2 = this.b;
                this.e[by2] = (short)(this.e[by2] - 1);
                if (this.e[this.b] <= 0) {
                    this.b = (byte)(this.b + 1);
                    if (this.b < this.f.length) {
                        if (this.l == 9 && this.f[this.b] == 0) {
                            this.l = 0;
                        } else if (this.i == -1 && this.f[this.b] == 2) {
                            this.i = (byte)20;
                        } else if (this.j == -1 && this.f[this.b] == 5) {
                            this.j = (byte)20;
                        }
                    }
                }
            } else {
                this.H = 0;
                if (this.f != null && cz.b().e <= 0) {
                    this.aw += this.f[this.f.length - 1];
                }
                if (this.h == 10 && this.e != null && this.b >= this.e.length) {
                    byte by3 = cz.b().f;
                    cz.b().f = (byte)(by3 + 1);
                    this.h = by3;
                }
            }
            if (this.i >= 0) {
                this.i = (byte)(this.i - 1);
            }
            if (this.j >= 0) {
                this.j = (byte)(this.j - 1);
            }
        }
    }

    public final void a(Graphics graphics) {
        f f2 = fx.c(this.c);
        if (f2.d != -1) {
            int n2 = f2.c / 5;
            graphics.drawRegion(f2.a, 0, cz.m[this.H][this.y] * n2, (int)f2.b, n2, 0, this.aw * js.ay, this.ax * js.ay, 33);
            if (cz.b().d && this.g > 0) {
                main.a.M.a(graphics, "" + this.g, this.aw * js.ay - f2.b / 2 - 8 * js.ay, this.ax * js.ay - gy.af / 2 - 3 * js.ay, 1);
            }
            if (this.i >= 0) {
                graphics.drawImage(cz.h, this.aw * js.ay + f2.b / 2, this.ax * js.ay - n2, 33);
            }
            if (this.l < 9) {
                graphics.drawImage(cz.k[this.l / 3], this.aw * js.ay, this.ax * js.ay, 3);
            }
            if (this.j >= 0) {
                graphics.drawImage(cz.i, this.aw * js.ay + f2.b / 2, this.ax * js.ay - n2, 33);
                graphics.drawImage(cz.j[this.k / 2], this.aw * js.ay - f2.b / 2, this.ax * js.ay, 3);
            }
            if (this.w == do.a().h.w) {
                graphics.drawImage(ae.d, this.aw * js.ay, this.ax * js.ay - n2 - this.m / 2 - 10 * js.ay, 3);
            }
        }
    }
}


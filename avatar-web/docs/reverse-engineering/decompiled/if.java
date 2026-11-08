/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class if
extends gs {
    private short[] a;
    private String[] b;
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private int h;
    private int i;
    private int j;
    private int k = 0;
    private boolean l = false;
    private int m;
    private int n;
    private int o;
    private int p;

    public if(jz jz2, short[] sArray, String[] stringArray) {
        this.a = sArray;
        this.b = stringArray;
        this.ad = new by(kf.z, null);
        this.d = 150 * gy.Y;
        this.c = 200 * gy.Y;
        this.c = 0;
        int n2 = 0;
        while (n2 < stringArray.length) {
            int n3 = main.a.K.a(stringArray[n2]) + 40 * gy.Y;
            if (n3 > this.c) {
                this.c = n3;
            }
            ++n2;
        }
        this.e = gy.ag + 5 * gy.Y;
        this.j = sArray.length * this.e - (this.d - 10 * gy.Y);
        if (this.j < 0) {
            this.j = 0;
        }
    }

    public final void l() {
        ++this.n;
        boolean bl2 = false;
        if (main.a.g && main.a.a((main.a.m - this.c) / 2, (main.a.n - this.d) / 2, this.c, this.d) && !this.l) {
            this.k = this.g;
            this.l = true;
            this.m = 0;
        }
        if (this.l) {
            int n2 = main.a.l();
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    this.p = main.a.i;
                    this.o = this.n;
                }
                this.f = this.k + n2;
                this.m = 0;
                if (this.f < 0 || this.f > this.j) {
                    this.f = this.k + n2 / 2;
                }
                this.g = this.f;
            }
            if (main.a.f) {
                this.l = false;
                int n3 = this.n - this.o;
                int n4 = this.p - main.a.i;
                if (aw.f(n4) > 40 && n3 < 10 && this.f > 0 && this.f < this.j) {
                    this.m = n4 / n3 * 10;
                }
                this.o = -1;
                if (Math.abs(n2) < 10) {
                    this.f = this.k + n2;
                }
            }
        }
        if (main.a.d[2]) {
            this.f -= gy.ag;
            bl2 = true;
        } else if (main.a.d[8]) {
            bl2 = true;
            this.f += gy.ag;
        }
        if (bl2) {
            if (this.f < 0) {
                this.f = 0;
            }
            if (this.f > this.j) {
                this.f = this.j;
            }
        }
        if (this.m != 0) {
            if (this.g < 0 || this.g > this.j) {
                this.m -= this.m / 4;
                this.g += this.m / 20;
                if (this.m / 10 <= 1) {
                    this.m = 0;
                }
            }
            if (this.g < 0) {
                if (this.g < -this.d / 2) {
                    this.g = -this.d / 2;
                    this.f = 0;
                    this.m = 0;
                }
            } else if (this.g > this.j) {
                if (this.g < this.j + this.d / 2) {
                    this.g = this.j + this.d / 2;
                    this.f = this.j;
                    this.m = 0;
                }
            } else {
                this.g += this.m / 10;
            }
            this.f = this.g;
            this.m -= this.m / 10;
            if (this.m / 10 == 0) {
                this.m = 0;
            }
        } else if (this.g < 0) {
            this.f = 0;
        } else if (this.g > this.j) {
            this.f = this.j;
        }
        if (this.g != this.f) {
            this.i = this.f - this.g << 2;
            this.h += this.i;
            this.g += this.h >> 4;
            this.h &= 0xF;
        }
        super.l();
    }

    public final void a(Graphics graphics) {
        main.a.S.a(graphics, (main.a.m - this.c) / 2, (main.a.q - this.d) / 2 - (je.o + 3 * gy.Y), this.d + (je.o + 3 * gy.Y), this.c, 0, 0, je.a().j, je.a().i, je.o, 1, 1, je.a().n, je.a().m, "L\u1ecbch s\u1eed");
        main.a.c(graphics);
        graphics.translate((main.a.m - this.c) / 2, (main.a.q - this.d) / 2);
        graphics.setClip(0, 5 * gy.Y, this.c, this.d - 10 * gy.Y);
        graphics.translate(0, -this.g);
        int n2 = 0;
        while (n2 < this.a.length) {
            fx.a(graphics, this.a[n2], 15 * gy.Y, 15 * gy.Y + n2 * this.e, 3);
            main.a.K.a(graphics, this.b[n2], 35 * gy.Y, 15 * gy.Y + n2 * this.e - gy.ag / 2, 0);
            ++n2;
        }
        super.a(graphics);
    }
}


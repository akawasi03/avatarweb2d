/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class cp {
    private String a = "";
    private int b;
    private int c;
    private int d;
    private int e;
    private boolean f = false;
    private Image g;
    private byte h;
    private byte i = (byte)-1;
    private short j = (short)-1;
    private short k = (short)-1;

    public cp(int n2, int n3, int n4, int n5, Image image, int n6, int n7, int n8) {
        this.e = n6;
        this.h = (byte)n5;
        this.b = n2;
        this.c = n3;
        if (n4 > 0) {
            this.a = "+";
        }
        this.a = String.valueOf(this.a) + n4;
        if (n4 == 0) {
            this.a = "";
        }
        this.g = image;
        this.f = false;
        this.i = (byte)-1;
        this.j = (short)n7;
        this.k = (short)n8;
    }

    public cp(int n2, int n3, String string, int n4, int n5, int n6) {
        this.e = n6;
        this.h = (byte)n4;
        this.b = n2;
        this.c = n3;
        this.a = string;
        this.d = 0;
        this.f = true;
        this.i = (byte)n5;
        this.j = (short)-1;
        this.k = (short)-1;
    }

    public final void a() {
        if (this.e > 0) {
            --this.e;
            return;
        }
        ++this.d;
        if (this.d > 40) {
            this.g = null;
            main.a.ac.removeElement(this);
        }
        if (this.d < 3) {
            this.c += -2 * this.h;
            return;
        }
        this.c += this.h;
    }

    public final void a(Graphics graphics) {
        if (main.a.r == cz.a) {
            main.a.c(graphics);
        }
        if (this.e > 0) {
            return;
        }
        int n2 = gy.Y;
        if (main.a.r == kx.i && (kx.j || kx.k) || main.a.r == cz.a) {
            n2 = 1;
        }
        cs cs2 = main.a.O;
        if (this.f) {
            cs2 = this.i == 0 ? main.a.P : main.a.L;
        }
        cs2.a(graphics, this.a, this.b * n2, this.c * n2, 2);
        if (this.g == null) {
            if (this.j != -1) {
                gb.a(graphics, this.j, this.b * n2, (this.c - 5) * n2, 33);
                return;
            }
            if (this.k != -1) {
                fx.a(graphics, this.k, this.b * n2, (this.c - 5) * n2, 33);
                return;
            }
        } else if (!this.f) {
            graphics.drawImage(this.g, this.b * n2, this.c * n2, 33);
        }
    }
}


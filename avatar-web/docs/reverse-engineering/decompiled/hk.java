/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class hk
extends hj {
    public static hk a;
    private int[] b;
    private hj c;
    private int d = 5;
    private int e;
    private int f = 7;

    public static hk b() {
        if (a == null) {
            a = new hk();
        }
        return a;
    }

    public final void a(hj hj2) {
        super.a();
        this.c = hj2;
        this.ar = 0;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                ho ho2 = main.a.y;
                main.a.y.m = false;
                this.c.a();
                return;
            }
            case 1: {
                hk hk2 = this;
                ho ho3 = main.a.y;
                main.a.y.m = false;
                hk2.c.a();
                bf.a().a((int)ae.b, hk2.ar);
            }
        }
    }

    public hk() {
        this.ae = new by(kf.d, 0);
        this.ad = new by(kf.O, 1);
        this.e = 20;
        if (main.a.Z > 0) {
            this.e = main.a.Z * 30;
        }
        if (main.a.m < 176) {
            this.e = 15;
        }
        if (this.f * this.e > main.a.n - main.a.T) {
            this.f = (main.a.n - main.a.T) / this.e;
        }
    }

    public final void a(int n2, boolean bl2) {
        if (bl2 && this.ar == n2 && this.ad != null) {
            this.ad.b();
        }
        super.a(n2, bl2);
    }

    public final void a(int[] nArray) {
        this.b = nArray;
        main.a.y.a(main.a.o - (this.e * this.d + 10) / 2 + 4, main.a.p - this.e * this.f / 2, this.e, this.e, this.d * this.e, this.b.length / this.d * this.e, this.e * this.d, this.e * this.f - (main.a.Z == 0 ? 30 : 0), nArray.length);
    }

    public final void l() {
        super.l();
    }

    public final void k() {
        this.c.k();
    }

    public final void a(Graphics graphics) {
        graphics.translate(0, 0);
        graphics.setClip(0, 0, main.a.m, main.a.n);
        this.c.b(graphics);
        main.a.S.a(graphics, main.a.o - (this.e * this.d + 10) / 2, main.a.p - this.e * this.f / 2, this.e * this.d + 10, this.e * this.f);
        main.a.S.a(graphics, this.e, this.d, this.f, this.aj, this.ar, this.b);
        super.a(graphics);
    }
}


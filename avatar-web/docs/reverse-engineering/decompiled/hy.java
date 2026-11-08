/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class hy
extends gs {
    private ht b;
    public static hy a;
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private int h;
    private int i;
    private int[] j;

    public static hy a() {
        if (a == null) {
            a = new hy();
            return a;
        }
        return a;
    }

    public final void b() {
        hy hy2 = this;
        if (hy2.b == null) {
            try {
                hy2.b = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/button.png")), gy.Y == 2 ? 112 : 52, 16 * gy.Y);
            }
            catch (IOException iOException) {
                IOException iOException2 = iOException;
                iOException.printStackTrace();
            }
            hy2.e = hy2.b.a * 3 + 30 * gy.Y;
            hy2.f = hy2.b.b * 3 + 60 * gy.Y;
            hy2.c = (main.a.m - hy2.e) / 2;
            hy2.d = (main.a.n - hy2.f) / 2;
            hy2.g = hy2.f / 3;
            hy2.h = hy2.e / 3;
            hy2.j = new int[]{100, 1000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000};
            hy2.ad = new by(kf.O, 0, hy2);
            hy2.ae = new by(kf.d, 1, hy2);
        }
        main.a.v = this;
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                main.a.a("B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n chuy\u1ec3n ti\u1ec1n kh\u00f4ng ?", new jm(this));
                return;
            }
            case 1: {
                main.a.v = null;
            }
        }
    }

    public final void k() {
    }

    public final void l() {
        super.l();
        if (main.a.a(2)) {
            if (this.i / 3 > 0) {
                this.i -= 3;
            }
        } else if (main.a.a(4)) {
            if (this.i % 3 > 0) {
                --this.i;
            }
        } else if (main.a.a(6)) {
            if (this.i % 3 < 2) {
                ++this.i;
            }
        } else if (main.a.a(8) && this.i / 3 < 2) {
            this.i += 3;
        }
        if (main.a.g) {
            int n2 = 0;
            while (n2 < this.j.length) {
                if (main.a.b(this.c + n2 % 3 * this.h, this.d + n2 / 3 * this.g, this.h, this.g)) {
                    main.a.g = false;
                    this.i = n2;
                    return;
                }
                ++n2;
            }
        }
    }

    public final void a(Graphics graphics) {
        main.a.r.b(graphics);
        main.a.c(graphics);
        main.a.S.h(graphics, this.c, this.d, this.e, this.f);
        graphics.translate(this.c, this.d);
        int n2 = 0;
        while (n2 < this.j.length) {
            this.b.a(this.i == n2 ? 1 : 0, this.h / 2 + n2 % 3 * this.h, this.g / 2 + n2 / 3 * this.g, 0, 3, graphics);
            main.a.Q.a(graphics, String.valueOf(this.j[n2]), this.h / 2 + n2 % 3 * this.h, this.g / 2 + n2 / 3 * this.g - gy.ai / 2, 2);
            ++n2;
        }
        main.a.c(graphics);
        jy.a(graphics, this.ac, this.ad, this.ae);
    }

    static int[] a(hy hy2) {
        return hy2.j;
    }

    static int b(hy hy2) {
        return hy2.i;
    }
}


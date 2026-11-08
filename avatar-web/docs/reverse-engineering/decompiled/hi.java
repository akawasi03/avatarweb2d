/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class hi
extends ha {
    public static hi a;
    private dx[] b;
    private String c;
    private int d;
    private int e;
    private int f = 200 + main.a.Z * 88;
    private int g;
    private int h;
    private int i;
    private String[][] j;

    public static hi b() {
        if (a == null) {
            a = new hi();
            return a;
        }
        return a;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                main.a.A = null;
                return;
            }
        }
        main.a.r.a(n2, n3);
    }

    public hi() {
        this.d = (main.a.m - this.f) / 2;
    }

    public final void a(dx[] dxArray, String string, String[][] stringArray, by by2) {
        this.ac = new by(kf.d, 0);
        this.ad = by2;
        this.c = string;
        this.b = dxArray;
        this.j = stringArray;
        this.g = hj.at + gy.Z + gy.ah + (dxArray[0].d << 1) * dxArray.length + main.a.Z * 12;
        this.e = (main.a.n - main.a.T - this.g) / 2;
        int n2 = 0;
        while (n2 < dxArray.length) {
            dxArray[n2].c = this.f - 50 * (main.a.Z + 1) - main.a.K.a(stringArray[0][0]);
            dxArray[n2].a = this.d + this.f - dxArray[n2].c - 10 * (main.a.Z + 1);
            dxArray[n2].b = this.e + je.o + gy.Z + gy.ah + (dxArray[0].d * n2 << 1);
            ++n2;
        }
        this.i = main.a.K.a(string) + 20 * gy.Y;
        if (this.i < 50 + 20 * gy.Y) {
            this.i = 50 + 20 * gy.Y;
        }
        this.d();
    }

    public final void l() {
        int n2 = 0;
        while (n2 < this.b.length) {
            this.b[n2].e();
            ++n2;
        }
        n2 = 0;
        if (main.a.a(2)) {
            --this.h;
            if (this.h < 0) {
                this.h = this.b.length - 1;
            }
            n2 = 1;
        } else if (main.a.a(8)) {
            ++this.h;
            if (this.h > this.b.length - 1) {
                this.h = 0;
            }
            n2 = 1;
        }
        if (n2 != 0) {
            this.d();
        }
        super.l();
    }

    private void d() {
        int n2 = 0;
        while (n2 < this.b.length) {
            this.b[n2].a(false);
            ++n2;
        }
        this.b[this.h].a(true);
        this.ae = this.b[this.h].a();
    }

    public final void d(int n2) {
        int n3 = 0;
        while (n3 < this.b.length) {
            if (this.b[n3].d()) {
                this.b[n3].b(n2);
            }
            ++n3;
        }
        super.d(n2);
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        main.a.S.a(graphics, this.d, this.e, this.g, this.f, 0, 0, je.a().j, this.i, je.o, 1, 1, je.a().n, je.a().m, this.c);
        int n2 = 0;
        while (n2 < this.b.length) {
            graphics.setClip(this.d + 4 * gy.Y, this.e, this.f - 8 * gy.Y, this.g);
            int n3 = this.b[n2].a - main.a.K.a(this.j[n2][0]) - 5;
            if (n3 > this.d + 4 * gy.Y + 5) {
                n3 = this.d + 4 * gy.Y + 5;
            }
            int n4 = 2;
            if (this.j[n2][1].equals("")) {
                n4 = 1;
            }
            int n5 = 0;
            while (n5 < n4) {
                main.a.K.a(graphics, this.j[n2][n5], n3, this.b[n2].b + this.b[n2].d / 2 - gy.ah * n4 / 2 + gy.ah * n5, 0);
                ++n5;
            }
            this.b[n2].a(graphics);
            ++n2;
        }
        super.a(graphics);
    }
}


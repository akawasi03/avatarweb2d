/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class hw
extends hj {
    private static hw a;
    private Image b;
    private Image c;
    private Image d;
    private Image e;
    private ht f;
    private int g;
    private int h;
    private int i;
    private int j;
    private int k;
    private int l;
    private int m;
    private dr n;
    private boolean o;
    private boolean p;
    private boolean q = false;
    private hj r;
    private short s;
    private by t;
    private by u;
    private by v;
    private Vector w = new Vector();
    private long x = 0L;
    private boolean[] y;
    private Vector z;

    public static hw b() {
        if (a == null) {
            a = new hw();
            return a;
        }
        return a;
    }

    public final void a(hj hj2, short s2) {
        this.r = hj2;
        this.s = s2;
        main.a.d[5] = false;
        super.a();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.q = true;
                return;
            }
            case 1: {
                return;
            }
            case 2: {
                this.r.a();
                hw hw2 = this;
                this.p = false;
                hw2.ad = hw2.t;
                n3 = 0;
                while (n3 < 3) {
                    hw2.y[n3] = false;
                    ++n3;
                }
                hw2.z.removeAllElements();
                hw.a(hw2.w, GameMidlet.i, 0);
            }
        }
    }

    public hw() {
        c.b(kf.ax);
        this.b = c.a("c");
        this.d = c.a("sq");
        this.e = c.a("q");
        this.f = ht.a("st", 11 * gy.Y, 11 * gy.Y);
        this.c = c.a("cb");
        c.a();
        this.g = main.a.m < 200 ? 80 : 90;
        this.n = new dr(main.a.m, main.a.p);
        this.i = 30;
        this.l = 360 / this.i;
        this.t = new by(kf.dv, 0);
        this.u = new by(kf.b, 1);
        this.v = new by(kf.d, 2);
        this.ad = this.t;
        this.k = 90;
        this.y = new boolean[3];
        this.z = new Vector();
    }

    private static void a(Vector vector, hn hn2, int n2) {
        int n3 = 0;
        while (n3 < vector.size()) {
            Object object = (jh)vector.elementAt(n3);
            String string = "";
            switch (((jh)object).b) {
                case 1: {
                    object = fx.a(((jh)object).a);
                    object = fx.a[((ld)object).h];
                    main.a.a(0, hn2.aw, hn2.ax - 50, -1, aw.a(((ke)object).c * gy.Y, ((ke)object).d * gy.Y, ((ke)object).e * gy.Y, ((ke)object).f * gy.Y, fx.a((int)((ke)object).b).e), n2);
                    break;
                }
                case 2: {
                    string = "+" + ((jh)object).c + kf.C;
                    hn2.a(hn2.a[0] + ((jh)object).c);
                    n2 += 20;
                    break;
                }
                case 3: {
                    string = "+" + ((jh)object).f + " xp";
                    hn2.d(hn2.n + ((jh)object).f);
                    n2 += 20;
                    break;
                }
                case 4: {
                    string = "+" + ((jh)object).g + kf.D;
                    hn2.a[2] = hn2.a[2] + ((jh)object).g;
                    n2 += 20;
                }
            }
            if (!string.equals("")) {
                main.a.a(string, hn2.aw, hn2.ax - 50, -1, 1, n2);
            }
            ++n3;
        }
    }

    public final void k() {
        int n2;
        this.r.k();
        if (this.j > 0) {
            this.h -= this.j;
            if (this.h < 0) {
                this.h += 7200;
            }
            if (this.j < 10) {
                if (this.h / 20 % 30 == 0) {
                    this.j = 0;
                }
            } else {
                --this.j;
            }
            if (main.a.l % 8 == 4) {
                int n3 = aw.e(this.l);
                n2 = this.h / 20 + n3 * this.i;
                if (n2 > 360) {
                    n2 -= 360;
                }
                n2 = aw.c(n2);
                n3 = this.g * aw.b(n2) >> 10;
                n2 = -(this.g * aw.a(n2)) >> 10;
                this.b(this.n.a + n3, this.n.b + n2);
            }
        } else if (this.o) {
            hw hw2 = this;
            this.o = false;
            hw2.p = true;
            hw2.q = false;
            hw2.x = System.currentTimeMillis() / 100L;
            n2 = 0;
            while (n2 < hw2.w.size()) {
                jh jh2 = (jh)hw2.w.elementAt(n2);
                int n4 = n2 == 0 ? 150 : (n2 == 1 ? 180 : 210);
                n4 = aw.c(n4);
                int n5 = hw2.g * aw.b(n4) >> 10;
                n4 = -(hw2.g * aw.a(n4)) >> 10;
                jh2.d = hw2.n.a + n5;
                jh2.e = hw2.n.b + n4;
                ++n2;
            }
        }
        if (this.ad == this.u) {
            int n6 = 0;
            n2 = 0;
            while (n2 < this.y.length) {
                if (this.y[n2]) {
                    ++n6;
                }
                ++n2;
            }
            if (n6 == 3) {
                this.ad = this.v;
            }
        }
        int n7 = 0;
        while (n7 < this.z.size()) {
            dn dn2 = (dn)this.z.elementAt(n7);
            dn2.aw += dn2.b;
            if (dn2.b > 1 || dn2.b < -1) {
                dn2.b -= dn2.b / aw.f(dn2.b);
            }
            dn2.ax += dn2.e;
            ++dn2.e;
            ++dn2.f;
            if (dn2.f > 20) {
                this.z.removeElement(dn2);
            }
            ++n7;
        }
        if (this.p) {
            n7 = 0;
            while (n7 < this.w.size()) {
                if (!this.y[n7] && System.currentTimeMillis() / 100L - this.x > (long)((n7 + 1) * 5)) {
                    this.y[n7] = true;
                    jh jh3 = (jh)this.w.elementAt(n7);
                    this.b(jh3.d, jh3.e);
                }
                ++n7;
            }
        }
    }

    private void b(int n2, int n3) {
        int n4 = 0;
        while (n4 < 10) {
            int n5 = 1;
            if (n4 % 2 == 0) {
                n5 = -1;
            }
            dn dn2 = new dn(n2, n3);
            new dn(n2, n3).f = 0;
            dn2.b = n5 * (aw.e(80) / 10);
            dn2.e = -aw.e(70) / 10;
            this.z.addElement(dn2);
            ++n4;
        }
    }

    public final void l() {
        if (!this.p) {
            if (main.a.S.d() == 1) {
                if (main.a.e) {
                    main.a.d[5] = true;
                }
                if (main.a.f) {
                    main.a.c[5] = true;
                }
            }
            if (main.a.d[5] && !this.o && this.q) {
                if (this.k < 270) {
                    this.k += 3;
                }
            } else if (this.k > 90) {
                this.k -= 3;
            }
            if (main.a.c[5]) {
                if (this.k > 90) {
                    hw hw2 = this;
                    if (!hw2.o && hw2.q) {
                        hw2.m = hw2.k;
                        cx.a().a(hw2.s, hw2.m - 90);
                        main.a.i();
                    }
                }
                main.a.c[5] = false;
            }
        }
        super.l();
    }

    public final void a(int n2, int n3, Vector vector) {
        if (n2 != GameMidlet.i.w) {
            hn hn2 = ir.g(n2);
            if (hn2 != null) {
                hw.a(vector, hn2, n3 + 100 + 20);
                return;
            }
        } else {
            this.ad = this.u;
            this.w = vector;
            this.j = 100 + (this.m - 90);
            this.o = true;
            main.a.h();
        }
    }

    public final void a(Graphics graphics) {
        int n2;
        int n3;
        int n4;
        this.r.b(graphics);
        main.a.c(graphics);
        int n5 = this.h / 20;
        int n6 = 0;
        while (n6 < this.l) {
            int n7 = n5 + n6 * this.i;
            if (n7 > 360) {
                n7 -= 360;
            }
            if (n7 >= 82 && n7 <= 278) {
                n4 = aw.c(n7);
                n3 = this.g * aw.b(n4) >> 10;
                n2 = -(this.g * aw.a(n4)) >> 10;
                graphics.drawImage(this.c, this.n.a + n3, this.n.b + n2, 3);
            }
            ++n6;
        }
        if (this.p) {
            Graphics graphics2 = graphics;
            hw hw2 = this;
            n4 = 0;
            while (n4 < hw2.w.size()) {
                if (System.currentTimeMillis() / 100L - hw2.x > (long)((n4 + 1) * 5)) {
                    jh jh2 = (jh)hw2.w.elementAt(n4);
                    switch (jh2.b) {
                        case 1: {
                            ld ld2 = fx.a(jh2.a);
                            ld2.a(graphics2, jh2.d, jh2.e, 3);
                            main.a.L.a(graphics2, jh2.h, jh2.d - 17, jh2.e - 7, 1);
                            break;
                        }
                        case 2: {
                            main.a.L.a(graphics2, kf.C, jh2.d, jh2.e - gy.ag / 2, 2);
                            main.a.L.a(graphics2, String.valueOf(jh2.c), jh2.d - 17, jh2.e - 8, 1);
                            break;
                        }
                        case 3: {
                            main.a.L.a(graphics2, "xp", jh2.d, jh2.e - gy.ag / 2, 2);
                            main.a.L.a(graphics2, String.valueOf(jh2.f), jh2.d - 17, jh2.e - 8, 1);
                            break;
                        }
                        case 4: {
                            main.a.L.a(graphics2, kf.D, jh2.d, jh2.e - gy.ag / 2, 2);
                            main.a.L.a(graphics2, String.valueOf(jh2.g), jh2.d - 17, jh2.e - 8, 1);
                        }
                    }
                }
                ++n4;
            }
        }
        int n8 = 0;
        int n9 = 0;
        while (n9 < this.l) {
            n4 = n5 + n9 * this.i;
            if (n4 > 360) {
                n4 -= 360;
            }
            if (n4 >= 82 && n4 <= 278) {
                n3 = aw.c(n4);
                n2 = this.g * aw.b(n3) >> 10;
                n3 = -(this.g * aw.a(n3)) >> 10;
                long l2 = System.currentTimeMillis() / 100L - this.x;
                if (!this.p || n4 < 150 || n4 > 210 || l2 <= (long)((n8 + 1) * 5) && l2 > (long)((n8 + 1) * 5 - 5)) {
                    graphics.drawImage(this.e, this.n.a + n2, this.n.b + n3, 3);
                } else {
                    ++n8;
                }
                graphics.drawImage(this.b, this.n.a + n2, this.n.b + n3, 3);
            }
            ++n9;
        }
        graphics.drawRegion(this.d, 0, 0, 64, 62, 0, this.n.a, this.n.b, 40);
        graphics.drawRegion(this.d, 0, 0, 64, 62, 1, this.n.a, this.n.b, 24);
        Graphics graphics3 = graphics;
        hw hw3 = this;
        n4 = aw.c(hw3.k);
        n3 = (hw3.g / 3 + 2) * aw.b(n4) >> 10;
        n2 = -((hw3.g / 3 + 2) * aw.a(n4)) >> 10;
        n5 = hw3.k + 90;
        if (n5 > 360) {
            n5 -= 360;
        }
        n5 = aw.c(n5);
        n4 = 6 * aw.b(n5) >> 10;
        n5 = -(6 * aw.a(n5)) >> 10;
        int n10 = hw3.k - 90;
        if (n10 < 0) {
            n10 += 360;
        }
        n10 = aw.c(n10);
        int n11 = 6 * aw.b(n10) >> 10;
        n10 = -(6 * aw.a(n10)) >> 10;
        graphics3.setColor(0xDD0000);
        graphics3.fillTriangle(hw3.n.a + n3, hw3.n.b + n2, hw3.n.a + n4, hw3.n.b + n5, hw3.n.a + n11, hw3.n.b + n10);
        graphics3.fillRoundRect(hw3.n.a - 6, hw3.n.b - 6, 12, 12, 12, 12);
        if (this.p || this.j > 0) {
            this.c(graphics);
        }
        super.a(graphics);
    }

    private void c(Graphics graphics) {
        int n2 = 0;
        while (n2 < this.z.size()) {
            dn dn2 = (dn)this.z.elementAt(n2);
            this.f.a(dn2.f / 5, dn2.aw, dn2.ax, 0, 3, graphics);
            ++n2;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public class ai
extends gx {
    public int a;
    public int b;
    public int c;
    public int d = 0;
    public int e;
    public boolean f = false;
    public int g;
    public int h;
    public boolean i;
    public boolean[] j = new boolean[2];
    public byte k;
    public byte l;
    public byte m;
    public dr n;
    public int o = 0;
    public boolean p = false;
    public int q = 0;

    public ai() {
        this.az = (byte)2;
    }

    public void a() {
    }

    public ai(int n2, int n3, int n4, byte by2) {
        ad ad2 = gb.c(by2);
        this.x = ad2.l;
        this.az = (byte)2;
        this.a(n2, n3);
        this.K = 0;
        this.H = 0;
        this.w = n4;
        this.d = 0;
        this.z = (byte)4;
        this.F = this.z;
        this.G = 1;
        this.k = by2;
        this.y = aw.e(12);
    }

    public void a(Graphics graphics) {
        if (this.aw * js.ay + 30 < do.a().a || this.aw * js.ay - 30 > do.a().a + main.a.m || main.a.r == cd.b()) {
            return;
        }
        ad ad2 = gb.c(this.k);
        f f2 = fx.c(ad2.j[this.d]);
        if (f2.d == -1) {
            return;
        }
        if (this.aA == 0) {
            this.aA = (short)(f2.c / ad2.b);
        }
        if (this.az != 7) {
            this.m = ad2.k[this.H][this.y];
        }
        graphics.drawRegion(f2.a, 0, this.m * this.aA, (int)f2.b, (int)this.aA, (int)this.K, this.aw * js.ay, this.ax * js.ay + this.l - (ad2.c == 4 ? this.aA / 3 << 1 : 0), ad2.c != 4 ? 33 : 17);
        super.a(graphics);
        this.a(graphics, this.aA + 2, this.aw * js.ay, this.ax * js.ay, ir.p);
    }

    public final void a(Graphics graphics, int n2, int n3, boolean bl2) {
        ad ad2 = gb.c(this.k);
        f f2 = fx.c(ad2.j[this.d]);
        if (f2.d == -1) {
            return;
        }
        if (this.aA == 0) {
            this.aA = (short)(f2.c / ad2.b);
        }
        if (this.az != 7) {
            this.m = ad2.k[this.H][this.y];
        }
        graphics.drawRegion(f2.a, 0, this.m * this.aA, (int)f2.b, (int)this.aA, (int)this.K, n2, n3 + this.l, ad2.c != 4 ? 33 : 17);
        this.a(graphics, this.aA + 2, n2, n3, this);
    }

    private void a(Graphics graphics, int n2, int n3, int n4, js js2) {
        if (js2 == this) {
            int n5 = gb.c((int)this.k).d * 60 - this.g;
            int n6 = this.d * 5;
            if (this.g > gb.c((int)this.k).d * 60) {
                je.a(n3 - (n6 + 22) * js.ay / 2, n4 - (18 + this.l) * js.ay - n2, (n6 + 22) * js.ay, 4 * js.ay, 1, graphics);
                je.a(n3 - (n6 + 20) * js.ay / 2, n4 - (17 + this.l) * js.ay - n2, this.h * (n6 + 20) / 100 * js.ay, 2 * js.ay, 65280, graphics);
            } else {
                je.a(n3 - (n6 + 22) * js.ay / 2, n4 - (18 + this.l) * js.ay - n2, (n6 + 22) * js.ay, 4 * js.ay, 1, graphics);
                je.a(n3 - (n6 + 20) * js.ay / 2, n4 - (17 + this.l) * js.ay - n2, this.h * (n6 + 20) / 100 * js.ay, 2 * js.ay, 65280, graphics);
                main.a.Q.a(graphics, String.valueOf(n5 / 60) + ":" + (n5 - n5 / 60 * 60), n3, n4 - (13 + this.l) * js.ay - n2, 2);
            }
            if (this.az == 7) {
                n2 = 10;
            }
            if (this.j[0]) {
                go.u.a(0, n3 - 10 * js.ay, n4 - (22 + this.l) * js.ay - n2, 0, 3, graphics);
            }
            if (this.j[1]) {
                go.u.a(1, n3 + 10 * js.ay, n4 - (22 + this.l) * js.ay - n2, 0, 3, graphics);
            }
        }
    }

    public void b() {
        if (this.p) {
            if (main.a.j() - this.q > 10) {
                this.p = false;
            }
            return;
        }
        ++this.y;
        if (this.y >= 12) {
            this.y = 0;
        }
        this.d();
        if (this.H != 1) {
            if (this.y == 0) {
                this.H = (byte)aw.e(5 + (this.k - 50) * 5);
                if (this.H != 2) {
                    this.H = 0;
                } else {
                    this.K = (byte)aw.b(0, gx.J);
                }
            }
            if (this.e > 0) {
                --this.e;
                return;
            }
            this.c();
            this.K = this.n.a > this.aw ? (byte)0 : gx.J;
            this.f();
            this.H = 1;
        } else {
            this.e();
        }
        super.b();
    }

    public void c() {
    }

    public void d() {
    }

    public void e() {
        int n2;
        int n3 = this.G * (this.a * aw.b(aw.c(this.b)) >> 10);
        if (this.b(n3, n2 = -this.G * (this.a * aw.a(aw.c(this.b))) >> 10)) {
            if (this.c(n3, n2)) {
                this.aw += this.E;
                this.ax += this.F;
            }
            this.h();
            return;
        }
        this.aw = this.C + n3;
        this.ax = this.D + n2;
        n3 = aw.a(this.C, this.D, this.aw, this.ax);
        ++this.a;
        if (n3 > this.c) {
            this.h();
        }
    }

    public void f() {
        this.c = aw.a(this.aw, this.ax, this.n.a, this.n.b);
        this.b = aw.a(this.n.a - this.aw, -(this.n.b - this.ax));
    }

    public void g() {
        dr dr2 = new dr(aw.e(ir.e * 6) << 2, aw.e(ir.f * 6) << 2);
        ai ai2 = this;
        this.n = dr2;
    }

    public void h() {
        this.H = 0;
        this.C = this.aw;
        this.D = this.ax;
        this.E = 0;
        this.F = 0;
        this.a = 0;
    }
}


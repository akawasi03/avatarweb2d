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

public final class jy
extends hj {
    public static jy a;
    private by d = new by(kf.O, 0);
    private int e = 0;
    private int f;
    private int g;
    private int h;
    private int i;
    private int j;
    private int k;
    private static ht l;
    private static int m;
    private static int n;
    private static int o;
    private static int p;
    private static int q;
    public static boolean b;
    private static boolean r;
    private static Image s;
    public static int c;
    private int t = 0;
    private int u;
    private int v;
    private int w;
    private int x;
    private int y;
    private int z;
    private boolean A = false;
    private int B;
    private int C = 2;
    private int D = 0;
    private int E = -40;
    private int F = 1;

    static {
        b = true;
        c = 0;
    }

    public static void b() {
        l = null;
        s = null;
        la.c = null;
    }

    public static jy e() {
        if (a == null) {
            a = new jy();
        }
        return a;
    }

    public final void a() {
        this.ar = 2;
        main.a.t = null;
        main.a.h();
        if (l == null) {
            c.b(kf.aw);
            ht.a("up", 13 * gy.Y, 11 * gy.Y);
            c.a();
            try {
                int n2 = 70 * gy.Y;
                if (main.a.Z == 0) {
                    n2 = 40;
                }
                l = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/iconGame0.on")), n2, n2);
                s = Image.createImage((String)(String.valueOf(kf.a()) + "/on/select.on"));
                if (la.c == null) {
                    la.c = Image.createImage((String)(String.valueOf(kf.a()) + "/on/logo.on"));
                }
            }
            catch (IOException iOException) {
                IOException iOException2 = iOException;
                iOException.printStackTrace();
            }
        }
        super.a();
        jy jy2 = this;
        this.g = main.a.n / 2 - gy.ah;
        jy2.j = 4;
        jy2.k = 70 * gy.Y;
        if (main.a.Z == 0) {
            jy2.k = 40;
        }
        jy2.h = main.a.m / jy2.j;
        if (jy2.h > 100 * gy.Y) {
            jy2.h = 100 * gy.Y;
        }
        jy2.i = jy.l.b + gy.ah + 5 * gy.Y;
        jy2.f = (main.a.m - jy2.j * jy2.h) / 2 + jy2.h / 2;
        q = jy2.j * jy2.h - main.a.m;
        if (q < 0) {
            q = 0;
        }
        jy.g();
        if (main.a.J == 0) {
            main.a.J = 1;
        }
        r = true;
        b = true;
    }

    private static void g() {
        main.a.T = hj.av;
        if (main.a.Z == 0) {
            main.a.T = gy.ag + 5;
        }
        main.a.n = main.a.a.getHeight() - main.a.T;
        int n2 = 0;
        while (n2 < 3) {
            main.a.ae[n2].b = main.a.q - main.a.T;
            ++n2;
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                switch (this.e) {
                    case 0: 
                    case 1: 
                    case 2: 
                    case 3: {
                        n2 = this.e;
                        main.a.i();
                        cx.a().d(3);
                        ae.i = (byte)n2;
                        return;
                    }
                    case 4: {
                        hy.a().b();
                    }
                }
                return;
            }
            case 1: {
                c = 1;
                Object object = main.a.y;
                main.a.y.m = false;
                object = cx.a();
                ((kj)object).e((byte)-96);
                ((kj)object).k();
                main.a.i();
                return;
            }
            case 2: {
                cx.a().h(1);
                main.a.i();
                return;
            }
            case 3: {
                this.h();
            }
        }
    }

    public jy() {
        this.ae = new by(kf.x, 1);
        this.ac = new by("Top", 2);
        if (main.a.Z == 0) {
            this.ad = new by(kf.O, 3);
        }
    }

    public final void d() {
        this.a(1, -1);
    }

    private void h() {
        r = true;
        this.d.b();
    }

    public final void k() {
        if (this.w > 0) {
            --this.w;
            if (this.w == 0 && main.a.r != dp.a) {
                this.h();
            }
        }
        if (this.u != 0) {
            if (n < 0 || n > q) {
                if (this.u > 500) {
                    this.u = 500;
                } else if (this.u < -500) {
                    this.u = -500;
                }
                this.u -= this.u / 5;
                if (aw.f(this.u / 10) <= 10) {
                    this.u = 0;
                }
            }
            m = n += this.u / 15;
            this.u -= this.u / 20;
        } else if (n < 0) {
            m = 0;
        } else if (n > q) {
            m = q;
        }
        if (n != m) {
            p = m - n << 2;
            n += (o += p) >> 4;
            o &= 0xF;
        }
        if (this.D >= 0) {
            this.E += this.F * this.D;
            this.D += this.F * this.C;
            if (this.D <= 0) {
                this.F = -this.F;
            }
            if (this.E > 0) {
                this.F = -this.F;
                this.D -= 2 * this.C;
            }
        }
    }

    public final void l() {
        int n2;
        ++this.x;
        if (main.a.a(4)) {
            if (this.e % this.j > 0) {
                --this.e;
            }
        } else if (main.a.a(6)) {
            if (this.e < jy.l.c - 1 && this.e % this.j < this.j - 1) {
                ++this.e;
            }
        } else if (main.a.a(2)) {
            if (this.e / this.j > 0) {
                this.e -= this.j;
            }
        } else if (main.a.a(8) && this.e / this.j < jy.l.c / this.j && this.e + this.j < jy.l.c) {
            this.e += this.j;
        }
        if (main.a.g) {
            n2 = 0;
            while (n2 < kf.eA.length) {
                if (main.a.b(this.f + n2 % this.j * this.h - this.k / 2, this.g + n2 / this.j * this.i - this.k / 2, this.k, this.k + gy.ah + 10)) {
                    this.B = main.a.j;
                    this.y = this.x;
                    this.t = n;
                    this.u = 0;
                    main.a.g = false;
                    this.A = true;
                    break;
                }
                ++n2;
            }
        }
        if (this.A) {
            int n3;
            n2 = this.x - this.y;
            int n4 = this.B - main.a.h;
            this.B = main.a.h;
            if (main.a.e) {
                if (this.x % 2 == 0) {
                    this.v = main.a.h;
                    this.z = this.x;
                }
                this.u = 0;
                if (m <= 0 || m >= q) {
                    m = this.t + main.a.k() / 2;
                } else {
                    this.t = m = this.t + n4;
                }
                n = m;
                if (n2 < 20) {
                    n4 = (m + main.a.h - (this.f - this.h / 2)) / this.h;
                    n3 = (main.a.i - (this.g - this.h / 2)) / this.i;
                    this.e = n3 * this.j + n4;
                    if (this.e < 0) {
                        this.e = 0;
                    }
                    if (this.e >= kf.eA.length) {
                        this.e = kf.eA.length - 1;
                    }
                }
                if (aw.f(main.a.l()) >= 10 * gy.Y || aw.f(main.a.k()) >= 10 * gy.Y) {
                    r = true;
                } else if (n2 > 3 && n2 < 8) {
                    r = false;
                }
            }
            if (main.a.f) {
                n4 = this.v - main.a.h;
                n3 = this.x - this.z;
                if (aw.f(n4) > 40 && n3 < 20 && m > 0 && m < q) {
                    this.u = n4 / n3 * 10;
                }
                this.z = -1;
                if (aw.f(main.a.l()) < 10 * gy.Y && aw.f(main.a.k()) < 10 * gy.Y) {
                    if (n2 <= 4) {
                        this.w = 5;
                        r = false;
                    } else if (!r) {
                        this.h();
                    }
                }
                this.A = false;
                main.a.f = false;
            }
        }
        if (main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public final void b(Graphics graphics) {
        main.a.S.b(graphics);
        if (main.a.W != 2) {
            main.a.S.a(graphics, main.a.o, (this.g - jy.l.b / 2) / 2);
        }
        graphics.translate(this.f, this.g);
        graphics.translate(-n, 0);
        int n2 = 0;
        while (n2 < kf.eA.length) {
            l.a(n2, n2 % this.j * this.h, n2 / this.j * this.i, 0, 3, graphics);
            main.a.M.a(graphics, kf.eA[n2], n2 % this.j * this.h, n2 / this.j * this.i + jy.l.b / 2 + 5, 2);
            if (!(this.e != n2 || main.a.H && r)) {
                graphics.drawImage(s, n2 % this.j * this.h, n2 / this.j * this.i, 3);
            }
            ++n2;
        }
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        this.b(graphics);
        jy.a(graphics, this.ac, this.ad, this.ae);
        main.a.c(graphics);
        main.a.b(graphics);
    }

    public static void a(Graphics graphics, by by2, by by3, by by4) {
        main.a.c(graphics);
        main.a.S.c(graphics);
        if (main.a.t == null && (main.a.v == null || main.a.v == hy.a)) {
            main.a.S.b(graphics, by2, by3, by4);
        }
    }

    public static void f() {
        if (b && dm.d) {
            dm.d = false;
            dm.b().b[4] = 0;
            main.a.a.b();
            jy.g();
        }
    }
}


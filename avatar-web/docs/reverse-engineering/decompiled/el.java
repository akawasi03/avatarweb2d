/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public final class el
extends hj {
    public static el a;
    public static ht b;
    private Vector d;
    public static String c;
    private int e;
    private int f;
    private by g;
    private by h;
    private int i = 0;

    public static el b() {
        if (a == null) {
            a = new el();
        }
        return a;
    }

    public final void a() {
        main.a.S.h();
        super.a();
        this.ae = this.h;
        this.ad = main.a.Z == 0 ? new by(kf.O, 3) : new by(kf.i, 1);
        this.aj = true;
        this.e();
        jy.b();
        this.e = this.i;
        main.a.y.a(this.e);
    }

    public el() {
        this.e();
        this.c();
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                main.a.i();
                ie.a().c();
                return;
            }
            case 2: {
                main.a.i();
                ie.a().b();
                return;
            }
            case 3: {
                main.a.i();
                cx.a().a(GameMidlet.i.w);
            }
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.i, 1));
                vector.addElement(new by(kf.f, 2));
                if (main.a.Z == 0) {
                    vector.addElement(ae.b().f);
                }
                vector.addElement(new by(kf.am, 3));
                le.a().a(vector, 0);
                return;
            }
            case 1: {
                this.f();
                return;
            }
            case 2: {
                cx.a().d(9);
                main.a.i();
                return;
            }
            case 3: {
                this.f();
            }
        }
    }

    public final void c() {
        this.g = new by(kf.c, 0);
        new by(kf.O, 1);
        this.h = new by(kf.d, 2);
        this.ac = this.g;
        this.ae = this.h;
    }

    public static void a(int n2, kx kx2) {
        c = !jy.b ? kf.ek[n2] : kf.eA[n2];
        kn.d = kx2;
    }

    public final void e() {
        if (main.a.Z == 0) {
            this.f = 50;
            this.i = 1;
        } else {
            if (main.a.Z == 1) {
                this.f = 80;
            } else if (main.a.Z == 2) {
                this.f = 150;
            }
            this.i = main.a.m / this.f;
        }
        if (this.d == null) {
            return;
        }
        if (this.f != 0) {
            if (main.a.Z == 0) {
                main.a.y.a(0, main.a.m < 200 ? this.f / 2 : 50, main.a.m, this.f, main.a.m, this.d.size() * this.f, main.a.m, main.a.n - (main.a.m < 200 ? this.f / 2 : 50) - 4, this.d.size());
            } else {
                main.a.y.a((main.a.m - this.f * this.i) / 2, 50 * gy.Y, this.f, this.f, main.a.m, (this.d.size() / this.i + 2) * this.f, main.a.m, main.a.n - 50 * gy.Y - 4, this.d.size());
            }
            main.a.y.a(this.e);
        }
    }

    private void f() {
        byte by2 = ((be)this.d.elementAt((int)this.e)).a;
        if (by2 == -1) {
            return;
        }
        ie.a().a(by2);
        main.a.i();
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        jy.a(graphics, this.ac, this.ad, this.ae);
        main.a.b(graphics);
    }

    public final void b(Graphics graphics) {
        main.a.S.b(graphics);
        el.a(graphics, "Ph\u00f2ng " + c);
        main.a.S.a(graphics, this.d, this.f, this.e);
    }

    public static void a(Graphics graphics, String string) {
        main.a.S.b(graphics);
        if (main.a.m > 200) {
            main.a.S.e(graphics, main.a.o - 100 * gy.Y, 5 * gy.Y - ho.i, 200 * gy.Y, 44 * gy.Y);
            cs cs2 = main.a.O;
            if (main.a.Z == 0) {
                cs2 = main.a.L;
            }
            cs2.a(graphics, string, main.a.o, 5 * gy.Y - ho.i + 22 * gy.Y - cs2.a() / 2, 2);
        }
    }

    public final void a(Vector vector) {
        int n2 = 0;
        while (n2 < vector.size()) {
            be be2 = (be)vector.elementAt(n2);
            int n3 = n2;
            while (n3 < vector.size()) {
                be be3 = (be)vector.elementAt(n3);
                if (be3.c < be2.c) {
                    vector.setElementAt(be2, n3);
                    vector.setElementAt(be3, n2);
                    be2 = be3;
                }
                ++n3;
            }
            ++n2;
        }
        this.d = new Vector();
        n2 = -1;
        int n4 = 0;
        while (n4 < vector.size()) {
            be be4 = (be)vector.elementAt(n4);
            if (n2 == -1 || be4.c != n2) {
                this.d.addElement(new be(-1, 0, 0, be4.c));
            }
            this.d.addElement(be4);
            n2 = be4.c;
            ++n4;
        }
        if (main.a.Z != 0) {
            this.g();
        }
        this.e = 1;
        this.e();
    }

    private boolean g() {
        int n2 = 0;
        while (n2 < this.d.size()) {
            be be2 = (be)this.d.elementAt(n2);
            if (be2.a == -1) {
                int n3;
                int n4 = this.i - n2 % this.i;
                if (n4 != this.i) {
                    n3 = 0;
                    while (n3 < n4) {
                        this.d.insertElementAt(new be(-2, 0, 0, be2.c), n2);
                        ++n3;
                    }
                    n2 += n4;
                }
                n3 = 0;
                while (n3 < this.i - 1) {
                    this.d.insertElementAt(new be(-2, 0, 0, be2.c), n2 + 1);
                    ++n3;
                }
                n2 += this.i;
            }
            ++n2;
        }
        return false;
    }

    public final void a(int n2, boolean bl2) {
        if (bl2 && this.e == n2) {
            this.f();
        }
        if (main.a.Z == 0) {
            if (this.e > 0 && this.e < this.d.size()) {
                be be2 = (be)this.d.elementAt(n2);
                if (be2.a == -1 || be2.a == -1) {
                    this.e = n2 > this.e ? n2 + this.i : n2 - this.i;
                } else if (n2 >= 0 && n2 < this.d.size()) {
                    this.e = n2;
                }
                main.a.y.a(this.e);
                if (this.e <= 0) {
                    this.e = this.d.size() - 1;
                    main.a.y.a(this.e);
                    return;
                }
            }
        } else {
            this.e = n2;
        }
    }

    public final void l() {
        if (main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public final void k() {
    }
}


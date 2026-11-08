/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class bb
extends gy {
    private int h;
    private int i;
    private int j;
    private int k;
    private String[][] l;
    public byte a = 0;
    public static hj b;
    public static int c;
    private String[][] m;
    private static int n;
    private String[][] o;
    public static boolean d;
    private static int p;
    private String[][] q;
    public static int e;
    private static short[] r;
    private static short[] s;
    private String[][] t;
    private String[][] u;
    private static int v;
    public static int f;
    private static int w;
    private String[][] x;
    private String[][] y;
    private static byte[] z;
    private static int A;
    private String[][] B;
    public static boolean g;
    private static byte[] C;

    static {
        c = 0;
        n = 0;
        d = false;
        p = 0;
        e = 0;
        v = 0;
        f = 0;
        w = 0;
        A = 0;
        g = false;
        C = new byte[]{3, 7, 4, 1, 5};
    }

    public bb() {
        g = false;
        d = true;
        this.h = 10;
        this.k = 0;
        this.ad = new by("", new dk(this));
        this.ac = new by(kf.dA, new dj(this));
    }

    public final void k() {
    }

    public final void l() {
        if (d) {
            super.l();
        }
        if (d && b == main.a.r && main.a.t == null && main.a.v == null) {
            if (this.l != null) {
                main.a.d[8] = false;
                main.a.d[6] = false;
                main.a.d[4] = false;
                main.a.d[2] = false;
            }
            if (this.l != null && this.k < this.l.length - 1 && main.a.r != dp.b()) {
                main.a.f = false;
                main.a.e = false;
                main.a.g = false;
            }
        }
    }

    private void i() {
        this.j = this.l[this.k].length * gy.af + (gy.Z << 1);
        if (this.j < (gy.af << 1) + (gy.Z << 1)) {
            this.j = (gy.af << 1) + (gy.Z << 1);
        }
        this.i = 5;
    }

    public final void a(Graphics graphics) {
        if (b == main.a.r && main.a.t == null && main.a.v == null) {
            main.a.c(graphics);
            graphics.translate(0, (int)main.a.ab);
            if (d || main.a.l % 20 > 2) {
                fh.a(graphics, this.h, this.i, main.a.m - (this.h << 1), this.j, 0xFFFFFF, 1, (byte)0);
                if (this.l != null && this.l[this.k] != null) {
                    int n2 = 0;
                    if (this.l[this.k].length == 1) {
                        n2 = 2;
                    }
                    int n3 = 0;
                    while (n3 < this.l[this.k].length) {
                        main.a.N.a(graphics, this.l[this.k][n3], this.h + (main.a.m - (this.h << 1)) / 2, this.i + this.j / 2 - this.l[this.k].length * gy.af / 2 + n3 * gy.af - n2, 2);
                        ++n3;
                    }
                    this.a = (byte)(this.a + 1);
                    if (this.a >= 8) {
                        this.a = 0;
                    }
                    if (main.a.r == ea.a) {
                        graphics.translate(-ea.f + ea.b().c, -ea.g + ea.b().d);
                    } else {
                        graphics.translate(-do.a().a, -do.a().b);
                    }
                }
            }
            if (d) {
                super.a(graphics);
                if (main.a.l % 10 > 5 || main.a.Z > 0) {
                    cs cs2 = main.a.L;
                    if (main.a.Z > 0) {
                        cs2 = main.a.M;
                    }
                    cs2.a(graphics, kf.w, main.a.ae[1].a + hj.au / 2, main.a.ae[1].b + main.a.T / 2 - gy.ag / 2, 2);
                }
            }
        }
    }

    public final void a() {
        if (p == C.length + 1) {
            main.a.D = null;
            main.a.I = false;
            return;
        }
        if (this.q == null) {
            this.q = kf.b();
        }
        b = ea.a;
        d = true;
        if (p < C.length) {
            ea.b().e = C[p];
        }
        main.a.D.a(this.q[p]);
        ++p;
    }

    private void a(String[] stringArray) {
        this.l = new String[stringArray.length][];
        int n2 = 0;
        while (n2 < this.l.length) {
            this.l[n2] = main.a.N.a(stringArray[n2], main.a.m - (this.h << 1) - 35 * gy.Y);
            ++n2;
        }
        this.i();
        d = true;
    }

    public final void b() {
        if (this.t == null) {
            this.t = kf.c();
        }
        b = ae.a;
        short[] sArray = new short[3];
        r = sArray;
        sArray[0] = 180;
        bb.r[1] = 312;
        bb.r[2] = 720;
        z = new byte[]{108, 100, 107};
        if (e != 0) {
            if (e == r.length) {
                this.b(288, 150);
                return;
            }
            do.a().a(r[e] * gy.Y, 20 * gy.Y);
            do.g = true;
        }
        if (e != 0) {
            cc cc2 = new cc(-9, r[e], 50, 20);
            ir.l.addElement(cc2);
            ir.a(ir.l);
        }
        main.a.D.a(this.t[e]);
        ++e;
    }

    public final void d() {
        if (this.u == null) {
            this.u = kf.d();
        }
        b = ae.a;
        short[] sArray = new short[3];
        r = sArray;
        sArray[0] = 865;
        bb.r[1] = 445;
        bb.r[2] = 95;
        z = new byte[]{57, 104, 58, 100, 107};
        if (v != 0) {
            if (v == r.length) {
                this.b(640, 150);
                return;
            }
            do.a().a(r[v] * gy.Y, 20 * gy.Y);
            do.g = true;
            cc cc2 = new cc(-9, r[v], 50, 20);
            ir.l.addElement(cc2);
            ir.a(ir.l);
        }
        main.a.D.a(this.u[v]);
        ++v;
    }

    public static boolean b(int n2) {
        if (g) {
            return true;
        }
        switch (ir.a) {
            case 23: {
                if (v - 1 >= z.length || n2 != z[v - 1]) break;
                return true;
            }
            case 9: {
                if (e - 1 >= z.length || n2 != z[e - 1]) break;
                return true;
            }
            case 25: {
                if (f > z.length || n2 != z[f - 1]) break;
                return true;
            }
            case 57: {
                if (n > z.length || n2 != z[n - 1]) break;
                return true;
            }
        }
        return false;
    }

    public final void a(hj object) {
        if (this.x == null) {
            this.x = kf.f();
        }
        b = object;
        if (f == 0) {
            r = new short[]{372, -1, -1, 220};
            s = new short[]{25, -1, -1, 25};
            z = new byte[]{52, -1, -1, 24};
        } else if (f == this.x.length) {
            this.b(170, 150);
            return;
        }
        if (f == 1) {
            bb.m();
        }
        object = new cc(-9, r[f], s[f], 20);
        ir.l.addElement(object);
        ir.a(ir.l);
        do.a().a(r[f] * gy.Y, 20 * gy.Y);
        do.g = true;
        main.a.D.a(this.x[f]);
        ++f;
    }

    public final void e() {
        if (this.y == null) {
            this.y = kf.e();
        }
        main.a.D.a(this.y[w]);
        ++w;
    }

    private void j() {
        int n2;
        if (this.B == null) {
            this.B = kf.g();
        }
        b = go.a;
        if (A == 0) {
            r = new short[]{(short)(go.b().v[0].a * ir.i + 12), (short)(go.C.a + 12), (short)go.W, (short)go.J.aw, (short)(go.D.a + 12)};
            s = new short[]{36, 36, (short)(go.X + 15), 36, 36};
        }
        if ((n2 = A) < 3) {
            n2 = 0;
        } else if (n2 == 3) {
            n2 = 1;
        } else if (n2 == 4) {
            n2 = 2;
        } else if (n2 == 5) {
            n2 = 3;
        } else if (n2 == 6) {
            n2 = 4;
        }
        if (A < 3 || A == 4 || A == 5) {
            cc cc2 = new cc(-9, r[n2], s[n2], 20);
            ir.l.addElement(cc2);
            ir.a(ir.l);
        }
        do.a().a(r[n2] * gy.Y, 36 * gy.Y);
        do.g = true;
        main.a.D.a(this.B[A]);
        ++A;
        go.b().ac = null;
    }

    public final void b(hj object) {
        if (this.o == null) {
            this.o = kf.h();
        }
        b = object;
        if (n == 0) {
            r = new short[]{192};
            z = new byte[]{56};
            object = new cc(-9, r[n] + 12, 135, 20);
            ir.l.addElement(object);
            ir.a(ir.l);
            do.a().a(r[n] + 12, 130 * gy.Y);
        } else {
            if (n == this.o.length) {
                this.b(180, 240);
                return;
            }
            do.g = true;
        }
        main.a.D.a(this.o[n]);
        ++n;
    }

    public final void f() {
        if (this.m == null) {
            this.m = kf.i();
        }
        b = ae.a;
        if (c == 0) {
            z = new byte[]{56};
        } else {
            if (c == this.m.length) {
                this.b(170, 170);
                return;
            }
            if (c < 4) {
                r = new short[]{12, 480, 230};
                s = new short[]{110, 110, 12};
                do.a().a(r[c - 1] * gy.Y, s[c - 1] * gy.Y);
                do.g = true;
                cc cc2 = new cc(-9, r[c - 1], s[c - 1], 20);
                ir.l.addElement(cc2);
                ir.a(ir.l);
            } else {
                do.g = false;
            }
        }
        main.a.D.a(this.m[c]);
        ++c;
    }

    private static void m() {
        int n2 = 0;
        while (n2 < ir.l.size()) {
            js js2 = (js)ir.l.elementAt(n2);
            if (js2.az == 1 && ((cc)js2).f == -9) {
                ir.l.removeElement(js2);
                --n2;
            }
            ++n2;
        }
    }

    private void b(int n2, int n3) {
        this.k = 0;
        g = true;
        bb.m();
        cc cc2 = new cc(-9, n2, n3, 20);
        ir.l.addElement(cc2);
        ir.a(ir.l);
        do.a().a(n2 * gy.Y, n3 * gy.Y);
        do.g = true;
        String[] stringArray = kf.j();
        main.a.D.a(stringArray);
    }

    public static void g() {
        int n2 = A;
        if (n2 < 3) {
            n2 = 0;
        } else if (n2 == 3) {
            n2 = 1;
        } else if (n2 == 4) {
            n2 = 2;
        }
        if (n2 < r.length) {
            main.a.D = new bb();
            main.a.D.j();
        }
    }

    public static void h() {
        main.a.I = true;
        A = 0;
        f = 0;
        c = 0;
        e = 0;
        p = 0;
        n = 0;
        g = false;
        d = false;
    }

    static void a(bb object) {
        if (((bb)object).k < ((bb)object).l.length - 1) {
            ++((bb)object).k;
            d = true;
            ((bb)object).i();
            if (ir.a == 23) {
                if (v == 1 && ((bb)object).k == ((bb)object).l.length - 1) {
                    do.a().a(r[0], 20);
                    do.g = true;
                    object = new cc(-9, r[v - 1], 50, 20);
                    ir.l.addElement(object);
                    ir.a(ir.l);
                    return;
                }
            } else if (ir.a == 9 && e == 1 && ((bb)object).k == ((bb)object).l.length - 1) {
                ((bb)object).b();
                return;
            }
        } else if (((bb)object).k == ((bb)object).l.length - 1) {
            do.g = false;
            if (100 == ir.a) {
                main.a.D = null;
                return;
            }
            if (main.a.r == ea.a && ((bb)object).q != null && p == ((bb)object).q.length) {
                ((bb)object).a();
                return;
            }
            if (ir.a == 24) {
                if (A == 3 || A == 4 || A == 5 || A == 6) {
                    bb.m();
                    main.a.D = new bb();
                    main.a.D.j();
                    d = true;
                    return;
                }
                if (A == 7 && d && !g) {
                    ((bb)object).b(470, 168);
                    return;
                }
            } else if (ir.a == 25) {
                if (f == ((bb)object).x.length - 1) {
                    main.a.D = null;
                }
            } else if (ir.a == 13) {
                ((bb)object).k = 0;
                if (!g) {
                    ((bb)object).f();
                    return;
                }
            }
            ((bb)object).i = 5;
            d = false;
        }
    }
}


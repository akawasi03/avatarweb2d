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

public final class dp
extends hj {
    public static dp a;
    private static String[] p;
    private static int q;
    public static int b;
    public static int c;
    public static int d;
    public static int e;
    private static int r;
    private static int s;
    public static int f;
    private static int t;
    private static int u;
    public static int g;
    private int v;
    public Vector[] h;
    private Vector w;
    private by[] x;
    private boolean[] y;
    private String[] z;
    public static String i;
    public static int j;
    public static boolean k;
    private static int A;
    public static int l;
    private static Vector B;
    private static hj C;
    private int D;
    private int E = 0;
    public boolean m = false;
    public static boolean n;
    public static boolean o;
    private static boolean F;
    private static int G;
    private static int H;
    private static String I;
    private int J;
    private int K;
    private boolean L = false;
    private int M = 0;
    private int N = 80 * gy.Y;

    static {
        r = 5;
        f = 5;
        j = 0;
        k = false;
        A = 0;
        l = 0;
        B = new Vector();
        n = false;
        o = false;
        F = false;
        G = 0;
        I = "";
    }

    public static dp b() {
        if (a == null) {
            a = new dp();
        }
        return a;
    }

    public final void a() {
        C = main.a.r;
        this.D = main.a.n + 50;
        this.E = main.a.j();
        n = true;
        G = 86;
        if (main.a.Z != 0) {
            G = 86 + 40 * main.a.Z;
        }
        o = false;
        super.a();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.d();
                return;
            }
            case 1: {
                dp dp2 = this;
                if (j < dp2.h[g].size()) {
                    ((by)dp2.h[dp.g].elementAt((int)dp.j)).b.a();
                    dp2.m();
                }
                return;
            }
            case 7: {
                go.b().f(n3, 0);
                return;
            }
            case 8: {
                if (n3 >= gb.d.size()) break;
                ad ad2 = (ad)gb.d.elementAt(n3);
                go.b().a(ad2);
                return;
            }
            case 9: {
                if (n3 >= gb.e.size()) break;
                az az2 = (az)gb.e.elementAt(n3);
                go.b().f(az2.a, 4);
                return;
            }
            case 10: {
                if (n3 >= go.f.size()) break;
                dc dc2 = (dc)go.f.elementAt(n3);
                go.b().a((int)dc2.a, dc2.f);
                return;
            }
            case 11: {
                if (n3 >= go.e.size()) break;
                Object object = (dc)go.e.elementAt(n3);
                object = go.b(((dc)object).a);
                go.b().a((int)((az)object).a, ((az)object).f);
                return;
            }
            case 12: 
            case 13: {
                return;
            }
            case 15: {
                byte[] byArray = new byte[2];
                byArray[1] = 102;
                byte[] byArray2 = byArray;
                if (n3 != 0 || ir.k == -1) {
                    ae.b();
                    ae.f(byArray2[n3]);
                }
                dp.b().d();
            }
        }
    }

    public final void d(int n2, int n3) {
        C.d(n2, n3);
    }

    public final void d() {
        if (k) {
            k = false;
            return;
        }
        ho ho2 = main.a.y;
        main.a.y.m = false;
        this.m = false;
        C.a();
        if (main.a.I) {
            if (ir.a == 25 && bb.f != 0) {
                main.a.D = new bb();
                if (bb.f == 2) {
                    bb.f = 3;
                }
                main.a.D.a(ae.a);
                GameMidlet.i.K = gx.J;
                return;
            }
            if (ir.a == 57) {
                main.a.D = new bb();
                main.a.D.b(ae.a);
            }
        }
    }

    public final void c() {
        this.ae = new by(kf.d, 0);
        this.ad = new by(kf.O, 1);
    }

    public dp() {
        t = gy.af;
        e = 30 * gy.Y;
        if (main.a.m < 150) {
            e = 24;
        }
        if (main.a.Z == 1) {
            e = 35;
        }
        dp.e();
        this.c();
        H = 25 * (2 - gy.Y) + 40 * (main.a.Z + 1) + 10 * (gy.Y - 1);
    }

    public static void e() {
        c = e * 5 + 11 + gy.Z + 2;
        d = e * 6 + 10 + gy.Z;
        q = main.a.o - e * 5 / 2;
        b = (main.a.n - hj.at) / 2 - d / 2;
    }

    public static int f() {
        return A;
    }

    public static void g() {
        k = true;
        dp.o();
    }

    public static boolean h() {
        return k;
    }

    public static void a(String string) {
        if (string != null) {
            B.addElement(new bc(string, main.a.K.a(string)));
        }
    }

    public final void a(String[] stringArray, Vector[] vectorArray, Vector vector) {
        g = 0;
        this.h = vectorArray;
        this.x = new by[vectorArray.length];
        this.y = new boolean[vectorArray.length];
        this.z = new String[vectorArray.length];
        this.w = vector;
        p = stringArray;
        System.out.println("addElement: " + this.h.length);
        this.v = this.h.length;
        k = false;
        je.a().a(p[g], c, d, this.v);
        this.i();
    }

    public final void i() {
        j = 0;
        u = 0;
        if (o || this.y[g]) {
            u = gy.af;
        }
        if (this.h[g] != null) {
            s = this.h[g].size() / 5;
            f = s < 3 || this.m || o || this.y[g] ? 2 : 5;
            if (this.h[g].size() % 5 != 0) {
                ++s;
            }
            if (s < f) {
                s = f;
            }
        }
        int n2 = 1;
        if (this.h[g] == null) {
            r = 1;
        } else {
            n2 = this.h[g].size();
            r = 5;
        }
        l = -e / 2;
        if (f > 2 || o || this.y[g]) {
            l = 0;
        }
        main.a.y.a(q, je.a().h + je.o + gy.Z + (o || this.y[g] ? u : 0), e, e, e * r, e * s, e * 5, f * e - l, n2);
        this.m();
        je.a().a(p[g], g);
    }

    public final void k() {
        C.k();
        if (this.D != 0) {
            this.D += -this.D >> 1;
        }
        if (this.D == -1) {
            this.D = 0;
        }
        if (this.h[g] != null) {
            int n2 = this.h[g].size();
            int n3 = 0;
            while (n3 < n2) {
                if (n) {
                    ((by)this.h[g].elementAt(n3)).a();
                }
                ++n3;
            }
        }
        if (this.x[g] != null) {
            this.ac = this.x[g];
            return;
        }
        this.ac = null;
    }

    public static void j() {
        GameMidlet.m = "frp1qr";
        aw.b = "frp2qr";
        je.k = main.a.a(GameMidlet.m, -2);
    }

    public final void a(by by2, int n2) {
        this.x[n2] = by2;
    }

    public final void l() {
        if (k) {
            dp dp2 = this;
            if (main.a.a(4)) {
                dp2.c(-1);
                dp2.J = 5;
            } else if (main.a.a(6)) {
                dp2.c(1);
                dp2.K = 5;
            }
            if (main.a.a(0, 0, main.a.m, main.a.n - main.a.T)) {
                main.a.g = false;
            }
            if (main.a.f) {
                int n2 = j % r * e;
                int n3 = (j / r + 1) * e;
                if (n2 + e / 2 - G / 2 + q + 5 < 0) {
                    n2 = -e / 2 + G / 2 - q - 5;
                } else if (n2 + e / 2 - G / 2 + G > main.a.m) {
                    n2 = main.a.m - G - e / 2 + G / 2;
                }
                n2 += q;
                n3 += b + je.o + gy.Z;
                int n4 = (H - (gy.Z << 1)) / 4;
                n3 += gy.Z + 8;
                n2 = n2 + e / 2 - 35 * (main.a.Z + 1) / 2 - 2 - 10 - 10 * gy.Y;
                n3 = n3 + n4 / 2 + n4 + gy.ah / 2;
                if (main.a.a(n2, n3 - 15 * gy.Y - 5, 20 + 20 * gy.Y, 30 * gy.Y)) {
                    dp2.c(-1);
                    dp2.J = 5;
                } else if (main.a.a(n2 + 35 * (main.a.Z + 1), n3 - 15 * gy.Y - 5, 20 + 20 * gy.Y, 30 * gy.Y)) {
                    dp2.c(1);
                    dp2.K = 5;
                } else if (main.a.a(n2 + 20 + 20 * gy.Y, n3 - 15 * gy.Y - 5, n2 + 35 * (main.a.Z + 1) - (n2 + 20 + 20 * gy.Y), 30 * gy.Y)) {
                    dp2.ad.b();
                }
            }
            if (dp2.J > 0) {
                --dp2.J;
            }
            if (dp2.K > 0) {
                --dp2.K;
            }
        } else {
            int n5;
            dp dp3 = this;
            if (main.a.a(6)) {
                if (j % r != r - 1 && r != 1 && !F) {
                    ++j;
                } else {
                    dp3.b(1);
                }
                main.a.y.a(j);
                dp3.m();
            } else if (main.a.a(4)) {
                if (j % r != 0 && r != 1 && !F) {
                    --j;
                } else {
                    dp3.b(-1);
                }
                main.a.y.a(j);
                dp3.m();
            } else if (main.a.a(2)) {
                if (dp3.h[g] != null && dp3.h[g].size() > 0 && !F) {
                    if (j / r > 0) {
                        j -= r;
                    } else {
                        n5 = 0;
                        while (n5 < dp3.h.length) {
                            if (n5 != g) {
                                je.a().a(4, n5);
                            }
                            ++n5;
                        }
                        F = true;
                    }
                }
                main.a.y.a(j);
                dp3.m();
            } else if (main.a.a(8)) {
                if (F) {
                    F = false;
                    n5 = 0;
                    while (n5 < dp3.h.length) {
                        if (n5 != g) {
                            je.a().a(0, n5);
                        }
                        ++n5;
                    }
                } else if (r > 1 && j / r + 1 < s) {
                    j += r;
                }
                main.a.y.a(j);
                dp3.m();
            }
            if (main.a.g && (n5 = je.a().d()) != 0) {
                dp3.b(n5);
                main.a.g = false;
            }
        }
        super.l();
    }

    private void c(int n2) {
        if ((A += n2) < 0) {
            A = 99;
        }
        if (A > 99) {
            A = 0;
        }
        this.m();
        dp.o();
    }

    public final void a(int n2, boolean bl2) {
        if (k) {
            return;
        }
        if (j == n2 && this.ad != null && !bl2) {
            this.ad.b();
        }
        j = n2;
        this.m();
    }

    private static void o() {
        if (g == 1) {
            az az2 = (az)gb.e.elementAt(j);
            I = main.a.a(az2.g * A, az2.h * A, true);
        } else {
            I = main.a.a(gb.b[dp.j].g[0] * A, gb.b[dp.j].g[1] * A, true);
        }
        G = main.a.K.a(I) + 16 + 30 * main.a.Z;
        if (G < 86 * gy.Y) {
            G = 86 * gy.Y;
        }
        if (main.a.Z != 0) {
            G = 86 + 40 * main.a.Z;
        }
    }

    public final void b(int n2) {
        if ((g += n2) == this.v) {
            g = 0;
        }
        if (g < 0) {
            g = this.v - 1;
        }
        this.i();
    }

    public final void m() {
        if (this.h[g] != null && j < this.h[g].size()) {
            this.ad = (by)this.h[g].elementAt(j);
        } else if (this.w != null && g < this.w.size()) {
            by by2 = (by)this.w.elementAt(g);
            if (by2 != null) {
                this.ad = by2;
            }
        } else {
            this.ad = null;
        }
        n = true;
        this.E = main.a.j();
    }

    public final void a(boolean bl2) {
        this.L = bl2;
    }

    public final void a(Graphics graphics) {
        int n2;
        int n3;
        C.b(graphics);
        main.a.c(graphics);
        je.a().a(graphics);
        graphics.setColor(0);
        graphics.translate(q, je.a().h + je.o + gy.Z);
        if (o) {
            String string = main.a.a(GameMidlet.i.a[0], GameMidlet.i.a[2], GameMidlet.i.b, true);
            n3 = main.a.N.a(string);
            n2 = this.M;
            if (aw.f(n2) > n3 + 20 - (c - 20)) {
                n2 = 0;
            }
            graphics.setClip(0, 0, c - 20, 20);
            main.a.N.a(graphics, string, n2, 0, 0);
            if (n3 > c - 20) {
                if (aw.f(this.M) > n3 + 50 - (c - 20)) {
                    this.M = 0;
                }
                --this.M;
            }
            graphics.translate(0, u);
        }
        if (this.h[g] != null) {
            if (this.y[g]) {
                main.a.N.a(graphics, this.z[g], 0, 0, 0);
                graphics.translate(0, u);
            }
            graphics.setClip(0, 0, 5 * e, f * e - l);
            graphics.translate(0, -ho.i);
            int n4 = 0;
            while (n4 < s * r) {
                je.a(graphics, e * (n4 % r), e * (n4 / r), e, e);
                ++n4;
            }
            if (!this.L && !F) {
                je.a(3 + j % r * e, j / r * e + 3, e - 5, e - 5, 0x22FF77, graphics);
            }
            n4 = this.h[g].size();
            n3 = ho.i / e * r;
            if (n3 < 0) {
                n3 = 0;
            }
            if ((n2 = ho.i / e * r + (f + 1) * r) > this.h[g].size()) {
                n2 = this.h[g].size();
            }
            while (n3 < n2 && n3 < n4) {
                ((by)this.h[g].elementAt(n3)).a(graphics, e * (n3 % r), e * (n3 / r));
                ++n3;
            }
            graphics.translate(0, ho.i - l);
            graphics.setClip(0, 0, c - 9, d);
            if (f == 2) {
                if (o && ae.C != null) {
                    graphics.translate(0, u);
                    graphics.setColor(10674392);
                    graphics.fillTriangle(30 * gy.Y, f * e - (gy.Y == 2 ? 10 : 0), 8 * gy.Y, f * e + 40 * gy.Y, 30 * gy.Y + 22 * gy.Y, f * e + 40 * gy.Y);
                    graphics.setColor(13364969);
                    graphics.fillArc(8 * gy.Y, f * e + 40 * gy.Y - 10 * gy.Y, 44 * gy.Y, 20 * gy.Y, 0, 360);
                    ae.C.a(graphics, 30 * gy.Y, f * e + 45 * gy.Y, false);
                    graphics.translate(60 * gy.Y, 0);
                }
                Graphics graphics2 = graphics;
                dp dp2 = this;
                if (B != null && j < dp2.h[g].size()) {
                    n2 = o ? 80 : 0;
                    graphics2.setClip(0, f * e, c - n2 + 5, d);
                    int n5 = 0;
                    while (n5 < B.size()) {
                        bc bc2 = (bc)B.elementAt(n5);
                        int n6 = 0;
                        if (bc2.c > c + 5 - n2) {
                            bc2.a(c + 5 - n2);
                            if (bc2.d >= 0) {
                                n6 = bc2.d;
                            }
                        }
                        main.a.N.a(graphics2, bc2.a, 2 - n6, f * e + n5 * t, 0);
                        ++n5;
                    }
                }
            } else {
                Graphics graphics3 = graphics;
                dp dp3 = this;
                if (main.a.j() - dp3.E > 0 && !k && B != null && j < dp3.h[g].size()) {
                    n2 = j % r * e - dp3.N / 2 + e / 2;
                    int n7 = (j / r + 1) * e - ho.i + 5;
                    int n8 = B.size() * gy.af + (gy.Z << 1) + 8;
                    if (n7 + n8 + b + 12 > main.a.n) {
                        n7 -= n8 + e + 10;
                    }
                    if (n7 + b < 0) {
                        n7 = -b;
                    }
                    if (n2 + q + 5 + dp3.N > main.a.m) {
                        n2 = main.a.m - (q + 5 + dp3.N);
                    } else if (n2 + q < 0) {
                        n2 = -q;
                    }
                    graphics3.setClip(n2, n7, dp3.N, n8 * gy.Y);
                    main.a.S.a(graphics3, n2, n7, dp3.N, n8, je.d[2], je.d[3], 1);
                    n2 += gy.Z;
                    n7 += gy.Z - gy.af / 2;
                    int n9 = 0;
                    while (n9 < B.size()) {
                        bc bc3 = (bc)B.elementAt(n9);
                        int n10 = 0;
                        if (bc3.c > dp3.N + 5) {
                            bc3.a(dp3.N);
                            if (bc3.d >= 0) {
                                n10 = bc3.d;
                            }
                        }
                        main.a.N.a(graphics3, bc3.a, n2 - n10, n7 + 5 + n9 * t, 0);
                        ++n9;
                    }
                }
            }
            if (k) {
                main.a.c(graphics);
                graphics.translate(q, main.a.y.e);
                main.a.S.a(graphics, j, r, e, G, q, H, g, A, I, this.J, this.K);
            }
        } else {
            graphics.setClip(-5, 0, c - 10, d);
            ((by)this.w.elementAt(g)).a(graphics, 0, 0);
        }
        if (main.a.D == null || bb.g || !bb.d) {
            super.a(graphics);
        }
        main.a.a(graphics);
    }

    public static void n() {
        n = false;
        B.removeAllElements();
        if (k) {
            dp.o();
        }
    }
}


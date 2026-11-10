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

    public final void a(int n, int n2) {
        switch (n) {
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
                go.b().f(n2, 0);
                return;
            }
            case 8: {
                if (n2 >= gb.d.size()) break;
                ad ad2 = (ad)gb.d.elementAt(n2);
                go.b().a(ad2);
                return;
            }
            case 9: {
                if (n2 >= gb.e.size()) break;
                az az2 = (az)gb.e.elementAt(n2);
                go.b().f(az2.a, 4);
                return;
            }
            case 10: {
                if (n2 >= go.f.size()) break;
                dc dc2 = (dc)go.f.elementAt(n2);
                go.b().a((int)dc2.a, dc2.f);
                return;
            }
            case 11: {
                if (n2 >= go.e.size()) break;
                Object object = (dc)go.e.elementAt(n2);
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
                if (n2 != 0 || ir.k == -1) {
                    ae.b();
                    ae.f(byArray2[n2]);
                }
                dp.b().d();
            }
        }
    }

    public final void d(int n, int n2) {
        C.d(n, n2);
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
        int n = 1;
        if (this.h[g] == null) {
            r = 1;
        } else {
            n = this.h[g].size();
            r = 5;
        }
        l = -e / 2;
        if (f > 2 || o || this.y[g]) {
            l = 0;
        }
        main.a.y.a(q, je.a().h + je.o + gy.Z + (o || this.y[g] ? u : 0), e, e, e * r, e * s, e * 5, f * e - l, n);
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
            int n = this.h[g].size();
            int n2 = 0;
            while (n2 < n) {
                if (dp.n) {
                    ((by)this.h[g].elementAt(n2)).a();
                }
                ++n2;
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

    public final void a(by by2, int n) {
        this.x[n] = by2;
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
                int n = j % r * e;
                int n2 = (j / r + 1) * e;
                if (n + e / 2 - G / 2 + q + 5 < 0) {
                    n = -e / 2 + G / 2 - q - 5;
                } else if (n + e / 2 - G / 2 + G > main.a.m) {
                    n = main.a.m - G - e / 2 + G / 2;
                }
                n += q;
                n2 += b + je.o + gy.Z;
                int n3 = (H - (gy.Z << 1)) / 4;
                n2 += gy.Z + 8;
                n = n + e / 2 - 35 * (main.a.Z + 1) / 2 - 2 - 10 - 10 * gy.Y;
                n2 = n2 + n3 / 2 + n3 + gy.ah / 2;
                if (main.a.a(n, n2 - 15 * gy.Y - 5, 20 + 20 * gy.Y, 30 * gy.Y)) {
                    dp2.c(-1);
                    dp2.J = 5;
                } else if (main.a.a(n + 35 * (main.a.Z + 1), n2 - 15 * gy.Y - 5, 20 + 20 * gy.Y, 30 * gy.Y)) {
                    dp2.c(1);
                    dp2.K = 5;
                } else if (main.a.a(n + 20 + 20 * gy.Y, n2 - 15 * gy.Y - 5, n + 35 * (main.a.Z + 1) - (n + 20 + 20 * gy.Y), 30 * gy.Y)) {
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
            int n;
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
                        n = 0;
                        while (n < dp3.h.length) {
                            if (n != g) {
                                je.a().a(4, n);
                            }
                            ++n;
                        }
                        F = true;
                    }
                }
                main.a.y.a(j);
                dp3.m();
            } else if (main.a.a(8)) {
                if (F) {
                    F = false;
                    n = 0;
                    while (n < dp3.h.length) {
                        if (n != g) {
                            je.a().a(0, n);
                        }
                        ++n;
                    }
                } else if (r > 1 && j / r + 1 < s) {
                    j += r;
                }
                main.a.y.a(j);
                dp3.m();
            }
            if (main.a.g && (n = je.a().d()) != 0) {
                dp3.b(n);
                main.a.g = false;
            }
        }
        super.l();
    }

    private void c(int n) {
        if ((A += n) < 0) {
            A = 99;
        }
        if (A > 99) {
            A = 0;
        }
        this.m();
        dp.o();
    }

    public final void a(int n, boolean bl) {
        if (k) {
            return;
        }
        if (j == n && this.ad != null && !bl) {
            this.ad.b();
        }
        j = n;
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

    public final void b(int n) {
        if ((g += n) == this.v) {
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

    public final void a(boolean bl) {
        this.L = bl;
    }

    public final void a(Graphics graphics) {
        int n;
        int n2;
        C.b(graphics);
        main.a.c(graphics);
        je.a().a(graphics);
        graphics.setColor(0);
        graphics.translate(q, je.a().h + je.o + gy.Z);
        if (o) {
            String string = main.a.a(GameMidlet.i.a[0], GameMidlet.i.a[2], GameMidlet.i.b, true);
            n2 = main.a.N.a(string);
            n = this.M;
            if (aw.f(n) > n2 + 20 - (c - 20)) {
                n = 0;
            }
            graphics.setClip(0, 0, c - 20, 20);
            main.a.N.a(graphics, string, n, 0, 0);
            if (n2 > c - 20) {
                if (aw.f(this.M) > n2 + 50 - (c - 20)) {
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
            int n3 = 0;
            while (n3 < s * r) {
                je.a(graphics, e * (n3 % r), e * (n3 / r), e, e);
                ++n3;
            }
            if (!this.L && !F) {
                je.a(3 + j % r * e, j / r * e + 3, e - 5, e - 5, 0x22FF77, graphics);
            }
            n3 = this.h[g].size();
            n2 = ho.i / e * r;
            if (n2 < 0) {
                n2 = 0;
            }
            if ((n = ho.i / e * r + (f + 1) * r) > this.h[g].size()) {
                n = this.h[g].size();
            }
            while (n2 < n && n2 < n3) {
                ((by)this.h[g].elementAt(n2)).a(graphics, e * (n2 % r), e * (n2 / r));
                ++n2;
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
                    n = o ? 80 : 0;
                    graphics2.setClip(0, f * e, c - n + 5, d);
                    int n4 = 0;
                    while (n4 < B.size()) {
                        bc bc2 = (bc)B.elementAt(n4);
                        int n5 = 0;
                        if (bc2.c > c + 5 - n) {
                            bc2.a(c + 5 - n);
                            if (bc2.d >= 0) {
                                n5 = bc2.d;
                            }
                        }
                        main.a.N.a(graphics2, bc2.a, 2 - n5, f * e + n4 * t, 0);
                        ++n4;
                    }
                }
            } else {
                Graphics graphics3 = graphics;
                dp dp3 = this;
                if (main.a.j() - dp3.E > 0 && !k && B != null && j < dp3.h[g].size()) {
                    n = j % r * e - dp3.N / 2 + e / 2;
                    int n6 = (j / r + 1) * e - ho.i + 5;
                    int n7 = B.size() * gy.af + (gy.Z << 1) + 8;
                    if (n6 + n7 + b + 12 > main.a.n) {
                        n6 -= n7 + e + 10;
                    }
                    if (n6 + b < 0) {
                        n6 = -b;
                    }
                    if (n + q + 5 + dp3.N > main.a.m) {
                        n = main.a.m - (q + 5 + dp3.N);
                    } else if (n + q < 0) {
                        n = -q;
                    }
                    graphics3.setClip(n, n6, dp3.N, n7 * gy.Y);
                    main.a.S.a(graphics3, n, n6, dp3.N, n7, je.d[2], je.d[3], 1);
                    n += gy.Z;
                    n6 += gy.Z - gy.af / 2;
                    int n8 = 0;
                    while (n8 < B.size()) {
                        bc bc3 = (bc)B.elementAt(n8);
                        int n9 = 0;
                        if (bc3.c > dp3.N + 5) {
                            bc3.a(dp3.N);
                            if (bc3.d >= 0) {
                                n9 = bc3.d;
                            }
                        }
                        main.a.N.a(graphics3, bc3.a, n - n9, n6 + 5 + n8 * t, 0);
                        ++n8;
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

/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ir {
    public static int a = -1;
    public static Image b;
    public static ht c;
    public static short[] d;
    public static short e;
    public static short f;
    public static short[] g;
    public static byte[] h;
    public static int i;
    public static byte j;
    public static byte k;
    public static Vector l;
    public static Vector m;
    public static Vector n;
    public static Vector o;
    private static int J;
    private dr[] K;
    private static Vector L;
    private static int[] M;
    public static js p;
    public static by q;
    public static Image r;
    private static ht N;
    private static int[] O;
    public static int s;
    public static int t;
    private static int P;
    public static dr u;
    public static Vector v;
    public static Vector w;
    public static Vector x;
    public static int y;
    private static ca Q;
    private boolean R;
    public static boolean z;
    private static int S;
    private static int T;
    public static int A;
    private static int U;
    public static int B;
    public static int C;
    private js V;
    private js W;
    private js X;
    private int Y;
    private int Z;
    private int aa;
    private static int ab;
    private static byte ac;
    public static int D;
    public static int E;
    public static Vector F;
    public static Vector G;
    public static int H;
    public static int I;

    static {
        byte[] byArray = new byte[26];
        byArray[0] = 1;
        byArray[1] = 1;
        byArray[2] = 1;
        byArray[3] = 1;
        byArray[4] = 1;
        byArray[5] = 1;
        byArray[6] = 1;
        byArray[7] = 1;
        byArray[8] = 1;
        byArray[11] = 1;
        byArray[12] = 3;
        byArray[13] = 3;
        byArray[14] = 3;
        byArray[15] = 3;
        byArray[16] = 3;
        byArray[17] = 2;
        byArray[18] = -1;
        byArray[19] = -1;
        byArray[20] = -1;
        byArray[24] = 2;
        byArray[25] = 2;
        h = byArray;
        i = 24;
        j = 0;
        k = (byte)-1;
        l = new Vector();
        m = new Vector();
        n = new Vector();
        J = 0;
        L = new Vector();
        M = new int[]{15853390, 15006199, 8183509, 12254198};
        O = new int[]{6143735, 21};
        t = -1;
        P = -1;
        y = -1;
        Q = new ca();
        A = -1;
        U = 3;
        B = -1;
        C = -1;
        ab = 0;
        D = 0;
        E = -1;
        H = -1;
        I = -1;
    }

    public ir() {
        q = new by(kf.bz, new hr(this));
        J = aw.e(3);
        i = 24;
        c.b(kf.av);
        c.a("den");
        r = c.a("s0");
        if (main.a.H) {
            N = main.a.Z == 0 ? new ht(c.a("focus"), 21 * gy.Y, 15 * gy.Y) : new ht(c.a("focus"), 32 * gy.Y, 11 * gy.Y);
            u = new dr();
        }
        c.a();
    }

    public final void a() {
        if (dp.b() != main.a.r && main.a.H) {
            ir ir2 = this;
            if (main.a.v != null || main.a.A != null || main.a.t != null) {
                return;
            }
            if (main.a.b(0, 0, main.a.m, main.a.n)) {
                int n2 = main.a.k();
                int n3 = main.a.l();
                if (main.a.g) {
                    main.a.g = false;
                    S = do.a().a;
                    T = do.a().b;
                    ir2.R = true;
                }
                if (ir2.R) {
                    if (main.a.e && (aw.f(n2) > 20 || aw.f(n3) > 20)) {
                        do.a().c = S + n2;
                        do.a().d = T + n3;
                        do.a().a(do.a().c + main.a.o, do.a().d + main.a.p);
                        do.a().e = System.currentTimeMillis() / 100L;
                    }
                    if (main.a.f) {
                        main.a.f = false;
                        ir2.R = false;
                        if (aw.f(n2) < 10 && aw.f(n3) < 10 && !ae.t) {
                            ir.u.a = main.a.h + do.a().a;
                            ir.u.b = main.a.i + do.a().b;
                            if (ir.u.b < 0) {
                                ir.u.b = 0;
                            }
                            GameMidlet.i.av = u;
                            GameMidlet.i.l();
                        }
                    }
                }
            }
        }
    }

    /*
     * Unable to fully structure code
     */
    public final void b() {
        try {
            block46: {
                do.a().d();
                if ((main.a.Z == 0 || main.a.r != cd.b()) && ir.m.size() > 0) {
                    var1_1 = 0;
                    while (var1_1 < ir.m.size()) {
                        var2_2 = (js)ir.m.elementAt(var1_1);
                        var2_2.b();
                        ++var1_1;
                    }
                    ir.a(ir.m);
                }
                if (ir.n.size() > 0) {
                    ir.a(ir.n);
                    var1_1 = 0;
                    while (var1_1 < ir.n.size()) {
                        ((js)ir.n.elementAt(var1_1)).b();
                        ++var1_1;
                    }
                }
                if (ir.l.size() > 0) {
                    var1_1 = 0;
                    while (var1_1 < ir.l.size()) {
                        var2_2 = (js)ir.l.elementAt(var1_1);
                        var2_2.b();
                        ++var1_1;
                    }
                }
                var2_2 = this;
                if (var2_2.K != null) {
                    var3_7 = 0;
                    while (var3_7 < var2_2.K.length) {
                        --var2_2.K[var3_7].a;
                        if (var2_2.K[var3_7].a < do.a().a - 100) {
                            var2_2.K[var3_7].a = do.a().a + main.a.m + 30 + aw.e(10) * 50;
                            var2_2.K[var3_7].b = -110 - aw.e(6) * 10;
                        }
                        ++var3_7;
                    }
                }
                if (!(main.a.l % 4 != 2 || go.N || ir.a == 24 && main.a.Z != 0 || go.E != -1 || go.y || cz.a == main.a.r || ir.a == -1 || main.a.r == cd.a || main.a.t != null)) {
                    if (ir.p == null) {
                        var2_3 = 0;
                        while (var2_3 < ir.m.size()) {
                            if (!ir.i(var2_3)) {
                                ++var2_3;
                                continue;
                            }
                            break;
                        }
                    } else if (aw.f(ir.p.aw - GameMidlet.i.aw) / ir.i >= (ir.p.az == 7 ? ir.U << 1 : ir.U) || aw.f(ir.p.ax - GameMidlet.i.ax) / ir.i >= (ir.p.az == 7 ? ir.U << 1 : ir.U)) {
                        ir.p = null;
                        ae.h = null;
                    }
                }
                if (ca.b) {
                    ir.Q.a();
                }
                if (ir.x == null) break block46;
                var1_1 = 0;
                while (var1_1 < ir.x.size()) {
                    block47: {
                        v0 = (lc)ir.x.elementAt(var1_1);
                        var2_4 = v0;
                        var2_4 = v0;
                        var3_8 = fx.d(v0.a);
                        if (var3_8 == null) break block47;
                        if (var2_4.k != 0) ** GOTO lbl68
                        var3_8 = ir.g(var2_4.j);
                        if (var3_8 == null) {
                            ir.x.removeElement(var2_4);
                        } else {
                            var2_4.e = (short)var3_8.aw;
                            var2_4.f = (short)var3_8.ax;
lbl68:
                            // 2 sources

                            if (var2_4.g == var2_4.c) {
                                var2_4.g = 0;
                                var3_8 = new jo();
                                new jo().a = var2_4.a;
                                var3_8.d = var2_4.j;
                                var3_8.e = var2_4.k;
                                switch (var2_4.l) {
                                    case 0: {
                                        var3_8.aw = var2_4.e;
                                        var3_8.ax = var2_4.f;
                                        break;
                                    }
                                    case 1: {
                                        var4_9 = aw.e(var2_4.d);
                                        var5_10 = aw.e(360);
                                        var6_11 = var4_9 * aw.b(aw.c(var5_10)) >> 10;
                                        var4_9 = -(var4_9 * aw.a(aw.c(var5_10))) >> 10;
                                        var3_8.aw = var2_4.e;
                                        var3_8.ax = var2_4.f;
                                        var3_8.b = (short)var6_11;
                                        var3_8.c = (short)var4_9;
                                        break;
                                    }
                                    case 2: {
                                        var3_8.aw = var2_4.e;
                                        var3_8.ax = var2_4.f;
                                        if (var2_4.k == 0) {
                                            var3_8.b = var2_4.m[var2_4.i];
                                            var3_8.c = var2_4.n[var2_4.i];
                                            break;
                                        }
                                        var3_8.aw += var2_4.m[var2_4.i];
                                        var3_8.ax += var2_4.n[var2_4.i];
                                    }
                                }
                                var2_4.h = (short)(var2_4.h + 1);
                                var2_4.i = (short)(var2_4.i + 1);
                                if (var2_4.m != null && var2_4.i >= var2_4.m.length) {
                                    var2_4.i = 0;
                                }
                                if (var2_4.b != -1 && var2_4.h >= var2_4.b) {
                                    ir.x.removeElement(var2_4);
                                }
                                switch (var2_4.k) {
                                    case 0: {
                                        ir.m.addElement(var3_8);
                                        ir.m = ir.a(ir.m);
                                        break;
                                    }
                                    case 1: {
                                        ir.l.addElement(var3_8);
                                        ir.l = ir.a(ir.l);
                                        break;
                                    }
                                    case 2: {
                                        if (ir.v == null) {
                                            ir.v = new Vector<E>();
                                        }
                                        ir.v.addElement(var3_8);
                                        break;
                                    }
                                    case 3: {
                                        if (ir.w == null) {
                                            ir.w = new Vector<E>();
                                        }
                                        ir.w.addElement(var3_8);
                                    }
                                }
                            }
                            var2_4.g = (short)(var2_4.g + 1);
                        }
                    }
                    ++var1_1;
                }
            }
            if (ir.v != null) {
                var1_1 = 0;
                while (var1_1 < ir.v.size()) {
                    var2_5 = (jo)ir.v.elementAt(var1_1);
                    var2_5.b();
                    ++var1_1;
                }
            }
            if (ir.w != null) {
                var1_1 = 0;
                while (var1_1 < ir.w.size()) {
                    var2_6 = (jo)ir.w.elementAt(var1_1);
                    var2_6.b();
                    ++var1_1;
                }
            }
            if (ir.N != null && ir.A != -1 && GameMidlet.i.au > 0) {
                ++ir.u.c;
                if (ir.u.c >= 10) {
                    ir.u.c = 0;
                }
            }
            if (++ir.ab >= 6) {
                ir.ab = 0;
                return;
            }
        }
        catch (Exception v1) {}
    }

    public static void c() {
        if (p == null) {
            return;
        }
        z = false;
        int n2 = 0;
        int n3 = m.size();
        int n4 = 0;
        while (n4 < n3) {
            js js2 = (js)m.elementAt(n4);
            if (js2.az != 4 && js2 == p) {
                n2 = n4;
                break;
            }
            ++n4;
        }
        p = null;
        n4 = n2 + 1;
        while (n4 < n3) {
            if (ir.i(n4)) break;
            ++n4;
        }
        if (p == null) {
            n4 = 0;
            while (n4 <= n2) {
                if (ir.i(n4)) break;
                ++n4;
            }
        }
    }

    private static boolean i(int n2) {
        js js2 = (js)m.elementAt(n2);
        if (js2.az != 4 && js2 != GameMidlet.i && js2.az != 6 && Math.abs(js2.aw - GameMidlet.i.aw) / i < (js2.az == 7 ? U << 1 : U) && Math.abs(js2.ax - GameMidlet.i.ax) / i < (js2.az == 7 ? U << 1 : U)) {
            if (js2.az != 0 || !((hn)js2).L) {
                p = js2;
            }
            if (js2.az == 0 && !((hn)js2).L) {
                ae.h = (hn)m.elementAt(n2);
            }
            return true;
        }
        return false;
    }

    public static boolean a(int n2) {
        if (n2 >= -125 && n2 < 0) {
            return true;
        }
        return n2 == -1 || n2 == 108 || n2 == 109 || n2 == 57 || n2 == 62 || n2 == 0 || n2 == 1 || n2 == 2 || n2 == 3 || n2 == 4 || n2 == 5 || n2 == 6 || n2 == 7 || n2 == 8 || n2 == 12 || n2 == 11 || n2 == 14 || n2 == 15 || n2 == 16 || n2 == 13 || n2 == 25 || n2 == 24 || n2 == 52 || n2 == 53 || n2 == 9 || n2 == 58 || n2 == 63 || n2 == 59 || n2 == 64 || n2 == 56 || n2 == 21 || n2 == 68 || n2 == 69 || n2 == 70 || n2 == 17 || n2 == 18 || n2 == 51 || n2 == 71 || n2 == 95 || n2 == 96 || n2 == 107 || n2 == 10 || n2 == 19;
    }

    public static boolean b(int n2) {
        if (n2 >= -125 && n2 < 0) {
            return true;
        }
        return n2 == 55 || n2 == 93 || n2 == 78 || n2 == 89 || n2 == 27 || n2 == 28 || n2 == 29 || n2 == 84 || n2 == 85 || n2 == 86 || n2 == 83 || n2 == 87 || n2 == 54 || n2 == 67 || n2 == 81 || n2 == 71 || n2 == 79 || n2 == 92 || n2 == 52 || n2 == 94 || n2 == 95 || n2 == 96 || n2 == 97 || n2 == 98 || n2 == 100 || n2 == 103 || n2 == 101 || n2 == 104 || n2 == 23;
    }

    public static boolean c(int n2) {
        if (n2 >= -125 && n2 < 0) {
            return true;
        }
        return n2 == 55 || n2 == 93 || n2 == 78 || n2 == 89 || n2 == 27 || n2 == 28 || n2 == 29 || n2 == 84 || n2 == 85 || n2 == 86 || n2 == 83 || n2 == 87 || n2 == 54 || n2 == 71 || n2 == 52 || n2 == 94 || n2 == 95 || n2 == 96 || n2 == 97 || n2 == 98 || n2 == 100 || n2 == 103 || n2 == 101 || n2 == 104 || n2 == 23;
    }

    private void f() {
        main.a.a(kf.P, new hs(this));
    }

    public final boolean a(int n2, int n3) {
        z = false;
        int n4 = ir.c(n2, n3);
        if (main.a.D != null && !bb.b(n4) || n4 == -2) {
            return false;
        }
        block0 : switch (n4) {
            case -1: {
                ae.b().n();
                if (a == 25) {
                    go.b();
                }
                if (b != null) {
                    Q.a((byte)-1);
                    break;
                }
                ae.b().e();
                break;
            }
            case 55: {
                main.a.i();
                cx cx2 = cx.a();
                cx2.e((byte)-23);
                cx2.k();
                break;
            }
            case 108: 
            case 109: {
                B = GameMidlet.i.aw;
                C = GameMidlet.i.ax;
                main.a.i();
                ae.A = 1;
                ae.z = 0;
                cx.a().a((short)4);
                break;
            }
            case 57: {
                ae.b().n();
                ae.b().b((byte)1);
                break;
            }
            case 62: {
                ae.b().n();
                ae.b().b((byte)6);
                break;
            }
            case 0: 
            case 1: 
            case 2: 
            case 3: 
            case 4: 
            case 5: 
            case 6: 
            case 7: 
            case 8: 
            case 11: 
            case 13: 
            case 14: 
            case 15: 
            case 16: 
            case 18: {
                ae.b().n();
                bf.a().a(n4, -1);
                break;
            }
            case 17: {
                this.f();
                break;
            }
            case 12: {
                this.f();
                break;
            }
            case 25: {
                go.b().j();
                break;
            }
            case 24: {
                if (go.c == null || go.b != GameMidlet.i.w) {
                    main.a.i();
                    go.b().b(GameMidlet.i.w, true);
                    break;
                }
                go.b().a(go.b, go.c, go.i, go.P, go.Q, go.V, go.U);
                break;
            }
            case 52: {
                go.b().g();
                break;
            }
            case 53: {
                go.b();
                go.o();
                break;
            }
            case 9: {
                this.f();
                break;
            }
            case 58: {
                ae.b().b((byte)2);
                break;
            }
            case 63: {
                ae.b().b((byte)7);
                break;
            }
            case 59: {
                ae.b().b((byte)3);
                break;
            }
            case 64: {
                ae.b().b((byte)8);
                break;
            }
            case 27: 
            case 56: {
                if (a == 18 || a == 109 || a == 108) break;
                ae.b().y();
                break;
            }
            case 28: {
                go.b().h();
                break;
            }
            case 29: {
                main.a.i();
                bf.a().a(ae.b);
                break;
            }
            case 93: {
                ae.b().a(kf.cN, 4);
                break;
            }
            case 78: {
                ae.b().a(kf.cN, 5);
                break;
            }
            case 83: {
                n4 = n3 / i;
                n3 = n2 / i;
                ir ir2 = main.a.x;
                if (fx.g == null) break;
                int n5 = 0;
                while (n5 < fx.g.size()) {
                    hd hd2 = (hd)fx.g.elementAt(n5);
                    int n6 = 0;
                    while (n6 < hd2.g.size()) {
                        dr dr2 = (dr)hd2.g.elementAt(n6);
                        if (dr2.a == n3 && dr2.b == n4 && a + 1 == dr2.c) {
                            Vector<by> vector = new Vector<by>();
                            vector.addElement(new by(kf.z, new hu(ir2, hd2)));
                            vector.addElement(new by(kf.d, new hv(ir2)));
                            main.a.a(hd2.c, vector);
                            break block0;
                        }
                        ++n6;
                    }
                    ++n5;
                }
                break;
            }
            case 84: {
                go.b().a((byte)2, (byte)5);
                break;
            }
            case 85: {
                go.b().a((byte)3, (byte)5);
                break;
            }
            case 86: {
                n2 = ir.d(n2, n3);
                n3 = ir.d(dt.s.a, dt.s.b);
                go.b().a(2, n2 - n3, go.h);
                break;
            }
            case 87: {
                n2 = ir.d(n2, n3);
                n3 = ir.d(ex.s.a, ex.s.b);
                go.b().a(1, n2 - n3, go.g);
                break;
            }
            case 89: {
                n2 = a == 108 || a == 109 ? 1 : (a == 13 ? 2 : 3);
                cx.a().h(n2);
                main.a.i();
                break;
            }
            case 54: {
                return kv.b().b(n2, n3);
            }
            case 21: {
                ei.b().f();
                break;
            }
            case 68: 
            case 69: 
            case 70: {
                ae.b();
                ae.g(n4 - 67);
                break;
            }
            case 110: {
                main.a.i();
                iy.a().f(GameMidlet.i.w);
                break;
            }
            case 20: {
                cx.a().a((short)0);
                main.a.i();
                break;
            }
            case 71: {
                main.a.i();
                cx.a().c((byte)-1);
                break;
            }
            case 94: {
                cx.a().h(4);
                main.a.i();
                break;
            }
            case 95: {
                main.a.i();
                go.S = GameMidlet.i.aw;
                go.T = GameMidlet.i.ax;
                it.a().f(0, 0);
                break;
            }
            case 96: {
                main.a.i();
                go.S = GameMidlet.i.aw;
                go.T = GameMidlet.i.ax;
                it.a().g(0, 0);
                break;
            }
            case 97: {
                go.b().m();
                break;
            }
            case 98: {
                go.b().n();
                break;
            }
            case 103: {
                ae.b();
                ae.i(3);
                break;
            }
            case 23: {
                cx.a().d(9);
                main.a.i();
                break;
            }
            case 104: {
                ae.b();
                ae.i(4);
                break;
            }
            case 100: {
                ae.b();
                ae.i(5);
                break;
            }
            case 101: {
                ae.b();
                ae.i(6);
                break;
            }
            case 107: {
                main.a.i();
                ae.m = a;
                cx.a().d(12);
                break;
            }
            case 19: {
                main.a.i();
                ae.b().n();
                t = -1;
                bf.a().a(19, -1);
                break;
            }
            case 10: {
                main.a.i();
                ae.b().n();
                t = -1;
                bf.a().a(10, -1);
                break;
            }
            case 111: {
                main.a.i();
                cx cx3 = cx.a();
                cx3.e((byte)-105);
                cx3.k();
                break;
            }
            case 112: {
                if (GameMidlet.i.H == 14) break;
                ei.b().g = GameMidlet.i.ax;
                ei.b().f = (n2 = n2 / i * i + i / 2 + 1) < GameMidlet.i.aw ? n2 + i : n2 - i;
                GameMidlet.i.a(n2, n3 / i * i + 5);
                ae.b();
                ae.a(GameMidlet.i.aw, GameMidlet.i.ax, GameMidlet.i.K, GameMidlet.i.Z);
                GameMidlet.i.a((byte)14);
                iy.a().a(14);
                break;
            }
            default: {
                if (n4 >= -125 && n4 < 0) {
                    main.a.i();
                    E = n4;
                    cx.a().a((short)(n4 - -125));
                    break;
                }
                if (!GameMidlet.i.M && n3 / i == 0 && n4 == 88) {
                    if (ae.s) {
                        GameMidlet.i.M = true;
                    } else {
                        bf bf2 = bf.a();
                        if (!ae.r) {
                            ae.r = true;
                            bf2.e((byte)92);
                            bf2.k();
                        }
                    }
                }
                return false;
            }
        }
        return true;
    }

    public static void a(Graphics graphics) {
        if (w != null) {
            int n2 = 0;
            while (n2 < w.size()) {
                jo jo2 = (jo)w.elementAt(n2);
                jo2.a(graphics);
                ++n2;
            }
        }
    }

    public final void b(Graphics graphics) {
        main.a.c(graphics);
        main.a.c(graphics);
        graphics.translate(-do.a().a, -do.a().b);
        this.c(graphics);
    }

    public final void c(Graphics graphics) {
        int n2;
        int n3;
        int n4;
        int n5;
        int n6;
        Graphics graphics2 = graphics;
        ir ir2 = this;
        if (b == null) {
            graphics2.setColor(1);
            graphics2.fillRect(do.a().a, do.a().b, main.a.m, main.a.n);
        } else {
            Object object;
            graphics2.setColor(s);
            graphics2.fillRect(do.a().a, do.a().b, main.a.m, main.a.n);
            n6 = do.a().a * 30 / 210;
            n5 = (do.a().a - n6) / (96 * gy.Y);
            n4 = -(94 - i + i / 2) * gy.Y;
            if (a == 107) {
                n4 += 41 * gy.Y;
            }
            n3 = n5;
            while (n3 <= n5 + main.a.m / (96 * gy.Y) + 1) {
                graphics2.drawImage(b, n6 + n3 * (96 * gy.Y), n4, 0);
                ++n3;
            }
            if (o != null) {
                n2 = 0;
                while (n2 < o.size()) {
                    object = (dr)o.elementAt(n2);
                    n3 = do.a().a * (30 + ((dr)object).d * 3) / 210;
                    fx.a(graphics2, ((dr)object).c, ((dr)object).a + n3, ((dr)object).b, 33);
                    ++n2;
                }
            }
            if ((n3 = L.size()) > 0) {
                n2 = 0;
                while (n2 < n3) {
                    object = (dr)L.elementAt(n2);
                    graphics2.setColor(M[((dr)object).c]);
                    graphics2.fillRect(((dr)object).a + n6, ((dr)object).b, 1, 1);
                    ++n2;
                }
            }
            if (ir2.K != null) {
                n2 = 0;
                while (n2 < ir2.K.length) {
                    graphics2.drawImage(ea.k[0], ir2.K[n2].a, ir2.K[n2].b, 0);
                    ++n2;
                }
            }
            if (main.a.B.size() > 0) {
                n2 = 0;
                while (n2 < main.a.B.size()) {
                    main.a.B.elementAt(n2);
                    ++n2;
                }
            }
            if (v != null) {
                n2 = 0;
                while (n2 < v.size()) {
                    object = (jo)v.elementAt(n2);
                    ((jo)object).a(graphics2);
                    ++n2;
                }
            }
            if (main.a.m > e * i) {
                graphics2.setColor(0);
                graphics2.fillRect(do.a().a, do.a().b, -do.a().a, main.a.n);
                graphics2.fillRect(e * i * gy.Y, do.a().b, -do.a().a, main.a.n);
            }
        }
        ir2 = graphics;
        n6 = (do.a().a + main.a.m) / i + 1;
        if (n6 > e) {
            n6 = e;
        }
        if ((n5 = (do.a().b + main.a.n) / i + 1) > f) {
            n5 = f;
        }
        if ((n4 = do.a().a / (i * gy.Y)) < 0) {
            n4 = 0;
        }
        int n7 = 0;
        while (n7 < n5) {
            int n8 = n4;
            while (n8 < n6) {
                n3 = d[n7 * e + n8];
                if (n3 != -1) {
                    n2 = n3 / ir.c.c;
                    c.b(n2, n3 % ir.c.c, n8 * (i * gy.Y), n7 * i * gy.Y, (Graphics)ir2);
                }
                ++n8;
            }
            ++n7;
        }
        if (N != null && A != -1 && GameMidlet.i.au > 0) {
            N.a(ir.u.c / 2, ir.u.a, ir.u.b, A, 3, graphics);
        }
    }

    public final void d(Graphics graphics) {
        Graphics graphics2 = graphics;
        ir ir2 = this;
        this.Y = 0;
        ir2.Z = 0;
        ir2.aa = 0;
        while (ir2.Y < m.size() || ir2.Z < l.size() || ir2.aa < n.size()) {
            ir2.X = null;
            ir2.W = null;
            ir2.V = null;
            if (ir2.Y < m.size()) {
                ir2.V = (js)m.elementAt(ir2.Y);
            }
            if (ir2.Z < l.size()) {
                ir2.W = (js)l.elementAt(ir2.Z);
            }
            if (ir2.aa < n.size()) {
                ir2.X = (dn)n.elementAt(ir2.aa);
            }
            if (!(ir2.V == null || ir2.W != null && ir2.V.ax >= ir2.W.ax || ir2.X != null && ir2.V.ax >= ir2.X.ax)) {
                ir2.V.a(graphics2);
                ++ir2.Y;
                continue;
            }
            if (ir2.W != null && (ir2.X == null || ir2.W.ax < ir2.X.ax)) {
                ir2.W.a(graphics2);
                ++ir2.Z;
                continue;
            }
            if (ir2.X == null) continue;
            ir2.X.a(graphics2);
            ++ir2.aa;
        }
        ir2 = graphics;
        if (main.a.Z == 0 && p != null) {
            ir2.drawImage(ae.d, ir.p.aw * gy.Y, (ir.p.ax - (ir.p.az == 7 ? 10 : (int)ir.p.aA)) * gy.Y - ab / 2, 3);
        }
        if (ca.b) {
            Q.a(graphics);
        }
    }

    private static void g() {
        L.removeAllElements();
        if (j == 0 || J == 0 || k != -1) {
            return;
        }
        if (a == 9 || a == 12) {
            int n2 = aw.e(main.a.m / 10);
            int n3 = 0;
            while (n3 < n2) {
                L.addElement(new dr(aw.e(e * i), -(98 + aw.e(main.a.p)), aw.e(4)));
                ++n3;
            }
            return;
        }
        int n4 = aw.e(main.a.m / 10);
        int n5 = 0;
        while (n5 < n4) {
            L.addElement(new dr(aw.e(e * i), -(38 + aw.e(main.a.p)), aw.e(4)));
            ++n5;
        }
    }

    public static InputStream d(int n2) {
        c.a = new c("/a.clazz");
        Object object = "" + n2;
        object = c.a.c((String)object);
        ByteArrayInputStream byteArrayInputStream = null;
        if (object != null) {
            try {
                byteArrayInputStream = new ByteArrayInputStream((byte[])object);
            }
            catch (Exception exception) {
                object = exception;
                exception.printStackTrace();
            }
        }
        return byteArrayInputStream;
    }

    public final void e(int n2) {
        InputStream inputStream;
        Object object;
        Object object2;
        if (kt.a().b()) {
            main.a.J = 0;
            main.a.h();
        }
        if (main.a.D != null) {
            main.a.D = null;
        }
        main.a.a.b();
        GameMidlet.i.au = 0;
        y = -1;
        ir.q.a = kf.bz;
        main.a.B.removeAllElements();
        GameMidlet.i.L = false;
        ca.b = false;
        do.f = false;
        GameMidlet.i.b((byte)0);
        ir.i();
        ae.l.removeAllElements();
        p = null;
        ae.h = null;
        int n3 = Calendar.getInstance().get(11);
        j = n3 >= 18 || n3 < 6 ? (byte)1 : 0;
        s = O[j];
        n3 = n2 - 1;
        if (n3 != 107 && (n3 < 0 || n3 >= h.length || h[n3] == -1)) {
            P = -1;
            b = null;
        } else if (n3 == 107 || P != h[n3] || t != j) {
            int n4 = n3 == 107 ? 0 : h[n3];
            P = n4;
            c.b(kf.as);
            object2 = c.a(String.valueOf(n4) + j);
            Image image = c.a(String.valueOf(j));
            b = Image.createImage((int)(96 * gy.Y), (int)(96 * gy.Y));
            object = b.getGraphics();
            je.a(0, 0, 96 * gy.Y, 10 * gy.Y, O[j], (Graphics)object);
            object.drawImage(image, 0, 69 * gy.Y, 36);
            object.drawImage(object2, 0, 96 * gy.Y, 36);
            c.a();
        }
        int n5 = n2;
        if (t != j || c == null) {
            if (n5 - 1 == 19) {
                try {
                    t = -1;
                    c = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/wedding.png")), i * gy.Y, i * gy.Y);
                }
                catch (IOException iOException) {
                    IOException iOException2 = iOException;
                    iOException.printStackTrace();
                }
            } else if (n5 - 1 != 107) {
                i = 24;
                t = j;
                Object object3 = aw.c(String.valueOf(kf.a()) + "/data/h" + j);
                object = aw.c(String.valueOf(kf.a()) + "/data/data");
                try {
                    object2 = new byte[((InputStream)object3).available()];
                    ((InputStream)object3).read((byte[])object2);
                    object3 = new byte[((InputStream)object).available()];
                    ((InputStream)object).read((byte[])object3);
                    c = new ht(aw.a((byte[])object2, (byte[])object3), i * gy.Y, i * gy.Y);
                }
                catch (IOException iOException) {
                    object3 = iOException;
                    iOException.printStackTrace();
                }
            } else {
                try {
                    i = 12;
                    t = -1;
                    c = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/tileDuaXe.png")), i * gy.Y, i * gy.Y);
                }
                catch (IOException iOException) {
                    IOException iOException3 = iOException;
                    iOException.printStackTrace();
                }
            }
        }
        if ((inputStream = ir.d(n2)) != null) {
            f = (short)8;
            switch (n2 - 1) {
                case 107: {
                    f = (short)16;
                    break;
                }
                case 25: {
                    f = (short)7;
                    break;
                }
                case 21: {
                    f = (short)7;
                    break;
                }
                case 9: {
                    f = (short)8;
                    break;
                }
                case 20: 
                case 57: 
                case 58: 
                case 59: 
                case 62: 
                case 63: 
                case 64: 
                case 100: 
                case 101: 
                case 103: 
                case 104: 
                case 109: {
                    f = (short)11;
                    break;
                }
                case 60: 
                case 61: 
                case 65: {
                    f = (short)5;
                    break;
                }
                case 18: {
                    f = (short)10;
                    break;
                }
                case 17: {
                    f = (short)6;
                    break;
                }
                case 24: {
                    break;
                }
                case 11: 
                case 13: {
                    break;
                }
                case 108: {
                    f = (short)8;
                    break;
                }
                case 19: {
                    f = (short)13;
                    break;
                }
                case 10: {
                    f = (short)9;
                }
            }
        }
        this.a(inputStream, n2, true);
        a = n2 - 1;
        System.out.println("index: " + a);
        if (k != -1 && a < h.length && h[a] != -1) {
            ba ba2 = new ba(k, 0);
            main.a.B.addElement(ba2);
        }
        this.h();
        ir.g();
        if (kt.a().b() && GameMidlet.i.e != null) {
            ir.b(GameMidlet.i);
        }
        if (main.a.J == 0) {
            main.a.J = 1;
        }
        System.gc();
    }

    public final void a(InputStream inputStream, int n2, boolean bl2) {
        int n3;
        short s2;
        block170: {
            s2 = 0;
            byte by2 = 0;
            byte by3 = 0;
            byte by4 = 0;
            byte by5 = 0;
            byte by6 = 0;
            byte by7 = 0;
            byte by8 = 0;
            int n4 = 0;
            int n5 = 0;
            int n6 = 0;
            byte by9 = 0;
            byte by10 = 0;
            byte by11 = 0;
            int n7 = 0;
            int n8 = 0;
            int n9 = 0;
            int n10 = 0;
            int n11 = 0;
            int n12 = 0;
            int n13 = 0;
            byte by12 = 0;
            byte by13 = 0;
            byte by14 = 0;
            int n14 = 0;
            byte by15 = 0;
            int n15 = 0;
            int n16 = 0;
            int n17 = 0;
            int n18 = 0;
            byte by16 = 0;
            int n19 = 0;
            byte by17 = 0;
            byte by18 = 0;
            int n20 = 0;
            int n21 = 0;
            int n22 = 0;
            int n23 = 0;
            int n24 = 0;
            int hn3 = 0;
            int n25 = 0;
            ac = 0;
            byte[] byArray = new byte[13];
            try {
                if (inputStream != null) {
                    e = (short)(inputStream.available() / f);
                    d = new short[f * e];
                }
                if (bl2) {
                    g = new short[f * e];
                }
                int hn2 = 0;
                while (hn2 < f * e) {
                    if (inputStream != null) {
                        ir.d[hn2] = (short)inputStream.read();
                        if (d[hn2] == 255) {
                            ir.d[hn2] = -1;
                        }
                    }
                    ++hn2;
                }
                if (n2 - 1 == 19) {
                    ae.p = new Vector();
                    hn2 = 0;
                    while (hn2 < d.length) {
                        ir.g[hn2] = d[hn2] < 32 ? 80 : 88;
                        if (d[hn2] == 65) {
                            ir.g[hn2] = 10;
                            ir.d[hn2] = 1;
                            if (hn3 == 1) {
                                ir.d[hn2] = 16;
                                GameMidlet.i.aw = GameMidlet.i.C = ir.k(hn2) + i;
                                GameMidlet.i.ax = GameMidlet.i.D = ir.l(hn2) + 12;
                                ir.a(kf.aq, ir.k(hn2) + i / 2, ir.l(hn2) + 12);
                            }
                            hn3 = (byte)(hn3 + 1);
                        } else if (d[hn2] == 27) {
                            dr js2 = new dr();
                            new dr().a = ir.k(hn2);
                            js2.b = ir.l(hn2);
                            js2.e = (short)((5 - ae.p.size() % 6 << 1) + ae.p.size() / 6);
                            ae.p.addElement(js2);
                        }
                        ++hn2;
                    }
                    hn exception2 = new hn();
                    new hn().aw = exception2.C = 26 * i;
                    exception2.ax = exception2.D = 8 * i + i / 2;
                    exception2.x = "chu hon";
                    exception2.w = -100;
                    exception2.a(new hx(2480));
                    exception2.K = exception2.t = gx.J;
                    m.addElement(exception2);
                    break block170;
                }
                if (n2 - 1 == 107) {
                    hn2 = 0;
                    while (hn2 < f * e) {
                        js n28;
                        if (d[hn2] == 61 && aw.e(2) == 1) {
                            n28 = new hn();
                            hn n30 = (hn)cz.b().p.elementAt(aw.e(cz.b().p.size()));
                            n28.e = n30.e;
                            n28.aw = n28.C = ir.k(hn2) + 12;
                            n28.ax = n28.D = ir.l(hn2) + 12;
                            n28.H = (byte)2;
                            n28.az = (byte)9;
                            m.addElement(n28);
                        }
                        if (d[hn2] == 59) {
                            n28 = new ks(1084, ir.k(hn2) + i, ir.l(hn2), 0);
                            l.addElement(n28);
                        } else if (d[hn2] == 60) {
                            n28 = new ks(1085, ir.k(hn2) + i, ir.l(hn2), 0);
                            l.addElement(n28);
                        }
                        ++hn2;
                    }
                    break block170;
                }
                hn2 = 0;
                while (hn2 < f * e) {
                    block173: {
                        block171: {
                            block172: {
                                if (d[hn2] == -4) break block171;
                                if (d[hn2] != -5) break block172;
                                ir.g[hn2] = 88;
                                break block173;
                            }
                            if (d[hn2] == -3 || d[hn2] == -6) break block173;
                            ir.g[hn2] = d[hn2] >= 120 && d[hn2] <= 123 ? 80 : (d[hn2] >= 114 && d[hn2] <= 119 ? 80 : (d[hn2] == 67 || d[hn2] == 85 ? 92 : (d[hn2] >= 20 && d[hn2] <= 23 ? 79 : (d[hn2] < 7 ? 80 : 88))));
                            if (d[hn2] >= 44 && d[hn2] <= 55) {
                                ir.g[hn2] = 80;
                            }
                            if (d[hn2] == 62 && n2 - 1 != 62 && n2 - 1 != 101 && n2 - 1 != 104 && n2 - 1 != 103 && n2 - 1 != 100 && n2 - 1 != 101) {
                                ir.g[hn2] = 56;
                            }
                            if (d[hn2] != 111 && d[hn2] != 112) break block173;
                        }
                        ir.g[hn2] = 80;
                    }
                    if (inputStream != null || GameMidlet.e != 11) {
                        switch (d[hn2]) {
                            case -1: {
                                ir.g[hn2] = 88;
                                break;
                            }
                            case 24: 
                            case 25: 
                            case 26: {
                                if (!bl2) break;
                                ir.a(845, ir.k(hn2) + 11, ir.l(hn2));
                                break;
                            }
                            case 27: {
                                if (!bl2) break;
                                ir.a(844, ir.k(hn2) + 11, ir.l(hn2) + 1);
                                break;
                            }
                            case 28: {
                                if (!bl2) break;
                                if (!kt.a().b()) {
                                    ir.d[hn2] = 4;
                                    break;
                                }
                                ir.a(0, ir.k(hn2) + i / 2, ir.l(hn2) + i - 2);
                                break;
                            }
                            case 127: {
                                if (by16 == 0) {
                                    ir.a(830, ir.k(hn2) + 36, ir.l(hn2) + i - 2);
                                    byte by19 = by16;
                                    by16 = (byte)(by19 + 1);
                                    ir.b(hn2, by19, 2);
                                }
                                ir.a(hn2, (byte)108, 96);
                                break;
                            }
                            case 128: {
                                if (s2 == 0) {
                                    ir.e(828, hn2);
                                    byte by20 = s2;
                                    s2 = (byte)(by20 + 1);
                                    ir.b(hn2, by20, 2);
                                }
                                ir.a(hn2, (byte)55, 5);
                                ir.d[hn2] = d[hn2 + e];
                                break;
                            }
                            case 129: 
                            case 160: {
                                if (by2 == 0) {
                                    if (n2 - 1 == 17) {
                                        ir.e(836, hn2);
                                    } else {
                                        ir.e(829, hn2);
                                    }
                                    byte by21 = by2;
                                    by2 = (byte)(by21 + 1);
                                    ir.b(hn2, by21, 2);
                                }
                                ir.a(hn2, d[hn2] == 129 ? (byte)57 : 62, 96);
                                break;
                            }
                            case 130: 
                            case 131: 
                            case 132: 
                            case 133: 
                            case 134: 
                            case 135: 
                            case 136: 
                            case 137: 
                            case 138: {
                                int n31;
                                int n26 = n31 = d[hn2] - 130;
                                byte by22 = byArray[n26];
                                byArray[n26] = (byte)(by22 + 1);
                                ir.b(hn2, by22, 0);
                                ir.a(hn2, (byte)n31);
                                break;
                            }
                            case 153: {
                                if (by15 == 0) {
                                    byte by23 = by15;
                                    by15 = (byte)(by23 + 1);
                                    ir.b(hn2, by23, 0);
                                }
                                ir.a(hn2, (byte)11);
                                break;
                            }
                            case 139: {
                                ir.g[hn2] = -1;
                                byte by24 = by14;
                                by14 = (byte)(by24 + 1);
                                ir.b(hn2, by24, 0);
                                if (a == -1 && n2 != 21 && b != null) {
                                    ca.a = new dr(ir.k(hn2) + i / 2, ir.l(hn2) - i / 2);
                                    Q.a((byte)1);
                                }
                                ir.a(hn2, d);
                                break;
                            }
                            case 140: {
                                byte by25 = by13;
                                by13 = (byte)(by25 + 1);
                                ir.b(hn2, by25, 0);
                                ir.a(hn2, (byte)25, 55);
                                by13 = (byte)(by13 + 1);
                                break;
                            }
                            case 141: {
                                if (by4 == 0) {
                                    ir.e(840, hn2);
                                    byte by26 = by4;
                                    by4 = (byte)(by26 + 1);
                                    ir.b(hn2, by26, 0);
                                }
                                ir.a(hn2, (byte)24, 5);
                                ir.d[hn2] = d[hn2 + e];
                                break;
                            }
                            case 142: {
                                ir.a(hn2, (byte)80, 7);
                                go.b().v[n6] = new dr(hn2 % e, hn2 / e, 0);
                                n6 = (byte)(n6 + 1);
                                break;
                            }
                            case 143: {
                                if (by3 == 0) {
                                    ir.e(831, hn2);
                                    byte by27 = by3;
                                    by3 = (byte)(by27 + 1);
                                    ir.b(hn2, by27, 2);
                                }
                                ir.a(hn2, (byte)52, 51);
                                ir.d[hn2] = d[hn2 + e];
                                break;
                            }
                            case 144: {
                                if (by5 == 0) {
                                    ir.e(841, hn2);
                                    byte by28 = by5;
                                    by5 = (byte)(by28 + 1);
                                    ir.b(hn2, by28, 2);
                                }
                                ir.a(hn2, (byte)53, 5);
                                break;
                            }
                            case 145: {
                                byte by29 = ac;
                                ac = (byte)(by29 + 1);
                                ir.b(hn2, by29, 0);
                                if (n2 - 1 == 109 || n2 - 1 == 57 && a == 17) {
                                    ir.a(hn2, (byte)17, -1);
                                    break;
                                }
                                if (a == 23) {
                                    ir.a(hn2, (byte)23, -1);
                                    break;
                                }
                                ir.a(hn2, (byte)9, -1);
                                if (n2 - 1 != 100) break;
                                ir.d[hn2] = 47;
                                break;
                            }
                            case 147: 
                            case 161: {
                                if (by6 == 0) {
                                    ir.e(832, hn2);
                                    byte by30 = by6;
                                    by6 = (byte)(by30 + 1);
                                    ir.b(hn2, by30, 2);
                                }
                                ir.a(hn2, d[hn2] == 147 ? (byte)58 : 63, 96);
                                break;
                            }
                            case 148: 
                            case 162: {
                                if (by7 == 0) {
                                    if (n2 == 18) {
                                        ir.a(836, ir.k(hn2) + 24, ir.l(hn2) + i - 2);
                                    } else {
                                        ir.a(833, ir.k(hn2) + 48, ir.l(hn2) + i - 2);
                                    }
                                    byte by31 = by7;
                                    by7 = (byte)(by31 + 1);
                                    ir.b(hn2, by31, 2);
                                }
                                ir.a(hn2, d[hn2] == 148 ? (byte)59 : 64, 96);
                                break;
                            }
                            case 149: {
                                if (by8 == 0) {
                                    ir.e(834, hn2);
                                    if (GameMidlet.i.w == go.b) {
                                        ir.b(hn2, by8, 2);
                                    }
                                    by8 = (byte)(by8 + 1);
                                }
                                ir.a(hn2, (byte)28, 4);
                                break;
                            }
                            case 150: {
                                if (n18 == 0) {
                                    ir.e(842, hn2);
                                }
                                ir.a(hn2, (byte)93, 0);
                                if (n2 == 26) {
                                    ir.d[hn2] = 4;
                                }
                                n18 = (byte)(n18 + 1);
                                break;
                            }
                            case 151: {
                                if (n19 == 0) {
                                    ir.e(843, hn2);
                                }
                                ir.a(hn2, (byte)78, 0);
                                n19 = (byte)(n19 + 1);
                                break;
                            }
                            case 152: {
                                if (n4 == 0) {
                                    ir.e(835, hn2);
                                }
                                ir.a(hn2, (byte)81, n2 - 1 == 25 ? 55 : 0);
                                n4 = (byte)(n4 + 1);
                                break;
                            }
                            case 155: {
                                ir.a(hn2, (byte)80, 55);
                                if (dt.t <= 0) break;
                                ir.a(hn2, (byte)84, 112);
                                ir.a(-5, ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                dt.r = new dr(ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                break;
                            }
                            case 156: {
                                ir.a(hn2, (byte)80, 5);
                                if (dz.t <= 0) break;
                                ir.a(hn2, (byte)85, 5);
                                ir.a(-6, ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                dz.s = new dr(ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                break;
                            }
                            case 157: {
                                ir.a(hn2, (byte)80, 111);
                                dt.s = new dr(ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                break;
                            }
                            case 158: {
                                ir.a(hn2, (byte)80, 5);
                                if (ex.r <= 0) break;
                                ex.s = new dr(ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                break;
                            }
                            case 159: {
                                int dr3 = 4;
                                if (n2 - 1 == 25) {
                                    dr3 = 5;
                                } else if (n2 - 1 == 108 || n2 - 1 == 109) {
                                    dr3 = 47;
                                } else if (n2 - 1 == 13) {
                                    dr3 = 0;
                                }
                                ir.a(hn2, (byte)89, dr3);
                                ir.e(848, hn2);
                                break;
                            }
                            case 163: {
                                byte by32 = ac;
                                ac = (byte)(by32 + 1);
                                ir.b(hn2, by32, 0);
                                ir.a(hn2, (byte)12, -1);
                                break;
                            }
                            case 164: {
                                ir.b(hn2, byArray[9], 0);
                                byArray[9] = (byte)(byArray[9] + 1);
                                ir.a(hn2, (byte)13, 6);
                                break;
                            }
                            case 165: {
                                ir.b(hn2, byArray[10], 0);
                                ir.a(hn2, (byte)14, 0);
                                byArray[10] = (byte)(byArray[10] + 1);
                                break;
                            }
                            case 166: {
                                ir.b(hn2, byArray[11], 0);
                                ir.a(hn2, (byte)15, 0);
                                byArray[11] = (byte)(byArray[11] + 1);
                                break;
                            }
                            case 167: {
                                ir.b(hn2, byArray[12], 0);
                                byArray[12] = (byte)(byArray[12] + 1);
                                ir.a(hn2, (byte)16, 43);
                                break;
                            }
                            case 172: {
                                ir.a(hn2, (byte)88, 96);
                                if (n15 % 3 == 0) {
                                    ir.a(836, ir.k(hn2) + 37, ir.l(hn2) + i);
                                }
                                n15 = (byte)(n15 + 1);
                                break;
                            }
                            case 173: {
                                ir.a(hn2, (byte)88, 96);
                                if (n16 % 4 == 0) {
                                    ir.a(837, ir.k(hn2) + 48, ir.l(hn2) + i);
                                }
                                n16 = (byte)(n16 + 1);
                                break;
                            }
                            case 174: {
                                ir.a(hn2, (byte)88, 96);
                                if (n17 % 4 == 0) {
                                    ir.a(838, ir.k(hn2) + 48, ir.l(hn2) + i);
                                }
                                n17 = (byte)(n17 + 1);
                                break;
                            }
                            case 175: {
                                byte by33 = by9;
                                by9 = (byte)(by33 + 1);
                                ir.b(hn2, by33, 0);
                                ir.a(hn2, (byte)68, 96);
                                break;
                            }
                            case 176: {
                                byte by34 = by10;
                                by10 = (byte)(by34 + 1);
                                ir.b(hn2, by34, 0);
                                ir.a(hn2, (byte)69, 96);
                                break;
                            }
                            case 177: {
                                byte by35 = by11;
                                by11 = (byte)(by35 + 1);
                                ir.b(hn2, by35, 0);
                                ir.a(hn2, (byte)70, 96);
                                break;
                            }
                            case 178: {
                                if (by16 == 0) {
                                    ir.a(830, ir.k(hn2) + i, ir.l(hn2) + i - 2);
                                    byte by36 = by16;
                                    by16 = (byte)(by36 + 1);
                                    ir.b(hn2, by36, 2);
                                }
                                ir.a(hn2, (byte)109, 96);
                                break;
                            }
                            case 179: {
                                if (by11 == 0) {
                                    byte by37 = by11;
                                    by11 = (byte)(by37 + 1);
                                    ir.b(hn2, by37, 2);
                                    ir.e(837, hn2);
                                }
                                ir.a(hn2, (byte)18, 96);
                                break;
                            }
                            case 180: {
                                byte by38 = by11;
                                by11 = (byte)(by38 + 1);
                                ir.b(hn2, by38, 0);
                                ir.a(hn2, (byte)17, 77);
                                if (n2 - 1 != 101) break;
                                ir.d[hn2] = 0;
                                break;
                            }
                            case 181: {
                                if (n2 - 1 == 101 || n2 - 1 == 104 || n2 - 1 == 103 || n2 - 1 == 100 || n2 - 1 == 101) break;
                                if (by17 == 0) {
                                    ir.a(kf.aq, ir.k(hn2) + i / 2, ir.l(hn2) + i / 2);
                                }
                                by17 = (byte)(by17 + 1);
                                ir.a(hn2, (byte)56, 46);
                                break;
                            }
                            case 182: {
                                go.C = new dr(ir.k(hn2), ir.l(hn2));
                                ir.a(hn2, (byte)80, 39);
                                break;
                            }
                            case 183: {
                                go.D = new dr(ir.k(hn2) + 24, ir.l(hn2) + 24);
                                ir.a(hn2, (byte)88, 13);
                                break;
                            }
                            case 184: {
                                break;
                            }
                            case 185: {
                                if (by18 == 1 && n2 == 18) {
                                    ir.a(975, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                }
                                if (n2 == 18) {
                                    ir.a(hn2, (byte)71, 43);
                                    if (by18 == 2) {
                                        ir.a(kf.aq, ir.k(hn2), ir.l(hn2) + 25);
                                    }
                                } else {
                                    byte by39 = by18;
                                    by18 = (byte)(by39 + 1);
                                    ir.b(hn2, by39, 0);
                                    ir.a(hn2, (byte)71, 47);
                                }
                                by18 = (byte)(by18 + 1);
                                break;
                            }
                            case 186: {
                                byte by40 = (byte)(n20 + 1);
                                n20 = by40;
                                if (by40 == 3) {
                                    ir.a(kf.aq, ir.k(hn2), ir.l(hn2) + 24);
                                }
                                ir.a(hn2, (byte)94, 17);
                                if (n20 != 2) break;
                                ir.a(974, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                break;
                            }
                            case 187: {
                                if (n21 == 0 && go.b == GameMidlet.i.w) {
                                    l.addElement(new cc(-10, ir.k(hn2) + 20, ir.l(hn2) + 20, go.m.getWidth()));
                                }
                                n21 = (byte)(n21 + 1);
                                ir.a(hn2, go.b == GameMidlet.i.w ? (byte)95 : 80, 4);
                                break;
                            }
                            case 188: {
                                if (go.b == GameMidlet.i.w) {
                                    l.addElement(new cc(-10, ir.k(hn2) + 20, ir.l(hn2) + 20, go.m.getWidth()));
                                }
                                ir.a(hn2, go.b == GameMidlet.i.w ? (byte)96 : 80, 4);
                                break;
                            }
                            case 189: {
                                go.J.aw = ir.k(hn2) + 12;
                                go.J.ax = ir.l(hn2) + 12;
                                if (GameMidlet.i.w == go.b) {
                                    ir.g[hn2] = 97;
                                }
                                ir.d[hn2] = 4;
                                l.addElement(go.J);
                                if (GameMidlet.i.w == go.b) break;
                                break;
                            }
                            case 190: {
                                ir.g[hn2] = 98;
                                ir.d[hn2] = 4;
                                if (n22 == 0) {
                                    ir.a(1029, ir.k(hn2) + 36, ir.l(hn2) + 20);
                                    go.W = ir.k(hn2) + 26;
                                    go.X = ir.l(hn2) + 10;
                                    if (go.b == GameMidlet.i.w) {
                                        ir.a(kf.aq, ir.k(hn2) + 36, ir.l(hn2) + 24);
                                    }
                                }
                                n22 = (byte)(n22 + 1);
                                break;
                            }
                            case 191: {
                                ir.g[hn2] = 23;
                                if (n2 - 1 == 104) {
                                    ir.d[hn2] = 0;
                                    if (n7 == 1) {
                                        ir.a(kf.aq, ir.k(hn2) + 12, ir.l(hn2) + 12);
                                    }
                                } else {
                                    ir.d[hn2] = n7 % 2 == 0 ? 46 : 44;
                                    if (n7 == 1) {
                                        ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 12);
                                    }
                                }
                                n7 = (byte)(n7 + 1);
                                break;
                            }
                            case 192: {
                                ir.g[hn2] = 99;
                                ir.d[hn2] = 4;
                                if (n12 == 0) {
                                    ir.a(1034, ir.k(hn2) + 36, ir.l(hn2) + 24);
                                }
                                n12 = (byte)(n12 + 1);
                                break;
                            }
                            case 193: {
                                ir.g[hn2] = 100;
                                ir.d[hn2] = 4;
                                if (n11 == 1) {
                                    ir.a(1032, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n11 = (byte)(n11 + 1);
                                break;
                            }
                            case 194: {
                                ir.g[hn2] = 106;
                                ir.d[hn2] = 4;
                                if (n13 == 0) {
                                    ir.a(1030, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                }
                                n13 = (byte)(n13 + 1);
                                break;
                            }
                            case 195: {
                                ir.g[hn2] = 102;
                                ir.d[hn2] = 4;
                                if (n9 == 1) {
                                    ir.a(1037, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                }
                                n9 = (byte)(n9 + 1);
                                break;
                            }
                            case 196: {
                                ir.g[hn2] = 103;
                                ir.d[hn2] = 4;
                                if (n8 == 1) {
                                    ir.a(1035, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n8 = (byte)(n8 + 1);
                                break;
                            }
                            case 197: {
                                ir.g[hn2] = 104;
                                ir.d[hn2] = 4;
                                if (n10 == 1) {
                                    ir.a(1033, ir.k(hn2) + 12, ir.l(hn2) + 24);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n10 = (byte)(n10 + 1);
                                break;
                            }
                            case 198: {
                                ir.g[hn2] = 105;
                                ir.d[hn2] = 4;
                                ir.a(1036, ir.k(hn2) + 12, ir.l(hn2) + 20);
                                break;
                            }
                            case 199: {
                                ir.g[hn2] = 101;
                                ir.d[hn2] = 4;
                                if (n5 == 1) {
                                    ir.a(1031, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n5 = (byte)(n5 + 1);
                                break;
                            }
                            case 200: {
                                ir.g[hn2] = 107;
                                if (n23 == 1) {
                                    ir.a(1075, ir.k(hn2) + 24, ir.l(hn2) + 24);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n23 = (byte)(n23 + 1);
                                ir.d[hn2] = 5;
                                break;
                            }
                            case 201: {
                                ir.g[hn2] = 19;
                                ir.d[hn2] = 5;
                                if (n24 == 1) {
                                    ir.a(1094, ir.k(hn2) + 24, ir.l(hn2) + 20);
                                    ir.a(kf.aq, ir.k(hn2) + 24, ir.l(hn2) + 30);
                                }
                                n24 = (byte)(n24 + 1);
                                break;
                            }
                            case 202: {
                                ir.a(hn2, (byte)88, 96);
                                if (n25 % 4 == 0) {
                                    ir.a(4, ir.k(hn2) + (i << 1), ir.l(hn2) + i);
                                }
                                n25 = (byte)(n25 + 1);
                                break;
                            }
                            case 203: {
                                byte by41 = by17;
                                by17 = (byte)(by41 + 1);
                                ir.b(hn2, by41, 0);
                                ir.a(hn2, (byte)110, 96);
                                break;
                            }
                            case 204: {
                                ir.d[hn2] = 43;
                                ir.g[hn2] = 10;
                                if (n24 == 1) {
                                    ir.a(kf.aq, ir.k(hn2), ir.l(hn2) + 30);
                                }
                                n24 = (byte)(n24 + 1);
                                break;
                            }
                            case 63: 
                            case 65: {
                                if (n2 - 1 == 101 || n2 - 1 == 104 || n2 - 1 == 103 || n2 - 1 == 100 || n2 - 1 == 101) break;
                                ir.g[hn2] = 56;
                                byte by42 = by12;
                                by12 = (byte)(by42 + 1);
                                ir.b(hn2, by42, 0);
                                if (n2 - 1 == 57 || n2 - 1 == 62) {
                                    ir.a(kf.aq, ir.k(hn2) - 12, ir.l(hn2) + 12);
                                    break;
                                }
                                if (n2 - 1 == 58 || n2 - 1 == 63) {
                                    ir.a(kf.aq, ir.k(hn2) + 12, ir.l(hn2) + 36);
                                    break;
                                }
                                ir.a(kf.aq, ir.k(hn2) - 12, ir.l(hn2) + 12);
                                break;
                            }
                            case 97: {
                                ir.g[hn2] = 54;
                                break;
                            }
                            case 98: {
                                ir.g[hn2] = 29;
                                ir.e(846, hn2);
                                if (n2 - 1 != 108 && n2 - 1 != 109) break;
                                ir.d[hn2] = 56;
                                break;
                            }
                            case 102: {
                                ir.g[hn2] = 92;
                                kx.I.addElement(new dr(ir.k(hn2) + i / 2, ir.l(hn2) + i));
                                dr dr4 = new dr(-20, ir.l(hn2) + i);
                                if (n14 % 2 == (n2 == 66 ? 0 : 1)) {
                                    dr4.a = (main.a.m + 20) / gy.Y;
                                }
                                kx.J.addElement(dr4);
                                n14 = (byte)(n14 + 1);
                                break;
                            }
                            case 110: {
                                go.B = new dr(ir.k(hn2) - i + 8, ir.l(hn2) - 2);
                                ir.a(847, ir.k(hn2) + 11, ir.l(hn2));
                                break;
                            }
                            default: {
                                by18 = 0;
                                by14 = 0;
                            }
                        }
                    }
                    ++hn2;
                }
            }
            catch (Exception exception) {
                Exception n32 = exception;
                exception.printStackTrace();
            }
        }
        ir.m(n2);
        ir.a(l);
        if (a == 24 && go.b != GameMidlet.i.w) {
            a = 53;
        }
        if ((n3 = a) != -1 && y != -1) {
            n3 = D;
        }
        if (n2 - 1 != 19) {
            int n27 = 0;
            while (n27 < g.length) {
                int n28 = n27 / e;
                int n32 = n27 % e;
                s2 = (short)n3;
                if (g[n28 * e + n32] == s2) {
                    dr dr2 = ir.j(n27);
                    if (dr2 == null) break;
                    GameMidlet.i.aw = dr2.a;
                    GameMidlet.i.ax = dr2.b;
                    break;
                }
                ++n27;
            }
        }
        if (n2 == 60) {
            GameMidlet.i.aw = 150;
            GameMidlet.i.ax = f * i - i;
        }
        if (E != -1) {
            D = E;
        }
        do.a().h = GameMidlet.i;
        do.a().b(n2);
        if (main.a.H) {
            GameMidlet.i.n();
        }
    }

    private static dr j(int n2) {
        block7: {
            block6: {
                if (n2 + 1 >= g.length || g[n2] != g[n2 + 1]) break block6;
                int n3 = n2;
                while (n3 < g.length) {
                    if (g[n3] != g[n3 + 1]) {
                        int n4 = i;
                        if (n2 / e == f - 1) {
                            n4 = -i;
                        }
                        return new dr(ir.k(n2) + (n3 - n2 + 1) * i / 2, ir.l(n2) + i / 2 + n4);
                    }
                    ++n3;
                }
                break block7;
            }
            if (n2 + e >= g.length || g[n2] != g[n2 + e]) break block7;
            int n5 = n2;
            while (n5 < g.length) {
                if (g[n5] != g[n5 + e]) {
                    int n6 = -i;
                    if (n2 % e == 0) {
                        n6 = i;
                    }
                    return new dr(ir.k(n2) + i / 2 + n6, ir.l(n2) + ((n5 - n2) / e + 1) * i / 2);
                }
                n5 += e;
            }
        }
        return null;
    }

    public static void a(int n2, int n3, int n4) {
        if (y != -1) {
            return;
        }
        cc cc2 = n2 > 0 ? new ks(n2, n3, n4, 0) : new cc(n2, n3, n4, 0);
        l.addElement(cc2);
    }

    private static void e(int n2, int n3) {
        if (y != -1) {
            return;
        }
        ks ks2 = new ks(n2, ir.k(n3) + ir.b(n3, d), ir.l(n3) + i - 4, 0);
        l.addElement(ks2);
    }

    private static int k(int n2) {
        return n2 % e * i;
    }

    private static int l(int n2) {
        return n2 / e * i;
    }

    private static void a(int n2, byte by2, int n3) {
        ir.g[n2] = by2;
        ir.d[n2] = (short)n3;
    }

    private static void a(int n2, byte by2) {
        ir.g[n2] = by2;
        if (n2 / e == 0) {
            ir.d[n2] = 43;
            return;
        }
        ir.d[n2] = 6;
    }

    public static void a(int n2, int n3, byte by2) {
        ir.g[n3 * ir.e + n2] = 51;
    }

    private static void a(String string, int n2, int n3) {
        if (kt.a().c) {
            l.addElement(new hz(string, n2, n3));
        }
    }

    public static ag f(int n2) {
        int n3 = F.size();
        int n4 = 0;
        while (n4 < n3) {
            ag ag2 = (ag)F.elementAt(n4);
            if (ag2.a == n2) {
                return ag2;
            }
            ++n4;
        }
        return null;
    }

    public static void d() {
        if (G == null || F == null) {
            return;
        }
        int n2 = 0;
        while (n2 < G.size()) {
            kq kq2 = (kq)G.elementAt(n2);
            Object object = ir.f(kq2.b);
            ir.a(kq2, (ag)object);
            object = new kq(kq2.f, kq2.aw * i, kq2.ax * i, kq2.a, kq2.b);
            new kq(kq2.f, kq2.aw * i, kq2.ax * i, kq2.a, kq2.b).d = kq2.d;
            l.addElement(object);
            ++n2;
        }
        ir.a(l);
    }

    private static void m(int n2) {
        Object object;
        int n3 = 0;
        while (n3 < fx.f.size()) {
            object = (kq)fx.f.elementAt(n3);
            if (((cc)object).f == n2) {
                ag ag2 = fx.b((int)((kq)object).b);
                ir.a((kq)object, ag2);
                l.addElement(new kq(((cc)object).f, ((js)object).aw * i, ((js)object).ax * i, ((kq)object).a, ((kq)object).b));
            }
            ++n3;
        }
        if (fx.g != null) {
            n3 = 0;
            while (n3 < fx.g.size()) {
                object = (hd)fx.g.elementAt(n3);
                int n4 = 0;
                while (n4 < ((hd)object).g.size()) {
                    dr dr2 = (dr)((hd)object).g.elementAt(n4);
                    if (dr2.c == n2) {
                        if (dr2.b * e + dr2.a >= 0 && dr2.b * e + dr2.a < g.length) {
                            ir.g[dr2.b * ir.e + dr2.a] = 83;
                        }
                        ir.a(((hd)object).b, dr2.a * i + i / 2, dr2.b * i + i / 2);
                    }
                    ++n4;
                }
                ++n3;
            }
        }
    }

    private void h() {
        this.K = null;
        if (j == 1) {
            return;
        }
        this.K = new dr[4];
        int n2 = 0;
        while (n2 < this.K.length) {
            int n3 = do.a().a + aw.e(main.a.m / 20 + 5) * 20;
            int n4 = -110 - aw.e(3) * 10;
            this.K[n2] = new dr(n3, n4);
            ++n2;
        }
        aw.c();
    }

    public static Vector a(Vector vector) {
        try {
            int n2 = vector.size();
            int n3 = 0;
            while (n3 < n2 - 1) {
                js js2 = (js)vector.elementAt(n3);
                int n4 = n3 + 1;
                while (n4 < n2) {
                    js js3 = (js)vector.elementAt(n4);
                    if (js2.ax > js3.ax) {
                        vector.setElementAt(js2, n4);
                        vector.setElementAt(js3, n3);
                        js2 = js3;
                    }
                    ++n4;
                }
                ++n3;
            }
        }
        catch (Exception exception) {}
        return vector;
    }

    private static void i() {
        main.a.B.removeAllElements();
        l.removeAllElements();
        m.removeAllElements();
        n.removeAllElements();
        v = null;
        w = null;
        x = null;
        System.gc();
    }

    public static boolean b(int n2, int n3) {
        if ((n2 = ir.c(n2, n3)) == 80 || n2 == 51) {
            return true;
        }
        return GameMidlet.i.Q == -5 && (n2 == 79 || n2 == 81 || n2 == 92 || n2 == 67);
    }

    public static int c(int n2, int n3) {
        if (n2 < 0 || n2 > e * i || n3 / i * e + n2 / i < 0 || n3 / i * e + n2 / i >= g.length) {
            return -2;
        }
        n2 = g[n3 / i * e + n2 / i];
        return n2;
    }

    public static int d(int n2, int n3) {
        if (n2 < 0 || n2 > e * i || n3 / i * e + n2 / i >= g.length) {
            return -1;
        }
        return n3 / i * e + n2 / i;
    }

    public static hn g(int n2) {
        int n3 = 0;
        while (n3 < m.size()) {
            js js2 = (js)m.elementAt(n3);
            if (js2.az == 0 && ((gx)js2).w == n2) {
                return (hn)js2;
            }
            ++n3;
        }
        return null;
    }

    public static void a(byte by2) {
        int n2 = 0;
        while (n2 < main.a.B.size()) {
            gz gz2 = (gz)main.a.B.elementAt(n2);
            ((gz)main.a.B.elementAt(n2)).b = true;
            ++n2;
        }
        if (by2 != -1) {
            ba ba2 = new ba(by2, 0);
            main.a.B.addElement(ba2);
        }
        k = by2;
    }

    public static void a(hn gx2) {
        if (gx2.V != -1) {
            gx2 = new gr((hn)gx2);
            m.addElement(gx2);
        }
    }

    public static gr h(int n2) {
        int n3 = 0;
        while (n3 < m.size()) {
            js js2 = (js)m.elementAt(n3);
            if (js2.az == 4 && ((gr)js2).r.w == n2) {
                return (gr)js2;
            }
            ++n3;
        }
        return null;
    }

    public static void b(hn hn2) {
        m.addElement(hn2);
        hn2.j();
    }

    public static void c(hn gx2) {
        m.removeElement(gx2);
        gx2 = ir.h(gx2.w);
        if (gx2 != null) {
            m.removeElement(gx2);
        }
    }

    public static void a(js js2) {
        if (p == js2) {
            p = null;
        }
        m.removeElement(js2);
    }

    public final void a(byte by2, byte[] byArray) {
        y = by2;
        c = new ht(aw.a(byArray), i * gy.Y, gy.Y * i);
        this.e();
        main.a.J = 0;
    }

    private static void a(int n2, short[] sArray) {
        if (n2 % e == 0) {
            sArray[n2] = sArray[n2 + 1];
            return;
        }
        sArray[n2] = sArray[n2 - 1];
    }

    public final void e() {
        ca.b = false;
        ir.i();
        ir.b(GameMidlet.i);
        short[] sArray = new short[d.length];
        g = new short[d.length];
        byte[] byArray = new byte[100];
        byte by2 = 0;
        int n2 = 0;
        while (n2 < d.length) {
            sArray[n2] = d[n2];
            ++n2;
        }
        n2 = 0;
        while (n2 < d.length) {
            if (d[n2] < ir.c.c) {
                ir.d[n2] = -4;
            } else if (d[n2] < ir.c.c << 1) {
                ir.d[n2] = -5;
            } else {
                ks ks2;
                int n3 = d[n2] - (ir.c.c << 1);
                switch (n3) {
                    case 0: {
                        ir.d[n2] = 98;
                        ks2 = new ks(846, ir.k(n2) + i / 2, ir.l(n2) + i / 2, 0);
                        l.addElement(ks2);
                        break;
                    }
                    case 2: {
                        ir.d[n2] = 139;
                        break;
                    }
                    case 3: {
                        ir.d[n2] = 152;
                        break;
                    }
                    case 12: {
                        ir.d[n2] = 150;
                        break;
                    }
                    case 13: {
                        ir.d[n2] = 151;
                        break;
                    }
                    case 14: {
                        ir.b(n2, by2, 0);
                        by2 = (byte)(by2 + 1);
                        ir.d[n2] = 184;
                        sArray[n2] = 33;
                        break;
                    }
                    case 15: {
                        sArray[n2] = 0;
                        ir.d[n2] = 185;
                        break;
                    }
                    default: {
                        ir.b(n2, byArray[n3], 0);
                        ir.g[n2] = (byte)(n3 + -125);
                        ir.d[n2] = -3;
                    }
                }
                if (n3 > 0 && byArray[n3] == 0 && n3 - 1 < ae.B.length && ae.B[n3 - 1] != -1) {
                    ks2 = new ks(ae.B[n3 - 1], ir.k(n2) + ir.b(n2, sArray), ir.l(n2) + i - 4, 0);
                    l.addElement(ks2);
                }
                if (n3 != 14) {
                    ir.a(n2, sArray);
                }
                int n4 = n3;
                byArray[n4] = (byte)(byArray[n4] + 1);
            }
            ++n2;
        }
        do.f = false;
        GameMidlet.i.H = 0;
        this.a(null, ae.b + 1, false);
        a = ae.b;
        d = sArray;
        do.a().b(ae.b + 1);
        main.a.h();
        P = -1;
        t = -1;
        ir.d();
        bf.a().a((int)ae.b, -1);
    }

    private static int b(int n2, short[] sArray) {
        int n3 = n2;
        while (n3 < sArray.length) {
            if (sArray[n3] != sArray[n3 + 1]) {
                return (n3 - n2 + 1) * i / 2;
            }
            ++n3;
        }
        return 0;
    }

    private static void b(int n2, byte by2, int n3) {
        if (by2 != 0) {
            return;
        }
        if (n2 + 1 < d.length && d[n2] == d[n2 + 1]) {
            by2 = (byte)n2;
            while (by2 < d.length) {
                if (d[by2] != d[by2 + 1]) {
                    ir.a(n3 != 1 ? kf.aq : "thoat", ir.k(n2) + (by2 - n2 + 1) * i / 2, ir.l(n2) + (y == -1 ? i / 2 : i) + (n3 == 2 ? i / 2 : 0));
                    return;
                }
                by2 = (byte)(by2 + 1);
            }
            return;
        }
        if (n2 + e < d.length && d[n2] == d[n2 + e]) {
            by2 = (byte)n2;
            while (by2 < d.length) {
                if (d[by2] != d[by2 + e]) {
                    ir.a(n3 != 1 ? kf.aq : "thoat", ir.k(n2) + 3, ir.l(n2) + ((by2 - n2) / e + 1) * i / 2);
                    return;
                }
                by2 = (byte)(by2 + e);
            }
        }
    }

    private static void a(kq kq2, ag ag2) {
        int n2 = 88;
        if (ag2.c == 1) {
            n2 = 79;
        } else if (ag2.c == 2) {
            n2 = 67;
        }
        int n3 = 0;
        while (n3 < ag2.j.size()) {
            dr dr2 = (dr)ag2.j.elementAt(n3);
            ir.g[(kq2.ax + dr2.b) * ir.e + (kq2.aw + dr2.a)] = n2;
            ++n3;
        }
    }

    public static void a(byte by2, byte by3, int n2, int n3) {
        H = n2;
        I = n3;
        y = -1;
        main.a.i();
        if (GameMidlet.e != 9) {
            cx.a().d(9);
        }
        bf.a().a((int)by2, by3);
    }
}


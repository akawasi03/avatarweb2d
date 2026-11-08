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
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ae
extends hj
implements cq {
    public static ae a;
    public static byte b;
    public static byte c;
    public static Image d;
    private by H;
    public by e;
    public by f;
    private by I;
    private by J;
    public static byte g;
    public static hn h;
    public static byte i;
    public static String j;
    public static Image k;
    public static Vector l;
    public static int m;
    public static Vector n;
    public static Vector o;
    public static Vector p;
    public static Vector q;
    public static boolean r;
    public static boolean s;
    public static boolean t;
    public static boolean u;
    public static int v;
    static byte[] w;
    private byte K = 0;
    private byte L = (byte)-1;
    public static boolean x;
    private Vector M = new Vector();
    private int N;
    private int O = 60;
    public boolean y = true;
    public static byte z;
    public static byte A;
    public static short[] B;
    public static hn C;
    public static int D;
    public static int E;
    public static int F;
    public static int G;

    static {
        g = (byte)-1;
        i = (byte)-1;
        l = new Vector();
        m = -1;
        r = false;
        s = false;
        t = false;
        u = false;
        v = -1;
        w = new byte[]{10, 4, 3, 5};
        x = false;
        D = -1;
        G = -1;
    }

    public final void a() {
        this.c();
        super.a();
    }

    public static ae b() {
        if (a == null) {
            a = new ae();
        }
        return a;
    }

    public final void c() {
        this.ac = this.H = new by(kf.c, 0, this);
        this.f = cd.b().a(kf.bR, new ig(this), 15);
        this.e = new by(main.a.H ? (main.a.Z == 0 ? kf.O : kf.c) : "", 1, this);
        if (main.a.Z > 0 && main.a.D == null) {
            this.ac = this.e;
        }
        this.I = new by(kf.x, 2, this);
        this.J = new by(kf.bZ, 2);
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                this.A();
                return;
            }
            case 1: {
                if (t) break;
                cd.b().f();
                return;
            }
            case 2: {
                this.e();
                return;
            }
            case 3: {
                ae.w();
            }
        }
    }

    public final void d() {
        this.I.b();
    }

    public ae() {
        this.c();
    }

    public final void e() {
        main.a.i();
        g = (byte)-1;
        i = (byte)-1;
        if (GameMidlet.e == 8) {
            this.t();
            return;
        }
        cx.a().d(8);
    }

    protected static void f() {
        hc.b().a(main.a.r);
    }

    protected final void g() {
        if (h == null) {
            return;
        }
        ae.f(100);
    }

    protected static void h() {
        if (h != null) {
            bf.a().c(0, ae.h.w);
        }
    }

    public final void a(byte by2, int n2) {
        main.a.h();
        hn hn2 = ir.g(n2);
        if (hn2 == null) {
            return;
        }
        if (by2 == 0) {
            main.a.a(String.valueOf(kf.dp) + hn2.x + ". " + kf.dq, new ih(this, n2));
            return;
        }
        if (by2 == 1) {
            v = n2;
            cx.a().d(11);
            main.a.i();
        }
    }

    protected final void i() {
        hc.b().a(ae.h.w, ae.h.x);
        hc.b().a(this);
    }

    private void A() {
        Vector<by> vector = new Vector<by>();
        Object object = null;
        if (ir.a != 25 && n != null && n.size() > 0) {
            object = new short[n.size()];
            int n2 = 0;
            while (n2 < n.size()) {
                bc bc2 = (bc)n.elementAt(n2);
                object[n2] = (short)bc2.d;
                vector.addElement(new by(bc2.a, 2, n2));
                ++n2;
            }
        }
        vector.addElement(this.I);
        short[] sArray = object;
        boolean bl2 = false;
        object = vector;
        le le2 = le.a();
        le2.a((Vector)object, 0);
        le.h = sArray;
        if (sArray != null) {
            le2.c += le2.e;
        }
    }

    public static void a(byte by2) {
        GameMidlet.i.a(by2);
        iy.a().a((int)by2);
    }

    public static void b(int n2) {
        GameMidlet.i.e(n2);
        GameMidlet.i.U = GameMidlet.i.S;
        GameMidlet.i.T = 0;
        iy.a().a(n2 + 100);
    }

    public static void a(int n2, byte by2) {
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            if (by2 >= 100) {
                hn2.e(by2 - 100);
                hn2.U = hn2.S;
                hn2.T = 0;
                return;
            }
            hn2.a(by2);
        }
    }

    protected final void j() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < 4) {
            int n3 = n2;
            by by2 = cd.b().a(kf.ey[n2], new io(this, n3), n2 + 7);
            vector.addElement(by2);
            ++n2;
        }
        cd.b().b = null;
        cd.b().a(vector);
    }

    public final void k() {
        hn hn2;
        Object object;
        main.a.x.b();
        ae ae2 = this;
        if (main.a.Z == 0 && ir.p != null) {
            ae2.ad = h != null && ir.p.az != 5 && ae.h.w > 2000000000 ? ae2.J : null;
            ae2.ae = ir.q;
            if (ir.p.az == 0) {
                ae2.ae.a = ((hn)ir.p).x;
                if (ae2.ae.a.length() > 8) {
                    ae2.ae.a = String.valueOf(ae2.ae.a.substring(0, 8)) + "..";
                }
            }
        }
        if (ir.p == null && ae2.ae == ir.q) {
            ae2.ae = null;
            ae2.ad = null;
        }
        ae2 = this;
        if (t) {
            hn hn3;
            if (ae2.K == 1 && main.a.J == -1) {
                System.out.println("updateWedding1111111111111: " + ae2.K);
                ae2.K = (byte)2;
                object = ir.g(-100);
                hn2 = ir.g(E);
                hn3 = ir.g(F);
                if (hn2 != null && hn3 != null) {
                    do.a().h = object;
                    System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                    ((gx)object).a(150, String.valueOf(kf.eB[0]) + hn2.x + kf.eB[1] + hn3.x + kf.eB[2], (byte)1);
                } else {
                    ae2.B();
                }
            }
            if (ae2.K == 2 && main.a.l % 4 == 2) {
                object = ir.g(-100);
                if (((gx)object).O == null) {
                    ae2.K = (byte)3;
                    hn2 = ir.g(E);
                    hn3 = ir.g(F);
                    if (hn2 != null && hn3 != null) {
                        hn3.C = 26 * ir.i - ir.i;
                        hn3.Q = -5;
                        hn2.C = 26 * ir.i - (ir.i << 1);
                        hn2.Q = -5;
                        do.a().h = hn2;
                    } else {
                        ae2.B();
                    }
                }
            }
            if (ae2.K == 3) {
                object = ir.g(E);
                hn2 = ir.g(F);
                if (object != null && hn2 != null && ((hn)object).Q == 0 && hn2.Q == 0) {
                    ae2.K = (byte)4;
                    hn3 = ir.g(-100);
                    do.a().h = hn3;
                    hn3.a(200, String.valueOf(kf.eC[0]) + ((gx)object).x + kf.eB[1] + hn2.x, (byte)1);
                    hn3.a(200, kf.eC[1], (byte)1);
                    hn3.a(150, kf.eC[2], (byte)1);
                    hn3.a(100, kf.eC[3], (byte)1);
                }
            }
            if (ae2.K == 4) {
                object = ir.g(E);
                hn2 = ir.g(F);
                ((gx)object).G = 4;
                hn2.G = 4;
                hn3 = ir.g(-100);
                if (hn3.O == null && hn3.P.size() == 0) {
                    if (E == GameMidlet.i.w) {
                        bf.a().b(F, 101);
                    }
                    ae2.L = 0;
                    ae2.K = (byte)5;
                }
            }
        }
        if (ae2.K == 5 && ae2.L >= 0) {
            ae2.L = (byte)(ae2.L + 1);
            if (ae2.L > 20) {
                if (ae2.L == 21) {
                    object = new ba(2, 0);
                    main.a.B.addElement(object);
                    do.a().h = GameMidlet.i;
                    GameMidlet.i.G = 4;
                }
                if (GameMidlet.i.w != E) {
                    t = false;
                    ae2.L = (byte)-1;
                }
                if (GameMidlet.i.Q == 0 && GameMidlet.i.w == E) {
                    t = false;
                    object = ir.g(E);
                    hn2 = ir.g(F);
                    if (object != null && hn2 != null) {
                        ((gx)object).G = 4;
                        hn2.G = 4;
                    }
                    ae2.K = (byte)6;
                    ae2.L = (byte)-1;
                    bf.a().b(F, 102);
                }
            }
        }
        if (this.ad == null && main.a.Z == 0 && main.a.D == null) {
            this.ad = this.e;
        } else if (main.a.D != null) {
            this.ad = null;
        }
        if (l.size() > 0) {
            int n2 = 0;
            while (n2 < l.size()) {
                object = (db)l.elementAt(n2);
                ((db)object).c();
                ++n2;
            }
        }
        ae ae3 = this;
        if (ae3.N > 0) {
            --ae3.N;
            if (ae3.N == 0) {
                if (ae3.M.size() > 0) {
                    ae3.M.removeElementAt(0);
                }
                if (ae3.M.size() > 0) {
                    ae3.N = ae3.O;
                }
            }
        }
    }

    private void B() {
        t = false;
        this.K = 0;
        int n2 = 0;
        while (n2 < ir.m.size()) {
            js js2 = (js)ir.m.elementAt(n2);
            if (js2.az == 0) {
                js2 = (hn)js2;
                v0.G = 4;
            }
            ++n2;
        }
    }

    public final void l() {
        if (main.a.g && main.a.a(0, 0, main.a.m, 0)) {
            main.a.g = false;
            cx.a().c(GameMidlet.i.w);
        }
        if (main.a.D == null || !bb.d) {
            super.l();
        }
        main.a.x.a();
        GameMidlet.i.e();
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        if (main.a.D == null || !bb.d) {
            super.a(graphics);
        }
        main.a.a(graphics);
    }

    public final void b(Graphics graphics) {
        Object object;
        main.a.c(graphics);
        main.a.x.b(graphics);
        if (l.size() > 0) {
            int n2 = 0;
            while (n2 < l.size()) {
                object = (db)l.elementAt(n2);
                object.a(graphics);
                ++n2;
            }
        }
        main.a.x.d(graphics);
        object = graphics;
        ae ae2 = this;
        main.a.c(object);
        if (ae2.M.size() != 0) {
            String string = (String)ae2.M.elementAt(0);
            int n3 = ae2.O - ae2.N;
            if (n3 > 10) {
                n3 = 10;
            }
            int n4 = main.a.m;
            int n5 = 0;
            while (n5 < n3) {
                n4 >>= 1;
                ++n5;
            }
            main.a.L.a((Graphics)object, string, n4 + 3, 2, 0);
        }
        main.a.c(graphics);
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.A();
                return;
            }
            case 2: {
                cx.a().h(ae.h.w);
                return;
            }
            case 52: {
                if (main.a.r != ea.a || ir.a != -1) break;
                main.a.i();
                cx.a().d(8);
            }
        }
    }

    public final void a(byte by2, byte by3, short s2, short s3, Vector vector, Vector vector2, Vector vector3) {
        if (by3 == -1) {
            main.a.b(kf.aW, 52, null);
            return;
        }
        if (ir.y == -1) {
            ir.F = vector2;
            ir.G = vector3;
        }
        main.a.S.a(by2);
        main.a.g();
        b = by2;
        c = by3;
        h = null;
        ir.p = null;
        GameMidlet.i.Q = 0;
        if (main.a.I || by2 != ir.a || by2 == ir.a && ir.y == -1 || ir.y == -1 && (ir.a == 14 || ir.a == 15 || ir.a == 16)) {
            GameMidlet.i.L = false;
            if (by2 != ir.a) {
                GameMidlet.i.aw = s2;
                GameMidlet.i.ax = s3;
            }
            ir.l.removeAllElements();
            main.a.x.e(by2 + 1);
        } else {
            l.removeAllElements();
            ir.m.removeAllElements();
            ir.n.removeAllElements();
            main.a.B.removeAllElements();
            ir.b(GameMidlet.i);
        }
        if (vector2 != null) {
            ir.d();
        }
        if (ir.B != -1) {
            GameMidlet.i.a(ir.B, ir.C);
            ir.C = -1;
            ir.B = -1;
        }
        if (ir.H != -1) {
            GameMidlet.i.aw = ir.H;
            GameMidlet.i.ax = ir.I;
            ir.I = -1;
            ir.H = -1;
            ae.a(GameMidlet.i.aw, GameMidlet.i.ax, GameMidlet.i.K, 0);
        }
        main.a.a.b();
        if (main.a.r != this) {
            if (jy.c == 0) {
                ae.b().a();
            } else {
                jy.c = 2;
                jv.b().a();
            }
        }
        by2 = 0;
        while (by2 < vector.size()) {
            js js2 = (js)vector.elementAt(by2);
            if (js2.az == 0) {
                js2 = (hn)js2;
                v0.C = js2.aw;
                ((gx)js2).D = js2.ax;
                ((hn)js2).t = ((gx)js2).K;
                ((hn)js2).h();
                if (((gx)js2).w != GameMidlet.i.w) {
                    ae.e((hn)js2);
                    ir.b((hn)js2);
                }
            } else if (js2.az == 5) {
                js2 = (hm)js2;
                v1.b = js2.aw;
                ((hm)js2).c = js2.ax;
                ir.m.addElement(js2);
            }
            by2 = (byte)(by2 + 1);
        }
        if (ca.b) {
            ae.a(ca.a.a, ca.a.b, GameMidlet.i.K, GameMidlet.i.N);
        } else {
            ++GameMidlet.i.ax;
            this.n();
        }
        ae.b(GameMidlet.i.S);
        if (main.a.Z == 0 && main.a.D == null) {
            this.ac = this.H;
        }
        h = null;
        if (ir.a != 25) {
            main.a.h();
        }
        main.a.a.sizeChanged(0, 0);
        if (main.a.I) {
            if (ir.a == 9 && bb.e != 0) {
                main.a.D = new bb();
                main.a.D.b();
            } else if (!ca.b && ir.a == 23) {
                main.a.D = new bb();
                main.a.D.d();
            } else if (ir.a == 25 && bb.f > 0) {
                main.a.D = new bb();
                main.a.D.a(a);
            }
            this.ac = null;
            this.ad = null;
        }
        GameMidlet.i.M = false;
        GameMidlet.i.N = 0;
        GameMidlet.i.G = 4;
        r = false;
        t = false;
        main.a.A = null;
        if (ir.a == 108) {
            do.a().d();
            do.a().b();
        }
        if (main.a.J == 0) {
            main.a.J = 1;
        }
    }

    public static void m() {
        int n2 = 0;
        switch (i) {
            case 0: {
                n2 = 3;
                break;
            }
            case 1: {
                n2 = 7;
                break;
            }
            case 2: {
                n2 = 21;
                break;
            }
            case 3: {
                n2 = 22;
                break;
            }
            case 4: {
                n2 = 21;
                break;
            }
            case 5: {
                n2 = 22;
            }
        }
        cx.a().b(n2);
    }

    public final void b(byte by2) {
        if (g != -1) {
            return;
        }
        this.n();
        System.out.println("doJoinShop: " + by2);
        main.a.i();
        g = by2;
        cx.a().d(8);
    }

    public static void a(int n2, int n3, int n4, int n5) {
        if (GameMidlet.e != 9 && GameMidlet.e != 11 || t) {
            return;
        }
        GameMidlet.i.C = n2;
        GameMidlet.i.D = n3;
        bf.a().a(n2, n3, n4, n5);
    }

    public final void n() {
        ae.a(GameMidlet.i.aw, GameMidlet.i.ax, GameMidlet.i.K, GameMidlet.i.N);
    }

    public static void a(int n2, int n3, int n4, int n5, short s2) {
        hn hn2 = ir.g(n2);
        if (n2 == GameMidlet.i.w || t) {
            return;
        }
        if (hn2 != null) {
            if (hn2.L && hn2.Q == 0) {
                hn2.L = false;
                hn2.a(n3, n4);
                hn2.N = s2;
            }
            if (hn2.H == -3) {
                hn2.H = 0;
            }
            hn2.R = -1;
            if (hn2.Q == 0) {
                dr dr2 = new dr(n3, n4, n5);
                new dr(n3, n4, n5).d = s2;
                hn2.g.addElement(dr2);
            }
        }
    }

    public final void a(hn hn2) {
        ae.e(hn2);
        hn2.h();
        hn2.L = true;
        hn hn3 = ir.g(hn2.w);
        if (hn3 != null) {
            ir.m.removeElement(hn3);
        }
        ir.b(hn2);
    }

    private static void e(hn hn2) {
        fa fa2 = fx.a(hn2.e, 50);
        if (fa2 != null) {
            hn2.d = fa2.b;
        }
    }

    public static void c(int n2) {
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            hn2.f();
            hn2.p = true;
            db db2 = kv.c(n2);
            if (db2 != null) {
                l.removeElement(db2);
            }
        }
    }

    public final void d(int n2) {
        im.d().a(n2, this);
        super.d(n2);
    }

    public final void a(String string) {
        if (string.trim().equals("")) {
            return;
        }
        if (string.indexOf("dmw") != -1) {
            if (h != null) {
                cx.a().b(ae.h.w, string);
            }
            return;
        }
        if (string.indexOf("ptw") == 0 && h != null) {
            String string2 = string;
            if (ae.h.O != null && ae.h.O.d != null) {
                string2 = String.valueOf(string2) + " (";
                int n2 = 0;
                while (n2 < ae.h.O.d.length) {
                    string2 = String.valueOf(string2) + " " + ae.h.O.d[n2];
                    ++n2;
                }
                string2 = String.valueOf(string2) + ").";
                cx.a().b(ae.h.w, string2);
                return;
            }
        }
        bf.a().a(string);
    }

    public static void a(int n2, String string) {
        if (ir.a == 24 || ir.a == 53) {
            return;
        }
        hn hn2 = ir.g(n2);
        if (hn2 == null) {
            return;
        }
        hn2.O = null;
        hn2.a(100, string, (byte)(n2 >= 2000000000 ? 1 : 0));
        if (n2 < 2000000000) {
            string = String.valueOf(hn2.x) + ": " + string;
            hc hc2 = hc.b();
            hc2.a.a(string);
        }
    }

    protected static void o() {
        if (h == null || ae.h.Q != 0) {
            return;
        }
        bf.a().b(ae.h.w, 101);
    }

    public final void e(int n2) {
        if (h == null) {
            return;
        }
        fa fa2 = (fa)fx.a((short)n2);
        main.a.a(fa2.i[0], fa2.i[1], new ij(this, fa2), new ik(this, fa2), null);
    }

    public static void f(int n2) {
        bf.a().b(ae.h.w, n2);
    }

    public final void a(int n2, int n3, int n4, String string, int n5) {
        if (n4 == -1) {
            main.a.b(string);
            return;
        }
        this.a(1, n2, n3, n4, n5);
    }

    public final void a(int n2, int n3, int n4, String string, int n5, int n6, int n7, int n8) {
        if (n4 == -1) {
            main.a.b(string);
            return;
        }
        if (n2 == GameMidlet.i.w) {
            System.out.println("onGiftGiving: " + n5);
            GameMidlet.i.a(n6, n7, n8);
        }
        this.a(0, n2, n3, n4, 0);
    }

    private void a(int n2, int n3, int n4, int n5, int n6) {
        hn hn2;
        hn hn3;
        block14: {
            block13: {
                hn3 = ir.g(n3);
                hn2 = ir.g(n4);
                if (hn3 == null || hn2 == null) {
                    return;
                }
                if (hn3.Q != 0 || hn2.Q != 0) {
                    return;
                }
                hn3.j = hn2.w;
                hn3.i = hn3.w;
                hn2.i = hn3.w;
                hn2.j = hn2.w;
                if (n3 == GameMidlet.i.w) {
                    GameMidlet.i.D = hn2.ax;
                    n3 = GameMidlet.i.aw < hn2.aw ? hn2.aw - 15 : hn2.aw + 15;
                    GameMidlet.i.C = n3;
                    ae.a(n3, hn2.ax, GameMidlet.i.K, GameMidlet.i.N);
                }
                if (n4 == GameMidlet.i.w) {
                    ae.a(GameMidlet.i.aw, GameMidlet.i.ax, hn3.K == 0 ? gx.J : (byte)0, GameMidlet.i.N);
                }
                if (n2 != 1) break block13;
                hn2.R = -1;
                switch (n5) {
                    case 101: {
                        hn hn4 = hn2;
                        hn hn5 = hn3;
                        if (hn4.Q == 0) {
                            hn5.Q = 11;
                            hn4.Q = 11;
                            hn5.g.removeAllElements();
                            hn4.g.removeAllElements();
                            hn5.ao = hn4;
                            if (hn5.aw < hn4.aw) {
                                hn5.d(hn4.aw - 20, hn4.ax + 2);
                                break;
                            }
                            hn5.d(hn4.aw + 20, hn4.ax + 2);
                            break;
                        }
                        break block14;
                    }
                    case 100: {
                        hn hn6 = hn2;
                        hn hn7 = hn3;
                        if (hn6.Q == 0) {
                            hn7.Q = -2;
                            hn6.Q = -2;
                            hn7.g.removeAllElements();
                            hn6.g.removeAllElements();
                            hn7.ao = hn6;
                            hn7.d(hn6.aw, hn6.ax + 5);
                            break;
                        }
                        break block14;
                    }
                    case 0: {
                        hn3.Q = -3;
                        hn2.Q = -3;
                        this.b(String.valueOf(hn3.x) + " " + kf.ca + hn2.x);
                        break;
                    }
                    case 102: 
                    case 103: {
                        hn3.Q = 12;
                        hn2.Q = 12;
                        hn2.Y = hn3.Y = (short)n6;
                        this.b(String.valueOf(hn3.x) + " " + kf.bS + " " + hn2.x);
                        break;
                    }
                    default: {
                        this.b(String.valueOf(hn3.x) + " " + "t\u1eb7ng qu\u00e0" + " " + hn2.x);
                        break;
                    }
                }
                break block14;
            }
            hn3.Q = 9;
            hn2.Q = 8;
            hn2.R = -1;
            hn2.k = n5;
            ld ld2 = fx.a((short)n5);
            this.b(String.valueOf(hn3.x) + " " + kf.di + " " + ld2.l + " " + kf.dh + " " + hn2.x);
        }
        hn2.U = hn2.S;
        hn2.T = 0;
        hn3.U = hn3.S;
        hn3.T = 0;
    }

    public static void b(hn hn2) {
        Object object = (fa)fx.a((short)hn2.k);
        object = fx.a(((ld)object).j, hn2.e);
        if (object == null) {
            hn2.a(new hx((short)hn2.k));
            hn2.h();
            return;
        }
        ((hx)object).a = (short)hn2.k;
    }

    public static void c(hn hn2) {
        if (hn2 == null) {
            return;
        }
        bf.a().a(hn2.w);
        main.a.b(String.valueOf(kf.b) + " " + hn2.x + "  " + kf.e);
    }

    public final void a(hn object, String object2) {
        object = new cw(kf.y, -2, new by(kf.e, new in(this, (hn)object)), new by(kf.cc, new ej(this, (hn)object)), false);
        ((cw)object).a((String)object2);
        object2 = object;
        object = hc.b();
        ((cw)object2).a = true;
        ((hc)object).b((cw)object2);
        if (main.a.r != hc.b()) {
            ++hj.as;
        }
    }

    public static void a(boolean bl2, String string) {
        if (bl2) {
            cy.b();
            cy.h();
        }
        main.a.b(string);
    }

    protected static void p() {
        if (h != null) {
            main.a.d(kf.b);
            bf.a().b(ae.h.w);
        }
    }

    public static void b(int n2, int n3) {
        hx hx2;
        if (n2 == GameMidlet.i.w) {
            return;
        }
        hn hn2 = ir.g(n2);
        if (hn2 != null && (hx2 = fx.b(hn2.e, n3)) != null) {
            hn2.e.removeElement(hx2);
        }
    }

    public final void a(int[] nArray) {
        hk.b().a(nArray);
        hk.b().a(this);
    }

    public final void a(Vector vector) {
        GameMidlet.k = vector;
        if (cd.b().c) {
            cd.b();
            cd.g();
            return;
        }
        this.q();
    }

    public static void a(int n2, short s2) {
        hn hn2 = ir.g(n2);
        if (hn2 == null) {
            return;
        }
        Object object = fx.a(s2);
        if (((ld)object).j == -1) {
            if (hn2.V == s2) {
                object = ir.h(hn2.w);
                if (object != null) {
                    ir.m.removeElement(object);
                    hn2.V = (short)-1;
                }
            } else {
                hn2.a(s2);
                iy.a().e(hn2.w);
            }
        } else {
            object = fx.b(hn2.e, s2);
            if (object != null) {
                hn2.e.removeElement(object);
            } else {
                hn2.b(new hx(s2));
                hn2.h();
            }
        }
        if (n2 == GameMidlet.i.w) {
            if (main.a.r == dp.b()) {
                dp.b().d();
            }
            GameMidlet.k = null;
            main.a.h();
        }
        r = false;
    }

    public final by a(Vector object, int n2, int n3, boolean bl2) {
        object = new by(kf.bJ, new eh(this, (Vector)object, n2, n3));
        if (bl2) {
            return new by(kf.c, new ee(this, (by)object));
        }
        return object;
    }

    protected final void q() {
        hn hn2 = GameMidlet.i;
        if (main.a.r == cd.a) {
            return;
        }
        dp.b().m = true;
        dp.b().a(new String[]{kf.co, kf.l}, new Vector[]{this.a(GameMidlet.k, hn2.w, 1), this.a(hn2, 0)}, null);
        dp.b().a(this.a(hn2.e, 0, 0, false), 1);
        dp.b().a(this.a(GameMidlet.k, 1, 0, true), 0);
        if (main.a.r != dp.b()) {
            dp.b().a();
        }
    }

    public final Vector a(hn hn2, int n2) {
        hn hn3 = new hn();
        new hn().x = hn2.x;
        hn3.a(hn2.a());
        hn3.w = hn2.w;
        hn3.V = hn2.V;
        hn3.W = hn2.W;
        int n3 = 0;
        while (n3 < hn2.e.size()) {
            hx hx2 = (hx)hn2.e.elementAt(n3);
            ld ld2 = fx.a(hx2.a);
            if (ld2 != null && ld2.j != 30 && ld2.j != 40) {
                hn3.a(hx2);
            }
            ++n3;
        }
        if (hn3.V != -1) {
            hx hx3 = new hx(hn3.V);
            new hx(hn3.V).b = (byte)(100 - hn3.W);
            hn3.e.addElement(hx3);
        }
        new Vector();
        Vector vector = this.a(hn3.e, hn3.w, 0);
        return vector;
    }

    public final Vector a(Vector vector, int n2, int n3) {
        Vector<fz> vector2 = new Vector<fz>();
        int n4 = 0;
        while (n4 < vector.size()) {
            int n5 = n4;
            hx hx2 = (hx)vector.elementAt(n5);
            ld ld2 = fx.a(hx2.a);
            String string = null;
            if (!(n2 != GameMidlet.i.w || fx.c((int)ld2.j) && n3 == 0)) {
                string = n3 == 1 ? kf.cs : kf.cq;
            }
            fz fz2 = new fz(this, string, new gf(this, hx2, n2, n3, n5), hx2, n5, n3);
            vector2.addElement(fz2);
            ++n4;
        }
        return vector2;
    }

    private by b(kp kp2) {
        return new fk(this, null, null, kp2);
    }

    public final void a(kp kp2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(this.b(kp2));
        dp.b().m = true;
        dp.b().a(new String[]{kf.by}, new Vector[1], vector);
        if (main.a.r != dp.b()) {
            dp.b().a();
        }
    }

    public static void a(Graphics graphics, String string, int n2, int n3, int n4) {
        graphics.drawImage(k, n2, n3 + 2, 17);
        int n5 = k.getWidth() - 4 * gy.Y;
        int n6 = n4 * n5 / 100;
        if (n6 > n5) {
            n6 = n5;
        }
        if (n6 < 0) {
            n6 = 0;
        }
        main.a.N.a(graphics, string, n2 - 32 * gy.Y, n3 + 4 * gy.Y - gy.af / 2, 1);
        n5 = n2 - 27 * gy.Y;
        je.a(n5, n3 + 4 * gy.Y - 1, n6, 4 * gy.Y, 47084, graphics);
        je.a(n5, n3 + 5 * gy.Y - 1, n6, 1 * gy.Y, 8575990, graphics);
        je.a(n5 + n6, n3 + 4 * gy.Y - 1, 1, 4 * gy.Y, 13379, graphics);
        if (!string.equals("")) {
            main.a.N.a(graphics, String.valueOf(n4), n2 + 29 * gy.Y + main.a.N.a("100"), n3 + 4 * gy.Y - gy.af / 2, 1);
        }
    }

    public static String r() {
        return String.valueOf(kf.aJ) + ": " + main.a.b(GameMidlet.i.a[0]) + kf.T;
    }

    private static void f(int n2, int n3) {
        if (n2 != n3) {
            main.a.a(String.valueOf(n3 - n2 > 0 ? "+" : "") + (n3 - n2), GameMidlet.i.aw, GameMidlet.i.ax - 40, -1, 0, -1);
        }
    }

    public final void a(int n2, kp object, hn object2, String object3, short s2, byte by2, byte by3, String string, short s3, String string2) {
        if (n2 == GameMidlet.i.w) {
            ae.f(GameMidlet.j.g, ((kp)object).g);
            ae.f(GameMidlet.j.a, ((kp)object).a);
            ae.f(GameMidlet.j.b, ((kp)object).b);
            ae.f(GameMidlet.j.e, ((kp)object).e);
            ae.f(GameMidlet.j.c, ((kp)object).c);
            ae.f(GameMidlet.j.d, ((kp)object).d);
            GameMidlet.j = object;
        }
        main.a.h();
        Object object4 = ir.g(n2);
        if (object4 != null && x) {
            Object object5;
            x = false;
            String string3 = string2;
            short s4 = s3;
            String string4 = string;
            byte by4 = by3;
            by3 = by2;
            by2 = (byte)s2;
            String string5 = object3;
            object3 = object2;
            object2 = object;
            object = object4;
            object4 = this;
            Vector vector = new Vector();
            if (((gx)object).w != GameMidlet.i.w) {
                vector = ((ae)object4).a((hn)object, 0);
            }
            Vector<Object> vector2 = new Vector<Object>();
            Object object6 = object5 = object;
            Object object7 = String.valueOf(kf.aJ) + ": " + main.a.a(GameMidlet.i.a[0], GameMidlet.i.a[2], GameMidlet.i.b, true);
            Object object8 = new bc((String)object7, main.a.N.a((String)object7));
            Object object9 = ir.h(((gx)object6).w);
            object6 = new fj(null, null, (hn)object6, (gr)object9, (bc)object8);
            ((gx)object).K = 0;
            vector2.addElement(object6);
            if (object3 != null) {
                byte by5 = by2;
                String string6 = string4;
                by2 = by4;
                byte by6 = by3;
                byte by7 = by5;
                object9 = string5;
                object8 = object3;
                object7 = object;
                object6 = object4;
                ((hn)object8).aa = ((hn)object7).aa;
                fm fm2 = new fm((ae)object6, "", null, (String)object9, (hn)object7, (hn)object8, by7, by6, by2, string6);
                vector2.addElement(fm2);
            }
            if (GameMidlet.i.w != ((gx)object5).w) {
                vector2.addElement(super.b((kp)object2));
            }
            if (main.a.r != cd.a) {
                dp.b().m = true;
                if (GameMidlet.i.w == ((gx)object5).w) {
                    if (object3 != null) {
                        dp.b().a(new String[]{kf.by, kf.a}, new Vector[2], vector2);
                        if (s4 != -1) {
                            dp.b().a(new by(string3, new fv((ae)object4, s4)), 1);
                        }
                    } else {
                        dp.b().a(new String[]{kf.by}, new Vector[1], vector2);
                    }
                } else if (object3 != null) {
                    Vector[] vectorArray = new Vector[4];
                    vectorArray[3] = vector;
                    dp.b().a(new String[]{kf.by, kf.a, kf.cd, kf.by}, vectorArray, vector2);
                    if (s4 != -1) {
                        dp.b().a(new by(string3, new fo((ae)object4, s4)), 1);
                    }
                } else {
                    Vector[] vectorArray = new Vector[3];
                    vectorArray[2] = vector;
                    dp.b().a(new String[]{kf.by, kf.cd, kf.by}, vectorArray, vector2);
                }
                if (main.a.r != dp.b()) {
                    dp.b().a();
                }
            }
        }
    }

    public final void a(String string, int n2) {
        Vector<dc> vector = new Vector<dc>();
        int n3 = 0;
        while (n3 < fx.c.size()) {
            dc dc2 = (dc)fx.c.elementAt(n3);
            if (dc2.c == n2) {
                vector.addElement(dc2);
            }
            ++n3;
        }
        Vector<fe> vector2 = new Vector<fe>();
        int n4 = 0;
        while (n4 < vector.size()) {
            n2 = n4++;
            dc dc3 = (dc)vector.elementAt(n2);
            fe fe2 = new fe(this, kf.Z, new fg(this, dc3), dc3, n2);
            vector2.addElement(fe2);
        }
        dp.b().a();
        dp.b().a(new String[]{string}, new Vector[]{vector2}, null);
    }

    protected final void a(dc dc2) {
        main.a.a(kf.aF, new fc(this, dc2));
    }

    public static void a(short s2, int n2) {
        main.a.h();
        dp.n = true;
        dc dc2 = dc.a(fx.c, s2);
        if (dc2 != null) {
            if (dc2.c == 5) {
                iy.a().e(GameMidlet.i.w);
            }
            GameMidlet.i.a(n2);
        }
    }

    public final void a(byte by2, int n2, String vectorArray, short[] objectArray, int n3, String[] stringArray) {
        if (main.a.r == dp.b()) {
            return;
        }
        ae.d(GameMidlet.i);
        if (n2 == 26) {
            if (h == null) {
                return;
            }
            ae.d(h);
        } else {
            ae.d(GameMidlet.i);
        }
        Vector<ld> vector = new Vector<ld>();
        if (by2 == 0) {
            if (objectArray == null || objectArray.length == 0) {
                by2 = 0;
                while (by2 < fx.b.length) {
                    ld ld2 = fx.b[by2];
                    if (ld2 != null && (ld2.i[0] > 0 || ld2.i[1] > 0) && n2 == ld2.k) {
                        vector.addElement(ld2);
                    }
                    by2 = (byte)(by2 + 1);
                }
            } else {
                by2 = 0;
                while (by2 < objectArray.length) {
                    vector.addElement(fx.a(objectArray[by2]));
                    by2 = (byte)(by2 + 1);
                }
            }
            if (n2 == 26) {
                Object object;
                Vector[] vectorArray2 = new Vector[6];
                int n4 = 0;
                while (n4 < 6) {
                    vectorArray2[n4] = new Vector();
                    ++n4;
                }
                int[] nArray = new int[6];
                int n5 = 0;
                while (n5 < vector.size()) {
                    ld ld3 = (ld)vector.elementAt(n5);
                    object = "";
                    if (stringArray != null && stringArray.length > 0) {
                        object = stringArray[n5];
                    }
                    vectorArray = "T\u1eb7ng";
                    if (ld3.j == 20) {
                        vectorArray2[0].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[0]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[0], n3, n2));
                        nArray[0] = nArray[0] + 1;
                    } else if (ld3.j == 10) {
                        vectorArray2[1].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[1]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[1], n3, n2));
                        nArray[1] = nArray[1] + 1;
                    } else if (ld3.j == 52 || ld3.j == 53 || ld3.j == 5) {
                        vectorArray2[2].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[2]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[2], n3, n2));
                        nArray[2] = nArray[2] + 1;
                    } else if (ld3.j == 60) {
                        vectorArray2[3].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[3]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[3], n3, n2));
                        nArray[3] = nArray[3] + 1;
                    } else if (ld3.j == 70) {
                        vectorArray2[4].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[4]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[4], n3, n2));
                        nArray[4] = nArray[4] + 1;
                    } else {
                        vectorArray2[5].addElement(new jx(this, (String)vectorArray, new gt(this, ld3, objectArray != null ? objectArray[n5] : (short)-1, n2, (String)object, n3, nArray[5]), ld3, objectArray != null ? objectArray[n5] : (short)-1, nArray[5], n3, n2));
                        nArray[5] = nArray[5] + 1;
                    }
                    ++n5;
                }
                n5 = 0;
                int n6 = 0;
                while (n6 < vectorArray2.length) {
                    if (vectorArray2[n6].size() > 0) {
                        ++n5;
                    }
                    ++n6;
                }
                String[] stringArray2 = new String[]{"\u00c1o", "Qu\u1ea7n", "Trang s\u1ee9c", "N\u00f3n", "C\u1ea7m tay", "Kh\u00e1c"};
                byte[] byArray = new byte[6];
                byArray[1] = 1;
                byArray[2] = 2;
                byArray[3] = 3;
                byArray[4] = 4;
                byArray[5] = 5;
                object = byArray;
                vectorArray = new Vector[n5];
                byte[] byArray2 = new byte[n5];
                objectArray = new String[n5];
                n3 = 0;
                int n7 = 0;
                while (n7 < vectorArray2.length) {
                    if (vectorArray2[n7].size() > 0 || n7 == 5) {
                        if (n7 == 5) {
                            int n8 = vectorArray2[5].size();
                            int n9 = 0;
                            while (n9 < q.size()) {
                                km km2 = (km)q.elementAt(n9);
                                vectorArray2[5].addElement(new ey(this, kf.bS, new ku(this, n9, km2.a), n9, km2, n8));
                                ++n9;
                            }
                        }
                        vectorArray[n3] = vectorArray2[n7];
                        byArray2[n3] = (byte)object[n7];
                        objectArray[n3] = (short)stringArray2[n7];
                        ++n3;
                    }
                    ++n7;
                }
                dp.b().a();
                dp.o = true;
                dp.b().a((String[])objectArray, vectorArray, null);
            } else {
                Vector<jx> vector2 = new Vector<jx>();
                int n10 = 0;
                while (n10 < vector.size()) {
                    ld ld4 = (ld)vector.elementAt(n10);
                    String string = "";
                    if (stringArray != null && stringArray.length > 0) {
                        string = stringArray[n10];
                    }
                    String string2 = n2 == 100 ? kf.cO : (n2 == 26 ? "T\u1eb7ng" : kf.Z);
                    vector2.addElement(new jx(this, string2, new gt(this, ld4, objectArray != null ? objectArray[n10] : (short)-1, n2, string, n3, n10), ld4, objectArray != null ? objectArray[n10] : (short)-1, n10, n3, n2));
                    ++n10;
                }
                if (vector2.size() > 0) {
                    dp.b().a();
                    dp.o = true;
                    dp.b().a(new String[]{vectorArray}, new Vector[]{vector2}, null);
                }
            }
            main.a.h();
        }
    }

    public static void b(int n2, byte by2) {
        if (n2 == GameMidlet.i.w) {
            GameMidlet.i.W = by2;
            return;
        }
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            hn2.W = by2;
        }
    }

    public final void a(int n2, int n3, String string, String[] stringArray) {
        Vector<by> vector = new Vector<by>();
        int n4 = 0;
        while (n4 < stringArray.length) {
            int n5 = n4;
            vector.addElement(new by(stringArray[n4], new ac(this, n2, n3, n5)));
            ++n4;
        }
        main.a.a(string, vector);
    }

    public static void b(int n2, short s2) {
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            hn2.X = s2;
        }
    }

    private void b(String string) {
        this.M.addElement(string);
        if (this.N == 0) {
            this.N = this.O;
        }
    }

    public final void b(Vector vector) {
        if (vector.size() == 0) {
            return;
        }
        Vector<y> vector2 = new Vector<y>();
        int n2 = 0;
        while (n2 < vector.size()) {
            bc bc2 = (bc)vector.elementAt(n2);
            vector2.addElement(new y(this, bc2.a, new aa(this, bc2), bc2));
            ++n2;
        }
        cd.b().a(vector2);
    }

    public static void a(byte by2, int n2, short s2, int n3, short s3, short s4) {
        hm hm2 = new hm(by2, s2, n3);
        hm2.a(n2, s3, s4);
        ir.m.addElement(hm2);
        ir.a(ir.l);
    }

    public static void c(int n2, int n3) {
        hm hm2;
        js js2;
        block4: {
            int n4 = 0;
            while (n4 < ir.m.size()) {
                js js3 = (js)ir.m.elementAt(n4);
                if (js3.az == 5) {
                    js3 = (hm)js3;
                    if (((hm)js3).d == n2) {
                        js2 = js3;
                        break block4;
                    }
                }
                ++n4;
            }
            js2 = hm2 = null;
        }
        if (js2 != null) {
            hm2.a(n3);
        }
    }

    public static void a(lc lc2) {
        if (ir.x == null) {
            ir.x = new Vector();
        }
        ir.x.addElement(lc2);
    }

    public static void a(int n2, Vector vector) {
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            hn2.f = vector;
            hn2.as = 0;
        }
    }

    public final void s() {
        if (!this.y) {
            return;
        }
        this.y = true;
        main.a.i();
        if (ea.b().e == 2) {
            cx.a().c((byte)-1);
            return;
        }
        byte[] byArray = new byte[7];
        byArray[1] = 13;
        byArray[2] = 20;
        byArray[3] = 9;
        byArray[4] = 23;
        byArray[5] = 11;
        byArray[6] = 17;
        byte[] byArray2 = byArray;
        bf.a().a((int)byArray2[ea.b().e], -1);
    }

    public final void t() {
        if (GameMidlet.i.d == 0) {
            if (jn.a) {
                return;
            }
            ic.b().a();
            main.a.h();
            return;
        }
        if (main.a.r != hc.d && main.a.r != dm.a) {
            main.a.J = 0;
        }
        if (!this.y) {
            cx.a().d(9);
            cx.a().c((byte)0);
            return;
        }
        int n2 = 16 * gy.Y;
        ir.y = -1;
        c.b(kf.aw);
        ht ht2 = ht.a("ct", n2, n2);
        c.a();
        Vector<kb> vector = new Vector<kb>();
        byte[] byArray = new byte[884];
        int n3 = 0;
        InputStream inputStream = aw.c(String.valueOf(kf.a()) + "/citiMap");
        try {
            int n4 = 0;
            while (n4 < 26) {
                int n5 = 0;
                while (n5 < 34) {
                    byArray[n4 * 34 + n5] = (byte)inputStream.read();
                    if (byArray[n4 * 34 + n5] == 69) {
                        kb kb2 = new kb();
                        new kb().a = (byte)n5;
                        kb2.b = (byte)n4;
                        kb2.d = (short)(n3 + 819);
                        kb2.c = kf.ez[n3];
                        vector.addElement(kb2);
                        ++n3;
                    }
                    ++n5;
                }
                ++n4;
            }
            inputStream.close();
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        ir.a = -1;
        ea.j = true;
        ea.b().a(ht2, byArray, vector, (byte)34, 16 * gy.Y, new by(kf.O, new p(this)));
        ea.b().h = new o(this);
        ea.b().e = 3;
        ea.b().a();
        main.a.h();
        if (ea.n != null && ea.o == 0 && !main.a.I) {
            ea.n.a();
            ea.o = 1;
        }
    }

    protected final void u() {
        Object object = new dx[3];
        int n2 = 0;
        while (n2 < 3) {
            object[n2] = new dx();
            object[n2].d(2);
            ++n2;
        }
        object[0].a(true);
        by by2 = new by(kf.cy, new m(this, (dx[])object));
        hi.b().a((dx[])object, kf.cx, kf.eF, by2);
        object = hi.b();
        main.a.A = object;
    }

    public static boolean a(dx[] dxArray) {
        int n2 = -1;
        int n3 = 0;
        while (n3 < 3) {
            if (dxArray[n3].f().equals("")) {
                n2 = n3;
            }
            ++n3;
        }
        if (!dxArray[1].f().equals(dxArray[2].f())) {
            n2 = 3;
        }
        if (dxArray[0].f().equals(dxArray[1].f())) {
            n2 = 4;
        }
        if (n2 != -1) {
            main.a.b(kf.er[n2]);
            return false;
        }
        return true;
    }

    public static void a(byte[] object, byte by2, byte by3, byte by4, Image image, short[] sArray, Vector vector, Vector vector2) {
        B = sArray;
        main.a.J = 0;
        b = by2;
        ir.F = vector;
        ir.G = vector2;
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream((byte[])object);
        ir.d = new short[((byte[])object).length];
        ir.e = by4;
        ir.f = (short)(((byte[])object).length / by4);
        ir.b = image;
        if (image != null) {
            object = new int[4];
            image.getRGB((int[])object, 0, 2, 0, 0, 2, 2);
            ir.s = object[0];
        }
        try {
            int n2 = 0;
            while (n2 < ir.d.length) {
                ir.d[n2] = (short)((InputStream)byteArrayInputStream).read();
                ++n2;
            }
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
        }
        if (by3 != ir.y) {
            cx.a().d(by3);
            return;
        }
        main.a.x.e();
    }

    public final void v() {
        main.a.a(kf.P, new l(this));
    }

    public static void w() {
        if (GameMidlet.i.e != null) {
            GameMidlet.i.e.removeAllElements();
        }
        ir.t = -1;
        ir.c = null;
        ir.i = 24;
        kt.a().c();
        es.b().a();
        es.b().e();
        jy.b = false;
        jy.c = 0;
        cy.d = null;
        ir.m.removeAllElements();
        GameMidlet.i = new hn();
        GameMidlet.j = new kp();
        main.a.C.removeAllElements();
        ce.a().a = null;
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 0: {
                iy.a().b(GameMidlet.i.w);
                main.a.i();
                return;
            }
            case 1: {
                ei.b().e();
                return;
            }
            case 2: {
                cx.a().h(n3);
                return;
            }
            case 3: {
                ae.b().b(GameMidlet.i, 0);
                return;
            }
            case 4: {
                ae.b().b(GameMidlet.i, 1);
            }
        }
    }

    public static void g(int n2) {
        ei.b().c = (byte)n2;
        if (GameMidlet.i.q == n2 || GameMidlet.i.q == -1) {
            Vector<by> vector = new Vector<by>();
            vector.addElement(new by(kf.df, 0));
            vector.addElement(new by(kf.dg, 1));
            le.a().a(vector, 2);
            return;
        }
        ei.b().e();
    }

    public static void d(hn hn2) {
        C = new hn();
        new hn().e = new Vector();
        ae.C.K = 0;
        ae.C.d = hn2.d;
        ae.C.v = hn2.v;
        int n2 = 0;
        while (n2 < hn2.e.size()) {
            hx hx2 = new hx();
            new hx().a = ((hx)hn2.e.elementAt((int)n2)).a;
            C.a(hx2);
            ++n2;
        }
    }

    private void b(hn hn2, int n2) {
        byte[] byArray;
        String[] stringArray;
        Vector[] vectorArray;
        ae.d(hn2);
        byte[] byArray2 = null;
        byte[] byArray3 = new byte[2];
        if (g == 3) {
            byArray3[0] = 3;
            byArray3[1] = 8;
        }
        System.out.println("typeJoin: " + g);
        switch (g) {
            case 1: 
            case 6: {
                byArray2 = new byte[]{10, 20};
                Vector[] vectorArray2 = new Vector[2];
                vectorArray = vectorArray2;
                vectorArray2[0] = new Vector();
                vectorArray[1] = new Vector();
                String[] stringArray2 = new String[2];
                stringArray = stringArray2;
                stringArray2[0] = kf.aB;
                stringArray[1] = kf.aC;
                byArray3[0] = 1;
                byArray3[1] = 6;
                byArray = new byte[2];
                break;
            }
            case 2: 
            case 7: {
                byArray2 = new byte[]{40, 50};
                Vector[] vectorArray3 = new Vector[2];
                vectorArray = vectorArray3;
                vectorArray3[0] = new Vector();
                vectorArray[1] = new Vector();
                String[] stringArray3 = new String[2];
                stringArray = stringArray3;
                stringArray3[0] = kf.aE;
                stringArray[1] = kf.aD;
                byArray = new byte[2];
                byArray3[0] = 2;
                byArray3[1] = 7;
                break;
            }
            default: {
                Vector[] vectorArray4 = new Vector[1];
                vectorArray = vectorArray4;
                vectorArray4[0] = new Vector();
                String[] stringArray4 = new String[1];
                stringArray = stringArray4;
                stringArray4[0] = kf.dy;
                byArray = new byte[1];
            }
        }
        int n3 = 0;
        while (n3 < fx.b.length) {
            if (fx.b[n3].f != -2) {
                ld ld2 = fx.b[n3];
                byte by2 = ld2.f >= 0 ? ((fa)fx.b[ld2.f]).b : ((fa)ld2).b;
                if (!(ld2 == null || ld2.i[0] <= 0 && ld2.i[1] <= 0 || hn2.d != by2 && by2 != 0 || byArray3[0] != ld2.k && byArray3[1] != ld2.k || ld2.f <= -2)) {
                    if (byArray2 == null) {
                        by2 = byArray[0];
                        vectorArray[0].addElement(new i(this, kf.O, new k(this, ld2), ld2, by2));
                        byArray[0] = (byte)(byArray[0] + 1);
                    } else {
                        by2 = 0;
                        while (by2 < vectorArray.length) {
                            if (byArray2[by2] == ld2.j) {
                                byte by3 = byArray[by2];
                                vectorArray[by2].addElement(new e(this, kf.O, new g(this, ld2), ld2, by3));
                                byte by4 = by2;
                                byArray[by4] = (byte)(byArray[by4] + 1);
                            }
                            ++by2;
                        }
                    }
                }
            }
            ++n3;
        }
        dp.b().a();
        dp.o = true;
        dp.b().a(stringArray, vectorArray, null);
        dp.g = n2;
        dp.b().i();
        main.a.h();
        if (ir.a == 57 && main.a.I) {
            main.a.D = new bb();
            main.a.D.b(dp.a);
        }
    }

    public static void a(ld ld2) {
        C = new hn();
        new hn().K = 0;
        ae.C.e = new Vector();
        boolean bl2 = false;
        int n2 = 0;
        while (n2 < GameMidlet.i.e.size()) {
            hx hx2 = new hx();
            new hx().a = ((hx)GameMidlet.i.e.elementAt((int)n2)).a;
            ld ld3 = fx.a(hx2.a);
            if (ld3.j == ld2.j) {
                hx2.a = ld2.g;
                bl2 = true;
            }
            C.a(hx2);
            ++n2;
        }
        if (!bl2) {
            hx hx3 = new hx();
            new hx().a = ld2.g;
            C.a(hx3);
            C.h();
        }
    }

    public static void h(int n2) {
        ae.b(fx.a((short)n2));
    }

    public static void b(ld ld2) {
        main.a.a(ld2.i[0], ld2.i[1], new at(ld2), new ar(ld2), null);
    }

    public static void a(short s2, String object, int n2, int n3, int n4) {
        main.a.b((String)object);
        GameMidlet.i.a(n2);
        GameMidlet.i.c(n3);
        GameMidlet.i.b = n4;
        object = fx.a(s2);
        if (((ld)object).f != -2) {
            hx hx2 = fx.a(((ld)object).j, GameMidlet.i.e);
            if (hx2 != null) {
                hx2.a = s2;
            } else if (((ld)object).j == -1 && GameMidlet.i.V != -1) {
                GameMidlet.i.a(s2);
                iy.a().e(GameMidlet.i.w);
            } else {
                GameMidlet.i.a(new hx(s2));
                GameMidlet.i.h();
            }
            GameMidlet.i.e(11);
            if (((ld)object).j == -1 && GameMidlet.i.V == -1) {
                GameMidlet.i.j();
                iy.a().e(GameMidlet.i.w);
            }
        }
        GameMidlet.k = null;
    }

    public static void x() {
        bf.a().a((int)b, -1);
        g = (byte)-1;
    }

    public final void y() {
        this.d(3, -1);
    }

    public final void a(byte by2, Vector vector, Vector vector2, Vector object) {
        byte[] byArray = new byte[]{59, 60, 58, 104, 105, 101, 102};
        ir.F = vector2;
        ir.G = object;
        main.a.x.e(byArray[by2]);
        if (vector2 != null) {
            ir.d();
        }
        int n2 = 0;
        while (n2 < vector.size()) {
            object = (js)vector.elementAt(n2);
            if (((js)object).az == 0) {
                object = (hn)object;
                v0.C = ((js)object).aw;
                ((gx)object).D = ((js)object).ax;
                ((hn)object).t = ((gx)object).K;
                ((hn)object).h();
                if (((gx)object).w != GameMidlet.i.w) {
                    ae.e((hn)object);
                    ir.b((hn)object);
                }
            } else if (((js)object).az == 5) {
                object = (hm)object;
                v1.b = ((js)object).aw;
                ((hm)object).c = ((js)object).ax;
                ir.m.addElement(object);
            }
            ++n2;
        }
        if (ca.b) {
            ae.a(ca.a.a, ca.a.b, GameMidlet.i.K, GameMidlet.i.N);
        } else {
            ++GameMidlet.i.ax;
            this.n();
        }
        ae.b(GameMidlet.i.S);
        if (main.a.I && byArray[by2] == 101) {
            main.a.D = new bb();
            main.a.D.e();
        }
    }

    public static void i(int n2) {
        D = n2;
        G = ir.a;
        ae.b().n();
        cx.a().d(8);
        main.a.i();
    }

    public final void e(int n2, int n3) {
        Object object;
        int n4;
        Object object2;
        if (main.a.r == dp.a) {
            dp.b().d();
        }
        System.out.println("onWeddingStart 1111111111111");
        main.a.J = 1;
        E = n2;
        F = n3;
        t = true;
        this.K = 0;
        int n5 = 0;
        while (n5 < p.size() - 1) {
            object2 = (dr)p.elementAt(n5);
            n4 = n5 + 1;
            while (n4 < p.size()) {
                object = (dr)p.elementAt(n4);
                if (((dr)object2).e > ((dr)object).e) {
                    p.setElementAt(object, n5);
                    p.setElementAt(object2, n4);
                    object2 = object;
                }
                ++n4;
            }
            ++n5;
        }
        n5 = 0;
        while (n5 < ir.m.size() - 1) {
            object2 = (js)ir.m.elementAt(n5);
            if (((js)object2).az == 0) {
                n4 = n5 + 1;
                while (n4 < ir.m.size()) {
                    object = (js)ir.m.elementAt(n4);
                    if (((js)object).az == 0 && ((hn)object2).w > ((hn)object).w) {
                        ir.m.setElementAt(object, n5);
                        ir.m.setElementAt(object2, n4);
                        object2 = object;
                    }
                    ++n4;
                }
            }
            ++n5;
        }
        n5 = 0;
        while (n5 < ir.m.size()) {
            object2 = (js)ir.m.elementAt(n5);
            if (((js)object2).az == 0) {
                hn hn2 = (hn)object2;
                hn2.g.removeAllElements();
                if (hn2.w == n3) {
                    hn2.C = 0;
                    hn2.aw = 0;
                    hn2.ax = hn2.D = 8 * ir.i + ir.i / 2 - ir.i / 2;
                    hn2.G = 2;
                    this.K = 1;
                    hn2.f(2475, 20);
                    hn2.f(2476, 10);
                    hn2.f(300, 60);
                    hn2.f(302, 70);
                    hn2.h();
                } else if (hn2.w == n2) {
                    hn2.C = 0;
                    hn2.aw = 0;
                    hn2.ax = hn2.D = 8 * ir.i + ir.i / 2 + ir.i / 2;
                    hn2.G = 2;
                    this.K = 1;
                    hn2.f(2477, 20);
                    hn2.f(2478, 10);
                    hn2.h();
                }
            }
            ++n5;
        }
        hn hn3 = ir.g(n2);
        object2 = ir.g(n3);
        ir.m.removeElement(hn3);
        ir.m.removeElement(object2);
        int n6 = 0;
        int n7 = 0;
        while (n7 < ir.m.size()) {
            js js2 = (js)ir.m.elementAt(n7);
            if (js2.az == 0) {
                js2 = (hn)js2;
                if (((gx)js2).w != -100) {
                    dr dr2 = (dr)p.elementAt(n6 / 2);
                    main.a.h = main.a.j = dr2.a - do.a().a + ir.i / 2;
                    main.a.i = main.a.k = dr2.b - do.a().b + ir.i / 2 + n7 % 2 * (ir.i - 5);
                    ++n6;
                    ((gx)js2).a(main.a.h + do.a().a, main.a.i + do.a().b);
                }
            }
            ++n7;
        }
        ir.m.addElement(hn3);
        ir.m.addElement(object2);
        ir.a(ir.m);
        main.a.h();
        System.out.println("onWeddingStart 2222222222222222222: " + t + "     " + this.K);
    }
}


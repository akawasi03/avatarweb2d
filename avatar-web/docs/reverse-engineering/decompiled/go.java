/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.InputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class go
extends hj {
    public static go a;
    public static int b;
    private String ay;
    public static Vector c;
    private static Vector az;
    public static Vector d;
    public static Vector e;
    public static Vector f;
    public static Vector g;
    public static Vector h;
    public static Vector i;
    public static Vector[] j;
    public static Image[] k;
    public static String l;
    public static Image m;
    public static Image n;
    public static Image o;
    public static ht p;
    public static ht q;
    public static ht r;
    public static ht s;
    public static ht t;
    public static ht u;
    public dr[] v;
    private Vector aA;
    public static int w;
    public static int x;
    private byte[] aB = new byte[]{33, 34, 35, 36, 37};
    private byte[] aC = new byte[]{33, 120, 121, 122, 123};
    private Vector aD = new Vector();
    public static boolean y;
    public static boolean z;
    public static dr A;
    public static dr B;
    public static dr C;
    public static dr D;
    public static byte E;
    public static byte F;
    private dr aE;
    private int aF;
    private static int aG;
    private static int aH;
    public static int G;
    public static int H;
    private int aI;
    private long aJ;
    private long aK;
    private static int aL;
    public static boolean I;
    private static boolean aM;
    private static final byte[][] aN;
    private static by aO;
    private static by aP;
    private static by aQ;
    private static by aR;
    private static by aS;
    private static by aT;
    public static kc J;
    private by aU;
    private by aV;
    public Vector K = new Vector();
    private boolean aW = false;
    private boolean aX = false;
    public static int L;
    ai M;
    private long aY = -1L;
    public static boolean N;
    private boolean aZ;
    private Vector ba = new Vector();
    private boolean bb = false;
    private int bc = 0;
    public static byte O;
    public static byte P;
    public static byte Q;
    public static boolean R;
    public static int S;
    public static int T;
    public static int U;
    public static short V;
    private static int bd;
    private static String be;
    private boolean bf = true;
    private int bg = 0;
    public static int W;
    public static int X;

    static {
        az = new Vector();
        d = new Vector();
        e = new Vector();
        i = new Vector();
        j = new Vector[2];
        y = false;
        z = false;
        E = (byte)-1;
        aG = 12;
        aH = 4;
        G = -1;
        H = -1;
        aL = 0;
        I = false;
        aM = false;
        byte[][] byArrayArray = new byte[5][];
        byte[] byArray = new byte[10];
        byArray[5] = 1;
        byArray[6] = 1;
        byArray[7] = 1;
        byArray[8] = 1;
        byArray[9] = 1;
        byArrayArray[0] = byArray;
        byArrayArray[1] = new byte[]{2, 2, 2, 2, 2, 3, 3, 3, 3, 3};
        byArrayArray[2] = new byte[]{4, 4, 4, 4, 4, 5, 5, 5, 5, 5};
        byArrayArray[3] = new byte[]{6, 6, 6, 6, 6, 7, 7, 7, 7, 7};
        byArrayArray[4] = new byte[]{8, 8, 8, 8, 8, 9, 9, 9, 9, 9};
        aN = byArrayArray;
        L = -1;
        N = false;
        R = false;
        S = -1;
        T = -1;
        V = 0;
        bd = -1;
        be = "";
    }

    public static go b() {
        if (a == null) {
            a = new go();
        }
        return a;
    }

    public final void a() {
        super.a();
    }

    public static void e() {
        I = false;
        aM = false;
        if (t != null) {
            return;
        }
        c.b(kf.au);
        m = c.a("buyLand");
        t = ht.a("cut", 24 * gy.Y, 24 * gy.Y);
        p = ht.a("vp", 16 * gy.Y, 16 * gy.Y);
        Image[] imageArray = new Image[2];
        k = imageArray;
        imageArray[0] = c.a("w");
        go.k[1] = c.a("g");
        q = ht.a("wg", 13 * gy.Y, 9 * gy.Y);
        r = ht.a("m", 27 * gy.Y, 17 * gy.Y);
        s = ht.a("tc", 13 * gy.Y, 13 * gy.Y);
        o = c.a("focus");
        c.a();
    }

    public final void c() {
        aO = new by(kf.O, 0);
        aP = new by(kf.c, 7);
        aQ = new by(null, 2);
        aR = new by(null, 3);
        this.ac = aP;
    }

    public go() {
        go.j[0] = new Vector();
        go.j[1] = new Vector();
        this.c();
        c.b(kf.au);
        n = c.a("coin");
        u = ht.a("iB", 9 * gy.Y, 13 * gy.Y);
        c.a();
        this.r();
        go.e();
        aS = new by(kf.cy, 8);
        aT = new by(kf.bz, 9);
        this.aU = new by(kf.bz, 16, this);
        this.aV = new by(kf.d, 18, this);
    }

    private void q() {
        Vector<hg> vector = new Vector<hg>();
        int n2 = 0;
        while (n2 < d.size()) {
            dc dc2 = (dc)d.elementAt(n2);
            az az2 = go.b(dc2.a);
            if (az2.e == 5 && (az2.d == 4 || az2.d == 101)) {
                vector.addElement(new hg(this, az2.f, new bx(this, dc2), az2));
            }
            ++n2;
        }
        go.a(vector);
    }

    private void r() {
        this.K.addElement(ae.b().f);
        by by2 = new by(kf.x, 20);
        this.K.addElement(by2);
    }

    private void s() {
        Vector<bz> vector = new Vector<bz>();
        int n2 = 0;
        while (n2 < az.size()) {
            int n3 = n2;
            dc dc2 = (dc)az.elementAt(n3);
            if (gb.b((int)dc2.a) != null) {
                vector.addElement(new bz(this, String.valueOf(dc2.f) + "(" + dc2.e + ")", 7, n2, dc2));
            }
            ++n2;
        }
        go.a(vector);
    }

    public final void d() {
        main.a.i();
        cx.a().d(8);
    }

    /*
     * Unable to fully structure code
     */
    private void t() {
        block9: {
            var1_1 = this.j(go.A.a, go.A.b);
            if (var1_1 - go.c.size() == 0) {
                main.a.i();
                it.a().b(go.b);
                return;
            }
            if (var1_1 < 0 || var1_1 >= go.c.size()) break block9;
            var1_2 = (cf)go.c.elementAt(var1_1);
            if (var1_2.q == 5) {
                this.u();
                return;
            }
            if (var1_2.c != -1 || (var1_2.p != 1 || var1_2.o != this.aB[1]) && (var1_2.p != 2 || var1_2.o != this.aC[1])) ** GOTO lbl35
            var1_2 = this;
            if (go.az.size() == 0) {
                main.a.b(kf.dF);
            } else {
                if (go.E == -1) {
                    var2_3 = new Vector<by>();
                    var3_4 = super.j(go.A.a, go.A.b);
                    var4_5 = (cf)go.c.elementAt(var3_4);
                    var5_6 = null;
                    if (var3_4 > 0) {
                        var5_6 = (cf)go.c.elementAt(var3_4 - 1);
                    }
                    var6_7 = 0;
                    while (var6_7 < go.az.size()) {
                        var7_9 = var6_7;
                        var7_8 = (dc)go.az.elementAt(var7_9);
                        if (gb.b((int)var7_8.a) != null) {
                            var2_3.addElement(new bn((go)var1_2, String.valueOf(var7_8.f) + "(" + var7_8.e + ")", 5, var6_7, var7_8));
                        }
                        ++var6_7;
                    }
                    if (go.b == GameMidlet.i.w && (var4_5.p == 1 && var3_4 == 0 || var3_4 > 0 && var4_5.p < var5_6.p)) {
                        var2_3.addElement(new bp((go)var1_2, kf.g, 11));
                    }
                    go.a(var2_3);
                }
                return;
lbl35:
                // 1 sources

                this.a((cf)var1_2);
            }
        }
    }

    public static void a(String string) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.C, 51));
        vector.addElement(new by(kf.D, 52));
        vector.addElement(main.a.ad);
        main.a.a(string, vector);
    }

    private void a(ii ii2) {
        if (E != -1) {
            this.aD.addElement(ii2);
            return;
        }
        ii2.a();
    }

    private boolean h(int n2, int n3) {
        boolean bl2 = false;
        int n4 = 0;
        while (n4 < d.size()) {
            Object object = (dc)d.elementAt(n4);
            object = go.b(((dc)object).a);
            if (((az)object).d == 0 && ((az)object).e == n3) {
                this.a(new bs(this, (az)object, n2));
                bl2 = true;
                break;
            }
            ++n4;
        }
        if (!bl2) {
            main.a.b(kf.dG);
        }
        return bl2;
    }

    private void a(cf cf2) {
        int n2 = this.j(go.A.a, go.A.b);
        Vector<by> vector = (cf)c.elementAt(n2);
        Object object = null;
        if (n2 > 0) {
            object = (cf)c.elementAt(n2 - 1);
        }
        Object object2 = null;
        if (b == GameMidlet.i.w && (((cf)((Object)vector)).p == 1 && n2 == 0 || n2 > 0 && ((cf)((Object)vector)).p < ((cf)object).p)) {
            object2 = new bv(this, kf.g, 11);
        }
        if (cf2.c != -1 && cf2.q < 6 && cf2.o == 36) {
            this.a(new bg(this));
        }
        if (cf2.c == -1 || cf2.q >= 6) {
            vector = new bi(this, cf2);
            if (object2 != null) {
                Vector<by> vector2 = new Vector<by>();
                vector2.addElement(new bk(this, kf.be, (ii)((Object)vector)));
                vector2.addElement((by)object2);
                go.a(vector2);
                return;
            }
            this.a((ii)((Object)vector));
        }
        if (cf2.c != -1 && cf2.q < 6 && n2 < c.size() && d.size() > 0) {
            if (cf2.j) {
                this.h(n2, 7);
            } else if (cf2.k) {
                this.h(n2, 3);
            } else if (cf2.n < 80) {
                this.h(n2, 2);
            }
        }
        if (E == -1) {
            vector = new Vector<by>();
            em em2 = new em(this, kf.bd, 1);
            vector.addElement(em2);
            if (b == GameMidlet.i.w) {
                vector.addElement(new et(this, kf.be, new en(this, cf2)));
            }
            if (object2 != null) {
                vector.addElement((by)object2);
            }
            int n3 = 0;
            while (n3 < d.size()) {
                object = (dc)d.elementAt(n3);
                object2 = go.b(((dc)object).a);
                if (((az)object2).d == 0 && (((az)object2).e == 3 && cf2.k || ((az)object2).e == 7 && cf2.j || ((az)object2).e != 3 && ((az)object2).e != 7)) {
                    object = String.valueOf(((az)object2).f) + "(" + ((dc)object).e + ")";
                    vector.addElement(new hg(this, (String)object, 6, n3, (az)object2));
                }
                ++n3;
            }
            go.a(vector);
        }
    }

    public static void a(Vector vector) {
        int n2 = ir.i * gy.Y;
        if (main.a.H) {
            n2 += n2 / 3;
        }
        le.a().a(vector, main.a.o, n2, n2);
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                main.a.a(kf.ei, 1, this);
                return;
            }
            case 1: {
                it.a().d((short)-1);
                dp.b().d();
                return;
            }
            case 2: {
                dp.b().d();
                if (U == 0) {
                    it it2 = it.a();
                    it2.e((byte)92);
                    it2.k();
                    return;
                }
                it.a().e(0);
                return;
            }
            case 3: {
                it.a().f(1, 0);
                return;
            }
            case 4: {
                it.a().f(1, 1);
                return;
            }
            case 5: {
                it.a().g(1, 0);
                return;
            }
            case 6: {
                it.a().g(1, 1);
                return;
            }
            case 7: {
                it.a().c(1);
                return;
            }
            case 8: {
                it.a().d(1);
                return;
            }
            case 9: {
                it.a().h(1, 1);
                return;
            }
            case 10: {
                it.a().h(1, 2);
                return;
            }
            case 11: {
                it.a().e(1);
                return;
            }
            case 12: {
                main.a.a(kf.dH, new eu(this));
                return;
            }
            case 13: {
                it.a().i(1, 1);
                return;
            }
            case 14: {
                it.a().i(1, 2);
                return;
            }
            case 15: {
                cy.b().b(true);
                return;
            }
            case 16: {
                it.a().f(0);
                return;
            }
            case 17: {
                it it3 = it.a();
                it3.e((byte)95);
                it3.k();
                return;
            }
            case 18: {
                go.b().j();
                return;
            }
            case 19: {
                it it4 = it.a();
                it4.e((byte)98);
                it4.k();
                return;
            }
            case 20: {
                aM = true;
                this.ac = null;
            }
        }
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                this.a((byte)1, G);
                return;
            }
            case 2: {
                if (ir.p == null) break;
                main.a.h();
                it.a().d(b, ((gx)ir.p).w);
                return;
            }
            case 3: {
                if (ir.p == null) break;
                Object object = go.e(((gx)ir.p).w);
                ad ad2 = gb.c(((ai)object).k);
                int n4 = 0;
                while (n4 < d.size()) {
                    if (n3 == n4) {
                        object = (dc)d.elementAt(n4);
                        this.a((dc)object, ad2.c == 1 ? 0 : 1);
                    }
                    ++n4;
                }
                return;
            }
            case 4: {
                if (ir.p == null) break;
                n2 = 0;
                while (n2 < d.size()) {
                    if (n3 == n2) {
                        dc dc2 = (dc)d.elementAt(n2);
                        az az2 = go.b(dc2.a);
                        this.a(az2, dc2.a, (ai)ir.p);
                    }
                    ++n2;
                }
                return;
            }
            case 5: {
                n2 = 0;
                while (n2 < az.size()) {
                    if (n2 == n3) {
                        int n5 = this.j(go.A.a, go.A.b);
                        if (n5 >= c.size()) {
                            return;
                        }
                        go.i(n2, n5);
                    }
                    ++n2;
                }
                return;
            }
            case 6: {
                n2 = 0;
                while (n2 < d.size()) {
                    if (n2 == n3) {
                        Object object = (dc)d.elementAt(n2);
                        if (((dc)object).e > 0) {
                            Object object2 = object;
                            object = this;
                            int n6 = ((go)object).j(go.A.a, go.A.b);
                            if (n6 < c.size() && d.size() != 0) {
                                object2 = go.b(((dc)object2).a);
                                byte by2 = ((az)object2).e;
                                if (by2 != 7) {
                                    if (by2 == 1) {
                                        super.a((byte)2, (int)((az)object2).a);
                                    } else {
                                        super.a(by2, (int)((az)object2).a);
                                    }
                                }
                                it.a().b(b, n6, ((az)object2).a);
                            }
                        } else {
                            main.a.b(String.valueOf(kf.bf) + ((dc)object).f);
                        }
                    }
                    ++n2;
                }
                return;
            }
            case 7: {
                this.h(n3);
                return;
            }
            case 8: {
                this.a(5, -1);
                this.s();
                return;
            }
            case 9: {
                this.aX = true;
                this.h(0);
                return;
            }
            case 10: {
                y = true;
                n2 = this.bg;
                while (n2 < i.size()) {
                    boolean bl2;
                    Object object = (ai)i.elementAt(n2);
                    ai ai2 = object;
                    object = this;
                    if (ai2.j[1]) {
                        ir.p = ai2;
                        do.a().a(ai2.aw * gy.Y, ai2.ax * gy.Y);
                        do.g = true;
                        ((gy)object).ad = new by(kf.dU, new s((go)object, ai2));
                        ((gy)object).ac = aS;
                        ((gy)object).ae = aT;
                        bl2 = true;
                    } else if (ai2.j[0]) {
                        ir.p = ai2;
                        do.a().a(ai2.aw * gy.Y, ai2.ax * gy.Y);
                        do.g = true;
                        ((gy)object).ad = new by(kf.dU, new z((go)object, ai2));
                        ((gy)object).ac = aS;
                        ((gy)object).ae = aT;
                        bl2 = true;
                    } else if (ai2.i && !(ai2 instanceof dz) && !(ai2 instanceof dt)) {
                        ir.p = ai2;
                        do.a().a(ai2.aw * gy.Y, ai2.ax * gy.Y);
                        do.g = true;
                        ((gy)object).ad = new by(kf.dX, new ab((go)object, ai2));
                        ((gy)object).ac = aS;
                        ((gy)object).ae = aT;
                        bl2 = true;
                    } else if (ai2.h < 50) {
                        ir.p = ai2;
                        do.a().a(ai2.aw * gy.Y, ai2.ax * gy.Y);
                        do.g = true;
                        ((gy)object).ad = new by(kf.dZ, new w((go)object, ai2));
                        ((gy)object).ac = aS;
                        ((gy)object).ae = aT;
                        bl2 = true;
                    } else {
                        bl2 = false;
                    }
                    if (bl2) {
                        return;
                    }
                    ++this.bg;
                    ++n2;
                }
                this.a(8, -1);
                main.a.b(kf.dI);
                return;
            }
            case 11: {
                it.a().h(0, 0);
                return;
            }
            case 12: {
                it it2 = it.a();
                it2.e((byte)85);
                it2.k();
                return;
            }
            case 13: {
                if (go.J.e > 0) {
                    it.a().d(0);
                    return;
                }
                it.a().c(0);
                return;
            }
            case 14: {
                it it3 = it.a();
                it3.e((byte)87);
                it3.k();
                return;
            }
            case 20: {
                this.d();
            }
        }
    }

    private void h(int n2) {
        H = 0;
        this.ac = new by(kf.cy, 5);
        this.ae = null;
        do.g = true;
        this.ad = null;
        this.aW = true;
        L = n2;
    }

    private void a(az az2, short s2, ai ai2) {
        this.a(new ep(this, az2, s2, ai2));
    }

    protected final void a(dc dc2, int n2) {
        int n3 = GameMidlet.i.K == 0 ? 1 : -1;
        int n4 = j[n2].size();
        if (dc2.e - n4 <= 0) {
            main.a.b(kf.bw);
            return;
        }
        int n5 = 0;
        while (n5 < 3 && n5 < dc2.e - n4) {
            int n6;
            dn dn2 = new dn(GameMidlet.i.aw, GameMidlet.i.ax - 40);
            az az2 = go.b(dc2.a);
            dn2.j = dc2.a;
            dn2.e = 2;
            dn2.d = 2;
            dn2.b = -(4 + aw.e(3));
            dn2.c = n3 * (2 + aw.e(3));
            dn2.g = GameMidlet.i.ax - 20 + aw.e(4) * 5;
            if (az2.d == 4 && ir.d[n6 = ir.d(GameMidlet.i.aw, GameMidlet.i.ax + 23)] == 14) {
                dn2.g = 50 + aw.e(50);
                dn2.c = n3 * aw.e(3);
            }
            dn2.a = new ft(this, dn2);
            j[n2].addElement(dn2);
            ir.n.addElement(dn2);
            ++n5;
        }
    }

    public static void a(int n2, int n3, cf cf2, ai ai2) {
        if (ir.a != 25 && n2 != n3) {
            int n4;
            int n5;
            String string = "";
            if (n3 - n2 > 0) {
                string = String.valueOf(string) + "+";
            }
            if (cf2 != null) {
                n5 = cf2.a * ir.i + ir.i / 2;
                n4 = cf2.b * ir.i - ir.i / 2;
            } else {
                n5 = ai2.aw;
                n4 = ai2.ax - 30;
            }
            main.a.a(String.valueOf(string) + (n3 - n2), n5, n4, -1, 0, -1);
        }
    }

    private void u() {
        if (GameMidlet.i.w != b) {
            return;
        }
        int n2 = this.j(go.A.a, go.A.b);
        GameMidlet.i.getClass();
        it.a().a(b, n2);
    }

    private static void i(int n2, int n3) {
        if (main.a.I) {
            bb.g();
        }
        dc dc2 = (dc)az.elementAt(n2);
        it.a().a(b, n3, (int)dc2.a);
    }

    private int j(int n2, int n3) {
        int n4 = 0;
        while (n4 < this.v.length) {
            int n5 = 0;
            while (n5 < aG) {
                int n6 = this.v[n4].a + n5 / aH;
                int n7 = this.v[n4].b + n5 % aH;
                if (n2 == n6 && n3 == n7) {
                    return n4 * aG + n5;
                }
                ++n5;
            }
            ++n4;
        }
        return -1;
    }

    private void a(byte by2, int n2) {
        G = n2;
        E = by2;
        GameMidlet.i.Q = -1;
        GameMidlet.i.i = -1;
        GameMidlet.i.j = -1;
        this.aE = E == 4 ? new dr(ir.p.aw / ir.i, ir.p.ax / ir.i) : new dr(go.A.a, go.A.b);
        GameMidlet.i.D = this.aE.b * ir.i + ir.i / 2;
        GameMidlet.i.C = this.aE.a * ir.i;
        if (GameMidlet.i.K == gx.J) {
            GameMidlet.i.C += ir.i;
        }
    }

    private void v() {
        int n2 = 0;
        while (n2 < this.v.length) {
            int n3 = 0;
            while (n3 < aG) {
                int n4 = this.v[n2].a + n3 / aH;
                int n5 = this.v[n2].b + n3 % aH;
                if (n2 * aG + n3 < c.size()) {
                    ir.a(n4, n5, (byte)51);
                    cf cf2 = (cf)c.elementAt(n2 * aG + n3);
                    ((cf)c.elementAt(n2 * aG + n3)).e = (short)(n2 * aG + n3);
                    cf2.a = n4;
                    cf2.b = n5;
                    cf2.aw = n4 * ir.i + ir.i / 2;
                    cf2.ax = n5 * ir.i + 18;
                    this.c(n2 * aG + n3);
                    ir.l.addElement(cf2);
                } else {
                    if (n2 * aG + n3 == c.size()) {
                        ir.l.addElement(new cc(-3, n4 * ir.i + 20, n5 * ir.i + 20, m.getWidth()));
                        ir.a(n4, n5, (byte)51);
                        ir.a(ir.l);
                    }
                    if (ir.d[n5 * ir.e + n4] == this.aB[0]) {
                        ir.a(ir.l);
                        return;
                    }
                    if (n4 == this.v[n2].a && n5 == this.v[n2].b) {
                        ir.d[n5 * ir.e + n4] = 4;
                    }
                }
                ++n3;
            }
            ++n2;
        }
        ir.a(ir.l);
    }

    /*
     * Unable to fully structure code
     */
    public final void k() {
        this.aF += 2;
        if (this.aF >= 10) {
            this.aF = 0;
        }
        if (go.E != -1) {
            go.F = go.aN[go.E][this.aF];
            ++this.aI;
            if (this.aI > 10) {
                this.aI = 0;
                this.w();
            }
        }
        var1_1 = this;
        if (ir.a == 24 && ir.a == 53 && (System.currentTimeMillis() - var1_1.aJ) / 1000L > 300L) {
            var1_1.aJ = System.currentTimeMillis();
            var1_1.b(go.b, true);
        }
        main.a.x.b();
        if (!go.y && !go.N && go.L == -1) {
            this.y();
        }
        var1_1 = this;
        if (go.E == -1 || var1_1.aY != -1L || GameMidlet.i.H != 0) ** GOTO lbl40
        var1_1.aY = System.currentTimeMillis() / 100L;
        var2_3 = -1;
        if (var1_1.aE != null) {
            var2_3 = var1_1.j(var1_1.aE.a, var1_1.aE.b);
        }
        if (go.E == 4) {
            var2_3 = 0;
        }
        GameMidlet.i.K = var1_1.aE.a * ir.i < GameMidlet.i.aw ? gx.J : 0;
        GameMidlet.i.t = GameMidlet.i.K;
        if (var1_1.M != null) {
            var1_1.M.p = false;
            var1_1.M = null;
        }
        if (var2_3 == -1) {
            var1_1.w();
        } else {
            var2_4 = new cc(-2, GameMidlet.i.aw, GameMidlet.i.ax - 5, go.t.a);
            ir.l.addElement(var2_4);
            var3_8 = 0;
            if (go.E == 0) {
                var3_8 = 5;
                var2_4.ax = GameMidlet.i.ax - 8;
            }
            var2_4.aw = GameMidlet.i.K == 0 ? GameMidlet.i.aw + 10 + var3_8 : GameMidlet.i.aw - 10 - var3_8;
lbl40:
            // 2 sources

            if (var1_1.aY != -1L && (go.E == 1 || go.E == 0 || go.E == 2) && System.currentTimeMillis() / 100L - var1_1.aY > 2L) {
                var1_1.aY = System.currentTimeMillis() / 100L;
                if (GameMidlet.i.H == 6) {
                    GameMidlet.i.b((byte)0);
                } else {
                    GameMidlet.i.b((byte)6);
                }
            }
        }
        if ((ir.a == 24 || ir.a == 53) && go.i.size() > 0 && ++go.aL > 250) {
            go.aL = 0;
            var2_5 = aw.e(go.i.size());
            var2_6 = (ai)go.i.elementAt(var2_5);
            var3_9 = "";
            if (var2_6.j[0]) {
                var3_9 = String.valueOf(var3_9) + kf.bi;
            }
            if (var2_6.j[1]) {
                if (!var3_9.equals("")) {
                    var3_9 = String.valueOf(var3_9) + ", ";
                }
                var3_9 = String.valueOf(var3_9) + kf.bj;
            }
            if (var2_6.i) {
                if (!var3_9.equals("")) {
                    var3_9 = String.valueOf(var3_9) + ", ";
                }
                var3_9 = String.valueOf(var3_9) + kf.bk;
            }
            if (var2_6.h < 20) {
                if (!var3_9.equals("")) {
                    var3_9 = String.valueOf(var3_9) + ", ";
                }
                var3_9 = String.valueOf(var3_9) + kf.bl;
            }
            if (!var3_9.equals("")) {
                var2_6.O = new fh(25, var3_9, 0);
                var2_6.O.a(var2_6.aw, var2_6.ax - 45);
            }
        }
        if (System.currentTimeMillis() / 1000L - this.aK / 1000L >= 1L) {
            if (go.U > 0) {
                --go.U;
            }
            this.aK = System.currentTimeMillis();
            var1_2 = 0;
            while (var1_2 < go.c.size()) {
                var2_7 = (cf)go.c.elementAt(var1_2);
                if (var2_7.c != -1 && var2_7.q < 5) {
                    ++var2_7.h;
                    var3_10 = gb.b(var2_7.c);
                    var4_11 = (long)(var3_10.e * 60 * 60) - var2_7.h;
                    if (var4_11 <= 0L) {
                        var2_7.q = 5;
                    }
                }
                ++var1_2;
            }
        }
    }

    private void w() {
        cc cc2;
        int n2;
        block13: {
            n2 = 0;
            while (n2 < ir.l.size()) {
                cc2 = (cc)ir.l.elementAt(n2);
                if (cc2.f == -2) {
                    ir.l.removeElementAt(n2);
                    if (n2 > 0) {
                        --n2;
                    }
                }
                ++n2;
            }
            this.aY = -1L;
            n2 = -1;
            if (this.aE != null) {
                int n3;
                int n4 = this.aE.b;
                n2 = this.aE.a;
                int n5 = c.size();
                int n6 = 0;
                while (n6 < n5) {
                    cf cf2 = (cf)c.elementAt(n6);
                    if (cf2.a == n2 && cf2.b == n4) {
                        n3 = n6;
                        break block13;
                    }
                    ++n6;
                }
                n3 = n2 = -1;
            }
        }
        if (n2 == -1) {
            E = (byte)-1;
            GameMidlet.i.H = 0;
            GameMidlet.i.Q = 0;
            this.x();
            return;
        }
        if (G == -1) {
            cc2 = (cf)c.elementAt(n2);
            switch (E) {
                case 0: {
                    this.a((cf)cc2, 1);
                    ((cf)cc2).q = 0;
                    ir.d[((cf)cc2).b * ir.e + ((cf)cc2).a] = ((cf)cc2).o;
                    if (((cf)cc2).c != -1) {
                        it.a().a(b, n2, -1);
                    }
                    ((cf)cc2).c = -1;
                    if (!main.a.I) break;
                    bb.g();
                    break;
                }
                case 1: {
                    this.a((cf)cc2, 4);
                    ((cf)cc2).i = false;
                    ir.d[((cf)cc2).b * ir.e + ((cf)cc2).a] = ((cf)cc2).o;
                    it.a().b(b, n2, 100);
                }
            }
        }
        G = -1;
        this.aE = null;
        E = (byte)-1;
        GameMidlet.i.Q = 0;
        GameMidlet.i.H = 0;
        this.x();
    }

    private void x() {
        if (y) {
            this.d(10, -1);
            return;
        }
        if (this.aD.size() > 0) {
            ii ii2 = (ii)this.aD.elementAt(0);
            ii2.a();
            this.aD.removeElement(ii2);
            return;
        }
        if (this.aX) {
            this.A();
        }
    }

    private void y() {
        block14: {
            block13: {
                boolean bl2;
                if (ir.a == 25) {
                    return;
                }
                int n2 = GameMidlet.i.K == gx.J ? GameMidlet.i.aw - 23 : GameMidlet.i.aw + 23;
                int n3 = GameMidlet.i.ax / ir.i;
                int n4 = ir.g[n3 * ir.e + (n2 /= ir.i)];
                int n5 = this.j(n2, n3);
                if (n4 == 51 && n5 <= c.size()) {
                    go.A.a = n2;
                    go.A.b = n3;
                    if (E != 0 && E != 1) {
                        this.ad = aO;
                        return;
                    }
                    this.ad = null;
                    return;
                }
                if (this.ad == aO || this.ad == aR) {
                    this.ad = null;
                }
                go.A.a = -1;
                go.A.b = -1;
                if (ir.p != null) break block13;
                go go2 = this;
                n3 = ir.d(GameMidlet.i.aw + 12, GameMidlet.i.ax);
                n4 = ir.d(GameMidlet.i.aw, GameMidlet.i.ax + 12);
                if (ir.d[n3] == 100 && GameMidlet.i.K == 0 || ir.d[n4] == 14) {
                    go2.ad = aR;
                    bl2 = true;
                } else {
                    go2.ad = null;
                    bl2 = false;
                }
                if (bl2) break block14;
            }
            if (ir.p != null && this.ad == null) {
                if (this.ae == null) {
                    this.ae = ir.q;
                }
                this.ad = aQ;
            }
            if (ir.p == null) {
                this.ae = null;
            }
            if (ir.p == null && this.ad == aQ) {
                this.ad = null;
            }
        }
    }

    /*
     * Unable to fully structure code
     */
    public final void l() {
        block45: {
            block47: {
                block51: {
                    block50: {
                        block49: {
                            block48: {
                                block46: {
                                    block39: {
                                        block40: {
                                            block43: {
                                                block41: {
                                                    block44: {
                                                        block42: {
                                                            var1_1 = this;
                                                            if (!var1_1.aZ || GameMidlet.i.H != 0 || GameMidlet.i.Q != 0 || GameMidlet.i.aw != GameMidlet.i.C || GameMidlet.i.ax != GameMidlet.i.D) break block39;
                                                            var1_1.aZ = false;
                                                            GameMidlet.i.K = 0;
                                                            var1_1.y();
                                                            if (go.E != -1) break block39;
                                                            if (go.L == -1) break block40;
                                                            var2_2 = var1_1;
                                                            if (var2_2.ba.size() <= 0 || go.L == -1) break block39;
                                                            var3_10 = (dr)var2_2.ba.elementAt(0);
                                                            var4_13 = (cf)go.c.elementAt(var3_10.c);
                                                            ((cf)go.c.elementAt(var3_10.c)).l = false;
                                                            go.A.a = var4_13.aw / ir.i;
                                                            go.A.b = var4_13.ax / ir.i;
                                                            if (!var2_2.aX) break block41;
                                                            if (var4_13.q != 5) break block42;
                                                            super.u();
                                                            super.A();
                                                            break block43;
                                                        }
                                                        var5_17 = 0;
                                                        if (var4_13.c != -1 && var4_13.q < 6 && var4_13.o == 36) {
                                                            super.a(new fp((go)var2_2, var4_13));
                                                            var5_17 = 1;
                                                        }
                                                        if (var4_13.c == -1 || var4_13.q >= 6) break block44;
                                                        if (var3_10.c >= go.c.size()) break block39;
                                                        if (var4_13.j && super.h(var3_10.c, 7)) {
                                                            var5_17 = 1;
                                                        }
                                                        if (var4_13.k && super.h(var3_10.c, 3)) {
                                                            var5_17 = 1;
                                                        }
                                                        if (var4_13.n < 80) {
                                                            var4_14 = false;
                                                            var6_21 = 0;
                                                            while (var6_21 < go.d.size()) {
                                                                var7_22 = (dc)go.d.elementAt(var6_21);
                                                                var7_22 = go.b(var7_22.a);
                                                                if (var7_22.e == 2 && (var7_22.a == 111 || var7_22.a == 112)) {
                                                                    var4_14 = true;
                                                                    it.a().b(go.b, var3_10.c, var7_22.a);
                                                                    break;
                                                                }
                                                                ++var6_21;
                                                            }
                                                            if (!var4_14) {
                                                                main.a.b(kf.dM);
                                                            }
                                                        }
                                                    }
                                                    if (var5_17 == 0) {
                                                        super.A();
                                                    }
                                                    break block43;
                                                }
                                                if (var4_13.q == 5) {
                                                    super.u();
                                                    super.A();
                                                } else {
                                                    super.a(new fq((go)var2_2, var4_13));
                                                    super.a(new gc((go)var2_2, (dr)var3_10));
                                                }
                                            }
                                            var2_2.ba.removeElement(var3_10);
                                            break block39;
                                        }
                                        go.L = -1;
                                        var1_1.t();
                                    }
                                    if (go.H == -1) break block45;
                                    if (!main.a.a(2)) break block46;
                                    main.a.d[2] = false;
                                    var2_3 = go.H;
                                    if (var2_3 % 12 % 4 != 0) {
                                        --var2_3;
                                    }
                                    if (var2_3 >= 0) {
                                        go.H = var2_3;
                                    }
                                    break block47;
                                }
                                if (!main.a.a(4)) break block48;
                                main.a.d[4] = false;
                                var2_4 = go.H;
                                if ((var2_4 -= 4) >= 0) {
                                    go.H = var2_4;
                                }
                                break block47;
                            }
                            if (!main.a.a(6)) break block49;
                            main.a.d[6] = false;
                            var2_5 = go.H;
                            if ((var2_5 += 4) < go.c.size()) {
                                go.H = var2_5;
                            }
                            break block47;
                        }
                        if (!main.a.a(8)) break block50;
                        main.a.d[8] = false;
                        var2_6 = go.H;
                        if (var2_6 % 12 % 4 != 3) {
                            ++var2_6;
                        }
                        if (var2_6 < go.c.size()) {
                            go.H = var2_6;
                        }
                        break block47;
                    }
                    if (!main.a.a(5)) break block47;
                    var2_7 = ir.i;
                    var3_10 = (cf)go.c.elementAt(go.H);
                    if (var3_10.c != -1 && var3_10.q < 6) break block51;
                    if (var1_1.aX) ** GOTO lbl-1000
                    if (!var3_10.l) {
                        var1_1.ba.addElement(new dr(var3_10.aw / var2_7, var3_10.ax / var2_7, go.H));
                    }
                    var3_10.l = true;
                    var1_1.A();
                    break block47;
                }
                if (var1_1.aX) {
                    if (!var3_10.l) {
                        var1_1.ba.addElement(new dr(var3_10.aw / var2_7, var3_10.ax / var2_7, go.H));
                    }
                    var3_10.l = true;
                    var1_1.A();
                } else lbl-1000:
                // 2 sources

                {
                    main.a.b(kf.dJ);
                }
            }
            if (main.a.Z == 0) {
                var2_2 = (cf)go.c.elementAt(go.H);
                do.a().a(var2_2.aw, var2_2.ax);
            }
        }
        if (main.a.g && (var3_11 = main.a.i + do.a().b) / (var4_15 = ir.i * gy.Y) * ir.e + (var2_8 = main.a.h + do.a().a) / var4_15 >= 0 && var3_11 / var4_15 * ir.e + var2_8 / var4_15 <= ir.g.length && (var5_17 = ir.g[var3_11 / var4_15 * ir.e + var2_8 / var4_15]) == 51) {
            var1_1.bb = true;
            go.N = true;
            var4_15 = var1_1.j(var2_8 / var4_15, var3_11 / var4_15);
            var5_18 = (cf)go.c.elementAt(var4_15);
            go.A.a = var5_18.aw / ir.i;
            go.A.b = var5_18.ax / ir.i;
        }
        if (var1_1.bb && main.a.f) {
            var1_1.bb = false;
            go.N = false;
            var2_9 = main.a.h + do.a().a;
            var3_12 = main.a.i + do.a().b;
            var4_16 = ir.i * gy.Y;
            if (!var1_1.aW && var1_1.ad != null && go.A != null && var2_9 / var4_16 == go.A.a && var3_12 / var4_16 == go.A.b) {
                var1_1.ad.b();
            } else if (var3_12 / var4_16 * ir.e + var2_9 / var4_16 >= 0 && var3_12 / var4_16 * ir.e + var2_9 / var4_16 <= ir.g.length && (var5_19 = ir.g[var3_12 / var4_16 * ir.e + var2_9 / var4_16]) == 51) {
                var4_16 = var1_1.j(var2_9 / var4_16, var3_12 / var4_16);
                var5_20 = (cf)go.c.elementAt(var4_16);
                go.A.a = var5_20.aw / ir.i;
                go.A.b = var5_20.ax / ir.i;
                if (var1_1.aW && var4_16 >= 0 && var4_16 < go.c.size()) {
                    go.H = var4_16;
                    if (var5_20.c == -1 || var5_20.q == 5 || var5_20.q >= 6) {
                        main.a.f = false;
                        if (var1_1.aX && var5_20.q != 5) {
                            main.a.b(kf.dK);
                        } else {
                            if (!var5_20.l) {
                                var1_1.ba.addElement(new dr(var2_9 / ir.i, var3_12 / ir.i, var4_16));
                            }
                            var5_20.l = true;
                            var1_1.A();
                        }
                    } else {
                        main.a.f = false;
                        if (var1_1.aX) {
                            if (!var5_20.l) {
                                var1_1.ba.addElement(new dr(var2_9 / ir.i, var3_12 / ir.i, var4_16));
                            }
                            var5_20.l = true;
                            var1_1.A();
                        } else if (var5_20.q != 5) {
                            main.a.b(kf.dL);
                        }
                    }
                } else {
                    main.a.j = main.a.h -= ir.i * gy.Y;
                    var1_1.aZ = true;
                }
            }
        }
        if (main.a.b[5] && (ir.a == 24 || ir.a == 53) && this.ac != null && this.ad == null) {
            this.ac.b();
        }
        super.l();
        main.a.x.a();
        if (go.E == -1) {
            GameMidlet.i.e();
        }
    }

    private void A() {
        if (this.ba.size() > 0 && L != -1) {
            this.aZ = true;
            dr dr2 = (dr)this.ba.elementAt(0);
            if (GameMidlet.i.at == null) {
                ir.u = new dr();
                GameMidlet.i.n();
            }
            ir.u.a = dr2.a * 24 - 24;
            ir.u.b = dr2.b * 24 + 12;
            GameMidlet.i.Q = -5;
            GameMidlet.i.R = -1;
            GameMidlet.i.C = GameMidlet.i.aw;
            GameMidlet.i.D = GameMidlet.i.ax;
            GameMidlet.i.av = ir.u;
            GameMidlet.i.m();
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        if (main.a.D == null || !bb.d) {
            super.a(graphics);
        }
        main.a.a(graphics);
    }

    public final void b(Graphics graphics) {
        main.a.x.b(graphics);
        main.a.x.d(graphics);
        Graphics graphics2 = graphics;
        go go2 = this;
        if (H >= 0) {
            if (go2.bc >= 8) {
                go2.bc = 0;
            }
            cf cf2 = (cf)c.elementAt(H);
            graphics2.drawImage(ae.d, cf2.aw * gy.Y, (cf2.ax - 24 + go2.bc / 2) * gy.Y, 3);
            ++go2.bc;
        } else if (main.a.Z == 0 && A != null && go.A.a != -1 && ir.a != 25) {
            if (go2.bc >= 8) {
                go2.bc = 0;
            }
            graphics2.drawImage(ae.d, (go.A.a * ir.i + ir.i / 2) * gy.Y, (go.A.b * ir.i - 4 + go2.bc / 2) * gy.Y, 3);
            ++go2.bc;
        }
        graphics2 = graphics;
        go2 = this;
        if (ir.a != 25) {
            main.a.N.a(graphics2, go2.ay, (go.B.a + 26) * gy.Y, (go.B.b - 14) * gy.Y + (gy.Y - 1) * 7, 2);
        }
        main.a.c(graphics);
        ir.a(graphics);
    }

    public static void a(Vector vector, Vector vector2, Vector vector3, Vector vector4, byte by2, int n2, boolean bl2) {
        az = vector;
        z = bl2;
        O = by2;
        int n3 = az.size();
        by2 = 0;
        while (by2 < n3) {
            dc dc2 = (dc)az.elementAt(by2);
            cb cb2 = gb.b((int)dc2.a);
            if (cb2 != null) {
                dc2.f = cb2.a;
            }
            by2 = (byte)(by2 + 1);
        }
        f = vector2;
        by2 = 0;
        while (by2 < f.size()) {
            dc dc3 = (dc)f.elementAt(by2);
            go.a(dc3);
            by2 = (byte)(by2 + 1);
        }
        d = vector3;
        e = vector4;
    }

    private static void a(dc dc2) {
        if (dc2.a < 50) {
            dc2.d[0] = gb.b((int)dc2.a).h;
            dc2.f = gb.b((int)dc2.a).a;
            return;
        }
        if (dc2.a < 100) {
            dc2.d[0] = gb.c((int)dc2.a).f;
            if (gb.c((int)dc2.a).c == 1) {
                dc2.f = String.valueOf(kf.bn) + " " + gb.c((int)dc2.a).l;
                return;
            }
            if (gb.c((int)dc2.a).c == 2) {
                if (dc2.a == 55) {
                    dc2.f = String.valueOf(kf.dN) + " " + gb.c((int)dc2.a).l;
                    return;
                }
                dc2.f = String.valueOf(kf.bm) + " " + gb.c((int)dc2.a).l;
            }
        }
    }

    public static az b(int n2) {
        int n3 = 0;
        while (n3 < gb.e.size()) {
            az az2 = (az)gb.e.elementAt(n3);
            if (az2.a == n2) {
                return az2;
            }
            ++n3;
        }
        return null;
    }

    public static void a(dc dc2, int n2, int n3, int n4) {
        GameMidlet.i.a(n2, n3, n4);
        dp.n = true;
        if (dc2.a >= 50 && dc2.a <= 100) {
            c = null;
        }
        if (dc2.e <= 0) {
            return;
        }
        if (dc2.a >= 111) {
            Object object = dc.a(d, dc2.a);
            if (object != null) {
                ((dc)object).e += dc2.e;
                return;
            }
            object = go.b(dc2.a);
            dc2.f = ((az)object).f;
            d.addElement(dc2);
            return;
        }
        if (dc2.a <= 100 && dc2.a < 50) {
            dc dc3 = dc.a(az, dc2.a);
            if (dc3 != null) {
                dc3.e += dc2.e;
            } else {
                az.addElement(dc2);
                dc2.f = gb.b((int)dc2.a).a;
            }
            if (az.size() == 0) {
                az.addElement(dc2);
            }
        }
    }

    public final void a(int n2, Vector object, Vector serializable, byte n3, byte n4, short s2, int n5) {
        P = n3;
        Q = n4;
        V = s2;
        U = n5;
        b = n2;
        if (n2 != GameMidlet.i.w) {
            hn hn2 = cy.b(n2);
            if (hn2 == null) {
                main.a.b(kf.bo);
                return;
            }
            if (hn2.l == null) {
                hn2.a(hn2.x);
            }
            this.ay = hn2.l;
            j[0].removeAllElements();
            j[1].removeAllElements();
        } else {
            this.ay = GameMidlet.i.l;
        }
        c = object;
        if (ir.a != 24 && ir.a != 53 && i.size() == 0) {
            i = serializable;
        }
        go.f();
        if (this.bf) {
            if (R || ir.a != 24 && ir.a != 53) {
                R = false;
                go go2 = this;
                A = new dr();
                E = (byte)-1;
                go2.aI = 0;
                dt.v = (short)-1;
                dz.u = (short)-1;
                this.v = new dr[4];
                main.a.x.e(25);
                main.a.J = 0;
                int n6 = n4;
                int n7 = n3;
                try {
                    x = ip.r + n6;
                    w = dt.u + n7;
                    int n8 = go.D.a / 24;
                    n3 = go.C.a / 24 + 2;
                    InputStream inputStream = ir.d(25);
                    ir.d = new short[inputStream.available()];
                    s2 = 0;
                    while (s2 < ir.d.length) {
                        ir.d[s2] = (short)inputStream.read();
                        s2 = (short)(s2 + 1);
                    }
                    short[] sArray = new short[ir.d.length + ir.f * (n6 + n7)];
                    n4 = 0;
                    n5 = 0;
                    while (n5 < ir.d.length) {
                        int n9;
                        sArray[n4] = ir.d[n5];
                        ++n4;
                        if (n5 % ir.e == n8) {
                            n9 = 0;
                            while (n9 < n6) {
                                sArray[n4] = ir.d[n5];
                                ++n4;
                                ++n9;
                            }
                        }
                        if (n5 % ir.e == n3) {
                            n9 = 0;
                            while (n9 < n7) {
                                sArray[n4] = ir.d[n5];
                                ++n4;
                                ++n9;
                            }
                        }
                        ++n5;
                    }
                    ir.e = (short)(ir.e + (n6 + n7));
                    ir.d = sArray;
                    ir.l.removeAllElements();
                    main.a.x.a(null, ir.a + 1, true);
                    GameMidlet.i.aw += n7 * 24;
                    ir.a(849, go.D.a + 12 + aw.e(x - 2) * 24, go.D.b + 12 + aw.e(3) * 24);
                }
                catch (Exception exception) {
                    serializable = exception;
                    exception.printStackTrace();
                }
                g = new Vector();
                h = new Vector();
                go.a(1, ex.s, (byte)87, -8, g);
                go.a(2, dt.s, (byte)86, -7, h);
                n7 = i.size();
                n6 = 0;
                while (n6 < n7) {
                    ai ai2 = (ai)i.elementAt(n6);
                    if (ai2 instanceof ip) {
                        ((ip)ai2).a();
                    } else if (ai2 instanceof ex) {
                        ((ex)ai2).a();
                    } else if (ai2 instanceof dz) {
                        ((dz)ai2).a();
                    } else if (ai2 instanceof dt) {
                        ((dt)ai2).a();
                    } else {
                        ai2.a();
                    }
                    ir.m.addElement(ai2);
                    ++n6;
                }
                main.a.J = 1;
                main.a.h();
            }
            int n10 = 0;
            while (n10 < ir.l.size()) {
                object = (cc)ir.l.elementAt(n10);
                if (((cc)object).f < 800 && ((cc)object).f >= 100 || ((cc)object).f == -3 || object instanceof cf) {
                    ir.l.removeElement(object);
                    --n10;
                }
                ++n10;
            }
            this.v();
            this.aJ = System.currentTimeMillis();
            this.aK = System.currentTimeMillis();
            if (main.a.r != this) {
                this.a();
            }
            if (main.a.I) {
                bb.g();
            }
            GameMidlet.i.C = GameMidlet.i.aw;
            GameMidlet.i.D = GameMidlet.i.ax;
        }
        this.bf = true;
        if (S != -1) {
            GameMidlet.i.aw = GameMidlet.i.C = S;
            GameMidlet.i.ax = GameMidlet.i.D = T;
            S = -1;
            T = -1;
        }
        this.ac = aP;
        this.ae = null;
        this.ad = null;
    }

    private static void a(int n2, dr dr2, byte by2, int n3, Vector vector) {
        int n4 = 0;
        int n5 = 0;
        while (n5 < i.size()) {
            ai ai2 = (ai)i.elementAt(n5);
            ad ad2 = gb.c(ai2.k);
            if (ad2.c == n2 && ad2.h != -1) {
                boolean bl2 = false;
                int n6 = 0;
                while (n6 < vector.size()) {
                    dr dr3 = (dr)vector.elementAt(n6);
                    if (dr3.c == ai2.k) {
                        bl2 = true;
                        break;
                    }
                    ++n6;
                }
                if (!bl2) {
                    n6 = dr2.a + n4 * 24;
                    vector.addElement(new dr(n6, dr2.b, ai2.k));
                    int n7 = ir.d(n6, dr2.b);
                    ir.g[n7] = by2;
                    ir.a(n3, n6, dr2.b);
                    ++n4;
                }
            }
            ++n5;
        }
    }

    public static void f() {
        Vector<dr> vector = new Vector<dr>();
        int n2 = 0;
        while (n2 < i.size()) {
            int n3;
            ai ai2 = (ai)i.elementAt(n2);
            ad ad2 = gb.c(ai2.k);
            if (ai2 instanceof is) {
                n3 = 0;
                int n4 = 0;
                while (n4 < vector.size()) {
                    dr dr2 = (dr)vector.elementAt(n4);
                    if (dr2.c == ai2.k) {
                        ((is)ai2).t = dr2.a;
                        n3 = 1;
                        break;
                    }
                    ++n4;
                }
                if (n3 == 0) {
                    ((is)ai2).t = ai2.w;
                    vector.addElement(new dr(ai2.w, 0, ai2.k));
                }
            }
            if ((n3 = ad2.d * 60 / 3) > 0) {
                ai2.d = ai2.g / n3;
            }
            if (ai2.d > 2) {
                ai2.d = 2;
            }
            if (ai2.g == -1 || ad2.c == 3) {
                ai2.d = 0;
            }
            ++n2;
        }
    }

    public final void b(int n2, int n3) {
        if (ir.a != 24 && ir.a != 53) {
            return;
        }
        dc dc2 = dc.a(az, n3);
        if (dc2 != null) {
            cf cf2 = (cf)c.elementAt(n2);
            ((cf)c.elementAt(n2)).c = n3;
            this.a(cf2, 4);
            ir.d[cf2.b * ir.e + cf2.a] = cf2.o;
            cf2.q = 0;
            cf2.k = false;
            cf2.j = false;
            cf2.d = 0;
            cf2.h = 0L;
            cf2.n = (byte)100;
            cf2.m = 0;
            --dc2.e;
            if (dc2.e <= 0) {
                az.removeElement(dc2);
            }
        }
    }

    public final void c(int n2) {
        cf cf2 = (cf)c.elementAt(n2);
        if (cf2.c == -1) {
            this.a(cf2, 2);
        } else {
            cb cb2 = gb.d(cf2.c);
            int n3 = cb2.e * 60 / 5;
            cf2.q = cf2.d / n3;
            if (cf2.q >= 5) {
                cf2.q = 5;
            }
            if (cf2.d < 0 || cb2.f != -1 && cf2.d - cb2.e * 60 > cb2.f * 60 || cf2.m == 100 || cf2.q < 0) {
                cf2.q = 6;
            }
            if (cf2.i) {
                this.a(cf2, 3);
            } else {
                this.a(cf2, 4);
            }
        }
        ir.d[cf2.b * ir.e + cf2.a] = cf2.o;
    }

    private void a(cf cf2, int n2) {
        if (cf2.p == 2) {
            cf2.o = this.aC[n2];
            return;
        }
        cf2.o = this.aB[n2];
    }

    public static void c(int n2, int n3) {
        Object object;
        Object object2 = (cf)c.elementAt(n2);
        if (n3 > 0) {
            object = gb.b(((cf)object2).c);
            if (((cb)object).l) {
                main.a.a(n3, ((cf)object2).a * ir.i + 11, ((cf)object2).b * ir.i, -1, 0, ((cb)object).c[((cf)object2).q], -1);
            } else {
                object = gb.a[((cb)object).c[((cf)object2).q]];
                main.a.a(n3, ((cf)object2).a * ir.i + 11, ((cf)object2).b * ir.i, -1, aw.a(((ke)object).c * gy.Y, ((ke)object).d * gy.Y, ((ke)object).e * gy.Y, ((ke)object).f * gy.Y, gb.c[((ke)object).b]), -1);
            }
        }
        if (b == GameMidlet.i.w) {
            ((cf)object2).q = 6;
            ((cf)object2).m = (byte)100;
            ((cf)object2).k = false;
            ((cf)object2).j = false;
        }
        object2 = object = gb.b(((cf)object2).c);
        if (((cb)object).l) {
            object = go.f(((cb)object2).j);
            if (object != null) {
                ((dc)object).e += n3;
                return;
            }
            object = new dc();
            new dc().a = ((cb)object2).j;
            ((dc)object).e = n3;
            ((dc)object).d[0] = ((cb)object2).h;
            ((dc)object).f = ((cb)object2).a;
            e.addElement(object);
            return;
        }
        object = dc.a(f, ((cb)object2).b);
        if (object != null) {
            ((dc)object).e += n3;
            return;
        }
        object = new dc();
        new dc().a = ((cb)object2).b;
        ((dc)object).e = n3;
        ((dc)object).d[0] = gb.b((int)((cb)object2).b).h;
        ((dc)object).f = gb.b((int)((cb)object2).b).a;
        f.addElement(object);
    }

    public static void e(int n2, int n3) {
        ai ai2 = go.e(n2);
        if (n3 <= 0 || ai2 == null) {
            return;
        }
        ad ad2 = gb.c(ai2.k);
        int n4 = n3;
        Object object = ad2;
        dc dc2 = dc.a(f, ((ad)object).a);
        if (dc2 != null) {
            dc2.e += n4;
        } else {
            dc2 = new dc();
            new dc().a = ((ad)object).a;
            dc2.e = n4;
            dc2.f = ((ad)object).l;
            dc2.d[0] = ((ad)object).f;
            go.a(dc2);
            f.addElement(dc2);
        }
        if (fx.c(ad2.h) != null) {
            object = null;
            if (ad2.c == 1) {
                object = go.a(g, (int)ai2.k);
            } else if (ad2.c == 2) {
                object = go.a(h, (int)ai2.k);
            }
            if (object != null) {
                main.a.a(n3, ((dr)object).a, ((dr)object).b - 25, -1, fx.c((short)ad2.h).a, -1);
            }
        }
    }

    private static dr a(Vector vector, int n2) {
        int n3 = 0;
        while (n3 < vector.size()) {
            dr dr2 = (dr)vector.elementAt(n3);
            if (dr2.c == n2) {
                return dr2;
            }
            ++n3;
        }
        return null;
    }

    public static void a(int n2, int n3, byte by2, String string, int n4, int n5, int n6) {
        if (n2 != b) {
            return;
        }
        System.out.println("onOpenLand: " + n3 + "    " + by2);
        GameMidlet.i.a(n4, n5, n6);
        main.a.b(string);
    }

    public final void b(int n2, boolean bl2) {
        this.bf = bl2;
        it.a().a(n2);
    }

    public final void a(int n2, String string) {
        main.a.a(String.valueOf(kf.bp) + " " + string + "?", new ge(this, n2));
    }

    public final void g() {
        Object object;
        int n2;
        Vector<Object> vector = new Vector<Object>();
        int n3 = 0;
        while (n3 < gb.b.length) {
            n2 = n3++;
            object = new fu(this, kf.O, 7, gb.b[n2].b, n2);
            vector.addElement(object);
        }
        n3 = gb.d.size();
        n2 = 0;
        while (n2 < n3) {
            object = (ad)gb.d.elementAt(n2);
            int n4 = n2;
            object = new fy(this, kf.O, 8, n2, (ad)object, n4);
            vector.addElement(object);
            ++n2;
        }
        dp.b().a();
        dp.b().a(new String[]{kf.br, kf.bs, kf.aN}, new Vector[]{vector, this.B(), this.C()}, null);
        if (main.a.I && !bb.g) {
            main.a.D = new bb();
            main.a.D.a(dp.a);
        }
    }

    private Vector B() {
        Vector<h> vector = new Vector<h>();
        int n2 = 0;
        while (n2 < gb.e.size()) {
            az az2 = (az)gb.e.elementAt(n2);
            if (az2.c && (az2.h > 0 || az2.g > 0)) {
                int n3 = n2;
                vector.addElement(new h(this, kf.O, 9, n2, az2, n3));
            }
            ++n2;
        }
        return vector;
    }

    private Vector C() {
        Object object;
        Vector<Object> vector = new Vector<Object>();
        int n2 = f.size();
        int n3 = 0;
        while (n3 < n2) {
            dc dc2 = (dc)f.elementAt(n3);
            if (gb.b((int)dc2.a) != null || dc2.a >= 50) {
                object = new ko(this, kf.bg, new fr(this, n3), n3, dc2);
                vector.addElement(object);
            }
            ++n3;
        }
        n3 = 0;
        while (n3 < e.size()) {
            int n4 = n3;
            object = (dc)e.elementAt(n3);
            az az2 = go.b(((dc)object).a);
            System.out.println("aaaaaaaaaa: " + az2 + "    " + ((dc)object).a);
            vector.addElement(new j(this, "", 11, n3, az2, n4, (dc)object));
            ++n3;
        }
        return vector;
    }

    public final void h() {
        Object object;
        int n2;
        if (GameMidlet.i.w != b) {
            main.a.b(kf.bt);
            return;
        }
        Vector<Object> vector = new Vector<Object>();
        int n3 = 0;
        while (n3 < az.size()) {
            n2 = n3;
            object = (dc)az.elementAt(n2);
            if (gb.b((int)((dc)object).a) != null) {
                d d2 = new d(this, "", 12, n3, (dc)object, n2);
                vector.addElement(d2);
            }
            ++n3;
        }
        n3 = 0;
        while (n3 < d.size()) {
            n2 = n3;
            object = new t(this, "", 13, n3, n2);
            vector.addElement(object);
            ++n3;
        }
        dp.b().a();
        dp.b().a(new String[]{kf.aN, kf.bu}, new Vector[]{this.C(), vector}, null);
        n2 = 0;
        while (n2 < f.size()) {
            f.elementAt(n2);
            ++n2;
        }
    }

    public final void f(int n2, int n3) {
        if (n3 != 3 && !dp.h()) {
            dp.g();
            if (main.a.I) {
                main.a.D = new bb();
                if (bb.f > 2) {
                    --bb.f;
                }
                main.a.D.a(dp.a);
                return;
            }
        } else {
            az az2;
            int n4 = dp.f();
            int n5 = 0;
            int n6 = 0;
            if (n3 == 0) {
                cb cb2 = gb.d(n2);
                n5 = cb2.g[0];
                n6 = cb2.g[1];
            } else if (n3 == 2) {
                n5 = gb.a((int)n2).d[0];
                n6 = gb.a((int)n2).d[1];
            } else if (n3 == 4 && (az2 = go.b(n2)) != null) {
                n5 = az2.g;
                n6 = az2.h;
            }
            int n7 = n5;
            int n8 = n6;
            main.a.a(n5 * n4, n6 * n4, new u(this, n2, n4, n7), new r(this, n2, n4, n8), null);
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.t();
                return;
            }
            case 1: {
                if (main.a.D != null && !bb.d) break;
                le.a().a(this.K, 0);
                return;
            }
            case 2: {
                az az2;
                dc dc2;
                go go2 = this;
                Vector<by> vector = new Vector<by>();
                ai ai2 = go.e(((gx)ir.p).w);
                ad ad2 = gb.c(ai2.k);
                int n4 = 0;
                while (n4 < d.size()) {
                    dc2 = (dc)d.elementAt(n4);
                    az2 = go.b(dc2.a);
                    if (az2.d == ad2.c && az2.e == 5 && (ad2.c == 4 || ad2.c == 1)) {
                        int n5 = dc2.e;
                        if (ad2.c == 4) {
                            n5 -= j[1].size();
                        } else if (ad2.c == 1) {
                            n5 -= j[0].size();
                        }
                        vector.addElement(new ff(go2, String.valueOf(az2.f) + "(" + n5 + ")", new er(go2, dc2, ad2), az2));
                    }
                    ++n4;
                }
                n4 = 0;
                while (n4 < d.size()) {
                    dc2 = (dc)d.elementAt(n4);
                    az2 = go.b(dc2.a);
                    if (az2.e != 5 && az2.d != 0 && (az2.d == ad2.c || az2.d == 101 || az2.d == 100 && ad2.c != 4) && (az2.e != 4 || ai2.j[0] || ai2.j[1]) && (az2.e != 6 || ai2.h < 100)) {
                        vector.addElement(new fb(go2, String.valueOf(az2.f) + "(" + dc2.e + ")", new fi(go2, az2, dc2), az2));
                    }
                    ++n4;
                }
                if (b == GameMidlet.i.w) {
                    vector.addElement(new fd(go2, kf.bg, 2));
                }
                go.a(vector);
                return;
            }
            case 3: {
                this.q();
                return;
            }
            case 4: {
                this.r();
                return;
            }
            case 5: {
                this.ac = aP;
                this.ae = null;
                this.aW = false;
                do.g = false;
                this.aX = false;
                this.ba.removeAllElements();
                n2 = 0;
                while (n2 < c.size()) {
                    cf cf2 = (cf)c.elementAt(n2);
                    ((cf)c.elementAt(n2)).l = false;
                    ++n2;
                }
                H = -1;
                L = -1;
                N = false;
                return;
            }
            case 6: {
                this.s();
                return;
            }
            case 7: {
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.dR, 10));
                vector.addElement(new by(kf.dS, 8));
                vector.addElement(new by(kf.dT, 9));
                vector.addElement(new by(kf.x, 20));
                le.a().a(vector, 0);
                return;
            }
            case 8: {
                y = false;
                this.ae = null;
                this.ad = null;
                this.ac = aP;
                this.bg = 0;
                do.g = false;
                return;
            }
            case 9: {
                ++this.bg;
                this.d(10, -1);
                return;
            }
            case 51: {
                it.a().b(b, 1);
                this.aJ = System.currentTimeMillis();
                this.b(b, true);
                return;
            }
            case 52: {
                it.a().b(b, 2);
                this.aJ = System.currentTimeMillis();
                this.b(b, true);
                return;
            }
            case 53: {
                this.a((byte)0, -1);
                main.a.h();
                return;
            }
            case 54: {
                this.j();
            }
        }
    }

    public final void a(ad ad2) {
        main.a.a(ad2.e[0], ad2.e[1], new x(this, ad2), new aj(this, ad2), null);
    }

    public static void i() {
        if (ir.a == 24 || ir.a == 53) {
            main.a.t = null;
            main.a.b(kf.bv, 54, null);
        }
    }

    public static boolean a(short s2, int n2) {
        dc dc2 = dc.a(d, s2);
        if (dc2 == null) {
            return false;
        }
        it.a().b(b, n2, s2);
        return false;
    }

    public final void a(byte by2, byte by3) {
        Vector<hg> vector = new Vector<hg>();
        int n2 = 0;
        while (n2 < d.size()) {
            dc dc2 = (dc)d.elementAt(n2);
            az az2 = go.b(dc2.a);
            if ((az2.d == by2 || az2.d == 101) && az2.e == 5) {
                vector.addElement(new hg(this, String.valueOf(az2.f) + "(" + dc2.e + ")", new ak(this, by2, dc2), az2));
            }
            ++n2;
        }
        le.a().a(vector, main.a.o, ir.i * gy.Y, ir.i * gy.Y);
    }

    private static void a(ai ai2) {
        it.a().c(b, ai2.w);
    }

    public final void a(int n2, int n3, Vector vector) {
        if (GameMidlet.i.w != b) {
            return;
        }
        if (n3 < 0 || n3 >= vector.size()) {
            return;
        }
        dr dr2 = (dr)vector.elementAt(n3);
        int n4 = 0;
        while (n4 < i.size()) {
            ai ai2 = (ai)i.elementAt(n4);
            ad ad2 = gb.c(ai2.k);
            if (ai2.o > 0 && dr2.c == ai2.k) {
                ai2.o = 0;
                if (n2 == 1 && ad2.c == n2) {
                    go.a(ai2);
                    go.i(-50);
                }
                if (n2 == 2 && ad2.c == n2) {
                    go.a(ai2);
                    go.i(-51);
                }
            }
            ++n4;
        }
    }

    public final void a(int n2, int n3, short s2) {
        GameMidlet.i.a[0] = n3;
        dp.n = true;
        main.a.b(String.valueOf(kf.bx) + n2 + kf.T);
        dc dc2 = dc.a(f, s2);
        if (dc2 == null) {
            dc2 = dc.a(e, s2);
            e.removeElement(dc2);
        } else {
            f.removeElement(dc2);
        }
        if (main.a.r == dp.b()) {
            dp.b().d();
            if (ir.a == 25) {
                this.g();
                dp.b().b(2);
            } else {
                this.h();
            }
        }
        main.a.h();
    }

    public static void g(int n2, int n3) {
        ai ai2 = go.e(n2);
        if (ai2 != null) {
            int n4 = n3 - GameMidlet.i.a[0];
            ir.p = null;
            ad ad2 = gb.c(ai2.k);
            ad2 = fx.c((short)ad2.j[ai2.d]).a;
            main.a.a(n4, ai2.aw, ai2.ax - 7, -1, aw.a(0, ai2.m * ai2.aA, ad2.getWidth(), ai2.aA, (Image)ad2), -1);
            i.removeElement(ai2);
            ir.m.removeElement(ai2);
        }
        dp.n = true;
        GameMidlet.i.a[0] = n3;
    }

    public final void a(byte by2, String string) {
        main.a.a(string, new av(this, by2));
    }

    public final void j() {
        I = false;
        aM = false;
        dt.v = (short)-1;
        dz.u = (short)-1;
        this.aA = null;
        this.ae = null;
        bf.a().a(25, 0);
    }

    public static ai e(int n2) {
        int n3 = 0;
        while (n3 < i.size()) {
            ai ai2 = (ai)i.elementAt(n3);
            if (ai2.w == n2) {
                return ai2;
            }
            ++n3;
        }
        return null;
    }

    public final void m() {
        if (GameMidlet.i.w != b) {
            return;
        }
        Vector<by> vector = new Vector<by>();
        if (go.J.d > 0) {
            vector.addElement(new ao(this, String.valueOf(kf.eO) + "(" + go.J.d + ")", 12));
        }
        vector.addElement(new ap(this, go.J.e > 0 ? kf.eN : kf.g, 13));
        vector.addElement(new am(this, kf.cw, 14));
        go.a(vector);
    }

    private static void i(int n2) {
        int n3 = 0;
        while (n3 < ir.l.size()) {
            cc cc2 = (cc)ir.l.elementAt(n3);
            if (cc2.az == 8 && cc2.f == n2) {
                ir.l.removeElement(cc2);
                return;
            }
            ++n3;
        }
    }

    public final void n() {
        Object object;
        if (b != GameMidlet.i.w) {
            return;
        }
        Vector<aq> vector = new Vector<aq>();
        int n2 = 0;
        while (n2 < gb.f.size()) {
            object = (hf)gb.f.elementAt(n2);
            int n3 = n2++;
            vector.addElement(new aq(this, kf.m, new an(this, (hf)object), (hf)object, n3));
        }
        Vector<Object> vector2 = new Vector<Object>();
        if (V > 0) {
            vector2.addElement(null);
            object = new as(this, U == 0 ? kf.eL : kf.h, 2, this);
            vector2.addElement(object);
        }
        dp.b().a();
        dp.b().m = true;
        if (V > 0) {
            Vector[] vectorArray = new Vector[2];
            vectorArray[0] = vector;
            dp.b().a(new String[]{kf.m, kf.dD}, vectorArray, vector2);
            dp.b().a(new by(kf.cm, 0, this), 1);
            dp.g = 1;
            dp.b().i();
            dp.b().m();
            return;
        }
        dp.b().a(new String[]{kf.m}, new Vector[]{vector}, null);
    }

    public static void a(short s2, short s3) {
        int n2 = 0;
        while (n2 < go.J.i.length) {
            main.a.a(0, go.J.aw + go.J.i[n2], go.J.ax - 45 + go.J.j[n2], -1, 0, go.J.c, -1);
            ++n2;
        }
        main.a.a((int)s3, GameMidlet.i.aw, GameMidlet.i.ax - GameMidlet.i.aA, -1, 10);
        go.J.d = 0;
        dc dc2 = go.f(s2);
        if (dc2 != null) {
            dc2.e += s3;
        } else {
            dc2 = new dc();
            new dc().a = s2;
            dc2.e = s3;
            e.addElement(dc2);
        }
        main.a.h();
    }

    public static dc f(int n2) {
        int n3 = 0;
        while (n3 < e.size()) {
            dc dc2 = (dc)e.elementAt(n3);
            if (dc2.a == n2) {
                return dc2;
            }
            ++n3;
        }
        return null;
    }

    public static dc g(int n2) {
        int n3 = 0;
        while (n3 < f.size()) {
            dc dc2 = (dc)f.elementAt(n3);
            if (dc2.a == n2) {
                return dc2;
            }
            ++n3;
        }
        return null;
    }

    public static void o() {
        cy.b().b(true);
    }

    static void a(go go2, byte by2, int n2) {
        go2.a(by2, n2);
    }

    static void a(go go2, cf cf2) {
        if (cf2.c == -1 || cf2.q >= 6) {
            go2.a((byte)0, -1);
            main.a.h();
            return;
        }
        main.a.b(kf.bh, 53);
    }

    static void a(go go2, int n2, int n3) {
        go.i(n2, n3);
    }

    static void a(go go2) {
        go2.A();
    }

    static Vector p() {
        return az;
    }

    static void a(go go2, az az2, short s2, ai ai2) {
        go2.a(az2, s2, ai2);
    }
}


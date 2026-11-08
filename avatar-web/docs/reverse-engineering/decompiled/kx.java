/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public abstract class kx
extends hj
implements cq {
    public static kx i;
    public static boolean j;
    public static boolean k;
    public static boolean l;
    public static Vector m;
    public int n;
    public int o;
    public static byte p;
    public static byte q;
    public static int r;
    private static int a;
    public static byte s;
    public static long t;
    public static long u;
    public static int v;
    public static int w;
    public static int[] x;
    public int y = 10;
    public static int z;
    public static int A;
    public int B = -1;
    private static by b;
    private static by c;
    public static by C;
    public static by D;
    private static by d;
    public static by E;
    private static Image[] e;
    public static dr[] F;
    private static Vector f;
    public static Image G;
    public static int H;
    public static Vector I;
    public static Vector J;
    private static fh g;

    static {
        x = new int[4];
        f = new Vector();
        H = 4;
        I = new Vector();
        J = new Vector();
    }

    public final void d() {
        this.u();
    }

    public void a() {
        main.a.e();
        super.a();
        i = this;
    }

    public kx() {
        this.e();
        b = new by(kf.c, 0);
        new by(kf.z, 1);
        c = new by(kf.n, 2);
        C = new by(kf.w, 3);
        D = new by(kf.A, 4);
        d = new by(kf.j, 5);
        E = new by(kf.b, 6);
    }

    public void e() {
        F = new dr[]{new dr(main.a.o, 30 + 23 * gy.Y, 2), new dr(13 * gy.Y, main.a.p - 20, 0), new dr(main.a.o, main.a.n - 28, 2), new dr(main.a.m - 13 * gy.Y, main.a.p - 20, 1)};
        if (main.a.m < 200) {
            z = 26;
            A = 32;
            F = new dr[]{new dr(main.a.o, 30 + 23 * gy.Y, 2), new dr(13 * gy.Y, main.a.p - 20, 0), new dr(main.a.o, main.a.q - main.a.T - 5, 2), new dr(main.a.m - 13 * gy.Y, main.a.p - 20, 1)};
        } else {
            z = 54;
            A = 72;
        }
        if (gy.Y == 2) {
            z = 144;
            A = 194;
        }
        if (j || k) {
            this.f();
        }
        hj.an = null;
    }

    private void b() {
        f.removeAllElements();
        kx.t();
        gq.a().b();
    }

    public final void c(String string) {
        this.ac = null;
        this.ad = null;
        main.a.b(string, 50, null);
    }

    protected void h() {
        hn hn2 = kx.h(GameMidlet.i.w);
        if (hn2.H == 1) {
            return;
        }
        if (ae.u && a > GameMidlet.i.a[3]) {
            jp.b().f();
            return;
        }
        boolean bl2 = !((hn)kx.m.elementAt((int)kx.s)).o;
        if (bl2) {
            w = 100;
        }
        kx.o();
        main.a.i();
        ie.a().a(bl2);
    }

    public static void o() {
        kx.i.ad = E;
        kx.i.ae = null;
    }

    protected void j() {
    }

    private static void m() {
        if (j) {
            return;
        }
        if (ae.u && a > GameMidlet.i.a[3]) {
            jp.b().f();
            return;
        }
        int n2 = 0;
        int n3 = 0;
        int n4 = 0;
        while (n4 < H) {
            hn hn2 = (hn)m.elementAt(n4);
            if (hn2.w != GameMidlet.i.w && hn2.w != -1) {
                if (hn2.o) {
                    ++n2;
                } else {
                    ++n3;
                }
            }
            ++n4;
        }
        if (n2 == 0 || n3 > 0) {
            main.a.b(kf.aT);
            return;
        }
        if (i == kg.a) {
            kx.i.ad = E;
            kx.i.ae = null;
        } else {
            main.a.i();
        }
        hj.z();
        ie.a().h();
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                Vector<by> vector = new Vector<by>();
                by by2 = new by(kf.r, 10);
                by by3 = new by(kf.s, 11);
                by by4 = new by(kf.t, 12);
                vector.addElement(by2);
                if (ir.a == 61) {
                    vector.addElement(by3);
                }
                vector.addElement(by4);
                le.a().a(vector, 0);
                return;
            }
            case 2: {
                kx.w();
                return;
            }
            case 3: {
                kx.x();
                return;
            }
            case 4: {
                hc.b().a(i);
                return;
            }
            case 5: {
                this.u();
                return;
            }
            case 10: {
                main.a.u.a(kf.G, 100, 1);
                return;
            }
            case 11: {
                kx.v();
                return;
            }
            case 12: {
                main.a.u.a(kf.t, 101, 3);
                return;
            }
            case 13: {
                if (n3 >= m.size()) break;
                hn hn2 = (hn)m.elementAt(n3);
                ae.b();
                ae.c(hn2);
                return;
            }
            case 14: {
                if (n3 < 0 || n3 >= m.size()) break;
                hn hn3 = (hn)m.elementAt(n3);
                ie.a().c(hn3.w);
                return;
            }
            case 15: {
                ie.a().a(n3 + 2);
            }
        }
    }

    protected void a_() {
        u = 0L;
        t = 0L;
        j = false;
        k = false;
        l = false;
    }

    private static void t() {
        do.a().b = do.a().d = (ir.f * ir.i * gy.Y - main.a.n) / 2;
        do.a().a = do.a().c = (ir.e * ir.i * gy.Y - main.a.m) / 2;
    }

    public final void p() {
        this.f();
    }

    public final void a(int n2, hn hn2) {
        m.setElementAt(hn2, n2);
        this.n();
        this.f();
    }

    public void g() {
        kx.t();
        hj.z();
    }

    public void l() {
        if (main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public void k() {
        if (w > 0) {
            --w;
        }
        if (!j) {
            this.ac = b;
            do.a().c();
        }
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != -1) {
                hn2.d();
            }
            ++n2;
        }
        if (g != null && g.a()) {
            g = null;
        }
    }

    public final void q() {
        if (r == GameMidlet.i.w) {
            if (this.ad != E) {
                this.ad = c;
                kx.c.a = kf.n;
            }
            boolean bl2 = true;
            int n2 = 0;
            while (n2 < H) {
                hn hn2 = (hn)m.elementAt(n2);
                if (hn2.w == -1) {
                    bl2 = false;
                } else if (hn2.w != GameMidlet.i.w && !hn2.o) {
                    bl2 = false;
                }
                ++n2;
            }
            if (bl2 && main.a.l % 10 > 7) {
                kx.c.a = "";
                return;
            }
        } else if (!k) {
            this.ad = d;
            kx.d.a = kf.j;
            int n3 = 0;
            while (n3 < H) {
                hn hn3 = (hn)m.elementAt(n3);
                if (hn3.w == GameMidlet.i.w) {
                    if (!hn3.o) {
                        if (main.a.l % 10 > 7) {
                            kx.d.a = "";
                        }
                    } else {
                        kx.d.a = kf.k;
                        this.ad = w == 0 ? d : null;
                    }
                }
                ++n3;
            }
        }
    }

    public final void d(int n2) {
        im.d().a(n2, this);
        super.d(n2);
    }

    public void a(Graphics graphics) {
        if (g != null) {
            g.a(graphics);
        }
        if (jy.b) {
            jy.a(graphics, this.ac, this.ad, this.ae);
        } else {
            super.a(graphics);
        }
        ir.a(graphics);
        main.a.b(graphics);
    }

    public void a_(Graphics graphics) {
        main.a.c(graphics);
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != -1) {
                hn2.a(graphics, hn2.aw, hn2.ax);
                kx.a(graphics, hn2.aw, hn2.ax - 50 - (!j && ir.y == -1 ? 10 * gy.Y : 0), 3, hn2);
                hn2.a(graphics, hn2.aw, hn2.ax, false);
            }
            ++n2;
        }
    }

    public static void d(Graphics graphics) {
        int n2 = 0;
        while (n2 < m.size()) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != -1 && hn2.O != null) {
                hn2.O.a(graphics);
            }
            ++n2;
        }
    }

    public void b(Graphics object) {
        main.a.c(object);
        object.setClip(0, 0, main.a.m, main.a.n + main.a.T);
        if (j || k) {
            kx.e(object);
            return;
        }
        main.a.c(object);
        if (jy.b) {
            kx.e(object);
            return;
        }
        object.setClip(0, 0, main.a.m, main.a.n + main.a.T);
        object.setColor(0);
        object.fillRect(0, 0, main.a.m, main.a.n + main.a.T);
        object.translate(-do.a().a, -do.a().b);
        main.a.x.c((Graphics)object);
        if (main.a.m > 150) {
            Graphics graphics = object;
            object = this;
            main.a.N.a(graphics, el.c, do.a().a + main.a.o, do.a().b + main.a.p - gy.af - gy.af / 2 - 5, 2);
            main.a.N.a(graphics, "P: " + p + " - B: " + q, do.a().a + main.a.o, do.a().b + main.a.p - gy.af / 2 - 5, 2);
            main.a.Q.a(graphics, String.valueOf(a) + kf.k(), do.a().a + main.a.o, do.a().b + main.a.p - 5 + gy.af / 2, 2);
            kx.d(graphics);
        }
    }

    private static void e(Graphics graphics) {
        main.a.S.b(graphics);
        if (!j) {
            main.a.K.a(graphics, "P: " + p + " - B: " + q, main.a.o, main.a.n / 2 - 10 * gy.Y, 2);
            main.a.Q.a(graphics, String.valueOf(a) + kf.k(), main.a.o, main.a.n / 2 + 10 * gy.Y, 2);
            return;
        }
        if (main.a.r == ek.a) {
            ek.a.c(graphics);
        }
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, hn hn2) {
        if (!j) {
            if (hn2.w == r) {
                graphics.drawImage(e[1], n2, n3, 3);
                return;
            }
            if (hn2.o) {
                graphics.drawImage(e[0], n2, n3, 3);
            }
        }
    }

    private void u() {
        if (j && !k && !l) {
            main.a.a(kf.cv, 0, this);
            return;
        }
        this.a(0);
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                main.a.J = 0;
                this.a_();
                ie.a().g();
                ie.a().a(p);
                if (H == 2) {
                    this.c("");
                }
                kx.t();
                main.a.i();
            }
        }
    }

    public void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                by by2 = new by(kf.ab, 1);
                by by3 = new by(kf.v, 2);
                int n4 = 0;
                int n5 = 0;
                while (n5 < H) {
                    if (((hn)kx.m.elementAt((int)n5)).w != -1) {
                        ++n4;
                    }
                    ++n5;
                }
                Vector<by> vector = new Vector<by>();
                if (r == GameMidlet.i.w && !j) {
                    vector.addElement(by2);
                    if (n4 > 1) {
                        vector.addElement(by3);
                    }
                }
                if (n4 > 1) {
                    vector.addElement(new by(kf.y, 3));
                }
                vector.addElement(new by(kf.q, 4));
                vector.addElement(new by(kf.u, 5));
                le.a().a(vector, 0);
                return;
            }
            case 1: {
                i.b();
                return;
            }
            case 2: {
                kx.m();
                return;
            }
            case 3: {
                i.g();
                return;
            }
            case 4: {
                i.j();
                return;
            }
            case 5: {
                i.h();
                return;
            }
            case 6: {
                return;
            }
            case 50: {
                this.g();
                this.b();
                j = false;
                this.B = -1;
                v = 0;
                return;
            }
            case 100: {
                try {
                    n2 = Integer.parseInt(main.a.u.a());
                    if (n2 < 0) {
                        return;
                    }
                    main.a.h();
                    if (ae.u && n2 > GameMidlet.i.a[3]) {
                        jp.b().f();
                        return;
                    }
                    ie.a().b(n2);
                    return;
                }
                catch (Exception exception) {
                    return;
                }
            }
            case 101: {
                ie.a().b(main.a.u.a());
                main.a.b(kf.I);
            }
        }
    }

    private static void v() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < 3) {
            vector.addElement(new by(kf.ej[n2], 15, n2));
            ++n2;
        }
        le.a().a(vector, 0);
    }

    private static void w() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != GameMidlet.i.w && hn2.w != -1) {
                vector.addElement(new by(hn2.l, 14, n2));
            }
            ++n2;
        }
        le.a().a(vector, 0);
    }

    private static void x() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != GameMidlet.i.w && hn2.w != -1) {
                vector.addElement(new by(hn2.x, 13, n2));
            }
            ++n2;
        }
        if (vector.size() == 1) {
            by by2 = (by)vector.elementAt(0);
            by2.b();
        }
        le.a().a(vector, 0);
    }

    public final void e(int n2) {
        hn hn2 = kx.h(n2);
        if (hn2 != null) {
            kx.a(String.valueOf(hn2.x) + kf.aU, 30, hn2.w);
            hn2.w = -1;
            hn2.a("");
            hn2.d(0);
            hn2.o = false;
        }
        this.n();
        if (j || k) {
            this.f();
        }
    }

    public static void f(int n2) {
        r = n2;
        hn hn2 = kx.h(r);
        if (hn2 != null) {
            hn2.o = true;
        }
    }

    public void a(byte by2, byte by3, int n2, int n3, Vector vector) {
        if (e == null) {
            e = new Image[2];
            try {
                kx.e[0] = Image.createImage((String)(String.valueOf(kf.a()) + "/on/ready.on"));
                kx.e[1] = Image.createImage((String)(String.valueOf(kf.a()) + "/on/owner.on"));
            }
            catch (IOException iOException) {
                IOException iOException2 = iOException;
                iOException.printStackTrace();
            }
        }
        p = by2;
        q = by3;
        a = n3;
        if (m != null) {
            m.removeAllElements();
        }
        m = vector;
        kx.f(n2);
        by2 = 0;
        while (by2 < H) {
            hn hn2 = (hn)m.elementAt(by2);
            ((hn)m.elementAt(by2)).K = 0;
            hn2.b((byte)2);
            hn2.f(hn2.H);
            if (hn2.w == GameMidlet.i.w) {
                s = by2;
                break;
            }
            by2 = (byte)(by2 + 1);
        }
        this.n();
        if (H > 2) {
            main.a.S.b();
        }
    }

    public static void r() {
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            ((hn)m.elementAt(n2)).o = false;
            ++n2;
        }
    }

    public final void g(int n2) {
        a = n2;
        kx.r();
    }

    public static void b(int n2, boolean bl2) {
        hn hn2 = kx.h(n2);
        if (hn2 != null) {
            hn2.o = bl2;
        }
    }

    public final void a(String string) {
        if (string.trim().equals("")) {
            return;
        }
        ie.a().a(string);
        kx.a(GameMidlet.i.w, string);
    }

    public static void a(int n2, String string) {
        hn hn2 = kx.h(n2);
        hn hn3 = new hn();
        if (hn2 == null) {
            return;
        }
        hn3.aw = hn2.aw;
        hn3.ax = hn2.ax;
        hn3.w = hn2.w;
        if (hn3.w != -1) {
            if (j && jp.e == 0) {
                hn3.aw = main.a.o;
                hn3.ax = hn3.w != GameMidlet.i.w ? 30 : main.a.n - 40;
            }
            kx.a(string, 50, hn3.w);
        }
    }

    public static void c(int n2, int n3) {
        if (n3 == 0) {
            return;
        }
        if (!j) {
            n2 = kx.i(n2);
            main.a.a(n3, kx.F[kx.x[n2]].a, kx.F[kx.x[n2]].b, -1, -1);
            return;
        }
        hn hn2 = kx.h(n2);
        main.a.a(n3, hn2.aw, hn2.ax, -1, -1);
    }

    public static boolean a(byte by2, byte by3) {
        return p == by2 && q == by3;
    }

    public final void s() {
        this.n();
    }

    public static void a(String string, int n2, int n3) {
        if (n3 == -1) {
            if (g == null) {
                g = new fh(n2, string, 0);
                g.a(main.a.o, main.a.p - 20);
                return;
            }
            g.a(n2, string);
            return;
        }
        int n4 = 0;
        while (n4 < m.size()) {
            gx gx2 = (gx)m.elementAt(n4);
            if (gx2.w == n3) {
                if (gx2.O == null) {
                    gx2.O = new fh(n2, string, 0);
                    gx2.O.a(gx2.aw, gx2.ax - 45);
                } else {
                    gx2.O.a(n2, string);
                }
            }
            ++n4;
        }
    }

    public void n() {
        int n2 = 0;
        int n3 = 0;
        int n4 = 0;
        while (n4 < H) {
            hn hn2 = (hn)m.elementAt(n4);
            hn2.b((byte)0);
            if (hn2.w != -1) {
                ++n2;
                if (hn2.w != GameMidlet.i.w) {
                    n3 = n4;
                }
            }
            ++n4;
        }
        int[] nArray = new int[H];
        int n5 = 2;
        if (n2 == 2) {
            nArray[kx.s] = 2;
            nArray[n3] = 0;
        } else {
            n2 = s;
            while (n2 < s + H) {
                n3 = n2;
                if (n3 > H - 1) {
                    n3 -= H;
                }
                nArray[n3] = n5++;
                if (n5 >= H) {
                    n5 = 0;
                }
                ++n2;
            }
        }
        x = nArray;
    }

    public static hn h(int n2) {
        int n3 = 0;
        while (n3 < H) {
            hn hn2 = (hn)m.elementAt(n3);
            if (hn2.w == n2) {
                return hn2;
            }
            ++n3;
        }
        return null;
    }

    public static int i(int n2) {
        int n3 = 0;
        while (n3 < H) {
            hn hn2 = (hn)m.elementAt(n3);
            if (hn2.w == n2) {
                return n3;
            }
            ++n3;
        }
        return -1;
    }

    public void f() {
        do.a().b(0, 0);
        int n2 = 0;
        while (n2 < H) {
            hn hn2 = (hn)m.elementAt(n2);
            if (hn2.w != -1) {
                hn2.h = 0;
                hn2.b((byte)0);
                hn2.f(hn2.H);
                hn2.C = hn2.aw = kx.F[kx.x[n2]].a;
                hn2.D = hn2.ax = kx.F[kx.x[n2]].b;
                if (x[n2] == 2 || x[n2] == 3) {
                    hn2.K = hn2.t = gx.J;
                } else {
                    hn2.t = 0;
                    hn2.K = 0;
                }
            }
            ++n2;
        }
    }
}


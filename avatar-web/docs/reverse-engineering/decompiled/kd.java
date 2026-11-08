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

public final class kd
extends kx {
    public static kd a;
    private Vector c;
    private byte[] d;
    private byte e;
    private Vector f;
    private byte[] g;
    private byte h;
    private Vector K;
    private by L;
    private by M = new by(kf.F, 20);
    private boolean N = false;
    private static int O;
    private static int P;
    private int Q = -1;
    private int R;
    private int S;
    private boolean T = false;
    private boolean U = false;
    private int V = 0;
    private boolean W = false;
    public boolean b = true;

    static {
        aw.a.setSeed(System.currentTimeMillis());
    }

    public static kd b() {
        if (a == null) {
            a = new kd();
            return a;
        }
        return a;
    }

    public final void a_() {
        System.out.println("resetCard");
        this.c = new Vector();
        this.e = (byte)-1;
        this.d = new byte[0];
        this.o = -1;
        this.g = new byte[0];
        this.h = (byte)-1;
        this.n = -1;
        this.f = new Vector();
        super.a_();
    }

    private static void a(Vector vector) {
        int n2 = vector.size();
        int n3 = 0;
        while (n3 < n2 - 1) {
            int n4 = n3 + 1;
            while (n4 < n2) {
                Object object = (ax)vector.elementAt(n3);
                ax ax2 = (ax)vector.elementAt(n4);
                if (((ax)object).b > ax2.b) {
                    int n5 = n4;
                    int n6 = n3;
                    object = vector;
                    Object e2 = ((Vector)object).elementAt(n5);
                    ((Vector)object).setElementAt(((Vector)object).elementAt(n6), n5);
                    ((Vector)object).setElementAt(e2, n6);
                }
                ++n4;
            }
            ++n3;
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 20: {
                this.Q = -1;
                break;
            }
            case 21: {
                main.a.b(kf.Q, 70);
                break;
            }
            case 70: {
                this.n = -1;
                this.W = false;
                ie.a().e();
                main.a.h();
            }
        }
        super.a(n2, n3);
    }

    public kd() {
        this.L = new by(kf.B, 21);
        this.t();
    }

    private void t() {
        this.S = main.a.n - main.a.T;
        if (main.a.m < 150) {
            O = 26;
            P = 32;
            this.S = main.a.q - main.a.T - 10;
        } else {
            O = 54;
            P = 72;
        }
        if (gy.Y == 2) {
            O = 144;
            P = 194;
        }
        String[] stringArray = new String[]{"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "Heo"};
    }

    public final void e() {
        super.e();
        this.t();
        if (kx.j) {
            this.d(false);
        }
        this.c = null;
    }

    public final void g() {
        this.a_();
        super.g();
    }

    private void u() {
        ((ax)this.K.elementAt((int)this.o)).f = !((ax)this.K.elementAt((int)this.o)).f;
        this.g = this.v();
        this.h = cv.b(this.g);
        if (this.h != -1) {
            kx.a(kf.eE[this.h], 10, -1);
        }
        this.d(false);
    }

    /*
     * Unable to fully structure code
     */
    protected final void j() {
        block25: {
            super.j();
            if (this.W) {
                var1_1 = false;
                var2_3 = 0;
                while (var2_3 < this.g.length) {
                    if (this.g[var2_3] == 0) {
                        var1_1 = true;
                    }
                    ++var2_3;
                }
                if (!var1_1) {
                    kx.a(GameMidlet.i.w, kf.R);
                    return;
                }
                this.W = false;
            }
            if (this.c == null || this.c.size() == 0) break block25;
            var4_4 = this.e;
            var3_5 = this.d;
            var2_3 = this.h;
            var1_2 = this.g;
            switch (var4_4) {
                case -1: {
                    if (var2_3 != -1) {
                        v0 = true;
                        break;
                    }
                }
                case 0: {
                    if (var2_3 == 0 && var1_2[0] > var3_5[0]) {
                        v0 = true;
                        break;
                    }
                    if (var3_5[0] / 4 == 12 && (var2_3 == 4 || var2_3 == 5 || var2_3 == 6)) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 2: {
                    if (var2_3 == 2 && var1_2[1] > var3_5[1]) {
                        v0 = true;
                        break;
                    }
                    if (var3_5[0] / 4 == 12 && (var2_3 == 6 || var2_3 == 5)) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 3: {
                    if (var2_3 == 3 && var1_2[2] > var3_5[2]) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 1: {
                    if (var2_3 == 1 && var1_2.length == var3_5.length && var1_2[var1_2.length - 1] > var3_5[var3_5.length - 1]) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 4: {
                    if (var2_3 == 4 && var1_2[5] > var3_5[5] || var2_3 == 6 || var2_3 == 5) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 6: {
                    if (var2_3 == 6 && var1_2[3] > var3_5[3] || var2_3 == 5) {
                        v0 = true;
                        break;
                    }
                    ** GOTO lbl64
                }
                case 5: {
                    if (var2_3 == 5 && var1_2[7] > var3_5[7]) {
                        v0 = true;
                        break;
                    }
                }
lbl64:
                // 9 sources

                default: {
                    v0 = false;
                }
            }
            if (!v0) {
                kx.a(GameMidlet.i.w, kf.S);
                return;
            }
        }
        ie.a().a(this.g);
        this.n = -1;
        this.ae = null;
    }

    private void c(boolean bl2) {
        ((ax)this.K.elementAt((int)this.o)).f = bl2;
        this.g = this.v();
        this.h = cv.b(this.g);
        this.d(false);
    }

    private void b(int n2) {
        if (this.Q == -1) {
            this.o += n2;
            if (this.o >= this.K.size()) {
                this.o = 0;
            }
            if (this.o < 0) {
                this.o = this.K.size() - 1;
                return;
            }
        } else {
            if (this.Q > 0 || this.Q < this.K.size() - 1) {
                ax ax2 = (ax)this.K.elementAt(this.Q + n2);
                this.K.setElementAt(this.K.elementAt(this.Q), this.Q + n2);
                this.K.setElementAt(ax2, this.Q);
                this.Q += n2;
                this.o = this.Q;
            }
            this.d(true);
        }
    }

    public final void l() {
        super.l();
        if (kx.j) {
            int n2 = this.K.size();
            if (this.K != null && n2 > 0) {
                if (main.a.g && main.a.a(this.R - O / 2, this.S - P / 2 - 30, this.y * (n2 - 1) + O, P + 15)) {
                    this.U = true;
                    main.a.g = false;
                    this.V = (main.a.j - (this.R - O / 2)) / this.y;
                    this.T = true;
                    this.o = this.V;
                }
                if (this.U) {
                    n2 = main.a.k();
                    int n3 = main.a.l();
                    if (main.a.e) {
                        if (n3 > 10) {
                            this.c(true);
                        } else if (n3 < -10) {
                            this.c(false);
                        } else if (aw.f(n2) > 10) {
                            if (this.T) {
                                this.Q = this.o;
                            }
                            this.T = false;
                            int n4 = (main.a.h - (this.R - O / 2)) / this.y;
                            if (this.o != n4) {
                                if (this.Q != -1) {
                                    if (n4 < this.Q) {
                                        this.b(-1);
                                    } else if (n4 > this.Q) {
                                        this.b(1);
                                    }
                                    this.o = this.Q;
                                    this.T = true;
                                    return;
                                }
                                this.T = false;
                            }
                            this.o = n4;
                            if (this.o < 0) {
                                this.o = 0;
                            }
                            if (this.o >= this.K.size()) {
                                this.o = this.K.size() - 1;
                            }
                            this.d(true);
                        }
                    }
                    if (main.a.f) {
                        this.U = false;
                        this.Q = -1;
                        if (aw.f(n2) <= 10 && aw.f(n3) <= 10) {
                            this.c(!((ax)this.K.elementAt((int)this.o)).f);
                        }
                    }
                }
            }
            if (main.a.a(6)) {
                this.b(1);
            } else if (main.a.a(4)) {
                this.b(-1);
            }
            if (main.a.a(2)) {
                if (this.Q != -1) {
                    this.Q = -1;
                    this.d(true);
                    return;
                }
                this.u();
                this.d(true);
            }
            if (main.a.a(8)) {
                ax ax2 = (ax)this.K.elementAt(this.o);
                if (ax2.f) {
                    this.u();
                    this.d(true);
                    return;
                }
                this.Q = this.o;
                this.d(true);
            }
        }
    }

    public final void k() {
        super.k();
        if (kx.j && this.K != null && this.K.size() > 0) {
            int n2 = this.K.size() - 1;
            while (n2 >= 0) {
                ax ax2 = (ax)this.K.elementAt(n2);
                int n3 = ax2.a();
                if (n3 == 1) break;
                if (n3 == -1) {
                    ax2.g = false;
                }
                --n2;
            }
        }
        if (kx.t != 0L && (kx.u = System.currentTimeMillis()) > kx.t) {
            if (this.n == GameMidlet.i.w) {
                ie.a().e();
                this.n = -1;
            }
            kx.t = 0L;
        }
        if (kx.j || kx.k) {
            if (this.Q != -1) {
                this.ac = null;
                this.ae = null;
                if (main.a.Z == 0) {
                    this.ad = this.M;
                }
                return;
            }
            if (kx.l) {
                this.ac = null;
                this.ad = kx.C;
                this.ae = null;
            } else if (this.n == GameMidlet.i.w) {
                this.ae = this.L;
                this.ad = this.v().length > 0 ? (this.h != -1 ? kx.D : null) : null;
            } else {
                this.ae = null;
                this.ad = null;
            }
            kd kd2 = this;
            if (kd2.c != null && kd2.N) {
                int n4 = 0;
                while (n4 < kd2.c.size()) {
                    ax ax3 = (ax)kd2.c.elementAt(n4);
                    if (ax3 != null) {
                        int n5 = ax3.a();
                        if (n4 == kd2.c.size() - 1 && n5 == 0) {
                            kd2.N = false;
                        }
                    }
                    ++n4;
                }
            }
            return;
        }
        this.q();
        this.ae = null;
    }

    private void d(boolean bl2) {
        int n2;
        if (this.K.size() > 0 && !bl2) {
            n2 = 12;
            if (main.a.H && (n2 = (main.a.m - O / 2) / this.K.size()) > O / 3 << 1) {
                n2 = O / 3 << 1;
            }
            this.y = (main.a.m - 60) / this.K.size() + 1;
            if (this.y > n2) {
                this.y = n2;
            }
            if (this.y < 9) {
                this.y = 9;
            }
            if (main.a.H) {
                this.y = n2;
            }
            this.R = (main.a.m - (this.y * this.K.size() + (O - this.y)) >> 1) + O / 2;
            if (this.R < O / 2) {
                this.R = O / 2;
            }
        }
        n2 = this.K.size();
        int n3 = this.R;
        int n4 = 0;
        while (n4 < n2) {
            ax ax2 = (ax)this.K.elementAt(n4);
            int n5 = 0;
            if (ax2.f) {
                n5 = -8 * (main.a.Z + 1);
            }
            int n6 = this.S + n5;
            int n7 = n3;
            ax ax3 = ax2;
            ax2.m = n7;
            ax3.l = n6;
            ax3.e = aw.a(ax3.c, ax3.d, ax3.m, ax3.l);
            if (n4 == this.Q && !main.a.H) {
                ax2.l += 8 * (main.a.Z + 1);
            }
            n3 += this.y;
            if (bl2) {
                ax2.c = ax2.m;
                ax2.d = ax2.l;
            }
            ++n4;
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        super.a(graphics);
    }

    public final void a_(Graphics graphics) {
        int n2 = 0;
        while (n2 < kx.H) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != -1) {
                if (hn2.w != GameMidlet.i.w || !kx.j) {
                    hn2.a(graphics, hn2.aw, hn2.ax, false);
                }
                hn2.a(graphics, hn2.aw, hn2.ax);
                kx.a(graphics, hn2.aw, hn2.ax - 50, 3, hn2);
            }
            ++n2;
        }
    }

    public final void b(Graphics graphics) {
        Object object;
        int n2;
        int n3;
        Object object2;
        kd kd2;
        Graphics graphics2;
        super.b(graphics);
        this.a_(graphics);
        if (kx.j || kx.k) {
            graphics2 = graphics;
            kd2 = this;
            if (kd2.c != null && kd2.c.size() != 0) {
                object2 = graphics2;
                kd kd3 = kd2;
                n3 = kd3.c.size();
                n2 = 0;
                while (n2 < n3) {
                    object = (ax)kd3.c.elementAt(n2);
                    if (main.a.m < 150) {
                        ((ax)object).a((Graphics)object2, false);
                    } else if (n2 == n3 - 1) {
                        ((ax)object).c((Graphics)object2);
                    } else {
                        ((ax)object).a((Graphics)object2);
                    }
                    ++n2;
                }
                if (!kd2.N) {
                    kd2.N = true;
                }
            }
        }
        if (kx.j || kx.k) {
            graphics2 = graphics;
            kd2 = this;
            int n4 = 0;
            while (n4 < 4) {
                object2 = (hn)kx.m.elementAt(n4);
                if (((gx)object2).w != -1) {
                    n3 = 0;
                    n2 = 0;
                    if (kx.x[n4] == 2) {
                        n3 = -80;
                    }
                    if (kx.x[n4] == 1) {
                        n2 = -10;
                    } else if (kx.x[n4] == 3) {
                        n2 = 10;
                    }
                    if (main.a.m > 160) {
                        main.a.Q.a(graphics2, String.valueOf(((hn)object2).c()) + " " + kf.k(), kx.F[kx.x[n4]].a + n2, kx.F[kx.x[n4]].b + 5 + n3, kx.F[kx.x[n4]].c);
                    }
                    if (((gx)object2).w == kd2.n && kd2.ad != kx.C) {
                        object = "";
                        if (kx.t != 0L) {
                            long l2 = (kx.u - kx.t) / 1000L;
                            object = String.valueOf(object) + -l2;
                        }
                        int n5 = kx.F[kx.x[n4]].a;
                        int n6 = kx.F[kx.x[n4]].b + 13 * gy.Y;
                        if (kx.x[n4] == 2) {
                            n6 = kd2.S - P / 2 - 20 * gy.Y;
                        }
                        je.a(n5 - 10 * gy.Y, n6, 20 * gy.Y, gy.af, 16776365, graphics2);
                        graphics2.setColor(332544);
                        graphics2.drawRect(n5 - 10 * gy.Y, n6, 20 * gy.Y, (int)gy.af);
                        main.a.N.a(graphics2, (String)object, n5, n6 + 1, 2);
                    }
                }
                ++n4;
            }
        }
        if (kx.j) {
            this.e(graphics);
        }
        if (kx.j || kx.k) {
            this.f(graphics);
        }
        kx.d(graphics);
        main.a.c(graphics);
    }

    private void e(Graphics graphics) {
        if (kx.j && this.K != null && this.K.size() > 0) {
            int n2 = this.K.size();
            int n3 = 0;
            int n4 = 0;
            int n5 = 0;
            while (n5 < n2) {
                ax ax2 = (ax)this.K.elementAt(n5);
                ax ax3 = new ax(-1, false);
                new ax(-1, false).c = ax2.c;
                ax3.d = ax2.d;
                if (!ax2.g) {
                    ax3 = (ax)this.K.elementAt(n5);
                }
                if (main.a.m < 150) {
                    ax3.a(graphics, false);
                } else if (n5 == n2 - 1 || n5 == this.Q || ax2.f || n5 == this.Q - 1 || ax3 != null && ax3.f) {
                    ax3.c(graphics);
                } else if (this.y > 14 || ax3.c != ax3.m || ax3.d != ax3.l) {
                    ax3.b(graphics);
                } else {
                    ax3.a(graphics);
                }
                if (n5 == this.o) {
                    n4 = ax3.d - P / 2 - 2 + (main.a.l % 10 > 4 ? 2 : 0);
                    n3 = ax3.c - O / 2 + 5 * gy.Y;
                }
                if (main.a.Z == 0 && n5 == this.Q && main.a.l % 10 > 6 && gy.Y == 1) {
                    je.b.a(0, ax2.c - 40, ax2.d - 30, 0, graphics);
                    je.b.a(0, ax2.c - 10, ax2.d - 30, 3, graphics);
                }
                ++n5;
            }
            if (main.a.Z == 0) {
                ea.b().b.a(0, n3, n4, 0, 33, graphics);
            }
        }
    }

    private void f(Graphics graphics) {
        if (this.f == null || this.f.size() == 0) {
            return;
        }
        int n2 = this.f.size();
        int n3 = (main.a.m - 60) / n2 + 1;
        if (n3 > 12) {
            n3 = 12;
        }
        int n4 = main.a.o - (n3 * n2 >> 1) + 6;
        int n5 = (main.a.n + main.a.T) / 2;
        int n6 = 0;
        while (n6 < n2) {
            ax ax2 = (ax)this.f.elementAt(n6);
            ((ax)this.f.elementAt(n6)).c = n4;
            ax2.d = n5;
            n4 += n3 * gy.Y;
            if (main.a.m < 150) {
                ax2.a(graphics, false);
            } else if (n6 == n2 - 1) {
                ax2.c(graphics);
            } else {
                ax2.a(graphics);
            }
            ++n6;
        }
    }

    public final void a(int n2, byte by2, Vector vector) {
        ax ax2;
        int n3;
        hj.z();
        this.t();
        super.s();
        kx.j = true;
        this.W = false;
        if (this.b && n2 == GameMidlet.i.w) {
            n3 = 0;
            while (n3 < vector.size()) {
                ax2 = (ax)vector.elementAt(n3);
                if (ax2.b == 0) {
                    this.W = true;
                    break;
                }
                ++n3;
            }
        }
        this.f = null;
        this.c = new Vector();
        this.e = (byte)-1;
        this.d = new byte[0];
        kx.l = false;
        this.K = vector;
        kd.a(vector);
        n3 = 0;
        while (n3 < this.K.size()) {
            ax2 = (ax)this.K.elementAt(n3);
            ((ax)this.K.elementAt(n3)).c = main.a.o;
            ax2.d = (main.a.n + main.a.T) / 2;
            ax2.g = true;
            ++n3;
        }
        int n4 = 0;
        while (n4 < kx.H) {
            kx.m.elementAt(n4);
            ++n4;
        }
        kx.v = by2;
        kx.t = System.currentTimeMillis() + (long)(by2 * 1000);
        if (n2 == GameMidlet.i.w) {
            this.ae = this.L;
        }
        hn hn2 = kx.h(n2);
        kx.a(String.valueOf(hn2.x) + kf.U, 20, hn2.w);
        this.e = (byte)-1;
        this.d = new byte[0];
        this.o = 2;
        this.n = n2;
        this.f();
        this.d(false);
    }

    public final void a(int n2, byte[] byArray, int n3) {
        this.W = false;
        if (n2 != -1) {
            int n4;
            int n5 = kx.i(n2);
            int n6 = kx.x[n5];
            byte[] byArray2 = byArray;
            kd kd2 = this;
            int n7 = 0;
            int n8 = 0;
            switch (n6) {
                case 2: {
                    n7 = main.a.o;
                    n8 = main.a.n + main.a.T - 20;
                    n6 = kd2.K.size() - 1;
                    while (n6 >= 0) {
                        ax ax2 = (ax)kd2.K.elementAt(n6);
                        n4 = 0;
                        while (n4 < byArray2.length) {
                            if (ax2.b == byArray2[n4]) {
                                n7 = ax2.c;
                                n8 = ax2.d;
                                break;
                            }
                            ++n4;
                        }
                        --n6;
                    }
                    break;
                }
                case 0: {
                    n7 = main.a.o;
                    n8 = -27;
                    break;
                }
                case 3: {
                    n7 = main.a.m + 10;
                    n8 = (main.a.n + main.a.T) / 2 - 20;
                    break;
                }
                case 1: {
                    n7 = -10;
                    n8 = (main.a.n + main.a.T) / 2 - 20;
                }
            }
            n6 = main.a.o + aw.a.nextInt(20);
            int n9 = main.a.n / 2 - 20 * gy.Y + aw.a.nextInt(25);
            n4 = byArray2.length;
            int n10 = (main.a.m - 60) / n4 + 1;
            if (n10 > 12) {
                n10 = 12;
            }
            int n11 = (n10 * n4 >> 1) + 6;
            kd2.N = true;
            kd2.c = new Vector();
            kd2.d = byArray2;
            int n12 = 0;
            while (n12 < n4) {
                ax ax3 = new ax(byArray2[n12]);
                new ax(byArray2[n12]).c = n7 + n12 * kd2.y;
                ax3.d = n8;
                ax3.m = n6 - n11;
                ax3.l = n9;
                n11 -= n10 * gy.Y;
                kd2.c.addElement(ax3);
                ++n12;
            }
            kd2.e = cv.b(kd2.d);
        }
        if (n2 == GameMidlet.i.w) {
            this.a(byArray);
            this.o = 0;
            this.d(false);
        }
        this.n = n3;
        this.ae = this.n == GameMidlet.i.w ? (this.v().length == 0 ? this.L : kx.D) : null;
        if (kx.v == 0) {
            kx.v = 30;
        }
        kx.t = System.currentTimeMillis() + (long)(kx.v * 1000);
    }

    public final void a(int n2, int n3, boolean bl2) {
        if (bl2) {
            hj.z();
        }
        hn hn2 = kx.h(n2);
        String string = hn2.x.equals("") ? kf.u : kf.B;
        kx.a(string, 60, hn2.w);
        this.n = n3;
        if (bl2) {
            this.c = new Vector();
            this.e = (byte)-1;
            this.d = new byte[0];
        }
        this.ae = this.n == GameMidlet.i.w ? (this.v().length == 0 ? this.L : kx.D) : null;
        kx.t = System.currentTimeMillis() + (long)(kx.v * 1000);
    }

    public final void a(int n2, byte[] byArray) {
        hn hn2 = kx.h(n2);
        cv.a(byArray);
        this.f = new Vector();
        int n3 = 0;
        while (n3 < byArray.length) {
            this.f.addElement(new ax(byArray[n3]));
            ++n3;
        }
        if (hn2 != null && hn2.w == n2 && this.K != null) {
            this.K.removeAllElements();
        }
    }

    public static void a(int n2, byte by2, int n3, int n4) {
        hn hn2 = kx.h(n2);
        if (hn2 != null) {
            hn2.o = false;
            if ((n4 = hn2.n + n4) < 0) {
                n4 = 0;
            }
            hn2.d(n4);
            hn2.b(hn2.c() + n3);
            if (hn2.w == GameMidlet.i.w) {
                GameMidlet.i.b(hn2.c());
            }
        }
        kx.a(n2, String.valueOf(kf.W) + (by2 + 1));
    }

    public static void m() {
        kx.l = true;
    }

    public final void b(String string) {
        kx.a(string, 100, GameMidlet.i.w);
        this.n = GameMidlet.i.w;
    }

    public static void b(boolean bl2) {
        hj.z();
        kx.j = false;
    }

    private void a(byte[] byArray) {
        int n2 = this.K.size();
        --n2;
        while (n2 >= 0) {
            ax ax2 = (ax)this.K.elementAt(n2);
            int n3 = 0;
            while (n3 < byArray.length) {
                if (ax2.b == byArray[n3]) {
                    this.K.removeElementAt(n2);
                }
                ++n3;
            }
            --n2;
        }
    }

    private byte[] v() {
        Object object;
        Vector<byte[]> vector = new Vector<byte[]>();
        int n2 = this.K.size();
        int n3 = 0;
        while (n3 < n2) {
            ax ax2 = (ax)this.K.elementAt(n3);
            object = ax2;
            if (ax2.f) {
                vector.addElement((byte[])object);
            }
            ++n3;
        }
        n3 = vector.size();
        object = new byte[n3];
        n2 = 0;
        while (n2 < n3) {
            object[n2] = ((ax)vector.elementAt((int)n2)).b;
            ++n2;
        }
        cv.a(object);
        return object;
    }
}


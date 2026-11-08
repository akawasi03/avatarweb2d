/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class cz
extends hj
implements cq {
    public static cz a;
    private by q;
    private by r;
    public by b;
    private by s;
    private by t;
    private by u;
    public hl[] c;
    private short v;
    private boolean w;
    public boolean d;
    private boolean x;
    private long y;
    public byte e = 0;
    public byte f = 1;
    public byte g;
    public static Image h;
    public static Image i;
    public static Image[] j;
    public static Image[] k;
    private fh z;
    public ki l;
    public static byte[][] m;
    private int A;
    private int B;
    private int C;
    private int D;
    private int E;
    private int F;
    private int G;
    private int H;
    private int I;
    private int J;
    private int K;
    private int L;
    private int M;
    private int N;
    private int O;
    private int P;
    private ht Q;
    private ht R;
    private ht S;
    private ht T;
    private boolean U = false;
    private byte V = 0;
    private byte W;
    public short n = 0;
    public long o;
    public Vector p = new Vector();
    private int X;
    private int ay;
    private int az = -1;
    private int aA = 0;
    private int aB = 0;
    private byte aC;
    private boolean aD = false;
    private long aE;
    private long aF;
    private int[] aG = new int[]{100, 500, 1000, 2000, 5000, 10000, 20000, 30000, 50000};
    private boolean aH = false;
    private short aI;
    private short aJ;
    private String aK;
    private byte aL;
    private byte aM;
    private byte aN;

    public static cz b() {
        if (a == null) {
            a = new cz();
            return a;
        }
        return a;
    }

    public cz() {
        byte[][] byArrayArray = new byte[3][];
        m = byArrayArray;
        byte[] byArray = new byte[12];
        byArray[3] = 1;
        byArray[4] = 1;
        byArray[5] = 1;
        byArray[9] = 1;
        byArray[10] = 1;
        byArray[11] = 1;
        byArrayArray[0] = byArray;
        cz.m[1] = new byte[]{2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3};
        cz.m[2] = new byte[]{4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4};
        this.q = new by(kf.bz, 3, this);
        this.s = new by(kf.ec, 1, this);
        this.r = new by(kf.c, 7, this);
        this.t = new by(kf.z, 6, this);
        this.u = new by(kf.d, 8, this);
        this.b = new by(kf.x, 2, this);
        this.A = 220 * gy.Y;
        this.B = 240 * gy.Y;
        this.E = 8 * gy.Y;
        this.F = this.J = 23 * gy.Y;
        this.G = 105 * gy.Y;
        this.H = this.L = 211 * gy.Y;
        this.K = 95 * gy.Y;
        this.I = this.A - this.K - 8 * gy.Y;
        this.O = 180 * gy.Y + 10 * gy.Y + 10 * gy.Y;
        this.P = 110 * gy.Y;
        this.M = (main.a.m - this.O) / 2;
        this.N = (main.a.n - this.P) / 2;
    }

    public final void a() {
        super.a();
    }

    public final void a(hl[] hlArray, short s2, boolean bl2, boolean bl3) {
        this.x = false;
        this.f = 1;
        this.X = -1;
        main.a.v = null;
        main.a.A = null;
        this.U = false;
        if (h == null) {
            try {
                this.Q = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/race/popup/tile1.png")), 20 * gy.Y, 20 * gy.Y);
                this.R = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/race/popup/bt1.png")), 31 * gy.Y, 31 * gy.Y);
                this.T = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/race/popup/bt0.png")), 60 * gy.Y, 24 * gy.Y);
                this.S = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/race/popup/time.png")), 14 * gy.Y, 14 * gy.Y);
                h = Image.createImage((String)(String.valueOf(kf.a()) + "/race/28.png"));
                i = Image.createImage((String)(String.valueOf(kf.a()) + "/race/29.png"));
                j = new Image[5];
                int n2 = 0;
                while (n2 < 5) {
                    cz.j[n2] = Image.createImage((String)(String.valueOf(kf.a()) + "/race/bui/d0" + n2 + ".png"));
                    ++n2;
                }
                k = new Image[3];
                n2 = 0;
                while (n2 < 3) {
                    cz.k[n2] = Image.createImage((String)(String.valueOf(kf.a()) + "/race/bui/w" + n2 + ".png"));
                    ++n2;
                }
            }
            catch (Exception exception) {
                Exception exception2 = exception;
                exception.printStackTrace();
            }
        }
        if (!bl2) {
            if (bl3) {
                int n3 = 0;
                while (n3 < ir.m.size()) {
                    js js2 = (js)ir.m.elementAt(n3);
                    if (js2.az == 10) {
                        ir.a(js2);
                    }
                    ++n3;
                }
            }
            if (a != main.a.r) {
                ir.a(ir.m);
                cz.b().a();
                ir.t = -1;
                this.b(1);
                this.b(2);
                main.a.x.e(108);
                ir.c(GameMidlet.i);
                cz cz2 = cz.b();
                do.a().b(ir.a);
                cz2.C = (main.a.m - cz2.A) / 2;
                cz2.D = (main.a.n - cz2.B) / 2;
                cz2.W = (byte)(35 * gy.Y);
                if (main.a.a.getHeight() <= 240) {
                    cz2.W = (byte)30;
                    cz2.B = 215;
                    cz2.L = 185;
                    cz2.H = 185;
                }
                do.g = false;
            }
            this.c = null;
            this.c = hlArray;
            if (hlArray != null) {
                int n4 = 0;
                while (n4 < 6) {
                    this.c[n4].aw = 20;
                    this.c[n4].ax = 80 + n4 * 12;
                    ir.m.addElement(this.c[n4]);
                    ++n4;
                }
                do.a().h = this.c[2];
                this.g = (byte)3;
            }
            GameMidlet.i.C = 0;
            GameMidlet.i.aw = 0;
        }
        GameMidlet.i.ax = GameMidlet.i.D = 96 * gy.Y;
        this.d = bl2;
        this.w = bl3;
        this.v = s2;
        this.y = System.currentTimeMillis();
        if (bl2) {
            this.e = (byte)48;
            this.ad = null;
            this.ae = this.q;
            this.ac = this.r;
        } else {
            this.ac = this.r;
            this.ae = null;
            this.ad = null;
            if (!bl3) {
                this.ae = this.q;
                int n5 = 0;
                while (n5 < 6) {
                    int n6 = 0;
                    int n7 = 0;
                    while (n7 < this.c[n5].e.length) {
                        this.c[n5].aw += this.c[n5].f[n7] * this.c[n5].e[n7];
                        this.c[n5].b = (byte)(this.c[n5].b + 1);
                        if ((n6 += this.c[n5].e[n7]) >= (s2 - 4) * 20) break;
                        ++n7;
                    }
                    ++n5;
                }
            } else {
                cx.a().k(this.c[0].w);
                this.ad = this.s;
            }
        }
        this.z = new fh();
    }

    private void b(int n2) {
        Object object;
        Object object2;
        Vector<Object> vector = new Vector<Object>();
        Vector<Object> vector2 = new Vector<Object>();
        Vector<Object> vector3 = new Vector<Object>();
        Vector<Object> vector4 = new Vector<Object>();
        Vector<Object> vector5 = new Vector<Object>();
        int n3 = 0;
        while (n3 < fx.b.length) {
            object2 = fx.b[n3];
            if (((ld)object2).f == -1 && ((ld)object2).g < 2000 && ((ld)object2).k > 0) {
                object = (fa)object2;
                if (((fa)object).b == n2 || ((fa)object).b == 0) {
                    if (((ld)object).j == 10) {
                        vector.addElement(object);
                    } else if (((ld)object2).j == 20) {
                        vector2.addElement(object);
                    } else if (((ld)object2).j == 30) {
                        vector3.addElement(object);
                    } else if (((ld)object2).j == 40) {
                        vector4.addElement(object);
                    } else if (((ld)object2).j == 50) {
                        vector5.addElement(object);
                    }
                }
            }
            ++n3;
        }
        n3 = 0;
        while (n3 < 10) {
            object2 = new hn();
            new hn().d = (byte)n2;
            object = new hx();
            new hx().a = ((ld)vector.elementAt((int)aw.e((int)vector.size()))).g;
            ((hn)object2).a((hx)object);
            object = new hx();
            new hx().a = ((ld)vector2.elementAt((int)aw.e((int)vector2.size()))).g;
            ((hn)object2).a((hx)object);
            object = new hx();
            new hx().a = ((ld)vector3.elementAt((int)aw.e((int)vector3.size()))).g;
            ((hn)object2).a((hx)object);
            object = new hx();
            new hx().a = ((ld)vector4.elementAt((int)aw.e((int)vector4.size()))).g;
            ((hn)object2).a((hx)object);
            object = new hx();
            new hx().a = ((ld)vector5.elementAt((int)aw.e((int)vector5.size()))).g;
            ((hn)object2).a((hx)object);
            ((hn)object2).h();
            this.p.addElement(object2);
            ++n3;
        }
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                cx cx2 = cx.a();
                cx2.e((byte)8);
                cx2.k();
                main.a.i();
                return;
            }
            case 1: {
                if (this.aA < 0) break;
                this.U = true;
                this.ad = this.t;
                this.ac = null;
                this.ae = this.u;
                return;
            }
            case 2: {
                fl fl2 = new fl(this);
                if (this.d) {
                    main.a.a(kf.eP, fl2);
                    return;
                }
                main.a.a(kf.ee, fl2);
                return;
            }
            case 3: {
                byte by2 = this.g;
                this.g = (byte)(by2 + 1);
                do.a().h = this.c[by2];
                if (this.g < 6) break;
                this.g = 0;
                return;
            }
            case 5: {
                if (this.d || !this.w) {
                    this.ac = this.q;
                }
                this.ae = null;
                return;
            }
            case 6: {
                cx.a().c(this.c[this.aA].w, this.aG[this.aB]);
                this.a(8);
                return;
            }
            case 7: {
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.ed, 0, this));
                vector.addElement(new by(kf.x, 2, this));
                le.a().a(vector, 0);
                return;
            }
            case 8: {
                this.ad = this.s;
                this.ac = this.r;
                this.ae = null;
                this.U = false;
            }
        }
    }

    public final void k() {
        int n2;
        if (this.aC >= 0) {
            this.aC = (byte)(this.aC - 1);
            if (this.aC == 0) {
                this.e();
            }
        }
        if ((this.d || !this.w) && System.currentTimeMillis() - this.o >= 1000L) {
            this.o = System.currentTimeMillis();
            this.n = (short)(this.n - 1);
            if (this.n < 0) {
                this.n = 0;
            }
        }
        GameMidlet.i.a(do.a().a + main.a.o, do.a().b + main.a.n - 40 * gy.Y);
        if (System.currentTimeMillis() - this.y >= 1000L) {
            this.y = System.currentTimeMillis();
            this.v = (short)(this.v - 1);
            if (this.v < 0) {
                this.v = 0;
            } else {
                ++this.ay;
                if (this.w && !this.d && this.ay > 0) {
                    this.ay = 0;
                    if (this.aA >= 0 && this.c != null && this.aA < 6 && this.c[this.aA] != null && this.c[this.aA].w != this.X) {
                        this.X = this.c[this.aA].w;
                        cx.a().k(this.X);
                    }
                }
            }
        }
        if (this.c != null) {
            n2 = 0;
            int n3 = 0;
            while (n3 < 6) {
                if ((this.d || !this.w) && this.c[n3].b >= this.c[n3].f.length) {
                    ++n2;
                }
                ++n3;
            }
            if (!this.x && n2 == 6) {
                this.x = true;
                n3 = 0;
                while (n3 < 6) {
                    ir.a(this.c[n3]);
                    ++n3;
                }
            }
            if (this.x && this.l != null) {
                this.x = false;
                main.a.A = this.l;
                GameMidlet.i.a[0] = GameMidlet.i.a[0] + this.l.f;
                main.a.a(this.l.f, main.a.o, main.a.n - 30 * gy.Y, -1, -1);
                this.l = null;
            }
        }
        main.a.x.b();
        if (this.d && this.e > 0) {
            this.e = (byte)(this.e - 1);
        }
        if (this.z != null && this.z.a()) {
            this.z.d = null;
        }
        if (this.d || !this.w) {
            n2 = 0;
            while (n2 < ir.m.size()) {
                gx gx2 = (gx)ir.m.elementAt(n2);
                if (gx2.az == 9) {
                    gx2 = (hn)gx2;
                    if (System.currentTimeMillis() / 1000L - (long)((hn)gx2).n > (long)((hn)gx2).an) {
                        ((hn)gx2).n = (int)(System.currentTimeMillis() / 1000L);
                        ((hn)gx2).an = (short)(aw.e(10) + 6);
                        int n4 = aw.e(6);
                        if (n4 == 1) {
                            ((hn)gx2).b((byte)0);
                        } else if (n4 == 3) {
                            ((hn)gx2).b((byte)0);
                            ((hn)gx2).g();
                        } else if (n4 == 2) {
                            ((hn)gx2).b((byte)7);
                        } else {
                            ((hn)gx2).b((byte)2);
                        }
                    }
                }
                ++n2;
            }
        }
    }

    public final void d(int n2) {
        im.d().a(n2, this);
        super.d(n2);
    }

    public final void l() {
        super.l();
        ++this.aE;
        if (main.a.D == null || !bb.d) {
            super.l();
        }
        if (main.a.a(2)) {
            if (this.U) {
                if (this.aB / 3 > 0) {
                    this.aB -= 3;
                }
            } else {
                --this.aA;
                if (this.aA < 0) {
                    this.aA = 0;
                }
            }
        } else if (main.a.a(8)) {
            if (this.U) {
                if (this.aB / 3 < 2) {
                    this.aB += 3;
                }
            } else {
                ++this.aA;
                if (this.aA > 5) {
                    this.aA = 5;
                }
            }
        } else if (main.a.a(4)) {
            if (this.U && this.aB % 3 > 0) {
                --this.aB;
            }
        } else if (main.a.a(6) && this.U && this.aB % 3 < 2) {
            ++this.aB;
        }
        if (main.a.g && this.c != null && !this.d && this.w) {
            if (this.U) {
                if (main.a.b(this.M + this.O - 30 * gy.Y, this.N, 30 * gy.Y, 30 * gy.Y)) {
                    main.a.g = false;
                    this.V = (byte)5;
                    this.aD = true;
                    this.aF = this.aE;
                } else {
                    int n2 = 0;
                    while (n2 < 9) {
                        if (main.a.b(this.M + 5 * gy.Y + n2 % 3 * (5 * gy.Y + this.T.a), this.N + (this.P - 29 * gy.Y * 3) + n2 / 3 * 29 * gy.Y - 1 * gy.Y, 60 * gy.Y, 26 * gy.Y)) {
                            this.aB = n2;
                            main.a.g = false;
                            this.aD = true;
                            this.aF = this.aE;
                            break;
                        }
                        ++n2;
                    }
                }
            } else {
                int n3 = 0;
                while (n3 < 6) {
                    if (main.a.b(this.C + this.I + 32 * gy.Y / 2 - 15 * gy.Y, this.D + this.J + 3 * gy.Y + 35 * gy.Y * n3 + 31 * gy.Y / 2 - 15 * gy.Y, 31 * gy.Y, 31 * gy.Y)) {
                        this.az = n3;
                        this.aD = true;
                        main.a.g = false;
                        this.aF = this.aE;
                        break;
                    }
                    if (main.a.b(this.C + this.I + this.K - 1 * gy.Y - this.T.a, this.D + this.J + 3 * gy.Y + 35 * gy.Y * n3 + 31 * gy.Y / 2 - 15 * gy.Y, 60 * gy.Y, 31 * gy.Y)) {
                        this.aA = n3;
                        this.aD = true;
                        main.a.g = false;
                        this.aF = this.aE;
                        break;
                    }
                    ++n3;
                }
            }
        }
        if (this.aD) {
            if (main.a.e) {
                if (this.aB != -1) {
                    if (!main.a.b(this.M + 5 * gy.Y + this.aB % 3 * (5 * gy.Y + this.T.a), this.N + (this.P - 29 * gy.Y * 3) + this.aB / 3 * 29 * gy.Y - 1 * gy.Y, 60 * gy.Y, 26 * gy.Y)) {
                        this.aB = -1;
                    }
                } else if (this.V != 0) {
                    if (!main.a.b(this.M + this.O - 30 * gy.Y, this.N, 30 * gy.Y, 30 * gy.Y)) {
                        this.V = 0;
                    }
                } else if (this.az != -1) {
                    if (!main.a.b(this.C + this.I + 32 * gy.Y / 2 - 15 * gy.Y, this.D + this.J + 3 * gy.Y + 35 * gy.Y * this.az + 31 * gy.Y / 2 - 15 * gy.Y, 31 * gy.Y, 31 * gy.Y)) {
                        this.az = -1;
                    }
                } else if (this.aA != -1 && !this.U && !main.a.b(this.C + this.I + this.K - 1 * gy.Y - this.T.a, this.D + this.J + 3 * gy.Y + 35 * gy.Y * this.aA + 31 * gy.Y / 2 - 15 * gy.Y, 60 * gy.Y, 31 * gy.Y)) {
                    this.aA = -1;
                }
            }
            if (main.a.f) {
                long l2 = this.aE - this.aF;
                if (l2 <= 4L) {
                    this.aC = (byte)5;
                } else {
                    this.e();
                }
                this.aD = false;
                main.a.f = false;
            }
        }
        if (this.d || !this.w) {
            main.a.x.a();
        }
    }

    private void e() {
        if (this.aB != -1) {
            cx.a().c(this.c[this.aA].w, this.aG[this.aB]);
            this.aB = -1;
            this.aA = -1;
            this.U = false;
            this.a(8);
            return;
        }
        if (this.V > 0) {
            this.V = 0;
            this.U = false;
            this.aA = -1;
            return;
        }
        if (this.az != -1) {
            cx.a().k(this.c[this.az].w);
            this.az = -1;
            return;
        }
        if (this.aA != -1) {
            this.U = true;
            this.ad = this.t;
            this.ac = null;
            this.ae = this.u;
        }
    }

    private static void a(Graphics graphics, int n2, int n3, int n4, int n5, ht ht2, int n6) {
        ht2.a(0, n2, n3, 0, graphics);
        ht2.a(2, n2 + n4 - ht2.a, n3, 0, graphics);
        ht2.a(5, n2, n3 + n5 - ht2.b, 0, graphics);
        ht2.a(7, n2 + n4 - ht2.a, n3 + n5 - ht2.b, 0, graphics);
        int n7 = 0;
        while (n7 < (n4 - (ht2.a << 1)) / ht2.a) {
            ht2.a(1, n2 + (n7 + 1) * ht2.a, n3, 0, graphics);
            ht2.a(6, n2 + (n7 + 1) * ht2.a, n3 + n5 - ht2.b, 0, graphics);
            ++n7;
        }
        ht2.a(1, n2 + n4 - (ht2.a << 1), n3, 0, graphics);
        ht2.a(6, n2 + n4 - (ht2.a << 1), n3 + n5 - ht2.b, 0, graphics);
        n7 = 0;
        while (n7 < (n5 - (ht2.b << 1)) / ht2.b) {
            ht2.a(3, n2, n3 + (n7 + 1) * ht2.b, 0, graphics);
            ht2.a(4, n2 + n4 - ht2.a, n3 + (n7 + 1) * ht2.b, 0, graphics);
            ++n7;
        }
        ht2.a(3, n2, n3 + n5 - (ht2.b << 1), 0, graphics);
        ht2.a(4, n2 + n4 - ht2.a, n3 + n5 - (ht2.b << 1), 0, graphics);
        if (n6 != -1) {
            graphics.setColor(n6);
            graphics.fillRect(n2 + ht2.a, n3 + ht2.b, n4 - (ht2.a << 1), n5 - (ht2.b << 1));
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        main.a.c(graphics);
        if (this.w) {
            main.a.S.a(graphics, this.C, this.D, this.A, this.B, je.d[2], je.d[3], 1);
            graphics.translate(this.C, this.D);
            main.a.K.a(graphics, kf.ec, this.A / 2, 6 * gy.Y, 2);
            cz.a(graphics, this.E, this.F, this.G, this.H, this.Q, -1);
            cz.a(graphics, this.I, this.J, this.K, this.L, gp.a, -12335933);
            int n2 = 0;
            while (n2 < 6) {
                this.R.a(this.az == n2 ? 1 : 0, this.I + 32 * gy.Y / 2, this.J + 3 * gy.Y + this.W * n2 + 31 * gy.Y / 2, 0, 3, graphics);
                fx.a(graphics, this.c[n2].d, this.I + 32 * gy.Y / 2, this.J + 3 * gy.Y + this.W * n2 + 31 * gy.Y / 2, 3);
                main.a.M.a(graphics, "x" + this.c[n2].a, this.I + 32 * gy.Y / 2 + this.R.a / 2 - 5 * gy.Y, this.J + 3 * gy.Y + this.W * n2 + 31 * gy.Y / 2 + this.R.b / 2 - gy.af, 2);
                this.T.a(this.aA == n2 ? 1 : 0, this.I + this.K - 1 * gy.Y - this.T.a, this.J + 7 * gy.Y + this.W * n2, 0, graphics);
                if (this.c[n2].g > 0) {
                    main.a.K.a(graphics, "" + this.c[n2].g, this.I + this.K - 1 * gy.Y - this.T.a / 2, this.J + 7 * gy.Y + this.W * n2 + this.T.b / 2 - gy.ah / 2 - gy.Y - 1, 2);
                } else {
                    main.a.K.a(graphics, kf.ec, this.I + this.K - 1 * gy.Y - this.T.a / 2, this.J + 7 * gy.Y + this.W * n2 + this.T.b / 2 - gy.ah / 2 - gy.Y - 1, 2);
                }
                ++n2;
            }
            if (this.aH && this.c != null) {
                Graphics graphics2 = graphics;
                cz cz2 = this;
                main.a.K.a(graphics2, cz2.aK, cz2.E + cz2.G / 2, cz2.F + 6 * gy.Y, 2);
                fx.a(graphics2, cz2.aI, cz2.E + cz2.G / 2, cz2.F + 40 * gy.Y, 3);
                int n3 = cz2.F + 70 * gy.Y;
                main.a.K.a(graphics2, kf.aP, cz2.E + 5 * gy.Y, n3, 0);
                main.a.N.a(graphics2, cz2.aJ + "%", cz2.E + cz2.G - 8 * gy.Y, n3 + gy.ah / 2 - gy.af / 2, 1);
                main.a.K.a(graphics2, kf.eg, cz2.E + 5 * gy.Y, n3 += gy.ah, 0);
                main.a.N.a(graphics2, "X" + cz2.aL, cz2.E + cz2.G - 8 * gy.Y, n3 + gy.ah / 2 - gy.af / 2, 1);
                main.a.K.a(graphics2, kf.eh, cz2.E + 5 * gy.Y, n3 += gy.ah, 0);
                main.a.N.a(graphics2, kf.eD[cz2.aM], cz2.E + cz2.G - 8 * gy.Y, n3 + gy.ah / 2 - gy.af / 2, 1);
                main.a.K.a(graphics2, kf.eQ, cz2.E + 5 * gy.Y, n3 += gy.ah, 0);
                main.a.N.a(graphics2, kf.eD[cz2.aN], cz2.E + cz2.G - 8 * gy.Y, n3 + gy.ah / 2 - gy.af / 2, 1);
                cz2.S.a(0, cz2.E + cz2.S.a / 2 + 8 * gy.Y, cz2.F + cz2.H - gy.ag - cz2.S.b - 8 * gy.Y, 0, 3, graphics2);
                main.a.K.a(graphics2, String.valueOf(cz2.v), cz2.E + 8 * gy.Y + cz2.S.a + 2 * gy.Y, cz2.F + cz2.H - gy.ag - cz2.S.b - 8 * gy.Y - main.a.K.a() / 2, 0);
                cz2.S.a(1, cz2.E + cz2.S.a / 2 + 8 * gy.Y, cz2.F + cz2.H - gy.ag - gy.Y, 0, 3, graphics2);
                main.a.K.a(graphics2, String.valueOf(GameMidlet.i.a[0]), cz2.E + 8 * gy.Y + cz2.S.a + 2 * gy.Y, cz2.F + cz2.H - gy.ag - gy.Y - gy.ah / 2, 0);
            }
            if (this.U) {
                this.c(graphics);
            }
        } else if (this.d && this.e > 0) {
            f f2 = fx.c((short)1065);
            if (f2.d != -1) {
                int n4 = f2.c / 4;
                graphics.drawRegion(f2.a, 0, (3 - this.e / 12) * n4, (int)f2.b, n4, 0, main.a.m / 2, main.a.n / 2, 3);
            }
        }
        main.a.c(graphics);
        if (this.z != null && this.z.d != null) {
            this.z.a(graphics);
        }
        if (main.a.D == null || !bb.d) {
            super.a(graphics);
        }
        if ((this.d || !this.w) && main.a.v == null && this.x) {
            main.a.L.a(graphics, String.valueOf(this.n), main.a.o, 5, 2);
        }
        main.a.a(graphics);
    }

    private void c(Graphics graphics) {
        main.a.c(graphics);
        main.a.S.a(graphics, this.M, this.N, this.O, this.P, je.d[2], je.d[3], 1);
        graphics.translate(this.M, this.N);
        main.a.K.a(graphics, kf.ef, this.O / 2, 10 * gy.Y, 2);
        int n2 = 0;
        while (n2 < 9) {
            this.T.a(this.aB == n2 ? 1 : 0, 5 * gy.Y + n2 % 3 * (5 * gy.Y + this.T.a), this.P - 29 * gy.Y * 3 + n2 / 3 * 29 * gy.Y, 0, graphics);
            main.a.Q.a(graphics, String.valueOf(this.aG[n2]), 5 * gy.Y + n2 % 3 * (5 * gy.Y + this.T.a) + this.T.a / 2, this.P - 29 * gy.Y * 3 + n2 / 3 * 29 * gy.Y + this.T.b / 2 - gy.ai / 2, 2);
            ++n2;
        }
    }

    public final void b(Graphics graphics) {
        main.a.c(graphics);
        main.a.x.b(graphics);
        int n2 = 0;
        while (n2 < 6) {
            if (do.a().a <= 4 * (ir.i * gy.Y)) {
                ir.c.b(0, n2 % 2 == 0 ? 2 : 3, 3 * (ir.i * gy.Y), (n2 + 6) * ir.i * gy.Y, 0, graphics);
            }
            if (do.a().a + main.a.m >= (ir.e - 3) * (ir.i * gy.Y)) {
                ir.c.b(0, n2 % 2 == 0 ? 2 : 3, (ir.e - 3) * (ir.i * gy.Y), (n2 + 6) * ir.i * gy.Y, 0, graphics);
            }
            ++n2;
        }
        main.a.x.d(graphics);
        main.a.c(graphics);
    }

    public final void a(String object) {
        if (((String)object).equals("")) {
            return;
        }
        this.z = new fh(50, (String)object, 0);
        this.z.a = main.a.o;
        this.z.b = main.a.n - this.z.c - hj.at - im.d().b.d;
        String string = object;
        object = cx.a();
        ((kj)object).e((byte)9);
        ((kj)object).c(string);
        ((kj)object).k();
    }

    public final void a(short s2, String string, short s3, byte by2, byte by3, byte by4) {
        this.aH = true;
        this.aI = s2;
        this.aK = string;
        this.aJ = s3;
        this.aL = by2;
        this.aM = by3;
        this.aN = by4;
    }

    public final void b(String string) {
        gx gx2;
        Vector<gx> vector = new Vector<gx>();
        int n2 = do.a().c;
        if (this.d || !this.w) {
            n2 += main.a.m / 3;
        }
        int n3 = 0;
        while (n3 < ir.m.size()) {
            gx2 = (gx)ir.m.elementAt(n3);
            if (gx2.az == 9 && gx2.aw * gy.Y > n2 && gx2.aw * gy.Y < n2 + main.a.m) {
                vector.addElement(gx2);
            }
            ++n3;
        }
        if (vector.size() > 0) {
            n3 = aw.e(vector.size());
            gx2 = (hn)vector.elementAt(n3);
            ((hn)vector.elementAt(n3)).O = new fh(50, string, 0);
        }
    }
}


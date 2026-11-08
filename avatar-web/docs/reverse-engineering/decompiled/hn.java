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

public final class hn
extends gx {
    private byte aB;
    public int[] a;
    public int b;
    public String c;
    public byte d;
    public Vector e;
    public Vector f;
    public Vector g;
    public byte h;
    public int i;
    public int j;
    public int k;
    public String l;
    public String m;
    public int n;
    public boolean o;
    public boolean p;
    public byte q;
    private byte aC;
    public byte r;
    public byte s;
    public byte t;
    public short u;
    public short v;
    private boolean aD;
    private boolean aE;
    public int Q;
    public int R;
    private int aF;
    public short S;
    public short T;
    public short U;
    private short aG;
    private short aH;
    public short V;
    public short W;
    public short X;
    public short Y;
    public short Z;
    public short aa;
    public short ab;
    private int aI;
    public byte ac;
    public boolean ad;
    public static ht ae;
    public byte af;
    public byte ag;
    public short ah;
    public short ai;
    public short aj;
    public short ak;
    public short al;
    public short am;
    public short an;
    private short aJ;
    public hn ao;
    public static ht ap;
    public static ht aq;
    private byte aK;
    private ju aL;
    public String[] ar;
    private int aM;
    private static byte[][] aN;
    private static byte[] aO;
    public short as;
    public boolean[][] at;
    private short[] aP;
    private short[] aQ;
    private short[] aR;
    public int au;
    public dr av;

    static {
        byte[][] byArrayArray = new byte[15][];
        byte[] byArray = new byte[10];
        byArray[5] = 1;
        byArray[6] = 1;
        byArray[7] = 1;
        byArray[8] = 1;
        byArray[9] = 1;
        byArrayArray[0] = byArray;
        byte[] byArray2 = new byte[10];
        byArray2[5] = 2;
        byArray2[6] = 2;
        byArray2[7] = 2;
        byArray2[8] = 2;
        byArray2[9] = 2;
        byArrayArray[1] = byArray2;
        byArrayArray[2] = new byte[]{3, 3, 3, 3, 3, 3, 3, 3, 3, 3};
        byArrayArray[3] = new byte[]{4, 4, 4, 4, 4, 4, 4, 4, 4, 4};
        byArrayArray[4] = new byte[]{5, 5, 5, 5, 5, 5, 5, 5, 5, 5};
        byArrayArray[5] = new byte[]{6, 6, 6, 6, 6, 6, 6, 6, 6, 6};
        byArrayArray[6] = new byte[]{7, 7, 7, 7, 7, 7, 7, 7, 7, 7};
        byArrayArray[7] = new byte[]{8, 8, 8, 8, 8, 8, 8, 8, 8, 8};
        byArrayArray[8] = new byte[]{9, 9, 9, 9, 9, 9, 9, 9, 9, 9};
        byArrayArray[9] = new byte[]{10, 10, 10, 10, 10, 10, 10, 10, 10, 10};
        byArrayArray[10] = new byte[]{11, 11, 11, 11, 11, 11, 11, 11, 11, 11};
        byArrayArray[11] = new byte[]{12, 12, 12, 12, 12, 12, 12, 12, 12, 12};
        byArrayArray[12] = new byte[]{13, 13, 13, 13, 13, 13, 13, 13, -2, 13};
        byArrayArray[13] = new byte[]{14, 14, 14, 14, 14, 14, 14, 14, 14, 14};
        byte[] byArray3 = new byte[10];
        byArray3[5] = 1;
        byArray3[6] = 1;
        byArray3[7] = 1;
        byArray3[8] = 1;
        byArray3[9] = 1;
        byArrayArray[14] = byArray3;
        aN = byArrayArray;
        byte[] byArray4 = new byte[3];
        byArray4[0] = -3;
        byArray4[2] = 1;
        aO = byArray4;
    }

    public hn() {
        int[] nArray = new int[4];
        nArray[1] = -1;
        this.a = nArray;
        this.c = "";
        this.g = new Vector();
        this.p = false;
        this.q = (byte)-1;
        this.aD = false;
        this.aE = false;
        this.Q = 0;
        this.R = -1;
        this.aF = 0;
        this.S = (short)4;
        this.T = 0;
        this.V = (short)-1;
        this.X = (short)-1;
        this.Z = 0;
        this.aa = (short)-1;
        this.ab = (short)-1;
        this.aI = 0;
        this.ac = (byte)-1;
        this.af = 0;
        this.ag = (byte)-1;
        this.ah = (short)1000;
        this.ai = (short)300;
        this.aj = 0;
        this.ak = 0;
        this.al = (short)1000;
        this.am = (short)1000;
        this.aK = 0;
        this.as = 0;
        this.au = 0;
        this.az = 0;
        this.aA = (short)42;
        this.aB = (byte)aw.e(9);
        this.aC = (byte)(aw.e(30) + 10);
    }

    public final int a() {
        return this.a[0];
    }

    public final void a(int n2) {
        this.a[0] = n2;
        this.c = String.valueOf(main.a.b(this.a[0])) + kf.T;
    }

    public final int c() {
        if (ae.u) {
            return this.a[3];
        }
        return this.a[0];
    }

    public final void b(int n2) {
        if (ae.u) {
            this.a[3] = n2;
            return;
        }
        this.a[0] = n2;
    }

    public final void c(int n2) {
        this.a[2] = n2;
    }

    public final void a(Graphics graphics) {
        if ((this.aw + 15) * js.ay < do.a().a || (this.aw - 15) * js.ay > do.a().a + main.a.m || this.L || main.a.Z > 0 && main.a.r == cd.b()) {
            return;
        }
        if (this.H != 14) {
            graphics.drawImage(ir.r, (this.aw + (this.K == gx.J ? 2 : -2)) * js.ay, (this.ax - 1) * js.ay, 3);
        }
        int n2 = this.e.size();
        boolean bl2 = false;
        int n3 = 0;
        while (n3 < n2) {
            ld ld2 = fx.a(((hx)this.e.elementAt((int)n3)).a);
            if (ld2 != null && (this.H != 14 || ld2.j == 30 || ld2.j == 40 || ld2.j == 50)) {
                if (ld2.j == 40) {
                    if (this.S != 4) {
                        ld2 = fx.a(this.S);
                    } else if ((this.S == 4 || this.S == 6) && this.aH < 1 + this.d) {
                        bl2 = true;
                    }
                }
                if (ir.a != 24 && ir.a != 53 || fx.c((int)ld2.j) || ld2.j == 52) {
                    ld2.a(graphics, this.y, this.aw * js.ay, (this.ax + this.B + this.h + this.N) * js.ay, this.K);
                    if (bl2) {
                        bl2 = false;
                        ld2 = fx.a((short)606);
                        if (ir.a != 24 && ir.a != 53 || fx.c((int)ld2.j) || ld2.j == 52) {
                            ld2.a(graphics, this.y, this.aw * js.ay, (this.ax + this.B + this.h + this.N) * js.ay, this.K);
                        }
                    }
                }
            }
            ++n3;
        }
        if ((dm.b().b[0] == 0 || this == ir.p) && ir.a != 24) {
            this.a(graphics, this.aw * js.ay, (this.ax + this.N) * js.ay - gy.ai);
        }
        if (this.aL != null) {
            Graphics graphics2 = graphics;
            ju ju2 = this.aL;
            n3 = 0;
            while (n3 < 3) {
                aq.a(ju2.e[n3] / 3, (ju2.a + ju2.c[n3]) * gy.Y, (ju2.b + ju2.d[n3]) * gy.Y, 0, 3, graphics2);
                ++n3;
            }
        }
        if (this.aK > 0 && this.Q == -2) {
            ap.a(main.a.l % 6 >= 3 ? 0 : 1, this.aw * js.ay, this.ax * js.ay - this.aA / 2, 0, 3, graphics);
        }
        super.a(graphics);
    }

    public final void a(Graphics graphics, int n2, int n3, boolean bl2) {
        graphics.drawImage(ir.r, n2 + (this.K == gx.J ? 2 : -2), n3 - 1, 3);
        if (this.e != null) {
            int n4 = this.e.size();
            int n5 = 0;
            while (n5 < n4) {
                Object object = (hx)this.e.elementAt(n5);
                object = fx.a(((hx)object).a);
                if (object != null) {
                    if (((ld)object).j == 40 && this.S != 4) {
                        object = fx.a(this.S);
                    }
                    ((ld)object).a(graphics, this.y, n2, n3, this.K);
                }
                ++n5;
            }
        }
        if (bl2) {
            this.a(graphics, n2, n3 - gy.ai);
        }
        super.a(graphics);
    }

    public final void a(Graphics graphics, int n2, int n3) {
        int n4 = 0;
        n3 = n3 - this.aA * js.ay + (this.B + this.h) * js.ay;
        if (this.X != -1) {
            n4 = 7;
            fx.a(graphics, this.X, n2 + aO[this.K] * js.ay - this.aG / 2, n3 + gy.ai / 2, 3);
        }
        n2 += (aO[this.K] + n4) * js.ay;
        if (this.aa != -1) {
            fx.a(graphics, this.aa, n2 + this.aG / 2 + 6 * js.ay, n3 + gy.ai / 2, 3);
        }
        if (this.ac != -1) {
            ae.a(this.ac, n2 + this.aG / 2 + 7 * js.ay, n3 + 3, 0, 3, graphics);
        }
        if (this.w == GameMidlet.i.w) {
            main.a.P.a(graphics, this.x, n2, n3, 2);
            return;
        }
        main.a.Q.a(graphics, this.x, n2, n3, 2);
    }

    public final void d(int n2) {
        int n3;
        this.n = n2;
        int n4 = 1;
        while (true) {
            int n5 = n4 * 100;
            n3 = n2;
            if ((n2 -= n5) < 0) break;
            ++n4;
        }
        this.v = (byte)n4;
        this.r = (byte)(n3 * 100 / (n4 * 100));
    }

    public final void a(hx hx2) {
        if (this.e == null) {
            this.e = new Vector();
        }
        this.e.addElement(hx2);
    }

    public final void a(String string) {
        this.x = string;
        this.l = string.length() > 7 ? String.valueOf(string.substring(0, 6)) + ".." : string;
        this.aG = (short)main.a.P.a(string);
    }

    public final void e(int n2) {
        this.S = (short)n2;
    }

    public final void b() {
        int n2;
        Object object;
        if (this.aL != null) {
            object = this.aL;
            n2 = 0;
            while (n2 < 3) {
                int n3 = n2;
                ((ju)object).d[n3] = ((ju)object).d[n3] - 1;
                if (((ju)object).d[n2] < -60) {
                    ((ju)object).d[n2] = 0;
                    ((ju)object).g[n2] = 6;
                }
                int n4 = n2;
                ((ju)object).e[n4] = (byte)(((ju)object).e[n4] + 1);
                if (((ju)object).e[n2] == 6) {
                    ((ju)object).e[n2] = 0;
                }
                int n5 = n2;
                ((ju)object).c[n5] = ((ju)object).c[n5] + (((ju)object).f[n2] << 1);
                if (((ju)object).f[n2] == 1) {
                    if (((ju)object).c[n2] > 10 - aw.f(((ju)object).d[n2] / 10)) {
                        ((ju)object).f[n2] = -1;
                        if (((ju)object).g[n2] > 0) {
                            int n6 = n2;
                            ((ju)object).g[n6] = (byte)(((ju)object).g[n6] - 1);
                        }
                    }
                } else {
                    if (((ju)object).c[n2] < -(10 - aw.f(((ju)object).d[n2] / 10))) {
                        ((ju)object).f[n2] = 1;
                    }
                    if (((ju)object).g[n2] > 0) {
                        int n7 = n2;
                        ((ju)object).g[n7] = (byte)(((ju)object).g[n7] - 1);
                    }
                }
                ++n2;
            }
        }
        if (this.aD && main.a.l % 20 == 10) {
            this.h();
        }
        if (this.p) {
            object = this;
            if ((!ae.t || ((gx)object).w != ae.E && ((gx)object).w != ae.F) && ((hn)object).g.size() == 0 && ((js)object).aw == ((gx)object).C && ((js)object).ax == ((gx)object).D) {
                ir.c((hn)object);
                if (ae.h != null && ae.h.w == ((gx)object).w) {
                    ae.h = null;
                    ir.p = null;
                }
            }
        }
        object = this;
        if (((gx)object).C == ((js)object).aw && ((gx)object).D == ((js)object).ax && ((hn)object).au >= 0) {
            --((hn)object).au;
            if (((hn)object).au < 0) {
                ((hn)object).au = -1;
                ((hn)object).aE = false;
                ((hn)object).Q = 0;
                if (object == GameMidlet.i) {
                    ir.A = -1;
                }
            } else {
                n2 = (((hn)object).aR[((hn)object).au] & 0xFF) * ir.i + ir.i / 2;
                int n8 = (((hn)object).aR[((hn)object).au] >> 8) * ir.i + ir.i / 2;
                if (((hn)object).au == 1) {
                    GameMidlet.i.aE = true;
                    n2 = ((hn)object).av.a / gy.Y;
                    n8 = ((hn)object).av.b / gy.Y;
                    ((hn)object).au = 0;
                }
                if (object != GameMidlet.i) {
                    ((gx)object).H = 1;
                    ((hn)object).d(n2, n8);
                } else if (!super.h(n2 - ((js)object).aw, n8 - ((js)object).ax) && !super.i(n2 - ((js)object).aw, n8 - ((js)object).ax)) {
                    if (!ir.c(ir.c(n2, n8))) {
                        ((gx)object).H = 1;
                        ((hn)object).d(n2, n8);
                    }
                } else {
                    ((hn)object).au = 0;
                    super.p();
                    ((hn)object).aE = false;
                }
            }
        }
        this.d();
        if (this.f != null) {
            int n9 = 0;
            while (n9 < this.f.size()) {
                bd bd2 = (bd)this.f.elementAt(n9);
                if (bd2.b == this.as) {
                    this.as = 0;
                    this.S = bd2.a;
                    this.f.removeElement(bd2);
                    break;
                }
                ++n9;
            }
            this.as = (short)(this.as + 1);
        }
    }

    public final void f(int n2) {
        if (n2 < 0) {
            this.y = aN[0][this.aB];
            return;
        }
        this.y = aN[n2][this.aB];
    }

    public final void d() {
        int n2;
        Object object = this;
        if (((hn)object).aH <= 0) {
            ((hn)object).aH = (short)(10 + aw.e(70) / (((hn)object).d + 1));
        }
        ((hn)object).aH = (short)(((hn)object).aH - 1);
        ((hn)object).aB = (byte)(((hn)object).aB + 1);
        if (((hn)object).aB >= 10) {
            ((hn)object).aB = 0;
        }
        if (((gx)object).H < 0) {
            ((gx)object).y = aN[0][((hn)object).aB];
        } else if (((gx)object).H < aN.length) {
            ((gx)object).y = aN[((gx)object).H][((hn)object).aB];
        }
        if (this.T != 0 || this.S == 11 || this.S == 7 || this.S == 9) {
            if (this.T == 0) {
                this.U = this.S;
            }
            this.T = (short)(this.T + 1);
            if (this.T % 10 > 5) {
                if (this.T > 45) {
                    this.T = 0;
                }
                n2 = 4;
                object = this;
                this.S = (short)n2;
            } else {
                n2 = this.U;
                object = this;
                this.S = (short)n2;
            }
        }
        if (((object = this) != GameMidlet.i || ((hn)object).Q != 0 || main.a.r == kx.i) && ((gx)object).H != 10) {
            if (aw.a(((js)object).aw, ((js)object).ax + ((gx)object).N, ((gx)object).C, ((gx)object).D) <= ((gx)object).G) {
                Object object2;
                if (((gx)object).M && ((hn)object).aJ == 0) {
                    ((hn)object).aJ = 0;
                    ((gx)object).M = false;
                    ((gx)object).N = 0;
                }
                if (((hn)object).ao != null && ((hn)object).aK == 0) {
                    if (((hn)object).Q == -2) {
                        ((hn)object).aK = (byte)20;
                    } else if (((hn)object).Q == 11) {
                        ((hn)object).aK = (byte)30;
                        ((hn)object).S = (short)107;
                        ((hn)object).ao.S = (short)107;
                        ((hn)object).aL = new ju((hn)object, ((js)object).aw, ((js)object).ax);
                    }
                }
                if (((hn)object).Q == -5) {
                    ((hn)object).t = ((gx)object).K;
                    ((js)object).aw = ((gx)object).C;
                    ((js)object).ax = ((gx)object).D;
                    if (((hn)object).au <= 0) {
                        ((hn)object).Q = 0;
                    }
                    if (main.a.v == null) {
                        ae.b();
                        ae.a(((js)object).aw, ((js)object).ax, ((gx)object).K, ((gx)object).N);
                    }
                    if (ae.t && GameMidlet.i.w == ((gx)object).w) {
                        ((gx)object).K = 0;
                    }
                } else {
                    if (((gx)object).w != GameMidlet.i.w) {
                        ((gx)object).C = ((js)object).aw;
                        ((gx)object).D = ((js)object).ax + ((gx)object).N;
                    }
                    if (((hn)object).g.size() == 0) {
                        if (((gx)object).H == 1) {
                            ((gx)object).H = 0;
                        }
                        ((gx)object).K = ((hn)object).t;
                    } else {
                        object2 = (dr)((hn)object).g.elementAt(0);
                        ((hn)object).d(((dr)object2).a, ((dr)object2).b + ((dr)object2).d);
                        ((hn)object).aJ = ((dr)object2).d;
                        if (((dr)object2).d != 0) {
                            ((gx)object).M = true;
                        }
                        if (((gx)object).C == -1 && ((gx)object).D == -1) {
                            ((gx)object).C = ((js)object).aw;
                            ((gx)object).D = ((js)object).ax + ((gx)object).N;
                            if (((gx)object).H == 14) {
                                ir.g[((js)object).ax / ir.i * ir.e + ((js)object).aw / ir.i] = 112;
                            }
                            ((gx)object).H = (byte)((dr)object2).c;
                            if (((gx)object).H == 14) {
                                ((js)object).ax = ((gx)object).D;
                                ((js)object).aw = ((gx)object).C;
                                ir.g[((js)object).ax / ir.i * ir.e + ((js)object).aw / ir.i] = 90;
                            }
                            object2 = object;
                            if ((((gx)object2).H == 2 || ((gx)object2).H == 13 || ((gx)object2).H == 4) && (n2 = (((js)object2).ax - ir.i) / ir.i * ir.e + ((js)object2).aw / ir.i) >= 0 && n2 < ir.g.length) {
                                int n3;
                                if (((gx)object2).H == 4 && (n3 = ir.g[n2]) == 67) {
                                    ((hn)object2).h = (byte)-10;
                                }
                                n3 = ir.d(((js)object2).aw, ((js)object2).ax - 10);
                                ((gx)object2).D = ((js)object2).ax;
                                if (n3 != -1) {
                                    n2 = ir.g[n3];
                                    if (n2 == 92) {
                                        ((hn)object2).h = (byte)-10;
                                    }
                                    if (n2 == 79 || n2 == 92 || n2 == 90 || n2 == 54) {
                                        ir.g[n3] = 90;
                                    }
                                }
                            }
                        } else {
                            ((gx)object).K = ((hn)object).t = (byte)((dr)object2).c;
                        }
                        ((hn)object).g.removeElementAt(0);
                    }
                }
                object2 = object;
                if (((hn)object2).Q != 0 && ((hn)object2).Q != -5) {
                    if (((gx)object2).w == ((hn)object2).j && ir.g(((hn)object2).i) == null) {
                        ((hn)object2).Q = 0;
                        ((hn)object2).i = -1;
                    } else if (((hn)object2).i != -1 && ((hn)object2).j != -1) {
                        Object object3 = ir.g(((hn)object2).i);
                        hn hn2 = ir.g(((hn)object2).j);
                        if (hn2 == null || object3 == null) {
                            if (object3 != null) {
                                ((hn)object3).Q = 0;
                                ((gx)object3).L = false;
                            }
                            if (hn2 != null) {
                                hn2.Q = 0;
                                hn2.L = false;
                            }
                        } else {
                            if (hn2.aw > ((js)object3).aw) {
                                hn2.K = hn2.t = gx.J;
                                ((hn)object3).t = 0;
                                ((gx)object3).K = 0;
                            } else {
                                hn2.t = 0;
                                hn2.K = 0;
                                ((gx)object3).K = ((hn)object3).t = gx.J;
                            }
                            if (((gx)object2).w == ((hn)object2).i) {
                                if (((hn)object2).Y > 0) {
                                    ((hn)object2).Y = (short)(((hn)object2).Y - 1);
                                } else {
                                    switch (((hn)object2).Q) {
                                        case 9: {
                                            if (object2 == GameMidlet.i) {
                                                ae.b();
                                                ae.a((byte)9);
                                            } else if (GameMidlet.i.Q == 8 && ((gx)object2).w == GameMidlet.i.i) {
                                                ae.b();
                                                ae.a((byte)8);
                                                GameMidlet.i.Q = 0;
                                            }
                                            ae.b();
                                            ae.b(hn2);
                                            ((hn)object2).Q = 0;
                                            hn2.Q = 0;
                                            break;
                                        }
                                        case -3: {
                                            if (ir.k == -1) {
                                                object = object3 = new ba(2, 0);
                                                main.a.B.addElement(object);
                                            }
                                            ((hn)object2).Q = 0;
                                            hn2.Q = 0;
                                            break;
                                        }
                                        case 12: {
                                            boolean bl2 = false;
                                            object = hn2;
                                            hn2.Q = 0;
                                            bl2 = false;
                                            object = object2;
                                            ((hn)object2).Q = 0;
                                        }
                                    }
                                    ((hn)object2).k = -1;
                                    ((hn)object2).i = -1;
                                    ((hn)object2).j = -1;
                                }
                            }
                        }
                    }
                }
            } else {
                ((hn)object).aI = aw.a(((gx)object).C - ((js)object).aw, -(((gx)object).D - (((js)object).ax + ((gx)object).N)));
                int n4 = ((gx)object).G * aw.b(((hn)object).aI) >> 10;
                n2 = -(((gx)object).G * aw.a(((hn)object).aI)) >> 10;
                if (((hn)object).aE && ((hn)object).Q == -5 && GameMidlet.i.e(((js)object).aw + n4, ((js)object).ax + ((gx)object).N + n2)) {
                    ((hn)object).p();
                    ((gx)object).F = 0;
                    ((gx)object).E = 0;
                } else {
                    ((gx)object).E = n4;
                    ((gx)object).F = n2;
                    ((gx)object).A = 0;
                    ((gx)object).B = 0;
                    ((hn)object).h = 0;
                    ((hn)object).g(((js)object).aw + n4);
                    if (((js)object).aw != ((gx)object).C) {
                        ((hn)object).f();
                    }
                    if (((js)object).ax + ((gx)object).N != ((gx)object).D) {
                        ((hn)object).f();
                    }
                    ((gx)object).H = 1;
                }
            }
        }
        if (this.M) {
            this.aw += this.E;
            this.N = (short)(this.N + this.F);
            if (this.w == GameMidlet.i.w && this.N < -this.Z) {
                this.N = -this.Z;
            }
        } else {
            this.aw += this.E;
            this.ax += this.F;
        }
        this.B = (byte)(this.B + this.A);
        if (this.H == 10) {
            this.A = (byte)(this.A + 1);
        }
        if (Math.abs(this.A) >= this.z || Math.abs(this.B) > 28) {
            this.H = 0;
            this.A = 0;
            this.B = 0;
        }
        if (this.R != -1 && this.H == 0) {
            ++this.R;
            if (this.R > this.aC) {
                this.R = -1;
            } else if (this.R % 6 == 0) {
                this.g();
            }
        }
        if (this.H == 0) {
            this.h = 0;
        }
        if (this.H == 1 && this.E == 0 && this.F == 0) {
            this.H = 0;
        }
        this.E = 0;
        this.F = 0;
        if (this.aK > 0) {
            this.aK = (byte)(this.aK - 1);
            if (this.aK == 0) {
                if (this.Q == -2) {
                    this.ao.H = (byte)4;
                    this.ao.S = (short)20;
                    this.H = (byte)4;
                    this.S = (short)20;
                } else if (this.Q == 11) {
                    this.S = (short)12;
                    this.ao.S = (short)12;
                }
                this.Q = 0;
                this.ao.Q = 0;
                this.ao = null;
                this.aL = null;
            }
        }
        if (this.ar != null) {
            this.O = new fh(100, this.ar[this.aM / 40], (byte)(this.i >= 2000000000 ? 1 : 0));
            ++this.aM;
            if (this.aM >= this.ar.length * 40) {
                if (this.w >= 2000000000) {
                    this.aM = 0;
                } else {
                    this.ar = null;
                }
            }
        }
        super.b();
    }

    public final void e() {
        if (this.H == -1 || this.L) {
            return;
        }
        if (this.Q != 0 || ae.t) {
            return;
        }
        this.E = 0;
        this.F = 0;
        if (main.a.d[2]) {
            do.a().e = 0L;
            this.R = -1;
            this.o();
            if (this.M) {
                this.F = -this.G;
            } else if (this.i(this.E, -(this.G - 1))) {
                if (!this.h(this.E, -(this.G - 1))) {
                    this.e(this.aw + this.E, this.ax - (this.G - 1));
                } else {
                    this.E = 0;
                    this.F = 0;
                }
            }
        } else if (main.a.d[8]) {
            do.a().e = 0L;
            this.R = -1;
            this.f();
            this.g(0, 1);
            if (this.M) {
                this.F = this.G;
                if (this.N + this.G >= 0) {
                    this.N = 0;
                    if (ir.c(this.aw, this.ax + ir.i / 2) == 80) {
                        this.M = false;
                    } else {
                        this.F = 0;
                    }
                }
            } else if (!this.h(this.E, this.G - 1)) {
                this.i(this.E, this.G - 1);
            } else {
                this.E = 0;
                this.F = 0;
            }
        }
        if (main.a.d[4]) {
            do.a().e = 0L;
            this.R = -1;
            if (this.aF == 0 && this.K == gx.J) {
                this.aF = 3;
            }
            this.K = gx.J;
            if (this.aF > 2) {
                if (this.M) {
                    this.E = -this.G;
                } else if (!this.h(-(this.G + 8), this.F)) {
                    this.i(-(this.G + 8), this.F);
                    this.g(-1, 0);
                } else {
                    this.E = 0;
                    this.F = 0;
                }
            }
            ++this.aF;
        } else if (main.a.d[6]) {
            do.a().e = 0L;
            this.R = -1;
            if (this.aF == 0 && this.K == 0) {
                this.aF = 3;
            }
            this.K = 0;
            if (this.aF > 2) {
                if (this.M) {
                    this.E = this.G;
                } else if (!this.h(this.G + 6, this.F)) {
                    this.i(this.G + 6, this.F);
                    this.g(1, 0);
                } else {
                    this.E = 0;
                    this.F = 0;
                }
            }
            ++this.aF;
        } else {
            this.aF = 0;
        }
        boolean bl2 = false;
        if (main.a.b[2]) {
            if (main.a.d[4] || main.a.d[6] || main.a.d[8]) {
                bl2 = true;
            }
        } else if (main.a.b[4]) {
            if (main.a.d[2] || main.a.d[6] || main.a.d[8]) {
                bl2 = true;
            }
        } else if (main.a.b[6]) {
            if (main.a.d[4] || main.a.d[2] || main.a.d[8]) {
                bl2 = true;
            }
        } else if (main.a.b[8] && (main.a.d[4] || main.a.d[6] || main.a.d[2])) {
            bl2 = true;
        }
        if (main.a.c[2] || main.a.c[4] || main.a.c[6] || main.a.c[8]) {
            bl2 = true;
            main.a.g();
        }
        if (bl2 && this.H != 2 && this.H != 13 && this.H != 4 && !main.a.c[2]) {
            ae.b();
            ae.a(this.aw, this.ax, this.K, this.N);
        }
        if (this.E == 0 && this.F == 0 && this.H == 1) {
            this.H = 0;
        }
        if (this.M && (this.E != 0 || this.F != 0)) {
            this.H = 1;
        }
        main.a.b[8] = false;
        main.a.b[6] = false;
        main.a.b[4] = false;
        main.a.b[2] = false;
    }

    public final void a(byte by2) {
        if (this.H == 10) {
            return;
        }
        if (by2 == 2 || by2 == 13 || by2 == 4) {
            short s2 = ir.g[(this.ax - 15) / ir.i * ir.e + this.aw / ir.i];
            if (s2 == 79 || s2 == 81 || s2 == 54) {
                this.h = (byte)-6;
                if (s2 == 81) {
                    this.h = (byte)(-6 * js.ay);
                }
            } else if (s2 == 92 || s2 == 67) {
                this.h = (byte)-10;
            }
            this.H = by2;
        } else if (this.H != 14) {
            this.H = 0;
        }
        if (by2 == 10) {
            this.g();
            return;
        }
        if (this.w != GameMidlet.i.w) {
            this.g.addElement(new dr(-1, -1, by2));
            return;
        }
        this.H = by2;
    }

    public final void d(int n2, int n3) {
        this.C = n2;
        this.D = n3;
        this.g(n2);
    }

    private void g(int n2) {
        if (n2 > this.aw) {
            this.K = 0;
            return;
        }
        if (n2 < this.aw) {
            this.K = gx.J;
        }
    }

    public final void f() {
        if (this.H == 2 || this.H == 13) {
            int n2 = ir.d(this.aw, this.ax - 18);
            if (n2 == -1) {
                return;
            }
            this.H = 0;
            this.h = 0;
            short s2 = ir.g[n2];
            if (s2 == 90) {
                if (ir.d[n2] == 80) {
                    ir.g[n2] = 92;
                    return;
                }
                if (ir.d[n2] == 97) {
                    ir.g[n2] = 54;
                    return;
                }
                ir.g[n2] = 79;
                return;
            }
        } else {
            this.o();
        }
    }

    private void o() {
        if (this.H == 14) {
            this.H = 0;
            this.a(ei.b().f, ei.b().g);
            iy.a().a(0);
            ae.b();
            ae.a(GameMidlet.i.aw, GameMidlet.i.ax, GameMidlet.i.K, GameMidlet.i.Z);
            main.a.d[8] = false;
        }
    }

    private void g(int n2, int n3) {
        if (this.H == 4) {
            int n4 = ir.d(this.aw, this.ax - 18);
            if (n4 == -1) {
                return;
            }
            if ((n2 = ir.c(this.aw + n2 * 12, this.ax + n3 * 12 - 10)) == 80) {
                this.H = 0;
                this.h = 0;
            }
        }
    }

    private boolean h(int n2, int n3) {
        if (this != GameMidlet.i) {
            return false;
        }
        if (this.H == -1 || main.a.v != null) {
            return false;
        }
        boolean bl2 = main.a.x.a(this.aw + n2, this.ax + n3);
        n2 = bl2 ? 1 : 0;
        if (bl2 && this.H == 1) {
            this.H = 0;
        }
        return n2 != 0;
    }

    private boolean i(int n2, int n3) {
        boolean bl2 = this.b(n2, n3);
        if (bl2) {
            this.c(n2, n3);
        }
        return bl2;
    }

    public final boolean e(int n2, int n3) {
        if (this.H != 0 && this.H != 1 || this.Q != 0 && this.Q != -5) {
            return false;
        }
        short s2 = ir.g[n3 / ir.i * ir.e + n2 / ir.i];
        if (s2 == 79 || s2 == 81 || s2 == 54) {
            this.H = (byte)2;
            this.h = (byte)-6;
            this.aw = n2 / ir.i * ir.i + ir.i / 2;
            this.ax = n3 / ir.i * ir.i + ir.i - 1;
            ae.b();
            ae.a(this.aw, this.ax, this.K, this.N);
            ae.b();
            ae.a(this.H);
            return true;
        }
        if (s2 == 92) {
            this.H = (byte)2;
            this.h = (byte)-10;
            this.aw = n2 / ir.i * ir.i + ir.i / 2;
            this.ax = n3 / ir.i * ir.i + ir.i - 1;
            ae.b();
            ae.a(this.aw, n3, this.K, this.N);
            ae.b();
            ae.a((byte)2);
            return true;
        }
        if (s2 == 67) {
            this.H = (byte)4;
            this.h = (byte)-10;
            this.aw = n2 / ir.i * ir.i + ir.i / 2;
            ae.b();
            ae.a(this.aw, n3, this.K, this.N);
            ae.b();
            ae.a((byte)4);
            return true;
        }
        return false;
    }

    public final void g() {
        if (this.H == 0 || this.H == 1) {
            this.H = (byte)10;
            if (this.R == -1) {
                this.R = 0;
            }
            this.A = -this.z;
        }
    }

    public final void h() {
        this.aD = false;
        try {
            int n2 = 0;
            while (n2 < this.e.size() - 1) {
                hx hx2 = (hx)this.e.elementAt(n2);
                if (fx.a(hx2.a) != null) {
                    int n3 = n2 + 1;
                    while (n3 < this.e.size()) {
                        hx hx3 = (hx)this.e.elementAt(n3);
                        if (fx.a((short)hx3.a).g == -1) {
                            this.aD = true;
                        }
                        if (fx.a(hx3.a) != null && fx.a((short)hx2.a).j > fx.a((short)hx3.a).j) {
                            this.e.setElementAt(hx2, n3);
                            this.e.setElementAt(hx3, n2);
                            hx2 = hx3;
                        }
                        ++n3;
                    }
                }
                ++n2;
            }
            return;
        }
        catch (Exception exception) {
            this.aD = true;
            return;
        }
    }

    public final void f(int n2, int n3) {
        int n4 = 0;
        while (n4 < this.e.size() - 1) {
            hx hx2 = (hx)this.e.elementAt(n4);
            ld ld2 = fx.a(hx2.a);
            if (n3 == ld2.j) {
                this.e.removeElement(hx2);
                break;
            }
            ++n4;
        }
        this.a(new hx((short)n2));
    }

    public final void b(byte by2) {
        this.H = by2;
    }

    public final void b(hx hx2) {
        Object object = fx.a(hx2.a);
        if (object == null || ((ld)object).f == -2) {
            return;
        }
        object = fx.a(((ld)object).j, this.e);
        if (object != null) {
            this.e.removeElement(object);
        }
        this.e.addElement(hx2);
    }

    public final void i() {
        int n2 = 0;
        while (n2 < this.e.size()) {
            hx hx2 = (hx)this.e.elementAt(n2);
            if (fx.a((short)hx2.a).j == -1) {
                this.e.removeElement(hx2);
                this.V = hx2.a;
            }
            ++n2;
        }
    }

    public final void j() {
        this.i();
        ir.a(this);
    }

    public final void a(short s2) {
        this.V = s2;
        gr gr2 = ir.h(this.w);
        if (gr2 != null) {
            ir.a(gr2);
            this.V = s2;
        }
        this.j();
    }

    public final void k() {
        this.A = 0;
        this.B = 0;
        this.H = 0;
    }

    private void p() {
        this.au = 0;
        this.aE = false;
        this.Q = 0;
        if (this == GameMidlet.i) {
            ir.A = -1;
            return;
        }
        this.av = null;
        this.aP = null;
        this.aQ = null;
        this.aR = null;
        this.at = null;
    }

    public final void l() {
        if (this.at == null) {
            this.n();
        }
        int n2 = 88;
        int n3 = ir.i * gy.Y;
        if (this.av.b / n3 * ir.e + this.av.a / n3 > 0 && this.av.b / n3 * ir.e + this.av.a / n3 < ir.g.length) {
            n2 = ir.g[this.av.b / n3 * ir.e + this.av.a / n3];
        }
        if (this == GameMidlet.i && n2 != 80 && ir.a != 24 && !ir.a(n2) && !ir.b(n2)) {
            return;
        }
        this.av.c = 0;
        if (this.Q == 0 || this.Q == -5) {
            this.Q = -5;
            this.R = -1;
            this.C = this.aw;
            this.D = this.ax;
            if (this == GameMidlet.i) {
                ir.A = this.aw > this.av.a / gy.Y ? (int)gx.J : 0;
            }
            this.m();
        }
    }

    public final void m() {
        int n2;
        int n3 = ir.i * gy.Y;
        if (this.aw / ir.i == this.av.a / n3 && this.ax / ir.i == this.av.b / n3) {
            this.d(this.av.a / n3 * ir.i + this.av.a % n3 / 2, this.av.b / n3 * ir.i + this.av.b % n3 / 2);
            return;
        }
        int n4 = this.av.b / n3;
        int n5 = this.av.a / n3;
        int n6 = this.ax / ir.i;
        int n7 = this.aw / ir.i;
        hn hn2 = this;
        int n8 = 1;
        int n9 = 0;
        int[] nArray = new int[4];
        nArray[1] = -1;
        nArray[2] = 1;
        int[] nArray2 = nArray;
        int[] nArray3 = new int[4];
        nArray3[0] = -1;
        nArray3[3] = 1;
        int[] nArray4 = nArray3;
        boolean bl2 = false;
        int n10 = 0;
        while (n10 < hn2.at.length * hn2.at[0].length) {
            hn2.aP[n10] = 0;
            hn2.aQ[n10] = 0;
            hn2.aR[n10] = 0;
            hn2.at[n10 % ir.e][n10 / ir.e] = ir.g[n10] != 80 && !ir.a(ir.g[n10]);
            ++n10;
        }
        n10 = ir.c(n5 * ir.i, n4 * ir.i);
        if (ir.b(n10)) {
            hn2.at[n5][n4] = false;
        }
        hn2.aP[0] = (short)((n6 << 8) + n7);
        while (!bl2 && n9 < n8) {
            n7 = hn2.aP[n9] & 0xFF;
            n6 = hn2.aP[n9] >> 8;
            n2 = 0;
            while (n2 < 4 && !bl2) {
                n10 = n7 + nArray2[n2];
                int n11 = n6 + nArray4[n2];
                if (n10 >= 0 && n10 < hn2.at.length && n11 >= 0 && n11 < hn2.at[0].length && !hn2.at[n10][n11]) {
                    hn2.aQ[n8] = hn2.aP[n9];
                    hn2.aP[n8++] = (short)((n11 << 8) + n10);
                    hn2.at[n10][n11] = true;
                    if (n5 == n10 && n4 == n11) {
                        bl2 = true;
                    }
                }
                if (n8 >= hn2.at.length * hn2.at[0].length) {
                    bl2 = true;
                    break;
                }
                ++n2;
            }
            ++n9;
        }
        hn2.au = 0;
        if (bl2) {
            GameMidlet.i.k();
            n2 = n8 - 1;
            hn2.aR[hn2.au++] = hn2.aP[n2];
            block3: while (n2 > 0) {
                n7 = 0;
                while (n7 < n8) {
                    if (hn2.aP[n7] == hn2.aQ[n2]) {
                        n2 = n7;
                        hn2.aR[hn2.au++] = hn2.aP[n2];
                        continue block3;
                    }
                    ++n7;
                }
            }
        }
        --hn2.au;
        if (!bl2) {
            this.au = 0;
            if (this == GameMidlet.i) {
                ir.A = -1;
            }
            return;
        }
    }

    public final void n() {
        short s2 = ir.e;
        short s3 = ir.f;
        this.at = new boolean[s2][s3];
        this.aP = new short[s2 * s3];
        this.aQ = new short[s2 * s3];
        this.aR = new short[s2 * s3];
    }

    public final void a(int n2, int n3, int n4) {
        System.out.println("updateMoney: " + n2 + "    " + n3 + "   " + n4);
        if (this.a[0] != n2) {
            main.a.a(String.valueOf(n2 - this.a[0]) + "xu", this.aw, this.ax - aw.e(20), -1, 0, -1);
            this.a[0] = n2;
        }
        if (this.a[2] != n3) {
            main.a.a(String.valueOf(n3 - this.a[2]) + "luong", this.aw, this.ax - aw.e(20), -1, 0, -1);
            this.a[2] = n3;
        }
        if (this.b != n4) {
            main.a.a(String.valueOf(n4 - this.b) + "luong", this.aw, this.ax - aw.e(20), -1, 0, -1);
            this.b = n4;
        }
    }
}


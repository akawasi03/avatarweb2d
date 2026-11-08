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

public final class kg
extends kx {
    public static kg a;
    private int[] e = new int[4];
    private ax[][] f = new ax[4][4];
    private dr g;
    private dr h;
    public static dr[] b;
    public static dr[] c;
    public static dr[] d;
    private dr K;
    private int[] L = new int[10];
    private boolean M;
    private ax N;
    private ax[] O = new ax[10];
    private ax[] P = new ax[3];
    private int[][] Q = new int[4][12];
    private int[][] R = new int[4][3];
    private int[] S = new int[4];
    private int[] T = new int[4];
    private int[][] U = new int[4][11];
    private byte[] V = new byte[4];
    private byte[] W = new byte[4];
    private int X;
    private int ay;
    private int az;
    private int aA;
    private int aB;
    private int aC;
    private ax aD;
    private int aE;
    private boolean aF;
    private int aG;
    private boolean aH;
    private boolean aI;
    private int[] aJ = new int[4];
    private int aK;
    private boolean aL;
    private boolean aM;
    private boolean aN;
    private dr aO;
    private ax aP;
    private ax aQ;
    private int aR = 473848;
    private int aS = 517368;
    private int aT = 522270;
    private static int aU;
    private static int aV;
    private by aW;
    private by aX;
    private by aY;
    private int aZ;
    private int ba = 0;
    private boolean bb = false;
    private int bc = -2;
    private int bd;
    private ax be = null;
    private int[] bf = new int[5];
    private int bg = 0;

    static {
        aU = 12;
        aV = 12;
    }

    public static kg b() {
        if (a == null) {
            a = new kg();
        }
        return a;
    }

    public final void a_() {
        this.t();
        super.a_();
    }

    private void t() {
        int n2 = 0;
        while (n2 < 10) {
            this.O[n2] = new ax(-1, true);
            this.L[n2] = -1;
            if (n2 < 3) {
                this.P[n2] = new ax(-1, true);
            }
            ++n2;
        }
        this.f = new ax[4][4];
        this.o = 0;
        this.aB = -1;
        this.h = new dr();
        this.h.a = this.g.a;
        this.h.b = this.g.b;
        this.M = false;
        n2 = 0;
        while (n2 < 4) {
            int n3 = 0;
            while (n3 < 4) {
                if (n3 < 3) {
                    this.R[n2][n3] = -1;
                }
                ++n3;
            }
            n3 = 0;
            while (n3 < 12) {
                this.Q[n2][n3] = -1;
                if (n3 < 11) {
                    this.U[n2][n3] = -1;
                }
                ++n3;
            }
            this.aJ[n2] = -1;
            this.e[n2] = 0;
            this.S[n2] = 0;
            this.T[n2] = 0;
            this.V[n2] = 0;
            this.W[n2] = 0;
            ++n2;
        }
        this.X = 0;
        this.ay = 3;
        this.az = 0;
        this.aD = new ax(-1, true);
        this.aE = -1;
        this.aK = 1;
        this.aF = false;
        this.aG = -1;
        this.aH = false;
        this.aI = false;
        this.bc = -2;
        this.aL = false;
        this.aC = -1;
        this.aM = false;
        this.aN = false;
        this.aO = new dr(main.a.o, main.a.p, 3);
        this.aP = new ax(-1, true);
        this.aQ = new ax(-1, true);
    }

    public final void e() {
        super.e();
        this.u();
        if (kx.j) {
            this.b(false);
        }
        this.aO = new dr(main.a.o, main.a.p, 3);
        if (kx.G == null) {
            try {
                kx.G = Image.createImage((String)(String.valueOf(kf.a()) + "/on/star.on"));
                return;
            }
            catch (IOException iOException) {
                IOException iOException2 = iOException;
                iOException.printStackTrace();
            }
        }
    }

    private void u() {
        this.g = new dr();
        this.K = new dr();
        this.g.a = main.a.o - 27;
        this.g.b = main.a.n - main.a.T;
        if (main.a.m < 200) {
            this.g.b += 10;
        }
        this.K.a = this.g.a - 24;
        this.K.b = this.g.b - kx.A / 2 - 4;
        main.a.S.e();
    }

    public final void a(int n2, int n3) {
        block0 : switch (n2) {
            case 30: {
                kg kg2 = this;
                kg2.C();
                kg2.B();
                int n4 = 0;
                while (n4 < kg2.bf.length) {
                    kg2.bf[n4] = -1;
                    ++n4;
                }
                n4 = 0;
                int n5 = 0;
                while (n5 < 10) {
                    if (kg2.L[n5] == 0) {
                        if (n4 == 5) {
                            main.a.b(kf.ak);
                            break block0;
                        }
                        kg2.bf[n4] = kg2.O[n5].b;
                        ++n4;
                    }
                    ++n5;
                }
                if (n4 < 2) {
                    main.a.b(kf.aZ);
                    break;
                }
                int[] nArray = new int[6];
                byte by2 = 0;
                while (by2 < 5) {
                    nArray[by2] = kg2.bf[by2] != -1 ? kg2.bf[by2] : -1;
                    ++by2;
                }
                nArray[5] = kg2.aB;
                by2 = -1;
                if (kg2.c(nArray)) {
                    by2 = 1;
                }
                if (kg2.d(nArray)) {
                    by2 = 0;
                }
                if (by2 == -1) {
                    main.a.b(kf.al);
                    break;
                }
                n4 = 0;
                while (n4 < nArray.length) {
                    if (nArray[n4] != -1) {
                        int n6 = 0;
                        while (n6 < 10) {
                            if (nArray[n4] == kg2.O[n6].b) {
                                if (kg2.n(n6)) break;
                                main.a.b(kf.al);
                                break block0;
                            }
                            ++n6;
                        }
                    }
                    ++n4;
                }
                kg2.x();
                kx.o();
                ie.a().a(kg2.bf, by2);
                break;
            }
            case 31: {
                this.I();
                break;
            }
            case 32: {
                kg kg3 = this;
                kg3.C();
                if (GameMidlet.i.w != kg3.n) {
                    main.a.b(kf.ai);
                    break;
                }
                kg3.B();
                int[] nArray = new int[12];
                byte by3 = -1;
                int n7 = 0;
                while (n7 < 10) {
                    if (kg3.O[n7].a != 0 && (by3 == -1 || by3 == kg3.O[n7].a)) {
                        by3 = kg3.O[n7].a;
                        nArray[n7] = kg3.O[n7].b;
                    } else {
                        nArray[n7] = -1;
                    }
                    ++n7;
                }
                kg3.x();
                kx.o();
                ie.a().a(kg3.O);
            }
        }
        super.a(n2, n3);
    }

    public kg() {
        this.t();
        this.aW = new by(kf.ac, 30);
        this.aX = new by(kf.ad, 31);
        this.aY = new by(kf.ae, 32);
        main.a.S.e();
    }

    private void v() {
        this.ad = this.aW;
        this.ae = this.aX;
    }

    private void w() {
        this.ad = kx.D;
        this.ae = null;
    }

    private void x() {
        this.ad = null;
        this.ae = null;
    }

    private void y() {
        this.ad = this.aY;
        this.ae = null;
    }

    private void A() {
        this.ad = kx.C;
        this.ae = null;
    }

    public final void g() {
        this.aF = false;
        this.a_();
        super.g();
    }

    private void B() {
        if (this.aE == -1 || this.aD.b == -1) {
            return;
        }
        if (main.a.H) {
            this.l(this.o);
            this.k(this.aE);
            this.O[this.aE] = this.aD;
            this.aD = new ax(-1, true);
            return;
        }
        this.l(this.o);
        this.k(this.aE);
        this.O[this.aE] = this.aD;
        this.aD = new ax(-1, true);
    }

    private void j(int n2) {
        this.O[n2] = new ax(-1, true);
    }

    private void C() {
        if (this.bb && this.ba == 2) {
            this.ba = 0;
            this.bb = false;
            if (this.aD.b != -1) {
                this.E();
            }
            this.L[this.o] = -1;
            main.a.e = false;
        }
    }

    private void D() {
        int n2 = 0;
        while (n2 < 3) {
            if (this.P[n2].b == this.O[this.o].b && this.P[n2].b != -1) {
                return;
            }
            ++n2;
        }
        if (this.aK < 2) {
            ++this.aK;
        }
        if (this.aK > 0 && this.aD.b != -1) {
            this.E();
        }
        if (this.aK == 2) {
            this.L[this.o] = 0;
        }
    }

    public final void l() {
        block45: {
            block44: {
                int n2;
                block43: {
                    int n3;
                    super.l();
                    if (this.aL || kx.k || !kx.j || this.ad == kx.E || this.M) {
                        return;
                    }
                    n2 = this.J();
                    if (n2 == -1) {
                        n2 = 10;
                    }
                    if (main.a.g && this.aD.b != -1) {
                        main.a.g = false;
                        this.bb = true;
                    }
                    if (main.a.g && main.a.a(this.aZ - kx.z / 2, this.g.b - kx.A / 2 - 20, n2 * aU, kx.A)) {
                        main.a.g = false;
                        if (this.aD.b != -1) {
                            this.D();
                            this.bb = false;
                            return;
                        }
                        n2 = this.J();
                        n2 = n2 == -1 ? 9 : --n2;
                        n3 = (main.a.h - (this.aZ - kx.z / 2)) / aU;
                        this.bb = true;
                        if (n3 <= n2) {
                            this.o = n3;
                        }
                    }
                    if (this.bb) {
                        n2 = main.a.k();
                        n3 = main.a.l();
                        if (main.a.e) {
                            int n4 = (main.a.h - (this.aZ - kx.z / 2)) / aU;
                            if (this.ba != 2 && n3 > 10) {
                                main.a.b[2] = true;
                                if (this.L[this.o] != -1) {
                                    this.ba = 1;
                                }
                            } else if (this.ba != 2 && n3 < -10) {
                                if (this.ba == 1) {
                                    this.bb = false;
                                    this.ba = 0;
                                    main.a.b[8] = true;
                                }
                            } else if (aw.f(n2) > 10) {
                                int n5;
                                if (this.ba != 2) {
                                    n5 = 0;
                                    while (n5 < 3) {
                                        if (this.P[n5].b == this.O[this.o].b) {
                                            return;
                                        }
                                        ++n5;
                                    }
                                    this.aD = this.O[this.o];
                                    this.j(this.o);
                                    this.aE = this.o;
                                }
                                this.ba = 2;
                                if (this.o - n4 > 0) {
                                    if (this.aD.b != -1 && n4 >= 0) {
                                        this.O[this.o] = this.O[n4];
                                        this.j(n4);
                                        this.o = n4;
                                    }
                                } else {
                                    n5 = this.J();
                                    n5 = n5 == -1 ? 9 : --n5;
                                    if (this.aD.b != -1 && n4 <= n5) {
                                        this.O[this.o] = this.O[n4];
                                        this.j(n4);
                                        this.o = n4;
                                    }
                                }
                            }
                            this.b(true);
                        }
                        if (main.a.f) {
                            if (this.aD.b != -1) {
                                this.C();
                            } else if (aw.f(n2) <= 10 && aw.f(n3) <= 10) {
                                if (this.aK == 1) {
                                    this.aK = 2;
                                    this.L[this.o] = -1;
                                } else if (this.aK == 2) {
                                    this.aK = 1;
                                    this.L[this.o] = 0;
                                }
                            }
                            this.b(false);
                        }
                    }
                    if (!main.a.a(2)) break block43;
                    this.D();
                    break block44;
                }
                if (main.a.a(8)) {
                    if (this.aK > 0) {
                        --this.aK;
                    }
                    if (this.aK < 2) {
                        this.L[this.o] = -1;
                    }
                    if (this.aK == 0 && this.aD.b == -1) {
                        n2 = 0;
                        while (n2 < 3) {
                            if (this.P[n2].b == this.O[this.o].b) {
                                return;
                            }
                            ++n2;
                        }
                        this.aD = this.O[this.o];
                        this.j(this.o);
                        this.aE = this.o;
                    }
                    this.b(false);
                    return;
                }
                if (main.a.a(4)) {
                    n2 = this.J();
                    n2 = n2 == -1 ? 9 : --n2;
                    if (this.aD.b != -1) {
                        if (this.o > 0) {
                            this.O[this.o] = this.O[this.o - 1];
                            this.j(this.o - 1);
                        } else {
                            this.l(0);
                        }
                    }
                    this.o = this.o > 0 ? --this.o : n2;
                    this.b(false);
                    return;
                }
                if (main.a.a(6)) {
                    n2 = this.J();
                    n2 = n2 == -1 ? 9 : --n2;
                    if (this.aD.b != -1) {
                        if (this.o < n2) {
                            this.O[this.o] = this.O[this.o + 1];
                            this.j(this.o + 1);
                        } else {
                            this.k(0);
                        }
                    }
                    this.o = this.o < n2 ? ++this.o : 0;
                }
                break block45;
            }
            this.b(false);
        }
    }

    /*
     * Enabled aggressive block sorting
     */
    public final void k() {
        int n2;
        int n3;
        super.k();
        if (!kx.j && !kx.k) {
            this.q();
            return;
        }
        if (kx.j && kx.j && this.O != null) {
            int n4 = this.O.length - 1;
            while (n4 >= 0) {
                n3 = this.O[n4].a();
                if (n3 == -1) {
                    this.O[n4].g = false;
                }
                --n4;
            }
        }
        kg kg2 = this;
        if (kg2.M && (n3 = kx.i(kg2.aA)) != -1) {
            n3 = kx.x[n3];
            n2 = kg.c[n3].a;
            n3 = kg.c[n3].b;
            kg2.h.a += (n2 - kg2.h.a) / 2;
            kg2.h.b += (n3 - kg2.h.b) / 2;
            if (Math.abs(n2 - kg2.h.a) <= 1 && Math.abs(n3 - kg2.h.b) <= 1) {
                n2 = kx.i(kg2.aA);
                kg2.f[n2][kg2.W[n2]] = new ax((byte)kg2.aB, true);
                if (kg2.aA == GameMidlet.i.w) {
                    int n5 = 0;
                    while (n5 < 10) {
                        if (kg2.O[n5].b == kg2.aB) {
                            kg2.l(n5);
                            break;
                        }
                        ++n5;
                    }
                    if (kg2.O[kg2.o].b == -1) {
                        kg2.o = kg2.J() - 1;
                    }
                }
                kg2.M = false;
                kg2.H();
            }
            kg2.b(false);
        }
        kg2 = this;
        if (kg2.aM) {
            n3 = kg2.g.a + kg2.bg * aU;
            n2 = kg2.g.b;
            kg2.aO.a += (n3 - kg2.aO.a) / 2;
            kg2.aO.b += (n2 - kg2.aO.b) / 2;
            if (Math.abs((n3 - kg2.aO.a) / 2) <= 1 && Math.abs((n2 - kg2.aO.b) / 2) <= 1) {
                kg2.O[kg2.bg] = kg2.aP;
                if (kg.a(kg2.f[kx.s]) == 3) {
                    if (GameMidlet.i.w == kg2.n) {
                        kg2.y();
                    }
                } else if (GameMidlet.i.w == kg2.n) {
                    kg2.w();
                }
                if (!kg2.aI) {
                    kg2.G();
                    kg2.F();
                } else {
                    n2 = kg2.O[kg2.bg].b;
                    kg kg3 = kg2;
                    int[] nArray = new int[6];
                    int n6 = 0;
                    while (n6 < 5) {
                        nArray[n6] = -1;
                        ++n6;
                    }
                    n6 = 0;
                    int n7 = 0;
                    while (n7 < 12) {
                        if (kg3.Q[kx.s][n7] != -1) {
                            nArray[n6] = kg3.Q[kx.s][n7];
                            ++n6;
                        } else {
                            n6 = 0;
                            nArray[5] = n2;
                            kg.b(nArray);
                            if (kg3.c(nArray) || kg3.d(nArray)) {
                                int[] nArray2 = nArray;
                                kg3.C();
                                ie.a().a(nArray2);
                                break;
                            }
                            int n8 = 0;
                            while (n8 < 6) {
                                nArray[n8] = -1;
                                ++n8;
                            }
                        }
                        ++n7;
                    }
                }
                kg kg4 = kg2;
                kg2.bg = 0;
                kg4.aM = false;
                kg4.aO = new dr(main.a.o, main.a.p, 3);
                kg4.b(false);
            }
        }
        kg2 = this;
        if (kg2.aN) {
            int n9 = kx.i(kg2.n);
            int n10 = (kx.F[kx.x[n9]].a - kg2.aQ.c) / 2;
            n9 = (kx.F[kx.x[n9]].b - kg2.aQ.d) / 2;
            kg2.aQ.c += n10;
            kg2.aQ.d += n9;
            if (Math.abs(n10) <= 1 && Math.abs(n9) <= 1) {
                kg2.aN = false;
            }
        }
        kg2 = this;
        kx.t = (int)((long)main.a.j() - kx.u);
        if ((long)kx.v - kx.t >= 0L) return;
        if (kg2.ad == kg2.aW && kg2.ae == kg2.aX) {
            kg2.I();
            kg2.x();
            return;
        }
        if (kg2.ad != kx.D) {
            if (kg2.ad != kg2.aY) return;
            kg2.B();
            kg2.aY.b();
            return;
        }
        int n11 = 0;
        int n12 = 1;
        while (n12 < 10) {
            if (kg2.O[n12].a == 0 && kg2.O[n12].b > kg2.O[n11].b) {
                n11 = n12;
            }
            ++n12;
        }
        kg2.B();
        ie.a().c(kg2.O[n11].b);
    }

    private void b(boolean bl2) {
        int n2;
        if (!bl2) {
            n2 = this.J();
            if (n2 == -1) {
                n2 = 10;
            }
            if (main.a.H && kx.j && n2 != 0 && (aU = (main.a.m - kx.z / 2) / n2) > kx.z / 3 << 1) {
                aU = kx.z / 3 << 1;
            }
            if ((aV = aU) > kx.z / 4) {
                aV = kx.z / 4;
            }
            if (main.a.m < 160) {
                aV = 10;
            }
            this.aZ = (main.a.m - (aU * n2 + (kx.z - aU)) >> 1) + kx.z / 2;
            if (this.aZ < kx.z / 2) {
                this.aZ = kx.z / 2;
            }
        }
        n2 = 0;
        while (n2 < 10) {
            int n3 = 0;
            if (this.L[n2] == 0) {
                n3 = 10 * (main.a.Z + 1);
            }
            this.O[n2].m = this.aZ + n2 * aU;
            this.O[n2].l = this.g.b - n3;
            if (bl2) {
                this.O[n2].c = this.O[n2].m;
                this.O[n2].d = this.O[n2].l;
            }
            ++n2;
        }
    }

    private void E() {
        int n2 = -1;
        int n3 = 0;
        while (n3 < 3) {
            if (this.aD.a == this.P[n3].a) {
                n2 = this.P[n3].b;
            }
            ++n3;
        }
        this.O[this.o] = this.aD;
        if (n2 != -1) {
            if (!this.n(this.o)) {
                this.aD = this.O[this.o];
                this.j(this.o);
                this.B();
                return;
            }
            this.j(this.o);
        }
        if (this.aD.a != 0 && (this.o > 0 && this.O[this.o - 1].a == this.aD.a || this.o < 9 && this.O[this.o + 1].a == this.aD.a)) {
            this.O[this.o] = this.aD;
            this.aD = new ax(-1, true);
            return;
        }
        if (n2 == -1 || this.aD.a == 0) {
            block22: {
                int n4;
                if (this.o < 9) {
                    n3 = 0;
                    while (n3 < 3) {
                        if (this.P[n3].a != 0 && this.O[this.o + 1].a == this.P[n3].a) {
                            int[] nArray = new int[10];
                            boolean bl2 = false;
                            int n5 = 0;
                            while (n5 < 10) {
                                if (this.O[n5].a == this.P[n3].a) {
                                    nArray[n5] = this.O[n5].b;
                                } else {
                                    nArray[n5] = -1;
                                    if (!bl2) {
                                        bl2 = true;
                                        nArray[n5] = this.aD.b;
                                    }
                                }
                                ++n5;
                            }
                            if (this.d(nArray = kg.b(nArray)) || this.c(nArray)) {
                                this.bc = this.aD.a;
                                this.aD.a = this.P[n3].a;
                                this.O[this.o] = this.aD;
                                if (this.aE != this.o) {
                                    this.a(this.P[n3], (int)this.P[n3].b);
                                }
                                return;
                            }
                            this.B();
                            return;
                        }
                        ++n3;
                    }
                }
                kg kg2 = this;
                n3 = 0;
                while (n3 < 10) {
                    if (kg2.O[n3].b == -1) {
                        n4 = n3;
                        break block22;
                    }
                    if (kg2.m(kg2.O[n3].a)) {
                        n4 = n3;
                        break block22;
                    }
                    ++n3;
                }
                n4 = n3 = -1;
            }
            if (this.o >= n3 && n3 != -1) {
                this.B();
                return;
            }
            this.O[this.o] = this.aD;
            this.aD = new ax(-1, true);
            if (this.aE != this.o) {
                this.O[this.o].a = 0;
                this.G();
                this.F();
            }
            return;
        }
        if (n2 != -1) {
            this.bc = -1;
            if (this.aE != this.o) {
                this.a(this.aD, n2);
            }
        }
    }

    private void a(ax ax2, int n2) {
        this.C();
        this.aL = true;
        int[] nArray = new int[5];
        int n3 = 0;
        while (n3 < 5) {
            nArray[n3] = -1;
            ++n3;
        }
        int[] nArray2 = new int[6];
        int n4 = 0;
        while (n4 < 6) {
            nArray2[n4] = -1;
            ++n4;
        }
        n4 = 0;
        int n5 = 0;
        while (n5 < 10) {
            if (this.O[n5].a == ax2.a) {
                nArray2[n4] = this.O[n5].b;
                ++n4;
            }
            ++n5;
        }
        if (nArray2[5] != -1) {
            kg.b(nArray2);
            n5 = 0;
            n4 = 0;
            while (n4 < nArray2.length) {
                if (nArray2[n4] == n2) {
                    n5 = n4;
                }
                ++n4;
            }
            n4 = 0;
            if (n5 < 3) {
                int n6 = 0;
                while (n6 < nArray2.length) {
                    if (n6 > 2) {
                        n5 = 0;
                        while (n5 < 10) {
                            if (nArray2[n6] == this.O[n5].b) {
                                this.O[n5].a = 0;
                            }
                            ++n5;
                        }
                    } else {
                        nArray[n4] = nArray2[n6];
                        ++n4;
                        n5 = 0;
                        while (n5 < 10) {
                            if (nArray2[n6] == this.O[n5].b) {
                                ax ax3 = this.O[n5];
                                this.l(n5);
                                this.O[this.J()] = ax3;
                            }
                            ++n5;
                        }
                    }
                    ++n6;
                }
            } else {
                int n7 = 0;
                while (n7 < nArray2.length) {
                    if (n7 < 3) {
                        n5 = 0;
                        while (n5 < 10) {
                            if (nArray2[n7] == this.O[n5].b) {
                                this.O[n5].a = 0;
                            }
                            ++n5;
                        }
                    } else {
                        nArray[n4] = nArray2[n7];
                        ++n4;
                        n5 = 0;
                        while (n5 < 10) {
                            if (nArray2[n7] == this.O[n5].b) {
                                ax ax4 = this.O[n5];
                                this.l(n5);
                                this.O[this.J()] = ax4;
                            }
                            ++n5;
                        }
                    }
                    ++n7;
                }
            }
        } else {
            n5 = 0;
            n4 = 0;
            while (n4 < 10) {
                if (this.O[n4].a == ax2.a) {
                    nArray[n5] = this.O[n4].b;
                    ++n5;
                }
                ++n4;
            }
        }
        kg.b(nArray);
        ie.a().a(nArray, n2);
    }

    public final void a(byte by2) {
        this.C();
        this.aL = false;
        if (by2 == 0) {
            if (this.bc == -1) {
                this.O[this.o] = this.aD;
                this.O[this.o].a = 0;
                this.aD = new ax(-1, true);
                if (this.aE != this.o) {
                    this.G();
                    this.F();
                }
                this.aE = -1;
            } else if (this.bc >= 0) {
                this.aD = new ax(-1, true);
                if (this.aE != this.o) {
                    this.O[this.o].a = 0;
                    this.G();
                    this.F();
                }
            }
        } else if (this.bc == -1) {
            this.j(this.o);
            this.B();
        } else if (this.bc >= 0) {
            this.j(this.o);
            this.B();
            this.O[this.aE].a = (byte)this.bc;
        }
        this.bc = -2;
        this.b(false);
    }

    private void k(int n2) {
        int n3 = 9;
        while (n3 > n2) {
            this.O[n3] = this.O[n3 - 1];
            --n3;
        }
        this.j(n2);
    }

    private void l(int n2) {
        int n3 = n2;
        while (n3 < 9) {
            this.O[n3] = this.O[n3 + 1];
            ++n3;
        }
        this.j(9);
        this.L[n2] = -1;
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        super.a(graphics);
    }

    public final void a_(Graphics graphics) {
        int n2 = gy.Y;
        if (kx.j || kx.k) {
            n2 = 1;
        }
        int n3 = 0;
        while (n3 < kx.H) {
            hn hn2 = (hn)kx.m.elementAt(n3);
            if (hn2.w != -1) {
                if (hn2.w != GameMidlet.i.w || !kx.j) {
                    hn2.a(graphics, hn2.aw * n2, hn2.ax * n2, false);
                }
                hn2.a(graphics, hn2.aw * n2, hn2.ax * n2);
                kx.a(graphics, hn2.aw * n2, (hn2.ax - 50) * n2 - 10 * (n2 - 1), 3, hn2);
            }
            ++n3;
        }
    }

    public final void b(Graphics graphics) {
        long l2;
        super.b(graphics);
        this.a_(graphics);
        Object object = graphics;
        if (kx.j && !kx.l && (l2 = (long)kx.v - kx.t) > 0L && b != null && b[0] != null) {
            main.a.O.a((Graphics)object, String.valueOf(l2), main.a.o, kg.b[0].b + gy.ai + 10, 2);
        }
        if (kx.j) {
            this.e(graphics);
            this.f(graphics);
            Graphics graphics2 = graphics;
            object = this;
            if (object.aM) {
                object.aP.c = object.aO.a;
                object.aP.d = object.aO.b;
                if (main.a.m > 176) {
                    object.aP.c(graphics2);
                } else {
                    object.aP.a(graphics2, false);
                }
            }
            graphics2 = graphics;
            object = this;
            if (object.aN) {
                if (main.a.m > 176) {
                    object.aQ.c(graphics2);
                } else {
                    object.aQ.a(graphics2, false);
                }
            }
            graphics2 = graphics;
            object = this;
            if (object.M) {
                ax ax2 = new ax((byte)object.aB, true);
                new ax((byte)object.aB, true).c = object.h.a;
                ax2.d = object.h.b;
                if (main.a.m > 176) {
                    ax2.c(graphics2);
                } else {
                    ax2.a(graphics2, false);
                }
            }
            if (main.a.Z == 0) {
                graphics2 = graphics;
                object = this;
                if (object.o != -1 && !kx.k && !object.aF) {
                    if (object.bd == 4) {
                        object.K.b += 2;
                    }
                    if (object.bd == 8) {
                        object.K.b -= 2;
                        object.bd = 0;
                    }
                    ++object.bd;
                    int n2 = 0;
                    if (object.L[object.o] == 0) {
                        n2 = 10 * (main.a.Z + 1);
                    }
                    if (object.aD.b != -1) {
                        n2 = -10;
                    }
                    if (object.O[object.o] != null) {
                        ea.b().b.a(0, object.aZ - kx.z / 2 + object.o * aU + ea.b().b.a / 2, object.g.b - kx.A / 2 - 4 - n2, 0, 33, graphics2);
                    }
                }
            }
            if (!this.aF) {
                int n3 = kx.i(this.aC);
                graphics.drawImage(kx.G, kg.b[kx.x[n3]].a, kg.b[kx.x[n3]].b - 8, 3);
            }
        }
        kx.d(graphics);
    }

    private void e(Graphics graphics) {
        int n2 = 0;
        while (n2 < 4) {
            int n3;
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != -1 && (main.a.m >= 160 || hn2.w == this.n) && (n2 != (n3 = kx.i(this.n)) || main.a.l % 20 > 5 && n2 == n3 || this.aF)) {
                main.a.Q.a(graphics, String.valueOf(hn2.c()) + " " + kf.k(), kg.b[kx.x[n2]].a, kg.b[kx.x[n2]].b, kg.b[kx.x[n2]].c);
            }
            ++n2;
        }
    }

    private void f(Graphics graphics) {
        Object object;
        int n2;
        this.N = new ax(-1, true);
        int n3 = aV;
        if (n3 <= 12 && main.a.m > 200) {
            n3 = 20;
        }
        int n4 = 2;
        if (main.a.Z == 0 && main.a.m > 200) {
            n4 = 1;
        }
        Object object2 = graphics;
        kg kg2 = this;
        int n5 = aV;
        if (n5 <= 12 && main.a.m > 200) {
            n5 = 20;
        }
        if (!kg2.aF) {
            n2 = 0;
            while (n2 < 4) {
                object = (hn)kx.m.elementAt(n2);
                if (object != null && ((gx)object).w != -1) {
                    int n6 = 3;
                    if (kg2.f[n2] != null) {
                        int n7 = 0;
                        while (n7 < 4) {
                            if (kg2.f[n2][n7] == null) {
                                n6 = n7;
                                break;
                            }
                            ++n7;
                        }
                    }
                    if (kx.x[n2] == 0 || kx.x[n2] == 2) {
                        int n8 = 0;
                        while (n8 < 4) {
                            if (kg2.f[n2] != null && kg2.f[n2][n8] != null) {
                                kg2.f[n2][n8].c = kg.c[kx.x[n2]].a + n8 * aV - (n6 * aV + (kx.z - aV)) / 2 + kx.z / 2;
                                kg2.f[n2][n8].d = kg.c[kx.x[n2]].b;
                                if (kx.x[n2] == 2) {
                                    if (main.a.m > 176) {
                                        if (n8 < 3 && kg2.f[n2][n8 + 1] != null) {
                                            if (aU > 13) {
                                                kg2.f[n2][n8].c((Graphics)object2);
                                            } else {
                                                kg2.f[n2][n8].c((Graphics)object2);
                                            }
                                        } else {
                                            kg2.f[n2][n8].c((Graphics)object2);
                                        }
                                    } else {
                                        kg2.f[n2][n8].a((Graphics)object2, false);
                                    }
                                } else if (main.a.m > 176) {
                                    kg2.f[n2][n8].c = kg.c[kx.x[n2]].a - n8 * aV + (kg2.e[n2] * aV + (kx.z - aV)) / 2 - kx.z / 2;
                                    kg2.f[n2][n8].c((Graphics)object2);
                                } else {
                                    kg2.f[n2][n8].a((Graphics)object2, false);
                                }
                                ++n8;
                                continue;
                            }
                            break;
                        }
                    } else {
                        int n9 = 0;
                        while (n9 < 4) {
                            if (kg2.f[n2][n9] != null) {
                                kg2.f[n2][n9].c = kg.c[kx.x[n2]].a;
                                kg2.f[n2][n9].d = kg.c[kx.x[n2]].b + (n9 * n5 << 1) - (n6 * n5 << 1) / 2;
                                if (main.a.m > 176) {
                                    kg2.f[n2][n9].c((Graphics)object2);
                                } else {
                                    kg2.f[n2][n9].a((Graphics)object2, true);
                                }
                                ++n9;
                                continue;
                            }
                            break;
                        }
                    }
                }
                ++n2;
            }
        }
        int n10 = 0;
        while (n10 < 4) {
            object2 = (hn)kx.m.elementAt(n10);
            if (object2 != null && object2.w != -1) {
                if (kx.x[n10] == 1 || kx.x[n10] == 3) {
                    int n11 = 0;
                    while (n11 < 11) {
                        if (this.U[n10][n11] == -1) break;
                        this.N = new ax((byte)this.U[n10][n11], true);
                        this.N.c = kg.c[kx.x[n10]].a;
                        this.N.d = kg.c[kx.x[n10]].b + n11 * (n3 << 1) - this.V[n10] * (n3 << 1) / 2;
                        if (main.a.m > 176) {
                            this.N.c(graphics);
                        } else {
                            this.N.a(graphics, true);
                        }
                        ++n11;
                    }
                }
                if (kx.x[n10] == 0) {
                    int n12 = 0;
                    while (n12 < 11) {
                        if (this.U[n10][n12] == -1) break;
                        this.N = new ax((byte)this.U[n10][n12], true);
                        this.N.c = kg.c[kx.x[n10]].a - n12 * aV + (this.V[n10] * aV + (kx.z - aV)) / 2 - kx.z / 2;
                        this.N.d = kg.c[kx.x[n10]].b;
                        if (main.a.m > 176) {
                            this.N.c(graphics);
                        } else {
                            this.N.c = kg.c[kx.x[n10]].a + n12 * aV - (this.V[n10] * aV + (kx.z - aV)) / 2 + kx.z / 2;
                            this.N.a(graphics, false);
                        }
                        ++n12;
                    }
                }
            }
            ++n10;
        }
        n10 = 0;
        while (n10 < 4) {
            object2 = (hn)kx.m.elementAt(n10);
            if (object2 != null && object2.w != -1) {
                if (kx.x[n10] == 1) {
                    int n13 = 0;
                    while (n13 < 3) {
                        if (this.R[n10][n13] != -1) {
                            ax ax2 = new ax((byte)this.R[n10][n13], true);
                            new ax((byte)this.R[n10][n13], true).c = kg.d[kx.x[n10]].a;
                            ax2.d = kg.d[kx.x[n10]].b + n13 * (n3 << 1) - this.S[n10] * (n3 << 1) / 2;
                            ax2.a = 1;
                            if (main.a.m > 176) {
                                ax2.c(graphics);
                            } else {
                                ax2.a(graphics, true);
                            }
                            this.a(1, ax2.c, ax2.d, graphics);
                            ++n13;
                            continue;
                        }
                        break;
                    }
                } else if (kx.x[n10] == 0) {
                    int n14 = 0;
                    while (n14 < 3) {
                        if (this.R[n10][n14] != -1) {
                            ax ax3 = new ax((byte)this.R[n10][n14], true);
                            new ax((byte)this.R[n10][n14], true).d = kg.d[kx.x[n10]].b;
                            ax3.c = kg.d[kx.x[n10]].a + n14 * aV - (this.S[n10] * aV + (kx.z - aV)) / 2 + kx.z / 2;
                            ax3.a = 1;
                            if (main.a.m > 176) {
                                ax3.c(graphics);
                            } else {
                                ax3.a(graphics, false);
                            }
                            this.a(1, ax3.c, ax3.d, graphics);
                            ++n14;
                            continue;
                        }
                        break;
                    }
                }
            }
            ++n10;
        }
        n10 = 0;
        while (n10 < 4) {
            if (kx.x[n10] == 1) {
                int n15 = 0;
                while (n15 < 12) {
                    if (this.Q[n10][0] != -1) {
                        if (this.Q[n10][n15] != -1) {
                            this.N = new ax((byte)this.Q[n10][n15], true);
                            this.N.c = kg.d[kx.x[n10]].a;
                            if (main.a.m > 176) {
                                this.N.d = kg.d[kx.x[n10]].b + n15 * (n3 * n4) - this.T[n10] * (n3 * n4) / 2;
                                this.N.c(graphics);
                            } else {
                                this.N.d = kg.d[kx.x[n10]].b + n15 * n3 - this.T[n10] * n3 / 2;
                                this.N.a(graphics, true);
                            }
                        }
                        ++n15;
                        continue;
                    }
                    break;
                }
            } else if (kx.x[n10] == 0) {
                if (this.Q[n10][0] == -1) break;
                int n16 = 0;
                while (n16 < 12) {
                    if (this.Q[n10][n16] != -1) {
                        this.N = new ax((byte)this.Q[n10][n16], true);
                        this.N.c = kg.d[kx.x[n10]].a - n16 * aV + (this.T[n10] * aV + (kx.z - aV)) / 2 - kx.z / 2;
                        this.N.d = kg.d[kx.x[n10]].b;
                        if (main.a.m > 176) {
                            this.N.c(graphics);
                        }
                    }
                    ++n16;
                }
            }
            ++n10;
        }
        n10 = 0;
        while (n10 < 4) {
            object2 = (hn)kx.m.elementAt(n10);
            if (object2 != null && object2.w != -1 && kx.x[n10] == 3) {
                int n17 = 0;
                while (n17 < 3) {
                    if (this.R[n10][n17] == -1) break;
                    ax ax4 = new ax((byte)this.R[n10][n17], true);
                    new ax((byte)this.R[n10][n17], true).a = 1;
                    ax4.c = kg.d[kx.x[n10]].a;
                    ax4.d = kg.d[kx.x[n10]].b + n17 * (n3 << 1) - this.S[n10] * (n3 << 1) / 2;
                    if (main.a.m > 176) {
                        ax4.c(graphics);
                    } else {
                        ax4.a(graphics, true);
                    }
                    this.a(1, ax4.c, ax4.d, graphics);
                    ++n17;
                }
            }
            ++n10;
        }
        n10 = 0;
        while (n10 < 4) {
            object2 = (hn)kx.m.elementAt(n10);
            if (object2 != null && object2.w != -1 && kx.x[n10] == 3) {
                int n18 = 0;
                while (n18 < 12) {
                    if (this.Q[n10][0] == -1) break;
                    if (this.Q[n10][n18] != -1) {
                        this.N = new ax((byte)this.Q[n10][n18], true);
                        this.N.c = kg.d[kx.x[n10]].a;
                        if (main.a.m > 176) {
                            this.N.d = kg.d[kx.x[n10]].b + n18 * (n3 * n4) - this.T[n10] * (n3 * n4) / 2;
                            this.N.c(graphics);
                        } else {
                            this.N.d = kg.d[kx.x[n10]].b + n18 * n3 - this.T[n10] * n3 / 2;
                            this.N.a(graphics, true);
                        }
                    }
                    ++n18;
                }
            }
            ++n10;
        }
        n10 = 0;
        while (n10 < 4) {
            if (kx.x[n10] == 2) {
                int n19 = 0;
                while (n19 < 12) {
                    if (this.Q[n10][0] == -1) break;
                    if (this.Q[n10][n19] != -1) {
                        this.N = new ax((byte)this.Q[n10][n19], true);
                        this.N.c = kg.d[kx.x[n10]].a + n19 * aV - (this.T[n10] * aV + (kx.z - aV)) / 2 + kx.z / 2;
                        this.N.d = kg.d[kx.x[n10]].b;
                        if (main.a.m > 176) {
                            if (n19 < 11 && this.Q[n10][n19 + 1] != -1) {
                                if (aU > 13) {
                                    this.N.c(graphics);
                                } else {
                                    this.N.c(graphics);
                                }
                            } else {
                                this.N.c(graphics);
                            }
                        } else {
                            this.N.a(graphics, false);
                        }
                    }
                    ++n19;
                }
            }
            ++n10;
        }
        object2 = graphics;
        kg kg3 = this;
        int n20 = 0;
        while (n20 < 10) {
            n2 = 0;
            if (kg3.O[n20] != null && kg3.O[n20].b != -1) {
                if (kg3.L[n20] == 0) {
                    n2 = 5;
                }
                kg3.be = new ax(-1, true);
                kg3.be.c = kg3.O[n20].c;
                kg3.be.d = kg3.O[n20].d;
                if (!kg3.O[n20].g) {
                    kg3.be = kg3.O[n20];
                }
                if (main.a.m > 176) {
                    if (n2 == 0 && n20 < 9 && kg3.O[n20 + 1].b != -1 && n20 != kg3.o) {
                        if (aU > 14 || kg3.O[n20 + 1].c != kg3.O[n20 + 1].m) {
                            kg3.be.b((Graphics)object2);
                        } else {
                            kg3.be.a((Graphics)object2);
                        }
                        if (kg3.O[n20].a != 0) {
                            kg3.a((int)kg3.O[n20].a, kg3.O[n20].c, kg3.O[n20].d, (Graphics)object2);
                        }
                    } else {
                        kg3.be.c((Graphics)object2);
                        if (kg3.O[n20].a != 0) {
                            kg3.a((int)kg3.O[n20].a, kg3.O[n20].c, kg3.O[n20].d, (Graphics)object2);
                        }
                    }
                } else {
                    kg3.be.a((Graphics)object2, false);
                    if (kg3.O[n20].a != 0) {
                        kg3.a((int)kg3.O[n20].a, kg3.O[n20].c, kg3.O[n20].d, (Graphics)object2);
                    }
                }
            }
            if (n20 == kg3.o) {
                Object object3 = object2;
                object = kg3;
                if (((kg)object).aD.b != -1) {
                    ((kg)object).aD.c = ((kg)object).aZ + ((kx)object).o * aU;
                    ((kg)object).aD.d = ((kg)object).g.b + (((kg)object).bb ? -5 : 10);
                    if (main.a.m > 176) {
                        if (((kx)object).o < 9) {
                            if (((kg)object).O[((kx)object).o + 1].b == -1 || main.a.H) {
                                ((kg)object).aD.c((Graphics)object3);
                            } else {
                                ((kg)object).aD.a((Graphics)object3);
                            }
                        } else {
                            ((kg)object).aD.c((Graphics)object3);
                        }
                    } else {
                        ((kg)object).aD.a((Graphics)object3, false);
                    }
                    if (main.a.l % 10 > 6 && gy.Y == 1 && main.a.Z == 0) {
                        je.b.a(0, ((kg)object).aD.c - 40, ((kg)object).aD.d - 30, 0, (Graphics)object3);
                        je.b.a(0, ((kg)object).aD.c - 10, ((kg)object).aD.d - 30, 3, (Graphics)object3);
                    }
                }
            }
            ++n20;
        }
    }

    private void a(int n2, int n3, int n4, Graphics graphics) {
        int n5 = 0;
        switch (n2) {
            case 1: 
            case 4: {
                n5 = this.aR;
                break;
            }
            case 2: 
            case 5: {
                n5 = this.aS;
                break;
            }
            case 3: 
            case 6: {
                n5 = this.aT;
            }
        }
        graphics.setColor(n5);
        graphics.fillRect(n3 - kx.z / 2 + 2, n4 - kx.A / 2 + 22, 7, 2);
    }

    private void F() {
        this.ay = 3;
        kg kg2 = this;
        int n2 = 0;
        block0: while (n2 < 8) {
            if (kg2.m(kg2.O[n2].a)) break;
            int[] nArray = new int[6];
            int n3 = 0;
            while (n3 < 6) {
                nArray[n3] = -1;
                ++n3;
            }
            n3 = 0;
            while (n3 < 3) {
                if (kg2.O[n2 + n3].a != 0) break block0;
                nArray[n3] = kg2.O[n2 + n3].b;
                ++n3;
            }
            if (kg2.c(nArray) || kg2.d(nArray)) {
                ++kg2.ay;
                n3 = 0;
                while (n3 < 3) {
                    kg2.O[n2 + n3].a = (byte)kg2.ay;
                    ++n3;
                }
                n2 += 2;
            }
            ++n2;
        }
        int n4 = 0;
        while (n4 < 10) {
            if (!this.m(this.O[n4].a) && this.O[n4].a == 0 && this.O[n4].b != -1) {
                int n5 = n4;
                kg2 = this;
                if (kg2.O[n5].a == 0 && kg2.O[n5].b != -1) {
                    int n6;
                    n2 = 0;
                    int n7 = 0;
                    if (n5 > 0 && kg2.O[n5 - 1].a != 0 && kg2.O[n5 - 1].b != -1) {
                        int[] nArray = new int[10];
                        n6 = 0;
                        while (n6 < 10) {
                            if (kg2.O[n6].a == kg2.O[n5 - 1].a) {
                                nArray[n6] = kg2.O[n6].b;
                                n2 += nArray[n6] / 4 + 1;
                            } else {
                                nArray[n6] = -1;
                            }
                            ++n6;
                        }
                        int[] nArray2 = kg.b(nArray);
                        nArray = nArray2;
                        nArray2[9] = kg2.O[n5].b;
                        if (!kg2.c(nArray = kg.b(nArray)) && !kg2.d(nArray)) {
                            n2 = 0;
                        }
                    }
                    if (n5 < 9 && (n5 == 0 || n5 != 0 && kg2.O[n5 + 1].a != kg2.O[n5 - 1].a) && kg2.O[n5 + 1].a != 0 && kg2.O[n5 + 1].b != -1) {
                        int[] nArray = new int[10];
                        n6 = 0;
                        while (n6 < 10) {
                            if (kg2.O[n6].a == kg2.O[n5 + 1].a) {
                                nArray[n6] = kg2.O[n6].b;
                                n7 += nArray[n6] / 4 + 1;
                            } else {
                                nArray[n6] = -1;
                            }
                            ++n6;
                        }
                        int[] nArray3 = kg.b(nArray);
                        nArray = nArray3;
                        nArray3[9] = kg2.O[n5].b;
                        if (!kg2.c(nArray = kg.b(nArray)) && !kg2.d(nArray)) {
                            n7 = 0;
                        }
                    }
                    if (n2 < n7) {
                        kg2.O[n5].a = kg2.O[n5 + 1].a;
                    } else if (n2 > 0) {
                        kg2.O[n5].a = kg2.O[n5 - 1].a;
                    }
                }
            }
            ++n4;
        }
        kg2 = this;
        if (kg2.X + (kg2.ay - 3) == 3) {
            kg2.ad = kg2.aY;
        }
    }

    private void G() {
        byte by2 = 0;
        int n2 = 0;
        while (n2 < 10) {
            if (this.m(this.O[n2].a)) {
                return;
            }
            if (this.O[n2].a != 0 && by2 != this.O[n2].a) {
                by2 = this.O[n2].a;
                --this.ay;
            }
            this.O[n2].a = 0;
            ++n2;
        }
    }

    private boolean m(int n2) {
        int n3 = 0;
        while (n3 < 3) {
            if (this.P[n3].a == 0) {
                return false;
            }
            if (this.P[n3].a == n2) {
                return true;
            }
            ++n3;
        }
        return false;
    }

    public final void a(byte by2, Vector vector, int n2, int n3) {
        super.s();
        this.u();
        this.t();
        kx.u = main.a.j();
        this.aA = this.n = n2;
        kx.v = by2;
        this.aC = n3;
        kx.j = true;
        by2 = (byte)vector.size();
        n2 = 0;
        while (n2 < by2) {
            ax ax2 = (ax)vector.elementAt(n2);
            this.O[n2] = new ax(ax2.b, true);
            this.O[n2].c = main.a.o;
            this.O[n2].d = main.a.p;
            this.O[n2].g = true;
            ++n2;
        }
        kg.b(this.O);
        this.F();
        if (this.n != GameMidlet.i.w) {
            this.x();
        }
        this.f();
        this.b(false);
    }

    public final void j() {
        boolean bl2;
        this.C();
        super.j();
        this.B();
        int n2 = 0;
        int n3 = -1;
        int n4 = 0;
        while (n4 < 10) {
            if (this.L[n4] == 0) {
                ++n2;
                n3 = n4;
            }
            ++n4;
        }
        if (n2 > 1) {
            main.a.b(kf.af);
            return;
        }
        if (n3 == -1) {
            main.a.b(kf.ag);
            return;
        }
        n4 = n3;
        kg kg2 = this;
        if (kg2.O[n4].a != 0 && !kg2.n(n4)) {
            main.a.b(kf.ah);
            bl2 = false;
        } else {
            bl2 = true;
        }
        if (!bl2) {
            return;
        }
        this.x();
        kx.o();
        ie.a().c(this.O[n3].b);
    }

    public final void a(int n2, int n3, int n4, byte by2) {
        if (n4 == -1) {
            this.w();
            main.a.b(kf.aY);
            return;
        }
        if (n2 == GameMidlet.i.w) {
            this.C();
        }
        this.x();
        kx.u = main.a.j();
        int n5 = kx.i(n3);
        if (n5 == -1) {
            return;
        }
        this.h.a = kx.F[kx.x[n5]].a;
        if (n3 == GameMidlet.i.w) {
            this.h.a = this.g.a + this.o * aU;
        }
        if (n2 == GameMidlet.i.w) {
            if (kg.a(this.f[kx.s]) != -1 && kg.a(this.f[kx.s]) <= 3) {
                this.v();
            }
            this.G();
            this.F();
        }
        this.h.b = kx.F[kx.x[n5]].b;
        this.aB = n4;
        this.n = n2;
        this.aA = n3;
        this.W[n5] = by2;
        this.M = true;
        int n6 = n5;
        this.e[n6] = this.e[n6] + 1;
    }

    public final void b(int n2, int n3) {
        int n4 = kx.i(n2);
        if (n4 == -1) {
            return;
        }
        this.aC = n3;
        if (n2 == GameMidlet.i.w && this.n != n2) {
            this.v();
            this.b(false);
        }
        this.n = n2;
        kx.u = main.a.j();
    }

    private void H() {
        int n2 = 0;
        while (n2 < this.L.length) {
            this.L[n2] = -1;
            ++n2;
        }
    }

    public final void a(boolean n2, int[] nArray, boolean n3, int n4) {
        int n5 = kx.i(n4);
        if (n2 == 0) {
            main.a.b(kf.aj);
            return;
        }
        if (n4 == GameMidlet.i.w) {
            this.C();
        }
        this.H();
        this.aH = n3;
        n2 = 1;
        n3 = 0;
        while (n3 < this.Q[n5].length) {
            if (this.Q[n5][n3] == -1) {
                if (n2 == 1) {
                    n2 = n3;
                    break;
                }
                n2 = 1;
            } else {
                n2 = 0;
            }
            ++n3;
        }
        n3 = n2;
        while (n3 < nArray.length) {
            if (nArray[n3 - n2] != -1) {
                this.Q[n5][n3] = nArray[n3 - n2];
            }
            ++n3;
        }
        if (GameMidlet.i.w == n4) {
            this.aI = true;
            n3 = 0;
            while (n3 < 10) {
                n2 = 0;
                while (n2 < nArray.length) {
                    if (this.O[n3].b == nArray[n2]) {
                        this.j(n3);
                        break;
                    }
                    ++n2;
                }
                ++n3;
            }
            this.w();
            this.O = kg.b(this.O);
            if (this.O[this.o].b == -1) {
                this.o = this.J() - 1;
            }
            this.b(false);
        }
        if (this.aH) {
            this.aF = true;
            this.A();
        }
        this.T[n5] = 0;
        n3 = 0;
        while (n3 < this.Q[n5].length) {
            if (this.Q[n5][n3] != -1) {
                int n6 = n5;
                this.T[n6] = this.T[n6] + 1;
            }
            ++n3;
        }
    }

    public final void a(int[] object, int[][] nArray) {
        this.C();
        int n2 = 1000;
        int n3 = 0;
        while (n3 < 4) {
            if (object[n3] >= 0 && object[n3] < n2) {
                n2 = object[n3];
                this.aG = n3;
            }
            this.aJ[n3] = object[n3];
            ++n3;
        }
        this.U = nArray;
        n3 = 0;
        while (n3 < 4) {
            this.V[n3] = (byte)kg.a(nArray[n3]);
            ++n3;
        }
        this.aF = true;
        this.A();
        n3 = 0;
        while (n3 < 4) {
            hn hn2 = (hn)kx.m.elementAt(n3);
            object = hn2;
            if (hn2 != null && object.w != -1 && this.aJ[n3] != -1) {
                if (this.aJ[n3] == -2) {
                    kx.a(object.w, kf.dm);
                } else if (n3 == this.aG) {
                    kx.a(object.w, kf.aP);
                } else {
                    kx.a(object.w, kf.aQ);
                }
                object.o = false;
            }
            ++n3;
        }
        GameMidlet.i.o = false;
        this.b(false);
    }

    public final void m() {
        this.aF = true;
        this.A();
        if (!kx.k) {
            this.aG = kx.s;
            kx.a(((hn)kx.m.elementAt((int)this.aG)).w, kf.aP);
        }
        kx.j = true;
    }

    public final void b(int n2) {
        this.aF = true;
        this.A();
        this.aG = n2;
        this.aH = true;
        kx.a(this.aG, kf.dn);
        kx.a(this.aA, kf.do);
    }

    private boolean n(int n2) {
        int n3 = -1;
        int n4 = 0;
        while (n4 < 3) {
            if (this.P[n4].a != 0 && this.P[n4].a == this.O[n2].a) {
                n3 = n4;
                break;
            }
            ++n4;
        }
        if (n3 == -1) {
            if (this.O[n2].a != 0) {
                int[] nArray = new int[10];
                int n5 = 0;
                while (n5 < 10) {
                    nArray[n5] = this.O[n5].a == this.O[n2].a && this.L[n5] == -1 && n5 != n2 ? (int)this.O[n5].b : -1;
                    ++n5;
                }
                if (!this.c(nArray = kg.b(nArray)) && !this.d(nArray)) {
                    n5 = 0;
                    while (n5 < 10) {
                        if (n5 != n2 && this.O[n5].a == this.O[n2].a) {
                            this.O[n5].a = 0;
                        }
                        ++n5;
                    }
                    this.O[n2].a = 0;
                }
            }
            return true;
        }
        int[] nArray = new int[10];
        int n6 = 0;
        while (n6 < 10) {
            nArray[n6] = this.O[n6].a == this.P[n3].a && this.L[n6] == -1 && n6 != n2 ? (int)this.O[n6].b : -1;
            ++n6;
        }
        nArray = kg.b(nArray);
        n6 = -1;
        n2 = 0;
        int n7 = 0;
        while (n7 < 10) {
            if (nArray[n7] == this.P[n3].b) {
                n6 = n7;
            }
            ++n7;
        }
        n7 = 0;
        while (n7 < 9) {
            if (nArray[n7 + 1] == -1 || nArray[n7 + 1] / 4 != nArray[n7] / 4 && (nArray[n7 + 1] / 4 - nArray[n7] / 4 != 1 || nArray[n7] % 4 != nArray[n7 + 1] % 4)) break;
            n2 = n7 + 1;
            ++n7;
        }
        if (n6 > n2 && n2 > 1) {
            return false;
        }
        if (n2 > 1) {
            n7 = n2 + 1;
            while (n7 < 10) {
                n3 = 0;
                while (n3 < 10) {
                    if (nArray[n7] == this.O[n3].b) {
                        this.O[n3].a = 0;
                    }
                    ++n3;
                }
                ++n7;
            }
            return true;
        }
        int[] nArray2 = new int[3];
        n3 = 0;
        while (n3 < 3) {
            nArray2[n3] = -1;
            ++n3;
        }
        n3 = 0;
        while (n3 <= n2) {
            nArray2[n3] = nArray[n3];
            nArray[n3] = -1;
            ++n3;
        }
        if (this.c(nArray = kg.b(nArray)) || this.d(nArray)) {
            n3 = 0;
            while (n3 < 3) {
                n2 = 0;
                while (n2 < 10) {
                    if (nArray2[n3] == this.O[n2].b) {
                        this.O[n2].a = 0;
                    }
                    ++n2;
                }
                ++n3;
            }
            return true;
        }
        return false;
    }

    public final void a(boolean bl2, int n2, int n3, byte by2) {
        int n4 = kx.i(this.n);
        if (n4 == -1) {
            return;
        }
        if (this.n == GameMidlet.i.w) {
            this.C();
        }
        if (bl2) {
            kg kg2 = this;
            this.aN = true;
            kg2.aQ = new ax((byte)kg2.aB, true);
            int n5 = kx.i(kg2.aA);
            kg2.aQ.c = kx.F[kx.x[n5]].a;
            kg2.aQ.d = kx.F[kx.x[n5]].b;
            int n6 = kx.i(this.aA);
            if (n6 != -1) {
                n5 = kx.i(this.aC);
                if (n6 != n5) {
                    this.f[n6][this.W[n6]] = this.f[n5][this.W[n5]];
                }
                this.f[n5][this.W[n5]] = null;
                this.aC = n3;
                this.W[n5] = by2;
                this.e[n4] = this.W[n4];
                this.e[n5] = this.W[n5];
            }
            int n7 = n4;
            this.S[n7] = this.S[n7] + 1;
            if (this.n == GameMidlet.i.w) {
                ++this.X;
                if (kg.a(this.f[kx.s]) == 3) {
                    this.y();
                } else {
                    this.w();
                }
                n5 = n2 - 1;
                while (n5 >= 0) {
                    n6 = 0;
                    while (n6 < 10) {
                        if (this.O[n6].b == this.bf[n5]) {
                            this.O[n6].a = (byte)this.X;
                            this.O[this.J()] = this.O[n6];
                            this.l(n6);
                        }
                        ++n6;
                    }
                    --n5;
                }
                n5 = this.J();
                this.O[n5] = new ax((byte)this.aB, true);
                this.O[n5].a = (byte)this.X;
                n6 = 0;
                while (n6 < 3) {
                    if (this.P[n6].b == -1) {
                        this.P[n6] = this.O[n5];
                        break;
                    }
                    ++n6;
                }
                this.G();
                this.F();
            }
            this.R[n4][kg.a((int[])this.R[n4])] = this.aB;
            this.H();
        } else if (this.n == GameMidlet.i.w) {
            main.a.b(kf.al);
            this.v();
        }
        if (GameMidlet.i.w == this.n || GameMidlet.i.w == this.aA) {
            this.b(false);
        }
    }

    private void I() {
        this.C();
        this.B();
        this.x();
        kx.o();
        ie.a().f();
    }

    public final void c(int n2) {
        int n3;
        int n4;
        block4: {
            this.C();
            kg kg2 = this;
            int n5 = 0;
            while (n5 < 10) {
                if (kg2.O[n5].b == -1) {
                    n4 = n5;
                    break block4;
                }
                if (kg2.m(kg2.O[n5].a)) {
                    int n6 = 9;
                    while (n6 > n5) {
                        kg2.O[n6] = kg2.O[n6 - 1];
                        --n6;
                    }
                    n4 = n5;
                    break block4;
                }
                ++n5;
            }
            n4 = -1;
        }
        this.bg = n3 = n4;
        this.aM = true;
        this.aP = new ax((byte)n2, true);
    }

    public final void a(boolean n2, byte by2) {
        int n3 = kx.i(this.n);
        if (n3 == -1) {
            return;
        }
        if (this.n == GameMidlet.i.w) {
            this.C();
        }
        if (n2 != 0) {
            if (GameMidlet.i.w == this.n) {
                n2 = 0;
                while (n2 < 10) {
                    if (this.O[n2].b == -1) break;
                    if (by2 == this.O[n2].b) {
                        this.j(n2);
                        break;
                    }
                    ++n2;
                }
                this.b(false);
            }
            n2 = 0;
            int[] nArray = new int[6];
            int n4 = 0;
            while (n4 < 6) {
                nArray[n4] = -1;
                ++n4;
            }
            n4 = 0;
            while (n4 < this.Q[n3].length) {
                if (this.Q[n3][n4] == -1) {
                    int n5;
                    n2 = 0;
                    nArray[5] = by2;
                    kg.b(nArray);
                    if (this.c(nArray) || this.d(nArray)) {
                        n5 = 11;
                        while (n5 > n4) {
                            if (n5 - 1 >= 0) {
                                this.Q[n3][n5] = this.Q[n3][n5 - 1];
                            }
                            --n5;
                        }
                        this.Q[n3][n4] = by2;
                    }
                    n5 = 0;
                    while (n5 < 6) {
                        nArray[n5] = -1;
                        ++n5;
                    }
                } else {
                    nArray[n2] = this.Q[n3][n4];
                    ++n2;
                }
                ++n4;
            }
        }
    }

    private int J() {
        int n2 = 0;
        while (n2 < 10) {
            if ((this.aD.b == -1 || n2 != this.o) && this.O[n2].b == -1) {
                return n2;
            }
            ++n2;
        }
        return -1;
    }

    private static int a(ax[] axArray) {
        int n2 = 0;
        while (n2 < axArray.length) {
            if (axArray[n2] == null) {
                return n2;
            }
            ++n2;
        }
        return -1;
    }

    private static int a(int[] nArray) {
        int n2 = 0;
        while (n2 < nArray.length) {
            if (nArray[n2] == -1) {
                return n2;
            }
            ++n2;
        }
        return -1;
    }

    public final void a(byte by2, byte by3, int n2, int n3, Vector vector) {
        super.a(by2, by3, n2, n3, vector);
        GameMidlet.i.o = false;
        kx.w = 0;
    }

    private static int[] b(int[] nArray) {
        int n2 = 0;
        while (n2 < nArray.length - 1) {
            int n3 = n2 + 1;
            while (n3 < nArray.length) {
                int n4;
                if (nArray[n3] != -1 && ((n4 = nArray[n2]) > nArray[n3] || n4 == -1)) {
                    nArray[n2] = nArray[n3];
                    nArray[n3] = n4;
                }
                ++n3;
            }
            ++n2;
        }
        return nArray;
    }

    private static ax[] b(ax[] axArray) {
        int n2 = 0;
        while (n2 < axArray.length - 1) {
            int n3 = n2 + 1;
            while (n3 < axArray.length) {
                if (axArray[n3].b != -1) {
                    ax ax2 = axArray[n2];
                    if (ax2.b > axArray[n3].b || ax2.b == -1) {
                        axArray[n2] = axArray[n3];
                        axArray[n3] = ax2;
                    }
                }
                ++n3;
            }
            ++n2;
        }
        return axArray;
    }

    private boolean c(int[] nArray) {
        nArray = kg.b(nArray);
        int n2 = 0;
        int n3 = 0;
        while (n3 < nArray.length - 1) {
            if (nArray[n3 + 1] == -1) break;
            if (nArray[n3] - nArray[n3 + 1] != 0 && nArray[n3 + 1] / 4 - nArray[n3] / 4 == 1 && nArray[n3] % 4 - nArray[n3 + 1] % 4 == 0) {
                ++n2;
            } else {
                return false;
            }
            ++n3;
        }
        return n2 > 1;
    }

    private boolean d(int[] nArray) {
        nArray = kg.b(nArray);
        int n2 = 0;
        int n3 = 0;
        while (n3 < nArray.length - 1) {
            if (nArray[n3 + 1] == -1) break;
            if (nArray[n3] / 4 - nArray[n3 + 1] / 4 == 0 && nArray[n3] - nArray[n3 + 1] != 0) {
                ++n2;
            } else {
                return false;
            }
            ++n3;
        }
        return n2 > 1;
    }

    public final void a(int n2, int n3, int n4, int[][] nArray, int[][] nArray2, int n5) {
        this.t();
        kx.k = true;
        kx.u = main.a.j();
        int n6 = 0;
        while (n6 < nArray.length) {
            int n7 = 0;
            while (n7 < nArray2[n6].length) {
                if (nArray[n6][n7] != -1) {
                    this.f[n6][n7] = new ax((byte)nArray[n6][n7], true);
                }
                ++n7;
            }
            ++n6;
        }
        this.R = nArray2;
        kx.v = n2;
        this.n = n3;
        this.aA = n4;
        this.aC = n5;
        kx.j = true;
        n6 = 0;
        while (n6 < 4) {
            this.f[kx.s][n6] = null;
            ++n6;
        }
        n6 = 0;
        while (n6 < 3) {
            this.R[kx.s][n6] = -1;
            ++n6;
        }
        n6 = 0;
        while (n6 < this.Q.length) {
            this.Q[kx.s][n6] = -1;
            ++n6;
        }
        n6 = 0;
        while (n6 < this.U.length) {
            this.U[kx.s][n6] = -1;
            ++n6;
        }
        this.f();
        hj.z();
        if (main.a.H && (aU = (main.a.m - kx.z / 2) / 10) > kx.z / 3 << 1) {
            aU = kx.z / 3 << 1;
        }
    }
}


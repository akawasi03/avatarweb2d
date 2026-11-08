/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.io.IOException;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public final class ek
extends kx {
    public static ek a;
    private dn[][] d = new dn[8][8];
    private int e;
    private int f;
    private int g;
    private int h;
    private int K = -1;
    private int L;
    private int M;
    private byte N = (byte)-1;
    private Vector O = new Vector();
    private boolean P = false;
    private boolean Q = false;
    private by R;
    private by S;
    private ht T;
    private byte U;
    private int V = 0;
    public int b = -1;
    private boolean W = false;
    public boolean c = false;
    private boolean X = false;
    private int[][] ay;
    private int[][] az;
    private int[][] aA;
    private int[][] aB;
    private boolean aC;
    private int aD;
    private Vector aE;
    private boolean aF;
    private boolean aG;

    public static ek b() {
        if (a == null) {
            a = new ek();
            return a;
        }
        return a;
    }

    public ek() {
        int[][] nArrayArray = new int[16][];
        nArrayArray[0] = new int[]{1, -2};
        nArrayArray[1] = new int[]{1, -1};
        nArrayArray[2] = new int[]{1, -1};
        nArrayArray[3] = new int[]{1, 3};
        nArrayArray[4] = new int[]{1, 2};
        nArrayArray[5] = new int[]{1, 2};
        nArrayArray[6] = new int[2];
        int[] nArray = new int[2];
        nArray[1] = -1;
        nArrayArray[7] = nArray;
        int[] nArray2 = new int[2];
        nArray2[1] = 1;
        nArrayArray[8] = nArray2;
        nArrayArray[9] = new int[2];
        int[] nArray3 = new int[2];
        nArray3[1] = -1;
        nArrayArray[10] = nArray3;
        int[] nArray4 = new int[2];
        nArray4[1] = 1;
        nArrayArray[11] = nArray4;
        nArrayArray[12] = new int[]{-1, 1};
        nArrayArray[13] = new int[]{-1, 1};
        nArrayArray[14] = new int[]{-1, -1};
        nArrayArray[15] = new int[]{1, 1};
        this.ay = nArrayArray;
        int[][] nArrayArray2 = new int[16][];
        nArrayArray2[0] = new int[2];
        int[] nArray5 = new int[2];
        nArray5[1] = -1;
        nArrayArray2[1] = nArray5;
        int[] nArray6 = new int[2];
        nArray6[1] = 1;
        nArrayArray2[2] = nArray6;
        nArrayArray2[3] = new int[2];
        int[] nArray7 = new int[2];
        nArray7[1] = -1;
        nArrayArray2[4] = nArray7;
        int[] nArray8 = new int[2];
        nArray8[1] = 1;
        nArrayArray2[5] = nArray8;
        nArrayArray2[6] = new int[]{1, 3};
        nArrayArray2[7] = new int[]{1, 2};
        nArrayArray2[8] = new int[]{1, 2};
        nArrayArray2[9] = new int[]{1, -2};
        nArrayArray2[10] = new int[]{1, -1};
        nArrayArray2[11] = new int[]{1, -1};
        nArrayArray2[12] = new int[]{-1, -1};
        nArrayArray2[13] = new int[]{1, 1};
        nArrayArray2[14] = new int[]{-1, 1};
        nArrayArray2[15] = new int[]{-1, 1};
        this.az = nArrayArray2;
        this.aA = new int[][]{{-1, -2}, new int[2], {1, 2}, new int[2], {-1, 1}, new int[2]};
        this.aB = new int[][]{new int[2], {-1, -2}, new int[2], {1, 2}, new int[2], {-1, 1}};
        this.aC = false;
        this.aE = new Vector();
        this.aF = false;
        this.aG = false;
        this.R = new by(kf.O, 20);
        this.S = new by(kf.B, 21);
        c.b(kf.ax);
        this.T = ht.a("st", 11 * gy.Y, 11 * gy.Y);
        c.a();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 20: {
                ek ek2 = this;
                if (ek2.P) break;
                if (ek2.h == -1 && ek2.ad == ek2.R && ek2.B == GameMidlet.i.w && !ek2.Q) {
                    ek2.h = ek2.V;
                    break;
                }
                ek2.h = -1;
                break;
            }
            case 21: {
                this.m();
            }
        }
        super.a(n2, n3);
    }

    private void m() {
        ie ie2 = ie.a();
        try {
            ie2.b((byte)49);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        ie2.k();
        this.B = -1;
        this.ad = kx.E;
        this.ae = null;
    }

    public final void e() {
        super.e();
        if (main.a.q > 250) {
            this.g = 24 * gy.Y;
            this.U = (byte)(24 * gy.Y);
        } else {
            this.g = 16;
            this.U = (byte)16;
        }
        this.aD = 40 * gy.Y;
        if (this.N == -1 || !kx.j) {
            this.e = (main.a.m - (this.g << 3)) / 2;
        }
        this.f = this.g / 2 + 2;
        if (main.a.m < 160) {
            this.f = 0;
        }
    }

    public final void a(int n2, int n3, byte[][] byArray) {
        hj.z();
        super.s();
        this.W = false;
        this.B = n2;
        kx.v = n3;
        this.ad = null;
        this.ae = null;
        this.b = -1;
        kx.t = System.currentTimeMillis() + (long)(kx.v * 1000);
        if (GameMidlet.i.w == this.B) {
            this.X = true;
        }
        this.e();
        this.f();
        kx.j = true;
        this.h = -1;
        this.b(byArray);
        main.a.h();
    }

    public final void f() {
        do.a().b(0, 0);
        int n2 = this.e;
        int n3 = this.g << 3;
        if (main.a.q < 250) {
            n3 = main.a.m - 50;
            n2 = 25;
        }
        int n4 = 0;
        while (n4 < kx.H) {
            hn hn2 = (hn)kx.m.elementAt(n4);
            if (hn2.w != -1) {
                if (hn2.w != GameMidlet.i.w) {
                    ir.b(hn2);
                }
                hn2.D = hn2.ax = main.a.q - main.a.T - gy.ai / 2;
                if (hn2.ax < this.g << 3 && (n2 = this.e - this.aD - 15 * gy.Y) < 0) {
                    n2 = 0;
                }
                if (main.a.m < 160) {
                    hn2.D = hn2.ax = main.a.q - 10;
                }
                if (main.a.Z == 0 && main.a.m > 200) {
                    hn2.D = hn2.ax -= 10;
                }
                if (hn2.w == GameMidlet.i.w) {
                    hn2.C = hn2.aw = (this.L = n2 + 15 * gy.Y + this.aD);
                    hn2.t = 0;
                    hn2.K = 0;
                } else {
                    hn2.C = hn2.aw = (this.M = n2 + n3 - 15 * gy.Y - this.aD);
                    hn2.K = hn2.t = gx.J;
                }
                hn2.h = 0;
                hn2.b((byte)0);
                hn2.f(hn2.H);
            }
            ++n4;
        }
    }

    private void b(byte[][] byArray) {
        int n2 = 0;
        this.Q = true;
        int n3 = 7;
        while (n3 >= 0) {
            n2 = 20;
            int n4 = 7;
            while (n4 >= 0) {
                this.d[n3][n4] = new dn(n4 * this.g, n3 * this.g, byArray[n3][n4]);
                this.d[n3][n4].f = this.d[n3][n4].ax;
                this.d[n3][n4].e = -n2;
                --n2;
                this.d[n3][n4].k = true;
                this.d[n3][n4].ax = -(n4 * this.g + 24);
                --n4;
            }
            --n3;
        }
    }

    /*
     * Unable to fully structure code
     */
    public final void k() {
        block76: {
            super.k();
            if (!kx.j && !kx.k) break block76;
            if (kx.t != 0L && (kx.u = System.currentTimeMillis()) > kx.t) {
                kx.t = 0L;
                if (this.B == GameMidlet.i.w && this.ad == this.R) {
                    this.m();
                }
            }
            var1_1 = 0;
            var2_5 = 0;
            var3_6 = 63;
            while (var3_6 >= 0) {
                if (this.d[var3_6 / 8][var3_6 % 8] != null && this.d[var3_6 / 8][var3_6 % 8].az == 1) {
                    var4_7 = this.d[var3_6 / 8][var3_6 % 8];
                    if (var4_7.aw == var4_7.n && var4_7.ax == var4_7.m) {
                        v0 = -1;
                    } else if (Math.abs((var4_7.n - var4_7.aw) / 2) <= 1 && Math.abs((var4_7.m - var4_7.ax) / 2) <= 1) {
                        var4_7.aw = var4_7.n;
                        var4_7.ax = var4_7.m;
                        v0 = 0;
                    } else {
                        if (var4_7.aw != var4_7.n) {
                            var4_7.aw += (var4_7.n - var4_7.aw) / 2;
                        }
                        if (var4_7.ax != var4_7.m) {
                            var4_7.ax += (var4_7.m - var4_7.ax) / 2;
                        }
                        v0 = aw.a(var4_7.aw, var4_7.ax, var4_7.n, var4_7.m) <= var4_7.o / 5 ? 2 : 1;
                    }
                    if (v0 == -1) {
                        this.d[var3_6 / 8][var3_6 % 8].az = 0;
                        var2_5 = 1;
                    } else {
                        var1_1 = 1;
                    }
                }
                --var3_6;
            }
            if (var2_5 == 1 && this.P) {
                if (!this.c(this.V) && !this.c(this.h)) {
                    var3_6 = this.V;
                    this.V = this.h;
                    this.h = var3_6;
                    this.u();
                    this.ad = this.R;
                    this.ae = this.S;
                } else if (this.B == GameMidlet.i.w) {
                    ie.a().a(this.h, this.V);
                }
                this.P = false;
                this.h = -1;
            }
            if (var1_1 == 0) {
                var3_6 = 0;
                var1_1 = 63;
                while (var1_1 >= 0) {
                    if (this.d[var1_1 / 8][var1_1 % 8] != null && this.d[var1_1 / 8][var1_1 % 8].k) {
                        this.d[var1_1 / 8][var1_1 % 8].aw += this.d[var1_1 / 8][var1_1 % 8].b;
                        if (this.d[var1_1 / 8][var1_1 % 8].b > 1 || this.d[var1_1 / 8][var1_1 % 8].b < -1) {
                            this.d[var1_1 / 8][var1_1 % 8].b -= this.d[var1_1 / 8][var1_1 % 8].b / aw.f(this.d[var1_1 / 8][var1_1 % 8].b);
                        }
                        this.d[var1_1 / 8][var1_1 % 8].ax += this.d[var1_1 / 8][var1_1 % 8].e;
                        this.d[var1_1 / 8][var1_1 % 8].e += 2;
                        if (this.d[var1_1 / 8][var1_1 % 8].ax >= this.d[var1_1 / 8][var1_1 % 8].f) {
                            this.d[var1_1 / 8][var1_1 % 8].ax = this.d[var1_1 / 8][var1_1 % 8].f;
                            this.d[var1_1 / 8][var1_1 % 8].k = false;
                        } else {
                            var3_6 = 1;
                        }
                    }
                    --var1_1;
                }
                if (var3_6 == 0 && this.Q) {
                    if (this.B == GameMidlet.i.w) {
                        if (!this.X) {
                            if (this.aG) {
                                this.v();
                            }
                        } else if (this.t()) {
                            this.ad = this.R;
                            this.ae = this.S;
                        } else {
                            ie.a().i();
                        }
                        this.X = false;
                    }
                    this.Q = false;
                }
            }
            if (this.K != -1) {
                if (this.K % 10 == 0) {
                    var4_7 = this;
                    var1_1 = 4 - var4_7.K / 10;
                    while (var1_1 < 4 + var4_7.K / 10) {
                        var2_5 = 4 - var4_7.K / 10;
                        while (var2_5 < 4 + var4_7.K / 10) {
                            super.b(var4_7.d[var1_1][var2_5].aw + 12, var4_7.d[var1_1][var2_5].ax + 12, var4_7.d[var1_1][var2_5].j);
                            var4_7.d[var1_1][var2_5].j = (short)-1;
                            ++var2_5;
                        }
                        ++var1_1;
                    }
                }
                this.K += 2;
                if (this.K >= 50) {
                    this.w();
                    this.K = -1;
                }
            }
            var3_6 = 0;
            while (var3_6 < this.O.size()) {
                var1_2 = (dn)this.O.elementAt(var3_6);
                if (var1_2.g <= 0) ** GOTO lbl-1000
                ++var1_2.g;
                if (var1_2.g == 3) {
                    this.O.removeElement(var1_2);
                } else if (var1_2.k) {
                    var1_2.aw += var1_2.b;
                    if (var1_2.b > 1 || var1_2.b < -1) {
                        var1_2.b -= var1_2.b / aw.f(var1_2.b);
                    }
                    var1_2.ax += var1_2.e;
                    ++var1_2.e;
                    if (var1_2.az == 1 && var1_2.f < 19) {
                        ++var1_2.f;
                    }
                    if (var1_2.ax + this.f > main.a.n) {
                        this.O.removeElement(var1_2);
                    }
                } else {
                    var2_5 = aw.a(var1_2.n - var1_2.aw, -(var1_2.m - var1_2.ax));
                    if (aw.f(var2_5 - var1_2.e) > 10) {
                        var1_2.e -= var1_2.aA * var1_2.az;
                        var1_2.e = aw.c(var1_2.e);
                    } else {
                        var1_2.e = var2_5;
                        var1_2.i = (byte)(var1_2.i + 2);
                    }
                    if (var1_2.f >= 4) {
                        var1_2.f = 0;
                    }
                    ++var1_2.f;
                    var4_8 = var1_2.i * aw.b(var1_2.e) >> 10;
                    var2_5 = -(var1_2.i * aw.a(var1_2.e)) >> 10;
                    if (aw.a(var1_2.aw, var1_2.ax, var1_2.n, var1_2.m) >= var1_2.i) {
                        var1_2.aw += var4_8;
                        var1_2.ax += var2_5;
                    } else {
                        this.O.removeElement(var1_2);
                    }
                }
                ++var3_6;
            }
            var3_6 = 0;
            while (var3_6 < 2) {
                var1_3 = (hn)kx.m.elementAt(var3_6);
                if (var1_3.Q == -1 && aw.f(var1_3.C - var1_3.aw) < 10) {
                    if (this.N == -2) {
                        this.N = (byte)-1;
                        var1_3.Q = 0;
                        if (var1_3.w == this.b) {
                            var1_3.a((byte)10);
                            var1_3.e(10);
                        } else {
                            var1_3.H = 0;
                            if (this.b != -1) {
                                var1_3.e(9);
                            }
                        }
                        this.c = false;
                        if (var1_3.w == GameMidlet.i.w) {
                            var1_3.K = 0;
                        }
                    } else if (var1_3.Q == -1) {
                        if (var1_3.ad && main.a.l % 6 == 3) {
                            this.c(var1_3.aw, var1_3.ax - var1_3.aA, 0);
                        }
                        if (this.N == -1) {
                            var2_5 = 0;
                            while (var2_5 < 2) {
                                var4_9 = (hn)kx.m.elementAt(var2_5);
                                if (var4_9.w != var1_3.w) {
                                    var4_9.e(20);
                                    var4_9.H = (byte)4;
                                    var4_9.L = true;
                                    var1_3.L = true;
                                }
                                ++var2_5;
                            }
                            this.N = (byte)20;
                            if (this.c) {
                                this.N = (byte)30;
                            }
                        } else if (this.N >= 0) {
                            this.N = (byte)(this.N - 1);
                            if (this.N == -1) {
                                this.N = (byte)-2;
                                var1_3.C = var1_3.w == GameMidlet.i.w ? this.L : this.M;
                            }
                        }
                    }
                }
                if (var1_3.aj > 0) {
                    var2_5 = var1_3.al / 100 + 1;
                    if (var1_3.aj - var2_5 < 0) {
                        var2_5 = var1_3.aj;
                    }
                    var1_3.aj = (short)(var1_3.aj - var2_5);
                    var1_3.ah = (short)(var1_3.ah + var2_5);
                } else if (var1_3.aj < 0) {
                    var2_5 = var1_3.al / 100 + 1;
                    if (var1_3.aj + var2_5 > 0) {
                        var2_5 = -var1_3.aj;
                    }
                    var1_3.ah = (short)(var1_3.ah - var2_5);
                    var1_3.aj = (short)(var1_3.aj + var2_5);
                }
                if (var1_3.ak > 0) {
                    var2_5 = var1_3.al / 100 + 1;
                    if (var1_3.ak - var2_5 < 0) {
                        var2_5 = var1_3.ak;
                    }
                    var1_3.ak = (short)(var1_3.ak - var2_5);
                    var1_3.ai = (short)(var1_3.ai + var2_5);
                } else if (var1_3.ak < 0) {
                    var2_5 = var1_3.al / 100 + 1;
                    if (var1_3.ak + var2_5 > 0) {
                        var2_5 = -var1_3.ak;
                    }
                    var1_3.ai = (short)(var1_3.ai - var2_5);
                    var1_3.ak = (short)(var1_3.ak + var2_5);
                }
                ++var3_6;
            }
            var3_6 = 0;
            while (var3_6 < this.aE.size()) {
                var1_4 = (dn)this.aE.elementAt(var3_6);
                --var1_4.g;
                if (var1_4.g <= 0) {
                    this.aE.removeElement(var1_4);
                }
                ++var3_6;
            }
            return;
        }
        this.q();
    }

    private boolean t() {
        int n2 = 0;
        while (n2 < 8) {
            int n3 = 0;
            while (n3 < 8) {
                int n4 = 0;
                while (n4 < this.ay.length) {
                    if (n2 + this.az[n4][0] >= 0 && n2 + this.az[n4][0] < 8 && n2 + this.az[n4][1] >= 0 && n2 + this.az[n4][1] < 8 && n3 + this.ay[n4][0] >= 0 && n3 + this.ay[n4][0] < 8 && n3 + this.ay[n4][1] >= 0 && n3 + this.ay[n4][1] < 8 && this.d[n2][n3].j == this.d[n2 + this.az[n4][0]][n3 + this.ay[n4][0]].j && this.d[n2][n3].j == this.d[n2 + this.az[n4][1]][n3 + this.ay[n4][1]].j) {
                        return true;
                    }
                    ++n4;
                }
                ++n3;
            }
            ++n2;
        }
        return false;
    }

    private void b(int n2, int n3, int n4) {
        if (n4 == -1) {
            return;
        }
        js js2 = kx.h(this.B);
        if (js2 == null) {
            return;
        }
        int n5 = 0;
        int n6 = 0;
        switch (n4) {
            case 0: {
                this.c(n2 + this.e, n3 + this.f, 0);
                return;
            }
            case 1: {
                n5 = js2.aw;
                n6 = js2.ax - js2.aA / 2;
                if (js2.an <= 0) break;
                n5 = js2.w == GameMidlet.i.w ? this.L - 20 - 7 : this.M + 7 + 20;
                n6 = js2.ax - 22;
                break;
            }
            case 2: {
                n5 = js2.w == GameMidlet.i.w ? this.L - 20 - this.aD + js2.ah * this.aD / js2.al : this.M + (this.aD - js2.ah * this.aD / js2.al) + 20 - js2.ah * this.aD / js2.al;
                n6 = js2.ax - 2 - 10 * gy.Y;
                break;
            }
            case 3: {
                n5 = js2.w == GameMidlet.i.w ? this.L - 20 - this.aD + js2.ai * this.aD / js2.am : this.M + (this.aD - js2.ai * this.aD / js2.am) + 20 - js2.ah * this.aD / js2.al;
                n6 = js2.ax - 5 * gy.Y;
                break;
            }
            case 4: {
                this.c(n2 + this.e, n3 + this.f, 4);
                return;
            }
            case 5: {
                return;
            }
        }
        js2 = new dn(n2 + this.e, n3 + this.f);
        new dn(n2 + this.e, n3 + this.f).g = 1;
        this.O.addElement(js2);
        int n7 = 0;
        while (n7 < (n4 != 1 ? 3 : 1)) {
            int n8;
            dn dn2 = new dn(n2 + this.e, n3 + this.f);
            new dn(n2 + this.e, n3 + this.f).o = (short)n4;
            dn2.f = aw.e(3);
            dn2.b = n8 = aw.a(n5 - n2, -(n6 - n3));
            dn2.az = (byte)aw.b(-1, 1);
            dn2.e = aw.c(dn2.b + dn2.az * 90);
            n8 = 10 * aw.b(dn2.e) >> 10;
            int n9 = -(10 * aw.a(dn2.e)) >> 10;
            dn2.n = (short)n5;
            dn2.m = (short)n6;
            dn2.aw += n8;
            dn2.ax += n9;
            dn2.f = 0;
            dn2.i = (byte)(aw.e(4) + 4);
            dn2.aA = (short)(10 + aw.e(5));
            this.O.addElement(dn2);
            ++n7;
        }
    }

    private void c(int n2, int n3, int n4) {
        if (n4 == -1) {
            return;
        }
        dn dn2 = new dn(n2, n3);
        new dn(n2, n3).g = 1;
        this.O.addElement(dn2);
        int n5 = 0;
        while (n5 < 3) {
            int n6 = aw.b(-1, 1);
            dn dn3 = new dn(n2, n3);
            new dn(n2, n3).k = true;
            dn3.f = aw.e(3);
            dn3.b = n6 * (aw.e(100) / 10);
            dn3.e = -aw.e(100) / 10;
            dn3.i = (byte)n4;
            dn3.az = 1;
            dn3.g = 0;
            this.O.addElement(dn3);
            ++n5;
        }
    }

    private boolean c(int n2) {
        if (this.h == -1 || this.Q) {
            return false;
        }
        int n3 = 0;
        while (n3 < this.aA.length) {
            if (n2 / 8 + this.aB[n3][0] >= 0 && n2 / 8 + this.aB[n3][0] < 8 && n2 / 8 + this.aB[n3][1] >= 0 && n2 / 8 + this.aB[n3][1] < 8 && n2 % 8 + this.aA[n3][0] >= 0 && n2 % 8 + this.aA[n3][0] < 8 && n2 % 8 + this.aA[n3][1] >= 0 && n2 % 8 + this.aA[n3][1] < 8 && this.d[n2 / 8][n2 % 8].j == this.d[n2 / 8 + this.aB[n3][0]][n2 % 8 + this.aA[n3][0]].j && this.d[n2 / 8][n2 % 8].j == this.d[n2 / 8 + this.aB[n3][1]][n2 % 8 + this.aA[n3][1]].j) {
                return true;
            }
            ++n3;
        }
        return false;
    }

    public final void l() {
        int n2;
        int n3;
        super.l();
        if (main.a.g && main.a.a(this.e, this.f, this.g << 3, this.g << 3) && this.h == -1) {
            main.a.g = false;
            this.aC = true;
            n3 = (main.a.h - this.e) / this.g;
            n2 = (main.a.i - this.f) / this.g;
            this.V = (n2 << 3) + n3;
        }
        if (!this.P && !this.Q && this.ad == this.R && this.ad != kx.E && this.aC) {
            if (main.a.e) {
                n3 = main.a.k();
                n2 = main.a.l();
                if (n3 < -this.g / 2) {
                    if (this.V % 8 < 7) {
                        this.h = this.V++;
                        this.aC = false;
                        this.u();
                    }
                } else if (n3 > this.g / 2) {
                    if (this.V % 8 > 0) {
                        this.h = this.V--;
                        this.aC = false;
                        this.u();
                    }
                } else if (n2 < -this.g / 2) {
                    if (this.V / 8 < 7) {
                        this.h = this.V;
                        this.V += 8;
                        this.aC = false;
                        this.u();
                    }
                } else if (n2 > this.g / 2 && this.V >= 8) {
                    this.h = this.V;
                    this.V -= 8;
                    this.aC = false;
                    this.u();
                }
            }
            if (main.a.f) {
                main.a.f = false;
                this.aC = false;
            }
        }
        if (kx.j && this.ad != kx.E) {
            if (main.a.a(2)) {
                if (!this.P && !this.Q) {
                    if (this.V >= 8) {
                        this.V -= 8;
                    }
                    this.u();
                    return;
                }
            } else if (main.a.a(4)) {
                if (!this.P && !this.Q) {
                    if (this.V % 8 > 0) {
                        --this.V;
                    }
                    this.u();
                    return;
                }
            } else if (main.a.a(6)) {
                if (!this.P && !this.Q) {
                    if (this.V % 8 < 7) {
                        ++this.V;
                    }
                    this.u();
                    return;
                }
            } else if (main.a.a(8) && !this.P && !this.Q) {
                if (this.V / 8 < 7) {
                    this.V += 8;
                }
                this.u();
            }
        }
    }

    private void u() {
        if (this.h == -1 || this.Q) {
            return;
        }
        this.ad = kx.E;
        this.ae = null;
        this.P = true;
        this.aC = false;
        dn dn2 = this.d[this.V / 8][this.V % 8];
        dn dn3 = this.d[this.h / 8][this.h % 8];
        int n2 = dn2.aw;
        int n3 = dn2.ax;
        short s2 = dn2.j;
        dn2.aw = dn3.aw;
        dn2.ax = dn3.ax;
        dn2.j = dn3.j;
        dn3.aw = n2;
        dn3.ax = n3;
        dn3.j = s2;
        dn3.az = 1;
        dn2.az = 1;
    }

    private void v() {
        boolean bl2 = false;
        int n2 = 0;
        while (n2 < 64) {
            if (this.d[n2 / 8][n2 % 8].j != -2) {
                int n3 = 0;
                int n4 = n2 + 1;
                while (n4 % 8 < 8 && n4 < 64 && n4 / 8 == n2 / 8) {
                    if (this.d[n2 / 8][n2 % 8].j != this.d[n4 / 8][n4 % 8].j) break;
                    ++n3;
                    ++n4;
                }
                if (n3 > 1) {
                    n4 = n2;
                    while (n4 < n2 + n3 + 1) {
                        this.d[n4 / 8][n4 % 8].l = true;
                        bl2 = true;
                        ++n4;
                    }
                }
                n3 = 0;
                n4 = n2 + 8;
                while (n4 < 64 && n4 % 8 == n2 % 8) {
                    if (this.d[n2 / 8][n2 % 8].j != this.d[n4 / 8][n4 % 8].j) break;
                    ++n3;
                    n4 += 8;
                }
                if (n3 > 1) {
                    n4 = n2;
                    while (n4 < n2 + (n3 + 1 << 3)) {
                        this.d[n4 / 8][n4 % 8].l = true;
                        bl2 = true;
                        n4 += 8;
                    }
                }
            }
            ++n2;
        }
        if (bl2) {
            ie.a().a(this.d);
            return;
        }
        if (this.aF) {
            this.aF = false;
            this.m();
        }
    }

    private void w() {
        int n2 = 0;
        while (n2 < 8) {
            int n3 = 7;
            while (n3 >= 0) {
                if (this.d[((n3 << 3) + n2) / 8][((n3 << 3) + n2) % 8].j == -1) {
                    int n4 = -2;
                    int n5 = 4;
                    int n6 = (n3 << 3) + n2;
                    ek ek2 = this;
                    this.Q = true;
                    int n7 = n6;
                    while (n7 / 8 > 0) {
                        ek2.d[n7 / 8][n7 % 8].j = ek2.d[(n7 - 8) / 8][(n7 - 8) % 8].j;
                        ek2.d[n7 / 8][n7 % 8].f = n7 / 8 * ek2.g;
                        if (!ek2.d[n7 / 8][n7 % 8].k) {
                            ek2.d[n7 / 8][n7 % 8].e = -n5;
                            ++n5;
                            ek2.d[n7 / 8][n7 % 8].k = true;
                        }
                        ek2.d[n7 / 8][n7 % 8].ax = ek2.d[(n7 - 8) / 8][(n7 - 8) % 8].ax;
                        n7 -= 8;
                    }
                    ek2.d[0][n6 % 8].j = (short)-2;
                    ek2.d[0][n6 % 8].f = 0;
                    if (!ek2.d[0][n6 % 8].k) {
                        ek2.d[0][n6 % 8].e = -n5;
                        ++n5;
                        ek2.d[0][n6 % 8].k = true;
                        ek2.d[0][n6 % 8].ax = 0;
                    }
                    ek2.d[0][n6 % 8].ax -= 24;
                    ++n3;
                }
                --n3;
            }
            ++n2;
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        super.a(graphics);
    }

    public final void b(Graphics graphics) {
        super.b(graphics);
        if (kx.j) {
            int n2;
            main.a.c(graphics);
            Graphics graphics2 = graphics;
            Object object = this;
            graphics2.translate(((ek)object).e, ((ek)object).f);
            if (fx.c((short)876).d != -1) {
                n2 = 0;
                while (n2 < ((ek)object).aE.size()) {
                    dn dn2 = (dn)((ek)object).aE.elementAt(n2);
                    int n3 = n2 * 17 - ((ek)object).g / 2 + 8;
                    if (dn2.f != GameMidlet.i.w) {
                        n3 = (((ek)object).g << 3) - n2 * 17 + ((ek)object).g / 2 - 8;
                    }
                    graphics2.drawRegion(fx.c((short)876).a, 0, dn2.j << 4, 16, 16, 0, n3, (((ek)object).g << 3) + ((ek)object).g, 3);
                    main.a.Q.a(graphics2, String.valueOf(dn2.i), n3, (((ek)object).g << 3) + ((ek)object).g - gy.ai / 2, 2);
                    ++n2;
                }
            }
            graphics2.setClip(-((ek)object).g / 2, -((ek)object).g / 2, (((ek)object).g << 3) + ((ek)object).g, (((ek)object).g << 3) + ((ek)object).g);
            if (((ek)object).V >= 0 && ((ek)object).d[((ek)object).V / 8][((ek)object).V % 8] != null && (((kx)object).B != GameMidlet.i.w || main.a.l % 10 != 5)) {
                f f2 = fx.c((short)(main.a.q > 250 ? 878 : 879));
                if (f2.d != -1) {
                    graphics2.drawRegion(f2.a, 0, (((ek)object).h != -1 && main.a.l % 6 < 3 ? 1 : 0) * ((ek)object).g, ((ek)object).g, ((ek)object).g, 0, ((ek)object).d[((ek)object).V / 8][((ek)object).V % 8].aw, ((ek)object).d[((ek)object).V / 8][((ek)object).V % 8].ax, 0);
                }
            }
            f f3 = fx.c((short)(main.a.q > 250 ? 875 : 876));
            if (f3.d != -1) {
                n2 = 0;
                while (n2 < 8) {
                    int n4 = 0;
                    while (n4 < 8) {
                        if (((ek)object).d[n2][n4] != null && ((ek)object).d[n2][n4].j >= 0) {
                            graphics2.drawRegion(f3.a, 0, ((ek)object).d[n2][n4].j * ((ek)object).U, (int)((ek)object).U, (int)((ek)object).U, 0, ((ek)object).d[n2][n4].aw, ((ek)object).d[n2][n4].ax, 0);
                        }
                        ++n4;
                    }
                    ++n2;
                }
            }
            main.a.c(graphics);
            if (main.a.m > 160) {
                this.a_(graphics);
            }
            this.e(graphics);
            main.a.c(graphics);
            object = "";
            if (kx.t != 0L) {
                long l2 = (kx.u - kx.t) / 1000L;
                object = String.valueOf(object) + -l2;
            }
            main.a.O.a(graphics, String.valueOf(object), this.e + (this.g << 3) / 2, this.f + (this.g << 3) + main.a.O.a() + 2, 2);
            this.f(graphics);
            return;
        }
        this.a_(graphics);
    }

    public final void c(Graphics graphics) {
        graphics.setClip(this.e - this.g / 2, this.f - this.g / 2, (this.g << 3) + this.g + 1, (this.g << 3) + this.g + 1);
        int n2 = 0;
        while (n2 < 10) {
            int n3 = 0;
            while (n3 < 10) {
                if (n3 % 2 == n2 % 2) {
                    graphics.setColor(0x4F4F4F);
                } else {
                    graphics.setColor(0x292929);
                }
                graphics.fillRect(this.e - this.g + n2 * this.g, this.f + n3 * this.g - this.g, this.g, this.g);
                ++n3;
            }
            ++n2;
        }
        graphics.setColor(0);
        graphics.drawRect(this.e - this.g / 2, this.f - this.g / 2, (this.g << 3) + this.g, (this.g << 3) + this.g);
        graphics.drawRect(this.e - this.g / 2 + 1, this.f - this.g / 2 + 1, (this.g << 3) + this.g - 2, (this.g << 3) + this.g - 2);
    }

    private void e(Graphics graphics) {
        int n2 = 0;
        int n3 = 0;
        int n4 = 0;
        while (n4 < 2) {
            int n5;
            int n6;
            int n7;
            int n8;
            int n9;
            int n10;
            int n11;
            hn hn2 = (hn)kx.m.elementAt(n4);
            if (this.N != -1 && hn2.Q == -1 && hn2.H == 0) {
                f f2 = fx.c((short)(this.c ? 882 : 881));
                if (f2.d != -1) {
                    graphics.drawRegion(f2.a, 0, 48 * gy.Y * (main.a.l % 6 < 3 ? 0 : 1), 48 * gy.Y, 48 * gy.Y, 0, hn2.aw, hn2.ax - hn2.aA / 2, 3);
                }
            }
            if (hn2.w == GameMidlet.i.w) {
                n11 = this.L;
                n11 -= 10 + 10 * gy.Y + this.aD;
                n2 = 0;
                n10 = 0;
                n9 = 0;
                n3 = 0;
                n8 = -2;
                n7 = 1;
                n6 = this.aD - 7;
                n5 = this.aD - 16 * gy.Y;
                if (main.a.m > 160) {
                    main.a.Q.a(graphics, String.valueOf(hn2.c()) + " " + kf.k(), n11 + this.aD, hn2.ax, 1);
                }
            } else {
                n11 = this.M;
                n11 += 10 + 10 * gy.Y;
                n2 += this.aD - hn2.ah * this.aD / hn2.al;
                n3 += this.aD - hn2.ai * this.aD / hn2.am;
                n9 = this.aD - (hn2.ah + hn2.aj) * this.aD / hn2.al;
                n10 = this.aD - (hn2.ai + hn2.ak) * this.aD / hn2.am;
                n8 = this.aD + 2;
                n6 = 8;
                n7 = 0;
                n5 = 16 * gy.Y;
                if (main.a.m > 160) {
                    main.a.Q.a(graphics, String.valueOf(hn2.c()) + " " + kf.k(), n11, hn2.ax, 0);
                }
            }
            main.a.Q.a(graphics, String.valueOf(hn2.ah), n11 + n8, hn2.ax - (gy.ai << 1) + 3 * gy.Y - gy.ai / 2, n7);
            main.a.Q.a(graphics, String.valueOf(hn2.ai), n11 + n8, hn2.ax - gy.ai + 3 * gy.Y - gy.ai / 2, n7);
            if (hn2.an > 0 && hn2.ag <= 0 || hn2.ag > 0 && main.a.l % 6 < 3) {
                fx.a(graphics, 880, n11 + n6, hn2.ax - gy.ai * 3, 3);
                main.a.Q.a(graphics, String.valueOf(hn2.an), n11 + n5, hn2.ax - gy.ai * 3 - gy.ai / 2, n7);
                if (hn2.ag > 0) {
                    hn2.ag = (byte)(hn2.ag - 1);
                }
            }
            if (hn2.aj != 0 && main.a.l % 6 >= 3) {
                graphics.setColor(0x1D1E1E);
            } else {
                graphics.setColor(0);
            }
            graphics.fillRect(n11, hn2.ax - (gy.ai << 1), this.aD, 6 * gy.Y);
            graphics.fillRect(n11, hn2.ax - gy.ai, this.aD, 6 * gy.Y);
            if (hn2.aj > 0) {
                graphics.setColor(16583178);
                graphics.fillRect(n11 + n9, hn2.ax - 4 - 10 * gy.Y, (hn2.ah + hn2.aj) * this.aD / hn2.al, 6 * gy.Y);
            }
            if (hn2.aj != 0 && main.a.l % 6 >= 3) {
                graphics.setColor(0xFF5959);
            } else {
                graphics.setColor(0xFF0000);
            }
            graphics.fillRect(n11 + n2, hn2.ax - (gy.ai << 1), hn2.ah * this.aD / hn2.al, 6 * gy.Y);
            graphics.setColor(14137273);
            graphics.drawRect(n11, hn2.ax - (gy.ai << 1), this.aD, 6 * gy.Y);
            graphics.drawRect(n11, hn2.ax - gy.ai, this.aD, 6 * gy.Y);
            if (hn2.ak > 0) {
                graphics.setColor(3771903);
                graphics.fillRect(n11 + n10, hn2.ax - gy.ai + 1, (hn2.ai + hn2.ak) * this.aD / hn2.am, 6 * gy.Y - 1);
            }
            if ((hn2.ak != 0 || hn2.ad) && main.a.l % 6 >= 3) {
                graphics.setColor(6799871);
            } else {
                graphics.setColor(299247);
            }
            graphics.fillRect(n11 + n3, hn2.ax - gy.ai + 1, hn2.ai * this.aD / hn2.am, 6 * gy.Y - 1);
            ++n4;
        }
    }

    private void f(Graphics graphics) {
        int n2 = 0;
        while (n2 < this.O.size()) {
            dn dn2 = (dn)this.O.elementAt(n2);
            if (dn2.g > 0) {
                fx.a(graphics, 877, dn2.aw, dn2.ax, 3);
            } else if (dn2.k) {
                this.T.a(dn2.f / 5, dn2.aw, dn2.ax, 0, 3, graphics);
            } else if (dn2.i >= 0) {
                this.T.a(dn2.f / 2 + 1, dn2.aw, dn2.ax, 0, 3, graphics);
            }
            ++n2;
        }
    }

    public final void a(byte[] object, dr[] drArray, byte by2, Vector vector) {
        js js2;
        int n2;
        int n3 = 0;
        while (n3 < ((byte[])object).length) {
            this.d[object[n3] / 8][object[n3] % 8].l = true;
            if (main.a.n > 300) {
                n2 = 0;
                int n4 = 0;
                while (n4 < this.aE.size()) {
                    js2 = (dn)this.aE.elementAt(n4);
                    if (((dn)js2).j == this.d[object[n3] / 8][object[n3] % 8].j) {
                        ((dn)js2).g += 20;
                        n2 = 1;
                        ((dn)js2).i = (byte)(((dn)js2).i + 1);
                        break;
                    }
                    ++n4;
                }
                if (n2 == 0) {
                    dn dn2 = new dn();
                    new dn().j = this.d[object[n3] / 8][object[n3] % 8].j;
                    dn2.g = 40;
                    dn2.i = 1;
                    dn2.f = this.B;
                    this.aE.addElement(dn2);
                }
            }
            ++n3;
        }
        object = this;
        n2 = 0;
        while (n2 < 8) {
            n3 = 0;
            while (n3 < 8) {
                if (((ek)object).d[n2][n3].l) {
                    ((ek)object).d[n2][n3].l = false;
                    super.b(((ek)object).d[n2][n3].aw + 12, ((ek)object).d[n2][n3].ax + 12, ((ek)object).d[n2][n3].j);
                    ((ek)object).d[n2][n3].j = (short)-1;
                }
                ++n3;
            }
            ++n2;
        }
        super.w();
        n3 = 0;
        while (n3 < drArray.length) {
            int n5 = drArray[n3].c;
            this.d[n5 / 8][n5 % 8].j = drArray[n3].d;
            ++n3;
        }
        if (by2 > 1) {
            main.a.a("Combo x" + by2, main.a.o, main.a.p, -1, 1, 20);
        }
        if (vector.size() > 0) {
            n3 = 0;
            while (n3 < vector.size()) {
                main.a.a((String)vector.elementAt(n3), main.a.o, main.a.p + 40, -1, 1, n3 * 30);
                ++n3;
            }
        }
        n3 = 0;
        while (n3 < 2) {
            hn hn2 = (hn)kx.m.elementAt(n3);
            hn2.e(4);
            if (hn2.w != this.B && hn2.af > 0) {
                js2 = kx.h(this.B);
                if (((hn)js2).Q != -1) {
                    ((hn)js2).d(hn2.aw, hn2.ax);
                }
                ((hn)js2).Q = -1;
                if (hn2.an > 0) {
                    hn2.ag = (byte)20;
                }
            }
            ++n3;
        }
        main.a.h();
    }

    public final void a(int n2, int n3, int n4) {
        if (this.W) {
            return;
        }
        hn hn2 = kx.h(n2);
        if (hn2 != null && hn2.H == 4) {
            hn2.H = 0;
        }
        if (n2 == GameMidlet.i.w) {
            this.aF = true;
            this.v();
            this.aG = true;
            return;
        }
        this.ad = kx.E;
        this.ae = null;
        this.h = n3;
        this.V = n4;
        this.u();
        if (n2 == -1) {
            this.P = false;
            this.h = -1;
        }
    }

    public final void b(int n2) {
        if (this.W) {
            return;
        }
        this.h = -1;
        kx.t = System.currentTimeMillis() + (long)(kx.v * 1000);
        this.B = n2;
        this.aG = false;
        if (n2 == GameMidlet.i.w) {
            if (this.t()) {
                this.ae = this.S;
                this.ad = this.R;
                return;
            }
            ie.a().i();
            return;
        }
        this.aF = false;
        this.ad = null;
        this.ae = null;
    }

    public final void a(int n2, byte[][] byArray) {
        this.B = n2;
        if (n2 == GameMidlet.i.w) {
            this.X = true;
        }
        this.b(byArray);
    }

    public final void g() {
        super.g();
        kx.j = false;
        this.W = false;
        gq.a().b();
        this.b = -1;
        int n2 = 0;
        while (n2 < kx.m.size()) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            hn2.k();
            hn2.e(4);
            ++n2;
        }
    }

    public final void a(Vector object) {
        String string = "";
        Vector vector = object;
        object = gq.a();
        gq.a().g = string;
        ((gq)object).f = main.a.K.a(((gq)object).g) + 20 * gy.Y;
        if (((gq)object).f < 50 + 20 * gy.Y) {
            ((gq)object).f = 50 + 20 * gy.Y;
        }
        ((gq)object).a = vector;
        ((gq)object).c = ((gq)object).a.size() * gy.af + (gy.Z << 1) + 10 + je.o;
        ((gq)object).e = 0;
        int n2 = 0;
        while (n2 < ((gq)object).a.size()) {
            string = (String)((gq)object).a.elementAt(n2);
            if (main.a.K.a(string) + 20 > ((gq)object).e) {
                ((gq)object).e = main.a.K.a(string) + 20;
            }
            ++n2;
        }
        if (((gq)object).e < 176) {
            ((gq)object).e = 176;
        }
        if (main.a.m >= 240 && ((gq)object).e < 240 * gy.Y) {
            ((gq)object).e = 240 * gy.Y;
        }
        ((gq)object).d = (main.a.m - ((gq)object).e) / 2;
        ((gq)object).b = main.a.n - main.a.T - ((gq)object).c - 10;
        gq.a().ad = new by(kf.z, -1, this);
        object = this;
        this.ad = kx.C;
        ((gy)object).ae = null;
        ((kx)object).B = -1;
        kx.r();
        this.ac = null;
        this.W = true;
    }

    public final void a(byte[][] byArray) {
        int n2 = 7;
        while (n2 >= 0) {
            int n3 = 7;
            while (n3 >= 0) {
                this.d[n2][n3].j = byArray[n2][n3];
                --n3;
            }
            --n2;
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
import main.a;

public final class ho {
    public int a;
    public int b;
    public int c;
    private int q;
    private int r;
    public int d;
    private int s;
    private int t;
    private int u;
    private int v;
    private int w;
    public int e;
    private int x;
    public int f;
    public int g;
    public int h;
    public static int i;
    public static int j;
    public static int k;
    public static int l;
    private int y;
    public boolean m = false;
    private boolean z = false;
    private long A;
    private long B = 0L;
    private boolean C;
    private int D = 0;
    private int E = 0;
    public int n;
    public int o;
    private int F;
    private int G;
    private int H;
    public boolean p = false;
    private boolean I = false;
    private long J = 0L;
    private long K = 0L;
    private int L;
    private int M;

    public final void a(int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, int n10) {
        this.z = false;
        this.w = n2;
        this.e = n3;
        this.t = n7 / n5;
        this.s = n6 / n4;
        this.x = n10;
        this.u = n4;
        this.v = n5;
        this.q = n6;
        this.r = n9;
        this.d = n8;
        this.y = 0;
        j = 0;
        i = 0;
        this.c = n7 - this.r;
        if (this.c < 0) {
            this.c = 0;
        }
        l = 0;
        k = 0;
        this.h = n6 - this.d;
        if (this.h < 0) {
            this.h = 0;
        }
        this.m = true;
        this.B = 0L;
    }

    public final void a(int n2) {
        this.y = n2;
        this.b();
    }

    public final void a() {
        ++this.B;
        this.C = false;
        if (main.a.b[8]) {
            this.y += this.s;
            if (this.y >= this.x) {
                this.y = 0;
            }
        } else if (main.a.b[2]) {
            this.y -= this.s;
            if (this.y < 0) {
                this.y = this.x - 1;
            }
        } else if (main.a.b[6]) {
            ++this.y;
            if (this.y >= this.x) {
                this.y = 0;
            }
        } else if (main.a.b[4]) {
            --this.y;
            if (this.y < 0) {
                this.y = this.x - 1;
            }
        }
        if (main.a.b[4] || main.a.b[6] || main.a.b[8] || main.a.b[2]) {
            this.C = true;
            main.a.r.a(this.y, false);
            main.a.b[4] = false;
            main.a.b[6] = false;
            main.a.b[8] = false;
            main.a.b[2] = false;
        }
        if (this.C) {
            this.b();
        }
        if (main.a.t != null || main.a.v != null) {
            return;
        }
        if (this.H > 0) {
            --this.H;
            if (this.H == 0 && main.a.r != dp.a) {
                main.a.r.a(this.y, true);
            }
            return;
        }
        if (main.a.g && main.a.a(this.w, this.e, this.q, this.r)) {
            this.M = main.a.k;
            this.L = main.a.j;
            main.a.g = false;
            this.A = this.B;
            this.D = i;
            this.E = k;
            this.p = true;
            this.n = 0;
            this.o = 0;
        }
        if (this.p) {
            long l2 = this.B - this.A;
            int n2 = this.M - main.a.i;
            this.M = main.a.i;
            int n3 = this.L - main.a.h;
            this.L = main.a.h;
            if (main.a.e) {
                if (this.B % 2L == 0L) {
                    this.F = main.a.i;
                    this.G = main.a.h;
                    this.J = this.B;
                    this.K = this.B;
                }
                this.n = 0;
                this.o = 0;
                if (j <= 0 || j >= this.c) {
                    j = this.D + main.a.l() / 2;
                } else {
                    this.D = j = this.D + n2;
                }
                if (l <= 0 || l >= this.h) {
                    l = this.E + main.a.k() / 2;
                } else {
                    this.E = l = this.E + n3;
                }
                i = j;
                k = l;
                if (l2 < 20L) {
                    n2 = (j + main.a.i - this.e) / this.v;
                    n3 = (l + main.a.h - this.w) / this.u;
                    this.y = n2 * this.s + n3;
                    if (this.y < 0) {
                        this.y = 0;
                    }
                    if (this.y >= this.t * this.s) {
                        this.y = this.t * this.s - 1;
                    }
                    main.a.r.a(this.y, false);
                }
                if (aw.f(main.a.l()) >= 10 * gy.Y || aw.f(main.a.k()) >= 10 * gy.Y) {
                    main.a.r.a(true);
                } else if (l2 > 3L && l2 < 8L) {
                    this.I = false;
                    main.a.r.a(false);
                }
            }
            if (main.a.f) {
                this.p = false;
                n2 = (int)(this.B - this.J);
                n3 = this.F - main.a.i;
                int n4 = this.G - main.a.h;
                if (aw.f(n3) > 40 && n2 < 20 && j > 0 && j < this.c) {
                    this.n = n3 / n2 * 10;
                }
                n2 = (int)(this.B - this.K);
                if (aw.f(n4) > 40 && n2 < 20 && l > 0 && l < this.h) {
                    this.o = n4 / n2 * 10;
                }
                this.J = -1L;
                this.K = -1L;
                if (aw.f(main.a.l()) < 10 * gy.Y && aw.f(main.a.k()) < 10 * gy.Y) {
                    if (l2 <= 4L) {
                        this.H = 5;
                        main.a.r.a(false);
                    } else {
                        main.a.r.a(this.y, true);
                        if (main.a.r != dp.a) {
                            main.a.r.a(true);
                        }
                    }
                    this.I = false;
                }
                main.a.f = false;
            }
        }
    }

    private void b() {
        if (!main.a.e) {
            j = this.y / this.s * this.v - this.r / 2 + this.v / 2;
            if (j < 0) {
                j = 0;
            }
            if (j > this.c) {
                j = this.c;
            }
            if (this.y / this.s > this.t - 1 || this.y / this.s == 0) {
                i = j;
            }
            if ((l = this.y % this.s * this.u - this.d / 2 + this.u / 2) < 0) {
                l = 0;
            }
            if (l > this.h) {
                l = this.h;
            }
            if (this.y % this.s > this.s - 1 || this.y % this.s == 0) {
                k = l;
            }
        }
    }
}


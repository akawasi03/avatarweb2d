/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class le
extends kr {
    private static le i;
    private Vector j;
    private int k;
    private int l;
    public int a;
    public int b;
    public int c;
    public int d;
    private int m;
    public int e;
    public static ht f;
    private boolean n = false;
    private int o;
    private int p;
    private int q;
    private int r;
    private int s;
    private int t;
    private int u = 0;
    private static by v;
    public static ii g;
    public static short[] h;
    private int w;
    private int x;
    private int y = 0;
    private int z;
    private boolean A = false;
    private long B;
    private long C;
    private long D;

    public static le a() {
        if (i == null) {
            i = new le();
            return i;
        }
        return i;
    }

    public le() {
        this.c();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.d();
                return;
            }
            case 1: {
                this.n = false;
                main.a.t = null;
                if (g == null) break;
                g.a();
            }
        }
    }

    public final void c() {
        if (main.a.Z == 0) {
            this.ac = new by(kf.O, 0);
        }
        this.ae = new by(kf.d, 1);
    }

    public final void a(Vector object, int n2, int n3, int n4) {
        if (((Vector)object).size() == 0) {
            return;
        }
        if (main.a.Z > 0) {
            this.aj = true;
        }
        this.u = ((Vector)object).size();
        this.t = main.a.n;
        this.n = true;
        this.c = this.u * n3 + (gy.Z << 1) + 4;
        if (this.c > main.a.m) {
            this.c = main.a.m;
        }
        this.a = n2 - this.c / 2;
        this.d = n4 + (gy.Z << 1) + 4;
        if (this.a < 0) {
            this.a = 0;
        }
        this.m = this.b = main.a.q - main.a.T - this.d - (gy.Z << 1);
        this.e = n4;
        this.j = object;
        this.b();
        this.s = this.u * this.e - (this.c - (gy.Z << 1) - 4);
        if (this.s < 0) {
            this.s = 0;
        }
        this.x = this.c;
        v = null;
        g = null;
        h = null;
        object = this;
        main.a.t = object;
    }

    private void b() {
        if (this.k < 0) {
            this.k = 0;
        }
        if (this.k >= this.u) {
            this.k = 0;
        }
    }

    public final void a(Vector vector, int n2) {
        if (vector.size() == 0) {
            return;
        }
        if (main.a.Z > 0) {
            this.aj = true;
        }
        this.e = hj.av;
        h = null;
        this.t = main.a.n;
        this.l = 0;
        this.j = vector;
        this.u = this.j.size();
        this.d = 0;
        this.c = 0;
        int n3 = 0;
        while (n3 < this.u) {
            by by2 = (by)this.j.elementAt(n3);
            int n4 = main.a.K.a(by2.a) + 20;
            if (n4 > this.c) {
                this.c = n4;
            }
            this.d += this.e;
            ++n3;
        }
        if (this.c < main.a.m / 3) {
            this.c = main.a.m / 3;
        }
        if (this.c > main.a.m - 4) {
            this.c = main.a.m - 4;
        }
        this.d += 4;
        this.a = n2 == 0 ? 2 * (main.a.Z != 0 ? 2 : 1) : (n2 == 1 ? main.a.m - this.c - 2 : (main.a.m >> 1) - (this.c >> 1));
        if (this.u > 5) {
            this.d = hj.av * 5 + 4;
        }
        this.b = main.a.n - this.d - gy.Z - main.a.T;
        if (jy.b) {
            this.b = main.a.q - main.a.T - this.d - 5;
        }
        if (main.a.n < 200) {
            this.b += 10;
        }
        this.m = main.a.n - this.e;
        if (main.a.Z > 0) {
            this.b = main.a.q - this.d - gy.Z - 3;
            if (main.a.Z == 1) {
                this.b -= 7;
            }
            this.ac = null;
        }
        this.n = false;
        this.k = 0;
        this.s = (this.u - 5) * this.e;
        if (this.s < 0) {
            this.s = 0;
        }
        this.o = 0;
        this.p = 0;
        v = null;
        if (main.a.E) {
            main.a.g();
        }
        g = null;
        this.x = this.d;
        le le2 = this;
        main.a.t = le2;
    }

    private void d() {
        this.n = false;
        main.a.t = null;
        by by2 = (by)this.j.elementAt(this.k);
        if (by2.d != null) {
            by2.d.a(by2.c);
            return;
        }
        if (by2.b != null) {
            by2.b.a();
            return;
        }
        main.a.r.d(by2.c, by2.e);
    }

    public final void l() {
        super.l();
        le le2 = this;
        ++le2.C;
        boolean bl2 = false;
        if (main.a.a(2) || main.a.a(4)) {
            bl2 = true;
            --le2.k;
            if (le2.k < 0) {
                le2.k = le2.u - 1;
            }
            le2.aj = false;
        } else if (main.a.a(8) || main.a.a(6)) {
            bl2 = true;
            ++le2.k;
            if (le2.k > le2.u - 1) {
                le2.k = 0;
            }
            le2.aj = false;
        }
        if (main.a.g && main.a.b(le2.a - 2, le2.m - 7, le2.c + 4, le2.d + 15)) {
            main.a.g = false;
            le2.y = le2.p;
            le2.B = System.currentTimeMillis() / 10L;
            le2.A = true;
        }
        if (le2.A) {
            int n2;
            int n3;
            int n4 = main.a.l();
            if (le2.n) {
                n4 = main.a.k();
            }
            long l2 = System.currentTimeMillis() / 10L - le2.B;
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    le2.z = main.a.i;
                    le2.D = le2.C;
                }
                le2.w = 0;
                if (Math.abs(n4) < 20 * gy.Y) {
                    n3 = le2.m;
                    n2 = (le2.o + main.a.i - n3) / le2.e;
                    if (le2.n) {
                        n3 = le2.a;
                        n2 = (le2.o + main.a.h - n3) / le2.e;
                    }
                    le2.k = n2;
                    le2.b();
                }
                if (aw.f(n4) >= 20 * gy.Y) {
                    le2.aj = true;
                } else if (l2 > 10L && l2 < 20L) {
                    le2.aj = false;
                }
                le2.o = le2.y + n4;
                if (le2.o < 0 || le2.o > le2.s) {
                    le2.o = le2.y + n4 / 3;
                }
                le2.p = le2.o;
            }
            if (main.a.f && main.a.b(le2.a - 2, le2.m - 7, le2.c + 4, le2.d + 15)) {
                n3 = (int)(le2.C - le2.D);
                n2 = le2.z - main.a.i;
                if (aw.f(n2) > 40 && n3 < 10 && le2.o > 0 && le2.o < le2.s) {
                    le2.w = n2 / n3 * 10;
                }
                le2.D = -1L;
                if (Math.abs(n4) < 20 * gy.Y) {
                    if (l2 <= 10L) {
                        le2.aj = false;
                    }
                    if (!le2.aj) {
                        n4 = le2.m;
                        n4 = (le2.o + main.a.i - n4) / le2.e;
                        if (le2.n) {
                            n4 = le2.a;
                            n4 = (le2.o + main.a.h - n4) / le2.e;
                        }
                        le2.k = n4;
                        le2.b();
                        le2.d();
                    }
                }
                main.a.f = false;
            }
        }
        if (main.a.f) {
            if (!le2.A) {
                le2.n = false;
                main.a.t = null;
                if (g != null) {
                    g.a();
                }
            }
            le2.A = false;
            main.a.f = false;
        }
        if (bl2) {
            le2.o = le2.k * le2.e - le2.c / 2 + le2.e / 2;
            if (le2.o > le2.s) {
                le2.o = le2.s;
                return;
            }
            if (le2.o < 0) {
                le2.o = 0;
            }
        }
    }

    public final void a(Graphics graphics) {
        graphics.translate(0, this.t);
        if (this.n) {
            int n2;
            Graphics graphics2 = graphics;
            le le2 = this;
            main.a.c(graphics2);
            main.a.S.a(graphics2, le2.a, le2.b, le2.c, le2.d);
            graphics2.translate(le2.a + gy.Z + 2, le2.b + gy.Z + 2);
            graphics2.setClip(0, 0, le2.c - (gy.Z << 1) - 4, le2.e);
            graphics2.translate(-le2.p, 0);
            int n3 = le2.p / le2.e;
            if (n3 < 0) {
                n3 = 0;
            }
            if ((n2 = n3 + le2.c / le2.e + 2) > le2.u) {
                n2 = le2.u;
            }
            if (!le2.aj) {
                je.a(graphics2, le2.k * le2.e, 0, le2.e, le2.e);
            }
            int n4 = n3;
            while (n4 < n2) {
                by by2 = (by)le2.j.elementAt(n4);
                by2.a(graphics2, n4 * le2.e + le2.e / 2, le2.e / 2);
                ++n4;
            }
            if (le2.k >= 0 && le2.k < le2.j.size()) {
                by by3 = (by)le2.j.elementAt(le2.k);
                graphics2.setClip(le2.p - 50, -100, le2.p + main.a.m + 100, le2.d + 200);
                int n5 = le2.k * le2.e + le2.e / 2;
                if (le2.u * le2.e + (gy.Z << 1) + 10 > main.a.m) {
                    int n6 = main.a.L.a(by3.a) / 2;
                    if (n5 - n6 < le2.p) {
                        n5 = le2.p + n6;
                    } else if (n5 + n6 > main.a.m + le2.p - 15) {
                        n5 = main.a.m + le2.p - n6 - 15;
                    }
                }
                main.a.L.a(graphics2, by3.a, n5, -gy.ag - gy.Z - 6 - (gy.Y == 2 ? 15 : 0), 2);
            }
            main.a.c(graphics2);
        } else {
            Graphics graphics3 = graphics;
            le le3 = this;
            if (le3.u != 0) {
                graphics3.translate(-graphics3.getTranslateX(), -graphics3.getTranslateY());
                Graphics graphics4 = graphics3;
                le le4 = le3;
                main.a.c(graphics4);
                if (jy.b) {
                    main.a.S.e(graphics4, le4.a - 2, le4.m - 7, le4.c + 4, le4.d + 15);
                } else {
                    main.a.S.a(graphics4, le4.a - 2, le4.m - 7, le4.c + 4, le4.d + 15);
                }
                graphics4.setClip(le4.a, le4.m, le4.c, le4.d);
                graphics4.translate(le4.a + 3, le4.m + 1);
                graphics4.translate(0, -le4.p);
                int n7 = (le4.e - gy.ah) / 2;
                int n8 = 0;
                while (n8 < le4.u) {
                    graphics4.setColor(0);
                    if (!le4.aj && n8 == le4.k) {
                        if (jy.b) {
                            graphics4.setColor(35217);
                            graphics4.fillRect(0, n8 * le4.e, le4.c - 6, le4.e);
                        } else {
                            main.a.S.b(graphics4, 0, n8 * le4.e, le4.c - 6, le4.e);
                        }
                    }
                    int n9 = 0;
                    if (h != null && n8 < h.length && h[n8] != -1 && fx.c(h[n8]) != null) {
                        n9 = fx.c((short)le.h[n8]).b;
                        fx.a(graphics4, h[n8], 3, n8 * le4.e + n7 + 1, 0);
                    }
                    if (jy.b) {
                        main.a.L.a(graphics4, ((by)le4.j.elementAt((int)n8)).a, n9 + 5, n8 * le4.e + n7, 0);
                    } else {
                        main.a.S.a(graphics4, ((by)le4.j.elementAt((int)n8)).a, n9 + 5, n8 * le4.e + n7, 0);
                    }
                    ++n8;
                }
            }
        }
        super.a(graphics);
    }

    public final void k() {
        if (this.t != 0) {
            this.t += -this.t >> 1;
        }
        if (this.t == -1) {
            this.t = 0;
        }
        le le2 = this;
        if (le2.w != 0) {
            if (le2.p < 0 || le2.p > le2.s) {
                le2.w -= le2.w / 4;
                le2.p += le2.w / 20;
                if (le2.w / 10 <= 1) {
                    le2.w = 0;
                }
            }
            if (le2.p < 0) {
                if (le2.p < -le2.x / 2) {
                    le2.p = -le2.x / 2;
                    le2.o = 0;
                    le2.w = 0;
                }
            } else if (le2.p > le2.s) {
                if (le2.p < le2.s + le2.x / 2) {
                    le2.p = le2.s + le2.x / 2;
                    le2.o = le2.s;
                    le2.w = 0;
                }
            } else {
                le2.p += le2.w / 10;
            }
            le2.o = le2.p;
            le2.w -= le2.w / 10;
            if (le2.w / 10 == 0) {
                le2.w = 0;
            }
        } else if (le2.p < 0) {
            le2.o = 0;
        } else if (le2.p > le2.s) {
            le2.o = le2.s;
        }
        if (le2.p != le2.o) {
            le2.r = le2.o - le2.p << 2;
            le2.q += le2.r;
            le2.p += le2.q >> 4;
            le2.q &= 0xF;
        }
        le2 = this;
        if (le2.m > le2.b) {
            int n2 = le2.m - le2.b >> 2;
            if (n2 <= 0) {
                n2 = 1;
            }
            le2.m -= n2;
        }
        le2.m = le2.b;
    }
}


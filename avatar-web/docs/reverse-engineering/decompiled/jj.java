/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class jj
extends gs {
    private Vector c;
    private String d = "";
    private Vector e = new Vector();
    private int f = 0;
    private int g;
    private int h;
    private int i;
    private int j;
    public boolean a = false;
    private int k = 0;
    private int l = 0;
    private int m = gy.af;
    private int n;
    private int o = 0;
    private int p = 0;
    private int q;
    public static ht b;
    private long r = -1L;
    private long s;
    private long t;
    private int u = 0;

    public final void a(String object, by by2, Vector vector) {
        if (im.c) {
            im.d().a();
        }
        this.q = hj.av;
        this.a = false;
        this.d = object;
        this.ad = by2;
        this.f = 0;
        this.e = vector;
        if (vector != null) {
            this.ad = object = (by)vector.elementAt(this.f);
            if (object != null) {
                this.ad.b = ((by)object).b;
                this.ad.c = ((by)object).c;
                this.ad.d = ((by)object).d;
            }
            this.u = 0;
            int n2 = 0;
            while (n2 < vector.size()) {
                by2 = (by)vector.elementAt(n2);
                if (main.a.K.a(by2.a) > this.u) {
                    this.u = main.a.K.a(by2.a) + (main.a.H ? this.g / 3 : 0);
                }
                ++n2;
            }
        } else {
            this.t = System.currentTimeMillis() / 100L;
        }
        this.l = 0;
        if (this.e != null) {
            this.l = this.e.size();
        }
        this.k = 0;
        this.r = -1L;
        this.a();
        main.a.v = main.a.s;
    }

    public final void a() {
        this.g = main.a.m - 80;
        if (main.a.m < 200) {
            this.g = main.a.m - 40;
            if (main.a.m <= 128) {
                this.g = main.a.m - 10;
            }
        }
        if (this.d.equals(kf.b)) {
            this.g = main.a.o;
        }
        this.c = main.a.M.b(this.d, this.g - 16);
        this.h = this.c.size() * this.m + 20;
        this.n = 0;
        if (this.ad != null) {
            this.h += this.q + 15 * gy.Y;
            this.n += this.q + 15 * gy.Y;
        }
        if (this.h < this.q * 3 + (gy.Y - 1) * 15) {
            this.h = this.q * 3 + (gy.Y - 1) * 15;
        }
        this.i = main.a.o - this.g / 2;
        this.j = main.a.q - main.a.T - this.h - 10;
    }

    public final void a(boolean n2) {
        this.a = n2;
        this.h = this.c.size() * this.m + 20;
        if (this.a) {
            this.h += 25 * gy.Y + 4;
            this.n += 25 * gy.Y + 4;
        }
        if (this.h < (n2 = this.q * 3 + (gy.Y - 1) * 15)) {
            this.h = n2;
        }
        this.j = main.a.q - main.a.T - this.h - 10;
        this.s = main.a.j();
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        if (System.currentTimeMillis() / 100L - this.t < 5L) {
            return;
        }
        main.a.S.a(graphics, this.i, this.j, this.g, this.h, je.d[0], je.d[1], 0);
        if (this.ad != null) {
            je.a(this.i + 1, this.j + this.h - (this.q + 15 * gy.Y - 4), this.g - 2, this.q, 15530985, graphics);
        }
        if (this.a) {
            b.a(this.k, this.i + this.g / 2, this.j + 4 + (this.h - this.n) / 2 + this.c.size() * gy.af / 2 + (this.h - (4 + (this.h - this.n) / 2 + this.c.size() * gy.af / 2)) / 2, 0, 3, graphics);
        }
        if (this.l > 0) {
            by by2 = (by)this.e.elementAt(this.f);
            main.a.K.a(graphics, by2.a, main.a.o, this.j + this.h - (this.q + 15 * gy.Y - 4) + this.q / 2 - gy.ah / 2, 2);
            if (this.l > 1) {
                main.a.S.b(graphics, main.a.o - this.u / 2 - 11, (main.a.Z != 2 ? gy.ah / 2 : 0) + this.j + this.h - (this.q + 15 * gy.Y - 4) + hj.av / 2 + 1 + (main.a.Z == 1 ? -7 : 0) + (main.a.Z == 0 ? -3 : 0), 17 + this.u, this.o / 3, this.p / 3);
            }
        } else if (this.ad != null) {
            main.a.K.a(graphics, this.ad.a, main.a.o, this.j + this.h - (this.q + 15 * gy.Y - 4) + this.q / 2 - gy.ah / 2, 2);
        }
        int n2 = 0;
        while (n2 < this.c.size()) {
            main.a.M.a(graphics, (String)this.c.elementAt(n2), main.a.o, this.j + 4 + (this.h - this.n) / 2 - this.c.size() * gy.af / 2 + n2 * gy.af, 2);
            ++n2;
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case -2: {
                ae.b().v();
                return;
            }
            case -1: {
                this.a = false;
                main.a.v = null;
                return;
            }
        }
        main.a.r.a(n2, n3);
    }

    private void b(int n2) {
        if (this.l > 0) {
            by by2;
            this.f += n2;
            if (this.f < 0) {
                this.f = this.l - 1;
            }
            if (this.f >= this.l) {
                this.f = 0;
            }
            this.ad = by2 = (by)this.e.elementAt(this.f);
        }
    }

    public final void l() {
        block19: {
            block21: {
                int n2;
                block20: {
                    if (this.a) {
                        ++this.k;
                        if (this.k >= 8) {
                            this.k = 0;
                        }
                        if ((long)main.a.j() - this.s > 30L) {
                            String string = "";
                            int n3 = 0;
                            while (n3 < this.c.size()) {
                                string = String.valueOf(string) + (String)this.c.elementAt(n3) + " ";
                                ++n3;
                            }
                            main.a.b(string, -2, null);
                        }
                    }
                    if (this.r != -1L && System.currentTimeMillis() / 100L - this.r > 0L) {
                        main.a.b[5] = true;
                    }
                    if (this.o > 0) {
                        --this.o;
                    }
                    if (this.p > 0) {
                        --this.p;
                    }
                    if (main.a.a(4)) {
                        this.b(-1);
                        this.o = 5;
                    } else if (main.a.a(6)) {
                        this.b(1);
                        this.p = 5;
                    }
                    if (!main.a.f) break block19;
                    n2 = 0;
                    if (this.e != null && this.e.size() > 0) {
                        by by2 = (by)this.e.elementAt(this.f);
                        n2 = main.a.K.a(by2.a) + 20;
                    } else if (this.ad != null) {
                        n2 = main.a.K.a(this.ad.a) + 20;
                    }
                    if (this.ad == null || !main.a.a(main.a.o - (n2 *= gy.Y) / 2, this.j + this.h - (this.q + 18 * gy.Y - 4), n2, this.q)) break block20;
                    main.a.h();
                    this.a(this.ad);
                    break block21;
                }
                if (!main.a.a(this.i + 1, this.j + this.h - (this.q + 18 * gy.Y - 4), this.g - 2, this.q)) break block19;
                int n4 = main.a.o - main.a.h;
                if (n4 > n2 / 2) {
                    this.b(-1);
                    this.o = 5;
                } else if (n4 < -n2 / 2) {
                    this.b(1);
                    this.p = 5;
                }
            }
            main.a.f = false;
        }
        super.l();
    }
}


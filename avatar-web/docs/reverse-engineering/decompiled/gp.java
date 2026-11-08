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
import main.a;

public final class gp
extends kr {
    private static gp b;
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private int h;
    private int i;
    private int j;
    private int k;
    private int l;
    private int m;
    public static ht a;
    private Vector n = new Vector();
    private String o;
    private String[] p;
    private boolean[] q;
    private int r = 0;
    private int s;
    private int t;
    private int u;
    private boolean v = false;
    private boolean w = false;
    private long x;
    private long y;
    private long z;
    private int A;
    private int B;
    private int C;
    private int D;
    private int E;
    private int F;

    static {
        try {
            a = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/race/popup/tile0.png")), 20 * gy.Y, 20 * gy.Y);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
    }

    public static gp a() {
        if (b == null) {
            b = new gp();
            return b;
        }
        return b;
    }

    public gp() {
        this.f = 200 * gy.Y;
        this.g = 190 * gy.Y;
        this.d = (main.a.m - this.f) / 2;
        this.e = (main.a.n - this.g) / 2;
        this.i = 70 * gy.Y;
        this.j = 120 * gy.Y;
        this.h = this.f - this.j - 12 * gy.Y;
        this.l = 30 * gy.Y;
        this.k = this.l * 3 + 20 * gy.Y;
        this.ad = new by(kf.O, 0, this);
        this.ae = new by(kf.d, 1, this);
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                this.b();
                return;
            }
            case 1: {
                main.a.t = null;
            }
        }
    }

    public final void a(Vector object, int n2, String string, String string2, boolean[] blArray) {
        this.n = object;
        this.q = blArray;
        this.c = n2;
        this.F = ((Vector)object).size() * this.l - (this.k - 20 * gy.Y);
        if (this.F < 0) {
            this.F = 0;
        }
        this.o = string;
        this.p = main.a.M.a(string2, this.f - 50 * gy.Y);
        object = this;
        main.a.t = object;
    }

    public final void k() {
        if (this.t > 0) {
            --this.t;
            if (this.t == 0) {
                this.b();
            }
        }
        gp gp2 = this;
        if (gp2.A != 0) {
            if (gp2.C < 0 || gp2.C > gp2.F) {
                gp2.A -= gp2.A / 4;
                gp2.C += gp2.A / 20;
                if (gp2.A / 10 <= 1) {
                    gp2.A = 0;
                }
            }
            if (gp2.C < 0) {
                if (gp2.C < -gp2.k / 2) {
                    gp2.C = -gp2.k / 2;
                    gp2.B = 0;
                    gp2.A = 0;
                }
            } else if (gp2.C > gp2.F) {
                if (gp2.C < gp2.F + gp2.k / 2) {
                    gp2.C = gp2.F + gp2.k / 2;
                    gp2.B = gp2.F;
                    gp2.A = 0;
                }
            } else {
                gp2.C += gp2.A / 10;
            }
            gp2.B = gp2.C;
            gp2.A -= gp2.A / 10;
            if (gp2.A / 10 == 0) {
                gp2.A = 0;
            }
        } else if (gp2.C < 0) {
            gp2.B = 0;
        } else if (gp2.C > gp2.F) {
            gp2.B = gp2.F;
        }
        if (gp2.C != gp2.B) {
            gp2.E = gp2.B - gp2.C << 2;
            gp2.D += gp2.E;
            gp2.C += gp2.D >> 4;
            gp2.D &= 0xF;
        }
    }

    public final void l() {
        super.l();
        ++this.y;
        boolean bl2 = false;
        if (main.a.a(2)) {
            --this.m;
            if (this.m < 0) {
                this.m = this.n.size() - 1;
            }
            bl2 = true;
        } else if (main.a.a(8)) {
            ++this.m;
            if (this.m >= this.n.size()) {
                this.m = 0;
            }
            bl2 = true;
        }
        if (main.a.g) {
            this.u = main.a.k;
            this.w = false;
            if (main.a.b(this.d + this.h, this.e + this.i, this.j, this.k)) {
                if (this.A != 0) {
                    this.w = true;
                }
                main.a.g = false;
                this.r = this.B;
                this.x = this.y;
                this.v = true;
            }
        }
        if (this.v) {
            int n2;
            int n3;
            int n4 = this.u - main.a.i;
            this.u = main.a.i;
            long l2 = this.y - this.x;
            if (main.a.e) {
                if (this.y % 2L == 0L) {
                    this.s = main.a.i;
                    this.z = this.y;
                }
                this.A = 0;
                if (Math.abs(n4) < 10 * gy.Y) {
                    n3 = this.e + this.i + 10 * gy.Y;
                    n2 = this.l;
                    if ((n3 = (this.B + main.a.i - n3) / n2) >= 0 && n3 < this.n.size()) {
                        this.m = n3;
                    }
                }
                if (aw.f(main.a.l()) >= 10 * gy.Y) {
                    this.aj = true;
                } else if (l2 > 3L && l2 < 8L) {
                    n3 = this.e + this.i + 10 * gy.Y;
                    n2 = this.l;
                    if ((n3 = (this.B + main.a.i - n3) / n2) >= 0 && n3 < this.n.size() && !this.w) {
                        this.aj = false;
                    }
                }
                if (this.B < 0 || this.B > this.F) {
                    this.r = this.B = this.r + n4 / 2;
                }
                this.C = this.B;
            }
            if (main.a.f && main.a.b(this.d, this.e, this.f, this.g)) {
                this.w = false;
                n3 = (int)(this.y - this.z);
                n2 = this.s - main.a.i;
                if (aw.f(n2) > 40 && n3 < 10 && this.B > 0 && this.B < this.F) {
                    this.A = n2 / n3 * 10;
                }
                this.z = -1L;
                if (Math.abs(n4) < 10 * gy.Y) {
                    if (l2 <= 4L) {
                        this.aj = false;
                        this.t = 5;
                    } else if (!this.aj) {
                        this.b();
                    }
                }
                this.v = false;
                main.a.f = false;
            }
        } else if (main.a.f && !main.a.b(this.d, this.e, this.f, this.g)) {
            main.a.f = false;
            main.a.t = null;
        }
        if (bl2) {
            this.B = this.m * this.l - this.k / 2 + this.l / 2;
            if (this.B > this.F) {
                this.B = this.F;
                return;
            }
            if (this.B < 0) {
                this.B = 0;
            }
        }
    }

    private void b() {
        if (!this.q[this.m]) {
            main.a.t = null;
        } else {
            main.a.i();
        }
        by by2 = (by)this.n.elementAt(this.m);
        by2.b();
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        main.a.S.a(graphics, this.d, this.e, this.f, this.g, 0);
        graphics.translate(this.d, this.e);
        graphics.setColor(695195);
        graphics.fillRect(12 * gy.Y, 12 * gy.Y, this.f - 24 * gy.Y, 50 * gy.Y);
        graphics.setColor(12648440);
        graphics.fillRect(15 * gy.Y, 15 * gy.Y, this.f - 30 * gy.Y, 44 * gy.Y);
        int n2 = 0;
        while (n2 < this.p.length) {
            main.a.N.a(graphics, this.p[n2], 20 * gy.Y, 12 * gy.Y + 25 * gy.Y - this.p.length * gy.af / 2 + n2 * gy.af, 0);
            ++n2;
        }
        hn hn2 = ir.g(this.c);
        main.a.K.a(graphics, this.o, this.h / 2, this.i + this.k / 2 - gy.ah - 20 * gy.Y, 2);
        hn2.a(graphics, this.h / 2, this.i + this.k / 2 + hn2.aA, true);
        int n3 = 0x43C4C3;
        ht ht2 = a;
        int n4 = this.k;
        int n5 = this.j;
        int n6 = this.i;
        int n7 = this.h;
        Graphics graphics2 = graphics;
        ht2.a(0, n7, n6, 0, graphics2);
        ht2.a(2, n7 + n5 - ht2.a, n6, 0, graphics2);
        ht2.a(5, n7, n6 + n4 - ht2.b, 0, graphics2);
        ht2.a(7, n7 + n5 - ht2.a, n6 + n4 - ht2.b, 0, graphics2);
        int n8 = 0;
        while (n8 < (n5 - (ht2.a << 1)) / ht2.a) {
            ht2.a(1, n7 + (n8 + 1) * ht2.a, n6, 0, graphics2);
            ht2.a(6, n7 + (n8 + 1) * ht2.a, n6 + n4 - ht2.b, 0, graphics2);
            ++n8;
        }
        ht2.a(1, n7 + n5 - (ht2.a << 1), n6, 0, graphics2);
        ht2.a(6, n7 + n5 - (ht2.a << 1), n6 + n4 - ht2.b, 0, graphics2);
        n8 = 0;
        while (n8 < (n4 - (ht2.b << 1)) / ht2.b) {
            ht2.a(3, n7, n6 + (n8 + 1) * ht2.b, 0, graphics2);
            ht2.a(4, n7 + n5 - ht2.a, n6 + (n8 + 1) * ht2.b, 0, graphics2);
            ++n8;
        }
        ht2.a(3, n7, n6 + n4 - (ht2.b << 1), 0, graphics2);
        ht2.a(4, n7 + n5 - ht2.a, n6 + n4 - (ht2.b << 1), 0, graphics2);
        graphics2.setColor(0x43C4C3);
        graphics2.fillRect(n7 + ht2.a, n6 + ht2.b, n5 - (ht2.a << 1), n4 - (ht2.b << 1));
        graphics.translate(this.h, this.i);
        graphics.setClip(0, 0, this.j, this.k);
        graphics.translate(0, -this.C);
        int n9 = 0;
        while (n9 < this.n.size()) {
            by by2 = (by)this.n.elementAt(n9);
            if (n9 == this.m && !this.aj) {
                graphics.setColor(10543802);
                graphics.fillRect(4 * gy.Y, 10 * gy.Y + n9 * this.l, this.j - 8 * gy.Y, this.l);
            }
            main.a.K.a(graphics, by2.a, 10 * gy.Y, 10 * gy.Y + n9 * this.l + this.l / 2 - gy.ah / 2, 0);
            ++n9;
        }
        super.a(graphics);
    }
}


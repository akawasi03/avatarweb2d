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

public final class jd
extends hj {
    public static jd a;
    private Vector b;
    private int c = 0;
    private int d = 0;
    private hj e;
    private by f;
    private by g;
    private by h;
    private Image i;
    private int j;
    private int k;
    private int l;
    private int m;
    private int n;
    private int o;
    private int p;

    public static jd b() {
        if (a == null) {
            a = new jd();
        }
        return a;
    }

    public final void a(hj hj2) {
        this.e();
        this.d = 0;
        this.ar = 0;
        this.e = hj2;
        this.c();
        super.a();
    }

    public final void e() {
        String string;
        if (this.i == null) {
            c.b(kf.au);
            this.i = c.a("coin");
            c.a();
        }
        if (ir.a == 25) {
            this.c = 1;
            string = kf.ev[1];
            it.a().e(0, 0);
            main.a.i();
        } else {
            string = kf.ev[0];
            this.c = 0;
        }
        this.g();
        je.a().a(string, this.l, this.m, 2);
        if (jy.b) {
            je.a().h = 25 + hj.al + 1;
        }
        this.k = je.a().h;
        this.f();
    }

    public final void a(int n2, boolean bl2) {
        if (bl2 && this.ar == n2) {
            if (this.ad != null) {
                this.ad.b();
            } else if (this.ac != null) {
                this.ac.b();
            }
        }
        super.a(n2, bl2);
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                ho ho2 = main.a.y;
                main.a.y.m = false;
                this.e.a();
                this.i = null;
                return;
            }
            case 1: 
            case 2: {
                if (this.c == 0) {
                    Object object = this;
                    Object object2 = (gu)((jd)object).b.elementAt(((hj)object).ar);
                    if (((gu)object2).c.indexOf(kf.aH) != -1) {
                        String string = main.a.K.a(((gu)object2).c, kf.aI, GameMidlet.i.x);
                        main.a.a(kf.cL, new ci((jd)object, string));
                        break;
                    }
                    if (((gu)object2).c.indexOf("napthe:") != -1) {
                        String string = ((gu)object2).c.substring(0, ((gu)object2).c.indexOf("napthe:") + "napthe:".length());
                        String string2 = string = main.a.K.a(((gu)object2).c, string, "");
                        string = ((gu)object2).a;
                        object2 = string2;
                        dx[] dxArray = new dx[2];
                        dx[] dxArray2 = dxArray;
                        dxArray[0] = new dx();
                        dxArray2[1] = new dx();
                        dxArray2[0].d(0);
                        dxArray2[1].d(1);
                        hi.b().a(dxArray2, string, kf.eH, new by(kf.cy, new ch((jd)object, (String)object2, dxArray2)));
                        object = hi.b();
                        main.a.A = object;
                        break;
                    }
                    if (((gu)object2).c.indexOf("ServerNap:") != -1) {
                        String string = ((gu)object2).c.substring(0, ((gu)object2).c.indexOf("ServerNap:") + "ServerNap:".length());
                        string = main.a.K.a(((gu)object2).c, string, "");
                        object2 = string;
                        object = iy.a();
                        ((kj)object).e((byte)-76);
                        ((kj)object).c((String)object2);
                        ((kj)object).k();
                        main.a.i();
                        break;
                    }
                    main.a.i();
                    object2 = ((gu)object2).b;
                    object = cx.a();
                    ((kj)object).e((byte)-91);
                    ((kj)object).c((String)object2);
                    ((kj)object).k();
                    return;
                }
                main.a.u.a(kf.ay, 100, 1);
                return;
            }
            case 100: {
                try {
                    if (main.a.u.a().equals("")) {
                        return;
                    }
                    n2 = Integer.parseInt(main.a.u.a());
                    it.a().e(n2, this.ar == 0 ? 1 : 0);
                    main.a.i();
                    return;
                }
                catch (Exception exception) {}
            }
        }
    }

    public final void c() {
        this.ac = this.f = new by(kf.ev[0], 1);
        this.ad = this.g = new by(kf.O, 2);
        this.ae = this.h = new by(kf.d, 0);
    }

    public jd() {
        new dr(0, 1);
        this.o = 0;
        this.p = -1;
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        if (jy.b) {
            main.a.S.b(graphics);
            main.a.S.a(graphics, kf.cf.toUpperCase(), String.valueOf(GameMidlet.i.a[0]) + kf.C, String.valueOf(GameMidlet.i.a[2]) + kf.D);
        } else if (this.e != null) {
            this.e.b(graphics);
        }
        if (hi.a != null && main.a.A == hi.a) {
            return;
        }
        if (!jy.b) {
            je.a().a(graphics);
            graphics.translate(0, this.k + je.o + gy.Z);
            graphics.setClip(this.j + 5, 0, this.l - 10, je.a().e - je.o - 2 * gy.Z);
        } else {
            graphics.translate(0, this.k);
            graphics.setClip(this.j + 5, 0, this.l - 10, this.m);
        }
        if (this.d == 1) {
            int n2 = (this.m - je.o + (gy.Z << 1)) / 6;
            main.a.N.a(graphics, String.valueOf(kf.aA) + GameMidlet.i.x, this.j + this.l / 2, n2 / 2, 2);
            if (!go.z) {
                main.a.N.a(graphics, String.valueOf(kf.aJ) + ": " + GameMidlet.i.c, this.j + this.l / 2, n2 / 2 + n2, 2);
            }
            main.a.N.a(graphics, String.valueOf(GameMidlet.i.a[2]) + kf.D, this.j + this.l / 2, n2 / 2 + (n2 << 1), 2);
            if (go.z) {
                main.a.N.a(graphics, ae.r(), this.j + this.l / 2, n2 / 2 + n2 * 3, 2);
            }
        } else {
            graphics.translate(0, -ho.i);
            if (this.c == 0) {
                this.d(graphics);
            } else {
                this.c(graphics);
            }
        }
        if (main.a.D == null || !bb.d) {
            super.a(graphics);
        }
        main.a.a(graphics);
    }

    public final void a(Vector vector) {
        this.g();
        this.b = vector;
        this.f();
        this.o = 0;
    }

    private void f() {
        if (this.b == null) {
            return;
        }
        this.b.size();
        int n2 = this.b.size() * this.n;
        int n3 = this.b.size();
        if (ir.a == 25) {
            n2 = this.n << 1;
            n3 = 2;
        }
        main.a.y.a(this.j, this.k + (!jy.b ? je.o + gy.Z : 0), this.l, this.n, this.l, n2, this.l, this.m - (je.o + 2 * gy.Z) - gy.Z, n3);
    }

    private void g() {
        if (jy.b) {
            this.l = main.a.m + 8;
            this.m = main.a.n - 25 - hj.al + (gy.Z << 1);
        } else {
            this.l = es.b().l;
            this.m = es.b().m;
        }
        this.n = hj.av;
        this.j = main.a.o - this.l / 2;
    }

    private void c(Graphics graphics) {
        int n2 = 0;
        while (n2 < 2) {
            if (!this.aj && n2 == this.ar) {
                main.a.S.c(graphics, this.j + 3 * gy.Y, n2 * this.n + 5, this.l - 6 * gy.Y, this.n);
            }
            main.a.K.a(graphics, kf.ew[n2], this.j + 10 + (this.ar == n2 ? this.o : 0), n2 * this.n + 5 + this.n / 2 - gy.ah / 2, 0);
            ++n2;
        }
    }

    private void d(Graphics graphics) {
        int n2 = this.i.getWidth() + 14;
        int n3 = this.b.size();
        int n4 = 0;
        while (n4 < n3) {
            if (n4 == this.ar && !this.aj) {
                if (jy.b) {
                    graphics.setColor(14328855);
                    graphics.fillRect(this.j, n4 * this.n, this.l - 3 * gy.Y, this.n);
                } else {
                    main.a.S.c(graphics, this.j + 6, n4 * this.n, this.l - 6 * gy.Y, this.n);
                }
            }
            graphics.drawImage(this.i, this.j + n2 / 2, n4 * this.n + this.n / 2, 3);
            ++n4;
        }
        n4 = 0;
        while (n4 < n3) {
            gu gu2 = (gu)this.b.elementAt(n4);
            graphics.setClip(this.j + n2 - 3, ho.i, this.l - n2 - 2, this.m - (!jy.b ? je.o + 2 * gy.Z : 0));
            main.a.K.a(graphics, gu2.a, this.j + n2, n4 * this.n + this.n / 2 - gy.ah / 2, 0);
            ++n4;
        }
    }

    public final void l() {
        super.l();
        if (!jy.b) {
            if (main.a.b[4] || main.a.b[6]) {
                this.h();
            }
            if (main.a.g && main.a.a(0, je.a().h, main.a.m, je.o)) {
                main.a.g = false;
                this.h();
            }
        }
    }

    private void h() {
        String string;
        if (this.d == 0) {
            this.d = 1;
            this.ac = null;
            string = kf.ev[2];
        } else {
            string = this.c == 1 ? kf.ev[1] : kf.ev[0];
            this.d = 0;
        }
        je.a().a(string, this.d);
    }

    public final void d(int n2) {
    }

    public final void k() {
        int n2;
        if (this.e != null) {
            this.e.k();
        }
        if (this.c == 0) {
            gu gu2 = (gu)this.b.elementAt(this.ar);
            n2 = main.a.K.a(gu2.a);
        } else {
            n2 = main.a.K.a(kf.ew[this.ar]);
        }
        if (n2 > this.l - 20) {
            this.o += this.p;
            if (this.o <= -(n2 - (this.l - 30))) {
                this.p = 1;
            }
            if (this.o > 0) {
                this.p = -1;
            }
        } else {
            this.o = 0;
        }
        if (this.d == 0) {
            if (ir.a != 25) {
                this.ac = this.f;
                this.ad = null;
                return;
            }
            this.ac = null;
            this.ad = this.g;
            return;
        }
        this.ac = null;
        this.ad = null;
    }
}


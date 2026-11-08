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

public final class cd
extends hj {
    public static cd a;
    private int d;
    private int e;
    private int f;
    private int g;
    private int h;
    private int i;
    private boolean j = false;
    private Vector k;
    private short[] l;
    private hj m;
    private by n;
    public dr b;
    private static hz o;
    public boolean c = false;
    private boolean p;
    private long q = 0L;
    private boolean r = false;
    private int s = 50 * gy.Y;

    public static cd b() {
        if (a == null) {
            a = new cd();
            return a;
        }
        return a;
    }

    public final void a() {
        if (main.a.r != this) {
            this.m = main.a.r;
        }
        this.c();
        super.a();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.h();
                return;
            }
            case 1: {
                this.h();
                by by2 = (by)this.k.elementAt(this.d);
                if (by2.b != null) {
                    by2.b.a();
                    return;
                }
                this.d(by2.c, by2.e);
            }
        }
    }

    public final void c() {
        if (main.a.Z == 0) {
            this.ae = new by(kf.d, 0);
        } else {
            this.j = true;
        }
        this.n = new by(kf.O, 1);
    }

    private void h() {
        this.m.a();
        if (ae.h != null) {
            ae.h.L = false;
        }
        this.r = false;
        o = null;
        this.ad = null;
        this.p = false;
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                ae.b().j();
                return;
            }
            case 2: {
                cd cd2 = this;
                byte[] byArray = new byte[]{4, 5, 6, 7, 8, 9, 10, 11, 12};
                Vector<jl> vector = new Vector<jl>();
                int n4 = 0;
                while (n4 < byArray.length) {
                    int n5 = n4;
                    vector.addElement(new jl(cd2, "", 19, n4, byArray, n5));
                    ++n4;
                }
                cd2.b = null;
                cd2.a(vector);
                return;
            }
            case 3: {
                this.e();
                return;
            }
            case 4: {
                ae.x = true;
                bf.a().b(GameMidlet.i.w);
                return;
            }
            case 5: {
                cy.b().b(false);
                return;
            }
            case 6: {
                this.c = false;
                cx.a().c(GameMidlet.i.w);
                return;
            }
            case 7: {
                ae.b();
                ae.c(ae.h);
                return;
            }
            case 8: {
                cx.a().e(26);
                main.a.i();
                return;
            }
            case 9: {
                ae.b().g();
                return;
            }
            case 10: {
                ae.b();
                ae.o();
                return;
            }
            case 11: {
                ae.x = true;
                ae.b();
                ae.p();
                return;
            }
            case 12: {
                ae.b().i();
                return;
            }
            case 13: {
                ae.b();
                ae.h();
                return;
            }
            case 15: {
                ae.b().a(GameMidlet.j);
                return;
            }
            case 16: {
                bc bc2 = (bc)ae.o.elementAt(n3);
                if (bc2.f != 1) break;
                cx.a().b(bc2.e, ae.h != null ? ae.h.w : -1);
                return;
            }
            case 17: {
                cx.a().h(n3);
                return;
            }
            case 18: {
                bc bc3 = (bc)ae.o.elementAt(n3);
                if (bc3.f != 0) break;
                cx.a().b(bc3.e, ae.h != null ? ae.h.w : -1);
                return;
            }
            case 19: {
                byte[] byArray = new byte[]{4, 5, 6, 7, 8, 9, 10, 11, 12};
                if (n3 == 0) {
                    ae.b();
                    ae.b(4);
                    return;
                }
                ae.b();
                ae.b(byArray[n3]);
                return;
            }
            case 20: {
                Object object = this;
                if (!(GameMidlet.i.Q != 0 && GameMidlet.i.Q != -5 || ca.b)) {
                    if (ir.p != null && ir.p.az == 5) {
                        bf.a().c(((hm)ir.p).d);
                        break;
                    }
                    Vector<Object> vector = new Vector<Object>();
                    by by2 = ((cd)object).a(kf.cw, 4, 17);
                    by by3 = ((cd)object).a(kf.dr, 6, 14);
                    by by4 = ((cd)object).a(kf.l, 21, 14);
                    object = ((cd)object).a(kf.cd, 15, 17);
                    vector.addElement(by2);
                    vector.addElement(object);
                    vector.addElement(by4);
                    vector.addElement(by3);
                    if (main.a.r != dp.b()) {
                        cd.b().a(vector);
                    }
                }
                return;
            }
            case 21: {
                cx.a().c(GameMidlet.i.w);
                this.c = true;
            }
        }
    }

    public final void e() {
        if (ae.h == null) {
            return;
        }
        this.r = false;
        Vector<by> vector = new Vector<by>();
        vector.addElement(this.a(kf.bT, 9, 13));
        vector.addElement(this.a(kf.bW, 12, 2));
        vector.addElement(this.a(kf.y, 7, 11));
        vector.addElement(this.a(kf.bS, 8, 12));
        vector.addElement(this.a(kf.bU, 10, 21));
        vector.addElement(this.a(kf.bV, 11, 19));
        vector.addElement(this.a(kf.dj, 13, 22));
        if (ae.o.size() > 0) {
            int n2 = 0;
            while (n2 < ae.o.size()) {
                bc bc2 = (bc)ae.o.elementAt(n2);
                if (bc2.f == 1) {
                    vector.addElement(new ji(this, bc2.a, 16, n2, bc2));
                }
                ++n2;
            }
        }
        this.a(vector);
    }

    public final void f() {
        if (GameMidlet.i.Q != 0 && GameMidlet.i.Q != -5) {
            return;
        }
        if (ca.b) {
            return;
        }
        if (ir.p != null && ir.p.az == 5) {
            bf.a().c(((hm)ir.p).d);
            return;
        }
        if (ir.p != null && ir.p.az == 0 && ((hn)ir.p).w == -100) {
            main.a.a(kf.eb, new jc(this));
            return;
        }
        Vector<by> vector = new Vector<by>();
        by by2 = this.a(kf.bX, 1, 1);
        Object object = this.a(kf.bY, 2, 0);
        by by3 = this.a(kf.bZ, 3, 20);
        by by4 = this.a(kf.by, 20, 17);
        by by5 = this.a(kf.aa, 5, 18);
        if (main.a.Z == 0) {
            vector.addElement(by3);
        }
        vector.addElement(by4);
        vector.addElement((by)object);
        if (main.a.Z == 0) {
            vector.addElement(ae.b().f);
        }
        if (GameMidlet.i.H != 14) {
            vector.addElement(by2);
        }
        vector.addElement(by5);
        if (main.a.Z > 0 && ae.n != null && ae.n.size() > 0) {
            int n2 = 0;
            while (n2 < ae.n.size()) {
                object = (bc)ae.n.elementAt(n2);
                vector.addElement(new jg(this, ((bc)object).a, 17, n2, (bc)object));
                ++n2;
            }
        }
        if (ae.o.size() > 0) {
            int n3 = 0;
            while (n3 < ae.o.size()) {
                object = (bc)ae.o.elementAt(n3);
                if (((cc)object).f == 0) {
                    vector.addElement(new ix(this, ((bc)object).a, 18, n3, (bc)object));
                }
                ++n3;
            }
        }
        if (main.a.r == dp.b()) {
            return;
        }
        this.b = null;
        cd.b().a(vector);
    }

    public static void g() {
        hn hn2 = GameMidlet.i;
        if (main.a.r == a) {
            return;
        }
        dp.b().m = true;
        dp.b().a(new String[]{kf.l, kf.co}, new Vector[]{ae.b().a(hn2, 0), ae.b().a(GameMidlet.k, hn2.w, 1)}, null);
        dp.b().a(ae.b().a(hn2.e, 0, 0, false), 0);
        dp.b().a(ae.b().a(GameMidlet.k, 1, 0, true), 1);
        if (main.a.r != dp.b()) {
            dp.b().a();
        }
    }

    private by a(String string, int n2, int n3) {
        return new iz(this, string, n2, n3);
    }

    public final by a(String string, ii ii2, int n2) {
        return new iv(this, string, new iu(this, ii2), n2);
    }

    public final void a(Vector vector) {
        this.k = vector;
        if (main.a.H) {
            this.g = 40 * gy.Y + (gy.Y - 1) * 20;
            if (main.a.Z == 1 && main.a.m > 300) {
                this.g += 20;
            }
        } else {
            this.g = 30;
        }
        this.h = this.g + 2 * gy.Y;
        this.f = gy.ag << 1;
        this.e = 0;
        this.i = main.a.m / this.h;
        this.e = vector.size() * this.h < main.a.m ? (main.a.m - vector.size() * this.h) / 2 : (main.a.m - this.i * this.h) / 2;
        this.l = new short[vector.size()];
        int n2 = 0;
        while (n2 < this.l.length) {
            this.l[n2] = -40;
            ++n2;
        }
        if (this.d >= vector.size()) {
            this.d = 0;
        }
        this.r = false;
        if (ae.h != null && main.a.Z > 0) {
            ae.h.L = true;
        }
        if (main.a.Z > 0) {
            this.f = main.a.p - (vector.size() / this.i + 1) * this.g / 2;
        }
        this.a();
        if (main.a.Z == 0) {
            this.ad = this.n;
        }
    }

    public final void k() {
        this.m.k();
        int n2 = 0;
        while (n2 < this.l.length) {
            if (this.l[n2] != n2 % this.i * this.h) {
                int n3 = n2;
                this.l[n3] = (short)(this.l[n3] + (n2 % this.i * this.h - this.l[n2]) / 3);
            }
            ++n2;
        }
    }

    public final void l() {
        int n2;
        if (main.a.g) {
            n2 = 0;
            int n3 = this.k.size() - 1;
            while (n3 >= 0) {
                if (main.a.a(this.l[n3] + this.e, this.f + n3 / this.i * this.h, this.g, this.g)) {
                    this.d = n3;
                    this.p = true;
                    this.j = false;
                    n2 = 1;
                    this.q = System.currentTimeMillis() / 100L;
                    break;
                }
                --n3;
            }
            if (n2 == 0) {
                this.h();
            }
        }
        if (this.p) {
            if (System.currentTimeMillis() / 100L - this.q > 10L) {
                this.j = false;
            }
            if (main.a.f) {
                this.p = false;
                this.j = true;
                n2 = this.k.size() - 1;
                while (n2 >= 0) {
                    if (main.a.a(this.l[n2] + this.e, this.f + n2 / this.i * this.h, this.g, this.g)) {
                        if (n2 != this.d) break;
                        this.h();
                        this.a(1, -1);
                        break;
                    }
                    --n2;
                }
                main.a.f = false;
            }
        }
        if (main.a.a(4)) {
            --this.d;
            if (this.d < 0) {
                this.d = this.k.size() - 1;
            }
        } else if (main.a.a(6)) {
            ++this.d;
            if (this.d >= this.k.size()) {
                this.d = 0;
            }
        } else if (main.a.a(2)) {
            n2 = this.d;
            if ((n2 -= this.i) < 0) {
                n2 = this.k.size() / this.i * this.i + (this.i + n2);
                if (n2 < this.k.size()) {
                    this.d = n2;
                }
            } else {
                this.d = n2;
            }
        } else if (main.a.a(8)) {
            this.d += this.i;
            if (this.d >= this.k.size()) {
                this.d %= this.i;
            }
        }
        super.l();
    }

    public final void a(Graphics graphics) {
        this.m.b(graphics);
        main.a.c(graphics);
        Graphics graphics2 = graphics;
        cd cd2 = this;
        if (GameMidlet.i.H != 14) {
            GameMidlet.i.a(graphics2, GameMidlet.i.aw * gy.Y - do.a().a, GameMidlet.i.ax * gy.Y - do.a().b, false);
        }
        by by2 = (by)cd2.k.elementAt(cd2.d);
        main.a.L.a(graphics2, by2.a, main.a.o, cd2.f - 15, 2);
        graphics2.translate(cd2.e, cd2.f);
        int n2 = cd2.k.size() - 1;
        while (n2 >= 0) {
            int n3 = 0;
            by by3 = (by)cd2.k.elementAt(n2);
            if (n2 == cd2.d && !cd2.j) {
                n3 = 4;
            }
            main.a.S.a(graphics2, cd2.l[n2], n2 / cd2.i * cd2.h, cd2.g, cd2.g, n3);
            by3.a(graphics2, cd2.h / 2 + cd2.l[n2], cd2.h / 2 + n2 / cd2.i * cd2.h);
            --n2;
        }
        super.a(graphics);
    }
}


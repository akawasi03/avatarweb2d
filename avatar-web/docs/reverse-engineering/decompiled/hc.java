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

public final class hc
extends hj {
    private Vector g = new Vector();
    private hj h;
    public cw a;
    public int b;
    public static dx c;
    public static hc d;
    public static int e;
    private static int i;
    public by f = new by(kf.ch, 10);
    private boolean j = true;

    public static hc b() {
        if (d == null) {
            d = new hc();
        }
        return d;
    }

    public final void a(hj hj2) {
        this.h = hj2;
        hj.as = 0;
        hc.b().b = hc.b().g.size() - 1;
        this.f();
        je.a().l = this.b;
        hc.b().g();
        this.j = this.b((int)this.b).h;
        this.e();
        je.a().a(this.b((int)this.b).b, this.b);
        super.a();
    }

    private void f() {
        if (jy.b && main.a.Z == 0) {
            je.a().a(this.b((int)this.b).b, main.a.m - (e << 1), main.a.q - main.a.T - (e << 1), this.g.size());
            return;
        }
        je.a().a(this.b((int)this.b).b, main.a.m - (e << 1), main.a.n - main.a.ab - main.a.T - 10 + (jy.b && this.h != kx.i ? -20 : 0), this.g.size());
        i = je.a().h = 10 + main.a.ab;
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 10: {
                this.a(this.b(this.b));
                return;
            }
            case 2: {
                this.h.a();
                this.h = null;
            }
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 1: {
                bf.a().a(c.f());
                c.a("");
                return;
            }
            case 2: {
                this.h.a();
                this.h = null;
                return;
            }
            case 3: {
                Object object = this;
                if (!c.f().equals("")) {
                    object = ((hc)object).b(((hc)object).b);
                    String string = c.f();
                    if (string.indexOf("hack") != -1) {
                        ((cw)object).a(String.valueOf(GameMidlet.i.x) + ": " + string);
                        string = String.valueOf(string) + " ";
                        int n4 = 0;
                        while (n4 < ((cw)object).e.size()) {
                            String string2 = (String)((cw)object).e.elementAt(n4);
                            string = String.valueOf(string) + string2;
                            ++n4;
                        }
                        cx.a().b(((cw)object).g, string);
                        c.a("");
                        break;
                    }
                    cx.a().a(((cw)object).g, string);
                    c.a("");
                    ((cw)object).a(String.valueOf(GameMidlet.i.x) + ": " + string);
                }
                return;
            }
            case 4: {
                this.h.a();
                this.h = null;
                return;
            }
            case 5: {
                Vector<by> vector = new Vector<by>();
                if (this.b(this.b) != this.a) {
                    vector.addElement(new by(kf.ch, 10));
                }
                vector.addElement(new by(kf.d, 2));
                le.a().a(vector, 0);
                return;
            }
            case 10: {
                this.a(this.b(this.b));
            }
        }
    }

    public final void c() {
        this.ac = main.a.Z == 0 ? (jy.b ? new by(kf.d, 4) : new by(kf.c, 5)) : (this.b(this.b) == this.a ? new by(kf.d, 4) : new by(kf.ch, 10));
        this.a = new cw(kf.cg, -1, null, null, false);
    }

    public hc() {
        if (main.a.Z == 0) {
            i = 10;
            e = 10;
        } else {
            e = i = gy.aa;
        }
        c = new dx();
        new dx().a = e + 5;
        this.e();
        c.a(true);
        c.c(40);
        this.c();
        this.a.i += 20;
        this.g.addElement(this.a);
        this.b = 0;
        this.g();
    }

    public final void e() {
        if (main.a.r == this) {
            this.f();
            this.b(this.b).c();
        }
        hc.c.b = je.a().h + je.a().e - hc.c.d - 6;
        hc.c.c = main.a.m - (je.a().g << 1) - 10;
    }

    private void g() {
        this.b((int)this.b).a = false;
        this.ad = this.b((int)this.b).c;
        this.ae = this.b((int)this.b).d;
        if (this.ad != null) {
            c.a(this.b((int)this.b).f);
        }
        this.j = this.b((int)this.b).h;
        this.b(this.b).c();
        if (main.a.r == this) {
            je.a().a(this.b((int)this.b).b, this.b);
        }
    }

    public final void a(int n2, String string, String string2) {
        cw cw2 = this.c(n2);
        if (cw2 == null) {
            cw2 = new cw(string, n2, !string.equals("admin") ? new by(kf.ba, 3) : null, !string.equals("admin") ? c.a() : null, !string.equals("admin"));
            this.b(cw2);
        } else {
            cw2.a = true;
            if (main.a.r == this) {
                this.h();
            }
        }
        cw2.a(string, string2);
    }

    private cw c(int n2) {
        int n3 = 0;
        while (n3 < this.g.size()) {
            if (((cw)this.g.elementAt((int)n3)).g == n2) {
                return (cw)this.g.elementAt(n3);
            }
            ++n3;
        }
        return null;
    }

    public final cw b(int n2) {
        if (n2 < this.g.size()) {
            return (cw)this.g.elementAt(n2);
        }
        return null;
    }

    public final void a(Graphics graphics) {
        this.h.b(graphics);
        main.a.c(graphics);
        je.a().a(graphics);
        graphics.translate(e, i + je.o + gy.Z);
        this.b(this.b).a(graphics);
        if (this.j) {
            graphics.translate(-graphics.getTranslateX(), -graphics.getTranslateY());
            c.a(graphics);
        }
        if (jy.b) {
            jy.a(graphics, this.ac, this.ad, this.ae);
            return;
        }
        super.a(graphics);
    }

    private void e(int n2) {
        hc hc2 = this;
        this.b((int)hc2.b).f = c.f();
        this.b += n2;
        if (this.b < 0) {
            this.b = this.g.size() - 1;
        }
        if (this.b >= this.g.size()) {
            this.b = 0;
        }
        this.g();
        this.b(this.b).a();
        cw.j = cw.k;
    }

    public final void d(int n2) {
        if (n2 == -3) {
            this.e(-1);
        }
        if (n2 == -4) {
            this.e(1);
        }
        if (this.j) {
            c.b(n2);
        }
        super.d(n2);
    }

    public final void l() {
        int n2;
        if (jy.b && main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
        } else {
            super.l();
        }
        if (main.a.g && (n2 = je.a().d()) != 0) {
            this.e(n2);
            main.a.g = false;
        }
        this.b(this.b).b();
    }

    public final void k() {
        if (this.j) {
            c.e();
        }
        if (this.h != null) {
            this.h.k();
        }
    }

    public final void a(cw cw2) {
        this.g.removeElement(cw2);
        if (this.b >= this.g.size()) {
            this.b = this.g.size() - 1;
        }
        je.a().l = this.b;
        je.a().a(this.g.size());
        this.h();
        this.g();
    }

    public final void a(int n2, String string) {
        cw cw2 = this.c(n2);
        if (cw2 == null) {
            cw2 = new cw(string, n2, new by(kf.ba, 3), c.a(), true);
            this.b(cw2);
            cw2.a(String.valueOf(kf.ci) + string);
        }
        n2 = 0;
        while (n2 < this.g.size()) {
            if (this.g.elementAt(n2) == cw2) {
                this.b = n2;
            }
            ++n2;
        }
        this.g();
    }

    public final void b(cw cw2) {
        this.g.addElement(cw2);
        if (main.a.r == this) {
            je.a().a(this.g.size());
            this.h();
        }
    }

    private void h() {
        int n2 = 0;
        while (n2 < this.g.size()) {
            cw cw2 = this.b(n2);
            if (cw2.a) {
                je.a().a(4, n2);
            } else {
                je.a().a(0, n2);
            }
            ++n2;
        }
    }
}


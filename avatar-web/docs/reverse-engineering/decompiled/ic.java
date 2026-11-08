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

public final class ic
extends hj {
    private static ic d;
    private byte e = 1;
    public int a = 0;
    private int f;
    public int b;
    public int c;
    private Vector g;
    private Vector h;
    private Vector i;
    private int j = 0;

    public static ic b() {
        if (d == null) {
            d = new ic();
        }
        return d;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.o, 0, this));
                vector.addElement(new by(kf.p, 1, this));
                main.a.a(kf.dC, vector);
            }
        }
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                ic.f();
                return;
            }
            case 1: {
                ic.f();
            }
        }
    }

    public final void a() {
        GameMidlet.i.K = 0;
        GameMidlet.i.e = new Vector();
        this.e();
        this.ad = new by(kf.cj, 0);
        hx hx2 = new hx();
        int n2 = aw.a.nextInt(this.i.size());
        hx2.a = ((fa)this.i.elementAt((int)n2)).g;
        GameMidlet.i.a(hx2);
        hx2 = new hx();
        n2 = aw.a.nextInt(this.h.size());
        hx2.a = ((fa)this.h.elementAt((int)n2)).g;
        GameMidlet.i.a(hx2);
        hx2 = new hx();
        new hx().a = (short)4;
        GameMidlet.i.a(hx2);
        hx2 = new hx();
        n2 = aw.a.nextInt(this.g.size());
        hx2.a = ((fa)this.g.elementAt((int)n2)).g;
        GameMidlet.i.a(hx2);
        GameMidlet.i.a(new hx(0));
        GameMidlet.i.h();
        je.a().a(kf.ck, 150 * gy.Y, 170 + (gy.Y == 2 ? 120 : 0), 1);
        super.a();
    }

    private void e() {
        GameMidlet.i.d = this.e;
        if (this.g != null) {
            this.g.removeAllElements();
            this.h.removeAllElements();
            this.i.removeAllElements();
        }
        this.g = new Vector();
        this.h = new Vector();
        this.i = new Vector();
        int n2 = 0;
        while (n2 < fx.b.length) {
            fa fa2;
            if (fx.b[n2] instanceof fa && (fa2 = (fa)fx.b[n2]) != null && (fa2.b == this.e || fa2.b == 0) && fa2.a == 0) {
                if (fa2.j == 50) {
                    this.g.addElement(fa2);
                } else if (fa2.j == 20) {
                    this.h.addElement(fa2);
                } else if (fa2.j == 10) {
                    this.i.addElement(fa2);
                }
            }
            ++n2;
        }
        this.f = 0;
        this.g();
        if (GameMidlet.i.H != 10) {
            GameMidlet.i.b((byte)1);
        }
        GameMidlet.i.h();
    }

    private static void f() {
        main.a.I = true;
        main.a.c(String.valueOf(kf.ck) + "...");
        cx.a().c();
    }

    public final void k() {
        if (this.b > 0) {
            --this.b;
        }
        if (this.c > 0) {
            --this.c;
        }
        ++this.j;
        if (this.j > 50) {
            this.j = 0;
            int n2 = aw.a.nextInt(3);
            if (GameMidlet.i.H != 10) {
                if (n2 == 0) {
                    GameMidlet.i.b((byte)1);
                } else {
                    GameMidlet.i.b((byte)0);
                }
            }
        }
        GameMidlet.i.d();
    }

    public final void b(int n2) {
        this.a = n2;
        if (this.a < 0) {
            this.a = 1;
        }
        if (this.a > 1) {
            this.a = 0;
        }
    }

    public final void c(int n2) {
        this.f += n2;
        if (this.f < 0) {
            this.f = 1;
        }
        if (this.f > 1) {
            this.f = 0;
        }
        if (this.a == 0) {
            this.e = this.e == 1 ? (byte)2 : (byte)1;
            this.e();
            return;
        }
        this.g();
    }

    public final void l() {
        main.a.S.j();
        super.l();
    }

    private void g() {
        int n2 = 0;
        while (n2 < GameMidlet.i.e.size()) {
            hx hx2 = (hx)GameMidlet.i.e.elementAt(n2);
            fa fa2 = (fa)fx.a(hx2.a);
            if (fa2.j == 50 && this.g.size() != 0 && this.f < this.g.size()) {
                hx2.a = ((fa)this.g.elementAt((int)this.f)).g;
            }
            if (fa2.j == 20 && this.h.size() != 0 && this.f < this.h.size()) {
                hx2.a = ((fa)this.h.elementAt((int)this.f)).g;
            }
            if (fa2.j == 10 && this.i.size() != 0 && this.f < this.i.size()) {
                hx2.a = ((fa)this.i.elementAt((int)this.f)).g;
            }
            ++n2;
        }
        GameMidlet.i.h();
    }

    public final void a(Graphics graphics) {
        main.a.x.b(graphics);
        main.a.x.d(graphics);
        main.a.c(graphics);
        je.a().a(graphics);
        graphics.translate(je.a().g, je.a().h);
        main.a.S.d(graphics, this.a, this.e, this.b, this.c);
        super.a(graphics);
    }

    public static void b(boolean bl2) {
        main.a.h();
        if (bl2) {
            ae.b().t();
            return;
        }
        main.a.b(kf.cl);
    }
}


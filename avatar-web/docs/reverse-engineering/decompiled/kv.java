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

public final class kv
extends hj {
    private static kv c;
    private by d;
    private by e;
    private by f;
    public Image a;
    public ht b;
    private db g = new db();
    private int h;
    private int i;
    private int j;
    private Image[] k;
    private int l = 0;
    private byte[] m;
    private long n;
    private short o;
    private int p;
    private int q;
    private int r;

    public static kv b() {
        if (c == null) {
            c = new kv();
            return c;
        }
        return c;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                if (GameMidlet.i.H != 2 && GameMidlet.i.H != 13) {
                    ae.b().a();
                }
                bf bf2 = bf.a();
                bf2.e((byte)82);
                bf2.k();
                main.a.i();
                this.ad = null;
                return;
            }
            case 1: {
                bf.a().b();
                main.a.i();
                return;
            }
            case 2: {
                this.e();
                bf.a().b();
            }
        }
    }

    public kv() {
        this.d = new by(kf.cz, 0);
        this.f = new by(kf.cy, 1);
        this.e = new by(kf.d, 2);
        this.ad = this.d;
        c.b(kf.av);
        this.a = c.a("cucphao");
        this.b = ht.a("ca", 14 * gy.Y, 14 * gy.Y);
        c.a();
        this.j = 530;
    }

    private void e() {
        GameMidlet.i.f();
        GameMidlet.i.aw = GameMidlet.i.K == 0 ? (GameMidlet.i.aw -= 18) : (GameMidlet.i.aw += 18);
        GameMidlet.i.ax -= 10;
        do.a(main.a.m / 10);
        ae.l.removeElement(this.g);
        ae.b().a();
    }

    public final boolean b(int n2, int n3) {
        this.r = main.a.n - main.a.n / 4;
        if (this.r > main.a.n - 70 * gy.Y) {
            this.r = main.a.n - 70 * gy.Y;
        }
        this.q = 60;
        if (this.q < (main.a.m - ir.e * 24) / 2 + 50 * gy.Y) {
            this.q = (main.a.m - ir.e * 24) / 2 + 50 * gy.Y;
        }
        this.l = 0;
        int n4 = ir.d(n2, n3);
        if (ir.d[n4 + 1] == 100 || ir.d[n4 + 1] == 16 || ir.d[n4 + 1] == 13) {
            GameMidlet.i.K = 0;
            this.q = main.a.m - this.q;
        } else {
            GameMidlet.i.K = gx.J;
        }
        GameMidlet.i.e(n2, n3);
        bf bf2 = bf.a();
        bf2.e((byte)86);
        bf2.k();
        main.a.i();
        this.ae = this.e;
        main.a.f();
        return true;
    }

    public final void k() {
        ae.b().k();
        if (this.g.i && !this.g.j) {
            if (this.l < this.m.length && System.currentTimeMillis() - this.n > (long)this.o) {
                this.f(0);
            }
            if (GameMidlet.i.H == 2) {
                --this.p;
                if (this.p < 0) {
                    this.p = 0;
                    this.g.a(1);
                }
            }
        }
    }

    public final void d(int n2) {
        if (this.g.i && !this.g.j) {
            switch (n2) {
                case 50: 
                case 52: 
                case 54: 
                case 56: {
                    main.a.b[n2 - 48] = true;
                }
            }
            return;
        }
        ae.b().d(n2);
    }

    public final void l() {
        if (this.g.i && !this.g.j) {
            if (main.a.a(2)) {
                this.f(2);
            } else if (main.a.a(4)) {
                this.f(1);
            } else if (main.a.a(6)) {
                this.f(3);
            } else if (main.a.a(8)) {
                this.f(4);
            }
        }
        super.l();
    }

    private void f(int n2) {
        this.n = System.currentTimeMillis();
        if (this.l < this.m.length) {
            this.m[this.l] = (byte)n2;
        }
        ++this.l;
        if (GameMidlet.i.H != 2) {
            this.g.a(0);
            this.p = 2;
        }
        if (this.l >= this.m.length) {
            this.g.a(0);
            this.g.j = true;
            bf.a().a(true, this.m);
            main.a.i();
        }
    }

    public final void a(Graphics graphics) {
        ae.b().b(graphics);
        if (this.g.i && !this.g.j && this.o != -1) {
            Graphics graphics2 = graphics;
            kv kv2 = this;
            main.a.c(graphics2);
            graphics2.translate(-do.a().a, -do.a().b);
            graphics2.setColor(8575990);
            if (kv2.k != null && kv2.l < kv2.k.length) {
                if (System.currentTimeMillis() - kv2.n > 50L) {
                    graphics2.setColor(1423411);
                } else {
                    graphics2.setColor(0xEE3B3B);
                }
                graphics2.fillRoundRect(kv2.h - 1, kv2.i * gy.Y - 1, kv2.k[kv2.l].getWidth() + 2, kv2.k[kv2.l].getHeight() + 2, 5, 5);
                graphics2.drawImage(kv2.k[kv2.l], kv2.h, kv2.i * gy.Y, 0);
            }
        }
        super.a(graphics);
    }

    public final void b(int n2) {
        Object object = ir.g(n2);
        if (object != null) {
            hn hn2 = object;
            object = this;
            db db2 = kv.c(hn2.w);
            if (db2 != null) {
                ae.l.removeElement(db2);
            }
            db2 = new db();
            if (hn2.w == GameMidlet.i.w) {
                main.a.h();
                ((kv)object).g = db2;
            } else {
                db2 = new db();
            }
            ae.l.addElement(db2);
            if (hn2.H != 2) {
                if (hn2.w != GameMidlet.i.w) {
                    db2.b = hn2;
                    db2.k = true;
                }
                return;
            }
            db2.a(hn2);
        }
    }

    public final void a(int n2, int n3, short s2, byte[][] byArray) {
        db db2 = kv.c(n2);
        if (db2 != null && db2.f != 0) {
            if (db2.b.H != 13 && db2.b.H != 2 || db2.i) {
                return;
            }
            db2.i = true;
            db2.a(0);
            db2.b.H = (byte)2;
            db2.h = n3;
            if (s2 != -1) {
                main.a.a(kf.cA, db2.b.aw, db2.b.ax - 60, -1, 1, -1);
            }
            if (n2 == GameMidlet.i.w) {
                this.n = System.currentTimeMillis();
                this.l = 0;
                this.p = 2;
                this.k = new Image[byArray.length];
                this.m = new byte[byArray.length];
                n2 = 0;
                while (n2 < this.k.length) {
                    this.k[n2] = aw.a(byArray[n2]);
                    ++n2;
                }
                this.o = s2;
                this.h = this.g.d[this.g.a - 2].a;
                this.i = this.g.d[this.g.a - 2].b - 30;
                if (s2 == -1) {
                    this.f(0);
                }
            }
        }
    }

    public final void c(int n2, int n3) {
        db db2 = kv.c(n2);
        if (db2 != null) {
            if (db2.b.H != 2 && db2.b.H != 13) {
                ae.l.removeElement(db2);
                return;
            }
            if (n3 < 0) {
                main.a.a(kf.cB, db2.b.aw, db2.b.ax - 60, -1, 1, -1);
            }
            db2.h = n3;
            db2.j = true;
            db2.a(0);
            if (db2.b.w == GameMidlet.i.w) {
                this.ae = this.f;
                main.a.h();
            }
        }
    }

    public static db c(int n2) {
        int n3 = 0;
        while (n3 < ae.l.size()) {
            db db2 = (db)ae.l.elementAt(n3);
            if (db2.b.w == n2) {
                return db2;
            }
            ++n3;
        }
        return null;
    }

    public final void e(int n2) {
        db db2 = kv.c(n2);
        if (n2 == GameMidlet.i.w) {
            this.ad = this.d;
            this.ae = this.e;
            main.a.h();
        }
        if (db2 != null) {
            Object object;
            if (db2.h > 0 && (object = (iw)fx.a((short)db2.h)) != null) {
                object = fx.a[((ld)object).h];
                object = Image.createImage((Image)fx.a((int)((ke)object).b).e, (int)(((ke)object).c * gy.Y), (int)(((ke)object).d * gy.Y), (int)(((ke)object).e * gy.Y), (int)(((ke)object).f * gy.Y), (int)0);
                main.a.a(1, db2.b.aw, db2.b.ax + db2.b.h - 50, -1, (Image)object, -1);
            }
            ae.l.removeElement(db2);
        }
    }

    public final void a(boolean bl2, String string) {
        if (bl2) {
            this.g.a();
            this.ad = this.d;
            this.a();
            do.a(main.a.m / 3);
            main.a.h();
            return;
        }
        main.a.b(string, 0, this);
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                this.e();
            }
        }
    }

    public static void e(int n2, int n3) {
        hn hn2 = ir.g(n2);
        if (hn2 != null && (hn2.H == 2 || hn2.H == 13)) {
            db db2 = new db();
            ae.l.addElement(db2);
            db2.a(hn2);
            db2.b();
            db2.c[db2.a - 1].a = hn2.aw + 70 + (gy.Y - 1) * 35 + aw.e(25);
            db2.c[db2.a - 1].b = hn2.ax;
            db2.f = 1;
            db2.g = -1;
            db2.a(1);
            if (n3 == 2) {
                db2.i = true;
                return;
            }
            if (n3 == 3) {
                db2.i = true;
                db2.j = true;
                db2.e = 2;
            }
        }
    }

    public final void d(int n2, int n3) {
    }

    public final void a(int n2, byte by2, byte by3, int n3, short s2) {
        hn hn2;
        Object object;
        Object object2 = ir.g(n2);
        if (object2 == null && cy.c != null) {
            int n4 = 0;
            while (n4 < cy.c.size()) {
                object = (hn)cy.c.elementAt(n4);
                if (((gx)object).w == n2) {
                    object2 = object;
                }
                ++n4;
            }
        }
        if ((hn2 = object2) != null) {
            object = new Vector<jq>();
            ((Vector)object).addElement(new jq(this, null, 0, hn2, by2, by3, n3, s2));
            dp.b().a(new String[]{kf.cw}, new Vector[1], (Vector)object);
            dp.b().a();
        }
        main.a.h();
    }
}


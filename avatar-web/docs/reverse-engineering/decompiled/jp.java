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
import main.GameMidlet;
import main.a;

public final class jp
extends hj {
    public static jp a;
    public static byte b;
    public static byte c;
    public static byte d;
    public static byte e;
    public static ht f;
    private static Image k;
    private static Image l;
    private static Image m;
    private static Image n;
    private int o;
    Vector g;
    private int p;
    private int q;
    public byte h;
    private short r;
    private by s = new by(kf.O, 1);
    public static Image i;
    int j;

    static {
        b = 0;
        c = 1;
        d = (byte)2;
        e = c;
    }

    public static jp b() {
        if (a == null) {
            a = new jp();
            return a;
        }
        return a;
    }

    public final void a() {
        jy.f();
        hj.z();
        this.ar = 0;
        main.a.S.b(e);
        if (k == null) {
            try {
                k = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgkhungsoban.on"));
                l = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgNumPlayer.on"));
                m = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgPlay.on"));
                n = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgLock.on"));
            }
            catch (IOException iOException) {
                IOException iOException2 = iOException;
                iOException.printStackTrace();
            }
        }
        main.a.J = 1;
        this.aj = true;
        GameMidlet.i.L = false;
        super.a();
    }

    public jp() {
        this.ae = new by(kf.d, 2);
        this.ad = main.a.Z != 0 ? new by(kf.i, 5) : this.s;
        this.ac = new by(kf.c, 6);
        this.r = (short)(110 * gy.Y);
        if (main.a.Z == 1) {
            this.r = (short)95;
        } else if (main.a.Z == 0) {
            this.r = (short)(main.a.m / 4);
            if (this.r < 70) {
                this.r = (short)(main.a.m / 3);
            }
            if (main.a.m < 180) {
                this.r = (short)(main.a.m / 2);
            }
        }
        this.o = main.a.m / this.r + 1;
        if (this.o * this.r > main.a.m - this.r / 2) {
            --this.o;
        }
        this.p = this.r / 2;
        this.q = this.r / 2;
        this.q += 10;
        if (main.a.m > this.o * this.r) {
            this.p = (main.a.m - this.o * this.r) / 2 + this.r / 2;
        }
    }

    public final void d() {
        main.a.i();
        jp.i();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 1: {
                jp jp2 = this;
                dl dl2 = (dl)jp2.g.elementAt(jp2.ar);
                if (ae.u && dl2.f > GameMidlet.i.a[3]) {
                    jp.b().f();
                    break;
                }
                if (dl2.d) {
                    main.a.u.a(kf.X, new cn(jp2), 2);
                    break;
                }
                ie.a().a(jp2.h, dl2.a, "");
                main.a.i();
                return;
            }
            case 2: {
                jp.i();
                return;
            }
            case 3: {
                this.d(1, -1);
                return;
            }
            case 4: {
                this.h();
                return;
            }
            case 5: {
                main.a.i();
                ie.a().c();
                return;
            }
            case 6: {
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.i, 5));
                vector.addElement(new by("\u0110\u1ebfn b\u00e0n", 6));
                vector.addElement(ae.b().f);
                vector.addElement(new by(kf.am, 7));
                le.a().a(vector, 0);
            }
        }
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                main.a.c(kf.b);
                ie.a().a(this.h);
                return;
            }
            case 3: {
                main.a.i();
                cx.a().a(GameMidlet.i.w);
                return;
            }
            case 4: {
                jp.i();
                return;
            }
            case 5: {
                main.a.i();
                ie.a().c();
                return;
            }
            case 6: {
                this.h();
                return;
            }
            case 7: {
                main.a.i();
                cx.a().a(GameMidlet.i.w);
            }
        }
    }

    private void h() {
        main.a.u.a(kf.an, new ck(this), 3);
    }

    protected final void e() {
        main.a.u.a(kf.ap, new cj(this), 0);
    }

    public final void f() {
        main.a.a("Hi\u1ec7n t\u1ea1i b\u1ea1n kh\u00f4ng \u0111\u1ee7 X\u00e8ng \u0111\u1ec3 tham gia m\u00e0n ch\u01a1i, b\u1ea1n c\u00f3 mu\u1ed1n n\u1ea1p th\u00eam X\u00e8ng kh\u00f4ng?", new cl(this));
    }

    private static void i() {
        ho ho2 = main.a.y;
        main.a.y.m = false;
        ie.a().b();
        main.a.i();
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        el.a(graphics, "Ph\u00f2ng " + el.c + " " + this.h);
        this.c(graphics);
        jy.a(graphics, this.ac, this.ad, this.ae);
        main.a.b(graphics);
    }

    private void c(Graphics graphics) {
        int n2;
        graphics.translate(this.p, this.q);
        graphics.translate(0, -ho.i);
        int n3 = ho.i / this.r * this.o - this.o;
        if (n3 < 0) {
            n3 = 0;
        }
        if ((n2 = n3 + main.a.n / this.r * this.o + (this.o << 1) + this.o) > this.g.size()) {
            n2 = this.g.size();
        }
        while (n3 < n2) {
            int n4 = n3 % this.o * this.r;
            int n5 = n3 / this.o * this.r;
            dl dl2 = (dl)this.g.elementAt(n3);
            if (!(main.a.H && this.aj || n3 != this.ar)) {
                graphics.drawImage(i, n4, n5, 3);
            }
            f.a(dl2.b, n4, n5, 0, 3, graphics);
            graphics.drawImage(k, n4 - this.r / 4, n5 - 30 * gy.Y, 3);
            main.a.Q.a(graphics, "" + dl2.a, n4 - this.r / 4, n5 - 30 * gy.Y - gy.ai / 2, 2);
            if (dl2.f > 0) {
                main.a.Q.a(graphics, dl2.g, n4, n5 - 30 * gy.Y - gy.ai / 2, 2);
            }
            if (e == c && dl2.c < 4) {
                graphics.drawImage(l, n4 + this.r / 4, n5 - 30 * gy.Y, 3);
                main.a.P.a(graphics, "" + dl2.c, n4 + this.r / 4, n5 - 30 * gy.Y - gy.ai / 2, 2);
            }
            if (dl2.e) {
                graphics.drawImage(l, n4 - this.r / 4, n5 + this.r / 3, 3);
                graphics.drawImage(m, n4 - this.r / 4, n5 + this.r / 3, 3);
            }
            if (dl2.d) {
                graphics.drawImage(l, n4 + this.r / 4, n5 + this.r / 3, 3);
                graphics.drawImage(n, n4 + this.r / 4, n5 + this.r / 3, 3);
            }
            ++n3;
        }
    }

    public final void l() {
        if (jy.b && main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public final void a(Vector vector) {
        this.g = vector;
    }

    public final void g() {
        int n2 = this.g.size() / this.o;
        if (this.g.size() % this.o != 0) {
            ++n2;
        }
        this.q = 100 * gy.Y;
        if (main.a.m < 200) {
            this.q = 50;
        }
        main.a.y.a(this.p - this.r / 2, this.q - this.r / 2, this.r, this.r, this.o * this.r, n2 * this.r + 10, this.o * this.r, main.a.n - (this.q - this.r / 2) - 4, this.g.size());
    }

    public final void a(int n2, boolean bl2) {
        if (bl2 && this.ar == n2 && this.s != null) {
            this.s.b();
        }
        if (n2 >= 0 && n2 < this.g.size()) {
            super.a(n2, bl2);
        }
    }

    public final void k() {
    }
}


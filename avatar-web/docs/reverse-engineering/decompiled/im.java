/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class im
extends gy {
    public static im a;
    public dx b;
    public static boolean c;
    public cq d;
    private long e;

    static {
        c = false;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.b.a("");
                c = false;
                this.b.a(true);
                return;
            }
            case 1: {
                long l2 = System.currentTimeMillis();
                if (l2 - this.e < 2000L) {
                    return;
                }
                if (this.d == null) break;
                this.d.a(this.b.f());
                this.b.a("");
                c = false;
                this.b.a(true);
                this.e = l2;
            }
        }
    }

    public final void a() {
        this.b.a("");
        c = false;
        this.b.a(true);
        if (jy.b && dm.d) {
            dm.d = false;
            dm.b().b[4] = 0;
            main.a.a.b();
        }
    }

    protected im() {
        this.ac = new by(kf.d, 0);
        this.ad = new by(kf.ba, 1);
        this.b = new dx();
        this.b.e = false;
        this.b.a(true);
        this.b();
        this.b.a = (main.a.m - this.b.c) / 2;
        this.b.c(40);
        this.ae = this.b.a();
    }

    public final void b() {
        this.b.b = main.a.q - main.a.T - this.b.d - 5;
        if (jy.b) {
            this.b.b -= 2 * gy.Y;
        }
        this.b.c = main.a.m - 10;
    }

    public final void b(int n2) {
        if (c) {
            this.b.b(n2);
        }
    }

    public static im d() {
        if (a == null) {
            a = new im();
            return a;
        }
        return a;
    }

    public final void a(int n2, cq cq2) {
        if (main.a.A != null) {
            return;
        }
        this.b.b(n2);
        if (!this.b.f().equals("")) {
            this.d = cq2;
            c = true;
        }
        this.b();
    }

    public final void l() {
        this.b.e();
        if (jy.b && main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public final void a(Graphics graphics) {
        if (jy.b) {
            jy.a(graphics, this.ac, this.ad, this.ae);
        } else {
            super.a(graphics);
        }
        this.b.a(graphics);
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class hb
extends gs {
    private String[] a;
    private dx b = new dx();
    private ii c;
    private Image d;
    private int e;
    private int f;

    public hb() {
        this.b.e = false;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 120: {
                main.a.v = null;
                return;
            }
        }
        main.a.r.a(n2, n3);
    }

    public final void a(Image image) {
        this.d = image;
        this.f += image.getHeight();
        this.b();
    }

    public final String a() {
        return this.b.f();
    }

    public final void b() {
        this.b.a = main.a.o - this.b.c / 2;
        this.b.b = main.a.n - (main.a.n - main.a.ae[0].b + 5) - this.b.d - 8;
    }

    public final void a(String object, int n2, int n3) {
        this.a((String)object, n3);
        this.ad = new by(kf.z, n2);
        object = this;
        main.a.v = object;
        this.b.a(true);
    }

    private void a(String object, int n2) {
        this.d = null;
        this.e = main.a.m - 40;
        this.f = 70 * gy.Y;
        if (main.a.K.a((String)object) + 20 < this.e) {
            this.e = main.a.K.a((String)object) + 20;
        }
        if (this.e < main.a.m / 2) {
            this.e = main.a.m / 2;
        }
        this.a = main.a.K.a((String)object, this.e - 20);
        this.b = new dx();
        this.b.e = false;
        this.b.c = this.e - 10;
        this.b();
        this.b.a("");
        this.b.d(n2);
        this.ac = new by(kf.d, 120);
        object = this;
        main.a.v = object;
    }

    public final void a(String object, ii ii2, int n2) {
        this.a((String)object, n2);
        this.c = ii2;
        this.ad = new by(kf.z, this.c);
        object = this;
        main.a.v = object;
    }

    public final void a(Graphics graphics) {
        main.a.c(graphics);
        main.a.S.a(graphics, main.a.o - this.e / 2, main.a.n - this.f - (main.a.n - main.a.ae[0].b + 5), this.e, this.f, 0);
        int n2 = main.a.n - this.f - (main.a.n - main.a.ae[0].b + 5) + (this.f - this.b.d - 8) / 2 - (this.a.length >> 1) * gy.ah - gy.ah / 2;
        if (this.d != null) {
            graphics.drawImage(this.d, main.a.o, this.b.b - this.d.getHeight() / 2 - 5 * gy.Y, 3);
            n2 -= this.d.getHeight() / 2;
        }
        int n3 = 0;
        while (n3 < this.a.length) {
            main.a.K.a(graphics, this.a[n3], main.a.o, n2, 2);
            ++n3;
            n2 += gy.ah;
        }
        this.b.a(graphics);
        if (jy.b) {
            main.a.c(graphics);
            main.a.S.c(graphics);
            main.a.S.b(graphics, this.ac, this.ad, this.ae);
            return;
        }
        super.a(graphics);
    }

    public final void d(int n2) {
        this.b.b(n2);
    }

    public final void l() {
        this.b.e();
        if (this.b.d()) {
            this.ae = this.b.a();
        }
        if (jy.b && main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }
}


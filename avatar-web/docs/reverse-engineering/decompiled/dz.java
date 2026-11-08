/*
 * Decompiled with CFR 0.152.
 */
public final class dz
extends ai {
    public static boolean r = false;
    public static dr s;
    public static byte t;
    public static short u;

    static {
        t = 0;
        u = (short)-1;
    }

    public dz() {
    }

    public dz(int n2, byte by2) {
        super(0, 0, n2, by2);
        t = (byte)(t + 1);
    }

    public final void a() {
        int n2 = ir.e - go.x - go.w - 5;
        this.a((go.w + 3) * 24 + (aw.e(n2 * 6) << 2), 48 + (aw.e(30) << 2));
    }

    public final void d() {
        if (u == -1) {
            this.f = false;
            return;
        }
        if (!this.i || this.f) {
            return;
        }
        this.f = true;
    }

    public final void c() {
        this.n = new dr();
        this.g();
    }

    public final void g() {
        if (this.f) {
            this.G = 2;
            dr dr2 = s;
            dz dz2 = this;
            this.n = dr2;
            return;
        }
        dr dr3 = new dr(288 + (aw.e(126) << 2), 24 + (aw.e(36) << 2));
        dz dz3 = this;
        this.n = dr3;
    }

    public final void h() {
        if (!this.f && aw.d(2) == 0) {
            this.e = 200;
        }
        if (this.f && aw.a(dz.s.a, dz.s.b, this.aw, this.ax) < 18) {
            this.f = false;
            this.i = false;
            this.e = 200;
            go.b();
            go.a(u, this.w);
        }
        super.h();
    }
}


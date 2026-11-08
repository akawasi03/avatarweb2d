/*
 * Decompiled with CFR 0.152.
 */
public final class dt
extends ai {
    public static dr r;
    public static dr s;
    public static byte t;
    public static byte u;
    public static short v;

    static {
        t = 0;
        u = (byte)5;
        v = (short)-1;
    }

    public dt() {
    }

    public dt(int n2, byte by2) {
        super(0, 0, n2, by2);
        t = (byte)(t + 1);
    }

    public final void a() {
        this.a(go.C.a + 48 + (aw.e((go.w - 2) * 6) << 2), go.C.b + 24 + (aw.e(12) << 2));
    }

    public final void c() {
        this.n = new dr();
        if (!this.f) {
            dr dr2 = new dr(go.C.a + 12 + (aw.e(go.w * 6) << 2), go.C.b + 12 + (aw.e(18) << 2));
            dt dt2 = this;
            this.n = dr2;
            return;
        }
        dt dt3 = this;
        dt dt4 = dt3;
        dr dr3 = r;
        dt4 = dt3;
        dt3.n = dr3;
    }

    public final void d() {
        if (!this.i || this.f) {
            return;
        }
        if (v != -1) {
            this.f = true;
        }
    }

    public final void h() {
        super.h();
        if (this.f && aw.f(dt.r.a - this.aw) < 20 && aw.f(dt.r.b - this.ax) < 15) {
            this.f = false;
            this.i = false;
            go.b();
            go.a(v, this.w);
        }
        this.e = 100 + 50 * (this.k - 50);
    }
}


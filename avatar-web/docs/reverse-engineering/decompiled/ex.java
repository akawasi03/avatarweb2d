/*
 * Decompiled with CFR 0.152.
 */
public final class ex
extends is {
    public static int r = 0;
    public static dr s;

    public ex(int n2, byte by2, byte by3) {
        super(0, 0, n2, by2);
        this.t = 0;
        this.u = 0;
        ++r;
    }

    public final void a() {
        this.n = new dr();
        if (this.t == this.w) {
            this.C = this.n.a = (go.w + 3) * 24 + ex.j();
            this.aw = this.n.a;
            this.D = this.n.b = 72 + (aw.e(24) << 2);
            this.ax = this.n.b;
            return;
        }
        this.c();
        if (!ir.b(this.aw, this.ax)) {
            dr dr2 = new dr((go.w + 3) * 24 + ex.j(), 72 + (aw.e(24) << 2));
            ex ex2 = this;
            this.n = dr2;
        }
        this.aw = this.C = this.n.a;
        this.ax = this.D = this.n.b;
    }

    private static int j() {
        int n2 = ir.e - go.x - go.w - 5;
        return aw.e(n2 * 6) << 2;
    }

    public final void a(dr object) {
        dr dr2 = new dr(((dr)object).a - 48 + ex.j(), ((dr)object).b - 48 + (aw.e(24) << 2));
        object = this;
        this.n = dr2;
    }

    public final void g() {
        super.g();
    }
}


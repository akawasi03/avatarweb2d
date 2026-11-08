/*
 * Decompiled with CFR 0.152.
 */
import main.GameMidlet;
import main.a;

final class gf
implements ii {
    private final hx a;
    private final int b;
    private final int c;
    private final int d;

    gf(ae ae2, hx hx2, int n2, int n3, int n4) {
        this.a = hx2;
        this.b = n2;
        this.c = n3;
        this.d = n4;
    }

    public final void a() {
        ld ld2 = fx.a(this.a.a);
        if (!(this.b != GameMidlet.i.w || fx.c((int)ld2.j) && this.c == 0)) {
            main.a.a(kf.es[this.c], new gd(this, this.c, this.d, this.a));
        }
    }
}


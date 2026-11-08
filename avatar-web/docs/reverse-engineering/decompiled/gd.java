/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class gd
implements ii {
    private final int a;
    private final int b;
    private final hx c;

    gd(gf gf2, int n2, int n3, hx hx2) {
        this.a = n2;
        this.b = n3;
        this.c = hx2;
    }

    public final void a() {
        if (this.a == 2) {
            cx.a().a(1, this.b, this.c.a);
        } else if (this.a == 3) {
            cx.a().a(0, this.b, this.c.a);
        } else {
            cx.a().a(this.c.a, (byte)this.a);
        }
        main.a.i();
    }
}


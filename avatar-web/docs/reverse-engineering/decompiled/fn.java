/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class fn
implements ii {
    private final dx[] a;

    fn(iq iq2, dx[] dxArray) {
        this.a = dxArray;
    }

    public final void a() {
        if (this.a[0].f().equals("")) {
            main.a.b("B\u1ea1n ch\u01b0a nh\u1eadp t\u00ean");
            return;
        }
        if (this.a[1].f().equals("") || this.a[2].f().equals("")) {
            main.a.b("B\u1ea1n ch\u01b0a nh\u1eadp m\u1eadt kh\u1ea9u");
            return;
        }
        if (!this.a[1].f().equals(this.a[2].f())) {
            main.a.b("Hai m\u1eadt kh\u1ea9u kh\u00f4ng gi\u1ed1ng nhau");
            return;
        }
        main.a.A = null;
        cx.a().c(this.a[0].f().toLowerCase(), this.a[1].f().toLowerCase(), this.a[3].f());
    }
}


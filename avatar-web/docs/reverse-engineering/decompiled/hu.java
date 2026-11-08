/*
 * Decompiled with CFR 0.152.
 */
import main.GameMidlet;
import main.a;

final class hu
implements ii {
    private final hd a;

    hu(ir ir2, hd hd2) {
        this.a = hd2;
    }

    public final void a() {
        if (this.a.a != -1) {
            cx.a().e(this.a.a);
            main.a.i();
            return;
        }
        if (this.a.d != null && !this.a.d.equals("")) {
            GameMidlet.b(this.a.d);
            return;
        }
        GameMidlet.a(this.a.e, this.a.f);
    }
}


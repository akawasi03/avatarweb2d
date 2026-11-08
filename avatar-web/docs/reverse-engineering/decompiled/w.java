/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class w
implements ii {
    private go a;
    private final ai b;

    w(go go2, ai ai2) {
        this.a = go2;
        this.b = ai2;
    }

    public final void a() {
        boolean bl2 = false;
        int n2 = 0;
        while (n2 < go.d.size()) {
            dc dc2 = (dc)go.d.elementAt(n2);
            az az2 = go.b(dc2.a);
            if (az2.e == 6) {
                it.a().b(go.b, this.b.w, dc2.a);
                bl2 = true;
                this.a.d(10, -1);
                break;
            }
            ++n2;
        }
        if (!bl2) {
            go.b().a(8, -1);
            main.a.b(kf.ea);
        }
    }
}


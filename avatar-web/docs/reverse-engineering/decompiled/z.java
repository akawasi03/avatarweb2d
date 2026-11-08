/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class z
implements ii {
    private go a;
    private final ai b;

    z(go go2, ai ai2) {
        this.a = go2;
        this.b = ai2;
    }

    public final void a() {
        boolean bl2 = false;
        int n2 = 0;
        while (n2 < go.d.size()) {
            dc dc2 = (dc)go.d.elementAt(n2);
            if (dc2.a == 121) {
                az az2 = go.b(dc2.a);
                go.a(this.a, az2, dc2.a, this.b);
                bl2 = true;
                break;
            }
            ++n2;
        }
        if (!bl2) {
            main.a.b(kf.dW);
            go.b().a(8, -1);
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class ab
implements ii {
    private go a;
    private final ai b;

    ab(go go2, ai ai2) {
        this.a = go2;
        this.b = ai2;
    }

    public final void a() {
        boolean bl2 = false;
        ad ad2 = gb.c(this.b.k);
        int n2 = 0;
        while (n2 < go.d.size()) {
            int n3;
            dc dc2 = (dc)go.d.elementAt(n2);
            az az2 = go.b(dc2.a);
            if (az2.d == ad2.c && az2.e == 5 && (n3 = dc2.e) > 0) {
                bl2 = true;
                this.b.i = false;
                go.b();
                go.a(az2.a, this.b.w);
                this.a.d(10, -1);
            }
            ++n2;
        }
        if (!bl2) {
            main.a.b(kf.dY);
            this.a.a(8, -1);
        }
    }
}


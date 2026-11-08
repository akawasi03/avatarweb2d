/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class an
implements ii {
    private final hf a;

    an(go go2, hf hf2) {
        this.a = hf2;
    }

    public final void a() {
        int n2 = 0;
        while (n2 < this.a.e.length) {
            dc dc2;
            String string = "";
            if (this.a.e[n2] < 100) {
                dc2 = go.g(this.a.e[n2]);
                if (this.a.e[n2] < 50) {
                    string = gb.b((int)this.a.e[n2]).a;
                } else if (gb.c((int)this.a.e[n2]).c == 1) {
                    string = String.valueOf(kf.bn) + " " + gb.c((int)this.a.e[n2]).l;
                } else if (gb.c((int)this.a.e[n2]).c == 2) {
                    string = String.valueOf(kf.bm) + " " + gb.c((int)this.a.e[n2]).l;
                }
            } else {
                dc2 = go.f(this.a.e[n2]);
                string = go.b((int)this.a.e[n2]).f;
            }
            if (dc2 == null || dc2.e < this.a.f[n2]) {
                main.a.b(String.valueOf(kf.eI) + string);
                return;
            }
            ++n2;
        }
        it.a().d(this.a.a);
        dp.b().d();
    }
}


/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class ep
implements ii {
    private go a;
    private final az b;
    private final short c;
    private final ai d;

    ep(go go2, az az2, short s2, ai ai2) {
        this.a = go2;
        this.b = az2;
        this.c = s2;
        this.d = ai2;
    }

    public final void a() {
        if (this.b.e == 4) {
            go.a(this.a, (byte)4, (int)this.c);
            ir.p = this.d;
            this.a.M = (ai)ir.p;
            this.a.M.p = true;
            this.a.M.q = main.a.j();
        }
        it.a().b(go.b, this.d.w, this.c);
    }
}


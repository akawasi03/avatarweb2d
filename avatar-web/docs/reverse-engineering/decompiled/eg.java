/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;

final class eg
implements ii {
    private eh a;
    private final ld b;
    private final int c;
    private final Vector d;
    private final Vector e;
    private final hx f;
    private final int g;

    eg(eh eh2, ld ld2, int n2, Vector vector, Vector vector2, hx hx2, int n3) {
        this.a = eh2;
        this.b = ld2;
        this.c = n2;
        this.d = vector;
        this.e = vector2;
        this.f = hx2;
        this.g = n3;
    }

    public final void a() {
        cx.a().a((int)this.b.g, this.c);
        this.d.removeElementAt(dp.j);
        this.e.removeElement(this.f);
        if (this.g == 0) {
            if (cd.b().c) {
                cd.b();
                cd.g();
                return;
            }
            eh eh2 = this.a;
            eh2.a.q();
            return;
        }
        ei.b().h();
    }
}


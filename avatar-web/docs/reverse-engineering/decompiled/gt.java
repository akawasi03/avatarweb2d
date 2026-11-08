/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class gt
implements ii {
    private ld a;
    private short b;
    private int c;
    private String d;
    private int e;
    private int f;
    private ae g;

    public gt(ae ae2, ld ld2, short s2, int n2, String string, int n3, int n4) {
        this.g = ae2;
        this.a = ld2;
        this.b = s2;
        this.e = n2;
        this.d = string;
        this.c = n3;
        this.f = n4;
    }

    public final void a() {
        if (this.e == 100) {
            main.a.a(kf.cP, new kw(this.g, this.b));
            return;
        }
        if (this.e == 26) {
            main.a.h();
            ae.b().e(this.b);
            dp.b().d();
            return;
        }
        ld ld2 = this.a;
        if (this.a.g == -1) {
            ld2 = fx.a(this.b);
        }
        if (this.c == -1 || this.e == 17 || this.e == 18) {
            ae.b(ld2);
            return;
        }
        main.a.a(this.d, new eq(this.g, this.c, this.e, this.f));
    }
}


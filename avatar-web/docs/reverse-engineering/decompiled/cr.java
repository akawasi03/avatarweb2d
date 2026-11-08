/*
 * Decompiled with CFR 0.152.
 */
final class cr
implements ii {
    private ei a;
    private final ag b;
    private final String c;

    cr(ei ei2, ag ag2, String string) {
        this.a = ei2;
        this.b = ag2;
        this.c = string;
    }

    public final void a() {
        kq kq2 = new kq(1, ei.d(this.a) * 24, ei.e(this.a) * 24, 1, this.b.a);
        iy.a().a(kq2);
        ei.a(this.a, this.c);
    }
}


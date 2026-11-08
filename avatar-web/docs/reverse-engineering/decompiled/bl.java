/*
 * Decompiled with CFR 0.152.
 */
final class bl
implements ii {
    private q a;
    private final byte b;

    bl(q q2, byte by2) {
        this.a = q2;
        this.b = by2;
    }

    public final void a() {
        int n2 = q.a.a("" + this.b);
        if (n2 == -1) {
            cx.a().a(this.b);
        } else {
            q.a.a((byte[])q.a(this.a).elementAt(n2));
        }
        this.a.b = 1;
    }
}


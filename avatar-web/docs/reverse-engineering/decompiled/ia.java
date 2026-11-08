/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;

final class ia
implements ii {
    final cy a;
    private final String b;
    private final String[] c;
    private final int d;
    private final byte e;
    private final byte[] f;

    ia(cy cy2, String string, String[] stringArray, int n2, byte by2, byte[] byArray) {
        this.a = cy2;
        this.b = string;
        this.c = stringArray;
        this.d = n2;
        this.e = by2;
        this.f = byArray;
    }

    public final void a() {
        Vector<by> vector = new Vector<by>();
        if (!cy.a(this.a) && this.b.equals(cy.h)) {
            vector.addElement(new by(kf.f, 50));
        }
        int n2 = 0;
        while (n2 < this.c.length) {
            int n3 = n2;
            vector.addElement(new by(this.c[n2], new ib(this, this.d, this.e, this.f, n3)));
            ++n2;
        }
        le.a().a(vector, 0);
    }
}


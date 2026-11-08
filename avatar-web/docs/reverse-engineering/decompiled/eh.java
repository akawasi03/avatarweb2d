/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.a;

final class eh
implements ii {
    final ae a;
    private final Vector b;
    private final int c;
    private final int d;

    eh(ae ae2, Vector vector, int n2, int n3) {
        this.a = ae2;
        this.b = vector;
        this.c = n2;
        this.d = n3;
    }

    public final void a() {
        Object object;
        Vector<Object> vector = new Vector<Object>();
        int n2 = 0;
        while (n2 < this.b.size()) {
            object = (hx)this.b.elementAt(n2);
            ld ld2 = fx.a(((hx)object).a);
            if (ld2 != null && ld2.j != 30 && ld2.j != 40) {
                vector.addElement(object);
            }
            ++n2;
        }
        if (dp.j >= vector.size()) {
            return;
        }
        hx hx2 = (hx)vector.elementAt(dp.j);
        object = fx.a(hx2.a);
        if (!fx.c((int)((ld)object).j) || this.c == 1) {
            main.a.a(kf.cp, new eg(this, (ld)object, this.c, vector, this.b, hx2, this.d));
        }
    }
}


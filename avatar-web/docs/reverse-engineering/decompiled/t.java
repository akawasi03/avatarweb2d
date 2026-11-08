/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class t
extends by {
    private dc f;
    private final int g;

    t(go go2, String string, int n2, int n3, int n4) {
        super(string, 13, n3);
        this.g = n4;
        this.f = (dc)go.d.elementAt(n4);
    }

    public final void a(Graphics graphics, int n2, int n3) {
        az az2 = go.b(this.f.a);
        az2.a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 0, 3);
    }

    public final void a() {
        if (dp.n && this.g == dp.j - go.p().size()) {
            dp.n();
            az az2 = go.b(this.f.a);
            dp.a(az2.f);
            az2 = go.b(this.f.a);
            int n2 = this.f.e;
            if (az2.d == 4) {
                n2 -= go.j[1].size();
            } else if (az2.d == 1) {
                n2 -= go.j[0].size();
            }
            dp.a(String.valueOf(kf.ay) + n2);
        }
    }
}


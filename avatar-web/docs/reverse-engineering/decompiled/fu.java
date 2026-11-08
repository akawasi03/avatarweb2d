/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class fu
extends by {
    private final int f;

    fu(go go2, String string, int n2, int n3, int n4) {
        super(string, 7, n3);
        this.f = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        gb.b[this.f].a(graphics, 7, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }

    public final void a() {
        if (this.f == dp.j && dp.n) {
            dp.n();
            dp.a(String.valueOf(gb.b[this.f].k) + "(" + gb.b[this.f].e + kf.bq + ")");
            dp.a(String.valueOf(kf.az) + main.a.a(gb.b[this.f].g[0], (int)gb.b[this.f].g[1], false));
            dp.a(String.valueOf(kf.em[2]) + ": " + gb.b[this.f].m);
            if (gb.b[this.f].l) {
                az az2 = go.b(gb.b[this.f].j);
                dp.a(String.valueOf(kf.dP) + ": " + az2.f);
            }
            dp.a(String.valueOf(kf.dQ) + ": " + main.a.b(gb.b[this.f].i));
            dp.a(ae.r());
        }
    }
}


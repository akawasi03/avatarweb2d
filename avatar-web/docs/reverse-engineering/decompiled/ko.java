/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class ko
extends by {
    private int f = 0;
    private dc g;

    public ko(go go2, String string, ii ii2, int n2, dc dc2) {
        super(string, ii2);
        this.f = n2;
        this.g = dc2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        if (this.g.a < 50) {
            gb.b((int)this.g.a).a(graphics, 7, n2 + dp.e / 2, n3 + dp.e / 2, 3);
            return;
        }
        fx.a(graphics, gb.c((int)this.g.a).h, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }

    public final void a() {
        if (this.f == dp.j) {
            dp.n();
            short cfr_ignored_0 = this.g.a;
            dp.a(this.g.f);
            dp.a(String.valueOf(kf.ay) + this.g.e);
            dp.a(String.valueOf(kf.aK) + main.a.b(this.g.d[0] * this.g.e) + kf.T);
            dp.a(ae.r());
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class fy
extends by {
    private final ad f;
    private final int g;

    fy(go go2, String string, int n2, int n3, ad ad2, int n4) {
        super(string, 8, n3);
        this.f = ad2;
        this.g = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        fx.a(graphics, this.f.g, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }

    public final void a() {
        if (this.g == dp.j - gb.b.length && dp.n) {
            dp.n();
            dp.a(String.valueOf(this.f.l) + "(" + this.f.d + kf.bq + ")");
            dp.a(String.valueOf(kf.az) + main.a.a(this.f.e[0], this.f.e[1], false));
            dp.a(this.f.m);
            dp.a(ae.r());
        }
    }
}


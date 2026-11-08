/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

final class fe
extends by {
    private final dc f;
    private final int g;

    fe(ae ae2, String string, ii ii2, dc dc2, int n2) {
        super(string, ii2);
        this.f = dc2;
        this.g = n2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        fx.a[this.f.b].a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }

    public final void a() {
        if (this.g == dp.j || dp.k) {
            dp.n();
            dp.a(this.f.f);
            dp.a(String.valueOf(kf.az) + this.f.d[0] + kf.T);
            dp.a(String.valueOf(kf.ce) + main.a.b(GameMidlet.i.a[0]) + kf.T);
        }
    }
}


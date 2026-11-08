/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class d
extends by {
    private final dc f;
    private final int g;

    d(go go2, String string, int n2, int n3, dc dc2, int n4) {
        super(string, 12, n3);
        this.f = dc2;
        this.g = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        gb.b((int)this.f.a).a(graphics, 7, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }

    public final void a() {
        if (this.g == dp.j) {
            dp.n();
            dp.a(this.f.f);
            dp.a(String.valueOf(kf.ay) + this.f.e);
        }
    }
}


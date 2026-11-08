/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class h
extends by {
    private final az f;
    private final int g;

    h(go go2, String string, int n2, int n3, az az2, int n4) {
        super(string, 9, n3);
        this.f = az2;
        this.g = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        this.f.a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 0, 3);
    }

    public final void a() {
        if (this.g == dp.j) {
            dp.n();
            dp.a(this.f.f);
            dp.a(String.valueOf(kf.az) + main.a.a(this.f.g, this.f.h, false));
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class j
extends by {
    private final az f;
    private final int g;
    private final dc h;

    j(go go2, String string, int n2, int n3, az az2, int n4, dc dc2) {
        super(string, 11, n3);
        this.f = az2;
        this.g = n4;
        this.h = dc2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        this.f.a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 0, 3);
    }

    public final void a() {
        if (dp.n && this.g == dp.j - go.f.size()) {
            dp.n();
            dp.a(this.f.f);
            dp.a(String.valueOf(kf.ay) + this.h.e);
            if (this.f.h > 0) {
                dp.a(String.valueOf(kf.aK) + main.a.b(this.h.e * this.f.h) + kf.T);
            } else if (this.f.g > 0) {
                dp.a(String.valueOf(kf.aK) + main.a.b(this.h.e * this.f.g) + kf.T);
            }
            dp.a(ae.r());
        }
    }
}


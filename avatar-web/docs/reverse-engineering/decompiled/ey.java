/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class ey
extends by {
    private int f;
    private int g;
    private km h;

    public ey(ae ae2, String string, ku ku2, int n2, km km2, int n3) {
        super(string, ku2);
        this.f = n2;
        this.h = km2;
        this.g = n3;
    }

    public final void a() {
        if (dp.n && dp.j - this.g == this.f) {
            dp.n();
            dp.a(String.valueOf(kf.aA) + this.h.c);
            dp.a(String.valueOf(kf.az) + this.h.d + (this.h.e == 0 ? kf.C : kf.D));
        }
    }

    public final void a(Graphics graphics, int n2, int n3) {
        fx.a(graphics, this.h.b, n2 + dp.e / 2, n3 + dp.e / 2, 3);
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public final class lb
extends ld {
    public short a;

    public final void b(Graphics graphics, int n2, int n3, int n4, int n5) {
        Object object = (fa)fx.a(this.f);
        if (this.h == ((fa)object).c[0]) {
            object = fx.a[((fa)object).c[0]];
            graphics.drawRegion(fx.a((int)this.a).e, ((ke)object).c * gy.Y, ((ke)object).d * gy.Y, ((ke)object).e * gy.Y, ((ke)object).f * gy.Y, 0, n2, n3, n5);
            return;
        }
        ((ld)object).a(graphics, n2, n3, n5);
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        fa fa2 = (fa)fx.a(this.f);
        ke ke2 = fx.a[fa2.c[n2]];
        fx.a(graphics, this.a, ke2.c, ke2.d, ke2.e, ke2.f, n3 + fa2.d[n2] * gy.Y - (n5 == gx.J ? (fa2.d[n2] * gy.Y << 1) + ke2.e * gy.Y : 0), n4 + fa2.e[n2] * gy.Y, n5, 0);
    }
}


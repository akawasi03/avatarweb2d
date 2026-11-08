/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public final class fa
extends ld {
    public byte a;
    public byte b;
    public short[] c;
    public byte[] d;
    public byte[] e;

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        if (this.g != -1) {
            if (this.g >= 2000) {
                f f2 = fx.b(this.c[n2]);
                if (f2.d != -1) {
                    graphics.drawRegion(f2.a, 0, 0, (int)f2.b, (int)f2.c, n5, n3 + this.d[n2] * gy.Y - (n5 == gx.J ? (this.d[n2] * gy.Y << 1) + f2.b : 0), n4 + this.e[n2] * gy.Y, 0);
                    return;
                }
            } else {
                ke ke2 = fx.a[this.c[n2]];
                fx.a(graphics, ke2.b, ke2.c, ke2.d, ke2.e, ke2.f, n3 + this.d[n2] * gy.Y - (n5 == gx.J ? (this.d[n2] * gy.Y << 1) + ke2.e * gy.Y : 0), n4 + this.e[n2] * gy.Y, n5, 0);
            }
        }
    }
}


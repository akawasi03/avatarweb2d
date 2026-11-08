/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public abstract class ld {
    public short f;
    public short g;
    public short h;
    public int[] i = new int[2];
    public byte j;
    public byte k;
    public String l;

    public final void a(Graphics graphics, int n2, int n3, int n4) {
        if (this.g != -1) {
            if (this.g >= 2000) {
                int n5 = n4;
                boolean bl2 = false;
                int n6 = n3;
                n4 = n2;
                n3 = this.h;
                Graphics graphics2 = graphics;
                ld ld2 = this;
                f f2 = fx.b((short)n3);
                if (f2.d != -1 || ld2.g == -1) {
                    graphics2.drawRegion(f2.a, 0, 0, (int)f2.b, (int)f2.c, 0, n4, n6, n5);
                }
                return;
            }
            fx.a[this.h].a(graphics, n2, n3, n4);
        }
    }

    public void b(Graphics graphics, int n2, int n3, int n4, int n5) {
        this.a(graphics, n2, n3, n5);
    }

    public void a(Graphics graphics, int n2, int n3, int n4, int n5) {
    }
}


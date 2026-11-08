/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;

public final class al {
    public byte[] a;
    public ke[] b;
    public Image c;
    public jf[] d;
    public short e;

    public final void a(Graphics graphics, int n2, int n3, int n4) {
        jf jf2 = this.d[this.a[n4]];
        int n5 = 0;
        while (n5 < jf2.b.length) {
            ke ke2;
            al al2;
            block3: {
                byte by2 = jf2.a[n5];
                al2 = this;
                int n6 = 0;
                while (n6 < al2.b.length) {
                    if (al2.b[n6].a == by2) {
                        ke2 = al2.b[n6];
                        break block3;
                    }
                    ++n6;
                }
                ke2 = null;
            }
            al2 = ke2;
            graphics.drawRegion(this.c, ((ke)((Object)al2)).c * gy.Y, ((ke)((Object)al2)).d * gy.Y, ((ke)((Object)al2)).e * gy.Y, ((ke)((Object)al2)).f * gy.Y, 0, n2 * gy.Y + jf2.b[n5] * gy.Y, n3 * gy.Y + jf2.c[n5] * gy.Y, 0);
            ++n5;
        }
    }
}


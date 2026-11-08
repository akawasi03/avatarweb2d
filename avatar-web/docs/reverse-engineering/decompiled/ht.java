/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;

public final class ht {
    public int a;
    public int b;
    public int c;
    public Image d;

    public ht(Image image, int n2, int n3) {
        this.d = image;
        this.a = n2;
        this.b = n3;
        this.c = image.getHeight() / n3;
    }

    public static ht a(String string, int n2, int n3) {
        return new ht(c.a(string), n2, n3);
    }

    public final void a(int n2, int n3, int n4, int n5, int n6, Graphics graphics) {
        if (n2 >= 0 && n2 < this.c) {
            graphics.drawRegion(this.d, 0, n2 * this.b, this.a, this.b, n5, n3, n4, n6);
        }
    }

    public final void a(int n2, int n3, int n4, int n5, Graphics graphics) {
        graphics.drawRegion(this.d, 0, n2 * this.b, this.a, this.b, n5, n3, n4, 0);
    }

    public final void b(int n2, int n3, int n4, int n5, Graphics graphics) {
        if (n2 >= 0 && n2 < this.c) {
            graphics.drawRegion(this.d, n2 * this.a, n3 * this.b, this.a, this.b, 0, n4, n5, 0);
        }
    }

    public final void b(int n2, int n3, int n4, int n5, int n6, Graphics graphics) {
        if (n2 >= 0 && n2 < this.c) {
            graphics.drawRegion(this.d, n2 * this.a, n3 * this.b, this.a, this.b, 0, n4, n5, n6);
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class fh {
    private int e;
    public int a;
    public int b;
    public int c;
    private int f;
    private static short g;
    public String[] d;
    private static ht[] h;
    private static Image[] i;
    private byte j = 0;

    static {
        h = new ht[2];
        i = new Image[2];
        c.b(kf.aw);
        g = (short)8;
        fh.h[0] = ht.a("c", g, g);
        fh.h[1] = ht.a("cB", g, g);
        fh.i[0] = c.a("ar");
        fh.i[1] = c.a("ara");
        c.a();
    }

    public fh() {
    }

    public fh(int n2, String string, byte by2) {
        this.j = by2;
        this.a(n2, string);
    }

    public final void a(int n2, int n3) {
        this.a = n2;
        this.b = n3;
    }

    public final boolean a() {
        if (this.e > 0) {
            --this.e;
        }
        if (this.e == 0) {
            return true;
        }
        fh fh2 = this;
        if (main.a.r == kx.i) {
            if (fh2.b - fh2.c < 0) {
                fh2.b = fh2.c + 10;
            }
            if (fh2.a - 30 < 0) {
                fh2.a = 32;
            }
            if (fh2.a + 30 > main.a.m) {
                fh2.a = main.a.m - 40;
            }
        }
        return false;
    }

    public final void a(int n2, String string) {
        this.f = 80 * gy.Y;
        this.d = main.a.N.a(string, this.f - 25);
        this.c = gy.af * this.d.length + 4 + 4;
        if (this.c < g << 1) {
            this.c = g << 1;
        }
        if (this.d.length == 1) {
            this.f = main.a.N.a(this.d[0]) + 20;
        }
        if (this.f < 30 * gy.Y) {
            this.f = 30 * gy.Y;
        }
        this.e = n2;
    }

    public final void a(Graphics graphics) {
        int n2 = gy.Y;
        if (main.a.r == kx.i) {
            n2 = 1;
        }
        fh.a(graphics, this.a * n2 - this.f / 2, this.b * n2 - this.c, this.f, this.c, this.j == 1 ? 0xFFF1CC : 0xFFFFFF, this.j == 1 ? 14957056 : 1, this.j);
        graphics.drawImage(i[this.j], this.a * n2, this.b * n2 - 1, 17);
        byte by2 = gy.af;
        int n3 = 0;
        while (n3 < this.d.length) {
            main.a.N.a(graphics, this.d[n3], this.a * n2 - this.f / 2 + this.f / 2, this.b * n2 - this.c / 2 + n3 * by2 - this.d.length * by2 / 2, 2);
            ++n3;
        }
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6, int n7, byte by2) {
        h[by2].a(0, n2, n3, 0, graphics);
        h[by2].a(1, n2 + n4 - g, n3, 0, graphics);
        h[by2].a(3, n2, n3 + n5 - g, 0, graphics);
        h[by2].a(2, n2 + n4 - g, n3 + n5 - g, 0, graphics);
        graphics.setColor(n6);
        graphics.fillRect(n2 + g, n3, n4 - (g << 1), (int)g);
        graphics.fillRect(n2 + g, n3 + n5 - g, n4 - (g << 1), g - 1);
        graphics.fillRect(n2, n3 + g, n4, n5 - (g << 1));
        graphics.setColor(n7);
        graphics.fillRect(n2 + g, n3, n4 - (g << 1), 1);
        graphics.fillRect(n2 + g, n3 + n5 - 1, n4 - (g << 1), 1);
        graphics.fillRect(n2, n3 + g, 1, n5 - (g << 1));
        graphics.fillRect(n2 + n4 - 1, n3 + g, 1, n5 - (g << 1));
    }
}


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

public abstract class hj
extends gy {
    public static int al = 20;
    public static Image am;
    public static Image an;
    public static Image ao;
    public static Image ap;
    public static Image aq;
    public int ar = 0;
    public static int as;
    public static int at;
    public static int au;
    public static int av;
    public static final int[] aw;
    public static final int[] ax;

    static {
        as = 0;
        at = 20;
        aw = new int[]{0x494949, 0x2F2F2F};
        ax = new int[]{14400144, 12689526};
    }

    public void a(int n2, boolean bl2) {
        this.ar = n2;
    }

    public void a(boolean bl2) {
        this.aj = bl2;
    }

    public void a() {
        a.e();
        a.r = this;
        a.a.setFullScreenMode(true);
    }

    public void a(Graphics graphics) {
        if (a.t == null && a.v == null && a.A == null && !im.c) {
            super.a(graphics);
        } else {
            a.c(graphics);
        }
        if (!kt.a().b()) {
            a.M.a(graphics, "2.5.8", a.af.a, a.af.b, a.af.c);
        } else if (a.r == ez.a || a.r == ea.a) {
            a.M.a(graphics, String.valueOf(kt.a().k), a.af.a, a.af.b, a.af.c);
        }
        a.S.a(graphics);
    }

    public void b(Graphics graphics) {
    }

    public abstract void k();

    public void d(int n2) {
    }

    public void d() {
    }

    public static void z() {
        Graphics graphics;
        int n2 = a.n + a.T;
        if (an == null) {
            an = Image.createImage((int)a.m, (int)n2);
        }
        Graphics graphics2 = graphics = an.getGraphics();
        if (a.r == ek.a) {
            ek.a.c(graphics);
            return;
        }
        if (a.r == kd.a || a.r == kg.a) {
            int n3 = a.m < n2 ? n2 / 10 : a.m / 10;
            int n4 = 0;
            while (n4 < n3) {
                graphics.setColor(6629892);
                graphics.drawRect(a.o - n4 * n3 - 1, n2 / 2 - n4 * n3, n4 * n3 << 1, n4 * n3 << 1);
                graphics.setColor(13399567);
                graphics.drawRect(a.o - n4 * n3, n2 / 2 - n4 * n3 + 1, n4 * n3 << 1, n4 * n3 << 1);
                ++n4;
            }
        }
    }
}


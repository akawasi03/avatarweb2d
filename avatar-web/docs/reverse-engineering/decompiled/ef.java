/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class ef {
    private int b;
    private int c;
    int a;
    private int d;

    public ef(int n2, int n3, int n4, int n5) {
        this.b = n2;
        this.c = n3;
        this.a = n4;
        this.d = n5;
    }

    public final void a(Graphics graphics) {
        Object object = fx.c((short)(main.a.m > 200 ? 870 : 871));
        if (((f)object).d != -1) {
            graphics.drawRegion(((f)object).a, 0, this.d * ja.c, ja.b, ja.c, 0, this.b, this.c, 3);
            object = main.a.O;
            if (main.a.m <= 200) {
                object = main.a.Q;
            }
            if (main.a.Z > 0) {
                object = main.a.K;
            }
            object.a(graphics, String.valueOf(this.a), this.b, this.c - gy.ah / 2, 2);
        }
    }
}


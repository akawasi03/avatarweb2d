/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class ki
extends ha {
    public String a;
    public byte b;
    private int g = 200;
    private int h = (short)(gy.ah * 11);
    public int c;
    public int d;
    public int e;
    public int f;

    public ki() {
        this.ac = cz.b().b;
    }

    public final void a(Graphics graphics) {
        main.a.S.a(graphics, (main.a.m - this.g) / 2, (main.a.n - this.h) / 2, this.g, this.h, je.d[2], je.d[3], 1);
        graphics.translate((main.a.m - this.g) / 2, (main.a.n - this.h) / 2);
        int n2 = 0 + gy.ah;
        main.a.K.a(graphics, String.valueOf(cz.b().n), this.g / 2, n2 - gy.ah / 2 - 2 * gy.Y, 2);
        main.a.K.a(graphics, "Th\u00fa \u0111ua chi\u1ebfn th\u1eafng", this.g / 2, n2 += gy.ah / 2 + 2 * gy.Y, 2);
        main.a.L.a(graphics, this.a, this.g / 2, n2 += gy.ah + 6 * gy.Y, 2);
        n2 += gy.ah << 1;
        int n3 = 0;
        while (n3 < 6) {
            if (this.b == cz.b().c[n3].w) {
                f f2 = fx.c(cz.b().c[n3].c);
                if (f2.d != -1) {
                    int n4 = f2.c / 5;
                    graphics.drawRegion(f2.a, 0, cz.m[0][0] * n4, (int)f2.b, n4, 0, this.g / 2, n2 + gy.ah / 2, 3);
                }
            }
            ++n3;
        }
        n2 += gy.ah / 2;
        main.a.K.a(graphics, "Ti\u1ec1n c\u01b0\u1ee3c: ", 10, n2 += gy.ah, 0);
        main.a.Q.a(graphics, "" + this.c, this.g - 20, n2 + gy.ah / 2 - gy.ai / 2, 1);
        main.a.K.a(graphics, "Ti\u1ec1n \u0103n: ", 10, n2 += gy.ah, 0);
        main.a.Q.a(graphics, "" + this.d, this.g - 20, n2 + gy.ah / 2 - gy.ai / 2, 1);
        main.a.K.a(graphics, "Ti\u1ec1n thu\u1ebf: ", 10, n2 += gy.ah, 0);
        main.a.Q.a(graphics, "" + this.e, this.g - 20, n2 + gy.ah / 2 - gy.ai / 2, 1);
        main.a.K.a(graphics, "Ti\u1ec1n nh\u1eadn \u0111\u01b0\u1ee3c: ", 10, n2 += gy.ah, 0);
        main.a.Q.a(graphics, "" + this.f, this.g - 20, n2 + gy.ah / 2 - gy.ai / 2, 1);
        super.a(graphics);
    }
}


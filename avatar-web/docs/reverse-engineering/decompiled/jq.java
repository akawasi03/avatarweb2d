/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class jq
extends by {
    private final hn f;
    private final byte g;
    private final byte h;
    private final int i;
    private final short j;

    jq(kv kv2, String string, int n2, hn hn2, byte by2, byte by3, int n3, short s2) {
        super(null, 0);
        this.f = hn2;
        this.g = by2;
        this.h = by3;
        this.i = n3;
        this.j = s2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        main.a.c(graphics);
        n2 = je.o + (gy.Z << 1) + 10 * gy.Y + 30 * (gy.Y - 1) + dp.b;
        n3 = gy.ah;
        this.f.a(graphics, main.a.m / 2, n2, false);
        main.a.K.a(graphics, String.valueOf(kf.aA) + this.f.x, main.a.m / 2, n2 + n3, 2);
        main.a.K.a(graphics, String.valueOf(kf.em[3]) + this.g + " (" + this.h + "%)", main.a.m / 2, n2 + (n3 << 1), 2);
        main.a.K.a(graphics, String.valueOf(kf.cC) + this.i, main.a.m / 2, n2 + n3 * 3, 2);
        main.a.K.a(graphics, String.valueOf(kf.cD) + ": ", main.a.m / 2, n2 + (n3 << 2), 2);
        if (this.j != -1) {
            iw iw2 = (iw)fx.a(this.j);
            iw2.a(graphics, main.a.m / 2, n2 + n3 * 6, 3);
        }
    }
}


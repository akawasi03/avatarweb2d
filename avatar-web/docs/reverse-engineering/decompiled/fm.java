/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class fm
extends by {
    private final String f;
    private final hn g;
    private final hn h;
    private final short i;
    private final byte j;
    private final byte k;
    private final String l;

    fm(ae ae2, String string, ii ii2, String string2, hn hn2, hn hn3, short s2, byte by2, byte by3, String string3) {
        super(string, null);
        this.f = string2;
        this.g = hn2;
        this.h = hn3;
        this.i = s2;
        this.j = by2;
        this.k = by3;
        this.l = string3;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        n2 = 15 * gy.Y;
        main.a.K.a(graphics, this.f, dp.c / 2 - 7, n2, 2);
        this.g.a(graphics, dp.c / 4 - 7, n2 += this.g.aA + main.a.K.a() + 15 * gy.Y, true);
        this.h.a(graphics, dp.c / 4 * 3 - 7, n2, true);
        f f2 = fx.c(this.i);
        if (f2.d != -1) {
            graphics.drawImage(f2.a, dp.c / 2 - 7, n2 - this.g.aA / 2, 3);
            if (this.j > 0) {
                main.a.N.a(graphics, "lv" + this.j + "+" + this.k + "%", dp.c / 2 - 7, n2, 2);
                ae.a(graphics, "", dp.c / 2 - 8, n2 += main.a.N.a(), (int)this.k);
            }
        }
        main.a.K.a(graphics, this.l, dp.c / 2 - 7, (n2 += main.a.N.a() << 1) - 5, 2);
    }

    public final void a() {
        this.h.b();
    }
}


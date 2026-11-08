/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class e
extends by {
    private ae f;
    private final ld g;
    private final byte h;

    e(ae ae2, String string, ii ii2, ld ld2, byte by2) {
        super(string, ii2);
        this.f = ae2;
        this.g = ld2;
        this.h = by2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        this.g.b(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 0, 3);
    }

    public final void a() {
        if (this.h == dp.j) {
            dp.n();
            ae.a(this.g);
            String string = "";
            if (this.g.j == 20) {
                string = kf.aC;
            } else if (this.g.j == 10) {
                string = kf.aB;
            } else if (this.g.j == 40) {
                string = kf.aE;
            } else if (this.g.j == 50) {
                string = kf.aD;
            }
            string = String.valueOf(string) + fx.a(this.g);
            dp.a(string);
            dp.a(main.a.a(this.g.i[0], this.g.i[1], true));
            dp.a(String.valueOf(kf.dx) + fx.b(this.g));
            dp.a(String.valueOf(kf.em[0]) + ae.C.v);
        }
    }
}


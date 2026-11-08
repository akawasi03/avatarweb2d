/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class aq
extends by {
    private final hf f;
    private final int g;

    aq(go go2, String string, ii ii2, hf hf2, int n2) {
        super(string, ii2);
        this.f = hf2;
        this.g = n2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        Object object = go.b(this.f.b);
        gb.a(graphics, ((az)object).b, n2 + dp.e / 2, n3 + dp.e / 2, 3);
        graphics.translate(0, ho.i);
        graphics.setClip(0, 0, 5 * dp.e, dp.d);
        if (this.g == dp.j) {
            n2 = 0;
            while (n2 < this.f.e.length) {
                dc dc2;
                if (this.f.e[n2] < 50) {
                    dc2 = go.g(this.f.e[n2]);
                    gb.b((int)this.f.e[n2]).a(graphics, 7, dp.c / 2 - this.f.e.length * 30 * gy.Y / 2 + n2 * 30 * gy.Y + 15 * (gy.Y - 1), (dp.e << 1) + 25 * gy.Y + (gy.af << 2) + 10 * (gy.Y - 1), 3);
                } else if (this.f.e[n2] < 100) {
                    dc2 = go.g(this.f.e[n2]);
                    object = gb.c(this.f.e[n2]);
                    fx.a(graphics, ((ad)object).h, dp.c / 2 - this.f.e.length * 30 * gy.Y / 2 + n2 * 30 * gy.Y + 15 * (gy.Y - 1), (dp.e << 1) + 25 * gy.Y + (gy.af << 2) + 10 * (gy.Y - 1), 3);
                } else {
                    dc2 = go.f(this.f.e[n2]);
                    object = go.b(this.f.e[n2]);
                    gb.a(graphics, ((az)object).b, dp.c / 2 - this.f.e.length * 30 * gy.Y / 2 + n2 * 30 * gy.Y + 15 * (gy.Y - 1), (dp.e << 1) + 25 * gy.Y + (gy.af << 2) + 10 * (gy.Y - 1), 3);
                }
                object = main.a.N;
                if (dc2 == null || dc2.e < this.f.f[n2]) {
                    object = main.a.M;
                }
                object.a(graphics, String.valueOf(this.f.f[n2]), dp.c / 2 - this.f.e.length * 30 * gy.Y / 2 + n2 * 30 * gy.Y - 1 + 15 * (gy.Y - 1), (dp.e << 1) + 25 * gy.Y + (gy.af << 2) + 8 * gy.Y + 10 * (gy.Y - 1), 2);
                if (n2 != this.f.e.length - 1) {
                    main.a.N.a(graphics, "+", dp.c / 2 - this.f.e.length * 30 * gy.Y / 2 + n2 * 30 * gy.Y + 15 * gy.Y + 15 * (gy.Y - 1), (dp.e << 1) + 25 * gy.Y + (gy.af << 2) + 10 * (gy.Y - 1), 2);
                }
                ++n2;
            }
        }
        graphics.setClip(0, 0, 5 * dp.e, dp.f * dp.e - dp.l);
        graphics.translate(0, -ho.i);
    }

    public final void a() {
        if (this.g == dp.j) {
            dp.n();
            dp.a(this.f.d);
            dp.a(String.valueOf(kf.eM) + this.f.c + "p");
            az az2 = go.b(this.f.b);
            if (az2.g > 0) {
                dp.a(String.valueOf(kf.eJ) + main.a.b(az2.g) + kf.T);
            } else if (az2.h > 0) {
                dp.a(String.valueOf(kf.eJ) + main.a.b(az2.h) + kf.T);
            }
            dp.a(kf.eK);
        }
    }
}


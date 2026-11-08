/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

final class fj
extends by {
    private final hn f;
    private final gr g;
    private final bc h;

    fj(String string, ii ii2, hn hn2, gr gr2, bc bc2) {
        super(null, null);
        this.f = hn2;
        this.g = gr2;
        this.h = bc2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        block9: {
            String string;
            StringBuffer stringBuffer;
            Graphics graphics2;
            cs cs2;
            block10: {
                block8: {
                    this.f.a(graphics, dp.c / 2, 37 * gy.Y, true);
                    if (this.g != null) {
                        this.g.a(graphics, dp.c / 2 + 15 * gy.Y, 37 * gy.Y, this.f.W);
                    }
                    n2 = 40 * gy.Y;
                    n3 = 15 * gy.Y;
                    main.a.N.a(graphics, String.valueOf(kf.aA) + this.f.x, 0, n2, 0);
                    if (this.f.w != GameMidlet.i.w) break block8;
                    if (GameMidlet.j.g <= 0 && GameMidlet.j.f <= 0) break block9;
                    cs2 = main.a.N;
                    graphics2 = graphics;
                    stringBuffer = new StringBuffer(String.valueOf(kf.em[0])).append(GameMidlet.j.g).append(" + ").append(GameMidlet.j.f);
                    string = "%";
                    break block10;
                }
                if (this.f.v <= 0 && this.f.r <= 0) break block9;
                cs2 = main.a.N;
                graphics2 = graphics;
                stringBuffer = new StringBuffer(String.valueOf(kf.em[0])).append(this.f.v).append(" + ");
                string = this.f.r > 0 ? String.valueOf(this.f.r) + "%" : "";
            }
            cs2.a(graphics2, stringBuffer.append(string).toString(), 0, n2 += n3, 0);
        }
        if (this.f.u > 0 || this.f.s > 0) {
            main.a.N.a(graphics, String.valueOf(kf.em[1]) + this.f.u + " + " + (this.f.s > 0 ? String.valueOf(this.f.s) + "%" : ""), 0, n2 += n3, 0);
        }
        int n4 = 0;
        if (this.h.c > 125 * gy.Y) {
            this.h.a(100 * gy.Y);
            if (this.h.d >= 0) {
                n4 = this.h.d;
            }
        }
        main.a.N.a(graphics, this.h.a, 0 - n4, n2 += n3, 0);
        if (ae.u) {
            main.a.N.a(graphics, String.valueOf(kf.dE) + this.f.a[3] + kf.l(), 0, n2 + n3, 0);
        }
    }
}


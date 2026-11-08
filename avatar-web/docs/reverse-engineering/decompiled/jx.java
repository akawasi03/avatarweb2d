/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

final class jx
extends by {
    private ld f;
    private short g;
    private int h;
    private int i;
    private ae j;

    public jx(ae ae2, String string, gt gt2, ld ld2, short s2, int n2, int n3, int n4) {
        super(string, gt2);
        this.j = ae2;
        this.f = ld2;
        this.g = s2;
        this.h = n2;
        this.i = n3;
    }

    public final void a() {
        if (dp.n && this.h == dp.j) {
            ld ld2 = this.f;
            if (this.f.g == -1) {
                ld2 = fx.a(this.g);
            }
            if (ld2.g != -1) {
                ae.a(ld2);
                dp.n();
                dp.a(ld2.l);
                if (this.i == -1) {
                    dp.a(main.a.a(ld2.i[0], ld2.i[1], false));
                }
                if (ld2.f == -1) {
                    dp.a(String.valueOf(kf.em[0]) + ((fa)ld2).a);
                }
                dp.a(String.valueOf(kf.ao) + GameMidlet.i.c);
                if (ae.u) {
                    dp.a(String.valueOf(kf.dE) + GameMidlet.i.a[3] + " " + kf.k());
                }
            }
        }
    }

    public final void a(Graphics graphics, int n2, int n3) {
        ld ld2 = this.f;
        if (this.f.g == -1) {
            ld2 = fx.a(this.g);
        }
        if (ld2.g != -1) {
            ld2.a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 3);
        }
    }
}


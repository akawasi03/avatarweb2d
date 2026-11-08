/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

final class id
extends by {
    private int f = 0;
    private String g;
    private String h;
    private short i;
    private short j;
    private int k;

    public id(ei ei2, String string, ii ii2, int n2, String string2, short s2, short s3, String string3, int n3, String string4, short s4) {
        super(string, ii2);
        this.f = n2;
        this.g = string2;
        this.i = s2;
        this.h = string3;
        this.k = n3;
        this.j = s4;
    }

    public final void a() {
        if (dp.n && this.f == dp.j) {
            dp.n();
            ld ld2 = GameMidlet.i.d == 1 ? fx.a(this.i) : fx.a(this.j);
            if (ld2.g != -1) {
                if (GameMidlet.i.d == 1) {
                    ae.b();
                    ae.a(ld2);
                } else {
                    ae.b();
                    ae.a(ld2);
                }
            }
            dp.a(this.g);
            if (this.h != null) {
                dp.a(this.h);
            }
            if (this.k >= 0) {
                dp.a(String.valueOf(kf.az) + main.a.b(this.k) + " Tim");
            }
        }
    }

    public final void a(Graphics graphics, int n2, int n3) {
        ld ld2 = GameMidlet.i.d == 1 ? fx.a(this.i) : fx.a(this.j);
        ld2.b(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 0, 3);
    }
}


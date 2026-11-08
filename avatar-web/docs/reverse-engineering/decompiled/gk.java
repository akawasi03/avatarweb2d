/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class gk
extends by {
    private final ag f;
    private final int g;
    private final String h;
    private final String i;

    gk(ei ei2, String string, ii ii2, ag ag2, int n2, String string2, String string3) {
        super(string, ii2);
        this.f = ag2;
        this.g = 90;
        this.h = string2;
        this.i = string3;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        fx.a(graphics, this.f.b, n2, n3 + this.g / 2 - gy.af - gy.ah - 5, 33);
        main.a.N.a(graphics, this.h, n2, n3 + this.g / 2 - gy.af, 2);
        main.a.K.a(graphics, this.i, n2, n3 + this.g / 2 - gy.af - gy.ah, 2);
    }
}


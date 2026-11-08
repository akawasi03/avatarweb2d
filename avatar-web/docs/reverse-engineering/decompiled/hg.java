/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class hg
extends by {
    private az f;

    public hg(go go2, String string, ii ii2, az az2) {
        super(string, ii2);
        this.f = az2;
    }

    public hg(go go2, String string, int n2, int n3, az az2) {
        super(string, 6, n3);
        this.f = az2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        this.f.a(graphics, n2, n3, 0, 3);
    }
}


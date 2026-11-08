/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class gl
extends by {
    private final int f;

    gl(ei ei2, String string, int n2, int n3, int n4) {
        super(string, 17, n3);
        this.f = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        ir.c.a(this.f, n2 + 1, n3 + 1, 0, 3, graphics);
    }
}


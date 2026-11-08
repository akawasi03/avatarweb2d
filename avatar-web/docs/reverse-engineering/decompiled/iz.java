/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class iz
extends by {
    private final int f;

    iz(cd cd2, String string, int n2, int n3) {
        super(string, n2);
        this.f = n3;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        le.f.b(this.f / le.f.c, this.f % le.f.c, n2, n3, 3, graphics);
    }
}


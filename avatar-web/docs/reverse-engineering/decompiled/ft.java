/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class ft
extends jt {
    private final dn a;

    ft(go go2, dn dn2) {
        this.a = dn2;
    }

    public final void a(Graphics graphics) {
        je.a(this.a.aw * gy.Y, this.a.ax * gy.Y, this.a.d, this.a.e, 5921542, graphics);
    }

    public final void a() {
        if (this.a.ax < this.a.g) {
            this.a.aw += this.a.c;
            this.a.ax += this.a.b;
            ++this.a.b;
            return;
        }
        this.a.c = 0;
        this.a.b = 0;
    }
}


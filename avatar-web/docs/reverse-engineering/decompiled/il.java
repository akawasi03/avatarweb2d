/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class il {
    private static il a;
    private int b;
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private boolean h = false;

    public static il a() {
        if (a == null) {
            a = new il();
            return a;
        }
        return a;
    }

    public final void a(int n2, int n3) {
        if (n2 < n3) {
            this.h = true;
            return;
        }
        this.h = false;
        this.c = n2;
        this.b = n3;
        this.d = n3 * n3 / n2;
        if (this.d <= 0) {
            this.d = 1;
        }
    }

    public final void b(int n2, int n3) {
        this.f = n2;
        this.g = n3;
        if (!this.h && (aw.f(n3 - n2) > 5 || main.a.y.n != 0 || main.a.y.p)) {
            n3 = this.c * 100 / 100;
            n2 = n2 * 100 / n3;
            n3 = this.b * 100 / 100;
            this.e = n2 * n3;
        }
    }

    public final void a(Graphics graphics, int n2, int n3) {
        if (!this.h && (aw.f(this.g - this.f) > 5 || main.a.y.n != 0 || main.a.y.p)) {
            graphics.setColor(6201499);
            graphics.setClip(n2 - 1, -1, 6, this.b + 2);
            graphics.fillRect(n2, 0 + this.e / 100, 4, this.d);
        }
    }
}


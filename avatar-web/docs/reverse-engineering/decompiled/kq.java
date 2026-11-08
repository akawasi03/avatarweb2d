/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class kq
extends cc {
    public short a;
    public short b;
    public byte c;
    public boolean d = false;

    public kq() {
    }

    public kq(int n2, int n3, int n4, int n5, short s2) {
        this.f = (byte)n2;
        this.aw = n3;
        this.ax = n4;
        this.a = (short)n5;
        this.b = s2;
    }

    public final void a(Graphics graphics) {
        ag ag2 = this.d ? ir.f(this.b) : fx.b((int)this.b);
        if (!this.d && ir.a != 68 && ir.a != 69 && ir.a != 70 && ir.a != 110) {
            ke ke2 = fx.a[ag2.b];
            if ((this.aw + ag2.e + ke2.e) * js.ay < do.a().a || (this.aw + ag2.e - ke2.e) * js.ay > do.a().a + main.a.m || (this.ax + ke2.f) * js.ay < do.a().b || (this.ax + ag2.f - ke2.f) * js.ay > do.a().b + main.a.n) {
                return;
            }
            boolean bl2 = false;
            byte by2 = this.c;
            int n2 = (this.ax + ag2.f) * js.ay;
            int n3 = (this.aw + ag2.e) * js.ay;
            ag2 = graphics;
            ke ke3 = ke2;
            ag2.drawRegion(fx.a((int)ke3.b).e, ke3.c * gy.Y, ke3.d * gy.Y, ke3.e * gy.Y, ke3.f * gy.Y, by2, n3, n2, 0);
            return;
        }
        boolean bl3 = false;
        int n4 = (this.ax + ag2.f) * js.ay;
        int n5 = (this.aw + ag2.e) * js.ay;
        short s2 = ag2.b;
        ag2 = graphics;
        kq kq2 = this;
        f f2 = fx.c(s2);
        if (n5 + f2.b < do.a().a || n5 > do.a().a + main.a.m || n4 + f2.c < do.a().b || n4 > do.a().b + main.a.n) {
            return;
        }
        if (f2.d != -1) {
            ag2.drawRegion(f2.a, 0, 0, f2.b, f2.c, kq2.c, n5, n4, 0);
        }
    }

    public final void b() {
    }
}


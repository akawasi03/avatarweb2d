/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class jo
extends gx {
    public short a;
    public short b = 0;
    public short c = 0;
    public int d;
    public byte e;
    private byte f;

    public jo() {
        this.az = (byte)6;
        this.f = 0;
    }

    public final void b() {
        block3: {
            block2: {
                al al2 = fx.d(this.a);
                if (al2 == null) break block2;
                this.f = (byte)(this.f + 1);
                if (this.f < al2.a.length) break block3;
            }
            this.a();
        }
    }

    public final void a(Graphics graphics) {
        if (main.a.Z > 0 && main.a.r == cd.b()) {
            return;
        }
        al al2 = fx.d(this.a);
        if (al2 != null) {
            if (this.e == 0) {
                hn hn2 = ir.g(this.d);
                if (hn2 != null) {
                    this.aw = hn2.aw + this.b;
                    this.ax = hn2.ax + this.c;
                } else {
                    this.a();
                    return;
                }
            }
            al2.a(graphics, this.aw, this.ax, this.f);
        }
    }

    private void a() {
        switch (this.e) {
            case 0: {
                ir.m.removeElement(this);
                return;
            }
            case 1: {
                ir.l.removeElement(this);
                return;
            }
            case 2: {
                ir.v.removeElement(this);
                return;
            }
            case 3: {
                ir.w.removeElement(this);
            }
        }
    }
}


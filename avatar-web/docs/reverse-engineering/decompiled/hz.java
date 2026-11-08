/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class hz
extends cc {
    private String a;
    private byte b;
    private byte c = 0;

    public hz(String string, int n2, int n3) {
        this.az = (byte)8;
        this.aw = n2;
        this.ax = n3;
        this.a = string;
        this.b = (byte)aw.e(8);
    }

    public final void b() {
        this.b = (byte)(this.b + 1);
        if (this.b >= 8) {
            this.b = 0;
        }
    }

    public final void a(Graphics graphics) {
        if (dm.b().b[1] == 1 || main.a.D != null) {
            return;
        }
        if (this.aw * js.ay < do.a().a || this.aw * js.ay > do.a().a + main.a.m || this.ax * js.ay < do.a().b || this.ax * js.ay > do.a().b + main.a.n + 10 || main.a.r == cd.b()) {
            return;
        }
        graphics.drawImage(ir.r, this.aw * js.ay, this.ax * js.ay, 3);
        if (ea.b().b != null) {
            ea.b().b.a(0, this.aw * js.ay, (this.ax - 10 + this.b / 2) * js.ay, 0, 33, graphics);
        }
        main.a.Q.a(graphics, this.a, this.aw * js.ay, (this.ax - 32 + this.b / 2) * js.ay, 2);
    }
}


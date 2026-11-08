/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class ks
extends cc {
    private Image a;

    public ks(int n2, int n3, int n4, int n5) {
        super(n2, n3, n4, 0);
        c.b(kf.at);
        this.a = c.a("" + n2);
        if (this.a != null) {
            this.a.getWidth();
        }
        c.a();
    }

    public final void b() {
    }

    public final void a(Graphics graphics) {
        if (this.a == null) {
            this.g = fx.c((short)((short)this.f)).b;
            fx.a(graphics, this.f, this.aw * js.ay, this.ax * js.ay, 33);
        } else {
            graphics.drawImage(this.a, this.aw * js.ay, this.ax * js.ay, 33);
        }
        if (this.f == 846) {
            main.a.N.a(graphics, String.valueOf(ae.c), this.aw * js.ay, this.ax * js.ay - 30 * js.ay, 2);
            return;
        }
        if (this.f == 1029 && go.V != 0) {
            int n2;
            Object object = gb.b(go.V);
            object = go.b(((hf)object).b);
            String string = "";
            int n3 = go.U / 3600;
            if (n3 > 0) {
                string = String.valueOf(n3) + ":";
            }
            if ((n2 = (go.U - n3 * 3600) / 60) > 0 || n3 > 0) {
                string = String.valueOf(string) + n2 + ":";
            }
            n3 = go.U - n3 * 3600 - n2 * 60;
            string = String.valueOf(string) + n3;
            if (go.U == 0) {
                string = "hoan thanh";
            }
            go.W = this.aw - main.a.Q.a(string) / 2 / js.ay;
            go.X = this.ax - fx.c((short)((short)this.f)).c / js.ay - 10;
            gb.a(graphics, ((az)object).b, this.aw * js.ay - main.a.Q.a(string) / 2, this.ax * js.ay - fx.c((short)((short)this.f)).c - 10 * js.ay, 3);
            main.a.Q.a(graphics, string, this.aw * js.ay - main.a.Q.a(string) / 2 + 10 * js.ay, this.ax * js.ay - fx.c((short)((short)this.f)).c - 10 * js.ay - gy.ai / 2 + 2, 0);
        }
    }
}


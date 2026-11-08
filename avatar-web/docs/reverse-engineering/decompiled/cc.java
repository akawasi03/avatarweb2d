/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public class cc
extends js {
    public int f;
    public short g;

    public cc() {
        this.az = 1;
    }

    public cc(int n2, int n3, int n4, int n5) {
        this.az = 1;
        this.f = n2;
        this.aw = n3;
        this.ax = n4;
        this.g = (short)n5;
    }

    public void a(Graphics graphics) {
        if (this.f < 0 && (this.aw * js.ay + this.g / 2 < do.a().a || this.aw * js.ay - this.g / 2 > do.a().a + a.m)) {
            return;
        }
        int n2 = this.aw * js.ay;
        int n3 = this.ax * js.ay;
        switch (this.f) {
            case 0: {
                fx.a(graphics, 243, n2, n3, 33);
                return;
            }
            case -2: {
                if (go.E != -1) {
                    go.t.a(go.F, n2, n3, GameMidlet.i.K == gx.J ? 2 : 0, 3, graphics);
                }
                return;
            }
            case -10: 
            case -3: {
                graphics.drawImage(go.m, n2, n3, 40);
                return;
            }
            case -5: {
                go.r.a(0, n2, n3, 0, 3, graphics);
                if (dt.v != -1) {
                    go.r.a(2, n2, n3, 0, 3, graphics);
                }
                return;
            }
            case -6: {
                go.s.a(0, n2, n3, 0, 3, graphics);
                if (dz.u != -1) {
                    go.s.a(1, n2, n3, 0, 3, graphics);
                }
                return;
            }
            case -7: {
                cc.a(graphics, n2, n3, go.h);
                return;
            }
            case -8: {
                cc.a(graphics, n2, n3, go.g);
                return;
            }
            case -9: {
                if (a.D == null) break;
                graphics.drawImage(ir.r, n2, n3, 3);
                fx.a(graphics, 900, n2, n3 + a.D.a - 10, 33);
            }
        }
    }

    private static void a(Graphics graphics, int n2, int n3, Vector vector) {
        int n4 = 0;
        while (n4 < vector.size()) {
            dr dr2 = (dr)vector.elementAt(n4);
            if (dr2.a * js.ay == n2 && dr2.b * js.ay == n3) {
                ad ad2 = gb.c(dr2.c);
                if (ad2.i != -1) {
                    fx.a(graphics, ad2.i, n2, n3, 3);
                }
                int n5 = 0;
                while (n5 < go.i.size()) {
                    ai ai2 = (ai)go.i.elementAt(n5);
                    if (ai2.k == dr2.c && ai2.o > 0) {
                        fx.a(graphics, ad2.h, n2, n3, 3);
                        return;
                    }
                    ++n5;
                }
            }
            ++n4;
        }
    }
}


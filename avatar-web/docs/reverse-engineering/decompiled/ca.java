/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ca {
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private static byte h;
    private static byte i;
    public static dr a;
    public static boolean b;
    private static boolean j;
    private Image k;

    static {
        b = false;
        j = false;
    }

    public final void a(byte by2) {
        if (b || GameMidlet.i.H == -1) {
            return;
        }
        c.b(kf.at);
        this.k = c.a("839");
        c.a();
        i = by2;
        if (i == 1) {
            do.a().a = do.a().c = ca.a.a * gy.Y - main.a.o - 300;
        }
        this.d = ir.f * ir.i + (main.a.Z != 0 ? main.a.T : 0) / gy.Y + 20 * gy.Y;
        this.c = ca.a.a + 300;
        this.f = 15;
        this.e = 15;
        this.g = 0;
        h = 1;
        b = true;
        GameMidlet.i.b((byte)-1);
        do.f = true;
        j = false;
        if (i == 1) {
            GameMidlet.i.L = true;
        }
    }

    public final void a() {
        if ((h == 1 && i == 1 || h == -1 && i == -1) && i == -1 && !j) {
            cx.a().d(8);
            GameMidlet.i.L = true;
            j = true;
        }
        this.c -= this.e;
        this.g += aw.f(this.f - this.e / 2);
        if (this.g >= 20) {
            this.g = 0;
            this.e -= h;
            if (this.e == 0) {
                h = (byte)-1;
                this.f = 8;
                GameMidlet.i.a(this.c, ca.a.b);
                GameMidlet.i.b((byte)0);
                do.f = false;
                GameMidlet.i.L = false;
                if (main.a.I && kt.a().b()) {
                    if (ir.a == 9) {
                        main.a.D = new bb();
                        main.a.D.b();
                    } else if (i == 1 && ir.a == 25) {
                        main.a.D = new bb();
                        main.a.D.a(ae.a);
                    } else if (ir.a == 13 && bb.c < 8) {
                        main.a.D = new bb();
                        main.a.D.f();
                    } else if (i == 1 && ir.a == 23) {
                        main.a.D = new bb();
                        main.a.D.d();
                    }
                }
            }
        }
        if ((this.c + 58) * gy.Y < do.a().a) {
            b = false;
            if (i == -1) {
                main.a.i();
            }
        }
    }

    public final void a(Graphics graphics) {
        int n2 = 0;
        if (this.e > 1) {
            n2 = main.a.l % 6 < 3 ? 1 : 0;
        }
        graphics.drawImage(this.k, this.c * gy.Y, (this.d + n2) * gy.Y - this.k.getHeight(), 17);
    }
}


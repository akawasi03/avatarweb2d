/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class fz
extends by {
    private final hx f;
    private final int g;
    private final int h;

    fz(ae ae2, String string, ii ii2, hx hx2, int n2, int n3) {
        super(string, ii2);
        this.f = hx2;
        this.g = n2;
        this.h = n3;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        ld ld2 = fx.a(this.f.a);
        ld2.a(graphics, n2 + dp.e / 2, n3 + dp.e / 2, 3);
        je.a(n2 + 3, n3 + dp.e - 3 * gy.Y, dp.e - 5, 2 * gy.Y, 1, graphics);
        je.a(n2 + 3, n3 + dp.e - 3 * gy.Y, dp.e - 5 - this.f.b * (dp.e - 5) / 100, 2 * gy.Y, 11907085, graphics);
    }

    public final void a() {
        if (dp.n && this.g == dp.j) {
            ld ld2 = fx.a(this.f.a);
            dp.n();
            dp.a(String.valueOf(kf.cr) + (100 - this.f.b) + "%");
            String string = "";
            if (ld2.j == 20) {
                string = kf.aC;
            } else if (ld2.j == 10) {
                string = kf.aB;
            }
            string = String.valueOf(string) + fx.a(ld2);
            dp.a(string);
            if (this.f.c != null && !this.f.c.equals("")) {
                dp.a(this.f.c);
            }
            if (this.h == 0) {
                dp.a(String.valueOf(kf.em[2]) + ": " + fx.b(ld2));
                return;
            }
            if (ld2.f != -2) {
                byte by2 = ld2.f >= 0 ? ((fa)fx.a((short)ld2.f)).a : ((fa)ld2).a;
                dp.a(String.valueOf(kf.em[2]) + ": " + by2);
            }
        }
    }
}


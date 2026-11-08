/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class fk
extends by {
    private final kp f;

    fk(ae ae2, String string, ii ii2, kp kp2) {
        super(null, null);
        this.f = kp2;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        n2 = dp.c / 2 + 7;
        n3 = (dp.d - hj.at - (gy.Z << 1)) / 7;
        int n4 = n3 / 2 - ae.k.getHeight() / 2;
        ae.a(graphics, String.valueOf(kf.eu[0]) + this.f.g, n2, n4, (int)this.f.f);
        ae.a(graphics, kf.eu[1], n2, n4 += n3, (int)this.f.a);
        ae.a(graphics, kf.eu[2], n2, n4 += n3, (int)this.f.b);
        ae.a(graphics, kf.eu[3], n2, n4 += n3, (int)this.f.e);
        ae.a(graphics, kf.eu[4], n2, n4 += n3, (int)this.f.c);
        ae.a(graphics, kf.eu[5], n2, n4 + n3, (int)this.f.d);
    }
}


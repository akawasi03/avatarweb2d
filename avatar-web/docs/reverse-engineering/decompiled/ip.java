/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public final class ip
extends is {
    public static int r = 5;
    private dr s;
    private byte v = 0;

    public ip(int n2, byte by2, byte by3) {
        super(0, 0, n2, by2);
        this.t = 0;
        this.u = 1;
        this.az = (byte)7;
        this.s = new dr(-10, 0, aw.e(8));
    }

    public final void b() {
        if (this.s.c == 6 || this.s.a == -10) {
            this.s.a = this.aw + (this.d == 2 && this.K == 0 ? 3 : -3);
            this.s.b = this.ax + 2;
        }
        ++this.s.c;
        if (this.s.c > 17 * (3 - this.d) || this.v > 0) {
            this.s.c = 0;
        }
        ad ad2 = gb.c(this.k);
        this.m = ad2.k[this.H][this.y];
        int n2 = aw.e(100);
        if (n2 == 2 && this.v <= 0 && this.H == 0) {
            this.v = (byte)8;
        }
        if (this.v > 0) {
            this.m = (byte)(2 - this.v / 3 + 2);
            this.l = this.v = (byte)(this.v - 1);
            if (this.l >= 4) {
                this.l = (byte)(4 - this.v % 4);
            }
            this.l = (byte)(this.l + 5);
            this.l = -this.l;
        } else {
            this.l = 0;
        }
        super.b();
    }

    public final void a(Graphics graphics) {
        super.a(graphics);
        if (this.s.c < 16) {
            graphics.setColor(db.l[ir.j]);
            graphics.drawRoundRect((this.s.a - this.s.c / 2) * js.ay, (this.s.b - this.s.c / 4) * js.ay, this.s.c * js.ay, this.s.c / 2 * js.ay, this.s.c * js.ay, this.s.c * js.ay);
        }
    }

    public final void a() {
        this.n = new dr();
        this.C = this.n.a = go.D.a + aw.e(go.x - 1) * 24;
        this.aw = this.n.a;
        this.D = this.n.b = go.D.b + 12 + aw.e(2) * 24;
        this.ax = this.n.b;
        String cfr_ignored_0 = "777777777777777777777: " + this.aw + "   " + this.ax;
    }

    public final void g() {
        dr dr2 = new dr(go.D.a + 30 + aw.e(go.x - 2) * 24, go.D.b + 12 + aw.e(2) * 24);
        ip ip2 = this;
        this.n = dr2;
    }

    public final void a(dr object) {
        dr dr2 = new dr(((dr)object).a - 10 + aw.e(20), ((dr)object).b - 10 + aw.e(20));
        object = this;
        this.n = dr2;
    }

    public final boolean b(int n2, int n3) {
        if (this.H == -1) {
            this.E = 0;
            this.F = 0;
            return true;
        }
        if (this.H != 0 && this.H != 1) {
            this.E = 0;
            this.F = 0;
            return true;
        }
        this.H = 1;
        int n4 = this.C;
        int n5 = this.D;
        if (!ir.b(n4 + n2, n5 + n3)) {
            if (n2 != 0) {
                this.E = n2 > 0 ? this.G : -this.G;
            }
            if (n3 != 0) {
                this.F = n3 > 0 ? this.G : -this.G;
            }
            return false;
        }
        this.E = 0;
        this.F = 0;
        return true;
    }

    public final dn i() {
        dn dn2 = (dn)go.j[this.u].elementAt(aw.e(go.j[this.u].size()));
        if (ir.b(dn2.aw, dn2.ax) || dn2.b != 0) {
            return null;
        }
        return dn2;
    }
}


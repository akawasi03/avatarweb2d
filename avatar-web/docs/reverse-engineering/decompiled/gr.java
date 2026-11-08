/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class gr
extends ai {
    public hn r;
    private Vector t = new Vector();
    private int u;
    private int v;
    private int Q;
    private int R;
    private int S;
    private boolean T;
    public static Image[] s = new Image[2];
    private static final byte[][] U;

    static {
        byte[][] byArrayArray = new byte[3][];
        byArrayArray[0] = new byte[]{3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3};
        byte[] byArray = new byte[12];
        byArray[3] = 1;
        byArray[4] = 1;
        byArray[5] = 1;
        byArray[9] = 1;
        byArray[10] = 1;
        byArray[11] = 1;
        byArrayArray[1] = byArray;
        byArrayArray[2] = new byte[]{2, 2, 2, 3, 3, 3, 2, 2, 2, 3, 3, 3};
        U = byArrayArray;
    }

    public gr(hn object) {
        this.az = (byte)4;
        this.r = object;
        this.n = new dr();
        this.n.a = this.r.aw - 40 + aw.e(80);
        this.n.b = this.r.ax - 20 + aw.e(40);
        this.C = this.aw = this.n.a;
        this.D = this.ax = this.n.b;
        object = (fa)fx.a(this.r.V);
        this.Q = ((fa)object).a;
    }

    public final void g() {
        if (this.t.size() > 0) {
            dr dr2 = (dr)this.t.elementAt(0);
            this.n.a = dr2.a;
            this.n.b = dr2.b;
            this.t.removeElementAt(0);
        } else {
            int n2 = aw.e(20) - 10;
            if (aw.f(this.n.a + n2 - GameMidlet.i.aw) >= 35) {
                n2 = 0;
            }
            this.n.a += n2;
            this.n.b = this.ax;
        }
        if (this.n.a < 0) {
            this.n.a = 5;
            return;
        }
        if (this.n.a > ir.e * 24) {
            this.n.a = ir.e * 24 - 5;
            return;
        }
        if (this.n.b < 0) {
            this.n.b = 5;
            return;
        }
        if (this.n.b > ir.f * 24 - 24) {
            this.n.b = ir.f * 24 - 30;
        }
    }

    public final void c() {
        this.g();
    }

    public final void b() {
        int n2;
        if (main.a.l % (3 - this.Q) == 0) {
            ++this.y;
        }
        if (!false && this.H == 1 && this.ax == this.D && this.T) {
            if (this.S == 1) {
                ++this.R;
                if (this.R > 3) {
                    this.S = -1;
                }
            } else {
                --this.R;
                if (this.R < -3) {
                    this.S = 1;
                }
            }
        }
        if (this.y >= 12) {
            this.y = 0;
        }
        gr gr2 = this;
        if ((gr2.u != gr2.r.aw || gr2.v != gr2.r.ax) && (n2 = aw.a(gr2.u, gr2.v, gr2.r.aw, gr2.r.ax)) > 40) {
            n2 = 10 + aw.e(20);
            if (gr2.r.K == 0) {
                n2 = -(10 + aw.e(20));
            }
            if (ir.c(gr2.r.aw + n2, gr2.r.ax) != 80) {
                n2 = 0;
            }
            gr2.t.addElement(new dr(gr2.r.aw + n2, gr2.r.ax));
            gr2.u = gr2.r.aw + n2;
            gr2.v = gr2.r.ax;
        }
        if (this.H != 1) {
            if (this.e > 0) {
                if (this.y == 0) {
                    this.H = (byte)aw.e(3 + (this.Q << 1));
                    if (this.H != 2) {
                        this.H = 0;
                    } else {
                        this.K = (byte)aw.b(0, gx.J);
                    }
                    if (this.T) {
                        this.H = (byte)2;
                    }
                }
                --this.e;
                if (aw.a(this.aw, this.ax, this.r.aw, this.r.ax) > 35) {
                    super.h();
                    this.e = 0;
                    this.G = 4;
                }
                return;
            }
            gr2 = this;
            gr2.g();
            this.K = this.n.a > this.aw ? (byte)0 : gx.J;
            this.f();
            this.H = 1;
            return;
        }
        this.e();
    }

    public final void h() {
        super.h();
        this.e = 50 + aw.e(100);
        if (this.t.size() > 0) {
            gr gr2 = this;
            gr2.g();
            this.K = this.n.a > this.aw ? (byte)0 : gx.J;
            this.f();
            this.H = 1;
            this.e = 0;
            this.a = 1;
            this.G = 2 + this.Q;
            return;
        }
        this.G = 1 + aw.e(this.Q);
    }

    public final void a(Graphics graphics) {
        if ((this.aw + 15) * js.ay < do.a().a || (this.aw - 15) * js.ay > do.a().a + main.a.m || this.r.L || main.a.Z > 0 && main.a.r == cd.b()) {
            return;
        }
        fa fa2 = (fa)fx.a(this.r.V);
        if (fa2.g != -1) {
            if (fa2.g >= 2000) {
                f f2 = fx.b(fa2.c[U[this.H][this.y]]);
                if (f2.d != -1) {
                    if (!this.T && fa2.e[0] + f2.c < -10 && f2.c > 0) {
                        this.T = true;
                        this.S = 1;
                    }
                    graphics.drawImage(s[this.T ? 0 : 1], this.aw * js.ay, (this.ax - 1) * js.ay, 3);
                    graphics.drawRegion(f2.a, 0, 0, (int)f2.b, (int)f2.c, (int)this.K, this.aw * js.ay + fa2.d[U[this.H][this.y]] * js.ay - (this.K == gx.J ? (fa2.d[U[this.H][this.y]] * gy.Y << 1) + f2.b * gy.Y : 0), (this.ax + this.R) * js.ay + fa2.e[U[this.H][this.y]] * js.ay, 0);
                    return;
                }
            } else {
                ke ke2 = fx.a[fa2.c[U[this.H][this.y]]];
                if (!this.T && fa2.e[0] + ke2.f < -10 && ke2.f > 0) {
                    this.T = true;
                    this.S = 1;
                }
                graphics.drawImage(s[this.T ? 0 : 1], this.aw * js.ay, (this.ax - 1) * js.ay, 3);
                graphics.drawRegion(fx.a((int)ke2.b).e, ke2.c * js.ay, ke2.d * js.ay, ke2.e * js.ay, ke2.f * js.ay, (int)this.K, this.aw * js.ay + fa2.d[U[this.H][this.y]] * js.ay - (this.K == gx.J ? (fa2.d[U[this.H][this.y]] * gy.Y << 1) + ke2.e * gy.Y : 0), (this.ax + this.R) * js.ay + fa2.e[U[this.H][this.y]] * js.ay, 0);
            }
        }
    }

    public final void a(Graphics graphics, int n2, int n3, int n4) {
        fa fa2 = (fa)fx.a(this.r.V);
        if (fa2.g != -1) {
            int n5 = n3 + fa2.e[U[this.H][this.y]];
            je.a(n2 - 10, n5 - 10, 20, 3, 11381824, graphics);
            graphics.setColor(11072024);
            graphics.drawRect(n2 - 10, n5 - 10, 20, 3);
            je.a(n2 - 9, n5 - 9, n4 * 20 / 100, 2, 16644608, graphics);
            if (fa2.g >= 2000) {
                f f2 = fx.b(fa2.c[U[this.H][this.y]]);
                if (f2.d != -1) {
                    graphics.drawImage(s[this.T ? 0 : 1], n2, n3 - 1, 3);
                    graphics.drawRegion(f2.a, 0, 0, (int)f2.b, (int)f2.c, (int)this.K, n2 + fa2.d[U[this.H][this.y]] * js.ay - (this.K == gx.J ? (fa2.d[U[this.H][this.y]] * gy.Y << 1) + f2.b * gy.Y : 0), n5 + this.R, 0);
                    return;
                }
            } else {
                ke ke2 = fx.a[fa2.c[U[this.H][this.y]]];
                graphics.drawImage(s[this.T ? 0 : 1], n2, n3 - 1, 3);
                graphics.drawRegion(fx.a((int)ke2.b).e, ke2.c * js.ay, ke2.d * js.ay, ke2.e * js.ay, ke2.f * js.ay, (int)this.K, n2 + fa2.d[U[this.H][this.y]] * js.ay - (this.K == gx.J ? (fa2.d[U[this.H][this.y]] * gy.Y << 1) + ke2.e * gy.Y : 0), n5 + this.R, 0);
            }
        }
    }

    public final void e() {
        int n2 = this.G * this.r.W / 100;
        if (this.r.W >= 70) {
            n2 = this.G;
        }
        if (n2 <= 0) {
            n2 = 1;
        }
        int n3 = n2 * (this.a * aw.b(aw.c(this.b)) >> 10);
        n2 = -n2 * (this.a * aw.a(aw.c(this.b))) >> 10;
        this.aw = this.C + n3;
        this.ax = this.D + n2;
        n2 = aw.a(this.C, this.D, this.aw, this.ax);
        ++this.a;
        if (n2 > this.c) {
            this.h();
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public class gx
extends js {
    public int w;
    public String x = "";
    public int y;
    public byte z = (byte)7;
    public byte A;
    public byte B;
    public int C;
    public int D;
    public int E = 0;
    public int F = 0;
    public int G = 4;
    public byte H = 0;
    public static byte I = 0;
    public static byte J = (byte)2;
    public byte K = J;
    public boolean L = false;
    public boolean M = false;
    public short N = 0;
    public fh O;
    public Vector P = new Vector();

    public void a(Graphics graphics) {
        if (this.O != null && a.r != cd.b()) {
            this.O.a(graphics);
        }
    }

    public final void a(int n2, int n3) {
        this.aw = this.C = n2;
        this.ax = this.D = n3;
    }

    public void b() {
        if (this.O != null) {
            this.O.a(this.aw, this.ax - this.aA - 12);
            if (this.O.a()) {
                this.O = null;
                this.a();
            }
        }
    }

    private void a() {
        if (this.O == null && this.P.size() > 0) {
            this.O = (fh)this.P.elementAt(0);
            this.P.removeElementAt(0);
        }
    }

    public boolean b(int n2, int n3) {
        if (this.H == -1 || this.H == 14) {
            this.E = 0;
            this.F = 0;
            return true;
        }
        if (this.H != 10 && this.H != 2 && this.H != 4) {
            this.H = 0;
        }
        if (this.H != 0 && this.H != 1) {
            this.E = 0;
            this.F = 0;
            return true;
        }
        this.H = 1;
        int n4 = this.aw;
        int n5 = this.ax;
        if (this.az == 2) {
            n4 = this.C;
            n5 = this.D;
        }
        if (ir.b(n4 + n2, n5 + n3)) {
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

    public final boolean c(int n2, int n3) {
        if (this.H != 0 && this.H != 1) {
            return false;
        }
        int n4 = ir.c(this.aw + n2, this.ax + n3);
        if (n4 == 90) {
            return false;
        }
        n4 = this.aw;
        if (this.az == 0) {
            n4 += n2 < 0 ? -7 : 7;
        }
        if (n2 != 0) {
            int n5 = ir.c(n4 + n2, this.ax - 24);
            int n6 = ir.c(n4, this.ax - 24);
            if (n5 == 80 && n6 == 80) {
                this.F = -this.G;
                this.C = n4;
                ae.b().n();
                return true;
            }
            n2 = ir.c(n4 + n2, this.ax + 24);
            n3 = ir.c(n4, this.ax + 24);
            if (n2 == 80 && n3 == 80) {
                this.F = this.G;
                this.C = n4;
                ae.b().n();
                return true;
            }
        } else if (n3 != 0) {
            int n7 = ir.c(n4 - 24, this.ax + n3);
            int n8 = ir.c(n4 - 24, this.ax);
            if (n7 == 80 && n8 == 80) {
                this.E = -this.G;
                this.D = this.ax;
                ae.b().n();
                return true;
            }
            n2 = ir.c(n4 + 24, this.ax + n3);
            n3 = ir.c(n4 + 24, this.ax);
            if (n2 == 80 && n3 == 80) {
                this.E = this.G;
                this.D = this.ax;
                ae.b().n();
                return true;
            }
        }
        return false;
    }

    public void a(Graphics graphics, int n2, int n3, boolean bl2) {
    }

    public final void a(int n2, String string, byte by2) {
        this.P.addElement(new fh(n2, string, by2));
        this.a();
    }
}


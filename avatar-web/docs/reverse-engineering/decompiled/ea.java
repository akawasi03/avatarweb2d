/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Command
 *  javax.microedition.lcdui.CommandListener
 *  javax.microedition.lcdui.Display
 *  javax.microedition.lcdui.Displayable
 *  javax.microedition.lcdui.Form
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 *  javax.microedition.lcdui.Item
 *  javax.microedition.lcdui.TextField
 *  javax.microedition.midlet.MIDlet
 */
import java.util.Vector;
import javax.microedition.lcdui.Command;
import javax.microedition.lcdui.CommandListener;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Displayable;
import javax.microedition.lcdui.Form;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.lcdui.Item;
import javax.microedition.lcdui.TextField;
import javax.microedition.midlet.MIDlet;
import main.GameMidlet;
import main.a;

public final class ea
extends hj {
    public static ea a;
    private ht p;
    public ht b;
    private byte[] q;
    private Vector r;
    private byte s;
    private byte t;
    private byte u = (byte)16;
    public int c;
    public int d;
    private static Image v;
    private static Image w;
    public int e;
    private static int x;
    public static int f;
    private static int y;
    private static int z;
    private static int A;
    private static int B;
    public static int g;
    private static int C;
    private static int D;
    private static int E;
    public ii h;
    public static String i;
    private boolean F;
    public static boolean j;
    public static Image[] k;
    private static Vector G;
    private static ht H;
    public by l;
    private by I;
    private int J;
    private int K;
    private int L;
    private int M;
    boolean m = false;
    private int N;
    private int O;
    private long P;
    private long Q;
    public static ii n;
    public static byte o;

    static {
        j = false;
        k = new Image[2];
        G = new Vector();
    }

    public static ea b() {
        if (a == null) {
            a = new ea();
            return a;
        }
        return a;
    }

    public final void a() {
        super.a();
        if (!jn.a) {
            main.a.h();
        }
        if (ir.y != -1) {
            main.a.h();
        }
        this.ac = this.l;
        if (main.a.I) {
            main.a.D = new bb();
            main.a.D.a();
            this.ac = null;
        } else if (hj.as > 0 && o == 1) {
            hc.b().a(main.a.r);
        }
        if (main.a.J == 0) {
            main.a.J = 1;
        }
        main.a.B.removeAllElements();
        this.g();
        ae.G = -1;
    }

    public ea() {
        c.b(kf.aw);
        this.b = ht.a("up", 13 * gy.Y, 11 * gy.Y);
        c.a();
        c.b(kf.av);
        v = c.a("sIc");
        w = c.a("b_p");
        c.a();
        this.ac = this.l = new by(kf.c, 0);
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                if (main.a.D == null || !bb.d) {
                    Vector<by> vector = new Vector<by>();
                    if (n != null) {
                        vector.addElement(new by("\u0110\u0103ng k\u00fd", n));
                    }
                    if (main.a.Z == 0) {
                        vector.addElement(ae.b().f);
                    }
                    vector.addElement(new by(kf.ab, 1));
                    vector.addElement(new by(kf.cw, 2));
                    if (!es.w) {
                        vector.addElement(new by(kf.cx, 3));
                    }
                    vector.addElement(new by(kf.cF, 4));
                    vector.addElement(new by(kf.cJ, 5));
                    vector.addElement(new by(kf.x, 6));
                    le.a().a(vector, 0);
                }
                return;
            }
            case 1: {
                ae.b().a();
                H = null;
            }
        }
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 1: {
                dm.b().a();
                return;
            }
            case 2: {
                cx.a().a((byte)6, "");
                return;
            }
            case 3: {
                ae.b().u();
                return;
            }
            case 4: {
                Form form = new Form(kf.cG);
                TextField textField = new TextField(kf.cH, "", 50, 3);
                form.append((Item)textField);
                form.append(kf.cI);
                Command command = new Command(kf.z, 4, 1);
                form.addCommand(command);
                Command command2 = new Command(kf.d, 2, 1);
                form.addCommand(command2);
                form.setCommandListener((CommandListener)new fs(this, command, textField));
                Display.getDisplay((MIDlet)GameMidlet.h).setCurrent((Displayable)form);
                return;
            }
            case 5: {
                cx.a().a((byte)3, (String)null);
                return;
            }
            case 6: {
                ae.b().v();
                return;
            }
            case 7: {
                bb.h();
                main.a.D = new bb();
                main.a.D.a();
                this.ac = null;
            }
        }
    }

    public final void d() {
        if (!j && main.a.r != ez.a) {
            ae.b().a();
            H = null;
            return;
        }
        ae.b().v();
    }

    public final void a(ht ht2, byte[] byArray, Vector vector, byte by2, int n2, by by3) {
        fx.c((short)839);
        GameMidlet.i.L = false;
        this.u = (byte)n2;
        this.p = ht2;
        this.q = byArray;
        this.r = vector;
        this.s = (byte)34;
        this.I = by3;
        if (main.a.Z == 0) {
            this.ad = by3;
        }
        this.t = (byte)(byArray.length / this.s);
        this.ae = null;
        this.e();
        this.h = null;
        G.removeAllElements();
        int n3 = 0;
        while (n3 < 7) {
            G.addElement(new dr(n3 * (this.s * this.u) / 10 + 50, aw.e(10) * (this.t * this.u / 10) + 20, aw.e(2)));
            ++n3;
        }
        this.e = 0;
        x = 0;
        f = 0;
        g = 0;
        B = 0;
        this.g();
        if (j) {
            c.b(kf.av);
            H = new ht(c.a("k"), 40 * gy.Y, 40 * gy.Y);
            c.a();
        }
    }

    public final void e() {
        this.c = (main.a.m - this.s * this.u) / 2;
        this.d = (main.a.q - main.a.T - this.t * this.u) / 2;
        if (this.c < 0) {
            this.c = 0;
        }
        if (this.d < 0) {
            this.d = 0;
        }
        A = this.s * this.u - main.a.m;
        E = this.t * this.u - main.a.q;
        if (A < 0) {
            f = 0;
            A = 0;
        }
        if (E < 0) {
            g = 0;
            E = 0;
        }
    }

    public final void k() {
        if (this.J != 0) {
            if (g < 0 || g > E) {
                this.J -= this.J / 4;
                g += this.J / 20;
                if (this.J / 10 <= 1) {
                    this.J = 0;
                }
            }
            B = g += this.J / 10;
            this.J -= this.J / 10;
            if (this.J / 10 == 0) {
                this.J = 0;
            }
        }
        if (g < 0) {
            B = 0;
            this.J = 0;
        } else if (g > E) {
            B = E;
            this.J = 0;
        }
        if (this.K != 0) {
            if (f < 0 || f > A) {
                this.K -= this.K / 4;
                f += this.K / 20;
                if (this.K / 10 <= 1) {
                    this.K = 0;
                }
            }
            this.K -= this.K / 10;
            x = f += this.K / 10;
            if (this.K / 10 == 0) {
                this.K = 0;
            }
        }
        if (f < 0) {
            x = 0;
            this.K = 0;
        } else if (f > A) {
            x = A;
            this.K = 0;
        }
        if (g != B) {
            D = B - g << 2;
            g += (C += D) >> 4;
            C &= 0xF;
        }
        if (f != x) {
            z = x - f << 2;
            f += (y += z) >> 4;
            y &= 0xF;
        }
        if (B < 0 || g < 0) {
            g = 0;
            B = 0;
        }
        if (B > E || g > E) {
            B = g = E;
        }
        if (x < 0 || f < 0) {
            f = 0;
            x = 0;
        }
        if (x > A || f > A) {
            x = f = A;
        }
        int n2 = 0;
        while (n2 < G.size()) {
            dr dr2 = (dr)G.elementAt(n2);
            dr2.a = dr2.a - (dr2.c + (main.a.l % 5 == 1 ? 1 : 0));
            if (dr2.a < -this.c - 50) {
                dr2.a = this.c + aw.e(4) * 50 + this.s * this.u;
                dr2.b = aw.e(10) * (this.t * this.u / 10) + 10;
                dr2.c = aw.e(2);
            }
            ++n2;
        }
    }

    public static void f() {
        go.l = "e";
        dp.i = "f";
        es.t = "a";
        ae.j = main.a.a(i, -2);
    }

    public final void l() {
        ++this.Q;
        if (main.a.D == null || !bb.d) {
            super.l();
        }
        this.m = false;
        if (main.a.a(0, 0, main.a.m, main.a.n)) {
            int n2;
            int n3 = main.a.k();
            int n4 = main.a.l();
            if (main.a.D == null && main.a.g) {
                main.a.g = false;
                n2 = 0;
                while (n2 < this.r.size()) {
                    kb kb2 = (kb)this.r.elementAt(n2);
                    if (main.a.a(this.c + kb2.a * this.u + this.u / 2 - 24 * gy.Y - f, this.d + kb2.b * this.u - 56 * gy.Y - g, 48 * gy.Y, 56 * gy.Y)) {
                        this.e = n2;
                        return;
                    }
                    ++n2;
                }
            }
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    this.N = main.a.i;
                    this.O = main.a.h;
                    this.P = this.Q;
                }
                this.J = 0;
                this.K = 0;
                if (!this.F) {
                    this.F = true;
                    this.L = f;
                    this.M = g;
                }
                B = this.M + n4;
                x = this.L + n3;
                ea.h();
                g = B;
                f = x;
            }
            if (main.a.f) {
                n2 = (int)(this.Q - this.P);
                int n5 = this.N - main.a.i;
                if (n2 < 10) {
                    if (B >= 0 && B < E) {
                        this.J = n5 / n2 * 10;
                    }
                    n5 = this.O - main.a.h;
                    if (x >= 0 && x < A) {
                        this.K = n5 / n2 * 10;
                    }
                }
                this.P = -1L;
                this.F = false;
                if (aw.f(n3) < 10 && aw.f(n4) < 10) {
                    kb kb3 = (kb)this.r.elementAt(this.e);
                    if (main.a.a(this.c + kb3.a * this.u + this.u / 2 - 24 * gy.Y - f, this.d + kb3.b * this.u - 56 * gy.Y - g, 48 * gy.Y, 56 * gy.Y)) {
                        this.I.b();
                        return;
                    }
                    x = main.a.h + f - main.a.o;
                    B = main.a.i + g - main.a.p;
                    ea.h();
                }
            }
        }
        if (this.h == null) {
            if (main.a.a(2) || main.a.a(4)) {
                --this.e;
                if (this.e < 0) {
                    this.e = this.r.size() - 1;
                }
                this.m = true;
            } else if (main.a.a(8) || main.a.a(6)) {
                ++this.e;
                if (this.e >= this.r.size()) {
                    this.e = 0;
                }
                this.m = true;
            }
        } else if (main.a.D == null) {
            this.h.a();
        }
        if (this.m) {
            this.g();
        }
    }

    private void g() {
        kb kb2 = (kb)this.r.elementAt(this.e);
        x = kb2.a * this.u - main.a.m / 2;
        B = kb2.b * this.u - main.a.q / 2;
        ea.h();
    }

    private static void h() {
        if (B < 0) {
            B = 0;
        }
        if (B > E) {
            B = E;
        }
        if (x < 0) {
            x = 0;
        }
        if (x > A) {
            x = A;
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        if (main.a.D == null || !bb.d) {
            super.a(graphics);
        }
        main.a.a(graphics);
    }

    public final void b(Graphics graphics) {
        Object object;
        int n2;
        main.a.c(graphics);
        graphics.setColor(0);
        graphics.fillRect(0, 0, main.a.m, main.a.q);
        graphics.translate(this.c, this.d);
        graphics.translate(-f, -g);
        int n3 = 0;
        while (n3 < this.q.length) {
            byte by2 = this.q[n3];
            n2 = by2 / this.p.c;
            this.p.b(n2, by2 % this.p.c, n3 % this.s * this.u, n3 / this.s * this.u, graphics);
            ++n3;
        }
        n3 = 0;
        while (n3 < this.r.size()) {
            kb kb2 = (kb)this.r.elementAt(n3);
            if (n3 == this.e) {
                graphics.drawImage(w, kb2.a * this.u + this.u / 2, kb2.b * this.u, 33);
                if (j) {
                    H.a(n3, kb2.a * this.u + this.u / 2, kb2.b * this.u - 12 * gy.Y, 0, 33, graphics);
                } else {
                    fx.a(graphics, kb2.d, kb2.a * this.u + this.u / 2, kb2.b * this.u - 12 * gy.Y, 33);
                }
            } else {
                graphics.drawImage(v, kb2.a * this.u + this.u / 2, kb2.b * this.u - kb2.e / 3, 33);
                ++kb2.e;
                if (kb2.e >= 9) {
                    kb2.e = 0;
                }
            }
            ++n3;
        }
        Graphics graphics2 = graphics;
        ea ea2 = this;
        n2 = 0;
        while (n2 < ea2.r.size()) {
            object = (kb)ea2.r.elementAt(n2);
            int n4 = ((kb)object).a * ea2.u;
            int n5 = ((kb)object).b * ea2.u;
            if (n5 < g + 50) {
                n5 = g + 50;
            }
            if (n5 > g + main.a.q - 20) {
                n5 = g + main.a.q - 20;
            }
            if (n4 < f + 20) {
                n4 = f + 20;
            }
            if (n4 > f + main.a.m - 47) {
                n4 = f + main.a.m - 47;
            }
            main.a.L.a(graphics2, ((kb)object).c, n4 + 10, n5 - (n2 == ea2.e ? 70 * gy.Y : 35 * gy.Y) - ((kb)object).e / 3, 2);
            ++n2;
        }
        ea2 = graphics;
        n2 = 0;
        while (n2 < G.size()) {
            object = (dr)G.elementAt(n2);
            if (((dr)object).a > f - 30 && ((dr)object).a < f + 30 + main.a.m && ((dr)object).b > g - 20 && ((dr)object).b < g + 20 + main.a.n) {
                ea2.drawImage(k[((dr)object).c], ((dr)object).a, ((dr)object).b, 3);
            }
            ++n2;
        }
        main.a.c(graphics);
    }

    public final void a(byte by2, String string, String string2, String string3) {
        System.out.println("onRegisterByEmail: " + string2 + "   " + string3);
        if (by2 == 0) {
            n = new ct(this, string);
            return;
        }
        if (by2 == 1) {
            n = new ay(this, string);
            return;
        }
        if (by2 == 2) {
            es.b().b.a(string2);
            es.b().c.a(string3);
            es.b().g();
            main.a.b("\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng.");
            n = null;
        }
    }
}


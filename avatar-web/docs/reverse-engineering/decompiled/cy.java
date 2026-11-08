/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Hashtable;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class cy
extends hj {
    public static cy a;
    public hj b;
    private int j = 0;
    public static Vector c;
    private by k;
    public static Vector d;
    private int l = 40 * gy.Y;
    public static byte e;
    public static boolean f;
    public int g;
    public static String h;
    public static Hashtable i;
    private boolean m = false;
    private String n;
    private boolean o = false;
    private int p = -20;
    private by q;

    static {
        c = new Vector();
        e = 0;
        f = false;
        h = "friendlist";
        i = new Hashtable();
    }

    public static cy b() {
        if (a == null) {
            a = new cy();
        }
        return a;
    }

    public final void a() {
        this.g = 0;
        this.ae = this.k = new by(kf.d, 1);
        this.b = null;
        if (main.a.r != cd.b() && main.a.r != dp.b() && main.a.r != cy.b()) {
            this.b = main.a.r;
        }
        this.f();
        super.a();
        if (main.a.Z > 0) {
            this.o = true;
        }
    }

    public final void e() {
        main.a.y.a(20, je.a().h + je.o + gy.Z, main.a.m - 40, this.l, main.a.m - 40, c.size() * this.l, main.a.m - 40, je.a().e - 5 - (je.o + 2 * gy.Z), c.size());
        if (c.size() > 0) {
            il.a().a(c.size() * this.l, je.a().e - 5 - (je.o + 2 * gy.Z));
        }
    }

    public final void f() {
        if (main.a.Z == 0) {
            je.a().a(this.n, main.a.m - 20, main.a.q - main.a.T - 20, 1);
        } else {
            je.a().a(this.n, main.a.m - 20 * gy.Y, main.a.n - main.a.ab - main.a.T - 10 + (jy.b ? 7 * gy.Y : 0), 1);
        }
        je.a().h = 10 + main.a.ab;
        if (c != null) {
            this.e();
        }
    }

    public final void a(int n2, boolean bl2) {
        if (bl2 && n2 == this.g) {
            this.a(this.q);
        }
        this.p = -20;
        if (n2 >= 0 && n2 < c.size()) {
            this.g = n2;
        }
    }

    public final void a(boolean bl2) {
        this.o = bl2;
    }

    public final void a(Graphics graphics) {
        int n2;
        graphics.setClip(0, 0, main.a.m, main.a.n);
        if (this.b != null) {
            this.b.b(graphics);
        } else {
            ae.b().b(graphics);
        }
        je.a().a(graphics);
        graphics.translate(0, je.a().h + je.o + gy.Z);
        graphics.setClip(0, 0, main.a.m, main.a.n);
        int n3 = ho.i / this.l;
        if (n3 < 0) {
            n3 = 0;
        }
        if ((n2 = n3 + (main.a.n - 40) / this.l + 1) > c.size()) {
            n2 = c.size();
        }
        if (this.j == 5) {
            int n4 = n2;
            int n5 = n3;
            Graphics graphics2 = graphics;
            cy cy2 = this;
            int n6 = 0 + cy2.l * n5;
            int n7 = n5;
            while (n7 < n4) {
                graphics2.setClip(10 * gy.Y + 4 + gy.Y, 0, je.a().f - 8 - (gy.Y << 1), je.a().e - 5 - (je.o + 2 * gy.Z));
                graphics2.translate(0, -ho.i);
                bc bc2 = (bc)c.elementAt(n7);
                int n8 = 0;
                if (!cy2.o && n7 == cy2.g) {
                    main.a.S.c(graphics2, 10 * gy.Y + 3 + 2 * gy.Y, n6 + 2, main.a.m - 20 * gy.Y - 6 - 4 * gy.Y, cy2.l - 4);
                    if (bc2.c > je.a().f - 40) {
                        cy2.p += 2;
                        if (cy2.p > bc2.c - (je.a().f - 40)) {
                            cy2.p = -20;
                        }
                    }
                    n8 = cy2.p;
                    if (cy2.p < 0) {
                        n8 = 0;
                    }
                }
                int n9 = fx.c((short)((short)bc2.d)).c + 4;
                fx.a(graphics2, bc2.d, 10 * gy.Y + 10 + n9 / 2, n6 + cy2.l / 2 - 12 * gy.Y + gy.ah / 2, 3);
                main.a.K.a(graphics2, bc2.a, 10 * gy.Y + 10 + n9, n6 + cy2.l / 2 - 12 * gy.Y, 0);
                main.a.N.a(graphics2, bc2.b, 10 * gy.Y + 10 - n8, n6 + cy2.l / 2 + 3 * gy.Y, 0);
                n6 += cy2.l;
                graphics2.translate(0, ho.i);
                ++n7;
            }
        } else if (this.j == 6 || this.j == 0) {
            int n10 = n2;
            int n11 = n3;
            Graphics graphics3 = graphics;
            cy cy3 = this;
            int n12 = 0;
            int n13 = 0 + cy3.l * n11;
            while (n11 < n10) {
                int n14;
                graphics3.setClip(10 * gy.Y + 4, 0, je.a().f - 8, je.a().e - 5 - (je.o + 2 * gy.Z));
                graphics3.translate(0, -ho.i);
                hn hn2 = (hn)c.elementAt(n11);
                int n15 = 0;
                if (!cy3.o && n11 == cy3.g) {
                    main.a.S.c(graphics3, 10 * gy.Y + 3 + 2 * gy.Y, n13 + 2, main.a.m - 20 * gy.Y - 6 - 4 * gy.Y, cy3.l - 4);
                    n14 = main.a.N.a(hn2.m);
                    if (n14 > je.a().f - (57 + (gy.Y - 1) * 30)) {
                        cy3.p += 2;
                        if (cy3.p > n14 - (je.a().f - (57 + (gy.Y - 1) * 30))) {
                            cy3.p = -20;
                        }
                    }
                    n15 = cy3.p;
                    if (cy3.p < 0) {
                        n15 = 0;
                    }
                }
                hn2.a(graphics3, 10 * gy.Y + 25 + (gy.Y - 1) * 20, n13 + cy3.l - 5 * gy.Y, false);
                n14 = 0;
                if (hn2.X != -1) {
                    n14 = 6 * gy.Y;
                    fx.a(graphics3, hn2.X, 60 + (gy.Y - 1) * 30 + n14, n13 + cy3.l / 2 - 12 * gy.Y + gy.ah / 2, 3);
                }
                graphics3.setClip(60 + (gy.Y - 1) * 30, ho.i, je.a().f - (47 + (gy.Y - 1) * 30), je.a().e - 5 - (je.o + 2 * gy.Z));
                main.a.K.a(graphics3, hn2.x, 60 + (n14 << 1) + (gy.Y - 1) * 30, n13 + cy3.l / 2 - 12 * gy.Y, 0);
                if (hn2.aa != -1) {
                    fx.a(graphics3, hn2.aa, 60 + 6 * gy.Y + (n14 << 1) + (gy.Y - 1) * 30 + main.a.K.a(hn2.x), n13 + cy3.l / 2 - 12 * gy.Y + gy.ah / 2, 3);
                }
                if (hn2.ab != -1) {
                    n12 = 12 * gy.Y;
                    fx.a(graphics3, hn2.ab, 60 - n15 + (gy.Y - 1) * 30 + 6 * gy.Y, n13 + cy3.l / 2 + 3 * gy.Y + gy.af / 2, 3);
                }
                main.a.N.a(graphics3, hn2.m, 60 - n15 + (gy.Y - 1) * 30 + n12, n13 + cy3.l / 2 + 3 * gy.Y, 0);
                n13 += cy3.l;
                graphics3.translate(0, ho.i);
                ++n11;
            }
        }
        il.a().a(graphics, main.a.m - 10 * gy.Y - 9 - gy.Y, 0);
        main.a.c(graphics);
        if (jy.b) {
            jy.a(graphics, this.ac, this.ad, this.ae);
            return;
        }
        super.a(graphics);
    }

    public final void l() {
        if (jy.b && main.a.Z != 0) {
            main.a.S.a(this.ac, this.ad, this.ae);
            return;
        }
        super.l();
    }

    public final void k() {
        if (this.b != null) {
            this.b.k();
        }
        il.a().b(ho.i, ho.j);
    }

    private void a(int n2, Vector object, hj hj2) {
        if (main.a.r != cy.b()) {
            this.b = hj2;
        }
        switch (this.j) {
            case 0: {
                f = true;
                d = object;
                if (e == 1) {
                    ae.b();
                    ae.c(ae.h);
                } else if (e == 2) {
                    f = false;
                    main.a.i();
                    iy.a().c(1);
                } else if (main.a.r != this) {
                    this.a();
                }
                e = 0;
            }
        }
        c = null;
        c = object;
        if (this.j != 5) {
            n2 = 0;
            while (n2 < c.size()) {
                object = (hn)c.elementAt(n2);
                ((hn)object).i();
                ((hn)object).h();
                ++n2;
            }
        }
        this.g = 0;
        cy cy2 = this;
        this.ae = cy2.k;
        cy2.e();
    }

    public final void b(boolean bl2) {
        this.j = 0;
        if (d == null) {
            main.a.i();
            ie.a().d();
        } else {
            this.b = main.a.r;
            this.a(h);
            if (main.a.r != this) {
                this.a();
            }
        }
        if (bl2) {
            this.m = true;
            this.q = new by(kf.O, 4);
            if (main.a.Z == 0) {
                this.ad = this.q;
            }
        }
    }

    public static hn b(int n2) {
        int n3 = d.size();
        int n4 = 0;
        while (n4 < n3) {
            hn hn2 = (hn)d.elementAt(n4);
            if (hn2.w == n2) {
                return hn2;
            }
            ++n4;
        }
        return null;
    }

    public final boolean a(String string) {
        byte[] byArray = (byte[])i.get(string);
        main.a.h();
        if (byArray == null) {
            return false;
        }
        this.a(byArray, string);
        return true;
    }

    public final void a(byte[] object, String string) {
        String[] stringArray = null;
        byte[] byArray = null;
        object = new ByteArrayInputStream((byte[])object);
        object = new DataInputStream((InputStream)object);
        try {
            js js2;
            String string2 = ((DataInputStream)object).readUTF();
            int n2 = ((DataInputStream)object).readInt();
            int n3 = ((DataInputStream)object).readByte();
            byte by2 = ((DataInputStream)object).readByte();
            short s2 = ((DataInputStream)object).readShort();
            Vector<js> vector = new Vector<js>();
            if (n3 == 0) {
                this.j = 5;
                n3 = 0;
                while (n3 < s2) {
                    js2 = new bc();
                    new bc().d = ((DataInputStream)object).readShort();
                    ((bc)js2).a = ((DataInputStream)object).readUTF();
                    ((bc)js2).b = ((DataInputStream)object).readUTF();
                    ((bc)js2).c = main.a.N.a(((bc)js2).b);
                    vector.addElement(js2);
                    ++n3;
                }
            } else {
                this.j = 6;
                n3 = 0;
                while (n3 < s2) {
                    js2 = new hn();
                    new hn().K = 0;
                    int n4 = ((DataInputStream)object).readByte();
                    ((hn)js2).e = new Vector();
                    int n5 = 0;
                    while (n5 < n4) {
                        ((hn)js2).a(new hx(((DataInputStream)object).readShort()));
                        ++n5;
                    }
                    ((gx)js2).w = ((DataInputStream)object).readInt();
                    ((hn)js2).X = ((DataInputStream)object).readShort();
                    if (string.equals(h)) {
                        ((hn)js2).aa = ((DataInputStream)object).readShort();
                        ((hn)js2).ab = ((DataInputStream)object).readShort();
                    }
                    ((gx)js2).x = ((DataInputStream)object).readUTF();
                    ((hn)js2).m = ((DataInputStream)object).readUTF();
                    vector.addElement(js2);
                    ++n3;
                }
            }
            n3 = ((DataInputStream)object).readByte();
            if (n3 > 0) {
                stringArray = new String[n3];
                byArray = new byte[n3];
                int n6 = 0;
                while (n6 < n3) {
                    byArray[n6] = ((DataInputStream)object).readByte();
                    stringArray[n6] = ((DataInputStream)object).readUTF();
                    ++n6;
                }
            }
            if (string.equals(h)) {
                this.j = 0;
            }
            cy.b().a(this.j, vector, main.a.r);
            this.n = string2;
            this.f();
            if (main.a.r != this) {
                this.a();
            }
            String[] stringArray2 = stringArray;
            byte[] byArray2 = byArray;
            this.ac = null;
            if (n3 > 0) {
                this.ac = new by(kf.c, new ia(this, string, stringArray2, n2, by2, byArray2));
            }
            if (!this.m) {
                if (string.equals(h)) {
                    this.q = new by(kf.L, 0);
                    if (main.a.Z == 0) {
                        this.ad = this.q;
                    }
                } else if (!this.m) {
                    this.q = new by(kf.O, new hp(this, n2, by2));
                    if (main.a.Z == 0) {
                        this.ad = this.q;
                    }
                }
            }
            this.m = false;
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                cy cy2 = this;
                if (cy2.g < 0 || cy2.g >= c.size()) break;
                hn hn2 = (hn)c.elementAt(cy2.g);
                hc.b().a(hn2.w, hn2.x);
                hc.b().a(cy2.b);
                return;
            }
            case 1: {
                cy cy3 = this;
                this.ad = null;
                cy3.ae = null;
                cy3.ac = null;
                c = null;
                ho ho2 = main.a.y;
                main.a.y.m = false;
                if (cy3.b == null) {
                    ae.b().a();
                    break;
                }
                cy3.b.a();
                return;
            }
            case 2: {
                return;
            }
            case 3: {
                hn hn3 = (hn)c.elementAt(cy.b().g);
                iy.a().b(hn3.w);
                main.a.i();
                return;
            }
            case 4: {
                main.a.i();
                go.b().b(((hn)cy.d.elementAt((int)this.g)).w, true);
            }
        }
    }

    public final void g() {
        this.q = new by(kf.O, 3);
        if (main.a.Z == 0) {
            this.ad = this.q;
        }
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 50: {
                ie.a().d();
            }
        }
    }

    public static void h() {
        i.remove(h);
        d = null;
    }

    static boolean a(cy cy2) {
        return cy2.m;
    }
}


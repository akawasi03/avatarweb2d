/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ja
extends kx {
    public static ja a;
    private Vector K = new Vector();
    private Vector L = new Vector();
    private Vector M = new Vector();
    private Vector N = new Vector();
    private Vector O = new Vector();
    private by P;
    private by Q;
    private int R;
    private int S;
    private byte T = (byte)-1;
    private byte U = (byte)-1;
    private byte V;
    private byte W;
    private byte X;
    private byte ay;
    private byte az;
    public static int b;
    public static int c;
    private boolean[] aA = new boolean[6];
    public byte[][] d = new byte[5][6];
    private byte[] aB = new byte[3];
    public byte e;
    private byte aC = 0;
    private byte aD;
    private boolean aE;
    private boolean aF;
    private boolean aG;
    private boolean aH;
    public boolean f;
    private int[] aI;
    private Image aJ;
    public static int g;
    public static int h;
    private static dr[] aK;
    private Vector aL = new Vector();
    private by aM;

    public static kx b() {
        if (a == null) {
            a = new ja();
            return a;
        }
        return a;
    }

    public final void a() {
        this.e();
        super.a();
    }

    private void t() {
        int n2 = 0;
        while (n2 < this.aB.length) {
            this.aB[n2] = -1;
            ++n2;
        }
        n2 = 0;
        while (n2 < this.aA.length) {
            this.aA[n2] = false;
            ++n2;
        }
        n2 = 0;
        while (n2 < this.d.length) {
            int n3 = 0;
            while (n3 < this.d[n2].length) {
                this.d[n2][n3] = 0;
                ++n3;
            }
            ++n2;
        }
    }

    public ja() {
        try {
            this.aJ = Image.createImage((String)(String.valueOf(kf.a()) + "/on/p.on"));
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        this.t();
        this.aI = null;
        this.P = new by(kf.B, 7);
        this.Q = new by(kf.w, 8);
        this.aM = new by(kf.B, 9);
        if (main.a.m > 200) {
            c = 23;
            b = 23;
            h = 48;
            g = 48;
            if (gy.Y == 2) {
                h = 96;
                g = 96;
            }
        } else {
            c = 12;
            b = 12;
            h = 32;
            g = 32;
        }
        this.v();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 7: {
                this.y();
                break;
            }
            case 8: {
                ja ja2 = this;
                ja2.g();
                ja2.aL.removeAllElements();
                kx.l = false;
                kx.j = false;
                kx.k = false;
                ja2.n = -1;
                ja2.aI = null;
                ja2.K.removeAllElements();
                ja2.L.removeAllElements();
                ja2.T = (byte)-1;
                ja2.U = (byte)-1;
                break;
            }
            case 9: {
                ja ja3 = this;
                if (!ja3.aE) {
                    if (ja3.aA[kx.i(GameMidlet.i.w)]) break;
                    ja3.aD = 1;
                    ja3.C();
                    break;
                }
                if (ja3.T == -1) break;
                ja3.T = (byte)-1;
                ja3.ad.a = "Ch\u1ecdn";
                ja3.ae = ja3.P;
            }
        }
        super.a(n2, n3);
    }

    public final void e() {
        super.e();
        if (main.a.m > 150) {
            aK = new dr[]{new dr(20 * gy.Y, 50 + 30 * gy.Y, 6), new dr(20 * gy.Y, main.a.p + 60, 6), new dr(main.a.o, main.a.q - main.a.T - 10, 33), new dr(main.a.m - 14 * gy.Y, main.a.p + 60, 10), new dr(main.a.m - 14 * gy.Y, 50 + 30 * gy.Y, 10)};
            return;
        }
        aK = new dr[]{new dr(20, 13, 6), new dr(20, main.a.p - 5, 6), new dr(main.a.o, main.a.q - main.a.T - 10, 33), new dr(main.a.m - 14, main.a.p - 5, 10), new dr(main.a.m - 14, 13, 10)};
    }

    public final void a(byte by2, byte by3, int n2) {
        int n3 = n2;
        n2 = by3;
        by3 = by2;
        ja ja2 = this;
        if (n3 != 0) {
            int n4;
            hn hn2 = (hn)kx.m.elementAt(by3);
            hn hn3 = (hn)kx.m.elementAt(n2);
            dn dn2 = new dn(hn2.aw, hn2.ax);
            new dn(hn2.aw, hn2.ax).o = (short)n3;
            dn2.f = aw.e(3);
            dn2.b = n4 = aw.a(hn3.aw - hn2.aw, -(hn3.aw - hn2.ax));
            dn2.az = (byte)aw.b(-1, 1);
            dn2.e = aw.c(dn2.b + dn2.az * 90);
            n4 = 10 * aw.b(dn2.e) >> 10;
            n3 = -(10 * aw.a(dn2.e)) >> 10;
            dn2.n = (short)hn3.aw;
            dn2.m = (short)hn3.ax;
            dn2.aw += n4;
            dn2.ax += n3;
            dn2.f = 0;
            dn2.i = (byte)(aw.e(4) + 2);
            dn2.aA = (short)(8 + aw.e(5));
            ja2.aL.addElement(dn2);
        }
    }

    private void u() {
        this.T = (byte)-1;
        this.U = (byte)-1;
        this.W = 0;
        this.X = 0;
        this.ay = 0;
        this.aE = false;
        this.aF = false;
        this.aG = false;
        this.aC = 0;
        this.f = false;
        this.K.removeAllElements();
        this.L.removeAllElements();
        this.N.removeAllElements();
        this.az = 0;
        this.aH = false;
        kx.j = false;
        this.n = -1;
        this.aD = 0;
        kx.k = false;
        this.t();
        int n2 = 0;
        while (n2 < this.O.size()) {
            kl kl2 = (kl)this.O.elementAt(n2);
            ((kl)this.O.elementAt(n2)).b = 0;
            ++n2;
        }
    }

    private void v() {
        this.O.removeAllElements();
        this.R = main.a.m / 2 - g - g / 2 - 10;
        this.S = main.a.n / 2 - h - 12;
        int n2 = 0;
        while (n2 < 6) {
            kl kl2 = new kl();
            new kl().a = n2;
            kl2.c = this.R + n2 % 3 * (g + 10);
            kl2.d = this.S + n2 / 3 * (h + 8);
            this.O.addElement(kl2);
            ++n2;
        }
    }

    private void w() {
        if (this.N.size() <= 0) {
            if (main.a.m > 200) {
                int n2 = main.a.m / 2 - 64 * gy.Y;
                int n3 = 0;
                while (n3 < 3) {
                    this.a(n2 + (n3 << 6) * gy.Y, 10, n3, n3, false);
                    ++n3;
                }
                return;
            }
            int n4 = main.a.m / 2 - 49;
            int n5 = 0;
            while (n5 < 3) {
                this.a(n4 + n5 * 49, 0, n5, n5, false);
                ++n5;
            }
        }
    }

    private void x() {
        if (!this.aF) {
            kx.o();
            this.f = true;
            ie.a().a(this.T, this.U);
            kx.k = true;
            this.n = -1;
        }
    }

    private void y() {
        kx.o();
        kx.k = true;
        ie.a().j();
    }

    private void A() {
        Object object = (kl)this.O.elementAt(this.V);
        ++((kl)object).b;
        object = this;
        int n2 = 0;
        while (n2 < 6) {
            Object object2 = (kl)((ja)object).O.elementAt(n2);
            int n3 = ja.a(((ja)object).M, kx.i(GameMidlet.i.w));
            int n4 = ja.b(n3);
            int n5 = ((kl)object2).b;
            int n6 = ((kl)object2).d + h / 2;
            n3 = ((kl)object2).c + g / 2;
            object2 = object;
            ef ef2 = new ef(n3, n6, n5, n4);
            ((ja)object2).K.addElement(ef2);
            ++n2;
        }
    }

    private void B() {
        int n2 = 0;
        while (n2 < 6) {
            kl kl2 = (kl)this.O.elementAt(n2);
            int n3 = ja.a(this.M, (int)this.ay);
            this.a(kl2.c, kl2.d, kl2.c, kl2.d, this.d[this.ay][n2], ja.b(n3), n2, n2, false);
            ++n2;
        }
    }

    private void e(Graphics graphics) {
        if (this.N.size() > 0) {
            int n2 = 0;
            while (n2 < this.N.size()) {
                ev ev2 = (ev)this.N.elementAt(n2);
                ev2.a(graphics);
                ++n2;
            }
        }
    }

    private static int b(int n2) {
        switch (n2) {
            case 0: {
                return 3;
            }
            case 1: {
                return 0;
            }
            case 2: {
                return 1;
            }
            case 3: {
                return 2;
            }
        }
        return -1;
    }

    private void a(int n2, int n3, int n4, int n5, boolean bl2) {
        ev ev2 = new ev(n2, n3, n4, n5, false);
        this.N.addElement(ev2);
    }

    private void a(int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, boolean bl2) {
        ky ky2 = new ky(n2, n3, n4, n5, n6, n7, n8, n9, false);
        this.L.addElement(ky2);
    }

    public final void a(byte by2) {
        int n2 = kx.i(GameMidlet.i.w);
        hn hn2 = (hn)kx.m.elementAt(by2);
        if (n2 == by2) {
            this.aA[n2] = false;
            this.aE = true;
            this.ae = null;
            this.aD = (byte)2;
            this.f = false;
        }
        this.n = hn2.w;
        kx.v = this.e;
        kx.u = main.a.j();
        if (!this.aG) {
            this.aG = true;
        }
        if (GameMidlet.i.w != kx.r && n2 == by2) {
            ja ja2 = this;
            this.ad = kx.D;
            ja2.ad.a = "Ch\u1ecdn";
            ja2.ae = ja2.P;
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        main.a.c(graphics);
        Graphics graphics2 = graphics;
        ja ja2 = this;
        int n2 = 0;
        while (n2 < ja2.aL.size()) {
            dn dn2 = (dn)ja2.aL.elementAt(n2);
            if (dn2.i >= 0) {
                main.a.O.a(graphics2, "+" + dn2.o, dn2.aw, dn2.ax, 2);
            }
            ++n2;
        }
        super.a(graphics);
    }

    public final void b(Graphics graphics) {
        Object object;
        int n2;
        Object object2;
        Graphics graphics2;
        super.b(graphics);
        if (kx.j || kx.k) {
            main.a.c(graphics);
            graphics2 = graphics;
            object2 = this;
            if (((ja)object2).O.size() > 0) {
                if (((ja)object2).T != -1) {
                    graphics2.setColor(0xFFFFFF);
                    if (main.a.l % 20 > 10) {
                        graphics2.fillRect(((ja)object2).R + ((ja)object2).T % 3 * (g + 10), ((ja)object2).S + ((ja)object2).T / 3 * (h + 8), g, h);
                    }
                }
                if (((ja)object2).U != -1) {
                    graphics2.setColor(1112500);
                    if (main.a.l % 20 > 10) {
                        graphics2.fillRect(((ja)object2).R + ((ja)object2).U % 3 * (g + 10), ((ja)object2).S + ((ja)object2).U / 3 * (h + 8), g, h);
                    }
                }
                n2 = 0;
                while (n2 < ((ja)object2).O.size()) {
                    object = (kl)((ja)object2).O.elementAt(n2);
                    if (fx.c((short)((short)(main.a.m > 200 ? 872 : 873))).d != -1) {
                        graphics2.drawRegion(fx.c((short)((short)(main.a.m > 200 ? 872 : 873))).a, 0, ((kl)object).a * h, g, h, 0, ((ja)object2).R + n2 % 3 * (g + 10), ((ja)object2).S + n2 / 3 * (h + 8), 0);
                    }
                    ++n2;
                }
            }
        }
        this.a_(graphics);
        if (kx.j || kx.k) {
            int n3;
            int n4;
            main.a.c(graphics);
            graphics2 = graphics;
            object2 = this;
            n2 = 0;
            while (n2 < kx.m.size()) {
                object = (hn)kx.m.elementAt(n2);
                if (((gx)object).w == kx.r || ((gx)object).w != -1) {
                    if (((kx)object2).n != ((gx)object).w || main.a.l % 10 >= 5) {
                        main.a.Q.a(graphics2, String.valueOf(((hn)object).c()) + kf.k(), ((js)object).aw, ((js)object).ax + 5, 2);
                    }
                    if ((n4 = ja.a(((ja)object2).M, kx.i(((gx)object).w))) != -1 && fx.c((short)871).d != -1) {
                        graphics2.drawRegion(fx.c((short)871).a, 0, ja.b(n4) * 12, 12, 12, 0, ((js)object).aw, ((js)object).ax + 5 + gy.ai, 17);
                    }
                }
                ++n2;
            }
            if (kx.j || kx.k) {
                n3 = (int)((long)kx.v - kx.t);
                if (n3 > 0 && !kx.l && this.N.size() <= 0) {
                    main.a.O.a(graphics, String.valueOf(n3), main.a.o, 10, 2);
                }
                if (this.aG) {
                    this.aC = this.aC < 100 ? (byte)(this.aC + 1) : (byte)100;
                    if (this.aC < 50) {
                        main.a.L.a(graphics, "B\u1eaft \u0111\u1ea7u t\u1ea3", main.a.o, this.S - 40, 2);
                    }
                }
            }
            if (this.K.size() > 0) {
                n3 = 0;
                while (n3 < this.K.size()) {
                    object2 = (ef)this.K.elementAt(n3);
                    if (((ef)object2).a > 0) {
                        ((ef)object2).a(graphics);
                    }
                    ++n3;
                }
            }
            if (this.L.size() > 0) {
                n3 = 0;
                while (n3 < this.L.size()) {
                    object2 = (ky)this.L.elementAt(n3);
                    if (((ky)object2).c > 0) {
                        graphics2 = graphics;
                        if (!((ky)object2).h) {
                            cs cs2 = main.a.O;
                            if (main.a.m <= 200) {
                                cs2 = main.a.Q;
                            }
                            if (main.a.Z > 0) {
                                cs2 = main.a.K;
                            }
                            int n5 = ((ky)object2).a + g / 4 + ((ky)object2).d % 2 * g / 2;
                            n4 = ((ky)object2).b + h / 4 + ((ky)object2).d / 2 * h / 2;
                            if (fx.c((short)((short)(main.a.m > 200 ? 870 : 871))).d != -1) {
                                graphics2.drawRegion(fx.c((short)((short)(main.a.m > 200 ? 870 : 871))).a, 0, ((ky)object2).d * c, b, c, 0, n5, n4, 3);
                            }
                            cs2.a(graphics2, String.valueOf(((ky)object2).c), n5, n4 - cs2.a() / 2, 2);
                        }
                    }
                    ++n3;
                }
            }
            if (GameMidlet.i.w != kx.r && kx.j && this.N.size() == 0) {
                graphics.drawImage(this.aJ, this.R + g / 2 + this.V % 3 * (g + 10), this.S + h / 2 + this.V / 3 * (h + 8) + main.a.l % 4 + 5, 3);
            }
            this.e(graphics);
        }
    }

    private void C() {
        kx.o();
        this.f = true;
        ie.a().a(this.O);
        this.K.removeAllElements();
    }

    public final void l() {
        super.l();
        ja ja2 = this;
        if (!ja2.aA[kx.i(GameMidlet.i.w)] && GameMidlet.i.w != kx.r) {
            ja ja3 = ja2;
            if (!ja3.f && kx.j && !kx.l && ja3.O.size() > 0 && main.a.g) {
                main.a.g = false;
                int n2 = 0;
                while (n2 < ja3.O.size()) {
                    kl kl2 = (kl)ja3.O.elementAt(n2);
                    if (main.a.h >= kl2.c && main.a.h <= kl2.c + g && main.a.i >= kl2.d && main.a.i <= kl2.d + h) {
                        ja3.V = (byte)n2;
                        if (!ja3.aE) {
                            if (ja3.aA[kx.i(GameMidlet.i.w)]) break;
                            if (ja3.az < 6) {
                                ja3.A();
                            }
                            ja3.az = (byte)(ja3.az + 1);
                            break;
                        }
                        if (ja3.U != -1) break;
                        if (ja3.T == -1) {
                            ja3.T = ja3.V;
                            ja3.ad.a = "T\u1ea3";
                            ja3.D();
                            break;
                        }
                        ja3.U = ja3.V;
                        ja3.x();
                        break;
                    }
                    ++n2;
                }
            }
            if (main.a.a(6)) {
                ja2.V = (byte)(ja2.V + 1);
                if (ja2.V > 5) {
                    ja2.V = 0;
                }
                return;
            }
            if (main.a.a(4)) {
                ja2.V = (byte)(ja2.V - 1);
                if (ja2.V < 0) {
                    ja2.V = (byte)5;
                }
                return;
            }
            if (main.a.a(8)) {
                if (ja2.V / 3 <= 0) {
                    ja2.V = (byte)(ja2.V + 3);
                    return;
                }
            } else if (main.a.a(2) && ja2.V > 2) {
                ja2.V = (byte)(ja2.V - 3);
            }
        }
    }

    protected final void h() {
        super.h();
        if (!kx.j && !kx.k) {
            this.u();
        }
    }

    public final void k() {
        super.k();
        if (kx.j || kx.k) {
            Object object;
            ja ja2 = this;
            kx.t = (int)(System.currentTimeMillis() / 1000L - kx.u);
            if (kx.j && !kx.l && !kx.k && (long)kx.v - kx.t < 0L) {
                ja2.f = true;
                if (GameMidlet.i.w != kx.r) {
                    if (ja2.aD == 0) {
                        ja2.aD = 1;
                        ja2.C();
                    }
                    if (ja2.aD == 2) {
                        ja2.aD = (byte)3;
                        ja2.y();
                    }
                }
            }
            ja2 = this;
            if (ja2.L.size() > 0 && ja2.O.size() > 0) {
                Object object2;
                int n2 = 0;
                while (n2 < ja2.L.size()) {
                    Object object3;
                    object2 = object3 = (ky)ja2.L.elementAt(n2);
                    if (((ky)object3).a != ((ky)object2).f) {
                        ((ky)object2).a = ((ky)object2).f - ((ky)object2).a >> 1 == 0 ? ((ky)object2).f : (((ky)object2).a += ((ky)object2).f - ((ky)object2).a >> 1);
                    }
                    if (((ky)object2).b != ((ky)object2).g) {
                        ((ky)object2).b = ((ky)object2).g - ((ky)object2).b >> 1 == 0 ? ((ky)object2).g : (((ky)object2).b += ((ky)object2).g - ((ky)object2).b >> 1);
                    }
                    if (((ky)object2).i && ((ky)object2).a == ((ky)object2).f && ((ky)object2).b == ((ky)object2).g) {
                        ((ky)object2).h = true;
                    }
                    if (((ky)object3).h) {
                        ja2.L.removeElement(object3);
                        object2 = ja2;
                        if (((ja)object2).aF) {
                            object3 = (kl)((ja)object2).O.elementAt(((ja)object2).X);
                            int n3 = ja.a(((ja)object2).M, (int)((ja)object2).ay);
                            super.a(((kl)object3).c, ((kl)object3).d, ((kl)object3).c, ((kl)object3).d, ((ja)object2).d[((ja)object2).ay][((ja)object2).X], ja.b(n3), ((ja)object2).X, ((ja)object2).X, false);
                            ((ja)object2).aF = false;
                        }
                    }
                    ++n2;
                }
                object = (kl)ja2.O.elementAt(ja2.X);
                if (ja2.aF) {
                    int n4 = 0;
                    while (n4 < ja2.L.size()) {
                        object2 = (ky)ja2.L.elementAt(n4);
                        if (((ky)object2).e == ja2.W) {
                            ((ky)object2).f = ((kl)object).c;
                            ((ky)object2).g = ((kl)object).d;
                            ((ky)object2).i = true;
                        }
                        ++n4;
                    }
                }
            }
            if (this.N.size() > 0) {
                int n5 = 0;
                while (n5 < this.N.size()) {
                    object = (ev)this.N.elementAt(n5);
                    ((ev)object).a();
                    if (this.aH) {
                        ((ev)object).a = this.aB[n5];
                        ((ev)object).b = true;
                    }
                    ++n5;
                }
            }
            int n6 = 0;
            while (n6 < this.aL.size()) {
                object = (dn)this.aL.elementAt(n6);
                int n7 = aw.a(((dn)object).n - ((js)object).aw, -(((dn)object).m - ((js)object).ax));
                if (aw.f(n7 - ((dn)object).e) > 10) {
                    ((dn)object).e -= ((js)object).aA * ((js)object).az;
                    ((dn)object).e = aw.c(((dn)object).e);
                } else {
                    ((dn)object).e = n7;
                    ((dn)object).i = (byte)(((dn)object).i + 2);
                }
                if (((dn)object).f >= 4) {
                    ((dn)object).f = 0;
                }
                ++((dn)object).f;
                n7 = ((dn)object).i * aw.b(((dn)object).e) >> 10;
                int n8 = -(((dn)object).i * aw.a(((dn)object).e)) >> 10;
                if (aw.a(((js)object).aw, ((js)object).ax, ((dn)object).n, ((dn)object).m) >= ((dn)object).i) {
                    ((js)object).aw += n7;
                    ((js)object).ax += n8;
                } else {
                    this.aL.removeElement(object);
                }
                ++n6;
            }
            return;
        }
        this.q();
    }

    public final void a(int[] object) {
        this.aI = object;
        this.aH = true;
        kx.l = true;
        this.ae = null;
        this.aG = false;
        this.aC = 0;
        this.ad = this.Q;
        object = this;
        int n2 = 0;
        while (n2 < 5) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != -1) {
                kx.a(hn2.w, String.valueOf(object.aI[n2]));
                hn2.b(hn2.c() + object.aI[n2]);
            }
            n2 = (byte)(n2 + 1);
        }
    }

    public final void i() {
        kx.j = false;
        kx.k = true;
        this.M.removeAllElements();
        this.f();
        int n2 = 0;
        while (n2 < kx.m.size()) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != kx.r) {
                this.M.addElement(String.valueOf(n2));
            }
            ++n2;
        }
        this.B();
        this.ad = kx.E;
    }

    public final void j() {
        if (!this.aE) {
            if (!this.aA[kx.i(GameMidlet.i.w)]) {
                if (this.az < 6) {
                    this.A();
                }
                this.az = (byte)(this.az + 1);
                return;
            }
        } else if (this.U == -1) {
            if (this.T == -1) {
                this.T = this.V;
                this.ad.a = "T\u1ea3";
                this.D();
                return;
            }
            this.U = this.V;
            this.x();
        }
    }

    public final void m() {
        this.ad = kx.D;
        this.ae = this.aM;
        this.ad.a = "\u0110\u1eb7t";
        this.ae.a = "Xong";
    }

    private void D() {
        this.ae = this.aM;
        this.ae.a = "Ch\u1ecdn l\u1ea1i";
    }

    private static int a(Vector vector, int n2) {
        int n3 = 0;
        while (n3 < vector.size()) {
            String string = (String)vector.elementAt(n3);
            if (string.equals(String.valueOf(n2))) {
                return n3;
            }
            ++n3;
        }
        return -1;
    }

    public final void n() {
        super.n();
        this.M.removeAllElements();
        int n2 = 0;
        while (n2 < kx.m.size()) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != kx.r) {
                this.M.addElement(String.valueOf(n2));
            }
            ++n2;
        }
    }

    public final void b(byte by2) {
        super.s();
        main.a.h();
        this.u();
        kx.r();
        this.M.removeAllElements();
        this.f();
        int n2 = 0;
        while (n2 < kx.m.size()) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != kx.r) {
                this.M.addElement(String.valueOf(n2));
            }
            ++n2;
        }
        if (GameMidlet.i.w != kx.r) {
            this.m();
        } else {
            this.ad = null;
            this.ae = null;
        }
        kx.l = false;
        kx.j = true;
        kx.v = by2;
        kx.u = main.a.j();
    }

    public final void c(byte by2) {
        this.ay = by2;
        this.aA[this.ay] = true;
        this.B();
    }

    public final void a(byte by2, byte by3, byte by4) {
        if (by3 != by4) {
            this.ay = by2;
            this.W = by3;
            this.X = by4;
            this.aF = true;
            this.aD = (byte)3;
        }
    }

    public final void a(byte[] object) {
        this.aB = object;
        object = new Vector();
        int n2 = 0;
        while (n2 < 6) {
            kl kl2 = new kl();
            if (n2 == this.aB[0]) {
                kl2.b = 6;
            }
            ((Vector)object).addElement(kl2);
            ++n2;
        }
        ie.a().a((Vector)object);
        this.w();
    }

    public final void f() {
        int n2 = 0;
        while (n2 < kx.H) {
            hn hn2 = (hn)kx.m.elementAt(n2);
            if (hn2.w != -1) {
                hn2.h = 0;
                hn2.b((byte)0);
                hn2.f(hn2.H);
                hn2.a(ja.aK[kx.x[n2]].a, ja.aK[kx.x[n2]].b);
                if (kx.x[n2] == 2 || kx.x[n2] == 3 || kx.x[n2] == 4) {
                    hn2.K = hn2.t = gx.J;
                } else {
                    hn2.t = 0;
                    hn2.K = 0;
                }
            }
            ++n2;
        }
    }
}


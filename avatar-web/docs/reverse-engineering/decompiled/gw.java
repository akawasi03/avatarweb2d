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

public final class gw
implements ew {
    private static ht a;
    private static Image b;
    private static Image c;
    private static Image d;
    private static Image e;
    private static Image[] f;
    private static ht[] g;
    private static ht h;
    private static ht i;
    private static Image[] j;
    private static ht k;
    private static ht l;
    private static byte[][] m;
    private static int n;
    private byte o;
    private byte p;
    private byte q;
    private static int r;
    private static int s;
    private static int t;
    private static int u;

    static {
        byte[][] byArrayArray = new byte[13][];
        byte[] byArray = new byte[9];
        byArray[0] = 4;
        byArray[1] = 6;
        byArray[2] = 17;
        byArray[4] = 27;
        byArray[5] = 14;
        byArray[7] = 27;
        byArray[8] = 36;
        byArrayArray[0] = byArray;
        byte[] byArray2 = new byte[9];
        byArray2[0] = 4;
        byArray2[1] = 6;
        byArray2[2] = 17;
        byArray2[4] = 17;
        byArray2[5] = 13;
        byArray2[7] = 37;
        byArray2[8] = 13;
        byArrayArray[1] = byArray2;
        byte[] byArray3 = new byte[12];
        byArray3[0] = 4;
        byArray3[1] = 6;
        byArray3[2] = 17;
        byArray3[4] = 17;
        byArray3[5] = 13;
        byArray3[7] = 37;
        byArray3[8] = 13;
        byArray3[10] = 27;
        byArray3[11] = 36;
        byArrayArray[2] = byArray3;
        byte[] byArray4 = new byte[15];
        byArray4[0] = 4;
        byArray4[1] = 6;
        byArray4[2] = 17;
        byArray4[4] = 17;
        byArray4[5] = 13;
        byArray4[7] = 37;
        byArray4[8] = 13;
        byArray4[10] = 17;
        byArray4[11] = 36;
        byArray4[13] = 37;
        byArray4[14] = 36;
        byArrayArray[3] = byArray4;
        byte[] byArray5 = new byte[18];
        byArray5[0] = 4;
        byArray5[1] = 6;
        byArray5[2] = 17;
        byArray5[4] = 17;
        byArray5[5] = 13;
        byArray5[7] = 37;
        byArray5[8] = 13;
        byArray5[10] = 17;
        byArray5[11] = 36;
        byArray5[13] = 37;
        byArray5[14] = 36;
        byArray5[16] = 27;
        byArray5[17] = 30;
        byArrayArray[4] = byArray5;
        byte[] byArray6 = new byte[15];
        byArray6[0] = 4;
        byArray6[1] = 6;
        byArray6[2] = 17;
        byArray6[4] = 17;
        byArray6[5] = 13;
        byArray6[7] = 37;
        byArray6[8] = 13;
        byArray6[10] = 17;
        byArray6[11] = 28;
        byArray6[13] = 37;
        byArray6[14] = 28;
        byArrayArray[5] = byArray6;
        byte[] byArray7 = new byte[18];
        byArray7[0] = 4;
        byArray7[1] = 6;
        byArray7[2] = 17;
        byArray7[4] = 17;
        byArray7[5] = 13;
        byArray7[7] = 37;
        byArray7[8] = 13;
        byArray7[10] = 17;
        byArray7[11] = 28;
        byArray7[13] = 37;
        byArray7[14] = 28;
        byArray7[16] = 27;
        byArray7[17] = 36;
        byArrayArray[6] = byArray7;
        byte[] byArray8 = new byte[18];
        byArray8[0] = 4;
        byArray8[1] = 6;
        byArray8[2] = 17;
        byArray8[4] = 17;
        byArray8[5] = 13;
        byArray8[7] = 37;
        byArray8[8] = 13;
        byArray8[10] = 17;
        byArray8[11] = 28;
        byArray8[13] = 37;
        byArray8[14] = 28;
        byArray8[16] = 27;
        byArray8[17] = 20;
        byArrayArray[7] = byArray8;
        byArrayArray[8] = new byte[]{4, 6, 17, 8, 27, 36};
        byArrayArray[9] = new byte[]{4, 6, 17, 9, 27, 36};
        byArrayArray[10] = new byte[]{4, 6, 17, 10, 27, 36};
        byte[] byArray9 = new byte[6];
        byArray9[0] = 4;
        byArray9[1] = 6;
        byArray9[2] = 17;
        byArray9[4] = 27;
        byArray9[5] = 36;
        byArrayArray[11] = byArray9;
        byte[] byArray10 = new byte[6];
        byArray10[0] = 4;
        byArray10[1] = 6;
        byArray10[2] = 17;
        byArray10[4] = 27;
        byArray10[5] = 14;
        byArrayArray[12] = byArray10;
        m = byArrayArray;
        dx.s = 0;
        je.d = new int[]{6201499, 2378578, 8705740, 2716523, 16701696, 7042560};
        n = 0;
        r = 35217;
        s = 32382;
        t = 23135;
        u = 14414578;
    }

    public gw() {
        try {
            main.a.Y = Image.createImage((String)(String.valueOf(kf.a()) + "/12Plus.png"));
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        c.b(kf.av);
        hn.ap = ht.a("5", 50, 48);
        hn.aq = ht.a("2", 11, 10);
        main.a.aa = c.a("transtab");
        gr.s[0] = c.a("s1");
        gr.s[1] = c.a("s2");
        je.a = ht.a("arrowup", 9, 6);
        jj.b = ht.a("busy", 16, 16);
        le.f = ht.a("cmd", 24, 24);
        ae.k = c.a("bar");
        ae.d = c.a("arF");
        ht.a("icon", 17, 19);
        hn.ae = new ht(c.a("dauhoathi"), 9, 9);
        h = ht.a("check", 12, 12);
        dx.r = ht.a("tb", 4, 19);
        a = ht.a("round", 8, 8);
        je.b = ht.a("ar2", 4, 6);
        i = new ht(c.a("arW"), 6, 11);
        int n2 = 0;
        while (n2 < 2) {
            ea.k[n2] = c.a("cl" + n2);
            ++n2;
        }
        c.a();
        try {
            hj.ao = Image.createImage((String)(String.valueOf(kf.a()) + "/on/msg0.on"));
            el.b = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/stat.on")), 11, 11);
            return;
        }
        catch (IOException iOException) {
            IOException iOException3 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5, dx dx2, boolean bl2) {
        if (bl2) {
            dx.r.a(2, n2 + 1, n3 + 1, 0, graphics);
            dx.r.a(3, n2 + n4 - 5, n3 + 1, 0, graphics);
            je.a(n2 + 4, n3 + 1, n4 - 8, 2, 2716523, graphics);
            graphics.fillRect(n2 + 4, n3 + 18, n4 - 8, 2);
            je.a(n2 + 4, n3 + 3, n4 - 8, 1, 2704964, graphics);
            je.a(n2 + 4, n3 + 4, n4 - 8, 1, 5014141, graphics);
            je.a(n2 + 4, n3 + 5, n4 - 8, 13, 6201499, graphics);
        } else {
            dx.r.a(0, n2 + 1, n3 + 1, 0, graphics);
            dx.r.a(1, n2 + n4 - 5, n3 + 1, 0, graphics);
            je.a(n2 + 4, n3 + 2, n4 - 9, 1, 11074288, graphics);
            graphics.fillRect(n2 + 4, n3 + 18, n4 - 9, 1);
            je.a(n2 + 4, n3 + 3, n4 - 9, 1, 2704964, graphics);
            je.a(n2 + 4, n3 + 4, n4 - 9, 1, 5014141, graphics);
            je.a(n2 + 4, n3 + 5, n4 - 9, 13, 6201499, graphics);
        }
        graphics.setClip(n2 + 3, n3 + 1, n4 - 8, n5 - 2);
        graphics.setColor(0);
        if (dx2.g.equals("")) {
            main.a.K.a(graphics, dx2.q, 5 + dx2.j + n2, n3 + (n5 - gy.af) / 2, 0);
        } else {
            main.a.M.a(graphics, dx2.g, 5 + dx2.j + n2, n3 + (n5 - gy.af) / 2 + 1, 0);
        }
        if (dx2.d() && dx2.k == 0 && (dx2.l > 0 || dx2.i / 5 % 2 == 0)) {
            graphics.setColor(0xFFFFFF);
            graphics.fillRect(5 + dx2.j + n2 + main.a.M.a(dx2.g.substring(0, dx2.h)) - 1 + 1, n3 + (n5 - dx.f) / 2 + 2, 1, n5 - 5 * gy.Y);
        }
        if (bl2 && main.a.j() - dx.o < 2) {
            int n6 = main.a.K.a(dx.p[dx.n]);
            graphics.setClip(0, 0, main.a.m, main.a.n);
            je.a(n2 + n4 - n6 - 4, n3 + 4, n6 + 1, n5 - 6, 0x88DDCC, graphics);
            je.a(n2 + n4 - n6 - 4, n3 + 4, n6 + 1, 1, 0x55AA99, graphics);
            main.a.K.a(graphics, dx.p[dx.n], n2 + n4 - 3, n3 + 3, 1);
        }
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6, int n7, int n8) {
        a.a(0 + (n8 << 2), n2, n3, 0, graphics);
        a.a(1 + (n8 << 2), n2 + n4 - 8, n3, 0, graphics);
        a.a(2 + (n8 << 2), n2, n3 + n5 - 8, 0, graphics);
        a.a(3 + (n8 << 2), n2 + n4 - 8, n3 + n5 - 8, 0, graphics);
        je.a(n2 + 8, n3, n4 - 16, 8, n6, graphics);
        graphics.fillRect(n2 + 8, n3 + n5 - 8, n4 - 16, 7);
        graphics.fillRect(n2, n3 + 8, n4, n5 - 16);
        je.a(n2 + 8, n3, n4 - 16, 1, n7, graphics);
        graphics.fillRect(n2 + 8, n3 + n5 - 1, n4 - 16, 1);
        graphics.fillRect(n2, n3 + 8, 1, n5 - 16);
        graphics.fillRect(n2 + n4 - 1, n3 + 8, 1, n5 - 16);
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, int n10, int n11, int n12, int[] nArray, int[] nArray2, String string) {
        int n13;
        int n14;
        main.a.c(graphics);
        this.a(graphics, n2, n3, n5, n4, je.d[0], je.d[1], 0);
        int n15 = n7;
        while (n15 < n6) {
            int n16 = n15;
            nArray[n16] = nArray[n16] + 1;
            if (nArray[n15] > 20) {
                nArray[n15] = 0;
            }
            n14 = nArray2[n15];
            if (je.a().n[n15] > 5) {
                n14 = 0;
            }
            n13 = n15 - n7;
            a.a(n14 + 4, n2 + 3 + n13 * n8, n3 + 3, 0, graphics);
            je.a(n2 + 11 + n13 * n8, n3 + 3, n9 - 16, n10 - 2, je.d[2 + n14 / 2], graphics);
            graphics.fillRect(n2 + 3 + n13 * n8, n3 + 11, n9 - 1, n10);
            je.a(n2 + 11 + n13 * n8, n3 + 3, n9 - 16, 1, je.d[3 + n14 / 2], graphics);
            graphics.fillRect(n2 + 3 + n13 * n8, n3 + 11, 1, n10 + 1);
            graphics.fillRect(n2 + 2 + n9 + n13 * n8, n3 + 11, 1, n10 + 1);
            ++n15;
        }
        n15 = n11;
        if (n11 >= n12) {
            n15 = n12 + n7;
        }
        n14 = n15 - 1;
        while (n14 >= n6) {
            int n17 = n14;
            nArray[n17] = nArray[n17] + 1;
            if (nArray[n14] > 20) {
                nArray[n14] = 0;
            }
            n11 = nArray2[n14];
            if (nArray[n14] > 5) {
                n11 = 0;
            }
            n13 = n14 - n7;
            if (n14 == n6) {
                a.a(n11 + 4, n2 + 3 + n13 * n8, n3 + 3, 0, graphics);
            }
            a.a(n11 + 5, n2 + 3 + n9 - 8 + n13 * n8, n3 + 3, 0, graphics);
            je.a(n2 + 11 + n13 * n8, n3 + 3, n9 - 16, 8, je.d[2 + n11 / 2], graphics);
            graphics.fillRect(n2 + 3 + n13 * n8, n3 + 11, n9 - 1, 15);
            je.a(n2 + 11 + n13 * n8, n3 + 3, n9 - 16, 1, je.d[3 + n11 / 2], graphics);
            graphics.fillRect(n2 + 3 + n13 * n8, n3 + 11, 1, 20);
            graphics.fillRect(n2 + 2 + n9 + n13 * n8, n3 + 11, 1, 15);
            --n14;
        }
        this.a(graphics, n2 + 3, n3 + n10, n5 - 6, n4 - n10 - 3, je.d[2], je.d[3], 1);
        je.a(n2 + 4 + (n6 - n7) * n8, n3 + n10 / 2, n9 - 2, n10, je.d[2], graphics);
        main.a.K.a(graphics, string, n2 + 3 + n9 / 2 + (n6 - n7) * n8, n3 + n10 / 2 - gy.ah / 2, 2);
    }

    public final void a(Graphics graphics, by by2, by by3, by by4) {
        if (by2 != null && by2.a != null) {
            main.a.L.a(graphics, by2.a, main.a.ae[0].a + 2, main.a.ae[0].b + main.a.T / 2 - gy.ag / 2, 0);
        }
        if (by3 != null && by3.a != null) {
            main.a.L.a(graphics, by3.a, main.a.ae[1].a + hj.au / 2, main.a.ae[1].b + main.a.T / 2 - gy.ag / 2, 2);
        }
        if (by4 != null && by4.a != null) {
            main.a.L.a(graphics, by4.a, main.a.ae[2].a + hj.au - 2, main.a.ae[2].b + main.a.T / 2 - gy.ag / 2, 1);
        }
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        this.a(graphics, n2, n3, n4, n5, 0);
    }

    public final void b() {
        if (b != null) {
            return;
        }
        try {
            f = new Image[14];
            g = new ht[2];
            int n2 = 0;
            while (n2 < 14) {
                gw.f[n2] = Image.createImage((String)(String.valueOf(kf.a()) + "/card/c" + n2 + ".png"));
                ++n2;
            }
            n2 = f[12].getWidth();
            int n3 = f[12].getHeight();
            Image image = Image.createImage((int)(n2 << 1), (int)(n3 << 1));
            Graphics graphics = image.getGraphics();
            graphics.setColor(-523560);
            graphics.fillRect(0, 0, n2 << 1, n3 << 1);
            graphics.drawImage(f[12], 0, 0, 0);
            graphics.drawRegion(f[12], 0, 0, n2, n3, 2, n2, 0, 0);
            graphics.drawRegion(f[12], 0, 0, n2, n3, 1, 0, n3, 0);
            graphics.drawRegion(f[12], 0, 0, n2, n3, 3, n2, n3, 0);
            gw.f[12] = image = aw.a(image, -65315);
            gw.g[0] = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/card/f.png")), 8, 9);
            gw.g[1] = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/card/g.png")), 8, 9);
            b = Image.createImage((String)(String.valueOf(kf.a()) + "/card/cb.png"));
            c = Image.createImage((String)(String.valueOf(kf.a()) + "/card/cb1.png"));
            d = Image.createImage((String)(String.valueOf(kf.a()) + "/card/cb2.png"));
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public final void a(Graphics graphics, ax ax2) {
        if (ax2.b == -1) {
            graphics.drawImage(f[12], ax2.c - 27, ax2.d - 36, 0);
            return;
        }
        graphics.drawImage(c, ax2.c - 27, ax2.d - 36, 0);
        gw.d(graphics, ax2);
    }

    public final void b(Graphics graphics, ax ax2) {
        if (ax2.b == -1) {
            graphics.drawImage(f[12], ax2.c - 27, ax2.d - 36, 0);
            return;
        }
        graphics.drawImage(b, ax2.c - 27, ax2.d - 36, 0);
        gw.d(graphics, ax2);
    }

    private static void d(Graphics graphics, ax ax2) {
        int n2 = 0;
        while (n2 < 2) {
            int n3;
            if ((n3 = m[ax2.h[ax2.j]][n2++]) == 0 || n3 == 4) {
                n3 += ax2.i;
            }
            if (ax2.i == 0 && ax2.h[ax2.j] == 11 && n3 == 0) {
                n3 = 11;
            }
            byte by2 = m[ax2.h[ax2.j]][n2++];
            byte by3 = m[ax2.h[ax2.j]][n2++];
            graphics.drawImage(f[n3], ax2.c - 27 + by2, ax2.d - 36 + by3, 3);
        }
        g[ax2.k].a(ax2.h[ax2.j], ax2.c - 27 + 5, ax2.d - 36 + 7, 0, 3, graphics);
    }

    public final void c(Graphics graphics, ax ax2) {
        if (ax2.b == -1) {
            graphics.drawImage(f[12], ax2.c - 27, ax2.d - 36, 0);
            return;
        }
        graphics.drawImage(b, ax2.c - 27, ax2.d - 36, 0);
        int n2 = 0;
        while (n2 < m[ax2.h[ax2.j]].length) {
            int n3;
            if ((n3 = m[ax2.h[ax2.j]][n2++]) == 0 || n3 == 4) {
                n3 += ax2.i;
            }
            if (ax2.i == 0 && ax2.h[ax2.j] == 11 && n3 == 0) {
                n3 = 11;
            }
            byte by2 = m[ax2.h[ax2.j]][n2++];
            byte by3 = m[ax2.h[ax2.j]][n2++];
            graphics.drawImage(f[n3], ax2.c - 27 + by2, ax2.d - 36 + by3, 3);
            if (by3 >= 30) continue;
            graphics.drawRegion(f[n3], 0, 0, f[n3].getWidth(), f[n3].getHeight(), 1, ax2.c + 27 - by2, ax2.d + 36 - by3, 3);
        }
        g[ax2.k].a(ax2.h[ax2.j], ax2.c - 27 + 5, ax2.d - 36 + 7, 0, 3, graphics);
        g[ax2.k].a(ax2.h[ax2.j], ax2.c + 27 - 5, ax2.d + 36 - 7, 3, 3, graphics);
    }

    public final void a(Graphics graphics, ax ax2, boolean bl2) {
        if (ax2.b == -1) {
            graphics.drawImage(f[12], ax2.c - 13, ax2.d - 16, 0);
            return;
        }
        graphics.drawImage(d, ax2.c - 13, ax2.d - 16, 0);
        g[ax2.k].a(ax2.h[ax2.j], ax2.c - 13 + 6, ax2.d - 16 + 7, 0, 3, graphics);
        if (bl2) {
            graphics.drawImage(f[ax2.i + 4], ax2.c - 13 + 6 + 7, ax2.d - 16 + 7, 3);
        } else {
            graphics.drawImage(f[ax2.i + 4], ax2.c - 13 + 6, ax2.d - 16 + 17, 3);
        }
        graphics.drawImage(f[ax2.i], ax2.c - 13 + 17, ax2.d - 16 + 17, 3);
    }

    public final void a() {
        gy.Z = 5;
    }

    public final void a(Graphics graphics) {
        int n2 = 0;
        if (main.a.r == es.a || main.a.r == ea.a) {
            n2 = 14;
        }
        if (hj.as > 0 && main.a.v == null) {
            graphics.drawImage(hj.ao, main.a.m - 8 * gy.Y - 2, n2 + 2, 17);
            main.a.L.a(graphics, "" + hj.as, main.a.m - 16 * gy.Y - 4, 1 + 6 * gy.Y - gy.ag / 2 + n2, 1);
        }
        if (hj.ap != null && main.a.m()) {
            graphics.drawImage(hj.ap, 25, 25, 3);
            if (GameMidlet.e == 9) {
                graphics.drawImage(hj.aq, 75, 25, 3);
            }
        }
    }

    public final void c() {
        hj.av = main.a.n / 12;
        hj.at = main.a.n / 18;
        if (hj.at < 18) {
            hj.at = 18;
        }
        if (hj.at > 45) {
            hj.at = 45;
        }
        if (main.a.H) {
            hj.at = 35;
        }
        gy.ab = 0;
        int n2 = main.a.T = hj.at;
        if (hj.av < 20 || main.a.a == null || !main.a.H) {
            hj.av = 20;
        }
        if (hj.av > 50) {
            hj.av = 50;
        }
        hj.au = main.a.m / 4;
        main.a.ae[0] = new dr(2, main.a.n - n2, 2);
        main.a.ae[1] = new dr(main.a.o - hj.au / 2, main.a.n - n2, 2);
        main.a.ae[2] = new dr(main.a.m - hj.au - 2, main.a.n - n2, 2);
        main.a.af = new dr(main.a.m - 2, 1, 1);
    }

    public final int d() {
        int n2 = 0;
        while (n2 < 3) {
            if (main.a.a(main.a.ae[n2].a, main.a.ae[n2].b, hj.au, main.a.T)) {
                return n2;
            }
            ++n2;
        }
        return -1;
    }

    public final void a(es es2) {
        int n2;
        es2.l = 176;
        es2.m = es2.i ? 170 : 130;
        if (es2.l > main.a.m) {
            es2.l = main.a.m;
            es2.m = 100;
        }
        es2.x = (es2.m - 20) / 3;
        es2.y = 10;
        es2.j = main.a.o - es2.l / 2;
        es2.k = main.a.p - es2.m / 2 + 5;
        es2.b.b = n2 = es2.k + 15 + 4;
        es2.d.a = es2.e.a = es2.q;
        es2.c.a = es2.e.a;
        es2.b.a = es2.e.a;
        es2.d.c = es2.e.c = es2.p;
        es2.c.c = es2.e.c;
        es2.b.c = es2.e.c;
        es2.c.b = n2 += es2.b.d + 15;
        es2.d.b = n2 += es2.b.d + 15;
        es2.o = n2 - 10;
        es2.e.b = n2 += es2.b.d + 15;
        es2.n = es2.c.a - 40;
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6) {
        this.a(graphics, n2, n3, n4, n5, je.d[n6], je.d[n6 + 1], 0);
        this.a(graphics, n2 + 3, n3 + 3, n4 - 6, n5 - 6, je.d[2], je.d[3], 1);
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, boolean bl2) {
        int n5 = 0;
        if (n4 == 2) {
            n5 = 1;
        }
        h.a(n5, n2, n3 + gy.ah / 2, 0, graphics);
        if (bl2) {
            h.a(2, n2, n3 + gy.ah / 2, 0, graphics);
        }
        main.a.K.a(graphics, kf.bQ, n2 + 15, n3 + gw.h.b / 2, 0);
    }

    public final void b(Graphics graphics, int n2, int n3, int n4, int n5) {
        graphics.setColor(15530985);
        graphics.fillRect(0, n3, n4, n5);
    }

    public final void b(Graphics graphics, int n2, int n3, int n4, int n5, int n6) {
        je.b.a(n5, n2 - n / 5, n3 - 3, 0, 3, graphics);
        je.b.a(n6, n2 + n4 + n / 5, n3 - 3, 3, 3, graphics);
        if (++n >= 15) {
            n = 0;
        }
    }

    public final void a(Graphics graphics, String string, int n2, int n3, int n4) {
        main.a.K.a(graphics, string, n2, n3, n4);
    }

    public final void c(Graphics graphics, int n2, int n3, int n4, int n5) {
        graphics.setColor(14279153);
        graphics.fillRect(n2, n3, n4, n5);
    }

    public final void a(int n2) {
        if (n2 == 14 || n2 == 15 || n2 == 16) {
            if (gy.ak) {
                dx.m = true;
            }
            dm.d = true;
            main.a.a.sizeChanged(0, 0);
        }
    }

    public final void e() {
        int n2 = main.a.n;
        dr[] drArray = new dr[]{new dr(main.a.o + 5, 5, 0), new dr(5, n2 / 2, 0), new dr(main.a.o + 5, n2 - 50, 0), new dr(main.a.m - 5, n2 / 2, 1)};
        dr[] drArray2 = new dr[]{new dr(main.a.o, 2, 3), new dr(10, n2 / 2, 20), new dr(main.a.o - 10, n2 - 75 - hj.at, 3), new dr(main.a.m - 60, n2 / 2, 3)};
        int n3 = main.a.n - 24;
        n2 = n2 - 15 - main.a.T;
        if (main.a.m < 200) {
            kg.c = new dr[]{new dr(main.a.o, kx.A / 2, 0), new dr(kx.z / 2, n3 / 2, 0), new dr(main.a.o, n2 - kx.A + 20, 0), new dr(main.a.m - kx.z / 2 - 3, n3 / 2, 0)};
            kg.d = new dr[]{new dr(main.a.o, kx.A, 0), new dr(kx.z + 3, n3 / 2, 0), new dr(main.a.o, n2 - kx.A / 2 + 20, 0), new dr(main.a.m - 3, n3 / 2, 0)};
            kg.b = new dr[]{new dr(main.a.o, kx.A + kx.A / 2 + 2, 2), new dr(kx.z / 4 * 3 + kx.z / 2 + 5, n3 / 2, 0), new dr(main.a.o, n2 - kx.A - gy.ai - 5, 2), new dr(main.a.m - kx.z - 5, n3 / 2 - 5, 1)};
            return;
        }
        kg.c = new dr[]{new dr(main.a.o, kx.A / 2, 0), new dr(kx.z / 2, n3 / 2, 0), new dr(main.a.o, n2 - kx.A / 2, 0), new dr(main.a.m - kx.z / 2, n3 / 2, 0)};
        kg.d = new dr[]{new dr(main.a.o, 0, 0), new dr(kx.z / 4 * 3, n3 / 2, 0), new dr(main.a.o, n2 - kx.A / 2 + kx.A / 4, 0), new dr(main.a.m - kx.z / 4, n3 / 2, 0)};
        kg.b = new dr[]{new dr(main.a.o, kx.A + 2, 2), new dr(kx.z / 4 * 3 + kx.z / 2 + 5, n3 / 2 - 10, 0), new dr(main.a.o, n2 - kx.A - gy.ai - 1, 2), new dr(main.a.m - kx.z - 5, n3 / 2 - 10, 1)};
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, String string, int n10, int n11) {
        n6 = n2 % n3 * n4;
        n3 = (n2 / n3 + 1) * n4;
        n4 = n6 + n4 / 2;
        graphics.setClip(n4 - n5 / 2, n3, n5, n7);
        n6 = (n7 - (gy.Z << 1)) / 4;
        this.a(graphics, n4 - n5 / 2, n3, n5, n7, 0);
        n3 += gy.Z + 8;
        if (n8 == 1) {
            az az2 = (az)gb.e.elementAt(n2);
            az2.a(graphics, n4, n3 + n6 / 2, 0, 3);
        } else {
            gb.b[n2].a(graphics, 7, n4, n3 + n6 / 2, 3);
        }
        main.a.L.a(graphics, String.valueOf(n9), n4, n3 + n6 / 2 + n6 - 2, 2);
        main.a.K.a(graphics, String.valueOf(string), n4, n3 + n6 / 2 + (n6 << 1), 2);
        int n12 = n3 + n6 / 2 + n6 + gy.ah / 2;
        i.a(n10 / 3, n4 - 17, n12 + 1, 2, 3, graphics);
        i.a(n11 / 3, n4 - 17 + 35, n12, 0, 3, graphics);
    }

    public final void a(Graphics graphics, int n2, int n3, int n4, boolean n5, int n6, int[] nArray) {
        main.a.N.a(graphics, String.valueOf(kf.aX) + n6, main.a.o, main.a.p + n2 * n4 / 2 - 20, 2);
        graphics.translate(main.a.o - (n2 * n3 + 10) / 2 + 4, main.a.p - n2 * n4 / 2 + 4);
        graphics.setClip(0, 3, n2 * n3 + 2, n2 * n4 - 32);
        graphics.translate(1, -ho.i);
        if (n5 == 0) {
            main.a.S.c(graphics, n6 % n3 * n2, n6 / n3 * n2, n2, n2);
        }
        if ((n5 = (n4 = ho.i / n2 * n3) + n2 * 7 / n2 * n3 + n3) > nArray.length) {
            n5 = nArray.length;
        }
        while (n4 < n5) {
            el.b.a(nArray[n4], n4 % n3 * n2 + n2 / 2, n4 / n3 * n2 + n2 / 2, 0, 3, graphics);
            ++n4;
        }
    }

    public final void b(Graphics graphics) {
        int n2 = 0;
        while (n2 < main.a.m / 50 + 1) {
            int n3 = 0;
            while (n3 < main.a.q / 71 + 1) {
                graphics.drawImage(e, n2 * 50, n3 * 71, 0);
                ++n3;
            }
            ++n2;
        }
    }

    public final void a(Graphics graphics, int n2, int n3) {
        graphics.drawImage(la.c, n2, n3, 3);
    }

    public final void a(Graphics graphics, String string, String string2, String string3) {
        graphics.setClip(0, 0, main.a.m, main.a.n);
        main.a.S.b(graphics);
        main.a.R.a(graphics, string, main.a.o, 2, 2);
        graphics.setColor(6192786);
        graphics.fillRect(0, 25, main.a.m, hj.al);
        main.a.M.a(graphics, string2, 10, 28, 0);
        main.a.M.a(graphics, string3, main.a.m - 10, 28, 1);
    }

    public final void b(int n2) {
        try {
            if (n2 == 0) {
                jp.f = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgBan2.on")), 60, 46);
                return;
            }
            if (n2 == 1) {
                jp.f = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgBan4.on")), 60, 46);
                return;
            }
            jp.f = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgBan5.on")), 60, 46);
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void f() {
        try {
            je.d = new int[]{21080, 12313816, 8703190, 2713971, 5107863, 4559225};
            a = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/round.on")), 8, 8);
            e = Image.createImage((String)(String.valueOf(kf.a()) + "/on/bg.on"));
            j = new Image[8];
            int n2 = 0;
            while (n2 < 8) {
                gw.j[n2] = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgPopup" + n2 + ".on"));
                ++n2;
            }
            l = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/barMoney.png")), 10, 10);
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void g() {
        je.d = new int[]{6201499, 2378578, 8705740, 2716523, 16701696, 7042560};
        c.b(kf.av);
        a = ht.a("round", 8, 8);
        c.a();
        e = null;
        l = null;
        jy.a = null;
        kd.a = null;
        kg.a = null;
        la.a = null;
        kx.i = null;
        kn.d = null;
    }

    public final void h() {
        try {
            k = new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgDoor.on")), 45, 44);
            new ht(Image.createImage((String)(String.valueOf(kf.a()) + "/on/trangthai.on")), 11, 4);
            jp.i = Image.createImage((String)(String.valueOf(kf.a()) + "/on/imgSelectban.on"));
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void i() {
        el.a = null;
        jp.a = null;
        kx.i = null;
        ek.a = null;
        ja.a = null;
    }

    public final void d(Graphics graphics, int n2, int n3, int n4, int n5) {
        graphics.setColor(12442838);
        int n6 = 0;
        int n7 = 30;
        if (n2 > 0) {
            n7 = 50;
            n6 = 40;
        }
        graphics.fillRect(4, je.o + 20 + gy.af / 2 + n6 - n7 / 2, je.a().f - 8, n7);
        main.a.K.a(graphics, n3 == 1 ? kf.et[0] : kf.et[1], je.a().f / 2, je.o + 20, 2);
        je.a.a(0, je.a().f / 2 - 35 - n4 / 2, je.o + 20 + gy.af / 2 + n6, 4, 3, graphics);
        je.a.a(0, je.a().f / 2 + 35 + n5 / 2, je.o + 20 + gy.af / 2 + n6, 7, 3, graphics);
        GameMidlet.i.a(graphics, je.a().f / 2 + 1, je.o + 87, false);
        main.a.K.a(graphics, String.valueOf(kf.aA) + GameMidlet.i.x, je.a().f / 2, je.o + 100, 2);
        main.a.K.a(graphics, String.valueOf(kf.ao) + GameMidlet.i.c, je.a().f / 2, je.o + 115, 2);
    }

    public final void j() {
        if (main.a.g) {
            if (main.a.b(je.a().g + je.a().f / 2 - 20, je.a().h + je.o + gy.af / 2, 40, 40)) {
                ic.b().b(0);
                main.a.g = false;
            } else if (main.a.b(je.a().g + je.a().f / 2 - 20, je.a().h + je.o + 95 - GameMidlet.i.aA / 2 - 20, 40, 45)) {
                ic.b().b(1);
                main.a.g = false;
            } else if (main.a.b(je.a().g + je.a().f / 2 - 20 - 40, je.a().h + je.o + gy.af / 2 + 50 * ic.b().a, 40, 40)) {
                ic.b().c(-1);
                ic.b().b = 6;
                main.a.g = false;
            } else if (main.a.b(je.a().g + je.a().f / 2 - 20 + 40, je.a().h + je.o + gy.af / 2 + 50 * ic.b().a, 40, 40)) {
                ic.b().c(1);
                ic.b().c = 6;
                main.a.g = false;
            }
        }
        if (main.a.a(2)) {
            ic.b().b(ic.b().a - 1);
            return;
        }
        if (main.a.a(4)) {
            ic.b().c(-1);
            ic.b().b = 6;
            return;
        }
        if (main.a.a(6)) {
            ic.b().c(1);
            ic.b().c = 6;
            return;
        }
        if (main.a.a(8)) {
            ic.b().b(ic.b().a + 1);
        }
    }

    public final void b(Graphics graphics, by by2, by by3, by by4) {
        int n2 = main.a.q - main.a.T / 2 - gy.ag / 2;
        if (by2 != null && by2.a != "") {
            main.a.L.a(graphics, by2.a, 4, n2, 0);
        }
        if (by3 != null && by3.a != "") {
            main.a.L.a(graphics, by3.a, main.a.o, n2, 2);
        }
        if (by4 != null && by4.a != "") {
            main.a.L.a(graphics, by4.a, main.a.m - 4, n2, 1);
        }
    }

    public final void e(Graphics graphics, int n2, int n3, int n4, int n5) {
        boolean bl2 = true;
        Graphics graphics2 = graphics;
        int n6 = j[0].getWidth();
        int n7 = j[0].getHeight();
        graphics2.drawImage(j[0], n2, n3, 0);
        int n8 = 1;
        while (n8 < n4 / n6 - 1) {
            graphics2.drawImage(j[1], n2 + n6 * n8, n3, 0);
            ++n8;
        }
        graphics2.drawImage(j[1], n2 + n4 - (n6 << 1), n3, 0);
        graphics2.drawImage(j[2], n2 + n4 - n6, n3, 0);
        if (n5 / n7 > 2) {
            n8 = 1;
            while (n8 < n5 / n7) {
                graphics2.drawImage(j[3], n2, n3 + n7 * n8, 0);
                graphics2.drawImage(j[4], n2 + n4 - n6, n3 + n7 * n8, 0);
                ++n8;
            }
            graphics2.drawImage(j[3], n2, n3 + n5 - (n7 << 1), 0);
            graphics2.drawImage(j[4], n2 + n4 - n6, n3 + n5 - (n7 << 1), 0);
        }
        if (n5 > (n7 << 1) - 20 && n5 <= n7 * 3) {
            graphics2.drawImage(j[3], n2, n3 + n5 / 2 - n7 / 2, 0);
            graphics2.drawImage(j[4], n2 + n4 - n6, n3 + n5 / 2 - n7 / 2, 0);
        }
        graphics2.drawImage(j[5], n2, n3 + n5 - n7, 0);
        n8 = 1;
        while (n8 < n4 / n6 - 1) {
            graphics2.drawImage(j[6], n2 + n6 * n8, n3 + n5 - n7, 0);
            ++n8;
        }
        graphics2.drawImage(j[6], n2 + n4 - (n6 << 1), n3 + n5 - n7, 0);
        graphics2.drawImage(j[7], n2 + n4 - n6, n3 + n5 - n7, 0);
        graphics2.setColor(t);
        graphics2.fillRect(n2 + 10, n3 + 10, n4 - 20, n5 - 20);
    }

    public final void f(Graphics graphics, int n2, int n3, int n4, int n5) {
        if (gy.Y == 1) {
            graphics.setColor(s);
            graphics.fillRect(0, n3 + 1, n4, n5 - n3 + 1);
            return;
        }
        graphics.setColor(s);
        graphics.fillRect(0, n3 + 1, n4, n5 - n3 + 2);
    }

    public final void g(Graphics graphics, int n2, int n3, int n4, int n5) {
        graphics.setColor(r);
        graphics.fillRect(2, n3, n4, n5);
    }

    public final void c(Graphics graphics) {
        graphics.setColor(s);
        graphics.fillRect(0, main.a.q - main.a.T + 1, main.a.m, main.a.T);
        graphics.setColor(u);
        graphics.fillRect(0, main.a.q - main.a.T, main.a.m, 1);
    }

    public final void a(by by2, by by3, by by4) {
        if (main.a.g) {
            switch (gw.b(by2, by3, by4)) {
                case 1: {
                    this.o = 1;
                    main.a.g = false;
                    break;
                }
                case 2: {
                    this.p = 1;
                    main.a.g = false;
                    break;
                }
                case 3: {
                    this.q = 1;
                    main.a.g = false;
                }
            }
        }
        if (main.a.e) {
            switch (gw.b(by2, by3, by4)) {
                case 1: {
                    this.q = 0;
                    this.p = 0;
                    break;
                }
                case 2: {
                    this.q = 0;
                    this.o = 0;
                    break;
                }
                case 3: {
                    this.o = 0;
                    this.p = 0;
                    break;
                }
                default: {
                    this.q = 0;
                    this.o = 0;
                    this.p = 0;
                }
            }
        }
        if (main.a.f) {
            switch (gw.b(by2, by3, by4)) {
                case 1: {
                    if (this.o != 1) break;
                    by2.b();
                    main.a.f = false;
                    this.o = 0;
                    return;
                }
                case 2: {
                    if (this.p != 1) break;
                    this.p = 0;
                    by3.b();
                    main.a.f = false;
                    return;
                }
                case 3: {
                    if (this.q != 1) break;
                    this.q = 0;
                    by4.b();
                    main.a.f = false;
                }
            }
        }
    }

    private static int b(by by2, by by3, by by4) {
        if (by2 != null && !by2.a.equals("") && main.a.a(0, main.a.q - main.a.T, 95, main.a.T)) {
            return 1;
        }
        if (by3 != null && !by3.a.equals("") && main.a.a(main.a.m / 2 - 43 - 8, main.a.q - main.a.T, 95, main.a.T)) {
            return 2;
        }
        if (by4 != null && !by4.a.equals("") && main.a.a(main.a.m - 87 - 8, main.a.q - main.a.T, 95, main.a.T)) {
            return 3;
        }
        return 0;
    }

    public final void a(Graphics graphics, Vector vector, int n2, int n3) {
        int n4;
        main.a.c(graphics);
        graphics.translate(0, main.a.y.e);
        graphics.translate(0, -ho.i);
        int n5 = (n2 - gy.ag) / 2;
        int n6 = ho.i / n2 - 2;
        if (n6 < 0) {
            n6 = 0;
        }
        if ((n4 = n6 + (main.a.n - 40) / n2 + 3) > vector.size()) {
            n4 = vector.size();
        }
        int n7 = 4 + n6 * n2;
        while (n6 < n4) {
            be be2 = (be)vector.elementAt(n6);
            if (n6 == n3 && be2.a != -1) {
                main.a.S.g(graphics, 2, n7, main.a.m - 4, n2);
            }
            if (be2.a == -1) {
                main.a.L.a(graphics, kf.ex[be2.c], 15, n7 + 8 + (main.a.Z == 0 ? -4 : 0), 0);
                main.a.S.f(graphics, 0, n7 + 25, main.a.m, n7 + 25);
            } else {
                k.a(0, 22, n7 + n2 / 2 + 1, 0, 3, graphics);
                main.a.M.a(graphics, String.valueOf(kf.V) + be2.a, 50, n7 + n5, 0);
                if (be2.b >= 0 && be2.b <= 2) {
                    el.b.a(be2.b, main.a.m - 20, n7 + n2 / 2, 0, 3, graphics);
                }
            }
            n7 += n2;
            ++n6;
        }
    }

    public final void h(Graphics graphics, int n2, int n3, int n4, int n5) {
        l.a(0, n2, n3, 0, graphics);
        l.a(1, n2 + n4 - 10, n3, 0, graphics);
        l.a(2, n2, n3 + n5 - 10, 0, graphics);
        l.a(3, n2 + n4 - 10, n3 + n5 - 10, 0, graphics);
        graphics.setColor(29555);
        graphics.fillRect(n2 + 10, n3 + 1, n4 - 20, n5 - 2);
        graphics.fillRect(n2 + 1, n3 + 10, 9, n5 - 20);
        graphics.fillRect(n2 + n4 - 10, n3 + 10, 9, n5 - 20);
        graphics.setColor(0xFFFFFF);
        graphics.fillRect(n2 + 10, n3, n4 - 20, 1);
        graphics.fillRect(n2 + 10, n3 + n5 - 1, n4 - 20, 1);
        graphics.fillRect(n2, n3 + 10, 1, n5 - 20);
        graphics.fillRect(n2 + n4 - 1, n3 + 10, 1, n5 - 20);
    }
}


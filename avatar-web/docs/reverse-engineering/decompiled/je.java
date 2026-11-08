/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public final class je {
    public static ht a;
    public static ht b;
    public static je c;
    public static int[] d;
    public int e;
    public int f;
    public int g;
    public int h;
    private int p;
    public int i;
    public int j = 10;
    public static String k;
    public int l;
    private int q = 0;
    private int r;
    public int[] m;
    public int[] n;
    private String s;
    public static byte o;

    public static je a() {
        if (c == null) {
            c = new je();
        }
        return c;
    }

    public je() {
        o = (byte)(gy.ah << 1);
        this.j = main.a.a != null && main.a.H ? 17 : 10;
        if (main.a.Z != 0) {
            this.j *= main.a.Z + 1;
        }
    }

    public final void a(String object, int n2, int n3, int n4) {
        this.f = n2;
        this.e = n3;
        this.p = n4;
        String string = object;
        object = this;
        if (string != null) {
            ((je)object).s = string;
            if (main.a.K.a(((je)object).s) > ((je)object).f / 2 && ((je)object).s.length() > 10) {
                ((je)object).s = ((je)object).s.substring(0, 10);
            }
            ((je)object).i = main.a.K.a(((je)object).s) + 10 + (main.a.Z != 0 ? 35 * main.a.Z : 0);
        }
        if (this.i < 40) {
            this.i = 40;
        }
        this.b();
        this.l = 0;
        this.m = new int[this.p];
        this.n = new int[this.p];
        this.r = (this.f - this.i) / this.j;
        this.q = 0;
    }

    public final void b() {
        this.g = main.a.o - this.f / 2;
        this.h = (main.a.q - main.a.T) / 2 - this.e / 2;
    }

    public final void a(int n2, int n3) {
        if (n3 != this.l) {
            this.m[n3] = n2;
            this.n[n3] = aw.e(20);
        }
    }

    public final void a(String string, int n2) {
        if (this.m != null && n2 < this.m.length) {
            this.m[n2] = 0;
        }
        this.s = string;
        int n3 = main.a.K.a(this.s) + 10;
        if (n3 > this.i) {
            this.i = n3;
            this.r = (this.f - this.i) / this.j;
        }
        this.l = n2;
        if (this.l >= this.r && this.r > 0) {
            this.q = this.l - (this.r - 1);
        }
        if (this.l < this.q) {
            this.q = this.l;
        }
    }

    public static void c() {
        GameMidlet.n = "ig_,";
        k = "plg";
        ea.i = main.a.a(GameMidlet.n, 5);
    }

    public final void a(int n2) {
        this.m = new int[n2];
        this.n = new int[n2];
        this.p = n2;
    }

    public final int d() {
        if (main.a.g) {
            int n2;
            int n3 = this.l - 1;
            while (n3 >= this.q) {
                n2 = n3 - this.q;
                if (main.a.a(this.g + 3 + n2 * this.j, this.h + 3, this.j, o)) {
                    return n3 - this.l;
                }
                --n3;
            }
            n3 = this.p;
            if (n3 >= this.r) {
                n3 = this.r + this.q;
            }
            int n4 = this.l + 1;
            while (n4 < n3) {
                n2 = n4 - this.q;
                if (main.a.a(this.g + 3 + n2 * this.j + (this.i - this.j), this.h + 3, this.j, o)) {
                    return n4 - this.l;
                }
                ++n4;
            }
        }
        return 0;
    }

    public final void a(Graphics graphics) {
        main.a.S.a(graphics, this.g, this.h, this.e, this.f, this.l, this.q, this.j, this.i, o, this.p, this.r, this.n, this.m, this.s);
        main.a.c(graphics);
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        je.a(n2, n3, n4, n5, d[0], graphics);
        graphics.setColor(d[2]);
        graphics.drawRect(n2, n3, n4, n5);
        graphics.setColor(12450472);
        graphics.drawRect(n2 + 1, n3 + 1, n4 - 2, n5 - 2);
        graphics.setColor(5738823);
        graphics.drawRect(n2 + 2, n3 + 2, n4 - 4, n5 - 4);
    }

    public static void a(int n2, int n3, int n4, int n5, int n6, Graphics graphics) {
        graphics.setColor(n6);
        graphics.fillRect(n2, n3, n4, n5);
    }
}


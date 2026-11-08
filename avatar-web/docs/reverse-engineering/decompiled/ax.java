/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class ax {
    public byte a;
    public byte b;
    public int c;
    public int d;
    public int e;
    public boolean f;
    public boolean g;
    public int[] h;
    public int i;
    public int j;
    public int k;
    public int l;
    public int m;

    public ax(byte by2, boolean bl2) {
        this(by2);
        if (bl2) {
            int[] nArray = new int[13];
            nArray[0] = 11;
            nArray[1] = 12;
            nArray[3] = 1;
            nArray[4] = 2;
            nArray[5] = 3;
            nArray[6] = 4;
            nArray[7] = 5;
            nArray[8] = 6;
            nArray[9] = 7;
            nArray[10] = 8;
            nArray[11] = 9;
            nArray[12] = 10;
            this.h = nArray;
        }
    }

    public ax(byte by2) {
        this.b = by2;
        this.a = 0;
        this.i = this.b % 4;
        this.j = this.b / 4;
        this.k = this.i < 2 ? 0 : 1;
        int[] nArray = new int[13];
        nArray[1] = 1;
        nArray[2] = 2;
        nArray[3] = 3;
        nArray[4] = 4;
        nArray[5] = 5;
        nArray[6] = 6;
        nArray[7] = 7;
        nArray[8] = 8;
        nArray[9] = 9;
        nArray[10] = 10;
        nArray[11] = 11;
        nArray[12] = 12;
        this.h = nArray;
    }

    public final void a(Graphics graphics) {
        main.a.S.a(graphics, this);
    }

    public final void b(Graphics graphics) {
        main.a.S.b(graphics, this);
    }

    public final void c(Graphics graphics) {
        main.a.S.c(graphics, this);
    }

    public final void a(Graphics graphics, boolean bl2) {
        main.a.S.a(graphics, this, bl2);
    }

    public final int a() {
        if (this.c == this.m && this.d == this.l) {
            return -1;
        }
        if (Math.abs((this.m - this.c) / 2) <= 1 && Math.abs((this.l - this.d) / 2) <= 1) {
            this.c = this.m;
            this.d = this.l;
            return 0;
        }
        if (this.c != this.m) {
            this.c += (this.m - this.c) / 2;
        }
        if (this.d != this.l) {
            this.d += (this.l - this.d) / 2;
        }
        if (aw.a(this.c, this.d, this.m, this.l) <= this.e / 5) {
            return 2;
        }
        return 1;
    }
}


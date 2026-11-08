/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class ev {
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    int a;
    private static int[][] h;
    boolean b;
    private static byte i;
    private static byte j;

    static {
        int[][] nArrayArray = new int[3][];
        int[] nArray = new int[8];
        nArray[0] = 6;
        nArray[2] = 7;
        nArray[3] = 1;
        nArray[4] = 6;
        nArray[5] = 2;
        nArray[6] = 7;
        nArray[7] = 3;
        nArrayArray[0] = nArray;
        nArrayArray[1] = new int[]{6, 5, 7, 4, 6, 3, 7, 2};
        nArrayArray[2] = new int[]{7, 4, 6, 1, 7, 3, 6, 5};
        h = nArrayArray;
    }

    public ev(int n2, int n3, int n4, int n5, boolean bl2) {
        this.c = n2;
        this.f = n3;
        this.g = n4;
        this.a = n5;
        this.b = bl2;
        j = (byte)50;
        i = (byte)54;
        if (gy.Y == 2) {
            j = (byte)108;
            i = (byte)108;
        }
    }

    public final void a(Graphics graphics) {
        if (fx.c((short)874).d != -1) {
            graphics.drawRegion(fx.c((short)874).a, 0, this.e * j, (int)i, (int)j, 0, this.c, this.f, 17);
        }
    }

    public final void a() {
        if (!this.b) {
            if (main.a.l % 2 == 0) {
                ++this.d;
                if (this.d > h[this.g].length - 1) {
                    this.d = 0;
                }
            }
            this.e = h[this.g][this.d];
            return;
        }
        this.e = this.a;
    }
}


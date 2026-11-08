/*
 * Decompiled with CFR 0.152.
 */
public final class ju {
    int a;
    int b;
    int[] c;
    int[] d;
    byte[] e;
    byte[] f;
    byte[] g;

    public ju(hn hn2, int n2, int n3) {
        this.a = n2;
        this.b = n3;
        this.c = new int[3];
        this.d = new int[3];
        this.e = new byte[3];
        this.f = new byte[3];
        this.g = new byte[3];
        int n4 = 0;
        while (n4 < 3) {
            this.e[n4] = (byte)aw.e(8);
            this.d[n4] = -n4 * 20;
            this.f[n4] = (byte)(aw.e(2) == 0 ? 1 : -1);
            this.g[n4] = 6;
            ++n4;
        }
    }
}


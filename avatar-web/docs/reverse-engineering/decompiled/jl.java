/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

final class jl
extends by {
    private final byte[] f;
    private final int g;

    jl(cd cd2, String string, int n2, int n3, byte[] byArray, int n4) {
        super(string, 19, n3);
        this.f = byArray;
        this.g = n4;
    }

    public final void a(Graphics graphics, int n2, int n3) {
        fa fa2 = (fa)fx.a((short)0);
        fa2.a(graphics, n2 + 2 + fa2.d[0] * gy.Y, n3 + 21 + 20 * (gy.Y - 1) + fa2.e[0] * gy.Y, 0);
        fa2 = (fa)fx.a(this.f[this.g]);
        fa2.a(graphics, n2 + 2 + fa2.d[0] * gy.Y, n3 + 21 + 20 * (gy.Y - 1) + fa2.e[0] * gy.Y, 0);
    }
}


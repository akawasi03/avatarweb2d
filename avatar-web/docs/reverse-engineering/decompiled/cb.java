/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public final class cb {
    public String a;
    public short b;
    public short[] c;
    public byte[] d;
    public short e;
    public short f = (short)-1;
    public short[] g = new short[2];
    public short h;
    public short i;
    public short j;
    public String k;
    public boolean l = false;
    public byte m = 1;

    public final void a(Graphics object, int n2, int n3, int n4, int n5) {
        if (this.l) {
            gb.a(object, this.c[n2], n3, n4, n5);
            return;
        }
        Graphics graphics = object;
        object = gb.a[this.c[n2]];
        graphics.drawRegion(gb.c[object.b], object.c * gy.Y, object.d * gy.Y, object.e * gy.Y, object.f * gy.Y, 0, n3, n4, n5);
    }
}


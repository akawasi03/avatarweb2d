/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Image;

public final class f {
    public Image a;
    public short b;
    public short c;
    public int d = -1;

    public f() {
    }

    public f(Image image) {
        this.a = image;
        this.d = 0;
        this.b = (short)image.getWidth();
        this.c = (short)image.getHeight();
    }
}


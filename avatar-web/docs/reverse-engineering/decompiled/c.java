/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Image
 */
import java.io.DataInputStream;
import java.io.IOException;
import javax.microedition.lcdui.Image;

public final class c {
    static c a;
    private String[] b;
    private int[] c;
    private int[] d;
    private byte[] e;
    private int f;
    private int g;
    private String h;
    private byte[] i = new byte[]{78, 103, 117, 121, 101, 110, 86, 97, 110, 77, 105, 110, 104};
    private int j = this.i.length;
    private DataInputStream k;

    public c() {
    }

    public static void a() {
        a.b();
        a = null;
        System.gc();
    }

    public c(String object) {
        int n2 = 0;
        int n3 = 0;
        this.h = object;
        this.g = 0;
        object = this;
        this.k = new DataInputStream(object.getClass().getResourceAsStream(((c)object).h));
        try {
            int n4;
            this.f = n4 = this.k.readUnsignedByte();
            ++this.g;
            this.b = new String[this.f];
            this.c = new int[this.f];
            this.d = new int[this.f];
            int n5 = 0;
            while (n5 < this.f) {
                byte by2;
                n4 = this.k.readByte();
                byte[] byArray = new byte[by2];
                this.k.read(byArray);
                this.a(byArray);
                this.b[n5] = new String(byArray);
                this.c[n5] = n2;
                this.d[n5] = n4 = this.k.readUnsignedShort();
                n2 += this.d[n5];
                n3 += this.d[n5];
                this.g += by2 + 3;
                ++n5;
            }
            this.e = new byte[n3];
            this.k.readFully(this.e);
            this.a(this.e);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        this.b();
    }

    public static Image a(String string) {
        return a.d(String.valueOf(string) + ".png");
    }

    public static void b(String string) {
        a = new c(String.valueOf(kf.a()) + string);
    }

    private void a(byte[] byArray) {
        int n2 = byArray.length;
        int n3 = 0;
        while (n3 < n2) {
            byArray[n3] = (byte)(byArray[n3] ^ this.i[n3 % this.j]);
            ++n3;
        }
    }

    private void b() {
        try {
            if (this.k != null) {
                this.k.close();
                return;
            }
        }
        catch (IOException iOException) {}
    }

    private Image d(String string) {
        int n2 = 0;
        while (n2 < this.f) {
            if (this.b[n2].compareTo(string) == 0) {
                return Image.createImage((byte[])this.e, (int)this.c[n2], (int)this.d[n2]);
            }
            ++n2;
        }
        return null;
    }

    public final byte[] c(String object) {
        int n2 = 0;
        while (n2 < this.f) {
            if (this.b[n2].compareTo((String)object) == 0) {
                object = new byte[this.d[n2]];
                System.arraycopy(this.e, this.c[n2], object, 0, this.d[n2]);
                return object;
            }
            ++n2;
        }
        return null;
    }
}


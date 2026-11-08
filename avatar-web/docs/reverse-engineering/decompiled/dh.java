/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.DataInputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;

public final class dh
implements cs {
    private Image a;
    private String b;
    private byte[] c;
    private int d;
    private static String[] e = new String[]{"normal", "border", "arial", "black", "number", "smallRed", "smallYellow", "big"};
    private char f;
    private char g;

    public dh(int n2) {
        try {
            DataInputStream dataInputStream = new DataInputStream(aw.c(String.valueOf(kf.a()) + "/font/" + e[n2]));
            this.b = dataInputStream.readUTF();
            this.c = new byte[this.b.length()];
            int n3 = 0;
            while (n3 < this.c.length) {
                this.c[n3] = dataInputStream.readByte();
                ++n3;
            }
            this.d = dataInputStream.readByte();
            c.b(kf.ar);
            this.a = c.a(String.valueOf(n2));
            c.a();
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public final void a(Graphics graphics, String string, int n2, int n3, int n4) {
        int n5 = string.length();
        n4 = n4 == 0 ? n2 : (n4 == 1 ? n2 - this.a(string) : n2 - (this.a(string) >> 1));
        int n6 = 0;
        while (n6 < n5) {
            this.f = string.charAt(n6);
            if (this.f == ' ') {
                n4 += this.c[0] >> 1;
            } else {
                n2 = this.b.indexOf(this.f);
                if (n2 == -1) {
                    n2 = 0;
                }
                if (n2 >= 0) {
                    graphics.drawRegion(this.a, 0, n2 * this.d, this.a.getWidth(), this.d, 0, n4, n3, 20);
                }
                n4 += this.c[n2];
            }
            ++n6;
        }
    }

    public final int a(String string) {
        int n2 = 0;
        int n3 = 0;
        while (n3 < string.length()) {
            this.g = string.charAt(n3);
            if (this.g == ' ') {
                n2 += this.c[0] >> 1;
            } else {
                int n4 = this.b.indexOf(this.g);
                if (n4 == -1) {
                    n4 = 0;
                }
                n2 += this.c[n4];
            }
            ++n3;
        }
        return n2;
    }

    public final String[] a(String object, int n2) {
        object = this.b((String)object, n2);
        n2 = ((Vector)object).size();
        String[] stringArray = new String[n2];
        int n3 = 0;
        while (n3 < n2) {
            stringArray[n3] = (String)((Vector)object).elementAt(n3);
            ++n3;
        }
        return stringArray;
    }

    public final Vector b(String string, int n2) {
        Vector<String> vector = new Vector<String>();
        int n3 = string.length();
        if (n3 <= 1) {
            Vector<String> vector2 = new Vector<String>();
            vector2.addElement(string);
            return vector2;
        }
        String string2 = "";
        int n4 = 0;
        int n5 = 0;
        while (true) {
            if (this.a(string2) < n2) {
                string2 = String.valueOf(string2) + string.charAt(n5);
                if (string.charAt(++n5) != '\n') {
                    if (n5 < n3 - 1) continue;
                    n5 = n3 - 1;
                }
            }
            if (n5 != n3 - 1 && string.charAt(n5 + 1) != ' ') {
                int n6 = n5;
                while (string.charAt(n5 + 1) != '\n' && (string.charAt(n5 + 1) != ' ' || string.charAt(n5) == ' ') && n5 != n4) {
                    --n5;
                }
                if (n5 == n4) {
                    n5 = n6;
                }
            }
            vector.addElement(string.substring(n4, n5 + 1));
            if (n5 == n3 - 1) break;
            n4 = n5 + 1;
            while (n4 != n3 - 1 && string.charAt(n4) == ' ') {
                ++n4;
            }
            if (n4 == n3 - 1) break;
            n5 = n4;
            string2 = "";
        }
        return vector;
    }

    public final String a(String string, String string2, String string3) {
        StringBuffer stringBuffer = new StringBuffer();
        int n2 = string.indexOf(string2);
        int n3 = 0;
        int n4 = string2.length();
        while (n2 != -1) {
            stringBuffer.append(string.substring(n3, n2)).append(string3);
            n3 = n2 + n4;
            n2 = string.indexOf(string2, n3);
        }
        stringBuffer.append(string.substring(n3, string.length()));
        return stringBuffer.toString();
    }

    public final String[] a(String string, String string2) {
        int n2 = 0;
        int n3 = string2.length();
        int n4 = string.indexOf(string2, 0);
        while (n4 != -1) {
            n4 += n3;
            n4 = string.indexOf(string2, n4);
            ++n2;
        }
        String[] stringArray = new String[n2 + 1];
        n4 = string.indexOf(string2);
        int n5 = 0;
        int n6 = 0;
        while (n4 != -1) {
            stringArray[n6] = string.substring(n5, n4);
            n5 = n4 + n3;
            n4 = string.indexOf(string2, n5);
            ++n6;
        }
        stringArray[n6] = string.substring(n5, string.length());
        return stringArray;
    }

    public final int a() {
        return this.d;
    }
}


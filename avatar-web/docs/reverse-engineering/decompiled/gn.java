/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.a;

public final class gn
extends kj
implements kk {
    private static gn a = new gn();

    public static void a() {
        kx.H = 2;
        jp.e = 0;
        el.a(2, ek.b());
        kn.a.c = a;
    }

    /*
     * WARNING - void declaration
     */
    public final void a(jr jr2) {
        try {
            byte by2 = jr2.b().readByte();
            int n2 = jr2.b().readByte();
            if (!kx.a(by2, (byte)n2)) {
                return;
            }
            switch (jr2.a) {
                case 20: {
                    int n3;
                    byte hn4 = jr2.b().readByte();
                    n2 = jr2.b().readInt();
                    byte[][] byArray = new byte[8][8];
                    int n4 = 0;
                    while (n4 < 8) {
                        n3 = 0;
                        while (n3 < 8) {
                            byArray[n4][n3] = jr2.b().readByte();
                            ++n3;
                        }
                        ++n4;
                    }
                    n4 = 0;
                    while (n4 < 2) {
                        n3 = jr2.b().readInt();
                        hn hn2 = kx.h(n3);
                        kx.h(n3).an = jr2.b().readShort();
                        hn2.ak = 0;
                        hn2.aj = 0;
                        hn2.ah = hn2.al = jr2.b().readShort();
                        hn2.ai = jr2.b().readShort();
                        hn2.am = jr2.b().readShort();
                        hn2.G <<= 1;
                        hn2.e(4);
                        ++n4;
                    }
                    ek.b().a(n2, (int)hn4, byArray);
                    return;
                }
                case 64: {
                    void var2_6;
                    int n5 = jr2.b().readByte();
                    byte[] byArray = new byte[n5];
                    dr[] drArray = new dr[n5];
                    boolean exception2 = false;
                    while (var2_6 < n5) {
                        drArray[var2_6] = new dr();
                        byArray[var2_6] = jr2.b().readByte();
                        drArray[var2_6].c = jr2.b().readByte();
                        drArray[var2_6].d = jr2.b().readByte();
                        ++var2_6;
                    }
                    byte by3 = jr2.b().readByte();
                    n2 = jr2.b().readByte();
                    Vector<String> vector = new Vector<String>();
                    n5 = 0;
                    while (n5 < n2) {
                        String string = jr2.b().readUTF();
                        vector.addElement(string);
                        ++n5;
                    }
                    n5 = 0;
                    while (n5 < 2) {
                        int n6 = jr2.b().readInt();
                        hn hn3 = kx.h(n6);
                        kx.h(n6).af = jr2.b().readByte();
                        hn3.an = jr2.b().readShort();
                        hn3.aj = (short)(jr2.b().readShort() - hn3.ah);
                        hn3.ak = (short)(jr2.b().readShort() - hn3.ai);
                        hn3.ad = jr2.b().readBoolean();
                        if (hn3.ad) {
                            ek.b().c = true;
                        }
                        ++n5;
                    }
                    ek.b().a(byArray, drArray, by3, vector);
                    return;
                }
                case 21: {
                    int n7 = jr2.b().readInt();
                    byte by4 = jr2.b().readByte();
                    n2 = jr2.b().readByte();
                    ek.b().a(n7, (int)by4, n2);
                    return;
                }
                case 49: {
                    int n8 = jr2.b().readInt();
                    ek.b().b(n8);
                    return;
                }
                case 24: {
                    int n8 = jr2.b().readInt();
                    byte[][] byArray = new byte[8][8];
                    int n9 = 0;
                    while (n9 < 8) {
                        int n10 = 0;
                        while (n10 < 8) {
                            byArray[n9][n10] = jr2.b().readByte();
                            ++n10;
                        }
                        ++n9;
                    }
                    ek.b().a(n8, byArray);
                    return;
                }
                case 51: {
                    Vector<String> vector = new Vector<String>();
                    int n11 = 0;
                    while (n11 < 2) {
                        int n12 = jr2.b().readInt();
                        n2 = jr2.b().readInt();
                        hn hn4 = kx.h(n12);
                        hn4.G /= 2;
                        hn4.H = 0;
                        hn4.b(hn4.c() + n2);
                        if (n2 != 0) {
                            main.a.a(n2, hn4.aw, hn4.ax, -1, 30);
                            String string = String.valueOf(hn4.x) + ": ";
                            if (n2 > 0) {
                                ek.b().b = hn4.w;
                                string = String.valueOf(string) + kf.aP + "   +" + n2 + kf.C;
                            } else {
                                string = String.valueOf(string) + kf.aQ + "  " + n2 + kf.C;
                            }
                            vector.addElement("  ");
                            vector.addElement(string);
                        }
                        ++n11;
                    }
                    ek.b().a(vector);
                    return;
                }
                case 71: {
                    void var2_14;
                    void var2_12;
                    byte[][] byArrayArray = new byte[8][];
                    boolean bl2 = false;
                    while (var2_12 < 8) {
                        byArrayArray[var2_12] = new byte[8];
                        ++var2_12;
                    }
                    boolean bl3 = false;
                    while (var2_14 < 8) {
                        n2 = 0;
                        while (n2 < 8) {
                            byArrayArray[var2_14][n2] = jr2.b().readByte();
                            ++n2;
                        }
                        ++var2_14;
                    }
                    ek.b().a(byArrayArray);
                    return;
                }
            }
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }
}


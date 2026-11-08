/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.a;

public final class af
extends kj
implements kk {
    private static af a = new af();

    public static void a() {
        kx.H = 4;
        jp.e = jp.c;
        el.a(1, kg.b());
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
                    byte nArray3 = jr2.b().readByte();
                    Vector<ax> vector = new Vector<ax>();
                    int n3 = 0;
                    while (n3 < 9) {
                        byte by3 = jr2.b().readByte();
                        vector.addElement(new ax(by3));
                        ++n3;
                    }
                    n3 = jr2.b().readInt();
                    int n4 = jr2.b().readInt();
                    main.a.h();
                    kx.r();
                    kg.b().a(nArray3, vector, n3, n4);
                    return;
                }
                case 49: {
                    int exception2 = jr2.b().readInt();
                    int n4 = jr2.b().readInt();
                    kg.b().b(exception2, n4);
                    return;
                }
                case 21: {
                    byte by4;
                    int n5 = jr2.b().readInt();
                    n2 = jr2.b().readInt();
                    byte by5 = jr2.b().readByte();
                    boolean bl2 = false;
                    if (by5 != -1) {
                        by4 = jr2.b().readByte();
                    }
                    main.a.h();
                    kg.b().a(n5, n2, (int)by5, by4);
                    return;
                }
                case 63: {
                    byte by6 = jr2.b().readByte();
                    main.a.h();
                    kg.b().c(by6);
                    return;
                }
                case 64: {
                    int n6 = jr2.b().readInt();
                    n2 = jr2.b().readBoolean() ? 1 : 0;
                    byte by6 = 0;
                    if (n2 != 0) {
                        by6 = jr2.b().readByte();
                    }
                    byte by8 = jr2.b().readByte();
                    main.a.h();
                    kg.b().a(n2 != 0, (int)by6, n6, by8);
                    return;
                }
                case 65: {
                    int n7 = jr2.b().readInt();
                    n2 = jr2.b().readBoolean() ? 1 : 0;
                    boolean bl3 = jr2.b().readBoolean();
                    int[] nArray = new int[4];
                    int[] nArray2 = new int[12];
                    if (n2 != 0) {
                        int n8 = 0;
                        while (n8 < 4) {
                            nArray[n8] = jr2.b().readInt();
                            ++n8;
                        }
                        n8 = 0;
                        while (n8 < 12) {
                            nArray2[n8] = -1;
                            ++n8;
                        }
                        n8 = 0;
                        while (jr2.b().available() > 0) {
                            nArray2[n8] = jr2.b().readByte();
                            ++n8;
                        }
                    }
                    main.a.h();
                    kg.b().a(n2 != 0, nArray2, bl3, n7);
                    return;
                }
                case 51: {
                    void var2_13;
                    int[] nArray = new int[4];
                    boolean bl4 = false;
                    while (var2_13 < 4) {
                        nArray[var2_13] = jr2.b().readInt();
                        ++var2_13;
                    }
                    int[] nArray3 = new int[4];
                    n2 = 0;
                    while (n2 < 4) {
                        nArray3[n2] = jr2.b().readInt();
                        ++n2;
                    }
                    int[][] nArray4 = new int[4][11];
                    int n9 = 0;
                    while (n9 < 4) {
                        int n10 = 0;
                        while (n10 < 11) {
                            nArray4[n9][n10] = -1;
                            ++n10;
                        }
                        ++n9;
                    }
                    n9 = 0;
                    boolean bl5 = false;
                    while (jr2.b().available() > 0) {
                        int n11;
                        byte by7 = jr2.b().readByte();
                        if (by7 == -1) {
                            if (n9 < 3) {
                                ++n9;
                            }
                            n11 = 0;
                            continue;
                        }
                        nArray4[n9][n11] = by7;
                        if (n11 >= 10) continue;
                        ++n11;
                    }
                    main.a.h();
                    kg.b().a(nArray3, nArray4);
                    return;
                }
                case 67: {
                    byte by8;
                    boolean bl6 = jr2.b().readBoolean();
                    int n12 = -1;
                    if (bl6) {
                        by8 = jr2.b().readByte();
                    }
                    main.a.h();
                    kg.b().a(bl6, by8);
                    return;
                }
                case 68: {
                    byte by10 = jr2.b().readByte();
                    main.a.h();
                    kg.b().a(by10);
                    return;
                }
                case 69: {
                    int n13 = jr2.b().readInt();
                    int[] nArray = new int[4];
                    int n14 = 0;
                    while (n14 < 4) {
                        nArray[n14] = jr2.b().readInt();
                        ++n14;
                    }
                    kg.b().b(n13);
                    return;
                }
                case 62: {
                    int n15;
                    byte by9 = jr2.b().readByte();
                    int n16 = jr2.b().readInt();
                    n2 = jr2.b().readInt();
                    int n17 = jr2.b().readInt();
                    int[][] nArray = new int[4][4];
                    int[][] nArray5 = new int[4][3];
                    int n18 = 0;
                    while (n18 < 4) {
                        n15 = 0;
                        while (n15 < 4) {
                            nArray[n18][n15] = -1;
                            if (n15 < 3) {
                                nArray5[n18][n15] = -1;
                            }
                            ++n15;
                        }
                        ++n18;
                    }
                    n18 = 0;
                    n15 = 0;
                    int n19 = 0;
                    while (n19 < 4) {
                        int n20 = 0;
                        while (n20 < 3) {
                            byte by10 = jr2.b().readByte();
                            if (by10 == -2 || by10 == -1) break;
                            nArray5[n19][n20] = by10;
                            ++n20;
                        }
                        ++n19;
                    }
                    while (jr2.b().available() > 0) {
                        n19 = jr2.b().readByte();
                        if (n18 < 3 && n19 == -1) {
                            ++n18;
                            n15 = 0;
                            continue;
                        }
                        nArray[n18][n15] = n19;
                        if (n15 >= 3) continue;
                        ++n15;
                    }
                    kg.b().a(by9, n16, n2, nArray, nArray5, n17);
                    return;
                }
                case 70: {
                    jr2.b().readInt();
                    kg.b().m();
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


/*
 * Decompiled with CFR 0.152.
 */
import main.a;

public final class jz
implements kk {
    public static jz a;

    public final void a(jr jr2) {
        try {
            switch (jr2.a) {
                case 1: {
                    int n2 = jr2.b().readByte();
                    if (n2 == 0) {
                        hl[] hlArray = new hl[6];
                        int n3 = 0;
                        while (n3 < 6) {
                            hlArray[n3] = new hl(this);
                            hlArray[n3].g = 0;
                            hlArray[n3].w = jr2.b().readByte();
                            hlArray[n3].a = jr2.b().readByte();
                            hlArray[n3].c = jr2.b().readShort();
                            hlArray[n3].d = jr2.b().readShort();
                            ++n3;
                        }
                        n3 = jr2.b().readShort();
                        cz.b().a(hlArray, (short)n3, false, true);
                        return;
                    }
                    boolean bl2 = jr2.b().readBoolean();
                    n2 = bl2 ? 1 : 0;
                    if (!bl2) {
                        hl[] hlArray = new hl[6];
                        int n4 = 0;
                        while (n4 < 6) {
                            hlArray[n4] = new hl(this);
                            hlArray[n4].g = 0;
                            hlArray[n4].w = jr2.b().readByte();
                            hlArray[n4].c = jr2.b().readShort();
                            int n5 = jr2.b().readByte();
                            hlArray[n4].e = new short[n5];
                            hlArray[n4].f = new short[n5];
                            int n6 = 0;
                            while (n6 < n5) {
                                hlArray[n4].e[n6] = jr2.b().readShort();
                                hlArray[n4].f[n6] = jr2.b().readShort();
                                ++n6;
                            }
                            ++n4;
                        }
                        n4 = jr2.b().readShort();
                        cz.b().n = jr2.b().readShort();
                        cz.b().o = System.currentTimeMillis();
                        cz.b().a(hlArray, (short)n4, false, false);
                        return;
                    }
                    int n7 = 0;
                    while (n7 < 6) {
                        byte by2 = jr2.b().readByte();
                        cz.b().c[n7].e = new short[by2];
                        cz.b().c[n7].f = new short[by2];
                        n2 = 0;
                        while (n2 < by2) {
                            cz.b().c[n7].e[n2] = jr2.b().readShort();
                            cz.b().c[n7].f[n2] = jr2.b().readShort();
                            cz.b();
                            ++n2;
                        }
                        ++n7;
                    }
                    n7 = jr2.b().readShort();
                    cz.b().n = jr2.b().readShort();
                    cz.b().o = System.currentTimeMillis();
                    cz.b().a(null, (short)n7, true, false);
                    return;
                }
                case 8: {
                    int n8 = jr2.b().readByte();
                    short[] sArray = new short[n8];
                    String[] stringArray = new String[n8];
                    int n9 = 0;
                    while (n9 < n8) {
                        sArray[n9] = jr2.b().readShort();
                        stringArray[n9] = jr2.b().readUTF();
                        ++n9;
                    }
                    if (n8 > 0) {
                        main.a.v = new if(this, sArray, stringArray);
                        return;
                    }
                    main.a.h();
                    return;
                }
                case 2: {
                    short s2 = jr2.b().readShort();
                    String string = jr2.b().readUTF();
                    short s3 = jr2.b().readShort();
                    byte by3 = jr2.b().readByte();
                    byte by4 = jr2.b().readByte();
                    byte by5 = jr2.b().readByte();
                    cz.b().a(s2, string, s3, by3, by4, by5);
                    return;
                }
                case 5: {
                    byte by6 = jr2.b().readByte();
                    int n10 = jr2.b().readInt();
                    int n11 = 0;
                    while (n11 < cz.b().c.length) {
                        if (by6 == cz.b().c[n11].w) {
                            cz.b().c[n11].g = n10;
                            cz.b().g = (byte)n11;
                            break;
                        }
                        ++n11;
                    }
                    main.a.h();
                    return;
                }
                case 9: {
                    String string = jr2.b().readUTF();
                    cz.b().b(string);
                    return;
                }
                case 10: {
                    cz.b().l = new ki();
                    cz.b().l.b = jr2.b().readByte();
                    cz.b().l.a = jr2.b().readUTF();
                    cz.b();
                    jr2.b().readByte();
                    cz.b().l.c = jr2.b().readInt();
                    cz.b().l.d = jr2.b().readInt();
                    cz.b().l.e = jr2.b().readInt();
                    cz.b().l.f = jr2.b().readInt();
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


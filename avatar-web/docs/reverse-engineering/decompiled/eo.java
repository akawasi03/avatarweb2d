/*
 * Decompiled with CFR 0.152.
 */
import main.GameMidlet;
import main.a;

public final class eo
extends kj
implements kk {
    public static eo a;

    public static void a() {
        if (a == null) {
            a = new eo();
        }
        ce.a().a = a;
    }

    public final void a(jr object) {
        try {
            switch (((jr)object).a) {
                case 51: {
                    ae.b().a(eo.b((jr)object));
                    return;
                }
                case 54: {
                    ce.c((jr)object);
                    return;
                }
                case 55: {
                    ce.d((jr)object);
                    return;
                }
                case 53: {
                    int n2 = ((jr)object).b().readInt();
                    ae.b();
                    ae.c(n2);
                    return;
                }
                case 57: {
                    int n3 = ((jr)object).b().readInt();
                    byte by2 = ((jr)object).b().readByte();
                    ae.b();
                    ae.a(n3, by2);
                    return;
                }
                case 58: {
                    int n4 = ((jr)object).b().readInt();
                    int n5 = ((jr)object).b().readInt();
                    short s2 = ((jr)object).b().readShort();
                    String string = "";
                    if (s2 == -1) {
                        string = ((jr)object).b().readUTF();
                    }
                    int n6 = ((jr)object).b().readInt();
                    ((jr)object).b().readByte();
                    System.out.println("AVATAR_GIFT_GIVING: " + ((jr)object).b().available());
                    int n7 = ((jr)object).b().readInt();
                    int n8 = ((jr)object).b().readInt();
                    int n9 = ((jr)object).b().readInt();
                    ae.b().a(n4, n5, s2, string, n6, n7, n8, n9);
                    return;
                }
                case 59: {
                    int n10 = ((jr)object).b().readInt();
                    int n11 = ((jr)object).b().readInt();
                    short s3 = ((jr)object).b().readShort();
                    String string = "";
                    short s4 = 0;
                    if (s3 == -1) {
                        string = ((jr)object).b().readUTF();
                    } else {
                        s4 = ((jr)object).b().readShort();
                    }
                    ae.b().a(n10, n11, (int)s3, string, (int)s4);
                    return;
                }
                case 60: {
                    int n12 = ((jr)object).b().readByte();
                    int[] nArray = new int[n12];
                    int n13 = 0;
                    while (n13 < n12) {
                        nArray[n13] = ((jr)object).b().readByte();
                        ++n13;
                    }
                    ae.b().a(nArray);
                    main.a.h();
                    return;
                }
                case 78: {
                    return;
                }
                case 82: {
                    int n14 = ((jr)object).b().readInt();
                    kv.b().b(n14);
                    return;
                }
                case 84: {
                    int n15 = ((jr)object).b().readInt();
                    short s5 = ((jr)object).b().readShort();
                    kv.b().c(n15, s5);
                    return;
                }
                case 85: {
                    int n16 = ((jr)object).b().readInt();
                    kv.b().e(n16);
                    return;
                }
                case 91: {
                    int n17 = ((jr)object).b().readInt();
                    short s6 = ((jr)object).b().readShort();
                    short s7 = ((jr)object).b().readShort();
                    int n18 = ((jr)object).b().readByte();
                    byte[][] byArrayArray = new byte[n18][];
                    int n19 = 0;
                    while (n19 < n18) {
                        short s8 = ((jr)object).b().readShort();
                        byArrayArray[n19] = new byte[s8];
                        ((jr)object).b().read(byArrayArray[n19]);
                        ++n19;
                    }
                    kv.b().a(n17, s6, s7, byArrayArray);
                    return;
                }
                case 86: {
                    boolean bl2 = ((jr)object).b().readBoolean();
                    String string = "";
                    if (!bl2) {
                        string = ((jr)object).b().readUTF();
                    }
                    kv.b().a(bl2, string);
                    return;
                }
                case 87: {
                    int n20 = ((jr)object).b().readInt();
                    byte by3 = ((jr)object).b().readByte();
                    kv.b();
                    kv.e(n20, by3);
                    return;
                }
                case 88: {
                    int n21 = ((jr)object).b().readInt();
                    byte by4 = ((jr)object).b().readByte();
                    byte by5 = ((jr)object).b().readByte();
                    int n22 = ((jr)object).b().readInt();
                    short s9 = ((jr)object).b().readShort();
                    kv.b().a(n21, by4, by5, n22, s9);
                    return;
                }
                case -68: {
                    byte by6 = ((jr)object).b().readByte();
                    int n23 = ((jr)object).b().readInt();
                    ae.b().a(by6, n23);
                    return;
                }
                case -69: {
                    main.a.b(kf.dl, new ka(this));
                    return;
                }
                case 92: {
                    ae.s = ((jr)object).b().readBoolean();
                    if (ae.s) {
                        GameMidlet.i.Z = ((jr)object).b().readShort();
                        return;
                    }
                    break;
                }
                case 93: {
                    int n24 = ((jr)object).b().readInt();
                    int n25 = ((jr)object).b().readInt();
                    ae.b().e(n24, n25);
                    return;
                }
                default: {
                    return;
                }
            }
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
        }
    }

    public static hn b(jr jr2) {
        hn hn2 = new hn();
        new hn().w = jr2.b().readInt();
        hn2.a(jr2.b().readUTF());
        int n2 = jr2.b().readByte();
        int n3 = 0;
        while (n3 < n2) {
            hn2.a(new hx(jr2.b().readShort()));
            ++n3;
        }
        short s2 = jr2.b().readShort();
        hn2.C = s2;
        hn2.aw = s2;
        short s3 = jr2.b().readShort();
        hn2.D = s3;
        hn2.ax = s3;
        hn2.ac = jr2.b().readByte();
        hn2.W = (byte)(100 - jr2.b().readByte());
        hn2.X = jr2.b().readShort();
        hn2.aa = jr2.b().readShort();
        return hn2;
    }
}


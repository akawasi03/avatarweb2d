/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.GameMidlet;
import main.a;

public final class kz
extends kj
implements kk {
    public static kz a;

    /*
     * WARNING - void declaration
     */
    public final void a(jr object) {
        try {
            switch (((jr)object).a) {
                case 51: {
                    byte by2 = ((jr)object).b().readByte();
                    short[] n24 = new short[by2];
                    short[] sArray = new short[by2];
                    int n2 = 0;
                    while (n2 < by2) {
                        n24[n2] = ((jr)object).b().readShort();
                        sArray[n2] = ((jr)object).b().readShort();
                        ++n2;
                    }
                    n2 = ((jr)object).b().readInt();
                    int n3 = ((jr)object).b().readInt();
                    gb.a(by2, sArray, n2, n3);
                    return;
                }
                case 54: {
                    short s2 = ((jr)object).b().readShort();
                    short cf2 = ((jr)object).b().readShort();
                    int n3 = ((jr)object).b().readUnsignedShort();
                    byte[] byArray = new byte[n3];
                    int n4 = 0;
                    while (n4 < n3) {
                        byArray[n4] = ((jr)object).b().readByte();
                        ++n4;
                    }
                    gb.a(s2, cf2, byArray);
                    return;
                }
                case 55: {
                    byte[] byArray = new byte[((jr)object).b().available()];
                    ((jr)object).b().read(byArray);
                    gb.b(byArray);
                    return;
                }
                case 56: {
                    byte[] byArray = new byte[((jr)object).b().available()];
                    ((jr)object).b().read(byArray);
                    gb.a(byArray);
                    return;
                }
                case 60: {
                    dc dc2;
                    void by5;
                    Object object2;
                    void dc5;
                    Object object3;
                    int by3 = ((jr)object).b().readByte();
                    Vector<Object> by13 = new Vector<Object>();
                    Vector<Object> vector = new Vector();
                    int n5 = 0;
                    while (n5 < by3) {
                        object3 = new dc();
                        new dc().a = ((jr)object).b().readByte();
                        ((dc)object3).e = ((jr)object).b().readShort();
                        if (((dc)object3).a > 100) {
                            vector.addElement(object3);
                        } else {
                            by13.addElement(object3);
                        }
                        ++n5;
                    }
                    n5 = ((jr)object).b().readByte();
                    object3 = new Vector();
                    boolean n9 = false;
                    while (dc5 < n5) {
                        vector = new dc();
                        new dc().a = ((jr)object).b().readByte();
                        ((dc)((Object)vector)).e = ((jr)object).b().readShort();
                        ((Vector)object3).addElement(vector);
                        ++dc5;
                    }
                    GameMidlet.i.a[0] = ((jr)object).b().readInt();
                    GameMidlet.i.u = ((jr)object).b().readByte();
                    GameMidlet.i.s = ((jr)object).b().readByte();
                    byte n15 = ((jr)object).b().readByte();
                    vector = new Vector<Object>();
                    n5 = 0;
                    while (n5 < n15) {
                        object2 = new dc();
                        new dc().a = ((jr)object).b().readShort();
                        ((dc)object2).e = ((jr)object).b().readShort();
                        vector.addElement(object2);
                        ++n5;
                    }
                    n5 = ((jr)object).b().readByte();
                    object2 = new Vector();
                    boolean by4 = false;
                    while (by5 < n5) {
                        dc dc3 = new dc();
                        new dc().a = ((jr)object).b().readShort();
                        dc3.e = ((jr)object).b().readShort();
                        ((Vector)object2).addElement(dc3);
                        ++by5;
                    }
                    byte by7 = ((jr)object).b().readByte();
                    int n6 = ((jr)object).b().readInt();
                    boolean bl2 = ((jr)object).b().readBoolean();
                    GameMidlet.i.u = ((jr)object).b().readShort();
                    GameMidlet.i.s = ((jr)object).b().readByte();
                    n5 = ((jr)object).b().readByte();
                    ((Vector)object3).removeAllElements();
                    int n7 = 0;
                    while (n7 < n5) {
                        dc2 = new dc();
                        new dc().a = ((jr)object).b().readShort();
                        dc2.e = ((jr)object).b().readInt();
                        ((Vector)object3).addElement(dc2);
                        ++n7;
                    }
                    ((Vector)object2).removeAllElements();
                    n5 = ((jr)object).b().readByte();
                    n7 = 0;
                    while (n7 < n5) {
                        dc2 = new dc();
                        new dc().a = ((jr)object).b().readShort();
                        System.out.println("pppppppp: " + dc2.a + "    " + dc2.e);
                        dc2.e = ((jr)object).b().readInt();
                        ((Vector)object2).addElement(dc2);
                        ++n7;
                    }
                    go.b();
                    go.a(by13, (Vector)object3, vector, (Vector)object2, by7, n6, bl2);
                    if (gb.h == 0 && kz.a() && ir.a != 25) {
                        gb.b();
                        bf.a().a(25, 0);
                        go.e();
                        go.b().b(GameMidlet.i.w, false);
                        return;
                    }
                    break;
                }
                case 61: {
                    kz.b((jr)object);
                    return;
                }
                case 62: {
                    dc dc4 = new dc();
                    new dc().a = ((jr)object).b().readShort();
                    dc4.e = ((jr)object).b().readByte();
                    ((jr)object).b().readInt();
                    ((jr)object).b().readByte();
                    int by8 = ((jr)object).b().readInt();
                    int n8 = ((jr)object).b().readInt();
                    int n11 = ((jr)object).b().readInt();
                    go.b();
                    go.a(dc4, by8, n8, n11);
                    return;
                }
                case 71: {
                    dc n18 = new dc();
                    new dc().a = ((jr)object).b().readByte();
                    ((jr)object).b().readInt();
                    ((jr)object).b().readByte();
                    int n9 = ((jr)object).b().readInt();
                    int n10 = ((jr)object).b().readInt();
                    int n14 = ((jr)object).b().readInt();
                    go.b();
                    go.a(n18, n9, n10, n14);
                    return;
                }
                case 63: {
                    int object4 = ((jr)object).b().readInt();
                    int n11 = ((jr)object).b().readInt();
                    short s4 = ((jr)object).b().readShort();
                    go.b().a(object4, n11, s4);
                    return;
                }
                case 73: {
                    ((jr)object).b().readInt();
                    byte by10 = ((jr)object).b().readByte();
                    int n17 = ((jr)object).b().readInt();
                    go.b();
                    go.g(by10, n17);
                    return;
                }
                case 64: {
                    ((jr)object).b().readInt();
                    byte n23 = ((jr)object).b().readByte();
                    byte by6 = ((jr)object).b().readByte();
                    go.b().b((int)n23, by6);
                    return;
                }
                case 66: {
                    byte by11 = ((jr)object).b().readByte();
                    short s5 = ((jr)object).b().readShort();
                    go.b();
                    go.c(by11, s5);
                    return;
                }
                case 74: {
                    byte by12 = ((jr)object).b().readByte();
                    short s6 = ((jr)object).b().readShort();
                    go.b();
                    go.e(by12, s6);
                    return;
                }
                case 70: {
                    int exception2 = ((jr)object).b().readInt();
                    int n12 = ((jr)object).b().readInt();
                    byte by2 = ((jr)object).b().readByte();
                    String string = ((jr)object).b().readUTF();
                    int n13 = ((jr)object).b().readInt();
                    int n14 = ((jr)object).b().readInt();
                    int n22 = ((jr)object).b().readInt();
                    go.b();
                    go.a(exception2, n12, by2, string, n13, n14, n22);
                    return;
                }
                case 65: {
                    dc dc5;
                    ((jr)object).b().readByte();
                    short s7 = ((jr)object).b().readShort();
                    az az2 = go.b(s7);
                    if (az2 != null && (dc5 = dc.a(go.d, s7)) != null) {
                        --dc5.e;
                        if (dc5.e <= 0) {
                            go.d.removeElement(dc5);
                            return;
                        }
                    }
                    break;
                }
                case 69: {
                    go.b();
                    go.a(((jr)object).b().readUTF());
                    return;
                }
                case 72: {
                    byte by3 = ((jr)object).b().readByte();
                    object = ((jr)object).b().readUTF();
                    go.b().a(by3, (String)object);
                    return;
                }
                case 67: {
                    go.b();
                    ((jr)object).b().readInt();
                    go.i();
                    return;
                }
                case 75: {
                    int n15 = ((jr)object).b().readInt();
                    int n16 = ((jr)object).b().readInt();
                    GameMidlet.i.a(n15);
                    GameMidlet.i.a[1] = n16;
                    object = ((jr)object).b().readUTF();
                    main.a.b((String)object);
                    return;
                }
                case 76: {
                    ce.c((jr)object);
                    return;
                }
                case 77: {
                    ce.d((jr)object);
                    return;
                }
                case 78: {
                    if (kz.a()) {
                        return;
                    }
                    byte by4 = ((jr)object).b().readByte();
                    cf cf2 = (cf)go.c.elementAt(by4);
                    ((cf)go.c.elementAt(by4)).c = ((jr)object).b().readByte();
                    kz.a(cf2, (jr)object);
                    go.b().c(by4);
                    return;
                }
                case 79: {
                    if (kz.a()) {
                        return;
                    }
                    byte by5 = ((jr)object).b().readByte();
                    byte by6 = ((jr)object).b().readByte();
                    if (by6 == -1) {
                        return;
                    }
                    ai ai2 = go.e(by5);
                    go.e(by5).k = by6;
                    kz.a(ai2, (jr)object);
                    go.b();
                    go.f();
                    return;
                }
                case 80: {
                    byte by7 = ((jr)object).b().readByte();
                    if (by7 == 0) {
                        String string = ((jr)object).b().readUTF();
                        Vector<by> vector = new Vector<by>();
                        vector.addElement(new by(kf.C, 3, go.a));
                        vector.addElement(new by(kf.D, 4, go.a));
                        vector.addElement(main.a.ad);
                        main.a.a(string, vector);
                        return;
                    }
                    ((jr)object).b().readByte();
                    ((jr)object).b().readInt();
                    int n17 = ((jr)object).b().readInt();
                    int n18 = ((jr)object).b().readInt();
                    int n19 = ((jr)object).b().readInt();
                    GameMidlet.i.a(n17, n18, n19);
                    main.a.J = 1;
                    go.b().b(GameMidlet.i.w, true);
                    go.R = true;
                    return;
                }
                case 81: {
                    byte by8 = ((jr)object).b().readByte();
                    if (by8 == 0) {
                        String string = ((jr)object).b().readUTF();
                        Vector<by> vector = new Vector<by>();
                        vector.addElement(new by(kf.C, 5, go.a));
                        vector.addElement(new by(kf.D, 6, go.a));
                        vector.addElement(main.a.ad);
                        main.a.a(string, vector);
                        return;
                    }
                    ((jr)object).b().readByte();
                    ((jr)object).b().readInt();
                    main.a.J = 1;
                    System.out.println("UPDATE_FARM_FISH: " + ((jr)object).b().available());
                    int n20 = ((jr)object).b().readInt();
                    int n21 = ((jr)object).b().readInt();
                    int n22 = ((jr)object).b().readInt();
                    System.out.println("");
                    GameMidlet.i.a(n20, n21, n22);
                    go.b().b(GameMidlet.i.w, true);
                    go.R = true;
                    return;
                }
                case 82: {
                    short s2 = ((jr)object).b().readShort();
                    short s3 = ((jr)object).b().readShort();
                    byte[] byArray = new byte[s3];
                    ((jr)object).b().read(byArray);
                    gb.g.put("" + s2, new f(aw.a(byArray)));
                    return;
                }
                case 84: {
                    byte by9 = ((jr)object).b().readByte();
                    if (by9 == 0) {
                        String string = ((jr)object).b().readUTF();
                        main.a.a(string, 7, go.a);
                        return;
                    }
                    int n23 = ((jr)object).b().readInt();
                    short s4 = ((jr)object).b().readShort();
                    GameMidlet.i.a[0] = GameMidlet.i.a[0] - n23;
                    go.J.e = s4 * 60;
                    go.J.h = System.currentTimeMillis();
                    main.a.a(-n23, GameMidlet.i.aw, GameMidlet.i.ax, -1, -1);
                    return;
                }
                case 85: {
                    short s5 = ((jr)object).b().readShort();
                    short s6 = ((jr)object).b().readShort();
                    go.b();
                    go.a(s5, s6);
                    return;
                }
                case 86: {
                    byte by10 = ((jr)object).b().readByte();
                    if (by10 == 0) {
                        String string = ((jr)object).b().readUTF();
                        main.a.a(string, 8, go.a);
                        return;
                    }
                    ((jr)object).b().readInt();
                    go.J.b = ((jr)object).b().readShort();
                    go.J.e = 0;
                    go.J.a = (short)(go.J.a + 1);
                    int n24 = ((jr)object).b().readInt();
                    int n25 = ((jr)object).b().readInt();
                    GameMidlet.i.a(GameMidlet.i.a[0], n24, n25);
                    return;
                }
                case 90: {
                    byte by11 = ((jr)object).b().readByte();
                    if (by11 == 0) {
                        String string = ((jr)object).b().readUTF();
                        Vector<by> vector = new Vector<by>();
                        vector.addElement(new by(kf.C, 9, go.a));
                        vector.addElement(new by(kf.D, 10, go.a));
                        vector.addElement(main.a.ad);
                        main.a.a(string, vector);
                        return;
                    }
                    ((jr)object).b().readByte();
                    ((jr)object).b().readInt();
                    byte by12 = ((jr)object).b().readByte();
                    main.a.b(((jr)object).b().readUTF());
                    cf cf3 = (cf)go.c.elementAt(by12);
                    cf3.p = (byte)(cf3.p + 1);
                    go.b().a(go.b, go.c, go.i, go.P, go.Q, go.V, go.U);
                    int n26 = ((jr)object).b().readInt();
                    int n27 = ((jr)object).b().readInt();
                    GameMidlet.i.a(GameMidlet.i.a[0], n26, n27);
                    return;
                }
                case 94: {
                    byte by13 = ((jr)object).b().readByte();
                    if (by13 == 0) {
                        String string = ((jr)object).b().readUTF();
                        Vector<by> vector = new Vector<by>();
                        vector.addElement(new by(kf.C, 13, go.a));
                        vector.addElement(new by(kf.D, 14, go.a));
                        vector.addElement(main.a.ad);
                        main.a.a(string, vector);
                        return;
                    }
                    byte by14 = ((jr)object).b().readByte();
                    int n28 = ((jr)object).b().readInt();
                    if (by14 == 1) {
                        GameMidlet.i.a[0] = GameMidlet.i.a[0] - n28;
                    } else {
                        GameMidlet.i.a[2] = GameMidlet.i.a[2] - n28;
                    }
                    ((jr)object).b().readInt();
                    go.O = (byte)(go.O + 1);
                    main.a.b(((jr)object).b().readUTF());
                    go.b().a(go.b, go.c, go.i, go.P, go.Q, go.V, go.U);
                    return;
                }
                case 91: {
                    short s7 = ((jr)object).b().readShort();
                    if (s7 == -1) {
                        go.V = 0;
                    } else {
                        short s8 = ((jr)object).b().readShort();
                        go.V = s7;
                        go.U = s8 * 60;
                    }
                    main.a.h();
                    return;
                }
                case 93: {
                    byte by15 = ((jr)object).b().readByte();
                    if (by15 == 0) {
                        String string = ((jr)object).b().readUTF();
                        main.a.a(string, 11, go.a);
                        return;
                    }
                    int n29 = ((jr)object).b().readInt();
                    GameMidlet.i.a[2] = GameMidlet.i.a[2] - n29;
                    go.U = 0;
                    int n30 = ((jr)object).b().readInt();
                    int n31 = ((jr)object).b().readInt();
                    GameMidlet.i.a(GameMidlet.i.a[0], n30, n31);
                    return;
                }
                case 92: {
                    hf hf2 = gb.b(go.V);
                    az az3 = go.b(hf2.b);
                    dc dc6 = go.f(hf2.b);
                    if (dc6 != null) {
                        ++dc6.e;
                    } else {
                        dc dc7 = new dc();
                        new dc().a = hf2.b;
                        dc7.e = 1;
                        go.e.addElement(dc7);
                    }
                    main.a.a(0, go.W, go.X, -1, 0, az3.b, -1);
                    go.V = 0;
                    return;
                }
                case 83: {
                    boolean bl3 = ((jr)object).b().readBoolean();
                    if (bl3) {
                        go.J.b = ((jr)object).b().readShort();
                        go.J.a = (short)(go.J.a + 1);
                        return;
                    }
                    break;
                }
                default: {
                    return;
                }
            }
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
    }

    private static boolean a() {
        return ir.a != 24 && ir.a != 53;
    }

    private static void a(cf cf2, jr jr2) {
        short s2 = jr2.b().readShort();
        go.a(cf2.d, (int)s2, cf2, null);
        cf2.d = s2;
        cf2.h = cf2.d * 60;
        s2 = jr2.b().readByte();
        go.a(cf2.n, (int)s2, cf2, null);
        cf2.n = (byte)s2;
        cf2.m = jr2.b().readByte();
        cf2.i = jr2.b().readBoolean();
        s2 = (short)(jr2.b().readBoolean() ? 1 : 0);
        int n2 = -1;
        if (s2 == 0 && cf2.j) {
            n2 = 0;
        }
        cf2.j = s2;
        boolean bl2 = jr2.b().readBoolean();
        if (!bl2 && cf2.k) {
            n2 = 9 * gy.Y;
        }
        cf2.k = bl2;
        if (n2 >= 0) {
            main.a.a(0, cf2.a * ir.i + 11, cf2.b * ir.i, -1, aw.a(0, n2, 13 * gy.Y, 9 * gy.Y, go.q.d), -1);
        }
    }

    private static void a(ai ai2, jr jr2) {
        ai2.g = jr2.b().readInt();
        byte by2 = jr2.b().readByte();
        go.a(ai2.h, (int)by2, null, ai2);
        ai2.h = by2;
        jr2.b().readByte();
        ai2.o = jr2.b().readByte();
        ai2.i = jr2.b().readBoolean();
        by2 = (byte)(jr2.b().readBoolean() ? 1 : 0);
        boolean bl2 = jr2.b().readBoolean();
        int n2 = -1;
        if (by2 == 0 && ai2.j[0]) {
            n2 = 0;
        }
        if (!bl2 && ai2.j[1]) {
            n2 = 13 * gy.Y;
        }
        if (n2 >= 0) {
            main.a.a(0, ai2.aw, ai2.ax - ai2.aA, -1, aw.a(0, n2, 9 * gy.Y, 13 * gy.Y, go.u.d), -1);
        }
        ai2.j[0] = by2;
        ai2.j[1] = bl2;
    }

    private static void b(jr jr2) {
        int n2;
        byte by2;
        byte by3;
        int n3 = jr2.b().readInt();
        Vector<cf> vector = new Vector<cf>();
        Vector<ai> vector2 = new Vector<ai>();
        short s2 = 0;
        if (n3 != -1) {
            s2 = jr2.b().readByte();
            by3 = 0;
            while (by3 < s2) {
                cf cf2 = new cf();
                new cf().c = jr2.b().readByte();
                if (cf2.c == -1) {
                    vector.addElement(cf2);
                } else {
                    kz.a(cf2, jr2);
                    vector.addElement(cf2);
                }
                ++by3;
            }
            by3 = jr2.b().readByte();
            if (ir.a != 24 || GameMidlet.i.w != n3) {
                dt.t = 0;
                dz.t = 0;
                ex.r = 0;
                go.i.removeAllElements();
            }
            by2 = 0;
            while (by2 < by3) {
                ai ai2 = null;
                n2 = jr2.b().readByte();
                int n4 = go.i.size();
                if (ir.a != 24 || n4 == 0 || n4 != by3) {
                    ad ad2 = gb.c(n2);
                    if (n2 != -1) {
                        switch (ad2.c) {
                            case 4: {
                                ai2 = new ip(by2, (byte)n2, 0);
                                break;
                            }
                            case 2: {
                                ai2 = new dt(by2, (byte)n2);
                                break;
                            }
                            case 3: {
                                ai2 = new dz(by2, (byte)n2);
                                break;
                            }
                            case 1: {
                                ai2 = new ex(by2, (byte)n2, 0);
                            }
                            default: {
                                break;
                            }
                        }
                    }
                } else {
                    go.e(by2);
                    ai2 = (ai)go.i.elementAt(by2);
                }
                if (n2 != -1 && ai2 != null) {
                    ai2.k = n2;
                    kz.a(ai2, jr2);
                    vector2.addElement(ai2);
                }
                ++by2;
            }
        }
        by3 = jr2.b().readByte();
        by2 = jr2.b().readByte();
        go.J = new kc();
        new kc().a = jr2.b().readShort();
        go.J.b = jr2.b().readShort();
        go.J.c = jr2.b().readShort();
        go.J.d = jr2.b().readShort();
        jr2.b().readShort();
        jr2.b().readShort();
        go.J.e = jr2.b().readShort() * 60;
        go.J.h = System.currentTimeMillis();
        short s3 = 0;
        while (s3 < s2) {
            cf cf3 = (cf)vector.elementAt(s3);
            ((cf)vector.elementAt(s3)).p = jr2.b().readByte();
            ++s3;
        }
        s3 = 0;
        n2 = 0;
        if (jr2.b().available() > 0) {
            s3 = jr2.b().readShort();
            n2 = jr2.b().readShort() * 60;
        }
        go.b().a(n3, vector, vector2, by3, by2, s3, n2);
    }
}


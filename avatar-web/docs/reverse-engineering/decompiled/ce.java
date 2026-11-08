/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import java.util.Hashtable;
import java.util.Vector;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ce
extends kj
implements cm {
    private jn c = new jn();
    private static ce d;
    public kk a;

    public static ce a() {
        if (d == null) {
            d = new ce();
        }
        return d;
    }

    public final void b() {
        System.out.println("onConnectionFail");
        main.a.b(kf.Y);
    }

    public final void c() {
        System.out.println("onDisconnected");
        main.a.h();
        GameMidlet.e = 8;
        if (main.a.r != es.a) {
            main.a.b(kf.aO, new du());
        } else {
            main.a.b(kf.aO);
        }
        main.a.t = null;
        ei.a = null;
        hc.d = null;
        q.a.a();
        if (im.d().ac.b != null) {
            im.d().ac.b.a();
        }
        gb.a();
    }

    public final void a(jr jr2) {
        try {
            block2 : switch (jr2.a) {
                case -62: {
                    System.out.println("CHANGE_PASS");
                    es.b().c.a(jr2.b().readUTF());
                    es.b().g();
                    break;
                }
                case -12: {
                    String string = jr2.b().readUTF();
                    String string2 = jr2.b().readUTF();
                    es.b().a(string, string2);
                    break;
                }
                case -25: {
                    byte by2 = jr2.b().readByte();
                    String string = null;
                    String string3 = null;
                    String string4 = null;
                    if (by2 == 2) {
                        string3 = jr2.b().readUTF();
                        string4 = jr2.b().readUTF();
                    } else {
                        string = jr2.b().readUTF();
                    }
                    ea.b().a(by2, string, string3, string4);
                    break;
                }
                case -7: {
                    this.c.a(jr2.b().readUTF(), jr2.b().readUTF());
                    return;
                }
                case -9: {
                    main.a.b(jr2.b().readUTF());
                    return;
                }
                case -8: {
                    main.a.a(jr2.b().readUTF());
                    return;
                }
                case -10: {
                    String string = jr2.b().readUTF();
                    boolean bl2 = false;
                    if (jr2.b().available() > 0) {
                        bl2 = jr2.b().readBoolean();
                    }
                    this.c.a(string, bl2);
                    return;
                }
                case -23: {
                    Vector<gu> vector = new Vector<gu>();
                    while (jr2.b().available() > 0) {
                        gu gu2 = new gu();
                        new gu().a = jr2.b().readUTF();
                        gu2.c = jr2.b().readUTF();
                        jr2.b().readUTF();
                        gu2.b = jr2.b().readUTF();
                        vector.addElement(gu2);
                    }
                    jd.b().a(vector);
                    jd.b().a(main.a.r);
                    main.a.h();
                    return;
                }
                case -21: {
                    hn hn2 = new hn();
                    new hn().w = jr2.b().readInt();
                    hn2.x = jr2.b().readUTF();
                    String string = jr2.b().readUTF();
                    ae.b().a(hn2, string);
                    return;
                }
                case -19: {
                    hn hn3 = new hn();
                    new hn().w = jr2.b().readInt();
                    hn3.x = jr2.b().readUTF();
                    boolean bl3 = jr2.b().readBoolean();
                    String string = jr2.b().readUTF();
                    ae.b();
                    ae.a(bl3, string);
                    return;
                }
                case -35: {
                    boolean bl4 = jr2.b().readBoolean();
                    ic.b();
                    ic.b(bl4);
                    return;
                }
                case -36: {
                    int n2 = jr2.b().readInt();
                    short s2 = jr2.b().readShort();
                    ae.b();
                    ae.b(n2, (int)s2);
                    return;
                }
                case -6: {
                    int n3 = jr2.b().readInt();
                    String string = jr2.b().readUTF();
                    String string5 = jr2.b().readUTF();
                    if (main.a.r != hc.b()) {
                        ++hj.as;
                    }
                    hc.b().a(n3, string, string5);
                    return;
                }
                case -22: {
                    int n4 = jr2.b().readInt();
                    kp kp2 = new kp();
                    new kp().g = jr2.b().readByte();
                    kp2.f = jr2.b().readByte();
                    kp2.a = jr2.b().readByte();
                    kp2.b = jr2.b().readByte();
                    kp2.e = jr2.b().readByte();
                    kp2.c = jr2.b().readByte();
                    kp2.d = jr2.b().readByte();
                    hn hn4 = null;
                    int n5 = jr2.b().readInt();
                    String string = "";
                    String string6 = "";
                    short s3 = 0;
                    byte by3 = 0;
                    byte by4 = 0;
                    short s4 = -1;
                    String string7 = "";
                    if (n5 != -1) {
                        hn4 = new hn();
                        new hn().w = n5;
                        hn4.a(jr2.b().readUTF());
                        n5 = jr2.b().readByte();
                        int n6 = 0;
                        while (n6 < n5) {
                            hn4.a(new hx(jr2.b().readShort()));
                            ++n6;
                        }
                        string = jr2.b().readUTF();
                        s3 = jr2.b().readShort();
                        by3 = jr2.b().readByte();
                        by4 = jr2.b().readByte();
                        string6 = jr2.b().readUTF();
                        s4 = jr2.b().readShort();
                        if (s4 != -1) {
                            string7 = jr2.b().readUTF();
                        }
                    }
                    if (jr2.b().available() > 0) {
                        GameMidlet.j.g = kp2.g = jr2.b().readShort();
                        GameMidlet.i.v = kp2.g;
                    }
                    ae.b().a(n4, kp2, hn4, string, s3, by3, by4, string6, s4, string7);
                    return;
                }
                case 34: {
                    int n7 = jr2.b().readInt();
                    if (n7 != -1) {
                        String string = jr2.b().readUTF();
                        int n8 = jr2.b().readInt();
                        jr2.b().readShort();
                        int n9 = jr2.b().readInt();
                        int n10 = jr2.b().readInt();
                        n7 = jr2.b().readInt();
                        int n11 = jr2.b().readInt();
                        int n12 = jr2.b().readInt();
                        hn hn5 = new hn();
                        hn5.d(n9);
                        String string8 = String.valueOf(kf.aA) + string + ". " + kf.ao + n8 + "$. Level: " + hn5.v + "+" + hn5.r + "%. " + kf.aP + ": " + n10 + ". " + kf.aQ + ": " + n7 + ". " + kf.aR + ": " + n11 + ". " + kf.aS + ": " + n12;
                        main.a.b(string8);
                    }
                    return;
                }
                case -42: {
                    hd hd2;
                    Vector<hd> vector = new Vector<hd>();
                    int n13 = jr2.b().readByte();
                    int n14 = 0;
                    while (n14 < n13) {
                        hd2 = new hd(this);
                        jr2.b().readShort();
                        hd2.b = jr2.b().readUTF();
                        hd2.c = jr2.b().readUTF();
                        hd2.d = jr2.b().readUTF();
                        hd2.e = jr2.b().readUTF();
                        hd2.f = jr2.b().readUTF();
                        hd2.g = new Vector();
                        int n15 = jr2.b().readByte();
                        int n16 = 0;
                        while (n16 < n15) {
                            dr dr2 = new dr();
                            new dr().c = jr2.b().readByte();
                            dr2.a = jr2.b().readByte();
                            dr2.b = jr2.b().readByte();
                            hd2.g.addElement(dr2);
                            ++n16;
                        }
                        vector.addElement(hd2);
                        ++n14;
                    }
                    n14 = 0;
                    while (n14 < n13) {
                        hd2 = (hd)vector.elementAt(n14);
                        ((hd)vector.elementAt(n14)).a = jr2.b().readByte();
                        ++n14;
                    }
                    fx.a(vector);
                    return;
                }
                case -33: {
                    int n17 = jr2.b().readInt();
                    byte by5 = jr2.b().readByte();
                    if (n17 != 0 && by5 != 1 && by5 == 2 && by5 == 5) {
                        GameMidlet.i.b(GameMidlet.i.a[3] + n17);
                        main.a.a(String.valueOf(n17) + "xeng", GameMidlet.i.aw, GameMidlet.i.ax, -1, 0, -1);
                    }
                    int n18 = jr2.b().readInt();
                    int n19 = jr2.b().readInt();
                    int n20 = jr2.b().readInt();
                    GameMidlet.i.a(n18, n19, n20);
                    return;
                }
                case -1: {
                    jn.a(jr2.b().readByte());
                    return;
                }
                case -47: {
                    Vector<hx> vector = new Vector<hx>();
                    int n21 = jr2.b().readShort();
                    int n22 = 0;
                    while (n22 < n21) {
                        hx hx2 = new hx();
                        new hx().a = jr2.b().readShort();
                        hx2.b = jr2.b().readByte();
                        hx2.c = jr2.b().readUTF();
                        vector.addElement(hx2);
                        ++n22;
                    }
                    ae.b().a(vector);
                    return;
                }
                case -48: {
                    int n23 = jr2.b().readInt();
                    short s5 = jr2.b().readShort();
                    ae.b();
                    ae.a(n23, s5);
                    return;
                }
                case -49: {
                    byte by6 = jr2.b().readByte();
                    System.out.println("OPEN_SHOP: " + by6);
                    String string = jr2.b().readUTF();
                    short[] sArray = null;
                    int n24 = jr2.b().readShort();
                    if (n24 > 0) {
                        sArray = new short[n24];
                        int n25 = 0;
                        while (n25 < n24) {
                            sArray[n25] = jr2.b().readShort();
                            ++n25;
                        }
                    }
                    ae.b().a((byte)0, by6, string, sArray, -1, null);
                    return;
                }
                case -50: {
                    String string = jr2.b().readUTF();
                    byte by7 = jr2.b().readByte();
                    q.a.a(string, by7);
                    return;
                }
                case -51: {
                    byte by8 = jr2.b().readByte();
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    q.a.a(byArray, by8);
                    return;
                }
                case -52: {
                    String string = jr2.b().readUTF();
                    jr2.b().readInt();
                    es.b().a(string);
                    return;
                }
                case -90: 
                case -53: {
                    byte by9 = jr2.b().readByte();
                    String string = jr2.b().readUTF();
                    this.c.a((byte)(jr2.a != -53 ? 1 : 0), by9, string);
                    return;
                }
                case -54: {
                    String string = jr2.b().readUTF();
                    String string9 = jr2.b().readUTF();
                    String string10 = jr2.b().readUTF();
                    main.a.h();
                    main.a.a(string, new bm(this, string9, string10));
                    break;
                }
                case 50: {
                    if (this.a == kz.a || this.a == eo.a || this.a == df.a) {
                        byte by10 = jr2.b().readByte();
                        byte by11 = jr2.b().readByte();
                        short s6 = 0;
                        short s7 = 0;
                        Vector vector = new Vector();
                        if (by11 != -1 && by11 != -2) {
                            s6 = jr2.b().readShort();
                            s7 = jr2.b().readShort();
                            vector = ce.b(jr2);
                        }
                        short s8 = jr2.b().readShort();
                        Vector vector2 = null;
                        Vector vector3 = null;
                        if (s8 > 0) {
                            vector2 = ce.f(jr2);
                            vector3 = ce.e(jr2);
                        }
                        if (GameMidlet.e == 9) {
                            int n26 = 0;
                            while (n26 < vector.size()) {
                                hn hn6 = (hn)vector.elementAt(n26);
                                ((hn)vector.elementAt(n26)).aa = jr2.b().readShort();
                                ++n26;
                            }
                        }
                        ae.b().a(by10, by11, s6, s7, vector, vector2, vector3);
                        if (ir.a == 21) {
                            main.a.J = 0;
                            df.a();
                            iy.a().c(0);
                            main.a.i();
                        }
                    }
                    break;
                }
                case -58: {
                    byte by12;
                    int n27 = jr2.b().readByte();
                    Hashtable<String, Image> hashtable = new Hashtable<String, Image>();
                    int n28 = 0;
                    while (n28 < n27) {
                        short s9 = jr2.b().readShort();
                        by12 = jr2.b().readShort();
                        byte[] byArray = new byte[by12];
                        jr2.b().read(byArray);
                        Image image = aw.a(byArray);
                        hashtable.put("" + s9, image);
                        ++n28;
                    }
                    String string = jr2.b().readUTF();
                    String string11 = jr2.b().readUTF();
                    System.err.println("CUSTOM_TAB: " + string);
                    System.err.println("CUSTOM_TAB111: " + string11);
                    by12 = -1;
                    if (jr2.b().available() > 0) {
                        by12 = jr2.b().readByte();
                    }
                    jb.a = null;
                    jb.b().a(hashtable, string, string11, by12);
                    jb.b().a();
                    return;
                }
                case -59: {
                    if (main.a.v == main.a.s) {
                        main.a.v = null;
                    }
                    if (main.a.v != null) {
                        return;
                    }
                    int n29 = jr2.b().readInt();
                    byte by13 = jr2.b().readByte();
                    int n30 = jr2.b().readByte();
                    String[] stringArray = new String[n30];
                    short[] sArray = new short[n30];
                    int n31 = 0;
                    while (n31 < n30) {
                        stringArray[n31] = jr2.b().readUTF();
                        ++n31;
                    }
                    if (jr2.b().available() > 0) {
                        n31 = 0;
                        while (n31 < n30) {
                            sArray[n31] = jr2.b().readShort();
                            ++n31;
                        }
                    }
                    String string = null;
                    String string12 = null;
                    boolean[] blArray = null;
                    if (jr2.b().available() > 0) {
                        string = jr2.b().readUTF();
                        string12 = jr2.b().readUTF();
                        blArray = new boolean[n30];
                        int n32 = 0;
                        while (n32 < n30) {
                            blArray[n32] = jr2.b().readBoolean();
                            ++n32;
                        }
                    }
                    this.c.a(n29, by13, stringArray, string, string12, blArray);
                    return;
                }
                case -60: {
                    int n33 = jr2.b().readInt();
                    byte by14 = jr2.b().readByte();
                    String string = jr2.b().readUTF();
                    byte by15 = jr2.b().readByte();
                    byte[] byArray = null;
                    if (jr2.b().available() > 0) {
                        short s10 = jr2.b().readShort();
                        byArray = new byte[s10];
                        jr2.b().read(byArray);
                    }
                    main.a.u.a(string, new bo(this, n33, by14), (int)by15);
                    if (byArray != null) {
                        main.a.u.a(Image.createImage((byte[])byArray, (int)0, (int)byArray.length));
                    }
                    return;
                }
                case -63: {
                    byte by16 = jr2.b().readByte();
                    ir.a(by16);
                    return;
                }
                case -64: {
                    int n34 = jr2.b().readInt();
                    short s11 = jr2.b().readShort();
                    int n35 = jr2.b().readByte();
                    Vector<jh> vector = new Vector<jh>();
                    int n36 = 0;
                    while (n36 < n35) {
                        jh jh2 = new jh();
                        new jh().b = jr2.b().readByte();
                        switch (jh2.b) {
                            case 1: {
                                jh2.a = jr2.b().readShort();
                                byte by17 = jr2.b().readByte();
                                if (by17 == -1) {
                                    jh2.h = "(" + kf.cQ + ")";
                                    break;
                                }
                                jh2.h = "(" + by17 + " " + kf.cM + ")";
                                break;
                            }
                            case 2: {
                                jh2.c = jr2.b().readInt();
                                break;
                            }
                            case 3: {
                                jh2.f = jr2.b().readInt();
                                break;
                            }
                            case 4: {
                                jh2.g = jr2.b().readInt();
                            }
                        }
                        vector.addElement(jh2);
                        ++n36;
                    }
                    hw.b().a(n34, s11, vector);
                    return;
                }
                case -70: {
                    int n37 = jr2.b().readInt();
                    byte by18 = (byte)(100 - jr2.b().readByte());
                    ae.b();
                    ae.b(n37, by18);
                    return;
                }
                case -80: {
                    short s12 = jr2.b().readShort();
                    short s13 = jr2.b().readShort();
                    byte[] byArray = new byte[s13];
                    jr2.b().read(byArray);
                    fx.h.put("" + s12, new f(aw.a(byArray)));
                    return;
                }
                case -81: {
                    String string = jr2.b().readUTF();
                    int n38 = 0;
                    int n39 = 0;
                    while (n39 < string.length()) {
                        if (string.charAt(n39) == '-') {
                            ++n38;
                        }
                        ++n39;
                    }
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    if (n38 == 2 || string.equals(cy.h)) {
                        cy.i.put(string, byArray);
                        cy.b().a(string);
                        return;
                    }
                    cy.b().a(byArray, string);
                    main.a.h();
                    return;
                }
                case -82: {
                    int n40 = jr2.b().readInt();
                    short s14 = jr2.b().readShort();
                    ae.b();
                    ae.b(n40, s14);
                    return;
                }
                case -83: {
                    int n41 = jr2.b().readByte();
                    Vector<bc> vector = new Vector<bc>();
                    int n42 = 0;
                    while (n42 < n41) {
                        bc bc2 = new bc();
                        new bc().e = jr2.b().readShort();
                        bc2.a = jr2.b().readUTF();
                        bc2.d = jr2.b().readShort();
                        vector.addElement(bc2);
                        ++n42;
                    }
                    ae.b().b(vector);
                    return;
                }
                case -77: {
                    int n43 = jr2.b().readInt();
                    byte by19 = jr2.b().readByte();
                    String string = jr2.b().readUTF();
                    int n44 = jr2.b().readByte();
                    String[] stringArray = new String[n44];
                    int n45 = 0;
                    while (n45 < n44) {
                        stringArray[n45] = jr2.b().readUTF();
                        ++n45;
                    }
                    if (dp.a != main.a.r) {
                        ae.b().a(n43, (int)by19, string, stringArray);
                    }
                    return;
                }
                case -78: {
                    byte by20 = jr2.b().readByte();
                    int n46 = jr2.b().readInt();
                    byte by21 = jr2.b().readByte();
                    String string = jr2.b().readUTF();
                    int n47 = jr2.b().readShort();
                    if (n47 > 0) {
                        short[] sArray = new short[n47];
                        String[] stringArray = new String[n47];
                        String[] stringArray2 = null;
                        if (by20 == 1) {
                            stringArray2 = new String[n47];
                        }
                        int n48 = 0;
                        while (n48 < n47) {
                            sArray[n48] = jr2.b().readShort();
                            stringArray[n48] = jr2.b().readUTF();
                            if (by20 == 1) {
                                stringArray2[n48] = jr2.b().readUTF();
                            }
                            ++n48;
                        }
                        ae.b().a(by20, by21, string, sArray, n46, stringArray);
                    }
                    return;
                }
                case 89: {
                    byte by22 = jr2.b().readByte();
                    System.out.println("DROP_PART: " + by22 + "    " + jr2.b().available());
                    if (by22 == 0) {
                        byte by23 = jr2.b().readByte();
                        short s15 = jr2.b().readShort();
                        int n49 = jr2.b().readInt();
                        int n50 = jr2.b().readInt();
                        System.out.println("aaaaaa: " + by23 + "   " + s15 + "   " + n49 + "   " + n50);
                        short s16 = jr2.b().readShort();
                        short s17 = jr2.b().readShort();
                        ae.b();
                        ae.a(by23, n50, s15, n49, s16, s17);
                        return;
                    }
                    int n51 = jr2.b().readInt();
                    int n52 = jr2.b().readInt();
                    ae.b();
                    ae.c(n51, n52);
                    return;
                }
                case -84: {
                    int n53;
                    byte by24 = jr2.b().readByte();
                    byte by25 = jr2.b().readByte();
                    if (by25 == 5 || by25 == 2) {
                        return;
                    }
                    if (by24 == 0) {
                        al al2 = fx.d(by25);
                        if (al2 == null) {
                            iy.a().c(by25);
                        }
                        lc lc2 = new lc();
                        new lc().a = by25;
                        lc2.k = jr2.b().readByte();
                        byte by26 = jr2.b().readByte();
                        lc2.g = by26;
                        lc2.c = by26;
                        if (lc2.k == 4) {
                            short s18 = jr2.b().readShort();
                            byte by27 = jr2.b().readByte();
                            if (main.a.B.size() > 0) {
                                int n54 = 0;
                                while (n54 < main.a.B.size()) {
                                    gz gz2 = (gz)main.a.B.elementAt(n54);
                                    if (gz2.c == by25) {
                                        return;
                                    }
                                    ++n54;
                                }
                            }
                            ba ba2 = new ba(2, s18);
                            new ba(2, s18).a = by27;
                            ba2.c = by25;
                            ba2.c();
                            return;
                        }
                        lc2.b = jr2.b().readShort();
                        lc2.l = jr2.b().readByte();
                        if (lc2.l == 1) {
                            lc2.d = jr2.b().readShort();
                        } else if (lc2.l == 2) {
                            int n55 = jr2.b().readByte();
                            lc2.m = new short[n55];
                            lc2.n = new short[n55];
                            int n56 = 0;
                            while (n56 < n55) {
                                lc2.m[n56] = jr2.b().readShort();
                                lc2.n[n56] = jr2.b().readShort();
                                ++n56;
                            }
                        }
                        if (lc2.k == 0) {
                            lc2.j = jr2.b().readInt();
                        } else {
                            lc2.e = jr2.b().readShort();
                            lc2.f = jr2.b().readShort();
                        }
                        ae.b();
                        ae.a(lc2);
                        return;
                    }
                    al al3 = new al();
                    new al().e = by25;
                    short s19 = jr2.b().readShort();
                    byte[] byArray = new byte[s19];
                    jr2.b().read(byArray);
                    al3.c = aw.a(byArray);
                    int n57 = jr2.b().readByte();
                    al3.b = new ke[n57];
                    int n58 = 0;
                    while (n58 < n57) {
                        al3.b[n58] = new ke();
                        al3.b[n58].a = jr2.b().readByte();
                        al3.b[n58].c = jr2.b().readByte();
                        al3.b[n58].d = jr2.b().readByte();
                        al3.b[n58].e = jr2.b().readByte();
                        al3.b[n58].f = jr2.b().readByte();
                        ++n58;
                    }
                    n58 = jr2.b().readByte();
                    al3.d = new jf[n58];
                    int n59 = 0;
                    while (n59 < n58) {
                        al3.d[n59] = new jf(this);
                        n53 = jr2.b().readByte();
                        al3.d[n59].b = new short[n53];
                        al3.d[n59].c = new short[n53];
                        al3.d[n59].a = new byte[n53];
                        int n60 = 0;
                        while (n60 < n53) {
                            al3.d[n59].b[n60] = jr2.b().readByte();
                            al3.d[n59].c[n60] = jr2.b().readByte();
                            al3.d[n59].a[n60] = jr2.b().readByte();
                            ++n60;
                        }
                        ++n59;
                    }
                    n59 = jr2.b().readByte();
                    al3.a = new byte[n59];
                    n53 = 0;
                    while (n53 < n59) {
                        al3.a[n53] = jr2.b().readByte();
                        ++n53;
                    }
                    fx.k.addElement(al3);
                    return;
                }
                case -85: {
                    int n61 = jr2.b().readInt();
                    int n62 = jr2.b().readByte();
                    Vector<bd> vector = new Vector<bd>();
                    int n63 = 0;
                    while (n63 < n62) {
                        bd bd2 = new bd(this);
                        jr2.b().readByte();
                        bd2.a = jr2.b().readShort();
                        bd2.b = jr2.b().readShort();
                        vector.addElement(bd2);
                        ++n63;
                    }
                    ae.b();
                    ae.a(n61, vector);
                    return;
                }
                case -24: {
                    short s20 = jr2.b().readShort();
                    if (s20 != -1) {
                        jr2.b().readInt();
                        jr2.b().readByte();
                    }
                    String string = jr2.b().readUTF();
                    int n64 = jr2.b().readInt();
                    int n65 = jr2.b().readInt();
                    int n66 = jr2.b().readInt();
                    ae.b();
                    ae.a(s20, string, n64, n65, n66);
                    return;
                }
                case -87: {
                    int n67 = jr2.b().readShort();
                    Vector<hx> vector = new Vector<hx>();
                    int n68 = 0;
                    while (n68 < n67) {
                        hx hx3 = new hx();
                        new hx().a = jr2.b().readShort();
                        hx3.b = jr2.b().readByte();
                        hx3.c = jr2.b().readUTF();
                        vector.addElement(hx3);
                        ++n68;
                    }
                    n68 = jr2.b().readInt();
                    byte by28 = jr2.b().readByte();
                    int n69 = jr2.b().readShort();
                    Vector<hx> vector4 = new Vector<hx>();
                    int n70 = 0;
                    while (n70 < n69) {
                        hx hx4 = new hx();
                        new hx().a = jr2.b().readShort();
                        hx4.b = jr2.b().readByte();
                        hx4.c = jr2.b().readUTF();
                        vector4.addElement(hx4);
                        ++n70;
                    }
                    ei.b().a(vector, vector4, n68, by28);
                    return;
                }
                case -88: {
                    ei.b();
                    ei.g();
                    return;
                }
                case -89: {
                    ei.b().a(jr2.b().readBoolean(), jr2.b().readUTF());
                    return;
                }
                case -92: {
                    jr2.b().readByte();
                    int n71 = jr2.b().readInt();
                    byte[] byArray = new byte[n71];
                    jr2.b().read(byArray);
                    int n72 = jr2.b().readInt();
                    jr2.b().readByte();
                    byte[] byArray2 = new byte[n72];
                    int n73 = 0;
                    while (n73 < n72) {
                        byArray2[n73] = jr2.b().readByte();
                        ++n73;
                    }
                    n73 = jr2.b().readByte();
                    Vector<kb> vector = new Vector<kb>();
                    int n74 = 0;
                    while (n74 < n73) {
                        kb kb2 = new kb();
                        jr2.b().readByte();
                        kb2.d = jr2.b().readShort();
                        kb2.c = jr2.b().readUTF();
                        kb2.a = jr2.b().readByte();
                        kb2.b = jr2.b().readByte();
                        vector.addElement(kb2);
                        ++n74;
                    }
                    ea.j = false;
                    ea.b().a();
                    ir.a = -1;
                    ir.D = -108;
                    ir.E = -1;
                    return;
                }
                case -93: {
                    int n75;
                    byte by29 = jr2.b().readByte();
                    byte by30 = jr2.b().readByte();
                    jr2.b().readShort();
                    byte by31 = jr2.b().readByte();
                    short s21 = jr2.b().readShort();
                    byte[] byArray = new byte[s21];
                    jr2.b().read(byArray);
                    short[] sArray = null;
                    byte by32 = jr2.b().readByte();
                    if (by32 > 0) {
                        sArray = new short[by32];
                        n75 = 0;
                        while (n75 < by32) {
                            sArray[n75] = jr2.b().readShort();
                            ++n75;
                        }
                    }
                    n75 = jr2.b().readShort();
                    Image image = null;
                    if (n75 > 0) {
                        byte[] byArray3 = new byte[n75];
                        jr2.b().read(byArray3);
                        image = aw.a(byArray3);
                    }
                    short s22 = jr2.b().readShort();
                    Vector vector = null;
                    Vector vector5 = null;
                    if (s22 > 0) {
                        vector = ce.f(jr2);
                        vector5 = ce.e(jr2);
                    }
                    ae.b();
                    ae.a(byArray, by29, by30, by31, image, sArray, vector, vector5);
                    return;
                }
                case -94: {
                    byte by33 = jr2.b().readByte();
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    main.a.x.a(by33, byArray);
                    return;
                }
                case -96: {
                    main.a.h();
                    ae.b().n();
                    la.b().a();
                    la.b().b = 0;
                    return;
                }
                case -97: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    Vector vector = fx.a(byArray, true);
                    ld ld2 = (ld)vector.elementAt(0);
                    fx.j.put("" + ld2.g, ld2);
                    int n76 = 0;
                    while (n76 < ir.m.size()) {
                        js js2 = (js)ir.m.elementAt(n76);
                        if (js2.az == 0) {
                            hn hn7 = (hn)js2;
                            hn7.h();
                        }
                        ++n76;
                    }
                    return;
                }
                case -98: {
                    short s23 = jr2.b().readShort();
                    short s24 = jr2.b().readShort();
                    byte[] byArray = new byte[s24];
                    jr2.b().read(byArray);
                    fx.i.put("" + s23, new f(aw.a(byArray)));
                    return;
                }
                case -38: {
                    short s25 = jr2.b().readShort();
                    int n77 = 0;
                    if (s25 != -1) {
                        n77 = jr2.b().readInt();
                    }
                    int n78 = jr2.b().readInt();
                    int n79 = jr2.b().readInt();
                    int n80 = jr2.b().readInt();
                    GameMidlet.i.a(n78, n79, n80);
                    ae.b();
                    ae.a(s25, n77);
                    return;
                }
                case -99: {
                    int n81;
                    int n82;
                    Object object;
                    byte by34 = jr2.b().readByte();
                    int n83 = jr2.b().readByte();
                    Vector<Object> vector = new Vector<Object>();
                    int n84 = 0;
                    while (n84 < n83) {
                        object = new hn();
                        new hn().w = jr2.b().readInt();
                        ((hn)object).a(jr2.b().readUTF());
                        byte by35 = jr2.b().readByte();
                        n82 = 0;
                        while (n82 < by35) {
                            ((hn)object).a(new hx(jr2.b().readShort()));
                            ++n82;
                        }
                        ((js)object).aw = jr2.b().readShort();
                        ((js)object).ax = jr2.b().readShort();
                        ((hn)object).ac = jr2.b().readByte();
                        ((hn)object).W = (byte)(100 - jr2.b().readByte());
                        ((hn)object).X = jr2.b().readShort();
                        n82 = jr2.b().readByte();
                        ((hn)object).ar = new String[n82];
                        n81 = 0;
                        while (n81 < n82) {
                            ((hn)object).ar[n81] = jr2.b().readUTF();
                            ++n81;
                        }
                        vector.addElement(object);
                        ++n84;
                    }
                    n84 = jr2.b().readShort();
                    object = null;
                    Vector vector6 = null;
                    if (n84 > 0) {
                        object = ce.f(jr2);
                        vector6 = ce.e(jr2);
                    }
                    ae.b().a(by34, vector, (Vector)object, vector6);
                    break;
                }
                case -17: {
                    GameMidlet.f = jr2.b().readByte();
                    GameMidlet.g = jr2.b().readUTF();
                    fx.c();
                    break;
                }
                case -101: {
                    js js3;
                    int n82 = jr2.b().readByte();
                    int n81 = jr2.b().readShort();
                    if (n82 == 1) {
                        bc bc3 = new bc();
                        new bc().e = n81;
                        bc3.a = jr2.b().readUTF();
                        bc3.d = jr2.b().readShort();
                        bc3.f = jr2.b().readByte();
                        ae.o.addElement(bc3);
                        if (main.a.r == dp.b()) {
                            dp.b().d();
                        }
                        if (ir.p != null) {
                            cd.b().e();
                            break;
                        }
                        cd.b().f();
                        break;
                    }
                    int n85 = 0;
                    while (n85 < ae.o.size()) {
                        js3 = (bc)ae.o.elementAt(n85);
                        if (((bc)js3).e == n81) {
                            ae.o.removeElementAt(n85);
                            break block2;
                        }
                        ++n85;
                    }
                    break;
                }
                case -103: {
                    int n86 = jr2.b().readInt();
                    js js3 = ir.g(n86);
                    byte by36 = jr2.b().readByte();
                    if (by36 == 0) {
                        js3.X = jr2.b().readShort();
                        break;
                    }
                    js3.aa = jr2.b().readShort();
                    break;
                }
                case -102: {
                    int n87 = jr2.b().readInt();
                    int n88 = jr2.b().readInt();
                    hn hn8 = jy.b ? kx.h(n87) : ir.g(n87);
                    if (hn8 != null) {
                        hn8.a[3] = n88;
                    }
                    return;
                }
                case -105: {
                    int n89 = jr2.b().readByte();
                    Vector<bu> vector = new Vector<bu>();
                    int n90 = 0;
                    while (n90 < n89) {
                        short s26 = jr2.b().readShort();
                        String string = jr2.b().readUTF();
                        int n91 = n90++;
                        bu bu2 = new bu(this, string, new br(this, n91), s26);
                        vector.addElement(bu2);
                    }
                    main.a.h();
                    go.b();
                    go.a(vector);
                    break;
                }
                case -107: {
                    byte by37 = jr2.b().readByte();
                    String string = null;
                    String[] stringArray = null;
                    String[] stringArray3 = null;
                    String[] stringArray4 = null;
                    short[] sArray = null;
                    short[] sArray2 = null;
                    short[] sArray3 = null;
                    int[] nArray = null;
                    if (by37 == 0) {
                        string = jr2.b().readUTF();
                        int n92 = jr2.b().readShort();
                        stringArray = new String[n92];
                        sArray = new short[n92];
                        stringArray3 = new String[n92];
                        stringArray4 = new String[n92];
                        sArray2 = new short[n92];
                        sArray3 = new short[n92];
                        int n93 = 0;
                        while (n93 < n92) {
                            sArray2[n93] = jr2.b().readShort();
                            sArray[n93] = jr2.b().readShort();
                            sArray3[n93] = jr2.b().readShort();
                            stringArray[n93] = jr2.b().readUTF();
                            stringArray3[n93] = jr2.b().readUTF();
                            stringArray4[n93] = jr2.b().readUTF();
                            ++n93;
                        }
                    } else if (by37 == 1) {
                        string = jr2.b().readUTF();
                        int n94 = jr2.b().readShort();
                        sArray2 = new short[n94];
                        stringArray = new String[n94];
                        sArray = new short[n94];
                        nArray = new int[n94];
                        stringArray4 = new String[n94];
                        sArray3 = new short[n94];
                        stringArray3 = new String[n94];
                        int n95 = 0;
                        while (n95 < n94) {
                            sArray2[n95] = jr2.b().readShort();
                            stringArray[n95] = jr2.b().readUTF();
                            stringArray3[n95] = jr2.b().readUTF();
                            sArray[n95] = jr2.b().readShort();
                            sArray3[n95] = jr2.b().readShort();
                            nArray[n95] = jr2.b().readInt();
                            stringArray4[n95] = jr2.b().readUTF();
                            ++n95;
                        }
                    }
                    ei.b().a(by37, string, stringArray, sArray, sArray2, stringArray3, stringArray4, nArray, sArray3);
                    return;
                }
                case -74: {
                    kq kq2 = new kq();
                    new kq().b = jr2.b().readShort();
                    kq2.aw = 24 * jr2.b().readByte();
                    kq2.ax = 24 * jr2.b().readByte();
                    ei.b().a(kq2);
                    return;
                }
                case 122: {
                    jr2.b().readByte();
                    byte by38 = jr2.b().readByte();
                    byte by39 = jr2.b().readByte();
                    short s27 = jr2.b().readShort();
                    short s28 = jr2.b().readShort();
                    ir.a(by38, by39, s27, s28);
                    return;
                }
            }
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        if (this.a != null) {
            this.a.a(jr2);
            return;
        }
        try {
            System.out.println("cmd: " + jr2.a);
            switch (jr2.a) {
                case -5: {
                    jn.a(jr2.b().readUTF());
                    return;
                }
                case -4: {
                    es.b().g();
                    GameMidlet.i = new hn();
                    new hn().w = jr2.b().readInt();
                    int n96 = jr2.b().readByte();
                    GameMidlet.i.e = new Vector();
                    int n97 = 0;
                    while (n97 < n96) {
                        hx hx5 = new hx();
                        new hx().a = jr2.b().readShort();
                        GameMidlet.i.a(hx5);
                        ++n97;
                    }
                    GameMidlet.i.d = jr2.b().readByte();
                    GameMidlet.j.g = jr2.b().readByte();
                    GameMidlet.j.f = jr2.b().readByte();
                    GameMidlet.i.a(jr2.b().readInt());
                    GameMidlet.j.a = jr2.b().readByte();
                    GameMidlet.j.b = jr2.b().readByte();
                    GameMidlet.j.e = jr2.b().readByte();
                    GameMidlet.j.c = jr2.b().readByte();
                    GameMidlet.j.d = jr2.b().readByte();
                    GameMidlet.i.a[2] = jr2.b().readInt();
                    GameMidlet.i.ac = jr2.b().readByte();
                    n97 = 0;
                    while (n97 < GameMidlet.i.e.size()) {
                        hx hx6 = (hx)GameMidlet.i.e.elementAt(n97);
                        ((hx)GameMidlet.i.e.elementAt(n97)).b = jr2.b().readByte();
                        hx6.c = jr2.b().readUTF();
                        ++n97;
                    }
                    GameMidlet.i.X = jr2.b().readShort();
                    ae.n = new Vector();
                    n97 = jr2.b().readByte();
                    int n98 = 0;
                    while (n98 < n97) {
                        bc bc4 = new bc();
                        new bc().a = jr2.b().readUTF();
                        bc4.d = jr2.b().readShort();
                        ae.n.addElement(bc4);
                        ++n98;
                    }
                    ae.o = new Vector();
                    n98 = jr2.b().readByte();
                    int n99 = 0;
                    while (n99 < n98) {
                        bc bc5 = new bc();
                        new bc().e = jr2.b().readShort();
                        bc5.a = jr2.b().readUTF();
                        bc5.d = jr2.b().readShort();
                        ae.o.addElement(bc5);
                        ++n99;
                    }
                    ae.b().y = jr2.b().readBoolean();
                    if (jr2.b().available() > 0) {
                        n99 = 0;
                        while (n99 < n98) {
                            bc bc6 = (bc)ae.o.elementAt(n99);
                            ((bc)ae.o.elementAt(n99)).f = jr2.b().readByte();
                            ++n99;
                        }
                    }
                    if (jr2.b().available() > 0) {
                        main.a.W = jr2.b().readByte();
                    }
                    GameMidlet.i.v = GameMidlet.j.g = jr2.b().readShort();
                    if (main.a.W == 1 || main.a.W == 2) {
                        kf.ek = kf.el;
                    }
                    GameMidlet.i.aa = jr2.b().readShort();
                    if (jr2.b().available() > 0) {
                        ae.u = jr2.b().readBoolean();
                    }
                    if (ae.u) {
                        GameMidlet.i.a[3] = jr2.b().readInt();
                    }
                    ae.q = new Vector();
                    n99 = jr2.b().readByte();
                    int n100 = 0;
                    while (n100 < n99) {
                        km km2 = new km();
                        new km().a = jr2.b().readShort();
                        km2.c = jr2.b().readUTF();
                        km2.b = jr2.b().readShort();
                        km2.d = jr2.b().readInt();
                        km2.e = jr2.b().readByte();
                        ae.q.addElement(km2);
                        ++n100;
                    }
                    GameMidlet.i.c(jr2.b().readInt());
                    GameMidlet.i.b = jr2.b().readInt();
                    jr2.b().readByte();
                    String string = jr2.b().readUTF();
                    GameMidlet.i.a(string);
                    System.out.println("money: " + GameMidlet.i.a[2] + "    " + string);
                    jn.a();
                    System.out.println("2222222222222222222");
                }
            }
            return;
        }
        catch (Exception exception) {
            Exception exception3 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static Vector b(jr jr2) {
        Vector<gx> vector = new Vector<gx>();
        try {
            int n2;
            hn hn2;
            int n3 = jr2.b().readByte();
            int n4 = 0;
            while (n4 < n3) {
                hn2 = new hn();
                new hn().w = jr2.b().readInt();
                hn2.a(jr2.b().readUTF());
                n2 = jr2.b().readByte();
                int n5 = 0;
                while (n5 < n2) {
                    short s2 = jr2.b().readShort();
                    hn2.a(new hx(s2));
                    ++n5;
                }
                hn2.aw = jr2.b().readShort();
                hn2.ax = jr2.b().readShort();
                hn2.ac = jr2.b().readByte();
                vector.addElement(hn2);
                ++n4;
            }
            n4 = 0;
            while (n4 < n3) {
                hn2 = (hn)vector.elementAt(n4);
                ((hn)vector.elementAt(n4)).K = jr2.b().readByte();
                ++n4;
            }
            n4 = 0;
            while (n4 < n3) {
                hn2 = (hn)vector.elementAt(n4);
                ((hn)vector.elementAt(n4)).W = (byte)(100 - jr2.b().readByte());
                ++n4;
            }
            n4 = 0;
            while (n4 < n3) {
                hn2 = (hn)vector.elementAt(n4);
                ((hn)vector.elementAt(n4)).X = jr2.b().readShort();
                ++n4;
            }
            n4 = jr2.b().readByte();
            int n6 = 0;
            while (n6 < n4) {
                hm hm2 = new hm();
                new hm().e = jr2.b().readByte();
                hm2.a = jr2.b().readShort();
                hm2.d = jr2.b().readInt();
                hm2.aw = jr2.b().readShort();
                hm2.ax = jr2.b().readShort();
                vector.addElement(hm2);
                ++n6;
            }
            ir.o = null;
            n6 = 0;
            if (jr2.b().available() > 0) {
                n6 = jr2.b().readByte();
            }
            if (n6 > 0) {
                ir.o = new Vector();
                n2 = 0;
                while (n2 < n6) {
                    dr dr2 = new dr();
                    new dr().c = jr2.b().readShort();
                    dr2.a = jr2.b().readShort();
                    dr2.b = jr2.b().readShort();
                    dr2.d = jr2.b().readByte();
                    ir.o.addElement(dr2);
                    ++n2;
                }
            }
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        return vector;
    }

    private static Vector e(jr jr2) {
        try {
            int n2 = jr2.b().readByte();
            System.out.println("readMapItemaaaa: " + n2);
            Vector<kq> vector = new Vector<kq>();
            int n3 = 0;
            while (n3 < n2) {
                kq kq2 = new kq();
                new kq().f = jr2.b().readByte();
                kq2.b = jr2.b().readByte();
                kq2.aw = jr2.b().readByte();
                kq2.ax = jr2.b().readByte();
                kq2.d = true;
                vector.addElement(kq2);
                ++n3;
            }
            return vector;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return null;
        }
    }

    private static Vector f(jr jr2) {
        try {
            int n2 = jr2.b().readByte();
            Vector<ag> vector = new Vector<ag>();
            System.out.println("size item: " + n2);
            int n3 = 0;
            while (n3 < n2) {
                ag ag2 = new ag();
                new ag().a = jr2.b().readByte();
                ag2.b = jr2.b().readShort();
                ag2.c = jr2.b().readByte();
                ag2.e = jr2.b().readShort();
                ag2.f = jr2.b().readShort();
                int n4 = jr2.b().readByte();
                ag2.j = new Vector();
                int n5 = 0;
                while (n5 < n4) {
                    dr dr2 = new dr();
                    new dr().a = jr2.b().readByte();
                    dr2.b = jr2.b().readByte();
                    ag2.j.addElement(dr2);
                    ++n5;
                }
                vector.addElement(ag2);
                ++n3;
            }
            return vector;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return null;
        }
    }

    public static void c(jr jr2) {
        int n2 = jr2.b().readInt();
        short s2 = jr2.b().readShort();
        short s3 = jr2.b().readShort();
        byte by2 = jr2.b().readByte();
        short s4 = 0;
        if (jr2.b().available() > 0) {
            s4 = jr2.b().readShort();
        }
        ae.b();
        ae.a(n2, s2, (int)s3, (int)by2, s4);
    }

    public static void d(jr object) {
        int n2 = ((jr)object).b().readInt();
        object = ((jr)object).b().readUTF();
        ae.b();
        ae.a(n2, (String)object);
    }
}


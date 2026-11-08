/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.GameMidlet;
import main.a;

public final class kn
extends kj
implements kk {
    public static kn a = new kn();
    public kk c;
    public static kx d;

    public static void a() {
        ce.a().a = a;
    }

    public final void a(jr object) {
        try {
            switch (((jr)object).a) {
                case 61: {
                    byte by2 = ((jr)object).b().readByte();
                    switch (by2) {
                        case 3: {
                            eb.a();
                            break;
                        }
                        case 7: {
                            af.a();
                            break;
                        }
                        case 21: {
                            gn.a();
                            break;
                        }
                        case 22: {
                            kx.H = 5;
                            jp.e = jp.d;
                            el.a(3, ja.b());
                            if (da.a == null) {
                                da.a = new da();
                            }
                            kn.a.c = da.a;
                            break;
                        }
                        default: {
                            return;
                        }
                    }
                    main.a.c(kf.b);
                    ie.a().b();
                    return;
                }
                case 6: {
                    Vector<be> vector = new Vector<be>();
                    while (((jr)object).b().available() > 0) {
                        be be2 = new be();
                        new be().a = ((jr)object).b().readByte();
                        be2.b = ((jr)object).b().readByte();
                        ((jr)object).b().readByte();
                        be2.c = ((jr)object).b().readByte();
                        vector.addElement(be2);
                    }
                    el.b().a(vector);
                    el.b().a();
                    main.a.h();
                    return;
                }
                case 7: {
                    Vector<dl> vector = new Vector<dl>();
                    byte by3 = ((jr)object).b().readByte();
                    while (((jr)object).b().available() > 0) {
                        dl dl2 = new dl();
                        new dl().a = ((jr)object).b().readByte();
                        int n2 = ((jr)object).b().readUnsignedByte();
                        dl2.b = (byte)(n2 % 16);
                        dl2.c = (byte)(n2 / 16);
                        int n3 = ((jr)object).b().readUnsignedByte();
                        dl2.d = (n3 & 1) != 0;
                        dl2.e = (n3 & 2) != 0;
                        dl2.f = ((jr)object).b().readInt();
                        dl2.g = String.valueOf(main.a.b(dl2.f)) + kf.k();
                        vector.addElement(dl2);
                    }
                    jp.b().h = by3;
                    jp.b().a(vector);
                    jp.b().a();
                    jp.b().g();
                    main.a.h();
                    return;
                }
                case 8: {
                    int n4;
                    main.a.J = 0;
                    byte by4 = ((jr)object).b().readByte();
                    byte by5 = ((jr)object).b().readByte();
                    int n5 = ((jr)object).b().readInt();
                    int n6 = ((jr)object).b().readInt();
                    Vector<hn> vector = new Vector<hn>();
                    while (((jr)object).b().available() > 0) {
                        hn hn2 = new hn();
                        new hn().w = ((jr)object).b().readInt();
                        if (hn2.w == -1) {
                            hn2.a("");
                        } else {
                            if (hn2.w == GameMidlet.i.w) {
                                hn2 = GameMidlet.i;
                            }
                            hn2.a(((jr)object).b().readUTF());
                            hn2.b(((jr)object).b().readInt());
                            n4 = ((jr)object).b().readByte();
                            int n7 = 0;
                            while (n7 < n4) {
                                hx hx2 = new hx(((jr)object).b().readShort());
                                if (hn2.w != GameMidlet.i.w) {
                                    hn2.a(hx2);
                                }
                                ++n7;
                            }
                            n7 = ((jr)object).b().readInt();
                            hn2.d(n7);
                            hn2.o = ((jr)object).b().readBoolean();
                            hn2.d(n7);
                            hn2.b(hn2.c());
                            hn2.X = ((jr)object).b().readShort();
                        }
                        vector.addElement(hn2);
                    }
                    d.a(by4, by5, n5, n6, vector);
                    kd.b().b = true;
                    kx.k = false;
                    int n8 = vector.size();
                    n4 = 0;
                    while (n4 < n8) {
                        hn hn3 = (hn)vector.elementAt(n4);
                        if (hn3.w == n5) {
                            hn3.o = true;
                        }
                        if (hn3.w == GameMidlet.i.w) {
                            GameMidlet.i.b(hn3.c());
                        }
                        ++n4;
                    }
                    if (jp.e != 0) {
                    }
                    d.p();
                    d.a();
                    kd.b();
                    kd.b(false);
                    main.a.h();
                    main.a.J = 1;
                    return;
                }
                case 12: {
                    hn hn4 = new hn();
                    byte by6 = ((jr)object).b().readByte();
                    hn4.w = ((jr)object).b().readInt();
                    hn4.a(((jr)object).b().readUTF());
                    hn4.b(((jr)object).b().readInt());
                    int n9 = ((jr)object).b().readByte();
                    int n10 = 0;
                    while (n10 < n9) {
                        hn4.a(new hx(((jr)object).b().readShort()));
                        ++n10;
                    }
                    hn4.K = 0;
                    hn4.d(((jr)object).b().readInt());
                    hn4.X = ((jr)object).b().readShort();
                    hn4.o = false;
                    kd.b().b = true;
                    hn4.o = false;
                    d.a((int)by6, hn4);
                    return;
                }
                case 14: {
                    int n11 = ((jr)object).b().readInt();
                    int n12 = ((jr)object).b().readInt();
                    if (kx.j && kx.H == 2) {
                        d.c(kf.J);
                    }
                    kd.b().b = true;
                    kx.i.e(n11);
                    kx.f(n12);
                    return;
                }
                case 16: {
                    int n13 = ((jr)object).b().readInt();
                    boolean bl2 = ((jr)object).b().readBoolean();
                    if (n13 == GameMidlet.i.w) {
                        main.a.h();
                    }
                    kx.b(n13, bl2);
                    return;
                }
                case 19: {
                    byte by7 = ((jr)object).b().readByte();
                    byte by8 = ((jr)object).b().readByte();
                    int n14 = ((jr)object).b().readInt();
                    if (kx.a(by7, by8)) {
                        d.g(n14);
                        return;
                    }
                    break;
                }
                case 9: {
                    byte by9 = ((jr)object).b().readByte();
                    byte by10 = ((jr)object).b().readByte();
                    int n15 = ((jr)object).b().readInt();
                    object = ((jr)object).b().readUTF();
                    if (kx.a(by9, by10)) {
                        kx.a(n15, (String)object);
                        return;
                    }
                    break;
                }
                case 11: {
                    byte by11 = ((jr)object).b().readByte();
                    byte by12 = ((jr)object).b().readByte();
                    int n16 = ((jr)object).b().readInt();
                    main.a.v = null;
                    if (kx.a(by11, by12)) {
                        if (n16 == GameMidlet.i.w) {
                            main.a.b(kf.H, new cu(this));
                            return;
                        }
                        kx.i.e(n16);
                        return;
                    }
                    break;
                }
                case 52: {
                    ((jr)object).b().readByte();
                    ((jr)object).b().readByte();
                    int n17 = ((jr)object).b().readInt();
                    int n18 = ((jr)object).b().readInt();
                    object = ((jr)object).b().readUTF();
                    hn hn5 = kx.h(n17);
                    if (n18 == 0 || hn5 == null) {
                        return;
                    }
                    hn5.b(hn5.c() + n18);
                    if (GameMidlet.i.w == n17) {
                        GameMidlet.i.b(hn5.c());
                    }
                    kx.a(n17, (String)object);
                    kx.c(n17, n18);
                    return;
                }
                default: {
                    this.c.a((jr)object);
                    return;
                }
            }
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
    }
}


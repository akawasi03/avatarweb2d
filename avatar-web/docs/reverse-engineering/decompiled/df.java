/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;

public final class df
extends kj
implements kk {
    public static df a = new df();

    public static void a() {
        ce.a().a = a;
    }

    public final void a(jr object) {
        try {
            switch (((jr)object).a) {
                case -43: {
                    int n2 = ((jr)object).b().readShort();
                    he[] heArray = new he[n2];
                    int n3 = 0;
                    while (n3 < n2) {
                        heArray[n3] = new he();
                        heArray[n3].a = ((jr)object).b().readUTF();
                        heArray[n3].b = ((jr)object).b().readInt();
                        heArray[n3].c = ((jr)object).b().readInt();
                        ++n3;
                    }
                    ei.b().a(heArray);
                    return;
                }
                case -65: {
                    byte by2 = ((jr)object).b().readByte();
                    int n4 = ((jr)object).b().readInt();
                    byte by3 = ((jr)object).b().readShort();
                    short[] sArray = new short[by3];
                    byte by4 = 0;
                    while (by4 < by3) {
                        sArray[by4] = ((jr)object).b().readByte();
                        ++by4;
                    }
                    by4 = ((jr)object).b().readByte();
                    Vector<kq> vector = new Vector<kq>();
                    int n5 = ((jr)object).b().readShort();
                    int n6 = 0;
                    while (n6 < n5) {
                        kq kq2 = new kq();
                        new kq().b = ((jr)object).b().readShort();
                        kq2.aw = ((jr)object).b().readByte() * 24;
                        kq2.ax = ((jr)object).b().readByte() * 24;
                        kq2.c = ((jr)object).b().readByte();
                        vector.addElement(kq2);
                        ++n6;
                    }
                    Vector vector2 = ce.b((jr)object);
                    eo.a();
                    ei.b().a(by2, n4, sArray, by4, vector, vector2);
                    return;
                }
                case 51: {
                    ae.b().a(eo.b((jr)object));
                    return;
                }
                case -46: {
                    short s2 = ((jr)object).b().readShort();
                    object = ((jr)object).b().readUTF();
                    ei.b().a(s2, (String)object);
                    return;
                }
                case -66: {
                    kq kq3 = new kq();
                    new kq().b = ((jr)object).b().readShort();
                    kq3.aw = ((jr)object).b().readByte();
                    kq3.ax = ((jr)object).b().readByte();
                    ei.b().b(kq3);
                    return;
                }
                case -67: {
                    byte by5 = ((jr)object).b().readByte();
                    int n7 = -1;
                    short s3 = 0;
                    Vector<hn> vector = null;
                    if (by5 == 0) {
                        s3 = ((jr)object).b().readShort();
                        n7 = ((jr)object).b().readByte();
                    } else {
                        vector = new Vector<hn>();
                        int n8 = ((jr)object).b().readShort();
                        int n9 = 0;
                        while (n9 < n8) {
                            hn hn2 = new hn();
                            new hn().w = ((jr)object).b().readInt();
                            hn2.q = ((jr)object).b().readByte();
                            vector.addElement(hn2);
                            ++n9;
                        }
                    }
                    ei.b().a(by5, n7, s3, vector);
                    return;
                }
                case -73: {
                    short s4 = ((jr)object).b().readShort();
                    int n10 = ((jr)object).b().readInt();
                    byte[] byArray = new byte[n10];
                    ((jr)object).b().read(byArray);
                    ei.b().a(byArray, (int)s4);
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
                case -75: {
                    int n11 = ((jr)object).b().readInt();
                    main.a.u.a(kf.t, new a(this, n11), 0);
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


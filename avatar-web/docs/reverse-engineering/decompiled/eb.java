/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;
import main.a;

public final class eb
extends kj
implements kk {
    private static eb a = new eb();

    public static void a() {
        kx.H = 4;
        jp.e = jp.c;
        el.a(0, kd.b());
        kn.a.c = a;
    }

    /*
     * WARNING - void declaration
     */
    public final void a(jr object) {
        try {
            byte by2 = ((jr)object).b().readByte();
            int n2 = ((jr)object).b().readByte();
            if (!kx.a(by2, (byte)n2)) {
                return;
            }
            System.out.println("tienlen: " + ((jr)object).a);
            switch (((jr)object).a) {
                case 51: {
                    int byArray = ((jr)object).b().readInt();
                    n2 = ((jr)object).b().readByte();
                    int n3 = ((jr)object).b().readInt();
                    int n4 = ((jr)object).b().readInt();
                    kd.b();
                    kd.a(byArray, (byte)n2, n3, n4);
                    return;
                }
                case 50: {
                    kd.b().b = false;
                    kd.b();
                    kd.m();
                    if (((jr)object).b().available() > 0) {
                        int exception2 = ((jr)object).b().readInt();
                        byte by3 = ((jr)object).b().readByte();
                        n2 = by3;
                        byte[] byArray = new byte[by3];
                        int n4 = 0;
                        while (n4 < n2) {
                            byArray[n4] = ((jr)object).b().readByte();
                            ++n4;
                        }
                        kd.b().a(exception2, byArray);
                        return;
                    }
                    break;
                }
                case 20: {
                    byte by4 = ((jr)object).b().readByte();
                    Vector<ax> vector = new Vector<ax>();
                    int n5 = 0;
                    while (n5 < 13) {
                        vector.addElement(new ax(((jr)object).b().readByte()));
                        ++n5;
                    }
                    n5 = ((jr)object).b().readInt();
                    main.a.h();
                    kx.r();
                    kd.b().a(n5, by4, vector);
                    object = ie.a();
                    try {
                        ((ie)object).b((byte)53);
                    }
                    catch (Exception exception) {}
                    ((kj)object).k();
                    return;
                }
                case 21: {
                    int n6 = ((jr)object).b().readInt();
                    int n7 = ((jr)object).b().readByte();
                    byte[] byArray = new byte[n7];
                    int n8 = 0;
                    while (n8 < n7) {
                        byArray[n8] = ((jr)object).b().readByte();
                        ++n8;
                    }
                    n8 = ((jr)object).b().readInt();
                    kx.k = true;
                    kd.b().a(n6, byArray, n8);
                    kd.b().f();
                    return;
                }
                case 49: {
                    int n9 = ((jr)object).b().readInt();
                    n2 = ((jr)object).b().readInt();
                    boolean bl2 = ((jr)object).b().readBoolean();
                    kd.b().a(n9, n2, bl2);
                    return;
                }
                case 53: {
                    void var2_12;
                    n2 = ((jr)object).b().readInt();
                    byte[] byArray = new byte[13];
                    try {
                        int n10 = 0;
                        while (n10 < 13) {
                            byArray[n10] = ((jr)object).b().readByte();
                            ++n10;
                        }
                    }
                    catch (Exception exception) {
                        Object var2_11 = null;
                    }
                    main.a.h();
                    kd.b();
                    kd.m();
                    if (var2_12 != null) {
                        kd.b().a(n2, (byte[])var2_12);
                    }
                    kx.a(n2, kf.K);
                    return;
                }
                case 54: {
                    String string = ((jr)object).b().readUTF();
                    kd.b().b(string);
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
}


/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;

public final class lf
extends kj
implements kk {
    private static lf a = new lf();

    public static void a() {
        ce.a().a = a;
    }

    public final void a(jr jr2) {
        try {
            switch (jr2.a) {
                case -11: {
                    Vector<ah> vector = new Vector<ah>();
                    int n2 = jr2.b().readByte();
                    int n3 = 0;
                    while (n3 < n2) {
                        ah ah2 = new ah();
                        new ah().a = jr2.b().readShort();
                        ah2.b = jr2.b().readShort();
                        vector.addElement(ah2);
                        ++n3;
                    }
                    n3 = jr2.b().readShort();
                    short s2 = jr2.b().readShort();
                    n2 = jr2.b().readShort();
                    short s3 = jr2.b().readShort();
                    short s4 = jr2.b().readShort();
                    int n4 = jr2.b().readByte();
                    int n5 = 0;
                    while (n5 < n4) {
                        ah ah3 = new ah();
                        new ah().a = jr2.b().readShort();
                        ah3.b = jr2.b().readShort();
                        vector.addElement(ah3);
                        ++n5;
                    }
                    jr2.b().readInt();
                    fx.a(vector, n3, s2, n2, s3, s4);
                    return;
                }
                case -14: {
                    ah ah4 = new ah();
                    new ah().a = jr2.b().readShort();
                    ah4.b = jr2.b().readShort();
                    int n6 = jr2.b().readUnsignedShort();
                    ah4.d = new byte[n6];
                    int n7 = 0;
                    while (n7 < n6) {
                        ah4.d[n7] = jr2.b().readByte();
                        ++n7;
                    }
                    ah4.c = (short)-1;
                    if (jr2.b().available() >= 2) {
                        ah4.c = jr2.b().readShort();
                    }
                    fx.a(ah4);
                    return;
                }
                case -15: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    fx.c(byArray);
                    return;
                }
                case -16: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    fx.a(byArray);
                    return;
                }
                case -37: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    fx.b(byArray);
                    return;
                }
                case -40: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    fx.d(byArray);
                    return;
                }
                case -41: {
                    byte[] byArray = new byte[jr2.b().available()];
                    jr2.b().read(byArray);
                    fx.e(byArray);
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


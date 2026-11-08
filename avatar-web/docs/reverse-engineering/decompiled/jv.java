/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class jv
extends hj {
    public static jv a;
    private static int b;
    private static Image c;

    static {
        b = 20;
        try {
            c = Image.createImage((String)(String.valueOf(kf.a()) + "/lg.png"));
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
    }

    public static jv b() {
        if (a == null) {
            a = new jv();
            return a;
        }
        return a;
    }

    public final void a() {
        jy.b = false;
        b = 0;
        if (jy.c != 0) {
            c = hj.am;
        }
        super.a();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 50: {
                jv.b(0);
                return;
            }
            case 51: {
                jv.b(1);
            }
        }
    }

    public final void k() {
        if (b > 51) {
            if (jy.c != 0) {
                if (jy.c == 2) {
                    ae.b().a();
                    c = null;
                    jy.c = 0;
                    main.a.S.g();
                }
            } else if (b == 52) {
                es.b().h();
                dm.b().f();
                if (!es.u) {
                    es.u = true;
                    fx.b("avatarSV");
                    fx.f();
                    jv.b(0);
                } else {
                    fx.f();
                    es.b().e();
                    if (ez.b() != main.a.r) {
                        es.b().a();
                    }
                    c = null;
                }
            }
        } else if (jy.c != 0 && b == 0) {
            ae.b().a();
            c = null;
            jy.c = 0;
            main.a.S.g();
        }
        ++b;
    }

    private static void b(int n2) {
        main.a.i();
        dm.b().b[4] = n2;
        dm.b().b(0);
        es.b().e();
        es.b().a();
        c = null;
    }

    public final void a(Graphics graphics) {
        je.a(0, 0, main.a.m, main.a.a.getHeight(), 0, graphics);
        if (b > 1 && c != null) {
            graphics.drawImage(c, main.a.m >> 1, main.a.n >> 1, 3);
        }
        main.a.a(graphics);
    }
}


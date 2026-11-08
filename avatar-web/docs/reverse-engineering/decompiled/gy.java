/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public class gy {
    public static int Y = 1;
    public static int Z;
    public static int aa;
    public static int ab;
    public by ac;
    public by ad;
    public by ae;
    public static byte af;
    public static byte ag;
    public static byte ah;
    public static byte ai;
    public boolean aj;
    public static boolean ak;
    private static byte a;
    private static byte b;
    private static byte c;

    static {
        ak = false;
        a = 0;
        b = 0;
        c = 0;
    }

    public void c() {
    }

    public void d(int n2) {
    }

    public void a(Graphics graphics) {
        main.a.c(graphics);
        main.a.S.a(graphics, this.ac, this.ad, this.ae);
    }

    public void d(int n2, int n3) {
    }

    public void a(int n2) {
    }

    public void a(int n2, int n3) {
    }

    private void b(by by2) {
        if (by2 != null) {
            main.a.g = false;
            main.a.f = false;
            main.a.h();
            this.a(by2);
        }
    }

    public void k() {
    }

    public void l() {
        if (main.a.f) {
            if (main.a.b(0, main.a.ae[0].b, main.a.m - 1, main.a.T)) {
                switch (main.a.S.d()) {
                    case 0: {
                        if (main.a.Z != 0) break;
                        this.b(this.ac);
                        break;
                    }
                    case 1: {
                        if (main.a.Z != 0) break;
                        this.b(this.ad);
                        break;
                    }
                    case 2: {
                        if (main.a.Z != 0) break;
                        this.b(this.ae);
                    }
                }
            }
            a = 0;
            b = 0;
            c = 0;
            if (main.a.m()) {
                if (main.a.a(0, 0, 50 * Y, 50 * Y)) {
                    if (!dm.d) {
                        if (dx.m) {
                            ak = true;
                            dx.m = false;
                        }
                    } else if (ak) {
                        dx.m = true;
                    }
                    dm.d = !dm.d;
                    main.a.a.sizeChanged(0, 0);
                    main.a.f = false;
                }
                if (GameMidlet.e == 9 && main.a.a(50, 0, 50 * Y, 50 * Y)) {
                    if (!dm.d) {
                        dm.d = true;
                        dm.b().b[4] = 1;
                        main.a.a.b();
                        main.a.z.a = true;
                        if (main.a.r == ae.b()) {
                            im.d().d = ae.b();
                            im.c = true;
                        }
                    } else {
                        dm.d = false;
                        dm.b().b[4] = 0;
                        main.a.a.b();
                        if (main.a.r == ae.b()) {
                            im.c = false;
                        }
                    }
                    main.a.f = false;
                }
            }
        }
        if (main.a.a(5)) {
            if (this.ad != null) {
                main.a.h();
                this.a(this.ad);
                return;
            }
            if (main.a.t == this) {
                this.a(this.ac);
                return;
            }
        } else {
            if (main.a.a(12)) {
                this.a(this.ac);
                return;
            }
            if (main.a.E) {
                if (main.a.a(13) || main.a.c[13]) {
                    main.a.c[13] = false;
                    this.a(this.ae);
                    return;
                }
            } else if (main.a.a(13)) {
                this.a(this.ae);
            }
        }
    }

    public final void a(by by2) {
        if (by2 != null) {
            if (by2.b != null) {
                by2.b.a();
                return;
            }
            if (by2.d != null) {
                by2.d.a(by2.c);
                return;
            }
            if (im.c) {
                im.d().a((int)by2.c, by2.e);
                return;
            }
            this.a(by2.c, by2.e);
        }
    }
}


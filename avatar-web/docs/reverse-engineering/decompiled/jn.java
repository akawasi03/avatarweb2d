/*
 * Decompiled with CFR 0.152.
 */
import java.util.Hashtable;
import java.util.Vector;
import main.GameMidlet;
import main.a;

public final class jn {
    public static boolean a;

    public static void a(String string) {
        main.a.b(string);
    }

    public static void a() {
        lf.a();
        if (fx.d == -1) {
            iy.a().b();
        } else {
            ae.b().t();
        }
        iy.a().e(GameMidlet.i.w);
        fx.h = new Hashtable();
        fx.i = new Hashtable();
    }

    public final void a(String string, String object) {
        object = new dv(this, (String)object);
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.z, (ii)object));
        vector.addElement(new by(kf.d, new dw(this)));
        main.a.s.a(false);
        main.a.a(string, vector);
        a = true;
    }

    public final void a(String string, boolean bl2) {
        if (bl2) {
            main.a.b(string, new dq(this));
            return;
        }
        main.a.b(string);
    }

    public static void a(byte by2) {
        if (GameMidlet.e == 9) {
            a = false;
        }
        System.out.println("doGetHandler: " + by2 + "    " + ae.g);
        if (ce.a().a != null) {
            switch (by2) {
                case 3: {
                    kn.a();
                    ae.b();
                    ae.m();
                    break;
                }
                case 8: {
                    ae.b().y = true;
                    lf.a();
                    if (ae.D != -1) {
                        cx.a().j(ae.D);
                        ae.D = -1;
                        break;
                    }
                    if (ae.g != -1) {
                        main.a.x.e(57 + ae.g);
                        if (main.a.I && ir.a == 57) {
                            main.a.D = new bb();
                            main.a.D.b(ae.a);
                        }
                        GameMidlet.i.e(4);
                        main.a.h();
                        break;
                    }
                    ae.b().t();
                    main.a.h();
                    break;
                }
                case 9: {
                    eo.a();
                    if (ir.H == -1) {
                        if (!jy.b) {
                            if (GameMidlet.e == 12) {
                                ir.i = 24;
                                ir.t = -1;
                                bf.a().a(ae.m, -1);
                                break;
                            }
                            if (GameMidlet.e == 3) {
                                main.a.S.i();
                                bf.a().a(ae.m, -1);
                                break;
                            }
                            if (ae.g != -1) {
                                ae.b();
                                ae.x();
                                break;
                            }
                            if (ae.G != -1) {
                                main.a.i();
                                bf.a().a(ae.G, -1);
                                ae.G = -1;
                                break;
                            }
                            ae.b().s();
                            break;
                        }
                        main.a.S.i();
                        jy.e().a();
                        main.a.h();
                        break;
                    }
                    ir.y = -1;
                    break;
                }
                case 10: {
                    if (kz.a == null) {
                        kz.a = new kz();
                    }
                    ce.a().a = kz.a;
                    if (gb.h == -1) {
                        it it2 = it.a();
                        it2.e((byte)51);
                        it2.c(fx.l);
                        it2.k();
                        break;
                    }
                    if (go.f == null) {
                        it.a().d();
                        break;
                    }
                    bf.a().a(25, 0);
                    go.e();
                    go.b().b(GameMidlet.i.w, false);
                    break;
                }
                case 11: {
                    df.a();
                    ir.a = -1;
                    bf.a().a(21, 0);
                    if (ae.v == -1) break;
                    main.a.i();
                    iy.a().c(0);
                    break;
                }
                case 12: {
                    if (jz.a == null) {
                        jz.a = new jz();
                    }
                    ce.a().a = jz.a;
                    cx cx2 = cx.a();
                    main.a.i();
                    cx2.e((byte)1);
                    cx2.k();
                }
            }
        }
        GameMidlet.e = by2;
    }

    public final void a(int n2, byte by2, String[] stringArray, String string, String string2, boolean[] blArray) {
        if (main.a.t != null) {
            main.a.t = null;
        }
        main.a.h();
        Vector<by> vector = new Vector<by>();
        int n3 = 0;
        while (n3 < stringArray.length) {
            int n4 = n3;
            vector.addElement(new by(stringArray[n3], new hh(this, n4, n2, by2)));
            ++n3;
        }
        if (string != null) {
            gp.a().a(vector, n2, string, string2, blArray);
            return;
        }
        le.a().a(vector, 0);
    }

    public final void a(byte by2, byte by3, String string) {
        if (by3 == 0) {
            main.a.a(string, new ds(this, by2));
            return;
        }
        main.a.b(string);
    }
}


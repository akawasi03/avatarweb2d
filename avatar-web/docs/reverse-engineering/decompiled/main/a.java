/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Canvas
 *  javax.microedition.lcdui.Command
 *  javax.microedition.lcdui.CommandListener
 *  javax.microedition.lcdui.Display
 *  javax.microedition.lcdui.Displayable
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 *  javax.microedition.lcdui.List
 *  javax.microedition.midlet.MIDlet
 */
package main;

import java.util.Vector;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Command;
import javax.microedition.lcdui.CommandListener;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Displayable;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.lcdui.List;
import javax.microedition.midlet.MIDlet;
import main.GameMidlet;

public final class a
extends Canvas
implements Runnable,
CommandListener {
    public static a a;
    private static boolean ag;
    public static boolean[] b;
    public static boolean[] c;
    public static boolean[] d;
    public static boolean e;
    public static boolean f;
    public static boolean g;
    public static int h;
    public static int i;
    public static int j;
    public static int k;
    public static int l;
    public static int m;
    public static int n;
    public static int o;
    public static int p;
    public static int q;
    private static boolean ah;
    public static hj r;
    public static jj s;
    public static kr t;
    public static hb u;
    public static gs v;
    private static int ai;
    public static fx w;
    public static ir x;
    public static ho y;
    public static b z;
    public static ha A;
    public static Vector B;
    private static long[] aj;
    public static Vector C;
    public static bb D;
    public static boolean E;
    private static boolean ak;
    public static boolean F;
    public static boolean G;
    public static boolean H;
    public static boolean I;
    public static int J;
    private static Command al;
    private static Command am;
    private static Object an;
    public static cs K;
    public static cs L;
    public static cs M;
    public static cs N;
    public static cs O;
    public static cs P;
    public static cs Q;
    public static cs R;
    public static ew S;
    public static int T;
    public static int U;
    private static int ao;
    public static int V;
    public static int W;
    public static kf X;
    public static Image Y;
    public static int Z;
    private int ap;
    private static boolean aq;
    public static Image aa;
    public static byte ab;
    private long ar = 0L;
    public static Vector ac;
    private int as;
    private int at;
    private static Vector au;
    public static by ad;
    public static dr[] ae;
    public static dr af;

    static {
        b = new boolean[14];
        c = new boolean[14];
        d = new boolean[14];
        m = 0;
        B = new Vector();
        C = new Vector();
        H = false;
        I = false;
        J = -1;
        an = new Object();
        T = 0;
        U = 0;
        Z = 1;
        aq = false;
        ab = 0;
        ac = new Vector();
        ae = new dr[3];
    }

    public a() {
        String string;
        this.setFullScreenMode(true);
        m = this.getWidth();
        q = n = this.getHeight();
        X = new kf();
        gy.Y = 1;
        if (aw.b(GameMidlet.m) == null) {
            gb.c();
        }
        Z = 0;
        K = new dh(0);
        L = new dh(1);
        M = new dh(2);
        N = new dh(3);
        O = new dh(4);
        P = new dh(5);
        Q = new dh(6);
        R = new dh(7);
        S = new gw();
        hj.al = K.a() + 6;
        gy.af = (byte)N.a();
        gy.ag = (byte)L.a();
        gy.ah = (byte)K.a();
        gy.ai = (byte)P.a();
        this.b();
        o = m / 2;
        p = n / 2;
        a = this;
        System.gc();
        dx.a(0);
        ah = this.getKeyCode(8) == -20;
        if (ah) {
            dx.a(1);
        }
        E = (string = System.getProperty("microedition.platform")).indexOf("RIM") == 0 || string.indexOf("BlackBerry") == 0;
        ak = string.indexOf("NX") == 0;
        F = string.indexOf("NokiaN7") == 0;
        H = this.hasPointerEvents();
        if (E) {
            ai = 5;
            if (string.indexOf("BlackBerry") == 0) {
                ai = 1;
            }
            dx.a(3);
            this.setCommandListener(this);
            am = new Command(kf.d, 2, 1);
            al = new Command(kf.c, 1, 1);
            this.addCommand(al);
            this.addCommand(am);
        }
        if (ak) {
            ai = 2;
        }
        if (E || ak) {
            aj = new long[4];
        }
        dx.b(a.getGameAction(48) == 0 && a.getGameAction(49) == 0 && a.getGameAction(50) == 0 && a.getGameAction(51) == 0 && a.getGameAction(52) == 0 && a.getGameAction(53) == 0 && a.getGameAction(54) == 0 && a.getGameAction(55) == 0 && a.getGameAction(56) == 0 && a.getGameAction(57) == 0);
        aw.a();
        t = new le();
        s = new jj();
        w = new fx();
        u = new hb();
        x = new ir();
        y = new ho();
        dm.b().e();
        S.c();
        if (this.hasPointerEvents()) {
            au = new Vector();
        }
        main.a.a();
        ao = (int)(Runtime.getRuntime().totalMemory() / 1024L);
        V = ao / 17;
        if (V < 60) {
            V = 60;
        }
    }

    public static void a() {
        ad = new by(kf.p, -1);
        le.a().c();
        if (r != null) {
            r.c();
        }
    }

    public final void sizeChanged(int n2, int n3) {
        this.setFullScreenMode(true);
        this.b();
    }

    public final void b() {
        m = this.getWidth();
        n = this.getHeight();
        gy.aa = 20;
        if (m < 176) {
            gy.aa = 4;
        }
        if (dm.d && H) {
            z = new b();
        } else {
            G = false;
            z = null;
        }
        q = n;
        o = m / 2;
        S.c();
        p = n / 2;
        S.a();
        if (t != null) {
            t = null;
        }
        if (es.a != null) {
            es.b().f();
        }
        do.a().b(ir.a);
        if (dp.a != null) {
            dp.e();
        }
        if (je.c != null) {
            je.a().b();
        }
        if (s != null) {
            s.a();
            s.a(main.a.s.a);
        }
        if (r != null) {
            if (r == cz.a) {
                cz.b();
            }
            if (kx.i == r) {
                kx.i.e();
            }
            if (hc.d != null) {
                hc.d.e();
            }
            if (ea.a != null) {
                ea.b().e();
            }
            if (el.a == r) {
                el.a.e();
            }
            if (jp.a == r) {
                jp.a.g();
            }
        }
        if (u != null) {
            u.b();
        }
        if (im.a != null) {
            im.d().b();
        }
        if (jb.a != null) {
            jb.b().d();
        }
        if (H && hj.ap == null) {
            c.b(kf.aw);
            hj.ap = c.a("bpa");
            hj.aq = c.a("icon_chat");
            c.a();
        }
        if (r != null) {
            if (r == ez.a) {
                ez.b().e();
            }
            if (r == dm.a) {
                dm.b().e();
            }
            if (r == cy.b()) {
                cy.b().f();
            }
            if (r == jd.b()) {
                jd.b().e();
            }
            if (A != null) {
                A = null;
            }
        }
    }

    public static void a(String object) {
        if (jy.b || ((String)object).equals("")) {
            return;
        }
        object = new bc((String)object, -K.a((String)object));
        v0.aw = m + 10;
        C.addElement(object);
        if (ab == 0) {
            ab = 1;
        }
        U = 0;
    }

    public static void c() {
        if (!kt.a().b()) {
            int n2 = ez.b().ar - 1;
            if (n2 < 0) {
                n2 = 0;
            }
            String string = "socket://" + GameMidlet.b[dm.b().b[4]][ez.b().b][n2] + ":" + GameMidlet.c[dm.b().b[4]][ez.b().b][n2];
            if (E) {
                string = dm.e ? String.valueOf(string) + ";interface=wifi" : String.valueOf(string) + ";deviceside=true";
            }
            kt.a().a(string);
            cx.a().b();
        }
    }

    public final void d() {
        if (!aq) {
            new Thread(this).start();
        }
        aq = true;
        kt.a().c();
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    public final void run() {
        ag = true;
        while (ag) {
            try {
                Object object;
                Object object2;
                if (this.ap > 0) {
                    --this.ap;
                    if (this.ap == 0) {
                        Display.getDisplay((MIDlet)GameMidlet.h).vibrate(0);
                    }
                }
                long l2 = System.currentTimeMillis();
                if (++l > 10000) {
                    if (System.currentTimeMillis() - this.ar > 20000L && r == es.a) {
                        GameMidlet.h.notifyDestroyed();
                    }
                    l = 0;
                }
                if (J != -1) {
                    object2 = this;
                    if (J == 1) {
                        ((a)object2).as += 15;
                    } else {
                        ++((a)object2).at;
                        if (((a)object2).at >= 8) {
                            ((a)object2).at = 0;
                        }
                    }
                    if (((a)object2).as >= p) {
                        ((a)object2).as = 0;
                        J = -1;
                    }
                }
                if (J != 0) {
                    if (z != null) {
                        z.a();
                    }
                    if (D != null && v == null) {
                        D.l();
                    }
                    if (B.size() > 0) {
                        int n2 = 0;
                        while (n2 < B.size()) {
                            object = (gz)B.elementAt(n2);
                            ((gz)object).b();
                            ++n2;
                        }
                    }
                    if (r != null) {
                        if (im.c) {
                            im.d().l();
                        }
                        if (C.size() <= 0) {
                            if (ab > 0) {
                                ab = (byte)(ab - 1);
                            }
                        } else {
                            if (ab < gy.ag) {
                                ab = (byte)(ab + 1);
                            }
                            object2 = (bc)C.elementAt(0);
                            ((js)object2).aw -= 2;
                            if (((js)object2).aw < ((bc)object2).c) {
                                C.removeElementAt(0);
                            }
                        }
                        r.k();
                        if (main.a.y.m) {
                            object2 = y;
                            if (t == null && v == null) {
                                if (((ho)object2).n != 0) {
                                    if (ho.i < 0 || ho.i > ((ho)object2).c) {
                                        if (((ho)object2).n > 500) {
                                            ((ho)object2).n = 500;
                                        } else if (((ho)object2).n < -500) {
                                            ((ho)object2).n = -500;
                                        }
                                        ((ho)object2).n -= ((ho)object2).n / 5;
                                        if (aw.f(((ho)object2).n / 10) <= 10) {
                                            ((ho)object2).n = 0;
                                        }
                                    }
                                    ho.j = ho.i += ((ho)object2).n / 15;
                                    ((ho)object2).n -= ((ho)object2).n / 20;
                                } else if (ho.i < 0) {
                                    ho.j = 0;
                                } else if (ho.i > ((ho)object2).c) {
                                    ho.j = ((ho)object2).c;
                                }
                                if (((ho)object2).o != 0) {
                                    if (ho.k < 0 || ho.k > ((ho)object2).h) {
                                        if (((ho)object2).o > 500) {
                                            ((ho)object2).o = 500;
                                        } else if (((ho)object2).o < -500) {
                                            ((ho)object2).o = -500;
                                        }
                                        ((ho)object2).o -= ((ho)object2).o / 5;
                                        if (aw.f(((ho)object2).o / 10) <= 10) {
                                            ((ho)object2).o = 0;
                                        }
                                    }
                                    ho.l = ho.k += ((ho)object2).o / 15;
                                    ((ho)object2).o -= ((ho)object2).o / 20;
                                } else if (ho.k < 0) {
                                    ho.l = 0;
                                } else if (ho.k > ((ho)object2).h) {
                                    ho.l = ((ho)object2).h;
                                }
                                if (ho.i != ho.j) {
                                    ((ho)object2).b = ho.j - ho.i << 2;
                                    ((ho)object2).a += ((ho)object2).b;
                                    ho.i += ((ho)object2).a >> 4;
                                    ((ho)object2).a &= 0xF;
                                }
                                if (ho.k != ho.l) {
                                    ((ho)object2).g = ho.l - ho.k << 2;
                                    ((ho)object2).f += ((ho)object2).g;
                                    ho.k += ((ho)object2).f >> 4;
                                    ((ho)object2).f &= 0xF;
                                }
                            }
                        }
                        if (v != null) {
                            v.l();
                        } else if (A != null) {
                            if (D == null) {
                                A.l();
                            }
                        } else if (t != null) {
                            t.l();
                            if (t != null) {
                                t.k();
                            }
                        } else {
                            if (A == null && !im.c) {
                                r.l();
                            }
                            if (main.a.y.m && A == null) {
                                y.a();
                            }
                        }
                        if (l % 20 == 10) {
                            fx.g();
                            gb.d();
                            byte by2 = (byte)(Runtime.getRuntime().freeMemory() / 1024L);
                            if (by2 < 100) {
                                System.gc();
                            }
                        }
                    }
                    if (D != null) {
                        D.k();
                    }
                    g = false;
                    f = false;
                    int n3 = 0;
                    while (n3 < ac.size()) {
                        object = (cp)ac.elementAt(n3);
                        ((cp)object).a();
                        ++n3;
                    }
                    if (E || ak) {
                        n3 = 0;
                        while (n3 < 4) {
                            if (d[(n3 << 1) + 2] && System.currentTimeMillis() / 100L - aj[n3] > (long)ai) {
                                main.a.d[(n3 << 1) + 2] = false;
                            }
                            ++n3;
                        }
                    }
                }
                this.repaint();
                if (E) {
                    object2 = an;
                    synchronized (object2) {
                        try {
                            an.wait(1000L);
                        }
                        catch (InterruptedException interruptedException) {
                            object = interruptedException;
                            interruptedException.printStackTrace();
                        }
                    }
                }
                this.serviceRepaints();
                long l3 = System.currentTimeMillis() - l2;
                try {
                    if (l3 < 50L) {
                        Thread.sleep(50L - l3);
                        continue;
                    }
                    Thread.sleep(1L);
                }
                catch (InterruptedException interruptedException) {}
            }
            catch (Exception exception) {
                Exception exception2 = exception;
                exception.printStackTrace();
            }
        }
    }

    public final void keyPressed(int n2) {
        if (J != -1) {
            return;
        }
        this.ar = System.currentTimeMillis();
        if (ah) {
            switch (this.getGameAction(n2)) {
                case 1: {
                    main.a.d[2] = true;
                    main.a.b[2] = true;
                    return;
                }
                case 6: {
                    main.a.d[8] = true;
                    main.a.b[8] = true;
                    return;
                }
                case 2: {
                    main.a.d[4] = true;
                    main.a.b[4] = true;
                    return;
                }
                case 5: {
                    main.a.d[6] = true;
                    main.a.b[6] = true;
                    return;
                }
                case 8: {
                    main.a.d[5] = true;
                    main.a.b[5] = true;
                    return;
                }
            }
            if (n2 == -21) {
                n2 = -6;
            } else if (n2 == -22) {
                n2 = -7;
            }
        } else if (E) {
            long l2 = System.currentTimeMillis() / 100L;
            switch (n2) {
                case 1: {
                    main.a.aj[0] = l2;
                    main.a.d[2] = true;
                    main.a.b[2] = true;
                    return;
                }
                case 6: {
                    main.a.aj[3] = l2;
                    main.a.d[8] = true;
                    main.a.b[8] = true;
                    return;
                }
                case 2: {
                    main.a.aj[1] = l2;
                    main.a.d[4] = true;
                    main.a.b[4] = true;
                    return;
                }
                case 5: {
                    main.a.aj[2] = l2;
                    main.a.d[6] = true;
                    main.a.b[6] = true;
                    return;
                }
                case -8: {
                    main.a.d[5] = true;
                    main.a.b[5] = true;
                    return;
                }
            }
        }
        if (v != null) {
            v.d(n2);
        } else if (A != null) {
            A.d(n2);
        } else if (t == null) {
            if (im.c) {
                im.d().b(n2);
            } else {
                r.d(n2);
            }
        }
        if (ak) {
            long l3 = System.currentTimeMillis() / 100L;
            switch (n2) {
                case -38: 
                case -1: {
                    main.a.aj[0] = l3;
                    break;
                }
                case -39: 
                case -2: {
                    main.a.aj[3] = l3;
                    break;
                }
                case -3: {
                    main.a.aj[1] = l3;
                    break;
                }
                case -4: {
                    main.a.aj[2] = l3;
                }
            }
        }
        switch (n2) {
            case 42: {
                main.a.d[10] = true;
                main.a.b[10] = true;
                return;
            }
            case 35: {
                main.a.d[11] = true;
                main.a.b[11] = true;
                return;
            }
            case -21: 
            case -6: {
                main.a.d[12] = true;
                main.a.b[12] = true;
                return;
            }
            case -22: 
            case -7: {
                main.a.d[13] = true;
                main.a.b[13] = true;
                return;
            }
            case -5: 
            case 10: {
                main.a.d[5] = true;
                main.a.b[5] = true;
                return;
            }
            case -38: 
            case -1: {
                main.a.d[2] = true;
                main.a.b[2] = true;
                return;
            }
            case -39: 
            case -2: {
                main.a.d[8] = true;
                main.a.b[8] = true;
                return;
            }
            case -3: {
                main.a.d[4] = true;
                main.a.b[4] = true;
                return;
            }
            case -4: {
                main.a.d[6] = true;
                main.a.b[6] = true;
            }
        }
    }

    public static boolean a(int n2) {
        if (b[n2]) {
            main.a.b[n2] = false;
            return true;
        }
        return false;
    }

    public final void keyReleased(int n2) {
        if (ah) {
            switch (this.getGameAction(n2)) {
                case 1: {
                    main.a.d[2] = false;
                    return;
                }
                case 6: {
                    main.a.d[8] = false;
                    return;
                }
                case 2: {
                    main.a.d[4] = false;
                    return;
                }
                case 5: {
                    main.a.d[6] = false;
                    return;
                }
                case 8: {
                    main.a.d[5] = false;
                    return;
                }
            }
            if (n2 == -21) {
                n2 = -6;
            } else if (n2 == -22) {
                n2 = -7;
            }
        } else if (E && n2 == 27) {
            n2 = -7;
        }
        switch (n2) {
            case 42: {
                main.a.d[10] = false;
                main.a.c[10] = true;
                return;
            }
            case 35: {
                main.a.d[11] = false;
                main.a.c[11] = true;
                return;
            }
            case -21: 
            case -6: {
                main.a.d[12] = false;
                main.a.c[12] = true;
                return;
            }
            case -22: 
            case -7: {
                main.a.d[13] = false;
                main.a.c[13] = true;
                return;
            }
            case -5: 
            case 10: {
                main.a.d[5] = false;
                main.a.c[5] = true;
                return;
            }
            case -38: 
            case -1: {
                if (!ak && !E) {
                    main.a.d[2] = false;
                }
                main.a.c[2] = true;
                return;
            }
            case -39: 
            case -2: {
                if (!ak && !E) {
                    main.a.d[8] = false;
                }
                main.a.c[8] = true;
                return;
            }
            case -3: {
                if (!ak && !E) {
                    main.a.d[4] = false;
                }
                main.a.c[4] = true;
                return;
            }
            case -4: {
                if (!ak && !E) {
                    main.a.d[6] = false;
                }
                main.a.c[6] = true;
            }
        }
    }

    protected final void pointerDragged(int n2, int n3) {
        au.addElement(new dr(n2, n3));
        h = n2;
        i = n3;
    }

    protected final void pointerPressed(int n2, int n3) {
        g = true;
        e = true;
        j = n2;
        k = n3;
        h = n2;
        i = n3;
    }

    protected final void pointerReleased(int n2, int n3) {
        e = false;
        f = true;
        h = n2;
        i = n3;
    }

    public static void e() {
        f = false;
        int n2 = 0;
        while (n2 < 14) {
            main.a.b[n2] = false;
            ++n2;
        }
    }

    public static void f() {
        f = false;
        e = false;
        int n2 = 0;
        while (n2 < 14) {
            main.a.d[n2] = false;
            ++n2;
        }
    }

    public static void g() {
        e = false;
        int n2 = 0;
        while (n2 < 14) {
            main.a.c[n2] = false;
            ++n2;
        }
    }

    public static String a(String string, int n2) {
        String string2 = "";
        int n3 = 0;
        while (n3 < string.length()) {
            string2 = String.valueOf(string2) + (char)(string.charAt(n3) + n2);
            ++n3;
        }
        return string2;
    }

    public static void a(int n2, int n3, int n4, int n5, int n6) {
        ac.addElement(new cp(n3, n4, n2, -1, null, n6, -1, -1));
    }

    public static void a(int n2, int n3, int n4, int n5, int n6, int n7, int n8) {
        ac.addElement(new cp(n3, n4, n2, -1, null, 0, n7, -1));
    }

    public static void a(int n2, int n3, int n4, int n5, Image image, int n6) {
        ac.addElement(new cp(n3, n4, n2, -1, image, n6, -1, -1));
    }

    public static void a(String string, int n2, int n3, int n4, int n5, int n6) {
        ac.addElement(new cp(n2, n3, string, -1, n5, n6));
    }

    public static void a(Graphics graphics) {
        graphics.drawImage(Y, 0, 1, 0);
    }

    public static void b(Graphics graphics) {
        graphics.drawImage(Y, 0, 1, 0);
    }

    /*
     * WARNING - Removed try catching itself - possible behaviour change.
     */
    protected final void paint(Graphics graphics) {
        Object object;
        graphics.translate(0, 0);
        if (J != 0) {
            Object object2;
            if (r != null) {
                r.a(graphics);
            }
            if (B.size() > 0 && r != el.a && r != jp.a) {
                int n2 = 0;
                while (n2 < B.size()) {
                    gz gz2 = (gz)B.elementAt(n2);
                    gz2.a(graphics);
                    ++n2;
                }
            }
            if (im.c) {
                im.d().a(graphics);
            }
            if (A != null) {
                A.a(graphics);
            }
            if (v != null) {
                v.a(graphics);
            } else if (t != null) {
                t.a(graphics);
            }
            if (D != null) {
                D.a(graphics);
            }
            object = graphics;
            main.a.c((Graphics)object);
            object.translate(-do.a().a, -do.a().b);
            int n3 = 0;
            while (n3 < ac.size()) {
                object2 = (cp)ac.elementAt(n3);
                ((cp)object2).a((Graphics)object);
                ++n3;
            }
            if (ab > 0) {
                object = graphics;
                object.translate(-object.getTranslateX(), -object.getTranslateY());
                object.setClip(0, 0, m, n);
                object.setColor(0);
                n3 = 0;
                while (n3 < m / 30 + 1) {
                    object.drawImage(aa, n3 * 30, ab - 30, 0);
                    ++n3;
                }
                object.fillRect(0, (int)ab, m, 1);
                if (C.size() > 0) {
                    main.a.c((Graphics)object);
                    n3 = ab / 2 - gy.ag / 2;
                    object.setClip(0, n3, m, gy.ag + 2);
                    object2 = (bc)C.elementAt(0);
                    L.a((Graphics)object, ((bc)object2).a, ((js)object2).aw, n3, 0);
                    main.a.c((Graphics)object);
                }
            }
        }
        if (J != -1) {
            Graphics graphics2 = graphics;
            object = this;
            main.a.c(graphics2);
            graphics2.setColor(1);
            graphics2.fillRect(0, 0, m, p - ((a)object).as);
            graphics2.fillRect(0, p + ((a)object).as, m, p - ((a)object).as + 2 + T);
            if (J != 1) {
                jj.b.a(((a)object).at, o, p, 0, 3, graphics2);
            }
        }
        if (z != null) {
            z.a(graphics);
        }
        main.a.c(graphics);
        if (E) {
            object = an;
            synchronized (object) {
                an.notify();
                return;
            }
        }
    }

    public static void c(Graphics graphics) {
        graphics.translate(-graphics.getTranslateX(), -graphics.getTranslateY());
        graphics.translate(0, 0);
        graphics.setClip(0, 0, m, q);
    }

    public static void h() {
        s.a(false);
        v = null;
    }

    public static void b(String string) {
        s.a(string, new by(kf.z, -1), null);
    }

    public static void a(String string, Vector vector) {
        if (jy.b) {
            s.a(string, null, vector);
            return;
        }
        s.a(string, new by("", -1), vector);
    }

    public static void a(String string, ii ii2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.o, ii2));
        vector.addElement(ad);
        main.a.a(string, vector);
    }

    public static void a(String string, int n2, gy gy2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.o, n2, gy2));
        vector.addElement(ad);
        main.a.a(string, vector);
    }

    public static void b(String string, ii ii2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.z, ii2));
        main.a.a(string, vector);
    }

    public static void b(String string, int n2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.o, n2));
        vector.addElement(ad);
        main.a.a(string, vector);
    }

    public static void b(String string, int n2, gy gy2) {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.z, n2, gy2));
        main.a.a(string, vector);
    }

    public static void c(String string) {
        s.a(string, null, null);
        s.a(true);
    }

    public static void d(String string) {
        s.a(string, new by(kf.cm, -1), null);
    }

    public static void i() {
        main.a.c(kf.b);
    }

    public static String a(int n2, int n3, int n4, boolean bl2) {
        String string = "";
        if (n2 > 0) {
            string = String.valueOf(string) + main.a.b(n2) + kf.C;
        }
        if (n3 > 0) {
            if (n2 > 0) {
                string = String.valueOf(string) + " - ";
            }
            string = String.valueOf(string) + main.a.b(n3) + kf.D;
        }
        if (n4 >= 0) {
            if (!string.equals("")) {
                string = String.valueOf(string) + " - ";
            }
            string = String.valueOf(string) + main.a.b(n4) + kf.E;
        }
        return string;
    }

    public static String a(int n2, int n3, boolean bl2) {
        String string = "";
        if (n2 > 0) {
            string = String.valueOf(string) + main.a.b(n2) + (bl2 ? kf.C : kf.T);
        }
        if (n3 > 0) {
            if (n2 > 0) {
                string = String.valueOf(string) + " - ";
            }
            string = String.valueOf(string) + main.a.b(n3) + kf.D;
        }
        return string;
    }

    public static String b(int n2) {
        String string = "";
        int n3 = n2 / 1000 + 1;
        int n4 = 0;
        while (n4 < n3) {
            if (n2 >= 1000) {
                int n5 = n2 % 1000;
                string = n5 == 0 ? ".000" + string : (n5 < 10 ? ".00" + n5 + string : (n5 < 100 ? ".0" + n5 + string : "." + n5 + string));
                n2 /= 1000;
            } else {
                string = String.valueOf(n2) + string;
                break;
            }
            ++n4;
        }
        return string;
    }

    public final void commandAction(Command command, Displayable displayable) {
        if (command == null || command == List.SELECT_COMMAND) {
            int n2 = null.getSelectedIndex();
            if (n2 != 0) {
                jy.b = true;
                jy.e().a();
            }
            la.d = false;
            Display.getDisplay((MIDlet)GameMidlet.h).setCurrent((Displayable)this);
            this.setFullScreenMode(true);
        } else if (command == null) {
            if (r == jv.a) {
                jy.e().a();
            } else {
                ae.b().a();
            }
            Display.getDisplay((MIDlet)GameMidlet.h).setCurrent((Displayable)this);
            this.setFullScreenMode(true);
            la.d = false;
        }
        if (command == al) {
            main.a.b[12] = true;
            return;
        }
        if (command == am) {
            main.a.b[13] = true;
        }
    }

    public static boolean a(int n2, int n3, int n4, int n5) {
        if (!e && !f) {
            return false;
        }
        return main.a.b(n2, n3, n4, n5);
    }

    public static boolean b(int n2, int n3, int n4, int n5) {
        return h >= n2 && h <= n2 + n4 && i >= n3 && i <= n3 + n5;
    }

    public static void a(int n2, int n3, ii ii2, ii ii3, ii ii4) {
        String string = "";
        Vector<by> vector = new Vector<by>();
        if (n2 > 0) {
            vector.addElement(new by(n3 <= 0 ? kf.o : kf.C, ii2));
            string = " " + n2 + kf.C;
        }
        if (n3 > 0) {
            vector.addElement(new by(n2 <= 0 ? kf.o : kf.D, ii3));
            string = " " + n3 + kf.D;
        }
        string = vector.size() == 1 ? String.valueOf(kf.cR) + string + " " + kf.p + " ?" : String.valueOf(kf.aG) + " \n" + n2 + kf.C + " - " + n3 + " " + kf.D;
        if (ii4 == null) {
            vector.addElement(ad);
        } else {
            vector.addElement(new by(kf.p, ii4));
        }
        main.a.a(string, vector);
    }

    public static int j() {
        return (int)(System.currentTimeMillis() / 1000L);
    }

    public static int k() {
        return j - h;
    }

    public static int l() {
        return k - i;
    }

    public static boolean m() {
        return v == null && t == null && r != hc.d && r != dp.b() && r != cy.a && r != el.a && r != jp.a && r != cd.a && r != jy.a && r != ea.a && r != jd.a && !ei.e && !ei.b && r != hk.a && (r != ek.a || !kx.j);
    }
}


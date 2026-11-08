/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class es
extends hj {
    public static es a;
    public dx b;
    public dx c;
    public dx d;
    public dx e;
    private int z;
    private int A;
    private int B;
    private by C;
    by f;
    private by D;
    by g;
    private boolean E = true;
    by h;
    public boolean i = false;
    private String F = "19006610";
    public int j;
    public int k;
    public int l;
    public int m;
    public int n;
    public int o;
    public int p;
    public int q;
    public long r = 0L;
    public static int s;
    public static String t;
    public static boolean u;
    public static boolean v;
    public static boolean w;
    private String[] G = new String[]{"Ch\u01a1i m\u1edbi", "Ch\u01a1i ti\u1ebfp", "\u0110\u1ed5i t\u00e0i kho\u1ea3n"};
    public int x;
    public int y;
    private byte H;
    private String I = "";
    private String J = "";
    private boolean K;

    static {
        s = 0;
        u = false;
    }

    public static es b() {
        if (a == null) {
            a = new es();
        }
        return a;
    }

    public final void d() {
        main.a.b(kf.P, 54);
    }

    public final void a() {
        this.c();
        super.a();
        main.a.h();
        if (main.a.H) {
            this.H = (byte)-1;
        }
        v = true;
        this.ad = this.g;
        if (this.I.equals("") && this.b.f().equals("")) {
            this.G = new String[]{"Ch\u01a1i m\u1edbi", "\u0110\u1ed5i t\u00e0i kho\u1ea3n"};
            return;
        }
        this.G = new String[]{"Ch\u01a1i ti\u1ebfp" + (!this.b.f().equals("") ? ", " + this.b.f() : ""), "Ch\u01a1i m\u1edbi", "\u0110\u1ed5i t\u00e0i kho\u1ea3n"};
    }

    public final void e() {
        Object object;
        this.r = System.currentTimeMillis();
        c.b(kf.aw);
        try {
            hj.am = GameMidlet.f == 6 ? Image.createImage((String)"/lgyeah.png") : Image.createImage((String)(String.valueOf(kf.a()) + "/l.png"));
        }
        catch (IOException iOException) {
            object = iOException;
            iOException.printStackTrace();
        }
        c.a();
        object = this;
        this.A = -50;
        main.a.x.e(26);
        GameMidlet.i.aw = GameMidlet.i.C = ir.e * 24 / 2 + 30;
        do.a().c = 200;
        do.a().a = 200;
        this.b.a(true);
        this.c.a(false);
        this.z = 0;
        this.b.a(true);
    }

    public final void c() {
        this.h = new by(kf.c, 0);
        this.D = new by(kf.dt, 3);
        this.f = new by(kf.O, 1);
        this.C = new by(kf.bA, 2);
        this.g = new by(kf.O, 104);
        this.ac = this.h;
    }

    public es() {
        this.b = new dx();
        this.c = new dx();
        this.d = new dx();
        this.e = new dx();
        this.f();
        this.b.a(true);
        this.b.d(0);
        this.c.d(2);
        this.d.d(2);
        this.e.d(0);
        this.e.q = "T\u00f9y ch\u1ecdn";
        this.z = 0;
        if (aw.b(aw.b) == null) {
            fx.b();
        }
    }

    public final void f() {
        this.B = main.a.n > 200 ? main.a.p - 80 : main.a.p - 65;
        es es2 = this;
        this.A = -50;
        this.p = main.a.m - 30;
        if (this.p < 70) {
            this.p = 70;
        }
        if (this.p > 99) {
            this.p = 99;
        }
        this.q = (main.a.m - this.p >> 1) + 29;
        if (main.a.m <= 128) {
            this.p = 80;
            this.q = (main.a.m - this.p >> 1) + 20;
        }
        this.q -= (gy.Y - 1) * 40;
        main.a.S.a(this);
        this.A = this.B = this.k / 2;
        do.a().h = GameMidlet.i;
        do.a().d();
    }

    public final void d(int n2, int n3) {
        switch (n2) {
            case 0: {
                es es2 = this;
                this.i = true;
                main.a.S.a(es2);
                return;
            }
            case 1: {
                this.i = false;
                main.a.S.a(this);
                return;
            }
            case 2: {
                main.a.b(kf.P, 54);
                return;
            }
            case 3: {
                main.a.b(kf.du, 55, null);
                return;
            }
            case 4: {
                main.a.u.a(kf.bC, 100, 3);
                return;
            }
            case 5: {
                dm.b().a();
                return;
            }
            case 6: {
                GameMidlet.b("http://wap.teamobi.com/faqs.php?provider=" + GameMidlet.f);
                return;
            }
            case 7: {
                GameMidlet.b("http://wap.teamobi.com?info=checkupdate&game=8&version=2.5.8&provider=" + GameMidlet.f + "&agent=" + GameMidlet.g);
                return;
            }
            case 8: {
                if (!this.F.equals("")) {
                    GameMidlet.b("tel:" + this.F);
                    return;
                }
                if (!kt.a().c) {
                    main.a.c(kf.M);
                    main.a.c();
                } else {
                    main.a.i();
                }
                cx.a().a((byte)5, (String)null);
                return;
            }
            case 9: {
                main.a.b(String.valueOf(kf.bH) + kf.bG);
                fx.a();
            }
        }
    }

    private void j() {
        if (!this.E) {
            this.E = true;
            this.C.a = kf.bJ;
            return;
        }
        this.E = false;
        this.C.a = kf.bA;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                Vector<by> vector = new Vector<by>();
                by by2 = new by(kf.x, 2);
                vector.addElement(new by(kf.bB, 4));
                vector.addElement(new by(kf.ab, 5));
                if (dm.b().b[4] == 0) {
                    vector.addElement(new by(kf.bD, 6));
                }
                vector.addElement(new by(kf.bE, 7));
                if (dm.b().b[4] == 0) {
                    vector.addElement(new by(kf.bF, 8));
                }
                vector.addElement(new by(kf.bG, 9));
                vector.addElement(by2);
                le.a().a(vector, 0);
                return;
            }
            case 1: {
                v = true;
                this.ac = this.h;
                this.ad = this.g;
                this.H = 0;
                this.G = new String[]{"Ch\u01a1i ti\u1ebfp" + (!this.b.f().equals("") ? ", " + this.b.f() : ""), "Ch\u01a1i m\u1edbi", "\u0110\u1ed5i t\u00e0i kho\u1ea3n"};
                return;
            }
            case 2: {
                this.j();
                return;
            }
            case 3: {
                es es2 = this;
                if (es2.b.f().equals("")) {
                    main.a.b(kf.eo[0]);
                    break;
                }
                if (es2.c.f().equals("")) {
                    main.a.b(kf.eo[1]);
                    break;
                }
                if (es2.d.f().equals("")) {
                    main.a.b(kf.eo[2]);
                    break;
                }
                if (!es2.c.f().equals(es2.d.f())) {
                    main.a.b(kf.eo[3]);
                    break;
                }
                main.a.h();
                es2.r = System.currentTimeMillis();
                if (!es2.e.f().equals("")) {
                    main.a.b("B\u1ea1n n\u00ean \u0111i\u1ec1n ch\u00ednh x\u00e1c s\u1ed1 di \u0111\u1ed9ng ho\u1eb7c email. Khi qu\u00ean m\u1eadt kh\u1ea9u, b\u1ea1n s\u1ebd d\u00f9ng n\u00f3 \u0111\u1ec3 l\u1ea5y l\u1ea1i. B\u1ea1n c\u00f3 ch\u1eafc ch\u1eafn \u0111\u00e3 \u0111i\u1ec1n s\u1ed1 di \u0111\u1ed9ng / email \u0111\u00fang ch\u01b0a?", 102);
                    break;
                }
                es.n();
                return;
            }
            case 50: {
                main.a.b(kf.bI);
                return;
            }
            case 51: {
                this.m();
                return;
            }
            case 52: {
                return;
            }
            case 53: {
                GameMidlet.b("http://teamobi.com/dieukhoan.htm");
                return;
            }
            case 54: {
                GameMidlet.a();
                return;
            }
            case 55: {
                u = false;
                this.g();
                fx.b("avatarSV");
                GameMidlet.a();
                return;
            }
            case 100: {
                Object object = main.a.u.a();
                if (((String)object).equals("")) {
                    return;
                }
                String string = object;
                object = this;
                object = new n((es)object, string);
                object.a();
                return;
            }
            case 101: {
                this.m();
                return;
            }
            case 102: {
                es.n();
                return;
            }
            case 103: {
                return;
            }
            case 104: {
                this.o();
            }
        }
    }

    private void m() {
        main.a.i();
        main.a.c();
        cx.a().c(this.b.f().toLowerCase(), this.c.f().toLowerCase(), this.e.f());
        this.i = false;
        this.ad = this.f;
        main.a.S.a(this);
    }

    private static void n() {
        Vector<by> vector = new Vector<by>();
        vector.addElement(new by(kf.e, 51));
        vector.addElement(new by(kf.bK, 52));
        vector.addElement(new by(kf.bL, 53));
        main.a.a(kf.bM, vector);
    }

    public final void k() {
        if ((System.currentTimeMillis() - this.r) / 1000L > 300L) {
            GameMidlet.h.notifyDestroyed();
        }
        if (!v && this == main.a.r && main.a.t == null && !v) {
            this.b.e();
            this.c.e();
            if (this.i) {
                this.d.e();
                this.e.e();
            }
            if (this.b.d()) {
                this.ae = this.b.a();
            } else if (this.c.d()) {
                this.ae = this.c.a();
            } else if (this.d.d()) {
                this.ae = this.d.a();
            }
        } else {
            this.ae = null;
        }
        es es2 = this;
        if (es2.B != es2.A) {
            es2.A += es2.B - es2.A >> 1;
        }
        if (this.i) {
            this.ad = this.D;
        } else if (this.z == 2) {
            this.ae = this.C;
        }
        main.a.x.b();
    }

    public final void d(int n2) {
        if (this.b.d()) {
            this.b.b(n2);
        } else if (this.c.d()) {
            this.c.b(n2);
        } else if (this.d.d()) {
            this.d.b(n2);
        } else if (this.e.d()) {
            this.e.b(n2);
        }
        super.d(n2);
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        super.a(graphics);
        main.a.a(graphics);
    }

    public final void b(Graphics graphics) {
        es es2;
        Graphics graphics2;
        main.a.x.b(graphics);
        main.a.x.d(graphics);
        main.a.c(graphics);
        if (v) {
            graphics2 = graphics;
            es2 = this;
            main.a.S.a(graphics2, es2.j, es2.k, es2.l, es2.m, 0);
            graphics2.translate(es2.j, es2.k + es2.y);
            if (es2.H != -1) {
                main.a.S.c(graphics2, 5 * gy.Y, es2.H * es2.x, es2.l - 10 * gy.Y, es2.x);
            }
            int n2 = 0;
            while (n2 < es2.G.length) {
                main.a.K.a(graphics2, es2.G[n2], es2.l / 2, n2 * es2.x + es2.x / 2 - main.a.K.a() / 2, 2);
                ++n2;
            }
        } else if (main.a.v == null && this == main.a.r) {
            graphics2 = graphics;
            es2 = this;
            main.a.S.a(graphics2, es2.j, es2.k, es2.l, es2.m, 0);
            graphics2.setClip(es2.j + 4, es2.k + 4, es2.l - 8, es2.m - 8);
            if (!es2.F.equals("") && dm.b().b[4] == 0) {
                main.a.S.a(graphics2, "Hotline: " + es2.F, es2.j + es2.l - 8, es2.k + es2.m - gy.ah - 4, 1);
            }
            es2.b.a(graphics2);
            graphics2.setClip(es2.j + 4, es2.k + 4, es2.l - 8, es2.m - 8);
            int n3 = main.a.K.a(String.valueOf(kf.bN) + ":");
            n3 = n3 < es2.b.a - es2.j ? (es2.b.a - es2.j - n3) / 2 + gy.Z : es2.b.a - n3 - 5;
            main.a.S.a(graphics2, kf.bN, es2.j + n3, es2.b.b + es2.b.d / 2 - gy.ah / 2, 0);
            main.a.S.a(graphics2, String.valueOf(kf.bO) + ":", es2.j + n3, es2.c.b + es2.b.d / 2 - gy.ah / 2, 0);
            if (!es2.i) {
                main.a.S.a(graphics2, es2.n, es2.o, es2.z, es2.E);
            } else {
                main.a.S.a(graphics2, kf.cE, es2.j + n3, es2.d.b + es2.b.d / 2 - gy.ah, 0);
                main.a.S.a(graphics2, String.valueOf(kf.bO) + ":", es2.j + n3, es2.d.b + es2.b.d / 2, 0);
                main.a.S.a(graphics2, "S\u1ed1 di \u0111\u1ed9ng", es2.j + n3, es2.e.b + es2.b.d / 2 - gy.ah, 0);
                main.a.S.a(graphics2, "ho\u1eb7c email:", es2.j + n3, es2.e.b + es2.b.d / 2, 0);
                es2.d.a(graphics2);
                es2.e.a(graphics2);
            }
            es2.c.a(graphics2);
        }
        main.a.c(graphics);
        graphics2 = graphics;
        es2 = this;
        graphics2.drawImage(hj.am, main.a.o, es2.A, 3);
    }

    public final void l() {
        if (v) {
            es es2 = this;
            if (main.a.a(2)) {
                es2.H = (byte)(es2.H - 1);
                if (es2.H < 0) {
                    es2.H = (byte)(es2.G.length - 1);
                }
            } else if (main.a.a(8)) {
                es2.H = (byte)(es2.H + 1);
                if (es2.H >= es2.G.length) {
                    es2.H = 0;
                }
            }
            if (main.a.g) {
                int n2 = 0;
                while (n2 < es2.G.length) {
                    if (main.a.b(es2.j, es2.k + es2.y + n2 * es2.x, es2.l, es2.x)) {
                        es2.H = (byte)n2;
                        main.a.g = false;
                        es2.K = true;
                        break;
                    }
                    ++n2;
                }
            }
            if (es2.K) {
                if (main.a.e && !main.a.b(es2.j, es2.k + es2.y + es2.H * es2.x, es2.l, es2.x)) {
                    es2.H = (byte)-1;
                }
                if (main.a.f) {
                    main.a.f = false;
                    es2.K = false;
                    if (es2.H != -1) {
                        es2.o();
                    }
                }
            }
            super.l();
            return;
        }
        if (main.a.f && main.a.a(0, 0, main.a.m, main.a.n) && main.a.a(this.n - 10, this.o, 70, hj.al * gy.Y + 10)) {
            this.j();
        }
        if (main.a.b[2]) {
            this.z = this.z > 0 ? --this.z : (this.i ? 3 : 2);
        }
        if (main.a.b[8]) {
            this.z = this.z < (this.i ? 3 : 2) ? ++this.z : 0;
        }
        if (main.a.b[2] || main.a.b[8]) {
            main.a.e();
            if (this.z == 0) {
                this.b.a(true);
                this.c.a(false);
                this.d.a(false);
                this.e.a(false);
            } else if (this.z == 1) {
                this.b.a(false);
                this.c.a(true);
                this.d.a(false);
                this.e.a(false);
            } else if (this.z == 2) {
                this.b.a(false);
                this.c.a(false);
                this.ae = null;
                if (this.i) {
                    this.d.a(true);
                    this.e.a(false);
                }
            } else {
                this.b.a(false);
                this.c.a(false);
                this.d.a(false);
                this.e.a(true);
            }
        }
        super.l();
    }

    private void o() {
        System.out.println("clickNewGame: " + w + "    " + this.H);
        switch (this.H) {
            case 0: {
                if (this.G.length == 2) {
                    jk jk2 = new jk(this);
                    jk2.a();
                    return;
                }
                if (w) {
                    ez.b().a();
                    return;
                }
                es es2 = this;
                String string = es2.b.f().toLowerCase().trim();
                String string2 = es2.c.f();
                if (!string.equals("")) {
                    if (string2.equals("")) {
                        es2.z = 1;
                        es2.b.a(false);
                        es2.c.a(true);
                        break;
                    }
                    ez.b().a();
                }
                return;
            }
            case 1: {
                if (this.G.length != 2) {
                    jk jk3 = new jk(this);
                    if (!this.I.equals("") && this.b.f().equals("")) {
                        main.a.a("T\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n ch\u01b0a \u0111\u01b0\u1ee3c \u0111\u0103ng k\u00ed li\u00ean k\u1ebft v\u1edbi m\u1ed9t t\u00e0i kho\u1ea3n Team. B\u1ea1n s\u1ebd m\u1ea5t t\u00e0i kho\u1ea3n \u0111ang ch\u01a1i n\u1ebfu ti\u1ebfp t\u1ee5c. B\u1ea1n c\u00f3 mu\u1ed1n ti\u1ebfp t\u1ee5c ?", jk3);
                        return;
                    }
                    jk3.a();
                    return;
                }
            }
            case 2: {
                this.p();
            }
        }
    }

    private void p() {
        dg dg2 = new dg(this);
        if (!this.I.equals("") && this.b.f().equals("")) {
            main.a.a("T\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n ch\u01b0a \u0111\u01b0\u1ee3c \u0111\u0103ng k\u00ed li\u00ean k\u1ebft v\u1edbi m\u1ed9t t\u00e0i kho\u1ea3n Team. B\u1ea1n s\u1ebd m\u1ea5t t\u00e0i kho\u1ea3n \u0111ang ch\u01a1i n\u1ebfu ti\u1ebfp t\u1ee5c. B\u1ea1n c\u00f3 mu\u1ed1n ti\u1ebfp t\u1ee5c ?", dg2);
            return;
        }
        dg2.a();
    }

    public final void g() {
        System.out.println("saveLogin");
        Object object = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream((OutputStream)object);
        try {
            dataOutputStream.writeUTF("2.5.8");
            dataOutputStream.writeByte(this.ar);
            dataOutputStream.writeUTF(this.F);
            dataOutputStream.writeUTF(this.I);
            dataOutputStream.writeUTF(this.J);
            if (this.E) {
                dataOutputStream.writeUTF(es.b().b.f());
                dataOutputStream.writeUTF(es.b().c.f());
            }
            dataOutputStream.writeInt(s);
            dataOutputStream.writeBoolean(u);
            dataOutputStream.writeBoolean(w);
            aw.a("avlogin", ((ByteArrayOutputStream)object).toByteArray());
            dataOutputStream.close();
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }

    public final void h() {
        DataInputStream dataInputStream = fx.a("avlogin");
        if (dataInputStream == null) {
            return;
        }
        String string = "";
        try {
            string = dataInputStream.readUTF();
            this.ar = dataInputStream.readByte();
            this.F = dataInputStream.readUTF();
            this.I = dataInputStream.readUTF();
            this.J = dataInputStream.readUTF();
            if (this.E) {
                this.b.a(dataInputStream.readUTF());
                this.c.a(dataInputStream.readUTF());
            }
            s = dataInputStream.readInt();
            u = dataInputStream.readBoolean();
            w = dataInputStream.readBoolean();
            dataInputStream.close();
        }
        catch (Exception exception) {
            fx.b("avlogin");
        }
        if (!u) {
            fx.b("avatarSV");
        }
        if (!"2.5.8".equals(string)) {
            fx.a();
        }
    }

    public final void a(String string) {
        this.F = string;
    }

    public final void i() {
        main.a.c();
        cx.a().f(es.b().F.hashCode());
        System.out.println("login: " + v + "    " + this.H);
        if (v && (this.H == 0 && this.G.length == 2 || this.H == 1 && this.G.length == 3)) {
            cx cx2 = cx.a();
            System.out.println("doLoginNewGame");
            cx2.e((byte)-12);
            cx2.k();
            return;
        }
        if (this.b.f().equals("")) {
            cx.a().a(this.I, this.J, "2.5.8");
            w = true;
            return;
        }
        w = false;
        this.I = "";
        this.J = "";
        cx.a().a(this.b.f().toLowerCase(), this.c.f(), "2.5.8");
    }

    public final void a(String string, String string2) {
        System.out.println("onLoginNewGame: " + string + "   " + string2);
        this.I = string;
        this.J = string2;
        this.b.a("");
        this.c.a("");
        w = true;
        v = false;
        this.i();
    }
}


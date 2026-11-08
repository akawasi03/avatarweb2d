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
import java.io.OutputStream;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ei
extends hj
implements cq {
    public static ei a;
    private int h;
    private int i;
    private int j = -1;
    private by k;
    private by l;
    private by m;
    private static short n;
    public static boolean b;
    private Vector o;
    public byte c = (byte)-1;
    private int p = -1;
    public int d = -1;
    private int q;
    public static boolean e;
    private he[] r;
    private dr s;
    private dr t;
    private ah u;
    private Image v;
    private int w = -1;
    private int x = -1;
    private int[] y = new int[]{1688583, 14744065};
    public int f;
    public int g;
    private short z = (short)69;
    private short A = (short)68;
    private short[] B;
    private int C = 0;
    private Vector D;
    private Vector E;
    private int F;
    private byte G;

    static {
        n = 0;
        b = false;
        e = false;
    }

    public static ei b() {
        if (a == null) {
            a = new ei();
        }
        return a;
    }

    public final void a() {
        super.a();
        this.i();
    }

    public ei() {
        this.k = new by(kf.cS, 0);
        this.l = new by(kf.cy, 1);
        this.m = new by(kf.c, 2);
        c.b(kf.av);
        this.v = c.a("hand");
        c.a();
    }

    private void i() {
        if (this.q == GameMidlet.i.w) {
            this.ad = ae.b().e;
            this.ad.a = kf.O;
            this.ac = this.m;
            return;
        }
        this.ac = this.m;
        if (main.a.Z == 0) {
            this.ad = ae.b().e;
        }
    }

    private void j() {
        ir.b(GameMidlet.i);
        GameMidlet.i.aw = this.t.a;
        GameMidlet.i.ax = this.t.b;
        GameMidlet.i.H = 0;
        do.a().a(this.t.a * gy.Y, this.t.b * gy.Y);
    }

    public final void d() {
        ae.b().e();
    }

    private void m() {
        this.ad = new by(kf.O, 3);
        this.ae = new by(kf.cy, 4);
        this.ac = null;
        e = true;
        this.h = GameMidlet.i.aw / 24;
        this.i = GameMidlet.i.ax / 24;
        ir.c(GameMidlet.i);
    }

    private void n() {
        df.a();
        this.h = GameMidlet.i.aw / 24;
        this.i = GameMidlet.i.ax / 24;
        ir.c(GameMidlet.i);
    }

    private static void o() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < ir.m.size()) {
            gx gx2 = (gx)ir.m.elementAt(n2);
            if (gx2.az == 0 && gx2.w != GameMidlet.i.w) {
                vector.addElement(new by(gx2.x, 16, n2));
            }
            ++n2;
        }
        le.a().a(vector, 0);
    }

    private void p() {
        this.n();
        if (this.B == null) {
            this.B = new short[ir.d.length];
            int n2 = 0;
            while (n2 < ir.d.length) {
                this.B[n2] = ir.d[n2];
                ++n2;
            }
        }
        b = false;
        this.ad = this.k;
        this.ae = this.l;
        this.ac = new by(kf.O, 5);
        Vector<gl> vector = new Vector<gl>();
        int n3 = 0;
        while (n3 < this.r.length) {
            int n4 = n3;
            if (this.r[n3].b != -1 || this.r[n3].c != -1) {
                vector.addElement(new gl(this, String.valueOf(this.r[n3].a) + "(" + main.a.a(this.r[n3].b, this.r[n3].c, true) + ")", 17, n3, n4));
            }
            ++n3;
        }
        if (vector.size() > 0) {
            le.a().a(vector, main.a.o, 27 * gy.Y, 27 * gy.Y);
        }
    }

    private void q() {
        this.d = -1;
        this.j = -1;
        e = false;
        b = false;
        this.i();
        this.ae = null;
        if (ir.g(GameMidlet.i.w) == null) {
            this.j();
        }
    }

    private void r() {
        Vector<by> vector = new Vector<by>();
        int n2 = 0;
        while (n2 < fx.e.size()) {
            int n3;
            Object object = (ag)fx.e.elementAt(n2);
            if (((ag)object).i != 0 && (this.c != 4 && (((ag)object).i == 1 || ((ag)object).i == 2) || this.c == 4) && (n3 = ((ag)object).g.indexOf(":")) != -1) {
                boolean bl2 = false;
                object = ((ag)object).g.substring(0, n3);
                n3 = 0;
                while (n3 < vector.size()) {
                    if (((by)vector.elementAt((int)n3)).a.equals(object)) {
                        bl2 = true;
                    }
                    ++n3;
                }
                if (!bl2 || vector.size() == 0) {
                    vector.addElement(new by((String)object, 18, n2));
                }
            }
            ++n2;
        }
        le.a().a(vector, 2);
    }

    private void b(String string) {
        this.q();
        Vector<gk> vector = new Vector<gk>();
        int n2 = 0;
        while (n2 < fx.e.size()) {
            ag ag2 = (ag)fx.e.elementAt(n2);
            int n3 = ag2.g.indexOf(string);
            if (ag2.i != 0 && n3 != -1 && (this.c != 4 && (ag2.i == 1 || ag2.i == 2) || this.c == 4)) {
                String string2 = ag2.g.substring(ag2.g.indexOf(":") + 1);
                String string3 = main.a.a(ag2.h, (int)ag2.d, true);
                int n4 = n2;
                vector.addElement(new gk(this, "", new gi(this, n4, string), ag2, 90, string3, string2));
            }
            ++n2;
        }
        if (vector.size() > 0) {
            le.a().a(vector, main.a.o, 90, 90);
            le.g = new gj(this);
        }
    }

    private boolean a(ag ag2) {
        if (ag2.i != 2 && ag2.i != 4) {
            if (ir.g[this.i * ir.e + this.h] != 80) {
                main.a.b(kf.db);
                return true;
            }
            int n2 = 0;
            while (n2 < ag2.j.size()) {
                dr dr2 = (dr)ag2.j.elementAt(n2);
                if (ir.g[(this.i + dr2.b) * ir.e + (this.h + dr2.a)] != 80) {
                    main.a.b(kf.db);
                    return true;
                }
                ++n2;
            }
        } else {
            String string = "";
            int n3 = 0;
            while (n3 < this.o.size()) {
                kq kq2 = (kq)this.o.elementAt(n3);
                if (n3 != this.d && kq2.b == ag2.a && this.h == kq2.aw / 24 && this.i == kq2.ax / 24) {
                    string = kf.dc;
                    break;
                }
                ++n3;
            }
            if (!string.equals("")) {
                main.a.b(string);
                return true;
            }
            if (!(ag2.i != 2 && ag2.i != 4 || ir.d[n3 = (this.i - 1) * ir.e + this.h] >= n && ir.d[this.i * ir.e + this.h] < n)) {
                main.a.b(kf.dd);
                return true;
            }
        }
        return false;
    }

    public final void a(kq kq2) {
        if (ei.d(kq2)) {
            ++kq2.ax;
        }
        this.o.addElement(kq2);
        ir.l.addElement(kq2);
        this.c(kq2);
        ir.a(ir.l);
    }

    public final void l() {
        super.l();
        if (!e) {
            main.a.x.a();
            GameMidlet.i.e();
            return;
        }
        int n2 = 0;
        if (main.a.a(2)) {
            if (!ei.b(this.h, this.i - 1)) {
                --this.i;
            }
            if (this.i < 0) {
                this.i = 0;
            }
            n2 = 1;
        } else if (main.a.a(4)) {
            if (!ei.b(this.h - 1, this.i)) {
                --this.h;
            }
            if (this.h < 0) {
                this.h = 0;
            }
            n2 = 1;
            GameMidlet.i.K = gx.J;
        } else if (main.a.a(6)) {
            if (!ei.b(this.h + 1, this.i)) {
                ++this.h;
            }
            if (this.h >= ir.e) {
                this.h = ir.e - 1;
            }
            n2 = 1;
            GameMidlet.i.K = 0;
        } else if (main.a.a(8)) {
            if (!ei.b(this.h, this.i + 1)) {
                ++this.i;
            }
            if (this.i >= ir.f) {
                this.i = ir.f - 1;
            }
            n2 = 1;
        }
        if (main.a.f) {
            n2 = (do.a().a + main.a.h) / (ir.i * gy.Y);
            int n3 = (do.a().b + main.a.i) / (ir.i * gy.Y);
            if (n2 == this.h && n3 == this.i && this.ad != null) {
                this.ad.b();
            }
            this.h = n2;
            this.i = n3;
            n2 = 1;
            main.a.f = false;
        }
        if (n2 != 0) {
            GameMidlet.i.aw = this.h * 24 + 12;
            GameMidlet.i.ax = this.i * 24 + 12;
            if (this.d != -1 && this.o.size() > 0) {
                kq kq2 = (kq)this.o.elementAt(this.d);
                ((kq)this.o.elementAt(this.d)).aw = this.h * 24;
                kq2.ax = this.i * 24;
                ir.a(ir.l);
            }
        }
    }

    private static boolean b(int n2, int n3) {
        return ir.d[n3 * ir.e + n2] == ir.c.c - 2 || ir.d[n3 * ir.e + n2] == -1;
    }

    public final void k() {
        ae.b().k();
        if (!e && !b && this.ae == null && ae.b().ae != null) {
            this.ae = ir.q;
        }
    }

    public final void a(Graphics graphics) {
        this.b(graphics);
        super.a(graphics);
        main.a.a(graphics);
    }

    public final void b(Graphics graphics) {
        Object object;
        main.a.x.b(graphics);
        if (e && main.a.t == null) {
            Graphics graphics2 = graphics;
            object = this;
            if (b || ((ei)object).d != -1) {
                if (((ei)object).j != -1) {
                    ag ag2 = (ag)fx.e.elementAt(((ei)object).j);
                    if (ag2.i == 2 || ag2.i == 4) {
                        int n2 = 0;
                        while (n2 < ir.d.length) {
                            if (n2 > 0 && ir.d[n2] < n && ir.d[n2 - ir.e] >= n) {
                                super.a(graphics2, 2 + n2 % ir.e * 24, 2 + n2 / ir.e * 24, 0, 20);
                            }
                            ++n2;
                        }
                    } else {
                        int n3 = 0;
                        while (n3 < ir.g.length) {
                            if (ir.g[n3] == 80 && (n3 % ir.e != ((ei)object).h || n3 / ir.e != ((ei)object).i)) {
                                super.a(graphics2, 2 + n3 % ir.e * 24, 2 + n3 / ir.e * 24, 0, 20);
                            }
                            ++n3;
                        }
                    }
                }
            } else if (((ei)object).j != -1) {
                int n4 = 0;
                while (n4 < ir.g.length) {
                    if (((ei)object).p == 0 && ir.d[n4] >= n && ir.d[n4] < ((ei)object).r.length && (((ei)object).r[ir.d[n4]].c != -1 || ((ei)object).r[ir.d[n4]].b != -1) || ((ei)object).p == 1 && ir.d[n4] < n) {
                        super.a(graphics2, 2 + n4 % ir.e * 24, 2 + n4 / ir.e * 24, 0, 20);
                    }
                    ++n4;
                }
                ir.c.a(((ei)object).j, ((ei)object).h * 24 * gy.Y, ((ei)object).i * 24 * gy.Y, 0, 0, graphics2);
            }
            ((ei)object).a(graphics2, ((ei)object).h * 24, ((ei)object).i * 24, 1, 24);
        }
        main.a.x.d(graphics);
        if (e) {
            if (b && this.j != -1) {
                object = (ag)fx.e.elementAt(this.j);
                fx.a(graphics, ((ag)object).b, (this.h * 24 + ((ag)object).e) * gy.Y, (this.i * 24 + ((ag)object).f) * gy.Y, 0);
            }
            if (main.a.t == null) {
                graphics.drawImage(this.v, (this.h * 24 + 12) * gy.Y, (this.i * 24 + this.C) * gy.Y, 33);
            }
            if (this.p != -1) {
                main.a.L.a(graphics, String.valueOf(this.r[this.j].a) + "(" + main.a.a(this.r[this.j].b, this.r[this.j].c, true) + ")", (this.h * 24 + 12) * gy.Y, (this.i * 24 - 40) * gy.Y, 2);
            }
            ++this.C;
            if (this.C > 5) {
                this.C = 0;
            }
        }
        main.a.c(graphics);
        ir.a(graphics);
    }

    private void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        graphics.setColor(this.y[n4]);
        graphics.drawRect(n2 * gy.Y, n3 * gy.Y, (n5 - 1) * gy.Y, (n5 - 1) * gy.Y);
    }

    public final void a(byte by2, int n2, short[] sArray, byte n3, Vector vector, Vector vector2) {
        this.c = by2;
        this.q = n2;
        this.o = vector;
        ir.e = (short)n3;
        ir.f = (short)(sArray.length / n3);
        ir.d = sArray;
        if (this.c == 4) {
            main.a.x.e(111);
        } else {
            main.a.x.e(68 + this.c);
        }
        ir.t = -1;
        by2 = (byte)-1;
        n2 = 0;
        int n4 = 0;
        while (n4 < n3) {
            int n5 = 0;
            while (n5 < ir.f) {
                ir.g[n5 * n3 + n4] = ir.d[n5 * n3 + n4] < n ? 80 : 88;
                ++n5;
            }
            if (ir.d[(ir.f - 1) * n3 + n4] == this.u.e.getHeight() / (24 * gy.Y) - 1) {
                ir.d[(ir.f - 1) * n3 + n4] = ir.d[(ir.f - 2) * n3 + n4];
                ir.g[(ir.f - 1) * n3 + n4] = 21;
                ++n2;
                if (by2 == -1) {
                    by2 = (byte)(n4 * 24);
                }
            }
            ++n4;
        }
        this.t = new dr(by2 + n2 * 24 / 2, ir.f * 24 - 30);
        GameMidlet.i.aw = this.t.a;
        GameMidlet.i.ax = this.t.b;
        js js2 = ir.h(GameMidlet.i.w);
        if (js2 != null) {
            js2.a(GameMidlet.i.aw, GameMidlet.i.ax);
            js2.h();
        }
        do.a().b(70 + this.c);
        ir.c = new ht(this.u.e, 24 * gy.Y, 24 * gy.Y);
        int n6 = 0;
        while (n6 < vector2.size()) {
            hn hn2 = (hn)vector2.elementAt(n6);
            ((hn)vector2.elementAt(n6)).C = hn2.aw;
            hn2.D = hn2.ax;
            if (hn2.w != GameMidlet.i.w) {
                ir.b(hn2);
            }
            ++n6;
        }
        n6 = 0;
        int n7 = 0;
        n2 = 0;
        while (n2 < this.o.size()) {
            js2 = (kq)this.o.elementAt(n2);
            if (js2.aw == 0 && js2.ax == 0) {
                n3 = 0;
                int n8 = 0;
                while (n8 < ir.d.length) {
                    if (ir.g[n8] == 80) {
                        js2.aw = n8 % ir.e * 24;
                        js2.ax = n8 / ir.e * 24;
                        n6 = js2.aw;
                        n7 = js2.ax;
                        n3 = 1;
                        this.c((kq)js2);
                        iy.a().a(((kq)js2).b, 0, 0, js2.aw / 24, js2.ax / 24, ((kq)js2).c);
                        break;
                    }
                    ++n8;
                }
                if (n3 == 0) {
                    js2.aw = n6;
                    js2.ax = n7;
                    iy.a().a(((kq)js2).b, 0, 0, js2.aw / 24, js2.ax / 24, ((kq)js2).c);
                }
            }
            if (ei.d((kq)js2)) {
                ++js2.ax;
            }
            ++n2;
        }
        ae.b().n();
        Vector vector3 = this.o;
        ei ei2 = this;
        int n9 = 0;
        while (n9 < vector3.size()) {
            kq kq2 = (kq)vector3.elementAt(n9);
            ir.l.addElement(kq2);
            ei2.c(kq2);
            ++n9;
        }
        ir.a(ir.l);
        this.a();
        main.a.h();
    }

    private static boolean d(kq kq2) {
        int n2;
        return fx.b((int)kq2.b).i != 2 && fx.b((int)kq2.b).i != 4 && ir.d[n2 = (kq2.ax / 24 - 1) * ir.e + kq2.aw / 24] >= n && ir.d[kq2.ax / 24 * ir.e + kq2.aw / 24] < n;
    }

    private ah s() {
        DataInputStream dataInputStream = fx.a("avatarTileMap");
        if (dataInputStream == null) {
            return null;
        }
        this.u = new ah();
        try {
            this.u.b = dataInputStream.readShort();
            n = dataInputStream.readShort();
            byte[] byArray = new byte[dataInputStream.available()];
            dataInputStream.read(byArray);
            this.u.e = aw.a(byArray);
            dataInputStream.close();
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        return this.u;
    }

    public final void a(byte[] object, int n2) {
        n = (short)n2;
        this.u.e = aw.a(object);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeShort(this.u.b);
            dataOutputStream.writeShort(n2);
            ((OutputStream)dataOutputStream).write((byte[])object);
            aw.a("avatarTileMap", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
        }
        if (ae.v != -1) {
            iy.a().b(ae.v);
            ae.v = -1;
            return;
        }
        main.a.h();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                ei ei2 = this;
                if (ei2.j != -1) {
                    n3 = ei2.i * ir.e + ei2.h;
                    if (ei2.r[ir.d[n3]].c == -1 && ei2.r[ir.d[n3]].b == -1) {
                        main.a.b(kf.db);
                        break;
                    }
                    if (ei2.j < n && ir.d[n3] >= n || ei2.j >= n && ir.d[n3] < n) {
                        main.a.b(kf.db);
                        break;
                    }
                    ei2.w = ei2.h;
                    ei2.x = ei2.i;
                    ir.d[ei2.i * ir.e + ei2.h] = (short)ei2.j;
                }
                return;
            }
            case 1: {
                this.j = -1;
                this.p = -1;
                this.w = -1;
                this.x = -1;
                n2 = 0;
                n3 = 0;
                while (n3 < this.B.length) {
                    if (this.B[n3] != ir.d[n3]) {
                        n2 = 1;
                        break;
                    }
                    ++n3;
                }
                if (n2 == 1) {
                    iy.a().a(ir.d, 0);
                    main.a.i();
                }
                this.j();
                e = false;
                this.i();
                this.ae = null;
                return;
            }
            case 2: {
                ei ei3 = this;
                Vector<by> vector = new Vector<by>();
                if (ei3.q == GameMidlet.i.w) {
                    vector.addElement(new by(kf.co, 1));
                    vector.addElement(new by(kf.cT, 2));
                    int n4 = 0;
                    int n5 = 0;
                    while (n5 < ir.m.size()) {
                        js js2 = (js)ir.m.elementAt(n5);
                        if (js2.az == 0) {
                            ++n4;
                        }
                        ++n5;
                    }
                    if (n4 > 1) {
                        vector.addElement(new by(kf.v, 3));
                    }
                    vector.addElement(new by(kf.t, 4));
                }
                vector.addElement(new by(kf.x, 5));
                le.a().a(vector, 0);
                return;
            }
            case 3: {
                gy gy2 = this;
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.cY, 11));
                vector.addElement(new by(kf.cZ, 12));
                vector.addElement(new by(kf.bg, 13));
                le.a().a(vector, 2);
                int n6 = gy2.i * 24 * gy.Y - do.a().b - le.a().d - 12;
                int n7 = gy2.h * 24 * gy.Y - do.a().a - le.a().c / 2 + 12;
                gy2 = le.a();
                le.a().a = n7;
                ((le)gy2).b = n6;
                if (((le)gy2).a < 0) {
                    ((le)gy2).a = 0;
                }
                if (((le)gy2).b < 0) {
                    ((le)gy2).b = 0;
                }
                return;
            }
            case 4: {
                this.q();
                return;
            }
            case 5: {
                this.p();
                return;
            }
            case 8: {
                hi.b();
                main.a.A = null;
                return;
            }
            case 50: {
                iy.a().a(ir.d, 1);
                main.a.i();
                return;
            }
            case 51: {
                ir.d = this.B;
                this.B = null;
                eo.a();
                return;
            }
            case 53: {
                cx.a().i(0);
                main.a.i();
                return;
            }
            case 100: {
                iy.a().a(main.a.u.a(), 0, 0);
                main.a.h();
                return;
            }
            case 101: {
                cx.a().a(main.a.u.a(), (byte)0);
            }
        }
    }

    public final void a(short s2, String string) {
        main.a.h();
        if (s2 == 0) {
            Vector<by> vector = new Vector<by>();
            vector.addElement(new by(kf.o, 50));
            vector.addElement(new by(kf.p, 51));
            main.a.a(string, vector);
            return;
        }
        main.a.b(string);
        if (s2 == 2) {
            ir.d = this.B;
        }
        this.B = null;
        eo.a();
        GameMidlet.i.aw = this.t.a;
        GameMidlet.i.ax = this.t.b;
        this.ad = ae.b().e;
        do.a().b(70 + this.c);
    }

    public final void a(he[] heArray) {
        this.r = heArray;
        this.p();
        main.a.h();
    }

    private void e(kq kq2) {
        int n2 = 0;
        int n3 = 0;
        while (n3 < this.o.size()) {
            kq kq3 = (kq)this.o.elementAt(n3);
            if (kq3.aw / 24 == kq2.aw / 24 && kq3.ax / 24 == kq2.ax / 24) {
                ++n2;
            }
            ++n3;
        }
        if (n2 == 1) {
            ag ag2 = fx.b((int)kq2.b);
            int n4 = 0;
            while (n4 < ag2.j.size()) {
                dr dr2 = (dr)ag2.j.elementAt(n4);
                ir.g[(kq2.ax / 24 + dr2.b) * ir.e + (kq2.aw / 24 + dr2.a)] = 80;
                ++n4;
            }
        }
    }

    public final void b(kq object) {
        kq kq2;
        block2: {
            kq kq3 = object;
            object = this;
            int n2 = 0;
            while (n2 < ((ei)object).o.size()) {
                kq kq4 = (kq)((ei)object).o.elementAt(n2);
                if (kq4.aw / 24 == kq3.aw && kq4.ax / 24 == kq3.ax && kq4.b == kq3.b) {
                    kq2 = kq4;
                    break block2;
                }
                ++n2;
            }
            kq2 = null;
        }
        object = kq2;
        ir.l.removeElement(object);
        this.o.removeElement(object);
        this.e((kq)object);
        eo.a();
        main.a.h();
    }

    public final void c(kq kq2) {
        ag ag2 = fx.b((int)kq2.b);
        int n2 = 88;
        if (ag2.a == this.A) {
            n2 = 112;
        } else if (ag2.a == this.z) {
            n2 = 111;
        } else if (ag2.c == 1) {
            n2 = 79;
        } else if (ag2.c == 2) {
            n2 = 67;
        }
        int n3 = 0;
        while (n3 < ag2.j.size()) {
            dr dr2 = (dr)ag2.j.elementAt(n3);
            ir.g[(kq2.ax / 24 + dr2.b) * ir.e + (kq2.aw / 24 + dr2.a)] = n2;
            ++n3;
        }
    }

    public final void a(int n2, int n3, short s2, Vector vector) {
        if (n2 == 0) {
            boolean bl2;
            GameMidlet.i.q = (byte)n3;
            ae.b().a();
            n3 = s2;
            Object object = this;
            if (((ei)object).u == null) {
                ((ei)object).s();
                if (((ei)object).u == null || n3 != ((ei)object).u.b) {
                    if (((ei)object).u == null) {
                        ((ei)object).u = new ah();
                        ((ei)object).u.b = (short)n3;
                    }
                    object = iy.a();
                    ((kj)object).e((byte)-73);
                    ((kj)object).k();
                    bl2 = false;
                } else {
                    bl2 = true;
                }
            } else {
                bl2 = true;
            }
            if (bl2) {
                if (ae.v != -1) {
                    iy.a().b(ae.v);
                    ae.v = -1;
                    return;
                }
                main.a.J = 1;
                main.a.h();
                return;
            }
            main.a.J = 1;
            return;
        }
        n2 = 0;
        while (n2 < vector.size()) {
            hn hn2 = (hn)vector.elementAt(n2);
            hn hn3 = cy.b(hn2.w);
            if (hn2 != null && hn3 != null) {
                hn3.q = hn2.q;
            }
            ++n2;
        }
        main.a.h();
        this.e();
    }

    public final void d(int n2) {
        im.d().a(n2, this);
        super.d(n2);
    }

    public final void a(String string) {
        if (string.trim().equals("")) {
            return;
        }
        bf.a().a(string);
    }

    public final void e() {
        if (cy.d == null) {
            main.a.i();
            ie.a().d();
            cy.e = (byte)2;
            return;
        }
        if (cy.f) {
            cy.f = false;
            main.a.i();
            iy.a().c(1);
            return;
        }
        Vector<hn> vector = new Vector<hn>();
        int n2 = 0;
        while (n2 < cy.d.size()) {
            hn hn2 = (hn)cy.d.elementAt(n2);
            if (hn2.q == this.c) {
                vector.addElement(hn2);
            }
            ++n2;
        }
        if (vector.size() == 0) {
            if (main.a.r == cy.b()) {
                cy.b().b.a();
            }
            main.a.b(kf.de);
            return;
        }
        cy.b().a();
        cy.c = vector;
        cy.b().e();
        cy.b().g();
    }

    public final void d(int n2, int n3) {
        kq kq2;
        int n4 = -1;
        int n5 = 0;
        while (n5 < this.o.size()) {
            kq2 = (kq)this.o.elementAt(n5);
            if (kq2.aw / 24 == this.h && kq2.ax / 24 == this.i) {
                n4 = n5;
                break;
            }
            ++n5;
        }
        n5 = n4;
        kq2 = null;
        if (n4 != -1) {
            kq2 = (kq)this.o.elementAt(n4);
        }
        switch (n2) {
            case 1: {
                cx cx2 = cx.a();
                cx2.e((byte)-87);
                cx2.k();
                return;
            }
            case 2: {
                ei ei2 = this;
                Vector<by> vector = new Vector<by>();
                vector.addElement(new by(kf.cU, 6));
                vector.addElement(new by(kf.cV, 7));
                if (ei2.o.size() > 0) {
                    vector.addElement(new by(kf.cW, 8));
                }
                le.a().a(vector, 2);
                return;
            }
            case 3: {
                ei.o();
                return;
            }
            case 4: {
                main.a.u.a(String.valueOf(kf.bO) + ":", 100, 2);
                return;
            }
            case 5: {
                ae.b().e();
                return;
            }
            case 6: {
                this.r();
                return;
            }
            case 7: {
                e = true;
                if (this.r == null) {
                    ei ei3 = this;
                    if (ei3.r == null) {
                        df.a();
                        iy iy2 = iy.a();
                        iy2.e((byte)-43);
                        iy2.k();
                        main.a.i();
                    }
                    return;
                }
                this.p();
                return;
            }
            case 8: {
                this.m();
                return;
            }
            case 11: {
                if (n4 == -1) {
                    main.a.b(kf.cX);
                    return;
                }
                this.d = n5;
                n2 = 0;
                while (n2 < fx.e.size()) {
                    ag ag2 = (ag)fx.e.elementAt(n2);
                    if (ag2.a == kq2.b) {
                        this.j = n2;
                        break;
                    }
                    ++n2;
                }
                this.ac = null;
                this.ae = null;
                this.e(kq2);
                this.s = new dr(this.h, this.i, kq2.b);
                this.ad = new by(kf.z, new ga(this, kq2));
                return;
            }
            case 12: {
                if (n4 == -1) {
                    main.a.b(kf.cX);
                    return;
                }
                kq2.c = kq2.c == 0 ? (byte)2 : (byte)0;
                iy.a().a(kq2.b, this.h, this.i, this.h, this.i, kq2.c);
                return;
            }
            case 13: {
                if (n4 == -1 || kq2.b == this.z) {
                    main.a.b(kf.cX);
                    return;
                }
                main.a.a(kf.da, new fw(this, kq2));
                return;
            }
            case 14: {
                dp.b().d();
                main.a.b(kf.cK, 53);
                return;
            }
            case 15: {
                Object object = new dx[3];
                n3 = 0;
                while (n3 < 3) {
                    object[n3] = new dx();
                    object[n3].d(2);
                    ++n3;
                }
                object[0].a(true);
                by by2 = new by(kf.cy, new gg(this, (dx[])object));
                dp.b().d();
                hi.b().a((dx[])object, kf.cx, kf.eF, by2);
                object = hi.b();
                main.a.A = object;
                hi.b().ac = new by(kf.d, 8);
                return;
            }
            case 16: {
                if (n3 >= ir.m.size()) break;
                gx gx2 = (gx)ir.m.elementAt(n3);
                iy.a().d(gx2.w);
                return;
            }
            case 17: {
                n2 = 0;
                while (n2 < this.r.length) {
                    if (n2 == n3) {
                        if (this.w != -1) {
                            this.h = this.w;
                            this.i = this.x;
                            GameMidlet.i.aw = this.w * 24;
                            GameMidlet.i.ax = this.x * 24;
                            do.a().a(GameMidlet.i.aw * gy.Y, GameMidlet.i.ax * gy.Y);
                        }
                        this.j = n2;
                        this.p = this.j < n ? 1 : 0;
                    }
                    ++n2;
                }
                return;
            }
            case 18: {
                n2 = 0;
                while (n2 < fx.e.size()) {
                    if (n2 == n3) {
                        Object object = (ag)fx.e.elementAt(n2);
                        if (((ag)object).i != 0 && (this.c != 4 && (((ag)object).i == 1 || ((ag)object).i == 2) || this.c == 4) && (n5 = ((ag)object).g.indexOf(":")) != -1) {
                            object = ((ag)object).g.substring(0, n5);
                            this.b((String)object);
                        }
                    }
                    ++n2;
                }
                break;
            }
        }
    }

    public final void f() {
        this.D = null;
        this.E = null;
        bf.a().a(21, 0);
        ir.t = -1;
    }

    public final void a(Vector object, Vector object2, int n2, byte by2) {
        this.E = object;
        this.D = object2;
        this.F = n2;
        this.G = by2;
        Vector vector = ae.b().a((Vector)object, GameMidlet.i.w, 3);
        object2 = ae.b().a((Vector)object2, GameMidlet.i.w, 2);
        if (main.a.r == cd.a) {
            return;
        }
        dp.b().m = true;
        dp.b().a(new String[]{kf.by, kf.co}, new Vector[]{vector, object2}, null);
        object = ae.b().a((Vector)object, 1, 1, false);
        object2 = new by(kf.c, new dd(this));
        dp.b().a((by)object, 0);
        dp.b().a((by)object2, 1);
        if (main.a.r != dp.b()) {
            dp.b().a();
        }
    }

    public static void g() {
        main.a.u.a(kf.bO, 101, 2);
    }

    /*
     * WARNING - void declaration
     */
    public final void a(boolean bl2, String string) {
        if (!bl2) {
            void n2;
            main.a.b((String)n2);
            return;
        }
        int hx2 = dp.g;
        int n2 = dp.j;
        if (hx2 == 0) {
            hx hx3 = (hx)this.E.elementAt(n2);
            this.D.addElement(hx3);
            this.E.removeElement(hx3);
        } else {
            hx hx3 = (hx)this.D.elementAt(n2);
            this.E.addElement(hx3);
            this.D.removeElement(hx3);
        }
        this.h();
        main.a.h();
    }

    public final void h() {
        int n2 = dp.g;
        int n3 = dp.j;
        dp.b().d();
        this.a(this.E, this.D, this.F, this.G);
        dp.g = n2;
        dp.b().i();
        if (n3 >= dp.b().h[n2].size()) {
            n3 = 0;
        }
        dp.j = n3;
        dp.b().m();
        main.a.y.a(dp.j);
    }

    public final void a(byte by2, String string, String[] stringArray, short[] sArray, short[] sArray2, String[] stringArray2, String[] stringArray3, int[] nArray, short[] sArray3) {
        ae.b();
        ae.d(GameMidlet.i);
        Vector<id> vector = new Vector<id>();
        int n2 = 0;
        while (n2 < stringArray.length) {
            vector.addElement(new id(this, kf.O, new cg(this, by2, sArray2[n2], stringArray3[n2]), n2, stringArray[n2], sArray[n2], sArray2[n2], stringArray2[n2], nArray == null ? -1 : nArray[n2], stringArray3[n2], sArray3[n2]));
            ++n2;
        }
        if (vector.size() > 0) {
            dp.b().a();
            dp.o = true;
            dp.b().a(new String[]{string}, new Vector[]{vector}, null);
        }
    }

    static void a(ei ei2) {
        ei2.n();
    }

    static int b(ei ei2) {
        return ei2.w;
    }

    static void a(ei ei2, int n2) {
        ei2.h = n2;
    }

    static int c(ei ei2) {
        return ei2.x;
    }

    static void b(ei ei2, int n2) {
        ei2.i = n2;
    }

    static void c(ei ei2, int n2) {
        ei2.j = n2;
    }

    static int d(ei ei2) {
        return ei2.h;
    }

    static void d(ei ei2, int n2) {
        ei2.w = n2;
    }

    static int e(ei ei2) {
        return ei2.i;
    }

    static void e(ei ei2, int n2) {
        ei2.x = n2;
    }

    static void a(ei ei2, int n2, String string) {
        ag ag2 = (ag)fx.e.elementAt(n2);
        if (!ei2.a(ag2)) {
            main.a.a(ag2.h, (int)ag2.d, new cr(ei2, ag2, string), new co(ei2, ag2, string), new de(ei2));
        }
    }

    static void f(ei ei2) {
        ei2.r();
    }

    static boolean a(ei ei2, ag ag2) {
        return ei2.a(ag2);
    }

    static dr g(ei ei2) {
        return ei2.s;
    }

    static boolean a(ei ei2, kq kq2) {
        return ei.d(kq2);
    }

    static void h(ei ei2) {
        ei2.m();
    }

    static void a(ei ei2, String string) {
        ei2.b(string);
    }

    static void i(ei ei2) {
        ei2.q();
    }
}


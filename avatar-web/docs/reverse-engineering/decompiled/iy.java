/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;
import main.GameMidlet;
import main.a;

public final class iy
extends kj {
    private static iy a;

    public static iy a() {
        if (a == null) {
            a = new iy();
        }
        return a;
    }

    public final void b() {
        this.e((byte)-11);
        this.n(es.s);
        this.k();
    }

    public final void a(short s2) {
        this.e((byte)-14);
        this.p(s2);
        this.k();
        main.a.c(kf.aM);
    }

    public final void c() {
        this.e((byte)-15);
        this.k();
        main.a.c(kf.aM);
    }

    public final void d() {
        this.e((byte)-16);
        this.k();
        main.a.c(kf.aM);
    }

    public final void e() {
        this.e((byte)-37);
        this.k();
        main.a.c(kf.aM);
    }

    public final void f() {
        this.e((byte)-40);
        this.k();
    }

    public final void g() {
        this.e((byte)-41);
        this.k();
    }

    public final void a(int n2) {
        if (GameMidlet.e != 9 && GameMidlet.e != 11) {
            return;
        }
        this.e((byte)57);
        this.o(n2);
        this.k();
    }

    public final void a(int n2, int n3) {
        this.e((byte)-24);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(short[] sArray, int n2) {
        this.e((byte)-46);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeShort(sArray.length);
            n2 = 0;
            while (n2 < sArray.length) {
                this.b.c().writeByte(sArray[n2]);
                ++n2;
            }
            this.b.c().writeShort(0);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(kq kq2) {
        System.out.println("doBuyItemHouse; " + kq2.b);
        this.e((byte)-74);
        try {
            this.b.c().writeShort(kq2.b);
            this.b.c().writeByte(kq2.aw / 24);
            this.b.c().writeByte(kq2.ax / 24);
            this.b.c().writeByte(kq2.f);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2) {
        main.a.i();
        this.e((byte)-65);
        this.n(n2);
        this.k();
    }

    public final void b(kq kq2) {
        this.e((byte)-66);
        try {
            this.b.c().writeShort(kq2.b);
            this.b.c().writeByte(kq2.aw / 24);
            this.b.c().writeByte(kq2.ax / 24);
            this.b.c().writeByte(kq2.c);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void c(int n2) {
        this.e((byte)-67);
        this.o(n2);
        this.k();
    }

    public final void d(int n2) {
        this.e((byte)-69);
        this.n(n2);
        this.k();
    }

    public final void e(int n2) {
        this.e((byte)-70);
        this.n(n2);
        this.k();
    }

    public final void a(int n2, int n3, int n4, int n5, int n6, int n7) {
        this.e((byte)-71);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeByte(n4);
            this.b.c().writeByte(n5);
            this.b.c().writeByte(n6);
            this.b.c().writeByte(n7);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(String string, int n2, int n3) {
        this.e((byte)-75);
        try {
            this.b.c().writeByte(n3);
            this.b.c().writeUTF(string);
            if (n3 == 1) {
                this.b.c().writeInt(n2);
            }
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(short s2) {
        this.e((byte)-80);
        this.p(s2);
        this.k();
    }

    public final void c(short s2) {
        this.e((byte)-84);
        this.o(s2);
        this.k();
    }

    public final void f(int n2) {
        this.e((byte)-104);
        this.n(n2);
        this.k();
    }
}


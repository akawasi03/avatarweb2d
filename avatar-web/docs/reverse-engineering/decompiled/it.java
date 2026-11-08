/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;
import main.a;

public final class it
extends kj {
    private static it a;

    public static it a() {
        if (a == null) {
            a = new it();
        }
        return a;
    }

    public final void a(short s2) {
        this.e((byte)54);
        this.p(s2);
        this.k();
        main.a.c(kf.aL);
    }

    public final void b() {
        this.e((byte)55);
        this.k();
        main.a.c(kf.aL);
    }

    public final void c() {
        this.e((byte)56);
        this.k();
        main.a.c(kf.aL);
    }

    public final void d() {
        this.e((byte)60);
        this.k();
    }

    public final void a(int n2) {
        this.e((byte)61);
        this.n(n2);
        this.k();
    }

    public final void a(short s2, byte by2, int n2) {
        this.e((byte)62);
        try {
            this.b.c().writeShort(s2);
            this.b.c().writeByte(by2);
            this.b.c().writeByte(n2);
        }
        catch (IOException iOException) {}
        this.k();
        main.a.h();
    }

    public final void b(short s2) {
        this.e((byte)63);
        this.p(s2);
        this.k();
    }

    public final void a(int n2, int n3, int n4) {
        this.e((byte)64);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeByte(n4);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2, int n3, int n4) {
        System.out.println("doUsingItem: " + n3 + "    " + n4);
        this.e((byte)65);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeShort(n4);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(int n2, int n3) {
        System.out.println("doHervest: " + n2 + "   " + n3);
        this.e((byte)66);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2, int n3) {
        this.e((byte)70);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(int n2) {
        this.e((byte)69);
        this.n(n2);
        this.k();
    }

    public final void c(int n2, int n3) {
        this.e((byte)74);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(int n2, byte by2) {
        this.e((byte)73);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(by2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(ad ad2, int n2) {
        main.a.h();
        this.e((byte)71);
        try {
            this.b.c().writeByte(ad2.a);
            this.b.c().writeByte(n2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void d(int n2, int n3) {
        this.e((byte)72);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void e(int n2, int n3) {
        this.e((byte)75);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void f(int n2, int n3) {
        this.e((byte)80);
        this.o(n2);
        if (n2 == 1) {
            this.o(n3);
        }
        this.k();
    }

    public final void g(int n2, int n3) {
        this.e((byte)81);
        this.o(n2);
        if (n2 == 1) {
            this.o(n3);
        }
        this.k();
    }

    public final void c(short s2) {
        this.e((byte)82);
        this.p(s2);
        this.k();
    }

    public final void c(int n2) {
        this.e((byte)84);
        this.o(n2);
        this.k();
    }

    public final void d(int n2) {
        this.e((byte)86);
        this.o(n2);
        this.k();
    }

    public final void h(int n2, int n3) {
        this.e((byte)90);
        this.o(n2);
        if (n2 == 1) {
            this.o(n3);
        }
        this.k();
    }

    public final void i(int n2, int n3) {
        this.e((byte)94);
        this.o(n2);
        if (n2 == 1) {
            this.o(n3);
        }
        this.k();
    }

    public final void d(short s2) {
        main.a.i();
        this.e((byte)91);
        this.p(s2);
        this.k();
    }

    public final void e(int n2) {
        this.e((byte)93);
        this.o(n2);
        this.k();
    }

    public final void f(int n2) {
        this.e((byte)96);
        this.o(0);
        this.k();
    }
}


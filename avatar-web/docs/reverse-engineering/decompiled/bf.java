/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;
import main.GameMidlet;
import main.a;

public final class bf
extends kj {
    private static bf a;

    public static bf a() {
        if (a == null) {
            a = new bf();
        }
        return a;
    }

    public final void a(int n2, int n3) {
        System.out.println("doJoinPark: " + n2 + "   " + n3);
        if (jy.c == 0) {
            main.a.i();
        }
        this.e((byte)50);
        try {
            this.b.c().writeByte(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeShort(ir.B);
            this.b.c().writeShort(ir.C);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        this.k();
    }

    public final void a(int n2, int n3, int n4, int n5) {
        this.e((byte)54);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeShort(n3);
            this.b.c().writeByte(n4);
            this.b.c().writeShort(n5);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(String string) {
        if (GameMidlet.e == 10) {
            this.e((byte)77);
        } else {
            this.e((byte)55);
        }
        this.c(string);
        this.k();
    }

    public final void a(int n2) {
        this.e((byte)-21);
        this.n(n2);
        this.k();
    }

    public final void a(int n2, boolean bl2) {
        this.e((byte)-19);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeBoolean(bl2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(int n2, int n3, int n4) {
        System.out.println("doGiftGiving: " + n2 + "    " + GameMidlet.i.w);
        this.e((byte)58);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeShort(n3);
            this.b.c().writeByte(n4);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2, int n3) {
        this.e((byte)59);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeShort(n3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2) {
        System.out.println("doRequestYourInfo: " + n2);
        this.e((byte)-22);
        this.n(n2);
        this.k();
    }

    public final void a(byte by2) {
        this.e((byte)60);
        this.o(by2);
        this.k();
    }

    public final void a(short s2) {
        this.e((byte)-38);
        this.p(s2);
        this.k();
    }

    public final void a(boolean n2, byte[] byArray) {
        this.e((byte)84);
        try {
            this.b.c().writeBoolean(true);
            this.b.c().writeByte(byArray.length);
            n2 = 0;
            while (n2 < byArray.length) {
                this.b.c().writeByte(byArray[n2]);
                ++n2;
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b() {
        this.e((byte)85);
        this.k();
    }

    public final void c(int n2, int n3) {
        this.e((byte)-68);
        try {
            this.b.c().writeByte(n2);
            this.b.c().writeInt(n3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(int n2, int n3, int n4) {
        this.e((byte)-77);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeByte(n4);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void c(int n2, int n3, int n4) {
        this.e((byte)-78);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(n3);
            this.b.c().writeShort(n4);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void c(int n2) {
        this.e((byte)89);
        try {
            this.b.c().writeByte(0);
            this.b.c().writeInt(n2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void d(int n2, int n3) {
        System.out.println("doRequestWedding");
        this.e((byte)93);
        try {
            this.b.c().writeByte(n2);
            this.b.c().writeByte(n3);
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        this.k();
    }
}


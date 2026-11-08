/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;
import java.util.Vector;

public final class ie
extends kj {
    private static ie a;

    public static ie a() {
        if (a == null) {
            a = new ie();
        }
        return a;
    }

    public final void b() {
        this.e((byte)6);
        this.k();
    }

    public final void a(byte by2) {
        this.e((byte)7);
        this.o(by2);
        this.k();
    }

    public final void a(int n2) {
        try {
            this.b((byte)56);
            this.b.c().writeByte(n2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(byte by2, byte by3, String string) {
        this.e((byte)8);
        try {
            this.b.c().writeByte(by2);
            this.b.c().writeByte(by3);
            this.b.c().writeUTF(string);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void c() {
        this.e((byte)28);
        this.k();
    }

    public final void d() {
        this.e((byte)-18);
        this.k();
    }

    public final void a(byte[] byArray) {
        try {
            this.b((byte)21);
            this.b.c().writeByte(byArray.length);
            int n2 = 0;
            while (n2 < byArray.length) {
                this.b.c().write(byArray[n2]);
                ++n2;
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void e() {
        try {
            this.b((byte)49);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(byte by2) {
        super.e(by2);
        this.b.c().writeByte(kx.p);
        this.b.c().writeByte(kx.q);
    }

    public final void c(byte by2) {
        try {
            this.b((byte)21);
            this.b.c().writeByte(by2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void f() {
        try {
            this.b((byte)63);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(int[] nArray, byte by2) {
        try {
            this.b((byte)64);
            int n2 = 0;
            while (n2 < nArray.length) {
                this.b.c().writeByte(nArray[n2]);
                ++n2;
            }
            this.b.c().writeByte(by2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(ax[] axArray) {
        try {
            this.b((byte)65);
            int n2 = -1;
            int n3 = 0;
            while (n3 < 10) {
                if (axArray[n3].a != 0) {
                    if (axArray[n3].a != n2 && n2 != -1) {
                        this.b.c().writeByte(-1);
                    }
                    n2 = axArray[n3].a;
                    this.b.c().writeByte(axArray[n3].b);
                } else if (n2 != -1) {
                    this.b.c().writeByte(-1);
                    n2 = -1;
                }
                ++n3;
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(int[] nArray) {
        try {
            this.b((byte)67);
            int n2 = 0;
            while (n2 < nArray.length) {
                if (nArray[n2] != -1) {
                    this.b.c().writeByte(nArray[n2]);
                }
                ++n2;
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(int[] nArray, int n2) {
        try {
            this.b((byte)68);
            this.b.c().writeByte(n2);
            n2 = 0;
            while (n2 < 5) {
                if (nArray[n2] != -1) {
                    this.b.c().writeByte(nArray[n2]);
                    ++n2;
                    continue;
                }
                break;
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(String string) {
        try {
            this.b((byte)9);
            this.b.c().writeUTF(string);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void g() {
        try {
            this.b((byte)15);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(boolean bl2) {
        try {
            this.b((byte)16);
            this.b.c().writeBoolean(bl2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2) {
        try {
            this.b((byte)19);
            this.b.c().writeInt(n2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(String string) {
        try {
            this.b((byte)18);
            this.b.c().writeUTF(string);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void c(int n2) {
        try {
            this.b((byte)11);
            this.b.c().writeInt(n2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void h() {
        try {
            this.b((byte)20);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(dn[][] dnArray) {
        try {
            this.b((byte)64);
            int n2 = 0;
            while (n2 < 8) {
                int n3 = 0;
                while (n3 < 8) {
                    if (dnArray[n2][n3].l) {
                        dnArray[n2][n3].l = false;
                        this.b.c().writeByte((n2 << 3) + n3);
                    }
                    ++n3;
                }
                ++n2;
            }
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        this.k();
    }

    public final void a(int n2, int n3) {
        try {
            this.b((byte)21);
            this.b.c().writeByte(n2);
            this.b.c().writeByte(n3);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        this.k();
    }

    public final void i() {
        try {
            this.b((byte)24);
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        this.k();
    }

    public final void a(Vector vector) {
        try {
            this.b((byte)21);
            if (vector.size() > 0) {
                int n2 = 0;
                while (n2 < vector.size()) {
                    kl kl2 = (kl)vector.elementAt(n2);
                    this.b.c().writeByte(kl2.b);
                    kl2.b = 0;
                    ++n2;
                }
            }
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(byte by2, byte by3) {
        try {
            this.b((byte)65);
            this.b.c().writeByte(by2);
            this.b.c().writeByte(by3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void j() {
        try {
            this.b((byte)49);
        }
        catch (Exception exception) {}
        this.k();
    }
}


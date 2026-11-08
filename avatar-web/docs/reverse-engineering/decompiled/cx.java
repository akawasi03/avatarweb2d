/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.rms.RecordStore
 */
import java.io.IOException;
import javax.microedition.rms.RecordStore;
import main.GameMidlet;
import main.a;

public final class cx
extends kj {
    private static cx a;

    public static cx a() {
        if (a == null) {
            a = new cx();
        }
        return a;
    }

    public final void a(byte by2, String string) {
        if (string == null) {
            string = "";
        }
        this.e((byte)-55);
        try {
            this.b.c().writeByte(by2);
            this.b.c().writeUTF(string);
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        this.k();
    }

    public final void b() {
        Object object;
        this.e((byte)-1);
        this.o(GameMidlet.e);
        this.k();
        this.e((byte)-17);
        try {
            this.b.c().writeByte(GameMidlet.f);
            object = Runtime.getRuntime();
            this.b.c().writeInt((int)(((Runtime)object).totalMemory() / 1024L));
            object = System.getProperty("microedition.platform");
            if (object == null) {
                object = "null";
            }
            this.b.c().writeUTF((String)object);
            this.b.c().writeInt(cx.d());
            this.b.c().writeInt(main.a.m);
            this.b.c().writeInt(main.a.n);
            this.b.c().writeBoolean(main.a.H);
            this.b.c().writeByte(gy.Y - 1);
            this.b.c().writeUTF("2.5.8");
            System.out.println("setProviderAndClientType: " + dp.i + "    " + ea.i + "    " + ae.j);
            this.b.c().writeUTF(dp.i);
            this.b.c().writeUTF(ea.i);
            this.b.c().writeUTF(ae.j);
        }
        catch (IOException iOException) {}
        this.k();
        this.e((byte)-79);
        try {
            this.b.c().writeUTF(GameMidlet.g);
        }
        catch (IOException iOException) {
            object = iOException;
            iOException.printStackTrace();
        }
        this.k();
    }

    private static int d() {
        long l2;
        block15: {
            l2 = 0L;
            RecordStore recordStore = null;
            try {
                try {
                    recordStore = RecordStore.openRecordStore((String)"textrms", (boolean)true);
                    l2 = recordStore.getSizeAvailable() + recordStore.getSize();
                }
                catch (Exception exception) {
                    try {
                        if (recordStore != null) {
                            recordStore.closeRecordStore();
                        }
                        RecordStore.deleteRecordStore((String)"textrms");
                    }
                    catch (Exception exception2) {}
                    break block15;
                }
            }
            catch (Throwable throwable) {
                try {
                    if (recordStore != null) {
                        recordStore.closeRecordStore();
                    }
                    RecordStore.deleteRecordStore((String)"textrms");
                }
                catch (Exception exception) {}
                throw throwable;
            }
            try {
                if (recordStore != null) {
                    recordStore.closeRecordStore();
                }
                RecordStore.deleteRecordStore((String)"textrms");
            }
            catch (Exception exception) {}
        }
        if (l2 > 0L) {
            l2 /= 1024L;
        }
        return (int)l2;
    }

    public final void a(int n2) {
        this.e((byte)34);
        this.n(n2);
        this.k();
    }

    public final void a(String string, String string2, String string3) {
        this.e((byte)-2);
        try {
            System.out.println("loginaaaaaaaaaaaaaa: " + string + "    " + string2);
            this.b.c().writeUTF(string);
            this.b.c().writeUTF(string2);
            this.b.c().writeUTF(string3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(int n2) {
        this.e((byte)61);
        this.o(n2);
        this.k();
    }

    public final void a(int n2, String string) {
        this.e((byte)-6);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeUTF(string);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void c() {
        this.e((byte)-35);
        try {
            this.b.c().writeByte(GameMidlet.i.d);
            int n2 = GameMidlet.i.e.size();
            this.b.c().writeByte(n2);
            int n3 = 0;
            while (n3 < n2) {
                hx hx2 = (hx)GameMidlet.i.e.elementAt(n3);
                this.b.c().writeShort(hx2.a);
                ++n3;
            }
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(int n2, int n3) {
        this.e((byte)-36);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeByte(n3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void c(int n2) {
        this.e((byte)-47);
        this.n(n2);
        this.k();
    }

    public final void a(short s2, byte by2) {
        this.e((byte)-48);
        this.b = new jr(-48);
        try {
            this.b.c().writeShort(s2);
            this.b.c().writeByte(by2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void d(int n2) {
        this.e((byte)-1);
        this.o(n2);
        this.k();
    }

    public final void a(byte by2) {
        this.e((byte)-51);
        this.o(by2);
        this.k();
    }

    public final void e(int n2) {
        this.e((byte)-49);
        System.out.println("requestShop: " + n2);
        this.o(n2);
        this.k();
    }

    public final void f(int n2) {
        this.e((byte)-52);
        this.n(n2);
        this.k();
    }

    public final void g(int n2) {
        this.e((byte)-53);
        this.o(n2);
        this.k();
    }

    public final void a(int n2, byte by2, int n3) {
        this.e((byte)-59);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(by2);
            this.b.c().writeByte(n3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(int n2, byte by2, String string) {
        this.e((byte)-60);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(by2);
            this.b.c().writeUTF(string);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void h(int n2) {
        System.out.println("doCommunicate: " + n2);
        this.e((byte)-61);
        this.n(n2);
        this.k();
    }

    public final void b(String string, String string2, String string3) {
        this.e((byte)-56);
        try {
            this.b.c().writeUTF(string);
            this.b.c().writeUTF(string2);
            this.b.c().writeUTF(string3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(String string, String string2) {
        this.e((byte)-62);
        try {
            this.b.c().writeUTF(string);
            this.b.c().writeUTF(string2);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void a(short s2, int n2) {
        this.e((byte)-64);
        try {
            this.b.c().writeShort(s2);
            this.b.c().writeShort(n2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(int n2, String string) {
        this.e((byte)-72);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeUTF(string);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void a(int n2, byte by2, int n3, byte by3) {
        this.e((byte)-81);
        try {
            this.b.c().writeInt(n2);
            this.b.c().writeByte(by2);
            this.b.c().writeShort(n3);
            this.b.c().writeByte(by3);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(int n2, int n3) {
        System.out.println("doRequestCmdRotate: " + n2);
        this.e((byte)-83);
        try {
            this.b.c().writeShort(n2);
            this.b.c().writeInt(n3);
        }
        catch (IOException iOException) {}
        this.k();
    }

    public final void b(byte by2) {
        this.e((byte)-58);
        this.o(by2);
        this.k();
    }

    public final void a(String string, byte by2) {
        this.e((byte)-88);
        try {
            this.b.c().writeByte(0);
            this.b.c().writeUTF(string);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(String string, String string2) {
        this.e((byte)-88);
        try {
            this.b.c().writeByte(1);
            this.b.c().writeUTF(string);
            this.b.c().writeUTF(string2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void i(int n2) {
        this.e((byte)-90);
        this.o(n2);
        this.k();
    }

    public final void a(int n2, int n3, short s2) {
        this.e((byte)-89);
        try {
            this.b.c().writeByte(n2);
            this.b.c().writeShort(n3);
            this.b.c().writeShort(s2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void c(byte by2) {
        this.e((byte)-92);
        if (by2 != -1) {
            this.o(by2);
        }
        this.k();
    }

    public final void d(byte by2) {
        this.e((byte)-94);
        this.o(by2);
        this.k();
    }

    public final void a(short s2) {
        this.e((byte)-95);
        try {
            this.b.c().writeByte(ae.A);
            this.b.c().writeByte(0);
            this.b.c().writeShort(s2);
        }
        catch (Exception exception) {}
        this.k();
    }

    public final void b(short s2) {
        this.e((byte)-97);
        this.p(s2);
        this.k();
    }

    public final void c(short s2) {
        this.e((byte)-98);
        this.p(s2);
        this.k();
    }

    public final void j(int n2) {
        main.a.i();
        this.e((byte)-99);
        this.o(n2);
        this.k();
    }

    public final void c(int n2, int n3) {
        main.a.i();
        this.e((byte)5);
        this.o(n2);
        this.n(n3);
        this.k();
    }

    public final void k(int n2) {
        this.e((byte)2);
        this.o(n2);
        this.k();
    }

    public final void l(int n2) {
        this.e((byte)-102);
        this.n(n2);
        this.k();
    }

    public final void m(int n2) {
        this.e((byte)-106);
        this.o(n2);
        this.k();
    }

    public final void a(byte by2, short s2) {
        this.e((byte)-107);
        try {
            this.b.c().writeByte(by2);
            this.b.c().writeShort(s2);
            this.k();
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public final void c(String object, String string, String string2) {
        System.out.println("doRegisterByEmail: " + (String)object + "   " + string + "   " + string2);
        this.e((byte)-25);
        try {
            this.c((String)object);
            this.c(string);
            this.c(string2);
            this.o(0);
            this.k();
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }
}


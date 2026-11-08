/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;

public class kj {
    private hq a = kt.a();
    protected jr b;

    protected final void n(int n2) {
        try {
            this.b.c().writeInt(n2);
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    protected final void o(int n2) {
        try {
            this.b.c().writeByte(n2);
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    protected final void p(int n2) {
        try {
            this.b.c().writeShort(n2);
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void c(String object) {
        try {
            this.b.c().writeUTF((String)object);
            return;
        }
        catch (IOException iOException) {
            object = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    public final void k() {
        this.a.a(this.b);
        this.b.d();
    }

    public final void e(byte by2) {
        this.b = new jr(by2);
    }
}


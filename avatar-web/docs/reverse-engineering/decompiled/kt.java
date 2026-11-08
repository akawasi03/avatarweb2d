/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.io.SocketConnection
 */
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.microedition.io.SocketConnection;

public final class kt
implements hq {
    private static kt m = new kt();
    private DataOutputStream n;
    public DataInputStream a;
    public cm b;
    private SocketConnection o;
    public boolean c;
    public boolean d;
    private final au p = new au(this);
    private Thread q;
    public Thread e;
    public int f;
    public int g;
    boolean h;
    public byte[] i = null;
    private byte r;
    private byte s;
    long j;
    public String k = "";
    public static boolean l;

    public static kt a() {
        return m;
    }

    public final boolean b() {
        return this.c;
    }

    public final void a(cm cm2) {
        this.b = cm2;
    }

    public final void a(String string) {
        if (this.c || this.d) {
            return;
        }
        this.h = false;
        this.o = null;
        this.q = new Thread(new dy(this, string));
        this.q.start();
    }

    public final void a(jr jr2) {
        this.p.a(jr2);
    }

    private synchronized void b(jr jr2) {
        byte[] byArray = jr2.a();
        try {
            if (this.h) {
                byte by2 = this.a(jr2.a);
                this.n.writeByte(by2);
            } else {
                this.n.writeByte(jr2.a);
            }
            if (byArray != null) {
                int n2;
                int n3 = byArray.length;
                if (this.h) {
                    n2 = this.a((byte)(n3 >> 8));
                    this.n.writeByte(n2);
                    n3 = this.a((byte)n3);
                    this.n.writeByte(n3);
                } else {
                    this.n.writeShort(n3);
                }
                if (this.h) {
                    n2 = 0;
                    while (n2 < byArray.length) {
                        byArray[n2] = this.a(byArray[n2]);
                        ++n2;
                    }
                }
                ((OutputStream)this.n).write(byArray);
                this.f += 5 + byArray.length;
            } else {
                this.n.writeShort(0);
                this.f += 5;
            }
            this.n.flush();
            return;
        }
        catch (IOException iOException) {
            return;
        }
    }

    private byte a(byte by2) {
        byte by3 = this.s;
        this.s = (byte)(by3 + 1);
        by2 = (byte)(this.i[by3] & 0xFF ^ by2 & 0xFF);
        if (this.s >= this.i.length) {
            this.s = (byte)(this.s % this.i.length);
        }
        return by2;
    }

    public final void c() {
        this.d();
    }

    private void d() {
        this.i = null;
        this.r = 0;
        this.s = 0;
        try {
            this.c = false;
            this.d = false;
            if (this.o != null) {
                this.o.close();
                this.o = null;
            }
            if (this.n != null) {
                this.n.close();
                this.n = null;
            }
            if (this.a != null) {
                this.a.close();
                this.a = null;
            }
            this.e = null;
            System.gc();
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    static SocketConnection a(kt kt2) {
        return kt2.o;
    }

    static au b(kt kt2) {
        return kt2.p;
    }

    static void a(kt kt2, SocketConnection socketConnection) {
        kt2.o = socketConnection;
    }

    static void a(kt kt2, DataOutputStream dataOutputStream) {
        kt2.n = dataOutputStream;
    }

    static void a(kt kt2, jr jr2) {
        kt2.b(jr2);
    }

    static void c(kt kt2) {
        kt2.d();
    }

    static byte a(kt kt2, byte by2) {
        byte by3 = kt2.r;
        kt2.r = (byte)(by3 + 1);
        by2 = (byte)(kt2.i[by3] & 0xFF ^ by2 & 0xFF);
        if (kt2.r >= kt2.i.length) {
            kt2.r = (byte)(kt2.r % kt2.i.length);
        }
        return by2;
    }
}


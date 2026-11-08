/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.io.Connector
 *  javax.microedition.io.SocketConnection
 */
import javax.microedition.io.Connector;
import javax.microedition.io.SocketConnection;

final class dy
implements Runnable {
    private final String b;
    final kt a;

    dy(kt kt2, String string) {
        this.a = kt2;
        this.b = string;
    }

    public final void run() {
        kt.l = false;
        new Thread(new kh(this)).start();
        this.a.d = true;
        this.a.c = true;
        try {
            String string = this.b;
            dy dy2 = this;
            kt.a(dy2.a, (SocketConnection)Connector.open((String)string));
            kt.a(dy2.a, kt.a(dy2.a).openDataOutputStream());
            dy2.a.a = kt.a(dy2.a).openDataInputStream();
            new Thread(kt.b(dy2.a)).start();
            dy2.a.e = new Thread(new gv(dy2.a));
            dy2.a.e.start();
            dy2.a.j = System.currentTimeMillis();
            kt.a(dy2.a, new jr(-27));
            dy2.a.d = false;
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            try {
                Thread.sleep(500L);
            }
            catch (InterruptedException interruptedException) {}
            if (kt.l) {
                return;
            }
            if (this.a.b != null) {
                this.a.c();
                this.a.b.b();
            }
            return;
        }
    }
}


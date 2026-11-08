/*
 * Decompiled with CFR 0.152.
 */
import java.io.IOException;
import java.util.Vector;

final class au
implements Runnable {
    private final Vector a;
    private kt b;

    public au(kt kt2) {
        this.b = kt2;
        this.a = new Vector();
    }

    public final void a(jr jr2) {
        this.a.addElement(jr2);
    }

    /*
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public final void run() {
        try {
            while (true) {
                if (!this.b.c) {
                    return;
                }
                if (this.b.h) {
                    while (this.a.size() > 0) {
                        jr jr2 = (jr)this.a.elementAt(0);
                        this.a.removeElementAt(0);
                        kt.a(this.b, jr2);
                    }
                }
                try {
                    Thread.sleep(10L);
                }
                catch (InterruptedException interruptedException) {}
            }
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            return;
        }
    }

    static Vector a(au au2) {
        return au2.a;
    }
}


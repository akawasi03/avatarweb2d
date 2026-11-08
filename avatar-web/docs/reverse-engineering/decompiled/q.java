/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.media.Manager
 *  javax.microedition.media.MediaException
 *  javax.microedition.media.Player
 *  javax.microedition.media.control.VolumeControl
 */
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Vector;
import javax.microedition.media.Manager;
import javax.microedition.media.MediaException;
import javax.microedition.media.Player;
import javax.microedition.media.control.VolumeControl;
import main.a;

public final class q {
    private int c;
    private Player d;
    public static q a = new q();
    private Vector e;
    private Vector f;
    int b = -1;

    public final void a(String string, byte by2) {
        if (this.b == 0) {
            return;
        }
        bl bl2 = new bl(this, by2);
        if (this.b == 1) {
            bl2.a();
            return;
        }
        Vector<by> vector = new Vector<by>();
        if (ae.t) {
            dm.b().b(dm.b().c / 10);
            bl2.a();
            return;
        }
        vector.addElement(new by(kf.ep[1], new bj(this, bl2)));
        vector.addElement(new by(kf.ep[2], new bh(this, bl2)));
        vector.addElement(new by(kf.p, new bw(this)));
        vector.addElement(new by(kf.ep[0], new bt(this, bl2)));
        main.a.a(string, vector);
    }

    public final int a(String string) {
        if (this.f == null) {
            this.f = new Vector();
        }
        int n2 = 0;
        while (n2 < this.f.size()) {
            String string2 = (String)this.f.elementAt(n2);
            if (string2.equals(string)) {
                return n2;
            }
            ++n2;
        }
        return -1;
    }

    public final void a(byte[] object, byte by2) {
        if (this.e == null) {
            this.e = new Vector();
            this.f = new Vector();
        }
        try {
            this.f.addElement("" + by2);
            this.e.addElement(object);
            a.a((byte[])object);
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }

    public final void a() {
        if (this.d != null) {
            if (this.d.getState() == 400) {
                try {
                    this.d.stop();
                }
                catch (MediaException mediaException) {
                    MediaException mediaException2 = mediaException;
                    mediaException.printStackTrace();
                }
            }
            this.d.close();
        }
    }

    public final void a(byte[] object) {
        this.a();
        try {
            object = new ByteArrayInputStream((byte[])object);
            this.d = Manager.createPlayer((InputStream)object, (String)"audio/midi");
            this.d.setLoopCount(1);
            ((ByteArrayInputStream)object).close();
            if (this.c > 0) {
                this.d.start();
                ((VolumeControl)this.d.getControl("VolumeControl")).setLevel(this.c * 20);
                return;
            }
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
        }
    }

    public final void a(int n2) {
        if (this.d != null && this.d.getState() != 0) {
            try {
                if (n2 > 0) {
                    this.d.start();
                    ((VolumeControl)this.d.getControl("VolumeControl")).setLevel(n2 * 20);
                } else {
                    this.d.stop();
                }
            }
            catch (MediaException mediaException) {
                MediaException mediaException2 = mediaException;
                mediaException.printStackTrace();
            }
        }
        this.c = n2;
    }

    static Vector a(q q2) {
        return q2.e;
    }
}


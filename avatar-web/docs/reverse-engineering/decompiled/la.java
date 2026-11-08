/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.IOException;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class la
extends hj {
    public static la a;
    public int b = 0;
    public static Image c;
    public static boolean d;

    static {
        d = false;
    }

    public static la b() {
        if (a == null) {
            a = new la();
            return a;
        }
        return a;
    }

    public final void a() {
        main.a.C.removeAllElements();
        main.a.U = 0;
        main.a.a.b();
        jy.b = true;
        try {
            c = Image.createImage((String)(String.valueOf(kf.a()) + "/on/logo.on"));
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        super.a();
    }

    public final void k() {
        if (this.b > 21) {
            ir.B = GameMidlet.i.aw;
            ir.C = GameMidlet.i.ax;
            jy.e().a();
        } else if (this.b == 0) {
            main.a.S.f();
        }
        ++this.b;
    }

    public final void a(Graphics graphics) {
        main.a.S.b(graphics);
        if (this.b > 1) {
            graphics.drawImage(c, main.a.o, main.a.q / 2, 3);
        }
        main.a.a(graphics);
    }
}


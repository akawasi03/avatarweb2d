/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class gq
extends gs {
    public Vector a;
    private static gq h;
    public int b = 0;
    public int c;
    public int d;
    public int e;
    public int f;
    private boolean i = false;
    public String g = "";

    public static gq a() {
        if (h == null) {
            h = new gq();
        }
        return h;
    }

    public final void a(int n2) {
        switch (n2) {
            case 0: {
                main.a.h();
                h = null;
            }
        }
    }

    public gq() {
        this.ad = new by(kf.z, 0);
    }

    public final void k() {
    }

    public final void b() {
        if (this.a != null && this.a.size() > 0) {
            main.a.v = this;
        }
    }

    public final void a(Graphics graphics) {
        main.a.S.a(graphics, this.d, this.b, this.e, this.c, 0);
        int n2 = this.b + je.o;
        n2 += 5 + gy.Z - gy.ah / 2;
        int n3 = 0;
        while (n3 < this.a.size()) {
            String string = (String)this.a.elementAt(n3);
            if (string.substring(0, 1).equals("0")) {
                main.a.Q.a(graphics, string.substring(1), this.d + this.e / 2, n2 + 3 + gy.ah / 2 - gy.ai / 2, 2);
            } else {
                main.a.K.a(graphics, string, this.d + 15, n2 + 3, 0);
            }
            n2 += gy.ah;
            ++n3;
        }
        super.a(graphics);
    }
}


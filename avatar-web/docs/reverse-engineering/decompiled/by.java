/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public class by {
    public String a;
    public ii b;
    public byte c;
    public gy d;
    public short e = (short)-1;

    public by(String string, ii ii2) {
        this.a = string;
        this.b = ii2;
    }

    public by(String string, int n2) {
        this.a = string;
        this.c = (byte)n2;
    }

    public by(String string, int n2, gy gy2) {
        this.a = string;
        this.c = (byte)n2;
        this.d = gy2;
    }

    public by(String string, int n2, int n3) {
        this.a = string;
        this.c = (byte)n2;
        this.e = (byte)n3;
    }

    public final void b() {
        if (this.b != null) {
            this.b.a();
            return;
        }
        if (this.d != null) {
            this.d.a(this.c);
            return;
        }
        if (im.c) {
            im.d().a((int)this.c, this.e);
            return;
        }
        main.a.r.a((int)this.c, this.e);
    }

    public void a() {
    }

    public void a(Graphics graphics, int n2, int n3) {
        main.a.L.a(graphics, this.a, n2, n3, 2);
    }
}


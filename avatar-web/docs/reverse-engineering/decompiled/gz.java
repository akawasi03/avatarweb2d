/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public abstract class gz {
    public boolean b = false;
    public short c = (short)-1;

    public abstract void b();

    public abstract void a(Graphics var1);

    public final void c() {
        a.B.addElement(this);
    }

    public void a() {
        a.B.removeElement(this);
    }
}


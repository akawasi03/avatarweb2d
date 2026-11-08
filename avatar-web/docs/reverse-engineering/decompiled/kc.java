/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class kc
extends cc {
    public short a;
    public short b;
    public short c;
    public short d;
    public int e;
    private int k = 0;
    private int l = 0;
    public long h;
    public byte[] i;
    public byte[] j;

    public final void b() {
        if (System.currentTimeMillis() - this.h >= 1000L) {
            Object object;
            if (this.e > 0) {
                --this.e;
                if (this.e == 0) {
                    object = it.a();
                    ((kj)object).e((byte)83);
                    ((kj)object).k();
                }
            }
            this.h = System.currentTimeMillis();
            object = gb.a(this.b);
            if (((f)object).b > 0 && this.k == 0) {
                this.k = ((f)object).b / 3 << 1;
                this.l = ((f)object).c / 2;
                object = this;
                if (((kc)object).d > 0) {
                    int n2 = aw.e(3) + 3;
                    ((kc)object).i = new byte[n2];
                    ((kc)object).j = new byte[n2];
                    int n3 = 0;
                    while (n3 < n2) {
                        ((kc)object).i[n3] = (byte)(aw.e(((kc)object).k - 10) - (((kc)object).k - 10) / 2);
                        ((kc)object).j[n3] = (byte)(aw.e(((kc)object).l - 10) - (((kc)object).l - 10) / 2);
                        ++n3;
                    }
                }
            }
        }
    }

    public final void a(Graphics graphics) {
        int n2;
        if (this.f < 0 && (this.aw * js.ay + this.k / 2 < do.a().a || this.aw * js.ay - this.k / 2 > do.a().a + main.a.m)) {
            return;
        }
        gb.a(graphics, this.b, this.aw * js.ay, this.ax * js.ay, 33);
        if (this.d > 0 && this.i != null) {
            n2 = 0;
            while (n2 < this.i.length) {
                gb.a(graphics, this.c, this.aw * js.ay + this.i[n2], this.ax * js.ay - (gb.a((short)this.b).c / 2 + 5) + this.j[n2], 3);
                ++n2;
            }
        }
        n2 = gb.a((short)this.b).c + gy.ag;
        if (this.e > 0) {
            n2 += gy.ai;
        }
        gb.a(graphics, this.c, (this.aw - 8) * js.ay, this.ax * js.ay - n2, 3);
        main.a.L.a(graphics, "Lv" + this.a, this.aw * js.ay, this.ax * js.ay - n2 - gy.ag / 2, 0);
        if (this.e > 0) {
            int n3 = this.e / 3600;
            int n4 = (this.e - n3 * 3600) / 60;
            int n5 = this.e - n3 * 3600 - n4 * 60;
            main.a.Q.a(graphics, String.valueOf(n3) + ":" + n4 + ":" + n5, (this.aw + 3) * js.ay, this.ax * js.ay - n2 + main.a.L.a() / 2 + 2 * js.ay, 2);
        }
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class cf
extends cc {
    public int a;
    public int b;
    public int c;
    public short d;
    public short e = (short)-1;
    public long h;
    public boolean i;
    public boolean j;
    public boolean k;
    public boolean l = false;
    public byte m;
    public byte n;
    public byte o;
    public byte p;
    public int q;

    public final void a(Graphics graphics) {
        if (this.aw * js.ay < do.a().a - 10 || this.a * js.ay > do.a().a + main.a.m + 10) {
            return;
        }
        if (this.l) {
            graphics.drawImage(go.o, (this.aw - 13) * js.ay, (this.ax - 18) * js.ay, 0);
        }
        int n2 = go.A.a;
        int n3 = go.A.b;
        if (this.a == n2 && this.b == n3) {
            main.a.Q.a(graphics, "lv" + this.p, this.aw * js.ay, (this.ax - 44) * js.ay, 2);
        }
        if (this.c == -1) {
            return;
        }
        cb cb2 = gb.b(this.c);
        cb2.a(graphics, this.q, this.aw * js.ay, this.ax * js.ay, 33);
        int n4 = cb2.e * 60 + cb2.f * 60;
        if (this.d > n4 && cb2.f != -1 || this.m == 100 || this.d < 0) {
            return;
        }
        if (this.k) {
            graphics.drawImage(go.k[1], (this.aw + 5) * js.ay, (this.ax - 12) * js.ay, 3);
        }
        if (this.j) {
            graphics.drawImage(go.k[0], (this.aw - 7) * js.ay, this.ax * js.ay, 3);
        }
        if (this.a == n2 && this.b == n3 || this.e != -1 && this.e == go.H) {
            n2 = n2 * 24 * js.ay;
            n3 = n3 * 24 * js.ay;
            if (this.e != -1 && this.e == go.H) {
                n2 = this.a * 24 * js.ay;
                n3 = this.b * 24 * js.ay;
            }
            cb2.a(graphics, 7, n2 - 3, n3 - 40 * js.ay, 33);
            graphics.setColor(1);
            graphics.fillRect(n2 - 4 * js.ay, n3 - 38 * js.ay, 31 * js.ay, 5 * js.ay);
            graphics.setColor(65280);
            graphics.fillRect(n2 - 3 * js.ay, n3 - 37 * js.ay, this.n * 30 / 100 * js.ay, 3 * js.ay);
            graphics.setColor(2512938);
            graphics.drawRect(n2 - 4 * js.ay, n3 - 38 * js.ay, 31 * js.ay, 4 * js.ay);
            long l2 = (long)(cb2.e * 60 * 60) - this.h;
            long l3 = cb2.e * 60 - this.d;
            String string = "";
            if (l2 < 0L) {
                l2 = 0L;
            }
            long l4 = l2 / 60L / 60L;
            long l5 = l2 / 60L % 60L;
            long l6 = l2 % 60L;
            string = String.valueOf(string) + l4 + ":" + l5 + ":" + l6;
            if (l3 <= 0L || l2 <= 0L) {
                string = kf.cn;
            }
            main.a.Q.a(graphics, string, n2 + 5 * js.ay, n3 - 49 * js.ay, 0);
            int n5 = this.d * 100 / (cb2.e * 60);
            n5 = n5 * 30 / 100;
            if (n5 == 0) {
                n5 = 1;
            }
            if (n5 >= 30) {
                n5 = 29;
            }
            if (cb2.e * 60 - this.d < 0) {
                n5 = 30;
            }
            graphics.setColor(1);
            graphics.fillRect(n2 - 4 * js.ay, n3 - 32 * js.ay, 31 * js.ay, 5 * js.ay);
            graphics.setColor(255, 255, 0);
            graphics.fillRect(n2 - 3 * js.ay, n3 - 31 * js.ay, n5 * js.ay, 3 * js.ay);
            graphics.setColor(2512938);
            graphics.drawRect(n2 - 4 * js.ay, n3 - 32 * js.ay, 31 * js.ay, 4 * js.ay);
            int n6 = 0;
            if (this.k) {
                n6 = 1;
                go.q.a(1, n2 + (5 + (this.j ? 6 : 0)) * js.ay, n3 - 22 * js.ay, 0, graphics);
            }
            if (this.j) {
                go.q.a(0, n2 + (4 - n6 * 6) * js.ay, n3 - 22 * js.ay, 0, graphics);
            }
        }
    }
}


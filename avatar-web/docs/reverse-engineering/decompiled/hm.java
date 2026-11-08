/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;

public final class hm
extends gx {
    public short a;
    private short f;
    public int b;
    public int c;
    public int d;
    private byte g;
    private byte h;
    private byte i;
    private byte j = 1;
    public byte e;
    private byte k;

    public hm() {
        this.az = (byte)5;
    }

    public hm(byte by2, short s2, int n2) {
        this.d = n2;
        this.az = (byte)5;
        this.e = by2;
        this.a = s2;
        this.h = 0;
        ld ld2 = fx.a(this.a);
        if (ld2.h < fx.a.length) {
            this.aA = fx.a[ld2.h].f;
        }
        this.i = (byte)aw.e(10);
    }

    public final void b() {
        switch (this.k) {
            case 0: 
            case 1: {
                this.aw += (short)(this.b - this.aw >> 2);
                this.ax += (short)(this.c - this.ax >> 2);
                if (this.g >= -6) {
                    this.f = (short)(this.f + this.g);
                    this.g = (byte)(this.g - 1);
                }
                if (aw.f(this.aw - this.b) >= 4 && aw.f(this.ax - this.c) >= 4 || this.f > 1) break;
                this.aw = this.b;
                this.ax = this.c;
                this.f = 0;
                this.g = 0;
                if (this.k == 1) {
                    ir.a(this);
                }
                this.k = (byte)2;
                return;
            }
            case 3: {
                this.f = (short)(this.f + 3);
                if (this.f <= 50) break;
                ir.a(this);
                return;
            }
            case 4: {
                if (this.f > 0) {
                    this.f = (short)(this.f - this.g);
                    this.g = (byte)(this.g + 1);
                    return;
                }
                this.f = 0;
                this.k = (byte)2;
            }
        }
    }

    public final void a(Graphics graphics) {
        graphics.drawImage(ir.r, this.aw, this.ax + 1, 33);
        if (this.e == 0) {
            ld ld2 = fx.a(this.a);
            ld2.b(graphics, this.aw, this.ax + this.i / 10 - this.f, 0, 33);
        } else {
            this.aA = (short)(fx.c((short)this.a).c + 10);
            fx.a(graphics, this.a, this.aw, this.ax + this.i / 10 - this.f, 33);
        }
        this.i = (byte)(this.i + this.j);
        if (aw.f(this.i) >= 10) {
            this.h = -this.h;
        }
    }

    public final void a(int n2) {
        hn hn2 = ir.g(n2);
        if (hn2 != null) {
            this.b = hn2.aw;
            this.c = hn2.ax;
            this.k = 1;
            this.f = 0;
        } else {
            this.f = 0;
            this.k = (byte)3;
        }
        this.g = (byte)6;
    }

    public final void a(int n2, short s2, short s3) {
        if (n2 == -2) {
            this.aw = s2;
            this.ax = s3;
            this.k = (byte)2;
        } else {
            hn hn2 = ir.g(n2);
            if (hn2 != null) {
                this.aw = hn2.aw;
                this.ax = hn2.ax;
                this.k = 0;
                this.g = (byte)6;
                this.f = 0;
            } else {
                this.k = (byte)4;
                this.aw = s2;
                this.ax = s3;
                this.f = (short)100;
                this.g = 0;
            }
        }
        this.b = s2;
        this.c = s3;
    }
}


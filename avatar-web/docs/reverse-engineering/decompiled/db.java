/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.GameMidlet;
import main.a;

public final class db {
    private static int m = 10;
    private int n = 1;
    public byte a = (byte)9;
    public hn b;
    dr[] c;
    dr[] d;
    private dr[] o;
    private int p = 0;
    int e = m;
    private int q = -8;
    int f = 0;
    int g = -1;
    private int r = 25;
    int h = -1;
    private int s;
    boolean i = false;
    boolean j = false;
    boolean k = false;
    private boolean t = false;
    private dr[] u;
    private dr v;
    private dr w;
    private dr x;
    public static int[] l = new int[]{12577266, 10341591};
    private int y = 0;
    private int z = 0;
    private int A = 0;

    public db() {
        this.a = (byte)(7 + aw.e(4));
        this.u = new dr[2];
        int n2 = 0;
        while (n2 < 2) {
            this.u[n2] = new dr(-10, 0, n2 * 15);
            ++n2;
        }
        this.o = new dr[2];
        this.o[0] = new dr();
        this.o[1] = new dr();
        this.c = new dr[this.a];
        this.d = new dr[this.a];
        n2 = 0;
        while (n2 < this.a) {
            this.c[n2] = new dr();
            this.d[n2] = new dr();
            ++n2;
        }
        this.v = new dr(0, 0, -1);
        this.w = new dr(0, 0, -1);
        this.x = new dr();
    }

    public final void a() {
        this.p = 0;
        this.f = 0;
        this.q = -(10 + aw.e(4));
        this.g = -1;
        this.i = false;
        this.j = false;
        this.t = false;
    }

    public final void a(hn hn2) {
        this.b = hn2;
        this.n = hn2.K == 0 ? 1 : -1;
        this.a();
        hn hn3 = hn2;
        db db2 = this;
        this.g = 0;
        db2.h = 0;
        ld ld2 = fx.a(hn3.e, 70);
        if (ld2.f >= 0) {
            ld2 = fx.a(ld2.f);
        }
        ke ke2 = fx.a[ld2.c[3]];
        ke ke3 = fx.a[ld2.c[14]];
        int n2 = hn3.aw;
        int n3 = hn3.ax + hn3.h;
        db2.o[0].a = n2 + ld2.d[3] * gy.Y + ke2.e * gy.Y;
        db2.o[0].b = n3 + ld2.e[3] * gy.Y - 5 * (gy.Y - 1);
        db2.o[1].a = n2 + ld2.d[14] * gy.Y + ke3.e * gy.Y;
        db2.o[1].b = n3 + ld2.e[14] * gy.Y - 5 * (gy.Y - 1);
        db2.v.c = -1;
        if (hn2.w == GameMidlet.i.w) {
            ae.b();
            ae.a((byte)13);
        }
    }

    public final void b() {
        ++this.p;
        this.e = m;
        int n2 = 0;
        while (n2 < this.a) {
            this.c[n2].a = this.o[1].a;
            this.c[n2].b = this.o[1].b;
            ++n2;
        }
    }

    public final void a(int n2) {
        this.c[0].a = this.o[n2].a;
        this.c[0].b = this.o[n2].b;
        if (n2 == 1) {
            this.b.H = (byte)13;
            return;
        }
        this.b.H = (byte)2;
    }

    public final void c() {
        int n2;
        int n3;
        int n4;
        int n5;
        db db2;
        block50: {
            int n6;
            int n7;
            block51: {
                block54: {
                    block52: {
                        db db3;
                        block55: {
                            block53: {
                                if (this.b == null) {
                                    return;
                                }
                                ++this.A;
                                if (this.A >= 6) {
                                    this.A = 0;
                                }
                                db2 = this;
                                if (db2.p == 0) break block50;
                                if (db2.f != 1) break block51;
                                int n8 = 1;
                                while (n8 < db2.a - 2) {
                                    db2.c[n8].b += 6;
                                    ++n8;
                                }
                                db3 = db2;
                                if (!db3.t || db3.h <= 0) break block52;
                                ++db3.y;
                                if (db3.y >= 2) break block53;
                                n5 = 1;
                                while (n5 < db3.a) {
                                    db3.c[n5].a -= 6;
                                    ++n5;
                                }
                                break block54;
                            }
                            if (db3.y <= 4 || db3.y >= 8) break block55;
                            n5 = 1;
                            while (n5 < db3.a) {
                                db3.c[n5].a += 6;
                                ++n5;
                            }
                            break block54;
                        }
                        if (db3.y <= 14) break block54;
                        --db3.z;
                        if (db3.z >= 0) break block54;
                        db3.y = 0;
                    }
                    db3.z = aw.e(20);
                }
                if (db2.e == m) {
                    db2.e = 7;
                }
            }
            n4 = 0;
            n5 = db2.a - 1;
            int n9 = 1;
            if (db2.j) {
                n9 = 0;
            }
            n3 = 1;
            while (n3 < db2.a - db2.f * n9) {
                n2 = aw.a(db2.c[n3].a, db2.c[n3].b, db2.c[n3 - 1].a, db2.c[n3 - 1].b);
                if (n2 > db2.e + 1) {
                    n4 = 1;
                    n7 = n2 - db2.e;
                    n2 = aw.a(db2.c[n3 - 1].a - db2.c[n3].a, -(db2.c[n3 - 1].b - db2.c[n3].b));
                    n6 = n7 * aw.b(aw.c(n2)) >> 10;
                    n2 = -(n7 * aw.a(aw.c(n2))) >> 10;
                    db2.c[n3].a += n6;
                    db2.c[n3].b += n2;
                }
                ++n3;
            }
            if (db2.c[n5].b < db2.b.ax + db2.b.h + 5) {
                db2.c[n5].a += 10;
                db2.c[n5].b += db2.q;
                ++db2.q;
            }
            if (!db2.j) {
                n3 = n5 - 1;
                while (n3 > 0) {
                    n2 = aw.a(db2.c[n3].a, db2.c[n3].b, db2.c[n3 + 1].a, db2.c[n3 + 1].b);
                    if (n2 > db2.e + 1) {
                        n4 = 1;
                        n7 = aw.a(db2.c[n3 + 1].a - db2.c[n3].a, -(db2.c[n3 + 1].b - db2.c[n3].b));
                        n6 = (n2 -= db2.e) * aw.b(aw.c(n7)) >> 10;
                        n2 = -(n2 * aw.a(aw.c(n7))) >> 10;
                        db2.c[n3].a += n6;
                        db2.c[n3].b += n2;
                    }
                    --n3;
                }
            }
            if (n4 == 0) {
                db2.f = 1;
            }
        }
        db2 = this;
        if (db2.g != -1) {
            ++db2.g;
            if (main.a.l % 4 == 2) {
                if (db2.b.H == 2) {
                    db2.b.H = (byte)13;
                    if (db2.g > 16) {
                        db2.b();
                        db2.g = -1;
                    }
                } else {
                    db2.b.H = (byte)2;
                }
            }
        }
        db2 = this;
        if (db2.i) {
            if (db2.e > 4 && main.a.l % 6 == 3) {
                --db2.e;
            }
            if (!db2.j && main.a.l % 6 == 3 && db2.b != GameMidlet.i) {
                if (db2.b.H == 2) {
                    db2.a(1);
                } else {
                    db2.a(0);
                }
            }
            if (db2.j && db2.e <= 4) {
                db2.e = 2;
                n4 = 0;
                if (!db2.t) {
                    n5 = 0;
                    while (n5 < db2.a - 1) {
                        n2 = 1;
                        n3 = db2.c[n5 + 1].a;
                        dr dr2 = db2.c[n5];
                        if (!(aw.f(n3 - dr2.a) <= 1)) {
                            ++n4;
                        }
                        ++n5;
                    }
                }
                if (n4 == 0 && !db2.t) {
                    db2.v.c = -2;
                    db2.t = true;
                }
            }
        }
        if (this.k) {
            db db4 = db2 = this;
            if (db2.b.H == 2 || db4.b.H == 13) {
                db2.a(db2.b);
                db2.k = false;
            }
        }
        if (this.f != 0) {
            db2 = this;
            int n10 = 0;
            while (n10 < 2) {
                if (db2.u[n10].c == 0 || db2.u[n10].a == -10) {
                    db2.u[n10].a = db2.d[db2.a - 2].a;
                    db2.u[n10].b = db2.d[db2.a - 2].b;
                }
                if (db2.i) {
                    db2.u[n10].c += 2;
                }
                if (++db2.u[n10].c > db2.r + (db2.i ? 10 : 0)) {
                    db2.u[n10].c = 0;
                }
                ++n10;
            }
        }
        if (!this.j) {
            db2 = this;
            if (db2.f == 1) {
                if (db2.v.c == -1) {
                    db2.w.a = db2.x.a = db2.c[db2.a - 1].a;
                    db2.v.a = db2.x.a;
                    db2.w.b = db2.x.b = db2.c[db2.a - 1].b;
                    db2.v.b = db2.x.b;
                    db2.v.c = 0;
                    db2.s = -1;
                }
                int n11 = db2.x.a - db2.w.a;
                n5 = db2.x.b - db2.w.b;
                if (db2.s > 0) {
                    --db2.s;
                }
                if ((db2.s <= 0 || db2.i) && main.a.l % 2 == 1) {
                    if (aw.f(n11) > 0) {
                        db2.x.a = n11 > 0 ? --db2.x.a : ++db2.x.a;
                        db2.c[db2.a - 1].a = db2.x.a;
                    }
                    if (aw.f(n5) > 0) {
                        db2.x.b = n5 > 0 ? --db2.x.b : ++db2.x.b;
                        db2.c[db2.a - 1].b = db2.x.b;
                    }
                }
                if (aw.f(n11) <= 0 && aw.f(n5) <= 0) {
                    db2.s = 50 + aw.e(100);
                    db2.w.a = db2.v.a + 10 - aw.e(20);
                    db2.w.b = db2.v.b + aw.e(6);
                }
            }
        }
        this.n = this.b.K == 0 ? 1 : -1;
        int n12 = 0;
        while (n12 < this.a) {
            int n13 = this.c[n12].a - this.b.aw;
            if (n12 != this.a - 2 || aw.f(this.d[n12].a - (this.b.aw + this.n * n13)) > 1) {
                this.d[n12].a = this.b.aw * gy.Y + this.n * n13;
            }
            this.d[n12].b = this.c[n12].b;
            ++n12;
        }
    }

    public final void a(Graphics graphics) {
        int n2;
        if (this.k || this.g != -1) {
            return;
        }
        if (gy.Y > 1) {
            graphics.translate(0, this.b.ax);
        }
        if (this.f != 0 && !this.j && this.u[0].a > 0 && this.u[0].a > do.a().a && this.u[0].a < do.a().a + main.a.m) {
            graphics.setColor(l[ir.j]);
            n2 = 0;
            while (n2 < 2) {
                graphics.drawRoundRect(this.u[n2].a - this.u[n2].c / 2, this.u[n2].b - this.u[n2].c / 4, this.u[n2].c, this.u[n2].c / 2, this.u[n2].c, this.u[n2].c);
                ++n2;
            }
        }
        graphics.setColor(0x848788);
        if (this.d[0].a > do.a().a && this.d[0].a < do.a().a + main.a.m || this.d[this.a - 1].a > do.a().a && this.d[this.a - 1].a < do.a().a + main.a.m) {
            n2 = 0;
            while (n2 < this.a - 1 - this.f) {
                if (this.d[n2 + 1].b < this.b.ax + this.b.h + 20) {
                    graphics.drawLine(this.d[n2].a, this.d[n2].b, this.d[n2 + 1].a, this.d[n2 + 1].b);
                }
                ++n2;
            }
            if (this.f == 0 && this.d[this.a - 1].b < this.b.ax + this.b.h + 10) {
                je.a(this.d[this.a - 1].a, this.d[this.a - 1].b, 2, 2, 0, graphics);
            }
            graphics.drawImage(kv.b().a, this.d[this.a - 2].a, this.d[this.a - 2].b, 3);
            if (this.j && this.h > 0) {
                iw iw2;
                kv.b().b.a(0 + this.A / 3, this.d[this.a - 2].a + 2, this.d[this.a - 2].b + 4, 0, 24, graphics);
                if (main.a.l % 10 > 5 && (iw2 = (iw)fx.a((short)this.h)) != null) {
                    iw2.a(graphics, this.b.aw * gy.Y, this.b.ax - 55 * gy.Y, 3);
                }
            }
        }
        if (gy.Y > 1) {
            graphics.translate(0, -this.b.ax);
        }
    }
}


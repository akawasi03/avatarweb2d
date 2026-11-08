/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class ba
extends gz {
    private static ht d;
    private static ht e;
    private byte f = 0;
    private int g = 0;
    public int a;
    private int h;
    private static int i;
    private static int j;
    private static int k;
    private Vector l = new Vector();

    static {
        i = 5;
        k = aw.b(1, -1);
    }

    public final void a() {
        super.a();
    }

    public ba(int n2, int n3) {
        dn dn2;
        this.f = (byte)n2;
        this.g = n3 * 10;
        if (gy.Y == 1) {
            this.g = n3 * 5;
        }
        this.h = (int)(System.currentTimeMillis() / 1000L);
        switch (n2) {
            case 0: {
                this.g = main.a.m * main.a.n / 1000 + 50;
                break;
            }
            case 1: {
                this.g = 30;
                if (d != null) break;
                c.b(kf.av);
                d = ht.a("cobay", 16 * gy.Y, 10 * gy.Y);
                c.a();
                break;
            }
            case 3: {
                this.g = main.a.m * main.a.n / 1000;
                c.b(kf.av);
                ht.a("tuyet", 5 * gy.Y, 5 * gy.Y);
                c.a();
                e = d;
            }
        }
        n3 = 0;
        while (n3 < this.g) {
            dn2 = new dn(0, (do.a().b - (main.a.n << 1) + aw.e(main.a.n << 1)) * 10);
            new dn(0, (do.a().b - (main.a.n << 1) + aw.e(main.a.n << 1)) * 10).aw = (-main.a.m / 2 + aw.e(ir.e * ir.i + main.a.m)) * 10;
            dn2.e = n2 == 3 || this.f == 2 ? aw.e(3) : aw.e(4);
            dn2.g = 16 + (aw.e(3) << 2);
            dn2.c = aw.b(-1, 1);
            dn2.f = aw.e(dn2.g);
            dn2.i = (byte)aw.e(20);
            this.l.addElement(dn2);
            ++n3;
        }
        if (n2 == 2) {
            n3 = 0;
            while (n3 < this.l.size() - 1) {
                dn2 = (dn)this.l.elementAt(n3);
                n2 = n3 + 1;
                while (n2 < this.l.size()) {
                    dn dn3 = (dn)this.l.elementAt(n2);
                    if (dn2.e > dn3.e) {
                        this.l.setElementAt(dn2, n2);
                        this.l.setElementAt(dn3, n3);
                        dn2 = dn3;
                    }
                    ++n2;
                }
                ++n3;
            }
        }
    }

    public final void a(Graphics object) {
        main.a.c(object);
        object.translate(-do.a().a, -do.a().b);
        switch (this.f) {
            case 0: {
                Graphics graphics = object;
                object = this;
                graphics.setColor(0xDDDDDD);
                int n2 = 0;
                while (n2 < object.g) {
                    dn dn2 = (dn)object.l.elementAt(n2);
                    int n3 = do.a().a * ((2 - dn2.e) * 20) / 120;
                    graphics.fillRect(n3 + dn2.aw / 10, dn2.ax / 10, 1, dn2.e + 1);
                    ++n2;
                }
                return;
            }
            case 1: {
                Graphics graphics = object;
                object = this;
                int n4 = 0;
                while (n4 < object.g) {
                    dn dn3 = (dn)object.l.elementAt(n4);
                    if (dn3.aw * gy.Y / 10 > do.a().a && dn3.aw * gy.Y / 10 < do.a().a + main.a.m && dn3.ax * gy.Y / 10 > do.a().b) {
                        d.a(dn3.f / (dn3.g / 4), dn3.aw * gy.Y / 10, dn3.ax * gy.Y / 10, 0, 3, graphics);
                    }
                    ++n4;
                }
                return;
            }
            case 2: {
                if (this.c == -1) {
                    return;
                }
                al al2 = fx.d(this.c);
                int n5 = 0;
                while (n5 < this.g) {
                    dn dn4 = (dn)this.l.elementAt(n5);
                    ++dn4.h;
                    if (dn4.aw * gy.Y / 10 > do.a().a && dn4.aw * gy.Y / 10 < do.a().a + main.a.m && dn4.ax * gy.Y / 10 > do.a().b && dn4.ax * gy.Y / 10 < do.a().b + main.a.q) {
                        if (al2 != null) {
                            if (dn4.h >= al2.a.length) {
                                dn4.h = 0;
                            }
                            al2.a((Graphics)object, dn4.aw / 10, dn4.ax / 10, dn4.h);
                        }
                        dn4.i = (byte)(dn4.i + 1);
                        if (dn4.i >= 20) {
                            dn4.i = 0;
                        }
                    }
                    ++n5;
                }
                return;
            }
            case 3: {
                int n6 = 0;
                while (n6 < this.g) {
                    dn dn5 = (dn)this.l.elementAt(n6);
                    if (dn5.aw * gy.Y / 10 > do.a().a && dn5.aw * gy.Y / 10 < do.a().a + main.a.m && dn5.ax * gy.Y / 10 > do.a().b) {
                        e.a(2 - dn5.e, dn5.aw * gy.Y / 10, dn5.ax * gy.Y / 10, 0, (Graphics)object);
                    }
                    ++n6;
                }
                break;
            }
        }
    }

    public final void b() {
        int n2 = 1;
        if (main.a.l % 6 == 3) {
            n2 = aw.e(15);
        }
        if (n2 == 0 && i == 5) {
            i = 5 + aw.e(20);
            j = 50 + aw.e(100);
        }
        if (j > 0) {
            --j;
        }
        if (j == 0 && i > 5 && main.a.l % 4 == 2) {
            --i;
        }
        block0 : switch (this.f) {
            case 0: {
                ba ba2 = this;
                int n3 = 0;
                while (n3 < ba2.g) {
                    int n4;
                    dn dn2 = (dn)ba2.l.elementAt(n3);
                    dn2.ax += (dn2.e + 1) * 15 + (3 - dn2.e) * 3;
                    ++dn2.b;
                    dn2.aw += dn2.e + 1 << 2;
                    if (dn2.ax / 10 > do.a().b + main.a.n - (4 - dn2.e) * 50) {
                        ba2.a(dn2);
                    }
                    if (dn2.aw / 10 + (n4 = do.a().a * ((2 - dn2.e) * 20) / 120) < do.a().a - 10) {
                        dn2.aw += (main.a.m + 20) * 10;
                    }
                    if (dn2.aw / 10 + n4 > do.a().a + main.a.m + 10) {
                        dn2.aw -= (main.a.m + 20) * 10;
                    }
                    ++n3;
                }
                return;
            }
            case 1: {
                ba ba3 = this;
                int n5 = 0;
                while (n5 < ba3.g) {
                    dn dn3 = (dn)ba3.l.elementAt(n5);
                    dn3.ax += 10;
                    dn3.aw += dn3.c * 10 + i * k;
                    ++dn3.f;
                    if (dn3.f >= dn3.g) {
                        dn3.f = 0;
                    }
                    if (dn3.ax / 10 > ir.f * ir.i - (4 - dn3.e) * 20) {
                        ba3.a(dn3);
                    }
                    ++n5;
                }
                return;
            }
            case 2: {
                int n6;
                ba ba4 = this;
                if (System.currentTimeMillis() / 1000L - (long)ba4.h > (long)ba4.a) {
                    ++ba4.a;
                    n6 = 0;
                    while (n6 < 5) {
                        ba4.l.removeElementAt(0);
                        ba4.g = ba4.l.size();
                        if (ba4.g == 0) {
                            super.a();
                            break block0;
                        }
                        ++n6;
                    }
                }
                n6 = 0;
                while (n6 < ba4.g) {
                    dn dn4 = (dn)ba4.l.elementAt(n6);
                    dn4.ax += (dn4.e + 2) * 5;
                    dn4.aw += (dn4.e + 1 << 1) + i * k;
                    if (dn4.ax / 10 > ir.f * ir.i - (4 - dn4.e) * 20) {
                        ba4.a(dn4);
                    }
                    ++n6;
                }
                return;
            }
            case 3: {
                ba ba5 = this;
                int n7 = 0;
                while (n7 < ba5.g) {
                    dn dn5 = (dn)ba5.l.elementAt(n7);
                    dn5.ax += (dn5.e + 4) * 3;
                    dn5.aw += (dn5.e + 1 << 1) + i * k;
                    if (dn5.ax / 10 > ir.f * ir.i - (4 - dn5.e) * 20) {
                        ba5.a(dn5);
                    }
                    ++n7;
                }
                break;
            }
        }
    }

    private void a(dn object) {
        if (this.b) {
            this.l.removeElement(object);
            this.g = this.l.size();
            if (this.l.size() == 0) {
                object = this;
                super.a();
                return;
            }
        } else {
            ((js)object).ax = (do.a().b - main.a.p + aw.e(main.a.n << 1)) * 10;
            ((js)object).aw = (-main.a.m / 2 + aw.e(ir.e * ir.i + main.a.m)) * 10;
        }
    }
}


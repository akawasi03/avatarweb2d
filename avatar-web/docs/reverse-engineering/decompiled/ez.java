/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class ez
extends hj {
    public static ez a;
    public int b;
    private Image c;
    private boolean d = false;
    private static int e;
    private static int f;
    private static int g;
    private static int h;
    private static int i;
    private static int j;
    private static int k;
    private static int l;
    private int m = 0;
    private long n;
    private int o;
    private boolean p;
    private int q;
    private long r;
    private long s;
    private int t;

    public static ez b() {
        if (a == null) {
            a = new ez();
            return a;
        }
        return a;
    }

    public final void a() {
        super.a();
        this.e();
        this.m = 0;
        if (this.ad == null) {
            this.c();
        }
        this.g();
    }

    public ez() {
        c.b(kf.av);
        this.c = c.a("tp");
        c.a();
        this.c();
        aw.b();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                if (this.d && this.ar > 0) {
                    main.a.d(kf.N);
                    es.b().r = System.currentTimeMillis();
                    es.b().i();
                    return;
                }
                if (!this.d) {
                    this.d = true;
                    this.e();
                    this.ar = 1 + aw.e(GameMidlet.a[dm.b().b[4]][this.b].length - 1);
                    this.g();
                    return;
                }
                this.d = false;
                return;
            }
            case 1: {
                this.f();
                return;
            }
            case 2: {
                this.d = false;
                this.b = 0;
                this.ar = 0;
                es.b().a();
            }
        }
    }

    public final void c() {
        if (kf.O == null) {
            return;
        }
        if (main.a.Z == 0) {
            this.ad = new by(kf.O, 0);
        }
        if (GameMidlet.f == 0) {
            this.ac = new by(kf.f, 1);
        }
        this.ae = new by(kf.dw, 2);
    }

    private void f() {
        String[] stringArray;
        while (true) {
            main.a.d(kf.b);
            if (this.m >= GameMidlet.d[dm.b().b[4]].length) {
                main.a.b(kf.ds);
                this.m = 0;
                return;
            }
            stringArray = GameMidlet.a(GameMidlet.d[dm.b().b[4]][this.m]);
            if (stringArray != null) break;
            ++this.m;
        }
        stringArray = main.a.K.a((String)stringArray, "*");
        GameMidlet.c[dm.b().b[4]] = new int[stringArray.length - 1][];
        GameMidlet.b[dm.b().b[4]] = new String[stringArray.length - 1][];
        GameMidlet.a[dm.b().b[4]] = new String[stringArray.length - 1][];
        int n2 = 1;
        while (n2 < stringArray.length) {
            String[] stringArray2 = main.a.K.a(stringArray[n2], "\n");
            GameMidlet.a[dm.b().b[4]][n2 - 1] = new String[stringArray2.length - 1];
            GameMidlet.b[dm.b().b[4]][n2 - 1] = new String[stringArray2.length - 2];
            GameMidlet.c[dm.b().b[4]][n2 - 1] = new int[stringArray2.length - 2];
            GameMidlet.a[dm.b().b[4]][n2 - 1][0] = stringArray2[0];
            int n3 = 1;
            while (n3 < stringArray2.length - 1) {
                String[] stringArray3 = main.a.K.a(stringArray2[n3], ":");
                GameMidlet.a[dm.b().b[4]][n2 - 1][n3] = stringArray3[0];
                GameMidlet.b[dm.b().b[4]][n2 - 1][n3 - 1] = stringArray3[1];
                stringArray3[2] = stringArray3[2].substring(0, stringArray3[2].length() - 1);
                GameMidlet.c[dm.b().b[4]][n2 - 1][n3 - 1] = Integer.parseInt(stringArray3[2]);
                ++n3;
            }
            ++n2;
        }
        fx.e();
        main.a.h();
        this.e();
    }

    public final void e() {
        if (main.a.Z > 0) {
            this.aj = true;
        }
        int n2 = 176;
        if (176 > main.a.m) {
            n2 = main.a.m;
        }
        je.a().a(kf.bP, n2 * gy.Y, hj.av * 6, 1);
        k = je.a().g + 4;
        l = je.a().h + je.o + gy.Z;
        j = je.a().e - (je.o + (gy.Z << 1));
        i = GameMidlet.a[dm.b().b[4]].length * hj.av + (this.d ? GameMidlet.a[dm.b().b[4]][this.b].length * hj.av : 0) - j;
        e = 0;
        f = 0;
        if (i < 0) {
            i = 0;
        }
    }

    public final void k() {
        if (this.o != 0) {
            if (f < 0 || f > i) {
                this.o -= this.o / 4;
                f += this.o / 20;
                if (this.o / 10 <= 1) {
                    this.o = 0;
                }
            }
            if (f < 0) {
                if (f < -j / 2) {
                    f = -j / 2;
                    e = 0;
                    this.o = 0;
                }
            } else if (f > i) {
                if (f < i + j / 2) {
                    f = i + j / 2;
                    e = i;
                    this.o = 0;
                }
            } else {
                f += this.o / 10;
            }
            e = f;
            this.o -= this.o / 10;
            if (this.o / 10 == 0) {
                this.o = 0;
            }
        } else if (f < 0) {
            e = 0;
        } else if (f > i) {
            e = i;
        }
        if (f != e) {
            h = e - f << 2;
            f += (g += h) >> 4;
            g &= 0xF;
        }
        main.a.x.b();
    }

    private void b(int n2) {
        this.b = n2;
        if (this.b >= GameMidlet.a[dm.b().b[4]].length) {
            this.b = 0;
        }
        if (this.b < 0) {
            this.b = GameMidlet.a[dm.b().b[4]].length - 1;
        }
    }

    public final void a(int n2, boolean bl2) {
        this.ar = n2;
        if (this.ar >= GameMidlet.a[dm.b().b[4]][this.b].length || this.ar <= 0) {
            this.ar = 0;
            if (bl2) {
                this.d = false;
                this.e();
            }
        }
    }

    public final void l() {
        ++this.r;
        boolean bl2 = false;
        if (main.a.a(8)) {
            bl2 = true;
            if (!this.d) {
                this.b(this.b + 1);
            } else {
                this.a(this.ar + 1, true);
            }
        } else if (main.a.a(2)) {
            bl2 = true;
            if (!this.d) {
                this.b(this.b - 1);
            } else {
                this.a(this.ar - 1, true);
            }
        }
        if (main.a.g && main.a.b(k, l, je.a().f, j)) {
            main.a.g = false;
            this.q = f;
            this.p = true;
            this.n = System.currentTimeMillis() / 10L;
        }
        if (this.p) {
            int n2;
            long l2 = System.currentTimeMillis() / 10L - this.n;
            int n3 = main.a.l();
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    this.t = main.a.i;
                    this.s = this.r;
                }
                this.o = 0;
                n2 = (e + main.a.i - l) / hj.av;
                if (this.d) {
                    this.ar = n2 - this.b;
                } else if (n2 >= 0 && n2 < GameMidlet.a[dm.b().b[4]].length) {
                    this.b = n2;
                }
                if (aw.f(n3) >= 20 * gy.Y) {
                    this.aj = true;
                } else if (l2 > 10L && l2 < 20L) {
                    this.aj = false;
                }
                e = this.q + n3;
                if (e < 0 || e > i) {
                    e = this.q + n3 / 2;
                }
                f = e;
            }
            if (main.a.f && main.a.b(k, l, je.a().f, j)) {
                n2 = (int)(this.r - this.s);
                int n4 = this.t - main.a.i;
                if (aw.f(n4) > 40 && n2 < 10 && e > 0 && e < i) {
                    this.o = n4 / n2 * 10;
                }
                this.s = -1L;
                if (Math.abs(n3) < 20 * gy.Y) {
                    if (l2 <= 10L) {
                        this.aj = false;
                    }
                    if (!this.aj) {
                        int n5 = (e + main.a.i - l) / hj.av;
                        if (this.d) {
                            if (n5 - this.b > 0 && n5 - this.b < GameMidlet.a[dm.b().b[4]][this.b].length) {
                                this.ar = n5 - this.b;
                                this.a(0, -1);
                            } else {
                                if (n5 - this.b <= 0) {
                                    this.d = false;
                                    this.ar = 0;
                                    this.b = n5;
                                    bl2 = true;
                                }
                                if (n5 >= GameMidlet.a[dm.b().b[4]][this.b].length - this.b && n5 < GameMidlet.a[dm.b().b[4]][this.b].length - 1 + GameMidlet.a[dm.b().b[4]].length) {
                                    this.d = false;
                                    this.ar = 0;
                                    this.b = n5 - GameMidlet.a[dm.b().b[4]][this.b].length + 1;
                                    bl2 = true;
                                }
                            }
                        } else if (n5 >= 0 && n5 < GameMidlet.a[dm.b().b[4]].length) {
                            this.b = n5;
                            this.a(0, -1);
                        }
                    }
                }
            }
        }
        if (main.a.f) {
            this.p = false;
        }
        if (bl2) {
            this.g();
        }
        super.l();
    }

    private void g() {
        e = (this.b + (this.d ? this.ar : 0)) * hj.av - j / 2 + hj.av / 2;
        if (e < 0) {
            e = 0;
        }
        if (e > i) {
            e = i;
        }
    }

    public final void a(Graphics graphics) {
        main.a.x.b(graphics);
        main.a.x.d(graphics);
        main.a.c(graphics);
        je.a().a(graphics);
        if (GameMidlet.i != null && !GameMidlet.i.x.equals("")) {
            main.a.L.a(graphics, String.valueOf(kf.dz) + ", " + GameMidlet.i.x, je.a().g + je.a().f / 2, je.a().h - gy.ag, 2);
        }
        graphics.translate(k, l);
        graphics.setClip(0, 0, je.a().f - 9, je.a().e - (je.o + (gy.Z << 1)));
        graphics.translate(0, -f);
        if (!this.aj) {
            main.a.S.c(graphics, 2 * gy.Y, this.b * hj.av + (this.d ? this.ar * hj.av : 0), je.a().f - 8 - 4 * gy.Y, hj.av);
        }
        int n2 = (hj.av - gy.ah) / 2;
        int n3 = 0;
        while (n3 < GameMidlet.a[dm.b().b[4]].length) {
            main.a.K.a(graphics, GameMidlet.a[dm.b().b[4]][n3][0], 24 * gy.Y, n2, 0);
            je.a.a(0, 14 * gy.Y, n2 + gy.ah / 2, 5, 3, graphics);
            n2 += hj.av;
            if (this.d && this.b == n3) {
                int n4 = 1;
                while (n4 < GameMidlet.a[dm.b().b[4]][n3].length) {
                    main.a.K.a(graphics, GameMidlet.a[dm.b().b[4]][n3][n4], 36 * gy.Y, n2, 0);
                    graphics.drawImage(this.c, 24 * gy.Y, n2 + gy.ah / 2, 3);
                    n2 += hj.av;
                    ++n4;
                }
            }
            ++n3;
        }
        super.a(graphics);
        main.a.a(graphics);
    }
}


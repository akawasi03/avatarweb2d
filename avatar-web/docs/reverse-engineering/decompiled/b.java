/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

public final class b {
    private int b;
    private int c;
    private int d;
    private int e;
    private int f;
    private int g;
    private int h;
    private int i;
    private int j;
    private int k;
    private int l;
    private int m;
    private int n;
    private int o;
    private String[] p;
    private String[] q;
    private String[] r;
    private String[] s;
    private String[] t;
    private byte[] u;
    private int v = -1;
    public boolean a = false;
    private boolean w = false;
    private long x;
    private String[] y = new String[]{"Top", "Down", "Left", "Right"};
    private byte[] z;

    public b() {
        byte[] byArray = new byte[4];
        byArray[0] = 4;
        byArray[1] = 7;
        byArray[3] = 2;
        this.z = byArray;
        if (main.a.n >= main.a.m) {
            main.a.G = false;
            this.e = main.a.n / 6 << 1;
            this.b = 0;
            this.c = (main.a.n -= this.e) + 4;
            this.e -= 4;
            this.d = main.a.m;
            this.f = this.d / 4;
            this.g = this.e / 2;
            this.h = this.b;
            this.i = this.c;
            this.j = this.e / 3;
            this.k = this.d / 4;
            this.l = 4;
            this.m = 2;
            this.n = 4;
            this.o = 3;
            this.p = new String[]{"-", "Top", "ABC", "-", "Left", "Down", "Right", "OK"};
            this.q = new String[]{".,?!1", "abc2", "def3", kf.bb, "ghi4", "jkl5", "mno6", kf.cy, "pqrs7", "tuv8", "wxyz9", "0"};
            this.r = new String[12];
            int n2 = 0;
            while (n2 < 12) {
                this.r[n2] = this.q[n2].toUpperCase();
                ++n2;
            }
            this.r[3] = this.q[3];
            this.s = new String[]{"1", "2", "3", kf.bb, "4", "5", "6", kf.cy, "7", "8", "9", "0"};
            byte[] byArray2 = new byte[8];
            byArray2[0] = -6;
            byArray2[1] = -1;
            byArray2[3] = -7;
            byArray2[4] = -3;
            byArray2[5] = -2;
            byArray2[6] = -4;
            byArray2[7] = -5;
            this.u = byArray2;
        } else {
            main.a.G = true;
            this.d = main.a.m / 6 << 1;
            this.c = 1;
            this.e = main.a.a.getHeight();
            this.b = (main.a.m -= this.d + 1) + 4;
            this.d -= 4;
            this.f = this.d / 2;
            this.g = this.e / 4;
            this.h = this.b;
            this.i = this.c;
            this.j = this.e / 4;
            this.k = this.d / 3;
            this.l = 2;
            this.m = 4;
            this.n = 3;
            this.o = 4;
            this.p = new String[]{"-", "OK", "ABC", "Top", "Left", "Right", "-", "Down"};
            this.q = new String[]{".,?!1", "abc2", "def3", "ghi4", "jkl5", "mno6", "pqrs7", "tuv8", "wxyz9", kf.cy, "0", kf.bb};
            this.r = new String[12];
            int n3 = 0;
            while (n3 < 11) {
                this.r[n3] = this.q[n3].toUpperCase();
                ++n3;
            }
            this.r[11] = this.q[11];
            this.s = new String[]{"1", "2", "3", "4", "5", "6", "7", "8", "9", kf.cy, "0", kf.bb};
            byte[] byArray3 = new byte[8];
            byArray3[0] = -7;
            byArray3[1] = -5;
            byArray3[3] = -1;
            byArray3[4] = -3;
            byArray3[5] = -4;
            byArray3[6] = -6;
            byArray3[7] = -2;
            this.u = byArray3;
        }
        this.x = -1L;
        this.c();
    }

    private static void b() {
        if (main.a.Z > 0) {
            dx.t.a();
            return;
        }
        if (im.c) {
            im.d().ae.b();
            return;
        }
        if (main.a.r.ae != null && main.a.r.ae.a.equals(kf.bb)) {
            main.a.r.ae.b.a();
        }
    }

    public final void a() {
        if (this.a) {
            b b2 = this;
            if (main.a.a(b2.h, b2.i, b2.d, b2.e)) {
                if (main.a.e) {
                    int n2 = (main.a.h - b2.h) / b2.k;
                    int n3 = (main.a.i - b2.i) / b2.j;
                    n3 = b2.v = n3 * b2.n + n2;
                    b b3 = b2;
                    if (main.a.G && n3 < 9) {
                        main.a.a.keyPressed(n3 + 49);
                    } else if (!main.a.G && n3 % 4 != 3) {
                        main.a.a.keyPressed(n3 + 49 - n3 / 4);
                    } else {
                        switch (n3) {
                            case 10: {
                                main.a.a.keyPressed(48);
                                break;
                            }
                            case 7: 
                            case 9: {
                                b3.a = false;
                                break;
                            }
                            case 3: {
                                b.b();
                                break;
                            }
                            case 11: {
                                if (main.a.G) {
                                    b.b();
                                    break;
                                }
                                main.a.a.keyPressed(48);
                            }
                        }
                    }
                    main.a.e = false;
                }
                if (main.a.f && b2.v != -1) {
                    b2.v = -1;
                    main.a.f = false;
                }
            }
            return;
        }
        b b4 = this;
        if (b4.w && main.a.f) {
            b4.w = false;
            if (System.currentTimeMillis() / 10L - b4.x > 40L) {
                dx.c();
                b4.c();
            } else {
                b4.v = -1;
                b4.a = true;
            }
        }
        if (main.a.a(b4.b, b4.c, b4.d, b4.e)) {
            b b5;
            int n4;
            if (main.a.e) {
                int n5 = (main.a.h - b4.b) / b4.f;
                n4 = (main.a.i - b4.c) / b4.g;
                n4 = b4.v = n4 * b4.l + n5;
                b5 = b4;
                if (n4 == 2) {
                    b5.x = System.currentTimeMillis() / 10L;
                    b5.w = true;
                } else {
                    main.a.a.keyPressed(b5.u[n4]);
                }
                main.a.e = false;
            }
            if (main.a.f && b4.v != -1) {
                n4 = b4.v;
                b5 = b4;
                if (n4 != 2 && n4 < b5.u.length) {
                    main.a.a.keyReleased(b5.u[n4]);
                }
                b4.v = -1;
                main.a.f = false;
            }
        }
    }

    private void c() {
        switch (dx.n) {
            case 0: 
            case 1: {
                this.t = this.q;
                return;
            }
            case 2: {
                this.t = this.r;
                return;
            }
            case 3: {
                this.t = this.s;
            }
        }
    }

    public final void a(Graphics graphics) {
        graphics.translate(-graphics.getTranslateX(), -graphics.getTranslateY());
        graphics.setClip(this.b - 4, this.c - 4, this.d + 4, this.e + 4);
        if (this.a) {
            Graphics graphics2 = graphics;
            b b2 = this;
            graphics2.setClip(b2.b, b2.c, b2.d, b2.e);
            je.a(b2.h, b2.i, b2.d, b2.e, 8705740, graphics2);
            graphics2.setColor(1);
            graphics2.drawRect(b2.h, b2.i, b2.d - 1, b2.e - 1);
            int n2 = 1;
            while (n2 < b2.n) {
                graphics2.fillRect(b2.h + n2 * b2.k, b2.i, 1, b2.e);
                ++n2;
            }
            n2 = 1;
            while (n2 < b2.o) {
                graphics2.fillRect(b2.h, b2.i + n2 * b2.j, b2.d, 1);
                ++n2;
            }
            n2 = 0;
            while (n2 < b2.r.length) {
                int n3 = b2.i + n2 / b2.n * b2.j;
                graphics2.setClip(b2.h + n2 % b2.n * b2.k, n3 - 5, b2.k, b2.j + 5);
                if (b2.v == n2) {
                    graphics2.setColor(14279153);
                    graphics2.fillRect(b2.h + n2 % b2.n * b2.k + 1, n3 + 1, b2.k - 2, b2.j - 2);
                }
                main.a.K.a(graphics2, b2.t[n2], b2.h + n2 % b2.n * b2.k + b2.k / 2, n3 - 5 + b2.j / 2, 2);
                ++n2;
            }
        } else {
            Graphics graphics3 = graphics;
            b b3 = this;
            graphics3.setClip(b3.b - 4, b3.c - 4, b3.d + 4, b3.e + 4);
            je.a(b3.b, b3.c, b3.d, b3.e, 8705740, graphics3);
            graphics3.setColor(0);
            graphics3.drawRect(b3.b, b3.c, b3.d - 1, b3.e - 1);
            int n4 = 1;
            while (n4 < b3.l + 1) {
                graphics3.fillRect(b3.b + n4 * b3.f, b3.c, 1, b3.e);
                ++n4;
            }
            n4 = 1;
            while (n4 < b3.m) {
                graphics3.fillRect(b3.b, b3.c + n4 * b3.g, b3.d, 1);
                ++n4;
            }
            n4 = 0;
            while (n4 < b3.p.length) {
                if (b3.v == n4) {
                    graphics3.setColor(14279153);
                    graphics3.fillRect(b3.b + n4 % b3.l * b3.f + 1, b3.c + n4 / b3.l * b3.g + 1, b3.f - 2, b3.g - 2);
                }
                int n5 = b3.b + n4 % b3.l * b3.f + b3.f / 2;
                int n6 = b3.c + n4 / b3.l * b3.g + b3.g / 2;
                if (b3.p[n4].equals("ABC")) {
                    main.a.K.a(graphics3, dx.p[dx.n], n5, n6 - 5, 2);
                } else {
                    int n7 = 0;
                    while (n7 < 4) {
                        if (b3.p[n4].equals(b3.y[n7])) {
                            je.b.a(0, n5, n6, b3.z[n7], 3, graphics3);
                        }
                        ++n7;
                    }
                }
                ++n4;
            }
        }
        graphics.setClip(this.b - 4, this.c - 4, this.d + 4, this.e + 4);
        graphics.setColor(2378578);
        if (main.a.G) {
            graphics.drawRect(this.b - 4, this.c, 4, this.e);
            graphics.setColor(6201499);
            graphics.fillRect(this.b - 4 + 1, this.c + 1, 3, this.e - 2);
            graphics.setColor(2716523);
            graphics.fillRect(this.b - 4 + 3, this.c + 1, 1, this.e - 1);
            return;
        }
        graphics.drawRect(this.b, this.c - 4, this.d, 4);
        graphics.setColor(6201499);
        graphics.fillRect(this.b + 1, this.c - 4 + 1, this.d - 2, 3);
        graphics.setColor(2716523);
        graphics.fillRect(this.b + 1, this.c - 4 + 3, this.d - 1, 1);
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Canvas
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class dx {
    public int a;
    public int b;
    public int c;
    public int d;
    private boolean v;
    private boolean w = false;
    public boolean e = true;
    private static int x = 1;
    private static int[] y = new int[]{18, 14, 11, 9, 6, 4, 2};
    public static int f = 0;
    private static String[] z = new String[]{" 0", ".,@?!_1\"/$-():*+<=>;%&~#%^&*{}[];'/1", "abc2\u00e2\u0103", "def3\u0111\u00ea", "ghi4", "jkl5", "mno6\u00f4\u01a1", "pqrs7", "tuv8\u01b0", "wxyz9", "*", "#"};
    private static String[] A = new String[]{"0", "1", "abc2", "def3", "ghi4", "jkl5", "mno6", "pqrs7", "tuv8", "wxyz9", "0", "0"};
    private static String[] B = new String[]{" 0", "er1", "ty2", "ui3", "df4", "gh5", "jk6", "cv7", "bn8", "m9", "0", "0", "qw!", "as?", "zx", "op.", "l,"};
    private String C = "";
    private String D = "";
    public String g = "";
    public int h = 0;
    public int i = 0;
    private int E = 500;
    public int j = 0;
    private static int F = -1984;
    public int k = 0;
    private int G = 0;
    public int l = 10;
    private int H = 0;
    public static boolean m;
    public static int n;
    public static int o;
    public static final String[] p;
    private static int I;
    private static int J;
    private by K;
    public String q = "";
    public static ht r;
    private static Canvas L;
    public static int s;
    public static ii t;
    public static boolean u;
    private int M = -1;
    private int N = 0;
    private int O = 0;
    private long P = 0L;
    private static String Q;
    private boolean R = false;
    private static int[][] S;

    static {
        n = 0;
        p = new String[]{"abc", "Abc", "ABC", "123"};
        I = 11;
        u = false;
        Q = "a\u00e1\u00e0\u1ea3\u00e3\u1ea1\u00e2\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u0103\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7e\u00e9\u00e8\u1ebb\u1ebd\u1eb9\u00ea\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7i\u00ed\u00ec\u1ec9\u0129\u1ecbo\u00f3\u00f2\u1ecf\u00f5\u1ecd\u00f4\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u01a1\u1edb\u1edd\u1edf\u1ee1\u1ee3u\u00fa\u00f9\u1ee7\u0169\u1ee5\u01b0\u1ee9\u1eeb\u1eed\u1eef\u1ef1y\u00fd\u1ef3\u1ef7\u1ef9\u1ef5";
        S = new int[][]{{32, 48}, {49, 69}, {50, 84}, {51, 85}, {52, 68}, {53, 71}, {54, 74}, {55, 67}, {56, 66}, {57, 77}, {42, 128}, {35, 137}, {33, 113}, {63, 97}, {64, 121, 122}, {46, 111}, {44, 108}};
    }

    public static void a(int n2) {
        if (n2 == 1) {
            dx.z[0] = "0";
            dx.z[10] = " *";
            dx.z[11] = "#";
            I = 35;
            J = 42;
            return;
        }
        if (n2 == 0) {
            dx.z[0] = " 0";
            dx.z[10] = "*";
            dx.z[11] = "#";
            I = 35;
            J = 42;
            return;
        }
        if (n2 == 2) {
            dx.z[0] = "0";
            dx.z[10] = "*";
            dx.z[11] = " #";
            I = 42;
            J = 35;
        }
    }

    public final void a(boolean bl2) {
        if (this.v != bl2) {
            n = 0;
        }
        F = -1984;
        o = main.a.j();
        this.v = bl2;
    }

    public final by a() {
        t = this.K.b;
        if (main.a.Z == 0) {
            return this.K;
        }
        return null;
    }

    public static void b(boolean bl2) {
        m = bl2;
        main.a.M.a("ABC");
    }

    public dx() {
        dx dx2 = this;
        f = gy.af + 1;
        dx2.K = new by(kf.bb, new jw(dx2));
        if (L == null) {
            L = main.a.a;
        }
        this.a(false);
        this.d = dx.r.b;
    }

    public final void b() {
        if (this.h > 0 && this.C.length() > 0) {
            this.C = String.valueOf(this.C.substring(0, this.h - 1)) + this.C.substring(this.h, this.C.length());
            --this.h;
            this.e(0);
            this.h();
        }
    }

    private void e(int n2) {
        this.g = this.H == 2 ? this.D : this.C;
        int n3 = main.a.M.a(this.g.substring(0, this.h));
        if (n2 == -1) {
            if (n3 + this.j < 15 && this.h > 0 && this.h < this.g.length()) {
                this.j += main.a.M.a(this.g.substring(this.h, this.h + 1));
            }
        } else if (n2 == 1) {
            if (n3 + this.j > this.c - 25 && this.h < this.g.length() && this.h > 0) {
                this.j -= main.a.M.a(this.g.substring(this.h - 1, this.h));
            }
        } else {
            this.j = -(n3 - (this.c - 12));
        }
        if (this.j > 0) {
            this.j = 0;
            return;
        }
        if (this.j < 0 && this.j < -(n2 = main.a.M.a(this.g) - (this.c - 12))) {
            this.j = -n2;
        }
    }

    private void f(int n2) {
        if (!(this.H != 2 && this.H != 3 || n2 >= 48 && n2 <= 57 || n2 >= 65 && n2 <= 90 || n2 >= 97 && n2 <= 122)) {
            return;
        }
        if (this.C.length() < this.E) {
            String string = String.valueOf(this.C.substring(0, this.h)) + (char)n2;
            if (this.h < this.C.length()) {
                string = String.valueOf(string) + this.C.substring(this.h, this.C.length());
            }
            this.C = string;
            ++this.h;
            this.h();
            this.e(0);
        }
    }

    public static void c() {
        if (++n > 3) {
            n = 0;
        }
        F = I;
        o = main.a.j();
    }

    private void g(int n2) {
        block15: {
            block17: {
                char c2;
                Object object;
                dx dx2;
                int n3;
                block16: {
                    int n4;
                    block14: {
                        if (this.H != 0 && this.H != 2 && this.H != 3) break block15;
                        n3 = n2;
                        dx2 = this;
                        object = main.a.E ? B : (dx2.H == 2 || dx2.H == 3 ? A : z);
                        if (!main.a.E) break block16;
                        c2 = '\u0000';
                        while (c2 < S.length) {
                            int n5 = 0;
                            while (n5 < S[c2].length) {
                                if (S[c2][n5] == n3) {
                                    n4 = c2 + 48;
                                    break block14;
                                }
                                ++n5;
                            }
                            ++c2;
                        }
                        n4 = n3 = -1;
                    }
                    if (n4 == -1) break block17;
                }
                if (n3 == F) {
                    dx2.G = (dx2.G + 1) % object[n3 - 48].length();
                    c2 = object[n3 - 48].charAt(dx2.G);
                    c2 = n == 0 ? Character.toLowerCase(c2) : (n == 1 ? Character.toUpperCase(c2) : (n == 2 ? Character.toUpperCase(c2) : object[n3 - 48].charAt(object[n3 - 48].length() - 1)));
                    object = String.valueOf(dx2.C.substring(0, dx2.h - 1)) + c2;
                    if (dx2.h < dx2.C.length()) {
                        object = String.valueOf(object) + dx2.C.substring(dx2.h, dx2.C.length());
                    }
                    dx2.C = object;
                    dx2.k = y[x];
                    dx2.h();
                } else if (dx2.C.length() < dx2.E) {
                    if (n == 1 && F != -1984) {
                        n = 0;
                    }
                    dx2.G = 0;
                    c2 = object[n3 - 48].charAt(dx2.G);
                    c2 = n == 0 ? Character.toLowerCase(c2) : (n == 1 ? Character.toUpperCase(c2) : (n == 2 ? Character.toUpperCase(c2) : object[n3 - 48].charAt(object[n3 - 48].length() - 1)));
                    object = String.valueOf(dx2.C.substring(0, dx2.h)) + c2;
                    if (dx2.h < dx2.C.length()) {
                        object = String.valueOf(object) + dx2.C.substring(dx2.h, dx2.C.length());
                    }
                    dx2.C = object;
                    dx2.k = y[x];
                    ++dx2.h;
                    dx2.h();
                    dx2.e(0);
                }
                F = n3;
            }
            return;
        }
        if (this.H == 1) {
            this.f(n2);
            this.k = 1;
        }
    }

    public final boolean b(int n2) {
        if (main.a.E) {
            if (n2 == 8 || n2 == 127) {
                this.b();
            }
        } else if (n2 == 8 || n2 == -8 || n2 == 204) {
            this.b();
            return true;
        }
        if (!main.a.E && n2 >= 65 && n2 <= 122) {
            m = true;
        }
        if (m && !main.a.E) {
            if (n2 == 45) {
                if (n2 == F && this.k < y[x]) {
                    this.g = this.C = String.valueOf(this.C.substring(0, this.h - 1)) + '_';
                    this.h();
                    this.e(0);
                    F = -1984;
                    return false;
                }
                F = 45;
            }
            if (n2 >= 32) {
                this.f(n2);
                return false;
            }
        }
        if (!m && n2 == I) {
            dx.c();
            this.k = 1;
            F = n2;
            return false;
        }
        if (n2 == J && this.H == 0) {
            this.g();
            return false;
        }
        if (n2 == 42) {
            n2 = 58;
        }
        if (n2 == 35) {
            n2 = 59;
        }
        if (main.a.E && n2 >= 48) {
            if (m) {
                this.f(n2);
                this.k = 1;
            } else {
                this.g(n2);
            }
        } else if (n2 >= 48 && n2 <= 59) {
            this.g(n2);
        } else {
            this.G = 0;
            F = -1984;
            if (n2 == 14) {
                if (this.h > 0) {
                    --this.h;
                    this.e(0);
                    this.l = 10;
                    return false;
                }
            } else if (n2 == 15) {
                if (this.h < this.C.length()) {
                    ++this.h;
                    this.e(0);
                    this.l = 10;
                    return false;
                }
            } else {
                if (n2 == 19) {
                    this.b();
                    return false;
                }
                F = n2;
            }
        }
        return true;
    }

    private void g() {
        this.P = System.currentTimeMillis() / 100L;
        if (this.M == -1) {
            int n2 = this.h;
            while (n2 > 0) {
                char c2 = this.C.charAt(n2 - 1);
                int n3 = 0;
                while (n3 < Q.length()) {
                    char c3 = Q.charAt(n3);
                    if (c2 == c3) {
                        this.N = n3;
                        this.O = 0;
                        this.M = n2 - 1;
                        return;
                    }
                    ++n3;
                }
                --n2;
            }
            this.M = -1;
            return;
        }
        ++this.O;
        if (this.O >= 6) {
            this.O = 0;
        }
        String string = this.C.substring(0, this.M);
        String string2 = this.C.substring(this.M + 1);
        String string3 = Q.substring(this.N + this.O, this.N + this.O + 1);
        this.C = String.valueOf(string) + string3 + string2;
    }

    public final void a(Graphics graphics) {
        dx dx2 = this;
        boolean bl2 = dx2.v;
        this.g = this.H == 2 ? this.D : this.C;
        graphics.setClip(0, 0, main.a.m + 20, main.a.n);
        graphics.setColor(0x777777);
        main.a.S.a(graphics, this.a, this.b, this.c, this.d, this, bl2);
    }

    public final boolean d() {
        return this.v;
    }

    private void h() {
        if (this.H == 2) {
            this.D = "";
            int n2 = 0;
            while (n2 < this.C.length()) {
                this.D = String.valueOf(this.D) + "*";
                ++n2;
            }
            if (this.k > 0 && this.h > 0) {
                this.D = String.valueOf(this.D.substring(0, this.h - 1)) + this.C.charAt(this.h - 1) + this.D.substring(this.h, this.D.length());
            }
        }
    }

    public final void e() {
        dx dx2;
        ++this.i;
        if (this.k > 0) {
            --this.k;
            if (this.k == 0 || n > 2) {
                this.G = 0;
                if (this.v && n == 1 && F != I) {
                    n = 0;
                }
                F = -1984;
                this.h();
            }
        }
        if (this.l > 0) {
            --this.l;
        }
        if (main.a.g && main.a.t == null) {
            dx2 = this;
            if (main.a.g && main.a.a(0, 0, main.a.m, main.a.n - main.a.T / 2)) {
                if (main.a.a(dx2.a, dx2.b - 6, dx2.c, dx2.d + 12)) {
                    if (!dx2.v) {
                        dx2.v = true;
                    } else {
                        if (!dm.d) {
                            dx2.R = true;
                            dm.d = true;
                            main.a.a.b();
                        }
                        main.a.z.a = true;
                    }
                } else {
                    if (dx2.R) {
                        dm.d = false;
                        main.a.a.b();
                        dx2.R = false;
                    }
                    if (dx2.e) {
                        dx2.v = false;
                    }
                }
            }
        }
        if (this.M != -1 && System.currentTimeMillis() / 100L - this.P > 5L) {
            this.M = -1;
        }
        if (this.v && main.a.v == null) {
            if (main.a.b[4]) {
                if (this.H != 2) {
                    --this.h;
                    if (this.h < 0) {
                        this.h = 0;
                    }
                    this.e(-1);
                }
                main.a.b[4] = false;
                return;
            }
            if (main.a.b[6]) {
                if (this.H != 2) {
                    ++this.h;
                    dx2 = this;
                    if (this.h > dx2.C.length()) {
                        dx2 = this;
                        this.h = dx2.C.length();
                    }
                    this.e(1);
                }
                main.a.b[6] = false;
            }
        }
    }

    public final String f() {
        return this.C;
    }

    public final void a(String string) {
        if (string == null) {
            return;
        }
        F = -1984;
        this.k = 0;
        this.G = 0;
        this.C = string;
        this.g = string;
        this.h();
        this.h = string.length();
        this.e(0);
    }

    public final void c(int n2) {
        this.E = 40;
    }

    public final void d(int n2) {
        this.H = n2;
    }

    static boolean a(dx dx2) {
        return dx2.v;
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class cw {
    public boolean a;
    public String b;
    public by c;
    public by d;
    public Vector e = new Vector();
    public String f = "";
    public int g;
    public boolean h;
    public int i;
    private static int l = main.a.N.a();
    public static int j;
    private static int m;
    private static int n;
    private static int o;
    public static int k;
    private int p = 0;
    private int q;
    private int r;
    private boolean s = false;
    private long t;
    private long u;

    public cw(String string, int n2, by by2, by by3, boolean bl2) {
        this.b = string;
        this.g = n2;
        this.c = by2;
        this.h = bl2;
        this.d = by3 == null && hc.d != null ? hc.d.f : by3;
        this.d();
        this.c();
        this.a = true;
    }

    private void d() {
        this.i = je.a().e - je.o - (gy.Z << 1) - 7 - (this.h ? hc.c.d : 0);
    }

    public final void a(String string, String string2) {
        this.a = true;
        this.a(String.valueOf(string) + ": " + string2);
    }

    public final void a(String object) {
        object = main.a.N.b((String)object, main.a.m - ((hc.e << 1) + 30 + 10 * (gy.Y - 1)));
        int n2 = ((Vector)object).size();
        int n3 = 0;
        while (n3 < n2) {
            this.e.addElement(((Vector)object).elementAt(n3));
            if (this.e.size() > 100) {
                this.e.removeElementAt(0);
            }
            ++n3;
        }
        if (hc.b().b(hc.b().b) == this) {
            this.a();
        }
    }

    public final void a() {
        int n2 = this.e.size();
        il.a().a(n2 * l, this.i);
        k = n2 * l - this.i;
        if (k < 0) {
            k = 0;
        }
        if (aw.f(j - k) <= l) {
            j = k;
        }
    }

    public final void a(Graphics graphics) {
        int n2;
        il.a().a(graphics, main.a.m - 50, 0);
        graphics.setClip(0, 0, main.a.m - (hc.e << 1), this.i + 4);
        graphics.translate(0, -m);
        int n3 = m / l;
        if (n3 < 0) {
            n3 = 0;
        }
        if ((n2 = n3 + this.i / l + 1) > this.e.size()) {
            n2 = this.e.size();
        }
        while (n3 < n2) {
            String string = (String)this.e.elementAt(n3);
            main.a.N.a(graphics, string, 10 * gy.Y, n3 * l + 5, 0);
            ++n3;
        }
    }

    public final void b() {
        ++this.t;
        boolean bl2 = false;
        if (main.a.d[2]) {
            bl2 = true;
            j -= l;
        } else if (main.a.d[8]) {
            j += l;
            bl2 = true;
        }
        if (main.a.g) {
            main.a.g = false;
            this.p = m;
            this.s = true;
            this.q = 0;
        }
        if (this.s) {
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    this.r = main.a.i;
                    this.u = this.t;
                }
                this.q = 0;
                j = this.p + main.a.l();
                if (j < 0 || j > k) {
                    j = this.p + main.a.l() / 2;
                }
                m = j;
            }
            if (main.a.f) {
                int n2 = (int)(this.t - this.u);
                int n3 = this.r - main.a.i;
                if (aw.f(n3) > 40 && n2 < 10 && j > 0 && j < k) {
                    this.q = n3 / n2 * 10;
                }
                this.u = -1L;
            }
        }
        if (bl2) {
            if (j < 0) {
                j = 0;
            }
            if (j > k) {
                j = k;
            }
        }
        if (this.q != 0) {
            if (m < 0 || m > k) {
                this.q -= this.q / 4;
                m += this.q / 20;
                if (this.q / 10 <= 1) {
                    this.q = 0;
                }
            }
            if (m < 0) {
                if (m < -this.i / 2) {
                    m = -this.i / 2;
                    j = 0;
                    this.q = 0;
                }
            } else if (m > k) {
                if (m < k + this.i / 2) {
                    m = k + this.i / 2;
                    j = k;
                    this.q = 0;
                }
            } else {
                m += this.q / 10;
            }
            j = m;
            this.q -= this.q / 10;
            if (this.q / 10 == 0) {
                this.q = 0;
            }
        } else if (m < 0) {
            j = 0;
        } else if (m > k) {
            j = k;
        }
        if (m != j) {
            o = j - m << 2;
            m += (n += o) >> 4;
            n &= 0xF;
        }
        il.a().b(m, j);
    }

    public final void c() {
        this.d();
        m = 0;
        j = 0;
        this.a();
        j = m;
    }
}


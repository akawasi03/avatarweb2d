/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.util.Hashtable;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.a;

public final class jb
extends ha {
    public static jb a;
    private int b;
    private int c;
    private int d;
    private int e;
    private int f;
    private Vector g = new Vector();
    private Vector h = new Vector();
    private Hashtable i;
    private String j = "";
    private String k = "";
    private int l = 5;
    private int m = 5;
    private int n = 30;
    private byte o;
    private static int p;
    private static int q;
    private static int r;
    private static int s;
    private static int t;
    private static int u;
    private static int v;
    private long w;
    private int x = 0;
    private int y = 0;
    private boolean z = false;
    private int A;
    private int B;
    private int C;
    private int D;

    static {
        v = 14;
    }

    public static jb b() {
        if (a == null) {
            a = new jb();
            return a;
        }
        return a;
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                this.g.removeAllElements();
                this.h.removeAllElements();
                this.i.clear();
                main.a.A = null;
                main.a.h();
                a = null;
                return;
            }
            case 1: {
                cx.a().b(this.o);
            }
        }
    }

    public jb() {
        this.e();
        this.ae = new by(kf.d, 0);
        v = gy.af;
    }

    private void e() {
        this.e = main.a.m - 20;
        this.f = main.a.n - main.a.T - 20;
    }

    public final void d() {
        this.e();
        this.a(this.i, this.j, this.k, this.o);
    }

    private void a(String string) {
        int n2 = string.indexOf("\u0118");
        if (n2 != -1) {
            String string2 = string.substring(0, n2);
            this.a(string2, "");
            string = string.substring(n2 + 1);
            n2 = string.indexOf("\n");
            if (n2 != -1) {
                string2 = string.substring(0, n2);
                this.a(string2, "\u0118");
                string = string.substring(n2 + 1);
                this.a(string);
                return;
            }
            this.a(string, "\u0118");
            return;
        }
        this.a(string, "");
    }

    private void a(String string, String string2) {
        if (string.equals("")) {
            return;
        }
        int n2 = string.indexOf("\u0119");
        if (n2 != -1) {
            String string3 = string.substring(0, n2);
            if (!string3.equals("")) {
                this.a(string3, string2, 0);
            }
            int n3 = Integer.parseInt(string.substring(n2 + 1, n2 + 2));
            if ((n2 = (string = string.substring(n2 + 2, string.length())).indexOf("\n")) != -1) {
                this.a(string.substring(0, n2), string2, n3);
                this.a(string.substring(n2 + 1), string2);
                return;
            }
            this.a(string, string2, n3);
            return;
        }
        this.a(string, string2, 0);
    }

    private void a(String object, String string, int n2) {
        String[] stringArray;
        boolean bl2 = false;
        if (((String)object).indexOf("tem") != -1) {
            bl2 = true;
            stringArray = main.a.N.a((String)object, this.e - 30 - 8 * gy.Y);
        } else {
            stringArray = main.a.K.a((String)object, this.e - 30 - 8 * gy.Y);
        }
        int n3 = 0;
        while (n3 < stringArray.length) {
            int n4 = bl2 ? main.a.N.a(stringArray[n3]) : main.a.K.a(stringArray[n3]);
            if (n4 > this.x) {
                this.x = n4;
            }
            object = new bc(this.l, this.m += v, String.valueOf(string) + stringArray[n3]);
            new bc(this.l, this.m += v, String.valueOf(string) + stringArray[n3]).e = n2;
            this.g.addElement(object);
            ++n3;
        }
    }

    public final void a(Hashtable hashtable, String string, String string2, byte by2) {
        int n2;
        this.B = 0;
        this.ad = null;
        if (by2 != -1) {
            this.ad = new by(kf.O, 1);
        }
        this.o = by2;
        this.x = 0;
        this.n = main.a.K.a(string) + 20 * gy.Y;
        if (this.n < 50 + 20 * gy.Y) {
            this.n = 50 + 20 * gy.Y;
        }
        this.i = hashtable;
        this.j = string;
        this.k = string2;
        this.g.removeAllElements();
        this.h.removeAllElements();
        boolean bl2 = false;
        this.l = 0;
        this.m = -10;
        block2: while ((n2 = string2.indexOf("\u00b5")) != -1) {
            Object object;
            String string3 = string2.substring(0, n2);
            string2 = string2.substring(n2 + 1, string2.length());
            if (bl2) {
                n2 = string3.indexOf(",");
                object = string3.substring(0, n2);
                string3 = string3.substring(n2 + 1, string3.length());
                n2 = string3.indexOf(",");
                int n3 = Integer.parseInt(string3.substring(0, n2));
                n2 = Integer.parseInt(string3 = string3.substring(n2 + 1, string3.length())) != 0 ? 1 : 0;
                string3 = (Image)this.i.get(String.valueOf(object));
                int n4 = 0;
                if (n3 == 17) {
                    n4 = 1;
                } else if (n3 == 24) {
                    n4 = 2;
                }
                object = new v(this, Integer.parseInt((String)object), n4, this.m + v + 5, n3, n2 != 0);
                string3.getWidth();
                ((v)object).e = string3.getHeight();
                if (n2 != 0) {
                    v v2 = (v)this.h.elementAt(this.h.size() - 1);
                    n3 = ((Image)this.i.get(String.valueOf(v2.d))).getHeight();
                    if (string3.getHeight() > n3) {
                        v2.b += string3.getHeight() - n3;
                    }
                    ((v)object).b = v2.b + n3 - string3.getHeight();
                }
                this.m = ((v)object).b + string3.getHeight() - 10;
                this.h.addElement(object);
                string3 = "";
            }
            boolean bl3 = bl2 = !bl2;
            while (true) {
                int n5;
                if ((n5 = string3.indexOf("\u00b6")) != -1) {
                    object = string3.substring(0, n5);
                    string3 = string3.substring(n5 + 1, string3.length());
                    try {
                        Integer.parseInt((String)object, 16);
                        this.a("\u00b6" + (String)object);
                        this.m -= v / 2;
                    }
                    catch (Exception exception) {
                        this.a((String)object);
                    }
                    continue;
                }
                if (!string3.equals("")) {
                    this.a(string3.substring(0, string3.length() - 1));
                }
                if (string2.indexOf("\u00b5") != -1 || string2.indexOf("\u00b6") == -1) continue block2;
                string3 = string2;
                string2 = "";
            }
        }
        this.a(string2);
        this.c = 9 * gy.Y;
        if (this.x < 140 * gy.Y) {
            this.x = 140 * gy.Y;
        }
        if (this.x >= 120 && this.x < this.e - 30) {
            this.e = this.x + 20 * gy.Y;
            this.c = 10 * gy.Y;
        }
        if (this.m + 10 + (v << 1) < this.f - 30) {
            this.f = this.m + 10 + (v << 1) + 20;
        }
        if (this.f < 80 * gy.Y + hj.at) {
            this.f = 80 * gy.Y + hj.at;
        }
        if ((t = this.m - (this.f - je.o - 2 * gy.Z - (v << 1))) < 0) {
            t = 0;
        }
        p = 0;
        q = 0;
        this.b = (main.a.m - this.e) / 2;
        this.d = (main.a.n - main.a.T - this.f) / 2;
        this.w = System.currentTimeMillis();
    }

    public final void l() {
        if (System.currentTimeMillis() - this.w >= 1000L) {
            this.w = System.currentTimeMillis();
        }
        ++this.B;
        boolean bl2 = false;
        if (u != 0) {
            u += -u >> 1;
        }
        if (u == -1) {
            u = 0;
        }
        if (main.a.g && main.a.a(this.b, this.d, this.e, this.f) && !this.z) {
            this.y = q;
            this.z = true;
            this.A = 0;
        }
        if (this.z) {
            int n2 = main.a.l();
            if (main.a.e) {
                if (main.a.l % 3 == 0) {
                    this.D = main.a.i;
                    this.C = this.B;
                }
                p = this.y + n2;
                this.A = 0;
                if (p < 0 || p > t) {
                    p = this.y + n2 / 2;
                }
                q = p;
            }
            if (main.a.f) {
                this.z = false;
                int n3 = this.B - this.C;
                int n4 = this.D - main.a.i;
                if (aw.f(n4) > 40 && n3 < 10 && p > 0 && p < t) {
                    this.A = n4 / n3 * 10;
                }
                this.C = -1;
                if (Math.abs(n2) < 10) {
                    p = this.y + n2;
                }
            }
        }
        if (main.a.d[2]) {
            p -= 14;
            bl2 = true;
        } else if (main.a.d[8]) {
            bl2 = true;
            p += 14;
        }
        if (bl2) {
            if (p < 0) {
                p = 0;
            }
            if (p > t) {
                p = t;
            }
        }
        if (this.A != 0) {
            if (q < 0 || q > t) {
                this.A -= this.A / 4;
                q += this.A / 20;
                if (this.A / 10 <= 1) {
                    this.A = 0;
                }
            }
            if (q < 0) {
                if (q < -this.f / 2) {
                    q = -this.f / 2;
                    p = 0;
                    this.A = 0;
                }
            } else if (q > t) {
                if (q < t + this.f / 2) {
                    q = t + this.f / 2;
                    p = t;
                    this.A = 0;
                }
            } else {
                q += this.A / 10;
            }
            p = q;
            this.A -= this.A / 10;
            if (this.A / 10 == 0) {
                this.A = 0;
            }
        } else if (q < 0) {
            p = 0;
        } else if (q > t) {
            p = t;
        }
        if (q != p) {
            s = p - q << 2;
            q += (r += s) >> 4;
            r &= 0xF;
        }
        super.l();
    }

    public final void a(Graphics graphics) {
        Object object;
        main.a.c(graphics);
        main.a.S.a(graphics, this.b, this.d, this.f, this.e, 0, 0, je.a().j, this.n, je.o, 1, 1, je.a().n, je.a().m, this.j);
        graphics.setClip(this.b + 4, this.d + je.o + 4 * gy.Y, this.e - 8, this.f - je.o - 8 * gy.Y);
        graphics.translate(this.b + this.c, this.d + je.o);
        graphics.translate(0, -q);
        graphics.setColor(0);
        int n2 = 0;
        while (n2 < this.g.size()) {
            object = (bc)this.g.elementAt(n2);
            if (((js)object).ax > q - 10 && ((js)object).ax < q + this.f) {
                int n3;
                if (((bc)object).a.length() > 2 && ((bc)object).a.substring(0, 1).equals("\u00b6")) {
                    n3 = Integer.parseInt(((bc)object).a.substring(1, ((bc)object).a.length()), 16);
                    je.a(((js)object).aw, ((js)object).ax, main.a.m - (((js)object).aw << 1), 1, n3, graphics);
                } else {
                    n3 = ((js)object).aw;
                    if (((bc)object).e == 2) {
                        n3 += (this.e - 30) / 2 + 4;
                    } else if (((bc)object).e == 1) {
                        n3 += this.e - 30 + 10;
                    }
                    if (((bc)object).a.length() > 2 && ((bc)object).a.substring(0, 1).equals("\u0118")) {
                        main.a.N.a(graphics, ((bc)object).a.substring(1, ((bc)object).a.length()), n3, ((js)object).ax, ((bc)object).e);
                    } else if (((bc)object).a.length() > 1 && ((bc)object).a.substring(0, 1).equals("0")) {
                        graphics.setColor(8654855);
                        int n4 = main.a.M.a(String.valueOf(((bc)object).a.substring(1)) + "") + 20;
                        graphics.fillRect(n3 - n4 / 2, ((js)object).ax + gy.ah / 2 - gy.ai / 2 - 1, n4, main.a.M.a());
                        main.a.M.a(graphics, String.valueOf(((bc)object).a.substring(1)) + "", n3, ((js)object).ax + gy.ah / 2 - gy.af / 2, ((bc)object).e);
                    } else {
                        main.a.K.a(graphics, ((bc)object).a, n3, ((js)object).ax, ((bc)object).e);
                    }
                }
            }
            ++n2;
        }
        n2 = 0;
        while (n2 < this.h.size()) {
            object = (v)this.h.elementAt(n2);
            if (((v)object).b + ((v)object).e > q && ((v)object).b < q + this.f) {
                graphics.drawImage((Image)this.i.get(String.valueOf(((v)object).d)), ((v)object).a * ((this.e - (this.c << 1)) / 2), ((v)object).b, ((v)object).c);
            }
            ++n2;
        }
        super.a(graphics);
    }
}


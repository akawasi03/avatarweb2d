/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import javax.microedition.lcdui.Graphics;
import main.a;

public final class dm
extends hj {
    public static dm a;
    private int f = 0;
    private int g = 0;
    private int h = 5;
    public int[] b;
    public int c = 0;
    private int i;
    private int j;
    private hj k;
    public static boolean d;
    public static boolean e;
    private boolean[] l = new boolean[this.h];

    static {
        d = false;
        e = false;
    }

    public static dm b() {
        if (a == null) {
            a = new dm();
        }
        return a;
    }

    public final void a() {
        this.e();
        this.k = main.a.r;
        super.a();
        this.f();
    }

    public final void a(int n2, int n3) {
        switch (n2) {
            case 0: {
                dm dm2 = this;
                dm2.b(dm2.c);
                dm2.k.a();
            }
        }
    }

    public final void e() {
        this.ac = new by(kf.aV, 0);
        this.j = hj.av;
        this.i = main.a.n;
        int n2 = je.o + (gy.Z << 1);
        if (this.l != null) {
            int n3 = 0;
            while (n3 < this.l.length) {
                if (this.l[n3]) {
                    n2 += this.j;
                }
                ++n3;
            }
            n3 = 176;
            if (main.a.m < 176) {
                n3 = main.a.m;
            }
            je.a().a(kf.ab, n3 * gy.Y, n2, 1);
            if (main.a.r != this) {
                n2 = 0;
                while (n2 < 3) {
                    this.l[n2] = true;
                    ++n2;
                }
                if (main.a.E) {
                    this.l[3] = true;
                }
                this.b = new int[this.h];
            }
        }
    }

    public final void b(int n2) {
        this.c = n2;
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeByte(n2);
            int n3 = 0;
            while (n3 < this.h) {
                dataOutputStream.writeByte(this.b[n3]);
                ++n3;
            }
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
        }
        try {
            aw.a("avatarShowName", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        this.g();
        q.a.a(n2 / 10);
    }

    public final void f() {
        this.e();
        DataInputStream dataInputStream = fx.a("avatarShowName");
        d = false;
        if (dataInputStream == null) {
            return;
        }
        try {
            this.c = dataInputStream.readByte();
            this.b = new int[this.h];
            int n2 = 0;
            while (n2 < this.h) {
                this.b[n2] = dataInputStream.readByte();
                if (this.b[n2] > 1) {
                    this.b[n2] = 0;
                }
                ++n2;
            }
            dataInputStream.close();
        }
        catch (Exception exception) {
            fx.b("avatarShowName");
        }
        this.g();
        q.a.a(this.c / 10);
    }

    private void g() {
        if (main.a.E) {
            e = this.b[3] == 1;
        }
        main.a.a();
    }

    public final void l() {
        super.l();
        if (main.a.a(2)) {
            this.c(-1);
        } else if (main.a.a(8)) {
            this.c(1);
        } else if (main.a.a(4)) {
            this.e(-1);
        } else if (main.a.a(6)) {
            this.e(1);
        }
        if (main.a.g && main.a.a(je.a().g, je.a().h, je.a().f, je.a().e)) {
            main.a.g = false;
            if (main.a.a(je.a().g, je.a().h, je.a().f, je.a().e)) {
                int n2;
                int n3 = n2 = (main.a.i - (je.a().h + je.o + gy.Z)) / this.j;
                while (n3 >= 0) {
                    if (!this.l[n3]) {
                        ++n2;
                    }
                    --n3;
                }
                if (n2 == this.g) {
                    if (this.b[this.g] == 1) {
                        this.e(-1);
                    } else {
                        this.e(1);
                    }
                }
                if (n2 >= this.h) {
                    n2 = this.h - 1;
                }
                this.g = n2;
            }
        }
    }

    private void c(int n2) {
        while (true) {
            this.g += n2;
            if (this.g < 0) {
                this.g = this.h - 1;
            }
            if (this.g >= this.h) {
                this.g = 0;
            }
            if (this.l[this.g]) break;
            n2 /= aw.f(n2);
        }
    }

    private void e(int n2) {
        if (this.g == 2) {
            this.c += n2 * 10;
            if (this.c < 0) {
                this.c = 100;
            }
            if (this.c > 100) {
                this.c = 0;
                return;
            }
        } else {
            if (this.b[this.g] == 0) {
                this.b[this.g] = 1;
                return;
            }
            this.b[this.g] = 0;
        }
    }

    public final void k() {
        this.k.k();
        if (this.i != 0) {
            this.i += -this.i >> 1;
            if (this.i < 0) {
                this.i = 0;
            }
        }
    }

    public final void a(Graphics graphics) {
        this.k.b(graphics);
        this.b(graphics);
        super.a(graphics);
    }

    public final void b(Graphics graphics) {
        graphics.translate(-graphics.getTranslateX(), -graphics.getTranslateY());
        graphics.translate(0, this.i);
        je.a().a(graphics);
        graphics.translate(main.a.o - 65, je.a().h + je.o + gy.Z);
        if (this.f >= 4) {
            this.f = 0;
        }
        int n2 = -gy.ah / 2 + this.j / 2;
        int n3 = 0;
        int n4 = 0;
        while (n4 < this.h) {
            if (this.l[n4]) {
                main.a.K.a(graphics, kf.eG[n4][2], -50 * (gy.Y - 1), n3 + n2, 0);
                main.a.K.a(graphics, kf.eG[n4][this.b[n4]], 52 + 50 * gy.Y, n3 + n2 - 1, 2);
                int n5 = 0;
                int n6 = main.a.K.a(kf.eG[n4][this.b[n4]]) + 10 + 15 * (main.a.Z + 1) + je.b.a;
                if (n6 < 25 * gy.Y) {
                    n6 = 25 * gy.Y;
                }
                if (n4 == this.g) {
                    n5 = 1;
                }
                int n7 = n3 + n2 + gy.ah / 2 - je.b.b / 2;
                je.b.a(n5, 52 + 50 * gy.Y - n6 / 2, n7, 0, graphics);
                je.b.a(n5, 52 + 50 * gy.Y + n6 / 2 - je.b.a, n7, 2, graphics);
                n3 += this.j;
            }
            ++n4;
        }
        main.a.K.a(graphics, String.valueOf(this.c), 52 + 50 * gy.Y, 2 * this.j + n2, 2);
        ++this.f;
    }
}


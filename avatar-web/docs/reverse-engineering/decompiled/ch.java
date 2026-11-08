/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class ch
implements ii {
    private jd a;
    private final String b;
    private final dx[] c;

    ch(jd jd2, String string, dx[] dxArray) {
        this.a = jd2;
        this.b = string;
        this.c = dxArray;
    }

    public final void a() {
        String string = this.c[1].f();
        String string2 = this.c[0].f();
        String string3 = this.b;
        jd jd2 = this.a;
        if (string2.equals("")) {
            main.a.b(kf.en[0]);
            return;
        }
        if (string.equals("")) {
            main.a.b(kf.en[1]);
            return;
        }
        cx.a().b(string3, string2, string);
        jd2.a((int)jd2.ac.c, jd2.ac.e);
        main.a.i();
    }
}


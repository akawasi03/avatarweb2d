/*
 * Decompiled with CFR 0.152.
 */
import main.GameMidlet;

final class gi
implements ii {
    final ei a;
    private final int b;
    private final String c;

    gi(ei ei2, int n2, String string) {
        this.a = ei2;
        this.b = n2;
        this.c = string;
    }

    public final void a() {
        ei.a(this.a);
        if (ei.b(this.a) != -1) {
            ei.a(this.a, ei.b(this.a));
            ei.b(this.a, ei.c(this.a));
            GameMidlet.i.aw = ei.b(this.a) * 24;
            GameMidlet.i.ax = ei.c(this.a) * 24;
            do.a().a(GameMidlet.i.aw * gy.Y, GameMidlet.i.ax * gy.Y);
        }
        ei.b = true;
        ei.e = true;
        ei.c(this.a, this.b);
        this.a.ad = new by(kf.cS, new gh(this, this.b, this.c));
        this.a.ac = null;
        this.a.ae = null;
    }
}


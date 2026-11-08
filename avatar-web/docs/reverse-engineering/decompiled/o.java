/*
 * Decompiled with CFR 0.152.
 */
import main.a;

final class o
implements ii {
    o(ae ae2) {
    }

    public final void a() {
        int n2 = ea.b().e;
        if (a.a(8)) {
            if (n2 == 0) {
                n2 = 5;
            } else if (n2 == 1) {
                n2 = 4;
            } else if (n2 == 3) {
                n2 = 6;
            } else if (n2 == 2) {
                n2 = 7;
            } else if (n2 == 4) {
                n2 = 7;
            }
            ea.b().m = true;
        } else if (a.a(2)) {
            if (n2 == 4) {
                n2 = 1;
            } else if (n2 == 5) {
                n2 = 0;
            } else if (n2 == 6) {
                n2 = 3;
            } else if (n2 == 7) {
                n2 = 4;
            } else if (n2 == 3) {
                n2 = 0;
            }
            ea.b().m = true;
        } else if (a.a(6)) {
            if (n2 == 0) {
                n2 = 3;
            } else if (n2 == 1) {
                n2 = 2;
            } else if (n2 == 3) {
                n2 = 4;
            } else if (n2 == 4) {
                n2 = 2;
            } else if (n2 == 6) {
                n2 = 7;
            } else if (n2 == 5) {
                n2 = 3;
            }
            ea.b().m = true;
        } else if (a.a(4)) {
            if (n2 == 1) {
                n2 = 3;
            } else if (n2 == 2) {
                n2 = 1;
            } else if (n2 == 3) {
                n2 = 0;
            } else if (n2 == 6) {
                n2 = 5;
            } else if (n2 == 7) {
                n2 = 6;
            } else if (n2 == 4) {
                n2 = 3;
            }
            ea.b().m = true;
        }
        if (ea.b().m) {
            ea.b().e = n2;
        }
    }
}


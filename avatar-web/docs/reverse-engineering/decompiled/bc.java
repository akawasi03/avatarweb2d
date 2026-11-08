/*
 * Decompiled with CFR 0.152.
 */
public final class bc
extends cc {
    public String a;
    public String b;
    public int c;
    private int h = 1;
    public int d = 0;
    public int e = 0;

    public bc() {
    }

    public bc(String string, int n2) {
        this.a = string;
        this.c = n2;
    }

    public bc(int n2, int n3, String string) {
        this.aw = n2;
        this.ax = n3;
        this.a = string;
    }

    public final void a(int n2) {
        this.d += this.h;
        if (this.d > this.c - n2) {
            this.d = -20;
        }
    }
}


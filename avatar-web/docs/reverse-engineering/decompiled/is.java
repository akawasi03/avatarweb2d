/*
 * Decompiled with CFR 0.152.
 */
public class is
extends ai {
    public int t = 0;
    public byte u;

    public is(int n2, int n3, int n4, byte by2) {
        super(0, 0, n4, by2);
    }

    public void b() {
        super.b();
    }

    public final void f() {
        super.f();
        if (!this.f && this.w == this.t && this.c > 150) {
            this.c = 150;
        }
    }

    public void a() {
    }

    public dn i() {
        dn dn2 = (dn)go.j[this.u].elementAt(aw.e(go.j[this.u].size()));
        return dn2;
    }

    public final void c() {
        if (!this.f && this.t == this.w) {
            this.g();
            return;
        }
        Object object = new dr();
        if (this.f && go.j[this.u].size() > 0) {
            Object object2 = this.i();
            if (object2 != null) {
                ((dr)object).a = ((js)object2).aw;
                ((dr)object).b = ((js)object2).ax;
                this.G = 2;
                object2 = object;
                object = this;
                this.n = object2;
                return;
            }
            this.g();
            return;
        }
        int n2 = ir.m.size();
        int n3 = 0;
        while (n3 < n2) {
            gx gx2 = (gx)ir.m.elementAt(n3);
            if (gx2 instanceof is && gx2.w == this.t) {
                object = new dr(gx2.aw, gx2.ax);
                break;
            }
            ++n3;
        }
        if (this.u != 1 && !ir.b(this.aw, this.ax)) {
            this.g();
            return;
        }
        this.a((dr)object);
    }

    public void a(dr dr2) {
    }

    public final void h() {
        int n2 = go.j[this.u].size();
        if (this.i && this.f && n2 > 0) {
            int n3 = 0;
            while (n3 < n2) {
                dn dn2 = (dn)go.j[this.u].elementAt(n3);
                if (aw.f(dn2.aw - this.aw) <= 2 && aw.f(dn2.ax - this.ax) <= 2) {
                    go.j[this.u].removeElement(dn2);
                    ir.n.removeElement(dn2);
                    this.i = false;
                    this.f = false;
                    this.G = 1;
                    go.b();
                    go.a(dn2.j, this.w);
                    break;
                }
                ++n3;
            }
        }
        super.h();
        this.e = 100 - (this.t != this.w ? this.u * aw.e(70) : 0);
    }

    public final void d() {
        if (go.j[this.u].size() == 0) {
            this.f = false;
            return;
        }
        if (!this.i || this.f) {
            return;
        }
        this.f = true;
    }
}


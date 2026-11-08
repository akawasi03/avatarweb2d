/*
 * Decompiled with CFR 0.152.
 */
final class kh
implements Runnable {
    private dy a;

    kh(dy dy2) {
        this.a = dy2;
    }

    public final void run() {
        try {
            Thread.sleep(20000L);
        }
        catch (InterruptedException interruptedException) {
            System.out.println("ERROR 1111111111");
        }
        dy dy2 = this.a;
        if (dy2.a.d) {
            try {
                dy2 = this.a;
                kt.a(dy2.a).close();
                dy2 = this.a;
                au.a(kt.b(dy2.a)).removeAllElements();
            }
            catch (Exception exception) {}
            kt.l = true;
            dy2 = this.a;
            this.a.a.d = false;
            dy2 = this.a;
            this.a.a.c = false;
            dy2 = this.a;
            dy2.a.b.b();
        }
    }
}


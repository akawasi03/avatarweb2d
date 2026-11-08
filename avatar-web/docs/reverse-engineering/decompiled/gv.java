/*
 * Decompiled with CFR 0.152.
 */
final class gv
implements Runnable {
    private kt a;

    gv(kt kt2) {
        this.a = kt2;
    }

    /*
     * Unable to fully structure code
     * Enabled aggressive block sorting
     * Enabled unnecessary exception pruning
     * Enabled aggressive exception aggregation
     */
    public final void run() {
        block16: {
            block15: {
                try lbl-1000:
                // 3 sources

                {
                    while (this.a.b()) {
                        var1_1 = this;
                        var2_2 = var1_1.a.a.readByte();
                        if (var1_1.a.h) {
                            var2_2 = kt.a(var1_1.a, var2_2);
                        }
                        if (var1_1.a.h) {
                            var4_5 = var1_1.a.a.readByte();
                            var5_6 = var1_1.a.a.readByte();
                            var3_3 = (kt.a(var1_1.a, var4_5) & 255) << 8 | kt.a(var1_1.a, (byte)var5_6) & 255;
                        } else {
                            var3_3 = var1_1.a.a.readUnsignedShort();
                        }
                        var4_4 = new byte[var3_3];
                        var5_6 = 0;
                        var6_7 = 0;
                        while (true) {
                            block17: {
                                if (var5_6 != -1 && var6_7 < var3_3) break block17;
                                if (!var1_1.a.h) break block15;
                                var7_9 = 0;
                                if (true) ** GOTO lbl34
                            }
                            var5_6 = var1_1.a.a.read(var4_4, var6_7, var3_3 - var6_7);
                            if (var5_6 <= 0) continue;
                            var1_1.a.g += (var6_7 += var5_6) + 5;
                            var7_9 = kt.a().g + kt.a().f;
                            var1_1.a.k = String.valueOf(var7_9 / 1024) + "." + var7_9 % 1024 / 102 + "Kb";
                        }
                    }
                    break block16;
                }
                catch (Exception v0) {}
                break block16;
                do {
                    var4_4[var7_9] = kt.a(var1_1.a, var4_4[var7_9]);
                    ++var7_9;
lbl34:
                    // 2 sources

                } while (var7_9 < var4_4.length);
            }
            var7_8 = new jr(var2_2, var4_4);
            var1_1 = var7_8;
            if (var7_8 == null) break block16;
            try {
                block18: {
                    if (var1_1.a != -27) break block18;
                    this.a((jr)var1_1);
                    ** GOTO lbl-1000
                }
                this.a.b.a((jr)var1_1);
            }
            catch (Exception v1) {
                var1_1 = v1;
                v1.printStackTrace();
            }
            ** GOTO lbl-1000
        }
        if (this.a.c) {
            if (this.a.b != null) {
                if (System.currentTimeMillis() - this.a.j > 500L) {
                    this.a.b.c();
                } else {
                    this.a.b.b();
                }
            }
            if (kt.a(this.a) != null) {
                kt.c(this.a);
            }
        }
    }

    private void a(jr jr2) {
        int n2 = jr2.b().readByte();
        this.a.i = new byte[n2];
        int n3 = 0;
        while (n3 < n2) {
            this.a.i[n3] = jr2.b().readByte();
            ++n3;
        }
        n3 = 0;
        while (n3 < this.a.i.length - 1) {
            int n4 = n3 + 1;
            this.a.i[n4] = (byte)(this.a.i[n4] ^ this.a.i[n3]);
            ++n3;
        }
        this.a.h = true;
    }
}


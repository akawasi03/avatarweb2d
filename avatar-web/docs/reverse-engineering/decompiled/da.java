/*
 * Decompiled with CFR 0.152.
 */
public final class da
implements kk {
    public static da a;

    public final void a(jr jr2) {
        try {
            byte by2 = jr2.b().readByte();
            byte by3 = jr2.b().readByte();
            if (!kx.a(by2, by3)) {
                return;
            }
            switch (jr2.a) {
                case 20: {
                    ja.a.e = by2 = jr2.b().readByte();
                    ja.a.b(by2);
                    return;
                }
                case 21: {
                    by2 = jr2.b().readByte();
                    if (by2 == -1) {
                        ja.a.m();
                        ja.a.f = false;
                        return;
                    }
                    if (by2 != -1) {
                        by3 = 0;
                        while (by3 < 6) {
                            ja.a.d[by2][by3] = jr2.b().readByte();
                            ++by3;
                        }
                        ja.a.c(by2);
                        return;
                    }
                    break;
                }
                case 49: {
                    return;
                }
                case 37: {
                    byte[] byArray = new byte[3];
                    by2 = 0;
                    while (by2 < 3) {
                        byArray[by2] = jr2.b().readByte();
                        ++by2;
                    }
                    ja.a.a(byArray);
                    kx.o();
                    return;
                }
                case 100: {
                    by2 = jr2.b().readByte();
                    ja.a.a(by2);
                    return;
                }
                case 65: {
                    by2 = jr2.b().readByte();
                    by3 = jr2.b().readByte();
                    byte by4 = jr2.b().readByte();
                    byte by5 = jr2.b().readByte();
                    if (by3 != by4 && by5 > 0) {
                        ja.a.d[by2][by4] = by5;
                        ja.a.a(by2, by3, by4);
                        return;
                    }
                    break;
                }
                case 60: {
                    by2 = jr2.b().readByte();
                    by3 = jr2.b().readByte();
                    int n2 = jr2.b().readInt();
                    ja.a.a(by2, by3, n2);
                    return;
                }
                case 51: {
                    int[] nArray = new int[kx.m.size()];
                    by3 = 0;
                    while (by3 < nArray.length) {
                        nArray[by3] = jr2.b().readInt();
                        ++by3;
                    }
                    ja.a.a(nArray);
                    return;
                }
                case 62: {
                    ja.a.e = by2 = jr2.b().readByte();
                    by3 = 0;
                    while (by3 < kx.m.size()) {
                        by2 = 0;
                        while (by2 < 6) {
                            ja.a.d[by3][by2] = jr2.b().readByte();
                            ++by2;
                        }
                        ++by3;
                    }
                    ja.a.i();
                }
                default: {
                    return;
                }
            }
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
    }
}


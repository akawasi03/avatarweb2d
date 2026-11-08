/*
 * Decompiled with CFR 0.152.
 */
public final class cv {
    public static void a(byte[] byArray) {
        int n2 = 0;
        while (n2 < byArray.length - 1) {
            int n3 = n2 + 1;
            while (n3 < byArray.length) {
                if (byArray[n2] > byArray[n3]) {
                    byte by2 = byArray[n2];
                    byArray[n2] = byArray[n3];
                    byArray[n3] = by2;
                }
                ++n3;
            }
            ++n2;
        }
    }

    public static byte b(byte[] byArray) {
        boolean bl2;
        block23: {
            boolean bl3;
            int n2;
            byte[] byArray2;
            block22: {
                boolean bl4;
                block21: {
                    byArray2 = byArray;
                    if (byArray.length == 1) {
                        return 0;
                    }
                    byArray2 = byArray;
                    if (byArray.length == 2 && byArray2[0] / 4 == byArray2[1] / 4) {
                        return 2;
                    }
                    byArray2 = byArray;
                    if (byArray.length == 3 && byArray2[0] / 4 == byArray2[1] / 4 && byArray2[1] / 4 == byArray2[2] / 4) {
                        return 3;
                    }
                    byArray2 = byArray;
                    if (byArray.length != 6) {
                        bl4 = false;
                    } else {
                        n2 = 1;
                        while (n2 < byArray2.length) {
                            if (n2 % 2 == 1 && byArray2[n2 - 1] / 4 != byArray2[n2] / 4) {
                                bl4 = false;
                                break block21;
                            }
                            if (n2 % 2 == 0 && byArray2[n2 - 1] / 4 != byArray2[n2] / 4 - 1) {
                                bl4 = false;
                                break block21;
                            }
                            ++n2;
                        }
                        bl4 = true;
                    }
                }
                if (bl4) {
                    return 4;
                }
                byArray2 = byArray;
                if (byArray.length != 8) {
                    bl3 = false;
                } else {
                    n2 = 1;
                    while (n2 < byArray2.length) {
                        if (n2 % 2 == 1 && byArray2[n2 - 1] / 4 != byArray2[n2] / 4) {
                            bl3 = false;
                            break block22;
                        }
                        if (n2 % 2 == 0 && byArray2[n2 - 1] / 4 != byArray2[n2] / 4 - 1) {
                            bl3 = false;
                            break block22;
                        }
                        ++n2;
                    }
                    bl3 = true;
                }
            }
            if (bl3) {
                return 5;
            }
            byArray2 = byArray;
            if (byArray.length == 4 && byArray2[0] / 4 == byArray2[1] / 4 && byArray2[1] / 4 == byArray2[2] / 4 && byArray2[2] / 4 == byArray2[3] / 4) {
                return 6;
            }
            byArray2 = byArray;
            if (byArray.length < 3) {
                bl2 = false;
            } else {
                n2 = 1;
                while (n2 < byArray2.length) {
                    if (byArray2[n2 - 1] / 4 != byArray2[n2] / 4 - 1) {
                        bl2 = false;
                        break block23;
                    }
                    ++n2;
                }
                bl2 = byArray2[byArray2.length - 1] / 4 != 12;
            }
        }
        if (bl2) {
            return 1;
        }
        return -1;
    }
}


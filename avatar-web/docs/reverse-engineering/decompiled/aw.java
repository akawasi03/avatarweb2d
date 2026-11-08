/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Image
 *  javax.microedition.rms.RecordStore
 */
import java.io.InputStream;
import java.util.Random;
import javax.microedition.lcdui.Image;
import javax.microedition.rms.RecordStore;
import main.GameMidlet;

public final class aw {
    public static Random a = new Random();
    private static short[] c;
    private static short[] d;
    private static int[] e;
    public static String b;

    static {
        short[] sArray = new short[91];
        sArray[1] = 18;
        sArray[2] = 36;
        sArray[3] = 54;
        sArray[4] = 71;
        sArray[5] = 89;
        sArray[6] = 107;
        sArray[7] = 125;
        sArray[8] = 143;
        sArray[9] = 160;
        sArray[10] = 178;
        sArray[11] = 195;
        sArray[12] = 213;
        sArray[13] = 230;
        sArray[14] = 248;
        sArray[15] = 265;
        sArray[16] = 282;
        sArray[17] = 299;
        sArray[18] = 316;
        sArray[19] = 333;
        sArray[20] = 350;
        sArray[21] = 367;
        sArray[22] = 384;
        sArray[23] = 400;
        sArray[24] = 416;
        sArray[25] = 433;
        sArray[26] = 449;
        sArray[27] = 465;
        sArray[28] = 481;
        sArray[29] = 496;
        sArray[30] = 512;
        sArray[31] = 527;
        sArray[32] = 543;
        sArray[33] = 558;
        sArray[34] = 573;
        sArray[35] = 587;
        sArray[36] = 602;
        sArray[37] = 616;
        sArray[38] = 630;
        sArray[39] = 644;
        sArray[40] = 658;
        sArray[41] = 672;
        sArray[42] = 685;
        sArray[43] = 698;
        sArray[44] = 711;
        sArray[45] = 724;
        sArray[46] = 737;
        sArray[47] = 749;
        sArray[48] = 761;
        sArray[49] = 773;
        sArray[50] = 784;
        sArray[51] = 796;
        sArray[52] = 807;
        sArray[53] = 818;
        sArray[54] = 828;
        sArray[55] = 839;
        sArray[56] = 849;
        sArray[57] = 859;
        sArray[58] = 868;
        sArray[59] = 878;
        sArray[60] = 887;
        sArray[61] = 896;
        sArray[62] = 904;
        sArray[63] = 912;
        sArray[64] = 920;
        sArray[65] = 928;
        sArray[66] = 935;
        sArray[67] = 943;
        sArray[68] = 949;
        sArray[69] = 956;
        sArray[70] = 962;
        sArray[71] = 968;
        sArray[72] = 974;
        sArray[73] = 979;
        sArray[74] = 984;
        sArray[75] = 989;
        sArray[76] = 994;
        sArray[77] = 998;
        sArray[78] = 1002;
        sArray[79] = 1005;
        sArray[80] = 1008;
        sArray[81] = 1011;
        sArray[82] = 1014;
        sArray[83] = 1016;
        sArray[84] = 1018;
        sArray[85] = 1020;
        sArray[86] = 1022;
        sArray[87] = 1023;
        sArray[88] = 1023;
        sArray[89] = 1024;
        sArray[90] = 1024;
        c = sArray;
    }

    public static void a() {
        d = new short[91];
        e = new int[91];
        int n2 = 0;
        while (n2 <= 90) {
            aw.d[n2] = c[90 - n2];
            aw.e[n2] = d[n2] == 0 ? Integer.MAX_VALUE : (c[n2] << 10) / d[n2];
            ++n2;
        }
    }

    public static final int a(int n2) {
        if ((n2 = aw.c(n2)) >= 0 && n2 < 90) {
            return c[n2];
        }
        if (n2 >= 90 && n2 < 180) {
            return c[180 - n2];
        }
        if (n2 >= 180 && n2 < 270) {
            return -c[n2 - 180];
        }
        return -c[360 - n2];
    }

    public static final int b(int n2) {
        if ((n2 = aw.c(n2)) >= 0 && n2 < 90) {
            return d[n2];
        }
        if (n2 >= 90 && n2 < 180) {
            return -d[180 - n2];
        }
        if (n2 >= 180 && n2 < 270) {
            return -d[n2 - 180];
        }
        return d[360 - n2];
    }

    public static final int a(int n2, int n3) {
        int n4;
        block6: {
            int n5;
            block7: {
                block5: {
                    block4: {
                        int n6;
                        if (n2 == 0) break block5;
                        n4 = Math.abs((n3 << 10) / n2);
                        int n7 = 0;
                        while (n7 <= 90) {
                            if (e[n7] >= n4) {
                                n6 = n7;
                                break block4;
                            }
                            ++n7;
                        }
                        n6 = n4 = 0;
                    }
                    if (n3 >= 0 && n2 < 0) {
                        n4 = 180 - n4;
                    }
                    if (n3 < 0 && n2 < 0) {
                        n4 += 180;
                    }
                    if (n3 >= 0 || n2 < 0) break block6;
                    n5 = 360 - n4;
                    break block7;
                }
                n5 = n3 > 0 ? 90 : 270;
            }
            n4 = n5;
        }
        return n4;
    }

    public static final int c(int n2) {
        if (n2 >= 360) {
            n2 -= 360;
        }
        if (n2 < 0) {
            n2 += 360;
        }
        return n2;
    }

    public static int d(int n2) {
        return a.nextInt() % 2;
    }

    public static int e(int n2) {
        return a.nextInt(n2);
    }

    public static int b(int n2, int n3) {
        int n4 = a.nextInt(2);
        if (n4 == 0) {
            return n2;
        }
        return n3;
    }

    public static int f(int n2) {
        if (n2 >= 0) {
            return n2;
        }
        return -n2;
    }

    public static void b() {
        GameMidlet.n = aw.b(je.k);
        dp.i = aw.b(GameMidlet.m);
        ae.j = aw.b(b);
    }

    public static int a(int n2, int n3, int n4, int n5) {
        if ((n2 = (n2 - n4) * (n2 - n4) + (n3 - n5) * (n3 - n5)) <= 0) {
            return 0;
        }
        n3 = (n2 + 1) / 2;
        while (Math.abs((n4 = n3) - (n3 = n3 / 2 + n2 / (n3 * 2))) > 1) {
        }
        return n3;
    }

    private static byte[] b(byte[] byArray) {
        if (byArray != null) {
            int n2 = 0;
            while (n2 < byArray.length) {
                byArray[n2] = ~byArray[n2];
                ++n2;
            }
        }
        return byArray;
    }

    public static void a(String string, byte[] byArray) {
        byArray = aw.b(byArray);
        if ((string = RecordStore.openRecordStore((String)("2.5.8" + string), (boolean)true)).getNumRecords() > 0) {
            string.setRecord(1, byArray, 0, byArray.length);
        } else {
            string.addRecord(byArray, 0, byArray.length);
        }
        string.closeRecordStore();
    }

    public static byte[] a(String string) {
        byte[] byArray;
        try {
            string = RecordStore.openRecordStore((String)("2.5.8" + string), (boolean)false);
            byArray = string.getRecord(1);
            string.closeRecordStore();
        }
        catch (Exception exception) {
            return null;
        }
        return aw.b(byArray);
    }

    public static void a(String object, String string) {
        try {
            aw.a((String)object, string.getBytes("UTF-8"));
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static String b(String object) {
        byte[] byArray = aw.a((String)object);
        object = byArray;
        if (byArray == null) {
            return null;
        }
        try {
            String string = new String((byte[])object, "UTF-8");
            return string;
        }
        catch (Exception exception) {
            return new String((byte[])object);
        }
    }

    public static Image a(int n2, int n3, int n4, int n5, Image image) {
        int[] nArray = new int[n4 * n5];
        image.getRGB(nArray, 0, n4, n2, n3, n4, n5);
        return Image.createRGBImage((int[])nArray, (int)n4, (int)n5, (boolean)true);
    }

    public static Image a(byte[] byArray) {
        return Image.createImage((byte[])byArray, (int)0, (int)byArray.length);
    }

    public static void c() {
        es.s = 1;
        int n2 = 0;
        while (n2 < go.b().K.size()) {
            by by2 = (by)go.b().K.elementAt(n2);
            es.s += by2.a.hashCode();
            ++n2;
        }
        es.b().g();
    }

    public static Image a(byte[] byArray, byte[] byArray2) {
        byte[] byArray3 = new byte[byArray.length + byArray2.length];
        System.arraycopy(byArray, 0, byArray3, 0, byArray.length);
        System.arraycopy(byArray2, 0, byArray3, byArray.length, byArray2.length);
        byArray = byArray3;
        return Image.createImage((byte[])byArray3, (int)0, (int)byArray.length);
    }

    public static InputStream c(String string) {
        return "".getClass().getResourceAsStream(string);
    }

    public static Image a(Image image, int n2) {
        int n3 = image.getWidth();
        int n4 = image.getHeight();
        int[] nArray = new int[n3 * n4];
        image.getRGB(nArray, 0, n3, 0, 0, n3, n4);
        int n5 = 0;
        while (n5 < nArray.length) {
            if (nArray[n5] == n2) {
                nArray[n5] = 0xFFFFFF;
            }
            ++n5;
        }
        return Image.createRGBImage((int[])nArray, (int)n3, (int)n4, (boolean)true);
    }
}


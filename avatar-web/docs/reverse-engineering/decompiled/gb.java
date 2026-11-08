/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 */
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import main.GameMidlet;
import main.a;

public final class gb {
    private static byte i;
    private static short[] j;
    private static int k;
    private static int l;
    public static ke[] a;
    public static cb[] b;
    public static Image[] c;
    private static dc[] m;
    public static Vector d;
    public static Vector e;
    public static Vector f;
    public static Hashtable g;
    public static int h;

    static {
        d = new Vector();
        e = new Vector();
        f = new Vector();
        g = new Hashtable();
        h = -1;
    }

    public static void a() {
        h = -1;
    }

    public static void a(byte n2, short[] sArray, int n3, int n4) {
        Object[] objectArray = aw.a("avatarVSFarm");
        if (objectArray != null) {
            InputStream inputStream = new ByteArrayInputStream((byte[])objectArray);
            inputStream = new DataInputStream(inputStream);
            try {
                l = ((DataInputStream)inputStream).readInt();
                k = ((DataInputStream)inputStream).readInt();
            }
            catch (IOException iOException) {
                fx.b("avatarVSFarm");
            }
        }
        h = 0;
        c = new Image[n2];
        if (!gb.g()) {
            i = n2;
            j = sArray;
            k = -1;
            l = -1;
            int n5 = 0;
            while (n5 < n2) {
                it.a().a((short)n5);
                ++h;
                ++n5;
            }
        } else if (i > 0) {
            int n6 = 0;
            while (n6 < i) {
                int n7 = n6;
                objectArray = aw.a("avatarImgBigFarm" + n7);
                gb.c[n6] = aw.a(objectArray);
                ++n6;
            }
        }
        int n8 = 0;
        while (n8 < i) {
            if (sArray[n8] != j[n8]) {
                it.a().a((short)n8);
                ++h;
            }
            ++n8;
        }
        n8 = n2 - i;
        if (n8 > 0) {
            objectArray = j;
            j = new short[sArray.length];
            int n9 = 0;
            while (n9 < objectArray.length) {
                gb.j[n9] = objectArray[n9];
                ++n9;
            }
            n9 = i;
            while (n9 < n2) {
                it.a().a((short)n9);
                ++h;
                ++n9;
            }
        }
        if (!gb.f()) {
            k = n3;
            it.a().b();
            ++h;
        } else if (k != n3) {
            k = n3;
            it.a().b();
            ++h;
        }
        if (!gb.e()) {
            l = n4;
            it.a().c();
            ++h;
        } else if (l != n4) {
            l = n4;
            it.a().c();
            ++h;
        }
        if (h == 0) {
            it.a().d();
        }
        aw.c();
    }

    public static void a(short s2, short s3, byte[] byArray) {
        --h;
        gb.j[s2] = s3;
        gb.c[s2] = aw.a(byArray);
        s3 = s2;
        byte[] byArray2 = byArray;
        try {
            aw.a("avatarImgBigFarm" + s3, byArray2);
        }
        catch (Exception exception) {}
        gb.b(i, j, k, l);
        if (h == 0) {
            it.a().d();
        }
    }

    public static void b() {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeInt(l);
            dataOutputStream.writeInt(k);
            aw.a("avatarVSFarm", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
            return;
        }
        catch (Exception exception) {
            return;
        }
    }

    private static void c(byte[] object) {
        int n2;
        object = new ByteArrayInputStream((byte[])object);
        DataInputStream dataInputStream = new DataInputStream((InputStream)object);
        object = dataInputStream;
        int n3 = dataInputStream.readShort();
        cb[] cbArray = new cb[n3];
        int n4 = 0;
        while (n4 < n3) {
            cbArray[n4] = new cb();
            cbArray[n4].b = ((DataInputStream)object).readByte();
            cbArray[n4].a = ((DataInputStream)object).readUTF();
            cbArray[n4].k = cbArray[n4].a.toLowerCase();
            cbArray[n4].d = new byte[2];
            cbArray[n4].d[0] = ((DataInputStream)object).readByte();
            cbArray[n4].d[1] = ((DataInputStream)object).readByte();
            cbArray[n4].e = ((DataInputStream)object).readShort();
            cbArray[n4].f = ((DataInputStream)object).readShort();
            cbArray[n4].g[0] = ((DataInputStream)object).readShort();
            cbArray[n4].h = ((DataInputStream)object).readShort();
            cbArray[n4].i = ((DataInputStream)object).readShort();
            cbArray[n4].c = new short[8];
            n2 = 0;
            while (n2 < cbArray[n4].c.length) {
                cbArray[n4].c[n2] = ((DataInputStream)object).readShort();
                ++n2;
            }
            ++n4;
        }
        n4 = ((DataInputStream)object).readShort();
        m = new dc[n4];
        n2 = 0;
        while (n2 < n4) {
            gb.m[n2] = new dc();
            gb.m[n2].a = ((DataInputStream)object).readByte();
            gb.m[n2].d[0] = ((DataInputStream)object).readShort();
            ++n2;
        }
        n2 = 0;
        while (n2 < n3) {
            cbArray[n2].g[1] = ((DataInputStream)object).readShort();
            ++n2;
        }
        n2 = 0;
        while (n2 < n4) {
            gb.m[n2].d[1] = ((DataInputStream)object).readShort();
            ++n2;
        }
        n2 = ((DataInputStream)object).readShort();
        d = new Vector();
        n4 = 0;
        while (n4 < n2) {
            ad ad2 = new ad();
            new ad().a = ((DataInputStream)object).readByte();
            ad2.l = ((DataInputStream)object).readUTF();
            ad2.m = ((DataInputStream)object).readUTF();
            ad2.e[0] = ((DataInputStream)object).readInt();
            ad2.e[1] = ((DataInputStream)object).readShort();
            ad2.d = ((DataInputStream)object).readShort();
            ad2.f = ((DataInputStream)object).readShort();
            int n5 = 0;
            while (n5 < 3) {
                ad2.j[n5] = ((DataInputStream)object).readShort();
                ++n5;
            }
            ad2.b = ((DataInputStream)object).readByte();
            n5 = 0;
            while (n5 < 3) {
                int n6 = 0;
                while (n6 < 12) {
                    ad2.k[n5][n6] = ((DataInputStream)object).readByte();
                    ++n6;
                }
                ++n5;
            }
            ad2.c = ((DataInputStream)object).readByte();
            ad2.g = ((DataInputStream)object).readShort();
            ad2.h = ((DataInputStream)object).readShort();
            ad2.i = ((DataInputStream)object).readShort();
            d.addElement(ad2);
            ++n4;
        }
        e = new Vector();
        n4 = ((DataInputStream)object).readByte();
        int n7 = 0;
        while (n7 < n4) {
            az az2 = new az();
            new az().c = true;
            az2.a = ((DataInputStream)object).readShort();
            az2.b = ((DataInputStream)object).readShort();
            az2.d = ((DataInputStream)object).readByte();
            az2.e = ((DataInputStream)object).readByte();
            az2.f = ((DataInputStream)object).readUTF();
            az2.g = ((DataInputStream)object).readShort();
            az2.h = ((DataInputStream)object).readShort();
            e.addElement(az2);
            ++n7;
        }
        n7 = ((DataInputStream)object).readByte();
        int n8 = 0;
        while (n8 < n7) {
            az az3 = new az();
            new az().c = false;
            az3.a = ((DataInputStream)object).readShort();
            az3.b = ((DataInputStream)object).readShort();
            az3.f = ((DataInputStream)object).readUTF();
            az3.g = ((DataInputStream)object).readShort();
            az3.h = ((DataInputStream)object).readShort();
            ++n8;
        }
        byte by2 = ((DataInputStream)object).readByte();
        n8 = by2;
        cb[] cbArray2 = new cb[by2];
        n4 = 0;
        while (n4 < n8) {
            cbArray2[n4] = new cb();
            cbArray2[n4].l = true;
            cbArray2[n4].b = ((DataInputStream)object).readShort();
            cbArray2[n4].a = ((DataInputStream)object).readUTF();
            cbArray2[n4].k = cbArray2[n4].a.toLowerCase();
            cbArray2[n4].e = ((DataInputStream)object).readShort();
            cbArray2[n4].g[0] = ((DataInputStream)object).readShort();
            cbArray2[n4].g[1] = ((DataInputStream)object).readShort();
            cbArray2[n4].j = ((DataInputStream)object).readShort();
            cbArray2[n4].i = ((DataInputStream)object).readShort();
            cbArray2[n4].m = ((DataInputStream)object).readByte();
            cbArray2[n4].c = new short[8];
            n2 = 0;
            while (n2 < cbArray2[n4].c.length) {
                cbArray2[n4].c[n2] = ((DataInputStream)object).readShort();
                ++n2;
            }
            ++n4;
        }
        n4 = ((DataInputStream)object).readShort();
        n2 = 0;
        while (n2 < n4) {
            hf hf2 = new hf();
            new hf().a = ((DataInputStream)object).readShort();
            hf2.d = ((DataInputStream)object).readUTF();
            hf2.b = ((DataInputStream)object).readShort();
            hf2.c = ((DataInputStream)object).readShort();
            int n9 = ((DataInputStream)object).readShort();
            hf2.e = new short[n9];
            hf2.f = new short[n9];
            int n10 = 0;
            while (n10 < n9) {
                hf2.e[n10] = ((DataInputStream)object).readShort();
                hf2.f[n10] = ((DataInputStream)object).readShort();
                ++n10;
            }
            f.addElement(hf2);
            ++n2;
        }
        n2 = ((DataInputStream)object).readByte();
        int n11 = 0;
        while (n11 < n2) {
            az az4 = new az();
            new az().c = false;
            az4.a = ((DataInputStream)object).readShort();
            az4.b = ((DataInputStream)object).readShort();
            az4.f = ((DataInputStream)object).readUTF();
            az4.g = ((DataInputStream)object).readInt();
            az4.h = ((DataInputStream)object).readInt();
            e.addElement(az4);
            ++n11;
        }
        b = new cb[n3 + n8];
        n11 = 0;
        while (n11 < n3) {
            gb.b[n11] = cbArray[n11];
            ++n11;
        }
        n11 = n3;
        while (n11 < n8 + n3) {
            gb.b[n11] = cbArray2[n11 - n3];
            ++n11;
        }
    }

    public static void c() {
        GameMidlet.l = (int)(System.currentTimeMillis() % 6L);
        dp.j();
        je.c();
        ea.f();
        String string = main.a.a(go.l, 8);
        go.l = "xac" + string;
        ae.j = String.valueOf(go.l) + GameMidlet.n + ea.i + main.a.a(GameMidlet.m, -3);
        int n2 = 0;
        while (n2 < GameMidlet.m.length() + GameMidlet.n.length()) {
            String string2;
            StringBuffer stringBuffer = new StringBuffer(String.valueOf(ae.j));
            int n3 = n2 - GameMidlet.l;
            String string3 = String.valueOf(main.a.a(GameMidlet.m, -3)) + main.a.a(GameMidlet.n, 2) + main.a.a(String.valueOf(je.k) + (n2 - 7) + "l", -3);
            if ((string3 = System.getProperty(String.valueOf(string3) + go.l.substring(3) + "ei")) != null) {
                es.t = String.valueOf(es.t) + je.k;
                string2 = "ig_" + GameMidlet.m + "y" + main.a.a(string3, GameMidlet.l) + n3 + "t251";
            } else {
                string3 = n3 % 2 == 0 ? String.valueOf(GameMidlet.n) + "tr" + GameMidlet.m + "3555d" + GameMidlet.l * 82 + "824d87" + n3 + "t250" : (n3 % 3 == 0 ? String.valueOf(GameMidlet.n) + "xs" + GameMidlet.l + GameMidlet.m + "11233r3yr7839" + GameMidlet.l * 93 + n3 + "t251" : String.valueOf(GameMidlet.n) + "fv" + GameMidlet.m + GameMidlet.l + "11233r8ddd" + GameMidlet.l * 121 + "srg" + n3 + "t252");
                es.t = String.valueOf(es.t) + GameMidlet.m;
                string2 = string3;
            }
            ae.j = stringBuffer.append(string2).toString();
            ea.i = String.valueOf(ea.i) + ae.j.substring(0, 2);
            ++n2;
        }
        je.c();
    }

    public static void a(byte[] byArray) {
        gb.c(byArray);
        aw.a("avatarTreeInfoFarm", byArray);
        if (--h == 0) {
            it.a().d();
        }
    }

    private static boolean e() {
        byte[] byArray = aw.a("avatarTreeInfoFarm");
        if (byArray == null) {
            return false;
        }
        try {
            gb.c(byArray);
        }
        catch (Exception exception) {
            fx.b("avatarTreeInfoFarm");
        }
        return true;
    }

    private static void d(byte[] object) {
        ke ke2;
        object = new ByteArrayInputStream((byte[])object);
        DataInputStream dataInputStream = new DataInputStream((InputStream)object);
        object = dataInputStream;
        int n2 = dataInputStream.readShort();
        Vector<ke> vector = new Vector<ke>();
        short s2 = 0;
        int n3 = 0;
        while (n3 < n2) {
            ke2 = new ke();
            new ke().a = ((DataInputStream)object).readShort();
            if (ke2.a > s2) {
                s2 = ke2.a;
            }
            ke2.b = ((DataInputStream)object).readShort();
            ke2.c = ((DataInputStream)object).readByte();
            ke2.d = ((DataInputStream)object).readByte();
            ke2.e = ((DataInputStream)object).readByte();
            ke2.f = ((DataInputStream)object).readByte();
            vector.addElement(ke2);
            ++n3;
        }
        a = new ke[s2 + 1];
        n3 = 0;
        while (n3 < n2) {
            gb.a[ke2.a] = ke2 = (ke)vector.elementAt(n3);
            ++n3;
        }
    }

    public static void b(byte[] byArray) {
        gb.d(byArray);
        aw.a("avatarImgFarm", byArray);
        if (--h == 0) {
            it.a().d();
        }
    }

    private static boolean f() {
        byte[] byArray = aw.a("avatarImgFarm");
        if (byArray == null) {
            return false;
        }
        try {
            gb.d(byArray);
        }
        catch (Exception exception) {
            fx.b("avatarImgFarm");
        }
        return true;
    }

    private static void b(byte by2, short[] sArray, int n2, int n3) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeByte(by2);
            dataOutputStream.writeInt(n2);
            dataOutputStream.writeInt(n3);
            n2 = 0;
            while (n2 < by2) {
                dataOutputStream.writeShort(sArray[n2]);
                ++n2;
            }
            byte[] byArray = byteArrayOutputStream.toByteArray();
            aw.a("avatarDataFarm", byArray);
            dataOutputStream.close();
            return;
        }
        catch (Exception exception) {
            return;
        }
    }

    private static boolean g() {
        DataInputStream dataInputStream = fx.a("avatarDataFarm");
        if (dataInputStream == null) {
            return false;
        }
        try {
            i = dataInputStream.readByte();
            k = dataInputStream.readInt();
            l = dataInputStream.readInt();
            j = new short[i];
            int n2 = 0;
            while (n2 < i) {
                gb.j[n2] = dataInputStream.readShort();
                ++n2;
            }
            dataInputStream.close();
        }
        catch (IOException iOException) {
            fx.b("avatarDataFarm");
        }
        return true;
    }

    public static dc a(int n2) {
        int n3 = 0;
        while (n3 < m.length) {
            if (gb.m[n3].a == n2) {
                return m[n3];
            }
            ++n3;
        }
        return null;
    }

    public static cb b(int n2) {
        int n3 = 0;
        while (n3 < b.length) {
            if (n2 == gb.b[n3].b) {
                return b[n3];
            }
            ++n3;
        }
        return null;
    }

    public static ad c(int n2) {
        int n3 = d.size();
        int n4 = 0;
        while (n4 < n3) {
            ad ad2 = (ad)d.elementAt(n4);
            if (ad2.a == n2) {
                return ad2;
            }
            ++n4;
        }
        return null;
    }

    public static cb d(int n2) {
        int n3 = 0;
        while (n3 < b.length) {
            if (gb.b[n3].b == n2) {
                return b[n3];
            }
            ++n3;
        }
        return null;
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        if (gb.a((short)((short)n2)).d != -1) {
            graphics.drawImage(gb.a((short)((short)n2)).a, n3, n4, n5);
        }
    }

    public static f a(short s2) {
        f f2 = (f)g.get("" + s2);
        if (f2 == null) {
            f2 = new f();
            g.put("" + s2, f2);
            it.a().c(s2);
        } else if (f2.d >= 0) {
            f2.d = (int)(System.currentTimeMillis() / 1000L);
        }
        return f2;
    }

    public static void d() {
        if (g.size() > 50) {
            Enumeration enumeration = g.keys();
            while (enumeration.hasMoreElements()) {
                String string = (String)enumeration.nextElement();
                f f2 = (f)g.get(string);
                if (f2.d == -1 || System.currentTimeMillis() / 1000L - (long)f2.d <= (long)main.a.V) continue;
                g.remove(string);
            }
        }
    }

    public static hf b(short s2) {
        int n2 = 0;
        while (n2 < f.size()) {
            hf hf2 = (hf)f.elementAt(n2);
            if (hf2.a == s2) {
                return hf2;
            }
            ++n2;
        }
        return null;
    }
}


/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 *  javax.microedition.lcdui.Image
 *  javax.microedition.rms.RecordStore
 */
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FilterInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Vector;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Image;
import javax.microedition.rms.RecordStore;
import main.GameMidlet;
import main.a;

public final class fx {
    private static int m;
    private static int n;
    private static int o;
    public static ke[] a;
    public static ld[] b;
    public static Vector c;
    private static Vector p;
    private static Hashtable q;
    private static Hashtable r;
    public static int d;
    public static Vector e;
    private static int s;
    private static int t;
    public static Vector f;
    public static Vector g;
    public static Hashtable h;
    public static Hashtable i;
    public static Hashtable j;
    public static Vector k;
    public static String l;
    private static String u;
    private static int v;

    static {
        p = new Vector();
        q = new Hashtable();
        d = -1;
        e = new Vector();
        f = new Vector();
        h = new Hashtable();
        i = new Hashtable();
        j = new Hashtable();
        k = new Vector();
        v = 0;
    }

    public static void a() {
        try {
            String[] stringArray = RecordStore.listRecordStores();
            if (stringArray != null) {
                int n2 = 0;
                while (n2 < stringArray.length) {
                    RecordStore.deleteRecordStore((String)stringArray[n2]);
                    ++n2;
                }
                return;
            }
        }
        catch (Exception exception) {}
    }

    public static void a(Vector vector, int n2, int n3, int n4, int n5, int n6) {
        aw.a("avatar", "2.5.8");
        try {
            boolean bl2;
            boolean bl3;
            boolean bl4;
            boolean bl5;
            int n7;
            d = 0;
            Object object = aw.a("avatarVs");
            if (object != null) {
                object = new ByteArrayInputStream((byte[])object);
                DataInputStream dataInputStream = new DataInputStream((InputStream)object);
                object = dataInputStream;
                n = dataInputStream.readInt();
                s = ((DataInputStream)object).readInt();
                m = ((DataInputStream)object).readInt();
                o = ((DataInputStream)object).readInt();
                t = ((DataInputStream)object).readInt();
            }
            if (!fx.i()) {
                p = vector;
                n7 = vector.size();
                int n8 = 0;
                while (n8 < n7) {
                    ah ah2 = (ah)vector.elementAt(n8);
                    iy.a().a(ah2.a);
                    ++d;
                    ++n8;
                }
            } else {
                n7 = vector.size();
                int n9 = 0;
                while (n9 < n7) {
                    ah ah3 = (ah)vector.elementAt(n9);
                    ah ah4 = fx.d((int)ah3.a);
                    if (ah4 == null) {
                        p.addElement(ah3);
                        iy.a().a(ah3.a);
                        ++d;
                    } else if (ah3.b != ah4.b) {
                        iy.a().a(ah3.a);
                        ++d;
                    }
                    ++n9;
                }
            }
            byte[] byArray = aw.a("avatarImgData");
            l = aw.b("partImageNormal");
            if (byArray == null) {
                bl5 = false;
            } else {
                a = fx.g(byArray);
                bl5 = true;
            }
            if (!bl5) {
                m = n2;
                iy.a().c();
                ++d;
            } else if (m != n2) {
                m = n2;
                iy.a().c();
                ++d;
            }
            if (!fx.j()) {
                n = n3;
                iy.a().d();
                ++d;
            } else if (n != n3) {
                n = n3;
                iy.a().d();
                ++d;
            } else {
                fx.k();
            }
            byArray = aw.a("avatarItemInfo");
            if (byArray == null) {
                bl4 = false;
            } else {
                fx.f(byArray);
                bl4 = true;
            }
            if (!bl4) {
                o = n4;
                iy.a().e();
                ++d;
            } else if (o != n4) {
                o = n4;
                iy.a().e();
                ++d;
            }
            byArray = aw.a("avatarMapItemType");
            if (byArray == null) {
                bl3 = false;
            } else {
                e = fx.h(byArray);
                bl3 = true;
            }
            if (!bl3) {
                s = n5;
                iy.a().f();
                ++d;
            } else if (s != n5) {
                s = n5;
                iy.a().f();
                ++d;
            }
            byArray = aw.a("avatarMapType");
            if (byArray == null) {
                bl2 = false;
            } else {
                fx.i(byArray);
                bl2 = true;
            }
            if (!bl2) {
                t = n6;
                iy.a().g();
                ++d;
            } else if (t != n6) {
                t = n6;
                iy.a().g();
                ++d;
            }
            fx.l();
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static void a(ah ah2) {
        --d;
        int n2 = p.size();
        int n3 = 0;
        while (n3 < n2) {
            ah ah3 = (ah)p.elementAt(n3);
            if (ah3.a == ah2.a) {
                ah3.d = ah2.d;
                ah3.b = ah2.b;
                ah3.c = ah2.c;
                break;
            }
            ++n3;
        }
        fx.l();
    }

    private static void h() {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeShort(p.size());
            int n2 = 0;
            while (n2 < p.size()) {
                ah ah2 = (ah)p.elementAt(n2);
                dataOutputStream.writeShort(ah2.a);
                dataOutputStream.writeShort(ah2.c);
                dataOutputStream.writeInt(ah2.d.length);
                ((OutputStream)dataOutputStream).write(ah2.d);
                dataOutputStream.writeShort(ah2.b);
                ++n2;
            }
            aw.a("avatarImgBig", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
            aw.a("partImageNormal", l);
            return;
        }
        catch (Exception exception) {
            return;
        }
    }

    private static boolean i() {
        DataInputStream dataInputStream = fx.a("avatarImgBig");
        long l2 = System.currentTimeMillis() / 86400000L;
        String string = String.valueOf((int)(l2 - 15340L));
        String string2 = String.valueOf(string.length());
        u = String.valueOf(string2) + System.currentTimeMillis() + string;
        if (dataInputStream == null) {
            return false;
        }
        try {
            int n2 = dataInputStream.readShort();
            p = new Vector();
            int n3 = 0;
            while (n3 < n2) {
                ah ah2 = new ah();
                new ah().a = dataInputStream.readShort();
                ah2.c = dataInputStream.readShort();
                int n4 = dataInputStream.readInt();
                ah2.d = new byte[n4];
                dataInputStream.read(ah2.d);
                ah2.b = dataInputStream.readShort();
                p.addElement(ah2);
                ++n3;
            }
            dataInputStream.close();
        }
        catch (Exception exception) {
            fx.b("avatarImgBig");
        }
        return true;
    }

    private static ld[] b(Vector vector) {
        short s2 = 0;
        int n2 = 0;
        while (n2 < vector.size()) {
            ld ld2 = (ld)vector.elementAt(n2);
            if (ld2.g > s2) {
                s2 = ld2.g;
            }
            ++n2;
        }
        ld[] ldArray = new ld[s2 + 1];
        int n3 = 0;
        while (n3 < vector.size()) {
            ld ld3;
            ldArray[ld3.g] = ld3 = (ld)vector.elementAt(n3);
            ++n3;
        }
        return ldArray;
    }

    public static Vector a(byte[] object, boolean bl2) {
        object = new ByteArrayInputStream((byte[])object);
        object = new DataInputStream((InputStream)object);
        int n2 = 1;
        if (!bl2) {
            n2 = ((DataInputStream)object).readShort();
        }
        Vector<iw> vector = new Vector<iw>();
        int n3 = 0;
        while (n3 < n2) {
            ld ld2;
            int n4 = ((DataInputStream)object).readShort();
            int n5 = ((DataInputStream)object).readInt();
            short s2 = ((DataInputStream)object).readShort();
            short s3 = ((DataInputStream)object).readShort();
            if (s3 == -2) {
                ld2 = new iw();
                new iw().g = n4;
                ld2.i[0] = n5;
                ld2.i[1] = s2;
                ld2.f = s3;
                ld2.l = ((DataInputStream)object).readUTF();
                ld2.k = ((DataInputStream)object).readByte();
                ld2.h = ((DataInputStream)object).readShort();
                vector.addElement((iw)ld2);
            } else if (s3 == -1) {
                ld2 = new fa();
                new fa().g = n4;
                ld2.i[0] = n5;
                ld2.i[1] = s2;
                ld2.f = s3;
                ld2.l = ((DataInputStream)object).readUTF();
                ld2.k = ((DataInputStream)object).readByte();
                ld2.j = ((DataInputStream)object).readByte();
                ((fa)ld2).b = ((DataInputStream)object).readByte();
                ((fa)ld2).a = ((DataInputStream)object).readByte();
                ld2.h = ((DataInputStream)object).readShort();
                ((fa)ld2).c = new short[15];
                ((fa)ld2).d = new byte[15];
                ((fa)ld2).e = new byte[15];
                n4 = 0;
                while (n4 < 15) {
                    ((fa)ld2).c[n4] = ((DataInputStream)object).readShort();
                    ((fa)ld2).d[n4] = ((DataInputStream)object).readByte();
                    ((fa)ld2).e[n4] = ((DataInputStream)object).readByte();
                    ++n4;
                }
                vector.addElement((iw)ld2);
            } else {
                ld2 = new lb();
                new lb().g = n4;
                ld2.i[0] = n5;
                ld2.i[1] = s2;
                ld2.f = s3;
                ((lb)ld2).a = ((DataInputStream)object).readShort();
                vector.addElement((iw)ld2);
            }
            ++n3;
        }
        return vector;
    }

    public static void a(byte[] byArray) {
        --d;
        b = fx.b(fx.a(byArray, false));
        aw.a("avatarPart", byArray);
        fx.k();
        fx.l();
    }

    private static boolean j() {
        byte[] byArray = aw.a("avatarPart");
        if (l == null) {
            char[] cArray = u.toCharArray();
            int n2 = 0;
            int n3 = 1;
            while (n3 < cArray.length - 1) {
                int n4 = Integer.parseInt(String.valueOf(cArray[n3]));
                n2 += n4;
                n3 += 2;
            }
            String string = String.valueOf(n2);
            l = String.valueOf(string.length()) + u.substring(0, 5) + n2 + u.substring(5, u.length());
        }
        if (byArray == null) {
            return false;
        }
        b = fx.b(fx.a(byArray, false));
        return true;
    }

    private static void k() {
        int n2 = 0;
        while (n2 < b.length) {
            if (fx.b[n2].f >= 0) {
                ld ld2 = b[fx.b[n2].f];
                ld ld3 = b[n2];
                b[n2].l = ld2.l;
                ld3.k = ld2.k;
                ld3.j = ld2.j;
                ld3.h = ld2.h;
            }
            ++n2;
        }
    }

    private static void f(byte[] object) {
        object = new ByteArrayInputStream((byte[])object);
        DataInputStream dataInputStream = new DataInputStream((InputStream)object);
        object = dataInputStream;
        int n2 = dataInputStream.readShort();
        c = new Vector();
        int n3 = 0;
        while (n3 < n2) {
            dc dc2 = new dc();
            new dc().a = ((DataInputStream)object).readShort();
            dc2.f = ((DataInputStream)object).readUTF();
            ((DataInputStream)object).readUTF();
            dc2.d[0] = ((DataInputStream)object).readInt();
            dc2.c = ((DataInputStream)object).readByte();
            dc2.b = ((DataInputStream)object).readShort();
            c.addElement(dc2);
            ++n3;
        }
    }

    public static void b(byte[] byArray) {
        --d;
        fx.f(byArray);
        aw.a("avatarItemInfo", byArray);
        fx.l();
    }

    private static ke[] g(byte[] object) {
        object = new ByteArrayInputStream((byte[])object);
        DataInputStream dataInputStream = new DataInputStream((InputStream)object);
        object = dataInputStream;
        int n2 = dataInputStream.readShort();
        Vector<ke> vector = new Vector<ke>();
        short s2 = 0;
        int n3 = 0;
        while (n3 < n2) {
            ke ke2 = new ke();
            new ke().a = ((DataInputStream)object).readShort();
            if (ke2.a > s2) {
                s2 = ke2.a;
            }
            ke2.b = ((DataInputStream)object).readShort();
            ke2.c = (short)((DataInputStream)object).readUnsignedByte();
            ke2.d = (short)((DataInputStream)object).readUnsignedByte();
            ke2.e = ((DataInputStream)object).readByte();
            ke2.f = ((DataInputStream)object).readByte();
            vector.addElement(ke2);
            ++n3;
        }
        ke[] keArray = new ke[s2 + 1];
        int n4 = 0;
        while (n4 < vector.size()) {
            keArray[((ke)object).a] = object = (ke)vector.elementAt(n4);
            ++n4;
        }
        return keArray;
    }

    public static void b() {
        aw.a(je.k, String.valueOf(GameMidlet.n) + go.l);
        aw.a(GameMidlet.m, String.valueOf(aw.b) + ae.j);
        aw.a(aw.b, String.valueOf(GameMidlet.l) + ea.i);
    }

    public static void c(byte[] byArray) {
        --d;
        a = fx.g(byArray);
        aw.a("avatarImgData", byArray);
        fx.l();
    }

    private static Vector h(byte[] object) {
        object = new ByteArrayInputStream((byte[])object);
        DataInputStream dataInputStream = new DataInputStream((InputStream)object);
        object = dataInputStream;
        short s2 = dataInputStream.readShort();
        Vector<ag> vector = new Vector<ag>();
        short s3 = 0;
        while (s3 < s2) {
            ag ag2 = new ag();
            new ag().a = ((DataInputStream)object).readShort();
            ag2.g = ((DataInputStream)object).readUTF();
            ((DataInputStream)object).readUTF();
            ag2.b = ((DataInputStream)object).readShort();
            ag2.c = ((DataInputStream)object).readShort();
            ag2.e = ((DataInputStream)object).readByte();
            ag2.f = ((DataInputStream)object).readByte();
            ag2.h = ((DataInputStream)object).readShort();
            if (ag2.h == Short.MAX_VALUE) {
                ag2.h = -1;
            }
            if (ag2.h >= 0) {
                ag2.h *= 1000;
            }
            ag2.d = ((DataInputStream)object).readShort();
            ag2.i = ((DataInputStream)object).readByte();
            ag2.j = new Vector();
            byte by2 = ((DataInputStream)object).readByte();
            byte by3 = 0;
            while (by3 < by2) {
                dr dr2 = new dr();
                new dr().a = ((DataInputStream)object).readByte();
                dr2.b = ((DataInputStream)object).readByte();
                ag2.j.addElement(dr2);
                by3 = (byte)(by3 + 1);
            }
            vector.addElement(ag2);
            s3 = (byte)(s3 + 1);
        }
        return vector;
    }

    public static void d(byte[] byArray) {
        --d;
        e.removeAllElements();
        e = fx.h(byArray);
        aw.a("avatarMapItemType", byArray);
        fx.l();
    }

    private static void i(byte[] object) {
        object = new ByteArrayInputStream((byte[])object);
        object = new DataInputStream((InputStream)object);
        f = new Vector();
        short s2 = ((DataInputStream)object).readShort();
        System.out.println("readMapItem: " + s2);
        short s3 = 0;
        while (s3 < s2) {
            kq kq2 = new kq();
            new kq().a = ((DataInputStream)object).readShort();
            kq2.b = ((DataInputStream)object).readShort();
            kq2.f = ((DataInputStream)object).readByte();
            kq2.aw = ((DataInputStream)object).readByte();
            kq2.ax = ((DataInputStream)object).readByte();
            f.addElement(kq2);
            s3 = (byte)(s3 + 1);
        }
    }

    public static void e(byte[] byArray) {
        --d;
        f.removeAllElements();
        fx.i(byArray);
        aw.a("avatarMapType", byArray);
        fx.l();
    }

    private static void l() {
        ah ah2;
        if (d != 0) {
            return;
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeInt(n);
            dataOutputStream.writeInt(s);
            dataOutputStream.writeInt(m);
            dataOutputStream.writeInt(o);
            dataOutputStream.writeInt(t);
            aw.a("avatarVs", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
        }
        catch (Exception exception) {}
        fx.h();
        int n2 = p.size();
        int n3 = 0;
        while (n3 < n2) {
            ah2 = (ah)p.elementAt(n3);
            if (ah2.c != -1) {
                byte[] byArray = fx.d((int)ah2.c).d;
                System.arraycopy(ah2.d, 0, byArray, 0, ah2.d.length);
                ah2.d = byArray;
            }
            ah2.e = aw.a(ah2.d);
            ++n3;
        }
        if (main.a.E || main.a.F) {
            r = new Hashtable();
        }
        n3 = 0;
        while (n3 < p.size()) {
            ah2 = (ah)p.elementAt(n3);
            ((ah)p.elementAt(n3)).d = null;
            q.put("" + ah2.a, ah2);
            ++n3;
        }
        n3 = 0;
        while (n3 < p.size()) {
            ah2 = (ah)p.elementAt(n3);
            if (r != null) {
                fx.b(ah2);
            }
            ++n3;
        }
        p.removeAllElements();
        p = null;
        GameMidlet.i.h();
        ae.b().t();
    }

    private static void b(ah ah2) {
        Image image = Image.createImage((int)ah2.e.getWidth(), (int)ah2.e.getHeight());
        Graphics graphics = image.getGraphics();
        graphics.setColor(0xFF00FF);
        graphics.fillRect(0, 0, image.getWidth(), image.getHeight());
        int n2 = 0;
        while (n2 < a.length) {
            if (ah2.a == fx.a[n2].b) {
                graphics.drawRegion(ah2.e, fx.a[n2].c * gy.Y, fx.a[n2].d * gy.Y, fx.a[n2].e * gy.Y, fx.a[n2].f * gy.Y, (int)gx.J, (int)fx.a[n2].c, (int)fx.a[n2].d, 0);
            }
            ++n2;
        }
        n2 = 0;
        while (n2 < b.length) {
            if (b[n2] != null && fx.b[n2].f >= 0 && fx.b[n2].g < 2000) {
                fa fa2 = (fa)fx.a(fx.b[n2].f);
                int n3 = 0;
                while (n3 < fa2.c.length) {
                    ke ke2 = a[fa2.c[n3]];
                    if (((lb)fx.b[n2]).a == ah2.a) {
                        graphics.drawRegion(fx.a((int)ah2.a).e, ke2.c * gy.Y, ke2.d * gy.Y, ke2.e * gy.Y, ke2.f * gy.Y, (int)gx.J, (int)ke2.c, (int)ke2.d, 0);
                    }
                    ++n3;
                }
            }
            ++n2;
        }
        image = aw.a(image, -65281);
        ah ah3 = new ah();
        new ah().c = ah2.c;
        ah3.a = ah2.a;
        ah3.e = image;
        ah3.b = ah2.b;
        r.put("" + ah3.a, ah3);
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, int n5, int n6, int n7, int n8, int n9, int n10) {
        if (n9 == 0 || !main.a.E && !main.a.F) {
            graphics.drawRegion(fx.a((int)n2).e, n3 * gy.Y, n4 * gy.Y, n5 * gy.Y, n6 * gy.Y, n9, n7, n8, 0);
            return;
        }
        int n11 = n2;
        graphics.drawRegion(((ah)fx.r.get((Object)new StringBuffer().append((int)n11).toString())).e, n3 * gy.Y, n4 * gy.Y, n5 * gy.Y, n6 * gy.Y, 0, n7, n8, 0);
    }

    public static DataInputStream a(String object) {
        byte[] byArray = aw.a((String)object);
        object = byArray;
        if (byArray == null) {
            return null;
        }
        object = new ByteArrayInputStream((byte[])object);
        return new DataInputStream((InputStream)object);
    }

    public static void c() {
        Object object = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream((OutputStream)object);
        try {
            dataOutputStream.writeByte(GameMidlet.f);
            dataOutputStream.writeUTF(GameMidlet.g);
            aw.a("avatarSV", ((ByteArrayOutputStream)object).toByteArray());
            dataOutputStream.close();
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static void d() {
        Object object = fx.a("avatarSV");
        if (object == null) {
            return;
        }
        try {
            GameMidlet.f = ((DataInputStream)object).readByte();
            GameMidlet.g = ((DataInputStream)object).readUTF();
            ((FilterInputStream)object).close();
            return;
        }
        catch (Exception exception) {
            object = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static void e() {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        try {
            dataOutputStream.writeByte(dm.b().b[4]);
            dataOutputStream.writeByte(GameMidlet.b[dm.b().b[4]].length);
            int n2 = 0;
            while (n2 < GameMidlet.b[dm.b().b[4]].length) {
                dataOutputStream.writeByte(GameMidlet.b[dm.b().b[4]][n2].length);
                dataOutputStream.writeUTF(GameMidlet.a[dm.b().b[4]][n2][0]);
                int n3 = 0;
                while (n3 < GameMidlet.b[dm.b().b[4]][n2].length) {
                    dataOutputStream.writeUTF(GameMidlet.a[dm.b().b[4]][n2][n3 + 1]);
                    dataOutputStream.writeUTF(GameMidlet.b[dm.b().b[4]][n2][n3]);
                    dataOutputStream.writeInt(GameMidlet.c[dm.b().b[4]][n2][n3]);
                    ++n3;
                }
                ++n2;
            }
            aw.a("avatarSV", byteArrayOutputStream.toByteArray());
            dataOutputStream.close();
            return;
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
            return;
        }
    }

    public static void f() {
        DataInputStream dataInputStream = fx.a("avatarSV");
        if (dataInputStream == null) {
            return;
        }
        try {
            int n2 = dataInputStream.readByte();
            if (n2 != dm.b().b[4]) {
                return;
            }
            n2 = dataInputStream.readByte();
            if (n2 == 0) {
                fx.b("avatarSV");
                return;
            }
            GameMidlet.a = new String[2][n2][];
            GameMidlet.b = new String[2][n2][];
            GameMidlet.c = new int[2][n2][];
            int n3 = 0;
            while (n3 < n2) {
                int n4 = dataInputStream.readByte();
                GameMidlet.a[dm.b().b[4]][n3] = new String[n4 + 1];
                GameMidlet.a[dm.b().b[4]][n3][0] = dataInputStream.readUTF();
                GameMidlet.b[dm.b().b[4]][n3] = new String[n4];
                GameMidlet.c[dm.b().b[4]][n3] = new int[n4];
                int n5 = 0;
                while (n5 < n4) {
                    GameMidlet.a[dm.b().b[4]][n3][n5 + 1] = dataInputStream.readUTF();
                    GameMidlet.b[dm.b().b[4]][n3][n5] = dataInputStream.readUTF();
                    GameMidlet.c[dm.b().b[4]][n3][n5] = dataInputStream.readInt();
                    ++n5;
                }
                ++n3;
            }
            dataInputStream.close();
            return;
        }
        catch (IOException iOException) {
            IOException iOException2 = iOException;
            iOException.printStackTrace();
            fx.b("avatarSV");
            return;
        }
    }

    private static ah d(int n2) {
        int n3 = p.size();
        int n4 = 0;
        while (n4 < n3) {
            ah ah2 = (ah)p.elementAt(n4);
            if (ah2.a == n2) {
                return ah2;
            }
            ++n4;
        }
        return null;
    }

    public static ah a(int n2) {
        return (ah)q.get("" + n2);
    }

    public static ag b(int n2) {
        int n3 = e.size();
        int n4 = 0;
        while (n4 < n3) {
            if (((ag)fx.e.elementAt((int)n4)).a == n2) {
                return (ag)e.elementAt(n4);
            }
            ++n4;
        }
        return null;
    }

    public static void a(Vector vector) {
        g = vector;
    }

    public static boolean c(int n2) {
        return n2 == 10 || n2 == 20 || n2 == 30 || n2 == 40 || n2 == 50;
    }

    public static fa a(Vector vector, int n2) {
        if (vector != null) {
            int n3 = 0;
            while (n3 < vector.size()) {
                hx hx2 = (hx)vector.elementAt(n3);
                ld ld2 = fx.a(hx2.a);
                if (hx2 != null && ld2 instanceof fa && ((fa)ld2).j == n2) {
                    return (fa)ld2;
                }
                ++n3;
            }
        }
        return null;
    }

    public static hx b(Vector vector, int n2) {
        int n3 = vector.size();
        int n4 = 0;
        while (n4 < n3) {
            hx hx2 = (hx)vector.elementAt(n4);
            if (hx2.a == n2) {
                return hx2;
            }
            ++n4;
        }
        return null;
    }

    public static hx a(int n2, Vector vector) {
        int n3 = vector.size();
        int n4 = 0;
        while (n4 < n3) {
            hx hx2 = (hx)vector.elementAt(n4);
            ld ld2 = fx.a(hx2.a);
            if (ld2.j == n2) {
                return hx2;
            }
            ++n4;
        }
        return null;
    }

    public static ld a(short s2) {
        if (s2 >= 2000) {
            ld ld2 = (ld)j.get("" + s2);
            if (ld2 == null) {
                ld2 = new fa();
                new fa().g = (short)-1;
                j.put("" + s2, ld2);
                cx.a().b(s2);
            }
            return ld2;
        }
        return b[s2];
    }

    public static String a(ld ld2) {
        if (ld2.f >= 0) {
            return fx.a((short)ld2.f).l;
        }
        return ld2.l;
    }

    public static void a(Graphics graphics, int n2, int n3, int n4, int n5) {
        if (fx.c((short)((short)n2)).d != -1) {
            graphics.drawImage(fx.c((short)((short)n2)).a, n3, n4, n5);
        }
    }

    public static f b(short s2) {
        f f2 = (f)i.get("" + s2);
        if (f2 == null) {
            f2 = new f();
            i.put("" + s2, f2);
            cx.a().c(s2);
        } else if (f2.d >= 0) {
            f2.d = (int)(System.currentTimeMillis() / 1000L);
        }
        return f2;
    }

    public static f c(short s2) {
        f f2 = (f)h.get("" + s2);
        if (f2 == null) {
            f2 = new f();
            h.put("" + s2, f2);
            iy.a().b(s2);
        } else if (f2.d >= 0) {
            f2.d = (int)(System.currentTimeMillis() / 1000L);
        }
        return f2;
    }

    public static void g() {
        f f2;
        String string;
        Enumeration enumeration;
        if (h.size() > 50) {
            enumeration = h.keys();
            while (enumeration.hasMoreElements()) {
                string = (String)enumeration.nextElement();
                f2 = (f)h.get(string);
                if (f2.d == -1 || System.currentTimeMillis() / 1000L - (long)f2.d <= (long)main.a.V) continue;
                h.remove(string);
            }
        }
        if (i.size() > 50) {
            enumeration = i.keys();
            while (enumeration.hasMoreElements()) {
                string = (String)enumeration.nextElement();
                f2 = (f)i.get(string);
                if (f2.d == -1 || System.currentTimeMillis() / 1000L - (long)f2.d <= (long)main.a.V) continue;
                i.remove(string);
            }
        }
    }

    public static int b(ld ld2) {
        byte by2 = ld2.f >= 0 ? ((fa)fx.a((short)ld2.f)).a : ((fa)ld2).a;
        return by2;
    }

    public static al d(short s2) {
        int n2 = 0;
        while (n2 < k.size()) {
            al al2 = (al)k.elementAt(n2);
            if (al2.e == s2) {
                return al2;
            }
            ++n2;
        }
        return null;
    }

    public static void b(String string) {
        try {
            RecordStore.deleteRecordStore((String)("2.5.8" + string));
            return;
        }
        catch (Exception exception) {
            return;
        }
    }
}


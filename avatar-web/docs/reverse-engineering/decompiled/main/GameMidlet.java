/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.io.ConnectionNotFoundException
 *  javax.microedition.io.Connector
 *  javax.microedition.io.HttpConnection
 *  javax.microedition.lcdui.Display
 *  javax.microedition.lcdui.Displayable
 *  javax.microedition.midlet.MIDlet
 *  javax.microedition.midlet.MIDletStateChangeException
 */
package main;

import java.io.IOException;
import java.io.InputStream;
import java.util.Vector;
import javax.microedition.io.ConnectionNotFoundException;
import javax.microedition.io.Connector;
import javax.microedition.io.HttpConnection;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Displayable;
import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;
import main.a;
import main.b;

public class GameMidlet
extends MIDlet {
    public static String[][][] a = new String[][][]{{{"Xu So Dieu Ky", "Thanh Pho Hoan My", "Thanh Pho Tam Giao", "Thanh Pho Than Thoai", "Thanh Pho Tri Ky", "Thanh Pho Hoa Binh", "Thanh Pho Dieu Ky", "Thanh Pho Mong Mo"}, {"Xu So Than Tien", "Thanh Pho Bao Binh", "Thanh Pho Nhan Ma", "Thanh Pho Su Tu"}}, {{"International Server", "Aries City"}}};
    public static String[][][] b = new String[][][]{{{"127.0.0.1", "127.0.0.1", "127.0.0.1", "127.0.0.1", "127.0.0.1", "127.0.0.1", "127.0.0.1"}, {"127.0.0.1", "127.0.0.1", "127.0.0.1"}}, {{"112.78.1.25"}}};
    public static int[][][] c = new int[][][]{new int[][]{{14444, 14444, 14444, 14444, 14444, 14444, 14444, 14444, 14444}, {19128, 19128, 18128}}, new int[][]{{14444}}};
    public static final String[][] d = new String[][]{{"http://teamobi.com/srvips/avatar2.txt", "http://trochoididong.us/srvips/avatar_C.txt"}, {"http://teamobi.com/srvips/avatarinterd2.txt", "http://trochoididong.us/srvips/avatarinter_C.txt"}};
    public static int e = 8;
    public static byte f = (byte)-1;
    public static String g;
    private static a o;
    public static GameMidlet h;
    public static hn i;
    public static kp j;
    public static Vector k;
    private static Display p;
    public static int l;
    public static String m;
    public static String n;

    public GameMidlet() {
        h = this;
        Object object = ((Object)((Object)this)).getClass().getResourceAsStream("/provider.txt");
        StringBuffer stringBuffer = new StringBuffer();
        try {
            int n2;
            while ((n2 = ((InputStream)object).read()) != -1) {
                stringBuffer.append((char)n2);
            }
            object = stringBuffer.toString();
            f = Byte.parseByte((String)object);
        }
        catch (Exception exception) {
            Exception exception2 = exception;
            exception.printStackTrace();
        }
        if (f == -1) {
            fx.d();
        }
        InputStream inputStream = aw.c("/agent.txt");
        object = new StringBuffer();
        try {
            int n3;
            while ((n3 = inputStream.read()) != -1) {
                ((StringBuffer)object).append((char)n3);
            }
            g = ((StringBuffer)object).toString();
        }
        catch (Exception exception) {}
        o = new a();
        o.d();
        i = new hn();
        j = new kp();
        jv.b().a();
        o.sizeChanged(0, 0);
        o.b();
        Display.getDisplay((MIDlet)this).setCurrent((Displayable)o);
        kt.a().a(ce.a());
        String string = aw.b("avatar");
        if (string == null || !string.equals("2.5.8")) {
            fx.a();
        }
    }

    public void destroyApp(boolean bl2) {
        h.notifyDestroyed();
    }

    public static void a() {
        try {
            h.destroyApp(true);
            return;
        }
        catch (MIDletStateChangeException mIDletStateChangeException) {
            MIDletStateChangeException mIDletStateChangeException2 = mIDletStateChangeException;
            mIDletStateChangeException.printStackTrace();
            return;
        }
    }

    protected void pauseApp() {
    }

    protected void startApp() {
        p = Display.getDisplay((MIDlet)this);
        p.setCurrent((Displayable)o);
    }

    public static void a(String string, String string2) {
        new Thread(new b(string2, string)).start();
    }

    public static String a(String string) {
        try {
            string = (HttpConnection)Connector.open((String)string);
            string.setRequestMethod("GET");
            string.setRequestProperty("Content-Type", "//textMiniMap plain");
            string.setRequestProperty("Connection", "close");
            if (string.getResponseCode() == 200) {
                String string2 = "";
                InputStream inputStream = string.openInputStream();
                int n2 = (int)string.getLength();
                if (n2 != -1) {
                    byte[] byArray = new byte[n2];
                    inputStream.read(byArray);
                    string2 = new String(byArray);
                }
                return string2;
            }
        }
        catch (IOException iOException) {
            return null;
        }
        return null;
    }

    public static void b(String object) {
        try {
            h.platformRequest((String)object);
            h.notifyDestroyed();
            return;
        }
        catch (ConnectionNotFoundException connectionNotFoundException) {
            object = connectionNotFoundException;
            connectionNotFoundException.printStackTrace();
            return;
        }
    }
}


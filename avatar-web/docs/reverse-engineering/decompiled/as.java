/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Graphics
 */
import javax.microedition.lcdui.Graphics;
import main.a;

final class as
extends by {
    as(go go2, String string, int n2, gy gy2) {
        super(string, 2, gy2);
    }

    public final void a(Graphics graphics, int n2, int n3) {
        int n4;
        Object object = gb.b(go.V);
        az az2 = go.b(((hf)object).b);
        gb.a(graphics, az2.b, main.a.y.d / 2, dp.d / 2 - 30, 3);
        main.a.N.a(graphics, ((hf)object).d, main.a.y.d / 2, dp.d / 2 - 30 + 5 + gb.a((short)az2.b).c / 2 + gy.ai + 2, 2);
        object = "";
        int n5 = go.U / 3600;
        cs cs2 = main.a.M;
        if (n5 > 0) {
            object = String.valueOf(n5) + ":";
        }
        if ((n4 = (go.U - n5 * 3600) / 60) > 0 || n5 > 0) {
            object = String.valueOf(object) + n4 + ":";
        }
        n5 = go.U - n5 * 3600 - n4 * 60;
        object = String.valueOf(object) + n5;
        if (go.U == 0) {
            object = kf.eL;
            cs2 = main.a.N;
        }
        cs2.a(graphics, (String)object, main.a.y.d / 2, dp.d / 2 - 30 + 5 + gb.a((short)az2.b).c / 2, 2);
    }
}


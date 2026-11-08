/*
 * Decompiled with CFR 0.152.
 */
import java.util.Vector;

public final class dc {
    public short a;
    public short b;
    public byte c;
    public int[] d = new int[2];
    public int e;
    public String f = "";

    public static dc a(Vector vector, int n2) {
        int n3 = vector.size();
        int n4 = 0;
        while (n4 < n3) {
            dc dc2 = (dc)vector.elementAt(n4);
            if (dc2.a == n2) {
                return dc2;
            }
            ++n4;
        }
        return null;
    }
}


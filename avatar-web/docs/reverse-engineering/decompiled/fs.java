/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.lcdui.Command
 *  javax.microedition.lcdui.CommandListener
 *  javax.microedition.lcdui.Display
 *  javax.microedition.lcdui.Displayable
 *  javax.microedition.lcdui.TextField
 *  javax.microedition.midlet.MIDlet
 */
import javax.microedition.lcdui.Command;
import javax.microedition.lcdui.CommandListener;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Displayable;
import javax.microedition.lcdui.TextField;
import javax.microedition.midlet.MIDlet;
import main.GameMidlet;
import main.a;

final class fs
implements CommandListener {
    private final Command a;
    private final TextField b;

    fs(ea ea2, Command command, TextField textField) {
        this.a = command;
        this.b = textField;
    }

    public final void commandAction(Command command, Displayable displayable) {
        block3: {
            block2: {
                if (command != this.a) break block2;
                if (this.b.getString().equals("")) break block3;
                cx.a().a((byte)2, this.b.getString());
            }
            main.a.a.setFullScreenMode(true);
            Display.getDisplay((MIDlet)GameMidlet.h).setCurrent((Displayable)main.a.a);
        }
    }
}


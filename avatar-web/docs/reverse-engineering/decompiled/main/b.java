/*
 * Decompiled with CFR 0.152.
 * 
 * Could not load the following classes:
 *  javax.microedition.io.Connector
 *  javax.wireless.messaging.Message
 *  javax.wireless.messaging.MessageConnection
 *  javax.wireless.messaging.TextMessage
 */
package main;

import javax.microedition.io.Connector;
import javax.wireless.messaging.Message;
import javax.wireless.messaging.MessageConnection;
import javax.wireless.messaging.TextMessage;
import main.a;

final class b
implements Runnable {
    private final String a;
    private final String b;

    b(String string, String string2) {
        this.a = string;
        this.b = string2;
    }

    public final void run() {
        try {
            MessageConnection messageConnection = (MessageConnection)Connector.open((String)this.a);
            TextMessage textMessage = (TextMessage)messageConnection.newMessage("text");
            textMessage.setAddress(this.a);
            textMessage.setPayloadText(this.b);
            messageConnection.send((Message)textMessage);
            main.a.b(kf.ct);
            return;
        }
        catch (Exception exception) {
            main.a.b(kf.cu);
            return;
        }
    }
}


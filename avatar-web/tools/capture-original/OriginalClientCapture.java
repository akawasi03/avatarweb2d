import org.microemu.MIDletBridge;
import org.microemu.device.j2se.J2SEMutableImage;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class OriginalClientCapture {

    public static void main(String[] args) {
        try {
            System.out.println("[Capture] Initializing MicroEmulator...");
            File outDir = new File("d:/avatarweb2d/avatar-web/tests/rendering");
            outDir.mkdirs();

            List<String> params = new ArrayList<>();
            params.add("--resizableDevice");
            params.add("240");
            params.add("320");
            params.add("main.GameMidlet");

            Thread emuThread = new Thread(() -> {
                org.microemu.app.Main.main(params.toArray(new String[0]));
            });
            emuThread.setDaemon(true);
            emuThread.start();

            System.out.println("[Capture] Waiting for MIDlet to load in MIDletClassLoader...");
            javax.microedition.midlet.MIDlet midlet = null;
            Object canvas = null;

            for (int i = 0; i < 50; i++) {
                Thread.sleep(100);
                midlet = MIDletBridge.getCurrentMIDlet();
                if (midlet != null) {
                    try {
                        canvas = javax.microedition.lcdui.Display.getDisplay(midlet).getCurrent();
                        if (canvas != null) break;
                    } catch (Throwable ignore) {}
                }
            }

            if (canvas == null) {
                System.err.println("[Capture] Could not get Displayable Canvas!");
                System.exit(1);
            }

            System.out.println("[Capture] Canvas acquired: " + canvas.getClass().getName());

            // 1. Splash Screen
            Thread.sleep(400);
            captureCanvas(canvas, new File(outDir, "original_splash.png"));
            System.out.println("[Capture] Captured original_splash.png!");

            // 2. Wait for Login Screen
            System.out.println("[Capture] Waiting 3000ms for Login Screen transition...");
            Thread.sleep(3000);
            captureCanvas(canvas, new File(outDir, "original_login.png"));
            System.out.println("[Capture] Captured original_login.png!");

            System.out.println("[Capture] All original screenshots captured successfully!");
            System.exit(0);

        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }

    private static void captureCanvas(Object canvas, File outFile) throws Exception {
        Class<?> canvasClass = canvas.getClass();
        int w = 240;
        int h = 320;
        try {
            w = (int) canvasClass.getMethod("getWidth").invoke(canvas);
            h = (int) canvasClass.getMethod("getHeight").invoke(canvas);
        } catch (Throwable t) {}

        javax.microedition.lcdui.Image offscreen = javax.microedition.lcdui.Image.createImage(w, h);
        javax.microedition.lcdui.Graphics g = offscreen.getGraphics();

        Method paintMethod = null;
        Class<?> cur = canvasClass;
        while (cur != null && paintMethod == null) {
            try {
                paintMethod = cur.getDeclaredMethod("paint", javax.microedition.lcdui.Graphics.class);
            } catch (NoSuchMethodException e) {
                cur = cur.getSuperclass();
            }
        }

        if (paintMethod == null) {
            throw new RuntimeException("No paint method found on " + canvasClass);
        }

        paintMethod.setAccessible(true);
        paintMethod.invoke(canvas, g);

        J2SEMutableImage j2seImg = (J2SEMutableImage) offscreen;
        java.awt.Image awtImg = j2seImg.getImage();
        BufferedImage bi = new BufferedImage(w, h, BufferedImage.TYPE_INT_RGB);
        java.awt.Graphics2D bg = bi.createGraphics();
        bg.drawImage(awtImg, 0, 0, null);
        bg.dispose();

        ImageIO.write(bi, "png", outFile);
    }
}

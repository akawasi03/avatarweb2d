import org.microemu.MIDletBridge;
import org.microemu.device.j2se.J2SEMutableImage;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class CaptureCityMap {

    public static void main(String[] args) {
        try {
            System.out.println("[CaptureCityMap] Starting MicroEmulator...");
            File outDir = new File("avatar-web/tests/rendering");
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
                System.err.println("[CaptureCityMap] Could not get Displayable Canvas!");
                System.exit(1);
            }

            System.out.println("[CaptureCityMap] Canvas acquired: " + canvas.getClass().getName());
            ClassLoader cl = midlet.getClass().getClassLoader();

            // Wait for GameMidlet to initialize
            Thread.sleep(1500);

            // Set GameMidlet.i.d = 1 (logged in player)
            Class<?> midletClass = cl.loadClass("main.GameMidlet");
            Field iField = midletClass.getField("i");
            Object playerInstance = iField.get(null);
            if (playerInstance != null) {
                Field dField = playerInstance.getClass().getField("d");
                dField.setByte(playerInstance, (byte)1);
                System.out.println("[CaptureCityMap] Set GameMidlet.i.d = 1");
            } else {
                System.out.println("[CaptureCityMap] GameMidlet.i is null, creating dummy player...");
                Class<?> hnClass = cl.loadClass("hn");
                Object dummy = hnClass.getDeclaredConstructor().newInstance();
                Field dField = dummy.getClass().getField("d");
                dField.setByte(dummy, (byte)1);
                iField.set(null, dummy);
            }

            // Invoke ae.b().t()
            System.out.println("[CaptureCityMap] Invoking ae.b().t() to open CityMap (ea)...");
            Class<?> aeClass = cl.loadClass("ae");
            Method bMethod = aeClass.getMethod("b");
            Object aeInstance = bMethod.invoke(null);
            Method tMethod = aeClass.getMethod("t");
            tMethod.invoke(aeInstance);

            Thread.sleep(1000);

            // Capture the canvas!
            File outFile = new File(outDir, "original_city_map.png");
            captureCanvas(canvas, outFile);
            System.out.println("[CaptureCityMap] Successfully captured original_city_map.png to " + outFile.getAbsolutePath());

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

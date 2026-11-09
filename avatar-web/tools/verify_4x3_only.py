import os
import sys
import time

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

DEVICES = [
    {"name": "desktop_1920x1080_16x9", "w": 1920, "h": 1080, "desc": "Desktop Full HD 16:9"},
    {"name": "laptop_1366x768_16x9", "w": 1366, "h": 768, "desc": "Laptop Widescreen 16:9"},
    {"name": "tablet_1024x768_4x3", "w": 1024, "h": 768, "desc": "Tablet Native 4:3"},
    {"name": "mobile_landscape_844x390", "w": 844, "h": 390, "desc": "Mobile Landscape"},
    {"name": "mobile_portrait_390x844", "w": 390, "h": 844, "desc": "Mobile Portrait"}
]

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        for dev in DEVICES:
            w = dev["w"]
            h = dev["h"]
            name = dev["name"]
            desc = dev["desc"]
            print(f"\n=== Testing Device: {desc} ({w}x{h}) ===")

            context = browser.new_context(viewport={"width": w, "height": h})
            page = context.new_page()

            page.goto("http://127.0.0.1:3000", wait_until="networkidle")
            time.sleep(1)

            # Launch game with admin credentials
            page.evaluate("() => typeof launchGame === 'function' ? launchGame('admin', '123456') : null")
            time.sleep(1.5)

            # Wait for game midlet ready
            page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

            # Check canvas dimensions
            canvas_info = page.evaluate("""() => {
                const c = document.getElementById('gameCanvas');
                const rect = c.getBoundingClientRect();
                return {
                    bufferW: c.width,
                    bufferH: c.height,
                    cssW: rect.width,
                    cssH: rect.height,
                    ratio: (rect.width / rect.height).toFixed(4),
                    parentW: window.innerWidth,
                    parentH: window.innerHeight
                };
            }""")
            print(f"Canvas Info: Buffer=({canvas_info['bufferW']}x{canvas_info['bufferH']}), Display CSS=({canvas_info['cssW']:.1f}x{canvas_info['cssH']:.1f}), AspectRatio={canvas_info['ratio']} (Expected ~1.3333)")

            # 1. Open World Map
            page.evaluate("() => window.openWorldMap()")
            time.sleep(1)

            wm_path = os.path.join(ARTIFACT_DIR, f"device_{name}_worldmap.png")
            page.screenshot(path=wm_path)
            print(f"Captured World Map: {wm_path}")

            # 2. Enter Khu giải trí (Map 9, index 3)
            page.evaluate("""() => {
                const wm = window.gameMidlet.worldMapScreen;
                wm.selectedRegion = wm.regions[3];
                wm.onSelectRegion(wm.regions[3]);
            }""")
            time.sleep(2)

            gp_path = os.path.join(ARTIFACT_DIR, f"device_{name}_gameplay.png")
            page.screenshot(path=gp_path)
            print(f"Captured Gameplay Map 9: {gp_path}")

            context.close()

        browser.close()

if __name__ == "__main__":
    run()

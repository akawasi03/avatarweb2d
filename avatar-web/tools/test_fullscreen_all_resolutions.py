import os
import sys
import time

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

RESOLUTIONS = [
    {"name": "1366x768_16x9", "w": 1366, "h": 768},
    {"name": "1920x1080_16x9", "w": 1920, "h": 1080},
    {"name": "1280x800_16x10", "w": 1280, "h": 800},
    {"name": "1024x768_4x3", "w": 1024, "h": 768}
]

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)

        for res in RESOLUTIONS:
            w = res["w"]
            h = res["h"]
            name = res["name"]
            print(f"\n--- Testing resolution {name} ({w}x{h}) ---")
            
            context = browser.new_context(viewport={"width": w, "height": h})
            page = context.new_page()

            page.goto("http://127.0.0.1:3000", wait_until="networkidle")
            time.sleep(1)

            # Launch game directly
            page.evaluate("() => typeof launchGame === 'function' ? launchGame('admin', '123456') : null")
            time.sleep(1.5)

            # Wait for midlet ready
            page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

            # Open World Map
            page.evaluate("() => window.openWorldMap()")
            time.sleep(1)

            wm_path = os.path.join(ARTIFACT_DIR, f"fullscreen_worldmap_{name}.png")
            page.screenshot(path=wm_path)
            print(f"Captured World Map: {wm_path}")

            # Enter Khu giải trí (Map 9, index 3)
            page.evaluate("""() => {
                const wm = window.gameMidlet.worldMapScreen;
                wm.selectedRegion = wm.regions[3];
                wm.onSelectRegion(wm.regions[3]);
            }""")
            time.sleep(2.5)

            gp_path = os.path.join(ARTIFACT_DIR, f"fullscreen_gameplay_map9_{name}.png")
            page.screenshot(path=gp_path)
            print(f"Captured Gameplay Map 9: {gp_path}")

            context.close()

        browser.close()

if __name__ == "__main__":
    run()

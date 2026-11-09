import os
import sys
import time

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        # Test 1366x768 typical desktop screen size
        context = browser.new_context(viewport={"width": 1366, "height": 768})
        page = context.new_page()

        page.goto("http://127.0.0.1:3000", wait_until="networkidle")
        time.sleep(1)

        # Launch game
        page.evaluate("() => typeof launchGame === 'function' ? launchGame() : null")
        time.sleep(1)

        # Login
        is_login_visible = page.evaluate("() => { const ov = document.getElementById('login-overlay'); return ov && ov.style.display !== 'none'; }")
        if is_login_visible:
            page.fill("#usernameInput", "admin")
            page.fill("#passwordInput", "123456")
            page.click("#submitLoginBtn")
            time.sleep(2)

        page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

        # Open world map
        page.evaluate("() => window.openWorldMap()")
        time.sleep(1.5)

        # Capture FULL BROWSER WINDOW screenshot of World Map
        wm_full_path = os.path.join(ARTIFACT_DIR, "web_world_map_fullscreen_1366x768.png")
        page.screenshot(path=wm_full_path)
        print(f"World Map Fullscreen screenshot: {wm_full_path}")

        # Enter Park (Map 11, index 5)
        page.evaluate("""() => {
            const wm = window.gameMidlet.worldMapScreen;
            wm.selectedRegion = 5;
            wm.onSelectRegion(wm.regions[5]);
        }""")
        time.sleep(2)

        # Capture FULL BROWSER WINDOW screenshot of Gameplay
        game_full_path = os.path.join(ARTIFACT_DIR, "web_gameplay_fullscreen_1366x768.png")
        page.screenshot(path=game_full_path)
        print(f"Gameplay Fullscreen screenshot: {game_full_path}")

        browser.close()

if __name__ == "__main__":
    main()

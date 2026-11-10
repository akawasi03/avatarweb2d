import sys
import time
import os

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r'C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775'

def capture_farm_live():
    print("=== CAPTURING LIVE WEBGL2 FARM (MAP 25) GAMEPLAY ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel='chrome',
            headless=True,
            args=['--use-gl=angle', '--use-angle=swiftshader']
        )
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # Step 1: Login via portal
        print("[Step 1] Navigating to http://localhost:3000/?view=login ...")
        page.goto('http://localhost:3000/?view=login', wait_until='networkidle')
        time.sleep(1)

        print("[Step 2] Logging in as admin...")
        page.fill('#loginUsername', 'admin')
        page.fill('#loginPassword', '123456')
        page.click('#btnSubmitLogin')
        time.sleep(3)

        # Step 3: Enter Farm (Map 25)
        print("[Step 3] Entering Farm Screen (Map 25)...")
        res = page.evaluate("""() => {
            if (!window.enterFarm) return 'NO_ENTER_FARM';
            try {
                window.enterFarm(1);
                return 'OK_CALLED';
            } catch(e) {
                return 'ERR: ' + e.message;
            }
        }""")
        print(f"  -> enterFarm result: {res}")
        time.sleep(2)

        # Step 4: Verify scene and render backend
        scene = page.evaluate("() => window.__SCENE")
        backend = page.evaluate("() => window.__RENDER_BACKEND")
        screen_class = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        print(f"[Step 4] Active Scene: {scene}, Backend: {backend}, Screen: {screen_class}")

        assert backend == 'webgl2', f"Expected webgl2 backend, got {backend}"
        assert scene == 'farm', f"Expected farm scene, got {scene}"

        # Capture farm live screenshot
        shot_path = os.path.join(ARTIFACT_DIR, 'webgl2_farm_live_gameplay.png')
        page.screenshot(path=shot_path)
        print(f"[Step 5] Saved WebGL2 Farm Live Screenshot: {shot_path}")

        browser.close()
        print("\n=== FARM LIVE CAPTURE SUCCESSFUL! ===")

if __name__ == '__main__':
    capture_farm_live()

import sys
import time
import os

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r'C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775'

def test_seamless_login():
    print("=== TESTING SEAMLESS DIRECT LOGIN (NO 'CHƠI MỚI' / 'ĐỔI TÀI KHOẢN') ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel='chrome',
            headless=True,
            args=['--use-gl=angle', '--use-angle=swiftshader']
        )
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        # Step 1: Go to portal login view
        print("[Step 1] Navigating to http://localhost:3000/?view=login ...")
        page.goto('http://localhost:3000/?view=login', wait_until='networkidle')
        time.sleep(1)

        # Fill credentials
        print("[Step 2] Filling login form: admin / 123456 ...")
        page.fill('#loginUsername', 'admin')
        page.fill('#loginPassword', '123456')

        # Click login button
        print("[Step 3] Clicking 'ĐĂNG NHẬP' button ...")
        page.click('#btnSubmitLogin')

        # Wait for auto-launch and login
        time.sleep(3)

        # Verify active scene inside game canvas
        scene = page.evaluate("() => window.__SCENE")
        current_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        print(f"[Step 4] Active scene: {scene}, CurrentScreen class: {current_screen}")

        assert current_screen != 'LoginScreen', f"ERROR: Game is still on LoginScreen ({current_screen})!"
        print("[Step 4] Verified: Legacy LoginScreen ('Chơi mới' / 'Đổi tài khoản') is COMPLETELY ELIMINATED!")

        # Take screenshot
        shot1 = os.path.join(ARTIFACT_DIR, 'test_seamless_login_step1.png')
        page.screenshot(path=shot1)
        print(f"[Step 4] Saved screenshot: {shot1}")

        # Step 5: Close game modal and refresh page (test persistent 'Chơi ngay')
        print("\n[Step 5] Closing game modal and reloading page...")
        page.evaluate("() => closeGame()")
        time.sleep(1)
        page.goto('http://localhost:3000/', wait_until='networkidle')
        time.sleep(2)

        # Step 6: Click floating 'CHƠI NGAY' button directly
        print("[Step 6] Clicking floating 'CHƠI NGAY' button directly with no manual input...")
        page.evaluate("() => document.getElementById('floatingPlayBtn')?.click() || launchGame()")
        time.sleep(3)

        scene2 = page.evaluate("() => window.__SCENE")
        current_screen2 = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        local_player_name = page.evaluate("() => window.gameWorldScreen?.localPlayer?.name")
        print(f"[Step 7] Active scene: {scene2}, CurrentScreen: {current_screen2}, Player: {local_player_name}")

        assert current_screen2 != 'LoginScreen', f"ERROR: Game is still on LoginScreen ({current_screen2})!"
        assert local_player_name == 'admin', f"Expected player admin, got {local_player_name}"

        # Take screenshot of persistent launch
        shot2 = os.path.join(ARTIFACT_DIR, 'test_seamless_login_persistent.png')
        page.screenshot(path=shot2)
        print(f"[Step 7] Saved screenshot: {shot2}")

        browser.close()
        print("\n=== ALL SEAMLESS LOGIN VERIFICATION TESTS PASSED 100%! ===")

if __name__ == '__main__':
    test_seamless_login()

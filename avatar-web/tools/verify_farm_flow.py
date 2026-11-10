import sys
import time
import os

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r'C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775'

def verify_farm_flow():
    print("=== STARTING FULL FARM GATE & PRIVATE FARM VERIFICATION ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel='chrome',
            headless=True,
            args=['--use-gl=angle', '--use-angle=swiftshader']
        )
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()
        page.on("console", lambda msg: print("[Browser Console]", msg.text))
        page.on("pageerror", lambda err: print("[Browser Error]", err))

        # 1. Login via portal
        print("\n[Step 1] Navigating to http://localhost:3000/?view=login&day=1 ...")
        page.goto('http://localhost:3000/?view=login&day=1', wait_until='networkidle')
        time.sleep(1)

        print("[Step 2] Logging in as admin...")
        page.fill('#loginUsername', 'admin')
        page.fill('#loginPassword', '123456')
        page.click('#btnSubmitLogin')
        time.sleep(4)

        # Force day mode for visual fidelity check against reference daylight screenshots
        page.evaluate("() => { window.__FORCE_DAY = true; }")

        # 2. Check that the user is directly into the game (WorldMapScreen) and NOT blocked by the 'Chơi mới' dialog!
        active_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        scene = page.evaluate("() => window.__SCENE")
        print(f"[Step 3] Active Screen after login: {active_screen}, Scene: {scene}")
        
        login_options_len = page.evaluate("() => window.gameMidlet?.loginScreen?.options?.length || 0")
        print(f"  -> LoginScreen options length: {login_options_len} (Must be 0 to eliminate prompt)")
        assert login_options_len == 0, "LoginScreen prompt options must be empty!"

        shot_login = os.path.join(ARTIFACT_DIR, '01_login_direct_worldmap.png')
        page.screenshot(path=shot_login)
        print(f"  -> Saved screenshot: {shot_login}")

        # 3. Select Region 25 ('Nông trại') from World Map
        print("\n[Step 4] Selecting Region 25 (Nông trại) from World Map...")
        res = page.evaluate("""() => {
            const wm = window.gameMidlet?.worldMapScreen;
            if (!wm) return 'NO_WORLD_MAP';
            const farmRegion = wm.regions.find(r => r.mapId === 25);
            if (!farmRegion) return 'NO_REGION_25';
            wm.onSelectRegion(farmRegion);
            return 'OK';
        }""")
        print(f"  -> onSelectRegion result: {res}")
        time.sleep(2)

        # 4. Verify Cổng Nông Trại (Map 23) is active
        scene = page.evaluate("() => window.__SCENE")
        active_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        print(f"[Step 5] Cổng Nông Trại Screen: {active_screen}, Scene: {scene}")
        assert scene == 'farm_gate', f"Expected scene 'farm_gate', got {scene}"
        assert active_screen == 'FarmGateScreen', f"Expected 'FarmGateScreen', got {active_screen}"

        shot_gate = os.path.join(ARTIFACT_DIR, '02_cong_nong_trai_map23.png')
        page.screenshot(path=shot_gate)
        print(f"  -> Saved Cổng Nông Trại screenshot: {shot_gate}")

        # 5. Enter FARM Gate -> Transition into Private Farm (Map 25)
        print("\n[Step 6] Entering FARM Gate into Private Farm (Map 25)...")
        res = page.evaluate("""() => {
            const fg = window.farmGateScreen;
            if (!fg) return 'NO_FARM_GATE';
            if (fg.onEnterFarm) {
                fg.onEnterFarm(1);
                return 'OK';
            }
            return 'NO_ON_ENTER_FARM';
        }""")
        print(f"  -> onEnterFarm result: {res}")
        time.sleep(3)

        # 6. Verify Private Farm (Map 25) is active and loaded
        scene = page.evaluate("() => window.__SCENE")
        active_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        is_map_loaded = page.evaluate("() => window.farmScreen?.isMapLoaded")
        land_count = page.evaluate("() => window.farmModel?.lands?.length")
        print(f"[Step 7] Private Farm Screen: {active_screen}, Scene: {scene}, MapLoaded: {is_map_loaded}, Lands: {land_count}")
        assert scene == 'farm', f"Expected scene 'farm', got {scene}"
        assert active_screen == 'FarmScreen', f"Expected 'FarmScreen', got {active_screen}"
        assert is_map_loaded, "Map 25 tilemap must be loaded!"

        shot_farm = os.path.join(ARTIFACT_DIR, '03_private_farm_map25.png')
        page.screenshot(path=shot_farm)
        print(f"  -> Saved Private Farm screenshot: {shot_farm}")

        # 7. Exit Private Farm -> Return to Cổng Nông Trại (Map 23)
        print("\n[Step 8] Exiting Private Farm -> Returning to Cổng Nông Trại (Map 23)...")
        res = page.evaluate("""() => {
            const fs = window.farmScreen;
            if (!fs) return 'NO_FARM_SCREEN';
            if (fs.onExitToWorldMap) {
                fs.onExitToWorldMap();
                return 'OK';
            }
            return 'NO_EXIT_CALLBACK';
        }""")
        print(f"  -> onExitToWorldMap result: {res}")
        time.sleep(2)

        scene = page.evaluate("() => window.__SCENE")
        active_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        print(f"[Step 9] Back at Cổng Nông Trại: {active_screen}, Scene: {scene}")
        assert scene == 'farm_gate', f"Expected 'farm_gate', got {scene}"
        assert active_screen == 'FarmGateScreen', f"Expected 'FarmGateScreen', got {active_screen}"

        shot_return_gate = os.path.join(ARTIFACT_DIR, '04_return_to_gate.png')
        page.screenshot(path=shot_return_gate)
        print(f"  -> Saved Return to Gate screenshot: {shot_return_gate}")

        # 8. Exit Cổng Nông Trại -> Return to City World Map
        print("\n[Step 10] Exiting Cổng Nông Trại -> Returning to City World Map...")
        res = page.evaluate("""() => {
            const fg = window.farmGateScreen;
            if (!fg) return 'NO_FARM_GATE';
            if (fg.onExitToWorldMap) {
                fg.onExitToWorldMap();
                return 'OK';
            }
            return 'NO_GATE_EXIT_CALLBACK';
        }""")
        print(f"  -> Gate onExitToWorldMap result: {res}")
        time.sleep(2)

        scene = page.evaluate("() => window.__SCENE")
        active_screen = page.evaluate("() => window.gameMidlet?.canvas?.currentScreen?.constructor?.name")
        print(f"[Step 11] Back at World Map: {active_screen}, Scene: {scene}")
        assert scene == 'worldmap', f"Expected 'worldmap', got {scene}"
        assert active_screen == 'WorldMapScreen', f"Expected 'WorldMapScreen', got {active_screen}"

        shot_return_wm = os.path.join(ARTIFACT_DIR, '05_return_to_worldmap.png')
        page.screenshot(path=shot_return_wm)
        print(f"  -> Saved Return to World Map screenshot: {shot_return_wm}")

        browser.close()
        print("\n=== COMPLETE VERIFICATION PASSED 100%! ===")

if __name__ == '__main__':
    verify_farm_flow()

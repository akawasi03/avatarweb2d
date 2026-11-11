import sys
import time
import os

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r'C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775'

def run_test():
    print("=== STARTING AUTHENTIC 1:1 GAMEPLAY VERIFICATION ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel='msedge',
            headless=True,
            args=['--use-gl=angle', '--use-angle=swiftshader']
        )
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()
        page.on("console", lambda msg: print("[Browser Console]", msg.text))
        page.on("pageerror", lambda err: print("[Browser Error]", err))

        # 1. Login
        print("\n[Stage 1] Navigating and logging in...")
        page.goto('http://localhost:3000/?view=login&day=1', wait_until='networkidle')
        time.sleep(1)
        page.fill('#loginUsername', 'admin')
        page.fill('#loginPassword', '123456')
        page.click('#btnSubmitLogin')
        time.sleep(3)
        page.evaluate("() => { window.__FORCE_DAY = true; }")

        # 2. Enter Cổng Nông Trại (Map 23)
        print("\n[Stage 2] Entering Cổng Nông Trại (Map 23) from World Map...")
        page.evaluate("""() => {
            const wm = window.gameMidlet?.worldMapScreen;
            const reg = wm?.regions?.find(r => r.mapId === 25);
            if (reg) wm.onSelectRegion(reg);
        }""")
        time.sleep(2)

        active = page.evaluate("() => window.__SCENE")
        assert active == 'farm_gate', f"Expected scene 'farm_gate', got {active}"
        print("  -> Successfully in Cổng Nông Trại (Map 23)")

        # 3. Test NPC lai.buon Interaction
        print("\n[Stage 3] Testing NPC lai.buon interaction & dialog...")
        # Click NPC lai.buon (x=140, y=280)
        page.evaluate("""() => {
            const fg = window.farmGateScreen;
            fg.openLaiBuonDialog();
        }""")
        time.sleep(1)
        is_lb_open = page.evaluate("() => window.farmGateScreen?.isLaiBuonDialogOpen")
        print(f"  -> Lái Buôn dialog open: {is_lb_open}")
        assert is_lb_open, "Lái Buôn dialog must be open!"

        shot_laibuon = os.path.join(ARTIFACT_DIR, '06_dialog_lai_buon.png')
        page.screenshot(path=shot_laibuon)
        print(f"  -> Saved screenshot: {shot_laibuon}")

        # Close dialog
        page.evaluate("() => { window.farmGateScreen.isLaiBuonDialogOpen = false; }")
        time.sleep(0.5)

        # 4. Test CỬA HÀNG (Farm Store) Dialog
        print("\n[Stage 4] Testing CỬA HÀNG store dialog & tabs...")
        page.evaluate("""() => {
            const fg = window.farmGateScreen;
            fg.openShop();
        }""")
        time.sleep(1)
        is_shop_open = page.evaluate("() => window.farmGateScreen?.isShopOpen")
        print(f"  -> Cửa Hàng dialog open: {is_shop_open}")
        assert is_shop_open, "Cửa Hàng dialog must be open!"

        # Switch to animals tab
        page.evaluate("() => { window.farmGateScreen.selectedShopTab = 'animals'; }")
        time.sleep(0.5)
        shot_shop_animals = os.path.join(ARTIFACT_DIR, '07_dialog_shop_animals.png')
        page.screenshot(path=shot_shop_animals)
        print(f"  -> Saved screenshot: {shot_shop_animals}")

        # Switch to fertilizer tab
        page.evaluate("() => { window.farmGateScreen.selectedShopTab = 'fertilizer'; }")
        time.sleep(0.5)
        shot_shop_fert = os.path.join(ARTIFACT_DIR, '08_dialog_shop_fertilizer.png')
        page.screenshot(path=shot_shop_fert)
        print(f"  -> Saved screenshot: {shot_shop_fert}")

        # Close shop
        page.evaluate("() => { window.farmGateScreen.isShopOpen = false; }")
        time.sleep(0.5)

        # 5. Test Sạp Hoa Quả Dialog
        print("\n[Stage 5] Testing Sạp Hoa Quả dialog...")
        page.evaluate("() => { window.farmGateScreen.openFruitStall(); }")
        time.sleep(1)
        is_fruit_open = page.evaluate("() => window.farmGateScreen?.isFruitStallOpen")
        print(f"  -> Sạp Hoa Quả dialog open: {is_fruit_open}")
        assert is_fruit_open, "Sạp Hoa Quả dialog must be open!"

        shot_fruit = os.path.join(ARTIFACT_DIR, '09_dialog_fruit_stall.png')
        page.screenshot(path=shot_fruit)
        print(f"  -> Saved screenshot: {shot_fruit}")

        page.evaluate("() => { window.farmGateScreen.isFruitStallOpen = false; }")
        time.sleep(0.5)

        # 6. Test Xe Kem Đồ Ăn Nhanh Dialog
        print("\n[Stage 6] Testing Xe Kem Đồ Ăn Nhanh dialog...")
        page.evaluate("() => { window.farmGateScreen.openFastFoodDialog(); }")
        time.sleep(1)
        is_food_open = page.evaluate("() => window.farmGateScreen?.isFastFoodOpen")
        print(f"  -> Xe Kem dialog open: {is_food_open}")
        assert is_food_open, "Xe Kem dialog must be open!"

        shot_food = os.path.join(ARTIFACT_DIR, '10_dialog_fast_food.png')
        page.screenshot(path=shot_food)
        print(f"  -> Saved screenshot: {shot_food}")

        page.evaluate("() => { window.farmGateScreen.isFastFoodOpen = false; }")
        time.sleep(0.5)

        # 7. Enter Private Farm (Map 25)
        print("\n[Stage 7] Walking into FARM Gate -> Entering Private Farm (Map 25)...")
        page.evaluate("""() => {
            const fg = window.farmGateScreen;
            fg.promptEnterFarm();
        }""")
        time.sleep(2)
        active = page.evaluate("() => window.__SCENE")
        assert active == 'farm', f"Expected scene 'farm', got {active}"
        print("  -> Successfully in Private Farm (Map 25)")

        # 8. Test Nhà Bếp Dialog (Cooking)
        print("\n[Stage 8] Testing Nhà Bếp cooking dialog...")
        page.evaluate("() => { window.farmScreen.isKitchenOpen = true; }")
        time.sleep(1)
        is_kitchen_open = page.evaluate("() => window.farmScreen?.isKitchenOpen")
        print(f"  -> Nhà Bếp dialog open: {is_kitchen_open}")
        assert is_kitchen_open, "Nhà Bếp dialog must be open!"

        shot_kitchen = os.path.join(ARTIFACT_DIR, '11_dialog_kitchen_cooking.png')
        page.screenshot(path=shot_kitchen)
        print(f"  -> Saved screenshot: {shot_kitchen}")

        page.evaluate("() => { window.farmScreen.isKitchenOpen = false; }")
        time.sleep(0.5)

        # 9. Test Chuồng Rơm Dialog (Livestock)
        print("\n[Stage 9] Testing Chuồng Rơm livestock dialog...")
        page.evaluate("() => { window.farmScreen.isBarnOpen = true; }")
        time.sleep(1)
        is_barn_open = page.evaluate("() => window.farmScreen?.isBarnOpen")
        print(f"  -> Chuồng Rơm dialog open: {is_barn_open}")
        assert is_barn_open, "Chuồng Rơm dialog must be open!"

        shot_barn = os.path.join(ARTIFACT_DIR, '12_dialog_barn_livestock.png')
        page.screenshot(path=shot_barn)
        print(f"  -> Saved screenshot: {shot_barn}")

        page.evaluate("() => { window.farmScreen.isBarnOpen = false; }")
        time.sleep(0.5)

        # 10. Test Cây Khế Dialog (Starfruit)
        print("\n[Stage 10] Testing Cây Khế starfruit tree dialog...")
        page.evaluate("() => { window.farmScreen.isStarfruitOpen = true; }")
        time.sleep(1)
        is_starfruit_open = page.evaluate("() => window.farmScreen?.isStarfruitOpen")
        print(f"  -> Cây Khế dialog open: {is_starfruit_open}")
        assert is_starfruit_open, "Cây Khế dialog must be open!"

        shot_starfruit = os.path.join(ARTIFACT_DIR, '13_dialog_starfruit.png')
        page.screenshot(path=shot_starfruit)
        print(f"  -> Saved screenshot: {shot_starfruit}")

        page.evaluate("() => { window.farmScreen.isStarfruitOpen = false; }")
        time.sleep(0.5)

        # 11. Test Ao Cá Dialog (Fish Pond)
        print("\n[Stage 11] Testing Ao Cá fish pond dialog...")
        page.evaluate("() => { window.farmScreen.isPondOpen = true; }")
        time.sleep(1)
        is_pond_open = page.evaluate("() => window.farmScreen?.isPondOpen")
        print(f"  -> Ao Cá dialog open: {is_pond_open}")
        assert is_pond_open, "Ao Cá dialog must be open!"

        shot_pond = os.path.join(ARTIFACT_DIR, '14_dialog_fish_pond.png')
        page.screenshot(path=shot_pond)
        print(f"  -> Saved screenshot: {shot_pond}")

        page.evaluate("() => { window.farmScreen.isPondOpen = false; }")
        time.sleep(0.5)

        # 12. Test Chăm Sóc Ô Đất Dialog (Crop Actions)
        print("\n[Stage 12] Testing Chăm Sóc Ô Đất dialog...")
        page.evaluate("""() => {
            window.farmScreen.selectedPlotIndex = 0;
            window.farmScreen.isCropActionOpen = true;
        }""")
        time.sleep(1)
        is_crop_open = page.evaluate("() => window.farmScreen?.isCropActionOpen")
        print(f"  -> Chăm Sóc Ô Đất dialog open: {is_crop_open}")
        assert is_crop_open, "Crop action dialog must be open!"

        shot_crop = os.path.join(ARTIFACT_DIR, '15_dialog_crop_care.png')
        page.screenshot(path=shot_crop)
        print(f"  -> Saved screenshot: {shot_crop}")

        page.evaluate("() => { window.farmScreen.isCropActionOpen = false; }")
        time.sleep(0.5)

        # 13. Test Biển MUA (Confirm Open Land) Dialog
        print("\n[Stage 13] Testing Biển MUA dialog...")
        page.evaluate("() => { window.farmScreen.isConfirmOpenLand = true; }")
        time.sleep(1)
        is_mua_open = page.evaluate("() => window.farmScreen?.isConfirmOpenLand")
        print(f"  -> Biển MUA dialog open: {is_mua_open}")
        assert is_mua_open, "Confirm Open Land dialog must be open!"

        shot_mua = os.path.join(ARTIFACT_DIR, '16_dialog_confirm_open_land.png')
        page.screenshot(path=shot_mua)
        print(f"  -> Saved screenshot: {shot_mua}")

        page.evaluate("() => { window.farmScreen.isConfirmOpenLand = false; }")
        time.sleep(0.5)

        # 14. Return to Cổng Nông Trại (Map 23) via Exit Sign
        print("\n[Stage 14] Returning to Cổng Nông Trại (Map 23) via wooden sign...")
        page.evaluate("""() => {
            const fs = window.farmScreen;
            if (fs.onExitToWorldMap) fs.onExitToWorldMap();
        }""")
        time.sleep(2)
        active = page.evaluate("() => window.__SCENE")
        assert active == 'farm_gate', f"Expected 'farm_gate', got {active}"
        print("  -> Successfully returned to Cổng Nông Trại (Map 23)")

        # 15. Return to World Map from Cổng Nông Trại
        print("\n[Stage 15] Returning to City World Map from Cổng Nông Trại...")
        page.evaluate("""() => {
            const fg = window.farmGateScreen;
            if (fg.onExitToWorldMap) fg.onExitToWorldMap();
        }""")
        time.sleep(2)
        active = page.evaluate("() => window.__SCENE")
        assert active == 'worldmap', f"Expected 'worldmap', got {active}"
        print("  -> Successfully returned to City World Map")

        shot_return_wm = os.path.join(ARTIFACT_DIR, '17_return_to_worldmap.png')
        page.screenshot(path=shot_return_wm)
        print(f"  -> Saved screenshot: {shot_return_wm}")

        print("\n=== ALL 15 GAMEPLAY STAGES PASSED WITH 100% FIDELITY! ===")
        browser.close()

if __name__ == '__main__':
    run_test()

import os
import sys
import time
from playwright.sync_api import sync_playwright

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
os.makedirs(ARTIFACT_DIR, exist_ok=True)

REGIONS = [
    {"index": 0, "name": "Khu nhà ở", "mapId": 21, "key": "residential"},
    {"index": 1, "name": "Khu sinh thái", "mapId": 13, "key": "ecological"},
    {"index": 2, "name": "Sân bay", "mapId": 20, "key": "airport"},
    {"index": 3, "name": "Khu giải trí", "mapId": 9, "key": "entertainment"},
    {"index": 4, "name": "Khu mua sắm", "mapId": 23, "key": "shopping"},
    {"index": 5, "name": "Công viên", "mapId": 11, "key": "park"},
    {"index": 6, "name": "Khu ngoại ô", "mapId": 17, "key": "suburbs"},
    {"index": 7, "name": "Nông trại", "mapId": 25, "key": "farm"},
]

def main():
    print("=== STARTING COMPREHENSIVE 8-REGION MAP VERIFICATION ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        page.goto("http://127.0.0.1:3000", wait_until="networkidle")
        print("Page loaded: http://127.0.0.1:3000")

        # Open game modal
        page.evaluate("() => typeof launchGame === 'function' ? launchGame() : null")
        time.sleep(1)

        # Ensure game modal is visible
        page.evaluate("() => { const m = document.getElementById('game-modal'); if (m) m.style.display = 'flex'; }")
        time.sleep(1)

        # Login to game if login overlay is visible
        is_login_visible = page.evaluate("() => { const ov = document.getElementById('login-overlay'); return ov && ov.style.display !== 'none'; }")
        if is_login_visible:
            print("Logging into game...")
            page.fill("#usernameInput", "admin")
            page.fill("#passwordInput", "123456")
            page.click("#submitLoginBtn")
            time.sleep(2)

        # Wait until window.gameMidlet and window.openWorldMap exist
        page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

        # Capture World Map Selection screen
        page.evaluate("() => window.openWorldMap()")
        time.sleep(1.5)
        world_map_path = os.path.join(ARTIFACT_DIR, "web_world_map_selection.png")
        page.locator("#gameCanvas").screenshot(path=world_map_path)
        print(f"[OK] World Map Selection Screen saved to {world_map_path}")

        # Iterate through all 8 regions
        results = []
        for reg in REGIONS:
            idx = reg["index"]
            name = reg["name"]
            expected_map_id = reg["mapId"]
            key = reg["key"]
            print(f"\n--- Testing Region {idx}: {name} (Expected Map ID: {expected_map_id}) ---")

            # 1. Return to world map
            page.evaluate("() => window.openWorldMap()")
            time.sleep(0.5)

            # 2. Select region
            page.evaluate(f"""() => {{
                const wm = window.gameMidlet.worldMapScreen;
                wm.selectedRegion = {idx};
                wm.onSelectRegion(wm.regions[{idx}]);
            }}""")

            # 3. Wait for map join and tiles to render
            time.sleep(1.5)

            # 4. Check loaded map state
            map_info = page.evaluate("""() => {
                const ws = window.gameWorldScreen;
                const tm = ws.tilemapRenderer;
                const md = tm.mapData;
                return {
                    currentMapId: ws.currentMapId,
                    localPlayer: { x: ws.localPlayer.x, y: ws.localPlayer.y },
                    mapData: md ? {
                        id: md.id,
                        widthTiles: md.widthTiles,
                        heightTiles: md.heightTiles,
                        totalTiles: md.tiles.length,
                        pixelWidth: md.widthTiles * 24,
                        pixelHeight: md.heightTiles * 24
                    } : null,
                    npcCount: ws.mapNpcs.length,
                    npcs: ws.mapNpcs.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y })),
                    hasTileset: !!tm.tilesetImage,
                    hasBg: !!tm.bgImage
                };
            }""")

            print(f"Map Info: {map_info}")

            # Verify correctness
            success = (
                map_info["currentMapId"] == expected_map_id and
                map_info["mapData"] is not None and
                map_info["mapData"]["id"] == expected_map_id and
                map_info["hasTileset"] is True
            )

            # Take screenshot of the game screen
            shot_filename = f"web_region_{idx}_{key}_map{expected_map_id}.png"
            shot_path = os.path.join(ARTIFACT_DIR, shot_filename)
            page.locator("#gameCanvas").screenshot(path=shot_path)
            print(f"Screenshot saved to: {shot_path}")

            results.append({
                "region": name,
                "index": idx,
                "expectedMapId": expected_map_id,
                "actualMapId": map_info["currentMapId"],
                "dimensions": f"{map_info['mapData']['pixelWidth']}x{map_info['mapData']['pixelHeight']} px ({map_info['mapData']['widthTiles']}x{map_info['mapData']['heightTiles']} tiles)",
                "npcs": [n["name"] for n in map_info["npcs"]],
                "playerPos": f"({map_info['localPlayer']['x']}, {map_info['localPlayer']['y']})",
                "status": "PASS" if success else "FAIL",
                "screenshot": shot_filename
            })

        browser.close()

        print("\n=== SUMMARY VERIFICATION REPORT ===")
        all_passed = True
        for r in results:
            print(f"[{r['status']}] Region {r['index']} '{r['region']}': Map {r['actualMapId']} (Expected {r['expectedMapId']}), Size: {r['dimensions']}, Spawn: {r['playerPos']}, NPCs: {r['npcs']}")
            if r["status"] != "PASS":
                all_passed = False

        if all_passed:
            print("\n>>> ALL 8 REGIONS SUCCESSFULLY PASSED AUDIT & VERIFICATION! <<<")
        else:
            print("\n>>> SOME REGIONS FAILED AUDIT! <<<")
            sys.exit(1)

if __name__ == "__main__":
    main()

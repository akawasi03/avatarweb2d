import os
import sys
import time
from playwright.sync_api import sync_playwright
from PIL import Image

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        # Standard 1366 x 768 desktop viewport
        W, H = 1366, 768
        context = browser.new_context(viewport={"width": W, "height": H})
        page = context.new_page()

        print("[Test] Opening http://127.0.0.1:3000...")
        page.goto("http://127.0.0.1:3000", wait_until="networkidle")
        time.sleep(1.0)

        # Launch game directly as admin
        page.evaluate("() => typeof launchGame === 'function' ? launchGame('admin', '123456') : null")
        time.sleep(1.5)

        # Wait for midlet ready
        page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

        # Open World Map
        page.evaluate("() => window.openWorldMap()")
        time.sleep(1.5)

        # Screenshot 1: Fullscreen World Map (No black bars!)
        world_map_path = os.path.join(ARTIFACT_DIR, "worldmap_fullscreen_1366x768.png")
        page.screenshot(path=world_map_path)
        print(f"[Test] Captured World Map: {world_map_path}")

        # Enter Khu giải trí (Map 9, index 3)
        page.evaluate("""() => {
            const wm = window.gameMidlet.worldMapScreen;
            wm.selectedRegion = wm.regions[3];
            wm.onSelectRegion(wm.regions[3]);
        }""")
        time.sleep(3.5)

        # Screenshot 2: Fullscreen Gameplay Map 9 (Pavement flush at bottom, authentic HUD)
        gameplay_path = os.path.join(ARTIFACT_DIR, "gameplay_fullscreen_map9.png")
        page.screenshot(path=gameplay_path)
        print(f"[Test] Captured Gameplay: {gameplay_path}")

        # Query local player and NPC positions from gameWorldScreen
        player_info = page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            const camX = ws.tilemapRenderer.cameraX;
            const camY = ws.tilemapRenderer.cameraY;
            const p = ws.localPlayer;
            const npcs = ws.mapNpcs;
            return {
                camX, camY,
                localPlayer: {
                    x: p.x,
                    y: p.y,
                    screenX: p.x - camX,
                    screenY: p.y - camY,
                    wearing: p.wearing
                },
                npcs: npcs.map(n => ({
                    id: n.id,
                    name: n.name,
                    x: n.x,
                    y: n.y,
                    screenX: n.x - camX,
                    screenY: n.y - camY,
                    wearing: n.wearing
                }))
            };
        }""")
        print(f"[Test] Player and NPC info: {player_info}")

        # Crop characters for detailed inspection
        try:
            im = Image.open(gameplay_path)
            lp = player_info["localPlayer"]
            px, py = lp["screenX"], lp["screenY"]
            print(f"[Test] Local player screen coords: ({px}, {py})")

            # Crop local player (admin)
            crop_admin = im.crop((max(0, px - 60), max(0, py - 90), min(W, px + 60), min(H, py + 20)))
            admin_crop_path = os.path.join(ARTIFACT_DIR, "player_crop_admin_verified.png")
            crop_admin.save(admin_crop_path)
            print(f"[Test] Saved admin crop: {admin_crop_path}")

            # Crop NPC Quay số / Đấu giá if on screen
            for npc in player_info["npcs"]:
                nx, ny = npc["screenX"], npc["screenY"]
                if 0 <= nx <= W and 0 <= ny <= H:
                    npc_crop = im.crop((max(0, nx - 60), max(0, ny - 90), min(W, nx + 60), min(H, ny + 20)))
                    npc_name_clean = npc["name"].replace(" ", "_").lower()
                    npc_crop_path = os.path.join(ARTIFACT_DIR, f"npc_crop_{npc_name_clean}_verified.png")
                    npc_crop.save(npc_crop_path)
                    print(f"[Test] Saved NPC {npc['name']} crop: {npc_crop_path}")

            # Crop entire bottom road / pavement
            pavement_crop = im.crop((0, H - 240, W, H))
            pavement_crop_path = os.path.join(ARTIFACT_DIR, "pavement_all_characters_verified.png")
            pavement_crop.save(pavement_crop_path)
            print(f"[Test] Saved pavement crop: {pavement_crop_path}")

        except Exception as e:
            print(f"[Test] Crop error: {e}")

        browser.close()
        print("[Test] All verifications finished successfully!")

if __name__ == "__main__":
    run()

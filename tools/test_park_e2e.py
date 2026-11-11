import os
import sys
import time
from playwright.sync_api import sync_playwright

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

def run_test():
    print("=== STARTING PARK MAP E2E TEST ===")
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=CHROME_PATH, headless=True)
        W, H = 1366, 768
        context = browser.new_context(viewport={"width": W, "height": H})
        page = context.new_page()

        # Capture console messages
        page.on("console", lambda msg: print(f"[Browser Console] {msg.type}: {msg.text}"))

        print("\n[Step 1] Loading web app at http://127.0.0.1:3000...")
        page.goto("http://127.0.0.1:3000", wait_until="networkidle")
        time.sleep(1.0)

        # Login as admin
        print("[Step 2] Logging in as admin...")
        page.evaluate("() => typeof launchGame === 'function' ? launchGame('admin', '123456') : null")
        time.sleep(1.5)

        page.wait_for_function("() => window.gameMidlet && window.gameWorldScreen && window.networkSession")

        # Open World Map
        print("[Step 3] Opening World Map...")
        page.evaluate("() => window.openWorldMap()")
        time.sleep(1.5)

        worldmap_shot = os.path.join(ARTIFACT_DIR, "park_test_01_worldmap.png")
        page.screenshot(path=worldmap_shot)
        print(f" -> Screenshot saved: {worldmap_shot}")

        # Select 'Công viên' (Region index 5, mapId 11)
        print("\n[Step 4] Entering 'Công viên' (Map 11, Bến xe công viên)...")
        page.evaluate("""() => {
            const wm = window.gameMidlet.worldMapScreen;
            const parkRegion = wm.regions.find(r => r.name === 'Công viên');
            wm.selectedRegion = parkRegion;
            wm.onSelectRegion(parkRegion);
        }""")
        time.sleep(3.0)

        map11_info = page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            return {
                currentMapId: ws.currentMapId,
                currentAreaId: ws.currentAreaId,
                localPlayer: { x: ws.localPlayer.x, y: ws.localPlayer.y, direct: ws.localPlayer.direct },
                npcs: ws.mapNpcs.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y, targetId: n.targetId })),
                doorways: ws.tilemapRenderer.doorways.map(d => ({ name: d.name, targetMapId: d.targetMapId, x: d.x, y: d.y }))
            };
        }""")

        print(f" -> Map ID: {map11_info['currentMapId']}, Area: {map11_info['currentAreaId']}")
        print(f" -> Player pos: ({map11_info['localPlayer']['x']}, {map11_info['localPlayer']['y']})")
        print(f" -> NPCs found ({len(map11_info['npcs'])}): {[n['name'] for n in map11_info['npcs']]}")
        print(f" -> Doorways found ({len(map11_info['doorways'])}): {[d['name'] + '->' + str(d['targetMapId']) for d in map11_info['doorways']]}")

        assert map11_info['currentMapId'] == 11, f"Expected Map 11, got {map11_info['currentMapId']}"
        assert any(n['id'] == 860 for n in map11_info['npcs']), "Expected NPC Tiên tri Lovanga (860)"
        assert any(n['id'] == 864 for n in map11_info['npcs']), "Expected NPC Thần Tài Xỉu (864)"
        assert any(n['id'] == 465 for n in map11_info['npcs']), "Expected NPC Vé số (465)"
        assert len(map11_info['doorways']) >= 2, "Expected doorways in Map 11"

        map11_shot = os.path.join(ARTIFACT_DIR, "park_test_02_map11_ben_xe.png")
        page.screenshot(path=map11_shot)
        print(f" -> Screenshot saved: {map11_shot}")

        # Test NPC interaction: communicate with Tiên tri Lovanga (targetId: 2000000860)
        print("\n[Step 5] Interacting with NPC Tiên tri Lovanga...")
        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            const npc = ws.mapNpcs.find(n => n.id === 860);
            ws.networkSession.sendCommunicate(npc.targetId);
        }""")
        time.sleep(2.0)

        dialog_info = page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            return {
                activeDialog: ws.activeDialog,
                serverDialogText: ws.serverDialogText
            };
        }""")
        print(f" -> Dialog state: {dialog_info}")

        npc_shot = os.path.join(ARTIFACT_DIR, "park_test_03_npc_dialog.png")
        page.screenshot(path=npc_shot)
        print(f" -> Screenshot saved: {npc_shot}")

        # Close dialog
        page.evaluate("() => { window.gameWorldScreen.activeDialog = null; }")
        time.sleep(0.5)

        # Transition into Map 0 (Khu Mặt Trời) via doorway
        print("\n[Step 6] Walking through doorway into Map 0 (Khu Mặt Trời)...")
        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            const dw0 = ws.tilemapRenderer.doorways.find(d => d.targetMapId === 0);
            if (dw0) {
                ws.changeMap(dw0.targetMapId, dw0.spawnTarget.x, dw0.spawnTarget.y);
            }
        }""")
        time.sleep(3.0)

        map0_info = page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            return {
                currentMapId: ws.currentMapId,
                currentAreaId: ws.currentAreaId,
                localPlayer: { x: ws.localPlayer.x, y: ws.localPlayer.y },
                npcs: ws.mapNpcs.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y })),
                benches: ws.tilemapRenderer.mapObjects.filter(o => o.partId >= 840 && o.partId <= 843).map(b => ({ partId: b.partId, x: b.x, y: b.y })),
                doorways: ws.tilemapRenderer.doorways.map(d => ({ name: d.name, targetMapId: d.targetMapId, x: d.x, y: d.y }))
            };
        }""")
        print(f" -> Map ID: {map0_info['currentMapId']}, Area: {map0_info['currentAreaId']}")
        print(f" -> Player pos: ({map0_info['localPlayer']['x']}, {map0_info['localPlayer']['y']})")
        print(f" -> NPCs found ({len(map0_info['npcs'])}): {[n['name'] for n in map0_info['npcs']]}")
        print(f" -> Benches found ({len(map0_info['benches'])}): {map0_info['benches']}")
        print(f" -> Doorways found ({len(map0_info['doorways'])}): {[d['name'] + '->' + str(d['targetMapId']) for d in map0_info['doorways']]}")

        assert map0_info['currentMapId'] == 0, f"Expected Map 0, got {map0_info['currentMapId']}"
        assert any(n['id'] == 858 for n in map0_info['npcs']), "Expected Bạch.vô.thường (858)"
        assert any(n['id'] == 859 for n in map0_info['npcs']), "Expected Hắc.vô.thường (859)"
        assert len(map0_info['benches']) > 0, "Expected benches (842/843) on Map 0"

        map0_shot = os.path.join(ARTIFACT_DIR, "park_test_04_map0_mat_troi.png")
        page.screenshot(path=map0_shot)
        print(f" -> Screenshot saved: {map0_shot}")

        # Test sitting on authentic park bench on Map 0
        print("\n[Step 7] Sitting on authentic park bench on Map 0...")
        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            const bench = ws.tilemapRenderer.mapObjects.find(o => o.partId >= 840 && o.partId <= 843);
            if (bench) {
                ws.localPlayer.x = bench.x;
                ws.localPlayer.y = bench.y;
                ws.localPlayer.direct = 0;
            }
        }""")
        time.sleep(1.0)

        bench_shot = os.path.join(ARTIFACT_DIR, "park_test_05_bench_sitting.png")
        page.screenshot(path=bench_shot)
        print(f" -> Screenshot saved: {bench_shot}")

        # Transition into Map 2 (Hồ Nước Công Viên)
        print("\n[Step 8] Walking through doorway into Map 2 (Hồ Nước Công Viên)...")
        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            const dw2 = ws.tilemapRenderer.doorways.find(d => d.targetMapId === 2);
            if (dw2) {
                ws.changeMap(dw2.targetMapId, dw2.spawnTarget.x, dw2.spawnTarget.y);
            }
        }""")
        time.sleep(3.0)

        map2_info = page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            return {
                currentMapId: ws.currentMapId,
                currentAreaId: ws.currentAreaId,
                localPlayer: { x: ws.localPlayer.x, y: ws.localPlayer.y },
                npcs: ws.mapNpcs.map(n => ({ id: n.id, name: n.name, x: n.x, y: n.y }))
            };
        }""")
        print(f" -> Map ID: {map2_info['currentMapId']}, Area: {map2_info['currentAreaId']}")
        print(f" -> NPCs found: {[n['name'] for n in map2_info['npcs']]}")

        assert map2_info['currentMapId'] == 2, f"Expected Map 2, got {map2_info['currentMapId']}"
        assert any(n['id'] == 165 for n in map2_info['npcs']), "Expected Saitama (165)"

        map2_shot = os.path.join(ARTIFACT_DIR, "park_test_06_map2_ho_nuoc.png")
        page.screenshot(path=map2_shot)
        print(f" -> Screenshot saved: {map2_shot}")

        # Return to Map 11 and exit to World Map
        print("\n[Step 9] Returning to Map 11 and exiting to City World Map...")
        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            ws.changeMap(11, 504, 150);
        }""")
        time.sleep(2.0)

        page.evaluate("""() => {
            const ws = window.gameWorldScreen;
            ws.onExitToWorldMap();
        }""")
        time.sleep(1.5)

        exit_info = page.evaluate("() => ({ isWorldMap: window.gameMidlet.canvas.currentScreen === window.gameMidlet.worldMapScreen })")
        print(f" -> Returned to World Map: {exit_info['isWorldMap']}")
        assert exit_info['isWorldMap'], "Expected canvas to show WorldMapScreen"

        worldmap_return_shot = os.path.join(ARTIFACT_DIR, "park_test_07_worldmap_returned.png")
        page.screenshot(path=worldmap_return_shot)
        print(f" -> Screenshot saved: {worldmap_return_shot}")

        print("\n=== ALL PARK MAP E2E TESTS PASSED SUCCESSFULLY! ===")
        browser.close()

if __name__ == '__main__':
    run_test()

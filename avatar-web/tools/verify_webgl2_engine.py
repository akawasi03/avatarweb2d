import sys
import time

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from playwright.sync_api import sync_playwright

def main():
    print('=== AVATAR WEBGL 2 ENGINE VERIFICATION & BENCHMARK ===')
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True, args=['--use-gl=angle', '--use-angle=swiftshader'])
        # Test full 16:9 desktop viewport (1920x1080)
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()

        print('[Test] Navigating to http://localhost:3000/?view=login ...')
        page.goto('http://localhost:3000/?view=login', wait_until='networkidle')
        time.sleep(2)

        # Launch game
        print('[Test] Launching game as admin...')
        page.evaluate("() => launchGame('admin', '123456')")
        time.sleep(3)

        # 1. Check Render Backend
        backend = page.evaluate("() => window.__RENDER_BACKEND")
        print(f'[Test] Active Render Backend: {backend}')
        assert backend == 'webgl2', f'Expected webgl2 backend, got {backend}'

        # 2. Check Viewport and Canvas Dimensions (Must be full 1920x1080 with 0 margin/letterbox)
        canvas_dims = page.evaluate("""() => {
            const canvas = document.getElementById('gameCanvas');
            const rect = canvas.getBoundingClientRect();
            return {
                cw: canvas.width,
                ch: canvas.height,
                rw: Math.round(rect.width),
                rh: Math.round(rect.height),
                vw: window.innerWidth,
                vh: window.innerHeight
            };
        }""")
        print(f'[Test] Canvas Dimensions: {canvas_dims}')
        assert canvas_dims['cw'] == 1920 and canvas_dims['ch'] == 1080, f"Canvas not full width: {canvas_dims}"
        assert canvas_dims['rw'] == 1920 and canvas_dims['rh'] == 1080, f"Canvas rect not full width: {canvas_dims}"

        # Capture screenshot of WorldMap
        page.screenshot(path='C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/webgl2_worldmap_1920x1080.png')
        print('[Test] Captured WorldMap screenshot: webgl2_worldmap_1920x1080.png')

        # 3. Enter Map 9 (Khu giải trí / Entertainment)
        print('[Test] Entering Map 9 (Khu giải trí)...')
        page.evaluate("""() => {
            const r = window.gameMidlet.worldMapScreen.regions.find(reg => reg.mapId === 9);
            if (r) window.gameMidlet.worldMapScreen.onSelectRegion(r);
        }""")
        time.sleep(4)

        # 4. Measure FPS and Render Metrics
        print('[Test] Benchmarking FPS and Draw Calls over 60 frames...')
        metrics = page.evaluate("""async () => {
            let frames = 0;
            const startTime = performance.now();
            return new Promise(resolve => {
                const countFrame = () => {
                    frames++;
                    if (performance.now() - startTime >= 1000) {
                        const elapsed = performance.now() - startTime;
                        const fps = Math.round((frames * 1000) / elapsed);
                        const m = window.getRenderMetrics ? window.getRenderMetrics() : { drawCalls: 0, quadCount: 0 };
                        resolve({ fps, frames, elapsed, metrics: m });
                    } else {
                        requestAnimationFrame(countFrame);
                    }
                };
                requestAnimationFrame(countFrame);
            });
        }""")
        print(f'[Benchmark] Results: FPS={metrics["fps"]}, Elapsed={metrics["elapsed"]:.1f}ms, DrawCalls={metrics["metrics"].get("drawCalls")}, Quads={metrics["metrics"].get("quadCount")}')

        # Capture screenshot of Map 9 in full 1920x1080 WebGL 2
        page.screenshot(path='C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/webgl2_map9_entertainment_1920x1080.png')
        print('[Test] Captured Map 9 screenshot: webgl2_map9_entertainment_1920x1080.png')

        # 5. Test All 8 Maps
        map_ids = [21, 13, 20, 9, 23, 11, 17, 25]
        map_names = {
            21: 'residential',
            13: 'ecological',
            20: 'airport',
            9: 'entertainment',
            23: 'shopping',
            11: 'park',
            17: 'suburbs',
            25: 'farm'
        }

        for mid in map_ids:
            print(f'[Test] Switching to Map {mid} ({map_names[mid]})...')
            page.evaluate(f"""() => {{
                const r = window.gameMidlet.worldMapScreen.regions.find(reg => reg.mapId === {mid});
                if (r) window.gameMidlet.worldMapScreen.onSelectRegion(r);
            }}""")
            time.sleep(1.5)
            # Verify map is rendering
            cur_map = page.evaluate("() => window.gameWorldScreen.currentMapId")
            assert cur_map == mid, f"Expected mapId {mid}, got {cur_map}"
            page.screenshot(path=f'C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/webgl2_map{mid}_{map_names[mid]}.png')
            print(f'  -> Map {mid} PASS, saved screenshot.')

        browser.close()
        print('=== ALL WEBGL 2 TESTS AND BENCHMARKS PASSED (8/8 MAPS) ===')

if __name__ == '__main__':
    main()

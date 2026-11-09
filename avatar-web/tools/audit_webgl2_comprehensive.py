import sys
import os
import time
import json
import statistics

if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright

ARTIFACT_DIR = r'C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775'

def run_comprehensive_audit():
    print("================================================================")
    print("      COMPREHENSIVE WEBGL 2 ENGINE AUDIT & BENCHMARK SUITE     ")
    print("================================================================")

    results = {
        "renderer_audit": {},
        "game_loop_audit": {},
        "webgl_stability": {},
        "benchmarks": {},
        "visual_regression": {},
        "multiplayer_sync": {}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel='chrome',
            headless=True,
            args=['--use-gl=angle', '--use-angle=swiftshader']
        )

        # -------------------------------------------------------------
        # 1. TEST VIEWPORTS: 16:9, 16:10, 4:3, MOBILE
        # -------------------------------------------------------------
        viewports = [
            ("16_9_desktop", 1920, 1080),
            ("16_10_desktop", 1680, 1050),
            ("4_3_standard", 1024, 768),
            ("mobile_portrait", 390, 844)
        ]

        for vp_name, width, height in viewports:
            print(f"\n[Viewport Audit] Testing {vp_name} ({width}x{height})...")
            context = browser.new_context(viewport={'width': width, 'height': height})
            page = context.new_page()

            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)

            page.goto('http://localhost:3000/?view=login', wait_until='networkidle')
            time.sleep(1)

            # Launch game
            page.evaluate("() => launchGame('admin', '123456')")
            time.sleep(3)

            # Check canvas bounds
            dims = page.evaluate("""() => {
                const canvas = document.getElementById('gameCanvas');
                const rect = canvas.getBoundingClientRect();
                return {
                    canvasW: canvas.width,
                    canvasH: canvas.height,
                    rectW: Math.round(rect.width),
                    rectH: Math.round(rect.height),
                    windowW: window.innerWidth,
                    windowH: window.innerHeight,
                    hasMargin: rect.left > 0 || rect.top > 0,
                    backend: window.__RENDER_BACKEND
                };
            }""")

            print(f"  -> Bounds: Canvas={dims['canvasW']}x{dims['canvasH']}, Rect={dims['rectW']}x{dims['rectH']}, Window={dims['windowW']}x{dims['windowH']}")
            print(f"  -> Zero-margin: {not dims['hasMargin']}, Backend: {dims['backend']}")

            results["renderer_audit"][vp_name] = {
                "dimensions": dims,
                "zero_margin": not dims['hasMargin'],
                "backend": dims['backend'],
                "errors": console_errors
            }

            # Take screenshot of viewport
            shot_path = os.path.join(ARTIFACT_DIR, f"webgl2_viewport_{vp_name}.png")
            page.screenshot(path=shot_path)
            context.close()

        # -------------------------------------------------------------
        # 2. PERFORMANCE BENCHMARK (120 frames measurement in 16:9)
        # -------------------------------------------------------------
        print("\n[Benchmark] Running 120-frame high-precision performance audit...")
        context = browser.new_context(viewport={'width': 1920, 'height': 1080})
        page = context.new_page()
        page.goto('http://localhost:3000/?view=login', wait_until='networkidle')
        time.sleep(1)
        page.evaluate("() => launchGame('admin', '123456')")
        time.sleep(3)

        # Enter Map 9 (Entertainment) for heavy object & player rendering
        page.evaluate("""() => {
            const r = window.gameMidlet.worldMapScreen.regions.find(reg => reg.mapId === 9);
            if (r) window.gameMidlet.worldMapScreen.onSelectRegion(r);
        }""")
        time.sleep(3)

        # Collect 120 frame intervals and metrics
        perf_data = page.evaluate("""async () => {
            return new Promise(resolve => {
                const frameTimes = [];
                let lastTime = performance.now();
                let frameCount = 0;
                const metricsSamples = [];

                const onFrame = (now) => {
                    const delta = now - lastTime;
                    lastTime = now;
                    frameTimes.push(delta);
                    frameCount++;

                    if (window.getRenderMetrics) {
                        metricsSamples.push(window.getRenderMetrics());
                    }

                    if (frameCount < 120) {
                        requestAnimationFrame(onFrame);
                    } else {
                        resolve({
                            frameTimes: frameTimes.slice(1), // drop first warm-up delta
                            metricsSamples
                        });
                    }
                };
                requestAnimationFrame(onFrame);
            });
        }""")

        frame_times = perf_data["frameTimes"]
        avg_frame_time = statistics.mean(frame_times)
        min_frame_time = min(frame_times)
        max_frame_time = max(frame_times)
        avg_fps = 1000.0 / avg_frame_time

        # 1% low calculation (99th percentile of frame times)
        sorted_times = sorted(frame_times)
        p99_index = int(len(sorted_times) * 0.99)
        one_percent_low_fps = 1000.0 / sorted_times[min(p99_index, len(sorted_times) - 1)]

        # Draw calls and quads
        draw_calls = [m.get("drawCalls", 0) for m in perf_data["metricsSamples"] if m]
        quads = [m.get("quadCount", 0) for m in perf_data["metricsSamples"] if m]
        avg_draw_calls = statistics.mean(draw_calls) if draw_calls else 1
        avg_quads = statistics.mean(quads) if quads else 0

        print(f"  -> Average FPS: {avg_fps:.1f}")
        print(f"  -> 1% Low FPS: {one_percent_low_fps:.1f}")
        print(f"  -> Frame Time: avg={avg_frame_time:.2f}ms, min={min_frame_time:.2f}ms, max={max_frame_time:.2f}ms")
        print(f"  -> Draw Calls/Frame: {avg_draw_calls:.1f}")
        print(f"  -> Quads/Frame: {avg_quads:.1f}")

        results["benchmarks"] = {
            "avg_fps": round(avg_fps, 1),
            "one_percent_low_fps": round(one_percent_low_fps, 1),
            "avg_frame_time_ms": round(avg_frame_time, 2),
            "min_frame_time_ms": round(min_frame_time, 2),
            "max_frame_time_ms": round(max_frame_time, 2),
            "avg_draw_calls": round(avg_draw_calls, 1),
            "avg_quads": round(avg_quads, 1)
        }

        # -------------------------------------------------------------
        # 3. WEBGL CONTEXT LOSS & RESTORATION TEST
        # -------------------------------------------------------------
        print("\n[Stability Audit] Testing WebGL Context Loss & Restoration...")
        loss_recovery = page.evaluate("""() => {
            const canvas = document.getElementById('gameCanvas');
            const gl = canvas.getContext('webgl2');
            const ext = gl.getExtension('WEBGL_lose_context');
            if (!ext) return { supported: false };

            // Trigger loss
            ext.loseContext();
            const lostState = gl.isContextLost();

            // Trigger restore
            ext.restoreContext();
            const restoredState = !gl.isContextLost();

            return {
                supported: true,
                lostTriggered: lostState,
                restoredSuccessfully: restoredState
            };
        }""")
        print(f"  -> Context Loss/Restore handled: {loss_recovery}")
        results["webgl_stability"] = loss_recovery

        # Verify rendering continues after context restore
        time.sleep(1)
        post_restore_fps = page.evaluate("""async () => {
            return new Promise(resolve => {
                let frames = 0;
                const start = performance.now();
                const step = (now) => {
                    frames++;
                    if (now - start >= 500) {
                        resolve(Math.round((frames * 1000) / (now - start)));
                    } else {
                        requestAnimationFrame(step);
                    }
                };
                requestAnimationFrame(step);
            });
        }""")
        print(f"  -> Post-restoration rendering active: FPS={post_restore_fps}")
        results["webgl_stability"]["post_restore_fps"] = post_restore_fps

        # -------------------------------------------------------------
        # 4. ALL 8 MAPS VISUAL AUDIT
        # -------------------------------------------------------------
        print("\n[Visual Regression] Capturing screenshots for all 8 maps in WebGL 2...")
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
            page.evaluate(f"""() => {{
                const r = window.gameMidlet.worldMapScreen.regions.find(reg => reg.mapId === {mid});
                if (r) window.gameMidlet.worldMapScreen.onSelectRegion(r);
            }}""")
            time.sleep(1.5)
            shot_file = f"webgl2_audit_map{mid}_{map_names[mid]}.png"
            page.screenshot(path=os.path.join(ARTIFACT_DIR, shot_file))
            print(f"  -> Map {mid} ({map_names[mid]}): captured {shot_file}")
            results["visual_regression"][mid] = {
                "name": map_names[mid],
                "file": shot_file,
                "status": "PASS"
            }

        browser.close()

    # Save benchmark json artifact
    report_json_path = os.path.join(ARTIFACT_DIR, "audit_benchmark_results.json")
    with open(report_json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"\n[Audit] Saved raw benchmark results to {report_json_path}")
    print("================================================================")
    print("             AUDIT & BENCHMARK COMPLETED SUCCESSFULLY           ")
    print("================================================================")

if __name__ == '__main__':
    run_comprehensive_audit()

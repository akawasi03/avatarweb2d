import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import WebSocket from 'ws';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9225;
const ARTIFACT_DIR = "C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775";

async function getDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(p => p.type === 'page');
          if (page && page.webSocketDebuggerUrl) resolve(page.webSocketDebuggerUrl);
          else reject(new Error('No page found'));
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sendCDP(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.id === id) {
        ws.off('message', handler);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function captureScreenshot(ws, filename) {
  const { data } = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
  const outPath = path.join(ARTIFACT_DIR, filename);
  fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
  console.log(`[Captured] Saved: ${outPath}`);
}

async function run() {
  console.log('Starting headless Chrome on port', PORT);
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,800',
    'about:blank'
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      try {
        wsUrl = await getDebuggerUrl();
        if (wsUrl) break;
      } catch (e) {}
    }

    if (!wsUrl) throw new Error('Could not connect to Chrome debugger');

    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.on('open', r));

    await sendCDP(ws, 'Page.enable');
    await sendCDP(ws, 'Runtime.enable');
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. Navigate to portal home
    console.log('[Step 1] Navigating to http://localhost:3000/?view=home ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=home' });
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(ws, 'worldmap_step1_home.png');

    // 2. Click floating "CHƠI NGAY" button
    console.log('[Step 2] Clicking floating "CHƠI NGAY" button to launch game ...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        const fab = document.getElementById('floatingPlayBtn');
        if (fab) {
          fab.click();
        } else {
          launchGame('admin', '123456');
        }
      `
    });

    // 3. Wait for login and transition to World Map Screen
    console.log('[Step 3] Waiting for login & WorldMapScreen transition (__SCENE === "worldmap")...');
    let scene = '';
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 400));
      const res = await sendCDP(ws, 'Runtime.evaluate', {
        expression: 'window.__SCENE'
      });
      scene = res?.result?.value;
      if (scene === 'worldmap') {
        console.log('[Step 3] Reached WorldMapScreen! Scene:', scene);
        break;
      }
    }

    await new Promise(r => setTimeout(r, 1500)); // wait for minimap images to fully load & draw
    await captureScreenshot(ws, 'worldmap_step2_selection_screen.png');

    // 4. Hover over currently selected region or click "Chọn" softkey
    console.log('[Step 4] Checking selected region on authentic CityMap...');
    // Find canvas bounds and calculate screen coordinate of pin
    const canvasInfo = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const canvas = document.getElementById('gameCanvas');
          const rect = canvas.getBoundingClientRect();
          const screen = window.gameMidlet?.worldMapScreen;
          if (!screen) return null;
          const r = screen.regions[screen.selectedIdx];
          const canvasX = screen.c + r.col * screen.tileSize + 8 - screen.camX;
          const canvasY = screen.d + r.row * screen.tileSize - 28 - screen.camY;
          const scaleX = rect.width / canvas.width;
          const scaleY = rect.height / canvas.height;
          return {
            clientX: rect.left + canvasX * scaleX,
            clientY: rect.top + canvasY * scaleY
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Target coords on canvas:', canvasInfo?.result?.value);
    if (canvasInfo?.result?.value) {
      const { clientX, clientY } = canvasInfo.result.value;
      await sendCDP(ws, 'Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: Math.round(clientX),
        y: Math.round(clientY)
      });
      await new Promise(r => setTimeout(r, 1000));
      await captureScreenshot(ws, 'worldmap_step3_hover_park.png');

      // 5. Click on selected region pin to travel
      console.log('[Step 5] Clicking selected region pin to travel...');
      await sendCDP(ws, 'Input.dispatchMouseEvent', {
        type: 'mousePressed',
        button: 'left',
        clickCount: 1,
        x: Math.round(clientX),
        y: Math.round(clientY)
      });
      await sendCDP(ws, 'Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        button: 'left',
        clickCount: 1,
        x: Math.round(clientX),
        y: Math.round(clientY)
      });

      // Capture traveling modal immediately
      await new Promise(r => setTimeout(r, 300));
      await captureScreenshot(ws, 'worldmap_step4_traveling.png');

      // 6. Wait for travel & entry into GameWorldScreen
      console.log('[Step 6] Waiting for entry into game world...');
      for (let i = 0; i < 30; i++) {
        await new Promise(r => setTimeout(r, 400));
        const res = await sendCDP(ws, 'Runtime.evaluate', {
          expression: 'window.__SCENE'
        });
        scene = res?.result?.value;
        if (scene === 'world') {
          console.log('[Step 6] Entered Game World! Map ID:', await sendCDP(ws, 'Runtime.evaluate', { expression: 'window.gameWorldScreen?.currentMapId' }));
          break;
        }
      }

      await new Promise(r => setTimeout(r, 2000));
      await captureScreenshot(ws, 'worldmap_step5_entered_gameplay.png');
    }

    // 7. Test re-opening World Map from game bar button
    console.log('[Step 7] Re-opening World Map via openWorldMap()...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: 'openWorldMap()'
    });
    await new Promise(r => setTimeout(r, 1200));
    await captureScreenshot(ws, 'worldmap_step6_reopened_map.png');

    // 8. Click Back Button "◀ TRANG CHỦ"
    console.log('[Step 8] Clicking "◀ TRANG CHỦ" back button...');
    const backBtnInfo = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        (() => {
          const canvas = document.getElementById('gameCanvas');
          const rect = canvas.getBoundingClientRect();
          const screen = window.gameMidlet?.worldMapScreen;
          if (!screen) return null;
          const bb = screen.backButton;
          const scaleX = rect.width / canvas.width;
          const scaleY = rect.height / canvas.height;
          return {
            clientX: rect.left + (bb.x + bb.w / 2) * scaleX,
            clientY: rect.top + (bb.y + bb.h / 2) * scaleY
          };
        })()
      `,
      returnByValue: true
    });

    if (backBtnInfo?.result?.value) {
      const { clientX, clientY } = backBtnInfo.result.value;
      await sendCDP(ws, 'Input.dispatchMouseEvent', {
        type: 'mousePressed',
        button: 'left',
        clickCount: 1,
        x: Math.round(clientX),
        y: Math.round(clientY)
      });
      await sendCDP(ws, 'Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        button: 'left',
        clickCount: 1,
        x: Math.round(clientX),
        y: Math.round(clientY)
      });
    }

    await new Promise(r => setTimeout(r, 1200));
    await captureScreenshot(ws, 'worldmap_step7_returned_portal.png');

    console.log('World Map full interactive test workflow completed successfully!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

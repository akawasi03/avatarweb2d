import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const OUT_DIR = path.resolve(__dirname, '../tests/rendering');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function getDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}/json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const page = list.find(p => p.type === 'page');
          if (page && page.webSocketDebuggerUrl) {
            resolve(page.webSocketDebuggerUrl);
          } else {
            reject(new Error('No page found in Chrome'));
          }
        } catch (e) {
          reject(e);
        }
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

async function run() {
  console.log('[TestWebUI] Launching Chrome Headless on port 9222 (Widescreen 1024x576)...');
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--window-size=1024,576',
    'http://localhost:3000'
  ], { stdio: 'ignore' });

  // Wait 1.5s for Chrome to bind
  await new Promise(r => setTimeout(r, 1500));

  try {
    const wsUrl = await getDebuggerUrl();
    console.log('[TestWebUI] Connected to Chrome CDP:', wsUrl);
    const ws = new WebSocket(wsUrl);

    await new Promise((resolve) => ws.on('open', resolve));

    // Enable Page and Runtime
    await sendCDP(ws, 'Page.enable');
    await sendCDP(ws, 'Runtime.enable');

    ws.on('message', (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.method === 'Runtime.consoleAPICalled') {
        const text = data.params.args.map(a => a.value || a.description || JSON.stringify(a)).join(' ');
        console.log('[BrowserConsole]', text);
      }
      if (data.method === 'Page.javascriptDialogOpening') {
        console.log('[BrowserDialog]', data.params.message);
        sendCDP(ws, 'Page.handleJavaScriptDialog', { accept: true });
      }
    });

    console.log('[TestWebUI] Waiting 2s for Web Client to initialize...');
    await new Promise(r => setTimeout(r, 2000));

    // Check initial status
    const netState = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `JSON.stringify({
        isConnected: window.networkSession?.isConnected,
        isHandshakeDone: window.networkSession?.isHandshakeDone,
        wsReadyState: window.networkSession?.ws?.readyState,
        gatewayUrl: window.networkSession?.gatewayUrl
      })`
    });
    console.log('[TestWebUI] Network state:', netState.result.value);

    const statusBefore = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('login-status')?.textContent`
    });
    console.log('[TestWebUI] Initial status:', statusBefore.result.value);

    // Trigger Login Button Click
    console.log('[TestWebUI] Clicking #loginBtn...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('loginBtn').click()`
    });

    // Wait up to 6s for login and park entry
    console.log('[TestWebUI] Waiting for scene transition to "world"...');
    for (let i = 0; i < 12; i++) {
      const sceneCheck = await sendCDP(ws, 'Runtime.evaluate', { expression: `window.__SCENE` });
      if (sceneCheck.result?.value === 'world') {
        console.log(`[TestWebUI] Scene transitioned to "world" at ${(i+1)*500}ms!`);
        break;
      }
      await new Promise(r => setTimeout(r, 500));
    }

    // Check status after login
    const statusAfter = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('login-status')?.textContent`
    });
    console.log('[TestWebUI] Status after login:', statusAfter.result.value);

    const sceneAfter = await sendCDP(ws, 'Runtime.evaluate', {
      expression: `window.__SCENE`
    });
    console.log('[TestWebUI] Current scene:', sceneAfter.result.value);

    // Test mouse click-to-move
    console.log('[TestWebUI] Testing mouse click-to-move at screen coordinate (520, 320)...');
    await sendCDP(ws, 'Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: 520,
      y: 320,
      button: 'left',
      clickCount: 1
    });
    await sendCDP(ws, 'Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: 520,
      y: 320,
      button: 'left',
      clickCount: 1
    });

    // Wait 2.5s for smooth walking animation and position update
    await new Promise(r => setTimeout(r, 2500));

    // Capture screenshot
    console.log('[TestWebUI] Capturing screenshot...');
    const shotResult = await sendCDP(ws, 'Page.captureScreenshot', { format: 'png' });
    const shotPath = path.join(OUT_DIR, 'live_webgl_gameplay.png');
    fs.writeFileSync(shotPath, Buffer.from(shotResult.data, 'base64'));
    console.log('[TestWebUI] Screenshot saved to:', shotPath);

    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);

import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;
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

    // 1. Capture Trang Chủ
    console.log('Navigating to http://localhost:3000/?view=home ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=home' });
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(ws, 'portal_trang_chu.png');

    // 2. Capture Đăng Nhập
    console.log('Navigating to http://localhost:3000/?view=login ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=login' });
    await new Promise(r => setTimeout(r, 1500));
    await captureScreenshot(ws, 'portal_dang_nhap.png');

    // 3. Capture Đăng Ký
    console.log('Navigating to http://localhost:3000/?view=register ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=register' });
    await new Promise(r => setTimeout(r, 1500));
    await captureScreenshot(ws, 'portal_dang_ky.png');

    // 4. Test Đăng nhập flow
    console.log('Testing login flow with admin / 123456 ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=login' });
    await new Promise(r => setTimeout(r, 1000));

    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        document.getElementById('loginUsername').value = 'admin';
        document.getElementById('loginPassword').value = '123456';
        doLogin();
      `
    });
    console.log('Submitted login, waiting for modal and game connect...');
    await new Promise(r => setTimeout(r, 3500));
    await captureScreenshot(ws, 'portal_game_launched.png');

    console.log('All portal views captured successfully!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});

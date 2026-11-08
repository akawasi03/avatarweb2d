import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import WebSocket from 'ws';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9226;
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
  console.log('Testing responsive viewports on port', PORT);
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080',
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

    // Test 1: Desktop 1920x1080
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=home' });
    await new Promise(r => setTimeout(r, 1500));
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `launchGame('admin', '123456');`
    });
    // Wait for world map
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(ws, 'responsive_worldmap_1920x1080.png');

    // Test 2: Tablet 1024x768
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1024,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendCDP(ws, 'Runtime.evaluate', { expression: `window.dispatchEvent(new Event('resize'));` });
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(ws, 'responsive_worldmap_1024x768.png');

    // Test 3: Mobile 375x667
    await sendCDP(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 1,
      mobile: true
    });
    await sendCDP(ws, 'Runtime.evaluate', { expression: `window.dispatchEvent(new Event('resize'));` });
    await new Promise(r => setTimeout(r, 1000));
    await captureScreenshot(ws, 'responsive_worldmap_375x667.png');

    console.log('All responsive tests completed successfully!');
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);

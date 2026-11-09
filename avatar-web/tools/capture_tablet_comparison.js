import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import WebSocket from 'ws';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9227;
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
  console.log('Starting Chrome at 1024x769 on port', PORT);
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1024,769',
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
      width: 1024,
      height: 769,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('Navigating to http://localhost:3000/?view=home ...');
    await sendCDP(ws, 'Page.navigate', { url: 'http://localhost:3000/?view=home' });
    await new Promise(r => setTimeout(r, 2000));

    // Click floating play button
    console.log('Launching game modal...');
    await sendCDP(ws, 'Runtime.evaluate', {
      expression: `
        const fab = document.getElementById('floatingPlayBtn');
        if (fab) fab.click();
        else if (window.launchGame) window.launchGame('admin', '123456');
      `
    });

    // Wait for worldmap scene
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 500));
      const res = await sendCDP(ws, 'Runtime.evaluate', {
        expression: 'window.__SCENE'
      });
      if (res?.result?.value === 'worldmap') {
        console.log('Reached worldmap at frame', i);
        break;
      }
      if (res?.result?.value === 'login') {
        await sendCDP(ws, 'Runtime.evaluate', {
          expression: "window.loginWithCredentials ? window.loginWithCredentials('admin', '123456') : null"
        });
      }
    }

    // Wait for animations and render
    await new Promise(r => setTimeout(r, 2000));
    await captureScreenshot(ws, 'web_worldmap_1024x769.png');

    console.log('1024x769 capture complete!');
    await sendCDP(ws, 'Browser.close');
  } catch (err) {
    console.error('Error during 1024x769 capture:', err);
  } finally {
    try { chrome.kill(); } catch (e) {}
  }
}

run();

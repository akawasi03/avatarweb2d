const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const PORT = 8085;
const PUBLIC_DIR = path.resolve(__dirname, '../packages/game-client/public');
const OUT_DIR = path.resolve(__dirname, '../tests/rendering');
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.css': 'text/css',
  '.json': 'application/json',
  '.av': 'application/octet-stream',
  '': 'application/octet-stream'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(PUBLIC_DIR, urlPath === '/' ? 'index.html' : urlPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`[Capture] Static server running on http://127.0.0.1:${PORT}`);
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const splashOut = path.join(OUT_DIR, 'webgl_splash.png');
  const loginOut = path.join(OUT_DIR, 'webgl_login.png');

  try {
    // 1. Capture Splash Screen
    console.log('[Capture] Capturing WebGL Splash Screen...');
    const splashCmd = `"${EDGE_PATH}" --headless --hide-scrollbars --screenshot="${splashOut}" --window-size=240,320 "http://127.0.0.1:${PORT}/capture.html?scene=splash"`;
    execSync(splashCmd, { stdio: 'inherit' });
    console.log(`[Capture] Saved: ${splashOut}`);

    // Wait 500ms
    await new Promise((r) => setTimeout(r, 500));

    // 2. Capture Login Screen
    console.log('[Capture] Capturing WebGL Login Screen...');
    const loginCmd = `"${EDGE_PATH}" --headless --hide-scrollbars --screenshot="${loginOut}" --window-size=240,320 "http://127.0.0.1:${PORT}/capture.html?scene=login"`;
    execSync(loginCmd, { stdio: 'inherit' });
    console.log(`[Capture] Saved: ${loginOut}`);

    console.log('[Capture] Both WebGL screenshots captured successfully!');
  } catch (err) {
    console.error('[Capture] Screenshot capture failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});

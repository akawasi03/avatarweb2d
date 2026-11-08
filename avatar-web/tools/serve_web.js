import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../packages/game-client/public');
const RES_MEDIUM_DIR = path.resolve(__dirname, '../../Avatar-Sv-master-master/res/medium');
const PORT = parseInt(process.env.PORT || '3000', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.dat': 'application/octet-stream',
  '.bin': 'application/octet-stream'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url?.split('?')[0] || '/');
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = '';
  if (reqPath.startsWith('/res/')) {
    filePath = path.join(RES_MEDIUM_DIR, reqPath.substring(5));
    if (!filePath.startsWith(RES_MEDIUM_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
  } else {
    filePath = path.join(PUBLIC_DIR, reqPath);
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`File not found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Web Server] Serving Avatar Web Client on http://localhost:${PORT}`);
});

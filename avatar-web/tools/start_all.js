import { spawn } from 'node:child_process';
import * as net from 'node:net';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_DIR = path.resolve('D:/avatarweb2d/Avatar-Sv-master-master');
const JAVA_BIN = 'D:/Programs/jdk-17/bin/java.exe';
const M2_REPO = 'C:/Users/Dshare/.m2/repository';

const CP_JARS = [
  path.join(SERVER_DIR, 'target/classes'),
  path.join(M2_REPO, 'com/googlecode/json-simple/json-simple/1.1/json-simple-1.1.jar'),
  path.join(M2_REPO, 'log4j/log4j/1.2.17/log4j-1.2.17.jar'),
  path.join(M2_REPO, 'mysql/mysql-connector-java/8.0.27/mysql-connector-java-8.0.27.jar'),
  path.join(M2_REPO, 'com/zaxxer/HikariCP/4.0.3/HikariCP-4.0.3.jar'),
  path.join(M2_REPO, 'org/slf4j/slf4j-api/1.7.36/slf4j-api-1.7.36.jar'),
  path.join(M2_REPO, 'commons-dbutils/commons-dbutils/1.7/commons-dbutils-1.7.jar'),
  path.join(M2_REPO, 'commons-io/commons-io/2.7/commons-io-2.7.jar')
].join(';');

function checkPort(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

async function startAll() {
  console.log('=== [1/3] Starting Java Server on 127.0.0.1:19128 ===');
  const javaProc = spawn(JAVA_BIN, ['-cp', CP_JARS, 'avatar.server.Avatar'], {
    cwd: SERVER_DIR,
    stdio: ['ignore', 'inherit', 'inherit']
  });

  javaProc.on('exit', (code) => {
    console.error(`[Java Server] Exited with code ${code}`);
  });

  // Wait for Java Server port 19128 to be ready
  let javaReady = false;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    if (await checkPort(19128)) {
      javaReady = true;
      break;
    }
  }

  if (javaReady) {
    console.log('[Java Server] READY and listening on 127.0.0.1:19128');
  } else {
    console.warn('[Java Server] Still initializing background datasets...');
  }

  console.log('=== [2/3] Starting WebSocket TCP Gateway on ws://0.0.0.0:19129 ===');
  const gatewayScript = path.resolve(__dirname, '../packages/web-gateway/dist/gateway.js');
  const gatewayProc = spawn(process.execPath, [gatewayScript], {
    env: { ...process.env, WS_PORT: '19129', TCP_HOST: '127.0.0.1', TCP_PORT: '19128' },
    stdio: ['ignore', 'inherit', 'inherit']
  });

  console.log('=== [3/3] Starting PHP & Web Client Server on http://localhost:3000 ===');
  const publicDir = path.resolve(__dirname, '../public');
  const indexPath = path.resolve(__dirname, '../public/index.php');
  const webProc = spawn('php', ['-S', '0.0.0.0:3000', '-t', publicDir, indexPath], {
    cwd: path.resolve(__dirname, '..'),
    stdio: ['ignore', 'inherit', 'inherit']
  });

  process.on('SIGINT', () => {
    javaProc.kill();
    gatewayProc.kill();
    webProc.kill();
    process.exit(0);
  });
}

startAll().catch(console.error);

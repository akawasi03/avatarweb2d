import test from 'node:test';
import assert from 'node:assert/strict';
import * as net from 'node:net';
import { WebSocket } from 'ws';
import { WebSocketTcpGateway } from './gateway.js';

test('WebSocketTcpGateway transparently bridges binary packets bidirectionally', async () => {
  const TEST_TCP_PORT = 29128;
  const TEST_WS_PORT = 29129;

  // 1. Mock TCP Server (simulating Avatar Java Server)
  let tcpServerReceived: Buffer = Buffer.alloc(0);
  let tcpClientSocket: net.Socket | null = null;

  const mockTcpServer = net.createServer((socket) => {
    tcpClientSocket = socket;
    socket.on('data', (chunk: Buffer) => {
      tcpServerReceived = Buffer.concat([tcpServerReceived, chunk]);
    });
  });

  await new Promise<void>((resolve) => mockTcpServer.listen(TEST_TCP_PORT, resolve));

  // 2. Start Gateway
  const gateway = new WebSocketTcpGateway({
    wsPort: TEST_WS_PORT,
    tcpHost: '127.0.0.1',
    tcpPort: TEST_TCP_PORT
  });
  await gateway.start();

  // 3. Connect WebSocket Client (simulating Browser WebGL Client)
  const ws = new WebSocket(`ws://127.0.0.1:${TEST_WS_PORT}`);
  await new Promise<void>((resolve, reject) => {
    ws.on('open', () => resolve());
    ws.on('error', reject);
  });

  // Give socket connection a moment to establish
  await new Promise((r) => setTimeout(r, 100));

  // 4. Test WebSocket -> TCP transmission
  const clientPacket = Buffer.from([0xFE, 0x00, 0x05, 0x48, 0x45, 0x4C, 0x4C, 0x4F]); // Fake packet
  ws.send(clientPacket);

  await new Promise((r) => setTimeout(r, 100));
  assert.deepEqual(tcpServerReceived, clientPacket);

  // 5. Test TCP -> WebSocket transmission
  const serverPacket = Buffer.from([0xE5, 0x00, 0x04, 0x01, 0x02, 0x03, 0x04]); // Fake handshake
  let wsReceived: Buffer = Buffer.alloc(0);
  ws.on('message', (data: Buffer) => {
    wsReceived = Buffer.concat([wsReceived, data]);
  });

  assert.ok(tcpClientSocket);
  (tcpClientSocket as net.Socket).write(serverPacket);

  await new Promise((r) => setTimeout(r, 100));
  assert.deepEqual(wsReceived, serverPacket);

  // 6. Cleanup
  ws.close();
  await gateway.stop();
  await new Promise<void>((resolve) => mockTcpServer.close(() => resolve()));
});

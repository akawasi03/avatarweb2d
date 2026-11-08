import { WebSocketServer, WebSocket } from 'ws';
import * as net from 'node:net';

export interface GatewayConfig {
  wsPort: number;
  tcpHost: string;
  tcpPort: number;
}

export class WebSocketTcpGateway {
  private wss?: WebSocketServer;
  private connections = new Set<{ ws: WebSocket; tcp: net.Socket }>();

  constructor(public config: GatewayConfig) {}

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.wss = new WebSocketServer({ port: this.config.wsPort }, () => {
        console.log(`[Gateway] WebSocket server listening on ws://0.0.0.0:${this.config.wsPort}`);
        console.log(`[Gateway] Bridging to TCP ${this.config.tcpHost}:${this.config.tcpPort}`);
        resolve();
      });

      this.wss.on('error', (err) => {
        reject(err);
      });

      this.wss.on('connection', (ws: WebSocket, req) => {
        const clientIp = req.socket.remoteAddress;
        console.log(`[Gateway] New WebSocket client connected from ${clientIp}`);

        const tcp = net.connect({
          host: this.config.tcpHost,
          port: this.config.tcpPort
        });

        const pair = { ws, tcp };
        this.connections.add(pair);

        tcp.on('connect', () => {
          console.log(`[Gateway] Connected to Java TCP Server for client ${clientIp}`);
        });

        // TCP -> WebSocket
        tcp.on('data', (data: Buffer) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(data, { binary: true });
          }
        });

        // WebSocket -> TCP
        ws.on('message', (message: Buffer | ArrayBuffer | Buffer[], isBinary: boolean) => {
          if (Buffer.isBuffer(message)) {
            tcp.write(message);
          } else if (message instanceof ArrayBuffer) {
            tcp.write(Buffer.from(message));
          } else if (Array.isArray(message)) {
            tcp.write(Buffer.concat(message));
          }
        });

        const cleanup = () => {
          this.connections.delete(pair);
          if (!tcp.destroyed) tcp.destroy();
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
        };

        tcp.on('error', (err) => {
          console.error(`[Gateway] TCP socket error for ${clientIp}:`, err.message);
          cleanup();
        });

        tcp.on('close', () => {
          console.log(`[Gateway] TCP connection closed for ${clientIp}`);
          cleanup();
        });

        ws.on('error', (err) => {
          console.error(`[Gateway] WebSocket error for ${clientIp}:`, err.message);
          cleanup();
        });

        ws.on('close', () => {
          console.log(`[Gateway] WebSocket disconnected for ${clientIp}`);
          cleanup();
        });
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      for (const pair of this.connections) {
        pair.tcp.destroy();
        pair.ws.close();
      }
      this.connections.clear();

      if (this.wss) {
        this.wss.close(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

if (process.argv[1] && process.argv[1].endsWith('gateway.js')) {
  const wsPort = parseInt(process.env.WS_PORT || '19129', 10);
  const tcpHost = process.env.TCP_HOST || '127.0.0.1';
  const tcpPort = parseInt(process.env.TCP_PORT || '19128', 10);

  const gateway = new WebSocketTcpGateway({ wsPort, tcpHost, tcpPort });
  gateway.start().catch((err) => {
    console.error('[Gateway] Failed to start:', err);
    process.exit(1);
  });
}

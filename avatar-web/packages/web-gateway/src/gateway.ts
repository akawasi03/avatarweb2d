import { WebSocketServer, WebSocket } from 'ws';
import * as net from 'node:net';
import * as http from 'node:http';
import * as https from 'node:https';
import * as fs from 'node:fs';

export interface GatewayConfig {
  wsPort: number;
  tcpHost: string;
  tcpPort: number;
  allowedOrigins?: string[];
  maxConnectionsPerIp?: number;
  maxTotalConnections?: number;
  sslKeyPath?: string;
  sslCertPath?: string;
}

export class WebSocketTcpGateway {
  private wss?: WebSocketServer;
  private httpServer?: http.Server | https.Server;
  private connections = new Set<{ ws: WebSocket; tcp: net.Socket; clientIp: string }>();
  private ipConnectionCounts = new Map<string, number>();

  public readonly maxConnectionsPerIp: number;
  public readonly maxTotalConnections: number;

  constructor(public config: GatewayConfig) {
    this.maxConnectionsPerIp = config.maxConnectionsPerIp ?? 10;
    this.maxTotalConnections = config.maxTotalConnections ?? 500;
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      // 1. Verify Origin Helper
      const isOriginAllowed = (origin?: string): boolean => {
        if (!origin) return true; // Direct non-browser clients or local test tools
        if (!this.config.allowedOrigins || this.config.allowedOrigins.length === 0) {
          // Default development whitelist
          try {
            const url = new URL(origin);
            return (
              url.hostname === 'localhost' ||
              url.hostname === '127.0.0.1' ||
              url.hostname === '0.0.0.0' ||
              url.hostname.endsWith('.ngrok.io') ||
              url.hostname.endsWith('.ngrok-free.app')
            );
          } catch {
            return false;
          }
        }
        return this.config.allowedOrigins.some(allowed => {
          if (allowed === '*') return true;
          return origin === allowed || origin.startsWith(allowed);
        });
      };

      // 2. Setup HTTP/HTTPS Server if TLS is enabled
      const hasSsl = Boolean(
        this.config.sslKeyPath &&
        this.config.sslCertPath &&
        fs.existsSync(this.config.sslKeyPath) &&
        fs.existsSync(this.config.sslCertPath)
      );

      if (hasSsl) {
        const credentials = {
          key: fs.readFileSync(this.config.sslKeyPath!),
          cert: fs.readFileSync(this.config.sslCertPath!)
        };
        this.httpServer = https.createServer(credentials);
        this.wss = new WebSocketServer({ server: this.httpServer });
        console.log(`[Gateway] Secure WSS Server enabled with TLS certificates.`);
      } else {
        this.wss = new WebSocketServer({ port: this.config.wsPort });
      }

      const onListening = () => {
        const proto = hasSsl ? 'wss' : 'ws';
        console.log(`[Gateway] WebSocket server listening on ${proto}://0.0.0.0:${this.config.wsPort}`);
        console.log(`[Gateway] Bridging to TCP ${this.config.tcpHost}:${this.config.tcpPort}`);
        resolve();
      };

      if (this.httpServer) {
        this.httpServer.listen(this.config.wsPort, onListening);
        this.httpServer.on('error', reject);
      } else if (this.wss) {
        this.wss.on('listening', onListening);
        this.wss.on('error', reject);
      }

      // 3. Connection Authorization & Handling
      this.wss!.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
        const origin = req.headers.origin;
        const clientIp = (req.socket.remoteAddress || '127.0.0.1').replace(/^::ffff:/, '');

        // Security Check 1: Origin Validation
        if (!isOriginAllowed(origin)) {
          console.warn(`[Gateway Security] Rejected unauthorized Origin: "${origin}" from ${clientIp}`);
          ws.close(1008, 'Origin not allowed');
          return;
        }

        // Security Check 2: Total Connection Limit
        if (this.connections.size >= this.maxTotalConnections) {
          console.warn(`[Gateway Security] Server busy: Maximum connections (${this.maxTotalConnections}) reached`);
          ws.close(1013, 'Server busy');
          return;
        }

        // Security Check 3: Rate limit / Max concurrent connections per IP
        const currentIpCount = this.ipConnectionCounts.get(clientIp) || 0;
        if (currentIpCount >= this.maxConnectionsPerIp) {
          console.warn(`[Gateway Security] Too many connections from IP ${clientIp} (${currentIpCount}/${this.maxConnectionsPerIp})`);
          ws.close(1008, 'Rate limit exceeded');
          return;
        }

        this.ipConnectionCounts.set(clientIp, currentIpCount + 1);

        console.log(`[Gateway] Client connected: ${clientIp} (active from IP: ${currentIpCount + 1}, total: ${this.connections.size + 1})`);

        // Connect to upstream Java Server via TCP
        const tcp = net.connect({
          host: this.config.tcpHost,
          port: this.config.tcpPort
        });

        const pair = { ws, tcp, clientIp };
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
        ws.on('message', (message: Buffer | ArrayBuffer | Buffer[], _isBinary: boolean) => {
          if (Buffer.isBuffer(message)) {
            tcp.write(message);
          } else if (message instanceof ArrayBuffer) {
            tcp.write(Buffer.from(message));
          } else if (Array.isArray(message)) {
            tcp.write(Buffer.concat(message));
          }
        });

        const cleanup = () => {
          if (this.connections.has(pair)) {
            this.connections.delete(pair);
            const count = this.ipConnectionCounts.get(clientIp) || 1;
            if (count <= 1) {
              this.ipConnectionCounts.delete(clientIp);
            } else {
              this.ipConnectionCounts.set(clientIp, count - 1);
            }
          }
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

  public getActiveConnections(): number {
    return this.connections.size;
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      for (const pair of this.connections) {
        pair.tcp.destroy();
        pair.ws.close();
      }
      this.connections.clear();
      this.ipConnectionCounts.clear();

      if (this.httpServer) {
        this.httpServer.close(() => {
          if (this.wss) {
            this.wss.close(() => resolve());
          } else {
            resolve();
          }
        });
      } else if (this.wss) {
        this.wss.close(() => resolve());
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
  const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : undefined;
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;

  const gateway = new WebSocketTcpGateway({
    wsPort,
    tcpHost,
    tcpPort,
    allowedOrigins,
    sslKeyPath,
    sslCertPath
  });

  gateway.start().catch((err) => {
    console.error('[Gateway] Failed to start:', err);
    process.exit(1);
  });
}

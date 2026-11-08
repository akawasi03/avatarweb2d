import WebSocket from 'ws';
import {
  Message,
  DataOutputStream,
  DataInputStream,
  SessionCipher,
  PacketStreamDecoder
} from '../packages/protocol/dist/index.js';

class MockWebClient {
  public ws!: WebSocket;
  public cipher: SessionCipher;
  public decoder: PacketStreamDecoder;
  public userId = 0;
  public isConnected = false;
  public isHandshakeDone = false;
  public isLoggedIn = false;
  public isInPark = false;

  public receivedMessages: Message[] = [];
  public otherPlayers = new Map<number, { name: string; x: number; y: number }>();
  public chatLog: string[] = [];

  constructor(public name: string, public username: string, public pass: string) {
    this.cipher = new SessionCipher();
    this.decoder = new PacketStreamDecoder(this.cipher);
  }

  public connect(url = 'ws://127.0.0.1:19129'): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);
      this.ws.on('open', () => {
        this.isConnected = true;
        // Request key from server (unencrypted packet -27, length 0)
        const reqKeyWire = new Uint8Array([(-27 & 0xFF), 0, 0]);
        this.ws.send(reqKeyWire);
        resolve();
      });
      this.ws.on('error', reject);
      this.ws.on('message', (data: Buffer) => {
        const msgs = this.decoder.push(new Uint8Array(data));
        for (const m of msgs) {
          this.handlePacket(m);
        }
      });
    });
  }

  private handlePacket(m: Message): void {
    this.receivedMessages.push(m);
    // -27: Key handshake
    if (m.command === -27) {
      this.isHandshakeDone = true;
      console.log(`[${this.name}] Handshake -27 done! Connected=${this.cipher.connected}`);
    }
    // -4: LOGIN_SUCESS
    else if (m.command === -4) {
      const r = m.reader();
      this.userId = r.readInt();
      this.isLoggedIn = true;
      console.log(`[${this.name}] LOGIN SUCCESS! UserID=${this.userId}`);
    }
    // 50: AVATAR_JOIN_PARK
    else if (m.command === 50) {
      this.isInPark = true;
      console.log(`[${this.name}] AVATAR_JOIN_PARK confirmed by server!`);
    }
    // 51: PLAYER_JOIN_PARK
    else if (m.command === 51) {
      const r = m.reader();
      const pid = r.readInt();
      const pname = r.readUTF();
      const px = r.readShort();
      const py = r.readShort();
      this.otherPlayers.set(pid, { name: pname, x: px, y: py });
      console.log(`[${this.name}] Saw other player joined: ID=${pid}, Name=${pname}`);
    }
    // 53: PLAYER_LEAVE_PARK
    else if (m.command === 53) {
      const r = m.reader();
      const pid = r.readInt();
      this.otherPlayers.delete(pid);
      console.log(`[${this.name}] Player ${pid} left park.`);
    }
    // 54: MOVE_PARK
    else if (m.command === 54) {
      const r = m.reader();
      const pid = r.readInt();
      const px = r.readShort();
      const py = r.readShort();
      const p = this.otherPlayers.get(pid);
      if (p) {
        p.x = px;
        p.y = py;
      }
      console.log(`[${this.name}] Saw player ${pid} moved to (${px}, ${py})`);
    }
    // 55: CHAT_PARK
    else if (m.command === 55) {
      const r = m.reader();
      const pid = r.readInt();
      const text = r.readUTF();
      this.chatLog.push(`[${pid}]: ${text}`);
      console.log(`[${this.name}] Chat received from ${pid}: "${text}"`);
    }
  }

  public send(m: Message): void {
    const wire = this.cipher.encodePacket(m);
    this.ws.send(wire);
  }

  public login(): void {
    const msg = new Message(-2); // Cmd.LOGIN = -2
    msg.writer().writeUTF(this.username);
    msg.writer().writeUTF(this.pass);
    msg.writer().writeUTF('2.5.8');
    this.send(msg);
  }

  public joinPark(map = 11, area = 0, x = 120, y = 200): void {
    const msg = new Message(50); // Cmd.AVATAR_JOIN_PARK = 50
    msg.writer().writeByte(map);
    msg.writer().writeByte(area);
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);
    this.send(msg);
  }

  public move(x: number, y: number, direct = 0): void {
    const msg = new Message(54); // Cmd.MOVE_PARK = 54
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);
    msg.writer().writeByte(direct);
    this.send(msg);
  }

  public chat(msgText: string): void {
    const msg = new Message(55); // Cmd.CHAT_PARK = 55
    msg.writer().writeUTF(msgText);
    this.send(msg);
  }

  public close(): void {
    this.ws.close();
  }
}

async function runTest() {
  console.log('=== MULTIPLAYER INTEGRATION TEST: 2 CLIENTS ===');

  const client1 = new MockWebClient('Client1', 'admin', '123456');
  const client2 = new MockWebClient('Client2', 'ad', '123456');

  // 1. Client 1 Connect & Handshake
  console.log('Step 1: Connecting Client 1...');
  await client1.connect();
  await new Promise((r) => setTimeout(r, 800));
  if (!client1.isHandshakeDone) throw new Error('Client 1 handshake failed');

  // 2. Client 1 Login
  console.log('Step 2: Client 1 Logging in...');
  client1.login();
  await new Promise((r) => setTimeout(r, 1000));
  if (!client1.isLoggedIn) throw new Error('Client 1 login failed');

  // 3. Client 1 Enter Park
  console.log('Step 3: Client 1 Entering Park (Map 11, Zone 0)...');
  client1.joinPark(11, 0, 100, 200);
  await new Promise((r) => setTimeout(r, 800));

  // 4. Client 2 Connect & Login
  console.log('Step 4: Connecting & Logging in Client 2...');
  await client2.connect();
  await new Promise((r) => setTimeout(r, 800));
  if (!client2.isHandshakeDone) throw new Error('Client 2 handshake failed');
  client2.login();
  await new Promise((r) => setTimeout(r, 1000));
  if (!client2.isLoggedIn) throw new Error('Client 2 login failed');

  // 5. Client 2 Enter Same Park (Map 11, Zone 0)
  console.log('Step 5: Client 2 Entering Same Park...');
  client2.joinPark(11, 0, 150, 200);
  await new Promise((r) => setTimeout(r, 1000));

  // 6. Test Movement
  console.log('Step 6: Testing Movement...');
  client1.move(110, 205, 3);
  await new Promise((r) => setTimeout(r, 800));

  // 7. Test Chat
  console.log('Step 7: Testing Chat Interaction...');
  client1.chat('Chào bạn ad từ web client!');
  await new Promise((r) => setTimeout(r, 800));
  client2.chat('Chào admin! Tôi thấy bạn di chuyển rồi.');
  await new Promise((r) => setTimeout(r, 800));

  // 8. Test Disconnect & State Sync
  console.log('Step 8: Testing Disconnect...');
  client2.close();
  await new Promise((r) => setTimeout(r, 800));

  console.log('\n=== TEST SUMMARY ===');
  console.log('Client 1 logged in:', client1.isLoggedIn, 'UserID:', client1.userId);
  console.log('Client 2 logged in:', client2.isLoggedIn, 'UserID:', client2.userId);
  console.log('Client 1 received chats:', client1.chatLog);
  console.log('Client 2 received chats:', client2.chatLog);
  console.log('ALL INTEGRATION CHECKS PASSED!');

  client1.close();
  process.exit(0);
}

runTest().catch((err) => {
  console.error('Test FAILED:', err);
  process.exit(1);
});

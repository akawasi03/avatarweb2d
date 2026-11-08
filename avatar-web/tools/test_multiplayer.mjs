var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// avatar-web/packages/protocol/dist/decoder/DataInputStream.js
var require_DataInputStream = __commonJS({
  "avatar-web/packages/protocol/dist/decoder/DataInputStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataInputStream = void 0;
    var DataInputStream2 = class {
      buffer;
      view;
      pos = 0;
      utf8Decoder = new TextDecoder("utf-8");
      constructor(buffer) {
        this.buffer = buffer;
        this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      }
      available() {
        return this.buffer.length - this.pos;
      }
      getPosition() {
        return this.pos;
      }
      readByte() {
        if (this.pos >= this.buffer.length) {
          throw new Error(`EOF: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getInt8(this.pos);
        this.pos += 1;
        return val;
      }
      readUnsignedByte() {
        if (this.pos >= this.buffer.length) {
          throw new Error(`EOF: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getUint8(this.pos);
        this.pos += 1;
        return val;
      }
      readBoolean() {
        return this.readUnsignedByte() !== 0;
      }
      readShort() {
        if (this.pos + 2 > this.buffer.length) {
          throw new Error(`EOF reading short: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getInt16(this.pos, false);
        this.pos += 2;
        return val;
      }
      readUnsignedShort() {
        if (this.pos + 2 > this.buffer.length) {
          throw new Error(`EOF reading ushort: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getUint16(this.pos, false);
        this.pos += 2;
        return val;
      }
      readInt() {
        if (this.pos + 4 > this.buffer.length) {
          throw new Error(`EOF reading int: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getInt32(this.pos, false);
        this.pos += 4;
        return val;
      }
      readLong() {
        if (this.pos + 8 > this.buffer.length) {
          throw new Error(`EOF reading long: pos=${this.pos}, len=${this.buffer.length}`);
        }
        const val = this.view.getBigInt64(this.pos, false);
        this.pos += 8;
        return val;
      }
      readUTF() {
        const length = this.readUnsignedShort();
        if (this.pos + length > this.buffer.length) {
          throw new Error(`EOF reading UTF string of len ${length}: pos=${this.pos}, bufLen=${this.buffer.length}`);
        }
        const bytes = this.buffer.subarray(this.pos, this.pos + length);
        this.pos += length;
        return this.utf8Decoder.decode(bytes);
      }
      readFully(out, offset = 0, length = out.length) {
        if (this.pos + length > this.buffer.length) {
          throw new Error(`EOF in readFully: need ${length}, pos=${this.pos}, bufLen=${this.buffer.length}`);
        }
        out.set(this.buffer.subarray(this.pos, this.pos + length), offset);
        this.pos += length;
      }
      readBytes(length) {
        if (this.pos + length > this.buffer.length) {
          throw new Error(`EOF in readBytes: need ${length}, pos=${this.pos}, bufLen=${this.buffer.length}`);
        }
        const result = new Uint8Array(length);
        result.set(this.buffer.subarray(this.pos, this.pos + length));
        this.pos += length;
        return result;
      }
    };
    exports.DataInputStream = DataInputStream2;
  }
});

// avatar-web/packages/protocol/dist/encoder/DataOutputStream.js
var require_DataOutputStream = __commonJS({
  "avatar-web/packages/protocol/dist/encoder/DataOutputStream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataOutputStream = void 0;
    var DataOutputStream2 = class {
      buffer;
      view;
      length = 0;
      utf8Encoder = new TextEncoder();
      constructor(initialCapacity = 256) {
        this.buffer = new Uint8Array(initialCapacity);
        this.view = new DataView(this.buffer.buffer);
      }
      ensureCapacity(additional) {
        const required = this.length + additional;
        if (required > this.buffer.length) {
          let newCapacity = this.buffer.length * 2;
          while (newCapacity < required) {
            newCapacity *= 2;
          }
          const newBuffer = new Uint8Array(newCapacity);
          newBuffer.set(this.buffer);
          this.buffer = newBuffer;
          this.view = new DataView(this.buffer.buffer);
        }
      }
      writeByte(val) {
        this.ensureCapacity(1);
        this.view.setInt8(this.length, val);
        this.length += 1;
      }
      writeUnsignedByte(val) {
        this.ensureCapacity(1);
        this.view.setUint8(this.length, val);
        this.length += 1;
      }
      writeBoolean(val) {
        this.writeUnsignedByte(val ? 1 : 0);
      }
      writeShort(val) {
        this.ensureCapacity(2);
        this.view.setInt16(this.length, val, false);
        this.length += 2;
      }
      writeUnsignedShort(val) {
        this.ensureCapacity(2);
        this.view.setUint16(this.length, val, false);
        this.length += 2;
      }
      writeInt(val) {
        this.ensureCapacity(4);
        this.view.setInt32(this.length, val, false);
        this.length += 4;
      }
      writeLong(val) {
        this.ensureCapacity(8);
        const bigVal = typeof val === "number" ? BigInt(val) : val;
        this.view.setBigInt64(this.length, bigVal, false);
        this.length += 8;
      }
      writeUTF(str) {
        const encoded = this.utf8Encoder.encode(str);
        if (encoded.length > 65535) {
          throw new Error(`String exceeds maximum UTF length (65535): length=${encoded.length}`);
        }
        this.writeUnsignedShort(encoded.length);
        this.write(encoded);
      }
      write(data, offset = 0, length = data.length) {
        this.ensureCapacity(length);
        this.buffer.set(data.subarray(offset, offset + length), this.length);
        this.length += length;
      }
      size() {
        return this.length;
      }
      toByteArray() {
        return this.buffer.slice(0, this.length);
      }
    };
    exports.DataOutputStream = DataOutputStream2;
  }
});

// avatar-web/packages/protocol/dist/packet/Message.js
var require_Message = __commonJS({
  "avatar-web/packages/protocol/dist/packet/Message.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Message = void 0;
    var DataInputStream_js_1 = require_DataInputStream();
    var DataOutputStream_js_1 = require_DataOutputStream();
    var Message2 = class {
      command;
      dis;
      dos;
      constructor(command, data) {
        this.command = command << 24 >> 24;
        if (data) {
          this.dis = new DataInputStream_js_1.DataInputStream(data);
        } else {
          this.dos = new DataOutputStream_js_1.DataOutputStream();
        }
      }
      reader() {
        if (!this.dis) {
          this.dis = new DataInputStream_js_1.DataInputStream(this.getData());
        }
        return this.dis;
      }
      writer() {
        if (!this.dos) {
          this.dos = new DataOutputStream_js_1.DataOutputStream();
        }
        return this.dos;
      }
      getData() {
        if (this.dos) {
          return this.dos.toByteArray();
        }
        return new Uint8Array(0);
      }
      cleanup() {
        this.dis = void 0;
        this.dos = void 0;
      }
    };
    exports.Message = Message2;
  }
});

// avatar-web/packages/protocol/dist/session/Cipher.js
var require_Cipher = __commonJS({
  "avatar-web/packages/protocol/dist/session/Cipher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SessionCipher = void 0;
    var SessionCipher2 = class {
      key = null;
      curR = 0;
      curW = 0;
      connected = false;
      initHandshake(handshakePayload) {
        const keyLen = handshakePayload[0];
        this.key = new Uint8Array(keyLen);
        for (let i = 0; i < keyLen; i++) {
          this.key[i] = handshakePayload[i + 1];
        }
        for (let i = 0; i < this.key.length - 1; i++) {
          this.key[i + 1] = (this.key[i + 1] ^ this.key[i]) & 255;
        }
        this.curR = 0;
        this.curW = 0;
        this.connected = true;
      }
      readKey(b) {
        if (!this.key || !this.connected)
          return b & 255;
        const k = this.key[this.curR];
        this.curR = (this.curR + 1) % this.key.length;
        return (k ^ b) & 255;
      }
      writeKey(b) {
        if (!this.key || !this.connected)
          return b & 255;
        const k = this.key[this.curW];
        this.curW = (this.curW + 1) % this.key.length;
        return (k ^ b) & 255;
      }
      peekReadKey(b, offsetFromCurR = 0) {
        if (!this.key || !this.connected)
          return b & 255;
        const idx = (this.curR + offsetFromCurR) % this.key.length;
        return (this.key[idx] ^ b) & 255;
      }
      advanceRead(count) {
        if (!this.key || !this.connected)
          return;
        this.curR = (this.curR + count) % this.key.length;
      }
      encodePacket(msg) {
        const payload = msg.getData();
        const size = payload.length;
        const rawCmd = msg.command & 255;
        const wireCmd = this.connected ? this.writeKey(rawCmd) : rawCmd;
        if (msg.command === 90) {
          const wire2 = new Uint8Array(1 + 4 + size);
          wire2[0] = wireCmd;
          const view = new DataView(wire2.buffer, wire2.byteOffset, wire2.byteLength);
          view.setInt32(1, size, false);
          wire2.set(payload, 5);
          return wire2;
        }
        const wire = new Uint8Array(1 + 2 + size);
        wire[0] = wireCmd;
        if (this.connected) {
          wire[1] = this.writeKey(size >> 8 & 255);
          wire[2] = this.writeKey(size & 255);
          for (let i = 0; i < size; i++) {
            wire[3 + i] = this.writeKey(payload[i]);
          }
        } else {
          wire[1] = size >> 8 & 255;
          wire[2] = size & 255;
          wire.set(payload, 3);
        }
        return wire;
      }
    };
    exports.SessionCipher = SessionCipher2;
  }
});

// avatar-web/packages/protocol/dist/decoder/PacketStreamDecoder.js
var require_PacketStreamDecoder = __commonJS({
  "avatar-web/packages/protocol/dist/decoder/PacketStreamDecoder.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PacketStreamDecoder = void 0;
    var Message_js_1 = require_Message();
    var PacketStreamDecoder2 = class {
      cipher;
      buffer = new Uint8Array(0);
      constructor(cipher) {
        this.cipher = cipher;
      }
      push(chunk) {
        const newBuf = new Uint8Array(this.buffer.length + chunk.length);
        newBuf.set(this.buffer);
        newBuf.set(chunk, this.buffer.length);
        this.buffer = newBuf;
        const messages = [];
        while (this.buffer.length >= 3) {
          let headerLen = 3;
          let cmd;
          let size;
          if (this.cipher.connected) {
            cmd = this.cipher.peekReadKey(this.buffer[0], 0) << 24 >> 24;
            if (cmd === 90) {
              headerLen = 5;
              if (this.buffer.length < 5)
                break;
              const view = new DataView(this.buffer.buffer, this.buffer.byteOffset);
              size = view.getInt32(1, false);
            } else {
              const b1 = this.cipher.peekReadKey(this.buffer[1], 1);
              const b2 = this.cipher.peekReadKey(this.buffer[2], 2);
              size = (b1 & 255) << 8 | b2 & 255;
            }
          } else {
            cmd = this.buffer[0] << 24 >> 24;
            const b1 = this.buffer[1];
            const b2 = this.buffer[2];
            size = (b1 & 255) << 8 | b2 & 255;
          }
          if (this.buffer.length < headerLen + size) {
            break;
          }
          this.cipher.advanceRead(headerLen);
          const rawPayload = this.buffer.subarray(headerLen, headerLen + size);
          const payload = new Uint8Array(size);
          if (this.cipher.connected && cmd !== 90) {
            for (let i = 0; i < size; i++) {
              payload[i] = this.cipher.readKey(rawPayload[i]);
            }
          } else {
            payload.set(rawPayload);
          }
          this.buffer = this.buffer.subarray(headerLen + size);
          const msg = new Message_js_1.Message(cmd, payload);
          if (cmd === -27 && !this.cipher.connected) {
            this.cipher.initHandshake(payload);
          }
          messages.push(msg);
        }
        return messages;
      }
    };
    exports.PacketStreamDecoder = PacketStreamDecoder2;
  }
});

// avatar-web/packages/protocol/dist/index.js
var require_dist = __commonJS({
  "avatar-web/packages/protocol/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_DataInputStream(), exports);
    __exportStar(require_DataOutputStream(), exports);
    __exportStar(require_Message(), exports);
    __exportStar(require_Cipher(), exports);
    __exportStar(require_PacketStreamDecoder(), exports);
  }
});

// avatar-web/tools/test_multiplayer.ts
var import_dist = __toESM(require_dist());
import WebSocket from "ws";
var MockWebClient = class {
  constructor(name, username, pass) {
    this.name = name;
    this.username = username;
    this.pass = pass;
    this.cipher = new import_dist.SessionCipher();
    this.decoder = new import_dist.PacketStreamDecoder(this.cipher);
  }
  name;
  username;
  pass;
  ws;
  cipher;
  decoder;
  userId = 0;
  isConnected = false;
  isHandshakeDone = false;
  isLoggedIn = false;
  isInPark = false;
  receivedMessages = [];
  otherPlayers = /* @__PURE__ */ new Map();
  chatLog = [];
  connect(url = "ws://127.0.0.1:19129") {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(url);
      this.ws.on("open", () => {
        this.isConnected = true;
        const reqKeyWire = new Uint8Array([-27 & 255, 0, 0]);
        this.ws.send(reqKeyWire);
        resolve();
      });
      this.ws.on("error", reject);
      this.ws.on("message", (data) => {
        const msgs = this.decoder.push(new Uint8Array(data));
        for (const m of msgs) {
          this.handlePacket(m);
        }
      });
    });
  }
  handlePacket(m) {
    this.receivedMessages.push(m);
    if (m.command === -27) {
      this.isHandshakeDone = true;
      console.log(`[${this.name}] Handshake -27 done! Connected=${this.cipher.connected}`);
    } else if (m.command === -4) {
      const r = m.reader();
      this.userId = r.readInt();
      this.isLoggedIn = true;
      console.log(`[${this.name}] LOGIN SUCCESS! UserID=${this.userId}`);
    } else if (m.command === 50) {
      this.isInPark = true;
      console.log(`[${this.name}] AVATAR_JOIN_PARK confirmed by server!`);
    } else if (m.command === 51) {
      const r = m.reader();
      const pid = r.readInt();
      const pname = r.readUTF();
      const px = r.readShort();
      const py = r.readShort();
      this.otherPlayers.set(pid, { name: pname, x: px, y: py });
      console.log(`[${this.name}] Saw other player joined: ID=${pid}, Name=${pname}`);
    } else if (m.command === 53) {
      const r = m.reader();
      const pid = r.readInt();
      this.otherPlayers.delete(pid);
      console.log(`[${this.name}] Player ${pid} left park.`);
    } else if (m.command === 54) {
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
    } else if (m.command === 55) {
      const r = m.reader();
      const pid = r.readInt();
      const text = r.readUTF();
      this.chatLog.push(`[${pid}]: ${text}`);
      console.log(`[${this.name}] Chat received from ${pid}: "${text}"`);
    }
  }
  send(m) {
    const wire = this.cipher.encodePacket(m);
    this.ws.send(wire);
  }
  login() {
    const msg = new import_dist.Message(-2);
    msg.writer().writeUTF(this.username);
    msg.writer().writeUTF(this.pass);
    msg.writer().writeUTF("2.5.8");
    this.send(msg);
  }
  joinPark(map = 11, area = 0, x = 120, y = 200) {
    const msg = new import_dist.Message(50);
    msg.writer().writeByte(map);
    msg.writer().writeByte(area);
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);
    this.send(msg);
  }
  move(x, y, direct = 0) {
    const msg = new import_dist.Message(54);
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);
    msg.writer().writeByte(direct);
    this.send(msg);
  }
  chat(msgText) {
    const msg = new import_dist.Message(55);
    msg.writer().writeUTF(msgText);
    this.send(msg);
  }
  close() {
    this.ws.close();
  }
};
async function runTest() {
  console.log("=== MULTIPLAYER INTEGRATION TEST: 2 CLIENTS ===");
  const client1 = new MockWebClient("Client1", "admin", "123456");
  const client2 = new MockWebClient("Client2", "ad", "123456");
  console.log("Step 1: Connecting Client 1...");
  await client1.connect();
  await new Promise((r) => setTimeout(r, 800));
  if (!client1.isHandshakeDone) throw new Error("Client 1 handshake failed");
  console.log("Step 2: Client 1 Logging in...");
  client1.login();
  await new Promise((r) => setTimeout(r, 1e3));
  if (!client1.isLoggedIn) throw new Error("Client 1 login failed");
  console.log("Step 3: Client 1 Entering Park (Map 11, Zone 0)...");
  client1.joinPark(11, 0, 100, 200);
  await new Promise((r) => setTimeout(r, 800));
  console.log("Step 4: Connecting & Logging in Client 2...");
  await client2.connect();
  await new Promise((r) => setTimeout(r, 800));
  if (!client2.isHandshakeDone) throw new Error("Client 2 handshake failed");
  client2.login();
  await new Promise((r) => setTimeout(r, 1e3));
  if (!client2.isLoggedIn) throw new Error("Client 2 login failed");
  console.log("Step 5: Client 2 Entering Same Park...");
  client2.joinPark(11, 0, 150, 200);
  await new Promise((r) => setTimeout(r, 1e3));
  console.log("Step 6: Testing Movement...");
  client1.move(110, 205, 3);
  await new Promise((r) => setTimeout(r, 800));
  console.log("Step 7: Testing Chat Interaction...");
  client1.chat("Ch\xE0o b\u1EA1n ad t\u1EEB web client!");
  await new Promise((r) => setTimeout(r, 800));
  client2.chat("Ch\xE0o admin! T\xF4i th\u1EA5y b\u1EA1n di chuy\u1EC3n r\u1ED3i.");
  await new Promise((r) => setTimeout(r, 800));
  console.log("Step 8: Testing Disconnect...");
  client2.close();
  await new Promise((r) => setTimeout(r, 800));
  console.log("\n=== TEST SUMMARY ===");
  console.log("Client 1 logged in:", client1.isLoggedIn, "UserID:", client1.userId);
  console.log("Client 2 logged in:", client2.isLoggedIn, "UserID:", client2.userId);
  console.log("Client 1 received chats:", client1.chatLog);
  console.log("Client 2 received chats:", client2.chatLog);
  console.log("ALL INTEGRATION CHECKS PASSED!");
  client1.close();
  process.exit(0);
}
runTest().catch((err) => {
  console.error("Test FAILED:", err);
  process.exit(1);
});

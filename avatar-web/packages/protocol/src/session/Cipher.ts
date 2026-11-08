import { Message } from '../packet/Message.js';

export class SessionCipher {
  private key: Uint8Array | null = null;
  public curR = 0;
  public curW = 0;
  public connected = false;

  public initHandshake(handshakePayload: Uint8Array): void {
    // Protocol from Session.java handshakeMessage() and gv.java a(jr jr2)
    // First byte is key length
    const keyLen = handshakePayload[0];
    this.key = new Uint8Array(keyLen);
    for (let i = 0; i < keyLen; i++) {
      this.key[i] = handshakePayload[i + 1];
    }
    // Reconstruct key using sequential XOR:
    // key[i] = key[i] ^ key[i - 1]
    for (let i = 0; i < this.key.length - 1; i++) {
      this.key[i + 1] = (this.key[i + 1] ^ this.key[i]) & 0xFF;
    }
    this.curR = 0;
    this.curW = 0;
    this.connected = true;
  }

  public readKey(b: number): number {
    if (!this.key || !this.connected) return b & 0xFF;
    const k = this.key[this.curR];
    this.curR = (this.curR + 1) % this.key.length;
    return (k ^ b) & 0xFF;
  }

  public writeKey(b: number): number {
    if (!this.key || !this.connected) return b & 0xFF;
    const k = this.key[this.curW];
    this.curW = (this.curW + 1) % this.key.length;
    return (k ^ b) & 0xFF;
  }

  public peekReadKey(b: number, offsetFromCurR = 0): number {
    if (!this.key || !this.connected) return b & 0xFF;
    const idx = (this.curR + offsetFromCurR) % this.key.length;
    return (this.key[idx] ^ b) & 0xFF;
  }

  public advanceRead(count: number): void {
    if (!this.key || !this.connected) return;
    this.curR = (this.curR + count) % this.key.length;
  }

  public encodePacket(msg: Message): Uint8Array {
    const payload = msg.getData();
    const size = payload.length;

    // Command byte
    const rawCmd = (msg.command & 0xFF);
    const wireCmd = this.connected ? this.writeKey(rawCmd) : rawCmd;

    if (msg.command === 90) {
      // Special 4-byte int length packet
      const wire = new Uint8Array(1 + 4 + size);
      wire[0] = wireCmd;
      const view = new DataView(wire.buffer, wire.byteOffset, wire.byteLength);
      view.setInt32(1, size, false);
      wire.set(payload, 5);
      return wire;
    }

    // Standard 2-byte short length packet
    const wire = new Uint8Array(1 + 2 + size);
    wire[0] = wireCmd;

    if (this.connected) {
      wire[1] = this.writeKey((size >> 8) & 0xFF);
      wire[2] = this.writeKey(size & 0xFF);
      for (let i = 0; i < size; i++) {
        wire[3 + i] = this.writeKey(payload[i]);
      }
    } else {
      wire[1] = (size >> 8) & 0xFF;
      wire[2] = size & 0xFF;
      wire.set(payload, 3);
    }

    return wire;
  }
}

import { Message } from '../packet/Message.js';
import { SessionCipher } from '../session/Cipher.js';

export class PacketStreamDecoder {
  private buffer: Uint8Array = new Uint8Array(0);

  constructor(private cipher: SessionCipher) {}

  public push(chunk: Uint8Array): Message[] {
    const newBuf = new Uint8Array(this.buffer.length + chunk.length);
    newBuf.set(this.buffer);
    newBuf.set(chunk, this.buffer.length);
    this.buffer = newBuf;

    const messages: Message[] = [];

    while (this.buffer.length >= 3) {
      let headerLen = 3;
      let cmd: number;
      let size: number;

      if (this.cipher.connected) {
        cmd = (this.cipher.peekReadKey(this.buffer[0], 0) << 24) >> 24;
        if (cmd === 90) {
          headerLen = 5;
          if (this.buffer.length < 5) break;
          const view = new DataView(this.buffer.buffer, this.buffer.byteOffset);
          size = view.getInt32(1, false);
        } else {
          const b1 = this.cipher.peekReadKey(this.buffer[1], 1);
          const b2 = this.cipher.peekReadKey(this.buffer[2], 2);
          size = ((b1 & 0xFF) << 8) | (b2 & 0xFF);
        }
      } else {
        cmd = (this.buffer[0] << 24) >> 24;
        const b1 = this.buffer[1];
        const b2 = this.buffer[2];
        size = ((b1 & 0xFF) << 8) | (b2 & 0xFF);
      }

      if (this.buffer.length < headerLen + size) {
        // Incomplete packet. Wait for more bytes without advancing cipher.
        break;
      }

      // We have the full packet! Now consume and decode.
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

      // Advance buffer past this packet
      this.buffer = this.buffer.subarray(headerLen + size);

      const msg = new Message(cmd, payload);
      if (cmd === -27 && !this.cipher.connected) {
        // Handshake packet!
        this.cipher.initHandshake(payload);
      }
      messages.push(msg);
    }

    return messages;
  }
}

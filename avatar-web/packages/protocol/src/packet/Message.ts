import { DataInputStream } from '../decoder/DataInputStream.js';
import { DataOutputStream } from '../encoder/DataOutputStream.js';

export class Message {
  public command: number;
  private dis?: DataInputStream;
  private dos?: DataOutputStream;
  private rawData?: Uint8Array;

  constructor(command: number, data?: Uint8Array) {
    this.command = (command << 24) >> 24; // Ensure signed byte (-128 .. 127)
    if (data) {
      this.rawData = data;
      this.dis = new DataInputStream(data);
    } else {
      this.dos = new DataOutputStream();
    }
  }

  public reader(): DataInputStream {
    if (!this.dis) {
      this.dis = new DataInputStream(this.getData());
    }
    return this.dis;
  }

  public writer(): DataOutputStream {
    if (!this.dos) {
      this.dos = new DataOutputStream();
      if (this.rawData) {
        this.dos.write(this.rawData);
      }
    }
    return this.dos;
  }

  public getData(): Uint8Array {
    if (this.dos) {
      return this.dos.toByteArray();
    }
    if (this.rawData) {
      return this.rawData;
    }
    return new Uint8Array(0);
  }

  public cleanup(): void {
    this.dis = undefined;
    this.dos = undefined;
    this.rawData = undefined;
  }
}

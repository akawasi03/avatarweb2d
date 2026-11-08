export class DataInputStream {
  private view: DataView;
  private pos = 0;
  private utf8Decoder = new TextDecoder('utf-8');

  constructor(private buffer: Uint8Array) {
    this.view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  }

  public available(): number {
    return this.buffer.length - this.pos;
  }

  public getPosition(): number {
    return this.pos;
  }

  public readByte(): number {
    if (this.pos >= this.buffer.length) {
      throw new Error(`EOF: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getInt8(this.pos);
    this.pos += 1;
    return val;
  }

  public readUnsignedByte(): number {
    if (this.pos >= this.buffer.length) {
      throw new Error(`EOF: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getUint8(this.pos);
    this.pos += 1;
    return val;
  }

  public readBoolean(): boolean {
    return this.readUnsignedByte() !== 0;
  }

  public readShort(): number {
    if (this.pos + 2 > this.buffer.length) {
      throw new Error(`EOF reading short: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getInt16(this.pos, false); // Big-Endian
    this.pos += 2;
    return val;
  }

  public readUnsignedShort(): number {
    if (this.pos + 2 > this.buffer.length) {
      throw new Error(`EOF reading ushort: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getUint16(this.pos, false); // Big-Endian
    this.pos += 2;
    return val;
  }

  public readInt(): number {
    if (this.pos + 4 > this.buffer.length) {
      throw new Error(`EOF reading int: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getInt32(this.pos, false); // Big-Endian
    this.pos += 4;
    return val;
  }

  public readLong(): bigint {
    if (this.pos + 8 > this.buffer.length) {
      throw new Error(`EOF reading long: pos=${this.pos}, len=${this.buffer.length}`);
    }
    const val = this.view.getBigInt64(this.pos, false); // Big-Endian
    this.pos += 8;
    return val;
  }

  public readUTF(): string {
    const length = this.readUnsignedShort();
    if (this.pos + length > this.buffer.length) {
      throw new Error(`EOF reading UTF string of len ${length}: pos=${this.pos}, bufLen=${this.buffer.length}`);
    }
    const bytes = this.buffer.subarray(this.pos, this.pos + length);
    this.pos += length;
    return this.utf8Decoder.decode(bytes);
  }

  public readFully(out: Uint8Array, offset = 0, length = out.length): void {
    if (this.pos + length > this.buffer.length) {
      throw new Error(`EOF in readFully: need ${length}, pos=${this.pos}, bufLen=${this.buffer.length}`);
    }
    out.set(this.buffer.subarray(this.pos, this.pos + length), offset);
    this.pos += length;
  }

  public readBytes(length: number): Uint8Array {
    if (this.pos + length > this.buffer.length) {
      throw new Error(`EOF in readBytes: need ${length}, pos=${this.pos}, bufLen=${this.buffer.length}`);
    }
    const result = new Uint8Array(length);
    result.set(this.buffer.subarray(this.pos, this.pos + length));
    this.pos += length;
    return result;
  }
}

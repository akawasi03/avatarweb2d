export class DataOutputStream {
  private buffer: Uint8Array;
  private view: DataView;
  private length = 0;
  private utf8Encoder = new TextEncoder();

  constructor(initialCapacity = 256) {
    this.buffer = new Uint8Array(initialCapacity);
    this.view = new DataView(this.buffer.buffer);
  }

  private ensureCapacity(additional: number): void {
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

  public writeByte(val: number): void {
    this.ensureCapacity(1);
    this.view.setInt8(this.length, val);
    this.length += 1;
  }

  public writeUnsignedByte(val: number): void {
    this.ensureCapacity(1);
    this.view.setUint8(this.length, val);
    this.length += 1;
  }

  public writeBoolean(val: boolean): void {
    this.writeUnsignedByte(val ? 1 : 0);
  }

  public writeShort(val: number): void {
    this.ensureCapacity(2);
    this.view.setInt16(this.length, val, false); // Big-Endian
    this.length += 2;
  }

  public writeUnsignedShort(val: number): void {
    this.ensureCapacity(2);
    this.view.setUint16(this.length, val, false); // Big-Endian
    this.length += 2;
  }

  public writeInt(val: number): void {
    this.ensureCapacity(4);
    this.view.setInt32(this.length, val, false); // Big-Endian
    this.length += 4;
  }

  public writeLong(val: bigint | number): void {
    this.ensureCapacity(8);
    const bigVal = typeof val === 'number' ? BigInt(val) : val;
    this.view.setBigInt64(this.length, bigVal, false); // Big-Endian
    this.length += 8;
  }

  public writeUTF(str: string): void {
    const encoded = this.utf8Encoder.encode(str);
    if (encoded.length > 65535) {
      throw new Error(`String exceeds maximum UTF length (65535): length=${encoded.length}`);
    }
    this.writeUnsignedShort(encoded.length);
    this.write(encoded);
  }

  public write(data: Uint8Array, offset = 0, length = data.length): void {
    this.ensureCapacity(length);
    this.buffer.set(data.subarray(offset, offset + length), this.length);
    this.length += length;
  }

  public size(): number {
    return this.length;
  }

  public toByteArray(): Uint8Array {
    return this.buffer.slice(0, this.length);
  }
}

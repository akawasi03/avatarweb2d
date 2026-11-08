import { Image } from '@avatar/j2me-compat';

export interface AvEntry {
  name: string;
  offset: number;
  length: number;
}

export class AvArchiveLoader {
  private static readonly KEY = new TextEncoder().encode('NguyenVanMinh');
  private entries = new Map<string, AvEntry>();
  private payload: Uint8Array = new Uint8Array(0);

  public loadFromBytes(avBytes: Uint8Array): void {
    const key = AvArchiveLoader.KEY;
    const keyLen = key.length;

    const count = avBytes[0];
    let idx = 1;
    let totalLen = 0;

    for (let i = 0; i < count; i++) {
      const nameLen = avBytes[idx++];
      const nameRaw = new Uint8Array(nameLen);
      for (let k = 0; k < nameLen; k++) {
        nameRaw[k] = (avBytes[idx++] ^ key[k % keyLen]) & 0xFF;
      }
      const name = new TextDecoder('utf-8').decode(nameRaw);
      const length = (avBytes[idx] << 8) | avBytes[idx + 1];
      idx += 2;

      this.entries.set(name, {
        name,
        offset: totalLen,
        length
      });
      totalLen += length;
    }

    // Decrypt payload
    const rawPayload = avBytes.subarray(idx, idx + totalLen);
    this.payload = new Uint8Array(rawPayload.length);
    for (let k = 0; k < rawPayload.length; k++) {
      this.payload[k] = (rawPayload[k] ^ key[k % keyLen]) & 0xFF;
    }
  }

  public getFileBytes(name: string): Uint8Array | null {
    const entry = this.entries.get(name);
    if (!entry) return null;
    return this.payload.subarray(entry.offset, entry.offset + entry.length);
  }

  public getImage(name: string): Image | Promise<Image> | null {
    const fileName = name.endsWith('.png') ? name : `${name}.png`;
    const bytes = this.getFileBytes(fileName);
    if (!bytes) return null;
    return Image.createImage(bytes);
  }

  public getEntryNames(): string[] {
    return Array.from(this.entries.keys());
  }
}

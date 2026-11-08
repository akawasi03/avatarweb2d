import { Graphics } from '../graphics/Graphics.js';

export class Image {
  public width: number;
  public height: number;
  public data?: Uint8Array;
  public element?: HTMLImageElement | HTMLCanvasElement;

  constructor(width: number, height: number, data?: Uint8Array, element?: HTMLImageElement | HTMLCanvasElement) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.element = element;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public static createImage(width: number, height: number): Image;
  public static createImage(src: string): Promise<Image>;
  public static createImage(data: Uint8Array, offset?: number, length?: number): Promise<Image> | Image;
  public static createImage(
    arg1: number | string | Uint8Array,
    arg2?: number,
    arg3?: number
  ): Promise<Image> | Image {
    if (typeof arg1 === 'number') {
      const width = arg1;
      const height = arg2 || 0;
      return new Image(width, height);
    }

    if (typeof arg1 === 'string') {
      return new Promise<Image>((resolve, reject) => {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const img = new window.Image();
          img.onload = () => resolve(new Image(img.naturalWidth, img.naturalHeight, undefined, img));
          img.onerror = (e) => reject(new Error(`Failed to load image from ${arg1}: ${e}`));
          img.src = arg1;
        } else {
          // Node environment fallback / mock
          resolve(new Image(100, 100));
        }
      });
    }

    // Uint8Array bytes (PNG)
    const offset = arg2 || 0;
    const length = arg3 !== undefined ? arg3 : arg1.length - offset;
    const bytes = arg1.subarray(offset, offset + length);

    // Parse PNG width & height from header if PNG
    let width = 0;
    let height = 0;
    if (bytes.length >= 24 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      width = view.getInt32(16, false);
      height = view.getInt32(20, false);
    }

    if (typeof window !== 'undefined' && typeof Blob !== 'undefined') {
      return new Promise<Image>((resolve, reject) => {
        const blob = new Blob([bytes as any], { type: 'image/png' });
        const url = URL.createObjectURL(blob);
        const img = new window.Image();
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(new Image(img.naturalWidth, img.naturalHeight, bytes, img));
        };
        img.onerror = (e) => {
          URL.revokeObjectURL(url);
          reject(new Error(`Failed to decode image from bytes: ${e}`));
        };
        img.src = url;
      });
    }

    // Node.js or headful mock
    return new Image(width, height, bytes);
  }
}

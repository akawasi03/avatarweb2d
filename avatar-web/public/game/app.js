"use strict";
(() => {
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

  // packages/j2me-compat/dist/sprite/Sprite.js
  var require_Sprite = __commonJS({
    "packages/j2me-compat/dist/sprite/Sprite.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Sprite = void 0;
      var Sprite2 = class {
        static TRANS_NONE = 0;
        static TRANS_MIRROR_ROT180 = 1;
        static TRANS_MIRROR = 2;
        static TRANS_ROT180 = 3;
        static TRANS_MIRROR_ROT270 = 4;
        static TRANS_ROT90 = 5;
        static TRANS_ROT270 = 6;
        static TRANS_MIRROR_ROT90 = 7;
      };
      exports.Sprite = Sprite2;
    }
  });

  // packages/j2me-compat/dist/graphics/Graphics.js
  var require_Graphics = __commonJS({
    "packages/j2me-compat/dist/graphics/Graphics.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Graphics = void 0;
      var Sprite_js_1 = require_Sprite();
      var Graphics8 = class _Graphics {
        ctx;
        static HCENTER = 1;
        static VCENTER = 2;
        static LEFT = 4;
        static RIGHT = 8;
        static TOP = 16;
        static BOTTOM = 32;
        static BASELINE = 64;
        tx = 0;
        ty = 0;
        clipX = 0;
        clipY = 0;
        clipW = 99999;
        clipH = 99999;
        currentColor = 0;
        constructor(ctx) {
          this.ctx = ctx;
        }
        translate(x, y) {
          this.tx += x;
          this.ty += y;
        }
        getTranslateX() {
          return this.tx;
        }
        getTranslateY() {
          return this.ty;
        }
        setColor(rgb) {
          this.currentColor = rgb;
          const r = rgb >> 16 & 255;
          const g = rgb >> 8 & 255;
          const b = rgb & 255;
          const colorStr = `rgb(${r},${g},${b})`;
          if (this.ctx) {
            this.ctx.fillStyle = colorStr;
            this.ctx.strokeStyle = colorStr;
          }
        }
        getColor() {
          return this.currentColor;
        }
        setClip(x, y, width, height) {
          this.clipX = x;
          this.clipY = y;
          this.clipW = width;
          this.clipH = height;
          if (this.ctx) {
            this.ctx.restore();
            this.ctx.save();
            this.ctx.translate(this.tx, this.ty);
            this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
            this.ctx.clip();
            this.setColor(this.currentColor);
          }
        }
        clipRect(x, y, width, height) {
          const x1 = Math.max(this.clipX, x);
          const y1 = Math.max(this.clipY, y);
          const x2 = Math.min(this.clipX + this.clipW, x + width);
          const y2 = Math.min(this.clipY + this.clipH, y + height);
          this.setClip(x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1));
        }
        getClipX() {
          return this.clipX;
        }
        getClipY() {
          return this.clipY;
        }
        getClipWidth() {
          return this.clipW;
        }
        getClipHeight() {
          return this.clipH;
        }
        fillRect(x, y, width, height) {
          if (this.ctx) {
            this.ctx.fillRect(x, y, width, height);
          }
        }
        drawRect(x, y, width, height) {
          if (this.ctx) {
            this.ctx.strokeRect(x, y, width, height);
          }
        }
        drawRoundRect(x, y, width, height, arcWidth, arcHeight = arcWidth) {
          if (this.ctx) {
            const radius = Math.min(arcWidth, arcHeight) / 2;
            this.ctx.beginPath();
            if (typeof this.ctx.roundRect === "function") {
              this.ctx.roundRect(x, y, width, height, radius);
            } else {
              this.ctx.rect(x, y, width, height);
            }
            this.ctx.stroke();
          }
        }
        fillRoundRect(x, y, width, height, arcWidth, arcHeight = arcWidth) {
          if (this.ctx) {
            const radius = Math.min(arcWidth, arcHeight) / 2;
            this.ctx.beginPath();
            if (typeof this.ctx.roundRect === "function") {
              this.ctx.roundRect(x, y, width, height, radius);
            } else {
              this.ctx.rect(x, y, width, height);
            }
            this.ctx.fill();
          }
        }
        fillArc(x, y, width, height, startAngle, arcAngle) {
          if (this.ctx) {
            this.ctx.beginPath();
            const rx = width / 2;
            const ry = height / 2;
            const cx = x + rx;
            const cy = y + ry;
            const sa = startAngle * Math.PI / 180;
            const ea = (startAngle + arcAngle) * Math.PI / 180;
            if (typeof this.ctx.ellipse === "function") {
              this.ctx.ellipse(cx, cy, rx, ry, 0, sa, ea);
            } else if (typeof this.ctx.arc === "function") {
              this.ctx.arc(cx, cy, rx, sa, ea);
            }
            this.ctx.fill();
          }
        }
        drawArc(x, y, width, height, startAngle, arcAngle) {
          if (this.ctx) {
            this.ctx.beginPath();
            const rx = width / 2;
            const ry = height / 2;
            const cx = x + rx;
            const cy = y + ry;
            const sa = startAngle * Math.PI / 180;
            const ea = (startAngle + arcAngle) * Math.PI / 180;
            if (typeof this.ctx.ellipse === "function") {
              this.ctx.ellipse(cx, cy, rx, ry, 0, sa, ea);
            } else if (typeof this.ctx.arc === "function") {
              this.ctx.arc(cx, cy, rx, sa, ea);
            }
            this.ctx.stroke();
          }
        }
        drawLine(x1, y1, x2, y2) {
          if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
          }
        }
        calculateAnchor(x, y, width, height, anchor) {
          let outX = x;
          let outY = y;
          if ((anchor & _Graphics.RIGHT) !== 0) {
            outX -= width;
          } else if ((anchor & _Graphics.HCENTER) !== 0) {
            outX -= Math.floor(width / 2);
          }
          if ((anchor & _Graphics.BOTTOM) !== 0) {
            outY -= height;
          } else if ((anchor & _Graphics.VCENTER) !== 0) {
            outY -= Math.floor(height / 2);
          }
          return { x: outX, y: outY };
        }
        drawImage(image, x, y, anchor = 0) {
          const pt = this.calculateAnchor(x, y, image.width, image.height, anchor);
          if (this.ctx && image.element) {
            this.ctx.drawImage(image.element, 0, 0, image.width, image.height, pt.x, pt.y, image.width, image.height);
          }
        }
        drawScaledImage(image, x, y, width, height, anchor = 0) {
          const pt = this.calculateAnchor(x, y, width, height, anchor);
          if (this.ctx && image.element) {
            this.ctx.drawImage(image.element, 0, 0, image.width, image.height, pt.x, pt.y, width, height);
          }
        }
        drawRegion(image, x_src, y_src, width, height, transform, x_dst, y_dst, anchor = 0) {
          let destW = width;
          let destH = height;
          if (transform === Sprite_js_1.Sprite.TRANS_ROT90 || transform === Sprite_js_1.Sprite.TRANS_ROT270 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT90 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT270) {
            destW = height;
            destH = width;
          }
          const pt = this.calculateAnchor(x_dst, y_dst, destW, destH, anchor);
          if (!this.ctx || !image.element) {
            return;
          }
          if (transform === Sprite_js_1.Sprite.TRANS_NONE) {
            this.ctx.drawImage(image.element, x_src, y_src, width, height, pt.x, pt.y, width, height);
            return;
          }
          this.ctx.save();
          this.ctx.translate(pt.x + destW / 2, pt.y + destH / 2);
          switch (transform) {
            case Sprite_js_1.Sprite.TRANS_MIRROR:
              this.ctx.scale(-1, 1);
              break;
            case Sprite_js_1.Sprite.TRANS_ROT180:
              this.ctx.rotate(Math.PI);
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT180:
              this.ctx.scale(1, -1);
              break;
            case Sprite_js_1.Sprite.TRANS_ROT90:
              this.ctx.rotate(Math.PI / 2);
              break;
            case Sprite_js_1.Sprite.TRANS_ROT270:
              this.ctx.rotate(3 * Math.PI / 2);
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT90:
              this.ctx.scale(-1, 1);
              this.ctx.rotate(Math.PI / 2);
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT270:
              this.ctx.scale(-1, 1);
              this.ctx.rotate(3 * Math.PI / 2);
              break;
          }
          this.ctx.drawImage(image.element, x_src, y_src, width, height, -width / 2, -height / 2, width, height);
          this.ctx.restore();
        }
      };
      exports.Graphics = Graphics8;
    }
  });

  // packages/j2me-compat/dist/image/Image.js
  var require_Image = __commonJS({
    "packages/j2me-compat/dist/image/Image.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Image = void 0;
      var Image9 = class _Image {
        width;
        height;
        data;
        element;
        constructor(width, height, data, element) {
          this.width = width;
          this.height = height;
          this.data = data;
          this.element = element;
        }
        getWidth() {
          return this.width;
        }
        getHeight() {
          return this.height;
        }
        static createImage(arg1, arg2, arg3) {
          if (typeof arg1 === "number") {
            const width2 = arg1;
            const height2 = arg2 || 0;
            return new _Image(width2, height2);
          }
          if (typeof arg1 === "string") {
            return new Promise((resolve, reject) => {
              if (typeof window !== "undefined" && typeof document !== "undefined") {
                const img = new window.Image();
                img.onload = () => resolve(new _Image(img.naturalWidth, img.naturalHeight, void 0, img));
                img.onerror = (e) => reject(new Error(`Failed to load image from ${arg1}: ${e}`));
                img.src = arg1;
              } else {
                resolve(new _Image(100, 100));
              }
            });
          }
          const offset = arg2 || 0;
          const length = arg3 !== void 0 ? arg3 : arg1.length - offset;
          const bytes = arg1.subarray(offset, offset + length);
          let width = 0;
          let height = 0;
          if (bytes.length >= 24 && bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) {
            const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
            width = view.getInt32(16, false);
            height = view.getInt32(20, false);
          }
          if (typeof window !== "undefined" && typeof Blob !== "undefined") {
            return new Promise((resolve, reject) => {
              const blob = new Blob([bytes], { type: "image/png" });
              const url = URL.createObjectURL(blob);
              const img = new window.Image();
              img.onload = () => {
                URL.revokeObjectURL(url);
                resolve(new _Image(img.naturalWidth, img.naturalHeight, bytes, img));
              };
              img.onerror = (e) => {
                URL.revokeObjectURL(url);
                reject(new Error(`Failed to decode image from bytes: ${e}`));
              };
              img.src = url;
            });
          }
          return new _Image(width, height, bytes);
        }
      };
      exports.Image = Image9;
    }
  });

  // packages/j2me-compat/dist/canvas/Canvas.js
  var require_Canvas = __commonJS({
    "packages/j2me-compat/dist/canvas/Canvas.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Canvas = void 0;
      var Canvas2 = class _Canvas {
        static UP = 1;
        static DOWN = 6;
        static LEFT = 2;
        static RIGHT = 5;
        static FIRE = 8;
        static GAME_A = 9;
        static GAME_B = 10;
        static GAME_C = 11;
        static GAME_D = 12;
        static KEY_NUM0 = 48;
        static KEY_NUM1 = 49;
        static KEY_NUM2 = 50;
        static KEY_NUM3 = 51;
        static KEY_NUM4 = 52;
        static KEY_NUM5 = 53;
        static KEY_NUM6 = 54;
        static KEY_NUM7 = 55;
        static KEY_NUM8 = 56;
        static KEY_NUM9 = 57;
        static KEY_STAR = 42;
        static KEY_POUND = 35;
        width = 240;
        height = 320;
        fullScreen = false;
        setFullScreenMode(mode) {
          this.fullScreen = mode;
        }
        getWidth() {
          return this.width;
        }
        getHeight() {
          return this.height;
        }
        getGameAction(keyCode) {
          switch (keyCode) {
            case _Canvas.KEY_NUM2:
            case -1:
              return _Canvas.UP;
            case _Canvas.KEY_NUM8:
            case -2:
              return _Canvas.DOWN;
            case _Canvas.KEY_NUM4:
            case -3:
              return _Canvas.LEFT;
            case _Canvas.KEY_NUM6:
            case -4:
              return _Canvas.RIGHT;
            case _Canvas.KEY_NUM5:
            case -5:
            // Standard FIRE / OK key
            case 13:
              return _Canvas.FIRE;
            default:
              return 0;
          }
        }
        getKeyCode(gameAction) {
          switch (gameAction) {
            case _Canvas.UP:
              return _Canvas.KEY_NUM2;
            case _Canvas.DOWN:
              return _Canvas.KEY_NUM8;
            case _Canvas.LEFT:
              return _Canvas.KEY_NUM4;
            case _Canvas.RIGHT:
              return _Canvas.KEY_NUM6;
            case _Canvas.FIRE:
              return _Canvas.KEY_NUM5;
            default:
              return 0;
          }
        }
        hasPointerEvents() {
          return true;
        }
        repaint() {
        }
        serviceRepaints() {
        }
        keyPressed(keyCode) {
        }
        keyReleased(keyCode) {
        }
        pointerPressed(x, y) {
        }
        pointerDragged(x, y) {
        }
        pointerReleased(x, y) {
        }
        sizeChanged(w, h) {
          this.width = w;
          this.height = h;
        }
      };
      exports.Canvas = Canvas2;
    }
  });

  // packages/j2me-compat/dist/io/RecordStore.js
  var require_RecordStore = __commonJS({
    "packages/j2me-compat/dist/io/RecordStore.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RecordStore = void 0;
      var RecordStore = class _RecordStore {
        name;
        records;
        static stores = /* @__PURE__ */ new Map();
        constructor(name, records) {
          this.name = name;
          this.records = records;
        }
        static openRecordStore(recordStoreName, createIfNecessary = true) {
          let store = this.stores.get(recordStoreName);
          if (!store) {
            if (!createIfNecessary) {
              throw new Error(`RecordStoreNotFoundException: ${recordStoreName}`);
            }
            store = /* @__PURE__ */ new Map();
            this.stores.set(recordStoreName, store);
            if (typeof window !== "undefined" && window.localStorage) {
              try {
                const raw = window.localStorage.getItem(`rms_${recordStoreName}`);
                if (raw) {
                  const parsed = JSON.parse(raw);
                  for (const [k, v] of Object.entries(parsed)) {
                    store.set(parseInt(k, 10), new Uint8Array(v));
                  }
                }
              } catch (_) {
              }
            }
          }
          return new _RecordStore(recordStoreName, store);
        }
        getNumRecords() {
          return this.records.size;
        }
        getRecord(recordId) {
          const data = this.records.get(recordId);
          if (!data) {
            throw new Error(`InvalidRecordIDException: id=${recordId} in ${this.name}`);
          }
          return data;
        }
        addRecord(data, offset = 0, numBytes = data.length) {
          const nextId = this.records.size + 1;
          const slice = data.slice(offset, offset + numBytes);
          this.records.set(nextId, slice);
          this.persist();
          return nextId;
        }
        setRecord(recordId, data, offset = 0, numBytes = data.length) {
          const slice = data.slice(offset, offset + numBytes);
          this.records.set(recordId, slice);
          this.persist();
        }
        persist() {
          if (typeof window !== "undefined" && window.localStorage) {
            try {
              const obj = {};
              for (const [k, v] of this.records.entries()) {
                obj[k] = Array.from(v);
              }
              window.localStorage.setItem(`rms_${this.name}`, JSON.stringify(obj));
            } catch (_) {
            }
          }
        }
        closeRecordStore() {
        }
      };
      exports.RecordStore = RecordStore;
    }
  });

  // packages/j2me-compat/dist/index.js
  var require_dist = __commonJS({
    "packages/j2me-compat/dist/index.js"(exports) {
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
      __exportStar(require_Graphics(), exports);
      __exportStar(require_Image(), exports);
      __exportStar(require_Sprite(), exports);
      __exportStar(require_Canvas(), exports);
      __exportStar(require_RecordStore(), exports);
    }
  });

  // packages/protocol/dist/decoder/DataInputStream.js
  var require_DataInputStream = __commonJS({
    "packages/protocol/dist/decoder/DataInputStream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DataInputStream = void 0;
      var DataInputStream = class {
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
      exports.DataInputStream = DataInputStream;
    }
  });

  // packages/protocol/dist/encoder/DataOutputStream.js
  var require_DataOutputStream = __commonJS({
    "packages/protocol/dist/encoder/DataOutputStream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DataOutputStream = void 0;
      var DataOutputStream = class {
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
      exports.DataOutputStream = DataOutputStream;
    }
  });

  // packages/protocol/dist/packet/Message.js
  var require_Message = __commonJS({
    "packages/protocol/dist/packet/Message.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Message = void 0;
      var DataInputStream_js_1 = require_DataInputStream();
      var DataOutputStream_js_1 = require_DataOutputStream();
      var Message2 = class {
        command;
        dis;
        dos;
        rawData;
        constructor(command, data) {
          this.command = command << 24 >> 24;
          if (data) {
            this.rawData = data;
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
            if (this.rawData) {
              this.dos.write(this.rawData);
            }
          }
          return this.dos;
        }
        getData() {
          if (this.dos) {
            return this.dos.toByteArray();
          }
          if (this.rawData) {
            return this.rawData;
          }
          return new Uint8Array(0);
        }
        cleanup() {
          this.dis = void 0;
          this.dos = void 0;
          this.rawData = void 0;
        }
      };
      exports.Message = Message2;
    }
  });

  // packages/protocol/dist/session/Cipher.js
  var require_Cipher = __commonJS({
    "packages/protocol/dist/session/Cipher.js"(exports) {
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

  // packages/protocol/dist/decoder/PacketStreamDecoder.js
  var require_PacketStreamDecoder = __commonJS({
    "packages/protocol/dist/decoder/PacketStreamDecoder.js"(exports) {
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

  // packages/protocol/dist/Cmd.js
  var require_Cmd = __commonJS({
    "packages/protocol/dist/Cmd.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Cmd = void 0;
      exports.Cmd = {
        // Negative commands
        CREATE_CHAR_INFO: -106,
        SHOP_HOUSE: -107,
        JOIN_HOUSE_4: -104,
        JOIN_OFFLINE_MAP: -99,
        REQUEST_IMAGE_PART: -98,
        REQUEST_DYNAMIC_PART: -97,
        REQUEST_TILE_MAP: -94,
        REQUEST_CITY_MAP: -92,
        REQUEST_MONEY_LOAD: -91,
        UPGRADE_CHEST: -90,
        PASS_CHEST: -88,
        CUSTOM_CHEST: -87,
        EMOTION_LIST: -85,
        EFFECT_OBJ: -84,
        MENU_ROTATE: -83,
        CHANGE_CLAN: -82,
        CUSTOM_LIST: -81,
        GET_IMG_ICON: -80,
        SET_AGENT: -79,
        BOSS_SHOP: -78,
        CUSTOM_POPUP: -77,
        SET_PASS_MY_HOUSE: -75,
        BUY_ITEM_HOUSE: -74,
        GET_TILE_MAP: -73,
        SERVER_KICK: -72,
        SORT_ITEM_HOUSE: -71,
        REQUEST_EXPICE_PET: -70,
        KICK_OUT_HOME: -69,
        INVITE_TO_MY_HOME: -68,
        GET_TYPE_HOUSE: -67,
        DEL_ITEM_HOUSE: -66,
        JOIN_HOUSE: -65,
        DIAL_LUCKY: -64,
        WEATHER: -63,
        CHANGE_PASS: -62,
        COMMUNICATE: -61,
        TEXT_BOX: -60,
        MENU_OPTION: -59,
        CUSTOM_TAB: -58,
        LOAD_CARD: -56,
        REQUEST_SERVICE: -55,
        SMS: -54,
        UPDATE_CONTAINER: -53,
        NUMBER_SUPPORT: -52,
        SOUND_DATA: -51,
        REQUEST_SOUND: -50,
        OPEN_SHOP: -49,
        USING_PART: -48,
        CONTAINER: -47,
        CREATE_HOME: -46,
        BUY_HOME: -45,
        GET_IMG_OBJ_INFO: -43,
        MAP_AD: -42,
        MAP_ITEM: -41,
        MAP_ITEM_TYPE: -40,
        PARK_BUY_ITEM: -38,
        GET_ITEM_INFO: -37,
        REMOVE_ITEM: -36,
        CRE_CHARACTER: -35,
        UPDATE_MONEY: -33,
        REQUEST_REGISTER: -30,
        UPDATE_USERDATA: -29,
        USER_DATA: -28,
        HANDSHAKE: -27,
        REGISTER_BY_EMAIL: -25,
        AVATAR_BUY_ITEM: -24,
        REQUEST_CHARGE_MONEY_INFO: -23,
        REQUEST_YOUR_INFO: -22,
        AVATAR_REQUEST_ADD_FRIEND: -21,
        REMOVE_FRIEND: -20,
        ADD_FRIEND: -19,
        REQUEST_FRIENDLIST: -18,
        SET_PROVIDER: -17,
        GET_AVATAR_PART: -16,
        GET_IMAGE: -15,
        GET_BIG: -14,
        LOGIN_NEW_GAME: -12,
        SET_BIG: -11,
        SET_MONEY_ERROR: -10,
        SERVER_MESSAGE: -9,
        SERVER_INFO: -8,
        VERSION: -7,
        CHAT_TO: -6,
        LOGIN_FAIL: -5,
        LOGIN_SUCESS: -4,
        LOGIN: -2,
        GET_HANDLER: -1,
        // Positive commands
        ROOM_NAME: 0,
        JOIN_ROOM_RACE: 1,
        PET_INFO: 2,
        DAT_CUOC: 5,
        REQUEST_ROOMLIST: 6,
        REQUEST_BOARDLIST: 7,
        HISTORY_PET_RACE: 8,
        JOIN_BOARD: 8,
        CHAT_TO_BOARD: 9,
        WINER_INFO: 10,
        KICK: 11,
        SOMEONE_JOINBOARD: 12,
        SOMEONE_LEAVEBOARD: 14,
        LEAVE_BOARD: 15,
        READY: 16,
        SET_PASS: 18,
        SET_MONEY: 19,
        START: 20,
        MOVE_CARO: 21,
        AVATAR_JOIN_PARK: 50,
        PLAYER_JOIN_PARK: 51,
        PLAYER_LEAVE_PARK: 53,
        MOVE_PARK: 54,
        CHAT_PARK: 55,
        AVATAR_CHAT_PRIVATE: 56,
        AVATAR_FEEL: 57,
        AVATAR_GIFT_GIVING: 58,
        ACTION: 59,
        PARK_BOARD_LIST: 60,
        INVENTORY: 60,
        JOIN: 61,
        BUY_ITEM: 62,
        SELL_ITEM: 63,
        PLANT_SEED: 64,
        USING_ITEM: 65,
        TREE_HARVEST: 66,
        KICH: 67,
        REQUEST_SLOT: 69,
        OPEN_LAND: 70,
        BUY_ANIMAL: 71,
        PRICE_ANIMAL: 72,
        SELL_ANIMAL: 73,
        HARVEST_ANIMAL: 74,
        TRANSFER_MONEY: 75,
        MOVE_FARM: 76,
        CHAT_FARM: 77,
        INFO_CELL: 78,
        INFO_ANIMAL: 79,
        UPDATE_FARM_CATTLE: 80,
        UPDATE_FARM_FISH: 81,
        GET_IMG_FARM: 82,
        UPDATE_STARFRUIL: 84,
        HARVEST_STARFRUIT: 85,
        UPDATE_STARTFRUIT_BYMONEY: 86,
        GET_INFO_STARFRUIT: 87,
        UPDATE_LAND: 90,
        COOKING: 91,
        FLY: 92,
        NAU_NHANH: 93,
        UPDATE_STORE: 94,
        STEAL_INFO: 95,
        STEAL: 96,
        STEAL_STORE: 97,
        LICH_SU_BI_TROM: 98,
        DICH_CHUYEN: 122
      };
    }
  });

  // packages/protocol/dist/index.js
  var require_dist2 = __commonJS({
    "packages/protocol/dist/index.js"(exports) {
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
      __exportStar(require_Cmd(), exports);
    }
  });

  // packages/game-client/src/core/GameMidlet.ts
  var import_j2me_compat6 = __toESM(require_dist());

  // packages/game-client/src/runtime/GameCanvas.ts
  var import_j2me_compat = __toESM(require_dist());
  var GameCanvas = class _GameCanvas extends import_j2me_compat.Canvas {
    static instance;
    currentScreen;
    graphics;
    isRunning = false;
    lastTick = 0;
    FPS = 20;
    FRAME_TIME = 1e3 / 20;
    // 50ms per frame
    constructor(ctx) {
      super();
      this.width = 240;
      this.height = 320;
      this.graphics = new import_j2me_compat.Graphics(ctx);
      _GameCanvas.instance = this;
    }
    setCurrentScreen(screen) {
      if (this.currentScreen) {
        this.currentScreen.hide();
      }
      this.currentScreen = screen;
      screen.show();
      screen.onResize(this.width, this.height);
    }
    resize(width, height) {
      this.width = width;
      this.height = height;
      if (this.currentScreen) {
        this.currentScreen.onResize(width, height);
      }
    }
    startLoop(onFrame) {
      this.isRunning = true;
      this.lastTick = Date.now();
      const loop = () => {
        if (!this.isRunning) return;
        const now = Date.now();
        const elapsed = now - this.lastTick;
        if (elapsed >= this.FRAME_TIME) {
          this.lastTick = now - elapsed % this.FRAME_TIME;
          this.tick();
          this.repaint();
          if (onFrame) onFrame();
        }
        if (typeof requestAnimationFrame !== "undefined") {
          requestAnimationFrame(loop);
        } else {
          setTimeout(loop, 10);
        }
      };
      loop();
    }
    stopLoop() {
      this.isRunning = false;
    }
    tick() {
      if (this.currentScreen) {
        this.currentScreen.update();
      }
    }
    paint(g) {
      g.translate(0, 0);
      if (this.currentScreen) {
        this.currentScreen.paint(g);
      }
    }
    repaint() {
      this.paint(this.graphics);
    }
    keyPressed(keyCode) {
      if (this.currentScreen) {
        this.currentScreen.keyPressed(keyCode);
      }
    }
    keyReleased(keyCode) {
      if (this.currentScreen) {
        this.currentScreen.keyReleased(keyCode);
      }
    }
    pointerPressed(x, y) {
      if (this.currentScreen) {
        this.currentScreen.pointerPressed(x, y);
      }
    }
    pointerReleased(x, y) {
      if (this.currentScreen) {
        this.currentScreen.pointerReleased(x, y);
      }
    }
    pointerMoved(x, y) {
      if (this.currentScreen) {
        this.currentScreen.pointerMoved(x, y);
      }
    }
    pointerDragged(x, y) {
      if (this.currentScreen) {
        this.currentScreen.pointerDragged(x, y);
      }
    }
  };

  // packages/game-client/src/gameplay/SplashScreen.ts
  var import_j2me_compat2 = __toESM(require_dist());

  // packages/game-client/src/ui/GameScreen.ts
  var GameScreen = class {
    leftCmd;
    centerCmd;
    rightCmd;
    isVisible = false;
    show() {
      this.isVisible = true;
    }
    hide() {
      this.isVisible = false;
    }
    keyPressed(keyCode) {
    }
    keyReleased(keyCode) {
    }
    pointerPressed(x, y) {
    }
    pointerReleased(x, y) {
    }
    pointerMoved(x, y) {
    }
    pointerDragged(x, y) {
    }
    onResize(width, height) {
    }
  };

  // packages/game-client/src/gameplay/SplashScreen.ts
  var SplashScreen = class extends GameScreen {
    timer = 0;
    logoImage;
    onFinished;
    constructor(logoImage, onFinished) {
      super();
      this.logoImage = logoImage;
      this.onFinished = onFinished;
    }
    update() {
      this.timer++;
      if (this.timer >= 52) {
        if (this.onFinished) {
          this.onFinished();
        }
      }
    }
    paint(g) {
      const w = 240;
      const h = 320;
      g.setColor(0);
      g.fillRect(0, 0, w, h);
      if (this.logoImage && this.timer > 1) {
        g.drawImage(this.logoImage, Math.floor(w / 2), Math.floor(h / 2), import_j2me_compat2.Graphics.HCENTER | import_j2me_compat2.Graphics.VCENTER);
      }
    }
  };

  // packages/game-client/src/gameplay/LoginScreen.ts
  var import_j2me_compat3 = __toESM(require_dist());

  // packages/game-client/src/renderer/FrameImage.ts
  var FrameImage = class {
    frameWidth;
    frameHeight;
    totalFrames;
    image;
    constructor(image, frameWidth, frameHeight) {
      this.image = image;
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.totalFrames = Math.floor(image.height / frameHeight);
    }
    drawFrame(frameIdx, x, y, transform, anchor, g) {
      if (frameIdx >= 0 && frameIdx < this.totalFrames) {
        g.drawRegion(
          this.image,
          0,
          frameIdx * this.frameHeight,
          this.frameWidth,
          this.frameHeight,
          transform,
          x,
          y,
          anchor
        );
      }
    }
    drawGridFrame(frameX, frameY, x, y, transform, anchor, g) {
      g.drawRegion(
        this.image,
        frameX * this.frameWidth,
        frameY * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        transform,
        x,
        y,
        anchor
      );
    }
  };

  // packages/game-client/src/ui/UISkinPainter.ts
  var UISkinPainter = class _UISkinPainter {
    // Original je.d color palette from gw.java
    static JE_D = [6201499, 2378578, 8705740, 2716523, 16701696, 70];
    static COLOR_BG = 8705740;
    // #84D6CC (cyan body fill)
    static COLOR_BORDER1 = 2378578;
    // #244B52 (dark cyan border)
    static COLOR_BORDER2 = 6201499;
    // #5EA09B (accent border)
    static COLOR_SELECTED = 14279153;
    // #D9E1F1 (highlight)
    font;
    roundCorners;
    constructor(font, roundCornersImg) {
      this.font = font;
      if (roundCornersImg) {
        this.roundCorners = new FrameImage(roundCornersImg, 8, 8);
      }
    }
    paintWindow(g, x, y, w, h, style = 0) {
      const col0 = _UISkinPainter.JE_D[style] ?? _UISkinPainter.COLOR_BORDER2;
      const col1 = _UISkinPainter.JE_D[style + 1] ?? _UISkinPainter.COLOR_BORDER1;
      const col2 = _UISkinPainter.JE_D[2] ?? _UISkinPainter.COLOR_BG;
      const col3 = _UISkinPainter.JE_D[3] ?? 2716523;
      this.paintBorderLayer(g, x, y, w, h, col0, col1, 0);
      this.paintBorderLayer(g, x + 3, y + 3, w - 6, h - 6, col2, col3, 1);
    }
    paintBorderLayer(g, x, y, w, h, fillCol, lineCol, cornerStyle) {
      if (this.roundCorners) {
        const baseFrame = cornerStyle << 2;
        this.roundCorners.drawFrame(baseFrame + 0, x, y, 0, 0, g);
        this.roundCorners.drawFrame(baseFrame + 1, x + w - 8, y, 0, 0, g);
        this.roundCorners.drawFrame(baseFrame + 2, x, y + h - 8, 0, 0, g);
        this.roundCorners.drawFrame(baseFrame + 3, x + w - 8, y + h - 8, 0, 0, g);
      }
      g.setColor(fillCol);
      g.fillRect(x + 8, y, w - 16, 8);
      g.fillRect(x + 8, y + h - 8, w - 16, 7);
      g.fillRect(x, y + 8, w, h - 16);
      g.setColor(lineCol);
      g.fillRect(x + 8, y, w - 16, 1);
      g.fillRect(x + 8, y + h - 1, w - 16, 1);
      g.fillRect(x, y + 8, 1, h - 16);
      g.fillRect(x + w - 1, y + 8, 1, h - 16);
    }
    paintButton(g, x, y, w, h, selected = false) {
      if (selected) {
        g.setColor(16753920);
        g.fillRect(x, y, w, h);
        g.setColor(16777215);
        g.drawRect(x, y, w - 1, h - 1);
      } else {
        g.setColor(15658734);
        g.fillRect(x, y, w, h);
        g.setColor(_UISkinPainter.COLOR_BORDER1);
        g.drawRect(x, y, w - 1, h - 1);
      }
    }
    paintSoftkeys(g, left, center, right, screenW = 240, screenH = 320) {
      const barH = 22;
      const barY = screenH - barH;
      g.setColor(2236962);
      g.fillRect(0, barY, screenW, barH);
      g.setColor(4473924);
      g.drawLine(0, barY, screenW, barY);
      if (this.font) {
        if (left) {
          this.font.drawString(g, left.caption, 6, barY + 4, 0);
        }
        if (center) {
          this.font.drawString(g, center.caption, Math.floor(screenW / 2), barY + 4, 2);
        }
        if (right) {
          this.font.drawString(g, right.caption, screenW - 6, barY + 4, 1);
        }
      }
    }
  };

  // packages/game-client/src/gameplay/LoginScreen.ts
  var LoginScreen = class extends GameScreen {
    selectedIndex = 0;
    // Highlight first option by default
    options = ["Ch\u01A1i m\u1EDBi", "\u0110\u1ED5i t\xE0i kho\u1EA3n"];
    isQuickSelectMode = true;
    // es.v == true
    bgImages = [];
    bannerLogo;
    skinPainter;
    font;
    // Exact window coordinates from es.java & gw.java
    // es2.l = 176, es2.m = 130, winX = 120 - 88 = 32, winY = 160 - 65 + 5 = 100
    winX = 32;
    winY = 100;
    winW = 176;
    winH = 130;
    itemH = 36;
    offsetY = 10;
    constructor(skinPainter, font) {
      super();
      this.skinPainter = skinPainter;
      this.font = font;
      this.leftCmd = { caption: "Menu", actionId: 0 };
      this.centerCmd = { caption: "Ch\u1ECDn", actionId: 1 };
      this.rightCmd = { caption: "\u0110\xF3ng", actionId: 2 };
    }
    update() {
    }
    onResize(width, height) {
      this.winX = Math.floor((width - this.winW) / 2);
      this.winY = Math.floor((height - this.winH) / 2);
    }
    keyPressed(keyCode) {
      if (keyCode === 50 || keyCode === -1) {
        this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
      } else if (keyCode === 56 || keyCode === -2) {
        this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
      } else if (keyCode === 53 || keyCode === -5 || keyCode === 13 || keyCode === -6) {
        this.onSelectOption(this.selectedIndex >= 0 ? this.selectedIndex : 0);
      } else if (keyCode === -7) {
        this.selectedIndex = -1;
      }
    }
    pointerMoved(x, y) {
      if (x >= this.winX && x <= this.winX + this.winW && y >= this.winY + this.offsetY) {
        const idx = Math.floor((y - (this.winY + this.offsetY)) / this.itemH);
        if (idx >= 0 && idx < this.options.length) {
          this.selectedIndex = idx;
        }
      }
    }
    pointerPressed(x, y) {
      const screenH = typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 320;
      if (y >= screenH - 25) {
        if (x <= 80) {
          this.selectedIndex = 0;
          this.onSelectOption(0);
        } else if (x > 80 && x < 160) {
          this.onSelectOption(this.selectedIndex >= 0 ? this.selectedIndex : 0);
        } else {
          this.selectedIndex = -1;
        }
        return;
      }
      if (x >= this.winX && x <= this.winX + this.winW && y >= this.winY + this.offsetY) {
        const idx = Math.floor((y - (this.winY + this.offsetY)) / this.itemH);
        if (idx >= 0 && idx < this.options.length) {
          this.selectedIndex = idx;
          this.onSelectOption(idx);
        }
      }
    }
    onSelectOption(index) {
      if (index === 0) {
        const btn = document.getElementById("loginBtn");
        if (btn) btn.click();
      } else if (index === 1) {
        const uInput = document.getElementById("usernameInput");
        if (uInput) {
          uInput.focus();
          uInput.select();
        }
      }
    }
    paint(g) {
      const screenW = typeof window !== "undefined" && window.gameMidlet?.canvas?.width || 240;
      const screenH = typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 320;
      this.winX = Math.floor((screenW - this.winW) / 2);
      this.winY = Math.floor((screenH - this.winH) / 2);
      g.setColor(6143735);
      g.fillRect(0, 0, screenW, screenH);
      g.setColor(3902512);
      g.fillRect(0, Math.floor(screenH * 0.6), screenW, Math.floor(screenH * 0.4));
      for (const bgImg of this.bgImages) {
        if (bgImg) {
          const bgW = bgImg.getWidth();
          for (let bx = 0; bx < screenW; bx += bgW) {
            g.drawImage(bgImg, bx, Math.floor(screenH * 0.5), 0);
          }
        }
      }
      if (this.bannerLogo) {
        g.drawImage(this.bannerLogo, Math.floor(screenW / 2), Math.max(25, this.winY - 45), import_j2me_compat3.Graphics.HCENTER | import_j2me_compat3.Graphics.VCENTER);
      } else if (this.font) {
        this.font.drawString(g, "AVATAR 258", Math.floor(screenW / 2), Math.max(25, this.winY - 45), 2);
      }
      this.skinPainter.paintWindow(g, this.winX, this.winY, this.winW, this.winH);
      if (this.isQuickSelectMode) {
        if (this.selectedIndex !== -1) {
          g.setColor(UISkinPainter.COLOR_SELECTED);
          g.fillRect(this.winX + 5, this.winY + this.offsetY + this.selectedIndex * this.itemH, this.winW - 10, this.itemH);
        }
        if (this.font) {
          for (let i = 0; i < this.options.length; i++) {
            const textY = this.winY + this.offsetY + i * this.itemH + Math.floor(this.itemH / 2) - Math.floor(this.font.getHeight() / 2);
            this.font.drawString(
              g,
              this.options[i],
              Math.floor(screenW / 2),
              textY,
              2
              // Center align
            );
          }
        }
      } else {
        if (this.font) {
          this.font.drawString(g, "T\xE0i kho\u1EA3n:", this.winX + 15, this.winY + 15, 0);
          g.setColor(16777215);
          g.fillRect(this.winX + 15, this.winY + 30, this.winW - 30, 22);
          g.setColor(3355443);
          g.drawRect(this.winX + 15, this.winY + 30, this.winW - 30, 22);
          this.font.drawString(g, "M\u1EADt kh\u1EA9u:", this.winX + 15, this.winY + 58, 0);
          g.setColor(16777215);
          g.fillRect(this.winX + 15, this.winY + 73, this.winW - 30, 22);
          g.setColor(3355443);
          g.drawRect(this.winX + 15, this.winY + 73, this.winW - 30, 22);
        }
      }
      this.skinPainter.paintSoftkeys(g, this.leftCmd, this.centerCmd, this.rightCmd, screenW, screenH);
    }
  };

  // packages/game-client/src/gameplay/WorldMapScreen.ts
  var import_j2me_compat4 = __toESM(require_dist());
  var WORLD_REGIONS = [
    {
      id: 0,
      index: 0,
      key: "residential",
      name: "Khu nh\xE0 \u1EDF",
      col: 8,
      row: 5,
      partId: 819,
      mapId: 21,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 1,
      index: 1,
      key: "ecological",
      name: "Khu sinh th\xE1i",
      col: 25,
      row: 6,
      partId: 820,
      mapId: 13,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 2,
      index: 2,
      key: "airport",
      name: "S\xE2n bay",
      col: 30,
      row: 8,
      partId: 821,
      mapId: 20,
      spawnX: 120,
      spawnY: 144,
      animTick: 0
    },
    {
      id: 3,
      index: 3,
      key: "entertainment",
      name: "Khu gi\u1EA3i tr\xED",
      col: 14,
      row: 12,
      partId: 822,
      mapId: 9,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 4,
      index: 4,
      key: "shopping",
      name: "Khu mua s\u1EAFm",
      col: 23,
      row: 12,
      partId: 823,
      mapId: 23,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 5,
      index: 5,
      key: "park",
      name: "C\xF4ng vi\xEAn",
      col: 7,
      row: 15,
      partId: 824,
      mapId: 11,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 6,
      index: 6,
      key: "suburbs",
      name: "Khu ngo\u1EA1i \xF4",
      col: 17,
      row: 21,
      partId: 825,
      mapId: 17,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    },
    {
      id: 7,
      index: 7,
      key: "farm",
      name: "N\xF4ng tr\u1EA1i",
      col: 26,
      row: 21,
      partId: 826,
      mapId: 25,
      spawnX: 120,
      spawnY: 72,
      animTick: 0
    }
  ];
  var WorldMapScreen = class extends GameScreen {
    // Original Assets
    ctImage;
    // main/ct.png (tileset: 16 x 1121, 70 tiles)
    kImage;
    // effect/k.png (40x320: 8 frames of 40x40)
    bpImage;
    // effect/b_p.png (48x56: selection balloon pointer)
    sicImage;
    // effect/sIc.png (15x18: small unselected flag)
    cl0Image;
    // effect/cl0.png (34x17 cloud)
    cl1Image;
    // effect/cl1.png (54x24 cloud)
    skinPainter;
    font;
    // Tilemap (citiMap: 34 cols x 26 rows = 884 bytes)
    mapCols = 34;
    // s in ea.java
    mapRows = 26;
    // t in ea.java
    tileSize = 16;
    // u in ea.java
    tilemapData = new Uint8Array(884);
    // Screen & Viewport
    screenW = 240;
    screenH = 320;
    c = 0;
    // offset X when screen > map
    d = 0;
    // offset Y when screen > map
    maxCamX = 0;
    // A in ea.java
    maxCamY = 0;
    // E in ea.java
    // Camera & Smooth interpolation
    camX = 0;
    // f in ea.java
    camY = 0;
    // g in ea.java
    targetCamX = 0;
    // x in ea.java
    targetCamY = 0;
    // B in ea.java
    camXVel = 0;
    // y in ea.java
    camYVel = 0;
    // C in ea.java
    // Drag & Swipe physics
    isPointerDown = false;
    pointerStartX = 0;
    pointerStartY = 0;
    camStartX = 0;
    camStartY = 0;
    dragVelocityX = 0;
    dragVelocityY = 0;
    lastDragX = 0;
    lastDragY = 0;
    hasDragged = false;
    // Selected Region & Animations
    regions = [];
    selectedIdx = 3;
    // ea.b().e = 3 (Khu giải trí) in ae.java line 1519
    clouds = [];
    animTick = 0;
    // Transition & Action
    isTraveling = false;
    travelTicks = 0;
    selectedRegion = null;
    // Callbacks
    onSelectRegion;
    onBackToHome;
    constructor(skinPainter, font) {
      super();
      this.skinPainter = skinPainter;
      this.font = font;
      this.regions = WORLD_REGIONS.map((r) => ({ ...r }));
      this.initClouds();
      this.loadAssets();
    }
    initClouds() {
      this.clouds = [];
      const totalW = this.mapCols * this.tileSize;
      const totalH = this.mapRows * this.tileSize;
      for (let i = 0; i < 7; i++) {
        this.clouds.push({
          x: Math.round(i * (totalW / 10) + 50),
          y: Math.round(Math.floor(Math.random() * 10) * (totalH / 10) + 20),
          type: Math.floor(Math.random() * 2)
        });
      }
    }
    async loadAssets() {
      try {
        const [citiMapRes, ctRes, kRes, bpRes, sicRes, cl0Res, cl1Res] = await Promise.all([
          fetch("/assets/normal/citiMap"),
          fetch("/assets/main/ct.png"),
          fetch("/assets/effect/k.png"),
          fetch("/assets/effect/b_p.png"),
          fetch("/assets/effect/sIc.png"),
          fetch("/assets/effect/cl0.png"),
          fetch("/assets/effect/cl1.png")
        ]);
        if (citiMapRes.ok) {
          const buf = await citiMapRes.arrayBuffer();
          this.tilemapData = new Uint8Array(buf);
        }
        const [ctBuf, kBuf, bpBuf, sicBuf, cl0Buf, cl1Buf] = await Promise.all([
          ctRes.arrayBuffer(),
          kRes.arrayBuffer(),
          bpRes.arrayBuffer(),
          sicRes.arrayBuffer(),
          cl0Res.arrayBuffer(),
          cl1Res.arrayBuffer()
        ]);
        this.ctImage = await import_j2me_compat4.Image.createImage(new Uint8Array(ctBuf));
        this.kImage = await import_j2me_compat4.Image.createImage(new Uint8Array(kBuf));
        this.bpImage = await import_j2me_compat4.Image.createImage(new Uint8Array(bpBuf));
        this.sicImage = await import_j2me_compat4.Image.createImage(new Uint8Array(sicBuf));
        this.cl0Image = await import_j2me_compat4.Image.createImage(new Uint8Array(cl0Buf));
        this.cl1Image = await import_j2me_compat4.Image.createImage(new Uint8Array(cl1Buf));
        console.log("[WorldMapScreen] Loaded original Java ME CityMap assets successfully!");
        this.centerOnSelected(true);
      } catch (e) {
        console.warn("[WorldMapScreen] Asset loading warning:", e);
      }
    }
    onResize(width, height) {
      this.screenW = width;
      this.screenH = height;
      const totalW = this.mapCols * this.tileSize;
      const totalH = this.mapRows * this.tileSize;
      this.c = Math.max(0, Math.floor((width - totalW) / 2));
      this.d = Math.max(0, Math.floor((height - 24 - totalH) / 2));
      this.maxCamX = Math.max(0, totalW - width);
      this.maxCamY = Math.max(0, totalH - height + 24);
      this.clampTargetCamera();
    }
    centerOnSelected(immediate = false) {
      const r = this.regions[this.selectedIdx];
      if (!r) return;
      this.targetCamX = Math.round(r.col * this.tileSize + 8 - this.screenW / 2);
      this.targetCamY = Math.round(r.row * this.tileSize - this.screenH / 2);
      this.clampTargetCamera();
      if (immediate) {
        this.camX = this.targetCamX;
        this.camY = this.targetCamY;
        this.camXVel = 0;
        this.camYVel = 0;
      }
    }
    clampTargetCamera() {
      if (this.targetCamX < 0) this.targetCamX = 0;
      if (this.targetCamX > this.maxCamX) this.targetCamX = this.maxCamX;
      if (this.targetCamY < 0) this.targetCamY = 0;
      if (this.targetCamY > this.maxCamY) this.targetCamY = this.maxCamY;
    }
    update() {
      this.animTick++;
      if (this.isTraveling) {
        this.travelTicks++;
        if (this.travelTicks > 24 && this.selectedRegion && this.onSelectRegion) {
          const reg = this.selectedRegion;
          this.selectedRegion = null;
          this.isTraveling = false;
          this.travelTicks = 0;
          this.onSelectRegion(reg);
        }
        return;
      }
      for (let i = 0; i < this.regions.length; i++) {
        if (i !== this.selectedIdx) {
          this.regions[i].animTick = (this.regions[i].animTick + 1) % 9;
        }
      }
      if (!this.isPointerDown) {
        if (Math.abs(this.dragVelocityX) > 0.5) {
          this.targetCamX += this.dragVelocityX;
          this.dragVelocityX *= 0.85;
        } else {
          this.dragVelocityX = 0;
        }
        if (Math.abs(this.dragVelocityY) > 0.5) {
          this.targetCamY += this.dragVelocityY;
          this.dragVelocityY *= 0.85;
        } else {
          this.dragVelocityY = 0;
        }
        this.clampTargetCamera();
      }
      if (this.camY !== this.targetCamY) {
        const diffY = this.targetCamY - this.camY << 2;
        this.camYVel += diffY;
        this.camY += this.camYVel >> 4;
        this.camYVel &= 15;
      }
      if (this.camX !== this.targetCamX) {
        const diffX = this.targetCamX - this.camX << 2;
        this.camXVel += diffX;
        this.camX += this.camXVel >> 4;
        this.camXVel &= 15;
      }
      if (this.camX < 0) {
        this.camX = 0;
        this.targetCamX = 0;
      }
      if (this.camX > this.maxCamX) {
        this.camX = this.maxCamX;
        this.targetCamX = this.maxCamX;
      }
      if (this.camY < 0) {
        this.camY = 0;
        this.targetCamY = 0;
      }
      if (this.camY > this.maxCamY) {
        this.camY = this.maxCamY;
        this.targetCamY = this.maxCamY;
      }
      const totalW = this.mapCols * this.tileSize;
      const totalH = this.mapRows * this.tileSize;
      for (const cloud of this.clouds) {
        cloud.x -= cloud.type + (this.animTick % 5 === 1 ? 1 : 0);
        if (cloud.x < -this.c - 50) {
          cloud.x = this.c + Math.floor(Math.random() * 4) * 50 + totalW;
          cloud.y = Math.floor(Math.random() * 10) * Math.floor(totalH / 10) + 10;
          cloud.type = Math.floor(Math.random() * 2);
        }
      }
    }
    /**
     * Directional arrow key navigation (o.java lines 12-73)
     */
    handleKeyNav(direction) {
      if (this.isTraveling) return;
      let n2 = this.selectedIdx;
      if (direction === "down") {
        if (n2 === 0) n2 = 5;
        else if (n2 === 1) n2 = 4;
        else if (n2 === 3) n2 = 6;
        else if (n2 === 2) n2 = 7;
        else if (n2 === 4) n2 = 7;
      } else if (direction === "up") {
        if (n2 === 4) n2 = 1;
        else if (n2 === 5) n2 = 0;
        else if (n2 === 6) n2 = 3;
        else if (n2 === 7) n2 = 4;
        else if (n2 === 3) n2 = 0;
      } else if (direction === "right") {
        if (n2 === 0) n2 = 3;
        else if (n2 === 1) n2 = 2;
        else if (n2 === 3) n2 = 4;
        else if (n2 === 4) n2 = 2;
        else if (n2 === 6) n2 = 7;
        else if (n2 === 5) n2 = 3;
      } else if (direction === "left") {
        if (n2 === 1) n2 = 3;
        else if (n2 === 2) n2 = 1;
        else if (n2 === 3) n2 = 0;
        else if (n2 === 6) n2 = 5;
        else if (n2 === 7) n2 = 6;
        else if (n2 === 4) n2 = 3;
      }
      if (n2 !== this.selectedIdx) {
        this.selectedIdx = n2;
        this.centerOnSelected();
      }
    }
    confirmSelection() {
      if (this.isTraveling) return;
      const r = this.regions[this.selectedIdx];
      if (r) {
        this.selectedRegion = r;
        this.isTraveling = true;
        this.travelTicks = 0;
      }
    }
    keyPressed(keyCode) {
      if (this.isTraveling) return;
      switch (keyCode) {
        case 50:
        // Key 2 / UP
        case -1:
        case 38:
          this.handleKeyNav("up");
          break;
        case 56:
        // Key 8 / DOWN
        case -2:
        case 40:
          this.handleKeyNav("down");
          break;
        case 52:
        // Key 4 / LEFT
        case -3:
        case 37:
          this.handleKeyNav("left");
          break;
        case 54:
        // Key 6 / RIGHT
        case -4:
        case 39:
          this.handleKeyNav("right");
          break;
        case 13:
        // ENTER / FIRE / KEY 5
        case 53:
        case -7:
          this.confirmSelection();
          break;
        case -6:
          if (this.onBackToHome) {
            this.onBackToHome();
          }
          break;
      }
    }
    pointerPressed(x, y) {
      if (this.isTraveling) return;
      const softkeyY = this.screenH - 24;
      if (y >= softkeyY) {
        if (x < 70) {
          if (this.onBackToHome) {
            this.onBackToHome();
          }
          return;
        }
        if (x >= Math.floor(this.screenW / 2) - 40 && x <= Math.floor(this.screenW / 2) + 40) {
          this.confirmSelection();
          return;
        }
      }
      for (let i = 0; i < this.regions.length; i++) {
        const r = this.regions[i];
        const boxX = this.c + r.col * this.tileSize + Math.floor(this.tileSize / 2) - 24 - this.camX;
        const boxY = this.d + r.row * this.tileSize - 56 - this.camY;
        const boxW = 48;
        const boxH = 56;
        if (x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH) {
          if (this.selectedIdx === i) {
            this.confirmSelection();
          } else {
            this.selectedIdx = i;
            this.centerOnSelected();
          }
          return;
        }
      }
      this.isPointerDown = true;
      this.pointerStartX = x;
      this.pointerStartY = y;
      this.camStartX = this.camX;
      this.camStartY = this.camY;
      this.lastDragX = x;
      this.lastDragY = y;
      this.dragVelocityX = 0;
      this.dragVelocityY = 0;
      this.hasDragged = false;
    }
    pointerDragged(x, y) {
      if (!this.isPointerDown || this.isTraveling) return;
      const dx = x - this.pointerStartX;
      const dy = y - this.pointerStartY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        this.hasDragged = true;
      }
      this.dragVelocityX = this.lastDragX - x;
      this.dragVelocityY = this.lastDragY - y;
      this.lastDragX = x;
      this.lastDragY = y;
      this.targetCamX = this.camStartX - dx;
      this.targetCamY = this.camStartY - dy;
      this.clampTargetCamera();
    }
    pointerReleased(x, y) {
      this.isPointerDown = false;
    }
    pointerMoved(x, y) {
    }
    paint(g) {
      const ctx = g.ctx;
      g.setColor(0);
      g.fillRect(0, 0, this.screenW, this.screenH);
      const transX = this.c - this.camX;
      const transY = this.d - this.camY;
      g.translate(transX, transY);
      if (this.ctImage && this.tilemapData.length >= 884) {
        const minCol = Math.max(0, Math.floor((this.camX - this.c) / this.tileSize));
        const maxCol = Math.min(this.mapCols - 1, Math.ceil((this.camX - this.c + this.screenW) / this.tileSize));
        const minRow = Math.max(0, Math.floor((this.camY - this.d) / this.tileSize));
        const maxRow = Math.min(this.mapRows - 1, Math.ceil((this.camY - this.d + this.screenH) / this.tileSize));
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            const tileVal = this.tilemapData[row * this.mapCols + col];
            const sy = tileVal % 70 * this.tileSize;
            g.drawRegion(
              this.ctImage,
              0,
              sy,
              this.tileSize,
              this.tileSize,
              0,
              col * this.tileSize,
              row * this.tileSize,
              0
            );
          }
        }
      }
      for (let i = 0; i < this.regions.length; i++) {
        const r = this.regions[i];
        const pinCenterX = r.col * this.tileSize + Math.floor(this.tileSize / 2);
        const pinBottomY = r.row * this.tileSize;
        if (i === this.selectedIdx) {
          if (this.bpImage) {
            g.drawImage(this.bpImage, pinCenterX - 24, pinBottomY - 56, 0);
          }
          if (this.kImage) {
            g.drawRegion(
              this.kImage,
              0,
              i * 40,
              40,
              40,
              0,
              pinCenterX - 20,
              pinBottomY - 12 - 40,
              0
            );
          }
        } else {
          const bob = Math.floor(r.animTick / 3);
          if (this.sicImage) {
            g.drawImage(this.sicImage, pinCenterX - 7, pinBottomY - bob - 18, 0);
          }
        }
      }
      for (let i = 0; i < this.regions.length; i++) {
        const r = this.regions[i];
        let n4 = r.col * this.tileSize;
        let n5 = r.row * this.tileSize;
        if (n5 < this.camY + 50) n5 = this.camY + 50;
        if (n5 > this.camY + this.screenH - 20) n5 = this.camY + this.screenH - 20;
        if (n4 < this.camX + 20) n4 = this.camX + 20;
        if (n4 > this.camX + this.screenW - 47) n4 = this.camX + this.screenW - 47;
        const isSelected = i === this.selectedIdx;
        const bob = Math.floor(r.animTick / 3);
        const labelY = n5 - (isSelected ? 70 : 35) - (isSelected ? 0 : bob);
        const labelX = n4 + 10;
        this.renderTextWithOutline(g, r.name, labelX, labelY, isSelected);
      }
      for (const cloud of this.clouds) {
        if (cloud.x > this.camX - 30 && cloud.x < this.camX + 30 + this.screenW && cloud.y > this.camY - 20 && cloud.y < this.camY + 20 + this.screenH) {
          const cloudImg = cloud.type === 0 ? this.cl0Image : this.cl1Image;
          if (cloudImg) {
            g.drawImage(cloudImg, cloud.x, cloud.y, 0);
          }
        }
      }
      g.translate(-transX, -transY);
      this.renderHud(g);
      if (this.isTraveling && this.selectedRegion) {
        this.renderTravelingPopup(g);
      }
    }
    renderTextWithOutline(g, text, x, y, isSelected) {
      const ctx = g.ctx;
      if (ctx) {
        ctx.save();
        ctx.font = "bold 11px Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
        ctx.fillStyle = isSelected ? "#ffffff" : "#f8fafc";
        ctx.fillText(text, x, y);
        ctx.restore();
      } else if (this.font) {
        this.font.drawString(g, text, x, y, 2);
      }
    }
    renderHud(g) {
      const ctx = g.ctx;
      if (ctx) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(4, 4, 26, 14);
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 1;
        ctx.strokeRect(4, 4, 26, 14);
        ctx.font = "bold 10px Arial, sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("12+", 17, 11);
        ctx.restore();
      }
      if (ctx) {
        ctx.save();
        ctx.font = "bold 11px monospace, sans-serif";
        ctx.fillStyle = "#22c55e";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("2.5.8", this.screenW - 6, 6);
        ctx.restore();
      }
      const barH = 22;
      const barY = this.screenH - barH;
      if (ctx) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, barY, this.screenW, barH);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, barY, this.screenW, barH);
        ctx.font = "bold 12px Arial, sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "left";
        ctx.fillText("Menu", 8, barY + barH / 2);
        ctx.fillStyle = "#fde047";
        ctx.textAlign = "center";
        ctx.fillText("Ch\u1ECDn", Math.floor(this.screenW / 2), barY + barH / 2);
        ctx.restore();
      }
    }
    renderTravelingPopup(g) {
      const ctx = g.ctx;
      if (!ctx || !this.selectedRegion) return;
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, this.screenW, this.screenH);
      const popW = Math.min(220, this.screenW - 30);
      const popH = 64;
      const popX = Math.floor((this.screenW - popW) / 2);
      const popY = Math.floor((this.screenH - popH) / 2);
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(popX, popY, popW, popH);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.strokeRect(popX, popY, popW, popH);
      const dots = ".".repeat(Math.floor(this.travelTicks / 5) % 4);
      ctx.font = "bold 12px Arial, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`\u0110ang v\xE0o ${this.selectedRegion.name}${dots}`, popX + popW / 2, popY + 24);
      const barW = popW - 40;
      const barH = 6;
      const barX = popX + 20;
      const barY = popY + 44;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(barX, barY, barW, barH);
      const progress = Math.min(1, this.travelTicks / 24);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(barX, barY, Math.round(barW * progress), barH);
      ctx.restore();
    }
  };

  // packages/game-client/src/renderer/BitmapFont.ts
  var BitmapFont = class {
    glyphChars = "";
    glyphWidths = [];
    fontHeight = 12;
    fontImage;
    constructor(metadataBytes, fontImage) {
      if (metadataBytes) {
        this.loadMetadata(metadataBytes);
      }
      if (fontImage) {
        this.fontImage = fontImage;
      }
    }
    loadMetadata(bytes) {
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      let pos = 0;
      const utfLen = view.getUint16(pos, false);
      pos += 2;
      this.glyphChars = new TextDecoder("utf-8").decode(bytes.subarray(pos, pos + utfLen));
      pos += utfLen;
      this.glyphWidths = [];
      for (let i = 0; i < this.glyphChars.length; i++) {
        this.glyphWidths.push(bytes[pos++]);
      }
      this.fontHeight = bytes[pos++];
    }
    stringWidth(text) {
      let width = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        if (ch === " ") {
          width += (this.glyphWidths[0] || 6) >> 1;
        } else {
          const idx = this.glyphChars.indexOf(ch);
          if (idx >= 0 && idx < this.glyphWidths.length) {
            width += this.glyphWidths[idx];
          } else {
            width += this.glyphWidths[0] || 6;
          }
        }
      }
      return width;
    }
    getHeight() {
      return this.fontHeight;
    }
    drawString(g, text, x, y, anchor = 0) {
      if (!text || text.length === 0) return;
      const totalWidth = this.stringWidth(text);
      let drawX = x;
      if (anchor === 1) {
        drawX = x - totalWidth;
      } else if (anchor === 2) {
        drawX = x - (totalWidth >> 1);
      }
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        if (ch === " ") {
          drawX += (this.glyphWidths[0] || 6) >> 1;
        } else {
          let idx = this.glyphChars.indexOf(ch);
          if (idx === -1) idx = 0;
          const charW = this.glyphWidths[idx] || 6;
          if (this.fontImage) {
            g.drawRegion(
              this.fontImage,
              0,
              idx * this.fontHeight,
              this.fontImage.width,
              this.fontHeight,
              0,
              drawX,
              y,
              20
              // J2ME: LEFT (4) | TOP (16) = 20
            );
          }
          drawX += charW;
        }
      }
    }
    splitText(text, maxWidth) {
      const words = text.split(" ");
      const lines = [];
      let currentLine = "";
      for (const w of words) {
        const testLine = currentLine.length === 0 ? w : `${currentLine} ${w}`;
        if (this.stringWidth(testLine) <= maxWidth) {
          currentLine = testLine;
        } else {
          if (currentLine.length > 0) {
            lines.push(currentLine);
          }
          currentLine = w;
        }
      }
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
      return lines;
    }
  };

  // packages/game-client/src/assets/AvArchiveLoader.ts
  var import_j2me_compat5 = __toESM(require_dist());
  var AvArchiveLoader = class _AvArchiveLoader {
    static KEY = new TextEncoder().encode("NguyenVanMinh");
    entries = /* @__PURE__ */ new Map();
    payload = new Uint8Array(0);
    loadFromBytes(avBytes) {
      const key = _AvArchiveLoader.KEY;
      const keyLen = key.length;
      const count = avBytes[0];
      let idx = 1;
      let totalLen = 0;
      for (let i = 0; i < count; i++) {
        const nameLen = avBytes[idx++];
        const nameRaw = new Uint8Array(nameLen);
        for (let k = 0; k < nameLen; k++) {
          nameRaw[k] = (avBytes[idx++] ^ key[k % keyLen]) & 255;
        }
        const name = new TextDecoder("utf-8").decode(nameRaw);
        const length = avBytes[idx] << 8 | avBytes[idx + 1];
        idx += 2;
        this.entries.set(name, {
          name,
          offset: totalLen,
          length
        });
        totalLen += length;
      }
      const rawPayload = avBytes.subarray(idx, idx + totalLen);
      this.payload = new Uint8Array(rawPayload.length);
      for (let k = 0; k < rawPayload.length; k++) {
        this.payload[k] = (rawPayload[k] ^ key[k % keyLen]) & 255;
      }
    }
    getFileBytes(name) {
      const entry = this.entries.get(name);
      if (!entry) return null;
      return this.payload.subarray(entry.offset, entry.offset + entry.length);
    }
    getImage(name) {
      const fileName = name.endsWith(".png") ? name : `${name}.png`;
      const bytes = this.getFileBytes(fileName);
      if (!bytes) return null;
      return import_j2me_compat5.Image.createImage(bytes);
    }
    getEntryNames() {
      return Array.from(this.entries.keys());
    }
  };

  // packages/game-client/src/core/GameMidlet.ts
  var GameMidlet = class {
    canvas;
    splashScreen;
    loginScreen;
    worldMapScreen;
    skinPainter;
    font;
    constructor(ctx) {
      this.canvas = new GameCanvas(ctx);
      this.font = new BitmapFont();
      this.skinPainter = new UISkinPainter(this.font);
      this.loginScreen = new LoginScreen(this.skinPainter, this.font);
      this.worldMapScreen = new WorldMapScreen(this.skinPainter, this.font);
      this.splashScreen = new SplashScreen(void 0, () => {
        this.canvas.setCurrentScreen(this.loginScreen);
      });
      this.canvas.setCurrentScreen(this.splashScreen);
    }
    async initAssets(logoPngBytes, fontMetadataBytes, fontPngBytes, bgAvBytes) {
      if (logoPngBytes) {
        this.splashScreen.logoImage = await import_j2me_compat6.Image.createImage(logoPngBytes);
      }
      if (fontMetadataBytes && fontPngBytes) {
        this.font.loadMetadata(fontMetadataBytes);
        this.font.fontImage = await import_j2me_compat6.Image.createImage(fontPngBytes);
      }
      if (bgAvBytes) {
        const bgLoader = new AvArchiveLoader();
        bgLoader.loadFromBytes(bgAvBytes);
        const bg0 = bgLoader.getImage("0.png");
        if (bg0 instanceof Promise) {
          this.loginScreen.bgImages.push(await bg0);
        } else if (bg0) {
          this.loginScreen.bgImages.push(bg0);
        }
      }
    }
    start() {
      this.canvas.startLoop();
    }
    stop() {
      this.canvas.stopLoop();
    }
  };

  // packages/game-client/src/network/NetworkSession.ts
  var import_protocol = __toESM(require_dist2());
  var NetworkSession = class {
    constructor(gatewayUrl = "ws://localhost:19129") {
      this.gatewayUrl = gatewayUrl;
      this.cipher = new import_protocol.SessionCipher();
      this.decoder = new import_protocol.PacketStreamDecoder(this.cipher);
    }
    gatewayUrl;
    ws = null;
    cipher;
    isConnected = false;
    isHandshakeDone = false;
    myUserId = 0;
    decoder;
    listeners = {};
    lastLoginCredentials = null;
    on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
      return this;
    }
    off(event, listener) {
      if (!this.listeners[event]) return this;
      this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
      return this;
    }
    emit(event, ...args) {
      if (!this.listeners[event]) return false;
      for (const listener of this.listeners[event]) {
        try {
          listener(...args);
        } catch (err) {
          console.error(`[Network] Error in listener for "${event}":`, err);
        }
      }
      return true;
    }
    async connect() {
      if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
        return;
      }
      return new Promise((resolve, reject) => {
        console.log(`[Network] Connecting to WebSocket Gateway at ${this.gatewayUrl}...`);
        this.ws = new WebSocket(this.gatewayUrl);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = () => {
          this.isConnected = true;
          console.log("[Network] WebSocket connected to Gateway. Sending handshake request (-27)...");
          const handshakeReq = new import_protocol.Message(import_protocol.Cmd.HANDSHAKE);
          const wire = this.cipher.encodePacket(handshakeReq);
          this.ws.send(wire);
          resolve();
        };
        this.ws.onmessage = (event) => {
          const rawData = new Uint8Array(event.data);
          this.onRawDataReceived(rawData);
        };
        this.ws.onclose = () => {
          this.isConnected = false;
          this.isHandshakeDone = false;
          console.warn("[Network] WebSocket connection closed.");
          this.emit("disconnect");
        };
        this.ws.onerror = (err) => {
          console.error("[Network] WebSocket error:", err);
          reject(err);
        };
      });
    }
    disconnect() {
      if (this.ws) {
        try {
          this.ws.close();
        } catch (e) {
        }
        this.ws = null;
      }
      this.isConnected = false;
      this.isHandshakeDone = false;
    }
    onRawDataReceived(data) {
      const messages = this.decoder.push(data);
      for (const msg of messages) {
        this.processIncomingMessage(msg);
      }
    }
    processIncomingMessage(msg) {
      const cmd = msg.command;
      if (cmd === import_protocol.Cmd.HANDSHAKE) {
        const reader = msg.reader();
        const keyLength = reader.readByte();
        const rawKeys = [keyLength];
        for (let i = 0; i < keyLength; i++) {
          rawKeys.push(reader.readByte());
        }
        this.cipher.initHandshake(new Uint8Array(rawKeys));
        this.isHandshakeDone = true;
        console.log(`[Network] Key exchange handshake (-27) success! Key len: ${keyLength}`);
        this.emit("handshake_done");
        return;
      }
      if (cmd === import_protocol.Cmd.LOGIN_SUCESS) {
        const r = msg.reader();
        const userId = r.readInt();
        const wearCount = r.readByte();
        const wearing = [];
        for (let i = 0; i < wearCount; i++) {
          wearing.push(r.readShort());
        }
        const gender = r.readByte();
        const levelMain = r.readByte();
        const levelMainPercen = r.readByte();
        const xu = r.readInt();
        const friendly = r.readByte();
        const crazy = r.readByte();
        const stylish = r.readByte();
        const happy = r.readByte();
        const hunger = r.readByte();
        const luong = r.readInt();
        const star = r.readByte();
        console.log(`[Network] Login Success! UserID=${userId}, Xu=${xu}, Luong=${luong}`);
        this.myUserId = userId;
        this.lastLoginCredentials = null;
        this.emit("login_success", {
          id: userId,
          wearing,
          gender,
          levelMain,
          xu,
          luong,
          star
        });
        return;
      }
      if (cmd === import_protocol.Cmd.LOGIN_FAIL) {
        const r = msg.reader();
        const reason = r.available() > 0 ? r.readUTF() : "\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i!";
        console.warn(`[Network] Login failed: ${reason}`);
        this.emit("login_fail", reason);
        return;
      }
      if (cmd === import_protocol.Cmd.SERVER_MESSAGE) {
        const r = msg.reader();
        const message = r.readUTF();
        console.log(`[Network] Server Message: "${message}"`);
        this.emit("server_message", message);
        if (message.includes("\u0111\u0103ng nh\u1EADp") && this.lastLoginCredentials) {
          console.log("[Network] Account unlocked by server. Auto-retrying login in 600ms...");
          setTimeout(() => {
            if (this.lastLoginCredentials) {
              this.sendLogin(this.lastLoginCredentials.u, this.lastLoginCredentials.p, this.lastLoginCredentials.v);
            }
          }, 600);
        }
        return;
      }
      if (cmd === import_protocol.Cmd.SERVER_INFO) {
        const r = msg.reader();
        const info = r.readUTF();
        console.log(`[Network] Server Info: "${info}"`);
        this.emit("server_info", info);
        return;
      }
      if (cmd === import_protocol.Cmd.GET_HANDLER) {
        const r = msg.reader();
        const handlerId = r.readByte();
        console.log(`[Network] Server Switched Handler to ID: ${handlerId}`);
        this.emit("get_handler", handlerId);
        return;
      }
      if (cmd === import_protocol.Cmd.CRE_CHARACTER) {
        const r = msg.reader();
        const success = r.readBoolean();
        console.log(`[Network] Character Creation Result: ${success}`);
        this.emit("create_character", success);
        return;
      }
      if (cmd === import_protocol.Cmd.UPDATE_MONEY) {
        const r = msg.reader();
        const xeng = r.readInt();
        const type = r.readByte();
        const xu = r.readInt();
        const luong = r.readInt();
        const luongKhoa = r.readInt();
        console.log(`[Network] Update Money: Xu=${xu}, Luong=${luong}, LuongKhoa=${luongKhoa}, Xeng=${xeng}`);
        this.emit("update_money", { xeng, type, xu, luong, luongKhoa });
        return;
      }
      if (cmd === import_protocol.Cmd.CONTAINER) {
        const r = msg.reader();
        const count = r.readShort();
        const items = [];
        for (let i = 0; i < count; i++) {
          const id = r.readShort();
          const reliability = r.readByte();
          const expired = r.readUTF();
          items.push({ id, reliability, expired });
        }
        console.log(`[Network] Chest inventory received: ${items.length} items`);
        this.emit("view_chest", items);
        return;
      }
      if (cmd === import_protocol.Cmd.USING_PART) {
        const r = msg.reader();
        const userId = r.readInt();
        const itemId = r.readShort();
        console.log(`[Network] Player ${userId} equipped item ${itemId}`);
        this.emit("player_using_part", { userId, itemId });
        return;
      }
      if (cmd === import_protocol.Cmd.REMOVE_ITEM) {
        const r = msg.reader();
        const userId = r.readInt();
        const itemId = r.readShort();
        console.log(`[Network] Player ${userId} unequipped item ${itemId}`);
        this.emit("player_remove_item", { userId, itemId });
        return;
      }
      if (cmd === import_protocol.Cmd.OPEN_SHOP) {
        const r = msg.reader();
        const shopId = r.readByte();
        const shopName = r.readUTF();
        const count = r.readShort();
        const itemIds = [];
        for (let i = 0; i < count; i++) {
          itemIds.push(r.readShort());
        }
        console.log(`[Network] Shop Opened: ID=${shopId}, Name="${shopName}", Items=${itemIds.length}`);
        this.emit("open_shop", { id: shopId, name: shopName, itemIds });
        return;
      }
      if (cmd === import_protocol.Cmd.MENU_OPTION) {
        const r = msg.reader();
        const userId = r.readInt();
        const menuId = r.readByte();
        const count = r.readByte();
        const options = [];
        for (let i = 0; i < count; i++) {
          options.push(r.readUTF());
        }
        console.log(`[Network] Menu Option from ${userId} (MenuID=${menuId}): [${options.join(", ")}]`);
        this.emit("menu_option", { userId, menuId, options });
        return;
      }
      if (cmd === import_protocol.Cmd.TEXT_BOX) {
        const r = msg.reader();
        const userId = r.readInt();
        const menuId = r.readByte();
        const title = r.readUTF();
        const type = r.readByte();
        console.log(`[Network] Text Box Prompt: "${title}" (Type=${type})`);
        this.emit("text_box", { userId, menuId, title, type });
        return;
      }
      if (cmd === import_protocol.Cmd.JOIN_HOUSE) {
        const r = msg.reader();
        const houseType = r.readByte();
        const houseUserId = r.readInt();
        const mapLen = r.readShort();
        const mapData = new Uint8Array(mapLen);
        for (let i = 0; i < mapLen; i++) {
          mapData[i] = r.readByte();
        }
        const unk = r.readByte();
        const count = r.readShort();
        const furniture = [];
        for (let i = 0; i < count; i++) {
          const itemId = r.readShort();
          const x = r.readByte();
          const y = r.readByte();
          const rotate = r.readByte();
          furniture.push({ itemId, x, y, rotate });
        }
        console.log(`[Network] Joined House: UserID=${houseUserId}, Furniture=${furniture.length}`);
        this.emit("join_house", { houseType, userId: houseUserId, mapData, furniture });
        return;
      }
      if (cmd === import_protocol.Cmd.AVATAR_JOIN_PARK) {
        const r = msg.reader();
        const mapId = r.readByte();
        const areaId = r.readByte();
        const x = r.readShort();
        const y = r.readShort();
        console.log(`[Network] Joined Park: Map=${mapId}, Area=${areaId}, Pos=(${x}, ${y})`);
        const existingPlayers = [];
        if (r.available() > 0) {
          const numUser = r.readByte();
          for (let i = 0; i < numUser; i++) {
            const plId = r.readInt();
            const plName = r.readUTF();
            const wearCount = r.readByte();
            const plWearing = [];
            for (let w = 0; w < wearCount; w++) {
              plWearing.push(r.readShort());
            }
            const plX = r.readShort();
            const plY = r.readShort();
            const plRole = r.readByte();
            existingPlayers.push({
              id: plId,
              name: plName,
              x: plX,
              y: plY,
              direct: 0,
              wearing: plWearing
            });
          }
          for (let i = 0; i < numUser && r.available() > 0; i++) {
            existingPlayers[i].direct = r.readByte();
          }
        }
        this.emit("join_park", { mapId, areaId, x, y, players: existingPlayers });
        return;
      }
      if (cmd === import_protocol.Cmd.PLAYER_JOIN_PARK) {
        const r = msg.reader();
        const playerId = r.readInt();
        const name = r.readUTF();
        const wearCount = r.readByte();
        const wearing = [];
        for (let i = 0; i < wearCount; i++) {
          wearing.push(r.readShort());
        }
        const x = r.readShort();
        const y = r.readShort();
        const role = r.available() > 0 ? r.readByte() : 0;
        console.log(`[Network] Remote Player Joined: ID=${playerId}, Name=${name}, Pos=(${x}, ${y})`);
        this.emit("player_join_park", { id: playerId, name, x, y, direct: 0, wearing });
        return;
      }
      if (cmd === import_protocol.Cmd.PLAYER_LEAVE_PARK) {
        const r = msg.reader();
        const playerId = r.readInt();
        console.log(`[Network] Remote Player Left: ID=${playerId}`);
        this.emit("player_leave_park", playerId);
        return;
      }
      if (cmd === import_protocol.Cmd.MOVE_PARK) {
        const r = msg.reader();
        const playerId = r.readInt();
        const x = r.readShort();
        const y = r.readShort();
        const direct = r.available() > 0 ? r.readByte() : 0;
        this.emit("player_move", { id: playerId, x, y, direct });
        return;
      }
      if (cmd === import_protocol.Cmd.CHAT_PARK) {
        const r = msg.reader();
        const playerId = r.readInt();
        const message = r.readUTF();
        console.log(`[Network] Chat from Player ${playerId}: ${message}`);
        this.emit("player_chat", { id: playerId, message });
        return;
      }
      if (cmd === import_protocol.Cmd.AVATAR_FEEL) {
        const r = msg.reader();
        const playerId = r.readInt();
        const feelId = r.readByte();
        console.log(`[Network] Player Feel: ID=${playerId}, Feel=${feelId}`);
        this.emit("player_feel", { id: playerId, feelId });
        return;
      }
      if (cmd === import_protocol.Cmd.ACTION) {
        const r = msg.reader();
        const userId = r.readInt();
        const idTo = r.readInt();
        const action = r.readShort();
        let customText = "";
        if (action === -1 && r.available() > 0) {
          customText = r.readUTF();
        }
        console.log(`[Network] Player Action: ${userId} -> ${idTo}, Action=${action}`);
        this.emit("player_action", { userId, idTo, action, customText });
        return;
      }
      if (cmd === import_protocol.Cmd.JOIN) {
        const r = msg.reader();
        const userId = r.readInt();
        const landSize = r.readByte();
        const landItems = [];
        for (let i = 0; i < landSize; i++) {
          const type = r.readByte();
          if (type >= 0) {
            const plantedMinutes = r.readShort();
            const sucKhoe = r.readByte();
            const heo = r.readByte();
            const isWatered = r.readBoolean();
            const isFertilized = r.readBoolean();
            const isHarvestable = r.readBoolean();
            landItems.push({ type, plantedMinutes, sucKhoe, isWatered, isFertilized, isHarvestable });
          } else {
            landItems.push({ type: -1 });
          }
        }
        const animalSize = r.readByte();
        const animals = [];
        for (let i = 0; i < animalSize; i++) {
          const id = r.readByte();
          const health = r.readInt();
          const level = r.readByte();
          const resourceCount = r.readByte();
          const nextProductionTime = r.readByte();
          const isAlive = r.readBoolean();
          const isReadyForBreeding = r.readBoolean();
          const isHarvestable = r.readBoolean();
          animals.push({ id, health, level, resourceCount, nextProductionTime, isAlive, isReadyForBreeding, isHarvestable });
        }
        const barnSize = r.available() > 0 ? r.readByte() : 0;
        const fishPondSize = r.available() > 0 ? r.readByte() : 0;
        let starFruitLevel = 0;
        let starFruitFruit = 0;
        if (r.available() >= 8) {
          starFruitLevel = r.readShort();
          r.readShort();
          r.readShort();
          starFruitFruit = r.readShort();
        }
        console.log(`[Network] Joined Farm: User=${userId}, Lands=${landSize}, Animals=${animalSize}`);
        this.emit("farm_join", {
          userId,
          landItems,
          animals,
          barnSize,
          fishPondSize,
          starFruit: { level: starFruitLevel, fruit: starFruitFruit }
        });
        return;
      }
      if (cmd === import_protocol.Cmd.INVENTORY) {
        const r = msg.reader();
        const numSeeds = r.readByte();
        const seeds = [];
        for (let i = 0; i < numSeeds; i++) {
          seeds.push({ id: r.readByte(), quantity: r.readShort() });
        }
        const numCrops = r.readByte();
        const crops = [];
        for (let i = 0; i < numCrops; i++) {
          crops.push({ id: r.readByte(), quantity: r.readShort() });
        }
        const xu = r.readInt();
        const farmLevel = r.readByte();
        const farmPercent = r.readByte();
        const numFertilizers = r.readByte();
        const fertilizers = [];
        for (let i = 0; i < numFertilizers; i++) {
          fertilizers.push({ id: r.readByte(), quantity: r.readShort() });
        }
        const numSpecial = r.available() > 0 ? r.readByte() : 0;
        const specialCrops = [];
        for (let i = 0; i < numSpecial; i++) {
          specialCrops.push({ id: r.readShort(), quantity: r.readInt() });
        }
        console.log(`[Network] Farm Inventory: Seeds=${seeds.length}, Crops=${crops.length}, Fertilizers=${fertilizers.length}`);
        this.emit("farm_inventory", { seeds, crops, xu, farmLevel, farmPercent, fertilizers, specialCrops });
        return;
      }
      if (cmd === import_protocol.Cmd.PLANT_SEED) {
        const r = msg.reader();
        const userId = r.readInt();
        const cellIndex = r.readByte();
        const seedId = r.readByte();
        console.log(`[Network] Plant Seed: User=${userId}, Cell=${cellIndex}, Seed=${seedId}`);
        this.emit("plant_seed", { userId, cellIndex, seedId });
        return;
      }
      if (cmd === import_protocol.Cmd.TREE_HARVEST) {
        const r = msg.reader();
        const cellIndex = r.readByte();
        const yieldCount = r.available() > 0 ? r.readShort() : 0;
        console.log(`[Network] Harvest Crop: Cell=${cellIndex}, Yield=${yieldCount}`);
        this.emit("tree_harvest", { cellIndex, yieldCount });
        return;
      }
      if (cmd === import_protocol.Cmd.OPEN_LAND) {
        const r = msg.reader();
        const farmId = r.readInt();
        const slot = r.readInt();
        const typeBuy = r.readByte();
        const msgText = r.readUTF();
        const xu = r.available() > 0 ? r.readInt() : 0;
        const luong = r.available() > 0 ? r.readInt() : 0;
        console.log(`[Network] Open Land: Farm=${farmId}, Slot=${slot}, Message="${msgText}"`);
        this.emit("open_land", { farmId, slot, typeBuy, msg: msgText, xu, luong });
        return;
      }
      this.emit("message", msg);
    }
    sendMessage(msg) {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        console.warn("[Network] Cannot send message: WebSocket not open!");
        return;
      }
      const wireData = this.cipher.encodePacket(msg);
      this.ws.send(wireData);
    }
    // --- High-level Gameplay Packet Dispatchers ---
    sendLogin(username, password, version = "2.5.8") {
      this.lastLoginCredentials = { u: username, p: password, v: version };
      const msg = new import_protocol.Message(import_protocol.Cmd.LOGIN);
      msg.writer().writeUTF(username);
      msg.writer().writeUTF(password);
      msg.writer().writeUTF(version);
      console.log(`[Network] Sending Login for username: "${username}"`);
      this.sendMessage(msg);
    }
    sendCreateCharacter(gender, numItem = 5) {
      const msg = new import_protocol.Message(import_protocol.Cmd.CRE_CHARACTER);
      msg.writer().writeByte(gender);
      msg.writer().writeByte(numItem);
      console.log(`[Network] Sending Create Character: Gender=${gender}, Items=${numItem}`);
      this.sendMessage(msg);
    }
    sendJoinPark(mapId = 11, areaId = 0, x = 200, y = 150) {
      this.sendGetHandler(9);
      const msg = new import_protocol.Message(import_protocol.Cmd.AVATAR_JOIN_PARK);
      msg.writer().writeByte(mapId);
      msg.writer().writeByte(areaId);
      msg.writer().writeShort(x);
      msg.writer().writeShort(y);
      console.log(`[Network] Sending Join Park: Map=${mapId}, Area=${areaId}`);
      this.sendMessage(msg);
    }
    sendMove(x, y, direct = 0) {
      const msg = new import_protocol.Message(import_protocol.Cmd.MOVE_PARK);
      msg.writer().writeShort(x);
      msg.writer().writeShort(y);
      msg.writer().writeByte(direct);
      this.sendMessage(msg);
    }
    sendChat(message) {
      const msg = new import_protocol.Message(import_protocol.Cmd.CHAT_PARK);
      msg.writer().writeUTF(message);
      console.log(`[Network] Sending Chat: "${message}"`);
      this.sendMessage(msg);
    }
    sendAvatarFeel(feelId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.AVATAR_FEEL);
      msg.writer().writeByte(feelId);
      console.log(`[Network] Sending Avatar Feel: ${feelId}`);
      this.sendMessage(msg);
    }
    sendAction(idTo, actionId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.ACTION);
      msg.writer().writeInt(idTo);
      msg.writer().writeShort(actionId);
      console.log(`[Network] Sending Action to Player ${idTo}: Action=${actionId}`);
      this.sendMessage(msg);
    }
    sendCommunicate(targetId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.COMMUNICATE);
      msg.writer().writeInt(targetId);
      console.log(`[Network] Sending Communicate with target ID: ${targetId}`);
      this.sendMessage(msg);
    }
    sendMenuSelect(userId, menuId, selectIndex) {
      const msg = new import_protocol.Message(import_protocol.Cmd.MENU_OPTION);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(menuId);
      msg.writer().writeByte(selectIndex);
      console.log(`[Network] Sending Menu Select: User=${userId}, Menu=${menuId}, Select=${selectIndex}`);
      this.sendMessage(msg);
    }
    sendTextBoxReply(userId, menuId, text) {
      const msg = new import_protocol.Message(import_protocol.Cmd.TEXT_BOX);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(menuId);
      msg.writer().writeUTF(text);
      console.log(`[Network] Sending TextBox Reply: User=${userId}, Menu=${menuId}, Text="${text}"`);
      this.sendMessage(msg);
    }
    sendViewChest(userId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.CONTAINER);
      msg.writer().writeInt(userId);
      console.log(`[Network] Requesting Chest for User: ${userId}`);
      this.sendMessage(msg);
    }
    sendUsingPart(itemId, type = 1) {
      const msg = new import_protocol.Message(import_protocol.Cmd.USING_PART);
      msg.writer().writeShort(itemId);
      msg.writer().writeByte(type);
      console.log(`[Network] Sending Using Part: Item=${itemId}, Type=${type}`);
      this.sendMessage(msg);
    }
    sendRemoveItem(itemId, type = 0) {
      const msg = new import_protocol.Message(import_protocol.Cmd.REMOVE_ITEM);
      msg.writer().writeShort(itemId);
      msg.writer().writeByte(type);
      console.log(`[Network] Sending Remove Item: Item=${itemId}, Type=${type}`);
      this.sendMessage(msg);
    }
    sendBuyItemShop(partId, type = 1) {
      const msg = new import_protocol.Message(import_protocol.Cmd.AVATAR_BUY_ITEM);
      msg.writer().writeShort(partId);
      msg.writer().writeByte(type);
      console.log(`[Network] Sending Buy Item: Part=${partId}, CurrencyType=${type}`);
      this.sendMessage(msg);
    }
    sendGetHandler(handlerId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.GET_HANDLER);
      msg.writer().writeByte(handlerId);
      console.log(`[Network] Requesting Switch Handler: ${handlerId}`);
      this.sendMessage(msg);
    }
    sendJoinHouse(userId) {
      this.sendGetHandler(13);
      const msg = new import_protocol.Message(import_protocol.Cmd.JOIN_HOUSE);
      msg.writer().writeInt(userId);
      console.log(`[Network] Sending Join House: UserID=${userId}`);
      this.sendMessage(msg);
    }
    // --- Farm System (Nông trại) ---
    sendJoinFarm(userId = this.myUserId) {
      this.sendGetHandler(10);
      const msg = new import_protocol.Message(import_protocol.Cmd.JOIN);
      msg.writer().writeInt(userId);
      console.log(`[Network] Sending Join Farm: UserID=${userId}`);
      this.sendMessage(msg);
    }
    sendGetFarmInventory() {
      const msg = new import_protocol.Message(import_protocol.Cmd.INVENTORY);
      console.log("[Network] Sending Request Farm Inventory");
      this.sendMessage(msg);
    }
    sendPlantSeed(userId, cellIndex, seedId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.PLANT_SEED);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(cellIndex);
      msg.writer().writeByte(seedId);
      console.log(`[Network] Sending Plant Seed: User=${userId}, Cell=${cellIndex}, Seed=${seedId}`);
      this.sendMessage(msg);
    }
    sendTreeHarvest(userId, cellIndex) {
      const msg = new import_protocol.Message(import_protocol.Cmd.TREE_HARVEST);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(cellIndex);
      console.log(`[Network] Sending Tree Harvest: User=${userId}, Cell=${cellIndex}`);
      this.sendMessage(msg);
    }
    sendOpenLand(farmId, typeBuy = 1) {
      const msg = new import_protocol.Message(import_protocol.Cmd.OPEN_LAND);
      msg.writer().writeInt(farmId);
      msg.writer().writeByte(typeBuy);
      console.log(`[Network] Sending Open Land: FarmID=${farmId}, Type=${typeBuy}`);
      this.sendMessage(msg);
    }
    sendBuyFarmItem(itemId, quantity, currencyType = 1) {
      const msg = new import_protocol.Message(import_protocol.Cmd.BUY_ITEM);
      msg.writer().writeShort(itemId);
      msg.writer().writeByte(quantity);
      msg.writer().writeByte(currencyType);
      console.log(`[Network] Sending Buy Farm Item: Item=${itemId}, Qty=${quantity}, Type=${currencyType}`);
      this.sendMessage(msg);
    }
    sendBuyAnimal(animalType, quantity = 1) {
      const msg = new import_protocol.Message(import_protocol.Cmd.BUY_ANIMAL);
      msg.writer().writeByte(animalType);
      msg.writer().writeShort(quantity);
      console.log(`[Network] Sending Buy Animal: Type=${animalType}, Qty=${quantity}`);
      this.sendMessage(msg);
    }
    // --- House & Furniture System (Nhà ở & Nội thất) ---
    sendBuyItemHouse(itemId, x, y, type = 0) {
      const msg = new import_protocol.Message(import_protocol.Cmd.BUY_ITEM_HOUSE);
      msg.writer().writeShort(itemId);
      msg.writer().writeByte(x);
      msg.writer().writeByte(y);
      msg.writer().writeByte(type);
      console.log(`[Network] Sending Buy House Item: Item=${itemId}, Pos=(${x}, ${y}), Type=${type}`);
      this.sendMessage(msg);
    }
    sendSortItemHouse(anchor, x, y, x2, y2, rotate = 0) {
      const msg = new import_protocol.Message(import_protocol.Cmd.SORT_ITEM_HOUSE);
      msg.writer().writeShort(anchor);
      msg.writer().writeByte(x);
      msg.writer().writeByte(y);
      msg.writer().writeByte(x2);
      msg.writer().writeByte(y2);
      msg.writer().writeByte(rotate);
      console.log(`[Network] Sending Sort House Item: Anchor=${anchor}, (${x},${y}) -> (${x2},${y2})`);
      this.sendMessage(msg);
    }
    sendGetTypeHouse(typeHouse) {
      const msg = new import_protocol.Message(import_protocol.Cmd.GET_TYPE_HOUSE);
      msg.writer().writeByte(typeHouse);
      console.log(`[Network] Requesting Type House: ${typeHouse}`);
      this.sendMessage(msg);
    }
    sendDelItemHouse(itemId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.DEL_ITEM_HOUSE);
      msg.writer().writeShort(itemId);
      console.log(`[Network] Sending Delete House Item: ${itemId}`);
      this.sendMessage(msg);
    }
  };

  // packages/game-client/src/gameplay/GameWorldScreen.ts
  var import_j2me_compat9 = __toESM(require_dist());

  // packages/game-client/src/maps/TilemapRenderer.ts
  var import_j2me_compat7 = __toESM(require_dist());
  var TilemapRenderer = class _TilemapRenderer {
    static TILE_SIZE = 24;
    // i = 24 in ir.java
    static TILES_PER_ROW = 7;
    // 168 px / 24 px = 7 tiles
    mapData;
    tilesetImage;
    bgImage;
    cloudImage;
    isNight = false;
    cameraX = 0;
    cameraY = 0;
    // Authentic background mapping from ir.java line 98 (byte[] h)
    static BG_TYPE_BY_MAP = {
      0: 1,
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 0,
      10: 0,
      11: 1,
      12: 3,
      13: 3,
      14: 3,
      15: 3,
      16: 3,
      17: 2,
      18: -1,
      19: -1,
      20: -1,
      21: 0,
      22: 0,
      23: 0,
      24: 2,
      25: 2
    };
    /**
     * Authentic Map Height formula from ir.java lines 1050-1115
     * When mapId is by2 from server, client switches on (n2 - 1) which is exactly mapId!
     */
    static getMapHeightTiles(mapId) {
      switch (mapId) {
        case 107:
          return 16;
        case 25:
        case 21:
          return 7;
        case 9:
          return 8;
        case 20:
        case 57:
        case 58:
        case 59:
        case 62:
        case 63:
        case 64:
        case 100:
        case 101:
        case 103:
        case 104:
        case 109:
          return 11;
        case 60:
        case 61:
        case 65:
          return 5;
        case 18:
          return 10;
        case 17:
          return 6;
        case 108:
          return 8;
        case 19:
          return 13;
        case 10:
          return 9;
        default:
          return 8;
      }
    }
    async loadMap(mapId) {
      const hour = (/* @__PURE__ */ new Date()).getHours();
      this.isNight = hour >= 18 || hour < 6;
      const nightSuffix = this.isNight ? "1" : "0";
      try {
        const fileId = mapId + 1;
        const mapRes = await fetch(`/assets/maps/${fileId}`);
        if (!mapRes.ok) {
          console.warn(`[TilemapRenderer] Could not load map binary for map ${mapId} (file ${fileId})`);
          return;
        }
        const buffer = await mapRes.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const heightTiles = _TilemapRenderer.getMapHeightTiles(mapId);
        const widthTiles = Math.floor(bytes.length / heightTiles);
        const totalTiles = widthTiles * heightTiles;
        const tiles = new Int16Array(totalTiles);
        const collision = new Int16Array(totalTiles);
        for (let i = 0; i < totalTiles; i++) {
          const val = bytes[i];
          tiles[i] = val === 255 ? -1 : val;
        }
        for (let i = 0; i < totalTiles; i++) {
          const t = tiles[i];
          if (t === 139) {
            tiles[i] = i % widthTiles === 0 ? tiles[i + 1] : tiles[i - 1];
          } else if (t === 140) {
            tiles[i] = 55;
          } else if (t === 141) {
            tiles[i] = i + widthTiles < totalTiles ? tiles[i + widthTiles] : 0;
          } else if (t === 152) {
            tiles[i] = mapId === 25 ? 55 : 0;
          } else if (t === 153) {
            tiles[i] = Math.floor(i / widthTiles) === 0 ? 43 : 6;
          } else if (t === 155 || t === 156) {
            tiles[i] = 55;
          } else if (t === 204) {
            tiles[i] = 43;
          } else if (t >= 126) {
            tiles[i] = i > 0 && tiles[i - 1] >= 0 && tiles[i - 1] < 126 ? tiles[i - 1] : 0;
          }
        }
        for (let i = 0; i < totalTiles; i++) {
          const t = tiles[i];
          if (t === -4) {
            collision[i] = 80;
          } else if (t === -5) {
            collision[i] = 88;
          } else if (t === -1) {
            collision[i] = 88;
          } else if (t >= 120 && t <= 123) {
            collision[i] = 80;
          } else if (t >= 114 && t <= 119) {
            collision[i] = 80;
          } else if (t === 67 || t === 85) {
            collision[i] = 92;
          } else if (t >= 20 && t <= 23) {
            collision[i] = 79;
          } else if (t < 7) {
            collision[i] = 80;
          } else if (t >= 44 && t <= 55) {
            collision[i] = 80;
          } else if (t === 111 || t === 112) {
            collision[i] = 80;
          } else {
            collision[i] = 88;
          }
        }
        this.mapData = {
          id: mapId,
          widthTiles,
          heightTiles,
          tiles,
          collision
        };
        console.log(`[TilemapRenderer] Loaded map ${mapId} (file ${fileId}): ${widthTiles}x${heightTiles} tiles (${widthTiles * 24}x${heightTiles * 24}px)`);
        const tilesetUrl = `/assets/tileset/tileset${nightSuffix}.png`;
        this.tilesetImage = await import_j2me_compat7.Image.createImage(tilesetUrl);
        this.bgImage = void 0;
        this.cloudImage = void 0;
        const bgType = _TilemapRenderer.BG_TYPE_BY_MAP[mapId] ?? -1;
        if (bgType !== -1) {
          try {
            const bgUrl = `/assets/bg/${bgType}${nightSuffix}.png`;
            this.bgImage = await import_j2me_compat7.Image.createImage(bgUrl);
          } catch (err) {
          }
        }
        try {
          const cloudUrl = `/assets/bg/${nightSuffix}.png`;
          this.cloudImage = await import_j2me_compat7.Image.createImage(cloudUrl);
        } catch (err) {
        }
      } catch (err) {
        console.error("[TilemapRenderer] Load error:", err);
      }
    }
    updateCamera(targetX, targetY, screenW, screenH) {
      if (!this.mapData) return;
      const mapWidthPx = this.mapData.widthTiles * _TilemapRenderer.TILE_SIZE;
      const mapHeightPx = this.mapData.heightTiles * _TilemapRenderer.TILE_SIZE;
      let camX = targetX - Math.floor(screenW / 2);
      let camY = targetY - Math.floor(screenH / 2);
      if (mapWidthPx > screenW) {
        camX = Math.max(0, Math.min(mapWidthPx - screenW, camX));
      } else {
        camX = Math.floor((mapWidthPx - screenW) / 2);
      }
      if (mapHeightPx > screenH) {
        camY = Math.max(0, Math.min(mapHeightPx - screenH, camY));
      } else {
        camY = Math.floor((mapHeightPx - screenH) / 2);
      }
      this.cameraX = camX;
      this.cameraY = camY;
    }
    paint(g, screenW, screenH) {
      if (!this.mapData || !this.tilesetImage) return;
      const tileSize = _TilemapRenderer.TILE_SIZE;
      const { widthTiles, heightTiles, tiles } = this.mapData;
      const skyColor = this.isNight ? 21 : 6143735;
      g.setColor(skyColor);
      g.fillRect(0, 0, screenW, screenH);
      if (this.cloudImage) {
        const cW = this.cloudImage.getWidth();
        const parallaxCloud = -Math.floor(this.cameraX * 0.12) % cW;
        const cloudY = Math.max(-20, 15 - Math.floor(this.cameraY * 0.1));
        for (let x = parallaxCloud - cW; x < screenW + cW; x += cW) {
          g.drawImage(this.cloudImage, x, cloudY, 0);
        }
      }
      if (this.bgImage) {
        const bgW = this.bgImage.getWidth();
        const parallaxX = -Math.floor(this.cameraX * 0.3) % bgW;
        const bgY = Math.max(0, 40 - Math.floor(this.cameraY * 0.2));
        for (let x = parallaxX - bgW; x < screenW + bgW; x += bgW) {
          g.drawImage(this.bgImage, x, bgY, 0);
        }
      }
      const startTileX = Math.max(0, Math.floor(this.cameraX / tileSize));
      const endTileX = Math.min(widthTiles, Math.ceil((this.cameraX + screenW) / tileSize));
      const startTileY = Math.max(0, Math.floor(this.cameraY / tileSize));
      const endTileY = Math.min(heightTiles, Math.ceil((this.cameraY + screenH) / tileSize));
      for (let ty = startTileY; ty < endTileY; ty++) {
        for (let tx = startTileX; tx < endTileX; tx++) {
          const tileIdx = tiles[ty * widthTiles + tx];
          if (tileIdx < 0) continue;
          const numRows = 18;
          const col = Math.floor(tileIdx / numRows);
          const row = tileIdx % numRows;
          const srcX = col * tileSize;
          const srcY = row * tileSize;
          const destX = tx * tileSize - this.cameraX;
          const destY = ty * tileSize - this.cameraY;
          g.drawRegion(
            this.tilesetImage,
            srcX,
            srcY,
            tileSize,
            tileSize,
            0,
            destX,
            destY,
            0
          );
        }
      }
    }
    isBlocked(worldX, worldY) {
      if (!this.mapData) return false;
      const { widthTiles, heightTiles, collision } = this.mapData;
      const tx = Math.floor(worldX / _TilemapRenderer.TILE_SIZE);
      const ty = Math.floor(worldY / _TilemapRenderer.TILE_SIZE);
      if (tx < 0 || tx >= widthTiles || ty < 0 || ty >= heightTiles) {
        return true;
      }
      const c = collision[ty * widthTiles + tx];
      return !(c === 80 || c === 51 || c === 88 || c === 0);
    }
  };

  // packages/game-client/src/characters/AvatarRenderer.ts
  var import_j2me_compat8 = __toESM(require_dist());
  var AvatarRenderer = class {
    static partsMap = /* @__PURE__ */ new Map();
    static slicesMap = /* @__PURE__ */ new Map();
    static atlasImages = /* @__PURE__ */ new Map();
    static itemImages = /* @__PURE__ */ new Map();
    static shadowImage;
    static isInitialized = false;
    static async init() {
      if (this.isInitialized) return;
      try {
        try {
          this.shadowImage = await import_j2me_compat8.Image.createImage("/assets/effect/s0.png");
        } catch (err) {
          console.warn("[AvatarRenderer] Could not load shadow image:", err);
        }
        const partsRes = await fetch("/assets/data/avatar_parts.json");
        if (partsRes.ok) {
          const partsJson = await partsRes.json();
          for (const [idStr, p] of Object.entries(partsJson)) {
            this.partsMap.set(parseInt(idStr, 10), p);
          }
          console.log(`[AvatarRenderer] Loaded ${this.partsMap.size} avatar parts.`);
        }
        const slicesRes = await fetch("/assets/data/avatar_img_data.json");
        if (slicesRes.ok) {
          const slicesJson = await slicesRes.json();
          for (const [idStr, s] of Object.entries(slicesJson)) {
            this.slicesMap.set(parseInt(idStr, 10), s);
          }
          console.log(`[AvatarRenderer] Loaded ${this.slicesMap.size} image slices.`);
        }
        this.isInitialized = true;
      } catch (err) {
        console.error("[AvatarRenderer] Init error:", err);
      }
    }
    static async getAtlasImage(imageId) {
      if (this.atlasImages.has(imageId)) {
        return this.atlasImages.get(imageId);
      }
      try {
        const img = await import_j2me_compat8.Image.createImage(`/res/big/${imageId}.png`);
        this.atlasImages.set(imageId, img);
        return img;
      } catch (err) {
        console.warn(`[AvatarRenderer] Failed to load atlas image ${imageId}:`, err);
        return void 0;
      }
    }
    static async getItemImage(itemId) {
      if (this.itemImages.has(itemId)) {
        return this.itemImages.get(itemId);
      }
      try {
        const img = await import_j2me_compat8.Image.createImage(`/res/item/${itemId}.png`);
        this.itemImages.set(itemId, img);
        return img;
      } catch (err) {
        console.warn(`[AvatarRenderer] Failed to load item image ${itemId}:`, err);
        return void 0;
      }
    }
    /**
     * Preload textures for a list of wearing items
     */
    static async preloadWearing(wearing) {
      for (const partId of wearing) {
        const part = this.partsMap.get(partId);
        if (!part || !part.animation) continue;
        for (const frame of part.animation) {
          const imgId = frame.img;
          if (imgId >= 2e3) {
            this.getItemImage(imgId).catch(() => {
            });
          } else if (imgId >= 0) {
            const slice = this.slicesMap.get(imgId);
            if (slice) {
              this.getAtlasImage(slice.image_id).catch(() => {
              });
            }
          }
        }
      }
    }
    /**
     * Render multi-layered animated avatar according to Java client logic (hn.java, ld.java, fa.java)
     */
    static paintAvatar(g, x, y, wearing, direct, frame = 0, name, isLocal = false, font, chatMessage) {
      if (this.shadowImage) {
        const shadowX = x - Math.floor(this.shadowImage.getWidth() / 2);
        const shadowY = y - 3;
        g.drawImage(this.shadowImage, shadowX, shadowY, 0);
      } else {
        g.setColor(3355443);
        g.fillArc(x - 9, y - 2, 18, 6, 0, 360);
      }
      const isMirrored = direct === 2;
      const transform = isMirrored ? import_j2me_compat8.Sprite.TRANS_MIRROR : import_j2me_compat8.Sprite.TRANS_NONE;
      const partsToRender = [];
      for (const partId of wearing) {
        const part = this.partsMap.get(partId);
        if (part) {
          partsToRender.push(part);
        }
      }
      partsToRender.sort((a, b) => a.zorder - b.zorder);
      for (const part of partsToRender) {
        if (!part.animation || part.animation.length === 0) continue;
        const frameData = part.animation[frame % part.animation.length];
        if (!frameData) continue;
        const imgId = frameData.img;
        const dx = frameData.dx;
        const dy = frameData.dy;
        if (imgId >= 2e3) {
          const itemImg = this.itemImages.get(imgId);
          if (itemImg) {
            const w = itemImg.getWidth();
            const h = itemImg.getHeight();
            const drawX = isMirrored ? x - dx - w : x + dx;
            const drawY = y + dy;
            g.drawRegion(itemImg, 0, 0, w, h, transform, drawX, drawY, 0);
          } else {
            this.getItemImage(imgId);
          }
        } else if (imgId >= 0) {
          const slice = this.slicesMap.get(imgId);
          if (slice) {
            const atlasImg = this.atlasImages.get(slice.image_id);
            if (atlasImg) {
              const drawX = isMirrored ? x - dx - slice.w : x + dx;
              const drawY = y + dy;
              g.drawRegion(
                atlasImg,
                slice.x,
                slice.y,
                slice.w,
                slice.h,
                transform,
                drawX,
                drawY,
                0
              );
            } else {
              this.getAtlasImage(slice.image_id);
            }
          }
        }
      }
      if (name) {
        const tagY = y - 46;
        const ctx = g.ctx;
        const nameW = font ? font.stringWidth(name) : name.length * 6;
        const tagX = x - Math.floor(nameW / 2);
        if (ctx) {
          ctx.save();
          ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(tagX - 4, tagY - 1, nameW + 8, 14, 3);
          } else {
            ctx.rect(tagX - 4, tagY - 1, nameW + 8, 14);
          }
          ctx.fill();
          ctx.strokeStyle = isLocal ? "#facc15" : "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.font = "bold 11px Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000000";
          ctx.fillText(name, x + 1, tagY + 7);
          if (isLocal) {
            ctx.fillStyle = "#fde047";
          } else if (name.includes("Lovanga") || name.includes("T\xE0i X\u1EC9u") || name.includes("V\xE9 s\u1ED1") || name.includes("\u0111\u1EA5u gi\xE1") || name.includes("quay s\u1ED1")) {
            ctx.fillStyle = "#38bdf8";
          } else {
            ctx.fillStyle = "#ffffff";
          }
          ctx.fillText(name, x, tagY + 6);
          ctx.restore();
        } else if (font) {
          font.drawString(g, name, x, tagY, 2);
        }
      }
      if (chatMessage && chatMessage.length > 0) {
        const ctx = g.ctx;
        const maxBubbleW = 140;
        let lines = [];
        if (font) {
          lines = font.splitText(chatMessage, maxBubbleW - 14);
        } else {
          lines = [chatMessage];
        }
        if (lines.length > 2) {
          lines = [lines[0], lines[1].slice(0, 16) + "..."];
        }
        let maxLineW = 30;
        if (font) {
          for (const l of lines) {
            maxLineW = Math.max(maxLineW, font.stringWidth(l));
          }
        } else if (ctx) {
          ctx.font = "11px Arial, sans-serif";
          for (const l of lines) {
            maxLineW = Math.max(maxLineW, ctx.measureText(l).width);
          }
        }
        const bubbleW = Math.min(maxBubbleW, Math.round(maxLineW + 14));
        const bubbleH = lines.length * 13 + 6;
        const bx = x - Math.floor(bubbleW / 2);
        const by = y - 56 - bubbleH;
        if (ctx) {
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#1e293b";
          ctx.lineWidth = 1;
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(bx, by, bubbleW, bubbleH, 4);
          } else {
            ctx.rect(bx, by, bubbleW, bubbleH);
          }
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x - 3, by + bubbleH);
          ctx.lineTo(x, by + bubbleH + 4);
          ctx.lineTo(x + 3, by + bubbleH);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.strokeStyle = "#1e293b";
          ctx.stroke();
          ctx.restore();
          ctx.save();
          ctx.font = "10px Arial, sans-serif";
          ctx.fillStyle = "#0f172a";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], x, by + 7 + i * 13);
          }
          ctx.restore();
        }
      }
    }
  };

  // packages/game-client/src/gameplay/GameWorldScreen.ts
  var GameWorldScreen = class _GameWorldScreen extends GameScreen {
    localPlayer = {
      id: 0,
      name: "T\xF4i",
      x: 120,
      y: 200,
      direct: 0,
      // 0: Down, 1: Up, 2: Left, 3: Right
      gender: 0,
      wearing: [],
      chatMessage: "",
      chatTimer: 0,
      feelId: -1,
      feelTimer: 0,
      isMoving: false,
      frame: 0
    };
    remotePlayers = /* @__PURE__ */ new Map();
    currentMapId = 11;
    currentAreaId = 0;
    skinPainter;
    font;
    networkSession;
    tilemapRenderer;
    MOVE_SPEED = 4;
    isRunningFast = false;
    lastMoveSentTime = 0;
    animTick = 0;
    // Mouse click-to-move and drag navigation
    targetMoveX;
    targetMoveY;
    clickEffect;
    isMouseDown = false;
    // Top marquee announcement ticker
    tickerText = "Ch\xE0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi Avatar Teamobi WebGL Native! Di chuy\u1EC3n m\u01B0\u1EE3t m\xE0 b\u1EB1ng chu\u1ED9t | Click Menu ho\u1EB7c ph\xEDm C \u0111\u1EC3 chat";
    tickerX = 400;
    // In-game HUD popups
    isMenuOpen = false;
    isEmoteOpen = false;
    img12Plus;
    menuOptions = [
      "R\u01B0\u01A1ng \u0111\u1ED3 (Inventory)",
      "\u0110\u1ED5i khu",
      "Xem th\xF4ng tin",
      "Ch\u1EA1y nhanh (B\u1EADt/T\u1EAFt)",
      "To\xE0n m\xE0n h\xECnh",
      "\u0110\xF3ng Menu"
    ];
    // Authentic NPCs definition per Map ID from avatar_2x.npc database
    static ALL_MAP_NPCS = {
      9: [
        {
          id: 185,
          targetId: 2000000185,
          name: "Quay s\u1ED1",
          x: 514,
          y: 48,
          wearing: [3379, 310, 309, 0, 82, 201, 523, 313, 528],
          chatMessage: "",
          chatTimer: 0,
          chatList: ["Quay s\u1ED1 may m\u1EAFn \u0111\xE2y", "B\u1EA1n c\xF3 th\u1EC3 tr\xFAng nh\u1EEFng m\xF3n qu\xE0 \u0111\u1ED9c \u0111\xE1o", "H\xE3y tham gia ngay n\xE0o"]
        },
        {
          id: 186,
          targetId: 2000000186,
          name: "\u0110\u1EA5u gi\xE1",
          x: 410,
          y: 48,
          wearing: [598, 597, 0, 82, 308, 595, 313],
          chatMessage: "",
          chatTimer: 0,
          chatList: ["Ch\xE0o c\xE1c b\u1EA1n \u0111\xE3 \u0111\u1EBFn v\u1EDBi \u0111\u1EA5u gi\xE1", "Hi\u1EC7n ch\u01B0a c\xF3 th\xF4ng tin phi\xEAn ti\u1EBFp theo"]
        }
      ],
      11: [
        {
          id: 864,
          targetId: 2000000864,
          name: "Th\u1EA7n T\xE0i X\u1EC9u",
          x: 80,
          y: 50,
          wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312],
          chatMessage: "",
          chatTimer: 0
        },
        {
          id: 860,
          targetId: 2000000860,
          name: "Ti\xEAn tri Lovanga",
          x: 250,
          y: 64,
          wearing: [89, 88, 0, 2044, 3299],
          chatMessage: "",
          chatTimer: 0
        },
        {
          id: 465,
          targetId: 2000000465,
          name: "V\xE9 s\u1ED1",
          x: 638,
          y: 68,
          wearing: [89, 88, 0, 33, 49, 328],
          chatMessage: "",
          chatTimer: 0
        }
      ],
      13: [
        {
          id: 430,
          targetId: 2000000430,
          name: "Th\u1EE3 c\xE2u",
          x: 326,
          y: 64,
          wearing: [3387, 3386, 0, 82, 3385, 3384, 442],
          chatMessage: "",
          chatTimer: 0
        }
      ],
      17: [
        {
          id: 863,
          targetId: 2000000863,
          name: "Ch\u1EA1y To Win",
          x: 54,
          y: 48,
          wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312],
          chatMessage: "",
          chatTimer: 0,
          chatList: ["Shop c\xE0y chay \u0111\xE2y"]
        },
        {
          id: 862,
          targetId: 2000000862,
          name: "Pay To Win",
          x: 173,
          y: 48,
          wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312, 5455, 2310],
          chatMessage: "",
          chatTimer: 0,
          chatList: ["Ch\u1EC9 c\xF3 th\u1EC3 PayToWin = )))"]
        }
      ],
      20: [
        {
          id: 335,
          targetId: 2000000335,
          name: "Phi h\xE0nh gia",
          x: 40,
          y: 49,
          wearing: [75, 56, 0, 516, 55, 2042],
          chatMessage: "",
          chatTimer: 0
        }
      ],
      21: [
        {
          id: 857,
          targetId: 2000000857,
          name: "Ch\u1EE7 \u0111\u1EA7u t\u01B0",
          x: 598,
          y: 24,
          wearing: [2403],
          chatMessage: "",
          chatTimer: 0
        }
      ],
      23: [
        {
          id: 95,
          targetId: 2000000095,
          name: "Th\u1EE3 kim ho\xE0n",
          x: 686,
          y: 52,
          wearing: [4205, 3378, 63, 62, 87, 90, 2073, 291, 616],
          chatMessage: "",
          chatTimer: 0
        }
      ],
      25: [
        {
          id: 850,
          targetId: 2000000850,
          name: "L\xE1i bu\xF4n",
          x: 70,
          y: 45,
          wearing: [273, 326, 0, 82, 73, 297, 442],
          chatMessage: "",
          chatTimer: 0
        }
      ]
    };
    mapNpcs = [];
    // Active NPC Dialogue State
    activeDialog = null;
    // Active Chest Inventory State
    isChestOpen = false;
    chestItems = [];
    // Active Player-to-Player Action Menu
    selectedTargetPlayer = null;
    activeActionAnimation = null;
    // Live Wallet Currency
    userXu = 0;
    userLuong = 0;
    emoteOptions = [
      { id: 0, icon: "\u{1F60A}", name: "C\u01B0\u1EDDi" },
      { id: 1, icon: "\u{1F622}", name: "Kh\xF3c" },
      { id: 2, icon: "\u{1F621}", name: "Gi\u1EADn" },
      { id: 3, icon: "\u2764\uFE0F", name: "Y\xEAu" },
      { id: 4, icon: "\u{1F48B}", name: "H\xF4n" },
      { id: 5, icon: "\u{1F609}", name: "Nh\xE1y m\u1EAFt" }
    ];
    constructor(networkSession, skinPainter, font) {
      super();
      this.networkSession = networkSession;
      this.skinPainter = skinPainter;
      this.font = font;
      this.tilemapRenderer = new TilemapRenderer();
      this.leftCmd = { caption: "Chat", actionId: 0 };
      this.centerCmd = { caption: "Ch\u1ECDn", actionId: 1 };
      this.rightCmd = { caption: "R\u1EDDi khu", actionId: 2 };
      this.setupNetworkHandlers();
      AvatarRenderer.init().catch(console.error);
      this.mapNpcs = (_GameWorldScreen.ALL_MAP_NPCS[this.currentMapId] || []).map((n) => ({ ...n }));
      for (const npc of this.mapNpcs) {
        AvatarRenderer.preloadWearing(npc.wearing);
      }
      this.tilemapRenderer.loadMap(this.currentMapId).catch(console.error);
      import_j2me_compat9.Image.createImage("/assets/normal/12Plus.png").then((img) => this.img12Plus = img).catch(() => {
      });
    }
    onResize(_width, _height) {
    }
    setupNetworkHandlers() {
      this.networkSession.on("join_park", (data) => {
        this.currentMapId = data.mapId;
        this.currentAreaId = data.areaId;
        if (data.x > 0 && data.y > 0) {
          this.localPlayer.x = data.x;
          this.localPlayer.y = data.y;
        }
        this.mapNpcs = (_GameWorldScreen.ALL_MAP_NPCS[this.currentMapId] || []).map((n) => ({ ...n }));
        for (const npc of this.mapNpcs) {
          AvatarRenderer.preloadWearing(npc.wearing);
        }
        this.tilemapRenderer.loadMap(this.currentMapId);
        AvatarRenderer.preloadWearing(this.localPlayer.wearing);
        this.remotePlayers.clear();
        if (data.players) {
          for (const p of data.players) {
            if (p.id !== this.localPlayer.id) {
              this.remotePlayers.set(p.id, {
                ...p,
                lastX: p.x,
                lastY: p.y,
                frame: 0
              });
              AvatarRenderer.preloadWearing(p.wearing);
            }
          }
        }
        console.log(`[World] Entered Map ${this.currentMapId}, Area ${this.currentAreaId} (Online players: ${this.remotePlayers.size + 1})`);
      });
      this.networkSession.on("farm_join", () => {
        this.currentMapId = 18;
        this.tilemapRenderer.loadMap(18);
        console.log("[World] Entered Farm (Map 18)");
      });
      this.networkSession.on("player_join_park", (player) => {
        if (player.id !== this.localPlayer.id) {
          this.remotePlayers.set(player.id, {
            ...player,
            lastX: player.x,
            lastY: player.y,
            frame: 0
          });
          AvatarRenderer.preloadWearing(player.wearing);
          console.log(`[World] Added remote player ${player.id} (${player.name})`);
        }
      });
      this.networkSession.on("player_leave_park", (playerId) => {
        this.remotePlayers.delete(playerId);
        console.log(`[World] Removed remote player ${playerId}`);
      });
      this.networkSession.on("player_move", (data) => {
        const p = this.remotePlayers.get(data.id);
        if (p) {
          p.lastX = p.x;
          p.lastY = p.y;
          p.x = data.x;
          p.y = data.y;
          p.direct = data.direct;
          p.frame = (p.frame || 0) % 4 + 1;
        }
      });
      this.networkSession.on("player_chat", (data) => {
        if (data.id === this.localPlayer.id) {
          this.localPlayer.chatMessage = data.message;
          this.localPlayer.chatTimer = 100;
        } else {
          const p = this.remotePlayers.get(data.id);
          if (p) {
            p.chatMessage = data.message;
            p.chatTimer = 100;
          }
        }
      });
      this.networkSession.on("player_feel", (data) => {
        if (data.id === this.localPlayer.id) {
          this.localPlayer.feelId = data.feelId;
          this.localPlayer.feelTimer = 60;
        } else {
          const p = this.remotePlayers.get(data.id);
          if (p) {
            p.feelId = data.feelId;
            p.feelTimer = 60;
          }
        }
      });
      this.networkSession.on("menu_option", (data) => {
        console.log(`[World] NPC Dialog Menu: ${data.options.length} items`);
        this.activeDialog = {
          userId: data.userId,
          menuId: data.menuId,
          options: data.options
        };
        this.isMenuOpen = false;
        this.isEmoteOpen = false;
        this.isChestOpen = false;
      });
      this.networkSession.on("view_chest", (items) => {
        console.log(`[World] Chest items received: ${items.length}`);
        this.chestItems = items;
        this.isChestOpen = true;
        this.isMenuOpen = false;
        this.activeDialog = null;
      });
      this.networkSession.on("player_using_part", (data) => {
        if (data.userId === this.localPlayer.id) {
          if (!this.localPlayer.wearing.includes(data.itemId)) {
            this.localPlayer.wearing.push(data.itemId);
            AvatarRenderer.preloadWearing(this.localPlayer.wearing);
          }
        } else {
          const p = this.remotePlayers.get(data.userId);
          if (p && !p.wearing.includes(data.itemId)) {
            p.wearing.push(data.itemId);
            AvatarRenderer.preloadWearing(p.wearing);
          }
        }
      });
      this.networkSession.on("player_remove_item", (data) => {
        if (data.userId === this.localPlayer.id) {
          this.localPlayer.wearing = this.localPlayer.wearing.filter((id) => id !== data.itemId);
        } else {
          const p = this.remotePlayers.get(data.userId);
          if (p) {
            p.wearing = p.wearing.filter((id) => id !== data.itemId);
          }
        }
      });
      this.networkSession.on("update_money", (data) => {
        this.userXu = data.xu;
        this.userLuong = data.luong;
      });
      this.networkSession.on("player_action", (data) => {
        console.log(`[World] Player Action: ${data.userId} -> ${data.idTo} (Action ${data.action})`);
        this.activeActionAnimation = {
          fromId: data.userId,
          toId: data.idTo,
          action: data.action,
          tick: 40
          // 2 seconds
        };
      });
      this.networkSession.on("server_info", (info) => {
        this.tickerText = info;
        this.tickerX = 500;
      });
      this.networkSession.on("server_message", (msg) => {
        this.tickerText = `[Th\xF4ng b\xE1o]: ${msg}`;
        this.tickerX = 500;
      });
    }
    update() {
      this.animTick++;
      this.tickerX -= 1;
      const tickerWidth = this.tickerText.length * 7;
      if (this.tickerX < -tickerWidth) {
        const screenW = typeof window !== "undefined" && window.gameMidlet?.canvas?.width || 640;
        this.tickerX = screenW;
      }
      if (this.clickEffect && this.clickEffect.tick > 0) {
        this.clickEffect.tick--;
      }
      const speed = this.isRunningFast ? 6 : this.MOVE_SPEED;
      if (this.targetMoveX !== void 0 && this.targetMoveY !== void 0) {
        const dx = this.targetMoveX - this.localPlayer.x;
        const dy = this.targetMoveY - this.localPlayer.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= speed) {
          this.localPlayer.x = this.targetMoveX;
          this.localPlayer.y = this.targetMoveY;
          this.targetMoveX = void 0;
          this.targetMoveY = void 0;
          this.localPlayer.isMoving = false;
          this.networkSession.sendMove(this.localPlayer.x, this.localPlayer.y, this.localPlayer.direct);
        } else {
          const angle = Math.atan2(dy, dx);
          const stepX = Math.cos(angle) * speed;
          const stepY = Math.sin(angle) * speed;
          if (Math.abs(dx) > Math.abs(dy)) {
            this.localPlayer.direct = dx > 0 ? 3 : 2;
          } else {
            this.localPlayer.direct = dy > 0 ? 0 : 1;
          }
          const nextX = Math.round(this.localPlayer.x + stepX);
          const nextY = Math.round(this.localPlayer.y + stepY);
          if (!this.tilemapRenderer.isBlocked(nextX, nextY)) {
            this.localPlayer.x = nextX;
            this.localPlayer.y = nextY;
          } else if (!this.tilemapRenderer.isBlocked(nextX, this.localPlayer.y)) {
            this.localPlayer.x = nextX;
          } else if (!this.tilemapRenderer.isBlocked(this.localPlayer.x, nextY)) {
            this.localPlayer.y = nextY;
          } else {
            this.targetMoveX = void 0;
            this.targetMoveY = void 0;
          }
          this.localPlayer.isMoving = true;
          const now = Date.now();
          if (now - this.lastMoveSentTime > 100) {
            this.lastMoveSentTime = now;
            this.networkSession.sendMove(this.localPlayer.x, this.localPlayer.y, this.localPlayer.direct);
          }
        }
      }
      if (this.localPlayer.isMoving) {
        this.localPlayer.frame = Math.floor(this.animTick / 2) % 4 + 1;
        if (this.targetMoveX === void 0 && !this.isMouseDown) {
          this.localPlayer.isMoving = false;
        }
      } else {
        this.localPlayer.frame = 0;
      }
      if (this.localPlayer.chatTimer > 0) {
        this.localPlayer.chatTimer--;
        if (this.localPlayer.chatTimer === 0) {
          this.localPlayer.chatMessage = "";
        }
      }
      if (this.localPlayer.feelTimer > 0) {
        this.localPlayer.feelTimer--;
        if (this.localPlayer.feelTimer === 0) {
          this.localPlayer.feelId = -1;
        }
      }
      for (const player of this.remotePlayers.values()) {
        if (player.chatTimer && player.chatTimer > 0) {
          player.chatTimer--;
          if (player.chatTimer === 0) {
            player.chatMessage = "";
          }
        }
        if (player.feelTimer && player.feelTimer > 0) {
          player.feelTimer--;
          if (player.feelTimer === 0) {
            player.feelId = -1;
          }
        }
      }
    }
    keyPressed(keyCode) {
      let moved = false;
      let newX = this.localPlayer.x;
      let newY = this.localPlayer.y;
      let newDirect = this.localPlayer.direct;
      const speed = this.isRunningFast ? 6 : this.MOVE_SPEED;
      if (keyCode === 50 || keyCode === -1 || keyCode === 87 || keyCode === 119) {
        newY -= speed;
        newDirect = 1;
        moved = true;
      } else if (keyCode === 56 || keyCode === -2 || keyCode === 83 || keyCode === 115) {
        newY += speed;
        newDirect = 0;
        moved = true;
      } else if (keyCode === 52 || keyCode === -3 || keyCode === 65 || keyCode === 97) {
        newX -= speed;
        newDirect = 2;
        moved = true;
      } else if (keyCode === 54 || keyCode === -4 || keyCode === 68 || keyCode === 100) {
        newX += speed;
        newDirect = 3;
        moved = true;
      } else if (keyCode === 67 || keyCode === 99 || keyCode === 13) {
        this.promptChat();
        return;
      } else if (keyCode === 81 || keyCode === 113) {
        this.isMenuOpen = !this.isMenuOpen;
        return;
      }
      if (moved) {
        this.targetMoveX = void 0;
        this.targetMoveY = void 0;
        if (!this.tilemapRenderer.isBlocked(newX, newY)) {
          this.localPlayer.x = newX;
          this.localPlayer.y = newY;
        }
        this.localPlayer.direct = newDirect;
        this.localPlayer.isMoving = true;
        const now = Date.now();
        if (now - this.lastMoveSentTime > 100) {
          this.lastMoveSentTime = now;
          this.networkSession.sendMove(this.localPlayer.x, this.localPlayer.y, this.localPlayer.direct);
        }
      }
    }
    pointerPressed(x, y) {
      const screenW = typeof window !== "undefined" && window.gameMidlet?.canvas?.width || 640;
      const screenH = typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 360;
      if (this.isMenuOpen) {
        const mw = 170;
        const mh = this.menuOptions.length * 24 + 16;
        const mx = 6;
        const my = 28;
        if (x >= mx && x <= mx + mw && y >= my && y <= my + mh) {
          const itemIdx = Math.floor((y - (my + 8)) / 24);
          this.onSelectMenuItem(itemIdx);
        } else {
          this.isMenuOpen = false;
        }
        return;
      }
      if (this.activeDialog) {
        const dw = 240;
        const dh = this.activeDialog.options.length * 24 + 36;
        const dx = Math.floor((screenW - dw) / 2);
        const dy = Math.floor((screenH - dh) / 2);
        if (x >= dx && x <= dx + dw && y >= dy && y <= dy + dh) {
          const optIdx = Math.floor((y - (dy + 28)) / 24);
          if (optIdx >= 0 && optIdx < this.activeDialog.options.length) {
            const sel = this.activeDialog;
            this.activeDialog = null;
            this.networkSession.sendMenuSelect(sel.userId, sel.menuId, optIdx);
          }
        } else {
          this.activeDialog = null;
        }
        return;
      }
      if (this.isChestOpen) {
        const cw = 250;
        const ch = 180;
        const cx = Math.floor((screenW - cw) / 2);
        const cy = Math.floor((screenH - ch) / 2);
        if (x >= cx + cw - 26 && x <= cx + cw && y >= cy && y <= cy + 24) {
          this.isChestOpen = false;
          return;
        }
        if (x >= cx + 12 && x <= cx + cw - 12 && y >= cy + 30 && y <= cy + ch - 12) {
          const col = Math.floor((x - (cx + 12)) / 44);
          const row = Math.floor((y - (cy + 30)) / 44);
          const idx = row * 5 + col;
          if (idx >= 0 && idx < this.chestItems.length) {
            const item = this.chestItems[idx];
            console.log(`[World] Equipping item ${item.id} from chest`);
            this.networkSession.sendUsingPart(item.id, 1);
          }
        } else {
          this.isChestOpen = false;
        }
        return;
      }
      if (this.selectedTargetPlayer) {
        const tw = 150;
        const th = 105;
        const tx = Math.floor((screenW - tw) / 2);
        const ty = Math.floor((screenH - th) / 2);
        if (x >= tx && x <= tx + tw && y >= ty && y <= ty + th) {
          const actionIdx = Math.floor((y - (ty + 26)) / 24);
          const target = this.selectedTargetPlayer;
          this.selectedTargetPlayer = null;
          if (actionIdx === 0) {
            this.networkSession.sendAction(target.id, 102);
          } else if (actionIdx === 1) {
            this.networkSession.sendAction(target.id, 101);
          } else if (actionIdx === 2) {
            this.networkSession.sendAction(target.id, 103);
          }
        } else {
          this.selectedTargetPlayer = null;
        }
        return;
      }
      if (this.isEmoteOpen) {
        const ew = 150;
        const eh = 60;
        const ex = screenW - ew - 6;
        const ey = 28;
        if (x >= ex && x <= ex + ew && y >= ey && y <= ey + eh) {
          const col = Math.floor((x - (ex + 5)) / 46);
          const row = Math.floor((y - (ey + 5)) / 25);
          const idx = row * 3 + col;
          if (idx >= 0 && idx < this.emoteOptions.length) {
            const emote = this.emoteOptions[idx];
            this.localPlayer.feelId = emote.id;
            this.localPlayer.feelTimer = 60;
            this.networkSession.sendAvatarFeel(emote.id);
          }
        }
        this.isEmoteOpen = false;
        return;
      }
      if (y <= 26) {
        if (x >= 6 && x <= 50) {
          this.isMenuOpen = !this.isMenuOpen;
          this.isEmoteOpen = false;
          return;
        }
        if (x >= 54 && x <= 76) {
          alert("H\u1ED9p th\u01B0: B\u1EA1n kh\xF4ng c\xF3 th\u01B0 m\u1EDBi n\xE0o t\u1EEB Th\u1ECB Tr\u01B0\u1EDFng.");
          return;
        }
        if (x >= 80 && x <= 102) {
          this.promptChat();
          return;
        }
        if (x >= screenW - 80 && x <= screenW - 58) {
          const nextArea = (this.currentAreaId + 1) % 10;
          this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
          return;
        }
        if (x >= screenW - 54 && x <= screenW - 32) {
          this.isRunningFast = !this.isRunningFast;
          return;
        }
        if (x >= screenW - 28 && x <= screenW - 6) {
          this.isEmoteOpen = !this.isEmoteOpen;
          this.isMenuOpen = false;
          return;
        }
        return;
      }
      if (y >= screenH - 24) {
        if (x <= 80) {
          this.promptChat();
        } else if (x >= screenW - 140 && x <= screenW - 40) {
          const nextArea = (this.currentAreaId + 1) % 10;
          this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
        } else if (x > screenW - 40) {
          if (typeof window !== "undefined" && window.toggleFullscreen) {
            window.toggleFullscreen();
          }
        }
        return;
      }
      const worldTargetX = x + this.tilemapRenderer.cameraX;
      const worldTargetY = y + this.tilemapRenderer.cameraY;
      for (const npc of this.mapNpcs) {
        const dx = Math.abs(worldTargetX - npc.x);
        const dy = Math.abs(worldTargetY - npc.y);
        if (dx < 26 && dy < 36) {
          console.log(`[World] Clicked NPC: ${npc.name} (ID: ${npc.targetId})`);
          this.networkSession.sendCommunicate(npc.targetId);
          return;
        }
      }
      for (const rp of this.remotePlayers.values()) {
        const dx = Math.abs(worldTargetX - rp.x);
        const dy = Math.abs(worldTargetY - rp.y);
        if (dx < 24 && dy < 34) {
          console.log(`[World] Clicked Player: ${rp.name} (ID: ${rp.id})`);
          this.selectedTargetPlayer = { id: rp.id, name: rp.name };
          return;
        }
      }
      this.targetMoveX = worldTargetX;
      this.targetMoveY = worldTargetY;
      this.clickEffect = { x: worldTargetX, y: worldTargetY, tick: 16 };
      this.isMouseDown = true;
    }
    pointerDragged(x, y) {
      if (this.isMouseDown && y > 26 && y < (typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 360) - 24) {
        this.targetMoveX = x + this.tilemapRenderer.cameraX;
        this.targetMoveY = y + this.tilemapRenderer.cameraY;
      }
    }
    pointerReleased(_x, _y) {
      this.isMouseDown = false;
    }
    onSelectMenuItem(index) {
      this.isMenuOpen = false;
      switch (index) {
        case 0: {
          this.networkSession.sendViewChest(this.localPlayer.id);
          break;
        }
        case 1: {
          const nextArea = (this.currentAreaId + 1) % 10;
          this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
          break;
        }
        case 2: {
          const u = this.localPlayer.name;
          alert(`Nh\xE2n v\u1EADt: ${u} | ID: ${this.localPlayer.id} | Xu: ${this.userXu} | L\u01B0\u1EE3ng: ${this.userLuong} | B\u1EA3n \u0111\u1ED3: ${this.currentMapId} - Khu: ${this.currentAreaId}`);
          break;
        }
        case 3: {
          this.isRunningFast = !this.isRunningFast;
          break;
        }
        case 4: {
          if (typeof window !== "undefined" && window.toggleFullscreen) {
            window.toggleFullscreen();
          }
          break;
        }
        case 5: {
          break;
        }
      }
    }
    promptChat() {
      const chatInput = document.getElementById("chatInput");
      if (chatInput) {
        chatInput.focus();
      } else {
        const text = window.prompt("Nh\u1EADp n\u1ED9i dung chat:");
        if (text && text.trim().length > 0) {
          this.networkSession.sendChat(text.trim());
        }
      }
    }
    paint(g) {
      const screenW = typeof window !== "undefined" && window.gameMidlet?.canvas?.width || 640;
      const screenH = typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 360;
      this.tilemapRenderer.updateCamera(this.localPlayer.x, this.localPlayer.y, screenW, screenH);
      const camX = this.tilemapRenderer.cameraX;
      const camY = this.tilemapRenderer.cameraY;
      this.tilemapRenderer.paint(g, screenW, screenH);
      if (this.clickEffect && this.clickEffect.tick > 0) {
        const effX = this.clickEffect.x - camX;
        const effY = this.clickEffect.y - camY;
        const radius = (16 - this.clickEffect.tick) * 1.5;
        g.setColor(58879);
        g.drawArc(effX - radius, effY - radius * 0.6, radius * 2, radius * 1.2, 0, 360);
        g.setColor(16766720);
        g.drawArc(effX - radius * 0.5, effY - radius * 0.3, radius, radius * 0.6, 0, 360);
      }
      const entities = [];
      entities.push({
        id: this.localPlayer.id,
        name: this.localPlayer.name,
        x: this.localPlayer.x,
        y: this.localPlayer.y,
        wearing: this.localPlayer.wearing,
        direct: this.localPlayer.direct,
        frame: this.localPlayer.frame,
        isLocal: true,
        chatMessage: this.localPlayer.chatMessage,
        feelId: this.localPlayer.feelId
      });
      const seenIds = /* @__PURE__ */ new Set();
      seenIds.add(this.localPlayer.id);
      for (const rp of this.remotePlayers.values()) {
        if (!seenIds.has(rp.id)) {
          seenIds.add(rp.id);
          let displayName = rp.name;
          if (displayName.includes("Lovanga")) {
            displayName = "Ti\xEAn tri Lovanga";
          }
          entities.push({
            id: rp.id,
            name: displayName,
            x: rp.x,
            y: rp.y,
            wearing: rp.wearing,
            direct: rp.direct,
            frame: rp.frame || 0,
            isLocal: false,
            chatMessage: rp.chatMessage,
            feelId: rp.feelId
          });
        }
      }
      for (const npc of this.mapNpcs) {
        if (!seenIds.has(npc.id) && !seenIds.has(npc.targetId)) {
          const alreadyPresent = entities.some(
            (e) => e.name.toLowerCase().replace(/[^a-z0-9]/g, "") === npc.name.toLowerCase().replace(/[^a-z0-9]/g, "")
          );
          if (!alreadyPresent) {
            seenIds.add(npc.id);
            entities.push({
              id: npc.id,
              name: npc.name,
              x: npc.x,
              y: npc.y,
              wearing: npc.wearing,
              direct: 0,
              frame: 0,
              isLocal: false,
              chatMessage: npc.chatMessage
            });
          }
        }
      }
      entities.sort((a, b) => a.y - b.y);
      for (const ent of entities) {
        const screenX = ent.x - camX;
        const screenY = ent.y - camY;
        if (screenX >= -50 && screenX <= screenW + 50 && screenY >= -60 && screenY <= screenH + 60) {
          AvatarRenderer.paintAvatar(
            g,
            screenX,
            screenY,
            ent.wearing,
            ent.direct,
            ent.frame,
            ent.name,
            ent.isLocal,
            this.font,
            ent.chatMessage
          );
          if (ent.feelId !== void 0 && ent.feelId >= 0 && ent.feelId < this.emoteOptions.length) {
            const emote = this.emoteOptions[ent.feelId];
            const bx = screenX - 12;
            const by = screenY - 65;
            g.setColor(16777215);
            g.fillRoundRect(bx, by, 24, 20, 6);
            g.setColor(35020);
            g.drawRoundRect(bx, by, 24, 20, 6);
            if (this.font) {
              this.font.drawString(g, emote.icon, screenX, by + 3, 2);
            }
          }
        }
      }
      g.setColor(988970);
      g.fillRect(0, 0, screenW, 26);
      g.setColor(1976635);
      g.drawLine(0, 26, screenW, 26);
      g.setColor(1402304);
      g.fillRoundRect(6, 3, 44, 20, 4);
      g.setColor(9489145);
      g.drawRoundRect(6, 3, 44, 20, 4);
      if (this.font) {
        this.font.drawString(g, "MENU", 28, 7, 2);
      }
      g.setColor(165063);
      g.fillRoundRect(54, 3, 22, 20, 4);
      g.setColor(8246268);
      g.drawRoundRect(54, 3, 22, 20, 4);
      if (this.font) {
        this.font.drawString(g, "\u2709", 65, 6, 2);
      }
      g.setColor(15680580);
      g.fillArc(70, 2, 6, 6, 0, 360);
      g.setColor(2001125);
      g.fillRoundRect(80, 3, 22, 20, 4);
      g.setColor(12312315);
      g.drawRoundRect(80, 3, 22, 20, 4);
      if (this.font) {
        this.font.drawString(g, "\u{1F4AC}", 91, 6, 2);
      }
      g.setColor(1013358);
      g.fillRoundRect(screenW - 80, 3, 22, 20, 4);
      g.setColor(6220500);
      g.drawRoundRect(screenW - 80, 3, 22, 20, 4);
      if (this.font) {
        this.font.drawString(g, "\u{1F9ED}", screenW - 69, 6, 2);
      }
      g.setColor(this.isRunningFast ? 16088064 : 3359061);
      g.fillRoundRect(screenW - 54, 3, 22, 20, 4);
      g.setColor(this.isRunningFast ? 16769154 : 6583435);
      g.drawRoundRect(screenW - 54, 3, 22, 20, 4);
      if (this.font) {
        this.font.drawString(g, "\u{1F3C3}", screenW - 43, 6, 2);
      }
      g.setColor(14251782);
      g.fillRoundRect(screenW - 28, 3, 22, 20, 4);
      g.setColor(16639626);
      g.drawRoundRect(screenW - 28, 3, 22, 20, 4);
      if (this.font) {
        this.font.drawString(g, "\u{1F60A}", screenW - 17, 6, 2);
      }
      const tickerClipX = 108;
      const tickerClipW = Math.max(40, screenW - 196);
      g.setColor(132631);
      g.fillRect(tickerClipX, 3, tickerClipW, 20);
      g.setColor(1976635);
      g.drawRect(tickerClipX, 3, tickerClipW, 20);
      const ctx = g.ctx;
      if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(tickerClipX + 2, 3, tickerClipW - 4, 20);
        ctx.clip();
        ctx.font = "bold 11px Arial, sans-serif";
        ctx.fillStyle = "#fde047";
        ctx.textBaseline = "middle";
        ctx.fillText(this.tickerText, this.tickerX, 13);
        ctx.restore();
      }
      if (this.img12Plus) {
        g.drawImage(this.img12Plus, 6, screenH - 24, 0);
      } else {
        g.setColor(2171169);
        g.fillRoundRect(6, screenH - 22, 28, 18, 3);
        g.setColor(16777215);
        g.drawRoundRect(6, screenH - 22, 28, 18, 3);
        if (this.font) {
          this.font.drawString(g, "12+", 20, screenH - 19, 2);
        }
      }
      g.setColor(988970);
      g.fillRect(40, screenH - 24, screenW - 40, 24);
      g.setColor(1976635);
      g.drawLine(0, screenH - 24, screenW, screenH - 24);
      if (ctx) {
        ctx.save();
        ctx.font = "bold 11px Arial, sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText("Chat (C)", 46, screenH - 12);
        ctx.textAlign = "center";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(`Khu ${this.currentAreaId} | ${this.remotePlayers.size + 1} online`, Math.floor(screenW / 2), screenH - 12);
        ctx.textAlign = "right";
        ctx.fillStyle = "#f87171";
        ctx.fillText("R\u1EDDi khu", screenW - 32, screenH - 12);
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText("\u26F6", screenW - 12, screenH - 12);
        ctx.restore();
      }
      if (this.isMenuOpen) {
        const mw = 170;
        const mh = this.menuOptions.length * 24 + 16;
        const mx = 6;
        const my = 28;
        this.skinPainter.paintWindow(g, mx, my, mw, mh);
        if (this.font) {
          for (let i = 0; i < this.menuOptions.length; i++) {
            const iy = my + 8 + i * 24;
            this.font.drawString(g, this.menuOptions[i], mx + 12, iy + 4, 0);
          }
        }
      }
      if (this.isEmoteOpen) {
        const ew = 150;
        const eh = 60;
        const ex = screenW - ew - 6;
        const ey = 28;
        this.skinPainter.paintWindow(g, ex, ey, ew, eh);
        if (this.font) {
          for (let i = 0; i < this.emoteOptions.length; i++) {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const iconX = ex + 10 + col * 46;
            const iconY = ey + 8 + row * 25;
            this.font.drawString(g, `${this.emoteOptions[i].icon}`, iconX + 16, iconY, 2);
          }
        }
      }
      if (this.activeDialog) {
        const dw = 250;
        const dh = this.activeDialog.options.length * 24 + 36;
        const dx = Math.floor((screenW - dw) / 2);
        const dy = Math.floor((screenH - dh) / 2);
        this.skinPainter.paintWindow(g, dx, dy, dw, dh);
        if (this.font) {
          this.font.drawString(g, "--- H\u1ED8I THO\u1EA0I NPC ---", Math.floor(screenW / 2), dy + 8, 2);
          for (let i = 0; i < this.activeDialog.options.length; i++) {
            const iy = dy + 28 + i * 24;
            g.setColor(21879);
            g.fillRoundRect(dx + 10, iy, dw - 20, 20, 3);
            this.font.drawString(g, `[${i + 1}] ${this.activeDialog.options[i]}`, dx + 16, iy + 3, 0);
          }
        }
      }
      if (this.isChestOpen) {
        const cw = 250;
        const ch = 180;
        const cx = Math.floor((screenW - cw) / 2);
        const cy = Math.floor((screenH - ch) / 2);
        this.skinPainter.paintWindow(g, cx, cy, cw, ch);
        if (this.font) {
          this.font.drawString(g, `R\u01AF\u01A0NG \u0110\u1ED2 (${this.chestItems.length} M\xD3N)`, Math.floor(screenW / 2), cy + 8, 2);
          g.setColor(15022389);
          this.font.drawString(g, "[X]", cx + cw - 18, cy + 8, 0);
          for (let i = 0; i < Math.min(15, this.chestItems.length); i++) {
            const it = this.chestItems[i];
            const col = i % 5;
            const row = Math.floor(i / 5);
            const bx = cx + 12 + col * 44;
            const by = cy + 28 + row * 44;
            g.setColor(2241348);
            g.fillRoundRect(bx, by, 38, 38, 4);
            g.setColor(4491434);
            g.drawRoundRect(bx, by, 38, 38, 4);
            this.font.drawString(g, `#${it.id}`, bx + 4, by + 4, 0);
            this.font.drawString(g, `${it.reliability}%`, bx + 4, by + 22, 0);
          }
        }
      }
      if (this.selectedTargetPlayer) {
        const tw = 150;
        const th = 105;
        const tx = Math.floor((screenW - tw) / 2);
        const ty = Math.floor((screenH - th) / 2);
        this.skinPainter.paintWindow(g, tx, ty, tw, th);
        if (this.font) {
          this.font.drawString(g, this.selectedTargetPlayer.name, Math.floor(screenW / 2), ty + 6, 2);
          const actions = ["\u{1F48B} H\xF4n", "\u{1F917} \xD4m", "\u{1F91D} B\u1EAFt tay"];
          for (let i = 0; i < actions.length; i++) {
            const ay = ty + 26 + i * 24;
            g.setColor(3359829);
            g.fillRoundRect(tx + 8, ay, tw - 16, 20, 3);
            this.font.drawString(g, actions[i], tx + 14, ay + 3, 0);
          }
        }
      }
      if (this.activeActionAnimation && this.activeActionAnimation.tick > 0) {
        this.activeActionAnimation.tick--;
        const targetP = this.remotePlayers.get(this.activeActionAnimation.toId);
        if (targetP) {
          const tx = targetP.x - camX;
          const ty = targetP.y - camY - 60 - (40 - this.activeActionAnimation.tick);
          if (this.font) {
            this.font.drawString(g, "\u{1F496} \u2764\uFE0F \u{1F48B} \u2764\uFE0F \u{1F496}", tx, ty, 2);
          }
        }
      }
    }
  };

  // packages/game-client/src/web-entry.ts
  async function startWebClient() {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) {
      console.error("Canvas #gameCanvas not found!");
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const midlet = new GameMidlet(ctx);
    window.gameMidlet = midlet;
    const wsHost = window.location.hostname || "127.0.0.1";
    const gatewayUrl = `ws://${wsHost}:19129`;
    const network = new NetworkSession(gatewayUrl);
    window.networkSession = network;
    try {
      const [logoRes, fontMetaRes, fontPngRes] = await Promise.all([
        fetch("/assets/normal/lg.png").then((r) => r.arrayBuffer()),
        fetch("/assets/normal/font/normal").then((r) => r.arrayBuffer()),
        fetch("/assets/font/0.png").then((r) => r.arrayBuffer())
      ]);
      await midlet.initAssets(
        new Uint8Array(logoRes),
        new Uint8Array(fontMetaRes),
        new Uint8Array(fontPngRes)
      );
    } catch (err) {
      console.warn("Assets loading warning:", err);
    }
    const worldScreen = new GameWorldScreen(network, midlet.skinPainter, midlet.font);
    window.gameWorldScreen = worldScreen;
    midlet.canvas.setCurrentScreen(midlet.loginScreen);
    window.__SCENE = "login";
    let cachedUserData = null;
    const showWorldMap = () => {
      midlet.canvas.setCurrentScreen(midlet.worldMapScreen);
      window.__SCENE = "worldmap";
      const chatBar = document.getElementById("in-game-chat-bar");
      if (chatBar) chatBar.style.display = "none";
      resizeCanvas();
      const statusEl = document.getElementById("login-status") || document.getElementById("gamePlayerInfo");
      if (statusEl) {
        statusEl.textContent = `Ng\u01B0\u1EDDi ch\u01A1i: ${worldScreen.localPlayer.name} | Vui l\xF2ng ch\u1ECDn 1 trong 8 khu v\u1EF1c tr\xEAn b\u1EA3n \u0111\u1ED3`;
        statusEl.style.color = "#facc15";
      }
    };
    midlet.worldMapScreen.onSelectRegion = (region) => {
      console.log(`[WebClient] Entering Region: ${region.name} (Map ${region.mapId})`);
      midlet.canvas.setCurrentScreen(worldScreen);
      window.__SCENE = "world";
      const chatBar = document.getElementById("in-game-chat-bar");
      if (chatBar) chatBar.style.display = "flex";
      resizeCanvas();
      const statusEl = document.getElementById("login-status") || document.getElementById("gamePlayerInfo");
      if (statusEl) {
        const xuFormatted = Number(cachedUserData?.xu || 0).toLocaleString("vi-VN");
        statusEl.textContent = `Ng\u01B0\u1EDDi ch\u01A1i: ${worldScreen.localPlayer.name} | B\u1EA3n \u0111\u1ED3: ${region.name} | Xu: ${xuFormatted}`;
        statusEl.style.color = "#38bdf8";
      }
      worldScreen.currentMapId = region.mapId;
      worldScreen.localPlayer.x = region.spawnX;
      worldScreen.localPlayer.y = region.spawnY;
      network.sendJoinPark(region.mapId, 0, region.spawnX, region.spawnY);
    };
    midlet.worldMapScreen.onBackToHome = () => {
      console.log("[WebClient] Back to home requested from World Map");
      if (typeof window.closeGame === "function") {
        window.closeGame();
      } else {
        const modal = document.getElementById("game-modal");
        if (modal) modal.style.display = "none";
        const fab = document.getElementById("floatingPlayBtn");
        if (fab) fab.style.display = "inline-flex";
      }
    };
    window.openWorldMap = showWorldMap;
    network.on("login_success", (userData) => {
      console.log("[WebClient] Logged in successfully!", userData);
      cachedUserData = userData;
      worldScreen.localPlayer.id = userData.id;
      worldScreen.localPlayer.name = document.getElementById("usernameInput")?.value || "T\xF4i";
      worldScreen.localPlayer.gender = userData.gender;
      worldScreen.localPlayer.wearing = userData.wearing || [];
      const loginOverlay = document.getElementById("login-overlay");
      if (loginOverlay) loginOverlay.style.display = "none";
      showWorldMap();
    });
    network.on("login_fail", (reason) => {
      alert(`\u0110\u0103ng nh\u1EADp th\u1EA5t b\u1EA1i: ${reason}`);
      const statusEl = document.getElementById("login-status");
      if (statusEl) {
        statusEl.textContent = `Th\u1EA5t b\u1EA1i: ${reason}`;
        statusEl.style.color = "#FF4444";
      }
    });
    network.on("disconnect", () => {
      const statusEl = document.getElementById("login-status");
      if (statusEl) {
        statusEl.textContent = "M\u1EA5t k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7! \u0110ang t\u1EF1 \u0111\u1ED9ng k\u1EBFt n\u1ED1i l\u1EA1i...";
        statusEl.style.color = "#FFA500";
      }
      setTimeout(() => {
        network.connect().catch(() => {
        });
      }, 2e3);
    });
    try {
      await network.connect();
      console.log("[WebClient] Gateway connection established!");
    } catch (err) {
      console.warn("[WebClient] Gateway connect pending:", err);
    }
    window.loginWithCredentials = (username, pass) => {
      const statusEl = document.getElementById("login-status") || document.getElementById("gamePlayerInfo");
      worldScreen.localPlayer.name = username;
      const doSend = () => {
        if (statusEl) {
          statusEl.textContent = `\u0110ang g\u1EEDi \u0111\u0103ng nh\u1EADp t\xE0i kho\u1EA3n "${username}"...`;
          statusEl.style.color = "#00E5FF";
        }
        network.sendLogin(username, pass);
      };
      if (!network.isConnected) {
        if (statusEl) {
          statusEl.textContent = "\u0110ang k\u1EBFt n\u1ED1i t\u1EDBi m\xE1y ch\u1EE7...";
          statusEl.style.color = "#FFA500";
        }
        network.connect().then(() => {
          if (network.isHandshakeDone) {
            doSend();
          } else {
            network.on("handshake_done", () => doSend());
          }
        }).catch((err) => {
          if (statusEl) {
            statusEl.textContent = "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i WebSocket Gateway!";
            statusEl.style.color = "#FF4444";
          }
          console.error("[WebClient] Connect error:", err);
        });
        return;
      }
      if (!network.isHandshakeDone) {
        if (statusEl) {
          statusEl.textContent = "\u0110ang ho\xE0n t\u1EA5t b\u1EAFt tay m\xE3 h\xF3a...";
          statusEl.style.color = "#FFA500";
        }
        network.on("handshake_done", () => doSend());
        return;
      }
      doSend();
    };
    function resizeCanvas() {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      const winW = Math.floor(rect.width > 0 ? rect.width : window.innerWidth);
      const winH = Math.floor(rect.height > 0 ? rect.height : window.innerHeight);
      const scale = Math.max(1, Math.round(winH / 340));
      const logicalW = Math.max(320, Math.round(winW / scale));
      const logicalH = Math.max(240, Math.round(winH / scale));
      canvas.width = logicalW;
      canvas.height = logicalH;
      midlet.canvas.resize(logicalW, logicalH);
      ctx.imageSmoothingEnabled = false;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    window.toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
        });
      } else {
        document.exitFullscreen().catch(() => {
        });
      }
    };
    function getCanvasCoords(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = Math.floor((clientX - rect.left) * scaleX);
      const y = Math.floor((clientY - rect.top) * scaleY);
      return {
        x: Math.max(0, Math.min(canvas.width - 1, x)),
        y: Math.max(0, Math.min(canvas.height - 1, y))
      };
    }
    canvas.addEventListener("pointerdown", (e) => {
      canvas.focus();
      const coords = getCanvasCoords(e.clientX, e.clientY);
      midlet.canvas.pointerPressed(coords.x, coords.y);
    });
    canvas.addEventListener("pointermove", (e) => {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      if (e.buttons > 0) {
        midlet.canvas.pointerDragged(coords.x, coords.y);
      } else {
        midlet.canvas.pointerMoved(coords.x, coords.y);
      }
    });
    canvas.addEventListener("pointerup", (e) => {
      const coords = getCanvasCoords(e.clientX, e.clientY);
      midlet.canvas.pointerReleased(coords.x, coords.y);
    });
    window.addEventListener("keydown", (e) => {
      if (document.activeElement && document.activeElement.tagName === "INPUT") {
        if (e.key === "Enter") {
          const btn = document.getElementById("loginBtn");
          if (btn) btn.click();
        }
        return;
      }
      let keyCode = 0;
      switch (e.key) {
        case "ArrowUp":
        case "2":
        case "w":
        case "W":
          keyCode = 50;
          break;
        case "ArrowDown":
        case "8":
        case "s":
        case "S":
          keyCode = 56;
          break;
        case "ArrowLeft":
        case "4":
        case "a":
        case "A":
          keyCode = 52;
          break;
        case "ArrowRight":
        case "6":
        case "d":
        case "D":
          keyCode = 54;
          break;
        case "Enter":
        case "5":
          keyCode = 13;
          break;
        case "c":
        case "C":
          if (window.__SCENE === "world") {
            const chatInput = document.getElementById("in-game-chat-input");
            if (chatInput) {
              e.preventDefault();
              chatInput.focus();
              return;
            }
          }
          keyCode = 67;
          break;
        case "q":
        case "Q":
          keyCode = -6;
          break;
        case "e":
        case "E":
          keyCode = -7;
          break;
      }
      if (keyCode !== 0) {
        midlet.canvas.keyPressed(keyCode);
      }
    });
    midlet.start();
    window.__READY = true;
    console.log("[WebClient] Avatar 258 WebGL Native Client running at 20 FPS.");
  }
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", startWebClient);
  } else {
    startWebClient();
  }
})();
//# sourceMappingURL=app.js.map

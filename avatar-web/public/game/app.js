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

  // packages/j2me-compat/dist/graphics/IRenderBackend.js
  var require_IRenderBackend = __commonJS({
    "packages/j2me-compat/dist/graphics/IRenderBackend.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // packages/j2me-compat/dist/image/Image.js
  var require_Image = __commonJS({
    "packages/j2me-compat/dist/image/Image.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Image = void 0;
      var Image10 = class _Image {
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
      exports.Image = Image10;
    }
  });

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
      var Graphics9 = class _Graphics {
        static HCENTER = 1;
        static VCENTER = 2;
        static LEFT = 4;
        static RIGHT = 8;
        static TOP = 16;
        static BOTTOM = 32;
        static BASELINE = 64;
        backend;
        ctx;
        tx = 0;
        ty = 0;
        clipX = 0;
        clipY = 0;
        clipW = 99999;
        clipH = 99999;
        currentColor = 0;
        constructor(target) {
          if (!target)
            return;
          if ("fillRect" in target && "drawRegion" in target && "flush" in target) {
            this.backend = target;
            const webgl = target;
            if (webgl.textCtx) {
              this.ctx = new Proxy(webgl.textCtx, {
                get(tgt, prop) {
                  webgl.markTextUsed();
                  const val = tgt[prop];
                  return typeof val === "function" ? val.bind(tgt) : val;
                },
                set(tgt, prop, value) {
                  webgl.markTextUsed();
                  tgt[prop] = value;
                  return true;
                }
              });
            }
          } else {
            this.ctx = target;
          }
        }
        beginFrame(width, height) {
          if (this.backend?.beginFrame) {
            this.backend.beginFrame(width, height);
          } else if (this.ctx) {
            this.ctx.restore();
            this.ctx.save();
            this.ctx.clearRect(0, 0, width, height);
            this.tx = 0;
            this.ty = 0;
          }
        }
        endFrame() {
          if (this.backend?.endFrame) {
            this.backend.endFrame();
          }
        }
        flush() {
          if (this.backend?.flush) {
            this.backend.flush();
          }
        }
        getMetrics() {
          if (this.backend?.getMetrics) {
            return this.backend.getMetrics();
          }
          return { drawCalls: 1, quadCount: 0, batchCount: 1 };
        }
        translate(x, y) {
          this.tx += x;
          this.ty += y;
          if (this.backend) {
            this.backend.translate(x, y);
          }
        }
        getTranslateX() {
          return this.backend ? this.backend.getTranslateX() : this.tx;
        }
        getTranslateY() {
          return this.backend ? this.backend.getTranslateY() : this.ty;
        }
        setColor(rgb) {
          this.currentColor = rgb;
          if (this.backend) {
            this.backend.setColor(rgb);
          } else if (this.ctx) {
            const r = rgb >> 16 & 255;
            const g = rgb >> 8 & 255;
            const b = rgb & 255;
            const colorStr = `rgb(${r},${g},${b})`;
            this.ctx.fillStyle = colorStr;
            this.ctx.strokeStyle = colorStr;
          }
        }
        getColor() {
          return this.backend ? this.backend.getColor() : this.currentColor;
        }
        setClip(x, y, width, height) {
          this.clipX = x;
          this.clipY = y;
          this.clipW = width;
          this.clipH = height;
          if (this.backend) {
            this.backend.setClip(x, y, width, height);
          } else if (this.ctx) {
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
          return this.backend ? this.backend.getClipX() : this.clipX;
        }
        getClipY() {
          return this.backend ? this.backend.getClipY() : this.clipY;
        }
        getClipWidth() {
          return this.backend ? this.backend.getClipWidth() : this.clipW;
        }
        getClipHeight() {
          return this.backend ? this.backend.getClipHeight() : this.clipH;
        }
        fillRect(x, y, width, height) {
          if (this.backend) {
            this.backend.fillRect(x, y, width, height);
          } else if (this.ctx) {
            this.ctx.fillRect(x, y, width, height);
          }
        }
        drawRect(x, y, width, height) {
          if (this.backend) {
            this.backend.drawRect(x, y, width, height);
          } else if (this.ctx) {
            this.ctx.strokeRect(x, y, width, height);
          }
        }
        drawRoundRect(x, y, width, height, arcWidth, arcHeight = arcWidth) {
          if (this.backend) {
            this.backend.drawRoundRect(x, y, width, height, arcWidth, arcHeight);
          } else if (this.ctx) {
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
          if (this.backend) {
            this.backend.fillRoundRect(x, y, width, height, arcWidth, arcHeight);
          } else if (this.ctx) {
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
          if (this.backend) {
            this.backend.fillArc(x, y, width, height, startAngle, arcAngle);
          } else if (this.ctx) {
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
          if (this.backend) {
            this.backend.drawArc(x, y, width, height, startAngle, arcAngle);
          } else if (this.ctx) {
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
          if (this.backend) {
            this.backend.drawLine(x1, y1, x2, y2);
          } else if (this.ctx) {
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
          if (this.backend) {
            this.backend.drawImage(image, x, y, anchor);
            return;
          }
          const pt = this.calculateAnchor(x, y, image.width || image.naturalWidth || 0, image.height || image.naturalHeight || 0, anchor);
          const el = image.element || image;
          if (this.ctx && el) {
            this.ctx.drawImage(el, 0, 0, image.width, image.height, pt.x, pt.y, image.width, image.height);
          }
        }
        drawScaledImage(image, x, y, width, height, anchor = 0) {
          if (this.backend) {
            this.backend.drawScaledImage(image, x, y, width, height, anchor);
            return;
          }
          const pt = this.calculateAnchor(x, y, width, height, anchor);
          const el = image.element || image;
          if (this.ctx && el) {
            this.ctx.drawImage(el, 0, 0, image.width || width, image.height || height, pt.x, pt.y, width, height);
          }
        }
        drawRegion(image, x_src, y_src, width, height, transform, x_dst, y_dst, anchor = 0) {
          if (this.backend) {
            this.backend.drawRegion(image, x_src, y_src, width, height, transform, x_dst, y_dst, anchor);
            return;
          }
          let destW = width;
          let destH = height;
          if (transform === Sprite_js_1.Sprite.TRANS_ROT90 || transform === Sprite_js_1.Sprite.TRANS_ROT270 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT90 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT270) {
            destW = height;
            destH = width;
          }
          const pt = this.calculateAnchor(x_dst, y_dst, destW, destH, anchor);
          const el = image.element || image;
          if (!this.ctx || !el) {
            return;
          }
          if (transform === Sprite_js_1.Sprite.TRANS_NONE) {
            this.ctx.drawImage(el, x_src, y_src, width, height, pt.x, pt.y, width, height);
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
          this.ctx.drawImage(el, x_src, y_src, width, height, -width / 2, -height / 2, width, height);
          this.ctx.restore();
        }
      };
      exports.Graphics = Graphics9;
    }
  });

  // packages/j2me-compat/dist/graphics/WebGL2Renderer.js
  var require_WebGL2Renderer = __commonJS({
    "packages/j2me-compat/dist/graphics/WebGL2Renderer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.WebGL2Renderer = void 0;
      var Image_js_1 = require_Image();
      var Sprite_js_1 = require_Sprite();
      var Graphics_js_1 = require_Graphics();
      var VERTEX_SHADER_SRC = `#version 300 es
precision highp float;

layout(location = 0) in vec2 a_position;
layout(location = 1) in vec2 a_texcoord;
layout(location = 2) in vec4 a_color;
layout(location = 3) in float a_texid;

uniform vec2 u_resolution;

out vec2 v_texcoord;
out vec4 v_color;
out float v_texid;

void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace.x, -clipSpace.y, 0.0, 1.0);

  v_texcoord = a_texcoord;
  v_color = a_color;
  v_texid = a_texid;
}
`;
      var FRAGMENT_SHADER_SRC = `#version 300 es
precision mediump float;

in vec2 v_texcoord;
in vec4 v_color;
in float v_texid;

uniform sampler2D u_textures[8];

out vec4 fragColor;

void main() {
  int tid = int(round(v_texid));
  vec4 texColor = vec4(1.0);

  if (tid == 0) {
    texColor = texture(u_textures[0], v_texcoord);
  } else if (tid == 1) {
    texColor = texture(u_textures[1], v_texcoord);
  } else if (tid == 2) {
    texColor = texture(u_textures[2], v_texcoord);
  } else if (tid == 3) {
    texColor = texture(u_textures[3], v_texcoord);
  } else if (tid == 4) {
    texColor = texture(u_textures[4], v_texcoord);
  } else if (tid == 5) {
    texColor = texture(u_textures[5], v_texcoord);
  } else if (tid == 6) {
    texColor = texture(u_textures[6], v_texcoord);
  } else if (tid == 7) {
    texColor = texture(u_textures[7], v_texcoord);
  }

  vec4 finalColor = (tid < 0) ? v_color : (texColor * v_color);
  if (finalColor.a < 0.005) {
    discard;
  }
  fragColor = finalColor;
}
`;
      var MAX_QUADS = 4096;
      var FLOATS_PER_VERTEX = 9;
      var VERTICES_PER_QUAD = 4;
      var FLOATS_PER_QUAD = FLOATS_PER_VERTEX * VERTICES_PER_QUAD;
      var INDICES_PER_QUAD = 6;
      var WebGL2Renderer2 = class {
        gl;
        program;
        uResolutionLoc = null;
        uTexturesLoc = null;
        vao = null;
        vbo = null;
        ibo = null;
        vertexData;
        quadCount = 0;
        // Multi-texture slot assignment (0..7)
        activeTextures = [null, null, null, null, null, null, null, null];
        activeTextureElements = [null, null, null, null, null, null, null, null];
        textureCache = /* @__PURE__ */ new WeakMap();
        // Context Loss & Recovery
        isContextLost = false;
        onContextLostHandler;
        onContextRestoredHandler;
        // 2D Text Overlay Canvas for seamless J2ME/Canvas 2D compatibility
        textCanvas = null;
        textCtx = null;
        has2DText = false;
        // Metrics
        metrics = {
          drawCalls: 0,
          quadCount: 0,
          batchCount: 0
        };
        // State
        width = 1024;
        height = 768;
        tx = 0;
        ty = 0;
        currentColor = 0;
        currentR = 0;
        currentG = 0;
        currentB = 0;
        currentA = 1;
        clipX = 0;
        clipY = 0;
        clipW = 99999;
        clipH = 99999;
        isClipping = false;
        constructor(gl) {
          this.gl = gl;
          this.vertexData = new Float32Array(MAX_QUADS * FLOATS_PER_QUAD);
          this.rebuildContext();
          this.onContextLostHandler = (e) => {
            e.preventDefault();
            this.isContextLost = true;
            console.warn("[WebGL2Renderer] WebGL Context Lost! Freeing GPU resources.");
          };
          this.onContextRestoredHandler = () => {
            console.log("[WebGL2Renderer] WebGL Context Restored! Rebuilding shaders, buffers, and textures.");
            this.rebuildContext();
            this.isContextLost = false;
          };
          const canvas = this.gl.canvas;
          if (canvas && typeof canvas.addEventListener === "function") {
            canvas.addEventListener("webglcontextlost", this.onContextLostHandler);
            canvas.addEventListener("webglcontextrestored", this.onContextRestoredHandler);
          }
          if (typeof document !== "undefined") {
            this.textCanvas = document.createElement("canvas");
            this.textCanvas.width = this.width;
            this.textCanvas.height = this.height;
            this.textCtx = this.textCanvas.getContext("2d");
          }
        }
        markTextUsed() {
          this.has2DText = true;
        }
        rebuildContext() {
          const gl = this.gl;
          this.program = this.createProgram(VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
          this.initBuffers();
          this.initGLState();
          this.textureCache = /* @__PURE__ */ new WeakMap();
          this.activeTextures.fill(null);
          this.activeTextureElements.fill(null);
          this.quadCount = 0;
        }
        dispose() {
          const canvas = this.gl.canvas;
          if (canvas && typeof canvas.removeEventListener === "function") {
            canvas.removeEventListener("webglcontextlost", this.onContextLostHandler);
            canvas.removeEventListener("webglcontextrestored", this.onContextRestoredHandler);
          }
          const gl = this.gl;
          if (this.program)
            gl.deleteProgram(this.program);
          if (this.vbo)
            gl.deleteBuffer(this.vbo);
          if (this.ibo)
            gl.deleteBuffer(this.ibo);
          if (this.vao)
            gl.deleteVertexArray(this.vao);
          this.textureCache = /* @__PURE__ */ new WeakMap();
        }
        createShader(type, src) {
          const gl = this.gl;
          const shader = gl.createShader(type);
          if (!shader)
            throw new Error("Failed to create WebGL shader");
          gl.shaderSource(shader, src);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const err = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Shader compile error: ${err}`);
          }
          return shader;
        }
        createProgram(vertSrc, fragSrc) {
          const gl = this.gl;
          const vs = this.createShader(gl.VERTEX_SHADER, vertSrc);
          const fs = this.createShader(gl.FRAGMENT_SHADER, fragSrc);
          const prog = gl.createProgram();
          if (!prog)
            throw new Error("Failed to create WebGL program");
          gl.attachShader(prog, vs);
          gl.attachShader(prog, fs);
          gl.linkProgram(prog);
          if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            const err = gl.getProgramInfoLog(prog);
            gl.deleteProgram(prog);
            throw new Error(`Program link error: ${err}`);
          }
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          this.uResolutionLoc = gl.getUniformLocation(prog, "u_resolution");
          this.uTexturesLoc = gl.getUniformLocation(prog, "u_textures");
          return prog;
        }
        initBuffers() {
          const gl = this.gl;
          this.vao = gl.createVertexArray();
          gl.bindVertexArray(this.vao);
          this.vbo = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
          gl.bufferData(gl.ARRAY_BUFFER, this.vertexData.byteLength, gl.DYNAMIC_DRAW);
          const indexData = new Uint16Array(MAX_QUADS * INDICES_PER_QUAD);
          for (let i = 0; i < MAX_QUADS; i++) {
            const vOff = i * 4;
            const iOff = i * 6;
            indexData[iOff + 0] = vOff + 0;
            indexData[iOff + 1] = vOff + 1;
            indexData[iOff + 2] = vOff + 2;
            indexData[iOff + 3] = vOff + 2;
            indexData[iOff + 4] = vOff + 3;
            indexData[iOff + 5] = vOff + 0;
          }
          this.ibo = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ibo);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);
          const stride = FLOATS_PER_VERTEX * 4;
          gl.enableVertexAttribArray(0);
          gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);
          gl.enableVertexAttribArray(1);
          gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 8);
          gl.enableVertexAttribArray(2);
          gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 16);
          gl.enableVertexAttribArray(3);
          gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 32);
          gl.bindVertexArray(null);
        }
        initGLState() {
          const gl = this.gl;
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.disable(gl.DEPTH_TEST);
        }
        beginFrame(width, height) {
          if (this.isContextLost)
            return;
          this.width = width;
          this.height = height;
          const gl = this.gl;
          gl.viewport(0, 0, width, height);
          gl.useProgram(this.program);
          if (this.uResolutionLoc) {
            gl.uniform2f(this.uResolutionLoc, width, height);
          }
          if (this.uTexturesLoc) {
            gl.uniform1iv(this.uTexturesLoc, [0, 1, 2, 3, 4, 5, 6, 7]);
          }
          this.metrics.drawCalls = 0;
          this.metrics.quadCount = 0;
          this.metrics.batchCount = 0;
          this.tx = 0;
          this.ty = 0;
          this.clipX = 0;
          this.clipY = 0;
          this.clipW = width;
          this.clipH = height;
          this.isClipping = false;
          gl.disable(gl.SCISSOR_TEST);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          if (this.textCanvas && this.textCtx) {
            if (this.textCanvas.width !== width || this.textCanvas.height !== height) {
              this.textCanvas.width = width;
              this.textCanvas.height = height;
            } else {
              this.textCtx.clearRect(0, 0, width, height);
            }
            this.has2DText = false;
          }
        }
        endFrame() {
          if (this.isContextLost)
            return;
          this.flush();
          if (this.isClipping) {
            this.gl.disable(this.gl.SCISSOR_TEST);
            this.isClipping = false;
          }
          if (this.textCanvas && this.has2DText) {
            const tex = this.getOrCreateTexture(this.textCanvas);
            if (tex) {
              const gl = this.gl;
              gl.bindTexture(gl.TEXTURE_2D, tex);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textCanvas);
              const slot = this.assignTextureSlot(tex, this.textCanvas);
              this.addQuad(0, 0, 0, 0, this.width, 0, 1, 0, this.width, this.height, 1, 1, 0, this.height, 0, 1, 1, 1, 1, 1, slot);
              this.flush();
            }
          }
        }
        flush() {
          if (this.isContextLost)
            return;
          if (this.quadCount === 0)
            return;
          const gl = this.gl;
          gl.useProgram(this.program);
          gl.bindVertexArray(this.vao);
          gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
          const subLength = this.quadCount * FLOATS_PER_QUAD;
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexData.subarray(0, subLength));
          for (let slot = 0; slot < 8; slot++) {
            gl.activeTexture(gl.TEXTURE0 + slot);
            gl.bindTexture(gl.TEXTURE_2D, this.activeTextures[slot]);
          }
          const indexCount = this.quadCount * INDICES_PER_QUAD;
          gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
          this.metrics.drawCalls++;
          this.metrics.quadCount += this.quadCount;
          this.metrics.batchCount++;
          this.quadCount = 0;
          for (let i = 0; i < 8; i++) {
            this.activeTextures[i] = null;
            this.activeTextureElements[i] = null;
          }
          gl.bindVertexArray(null);
        }
        getMetrics() {
          return { ...this.metrics };
        }
        getOrCreateTexture(imageSource) {
          if (!imageSource || this.isContextLost)
            return null;
          if ("complete" in imageSource && !imageSource.complete)
            return null;
          const w = imageSource.naturalWidth || imageSource.width || 0;
          const h = imageSource.naturalHeight || imageSource.height || 0;
          if (w === 0 || h === 0)
            return null;
          let tex = this.textureCache.get(imageSource);
          if (!tex) {
            const gl = this.gl;
            tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageSource);
            this.textureCache.set(imageSource, tex);
          }
          return tex;
        }
        assignTextureSlot(tex, imageElement) {
          for (let i = 0; i < 8; i++) {
            if (this.activeTextures[i] === tex) {
              return i;
            }
          }
          for (let i = 0; i < 8; i++) {
            if (this.activeTextures[i] === null) {
              this.activeTextures[i] = tex;
              this.activeTextureElements[i] = imageElement;
              return i;
            }
          }
          this.flush();
          this.activeTextures[0] = tex;
          this.activeTextureElements[0] = imageElement;
          return 0;
        }
        addQuad(x0, y0, u0, v0, x1, y1, u1, v1, x2, y2, u2, v2, x3, y3, u3, v3, r, g, b, a, texId) {
          if (this.quadCount >= MAX_QUADS) {
            const savedTex = texId >= 0 && texId < 8 ? this.activeTextures[texId] : null;
            const savedEl = texId >= 0 && texId < 8 ? this.activeTextureElements[texId] : null;
            this.flush();
            if (savedTex) {
              texId = this.assignTextureSlot(savedTex, savedEl);
            }
          }
          const off = this.quadCount * FLOATS_PER_QUAD;
          const v = this.vertexData;
          v[off + 0] = x0;
          v[off + 1] = y0;
          v[off + 2] = u0;
          v[off + 3] = v0;
          v[off + 4] = r;
          v[off + 5] = g;
          v[off + 6] = b;
          v[off + 7] = a;
          v[off + 8] = texId;
          v[off + 9] = x1;
          v[off + 10] = y1;
          v[off + 11] = u1;
          v[off + 12] = v1;
          v[off + 13] = r;
          v[off + 14] = g;
          v[off + 15] = b;
          v[off + 16] = a;
          v[off + 17] = texId;
          v[off + 18] = x2;
          v[off + 19] = y2;
          v[off + 20] = u2;
          v[off + 21] = v2;
          v[off + 22] = r;
          v[off + 23] = g;
          v[off + 24] = b;
          v[off + 25] = a;
          v[off + 26] = texId;
          v[off + 27] = x3;
          v[off + 28] = y3;
          v[off + 29] = u3;
          v[off + 30] = v3;
          v[off + 31] = r;
          v[off + 32] = g;
          v[off + 33] = b;
          v[off + 34] = a;
          v[off + 35] = texId;
          this.quadCount++;
        }
        // --- IRenderBackend Implementation ---
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
          this.currentR = (rgb >> 16 & 255) / 255;
          this.currentG = (rgb >> 8 & 255) / 255;
          this.currentB = (rgb & 255) / 255;
          this.currentA = 1;
        }
        getColor() {
          return this.currentColor;
        }
        setClip(x, y, width, height) {
          this.flush();
          this.clipX = x;
          this.clipY = y;
          this.clipW = width;
          this.clipH = height;
          const gl = this.gl;
          const sx = Math.max(0, Math.round(this.tx + x));
          const sy = Math.max(0, Math.round(this.height - (this.ty + y + height)));
          const sw = Math.max(0, Math.round(width));
          const sh = Math.max(0, Math.round(height));
          gl.enable(gl.SCISSOR_TEST);
          gl.scissor(sx, sy, sw, sh);
          this.isClipping = true;
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
          const px = this.tx + x;
          const py = this.ty + y;
          this.addQuad(px, py, 0, 0, px + width, py, 0, 0, px + width, py + height, 0, 0, px, py + height, 0, 0, this.currentR, this.currentG, this.currentB, this.currentA, -1);
        }
        drawRect(x, y, width, height) {
          this.fillRect(x, y, width, 1);
          this.fillRect(x, y + height - 1, width, 1);
          this.fillRect(x, y + 1, 1, Math.max(0, height - 2));
          this.fillRect(x + width - 1, y + 1, 1, Math.max(0, height - 2));
        }
        drawLine(x1, y1, x2, y2) {
          const px1 = this.tx + x1;
          const py1 = this.ty + y1;
          const px2 = this.tx + x2;
          const py2 = this.ty + y2;
          const dx = px2 - px1;
          const dy = py2 - py1;
          const len = Math.hypot(dx, dy);
          if (len === 0) {
            this.fillRect(x1, y1, 1, 1);
            return;
          }
          const nx = -dy / len;
          const ny = dx / len;
          this.addQuad(px1 - nx * 0.5, py1 - ny * 0.5, 0, 0, px2 - nx * 0.5, py2 - ny * 0.5, 0, 0, px2 + nx * 0.5, py2 + ny * 0.5, 0, 0, px1 + nx * 0.5, py1 + ny * 0.5, 0, 0, this.currentR, this.currentG, this.currentB, this.currentA, -1);
        }
        fillRoundRect(x, y, width, height, arcWidth, arcHeight = arcWidth) {
          const r = Math.min(arcWidth, arcHeight) / 2;
          this.fillRect(x + r, y, width - 2 * r, height);
          this.fillRect(x, y + r, r, height - 2 * r);
          this.fillRect(x + width - r, y + r, r, height - 2 * r);
          this.fillRect(x + 1, y + 1, r - 1, r - 1);
          this.fillRect(x + width - r, y + 1, r - 1, r - 1);
          this.fillRect(x + 1, y + height - r, r - 1, r - 1);
          this.fillRect(x + width - r, y + height - r, r - 1, r - 1);
        }
        drawRoundRect(x, y, width, height, arcWidth, arcHeight = arcWidth) {
          const r = Math.min(arcWidth, arcHeight) / 2;
          this.fillRect(x + r, y, width - 2 * r, 1);
          this.fillRect(x + r, y + height - 1, width - 2 * r, 1);
          this.fillRect(x, y + r, 1, height - 2 * r);
          this.fillRect(x + width - 1, y + r, 1, height - 2 * r);
          this.drawLine(x + 1, y + r, x + r, y + 1);
          this.drawLine(x + width - 1, y + r, x + width - r, y + 1);
          this.drawLine(x + 1, y + height - r, x + r, y + height - 1);
          this.drawLine(x + width - 1, y + height - r, x + width - r, y + height - 1);
        }
        fillArc(x, y, width, height, startAngle, arcAngle) {
          const segments = 16;
          const rx = width / 2;
          const ry = height / 2;
          const cx = this.tx + x + rx;
          const cy = this.ty + y + ry;
          const sa = startAngle * Math.PI / 180;
          const ea = (startAngle + arcAngle) * Math.PI / 180;
          const step = (ea - sa) / segments;
          for (let i = 0; i < segments; i++) {
            const a1 = sa + i * step;
            const a2 = sa + (i + 1) * step;
            const p1x = cx + rx * Math.cos(a1);
            const p1y = cy + ry * Math.sin(a1);
            const p2x = cx + rx * Math.cos(a2);
            const p2y = cy + ry * Math.sin(a2);
            this.addQuad(cx, cy, 0, 0, p1x, p1y, 0, 0, p2x, p2y, 0, 0, cx, cy, 0, 0, this.currentR, this.currentG, this.currentB, this.currentA, -1);
          }
        }
        drawArc(x, y, width, height, startAngle, arcAngle) {
          const segments = 16;
          const rx = width / 2;
          const ry = height / 2;
          const cx = x + rx;
          const cy = y + ry;
          const sa = startAngle * Math.PI / 180;
          const ea = (startAngle + arcAngle) * Math.PI / 180;
          const step = (ea - sa) / segments;
          for (let i = 0; i < segments; i++) {
            const a1 = sa + i * step;
            const a2 = sa + (i + 1) * step;
            this.drawLine(cx + rx * Math.cos(a1), cy + ry * Math.sin(a1), cx + rx * Math.cos(a2), cy + ry * Math.sin(a2));
          }
        }
        calculateAnchor(x, y, width, height, anchor) {
          let outX = x;
          let outY = y;
          if ((anchor & Graphics_js_1.Graphics.RIGHT) !== 0) {
            outX -= width;
          } else if ((anchor & Graphics_js_1.Graphics.HCENTER) !== 0) {
            outX -= Math.floor(width / 2);
          }
          if ((anchor & Graphics_js_1.Graphics.BOTTOM) !== 0) {
            outY -= height;
          } else if ((anchor & Graphics_js_1.Graphics.VCENTER) !== 0) {
            outY -= Math.floor(height / 2);
          }
          return { x: outX, y: outY };
        }
        getImageElement(image) {
          if (!image)
            return null;
          if (image instanceof Image_js_1.Image) {
            return image.element;
          }
          if ("naturalWidth" in image || "width" in image) {
            return image;
          }
          return image.element || null;
        }
        getImageDimensions(image) {
          if (image instanceof Image_js_1.Image) {
            return { w: image.width, h: image.height };
          }
          const w = image?.naturalWidth || image?.width || 0;
          const h = image?.naturalHeight || image?.height || 0;
          return { w, h };
        }
        drawImage(image, x, y, anchor = 0) {
          const dim = this.getImageDimensions(image);
          if (dim.w === 0 || dim.h === 0)
            return;
          this.drawScaledImage(image, x, y, dim.w, dim.h, anchor);
        }
        drawScaledImage(image, x, y, width, height, anchor = 0) {
          const el = this.getImageElement(image);
          if (!el)
            return;
          const pt = this.calculateAnchor(x, y, width, height, anchor);
          const px = this.tx + pt.x;
          const py = this.ty + pt.y;
          if (this.quadCount >= MAX_QUADS) {
            this.flush();
          }
          const tex = this.getOrCreateTexture(el);
          if (!tex)
            return;
          const slot = this.assignTextureSlot(tex, el);
          this.addQuad(px, py, 0, 0, px + width, py, 1, 0, px + width, py + height, 1, 1, px, py + height, 0, 1, 1, 1, 1, 1, slot);
        }
        drawRegion(image, x_src, y_src, width, height, transform, x_dst, y_dst, anchor = 0) {
          const el = this.getImageElement(image);
          if (!el)
            return;
          let destW = width;
          let destH = height;
          if (transform === Sprite_js_1.Sprite.TRANS_ROT90 || transform === Sprite_js_1.Sprite.TRANS_ROT270 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT90 || transform === Sprite_js_1.Sprite.TRANS_MIRROR_ROT270) {
            destW = height;
            destH = width;
          }
          const pt = this.calculateAnchor(x_dst, y_dst, destW, destH, anchor);
          const px = this.tx + pt.x;
          const py = this.ty + pt.y;
          if (this.quadCount >= MAX_QUADS) {
            this.flush();
          }
          const tex = this.getOrCreateTexture(el);
          if (!tex)
            return;
          const slot = this.assignTextureSlot(tex, el);
          const dim = this.getImageDimensions(image);
          const imgW = dim.w || 1;
          const imgH = dim.h || 1;
          const u0 = x_src / imgW;
          const v0 = y_src / imgH;
          const u1 = (x_src + width) / imgW;
          const v1 = (y_src + height) / imgH;
          let uvTL = { u: u0, v: v0 };
          let uvTR = { u: u1, v: v0 };
          let uvBR = { u: u1, v: v1 };
          let uvBL = { u: u0, v: v1 };
          switch (transform) {
            case Sprite_js_1.Sprite.TRANS_NONE:
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR:
              uvTL = { u: u1, v: v0 };
              uvTR = { u: u0, v: v0 };
              uvBR = { u: u0, v: v1 };
              uvBL = { u: u1, v: v1 };
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT180:
              uvTL = { u: u0, v: v1 };
              uvTR = { u: u1, v: v1 };
              uvBR = { u: u1, v: v0 };
              uvBL = { u: u0, v: v0 };
              break;
            case Sprite_js_1.Sprite.TRANS_ROT180:
              uvTL = { u: u1, v: v1 };
              uvTR = { u: u0, v: v1 };
              uvBR = { u: u0, v: v0 };
              uvBL = { u: u1, v: v0 };
              break;
            case Sprite_js_1.Sprite.TRANS_ROT90:
              uvTL = { u: u0, v: v1 };
              uvTR = { u: u0, v: v0 };
              uvBR = { u: u1, v: v0 };
              uvBL = { u: u1, v: v1 };
              break;
            case Sprite_js_1.Sprite.TRANS_ROT270:
              uvTL = { u: u1, v: v0 };
              uvTR = { u: u1, v: v1 };
              uvBR = { u: u0, v: v1 };
              uvBL = { u: u0, v: v0 };
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT90:
              uvTL = { u: u1, v: v1 };
              uvTR = { u: u1, v: v0 };
              uvBR = { u: u0, v: v0 };
              uvBL = { u: u0, v: v1 };
              break;
            case Sprite_js_1.Sprite.TRANS_MIRROR_ROT270:
              uvTL = { u: u0, v: v0 };
              uvTR = { u: u0, v: v1 };
              uvBR = { u: u1, v: v1 };
              uvBL = { u: u1, v: v0 };
              break;
          }
          this.addQuad(px, py, uvTL.u, uvTL.v, px + destW, py, uvTR.u, uvTR.v, px + destW, py + destH, uvBR.u, uvBR.v, px, py + destH, uvBL.u, uvBL.v, 1, 1, 1, 1, slot);
        }
      };
      exports.WebGL2Renderer = WebGL2Renderer2;
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
      __exportStar(require_IRenderBackend(), exports);
      __exportStar(require_WebGL2Renderer(), exports);
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

  // packages/game-client/src/farm/FarmModel.ts
  var CROP_DEFINITIONS = {
    0: {
      id: 0,
      name: "C\xE0 Chua",
      growMinutes: 260,
      harvestYield: 75,
      seedPriceXu: 24,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 4, 5, 6, 37]
    },
    1: {
      id: 1,
      name: "C\xE0 R\u1ED1t",
      growMinutes: 380,
      harvestYield: 108,
      seedPriceXu: 36,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 7, 8, 9, 38]
    },
    2: {
      id: 2,
      name: "Kh\xF3m",
      growMinutes: 600,
      harvestYield: 165,
      seedPriceXu: 50,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 10, 11, 12, 39]
    },
    3: {
      id: 3,
      name: "D\u01B0a H\u1EA5u",
      growMinutes: 480,
      harvestYield: 138,
      seedPriceXu: 45,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 13, 14, 15, 40]
    },
    4: {
      id: 4,
      name: "Nho",
      growMinutes: 960,
      harvestYield: 240,
      seedPriceXu: 80,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 16, 17, 18, 41]
    },
    5: {
      id: 5,
      name: "Hoa H\u1ED3ng",
      growMinutes: 120,
      harvestYield: 45,
      seedPriceXu: 20,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 19, 20, 21, 42]
    },
    6: {
      id: 6,
      name: "L\xFAa",
      growMinutes: 2280,
      harvestYield: 720,
      seedPriceXu: 120,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 22, 23, 24, 43]
    },
    7: {
      id: 7,
      name: "Xo\xE0i",
      growMinutes: 1440,
      harvestYield: 360,
      seedPriceXu: 100,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 25, 26, 27, 44]
    },
    8: {
      id: 8,
      name: "Thanh Long",
      growMinutes: 720,
      harvestYield: 189,
      seedPriceXu: 60,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 28, 29, 30, 45]
    },
    9: {
      id: 9,
      name: "Hoa H\u01B0\u1EDBng D\u01B0\u01A1ng",
      growMinutes: 720,
      harvestYield: 189,
      seedPriceXu: 65,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 31, 32, 33, 46]
    },
    10: {
      id: 10,
      name: "Hoa Tulip",
      growMinutes: 360,
      harvestYield: 108,
      seedPriceXu: 40,
      sellPriceXu: 10,
      stageImgs: [0, 1, 2, 3, 34, 35, 36, 47]
    }
  };
  var FarmModel = class _FarmModel {
    userId = 0;
    ownerName = "";
    landSize = 0;
    maxLandPlots = 30;
    // 5 columns x 6 rows = 30 plots
    lands = [];
    animals = [];
    starFruitLevel = 10;
    starFruitFruit = 0;
    barnSize = 10;
    fishPondSize = 10;
    seeds = /* @__PURE__ */ new Map();
    crops = /* @__PURE__ */ new Map();
    fertilizers = /* @__PURE__ */ new Map();
    specialCrops = /* @__PURE__ */ new Map();
    userXu = 0;
    userLuong = 0;
    farmLevel = 1;
    farmPercent = 0;
    // Authentic 2x scaled Farm grid layout anchor: aligned to Map 25 (go.java method v())
    // 4 blocks of 12 plots (aG = 12, aH = 4 rows), block start columns [22, 25, 28, 31], row starts at 1
    static GRID_ROWS = 4;
    static CELL_WIDTH = 48;
    static CELL_HEIGHT = 48;
    static GRID_ORIGIN_X = 1056;
    // Column 22 * 48px
    static GRID_ORIGIN_Y = 436;
    // Row 1 * 48px + 388px ground start
    constructor() {
      this.resetPlots(8);
    }
    resetPlots(activeCount) {
      this.landSize = activeCount;
      this.lands = [];
      const blockStartCols = [22, 25, 28, 31];
      for (let i = 0; i < this.maxLandPlots; i++) {
        const blockIdx = Math.floor(i / 12);
        const inBlockIdx = i % 12;
        const startCol = blockStartCols[blockIdx] ?? 22 + blockIdx * 3;
        const col = startCol + Math.floor(inBlockIdx / 4);
        const row = 1 + inBlockIdx % 4;
        const posX = col * _FarmModel.CELL_WIDTH;
        const posY = 388 + row * _FarmModel.CELL_HEIGHT;
        this.lands.push({
          index: i,
          type: i < activeCount ? -1 : -2,
          plantedMinutes: 0,
          sucKhoe: 100,
          isWatered: false,
          isFertilized: false,
          isHarvestable: false,
          col,
          row,
          posX,
          posY
        });
      }
    }
    updateFromJoinPayload(data) {
      this.userId = data.userId;
      this.barnSize = data.barnSize || 10;
      this.fishPondSize = data.fishPondSize || 10;
      this.starFruitLevel = data.starFruit?.level || 10;
      this.starFruitFruit = data.starFruit?.fruit || 0;
      this.landSize = data.landItems.length;
      this.resetPlots(data.landItems.length);
      const now = Date.now();
      for (let i = 0; i < data.landItems.length; i++) {
        const item = data.landItems[i];
        if (this.lands[i]) {
          this.lands[i].type = item.type;
          this.lands[i].plantedMinutes = item.plantedMinutes || 0;
          this.lands[i].sucKhoe = item.sucKhoe !== void 0 ? item.sucKhoe : 100;
          this.lands[i].isWatered = !!item.isWatered;
          this.lands[i].isFertilized = !!item.isFertilized;
          this.lands[i].isHarvestable = !!item.isHarvestable;
          this.lands[i].localPlantedTimestamp = now - this.lands[i].plantedMinutes * 60 * 1e3;
        }
      }
      this.animals = [];
      if (data.animals) {
        for (let i = 0; i < data.animals.length; i++) {
          const a = data.animals[i];
          const sx = 440 + i % 3 * 30;
          const sy = 160 + Math.floor(i / 3) * 25;
          this.animals.push({
            ...a,
            x: sx,
            y: sy,
            targetX: sx,
            targetY: sy,
            animFrame: 0,
            moveTimer: 0
          });
        }
      }
    }
    updateFromInventoryPayload(data) {
      this.seeds.clear();
      for (const s of data.seeds) {
        if (s.quantity > 0) this.seeds.set(s.id, s.quantity);
      }
      this.crops.clear();
      for (const c of data.crops) {
        if (c.quantity > 0) this.crops.set(c.id, c.quantity);
      }
      this.fertilizers.clear();
      for (const f of data.fertilizers) {
        if (f.quantity > 0) this.fertilizers.set(f.id, f.quantity);
      }
      this.specialCrops.clear();
      for (const sp of data.specialCrops) {
        if (sp.quantity > 0) this.specialCrops.set(sp.id, sp.quantity);
      }
      this.userXu = data.xu;
      this.farmLevel = data.farmLevel;
      this.farmPercent = data.farmPercent;
    }
    getGrowthStage(cell) {
      if (cell.type < 0) return -1;
      const meta = CROP_DEFINITIONS[cell.type];
      if (!meta) return 0;
      if (cell.isHarvestable || cell.plantedMinutes >= meta.growMinutes) {
        return 7;
      }
      const ratio = Math.max(0, Math.min(1, cell.plantedMinutes / meta.growMinutes));
      return Math.min(6, Math.floor(ratio * 7));
    }
    getCropSpriteId(cell) {
      if (cell.type < 0) return -1;
      const meta = CROP_DEFINITIONS[cell.type];
      if (!meta) return 0;
      const stage = this.getGrowthStage(cell);
      return meta.stageImgs[stage] !== void 0 ? meta.stageImgs[stage] : meta.stageImgs[0];
    }
  };

  // packages/game-client/src/farm/FarmNetworkHandler.ts
  var FarmNetworkHandler = class {
    model;
    network;
    onFarmDataUpdated;
    onInventoryUpdated;
    onPlantSeedSuccess;
    onHarvestSuccess;
    onOpenLandSuccess;
    onNotification;
    constructor(network, model) {
      this.network = network;
      this.model = model || new FarmModel();
      this.bindEvents();
    }
    bindEvents() {
      this.network.on("farm_join", (data) => {
        console.log(`[FarmNetwork] Received farm_join for User ${data.userId}:`, data);
        this.model.updateFromJoinPayload(data);
        if (this.onFarmDataUpdated) {
          this.onFarmDataUpdated(this.model);
        }
      });
      this.network.on("farm_inventory", (data) => {
        console.log("[FarmNetwork] Received farm_inventory:", data);
        this.model.updateFromInventoryPayload(data);
        if (this.onInventoryUpdated) {
          this.onInventoryUpdated(this.model);
        }
      });
      this.network.on("plant_seed", (data) => {
        console.log(`[FarmNetwork] Plant seed confirmed: Cell ${data.cellIndex}, Seed ${data.seedId}`);
        if (this.model.lands[data.cellIndex]) {
          const cell = this.model.lands[data.cellIndex];
          cell.type = data.seedId;
          cell.plantedMinutes = 0;
          cell.sucKhoe = 100;
          cell.isWatered = false;
          cell.isFertilized = false;
          cell.isHarvestable = false;
          cell.localPlantedTimestamp = Date.now();
          const curSeeds = this.model.seeds.get(data.seedId) || 0;
          if (curSeeds > 0) {
            this.model.seeds.set(data.seedId, curSeeds - 1);
          }
        }
        if (this.onPlantSeedSuccess) {
          this.onPlantSeedSuccess(data.cellIndex, data.seedId);
        }
        this.network.sendGetFarmInventory();
      });
      this.network.on("tree_harvest", (data) => {
        console.log(`[FarmNetwork] Tree harvest confirmed: Cell ${data.cellIndex}, Yield: ${data.yieldCount}`);
        if (this.model.lands[data.cellIndex]) {
          const cell = this.model.lands[data.cellIndex];
          const oldType = cell.type;
          cell.type = -1;
          cell.plantedMinutes = 0;
          cell.isHarvestable = false;
          if (oldType >= 0) {
            const curCrops = this.model.crops.get(oldType) || 0;
            this.model.crops.set(oldType, curCrops + data.yieldCount);
          }
        }
        if (this.onHarvestSuccess) {
          this.onHarvestSuccess(data.cellIndex, data.yieldCount);
        }
        this.network.sendGetFarmInventory();
      });
      this.network.on("open_land", (data) => {
        console.log(`[FarmNetwork] Open land confirmed: Slot ${data.slot}`);
        if (this.model.landSize < this.model.maxLandPlots) {
          const nextIdx = this.model.landSize;
          if (this.model.lands[nextIdx]) {
            this.model.lands[nextIdx].type = -1;
          }
          this.model.landSize++;
        }
        if (data.xu > 0) this.model.userXu = data.xu;
        if (data.luong > 0) this.model.userLuong = data.luong;
        if (this.onOpenLandSuccess) {
          this.onOpenLandSuccess(data.slot, data.xu, data.luong);
        }
        this.network.sendGetFarmInventory();
        if (this.onNotification) {
          this.onNotification(data.msg || "\u0110\xE3 m\u1EDF \xF4 \u0111\u1EA5t th\xE0nh c\xF4ng!");
        }
      });
      this.network.on("server_dialog", (dialog) => {
        if (this.onNotification) {
          this.onNotification(dialog.content || dialog.title);
        }
      });
    }
    // --- Network Action Requests ---
    enterFarm(userId = this.network.myUserId) {
      console.log(`[FarmNetwork] Entering Farm for User: ${userId}`);
      this.model.userId = userId;
      this.network.sendGetHandler(10);
      this.network.sendJoinFarm(userId);
      this.network.sendGetFarmInventory();
    }
    plantSeed(cellIndex, seedId) {
      if (!this.model.lands[cellIndex] || this.model.lands[cellIndex].type !== -1) {
        if (this.onNotification) this.onNotification("\xD4 \u0111\u1EA5t kh\xF4ng th\u1EC3 gieo h\u1EA1t!");
        return;
      }
      const seedCount = this.model.seeds.get(seedId) || 0;
      if (seedCount <= 0) {
        if (this.onNotification) this.onNotification("B\u1EA1n \u0111\xE3 h\u1EBFt h\u1EA1t gi\u1ED1ng n\xE0y trong kho!");
        return;
      }
      this.network.sendPlantSeed(this.model.userId, cellIndex, seedId);
    }
    harvestCrop(cellIndex) {
      const cell = this.model.lands[cellIndex];
      if (!cell || cell.type < 0) {
        return;
      }
      this.network.sendTreeHarvest(this.model.userId, cellIndex);
    }
    openLand(typeBuy = 1) {
      this.network.sendOpenLand(this.model.userId, typeBuy);
    }
    buySeed(seedId, quantity = 1, currencyType = 1) {
      this.network.sendBuyFarmItem(seedId, quantity, currencyType);
      setTimeout(() => {
        this.network.sendGetFarmInventory();
      }, 400);
    }
    buyAnimal(animalType, quantity = 1) {
      this.network.sendBuyAnimal(animalType, quantity);
      setTimeout(() => {
        this.network.sendGetFarmInventory();
      }, 400);
    }
    cookDish(recipeId) {
      this.network.sendCooking(recipeId);
      if (this.onNotification) {
        this.onNotification("\u0110ang g\u1EEDi y\xEAu c\u1EA7u n\u1EA5u \u0103n \u0111\u1EBFn m\xE1y ch\u1EE7...");
      }
    }
    doCattleAction(action) {
      this.network.sendCattleAction(this.model.userId, action);
    }
    doFishAction(action) {
      this.network.sendFishAction(this.model.userId, action);
    }
    harvestStarfruit() {
      this.network.sendHarvestStarfruit(this.model.userId);
    }
    upgradeStarfruit() {
      this.network.sendUpgradeStarfruit(this.model.userId);
    }
    requestInventory() {
      this.network.sendGetFarmInventory();
    }
  };

  // packages/game-client/src/farm/FarmScreen.ts
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

  // packages/game-client/src/characters/AvatarRenderer.ts
  var import_j2me_compat = __toESM(require_dist());
  var AvatarRenderer = class _AvatarRenderer {
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
          this.shadowImage = await import_j2me_compat.Image.createImage("/assets/effect/s0.png");
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
        const img = await import_j2me_compat.Image.createImage(`/res/big/${imageId}.png`);
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
        const img = await import_j2me_compat.Image.createImage(`/res/item/${itemId}.png`);
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
    /**
     * Categorize any avatar part into the authentic 10-layer rendering order:
     * 1: Cánh sau (Wings, Cape, Backpack, Tails, Back Auras)
     * 2: Thân (Base body / skin)
     * 3: Quần (Pants, shorts, skirts)
     * 4: Áo (Shirts, jackets, dresses, tops)
     * 5: Đầu (Head shape: tròn, mập, nhọn)
     * 6: Khuôn mặt (Facial expressions, mouth, blushing, face masks)
     * 7: Mắt (Eyes: đen, xanh, etc.)
     * 8: Tóc (Hair)
     * 9: Nón (Hats, caps, helmets, crowns, hairpins, glasses, earrings)
     * 10: Cầm tay (Handheld items: weapons, balloons, candies, flowers, lanterns, flags)
     */
    static getPartLayer(part) {
      const name = (part.name || "").toLowerCase();
      const z = part.zorder ?? 0;
      const isBackItem = (name.includes("c\xE1nh") || name.includes("phi phong") || name.includes("\xE1o cho\xE0ng") || name.includes("\u0111u\xF4i") || name.includes("balo") || name.includes("c\u1EB7p s\xE1ch") || name.includes("h\xE0o quang") || name.includes("\u0111\u0129a bay") || name.includes("phi thuy\u1EC1n")) && !(name.includes("c\xE0i t\xF3c") || name.includes("v\u01B0\u01A1ng mi\u1EC7n") || name.includes("m\u1EA3nh gh\xE9p") || name.includes("thu\u1ED1c") || name.includes("k\xEDnh"));
      if (isBackItem || z === 3 || z === 5 || z === 6) {
        return 1;
      }
      if (z === 8 || name.includes("th\xE2n") && !name.includes("\xE1o") && !name.includes("ki\u1EBFm")) {
        return 2;
      }
      const isPants = (z === 10 || name.includes("qu\u1EA7n") || name.includes("v\xE1y") || name.includes("short") || name.includes("qu\u1EA7n \u0111\xF9i") || name.includes("qu\u1EA7n t\xE2y")) && !name.includes("\xE1o");
      if (isPants) {
        return 3;
      }
      const isShirt = (z === 20 || name.includes("\xE1o") || name.includes("s\u01A1 mi") || name.includes("thun") || name.includes("comple") || name.includes("vest") || name.includes("\u0111\u1EA7m") || name.includes("y\u1EBFm")) && !name.includes("cho\xE0ng");
      if (isShirt) {
        return 4;
      }
      const isHead = (z === 30 || name.includes("tr\xF2n") || name.includes("m\u1EADp") || name.includes("nh\u1ECDn") || name.includes("m\u1EB7t tr\xF2n") || name.includes("m\u1EB7t nh\u1ECDn") || name.includes("\u0111\u1EA7u tr\u1ECDc")) && !name.includes("m\u1EAFt") && !name.includes("m\u0169") && !name.includes("n\xF3n");
      if (isHead) {
        return 5;
      }
      const isFace = (z === 52 || name.includes("kh\u1EA9u trang") || name.includes("l\xEAu l\xEAu") || name.includes("m\xE1 h\u1ED3ng") || name.includes("m\u0169i h\u1EC1") || name.includes("m\u1EB7t n\u1EA1") || name.includes("r\xE2u") || name.includes("ng\u1EADm")) && !name.includes("m\u1EAFt");
      if (isFace) {
        return 6;
      }
      const isEyes = (z === 40 || name.startsWith("mat ") || name.includes("m\u1EAFt") || name === "\u0111en" || name === "xanh n\u01B0\u1EDBc bi\u1EC3n" || name === "n\xE2u") && !name.includes("k\xEDnh");
      if (isEyes) {
        return 7;
      }
      const isHair = (z === 50 || name.includes("t\xF3c") || name.includes("d\u1EF1ng \u0111\u1EE9ng") || name.includes("tr\u1EBB con") || name.includes("b\xFAp b\xEA") || name.includes("s\xE0nh \u0111i\u1EC7u")) && !(name.includes("c\xE0i t\xF3c") || name.includes("k\u1EB9p t\xF3c") || name.includes("hoa c\xE0i t\xF3c") || name.includes("b\u0103ng \u0111\xF4") || name.includes("n\xF3n") || name.includes("m\u0169"));
      if (isHair) {
        return 8;
      }
      const isHat = z === 53 || z === 54 || z === 60 || name.includes("n\xF3n") || name.includes("m\u0169") || name.includes("v\u01B0\u01A1ng mi\u1EC7n") || name.includes("k\xEDnh") || name.includes("b\u0103ng \u0111\xF4") || name.includes("tai m\xE8o") || name.includes("s\u1EEBng") || name.includes("tai chu\u1ED9t") || name.includes("c\xE0i t\xF3c") || name.includes("k\u1EB9p t\xF3c") || name.includes("b\xF4ng tai") || name.includes("hoa c\xE0i");
      if (isHat) {
        return 9;
      }
      const isHandheld = z === 70 || name.includes("c\u1EA7m") || name.includes("bong b\xF3ng") || name.includes("k\u1EB9o") || name.includes("hoa") || name.includes("ki\u1EBFm") || name.includes("\u0111\xE0n") || name.includes("chong ch\xF3ng") || name.includes("qu\u1EA1t") || name.includes("g\u1EADy") || name.includes("tr\u01B0\u1EE3ng") || name.includes("khi\xEAn") || name.includes("c\u1EDD") || name.includes("c\u1EE5c v\xE0ng") || name.includes("kem") || name.includes("v\u0169 kh\xED") || name.includes("l\u1ED3ng \u0111\xE8n") || name.includes("thi\u1EC7p");
      if (isHandheld) {
        return 10;
      }
      if (z <= 5) return 1;
      if (z <= 10) return 3;
      if (z <= 20) return 4;
      if (z <= 30) return 5;
      if (z <= 40) return 7;
      if (z <= 50) return 8;
      if (z <= 60) return 9;
      return 10;
    }
    static async preloadWearing(wearing) {
      const listToPreload = [...wearing, 0, 4];
      for (const partId of listToPreload) {
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
      const transform = isMirrored ? import_j2me_compat.Sprite.TRANS_MIRROR : import_j2me_compat.Sprite.TRANS_NONE;
      const wearingList = [...wearing];
      let hasHead = false;
      let hasEyes = false;
      for (const partId of wearingList) {
        const part = this.partsMap.get(partId);
        if (part) {
          const layer = _AvatarRenderer.getPartLayer(part);
          if (layer === 5) hasHead = true;
          if (layer === 7) hasEyes = true;
        }
      }
      if (!hasHead) {
        wearingList.push(0);
      }
      if (!hasEyes) {
        wearingList.push(4);
      }
      const partsToRender = [];
      for (const partId of wearingList) {
        const part = this.partsMap.get(partId);
        if (part) {
          partsToRender.push(part);
        }
      }
      partsToRender.sort((a, b) => {
        const layerA = _AvatarRenderer.getPartLayer(a);
        const layerB = _AvatarRenderer.getPartLayer(b);
        if (layerA !== layerB) {
          return layerA - layerB;
        }
        return a.zorder - b.zorder;
      });
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
        const tx = g.getTranslateX();
        const ty = g.getTranslateY();
        const screenX = x + tx;
        const screenTagY = y - 46 + ty;
        const ctx = g.ctx;
        const nameW = font ? font.stringWidth(name) : name.length * 6;
        const isLaiBuon = name === "lai.buon";
        const extraFlowerW = isLaiBuon ? 12 : 0;
        const tagX = screenX - Math.floor((nameW + extraFlowerW) / 2);
        if (ctx) {
          ctx.save();
          ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
          ctx.beginPath();
          if (typeof ctx.roundRect === "function") {
            ctx.roundRect(tagX - 4, screenTagY - 1, nameW + extraFlowerW + 8, 14, 3);
          } else {
            ctx.rect(tagX - 4, screenTagY - 1, nameW + extraFlowerW + 8, 14);
          }
          ctx.fill();
          ctx.strokeStyle = isLocal ? "#facc15" : "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
          if (isLaiBuon) {
            const flX = tagX + nameW + 6;
            const flY = screenTagY + 6;
            ctx.fillStyle = "#dc2626";
            ctx.beginPath();
            ctx.arc(flX, flY, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fde047";
            ctx.beginPath();
            ctx.arc(flX, flY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.font = "bold 11px Arial, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const textCenterX = screenX - (isLaiBuon ? 6 : 0);
          ctx.fillStyle = "#000000";
          ctx.fillText(name, textCenterX + 1, screenTagY + 7);
          if (isLocal) {
            ctx.fillStyle = "#fde047";
          } else if (name.includes("Lovanga") || name.includes("T\xE0i X\u1EC9u") || name.includes("V\xE9 s\u1ED1") || name.includes("\u0111\u1EA5u gi\xE1") || name.includes("quay s\u1ED1") || isLaiBuon) {
            ctx.fillStyle = "#38bdf8";
          } else {
            ctx.fillStyle = "#ffffff";
          }
          ctx.fillText(name, textCenterX, screenTagY + 6);
          ctx.restore();
        } else if (font) {
          font.drawString(g, name, x, y - 46, 2);
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
        const tx = g.getTranslateX();
        const ty = g.getTranslateY();
        const screenX = x + tx;
        const screenY = y + ty;
        const bubbleW = Math.min(maxBubbleW, Math.round(maxLineW + 14));
        const bubbleH = lines.length * 13 + 6;
        const bx = screenX - Math.floor(bubbleW / 2);
        const by = screenY - 56 - bubbleH;
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
          ctx.moveTo(screenX - 3, by + bubbleH);
          ctx.lineTo(screenX, by + bubbleH + 4);
          ctx.lineTo(screenX + 3, by + bubbleH);
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
            ctx.fillText(lines[i], screenX, by + 7 + i * 13);
          }
          ctx.restore();
        }
      }
    }
  };

  // packages/game-client/src/farm/FarmActionController.ts
  var FarmActionController = class {
    model;
    handler;
    currentTool = "hand" /* HAND */;
    selectedSeedId = 0;
    // Default: Cà chua
    focusedCellIndex = 0;
    // Active UI Modals
    isSeedPickerOpen = false;
    isShopOpen = false;
    isWarehouseOpen = false;
    isNeighborListOpen = false;
    onActionFeedback;
    constructor(model, handler) {
      this.model = model;
      this.handler = handler;
    }
    setTool(tool) {
      this.currentTool = tool;
      const nameMap = {
        ["hand" /* HAND */]: "Ki\u1EC3m tra",
        ["plant" /* PLANT */]: "Gieo h\u1EA1t",
        ["harvest" /* HARVEST */]: "Thu ho\u1EA1ch",
        ["open_land" /* OPEN_LAND */]: "M\u1EDF \u0111\u1EA5t"
      };
      if (this.onActionFeedback) {
        this.onActionFeedback(`C\xF4ng c\u1EE5: ${nameMap[tool]}`);
      }
    }
    selectSeed(seedId) {
      this.selectedSeedId = seedId;
      this.currentTool = "plant" /* PLANT */;
      this.isSeedPickerOpen = false;
      const cropName = CROP_DEFINITIONS[seedId]?.name || `H\u1EA1t #${seedId}`;
      if (this.onActionFeedback) {
        this.onActionFeedback(`\u0110\xE3 ch\u1ECDn h\u1EA1t gi\u1ED1ng: ${cropName}`);
      }
    }
    handleCellClick(cellIndex) {
      this.focusedCellIndex = cellIndex;
      const cell = this.model.lands[cellIndex];
      if (!cell) return;
      const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
      if (!isOwner) {
        if (this.onActionFeedback) {
          this.onActionFeedback("B\u1EA1n \u0111ang th\u0103m n\xF4ng tr\u1EA1i c\u1EE7a ng\u01B0\u1EDDi kh\xE1c! Kh\xF4ng th\u1EC3 thao t\xE1c.", "#ef4444");
        }
        return;
      }
      if (cell.type === -2) {
        if (cellIndex === this.model.landSize) {
          this.handler.openLand(1);
          if (this.onActionFeedback) {
            this.onActionFeedback("\u0110ang g\u1EEDi y\xEAu c\u1EA7u m\u1EDF \xF4 \u0111\u1EA5t l\xEAn m\xE1y ch\u1EE7...", "#facc15");
          }
        } else {
          if (this.onActionFeedback) {
            this.onActionFeedback("Vui l\xF2ng m\u1EDF \xF4 \u0111\u1EA5t theo th\u1EE9 t\u1EF1 l\u1EA7n l\u01B0\u1EE3t!", "#ef4444");
          }
        }
        return;
      }
      if (cell.type === -1) {
        const availSeeds = this.model.seeds.get(this.selectedSeedId) || 0;
        if (availSeeds > 0) {
          this.handler.plantSeed(cellIndex, this.selectedSeedId);
          const name2 = CROP_DEFINITIONS[this.selectedSeedId]?.name || "c\xE2y";
          if (this.onActionFeedback) {
            this.onActionFeedback(`\u0110ang gieo ${name2} v\xE0o \xF4 #${cellIndex + 1}...`, "#4ade80");
          }
        } else {
          this.isSeedPickerOpen = true;
          if (this.onActionFeedback) {
            this.onActionFeedback("Ch\u1ECDn h\u1EA1t gi\u1ED1ng trong kho \u0111\u1EC3 gieo!", "#38bdf8");
          }
        }
        return;
      }
      const stage = this.model.getGrowthStage(cell);
      if (cell.isHarvestable || stage === 7) {
        this.handler.harvestCrop(cellIndex);
        const name2 = CROP_DEFINITIONS[cell.type]?.name || "n\xF4ng s\u1EA3n";
        if (this.onActionFeedback) {
          this.onActionFeedback(`\u0110ang thu ho\u1EA1ch ${name2} \xF4 #${cellIndex + 1}...`, "#facc15");
        }
        return;
      }
      const name = CROP_DEFINITIONS[cell.type]?.name || "C\xE2y";
      const meta = CROP_DEFINITIONS[cell.type];
      const totalMin = meta ? meta.growMinutes : 100;
      const remainMin = Math.max(0, totalMin - cell.plantedMinutes);
      if (this.onActionFeedback) {
        this.onActionFeedback(
          `C\xE2y ch\u01B0a ch\xEDn! ${name} (\xD4 #${cellIndex + 1}): C\xF2n ${remainMin} ph\xFAt n\u1EEFa m\u1EDBi c\xF3 th\u1EC3 thu ho\u1EA1ch.`,
          "#ef4444"
        );
      }
    }
    harvestAllMature() {
      const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
      if (!isOwner) {
        if (this.onActionFeedback) {
          this.onActionFeedback("B\u1EA1n \u0111ang th\u0103m n\xF4ng tr\u1EA1i c\u1EE7a ng\u01B0\u1EDDi kh\xE1c! Kh\xF4ng th\u1EC3 thao t\xE1c.", "#ef4444");
        }
        return;
      }
      let harvestedCount = 0;
      for (const cell of this.model.lands) {
        if (cell.type >= 0) {
          const stage = this.model.getGrowthStage(cell);
          if (cell.isHarvestable || stage === 7) {
            this.handler.harvestCrop(cell.index);
            harvestedCount++;
          }
        }
      }
      if (this.onActionFeedback) {
        if (harvestedCount > 0) {
          this.onActionFeedback(`\u0110ang thu ho\u1EA1ch ${harvestedCount} \xF4 \u0111\u1EA5t ch\xEDn...`, "#facc15");
        } else {
          this.onActionFeedback("Ch\u01B0a c\xF3 c\xE2y n\xE0o ch\xEDn \u0111\u1EC3 thu ho\u1EA1ch!", "#94a3b8");
        }
      }
    }
    plantAllEmpty() {
      const isOwner = !this.model.userId || this.model.userId === (this.handler.network.myUserId || 1);
      if (!isOwner) {
        if (this.onActionFeedback) {
          this.onActionFeedback("B\u1EA1n \u0111ang th\u0103m n\xF4ng tr\u1EA1i c\u1EE7a ng\u01B0\u1EDDi kh\xE1c! Kh\xF4ng th\u1EC3 thao t\xE1c.", "#ef4444");
        }
        return;
      }
      const availSeeds = this.model.seeds.get(this.selectedSeedId) || 0;
      if (availSeeds <= 0) {
        this.isSeedPickerOpen = true;
        if (this.onActionFeedback) {
          this.onActionFeedback("Vui l\xF2ng ch\u1ECDn h\u1EA1t gi\u1ED1ng c\xF3 s\u1EB5n trong kho!", "#ef4444");
        }
        return;
      }
      let planted = 0;
      for (const cell of this.model.lands) {
        if (cell.type === -1 && planted < availSeeds) {
          this.handler.plantSeed(cell.index, this.selectedSeedId);
          planted++;
        }
      }
      if (this.onActionFeedback) {
        if (planted > 0) {
          this.onActionFeedback(`\u0110ang gieo ${planted} \xF4 \u0111\u1EA5t h\u1EA1t gi\u1ED1ng...`, "#4ade80");
        } else {
          this.onActionFeedback("Kh\xF4ng c\xF2n \xF4 \u0111\u1EA5t tr\u1ED1ng \u0111\u1EC3 gieo!", "#94a3b8");
        }
      }
    }
    buySeed(seedId, quantity = 1) {
      this.handler.buySeed(seedId, quantity);
      if (this.onActionFeedback) {
        this.onActionFeedback(`\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u mua h\u1EA1t gi\u1ED1ng #${seedId}`, "#facc15");
      }
    }
    sellProduce(cropId, count = 1) {
      const curCrops = this.model.crops.get(cropId) || 0;
      if (curCrops <= 0) {
        if (this.onActionFeedback) {
          this.onActionFeedback("B\u1EA1n kh\xF4ng c\xF3 lo\u1EA1i n\xF4ng s\u1EA3n n\xE0y trong kho \u0111\u1EC3 b\xE1n!", "#ef4444");
        }
        return;
      }
      const sellCount = Math.min(count, curCrops);
      const meta = CROP_DEFINITIONS[cropId];
      const unitPrice = meta ? meta.sellPriceXu : 20;
      const totalXu = sellCount * unitPrice;
      this.model.crops.set(cropId, curCrops - sellCount);
      this.model.userXu += totalXu;
      if (this.onActionFeedback) {
        this.onActionFeedback(`\u0110\xE3 b\xE1n ${sellCount} n\xF4ng s\u1EA3n, nh\u1EADn \u0111\u01B0\u1EE3c ${totalXu.toLocaleString("vi-VN")} Xu!`, "#4ade80");
      }
    }
    sellAllHarvested() {
      let totalXu = 0;
      let totalItems = 0;
      for (const [cropId, count] of this.model.crops.entries()) {
        if (count > 0) {
          const meta = CROP_DEFINITIONS[cropId];
          const unitPrice = meta ? meta.sellPriceXu : 20;
          totalXu += count * unitPrice;
          totalItems += count;
          this.model.crops.set(cropId, 0);
        }
      }
      if (totalItems > 0) {
        this.model.userXu += totalXu;
        if (this.onActionFeedback) {
          this.onActionFeedback(`\u0110\xE3 b\xE1n to\xE0n b\u1ED9 ${totalItems} n\xF4ng s\u1EA3n, thu v\u1EC1 ${totalXu.toLocaleString("vi-VN")} Xu!`, "#4ade80");
        }
      } else {
        if (this.onActionFeedback) {
          this.onActionFeedback("Kho n\xF4ng s\u1EA3n \u0111ang tr\u1ED1ng, kh\xF4ng c\xF3 g\xEC \u0111\u1EC3 b\xE1n!", "#94a3b8");
        }
      }
    }
  };

  // packages/game-client/src/farm/FarmScreen.ts
  var FarmScreen = class extends GameScreen {
    model;
    handler;
    controller;
    skinPainter;
    font;
    localPlayer;
    // Authentic Map 25 Procedural Tilemap Engine
    mapTiles = new Int16Array(336);
    isMapLoaded = false;
    isNight = false;
    // Screen dimensions
    screenW = 640;
    screenH = 480;
    // Farm camera
    cameraX = 0;
    cameraY = 0;
    // Farm sprite image cache
    spriteCache = /* @__PURE__ */ new Map();
    loadingSprites = /* @__PURE__ */ new Set();
    // Floating notifications
    feedbackText = "Ch\xE0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi N\xF4ng Tr\u1EA1i Avatar!";
    feedbackColor = "#facc15";
    feedbackTimer = 100;
    // Animation ticks
    animTick = 0;
    // Active Menu / Dialogs
    isMenuOpen = false;
    isConfirmOpenLand = false;
    isKitchenOpen = false;
    isBarnOpen = false;
    isStarfruitOpen = false;
    isPondOpen = false;
    isCropActionOpen = false;
    selectedPlotIndex = 0;
    // Dialog selection states
    selectedMenuIndex = 0;
    selectedKitchenRecipe = 0;
    selectedBarnAction = 0;
    selectedStarfruitAction = 0;
    selectedPondAction = 0;
    selectedCropAction = 0;
    selectedShopTab = "seeds";
    selectedShopIndex = 0;
    shopQuantity = 1;
    // Callbacks
    onExitToWorldMap;
    constructor(handler, skinPainter, font) {
      super();
      this.handler = handler;
      this.model = handler.model;
      this.controller = new FarmActionController(this.model, this.handler);
      this.skinPainter = skinPainter;
      this.font = font;
      this.localPlayer = {
        id: this.handler.network.myUserId || 1,
        name: "N\xF4ng d\xE2n",
        x: 888,
        y: 670,
        targetX: 888,
        targetY: 670,
        dir: 1,
        // Facing Up
        state: "idle",
        wearing: [1, 2, 3],
        frame: 0
      };
      this.controller.onActionFeedback = (text, color) => {
        this.feedbackText = text;
        this.feedbackColor = color || "#facc15";
        this.feedbackTimer = 90;
      };
      this.handler.onNotification = (msg) => {
        this.feedbackText = msg;
        this.feedbackColor = "#38bdf8";
        this.feedbackTimer = 100;
      };
      this.loadMap25().catch((err) => {
        console.error("[FarmScreen] Failed to load Map 25 binary:", err);
      });
      this.loadAssets().catch((err) => {
        console.error("[FarmScreen] Failed to load farm assets:", err);
      });
    }
    async loadAssets() {
      await Promise.all([
        this.preloadSprite("clouds_day", "/assets/bg/clouds_farm_day.png"),
        this.preloadSprite("clouds_night", "/assets/bg/clouds_farm_night.png"),
        this.preloadSprite("horizon_day", "/assets/bg/horizon_farm_day.png"),
        this.preloadSprite("horizon_night", "/assets/bg/horizon_farm_night.png"),
        this.preloadSprite("tiles_farm", "/assets/tileset/tileset0.png"),
        this.preloadSprite("soil_cracked", "/assets/farm_ui/soil_cracked.png"),
        this.preloadSprite("gate847", "/assets/home/847.png"),
        this.preloadSprite("mua848", "/assets/home/848.png"),
        this.preloadSprite("tree244", "/assets/home/244.png"),
        this.preloadSprite("pond840", "/assets/home/840.png"),
        this.preloadSprite("tree834", "/assets/home/834.png"),
        this.preloadSprite("nha_bep", "/assets/home/829.png"),
        this.preloadSprite("chuong_lon", "/assets/home/828.png"),
        this.preloadSprite("fence838", "/assets/home/838.png"),
        this.preloadSprite("fence839", "/assets/home/839.png"),
        this.preloadSprite("coin", "/assets/farm_ui/coin.png")
      ]);
    }
    async loadMap25() {
      try {
        const res = await fetch("/assets/maps/25");
        if (res.ok) {
          const buf = await res.arrayBuffer();
          const u8 = new Uint8Array(buf);
          const count = Math.min(336, u8.length);
          for (let i = 0; i < count; i++) {
            const val = u8[i];
            if (val === 149 || val === 190 || val === 189 || val === 142 || val === 187 || val === 188 || val === 28) {
              this.mapTiles[i] = 4;
            } else if (val === 140 || val === 155 || val === 152) {
              this.mapTiles[i] = 55;
            } else if (val === 110) {
              this.mapTiles[i] = 31;
            } else if (val === 159 || val === 156 || val === 158) {
              this.mapTiles[i] = 5;
            } else if (val === 182) {
              this.mapTiles[i] = 39;
            } else if (val === 183) {
              this.mapTiles[i] = 13;
            } else if (val === 157) {
              this.mapTiles[i] = 111;
            } else {
              this.mapTiles[i] = val === 255 ? -1 : val;
            }
          }
          this.isMapLoaded = true;
          console.log("[FarmScreen] Authentic Map 25 tilemap loaded successfully");
        }
      } catch (err) {
        console.error("[FarmScreen] Failed to load /assets/maps/25:", err);
      }
    }
    async preloadSprite(key, url) {
      try {
        const img = await import_j2me_compat2.Image.createImage(url);
        this.spriteCache.set(key, img);
        return img;
      } catch (err) {
        console.warn(`[FarmScreen] Failed to load sprite ${key} from ${url}`);
        return void 0;
      }
    }
    loadSprite(key, url) {
      if (this.spriteCache.has(key)) {
        return this.spriteCache.get(key);
      }
      if (!this.loadingSprites.has(key)) {
        this.loadingSprites.add(key);
        import_j2me_compat2.Image.createImage(url).then((img) => {
          this.spriteCache.set(key, img);
          this.loadingSprites.delete(key);
        }).catch(() => {
          this.loadingSprites.delete(key);
        });
      }
      return void 0;
    }
    getCropSprite(spriteId) {
      return this.loadSprite(`crop_${spriteId}`, `/assets/farm/${spriteId}.png`);
    }
    onResize(width, height) {
      this.screenW = width;
      this.screenH = height;
    }
    // --- Game Loop (20 Simulation Ticks/s) ---
    update() {
      this.animTick++;
      if (this.feedbackTimer > 0) {
        this.feedbackTimer--;
      }
      const dx = this.localPlayer.targetX - this.localPlayer.x;
      const dy = this.localPlayer.targetY - this.localPlayer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 4) {
        const speed = 5;
        const nextX = this.localPlayer.x + dx / dist * speed;
        const nextY = this.localPlayer.y + dy / dist * speed;
        this.localPlayer.x = Math.max(50, Math.min(1960, nextX));
        this.localPlayer.y = Math.max(420, Math.min(715, nextY));
        this.localPlayer.state = "walk";
        if (Math.abs(dx) > Math.abs(dy)) {
          this.localPlayer.dir = dx > 0 ? 3 : 2;
        } else {
          this.localPlayer.dir = dy > 0 ? 0 : 1;
        }
        this.localPlayer.frame = 1 + Math.floor(this.animTick / 3) % 4;
        this.checkMidWalkTriggers();
      } else {
        this.localPlayer.x = this.localPlayer.targetX;
        this.localPlayer.y = this.localPlayer.targetY;
        this.localPlayer.state = "idle";
        this.localPlayer.frame = 0;
        this.checkTriggerZones();
      }
      const MAP_WIDTH = 2016;
      const MAP_HEIGHT = 772;
      let camX = Math.round(this.localPlayer.x - this.screenW / 2);
      if (MAP_WIDTH > this.screenW) {
        camX = Math.max(0, Math.min(MAP_WIDTH - this.screenW, camX));
      } else {
        camX = Math.floor((MAP_WIDTH - this.screenW) / 2);
      }
      let camY = Math.max(0, MAP_HEIGHT - this.screenH);
      if (this.screenH >= MAP_HEIGHT) {
        camY = 0;
      }
      this.cameraX = camX;
      this.cameraY = camY;
      for (const cell of this.model.lands) {
        if (cell.type >= 0 && cell.localPlantedTimestamp) {
          const elapsedMinutes = Math.floor((Date.now() - cell.localPlantedTimestamp) / 6e4);
          cell.plantedMinutes = Math.max(cell.plantedMinutes, elapsedMinutes);
          const meta = CROP_DEFINITIONS[cell.type];
          if (meta && cell.plantedMinutes >= meta.growMinutes) {
            cell.isHarvestable = true;
          }
        }
      }
      for (const a of this.model.animals) {
        a.moveTimer++;
        if (a.moveTimer > 80) {
          a.moveTimer = 0;
          a.targetX = 120 + Math.floor(Math.random() * 120);
          a.targetY = 520 + Math.floor(Math.random() * 80);
        }
        a.x += (a.targetX - a.x) * 0.04;
        a.y += (a.targetY - a.y) * 0.04;
      }
    }
    /**
     * Fast trigger check while walking through doorways or exit
     */
    checkMidWalkTriggers() {
      const px = this.localPlayer.x;
      const py = this.localPlayer.y;
      if (Math.abs(px - 888) <= 45 && py >= 660) {
        if (this.onExitToWorldMap) this.onExitToWorldMap();
      }
    }
    /**
     * Check interactive zones when player stops walking
     */
    checkTriggerZones() {
      const px = this.localPlayer.x;
      const py = this.localPlayer.y;
      if (Math.abs(px - 888) <= 55 && py >= 640) {
        if (this.onExitToWorldMap) {
          this.onExitToWorldMap();
        }
        return;
      }
      if (Math.abs(px - 502) <= 45 && Math.abs(py - 430) <= 30) {
        this.isKitchenOpen = true;
        return;
      }
      if (Math.abs(px - 691) <= 45 && Math.abs(py - 430) <= 30) {
        this.isBarnOpen = true;
        return;
      }
      if (Math.abs(px - 810) <= 50 && Math.abs(py - 460) <= 35) {
        this.isStarfruitOpen = true;
        return;
      }
      if (px >= 1450 && px <= 1750 && py >= 480 && py <= 600) {
        this.isPondOpen = true;
        return;
      }
    }
    // --- Rendering Pipeline (WebGL2 Native Procedural Map 25 Engine) ---
    paint(g) {
      const w = this.screenW;
      const h = this.screenH;
      const isForcedDay = typeof window !== "undefined" && (new URLSearchParams(window.location.search).has("day") || window.__FORCE_DAY);
      const hour = (/* @__PURE__ */ new Date()).getHours();
      this.isNight = isForcedDay ? false : hour >= 18 || hour < 6;
      if (this.isNight) {
        g.setColor(21);
      } else {
        g.setColor(6143735);
      }
      g.fillRect(0, 0, w, h);
      const cloudSuffix = this.isNight ? "night" : "day";
      const cloudsImg = this.spriteCache.get(`clouds_${cloudSuffix}`);
      if (cloudsImg) {
        const cw = cloudsImg.getWidth();
        const paraX = -Math.floor(this.cameraX * 0.15) % cw;
        const startX = paraX > 0 ? paraX - cw : paraX;
        for (let cx = startX; cx < w; cx += cw) {
          g.drawImage(cloudsImg, cx, Math.max(0, 100 - this.cameraY), 0);
        }
      }
      const horSuffix = this.isNight ? "night" : "day";
      const horizonImg = this.spriteCache.get(`horizon_${horSuffix}`);
      if (horizonImg) {
        const hw = horizonImg.getWidth();
        const paraX = -Math.floor(this.cameraX * 0.35) % hw;
        const startX = paraX > 0 ? paraX - hw : paraX;
        const horY = Math.max(0, 360 - this.cameraY);
        for (let hx = startX; hx < w; hx += hw) {
          g.drawImage(horizonImg, hx, horY, 0);
        }
      }
      g.translate(-this.cameraX, -this.cameraY);
      this.paintTilemap(g);
      this.paintSceneryObjects(g);
      this.paintLandPlots(g);
      this.paintAnimals(g);
      this.paintPlayer(g);
      this.paintFarmOverlays(g);
      g.translate(this.cameraX, this.cameraY);
      this.paintHUD(g, w, h);
      if (this.feedbackTimer > 0) {
        this.paintNotificationToast(g, w, h);
      }
      this.paintModals(g, w, h);
    }
    paintTilemap(g) {
      const tileSheet = this.spriteCache.get("tiles_farm");
      if (!tileSheet || !this.isMapLoaded) return;
      const TILE_SIZE = 42;
      const COLS = 48;
      const ROWS = 7;
      const MAP_BASE_Y = 478;
      const startCol = Math.max(0, Math.floor(this.cameraX / TILE_SIZE));
      const endCol = Math.min(COLS - 1, Math.ceil((this.cameraX + this.screenW) / TILE_SIZE));
      for (let r = 0; r < ROWS; r++) {
        const destY = MAP_BASE_Y + r * TILE_SIZE;
        for (let c = startCol; c <= endCol; c++) {
          const tileIdx = this.mapTiles[r * COLS + c];
          if (tileIdx >= 0) {
            const destX = c * TILE_SIZE;
            const srcX = tileIdx % 10 * 24;
            const srcY = Math.floor(tileIdx / 10) * 24;
            g.drawRegion(tileSheet, srcX, srcY, 24, 24, 0, destX, destY, 0);
          }
        }
      }
    }
    paintSceneryObjects(g) {
      const fenceImg = this.spriteCache.get("fence838");
      if (fenceImg) {
        for (let fx = 0; fx < 2016; fx += fenceImg.getWidth()) {
          g.drawImage(fenceImg, fx, 492, 0);
        }
      }
      const tree244 = this.spriteCache.get("tree244");
      if (tree244) {
        g.drawImage(tree244, -30, 320, 0);
        g.drawImage(tree244, 1860, 320, 0);
        g.drawImage(tree244, 34 * 42 - 10, 320, 0);
      }
      const nhaBep = this.spriteCache.get("nha_bep");
      if (nhaBep) {
        g.drawImage(nhaBep, 418, 428, 0);
      }
      const chuongLon = this.spriteCache.get("chuong_lon");
      if (chuongLon) {
        g.drawImage(chuongLon, 602, 432, 0);
      }
      const treeImg = this.spriteCache.get("tree834");
      if (treeImg) {
        g.drawImage(treeImg, 842, 440, 0);
        this.font.drawString(g, "Lv1", 948, 388, 2);
      }
      const pondImg = this.spriteCache.get("pond840");
      if (pondImg) {
        g.drawImage(pondImg, 1618, 590, 0);
      }
      const gateImg = this.spriteCache.get("gate847");
      if (gateImg) {
        g.drawImage(gateImg, 888, 652, 0);
      }
    }
    paintFarmOverlays(g) {
      const arrowBounce = Math.floor(this.animTick % 12 / 4);
      this.paintYellowArrow(g, 502, 422 + arrowBounce, "V\xE0o");
      this.paintYellowArrow(g, 691, 420 + arrowBounce, "V\xE0o");
      this.paintYellowArrow(g, 888, 666 + arrowBounce, "V\xE0o");
      const name = this.localPlayer.name || "akawasi..";
      const plateText = name.length > 7 ? name.substring(0, 6) + ".." : name;
      this.font.drawString(g, plateText, 888, 674, 2);
    }
    paintYellowArrow(g, x, y, text) {
      this.font.drawString(g, text, x, y - 10, 2);
      g.setColor(16436245);
      for (let row = 0; row < 6; row++) {
        g.fillRect(x - (5 - row), y + row, (5 - row) * 2 + 1, 1);
      }
    }
    paintLandPlots(g) {
      const soilImg = this.spriteCache.get("soil_cracked");
      const muaImg = this.spriteCache.get("mua848");
      for (let i = 0; i < this.model.lands.length; i++) {
        const plot = this.model.lands[i];
        const px = plot.posX;
        const py = plot.posY;
        if (plot.type !== -2 && soilImg) {
          g.drawImage(soilImg, px, py, 0);
        }
        if (plot.type === -2 && i === this.model.landSize && muaImg) {
          g.drawImage(muaImg, px + 10, py + 12, 0);
        }
        if (plot.type >= 0) {
          const meta = CROP_DEFINITIONS[plot.type];
          if (meta) {
            const stage = this.model.getGrowthStage(plot);
            const spriteId = meta.stageImgs[stage] ?? meta.stageImgs[0];
            const cropImg = this.getCropSprite(spriteId);
            if (cropImg) {
              const cx = px + Math.floor((FarmModel.CELL_WIDTH - cropImg.getWidth()) / 2);
              const cy = py + FarmModel.CELL_HEIGHT - cropImg.getHeight() - 4;
              g.drawImage(cropImg, cx, cy, 0);
            }
          }
        }
      }
    }
    paintAnimals(g) {
      for (const a of this.model.animals) {
        const animalSprite = this.loadSprite(`animal_${a.id}`, `/assets/farm/${a.id}.png`);
        if (animalSprite) {
          g.drawImage(animalSprite, Math.round(a.x), Math.round(a.y), 0);
        } else {
          g.setColor(16436245);
          g.fillArc(Math.round(a.x), Math.round(a.y), 16, 12, 0, 360);
        }
      }
    }
    paintPlayer(g) {
      const px = Math.round(this.localPlayer.x);
      const py = Math.round(this.localPlayer.y);
      g.setColor(1120295);
      g.fillArc(px - 9, py - 2, 18, 6, 0, 360);
      AvatarRenderer.paintAvatar(
        g,
        px,
        py,
        this.localPlayer.wearing,
        this.localPlayer.dir,
        this.localPlayer.frame,
        this.localPlayer.name,
        true,
        this.font
      );
    }
    paintHUD(g, w, h) {
      const coinImg = this.spriteCache.get("coin");
      g.setColor(1976635);
      g.fillRect(6, 6, 26, 22);
      g.setColor(6583435);
      g.drawRect(6, 6, 26, 22);
      g.setColor(16777215);
      g.fillRect(10, 11, 18, 2);
      g.fillRect(10, 16, 18, 2);
      g.fillRect(10, 21, 18, 2);
      g.setColor(1976635);
      g.fillRect(38, 6, 26, 22);
      g.setColor(6583435);
      g.drawRect(38, 6, 26, 22);
      g.setColor(16777215);
      this.font.drawString(g, "\u2709", 51, 10, 2);
      const title = this.model.ownerName ? `N\xF4ng tr\u1EA1i c\u1EE7a ${this.model.ownerName}` : "N\xF4ng tr\u1EA1i c\u1EE7a b\u1EA1n (C\u1EA5p 1)";
      this.font.drawString(g, title, Math.floor(w / 2), 10, 2);
      const xuVal = Number(this.model.userXu || 0);
      const xuStr = `${xuVal.toLocaleString("vi-VN")} Xu`;
      const textW = xuStr.length * 7;
      const startX = w - textW - 32;
      if (coinImg) {
        g.drawImage(coinImg, startX, 8, 0);
      }
      this.font.drawString(g, xuStr, startX + 22, 10, 0);
    }
    paintNotificationToast(g, w, h) {
      const toastW = Math.min(w - 40, this.feedbackText.length * 8 + 24);
      const tx = Math.floor((w - toastW) / 2);
      const ty = 34;
      g.setColor(988970);
      g.fillRect(tx, ty, toastW, 22);
      g.setColor(16436245);
      g.drawRect(tx, ty, toastW, 22);
      this.font.drawString(g, this.feedbackText, Math.floor(w / 2), ty + 5, 2);
    }
    // =========================================================================
    // Authentic 1:1 J2ME Dialogs & Modals
    // =========================================================================
    paintModals(g, w, h) {
      if (this.isMenuOpen) {
        this.paintMenuModal(g, w, h);
      } else if (this.isKitchenOpen) {
        this.paintKitchenModal(g, w, h);
      } else if (this.isBarnOpen) {
        this.paintBarnModal(g, w, h);
      } else if (this.isStarfruitOpen) {
        this.paintStarfruitModal(g, w, h);
      } else if (this.isPondOpen) {
        this.paintPondModal(g, w, h);
      } else if (this.isCropActionOpen) {
        this.paintCropActionModal(g, w, h);
      } else if (this.controller.isSeedPickerOpen) {
        this.paintSeedPickerModal(g, w, h);
      } else if (this.controller.isShopOpen) {
        this.paintShopModal(g, w, h);
      } else if (this.controller.isWarehouseOpen) {
        this.paintWarehouseModal(g, w, h);
      } else if (this.isConfirmOpenLand) {
        this.paintConfirmOpenLandModal(g, w, h);
      }
    }
    /**
     * 1. Authentic Quick Menu
     */
    paintMenuModal(g, w, h) {
      const mw = 220;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "N\xD4NG TR\u1EA0I");
      const items = [
        "1. Gieo h\u1EA1t gi\u1ED1ng",
        "2. Thu ho\u1EA1ch t\u1EA5t c\u1EA3 c\xE2y ch\xEDn",
        "3. M\u1EDF th\xEAm \xF4 \u0111\u1EA5t tr\u1ED3ng",
        "4. C\u1EEDa H\xE0ng H\u1EA1t Gi\u1ED1ng",
        "5. Nh\xE0 Kho N\xF4ng S\u1EA3n",
        "6. N\u1EA5u \u0103n (Nh\xE0 B\u1EBFp)",
        "7. Chu\u1ED3ng Nu\xF4i Gia S\xFAc",
        "8. Tr\u1EDF v\u1EC1 C\u1ED5ng N\xF4ng Tr\u1EA1i"
      ];
      let rowY = my + 32;
      for (let i = 0; i < items.length; i++) {
        const isSel = i === this.selectedMenuIndex;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 22, items[i], isSel);
        rowY += 24;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 12, my + mh - 26, 90, 20, "Ch\u1ECDn", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 102, my + mh - 26, 90, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 2. Authentic Nhà Bếp (Cooking Recipes) Dialog
     */
    paintKitchenModal(g, w, h) {
      const mw = 320;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "NH\xC0 B\u1EBEP N\xD4NG TR\u1EA0I");
      this.font.drawString(g, "C\xF4ng th\u1EE9c n\u1EA5u \u0103n t\u1EEB n\xF4ng s\u1EA3n t\u1EF1 tr\u1ED3ng:", mx + 12, my + 34, 0);
      const recipes = [
        { name: "1. C\u01A1m chi\xEAn tr\u1EE9ng", req: "1 Tr\u1EE9ng + 2 C\xE0 chua", exp: "+50 NL" },
        { name: "2. Canh chua c\xE1 l\xF3c", req: "1 C\xE1 + 2 C\xE0 chua + 1 D\u1EE9a", exp: "+80 NL" },
        { name: "3. N\u01B0\u1EDBc \xE9p d\u01B0a h\u1EA5u", req: "3 D\u01B0a h\u1EA5u", exp: "+30 NL" },
        { name: "4. B\u1EAFp x\xE0o b\u01A1", req: "3 B\u1EAFp + 1 B\u01A1", exp: "+40 NL" },
        { name: "5. Tr\u1EE9ng \u1ED1p la", req: "2 Tr\u1EE9ng", exp: "+25 NL" }
      ];
      let rowY = my + 52;
      for (let i = 0; i < recipes.length; i++) {
        const r = recipes[i];
        const isSel = i === this.selectedKitchenRecipe;
        const text = `${r.name} (${r.req})`;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, r.exp);
        rowY += 28;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 28, 130, 22, "N\u1EA5u m\xF3n \u0103n", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 146, my + mh - 28, 130, 22, "\u0110\xF3ng", "secondary");
    }
    /**
     * 3. Authentic Chuồng Rơm (Livestock / Barn) Dialog
     */
    paintBarnModal(g, w, h) {
      const mw = 310;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "CHU\u1ED2NG NU\xD4I GIA S\xDAC");
      this.font.drawString(g, "T\xECnh tr\u1EA1ng: 2 Heo, 1 B\xF2, 4 G\xE0 (Kh\u1ECFe m\u1EA1nh)", mx + 12, my + 34, 0);
      const actions = [
        "1. Cho gia s\xFAc, gia c\u1EA7m \u0103n",
        "2. Thu ho\u1EA1ch tr\u1EE9ng g\xE0 & v\u1EAFt s\u1EEFa b\xF2",
        "3. Ti\xEAm ph\xF2ng d\u1ECBch b\u1EC7nh & t\u0103ng \u0111\u1EC1 kh\xE1ng",
        "4. D\u1ECDn d\u1EB9p v\u1EC7 sinh chu\u1ED3ng tr\u1EA1i",
        "5. Mua th\xEAm con gi\u1ED1ng v\xE0o chu\u1ED3ng"
      ];
      let rowY = my + 54;
      for (let i = 0; i < actions.length; i++) {
        const isSel = i === this.selectedBarnAction;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 125, 20, "Th\u1EF1c hi\u1EC7n", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 141, my + mh - 26, 125, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 4. Authentic Cây Khế Dialog
     */
    paintStarfruitModal(g, w, h) {
      const mw = 300;
      const mh = 240;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "C\xC2Y KH\u1EBE N\xD4NG TR\u1EA0I");
      this.font.drawString(g, "C\xE2y Kh\u1EBF C\u1EA5p 1: C\xF3 10 tr\xE1i kh\u1EBF ch\xEDn v\xE0ng m\u1ECDng", mx + 12, my + 34, 0);
      const actions = [
        "1. Thu ho\u1EA1ch kh\u1EBF ch\xEDn (+500 Xu)",
        "2. T\u01B0\u1EDBi n\u01B0\u1EDBc ch\u0103m s\xF3c c\xE2y kh\u1EBF",
        "3. B\xF3n ph\xE2n h\u1EEFu c\u01A1 (+100 EXP N\xF4ng Tr\u1EA1i)",
        "4. N\xE2ng c\u1EA5p l\xEAn C\u1EA5p 2 (10.000 Xu)"
      ];
      let rowY = my + 56;
      for (let i = 0; i < actions.length; i++) {
        const isSel = i === this.selectedStarfruitAction;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 120, 20, "Ch\u1ECDn", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 136, my + mh - 26, 120, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 5. Authentic Ao Cá Dialog
     */
    paintPondModal(g, w, h) {
      const mw = 300;
      const mh = 240;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "AO C\xC1 N\xD4NG TR\u1EA0I");
      this.font.drawString(g, "T\xECnh tr\u1EA1ng: 5 c\xE1 ch\xE9p \u0111ang b\u01A1i l\u1ED9i, n\u01B0\u1EDBc trong l\xE0nh", mx + 12, my + 34, 0);
      const actions = [
        "1. Th\u1EA3 th\xEAm c\xE1 gi\u1ED1ng m\u1EDBi (1.000 Xu)",
        "2. R\u1EA3i th\u1EE9c \u0103n cho c\xE1",
        "3. V\u1EDBt c\xE1 l\u1EDBn / Thu ho\u1EA1ch (+th\u1ECBt c\xE1)",
        "4. M\u1EDF r\u1ED9ng di\u1EC7n t\xEDch ao c\xE1"
      ];
      let rowY = my + 56;
      for (let i = 0; i < actions.length; i++) {
        const isSel = i === this.selectedPondAction;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 120, 20, "Th\u1EF1c hi\u1EC7n", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 136, my + mh - 26, 120, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 6. Authentic Chăm Sóc Ô Đất Dialog
     */
    paintCropActionModal(g, w, h) {
      const mw = 310;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      const plot = this.model.lands[this.selectedPlotIndex];
      const meta = plot ? CROP_DEFINITIONS[plot.type] : void 0;
      const cropName = meta ? meta.name : "C\xE2y tr\u1ED3ng";
      const stage = plot ? this.model.getGrowthStage(plot) : 0;
      const stageNames = ["H\u1EA1t m\u1EA7m", "N\u1EA3y m\u1EA7m", "C\xE2y non", "C\xE2y l\u1EDBn", "Tr\u1ED5 hoa", "K\u1EBFt tr\xE1i", "Ch\xEDn v\xE0ng"];
      const stageText = stageNames[Math.min(stage, 6)];
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, `CH\u0102M S\xD3C \xD4 \u0110\u1EA4T #${this.selectedPlotIndex + 1}`);
      this.font.drawString(g, `C\xE2y: ${cropName} | Giai \u0111o\u1EA1n: ${stageText}`, mx + 12, my + 34, 0);
      const actions = [
        "1. T\u01B0\u1EDBi n\u01B0\u1EDBc b\u1ED5 sung \u0111\u1ED9 \u1EA9m",
        "2. B\xF3n ph\xE2n (gi\u1EA3m 50% th\u1EDDi gian ch\xEDn)",
        "3. B\u1EAFt s\xE2u b\u1ECD & l\xE0m c\u1ECF d\u1EA1i",
        "4. Thu ho\u1EA1ch n\xF4ng s\u1EA3n (n\u1EBFu \u0111\xE3 ch\xEDn)",
        "5. Cu\u1ED1c \u0111\u1EA5t / Ph\xE1 b\u1ECF c\xE2y"
      ];
      let rowY = my + 54;
      for (let i = 0; i < actions.length; i++) {
        const isSel = i === this.selectedCropAction;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, actions[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 26, 125, 20, "Th\u1EF1c hi\u1EC7n", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 141, my + mh - 26, 125, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 7. Authentic Chọn Hạt Giống Dialog
     */
    paintSeedPickerModal(g, w, h) {
      const mw = 320;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "CH\u1ECCN H\u1EA0T GI\u1ED0NG \u0110\u1EC2 GIEO");
      const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
      if (seeds.length === 0) {
        this.font.drawString(g, "Kho c\u1EE7a b\u1EA1n ch\u01B0a c\xF3 h\u1EA1t gi\u1ED1ng n\xE0o!", mx + Math.floor(mw / 2), my + 60, 2);
        this.font.drawString(g, "H\xE3y v\xE0o C\u1EEDa H\xE0ng \u0111\u1EC3 mua h\u1EA1t gi\u1ED1ng.", mx + Math.floor(mw / 2), my + 85, 2);
        this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, "\u0110\xF3ng", "secondary");
        return;
      }
      let yOff = my + 36;
      for (const [seedId, count] of seeds) {
        const meta = CROP_DEFINITIONS[seedId];
        const name = meta ? meta.name : `H\u1EA1t #${seedId}`;
        const text = `${name} (C\xF2n l\u1EA1i: ${count})`;
        this.skinPainter.paintAuthenticOption(g, mx + 8, yOff, mw - 16, 26, text, false, "Gieo h\u1EA1t");
        yOff += 28;
        if (yOff > my + mh - 36) break;
      }
      this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, "\u0110\xF3ng", "secondary");
    }
    /**
     * 8. Authentic Cửa Hàng Hạt Giống Dialog
     */
    paintShopModal(g, w, h) {
      const mw = 340;
      const mh = 280;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "C\u1EECA H\xC0NG N\xD4NG TR\u1EA0I");
      const tabW = Math.floor((mw - 24) / 3);
      const tabY = my + 32;
      const tabs = [
        { id: "seeds", label: "H\u1EA1t gi\u1ED1ng" },
        { id: "animals", label: "V\u1EADt nu\xF4i" },
        { id: "fertilizer", label: "Ph\xE2n b\xF3n" }
      ];
      for (let i = 0; i < tabs.length; i++) {
        const t = tabs[i];
        const isSelected = this.selectedShopTab === t.id;
        const tx = mx + 12 + i * tabW;
        g.setColor(isSelected ? 16498468 : 16708551);
        g.fillRect(tx, tabY, tabW - 4, 20);
        g.setColor(isSelected ? 14251782 : 7877903);
        g.drawRect(tx, tabY, tabW - 4, 20);
        this.font.drawString(g, t.label, tx + Math.floor((tabW - 4) / 2), tabY + 4, 2);
      }
      let items = [];
      if (this.selectedShopTab === "seeds") {
        items = Object.values(CROP_DEFINITIONS).map((c) => ({
          id: c.id,
          name: c.name,
          price: c.seedPriceXu,
          detail: `${c.growMinutes} ph\xFAt`
        }));
      } else if (this.selectedShopTab === "animals") {
        items = [
          { id: 1, name: "G\xE0 con", price: 5e3, detail: "L\u1EA5y tr\u1EE9ng" },
          { id: 2, name: "V\u1ECBt con", price: 4e3, detail: "L\u1EA5y tr\u1EE9ng" },
          { id: 3, name: "Heo gi\u1ED1ng", price: 1e4, detail: "L\u1EA5y th\u1ECBt" },
          { id: 4, name: "B\xF2 s\u1EEFa gi\u1ED1ng", price: 2e4, detail: "V\u1EAFt s\u1EEFa" }
        ];
      } else {
        items = [
          { id: 1, name: "Ph\xE2n b\xF3n lo\u1EA1i 1", price: 500, detail: "-50% th\u1EDDi gian" },
          { id: 2, name: "Thu\u1ED1c tr\u1EEB s\xE2u", price: 300, detail: "Di\u1EC7t s\xE2u b\u1ECD" },
          { id: 3, name: "Thu\u1ED1c h\u1ED3i ph\u1EE5c", price: 400, detail: "H\u1ED3i sinh c\xE2y" }
        ];
      }
      let rowY = my + 58;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isSel = i === this.selectedShopIndex;
        const text = `${item.name} (${item.detail})`;
        const priceText = `${item.price.toLocaleString("vi-VN")} Xu`;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, priceText);
        rowY += 28;
      }
      const botY = my + mh - 30;
      g.setColor(16708551);
      g.fillRect(mx + 12, botY, 70, 22);
      g.setColor(7877903);
      g.drawRect(mx + 12, botY, 70, 22);
      this.font.drawString(g, "-", mx + 20, botY + 4, 2);
      this.font.drawString(g, `${this.shopQuantity}`, mx + 47, botY + 4, 2);
      this.font.drawString(g, "+", mx + 74, botY + 4, 2);
      this.skinPainter.paintAuthenticButton(g, mx + 95, botY, 115, 22, "Mua v\u1EADt ph\u1EA9m", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 110, botY, 98, 22, "\u0110\xF3ng", "secondary");
    }
    /**
     * 9. Authentic Nhà Kho Nông Sản Dialog
     */
    paintWarehouseModal(g, w, h) {
      const mw = 320;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "NH\xC0 KHO N\xD4NG S\u1EA2N");
      const cropEntries = Array.from(this.model.crops.entries()).filter(([_, c]) => c > 0);
      if (cropEntries.length === 0) {
        this.font.drawString(g, "Nh\xE0 kho hi\u1EC7n t\u1EA1i \u0111ang tr\u1ED1ng!", mx + Math.floor(mw / 2), my + 60, 2);
        this.font.drawString(g, "H\xE3y gieo tr\u1ED3ng v\xE0 thu ho\u1EA1ch \u0111\u1EC3 c\xF3 n\xF4ng s\u1EA3n.", mx + Math.floor(mw / 2), my + 85, 2);
        this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, "\u0110\xF3ng", "secondary");
        return;
      }
      let yOff = my + 36;
      for (const [cropId, count] of cropEntries) {
        const meta = CROP_DEFINITIONS[cropId];
        const name = meta ? meta.name : `N\xF4ng s\u1EA3n #${cropId}`;
        const sellTotal = count * (meta ? meta.sellPriceXu : 10);
        const text = `${name}: ${count} c\u1EE7/qu\u1EA3`;
        const priceText = `B\xE1n: ${sellTotal.toLocaleString("vi-VN")} Xu`;
        this.skinPainter.paintAuthenticOption(g, mx + 8, yOff, mw - 16, 26, text, false, priceText);
        yOff += 28;
        if (yOff > my + mh - 36) break;
      }
      this.skinPainter.paintAuthenticButton(g, mx + Math.floor((mw - 100) / 2), my + mh - 28, 100, 22, "\u0110\xF3ng", "secondary");
    }
    /**
     * 10. Authentic Mở Thêm Ô Đất Dialog
     */
    paintConfirmOpenLandModal(g, w, h) {
      const mw = 280;
      const mh = 150;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "M\u1EDE TH\xCAM \u0110\u1EA4T TR\u1ED2NG");
      const plotNum = this.model.landSize + 1;
      this.font.drawString(g, `B\u1EA1n c\xF3 mu\u1ED1n m\u1EDF \xF4 \u0111\u1EA5t th\u1EE9 ${plotNum}?`, mx + Math.floor(mw / 2), my + 45, 2);
      this.font.drawString(g, "Gi\xE1 m\u1EDF: 500 Xu t\u1EEB t\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n", mx + Math.floor(mw / 2), my + 68, 2);
      this.skinPainter.paintAuthenticButton(g, mx + 16, my + mh - 30, 115, 24, "\u0110\u1ED3ng \xFD", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 131, my + mh - 30, 115, 24, "H\u1EE7y b\u1ECF", "secondary");
    }
    // =========================================================================
    // Pointer & Input Handling
    // =========================================================================
    pointerPressed(screenX, screenY) {
      const w = this.screenW;
      const h = this.screenH;
      if (this.isMenuOpen) {
        this.handleMenuClick(screenX, screenY, w, h);
        return;
      }
      if (this.isKitchenOpen) {
        this.handleKitchenClick(screenX, screenY, w, h);
        return;
      }
      if (this.isBarnOpen) {
        this.handleBarnClick(screenX, screenY, w, h);
        return;
      }
      if (this.isStarfruitOpen) {
        this.handleStarfruitClick(screenX, screenY, w, h);
        return;
      }
      if (this.isPondOpen) {
        this.handlePondClick(screenX, screenY, w, h);
        return;
      }
      if (this.isCropActionOpen) {
        this.handleCropActionClick(screenX, screenY, w, h);
        return;
      }
      if (this.controller.isSeedPickerOpen) {
        this.handleSeedPickerClick(screenX, screenY, w, h);
        return;
      }
      if (this.controller.isShopOpen) {
        this.handleShopClick(screenX, screenY, w, h);
        return;
      }
      if (this.controller.isWarehouseOpen) {
        this.handleWarehouseClick(screenX, screenY, w, h);
        return;
      }
      if (this.isConfirmOpenLand) {
        this.handleConfirmOpenLandClick(screenX, screenY, w, h);
        return;
      }
      if (screenY <= 32) {
        if (screenX <= 32) {
          this.isMenuOpen = !this.isMenuOpen;
          return;
        }
        if (screenX > 32 && screenX <= 64) {
          this.feedbackText = "B\u1EA1n ch\u01B0a c\xF3 th\u01B0 m\u1EDBi n\xE0o t\u1EEB b\u01B0u \u0111i\u1EC7n!";
          this.feedbackTimer = 80;
          return;
        }
      }
      const worldX = screenX + this.cameraX;
      const worldY = screenY + this.cameraY;
      if (worldX >= 820 && worldX <= 960 && worldY >= 620 && worldY <= 740) {
        const dist = Math.hypot(this.localPlayer.x - 888, this.localPlayer.y - 670);
        if (dist <= 50) {
          if (this.onExitToWorldMap) this.onExitToWorldMap();
        } else {
          this.localPlayer.targetX = 888;
          this.localPlayer.targetY = 670;
          this.feedbackText = "\u0110ang ti\u1EBFn ra C\u1ED5ng N\xF4ng Tr\u1EA1i...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 418 && worldX <= 560 && worldY >= 350 && worldY <= 470) {
        const dist = Math.hypot(this.localPlayer.x - 502, this.localPlayer.y - 430);
        if (dist <= 50) {
          this.isKitchenOpen = true;
        } else {
          this.localPlayer.targetX = 502;
          this.localPlayer.targetY = 430;
          this.feedbackText = "\u0110ang \u0111\u1EBFn Nh\xE0 B\u1EBFp...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 602 && worldX <= 750 && worldY >= 350 && worldY <= 470) {
        const dist = Math.hypot(this.localPlayer.x - 691, this.localPlayer.y - 430);
        if (dist <= 50) {
          this.isBarnOpen = true;
        } else {
          this.localPlayer.targetX = 691;
          this.localPlayer.targetY = 430;
          this.feedbackText = "\u0110ang \u0111\u1EBFn Chu\u1ED3ng Nu\xF4i...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 820 && worldX <= 960 && worldY >= 380 && worldY <= 520) {
        const dist = Math.hypot(this.localPlayer.x - 888, this.localPlayer.y - 480);
        if (dist <= 60) {
          this.isStarfruitOpen = true;
        } else {
          this.localPlayer.targetX = 888;
          this.localPlayer.targetY = 480;
          this.feedbackText = "\u0110ang \u0111\u1EBFn C\xE2y Kh\u1EBF...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 1550 && worldX <= 1850 && worldY >= 520 && worldY <= 740) {
        const dist = Math.hypot(this.localPlayer.x - 1520, this.localPlayer.y - 580);
        if (dist <= 80) {
          this.isPondOpen = true;
        } else {
          this.localPlayer.targetX = 1520;
          this.localPlayer.targetY = 580;
          this.feedbackText = "\u0110ang \u0111\u1EBFn Ao C\xE1...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (this.model.landSize < this.model.maxLandPlots) {
        const nextPlot = this.model.lands[this.model.landSize];
        if (nextPlot) {
          if (worldX >= nextPlot.posX - 4 && worldX <= nextPlot.posX + FarmModel.CELL_WIDTH + 4 && worldY >= nextPlot.posY - 4 && worldY <= nextPlot.posY + FarmModel.CELL_HEIGHT + 4) {
            this.localPlayer.targetX = nextPlot.posX + 24;
            this.localPlayer.targetY = nextPlot.posY + 24;
            this.isConfirmOpenLand = true;
            return;
          }
        }
      }
      const clickedPlotIdx = this.findPlotAt(worldX, worldY);
      if (clickedPlotIdx >= 0) {
        const plot = this.model.lands[clickedPlotIdx];
        this.localPlayer.targetX = plot.posX + 24;
        this.localPlayer.targetY = plot.posY + 24;
        if (plot.type === -1) {
          this.controller.focusedCellIndex = clickedPlotIdx;
          this.controller.isSeedPickerOpen = true;
        } else if (plot.type >= 0) {
          this.selectedPlotIndex = clickedPlotIdx;
          this.isCropActionOpen = true;
        }
        return;
      }
      this.localPlayer.targetX = Math.max(50, Math.min(1960, worldX));
      this.localPlayer.targetY = Math.max(420, Math.min(715, worldY));
    }
    findPlotAt(worldX, worldY) {
      for (let i = 0; i < this.model.lands.length; i++) {
        const p = this.model.lands[i];
        if (worldX >= p.posX && worldX <= p.posX + FarmModel.CELL_WIDTH && worldY >= p.posY && worldY <= p.posY + FarmModel.CELL_HEIGHT) {
          return i;
        }
      }
      return -1;
    }
    // --- Modal Click Handlers ---
    handleMenuClick(screenX, screenY, w, h) {
      const mw = 220;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (screenX < mx || screenX > mx + mw || screenY < my || screenY > my + mh) {
        this.isMenuOpen = false;
        return;
      }
      if (screenX >= mx + mw - 24 && screenX <= mx + mw && screenY >= my && screenY <= my + 24) {
        this.isMenuOpen = false;
        return;
      }
      let rowY = my + 32;
      for (let i = 0; i < 8; i++) {
        if (screenX >= mx + 8 && screenX <= mx + mw - 8 && screenY >= rowY && screenY <= rowY + 22) {
          this.selectedMenuIndex = i;
          this.executeMenuItem(i);
          return;
        }
        rowY += 24;
      }
      if (screenX >= mx + 12 && screenX <= mx + 102 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
        this.executeMenuItem(this.selectedMenuIndex);
        return;
      }
      if (screenX >= mx + mw - 102 && screenX <= mx + mw - 12 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
        this.isMenuOpen = false;
        return;
      }
    }
    executeMenuItem(index) {
      this.isMenuOpen = false;
      switch (index) {
        case 0:
          this.controller.isSeedPickerOpen = true;
          break;
        case 1:
          this.controller.harvestAllMature();
          break;
        case 2:
          this.isConfirmOpenLand = true;
          break;
        case 3:
          this.controller.isShopOpen = true;
          break;
        case 4:
          this.controller.isWarehouseOpen = true;
          break;
        case 5:
          this.isKitchenOpen = true;
          break;
        case 6:
          this.isBarnOpen = true;
          break;
        case 7:
          if (this.onExitToWorldMap) this.onExitToWorldMap();
          break;
      }
    }
    handleKitchenClick(x, y, w, h) {
      const mw = 320;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isKitchenOpen = false;
        return;
      }
      let rowY = my + 52;
      for (let i = 0; i < 5; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
          this.selectedKitchenRecipe = i;
          return;
        }
        rowY += 28;
      }
      if (x >= mx + 16 && x <= mx + 146 && y >= my + mh - 28 && y <= my + mh - 6) {
        const recipes = ["C\u01A1m chi\xEAn tr\u1EE9ng", "Canh chua c\xE1 l\xF3c", "N\u01B0\u1EDBc \xE9p d\u01B0a h\u1EA5u", "B\u1EAFp x\xE0o b\u01A1", "Tr\u1EE9ng \u1ED1p la"];
        this.handler.cookDish(this.selectedKitchenRecipe);
        this.feedbackText = `\u0110ang n\u1EA5u ${recipes[this.selectedKitchenRecipe]}...`;
        this.feedbackTimer = 80;
        this.isKitchenOpen = false;
        return;
      }
      if (x >= mx + mw - 146 && x <= mx + mw - 16 && y >= my + mh - 28 && y <= my + mh - 6) {
        this.isKitchenOpen = false;
        return;
      }
    }
    handleBarnClick(x, y, w, h) {
      const mw = 310;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isBarnOpen = false;
        return;
      }
      let rowY = my + 54;
      for (let i = 0; i < 5; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedBarnAction = i;
          return;
        }
        rowY += 26;
      }
      if (x >= mx + 16 && x <= mx + 141 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.handler.doCattleAction(this.selectedBarnAction);
        const actions = ["Cho \u0103n", "Thu ho\u1EA1ch tr\u1EE9ng/s\u1EEFa", "Ti\xEAm ph\xF2ng", "V\u1EC7 sinh chu\u1ED3ng", "Mua con gi\u1ED1ng"];
        this.feedbackText = `\u0110\xE3 th\u1EF1c hi\u1EC7n: ${actions[this.selectedBarnAction]}!`;
        this.feedbackTimer = 80;
        this.isBarnOpen = false;
        return;
      }
      if (x >= mx + mw - 141 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.isBarnOpen = false;
        return;
      }
    }
    handleStarfruitClick(x, y, w, h) {
      const mw = 300;
      const mh = 240;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isStarfruitOpen = false;
        return;
      }
      let rowY = my + 56;
      for (let i = 0; i < 4; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedStarfruitAction = i;
          return;
        }
        rowY += 26;
      }
      if (x >= mx + 16 && x <= mx + 136 && y >= my + mh - 26 && y <= my + mh - 6) {
        if (this.selectedStarfruitAction === 0) {
          this.handler.harvestStarfruit();
          this.feedbackText = "Thu ho\u1EA1ch kh\u1EBF th\xE0nh c\xF4ng! +500 Xu v\xE0o t\xE0i kho\u1EA3n!";
          this.feedbackTimer = 80;
        } else if (this.selectedStarfruitAction === 1) {
          this.feedbackText = "\u0110\xE3 t\u01B0\u1EDBi n\u01B0\u1EDBc cho c\xE2y kh\u1EBF!";
          this.feedbackTimer = 60;
        } else if (this.selectedStarfruitAction === 2) {
          this.feedbackText = "\u0110\xE3 b\xF3n ph\xE2n cho c\xE2y kh\u1EBF! +100 EXP N\xF4ng Tr\u1EA1i";
          this.feedbackTimer = 60;
        } else if (this.selectedStarfruitAction === 3) {
          this.handler.upgradeStarfruit();
          this.feedbackText = "\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u n\xE2ng c\u1EA5p c\xE2y kh\u1EBF l\xEAn C\u1EA5p 2!";
          this.feedbackTimer = 80;
        }
        this.isStarfruitOpen = false;
        return;
      }
      if (x >= mx + mw - 136 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.isStarfruitOpen = false;
        return;
      }
    }
    handlePondClick(x, y, w, h) {
      const mw = 300;
      const mh = 240;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isPondOpen = false;
        return;
      }
      let rowY = my + 56;
      for (let i = 0; i < 4; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedPondAction = i;
          return;
        }
        rowY += 26;
      }
      if (x >= mx + 16 && x <= mx + 136 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.handler.doFishAction(this.selectedPondAction);
        const actions = ["Th\u1EA3 c\xE1 gi\u1ED1ng m\u1EDBi", "R\u1EA3i th\u1EE9c \u0103n cho c\xE1", "Thu ho\u1EA1ch c\xE1", "N\xE2ng c\u1EA5p ao c\xE1"];
        this.feedbackText = `\u0110\xE3 th\u1EF1c hi\u1EC7n: ${actions[this.selectedPondAction]}!`;
        this.feedbackTimer = 80;
        this.isPondOpen = false;
        return;
      }
      if (x >= mx + mw - 136 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.isPondOpen = false;
        return;
      }
    }
    handleCropActionClick(x, y, w, h) {
      const mw = 310;
      const mh = 260;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isCropActionOpen = false;
        return;
      }
      let rowY = my + 54;
      for (let i = 0; i < 5; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedCropAction = i;
          return;
        }
        rowY += 26;
      }
      if (x >= mx + 16 && x <= mx + 141 && y >= my + mh - 26 && y <= my + mh - 6) {
        if (this.selectedCropAction === 0) {
          this.feedbackText = "\u0110\xE3 t\u01B0\u1EDBi n\u01B0\u1EDBc cho \xF4 \u0111\u1EA5t!";
          this.feedbackTimer = 60;
        } else if (this.selectedCropAction === 1) {
          this.feedbackText = "\u0110\xE3 b\xF3n ph\xE2n! R\xFAt ng\u1EAFn th\u1EDDi gian sinh tr\u01B0\u1EDFng!";
          this.feedbackTimer = 60;
        } else if (this.selectedCropAction === 2) {
          this.feedbackText = "\u0110\xE3 b\u1EAFt s\xE2u b\u1ECD v\xE0 l\xE0m s\u1EA1ch c\u1ECF d\u1EA1i!";
          this.feedbackTimer = 60;
        } else if (this.selectedCropAction === 3) {
          this.controller.handleCellClick(this.selectedPlotIndex);
        } else if (this.selectedCropAction === 4) {
          this.feedbackText = "\u0110\xE3 cu\u1ED1c \u0111\u1EA5t v\xE0 l\xE0m s\u1EA1ch \xF4 \u0111\u1EA5t!";
          this.feedbackTimer = 60;
        }
        this.isCropActionOpen = false;
        return;
      }
      if (x >= mx + mw - 141 && x <= mx + mw - 16 && y >= my + mh - 26 && y <= my + mh - 6) {
        this.isCropActionOpen = false;
        return;
      }
    }
    handleSeedPickerClick(x, y, w, h) {
      const mw = 320;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.controller.isSeedPickerOpen = false;
        return;
      }
      const seeds = Array.from(this.model.seeds.entries()).filter(([_, count]) => count > 0);
      let yOff = my + 36;
      for (const [seedId] of seeds) {
        if (y >= yOff && y <= yOff + 26) {
          this.controller.selectSeed(seedId);
          if (this.controller.focusedCellIndex >= 0) {
            this.handler.plantSeed(this.controller.focusedCellIndex, seedId);
          }
          return;
        }
        yOff += 28;
        if (yOff > my + mh - 36) break;
      }
      if (y >= my + mh - 28 && y <= my + mh - 6) {
        this.controller.isSeedPickerOpen = false;
        return;
      }
    }
    handleShopClick(x, y, w, h) {
      const mw = 340;
      const mh = 280;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.controller.isShopOpen = false;
        return;
      }
      const tabW = Math.floor((mw - 24) / 3);
      const tabY = my + 32;
      if (y >= tabY && y <= tabY + 20) {
        if (x >= mx + 12 && x < mx + 12 + tabW) {
          this.selectedShopTab = "seeds";
          this.selectedShopIndex = 0;
          return;
        }
        if (x >= mx + 12 + tabW && x < mx + 12 + tabW * 2) {
          this.selectedShopTab = "animals";
          this.selectedShopIndex = 0;
          return;
        }
        if (x >= mx + 12 + tabW * 2 && x <= mx + mw - 12) {
          this.selectedShopTab = "fertilizer";
          this.selectedShopIndex = 0;
          return;
        }
      }
      let rowY = my + 58;
      const count = this.selectedShopTab === "seeds" ? 5 : this.selectedShopTab === "animals" ? 4 : 3;
      for (let i = 0; i < count; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
          this.selectedShopIndex = i;
          return;
        }
        rowY += 28;
      }
      const botY = my + mh - 30;
      if (y >= botY && y <= botY + 22) {
        if (x >= mx + 12 && x <= mx + 35) {
          this.shopQuantity = Math.max(1, this.shopQuantity - 1);
          return;
        }
        if (x >= mx + 55 && x <= mx + 82) {
          this.shopQuantity = Math.min(99, this.shopQuantity + 1);
          return;
        }
      }
      if (x >= mx + 95 && x <= mx + 210 && y >= botY && y <= botY + 22) {
        const itemId = this.selectedShopIndex + 1;
        this.handler.buySeed(itemId, this.shopQuantity);
        this.feedbackText = `\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u mua ${this.shopQuantity} v\u1EADt ph\u1EA9m!`;
        this.feedbackTimer = 60;
        return;
      }
      if (x >= mx + mw - 110 && x <= mx + mw - 12 && y >= botY && y <= botY + 22) {
        this.controller.isShopOpen = false;
        return;
      }
    }
    handleWarehouseClick(x, y, w, h) {
      const mw = 320;
      const mh = 250;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.controller.isWarehouseOpen = false;
        return;
      }
      const cropEntries = Array.from(this.model.crops.entries()).filter(([_, c]) => c > 0);
      let yOff = my + 36;
      for (const [cropId, count] of cropEntries) {
        if (y >= yOff && y <= yOff + 26) {
          this.controller.sellProduce(cropId, 1);
          return;
        }
        yOff += 28;
        if (yOff > my + mh - 36) break;
      }
      if (y >= my + mh - 28 && y <= my + mh - 6) {
        this.controller.isWarehouseOpen = false;
        return;
      }
    }
    handleConfirmOpenLandClick(x, y, w, h) {
      const mw = 280;
      const mh = 150;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + 16 && x <= mx + 131 && y >= my + mh - 30 && y <= my + mh - 6) {
        this.isConfirmOpenLand = false;
        this.handler.openLand(1);
        this.feedbackText = "\u0110ang g\u1EEDi y\xEAu c\u1EA7u m\u1EDF \xF4 \u0111\u1EA5t l\xEAn m\xE1y ch\u1EE7...";
        this.feedbackTimer = 60;
        return;
      }
      if (x >= mx + mw - 131 && x <= mx + mw - 16 && y >= my + mh - 30 && y <= my + mh - 6) {
        this.isConfirmOpenLand = false;
        return;
      }
    }
  };

  // packages/game-client/src/farm/FarmGateScreen.ts
  var import_j2me_compat3 = __toESM(require_dist());
  var FarmGateScreen = class extends GameScreen {
    network;
    skinPainter;
    font;
    controller;
    // Local player state
    localPlayer;
    // NPC lai.buon (ID 850)
    npcLaiBuon = {
      id: 850,
      name: "lai.buon",
      x: 140,
      y: 280,
      dir: 0,
      // Facing down
      frame: 0,
      wearing: [273, 326, 0, 82, 73, 297, 442]
      // Nón lá, áo bà ba, fishing rod
    };
    // Screen dimensions
    screenW = 640;
    screenH = 480;
    // Camera offset
    cameraX = 0;
    cameraY = 0;
    // Map dimensions
    MAP_WIDTH = 1296;
    MAP_HEIGHT = 466;
    // Asset Cache
    spriteCache = /* @__PURE__ */ new Map();
    isAssetsLoaded = false;
    isNight = false;
    // Animation ticks
    animTick = 0;
    // Active Dialog / Modal States
    isMenuOpen = false;
    isShopOpen = false;
    isLaiBuonDialogOpen = false;
    isFruitStallOpen = false;
    isFastFoodOpen = false;
    // Selection states
    selectedMenuIndex = 0;
    selectedLaiBuonIndex = 0;
    selectedShopTab = "seeds";
    selectedShopItemIndex = 0;
    shopQuantity = 1;
    selectedFruitIndex = 0;
    selectedFastFoodIndex = 0;
    // Floating notifications
    feedbackText = "Ch\xE0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi C\u1ED5ng N\xF4ng Tr\u1EA1i!";
    feedbackColor = "#facc15";
    feedbackTimer = 100;
    // Callbacks
    onEnterFarm;
    onExitToWorldMap;
    constructor(network, skinPainter, font, controller) {
      super();
      this.network = network;
      this.skinPainter = skinPainter;
      this.font = font;
      this.controller = controller;
      this.localPlayer = {
        id: this.network.myUserId || 1,
        name: "N\xF4ng d\xE2n",
        x: 434,
        y: 360,
        targetX: 434,
        targetY: 360,
        dir: 1,
        // Facing Up towards the gate
        state: "idle",
        wearing: [1, 2, 3],
        frame: 0
      };
      this.loadAssets().catch((err) => {
        console.error("[FarmGateScreen] Failed to load gate assets:", err);
      });
    }
    async loadAssets() {
      await Promise.all([
        this.preloadSprite("clouds_day", "/assets/bg/clouds_farm_day.png"),
        this.preloadSprite("clouds_night", "/assets/bg/clouds_farm_night.png"),
        this.preloadSprite("horizon_day", "/assets/bg/horizon_farm_day.png"),
        this.preloadSprite("horizon_night", "/assets/bg/horizon_farm_night.png"),
        this.preloadSprite("backdrop", "/assets/farm_gate/map23_backdrop.png"),
        this.preloadSprite("gateArch", "/assets/farm_gate/gate_arch.png"),
        this.preloadSprite("fruitStall", "/assets/farm_gate/fruit_stall.png"),
        this.preloadSprite("shopBuilding", "/assets/farm_gate/cua_hang.png"),
        this.preloadSprite("xeKem", "/assets/farm_gate/xe_kem.png"),
        this.preloadSprite("coin", "/assets/farm_ui/coin.png")
      ]);
      this.isAssetsLoaded = true;
      console.log("[FarmGateScreen] Authentic HD gate assets loaded successfully");
    }
    async preloadSprite(key, url) {
      try {
        const img = await import_j2me_compat3.Image.createImage(url);
        this.spriteCache.set(key, img);
        return img;
      } catch (err) {
        console.warn(`[FarmGateScreen] Failed to load sprite ${key} from ${url}:`, err);
        return void 0;
      }
    }
    /**
     * Main Simulation Update (20 ticks/sec)
     */
    update() {
      this.animTick++;
      if (this.feedbackTimer > 0) {
        this.feedbackTimer--;
      }
      if (this.localPlayer.x !== this.localPlayer.targetX || this.localPlayer.y !== this.localPlayer.targetY) {
        this.localPlayer.state = "walk";
        const dx = this.localPlayer.targetX - this.localPlayer.x;
        const dy = this.localPlayer.targetY - this.localPlayer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 4;
        if (dist <= speed) {
          this.localPlayer.x = this.localPlayer.targetX;
          this.localPlayer.y = this.localPlayer.targetY;
          this.localPlayer.state = "idle";
          this.checkTriggerZones();
        } else {
          const nextX = this.localPlayer.x + Math.round(dx / dist * speed);
          const nextY = this.localPlayer.y + Math.round(dy / dist * speed);
          if (Math.abs(dx) > Math.abs(dy)) {
            this.localPlayer.dir = dx > 0 ? 3 : 2;
          } else {
            this.localPlayer.dir = dy > 0 ? 0 : 1;
          }
          if (this.isWalkable(nextX, nextY)) {
            this.localPlayer.x = nextX;
            this.localPlayer.y = nextY;
          } else if (this.isWalkable(nextX, this.localPlayer.y)) {
            this.localPlayer.x = nextX;
          } else if (this.isWalkable(this.localPlayer.x, nextY)) {
            this.localPlayer.y = nextY;
          } else {
            this.localPlayer.targetX = this.localPlayer.x;
            this.localPlayer.targetY = this.localPlayer.y;
            this.localPlayer.state = "idle";
            this.checkTriggerZones();
          }
          this.checkMidWalkTriggers();
        }
        if (this.animTick % 3 === 0) {
          this.localPlayer.frame = (this.localPlayer.frame + 1) % 3;
        }
      } else {
        this.localPlayer.state = "idle";
        this.localPlayer.frame = 0;
      }
      this.updateCamera();
    }
    /**
     * Authentic walkable area calculation
     */
    isWalkable(x, y) {
      if (x < 40 || x > 1260) return false;
      if (y >= 290 && y <= 415) return true;
      if (x >= 395 && x <= 475 && y >= 210 && y < 290) return true;
      if (x >= 715 && x <= 790 && y >= 220 && y < 290) return true;
      if (x >= 100 && x <= 180 && y >= 260 && y < 290) return true;
      if (x >= 890 && x <= 970 && y >= 260 && y < 290) return true;
      return false;
    }
    /**
     * Fast trigger check while walking through doorways
     */
    checkMidWalkTriggers() {
      if (Math.abs(this.localPlayer.x - 434) <= 40 && this.localPlayer.y <= 225) {
        this.promptEnterFarm();
        return;
      }
      if (Math.abs(this.localPlayer.x - 434) <= 45 && this.localPlayer.y >= 405) {
        this.promptExitToWorldMap();
        return;
      }
    }
    /**
     * Check interactive zones when player stops walking
     */
    checkTriggerZones() {
      if (Math.abs(this.localPlayer.x - 434) <= 45 && this.localPlayer.y <= 235) {
        this.promptEnterFarm();
        return;
      }
      if (Math.abs(this.localPlayer.x - 755) <= 45 && this.localPlayer.y <= 245) {
        this.openShop();
        return;
      }
      if (Math.abs(this.localPlayer.x - 600) <= 50 && Math.abs(this.localPlayer.y - 310) <= 35) {
        this.openFruitStall();
        return;
      }
      if (Math.abs(this.localPlayer.x - 140) <= 45 && Math.abs(this.localPlayer.y - 280) <= 35) {
        this.openLaiBuonDialog();
        return;
      }
      if (Math.abs(this.localPlayer.x - 930) <= 50 && Math.abs(this.localPlayer.y - 280) <= 35) {
        this.openFastFoodDialog();
        return;
      }
      if (Math.abs(this.localPlayer.x - 434) <= 50 && this.localPlayer.y >= 400) {
        this.promptExitToWorldMap();
        return;
      }
    }
    /**
     * Smooth Camera Tracking centered on player
     */
    updateCamera() {
      const targetCamX = this.localPlayer.x - Math.floor(this.screenW / 2);
      const maxCamX = Math.max(0, this.MAP_WIDTH - this.screenW);
      this.cameraX = Math.max(0, Math.min(targetCamX, maxCamX));
      if (this.screenH >= this.MAP_HEIGHT) {
        this.cameraY = 0;
      } else {
        const targetCamY = this.localPlayer.y - Math.floor(this.screenH / 2);
        const maxCamY = this.MAP_HEIGHT - this.screenH;
        this.cameraY = Math.max(0, Math.min(targetCamY, maxCamY));
      }
    }
    /**
     * Main WebGL2 Paint Routine
     */
    paint(g) {
      const w = g.getClipWidth();
      const h = g.getClipHeight();
      this.screenW = w;
      this.screenH = h;
      const isForcedDay = typeof window !== "undefined" && (new URLSearchParams(window.location.search).has("day") || window.__FORCE_DAY);
      const hour = (/* @__PURE__ */ new Date()).getHours();
      this.isNight = isForcedDay ? false : hour >= 18 || hour < 6;
      if (this.isNight) {
        g.setColor(21);
      } else {
        g.setColor(6143735);
      }
      g.fillRect(0, 0, w, h);
      const groundBaseY = Math.max(0, h - this.MAP_HEIGHT);
      this.paintParallaxSky(g, w, groundBaseY);
      this.paintParallaxHorizon(g, w, groundBaseY);
      g.translate(-this.cameraX, -this.cameraY + groundBaseY);
      this.paintGateBackdrop(g);
      this.paintScenery(g);
      this.paintNpcLaiBuon(g);
      this.paintPlayer(g);
      this.paintGuideArrows(g);
      g.translate(this.cameraX, this.cameraY - groundBaseY);
      this.paintHUD(g, w, h);
      if (this.isMenuOpen) {
        this.paintQuickMenu(g, w, h);
      } else if (this.isLaiBuonDialogOpen) {
        this.paintLaiBuonDialog(g, w, h);
      } else if (this.isShopOpen) {
        this.paintShopDialog(g, w, h);
      } else if (this.isFruitStallOpen) {
        this.paintFruitStallDialog(g, w, h);
      } else if (this.isFastFoodOpen) {
        this.paintFastFoodDialog(g, w, h);
      }
    }
    /**
     * Parallax Sky & Clouds
     */
    paintParallaxSky(g, screenW, groundBaseY) {
      const suffix = this.isNight ? "night" : "day";
      const cloudsImg = this.spriteCache.get(`clouds_${suffix}`);
      if (!cloudsImg) return;
      const cloudW = cloudsImg.getWidth();
      const parallaxX = -Math.floor(this.cameraX * 0.15) % cloudW;
      const startX = parallaxX > 0 ? parallaxX - cloudW : parallaxX;
      const cloudY = Math.max(0, groundBaseY - 30);
      for (let x = startX; x < screenW; x += cloudW) {
        g.drawImage(cloudsImg, x, cloudY, 0);
      }
    }
    /**
     * Parallax Horizon (Green Fields in background)
     */
    paintParallaxHorizon(g, screenW, groundBaseY) {
      const suffix = this.isNight ? "night" : "day";
      const horizonImg = this.spriteCache.get(`horizon_${suffix}`);
      if (!horizonImg) return;
      const horW = horizonImg.getWidth();
      const parallaxX = -Math.floor(this.cameraX * 0.35) % horW;
      const startX = parallaxX > 0 ? parallaxX - horW : parallaxX;
      const horY = groundBaseY + 80;
      for (let x = startX; x < screenW; x += horW) {
        g.drawImage(horizonImg, x, horY, 0);
      }
    }
    /**
     * Paint authentic seamless composite backdrop (Map 23)
     */
    paintGateBackdrop(g) {
      const backdrop = this.spriteCache.get("backdrop");
      if (backdrop) {
        g.drawImage(backdrop, 0, 0, 0);
      }
    }
    /**
     * Paint Authentic Scenery:
     * 1. Gate Arch (ID 831) at the entrance to Farm
     * 2. Fruit & Vegetable Stall (ID 1214) between FARM gate and CỬA HÀNG
     * 3. CỬA HÀNG building (ID 835)
     * 4. Xe Kem Đồ Ăn Nhanh (ID 842) on the lawn to the right of CỬA HÀNG
     */
    paintScenery(g) {
      const gateArch = this.spriteCache.get("gateArch");
      if (gateArch) {
        g.drawImage(gateArch, 341, 146, 0);
      }
      const fruitStall = this.spriteCache.get("fruitStall");
      if (fruitStall) {
        g.drawImage(fruitStall, 518, 140, 0);
      }
      const shop = this.spriteCache.get("shopBuilding");
      if (shop) {
        g.drawImage(shop, 658, 144, 0);
      }
      const xeKem = this.spriteCache.get("xeKem");
      if (xeKem) {
        g.drawImage(xeKem, 888, 176, 0);
      }
    }
    /**
     * Paint NPC lai.buon with conical hat, áo bà ba, and fishing rod
     */
    paintNpcLaiBuon(g) {
      const nx = this.npcLaiBuon.x;
      const ny = this.npcLaiBuon.y;
      g.setColor(1120295);
      g.fillArc(nx - 9, ny - 2, 18, 6, 0, 360);
      AvatarRenderer.paintAvatar(
        g,
        nx,
        ny,
        this.npcLaiBuon.wearing,
        this.npcLaiBuon.dir,
        this.npcLaiBuon.frame,
        this.npcLaiBuon.name,
        false,
        this.font
      );
    }
    /**
     * Paint Local Player Avatar
     */
    paintPlayer(g) {
      const px = this.localPlayer.x;
      const py = this.localPlayer.y;
      g.setColor(1120295);
      g.fillArc(px - 9, py - 2, 18, 6, 0, 360);
      AvatarRenderer.paintAvatar(
        g,
        px,
        py,
        this.localPlayer.wearing,
        this.localPlayer.dir,
        this.localPlayer.frame,
        this.localPlayer.name,
        true,
        this.font
      );
    }
    /**
     * Paint animated yellow downward arrows ("Vào") matching authentic Avatar 2.5.8
     */
    paintGuideArrows(g) {
      const bounce = Math.floor(this.animTick % 12 / 4);
      this.paintYellowArrow(g, 434, 230 + bounce, "V\xE0o");
      this.paintYellowArrow(g, 600, 235 + bounce, "V\xE0o");
      this.paintYellowArrow(g, 760, 240 + bounce, "V\xE0o");
      this.paintYellowArrow(g, 140, 245 + bounce, "V\xE0o");
      this.paintYellowArrow(g, 434, 405 + bounce, "V\xE0o");
    }
    paintYellowArrow(g, x, y, text) {
      this.font.drawString(g, text, x, y - 10, 2);
      g.setColor(16436245);
      for (let row = 0; row < 6; row++) {
        g.fillRect(x - (5 - row), y + row, (5 - row) * 2 + 1, 1);
      }
    }
    /**
     * Paint Top HUD Status Bar
     */
    paintHUD(g, w, h) {
      const coinImg = this.spriteCache.get("coin");
      g.setColor(1976635);
      g.fillRect(6, 6, 26, 22);
      g.setColor(6583435);
      g.drawRect(6, 6, 26, 22);
      g.setColor(16777215);
      g.fillRect(10, 11, 18, 2);
      g.fillRect(10, 16, 18, 2);
      g.fillRect(10, 21, 18, 2);
      const title = "C\u1ED5ng n\xF4ng tr\u1EA1i (Map 23)";
      this.font.drawString(g, title, Math.floor(w / 2), 10, 2);
      const xuVal = Number(this.controller?.model.userXu || 0);
      const xuStr = `${xuVal.toLocaleString("vi-VN")} Xu`;
      const textW = xuStr.length * 7;
      const startX = w - textW - 32;
      if (coinImg) {
        g.drawImage(coinImg, startX, 8, 0);
      }
      this.font.drawString(g, xuStr, startX + 22, 10, 0);
      if (this.feedbackTimer > 0) {
        const boxW = Math.min(w - 40, this.feedbackText.length * 8 + 24);
        const boxX = Math.floor((w - boxW) / 2);
        const boxY = 36;
        g.setColor(988970);
        g.fillRect(boxX, boxY, boxW, 22);
        g.setColor(3718648);
        g.drawRect(boxX, boxY, boxW, 22);
        this.font.drawString(g, this.feedbackText, Math.floor(w / 2), boxY + 4, 2);
      }
    }
    // =========================================================================
    // Authentic 1:1 J2ME Dialogs & Menus
    // =========================================================================
    /**
     * 1. Authentic Quick Menu
     */
    paintQuickMenu(g, w, h) {
      const mw = 220;
      const mh = 210;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "C\u1ED4NG N\xD4NG TR\u1EA0I");
      const items = [
        "1. V\xE0o N\xF4ng Tr\u1EA1i (Map 25)",
        "2. C\u1EEDa H\xE0ng H\u1EA1t Gi\u1ED1ng",
        "3. G\u1EB7p L\xE1i Bu\xF4n (lai.buon)",
        "4. S\u1EA1p Hoa Qu\u1EA3 N\xF4ng S\u1EA3n",
        "5. Xe Kem & \u0110\u1ED3 \u0102n Nhanh",
        "6. V\u1EC1 L\u1EA1i Th\xE0nh Ph\u1ED1"
      ];
      let rowY = my + 34;
      for (let i = 0; i < items.length; i++) {
        const isSel = i === this.selectedMenuIndex;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 24, items[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, mx + 12, my + mh - 26, 90, 20, "Ch\u1ECDn", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 102, my + mh - 26, 90, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 2. Authentic NPC lai.buon Dialog
     */
    paintLaiBuonDialog(g, w, h) {
      const dw = 300;
      const dh = 240;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, "L\xC1I BU\xD4N N\xD4NG S\u1EA2N");
      this.font.drawString(g, "L\xE1i Bu\xF4n:", dx + 12, dy + 34, 0);
      this.font.drawString(g, '"Ch\xE0o b\xE0 con! T\xF4i thu mua n\xF4ng s\u1EA3n', dx + 12, dy + 48, 0);
      this.font.drawString(g, 'v\u1EDBi gi\xE1 t\u1ED1t nh\u1EA5t v\xE0 cung c\u1EA5p ph\xE2n b\xF3n!"', dx + 12, dy + 62, 0);
      const options = [
        "1. B\xE1n n\xF4ng s\u1EA3n \u0111\xE3 thu ho\u1EA1ch",
        "2. B\xE1n t\u1EA5t c\u1EA3 n\xF4ng s\u1EA3n trong kho",
        "3. Mua ph\xE2n b\xF3n cao c\u1EA5p (500 Xu)"
      ];
      let rowY = dy + 82;
      for (let i = 0; i < options.length; i++) {
        const isSel = i === this.selectedLaiBuonIndex;
        this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 24, options[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, "Ch\u1ECDn", "primary");
      this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 3. Authentic CỬA HÀNG (Farm Store) Dialog
     */
    paintShopDialog(g, w, h) {
      const mw = 340;
      const mh = 280;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      this.skinPainter.paintAuthenticDialog(g, mx, my, mw, mh, "C\u1EECA H\xC0NG N\xD4NG TR\u1EA0I");
      const tabW = Math.floor((mw - 24) / 3);
      const tabY = my + 32;
      const tabs = [
        { id: "seeds", label: "H\u1EA1t gi\u1ED1ng" },
        { id: "animals", label: "V\u1EADt nu\xF4i" },
        { id: "fertilizer", label: "Ph\xE2n b\xF3n" }
      ];
      for (let i = 0; i < tabs.length; i++) {
        const t = tabs[i];
        const isSelected = this.selectedShopTab === t.id;
        const tx = mx + 12 + i * tabW;
        g.setColor(isSelected ? 16498468 : 16708551);
        g.fillRect(tx, tabY, tabW - 4, 20);
        g.setColor(isSelected ? 14251782 : 7877903);
        g.drawRect(tx, tabY, tabW - 4, 20);
        this.font.drawString(g, t.label, tx + Math.floor((tabW - 4) / 2), tabY + 4, 2);
      }
      let items = [];
      if (this.selectedShopTab === "seeds") {
        items = [
          { id: 1, name: "C\xE0 chua", price: 100, detail: "5 ph\xFAt" },
          { id: 2, name: "C\xE0 r\u1ED1t", price: 150, detail: "8 ph\xFAt" },
          { id: 3, name: "Kh\xF3m (D\u1EE9a)", price: 300, detail: "15 ph\xFAt" },
          { id: 4, name: "D\u01B0a h\u1EA5u", price: 500, detail: "25 ph\xFAt" },
          { id: 5, name: "B\u1EAFp (Ng\xF4)", price: 200, detail: "10 ph\xFAt" }
        ];
      } else if (this.selectedShopTab === "animals") {
        items = [
          { id: 1, name: "G\xE0 con", price: 5e3, detail: "Nu\xF4i l\u1EA5y tr\u1EE9ng" },
          { id: 2, name: "V\u1ECBt con", price: 4e3, detail: "Nu\xF4i l\u1EA5y tr\u1EE9ng" },
          { id: 3, name: "Heo gi\u1ED1ng", price: 1e4, detail: "Nu\xF4i l\u1EA5y th\u1ECBt" },
          { id: 4, name: "B\xF2 s\u1EEFa gi\u1ED1ng", price: 2e4, detail: "V\u1EAFt s\u1EEFa t\u01B0\u01A1i" }
        ];
      } else {
        items = [
          { id: 1, name: "Ph\xE2n b\xF3n lo\u1EA1i 1", price: 500, detail: "-50% th\u1EDDi gian" },
          { id: 2, name: "Thu\u1ED1c tr\u1EEB s\xE2u", price: 300, detail: "Di\u1EC7t s\xE2u b\u1ECD" },
          { id: 3, name: "Thu\u1ED1c h\u1ED3i ph\u1EE5c", price: 400, detail: "H\u1ED3i sinh c\xE2y" }
        ];
      }
      let rowY = my + 58;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const isSel = i === this.selectedShopItemIndex;
        const text = `${item.name} (${item.detail})`;
        const priceText = `${item.price.toLocaleString("vi-VN")} Xu`;
        this.skinPainter.paintAuthenticOption(g, mx + 8, rowY, mw - 16, 26, text, isSel, priceText);
        rowY += 28;
      }
      const botY = my + mh - 30;
      g.setColor(16708551);
      g.fillRect(mx + 12, botY, 70, 22);
      g.setColor(7877903);
      g.drawRect(mx + 12, botY, 70, 22);
      this.font.drawString(g, "-", mx + 20, botY + 4, 2);
      this.font.drawString(g, `${this.shopQuantity}`, mx + 47, botY + 4, 2);
      this.font.drawString(g, "+", mx + 74, botY + 4, 2);
      this.skinPainter.paintAuthenticButton(g, mx + 95, botY, 115, 22, "Mua v\u1EADt ph\u1EA9m", "primary");
      this.skinPainter.paintAuthenticButton(g, mx + mw - 110, botY, 98, 22, "\u0110\xF3ng", "secondary");
    }
    /**
     * 4. Authentic Sạp Hoa Quả (Fruit Stall) Dialog
     */
    paintFruitStallDialog(g, w, h) {
      const dw = 300;
      const dh = 240;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, "S\u1EA0P HOA QU\u1EA2 & N\xD4NG S\u1EA2N");
      this.font.drawString(g, "C\xF4 Ch\u1EE7 S\u1EA1p:", dx + 12, dy + 34, 0);
      this.font.drawString(g, '"Hoa qu\u1EA3 t\u01B0\u01A1i m\u1EDBi h\xE1i, ngon ng\u1ECDt thanh m\xE1t!', dx + 12, dy + 48, 0);
      this.font.drawString(g, 'B\xE0 con gh\xE9 s\u1EA1p xem gi\xE1 ho\u1EB7c b\xE1n n\xF4ng s\u1EA3n nh\xE9!"', dx + 12, dy + 62, 0);
      const options = [
        "1. B\xE1n D\u01B0a h\u1EA5u t\u01B0\u01A1i (500 Xu/qu\u1EA3)",
        "2. B\xE1n C\xE0 chua m\u1ECDng (150 Xu/qu\u1EA3)",
        "3. B\xE1n C\xE0 r\u1ED1t t\u01B0\u01A1i (200 Xu/c\u1EE7)",
        "4. B\xE1n B\u1EAFp ng\u1ECDt (250 Xu/b\u1EAFp)"
      ];
      let rowY = dy + 82;
      for (let i = 0; i < options.length; i++) {
        const isSel = i === this.selectedFruitIndex;
        this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 24, options[i], isSel);
        rowY += 26;
      }
      this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, "B\xE1n h\xE0ng", "primary");
      this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, "\u0110\xF3ng", "secondary");
    }
    /**
     * 5. Authentic Xe Kem Đồ Ăn Nhanh Dialog
     */
    paintFastFoodDialog(g, w, h) {
      const dw = 300;
      const dh = 250;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      this.skinPainter.paintAuthenticDialog(g, dx, dy, dw, dh, "XE KEM & \u0110\u1ED2 \u0102N NHANH");
      this.font.drawString(g, "Th\u1EF1c \u0111\u01A1n n\u1EA1p l\u1EA1i n\u0103ng l\u01B0\u1EE3ng cho n\xF4ng d\xE2n:", dx + 12, dy + 34, 0);
      const menu = [
        { name: "1. Kem \u1ED1c qu\u1EBF", price: 50, energy: "+20 N\u0103ng l\u01B0\u1EE3ng" },
        { name: "2. Kem ly d\xE2u t\xE2y", price: 100, energy: "+40 N\u0103ng l\u01B0\u1EE3ng" },
        { name: "3. B\xE1nh m\xEC th\u1ECBt gi\xF2n", price: 200, energy: "+80 N\u0103ng l\u01B0\u1EE3ng" },
        { name: "4. N\u01B0\u1EDBc m\xEDa ng\u1ECDt m\xE1t", price: 50, energy: "+25 N\u0103ng l\u01B0\u1EE3ng" }
      ];
      let rowY = dy + 54;
      for (let i = 0; i < menu.length; i++) {
        const item = menu[i];
        const isSel = i === this.selectedFastFoodIndex;
        const text = `${item.name} (${item.energy})`;
        const priceText = `${item.price} Xu`;
        this.skinPainter.paintAuthenticOption(g, dx + 8, rowY, dw - 16, 26, text, isSel, priceText);
        rowY += 28;
      }
      this.skinPainter.paintAuthenticButton(g, dx + 16, dy + dh - 26, 120, 20, "Mua \u0103n ngay", "primary");
      this.skinPainter.paintAuthenticButton(g, dx + dw - 136, dy + dh - 26, 120, 20, "\u0110\xF3ng", "secondary");
    }
    // =========================================================================
    // User Input & Interaction Handling
    // =========================================================================
    pointerPressed(x, y) {
      const w = this.screenW;
      const h = this.screenH;
      if (this.isLaiBuonDialogOpen) {
        this.handleLaiBuonClick(x, y, w, h);
        return;
      }
      if (this.isShopOpen) {
        this.handleShopClick(x, y, w, h);
        return;
      }
      if (this.isFruitStallOpen) {
        this.handleFruitStallClick(x, y, w, h);
        return;
      }
      if (this.isFastFoodOpen) {
        this.handleFastFoodClick(x, y, w, h);
        return;
      }
      if (this.isMenuOpen) {
        this.handleMenuClick(x, y, w, h);
        return;
      }
      if (x >= 6 && x <= 32 && y >= 6 && y <= 28) {
        this.isMenuOpen = !this.isMenuOpen;
        return;
      }
      const groundBaseY = Math.max(0, h - this.MAP_HEIGHT);
      const worldX = x + this.cameraX;
      const worldY = y + this.cameraY - groundBaseY;
      if (Math.abs(worldX - 434) < 55 && worldY <= 260 && worldY >= 140) {
        const dist = Math.hypot(this.localPlayer.x - 434, this.localPlayer.y - 220);
        if (dist <= 45) {
          this.promptEnterFarm();
        } else {
          this.localPlayer.targetX = 434;
          this.localPlayer.targetY = 220;
          this.feedbackText = "\u0110ang ti\u1EBFn v\xE0o c\u1ED5ng N\xF4ng Tr\u1EA1i...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (Math.abs(worldX - 755) < 55 && worldY <= 265 && worldY >= 140) {
        const dist = Math.hypot(this.localPlayer.x - 755, this.localPlayer.y - 230);
        if (dist <= 45) {
          this.openShop();
        } else {
          this.localPlayer.targetX = 755;
          this.localPlayer.targetY = 230;
          this.feedbackText = "\u0110ang \u0111i \u0111\u1EBFn C\u1EEDa H\xE0ng...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 500 && worldX <= 670 && worldY >= 160 && worldY <= 320) {
        const dist = Math.hypot(this.localPlayer.x - 600, this.localPlayer.y - 310);
        if (dist <= 50) {
          this.openFruitStall();
        } else {
          this.localPlayer.targetX = 600;
          this.localPlayer.targetY = 310;
          this.feedbackText = "\u0110ang \u0111\u1EBFn s\u1EA1p hoa qu\u1EA3 n\xF4ng s\u1EA3n...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (Math.abs(worldX - 140) < 55 && worldY <= 300 && worldY >= 200) {
        const dist = Math.hypot(this.localPlayer.x - 140, this.localPlayer.y - 275);
        if (dist <= 50) {
          this.openLaiBuonDialog();
        } else {
          this.localPlayer.targetX = 140;
          this.localPlayer.targetY = 275;
          this.feedbackText = "\u0110ang g\u1EB7p L\xE1i Bu\xF4n...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (worldX >= 860 && worldX <= 990 && worldY >= 160 && worldY <= 300) {
        const dist = Math.hypot(this.localPlayer.x - 930, this.localPlayer.y - 280);
        if (dist <= 50) {
          this.openFastFoodDialog();
        } else {
          this.localPlayer.targetX = 930;
          this.localPlayer.targetY = 280;
          this.feedbackText = "\u0110ang \u0111\u1EBFn xe kem & \u0111\u1ED3 \u0103n nhanh...";
          this.feedbackTimer = 50;
        }
        return;
      }
      if (Math.abs(worldX - 434) < 60 && worldY >= 380) {
        const dist = Math.hypot(this.localPlayer.x - 434, this.localPlayer.y - 410);
        if (dist <= 50) {
          this.promptExitToWorldMap();
        } else {
          this.localPlayer.targetX = 434;
          this.localPlayer.targetY = 410;
          this.feedbackText = "\u0110ang ra ngo\xE0i Th\xE0nh Ph\u1ED1...";
          this.feedbackTimer = 50;
        }
        return;
      }
      const clampedX = Math.max(50, Math.min(worldX, 1250));
      const clampedY = Math.max(300, Math.min(worldY, 410));
      this.localPlayer.targetX = clampedX;
      this.localPlayer.targetY = clampedY;
    }
    // --- Modal Click Handlers ---
    handleLaiBuonClick(x, y, w, h) {
      const dw = 300;
      const dh = 240;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
        this.isLaiBuonDialogOpen = false;
        return;
      }
      let rowY = dy + 82;
      for (let i = 0; i < 3; i++) {
        if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedLaiBuonIndex = i;
          return;
        }
        rowY += 26;
      }
      if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        if (this.selectedLaiBuonIndex === 0) {
          if (this.controller) {
            this.controller.isWarehouseOpen = true;
            this.isLaiBuonDialogOpen = false;
          }
        } else if (this.selectedLaiBuonIndex === 1) {
          if (this.controller) {
            this.controller.sellAllHarvested();
            this.feedbackText = "\u0110\xE3 b\xE1n t\u1EA5t c\u1EA3 n\xF4ng s\u1EA3n cho L\xE1i Bu\xF4n!";
            this.feedbackTimer = 80;
            this.isLaiBuonDialogOpen = false;
          }
        } else if (this.selectedLaiBuonIndex === 2) {
          if (this.controller) {
            this.controller.buySeed(10, 1);
            this.feedbackText = "\u0110\xE3 mua 1 bao ph\xE2n b\xF3n cao c\u1EA5p!";
            this.feedbackTimer = 80;
          }
        }
        return;
      }
      if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        this.isLaiBuonDialogOpen = false;
        return;
      }
    }
    handleShopClick(x, y, w, h) {
      const mw = 340;
      const mh = 280;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (x >= mx + mw - 24 && x <= mx + mw && y >= my && y <= my + 24) {
        this.isShopOpen = false;
        return;
      }
      const tabW = Math.floor((mw - 24) / 3);
      const tabY = my + 32;
      if (y >= tabY && y <= tabY + 20) {
        if (x >= mx + 12 && x < mx + 12 + tabW) {
          this.selectedShopTab = "seeds";
          this.selectedShopItemIndex = 0;
          return;
        }
        if (x >= mx + 12 + tabW && x < mx + 12 + tabW * 2) {
          this.selectedShopTab = "animals";
          this.selectedShopItemIndex = 0;
          return;
        }
        if (x >= mx + 12 + tabW * 2 && x <= mx + mw - 12) {
          this.selectedShopTab = "fertilizer";
          this.selectedShopItemIndex = 0;
          return;
        }
      }
      let rowY = my + 58;
      const itemCount = this.selectedShopTab === "seeds" ? 5 : this.selectedShopTab === "animals" ? 4 : 3;
      for (let i = 0; i < itemCount; i++) {
        if (x >= mx + 8 && x <= mx + mw - 8 && y >= rowY && y <= rowY + 26) {
          this.selectedShopItemIndex = i;
          return;
        }
        rowY += 28;
      }
      const botY = my + mh - 30;
      if (y >= botY && y <= botY + 22) {
        if (x >= mx + 12 && x <= mx + 35) {
          this.shopQuantity = Math.max(1, this.shopQuantity - 1);
          return;
        }
        if (x >= mx + 55 && x <= mx + 82) {
          this.shopQuantity = Math.min(99, this.shopQuantity + 1);
          return;
        }
      }
      if (x >= mx + 95 && x <= mx + 210 && y >= botY && y <= botY + 22) {
        if (this.controller) {
          const itemId = this.selectedShopItemIndex + 1;
          this.controller.buySeed(itemId, this.shopQuantity);
          this.feedbackText = `\u0110\xE3 g\u1EEDi y\xEAu c\u1EA7u mua ${this.shopQuantity} v\u1EADt ph\u1EA9m!`;
          this.feedbackTimer = 60;
        }
        return;
      }
      if (x >= mx + mw - 110 && x <= mx + mw - 12 && y >= botY && y <= botY + 22) {
        this.isShopOpen = false;
        return;
      }
    }
    handleFruitStallClick(x, y, w, h) {
      const dw = 300;
      const dh = 240;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
        this.isFruitStallOpen = false;
        return;
      }
      let rowY = dy + 82;
      for (let i = 0; i < 4; i++) {
        if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 24) {
          this.selectedFruitIndex = i;
          return;
        }
        rowY += 26;
      }
      if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        if (this.controller) {
          const cropId = this.selectedFruitIndex === 0 ? 4 : this.selectedFruitIndex === 1 ? 1 : this.selectedFruitIndex === 2 ? 2 : 5;
          this.controller.sellProduce(cropId, 1);
          this.feedbackText = "\u0110\xE3 b\xE1n 1 ph\u1EA7n n\xF4ng s\u1EA3n v\xE0o s\u1EA1p hoa qu\u1EA3!";
          this.feedbackTimer = 60;
        }
        return;
      }
      if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        this.isFruitStallOpen = false;
        return;
      }
    }
    handleFastFoodClick(x, y, w, h) {
      const dw = 300;
      const dh = 250;
      const dx = Math.floor((w - dw) / 2);
      const dy = Math.floor((h - dh) / 2);
      if (x >= dx + dw - 24 && x <= dx + dw && y >= dy && y <= dy + 24) {
        this.isFastFoodOpen = false;
        return;
      }
      let rowY = dy + 54;
      for (let i = 0; i < 4; i++) {
        if (x >= dx + 8 && x <= dx + dw - 8 && y >= rowY && y <= rowY + 26) {
          this.selectedFastFoodIndex = i;
          return;
        }
        rowY += 28;
      }
      if (x >= dx + 16 && x <= dx + 136 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        const items = ["Kem \u1ED1c qu\u1EBF", "Kem ly d\xE2u", "B\xE1nh m\xEC th\u1ECBt", "N\u01B0\u1EDBc m\xEDa"];
        this.feedbackText = `\u0110\xE3 th\u01B0\u1EDFng th\u1EE9c ${items[this.selectedFastFoodIndex]}! H\u1ED3i ph\u1EE5c n\u0103ng l\u01B0\u1EE3ng!`;
        this.feedbackTimer = 80;
        this.isFastFoodOpen = false;
        return;
      }
      if (x >= dx + dw - 136 && x <= dx + dw - 16 && y >= dy + dh - 28 && y <= dy + dh - 6) {
        this.isFastFoodOpen = false;
        return;
      }
    }
    handleMenuClick(screenX, screenY, w, h) {
      const mw = 220;
      const mh = 210;
      const mx = Math.floor((w - mw) / 2);
      const my = Math.floor((h - mh) / 2);
      if (screenX < mx || screenX > mx + mw || screenY < my || screenY > my + mh) {
        this.isMenuOpen = false;
        return;
      }
      let rowY = my + 34;
      for (let i = 0; i < 6; i++) {
        if (screenX >= mx + 8 && screenX <= mx + mw - 8 && screenY >= rowY && screenY <= rowY + 24) {
          this.selectedMenuIndex = i;
          this.executeMenuItem(i);
          return;
        }
        rowY += 26;
      }
      if (screenX >= mx + 12 && screenX <= mx + 102 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
        this.executeMenuItem(this.selectedMenuIndex);
        return;
      }
      if (screenX >= mx + mw - 102 && screenX <= mx + mw - 12 && screenY >= my + mh - 26 && screenY <= my + mh - 6) {
        this.isMenuOpen = false;
        return;
      }
    }
    executeMenuItem(index) {
      this.isMenuOpen = false;
      switch (index) {
        case 0:
          this.promptEnterFarm();
          break;
        case 1:
          this.openShop();
          break;
        case 2:
          this.openLaiBuonDialog();
          break;
        case 3:
          this.openFruitStall();
          break;
        case 4:
          this.openFastFoodDialog();
          break;
        case 5:
          this.promptExitToWorldMap();
          break;
      }
    }
    keyPressed(keyCode) {
      const step = 20;
      switch (keyCode) {
        case -1:
        // Up
        case 50:
        // '2'
        case 119:
        // 'w'
        case 87:
          if (this.isWalkable(this.localPlayer.x, this.localPlayer.y - step)) {
            this.localPlayer.targetY = this.localPlayer.y - step;
          }
          break;
        case -2:
        // Down
        case 56:
        // '8'
        case 115:
        // 's'
        case 83:
          if (this.isWalkable(this.localPlayer.x, this.localPlayer.y + step)) {
            this.localPlayer.targetY = this.localPlayer.y + step;
          }
          break;
        case -3:
        // Left
        case 52:
        // '4'
        case 97:
        // 'a'
        case 65:
          if (this.isWalkable(this.localPlayer.x - step, this.localPlayer.y)) {
            this.localPlayer.targetX = this.localPlayer.x - step;
          }
          break;
        case -4:
        // Right
        case 54:
        // '6'
        case 100:
        // 'd'
        case 68:
          if (this.isWalkable(this.localPlayer.x + step, this.localPlayer.y)) {
            this.localPlayer.targetX = this.localPlayer.x + step;
          }
          break;
        case -5:
        // Center / Fire / OK
        case 53:
        // '5'
        case 13:
        // Enter
        case 32:
          this.interactNearest();
          break;
      }
    }
    interactNearest() {
      const px = this.localPlayer.x;
      const py = this.localPlayer.y;
      const distGate = Math.hypot(px - 434, py - 220);
      const distStore = Math.hypot(px - 755, py - 230);
      const distFruit = Math.hypot(px - 600, py - 310);
      const distLaiBuon = Math.hypot(px - 140, py - 275);
      const distXeKem = Math.hypot(px - 930, py - 280);
      const distExit = Math.hypot(px - 434, py - 410);
      const minDist = Math.min(distGate, distStore, distFruit, distLaiBuon, distXeKem, distExit);
      if (minDist === distGate && distGate < 120) {
        this.promptEnterFarm();
      } else if (minDist === distStore && distStore < 120) {
        this.openShop();
      } else if (minDist === distFruit && distFruit < 120) {
        this.openFruitStall();
      } else if (minDist === distLaiBuon && distLaiBuon < 120) {
        this.openLaiBuonDialog();
      } else if (minDist === distXeKem && distXeKem < 120) {
        this.openFastFoodDialog();
      } else if (minDist === distExit && distExit < 100) {
        this.promptExitToWorldMap();
      } else {
        this.isMenuOpen = true;
      }
    }
    promptEnterFarm() {
      console.log("[FarmGateScreen] Transitioning into Private Farm (Map 25)...");
      this.feedbackText = "\u0110ang v\xE0o N\xF4ng Tr\u1EA1i c\u1EE7a b\u1EA1n...";
      this.feedbackTimer = 60;
      if (this.onEnterFarm) {
        this.onEnterFarm(this.network.myUserId || 1);
      }
    }
    promptExitToWorldMap() {
      console.log("[FarmGateScreen] Returning to World Map (Th\xE0nh ph\u1ED1)...");
      if (this.onExitToWorldMap) {
        this.onExitToWorldMap();
      }
    }
    openShop() {
      this.isShopOpen = true;
      this.feedbackText = "\u0110ang m\u1EDF C\u1EEDa H\xE0ng H\u1EA1t Gi\u1ED1ng";
      this.feedbackTimer = 60;
    }
    openLaiBuonDialog() {
      this.isLaiBuonDialogOpen = true;
    }
    openFruitStall() {
      this.isFruitStallOpen = true;
    }
    openFastFoodDialog() {
      this.isFastFoodOpen = true;
    }
  };

  // packages/game-client/src/web-entry.ts
  var import_j2me_compat11 = __toESM(require_dist());

  // packages/game-client/src/core/GameMidlet.ts
  var import_j2me_compat8 = __toESM(require_dist());

  // packages/game-client/src/runtime/GameCanvas.ts
  var import_j2me_compat4 = __toESM(require_dist());
  var GameCanvas = class _GameCanvas extends import_j2me_compat4.Canvas {
    static instance;
    currentScreen;
    graphics;
    isRunning = false;
    lastTime = 0;
    accumulator = 0;
    TICK_RATE = 20;
    // 20 simulation ticks/sec
    TICK_INTERVAL = 1e3 / 20;
    // 50ms per tick
    // Frame timing & FPS tracking
    currentFPS = 60;
    frameCount = 0;
    fpsLastTime = 0;
    constructor(target) {
      super();
      this.width = 1024;
      this.height = 768;
      this.graphics = new import_j2me_compat4.Graphics(target);
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
      this.lastTime = typeof performance !== "undefined" ? performance.now() : Date.now();
      this.fpsLastTime = this.lastTime;
      this.accumulator = 0;
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", () => {
          if (!document.hidden) {
            this.lastTime = typeof performance !== "undefined" ? performance.now() : Date.now();
            this.accumulator = 0;
          }
        });
      }
      const loop = (currentTime) => {
        if (!this.isRunning) return;
        const now = currentTime || (typeof performance !== "undefined" ? performance.now() : Date.now());
        let elapsed = now - this.lastTime;
        if (elapsed > 250) {
          elapsed = 250;
        }
        this.lastTime = now;
        this.accumulator += elapsed;
        const MAX_SIMULATION_STEPS = 5;
        let steps = 0;
        while (this.accumulator >= this.TICK_INTERVAL && steps < MAX_SIMULATION_STEPS) {
          this.tick();
          this.accumulator -= this.TICK_INTERVAL;
          steps++;
        }
        if (this.accumulator >= this.TICK_INTERVAL) {
          this.accumulator %= this.TICK_INTERVAL;
        }
        const alpha = Math.max(0, Math.min(1, this.accumulator / this.TICK_INTERVAL));
        this.graphics.beginFrame(this.width, this.height);
        this.paint(this.graphics, alpha);
        this.graphics.endFrame();
        this.frameCount++;
        if (now - this.fpsLastTime >= 1e3) {
          this.currentFPS = Math.round(this.frameCount * 1e3 / (now - this.fpsLastTime));
          this.frameCount = 0;
          this.fpsLastTime = now;
        }
        if (onFrame) onFrame();
        if (typeof requestAnimationFrame !== "undefined") {
          requestAnimationFrame(loop);
        } else {
          setTimeout(() => loop(Date.now()), 16);
        }
      };
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(loop);
      } else {
        setTimeout(() => loop(Date.now()), 16);
      }
    }
    stopLoop() {
      this.isRunning = false;
    }
    tick() {
      if (this.currentScreen) {
        this.currentScreen.update();
      }
    }
    paint(g, alpha = 1) {
      if (this.currentScreen) {
        this.currentScreen.paint(g, alpha);
      }
    }
    repaint() {
      this.graphics.beginFrame(this.width, this.height);
      this.paint(this.graphics, 1);
      this.graphics.endFrame();
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
  var import_j2me_compat5 = __toESM(require_dist());
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
        g.drawImage(this.logoImage, Math.floor(w / 2), Math.floor(h / 2), import_j2me_compat5.Graphics.HCENTER | import_j2me_compat5.Graphics.VCENTER);
      }
    }
  };

  // packages/game-client/src/gameplay/LoginScreen.ts
  var import_j2me_compat6 = __toESM(require_dist());
  var LoginScreen = class extends GameScreen {
    selectedIndex = -1;
    options = [];
    isQuickSelectMode = true;
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
      if (typeof window !== "undefined" && window.gameMidlet?.worldMapScreen) {
        window.gameMidlet.canvas.setCurrentScreen(window.gameMidlet.worldMapScreen);
      }
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
        g.drawImage(this.bannerLogo, Math.floor(screenW / 2), Math.max(25, this.winY - 45), import_j2me_compat6.Graphics.HCENTER | import_j2me_compat6.Graphics.VCENTER);
      } else if (this.font) {
        this.font.drawString(g, "AVATAR 258", Math.floor(screenW / 2), Math.max(25, this.winY - 45), 2);
      }
      if (this.font) {
        this.font.drawString(g, "\u0110ang v\xE0o th\u1EBF gi\u1EDBi Avatar 2.5.8...", Math.floor(screenW / 2), Math.floor(screenH * 0.45), 2);
      }
      this.skinPainter.paintSoftkeys(g, this.leftCmd, this.centerCmd, this.rightCmd, screenW, screenH);
    }
  };

  // packages/game-client/src/gameplay/WorldMapScreen.ts
  var WORLD_REGIONS = [
    {
      id: 0,
      index: 0,
      key: "residential",
      name: "Khu nh\xE0 \u1EDF",
      mapId: 21,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.252,
      normPinY: 0.188,
      normTextX: 0.252,
      normTextY: 0.136
    },
    {
      id: 1,
      index: 1,
      key: "ecological",
      name: "Khu sinh th\xE1i",
      mapId: 13,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.785,
      normPinY: 0.224,
      normTextX: 0.785,
      normTextY: 0.178
    },
    {
      id: 2,
      index: 2,
      key: "airport",
      name: "S\xE2n bay",
      mapId: 20,
      spawnX: 120,
      spawnY: 144,
      normPinX: 0.938,
      normPinY: 0.305,
      normTextX: 0.938,
      normTextY: 0.26
    },
    {
      id: 3,
      index: 3,
      key: "entertainment",
      name: "Khu gi\u1EA3i tr\xED",
      mapId: 9,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.442,
      normPinY: 0.46,
      normTextX: 0.442,
      normTextY: 0.338
    },
    {
      id: 4,
      index: 4,
      key: "shopping",
      name: "Khu mua s\u1EAFm",
      mapId: 23,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.722,
      normPinY: 0.472,
      normTextX: 0.722,
      normTextY: 0.426
    },
    {
      id: 5,
      index: 5,
      key: "park",
      name: "C\xF4ng vi\xEAn",
      mapId: 11,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.228,
      normPinY: 0.602,
      normTextX: 0.228,
      normTextY: 0.552
    },
    {
      id: 6,
      index: 6,
      key: "suburbs",
      name: "Khu ngo\u1EA1i \xF4",
      mapId: 17,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.536,
      normPinY: 0.835,
      normTextX: 0.536,
      normTextY: 0.795
    },
    {
      id: 7,
      index: 7,
      key: "farm",
      name: "N\xF4ng tr\u1EA1i",
      mapId: 25,
      spawnX: 120,
      spawnY: 72,
      normPinX: 0.814,
      normPinY: 0.838,
      normTextX: 0.814,
      normTextY: 0.798
    }
  ];
  var WorldMapScreen = class extends GameScreen {
    // HD Assets
    minimapImage;
    bpImage;
    // effect/b_p.png (selected balloon: 96x112)
    kImage;
    // effect/k.png (building frames: 80x640)
    sicImage;
    // effect/sic.png (unselected pin badge: 30x36)
    cl0Image;
    // clmini0.png
    cl1Image;
    // cl00.png
    btnHamburger;
    // Top-left menu button
    btnMail;
    // Top-left mail button with badge
    skinPainter;
    font;
    // Viewport dimensions
    screenW = 1024;
    screenH = 768;
    // Selection & Animation
    regions = [];
    selectedIdx = 3;
    // Default: Khu giải trí
    hoveredIdx = -1;
    animTick = 0;
    // Clouds
    clouds = [];
    // Marquee announcement
    marqueeText = "HOT:Inuyasa/Kagome \u0111\xE3 t\u1EEB 00:00 08/11 \u0111\u1EBFn 23:59 09/11, N\u1EA1p t\xEDch lu\u1EF9 nh\u1EADn qu\xE0 kh\u1EE7ng... Ch\xE0o m\u1EEBng c\u01B0 d\xE2n \u0111\u1EBFn v\u1EDBi Th\xE0nh ph\u1ED1 Avatar Di\u1EC7u K\u1EF3!";
    marqueeOffset = 100;
    marqueeWidth = 1200;
    // Traveling / Connecting state
    isTraveling = false;
    travelTicks = 0;
    selectedRegion = null;
    // Top-left button hitboxes
    hamburgerBounds = { x: 14, y: 8, w: 46, h: 46 };
    mailBounds = { x: 70, y: 8, w: 48, h: 48 };
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
      this.clouds = [
        { x: 120, y: 60, speed: 0.35, scale: 0.85, alpha: 0.65, type: 0 },
        { x: 380, y: 460, speed: 0.45, scale: 1.1, alpha: 0.7, type: 0 },
        // Center buildings cloud
        { x: 720, y: 110, speed: 0.3, scale: 0.9, alpha: 0.6, type: 1 },
        { x: 50, y: 660, speed: 0.4, scale: 0.95, alpha: 0.65, type: 0 },
        // Bottom-left river cloud
        { x: 920, y: 520, speed: 0.32, scale: 1, alpha: 0.6, type: 1 }
      ];
    }
    async loadAssets() {
      const loadImage = (src) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => {
            console.warn(`[WorldMapScreen] Failed to load image: ${src}`);
            resolve(img);
          };
          img.src = src;
        });
      };
      try {
        const [
          minimap,
          bp,
          k,
          sic,
          cl0,
          cl1,
          hamb,
          mail
        ] = await Promise.all([
          loadImage("/assets/maps/minimap_hd.png"),
          loadImage("/assets/ui/b_p_hd.png"),
          loadImage("/assets/ui/k_hd.png"),
          loadImage("/assets/ui/sic_hd.png"),
          loadImage("/assets/ui/clmini_hd.png"),
          loadImage("/assets/ui/cl00_hd.png"),
          loadImage("/assets/ui/btn_hamburger.png"),
          loadImage("/assets/ui/btn_mail.png")
        ]);
        this.minimapImage = minimap;
        this.bpImage = bp;
        this.kImage = k;
        this.sicImage = sic;
        this.cl0Image = cl0;
        this.cl1Image = cl1;
        this.btnHamburger = hamb;
        this.btnMail = mail;
        console.log("[WorldMapScreen] All HD World Map assets loaded successfully!");
      } catch (e) {
        console.warn("[WorldMapScreen] Asset load error:", e);
      }
    }
    onResize(width, height) {
      this.screenW = Math.max(320, width);
      this.screenH = Math.max(240, height);
      const uiScale = Math.min(1, Math.max(0.65, this.screenH / 700));
      const btnSize = Math.round(48 * uiScale);
      this.hamburgerBounds = { x: 12, y: 8, w: btnSize, h: btnSize };
      this.mailBounds = { x: 18 + btnSize, y: 8, w: btnSize, h: btnSize };
    }
    update() {
      this.animTick++;
      for (const c of this.clouds) {
        c.x += c.speed;
        if (c.x > this.screenW + 250) {
          c.x = -350;
          c.y = Math.floor(Math.random() * (this.screenH - 120)) + 30;
        }
      }
      this.marqueeOffset -= 1.4;
      if (this.marqueeOffset < -this.marqueeWidth) {
        this.marqueeOffset = this.screenW;
      }
      if (this.isTraveling) {
        this.travelTicks++;
        if (this.travelTicks >= 15 && this.selectedRegion) {
          this.isTraveling = false;
          if (this.onSelectRegion) {
            this.onSelectRegion(this.selectedRegion);
          }
        }
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
    /**
     * Directional arrow key navigation between regions
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
      this.selectedIdx = n2;
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
        // ENTER / SPACE / FIRE
        case 32:
        case 53:
          this.confirmSelection();
          break;
        case 27:
          if (this.onBackToHome) {
            this.onBackToHome();
          }
          break;
      }
    }
    pointerPressed(x, y) {
      if (this.isTraveling) return;
      if (x >= this.hamburgerBounds.x && x <= this.hamburgerBounds.x + this.hamburgerBounds.w && y >= this.hamburgerBounds.y && y <= this.hamburgerBounds.y + this.hamburgerBounds.h) {
        if (this.onBackToHome) {
          this.onBackToHome();
        }
        return;
      }
      if (x >= this.mailBounds.x && x <= this.mailBounds.x + this.mailBounds.w && y >= this.mailBounds.y && y <= this.mailBounds.y + this.mailBounds.h) {
        alert("H\xF2m th\u01B0 th\xF4ng b\xE1o: Th\xE0nh ph\u1ED1 Avatar ch\xE0o \u0111\xF3n b\u1EA1n tham gia s\u1EF1 ki\u1EC7n \u0111\u1EB7c bi\u1EC7t!");
        return;
      }
      const scale = Math.min(1, Math.max(0.65, this.screenH / 700));
      const hitRadius = Math.round(52 * scale);
      for (let i = 0; i < this.regions.length; i++) {
        const r = this.regions[i];
        const px = Math.round(r.normPinX * this.screenW);
        const py = Math.round(r.normPinY * this.screenH);
        const tx = Math.round(r.normTextX * this.screenW);
        const ty = Math.round(r.normTextY * this.screenH);
        const distPin = Math.hypot(x - px, y - py);
        const distText = Math.hypot(x - tx, y - ty);
        if (distPin <= hitRadius || distText <= hitRadius) {
          if (this.selectedIdx === i) {
            this.confirmSelection();
          } else {
            this.selectedIdx = i;
          }
          return;
        }
      }
    }
    pointerMoved(x, y) {
      const scale = Math.min(1, Math.max(0.65, this.screenH / 700));
      const hitRadius = Math.round(50 * scale);
      this.hoveredIdx = -1;
      for (let i = 0; i < this.regions.length; i++) {
        const r = this.regions[i];
        const px = Math.round(r.normPinX * this.screenW);
        const py = Math.round(r.normPinY * this.screenH);
        const tx = Math.round(r.normTextX * this.screenW);
        const ty = Math.round(r.normTextY * this.screenH);
        if (Math.hypot(x - px, y - py) <= hitRadius || Math.hypot(x - tx, y - ty) <= hitRadius) {
          this.hoveredIdx = i;
          break;
        }
      }
    }
    paint(g) {
      const ctx = g.ctx;
      if (!ctx) return;
      if (this.minimapImage && this.minimapImage.complete && this.minimapImage.naturalWidth > 0) {
        ctx.drawImage(this.minimapImage, 0, 0, this.screenW, this.screenH);
      } else {
        ctx.fillStyle = "#6bb252";
        ctx.fillRect(0, 0, this.screenW, this.screenH);
      }
      this.drawClouds(ctx);
      this.drawRegions(ctx);
      this.drawTopMarquee(ctx);
      this.drawTopButtons(ctx);
      if (this.isTraveling && this.selectedRegion) {
        this.drawConnectingOverlay(ctx, this.selectedRegion.name);
      }
    }
    drawClouds(ctx) {
      for (const c of this.clouds) {
        const img = c.type === 0 && this.cl0Image?.complete ? this.cl0Image : this.cl1Image;
        if (!img || !img.complete || img.naturalWidth === 0) continue;
        ctx.save();
        ctx.globalAlpha = c.alpha;
        const cw = Math.round(img.naturalWidth * c.scale * (this.screenH / 800));
        const ch = Math.round(img.naturalHeight * c.scale * (this.screenH / 800));
        ctx.drawImage(img, Math.round(c.x), Math.round(c.y), cw, ch);
        ctx.restore();
      }
    }
    drawRegions(ctx) {
      const scale = Math.min(1, Math.max(0.68, this.screenH / 700));
      for (let i = 0; i < this.regions.length; i++) {
        if (i !== this.selectedIdx) {
          this.drawSingleRegion(ctx, this.regions[i], i, false, scale);
        }
      }
      if (this.selectedIdx >= 0 && this.selectedIdx < this.regions.length) {
        this.drawSingleRegion(ctx, this.regions[this.selectedIdx], this.selectedIdx, true, scale);
      }
    }
    drawSingleRegion(ctx, r, index, isSelected, scale) {
      const screenX = Math.round(r.normPinX * this.screenW);
      const screenY = Math.round(r.normPinY * this.screenH);
      if (isSelected) {
        const bw = Math.round(96 * scale);
        const bh = Math.round(112 * scale);
        const bx = screenX - Math.floor(bw / 2);
        const by = screenY - bh;
        if (this.bpImage && this.bpImage.complete && this.bpImage.naturalWidth > 0) {
          ctx.drawImage(this.bpImage, bx, by, bw, bh);
        } else {
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(bx, by, bw, bh - 16, 12);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        if (this.kImage && this.kImage.complete && this.kImage.naturalWidth > 0) {
          const frameW = 80;
          const frameH = 80;
          const kw = Math.round(80 * scale);
          const kh = Math.round(80 * scale);
          const kx = bx + Math.floor((bw - kw) / 2);
          const ky = by + Math.floor((bw - kw) / 2) + Math.round(4 * scale);
          ctx.drawImage(
            this.kImage,
            0,
            index * frameH,
            frameW,
            frameH,
            kx,
            ky,
            kw,
            kh
          );
        }
        const fontSize = Math.round(16 * scale + 2);
        const textY = by - Math.round(6 * scale);
        this.drawYellowText(ctx, r.name, screenX, textY, fontSize, 3.5);
      } else {
        const bob = Math.sin(this.animTick * 0.12 + index * 0.9) * (3.5 * scale);
        const pw = Math.round(30 * scale);
        const ph = Math.round(36 * scale);
        const px = screenX - Math.floor(pw / 2);
        const py = screenY - ph + Math.round(bob);
        if (index === this.hoveredIdx) {
          ctx.save();
          ctx.shadowColor = "#facc15";
          ctx.shadowBlur = 10;
          ctx.fillStyle = "rgba(250, 204, 21, 0.4)";
          ctx.beginPath();
          ctx.arc(screenX, screenY - ph / 2 + bob, pw / 2 + 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        if (this.sicImage && this.sicImage.complete && this.sicImage.naturalWidth > 0) {
          ctx.drawImage(this.sicImage, px, py, pw, ph);
        } else {
          ctx.save();
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "#22c55e";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(screenX, py + 12, 12, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        const fontSize = Math.round(13 * scale + 2);
        const textY = py - Math.round(6 * scale);
        this.drawYellowText(ctx, r.name, screenX, textY, fontSize, 2.5);
      }
    }
    /**
     * Authentic Avatar Yellow Text with Black Stroke
     */
    drawYellowText(ctx, text, x, y, fontSize, strokeWidth) {
      ctx.save();
      ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = "#000000";
      ctx.strokeText(text, x, y);
      ctx.fillStyle = "#FFF017";
      ctx.fillText(text, x, y);
      ctx.restore();
    }
    drawTopMarquee(ctx) {
      const bannerH = 34;
      const bannerY = 0;
      const bannerStartX = this.mailBounds.x + this.mailBounds.w + 16;
      const bannerW = Math.max(100, this.screenW - bannerStartX);
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.fillRect(bannerStartX, bannerY, bannerW, bannerH);
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillRect(bannerStartX, bannerY, bannerW, 1);
      ctx.beginPath();
      ctx.rect(bannerStartX + 8, bannerY, bannerW - 16, bannerH);
      ctx.clip();
      ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textBaseline = "middle";
      const textY = bannerY + Math.floor(bannerH / 2);
      let curX = bannerStartX + this.marqueeOffset;
      if (this.marqueeWidth === 1200) {
        this.marqueeWidth = ctx.measureText(this.marqueeText).width + 80;
      }
      const hotPrefix = "HOT:";
      const restText = this.marqueeText.slice(hotPrefix.length);
      ctx.fillStyle = "#ef4444";
      ctx.fillText(hotPrefix, curX, textY);
      const prefixW = ctx.measureText(hotPrefix).width;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(restText, curX + prefixW, textY);
      ctx.restore();
    }
    drawTopButtons(ctx) {
      if (this.btnHamburger && this.btnHamburger.complete && this.btnHamburger.naturalWidth > 0) {
        ctx.drawImage(
          this.btnHamburger,
          this.hamburgerBounds.x,
          this.hamburgerBounds.y,
          this.hamburgerBounds.w,
          this.hamburgerBounds.h
        );
      } else {
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(this.hamburgerBounds.x, this.hamburgerBounds.y, this.hamburgerBounds.w, this.hamburgerBounds.h, 10);
        ctx.fill();
        ctx.restore();
      }
      if (this.btnMail && this.btnMail.complete && this.btnMail.naturalWidth > 0) {
        ctx.drawImage(
          this.btnMail,
          this.mailBounds.x,
          this.mailBounds.y,
          this.mailBounds.w,
          this.mailBounds.h
        );
      } else {
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.roundRect(this.mailBounds.x, this.mailBounds.y, this.mailBounds.w, this.mailBounds.h, 10);
        ctx.fill();
        ctx.restore();
      }
    }
    drawConnectingOverlay(ctx, regionName) {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
      ctx.fillRect(0, 0, this.screenW, this.screenH);
      const dialogW = Math.min(360, this.screenW - 40);
      const dialogH = 100;
      const dx = Math.floor((this.screenW - dialogW) / 2);
      const dy = Math.floor((this.screenH - dialogH) / 2);
      ctx.fillStyle = "#0f172a";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(dx, dy, dialogW, dialogH, 14);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#facc15";
      ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`\u0110ang di chuy\u1EC3n \u0111\u1EBFn ${regionName}...`, dx + dialogW / 2, dy + 42);
      ctx.fillStyle = "#94a3b8";
      ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText("\u0110ang t\u1EA3i t\xE0i nguy\xEAn b\u1EA3n \u0111\u1ED3 v\xE0 k\u1EBFt n\u1ED1i m\xE1y ch\u1EE7...", dx + dialogW / 2, dy + 68);
      ctx.restore();
    }
  };

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
    // =========================================================================
    // Authentic Avatar 2.5.8 J2ME Dialog & Menu Renderer (1:1 Fidelity)
    // =========================================================================
    /**
     * Paints an authentic J2ME warm-cream parchment window with double border,
     * dark wood header pill, and optional [X] close button.
     */
    paintAuthenticDialog(g, x, y, w, h, title) {
      g.setColor(0);
      g.fillRect(x + 4, y + 4, w, h);
      g.setColor(16708551);
      g.fillRect(x, y, w, h);
      g.setColor(16776171);
      g.fillRect(x + 4, y + 28, w - 8, h - 32);
      g.setColor(4528643);
      g.drawRect(x, y, w - 1, h - 1);
      g.drawRect(x + 1, y + 1, w - 3, h - 3);
      g.setColor(14251782);
      g.drawRect(x + 3, y + 3, w - 7, h - 7);
      const headerH = 24;
      g.setColor(7877903);
      g.fillRect(x + 4, y + 4, w - 8, headerH);
      g.setColor(16096779);
      g.drawRect(x + 4, y + 4, w - 9, headerH);
      if (this.font) {
        this.font.drawString(g, title.toUpperCase(), x + Math.floor(w / 2), y + 7, 2);
      }
      g.setColor(14427686);
      g.fillRect(x + w - 22, y + 6, 16, 16);
      g.setColor(16708338);
      g.drawRect(x + w - 22, y + 6, 15, 15);
      if (this.font) {
        this.font.drawString(g, "X", x + w - 14, y + 8, 2);
      }
    }
    /**
     * Paints a menu option item row.
     * Highlighted rows use golden amber background with red bullet indicator.
     */
    paintAuthenticOption(g, x, y, w, h, text, isSelected = false, extraInfo) {
      if (isSelected) {
        g.setColor(16498468);
        g.fillRect(x, y, w, h);
        g.setColor(14251782);
        g.drawRect(x, y, w - 1, h - 1);
        g.setColor(14427686);
        const midY = y + Math.floor(h / 2);
        g.fillArc(x + 6, midY - 3, 6, 6, 0, 360);
        if (this.font) {
          this.font.drawString(g, text, x + 16, y + Math.floor((h - 12) / 2), 0);
          if (extraInfo) {
            this.font.drawString(g, extraInfo, x + w - 10, y + Math.floor((h - 12) / 2), 1);
          }
        }
      } else {
        g.setColor(16639626);
        g.drawLine(x + 4, y + h - 1, x + w - 4, y + h - 1);
        if (this.font) {
          this.font.drawString(g, text, x + 10, y + Math.floor((h - 12) / 2), 0);
          if (extraInfo) {
            this.font.drawString(g, extraInfo, x + w - 10, y + Math.floor((h - 12) / 2), 1);
          }
        }
      }
    }
    /**
     * Paints an authentic button with J2ME tactile styling.
     */
    paintAuthenticButton(g, x, y, w, h, text, variant = "primary", isFocused = false) {
      let bg = 14251782;
      let border = 9584654;
      let textCol = 16777215;
      if (variant === "secondary") {
        bg = 7877903;
        border = 4528643;
      } else if (variant === "danger") {
        bg = 14427686;
        border = 10033947;
      }
      if (isFocused) {
        bg = 16096779;
        border = 16708551;
      }
      g.setColor(bg);
      g.fillRect(x, y, w, h);
      g.setColor(border);
      g.drawRect(x, y, w - 1, h - 1);
      g.setColor(16708551);
      g.drawLine(x + 1, y + 1, x + w - 2, y + 1);
      if (this.font) {
        this.font.drawString(g, text, x + Math.floor(w / 2), y + Math.floor((h - 12) / 2), 2);
      }
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
    mapChar(ch) {
      if (this.glyphChars.indexOf(ch) !== -1) return ch;
      const lower = ch.toLowerCase();
      if (this.glyphChars.indexOf(lower) !== -1) return lower;
      return ch;
    }
    stringWidth(text) {
      let width = 0;
      for (let i = 0; i < text.length; i++) {
        const ch = text.charAt(i);
        if (ch === " ") {
          width += (this.glyphWidths[0] || 6) >> 1;
        } else {
          const mappedCh = this.mapChar(ch);
          const idx = this.glyphChars.indexOf(mappedCh);
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
          const mappedCh = this.mapChar(ch);
          let idx = this.glyphChars.indexOf(mappedCh);
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
  var import_j2me_compat7 = __toESM(require_dist());
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
      return import_j2me_compat7.Image.createImage(bytes);
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
    constructor(target) {
      this.canvas = new GameCanvas(target);
      this.font = new BitmapFont();
      this.skinPainter = new UISkinPainter(this.font);
      this.loginScreen = new LoginScreen(this.skinPainter, this.font);
      this.worldMapScreen = new WorldMapScreen(this.skinPainter, this.font);
      this.splashScreen = new SplashScreen(void 0, () => {
        this.canvas.setCurrentScreen(this.worldMapScreen);
      });
      this.canvas.setCurrentScreen(this.splashScreen);
    }
    async initAssets(logoPngBytes, fontMetadataBytes, fontPngBytes, bgAvBytes) {
      if (logoPngBytes) {
        this.splashScreen.logoImage = await import_j2me_compat8.Image.createImage(logoPngBytes);
      }
      if (fontMetadataBytes && fontPngBytes) {
        this.font.loadMetadata(fontMetadataBytes);
        this.font.fontImage = await import_j2me_compat8.Image.createImage(fontPngBytes);
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
        let numUser = 0;
        if (r.available() > 0) {
          numUser = r.readByte();
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
          for (let i = 0; i < numUser && r.available() > 0; i++) {
            r.readByte();
          }
          for (let i = 0; i < numUser && r.available() >= 2; i++) {
            r.readShort();
          }
          if (r.available() > 0) r.readByte();
          if (r.available() > 0) r.readByte();
        }
        const mapItemTypes = [];
        const mapItems = [];
        if (r.available() >= 2) {
          const mapItemsSize = r.readShort();
          if (mapItemsSize > 0 && r.available() > 0) {
            const typesCount = r.readByte();
            for (let i = 0; i < typesCount && r.available() >= 7; i++) {
              const id = r.readByte();
              const imgID = r.readShort();
              const iconID = r.readByte();
              const dx = r.readShort();
              const dy = r.readShort();
              const posCount = r.available() > 0 ? r.readByte() : 0;
              const positions = [];
              for (let p = 0; p < posCount && r.available() >= 2; p++) {
                positions.push({ x: r.readByte(), y: r.readByte() });
              }
              mapItemTypes.push({ id, imgID, iconID, dx, dy, positions });
            }
            if (r.available() > 0) {
              const itemsCount = r.readByte();
              for (let i = 0; i < itemsCount && r.available() >= 4; i++) {
                const type = r.readByte();
                const typeID = r.readByte();
                const tileX = r.readByte();
                const tileY = r.readByte();
                mapItems.push({ type, typeID, tileX, tileY });
              }
            }
          }
        }
        this.emit("join_park", {
          mapId,
          areaId,
          x,
          y,
          players: existingPlayers,
          mapItemTypes,
          mapItems
        });
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
    sendCooking(recipeId, option = 0) {
      const msg = new import_protocol.Message(import_protocol.Cmd.COOKING);
      msg.writer().writeByte(recipeId);
      msg.writer().writeByte(option);
      console.log(`[Network] Sending Cooking: Recipe=${recipeId}, Option=${option}`);
      this.sendMessage(msg);
    }
    sendCattleAction(userId, action) {
      const msg = new import_protocol.Message(import_protocol.Cmd.UPDATE_FARM_CATTLE);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(action);
      console.log(`[Network] Sending Cattle Action: User=${userId}, Action=${action}`);
      this.sendMessage(msg);
    }
    sendFishAction(userId, action) {
      const msg = new import_protocol.Message(import_protocol.Cmd.UPDATE_FARM_FISH);
      msg.writer().writeInt(userId);
      msg.writer().writeByte(action);
      console.log(`[Network] Sending Fish Action: User=${userId}, Action=${action}`);
      this.sendMessage(msg);
    }
    sendHarvestStarfruit(userId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.HARVEST_STARFRUIT);
      msg.writer().writeInt(userId);
      console.log(`[Network] Sending Harvest Starfruit: User=${userId}`);
      this.sendMessage(msg);
    }
    sendUpgradeStarfruit(userId) {
      const msg = new import_protocol.Message(import_protocol.Cmd.UPDATE_STARFRUIL);
      msg.writer().writeInt(userId);
      console.log(`[Network] Sending Upgrade Starfruit: User=${userId}`);
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
  var import_j2me_compat10 = __toESM(require_dist());

  // packages/game-client/src/maps/TilemapRenderer.ts
  var import_j2me_compat9 = __toESM(require_dist());
  var TilemapRenderer = class _TilemapRenderer {
    static TILE_SIZE = 24;
    // i = 24 in ir.java
    static TILES_PER_ROW = 7;
    // 168 px / 24 px = 7 tiles
    mapData;
    mapObjects = [];
    tilesetImage;
    bgImage;
    cloudImage;
    objectImageCache = /* @__PURE__ */ new Map();
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
          return 8;
        // In Java ME (ir.java line 1050), Map 25 (the Farm) height is exactly 8 tiles!
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
        const fileId = mapId === 25 ? 25 : mapId + 1;
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
        this.mapObjects = [];
        for (let i2 = 0; i2 < totalTiles; i2++) {
          const val = bytes[i2];
          tiles[i2] = val === 255 ? -1 : val;
        }
        const spawnedObjects = [];
        let i = 0;
        while (i < totalTiles) {
          const t = tiles[i];
          const col = i % widthTiles;
          const row = Math.floor(i / widthTiles);
          const px = col * _TilemapRenderer.TILE_SIZE;
          const py = row * _TilemapRenderer.TILE_SIZE;
          if (t === 127 || t === 128 || t === 129 || t === 141 || t === 143 || t === 144 || t === 147 || t === 148 || t === 149 || t === 150 || t === 151 || t === 152 || t === 159 || t === 160 || t === 161 || t === 162 || t === 172 || t === 173 || t === 174 || t === 175 || t === 176 || t === 177 || t === 178 || t === 179 || t === 186 || t === 190 || t === 192 || t === 193 || t === 194 || t === 195 || t === 196 || t === 197 || t === 198 || t === 199 || t === 200 || t === 201 || t === 202 || t === 204 || t === 98 || t === 182 || t === 183 || t === 187 || t === 188 || t === 189 || t === 142 || mapId === 25 && t === 110) {
            let consecutive = 1;
            while (i + consecutive < totalTiles && Math.floor((i + consecutive) / widthTiles) === row && tiles[i + consecutive] === t) {
              consecutive++;
            }
            const spanPx = consecutive * _TilemapRenderer.TILE_SIZE;
            const centerX = px + Math.floor(spanPx / 2);
            let floorReplacement = 96;
            let partId = -1;
            let objX = centerX;
            let objY = py + _TilemapRenderer.TILE_SIZE - 4;
            if (t === 127) {
              partId = 830;
              objX = px + 36;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 128) {
              partId = 828;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = i + widthTiles < totalTiles ? tiles[i + widthTiles] : 5;
            } else if (t === 129 || t === 160) {
              partId = mapId === 17 ? 836 : 829;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 96;
            } else if (t === 141) {
              partId = 840;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = i + widthTiles < totalTiles ? tiles[i + widthTiles] : 5;
            } else if (t === 143) {
              partId = 831;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 51;
            } else if (t === 144) {
              partId = 841;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 5;
            } else if (t === 147 || t === 161) {
              partId = 832;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 96;
            } else if (t === 148 || t === 162) {
              partId = mapId === 17 ? 836 : 833;
              objX = px + 48;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 149) {
              partId = 834;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 4;
            } else if (t === 150) {
              partId = 842;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = mapId === 25 ? 4 : 0;
            } else if (t === 151) {
              partId = 843;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = 0;
            } else if (t === 152) {
              partId = 835;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = mapId === 25 ? 55 : 0;
            } else if (t === 159) {
              partId = 848;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 4;
              floorReplacement = mapId === 25 ? 5 : mapId === 13 ? 0 : 4;
            } else if (t === 172) {
              partId = 836;
              objX = px + 37;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 96;
            } else if (t === 173 || t === 179) {
              partId = 837;
              objX = px + 48;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 96;
            } else if (t === 174) {
              partId = 838;
              objX = px + 48;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 96;
            } else if (t === 175) {
              partId = 830;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 176) {
              partId = 829;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 177) {
              partId = 832;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 178) {
              partId = 830;
              objX = px + 24;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 96;
            } else if (t === 186) {
              partId = 974;
              objX = px + 24;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 17;
            } else if (t === 190) {
              partId = 1029;
              objX = px + 36;
              objY = py + 20;
              floorReplacement = 4;
            } else if (t === 192) {
              partId = 1034;
              objX = px + 36;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 193) {
              partId = 1032;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 194) {
              partId = 1030;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 195) {
              partId = 1037;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 196) {
              partId = 1035;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 197) {
              partId = 1033;
              objX = px + 12;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 198) {
              partId = 1036;
              objX = px + 12;
              objY = py + 20;
              floorReplacement = 4;
            } else if (t === 199) {
              partId = 1031;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 200) {
              partId = 1075;
              objX = px + 24;
              objY = py + 24;
              floorReplacement = 4;
            } else if (t === 201) {
              partId = 1094;
              objX = px + 24;
              objY = py + 20;
              floorReplacement = 5;
            } else if (t === 202) {
              partId = 4;
              objX = px + 24;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 96;
            } else if (t === 98 || t === 204) {
              partId = 846;
              objX = centerX;
              objY = py + _TilemapRenderer.TILE_SIZE;
              floorReplacement = 43;
            } else if (t === 182) {
              floorReplacement = 39;
            } else if (t === 183) {
              floorReplacement = 13;
            } else if (t === 187 || t === 188 || t === 189 || t === 142) {
              floorReplacement = 4;
            } else if (mapId === 25 && t === 110) {
              partId = 847;
              objX = px + 11;
              objY = py + _TilemapRenderer.TILE_SIZE - 2;
              floorReplacement = 31;
            }
            if (partId > 0) {
              spawnedObjects.push({ partId, x: objX, y: objY, layer: 0 });
            }
            for (let k = 0; k < consecutive; k++) {
              tiles[i + k] = floorReplacement;
            }
            i += consecutive;
            continue;
          } else if (t === 139) {
            tiles[i] = i % widthTiles === 0 ? tiles[i + 1] : tiles[i - 1];
          } else if (t === 140) {
            tiles[i] = 55;
          } else if (t >= 126) {
            tiles[i] = i > 0 && tiles[i - 1] >= 0 && tiles[i - 1] < 126 ? tiles[i - 1] : 0;
          }
          i++;
        }
        const uniquePartIds = Array.from(new Set(spawnedObjects.map((o) => o.partId)));
        await Promise.all(uniquePartIds.map(async (partId) => {
          if (!this.objectImageCache.has(partId)) {
            try {
              const img = await import_j2me_compat9.Image.createImage(`/assets/home/${partId}.png`);
              this.objectImageCache.set(partId, img);
            } catch (e) {
              console.warn(`[TilemapRenderer] Could not load object sprite /assets/home/${partId}.png`);
            }
          }
        }));
        for (const obj of spawnedObjects) {
          obj.image = this.objectImageCache.get(obj.partId);
        }
        this.mapObjects = spawnedObjects;
        for (let i2 = 0; i2 < totalTiles; i2++) {
          const t = tiles[i2];
          if (t === -4) {
            collision[i2] = 80;
          } else if (t === -5) {
            collision[i2] = 88;
          } else if (t === -1) {
            collision[i2] = 88;
          } else if (t >= 120 && t <= 123) {
            collision[i2] = 80;
          } else if (t >= 114 && t <= 119) {
            collision[i2] = 80;
          } else if (t === 67 || t === 85) {
            collision[i2] = 92;
          } else if (t >= 20 && t <= 23) {
            collision[i2] = 79;
          } else if (t < 7) {
            collision[i2] = 80;
          } else if (t >= 44 && t <= 55) {
            collision[i2] = 80;
          } else if (t === 111 || t === 112) {
            collision[i2] = 80;
          } else {
            collision[i2] = 88;
          }
        }
        this.mapData = {
          id: mapId,
          widthTiles,
          heightTiles,
          tiles,
          collision
        };
        console.log(`[TilemapRenderer] Loaded map ${mapId} (file ${fileId}): ${widthTiles}x${heightTiles} tiles, ${spawnedObjects.length} objects spawned`);
        const tilesetUrl = `/assets/tileset/tileset${nightSuffix}.png`;
        this.tilesetImage = await import_j2me_compat9.Image.createImage(tilesetUrl);
        this.bgImage = void 0;
        this.cloudImage = void 0;
        const bgType = _TilemapRenderer.BG_TYPE_BY_MAP[mapId] ?? -1;
        if (bgType !== -1) {
          try {
            const bgUrl = `/assets/bg/${bgType}${nightSuffix}.png`;
            this.bgImage = await import_j2me_compat9.Image.createImage(bgUrl);
          } catch (err) {
          }
        }
        try {
          const cloudUrl = `/assets/bg/${nightSuffix}.png`;
          this.cloudImage = await import_j2me_compat9.Image.createImage(cloudUrl);
        } catch (err) {
        }
      } catch (err) {
        console.error("[TilemapRenderer] Load error:", err);
      }
    }
    async setDynamicMapItems(mapItemTypes, mapItems) {
      this.mapObjects = this.mapObjects.filter((o) => !o.isDynamic);
      if (!mapItemTypes || !mapItems || mapItems.length === 0) return;
      const typeMap = /* @__PURE__ */ new Map();
      for (const t of mapItemTypes) {
        typeMap.set(t.id, t);
      }
      const newDynamicObjects = [];
      for (const it of mapItems) {
        const itemType = typeMap.get(it.typeID);
        if (!itemType) continue;
        const worldX = it.tileX * _TilemapRenderer.TILE_SIZE + itemType.dx;
        const worldY = it.tileY * _TilemapRenderer.TILE_SIZE + itemType.dy;
        newDynamicObjects.push({
          partId: itemType.imgID,
          x: worldX,
          y: worldY,
          layer: 0,
          isDynamic: true,
          dynamicType: it.type,
          dynamicId: it.typeID
        });
      }
      const uniquePartIds = Array.from(new Set(newDynamicObjects.map((o) => o.partId)));
      await Promise.all(uniquePartIds.map(async (partId) => {
        if (!this.objectImageCache.has(partId)) {
          try {
            const img = await import_j2me_compat9.Image.createImage(`/assets/home/${partId}.png`);
            this.objectImageCache.set(partId, img);
          } catch {
            try {
              const img = await import_j2me_compat9.Image.createImage(`/assets/item/${partId}.png`);
              this.objectImageCache.set(partId, img);
            } catch (e) {
              console.warn(`[TilemapRenderer] Could not load dynamic object sprite ${partId}`);
            }
          }
        }
      }));
      for (const obj of newDynamicObjects) {
        obj.image = this.objectImageCache.get(obj.partId);
        this.mapObjects.push(obj);
      }
      console.log(`[TilemapRenderer] Added ${newDynamicObjects.length} dynamic map items`);
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
        camY = Math.max(0, Math.min(mapHeightPx - screenH, targetY - Math.floor(screenH / 2)));
      } else {
        camY = mapHeightPx - screenH;
      }
      this.cameraX = camX;
      this.cameraY = camY;
    }
    /**
     * Layer 0 & Layer 1: Sky, Parallax, and Ground Tilemap
     */
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
        const bgH = this.bgImage.getHeight();
        const parallaxX = -Math.floor(this.cameraX * 0.3) % bgW;
        const groundTopY = screenH - heightTiles * tileSize;
        const bgY = Math.max(0, groundTopY - bgH + 30);
        for (let x = parallaxX - bgW; x < screenW + bgW; x += bgW) {
          g.drawImage(this.bgImage, x, bgY, 0);
        }
      }
      const startTileX = Math.floor(this.cameraX / tileSize);
      const endTileX = Math.ceil((this.cameraX + screenW) / tileSize);
      const startTileY = Math.max(0, Math.floor(this.cameraY / tileSize));
      const endTileY = Math.min(heightTiles, Math.ceil((this.cameraY + screenH) / tileSize));
      for (let ty = startTileY; ty < endTileY; ty++) {
        for (let tx = startTileX; tx < endTileX; tx++) {
          const clampedCol = Math.max(0, Math.min(widthTiles - 1, tx));
          let tileIdx = tiles[ty * widthTiles + clampedCol];
          if (tileIdx < 0) continue;
          if (tx < 0 || tx >= widthTiles) {
            if (tileIdx > 120 || tileIdx < 0) {
              tileIdx = 96;
            }
          }
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
      return c === 88 || c === 92;
    }
  };

  // packages/game-client/src/gameplay/GameWorldScreen.ts
  var GameWorldScreen = class _GameWorldScreen extends GameScreen {
    localPlayer = {
      id: 0,
      name: "T\xF4i",
      x: 120,
      y: 200,
      prevX: 120,
      prevY: 200,
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
      "Ch\u1ECDn khu v\u1EF1c (World Map)",
      "\u0110\u1ED5i ph\xF2ng (Khu)",
      "R\u01B0\u01A1ng \u0111\u1ED3 (Inventory)",
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
      import_j2me_compat10.Image.createImage("/assets/normal/12Plus.png").then((img) => this.img12Plus = img).catch(() => {
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
        this.tilemapRenderer.loadMap(this.currentMapId).then(() => {
          if (data.mapItemTypes && data.mapItems) {
            this.tilemapRenderer.setDynamicMapItems(data.mapItemTypes, data.mapItems);
          }
        });
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
      this.localPlayer.prevX = this.localPlayer.x;
      this.localPlayer.prevY = this.localPlayer.y;
      for (const p of this.remotePlayers.values()) {
        p.prevX = p.lastX ?? p.x;
        p.prevY = p.lastY ?? p.y;
      }
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
      } else if (keyCode === 27 || keyCode === 77 || keyCode === 109) {
        if (this.isMenuOpen) {
          this.isMenuOpen = false;
        } else if (typeof window !== "undefined" && window.openWorldMap) {
          window.openWorldMap();
        }
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
      if (y >= 3 && y <= 33) {
        if (x >= 8 && x <= 64) {
          this.isMenuOpen = !this.isMenuOpen;
          this.isEmoteOpen = false;
          return;
        }
        if (x >= 70 && x <= 96) {
          alert("H\xF2m th\u01B0 th\xF4ng b\xE1o: Th\xE0nh ph\u1ED1 Avatar ch\xE0o \u0111\xF3n b\u1EA1n tham gia s\u1EF1 ki\u1EC7n \u0111\u1EB7c bi\u1EC7t!");
          return;
        }
        if (x >= 102 && x <= 128) {
          this.promptChat();
          return;
        }
        if (x >= screenW - 100 && x <= screenW - 74) {
          if (typeof window !== "undefined" && window.openWorldMap) {
            window.openWorldMap();
          }
          return;
        }
        if (x >= screenW - 68 && x <= screenW - 42) {
          this.isRunningFast = !this.isRunningFast;
          return;
        }
        if (x >= screenW - 36 && x <= screenW - 10) {
          this.isEmoteOpen = !this.isEmoteOpen;
          return;
        }
        return;
      }
      if (y >= screenH - 22) {
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
          if (typeof window !== "undefined" && window.openWorldMap) {
            window.openWorldMap();
          }
          break;
        }
        case 1: {
          const nextArea = (this.currentAreaId + 1) % 10;
          this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
          break;
        }
        case 2: {
          this.networkSession.sendViewChest(this.localPlayer.id);
          break;
        }
        case 3: {
          const u = this.localPlayer.name;
          alert(`Nh\xE2n v\u1EADt: ${u} | ID: ${this.localPlayer.id} | Xu: ${this.userXu} | L\u01B0\u1EE3ng: ${this.userLuong} | B\u1EA3n \u0111\u1ED3: ${this.currentMapId} - Khu: ${this.currentAreaId}`);
          break;
        }
        case 4: {
          this.isRunningFast = !this.isRunningFast;
          break;
        }
        case 5: {
          if (typeof window !== "undefined" && window.toggleFullscreen) {
            window.toggleFullscreen();
          }
          break;
        }
        case 6: {
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
    paint(g, alpha = 1) {
      const screenW = typeof window !== "undefined" && window.gameMidlet?.canvas?.width || 640;
      const screenH = typeof window !== "undefined" && window.gameMidlet?.canvas?.height || 360;
      const curAlpha = typeof alpha === "number" ? Math.max(0, Math.min(1, alpha)) : 1;
      const interpLocalX = Math.round(this.localPlayer.prevX + (this.localPlayer.x - this.localPlayer.prevX) * curAlpha);
      const interpLocalY = Math.round(this.localPlayer.prevY + (this.localPlayer.y - this.localPlayer.prevY) * curAlpha);
      this.tilemapRenderer.updateCamera(interpLocalX, interpLocalY, screenW, screenH);
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
        type: "avatar",
        id: this.localPlayer.id,
        name: this.localPlayer.name,
        x: interpLocalX,
        y: interpLocalY,
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
          const rpPrevX = rp.prevX ?? rp.lastX ?? rp.x;
          const rpPrevY = rp.prevY ?? rp.lastY ?? rp.y;
          const interpRPX = Math.round(rpPrevX + (rp.x - rpPrevX) * curAlpha);
          const interpRPY = Math.round(rpPrevY + (rp.y - rpPrevY) * curAlpha);
          if (displayName.includes("Lovanga")) {
            displayName = "Ti\xEAn tri Lovanga";
          }
          entities.push({
            id: rp.id,
            name: displayName,
            x: interpRPX,
            y: interpRPY,
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
            (e) => e.name && e.name.toLowerCase().replace(/[^a-z0-9]/g, "") === npc.name.toLowerCase().replace(/[^a-z0-9]/g, "")
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
      if (this.tilemapRenderer && this.tilemapRenderer.mapObjects) {
        for (const obj of this.tilemapRenderer.mapObjects) {
          if (obj.image) {
            entities.push({
              type: "object",
              x: obj.x,
              y: obj.y,
              mapObject: obj
            });
          }
        }
      }
      entities.sort((a, b) => a.y - b.y);
      for (const ent of entities) {
        if (ent.type === "object" && ent.mapObject && ent.mapObject.image) {
          const img = ent.mapObject.image;
          const imgW = img.getWidth();
          const imgH = img.getHeight();
          const screenX2 = ent.x - Math.floor(imgW / 2) - camX;
          const screenY2 = ent.y - imgH - camY;
          if (screenX2 + imgW >= -50 && screenX2 <= screenW + 50 && screenY2 + imgH >= -50 && screenY2 <= screenH + 50) {
            g.drawImage(img, screenX2, screenY2, 0);
            if (ent.mapObject.partId === 846 && this.font) {
              this.font.drawString(g, String(this.currentAreaId), ent.x - camX, ent.y - 30 - camY, 2);
            }
          }
          continue;
        }
        const screenX = ent.x - camX;
        const screenY = ent.y - camY;
        if (screenX >= -50 && screenX <= screenW + 50 && screenY >= -60 && screenY <= screenH + 60) {
          AvatarRenderer.paintAvatar(
            g,
            screenX,
            screenY,
            ent.wearing || [],
            ent.direct || 0,
            ent.frame || 0,
            ent.name || "",
            !!ent.isLocal,
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
      g.setColor(2312557);
      g.fillRect(0, 0, screenW, 34);
      g.setColor(1783892);
      g.fillRect(0, 0, screenW, 1);
      g.setColor(3894683);
      g.fillRect(0, 33, screenW, 1);
      g.setColor(1402304);
      g.fillRoundRect(8, 4, 56, 26, 5);
      g.setColor(16777215);
      g.drawRoundRect(8, 4, 56, 26, 5);
      if (this.font) {
        this.font.drawString(g, "MENU", 36, 10, 2);
      }
      g.setColor(16777215);
      g.fillRoundRect(70, 4, 26, 26, 5);
      g.setColor(13358561);
      g.drawRoundRect(70, 4, 26, 26, 5);
      g.setColor(2450411);
      g.drawRect(75, 11, 16, 11);
      g.drawLine(75, 11, 83, 17);
      g.drawLine(83, 17, 91, 11);
      g.setColor(15680580);
      g.fillArc(87, 2, 9, 9, 0, 360);
      g.setColor(16777215);
      if (this.font) {
        this.font.drawString(g, "!", 91, 2, 2);
      }
      g.setColor(16777215);
      g.fillRoundRect(102, 4, 26, 26, 5);
      g.setColor(13358561);
      g.drawRoundRect(102, 4, 26, 26, 5);
      g.setColor(165063);
      g.fillRoundRect(106, 9, 18, 12, 3);
      g.fillArc(107, 18, 5, 5, 0, 360);
      g.setColor(16777215);
      g.fillRect(109, 13, 2, 2);
      g.fillRect(114, 13, 2, 2);
      g.fillRect(119, 13, 2, 2);
      g.setColor(16777215);
      g.fillRoundRect(screenW - 100, 4, 26, 26, 5);
      g.setColor(13358561);
      g.drawRoundRect(screenW - 100, 4, 26, 26, 5);
      g.setColor(165063);
      g.fillRoundRect(screenW - 96, 8, 18, 18, 3);
      g.setColor(16777215);
      g.drawLine(screenW - 94, 17, screenW - 80, 17);
      g.drawLine(screenW - 87, 10, screenW - 87, 24);
      g.setColor(16777215);
      g.fillRoundRect(screenW - 68, 4, 26, 26, 5);
      g.setColor(13358561);
      g.drawRoundRect(screenW - 68, 4, 26, 26, 5);
      if (this.font) {
        this.font.drawString(g, this.isRunningFast ? "\u26A1" : "\u{1F3C3}", screenW - 55, 9, 2);
      }
      g.setColor(16777215);
      g.fillRoundRect(screenW - 36, 4, 26, 26, 5);
      g.setColor(13358561);
      g.drawRoundRect(screenW - 36, 4, 26, 26, 5);
      if (this.font) {
        this.font.drawString(g, "\u{1F60A}", screenW - 23, 9, 2);
      }
      const ctx = g.ctx;
      if (ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(136, 0, Math.max(50, screenW - 245), 34);
        ctx.clip();
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textBaseline = "middle";
        ctx.fillText(this.tickerText, this.tickerX, 17);
        ctx.restore();
      }
      if (this.img12Plus && this.img12Plus.getWidth() > 0) {
        g.drawImage(this.img12Plus, 4, screenH - 18, 0);
      } else {
        g.setColor(1982639);
        g.fillRoundRect(4, screenH - 18, 24, 16, 2);
        g.setColor(16777215);
        if (this.font) {
          this.font.drawString(g, "12+", 16, screenH - 16, 2);
        }
      }
      g.setColor(7041664);
      g.fillRoundRect(Math.floor(screenW / 2) - 40, screenH - 13, 80, 6, 3);
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
    let backend = null;
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    });
    if (gl) {
      console.log("[WebClient] WebGL 2 hardware acceleration enabled!");
      backend = new import_j2me_compat11.WebGL2Renderer(gl);
      window.__RENDER_BACKEND = "webgl2";
    } else {
      console.warn("[WebClient] WebGL 2 not available, falling back to Canvas 2D");
      const ctx = canvas.getContext("2d");
      if (ctx)
        backend = ctx;
      window.__RENDER_BACKEND = "canvas2d";
    }
    const midlet = new GameMidlet(backend);
    window.getRenderMetrics = () => midlet.canvas.graphics.getMetrics();
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
    const farmNetworkHandler = new FarmNetworkHandler(network);
    const farmScreen = new FarmScreen(farmNetworkHandler, midlet.skinPainter, midlet.font);
    const farmGateScreen = new FarmGateScreen(network, midlet.skinPainter, midlet.font, farmScreen.controller);
    window.farmScreen = farmScreen;
    window.farmGateScreen = farmGateScreen;
    window.farmModel = farmNetworkHandler.model;
    window.enterFarm = (userId) => {
      farmScreen.localPlayer.name = worldScreen.localPlayer.name;
      farmScreen.localPlayer.wearing = worldScreen.localPlayer.wearing;
      farmScreen.localPlayer.x = 830;
      farmScreen.localPlayer.y = 690;
      farmScreen.localPlayer.targetX = 830;
      farmScreen.localPlayer.targetY = 690;
      farmScreen.localPlayer.dir = 1;
      farmNetworkHandler.enterFarm(userId || network.myUserId || 1);
      midlet.canvas.setCurrentScreen(farmScreen);
      window.__SCENE = "farm";
    };
    farmScreen.onExitToWorldMap = () => {
      console.log("[WebClient] Exiting Private Farm -> Returning to C\u1ED5ng N\xF4ng Tr\u1EA1i (Map 23)...");
      farmGateScreen.localPlayer.name = farmScreen.localPlayer.name;
      farmGateScreen.localPlayer.wearing = farmScreen.localPlayer.wearing;
      farmGateScreen.localPlayer.x = 434;
      farmGateScreen.localPlayer.y = 250;
      farmGateScreen.localPlayer.targetX = 434;
      farmGateScreen.localPlayer.targetY = 270;
      farmGateScreen.localPlayer.dir = 0;
      midlet.canvas.setCurrentScreen(farmGateScreen);
      window.__SCENE = "farm_gate";
    };
    farmGateScreen.onEnterFarm = (userId) => {
      console.log("[WebClient] Entering Private Farm (Map 25) from Farm Gate...");
      if (window.enterFarm) {
        window.enterFarm(userId || network.myUserId || 1);
      }
    };
    farmGateScreen.onExitToWorldMap = () => {
      console.log("[WebClient] Leaving C\u1ED5ng N\xF4ng Tr\u1EA1i -> Returning to World Map...");
      showWorldMap();
    };
    midlet.canvas.setCurrentScreen(midlet.worldMapScreen);
    window.__SCENE = "worldmap";
    let cachedUserData = null;
    const showWorldMap = () => {
      midlet.canvas.setCurrentScreen(midlet.worldMapScreen);
      window.__SCENE = "worldmap";
      const chatBar = document.getElementById("in-game-chat-bar");
      if (chatBar) chatBar.style.display = "none";
      const topBar = document.querySelector(".game-top-bar");
      if (topBar) topBar.style.display = "none";
      resizeCanvas();
      const statusEl = document.getElementById("login-status") || document.getElementById("gamePlayerInfo");
      if (statusEl) {
        statusEl.textContent = `Ng\u01B0\u1EDDi ch\u01A1i: ${worldScreen.localPlayer.name} | Vui l\xF2ng ch\u1ECDn 1 trong 8 khu v\u1EF1c tr\xEAn b\u1EA3n \u0111\u1ED3`;
        statusEl.style.color = "#facc15";
      }
    };
    midlet.worldMapScreen.onSelectRegion = (region) => {
      if (region.mapId === 25) {
        console.log("[WebClient] Entering C\u1ED5ng N\xF4ng Tr\u1EA1i (Map 23)...");
        farmGateScreen.localPlayer.name = worldScreen.localPlayer.name;
        farmGateScreen.localPlayer.wearing = worldScreen.localPlayer.wearing;
        farmGateScreen.localPlayer.x = 434;
        farmGateScreen.localPlayer.y = 360;
        farmGateScreen.localPlayer.targetX = 434;
        farmGateScreen.localPlayer.targetY = 360;
        farmGateScreen.localPlayer.dir = 1;
        midlet.canvas.setCurrentScreen(farmGateScreen);
        window.__SCENE = "farm_gate";
        return;
      }
      console.log(`[WebClient] Entering Region: ${region.name} (Map ${region.mapId})`);
      midlet.canvas.setCurrentScreen(worldScreen);
      window.__SCENE = "world";
      const chatBar = document.getElementById("in-game-chat-bar");
      if (chatBar) chatBar.style.display = "none";
      const topBar = document.querySelector(".game-top-bar");
      if (topBar) topBar.style.display = "none";
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
      worldScreen.localPlayer.name = worldScreen.localPlayer.name || document.getElementById("usernameInput")?.value || "T\xF4i";
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
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.maxWidth = "100vw";
      canvas.style.maxHeight = "100vh";
      canvas.style.margin = "0";
      canvas.style.padding = "0";
      if (canvas.width !== winW || canvas.height !== winH) {
        canvas.width = winW;
        canvas.height = winH;
        midlet.canvas.resize(winW, winH);
      }
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

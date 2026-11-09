import { Image } from '../image/Image.js';
import { Sprite } from '../sprite/Sprite.js';
import { Graphics, RenderContext2D } from './Graphics.js';
import { IRenderBackend, RenderMetrics } from './IRenderBackend.js';

const VERTEX_SHADER_SRC = `#version 300 es
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

const FRAGMENT_SHADER_SRC = `#version 300 es
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

const MAX_QUADS = 4096;
const FLOATS_PER_VERTEX = 9; // x, y, u, v, r, g, b, a, texid
const VERTICES_PER_QUAD = 4;
const FLOATS_PER_QUAD = FLOATS_PER_VERTEX * VERTICES_PER_QUAD;
const INDICES_PER_QUAD = 6;

export class WebGL2Renderer implements IRenderBackend {
  public gl: WebGL2RenderingContext;
  private program!: WebGLProgram;

  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uTexturesLoc: WebGLUniformLocation | null = null;

  private vao: WebGLVertexArrayObject | null = null;
  private vbo: WebGLBuffer | null = null;
  private ibo: WebGLBuffer | null = null;

  private vertexData: Float32Array;
  private quadCount = 0;

  // Multi-texture slot assignment (0..7)
  private activeTextures: (WebGLTexture | null)[] = [null, null, null, null, null, null, null, null];
  private activeTextureElements: any[] = [null, null, null, null, null, null, null, null];
  private textureCache = new WeakMap<any, WebGLTexture>();

  // Context Loss & Recovery
  private isContextLost = false;
  private onContextLostHandler: (e: Event) => void;
  private onContextRestoredHandler: (e: Event) => void;

  // 2D Text Overlay Canvas for seamless J2ME/Canvas 2D compatibility
  public textCanvas: HTMLCanvasElement | null = null;
  public textCtx: RenderContext2D | null = null;
  public has2DText = false;

  // Metrics
  private metrics: RenderMetrics = {
    drawCalls: 0,
    quadCount: 0,
    batchCount: 0,
  };

  // State
  private width = 1024;
  private height = 768;
  private tx = 0;
  private ty = 0;
  private currentColor = 0;
  private currentR = 0;
  private currentG = 0;
  private currentB = 0;
  private currentA = 1.0;

  private clipX = 0;
  private clipY = 0;
  private clipW = 99999;
  private clipH = 99999;
  private isClipping = false;

  constructor(gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.vertexData = new Float32Array(MAX_QUADS * FLOATS_PER_QUAD);

    this.rebuildContext();

    // Context Loss / Restored Listeners
    this.onContextLostHandler = (e: Event) => {
      e.preventDefault();
      this.isContextLost = true;
      console.warn('[WebGL2Renderer] WebGL Context Lost! Freeing GPU resources.');
    };

    this.onContextRestoredHandler = () => {
      console.log('[WebGL2Renderer] WebGL Context Restored! Rebuilding shaders, buffers, and textures.');
      this.rebuildContext();
      this.isContextLost = false;
    };

    const canvas = this.gl.canvas as HTMLCanvasElement;
    if (canvas && typeof canvas.addEventListener === 'function') {
      canvas.addEventListener('webglcontextlost', this.onContextLostHandler);
      canvas.addEventListener('webglcontextrestored', this.onContextRestoredHandler);
    }

    if (typeof document !== 'undefined') {
      this.textCanvas = document.createElement('canvas');
      this.textCanvas.width = this.width;
      this.textCanvas.height = this.height;
      this.textCtx = this.textCanvas.getContext('2d') as unknown as RenderContext2D;
    }
  }

  public markTextUsed(): void {
    this.has2DText = true;
  }

  private rebuildContext(): void {
    const gl = this.gl;
    this.program = this.createProgram(VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
    this.initBuffers();
    this.initGLState();

    this.textureCache = new WeakMap();
    this.activeTextures.fill(null);
    this.activeTextureElements.fill(null);
    this.quadCount = 0;
  }

  public dispose(): void {
    const canvas = this.gl.canvas as HTMLCanvasElement;
    if (canvas && typeof canvas.removeEventListener === 'function') {
      canvas.removeEventListener('webglcontextlost', this.onContextLostHandler);
      canvas.removeEventListener('webglcontextrestored', this.onContextRestoredHandler);
    }
    const gl = this.gl;
    if (this.program) gl.deleteProgram(this.program);
    if (this.vbo) gl.deleteBuffer(this.vbo);
    if (this.ibo) gl.deleteBuffer(this.ibo);
    if (this.vao) gl.deleteVertexArray(this.vao);
    this.textureCache = new WeakMap();
  }

  private createShader(type: number, src: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error('Failed to create WebGL shader');
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const err = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile error: ${err}`);
    }
    return shader;
  }

  private createProgram(vertSrc: string, fragSrc: string): WebGLProgram {
    const gl = this.gl;
    const vs = this.createShader(gl.VERTEX_SHADER, vertSrc);
    const fs = this.createShader(gl.FRAGMENT_SHADER, fragSrc);
    const prog = gl.createProgram();
    if (!prog) throw new Error('Failed to create WebGL program');
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

    this.uResolutionLoc = gl.getUniformLocation(prog, 'u_resolution');
    this.uTexturesLoc = gl.getUniformLocation(prog, 'u_textures');

    return prog;
  }

  private initBuffers(): void {
    const gl = this.gl;

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    // VBO
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertexData.byteLength, gl.DYNAMIC_DRAW);

    // IBO
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

    const stride = FLOATS_PER_VERTEX * 4; // 36 bytes

    // a_position: vec2 (float, location 0)
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);

    // a_texcoord: vec2 (float, location 1)
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride, 8);

    // a_color: vec4 (float, location 2)
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 4, gl.FLOAT, false, stride, 16);

    // a_texid: float (location 3)
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 1, gl.FLOAT, false, stride, 32);

    gl.bindVertexArray(null);
  }

  private initGLState(): void {
    const gl = this.gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
  }

  public beginFrame(width: number, height: number): void {
    if (this.isContextLost) return;

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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Reset 2D text overlay canvas
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

  public endFrame(): void {
    if (this.isContextLost) return;

    this.flush();

    // Disable scissor before text overlay so text overlay is never clipped by last in-game clipRect
    if (this.isClipping) {
      this.gl.disable(this.gl.SCISSOR_TEST);
      this.isClipping = false;
    }

    // Render 2D text canvas overlay if used
    if (this.textCanvas && this.has2DText) {
      const tex = this.getOrCreateTexture(this.textCanvas);
      if (tex) {
        const gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textCanvas);
        const slot = this.assignTextureSlot(tex, this.textCanvas);
        this.addQuad(
          0, 0, 0.0, 0.0,
          this.width, 0, 1.0, 0.0,
          this.width, this.height, 1.0, 1.0,
          0, this.height, 0.0, 1.0,
          1.0, 1.0, 1.0, 1.0,
          slot
        );
        this.flush();
      }
    }
  }

  public flush(): void {
    if (this.isContextLost) return;
    if (this.quadCount === 0) return;

    const gl = this.gl;
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    // Upload vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    const subLength = this.quadCount * FLOATS_PER_QUAD;
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexData.subarray(0, subLength));

    // Bind all active textures
    for (let slot = 0; slot < 8; slot++) {
      gl.activeTexture(gl.TEXTURE0 + slot);
      gl.bindTexture(gl.TEXTURE_2D, this.activeTextures[slot]);
    }

    // Draw elements
    const indexCount = this.quadCount * INDICES_PER_QUAD;
    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);

    this.metrics.drawCalls++;
    this.metrics.quadCount += this.quadCount;
    this.metrics.batchCount++;

    // Reset quad count and texture slots
    this.quadCount = 0;
    for (let i = 0; i < 8; i++) {
      this.activeTextures[i] = null;
      this.activeTextureElements[i] = null;
    }

    gl.bindVertexArray(null);
  }

  public getMetrics(): RenderMetrics {
    return { ...this.metrics };
  }

  private getOrCreateTexture(imageSource: any): WebGLTexture | null {
    if (!imageSource || this.isContextLost) return null;
    if ('complete' in imageSource && !imageSource.complete) return null;
    const w = imageSource.naturalWidth || imageSource.width || 0;
    const h = imageSource.naturalHeight || imageSource.height || 0;
    if (w === 0 || h === 0) return null;

    let tex = this.textureCache.get(imageSource);
    if (!tex) {
      const gl = this.gl;
      tex = gl.createTexture()!;
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

  private assignTextureSlot(tex: WebGLTexture, imageElement: any): number {
    // 1. Is it already in active slot?
    for (let i = 0; i < 8; i++) {
      if (this.activeTextures[i] === tex) {
        return i;
      }
    }

    // 2. Find empty slot
    for (let i = 0; i < 8; i++) {
      if (this.activeTextures[i] === null) {
        this.activeTextures[i] = tex;
        this.activeTextureElements[i] = imageElement;
        return i;
      }
    }

    // 3. All 8 slots full -> flush batch to free slots
    this.flush();
    this.activeTextures[0] = tex;
    this.activeTextureElements[0] = imageElement;
    return 0;
  }

  private addQuad(
    x0: number, y0: number, u0: number, v0: number,
    x1: number, y1: number, u1: number, v1: number,
    x2: number, y2: number, u2: number, v2: number,
    x3: number, y3: number, u3: number, v3: number,
    r: number, g: number, b: number, a: number,
    texId: number
  ): void {
    if (this.quadCount >= MAX_QUADS) {
      // Preserve currently bound texture across batch flush
      const savedTex = (texId >= 0 && texId < 8) ? this.activeTextures[texId] : null;
      const savedEl = (texId >= 0 && texId < 8) ? this.activeTextureElements[texId] : null;
      this.flush();
      if (savedTex) {
        texId = this.assignTextureSlot(savedTex, savedEl);
      }
    }

    const off = this.quadCount * FLOATS_PER_QUAD;
    const v = this.vertexData;

    // V0: Top-Left
    v[off + 0] = x0; v[off + 1] = y0; v[off + 2] = u0; v[off + 3] = v0;
    v[off + 4] = r;  v[off + 5] = g;  v[off + 6] = b;  v[off + 7] = a;
    v[off + 8] = texId;

    // V1: Top-Right
    v[off + 9] = x1;  v[off + 10] = y1; v[off + 11] = u1; v[off + 12] = v1;
    v[off + 13] = r;  v[off + 14] = g;  v[off + 15] = b;  v[off + 16] = a;
    v[off + 17] = texId;

    // V2: Bottom-Right
    v[off + 18] = x2; v[off + 19] = y2; v[off + 20] = u2; v[off + 21] = v2;
    v[off + 22] = r;  v[off + 23] = g;  v[off + 24] = b;  v[off + 25] = a;
    v[off + 26] = texId;

    // V3: Bottom-Left
    v[off + 27] = x3; v[off + 28] = y3; v[off + 29] = u3; v[off + 30] = v3;
    v[off + 31] = r;  v[off + 32] = g;  v[off + 33] = b;  v[off + 34] = a;
    v[off + 35] = texId;

    this.quadCount++;
  }

  // --- IRenderBackend Implementation ---

  public translate(x: number, y: number): void {
    this.tx += x;
    this.ty += y;
  }

  public getTranslateX(): number {
    return this.tx;
  }

  public getTranslateY(): number {
    return this.ty;
  }

  public setColor(rgb: number): void {
    this.currentColor = rgb;
    this.currentR = ((rgb >> 16) & 0xff) / 255.0;
    this.currentG = ((rgb >> 8) & 0xff) / 255.0;
    this.currentB = (rgb & 0xff) / 255.0;
    this.currentA = 1.0;
  }

  public getColor(): number {
    return this.currentColor;
  }

  public setClip(x: number, y: number, width: number, height: number): void {
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

  public clipRect(x: number, y: number, width: number, height: number): void {
    const x1 = Math.max(this.clipX, x);
    const y1 = Math.max(this.clipY, y);
    const x2 = Math.min(this.clipX + this.clipW, x + width);
    const y2 = Math.min(this.clipY + this.clipH, y + height);
    this.setClip(x1, y1, Math.max(0, x2 - x1), Math.max(0, y2 - y1));
  }

  public getClipX(): number { return this.clipX; }
  public getClipY(): number { return this.clipY; }
  public getClipWidth(): number { return this.clipW; }
  public getClipHeight(): number { return this.clipH; }

  public fillRect(x: number, y: number, width: number, height: number): void {
    const px = this.tx + x;
    const py = this.ty + y;
    this.addQuad(
      px, py, 0, 0,
      px + width, py, 0, 0,
      px + width, py + height, 0, 0,
      px, py + height, 0, 0,
      this.currentR, this.currentG, this.currentB, this.currentA,
      -1.0
    );
  }

  public drawRect(x: number, y: number, width: number, height: number): void {
    this.fillRect(x, y, width, 1);
    this.fillRect(x, y + height - 1, width, 1);
    this.fillRect(x, y + 1, 1, Math.max(0, height - 2));
    this.fillRect(x + width - 1, y + 1, 1, Math.max(0, height - 2));
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number): void {
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

    this.addQuad(
      px1 - nx * 0.5, py1 - ny * 0.5, 0, 0,
      px2 - nx * 0.5, py2 - ny * 0.5, 0, 0,
      px2 + nx * 0.5, py2 + ny * 0.5, 0, 0,
      px1 + nx * 0.5, py1 + ny * 0.5, 0, 0,
      this.currentR, this.currentG, this.currentB, this.currentA,
      -1.0
    );
  }

  public fillRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight = arcWidth): void {
    const r = Math.min(arcWidth, arcHeight) / 2;
    this.fillRect(x + r, y, width - 2 * r, height);
    this.fillRect(x, y + r, r, height - 2 * r);
    this.fillRect(x + width - r, y + r, r, height - 2 * r);
    this.fillRect(x + 1, y + 1, r - 1, r - 1);
    this.fillRect(x + width - r, y + 1, r - 1, r - 1);
    this.fillRect(x + 1, y + height - r, r - 1, r - 1);
    this.fillRect(x + width - r, y + height - r, r - 1, r - 1);
  }

  public drawRoundRect(x: number, y: number, width: number, height: number, arcWidth: number, arcHeight = arcWidth): void {
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

  public fillArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void {
    const segments = 16;
    const rx = width / 2;
    const ry = height / 2;
    const cx = this.tx + x + rx;
    const cy = this.ty + y + ry;
    const sa = (startAngle * Math.PI) / 180.0;
    const ea = ((startAngle + arcAngle) * Math.PI) / 180.0;
    const step = (ea - sa) / segments;

    for (let i = 0; i < segments; i++) {
      const a1 = sa + i * step;
      const a2 = sa + (i + 1) * step;
      const p1x = cx + rx * Math.cos(a1);
      const p1y = cy + ry * Math.sin(a1);
      const p2x = cx + rx * Math.cos(a2);
      const p2y = cy + ry * Math.sin(a2);

      this.addQuad(
        cx, cy, 0, 0,
        p1x, p1y, 0, 0,
        p2x, p2y, 0, 0,
        cx, cy, 0, 0,
        this.currentR, this.currentG, this.currentB, this.currentA,
        -1.0
      );
    }
  }

  public drawArc(x: number, y: number, width: number, height: number, startAngle: number, arcAngle: number): void {
    const segments = 16;
    const rx = width / 2;
    const ry = height / 2;
    const cx = x + rx;
    const cy = y + ry;
    const sa = (startAngle * Math.PI) / 180.0;
    const ea = ((startAngle + arcAngle) * Math.PI) / 180.0;
    const step = (ea - sa) / segments;

    for (let i = 0; i < segments; i++) {
      const a1 = sa + i * step;
      const a2 = sa + (i + 1) * step;
      this.drawLine(
        cx + rx * Math.cos(a1),
        cy + ry * Math.sin(a1),
        cx + rx * Math.cos(a2),
        cy + ry * Math.sin(a2)
      );
    }
  }

  private calculateAnchor(x: number, y: number, width: number, height: number, anchor: number): { x: number; y: number } {
    let outX = x;
    let outY = y;

    if ((anchor & Graphics.RIGHT) !== 0) {
      outX -= width;
    } else if ((anchor & Graphics.HCENTER) !== 0) {
      outX -= Math.floor(width / 2);
    }

    if ((anchor & Graphics.BOTTOM) !== 0) {
      outY -= height;
    } else if ((anchor & Graphics.VCENTER) !== 0) {
      outY -= Math.floor(height / 2);
    }

    return { x: outX, y: outY };
  }

  private getImageElement(image: Image | any): any {
    if (!image) return null;
    if (image instanceof Image) {
      return image.element;
    }
    if ('naturalWidth' in image || 'width' in image) {
      return image;
    }
    return image.element || null;
  }

  private getImageDimensions(image: Image | any): { w: number; h: number } {
    if (image instanceof Image) {
      return { w: image.width, h: image.height };
    }
    const w = image?.naturalWidth || image?.width || 0;
    const h = image?.naturalHeight || image?.height || 0;
    return { w, h };
  }

  public drawImage(image: Image | any, x: number, y: number, anchor = 0): void {
    const dim = this.getImageDimensions(image);
    if (dim.w === 0 || dim.h === 0) return;
    this.drawScaledImage(image, x, y, dim.w, dim.h, anchor);
  }

  public drawScaledImage(image: Image | any, x: number, y: number, width: number, height: number, anchor = 0): void {
    const el = this.getImageElement(image);
    if (!el) return;
    const pt = this.calculateAnchor(x, y, width, height, anchor);
    const px = this.tx + pt.x;
    const py = this.ty + pt.y;

    if (this.quadCount >= MAX_QUADS) {
      this.flush();
    }
    const tex = this.getOrCreateTexture(el);
    if (!tex) return;
    const slot = this.assignTextureSlot(tex, el);

    this.addQuad(
      px, py, 0.0, 0.0,
      px + width, py, 1.0, 0.0,
      px + width, py + height, 1.0, 1.0,
      px, py + height, 0.0, 1.0,
      1.0, 1.0, 1.0, 1.0,
      slot
    );
  }

  public drawRegion(
    image: Image | any,
    x_src: number,
    y_src: number,
    width: number,
    height: number,
    transform: number,
    x_dst: number,
    y_dst: number,
    anchor = 0
  ): void {
    const el = this.getImageElement(image);
    if (!el) return;

    let destW = width;
    let destH = height;
    if (
      transform === Sprite.TRANS_ROT90 ||
      transform === Sprite.TRANS_ROT270 ||
      transform === Sprite.TRANS_MIRROR_ROT90 ||
      transform === Sprite.TRANS_MIRROR_ROT270
    ) {
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
    if (!tex) return;
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
      case Sprite.TRANS_NONE:
        break;
      case Sprite.TRANS_MIRROR:
        uvTL = { u: u1, v: v0 };
        uvTR = { u: u0, v: v0 };
        uvBR = { u: u0, v: v1 };
        uvBL = { u: u1, v: v1 };
        break;
      case Sprite.TRANS_MIRROR_ROT180:
        uvTL = { u: u0, v: v1 };
        uvTR = { u: u1, v: v1 };
        uvBR = { u: u1, v: v0 };
        uvBL = { u: u0, v: v0 };
        break;
      case Sprite.TRANS_ROT180:
        uvTL = { u: u1, v: v1 };
        uvTR = { u: u0, v: v1 };
        uvBR = { u: u0, v: v0 };
        uvBL = { u: u1, v: v0 };
        break;
      case Sprite.TRANS_ROT90:
        uvTL = { u: u0, v: v1 };
        uvTR = { u: u0, v: v0 };
        uvBR = { u: u1, v: v0 };
        uvBL = { u: u1, v: v1 };
        break;
      case Sprite.TRANS_ROT270:
        uvTL = { u: u1, v: v0 };
        uvTR = { u: u1, v: v1 };
        uvBR = { u: u0, v: v1 };
        uvBL = { u: u0, v: v0 };
        break;
      case Sprite.TRANS_MIRROR_ROT90:
        uvTL = { u: u1, v: v1 };
        uvTR = { u: u1, v: v0 };
        uvBR = { u: u0, v: v0 };
        uvBL = { u: u0, v: v1 };
        break;
      case Sprite.TRANS_MIRROR_ROT270:
        uvTL = { u: u0, v: v0 };
        uvTR = { u: u0, v: v1 };
        uvBR = { u: u1, v: v1 };
        uvBL = { u: u1, v: v0 };
        break;
    }

    this.addQuad(
      px, py, uvTL.u, uvTL.v,
      px + destW, py, uvTR.u, uvTR.v,
      px + destW, py + destH, uvBR.u, uvBR.v,
      px, py + destH, uvBL.u, uvBL.v,
      1.0, 1.0, 1.0, 1.0,
      slot
    );
  }
}

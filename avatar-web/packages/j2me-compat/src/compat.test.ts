import test from 'node:test';
import assert from 'node:assert/strict';
import { Graphics } from './graphics/Graphics.js';
import { Sprite } from './sprite/Sprite.js';
import { Canvas } from './canvas/Canvas.js';
import { RecordStore } from './io/RecordStore.js';
import { Image } from './image/Image.js';

test('Graphics coordinate translation, clipping and anchor calculations', () => {
  const calls: string[] = [];
  const mockCtx: any = {
    save() { calls.push('save'); },
    restore() { calls.push('restore'); },
    translate(x: number, y: number) { calls.push(`translate(${x},${y})`); },
    beginPath() { calls.push('beginPath'); },
    rect(x: number, y: number, w: number, h: number) { calls.push(`rect(${x},${y},${w},${h})`); },
    clip() { calls.push('clip'); },
    fillRect(x: number, y: number, w: number, h: number) { calls.push(`fillRect(${x},${y},${w},${h})`); },
    strokeRect(x: number, y: number, w: number, h: number) { calls.push(`strokeRect(${x},${y},${w},${h})`); }
  };

  const g = new Graphics(mockCtx);
  g.translate(10, 20);
  assert.equal(g.getTranslateX(), 10);
  assert.equal(g.getTranslateY(), 20);

  g.setColor(0xFF00FF);
  assert.equal(g.getColor(), 0xFF00FF);
  assert.equal(mockCtx.fillStyle, 'rgb(255,0,255)');

  g.setClip(0, 0, 100, 50);
  assert.equal(g.getClipX(), 0);
  assert.equal(g.getClipY(), 0);
  assert.equal(g.getClipWidth(), 100);
  assert.equal(g.getClipHeight(), 50);

  g.fillRect(5, 5, 20, 20);
  assert.ok(calls.includes('fillRect(5,5,20,20)'));
});

test('Graphics drawRegion handles Sprite transform operations correctly', () => {
  const operations: string[] = [];
  const mockCtx: any = {
    save() { operations.push('save'); },
    restore() { operations.push('restore'); },
    translate(x: number, y: number) { operations.push(`translate(${x},${y})`); },
    scale(x: number, y: number) { operations.push(`scale(${x},${y})`); },
    rotate(angle: number) { operations.push(`rotate(${angle.toFixed(2)})`); },
    drawImage(_img: any, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
      operations.push(`draw(${sx},${sy},${sw},${sh}->${dx},${dy},${dw},${dh})`);
    }
  };

  const g = new Graphics(mockCtx);
  const img = new Image(64, 64, undefined, {} as any);

  // Test drawRegion with TRANS_MIRROR (flip horizontally)
  g.drawRegion(img, 0, 0, 32, 32, Sprite.TRANS_MIRROR, 50, 50, Graphics.HCENTER | Graphics.VCENTER);
  assert.ok(operations.includes('scale(-1,1)'));
  assert.ok(operations.includes('save'));
  assert.ok(operations.includes('restore'));
});

test('Canvas key code to GameAction mapping matches J2ME standard', () => {
  class TestCanvas extends Canvas {
    public paint(_g: Graphics): void {}
  }

  const canvas = new TestCanvas();
  assert.equal(canvas.getGameAction(Canvas.KEY_NUM2), Canvas.UP);
  assert.equal(canvas.getGameAction(Canvas.KEY_NUM8), Canvas.DOWN);
  assert.equal(canvas.getGameAction(Canvas.KEY_NUM4), Canvas.LEFT);
  assert.equal(canvas.getGameAction(Canvas.KEY_NUM6), Canvas.RIGHT);
  assert.equal(canvas.getGameAction(Canvas.KEY_NUM5), Canvas.FIRE);
  assert.equal(canvas.getGameAction(13), Canvas.FIRE);
});

test('RecordStore persists records correctly in memory', () => {
  const store = RecordStore.openRecordStore('test_rms', true);
  const data1 = new TextEncoder().encode('user_session_token_123');
  const id1 = store.addRecord(data1);

  assert.equal(id1, 1);
  assert.equal(store.getNumRecords(), 1);

  const retrieved = store.getRecord(1);
  assert.deepEqual(retrieved, data1);
});

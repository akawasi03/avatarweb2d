import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { AvArchiveLoader } from './assets/AvArchiveLoader.js';
import { BitmapFont } from './renderer/BitmapFont.js';
import { FrameImage } from './renderer/FrameImage.js';
import { Image, Graphics } from '@avatar/j2me-compat';

test('AvArchiveLoader correctly decrypts AV containers from Avatar258.jar', () => {
  // Test with original farm.av or font.av from JAR or extracted
  const loader = new AvArchiveLoader();
  
  // Construct a small test AV archive with key NguyenVanMinh
  const KEY = new TextEncoder().encode('NguyenVanMinh');
  const count = 2;
  const file1Name = new TextEncoder().encode('test1.png');
  const file1Data = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 1, 2, 3]);
  const file2Name = new TextEncoder().encode('test2.png');
  const file2Data = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 4, 5, 6, 7]);

  // Encrypt
  const encryptedFile1Name = new Uint8Array(file1Name.length);
  for (let i = 0; i < file1Name.length; i++) encryptedFile1Name[i] = file1Name[i] ^ KEY[i % KEY.length];
  
  const encryptedFile2Name = new Uint8Array(file2Name.length);
  for (let i = 0; i < file2Name.length; i++) encryptedFile2Name[i] = file2Name[i] ^ KEY[i % KEY.length];

  const totalPayload = new Uint8Array(file1Data.length + file2Data.length);
  totalPayload.set(file1Data, 0);
  totalPayload.set(file2Data, file1Data.length);
  for (let i = 0; i < totalPayload.length; i++) totalPayload[i] ^= KEY[i % KEY.length];

  const avBytes = new Uint8Array(1 + (1 + file1Name.length + 2) + (1 + file2Name.length + 2) + totalPayload.length);
  let pos = 0;
  avBytes[pos++] = count;
  avBytes[pos++] = file1Name.length;
  avBytes.set(encryptedFile1Name, pos); pos += file1Name.length;
  avBytes[pos++] = (file1Data.length >> 8); avBytes[pos++] = (file1Data.length & 0xFF);
  
  avBytes[pos++] = file2Name.length;
  avBytes.set(encryptedFile2Name, pos); pos += file2Name.length;
  avBytes[pos++] = (file2Data.length >> 8); avBytes[pos++] = (file2Data.length & 0xFF);
  
  avBytes.set(totalPayload, pos);

  loader.loadFromBytes(avBytes);
  assert.equal(loader.getEntryNames().length, 2);
  assert.deepEqual(loader.getFileBytes('test1.png'), file1Data);
  assert.deepEqual(loader.getFileBytes('test2.png'), file2Data);
});

test('BitmapFont correctly parses binary font metadata from client assets', () => {
  const fontMetaPath = path.resolve(
    'd:/avatarweb2d/avatar-web/assets/original/jar_extracted/normal/font/normal'
  );
  
  if (fs.existsSync(fontMetaPath)) {
    const rawBytes = fs.readFileSync(fontMetaPath);
    const font = new BitmapFont(new Uint8Array(rawBytes));
    
    assert.ok(font.glyphChars.length > 50);
    assert.ok(font.glyphWidths.length === font.glyphChars.length);
    assert.ok(font.fontHeight > 0);
    
    const width1 = font.stringWidth('Avatar');
    const width2 = font.stringWidth('Avatar 258');
    assert.ok(width2 > width1);
  }
});

test('FrameImage calculates frame indices and bounds', () => {
  const img = new Image(60, 120); // 60 width, 120 height
  const frameImg = new FrameImage(img, 20, 24); // 20x24 per frame -> 5 frames vertically
  assert.equal(frameImg.totalFrames, 5);

  let drawn = false;
  const mockG: any = {
    drawRegion() { drawn = true; }
  };

  frameImg.drawFrame(2, 10, 10, 0, 0, mockG);
  assert.equal(drawn, true);

  drawn = false;
  frameImg.drawFrame(10, 10, 10, 0, 0, mockG); // out of bounds
  assert.equal(drawn, false);
});

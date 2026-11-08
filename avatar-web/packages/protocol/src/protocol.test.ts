import test from 'node:test';
import assert from 'node:assert/strict';
import { DataOutputStream } from './encoder/DataOutputStream.js';
import { DataInputStream } from './decoder/DataInputStream.js';
import { Message } from './packet/Message.js';
import { SessionCipher } from './session/Cipher.js';
import { PacketStreamDecoder } from './decoder/PacketStreamDecoder.js';

test('DataOutputStream & DataInputStream serialize/deserialize correctly', () => {
  const dos = new DataOutputStream();
  dos.writeByte(-42);
  dos.writeUnsignedByte(200);
  dos.writeBoolean(true);
  dos.writeShort(-1234);
  dos.writeUnsignedShort(54321);
  dos.writeInt(987654321);
  dos.writeLong(123456789012345n);
  dos.writeUTF('Thành Phố Hoàn Mỹ - Chơi mới');

  const bytes = dos.toByteArray();
  const dis = new DataInputStream(bytes);

  assert.equal(dis.readByte(), -42);
  assert.equal(dis.readUnsignedByte(), 200);
  assert.equal(dis.readBoolean(), true);
  assert.equal(dis.readShort(), -1234);
  assert.equal(dis.readUnsignedShort(), 54321);
  assert.equal(dis.readInt(), 987654321);
  assert.equal(dis.readLong(), 123456789012345n);
  assert.equal(dis.readUTF(), 'Thành Phố Hoàn Mỹ - Chơi mới');
  assert.equal(dis.available(), 0);
});

test('Session Handshake (-27) key exchange matches Java server algorithm', () => {
  // Simulate Java Server key: (System.currentTimeMillis() + "_kitakeyos").getBytes()
  const serverKey = new TextEncoder().encode("1712345678901_kitakeyos");
  const keyLen = serverKey.length;

  // Java Server handshake packet construction:
  // ds.writeByte(Session.key.length);
  // ds.writeByte(Session.key[0]);
  // for (int i = 1; i < Session.key.length; ++i) ds.writeByte(Session.key[i] ^ Session.key[i - 1]);
  const handshakePayload = new Uint8Array(1 + keyLen);
  handshakePayload[0] = keyLen;
  handshakePayload[1] = serverKey[0];
  for (let i = 1; i < keyLen; i++) {
    handshakePayload[1 + i] = (serverKey[i] ^ serverKey[i - 1]) & 0xFF;
  }

  const clientCipher = new SessionCipher();
  const decoder = new PacketStreamDecoder(clientCipher);

  // Raw handshake packet on wire: cmd (-27), length (2 bytes), payload
  const wirePacket = new Uint8Array(3 + handshakePayload.length);
  wirePacket[0] = (-27 & 0xFF);
  wirePacket[1] = (handshakePayload.length >> 8) & 0xFF;
  wirePacket[2] = handshakePayload.length & 0xFF;
  wirePacket.set(handshakePayload, 3);

  const messages = decoder.push(wirePacket);
  assert.equal(messages.length, 1);
  assert.equal(messages[0].command, -27);
  assert.equal(clientCipher.connected, true);

  // Verify reconstructed key matches serverKey byte-for-byte!
  for (let i = 0; i < keyLen; i++) {
    const rawByte = 0xAA;
    const clientDecoded = clientCipher.readKey(rawByte);
    const expected = (serverKey[i] ^ rawByte) & 0xFF;
    assert.equal(clientDecoded, expected);
  }
});

test('Bi-directional packet encryption round-trip between Client and Server', () => {
  const sharedKey = new TextEncoder().encode("test_session_secret_key_12345");
  
  const serverCipher = new SessionCipher();
  serverCipher.initHandshake(new Uint8Array([sharedKey.length, ...sharedKey])); // server side
  
  const clientCipher = new SessionCipher();
  clientCipher.initHandshake(new Uint8Array([sharedKey.length, ...sharedKey])); // client side

  // 1. Client sends LOGIN packet (-2)
  const loginMsg = new Message(-2);
  loginMsg.writer().writeUTF('avatar_user_1');
  loginMsg.writer().writeUTF('password_hash_xyz');
  loginMsg.writer().writeUTF('2.5.8');

  const wireLogin = clientCipher.encodePacket(loginMsg);

  // Server decodes LOGIN packet
  const serverDecoder = new PacketStreamDecoder(serverCipher);
  const serverMsgs = serverDecoder.push(wireLogin);
  assert.equal(serverMsgs.length, 1);
  assert.equal(serverMsgs[0].command, -2);
  const reader = serverMsgs[0].reader();
  assert.equal(reader.readUTF(), 'avatar_user_1');
  assert.equal(reader.readUTF(), 'password_hash_xyz');
  assert.equal(reader.readUTF(), '2.5.8');

  // 2. Server replies LOGIN_SUCCESS packet (-4)
  const successMsg = new Message(-4);
  successMsg.writer().writeInt(998877); // User ID
  successMsg.writer().writeUTF('Welcome to Avatar!');

  const wireSuccess = serverCipher.encodePacket(successMsg);

  // Client decodes LOGIN_SUCCESS packet
  const clientDecoder = new PacketStreamDecoder(clientCipher);
  const clientMsgs = clientDecoder.push(wireSuccess);
  assert.equal(clientMsgs.length, 1);
  assert.equal(clientMsgs[0].command, -4);
  const clientReader = clientMsgs[0].reader();
  assert.equal(clientReader.readInt(), 998877);
  assert.equal(clientReader.readUTF(), 'Welcome to Avatar!');
});

import WebSocket from 'ws';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {
  Message,
  SessionCipher,
  PacketStreamDecoder,
  Cmd
} = require('../packages/protocol/dist/index.js');

const GATEWAY_URL = 'ws://127.0.0.1:19129';

async function runFarmE2ETest() {
  console.log('================================================================');
  console.log('=== AVATAR 2.5.8 FARM SYSTEM (MAP 25) E2E INTEGRATION TEST   ===');
  console.log('================================================================\n');

  const ws = new WebSocket(GATEWAY_URL, { origin: 'http://localhost:3000' });
  const cipher = new SessionCipher();
  const decoder = new PacketStreamDecoder(cipher);
  let myUserId = 0;

  const packetQueue = [];
  const packetWaiters = [];

  function waitForPacket(expectedCmd, timeoutMs = 8000) {
    return new Promise((resolve, reject) => {
      // Check existing queue
      for (let i = 0; i < packetQueue.length; i++) {
        if (packetQueue[i].command === expectedCmd) {
          const item = packetQueue.splice(i, 1)[0];
          return resolve(item);
        }
      }
      const timer = setTimeout(() => {
        reject(new Error(`Timeout waiting for packet Cmd ${expectedCmd}`));
      }, timeoutMs);

      packetWaiters.push({ expectedCmd, resolve, timer });
    });
  }

  function sendMsg(msg) {
    const wire = cipher.encodePacket(msg);
    ws.send(wire);
  }

  ws.on('message', (data) => {
    const raw = Buffer.isBuffer(data) ? new Uint8Array(data) : new Uint8Array(Buffer.from(data));
    const messages = decoder.push(raw);

    for (const msg of messages) {
      console.log(`[Packet In] Cmd: ${msg.command}, length: ${msg.data ? msg.data.length : 0}`);
      // Check waiters
      let handled = false;
      for (let i = 0; i < packetWaiters.length; i++) {
        if (packetWaiters[i].expectedCmd === msg.command) {
          const w = packetWaiters.splice(i, 1)[0];
          clearTimeout(w.timer);
          w.resolve(msg);
          handled = true;
          break;
        }
      }
      if (!handled) {
        packetQueue.push(msg);
      }
    }
  });

  await new Promise((res) => ws.on('open', res));
  console.log('[Phase 1] Connected to Gateway. Initiating Cipher Handshake (-27)...');

  // 1. Handshake request (unencrypted)
  const hsReq = new Message(Cmd.HANDSHAKE);
  sendMsg(hsReq);

  const hsReply = await waitForPacket(Cmd.HANDSHAKE);
  console.log(`  -> Handshake Success! Cipher Key exchange completed.`);

  // 2. Login as admin
  console.log('\n[Phase 2] Logging in as user "admin"...');
  const loginMsg = new Message(Cmd.LOGIN);
  loginMsg.writer().writeUTF('admin');
  loginMsg.writer().writeUTF('123456');
  loginMsg.writer().writeUTF('2.5.8');
  sendMsg(loginMsg);

  const loginRes = await waitForPacket(Cmd.LOGIN_SUCESS);
  const lr = loginRes.reader();
  myUserId = lr.readInt();
  const wearCount = lr.readByte();
  for (let i = 0; i < wearCount; i++) lr.readShort();
  const gender = lr.readByte();
  const levelMain = lr.readByte();
  const levelMainPercen = lr.readByte();
  const xu = lr.readInt();
  lr.readByte(); lr.readByte(); lr.readByte(); lr.readByte(); lr.readByte();
  const luong = lr.readInt();
  console.log(`  -> Login Success! UserID=${myUserId}, Gender=${gender}, Level=${levelMain}, Xu=${xu}, Luong=${luong}`);

  // 3. Switch handler to FarmMsgHandler (index = 10)
  console.log('\n[Phase 3] Switching server handler to FarmMsgHandler (ID: 10)...');
  const switchMsg = new Message(Cmd.GET_HANDLER);
  switchMsg.writer().writeByte(10);
  sendMsg(switchMsg);

  const switchRes = await waitForPacket(Cmd.GET_HANDLER);
  const handlerAck = switchRes.reader().readByte();
  console.log(`  -> Server acknowledged handler switch to: ${handlerAck}`);

  // 4. Join Farm (Cmd.JOIN = 61)
  console.log(`\n[Phase 4] Sending Cmd.JOIN (61) for User ${myUserId}...`);
  const joinMsg = new Message(Cmd.JOIN);
  joinMsg.writer().writeInt(myUserId);
  sendMsg(joinMsg);

  const farmJoinPacket = await waitForPacket(Cmd.JOIN);
  const r = farmJoinPacket.reader();
  const farmOwnerId = r.readInt();
  const landSize = r.readByte();
  console.log(`  -> Farm Data Received: OwnerID=${farmOwnerId}, LandPlots=${landSize}`);

  const landPlots = [];
  for (let i = 0; i < landSize; i++) {
    const cropType = r.readByte();
    if (cropType >= 0) {
      const minutesPlanted = r.readShort();
      const sucKhoe = r.readByte();
      const heo = r.readByte();
      const isWatered = r.readBoolean();
      const isFertilized = r.readBoolean();
      const isHarvestable = r.readBoolean();
      landPlots.push({ index: i, cropType, minutesPlanted, sucKhoe, isWatered, isHarvestable });
    } else {
      landPlots.push({ index: i, cropType: -1 });
    }
  }
  console.log(`  -> Parsed ${landPlots.length} land plots from Java Server!`);

  const animalCount = r.readByte();
  console.log(`  -> Animals in farm: ${animalCount}`);

  // 5. Query Farm Inventory (Cmd.INVENTORY = 60)
  console.log('\n[Phase 5] Querying Farm Inventory (Cmd.INVENTORY = 60)...');
  const invMsg = new Message(Cmd.INVENTORY);
  sendMsg(invMsg);

  const invPacket = await waitForPacket(Cmd.INVENTORY);
  const ir = invPacket.reader();
  const seedCount = ir.readByte();
  const seeds = [];
  for (let i = 0; i < seedCount; i++) {
    seeds.push({ id: ir.readByte(), qty: ir.readShort() });
  }
  const cropCount = ir.readByte();
  const crops = [];
  for (let i = 0; i < cropCount; i++) {
    crops.push({ id: ir.readByte(), qty: ir.readShort() });
  }
  const farmXu = ir.readInt();
  const farmLevel = ir.readByte();
  const farmPercent = ir.readByte();
  console.log(`  -> Inventory Received: Seeds=${seeds.length}, Crops=${crops.length}, Xu=${farmXu}, FarmLevel=${farmLevel}`);
  console.log('     Seed inventory sample:', seeds.slice(0, 5));

  // 6. Buy Seeds from Farm Shop (Cmd.BUY_ITEM = 62)
  console.log('\n[Phase 6] Buying 5 Cà Chua seeds (Seed ID 0) with Xu...');
  const buyMsg = new Message(Cmd.BUY_ITEM);
  buyMsg.writer().writeShort(0); // seed ID 0: Cà Chua
  buyMsg.writer().writeByte(5);  // quantity 5
  buyMsg.writer().writeByte(1);  // currency 1: Xu
  sendMsg(buyMsg);

  const buyRes = await waitForPacket(Cmd.BUY_ITEM);
  const br = buyRes.reader();
  const boughtItemId = br.readShort();
  const boughtQty = br.readByte();
  console.log(`  -> Buy Item Success! Bought Item ID=${boughtItemId}, Quantity=${boughtQty}`);

  // 7. Plant Seed on Cell 0 (Cmd.PLANT_SEED = 64)
  console.log('\n[Phase 7] Planting Cà Chua seed (ID 0) on Land Plot #0...');
  const plantMsg = new Message(Cmd.PLANT_SEED);
  plantMsg.writer().writeInt(myUserId);
  plantMsg.writer().writeByte(0); // indexCell 0
  plantMsg.writer().writeByte(0); // idSeed 0 (Cà chua)
  sendMsg(plantMsg);

  const plantRes = await waitForPacket(Cmd.PLANT_SEED);
  const pr = plantRes.reader();
  const plantUser = pr.readInt();
  const plantCell = pr.readByte();
  const plantSeed = pr.readByte();
  console.log(`  -> Plant Seed Success! User=${plantUser}, Cell=${plantCell}, Seed=${plantSeed}`);

  // 8. Harvest Crop on Cell 0 (Cmd.TREE_HARVEST = 66)
  console.log('\n[Phase 8] Harvesting Crop from Land Plot #0...');
  const harvestMsg = new Message(Cmd.TREE_HARVEST);
  harvestMsg.writer().writeInt(myUserId);
  harvestMsg.writer().writeByte(0); // indexcell 0
  sendMsg(harvestMsg);

  const harvestRes = await waitForPacket(Cmd.TREE_HARVEST);
  const hr = harvestRes.reader();
  const harvestedCell = hr.readByte();
  const harvestedYield = hr.readShort();
  console.log(`  -> Tree Harvest Success! Cell=${harvestedCell}, Harvest Yield=${harvestedYield}`);

  // 9. Open Land (Cmd.OPEN_LAND = 70)
  console.log(`\n[Phase 9] Requesting to Open New Land Plot #${landSize + 1}...`);
  const openMsg = new Message(Cmd.OPEN_LAND);
  openMsg.writer().writeInt(myUserId);
  openMsg.writer().writeByte(1); // typeBuy: 1 = Xu
  sendMsg(openMsg);

  const openRes = await waitForPacket(Cmd.OPEN_LAND);
  const or = openRes.reader();
  const openUser = or.readInt();
  const openStatus = or.readByte();
  const openTypeBuy = or.readByte();
  const openMsgStr = or.readUTF();
  const openNewXu = or.readInt();
  console.log(`  -> Open Land Result: Status=${openStatus}, Msg="${openMsgStr}", Remaining Xu=${openNewXu}`);

  // 10. Visit Neighbor Farm (Cmd.JOIN = 61 for User 2)
  console.log('\n[Phase 10] Visiting Neighbor Farm (User ID: 2)...');
  const visitMsg = new Message(Cmd.JOIN);
  visitMsg.writer().writeInt(2);
  sendMsg(visitMsg);

  const visitRes = await waitForPacket(Cmd.JOIN);
  const vr = visitRes.reader();
  const neighborId = vr.readInt();
  const neighborLand = vr.readByte();
  console.log(`  -> Neighbor Farm Loaded: OwnerID=${neighborId}, Plots=${neighborLand}`);

  console.log('\n================================================================');
  console.log('=== ALL 10 PHASES OF FARM E2E INTEGRATION TEST PASSED 100%! ===');
  console.log('================================================================');

  ws.close();
  process.exit(0);
}

runFarmE2ETest().catch((err) => {
  console.error('\n[TEST FAILED]:', err);
  process.exit(1);
});

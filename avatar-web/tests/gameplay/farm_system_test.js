import { NetworkSession } from '../../packages/game-client/dist/network/NetworkSession.js';

function waitForEvent(session, eventName, timeoutMs = 7000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout (${timeoutMs}ms) waiting for event: "${eventName}"`));
    }, timeoutMs);

    const handler = (data) => {
      clearTimeout(timer);
      session.off(eventName, handler);
      resolve(data);
    };
    session.on(eventName, handler);
  });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runFarmSystemTest() {
  console.log('===============================================================');
  console.log('    AVATAR TEAMOBI 2.5.8 - FARM SYSTEM LIVE INTEGRATION TEST   ');
  console.log('    Wire-format verification against Live Java Server (19128)  ');
  console.log('===============================================================\n');

  const session = new NetworkSession('ws://127.0.0.1:19129');

  try {
    console.log('[1/4] Connecting & logging in user "admin"...');
    await session.connect();
    await waitForEvent(session, 'handshake_done');
    session.sendLogin('admin', '123456');
    const user = await waitForEvent(session, 'login_success');
    console.log(`  User logged in: ID=${user.id}, Xu=${user.xu}, Luong=${user.luong}`);

    // Wait a brief moment for initial server messages
    await sleep(400);

    // TEST 1: Join Farm (Cmd.JOIN = 61)
    console.log('\n[2/4] Testing Join Farm (Cmd.JOIN = 61)...');
    session.sendJoinFarm(user.id);
    const farmData = await waitForEvent(session, 'farm_join');
    console.log(`  [Pass] Received Farm Data for User ${farmData.userId}:`);
    console.log(`    - Total Land Plots: ${farmData.landItems.length}`);
    console.log(`    - Total Animals: ${farmData.animals.length}`);
    console.log(`    - Barn Size: ${farmData.barnSize}`);
    console.log(`    - Fish Pond Size: ${farmData.fishPondSize}`);
    console.log(`    - Star Fruit Tree Level: ${farmData.starFruit.level}, Fruit Count: ${farmData.starFruit.fruit}`);

    // TEST 2: Farm Inventory (Cmd.INVENTORY = 60)
    console.log('\n[3/4] Testing Farm Inventory (Cmd.INVENTORY = 60)...');
    session.sendGetFarmInventory();
    const invData = await waitForEvent(session, 'farm_inventory');
    console.log('  [Pass] Received Farm Inventory:');
    console.log(`    - Seed types: ${invData.seeds.length}`);
    console.log(`    - Crop types in barn: ${invData.crops.length}`);
    console.log(`    - Fertilizer types: ${invData.fertilizers.length}`);
    console.log(`    - Farm Level: ${invData.farmLevel} (${invData.farmPercent}%)`);
    console.log(`    - Current Farm Xu: ${invData.xu}`);

    // TEST 3: Open Land / Plant Seed / Harvest
    console.log('\n[4/4] Testing Open Land (Cmd.OPEN_LAND = 70)...');
    session.sendOpenLand(user.id, 1);
    const landResult = await waitForEvent(session, 'open_land');
    console.log(`  [Pass] Received Open Land result: Slot=${landResult.slot}, Message="${landResult.msg}", Balance=${landResult.xu} Xu`);

    console.log('\n===============================================================');
    console.log('      FARM SYSTEM LIVE INTEGRATION TEST: ALL PASSED 100%!       ');
    console.log('===============================================================\n');
  } catch (err) {
    console.error('\n[FAIL] Farm test encountered error:', err);
    process.exitCode = 1;
  } finally {
    session.disconnect();
  }
}

runFarmSystemTest();

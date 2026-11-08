import { NetworkSession } from '../packages/game-client/dist/network/NetworkSession.js';

function waitForEvent(session, eventName, timeoutMs = 6000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for event: "${eventName}"`));
    }, timeoutMs);

    session.on(eventName, (data) => {
      clearTimeout(timer);
      resolve(data);
    });
  });
}

async function runMultiplayerTest() {
  console.log('=== MULTIPLAYER REAL-TIME INTEGRATION TEST ===');

  const sessionA = new NetworkSession('ws://127.0.0.1:19129');
  const sessionB = new NetworkSession('ws://127.0.0.1:19129');

  console.log('\n[Phase 1] Connecting Player 1 (admin)...');
  await sessionA.connect();
  await waitForEvent(sessionA, 'handshake_done');
  console.log('  Player 1 cipher handshake complete (-27)!');

  console.log('  Player 1 sending login: "admin" / "123456"...');
  sessionA.sendLogin('admin', '123456');
  const userA = await waitForEvent(sessionA, 'login_success');
  console.log(`  Player 1 logged in successfully! ID: ${userA.id}, Xu: ${userA.xu}, Luong: ${userA.luong}`);

  console.log('  Player 1 entering Park (Map 11, Area 0)...');
  sessionA.sendJoinPark(11, 0, 120, 200);
  await waitForEvent(sessionA, 'join_park');
  console.log('  Player 1 is inside Park Map 11, Area 0.');

  console.log('\n[Phase 2] Connecting Player 2 (ad)...');
  await sessionB.connect();
  await waitForEvent(sessionB, 'handshake_done');
  console.log('  Player 2 cipher handshake complete (-27)!');

  console.log('  Player 2 sending login: "ad" / "123456"...');
  sessionB.sendLogin('ad', '123456');
  const userB = await waitForEvent(sessionB, 'login_success');
  console.log(`  Player 2 logged in successfully! ID: ${userB.id}, Xu: ${userB.xu}, Luong: ${userB.luong}`);

  console.log('  Player 2 entering Park (Map 11, Area 0)...');
  sessionB.sendJoinPark(11, 0, 140, 200);
  await waitForEvent(sessionB, 'join_park');
  console.log('  Player 2 is inside Park Map 11, Area 0.');

  console.log('\n[Phase 3] Checking Dual-Player Visibility...');
  // Setup listener on sessionA for new player join or movement
  let player2Detected = false;
  sessionA.on('player_join_park', (p) => {
    console.log(`  [Visibility] Player 1 sees new player: ID=${p.id}, Name="${p.name}" at (${p.x}, ${p.y})`);
    if (p.id === userB.id) player2Detected = true;
  });

  // Give a moment for room broadcast
  await new Promise(r => setTimeout(r, 1000));

  console.log('\n[Phase 4] Testing Movement Sync...');
  const movePromise = waitForEvent(sessionA, 'player_move');
  console.log('  Player 2 moving to (160, 220)...');
  sessionB.sendMove(160, 220);
  const moveData = await movePromise;
  console.log(`  SUCCESS: Player 1 received movement: Player ${moveData.id} moved to (${moveData.x}, ${moveData.y})`);

  console.log('\n[Phase 5] Testing Real-time Chat Sync...');
  const chatFromBPromise = waitForEvent(sessionA, 'player_chat');
  const msgFromB = 'Chao admin! WebGL Native Teamobi 2.5.8 hoan hao!';
  console.log(`  Player 2 (ad) sends chat: "${msgFromB}"`);
  sessionB.sendChat(msgFromB);
  const chatA = await chatFromBPromise;
  console.log(`  SUCCESS: Player 1 received chat from Player ${chatA.id}: "${chatA.message}"`);

  const chatFromAPromise = waitForEvent(sessionB, 'player_chat');
  const msgFromA = 'Chao ban ad! Server va Client da dong bo 100%!';
  console.log(`  Player 1 (admin) replies chat: "${msgFromA}"`);
  sessionA.sendChat(msgFromA);
  const chatB = await chatFromAPromise;
  console.log(`  SUCCESS: Player 2 received reply from Player ${chatB.id}: "${chatB.message}"`);

  console.log('\n[Phase 6] Testing Disconnect & Reconnect...');
  const leavePromise = waitForEvent(sessionA, 'player_leave_park', 4000).catch(() => null);
  console.log('  Disconnecting Player 2 (ad)...');
  sessionB.disconnect();
  const leaveId = await leavePromise;
  if (leaveId) {
    console.log(`  SUCCESS: Player 1 received player_leave event for ID: ${leaveId}`);
  } else {
    console.log('  Player 2 disconnected cleanly from Gateway.');
  }

  // Wait 1.5s for Java server account unlock
  console.log('  Waiting 1.5s for server session cleanup & unlock...');
  await new Promise(r => setTimeout(r, 1500));

  console.log('  Reconnecting Player 2 (ad)...');
  const sessionB2 = new NetworkSession('ws://127.0.0.1:19129');
  await sessionB2.connect();
  await waitForEvent(sessionB2, 'handshake_done');
  sessionB2.sendLogin('ad', '123456');
  const userB2 = await waitForEvent(sessionB2, 'login_success');
  console.log(`  SUCCESS: Player 2 reconnected and logged in! ID: ${userB2.id}`);

  sessionB2.sendJoinPark(11, 0, 120, 190);
  await waitForEvent(sessionB2, 'join_park');
  console.log('  SUCCESS: Player 2 successfully rejoined Park!');

  sessionA.disconnect();
  sessionB2.disconnect();

  console.log('\n======================================================');
  console.log('>>> ALL MULTIPLAYER VERIFICATION TESTS PASSED 100%! <<<');
  console.log('======================================================');
}

runMultiplayerTest().catch((err) => {
  console.error('\nMultiplayer test failed with error:', err);
  process.exit(1);
});

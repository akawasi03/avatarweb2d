import WebSocket from 'ws';

async function testGatewaySecurity() {
  console.log("=== TESTING WEBSOCKET GATEWAY SECURITY HARDENING ===");
  const wsUrl = "ws://127.0.0.1:19129";

  // Test 1: Reject unauthorized origin (http://evil-attacker.com)
  console.log("\n[Test 1] Testing unauthorized origin: http://evil-attacker.com ...");
  let t1Rejected = false;
  await new Promise((resolve) => {
    const ws = new WebSocket(wsUrl, {
      headers: { Origin: 'http://evil-attacker.com' }
    });
    ws.on('unexpected-response', () => {
      t1Rejected = true;
      resolve(true);
    });
    ws.on('close', (code) => {
      if (code === 1008) t1Rejected = true;
      resolve(true);
    });
    ws.on('error', () => {
      t1Rejected = true;
      resolve(true);
    });
    setTimeout(() => {
      ws.terminate();
      resolve(true);
    }, 2000);
  });
  if (!t1Rejected) throw new Error("Security Failure: Gateway accepted unauthorized origin!");
  console.log("  -> PASS: Unauthorized origin rejected!");

  // Test 2: Reject startsWith spoofing (http://localhost.attacker.com)
  console.log("\n[Test 2] Testing startsWith spoofing: http://localhost.attacker.com ...");
  let t2Rejected = false;
  await new Promise((resolve) => {
    const ws = new WebSocket(wsUrl, {
      headers: { Origin: 'http://localhost.attacker.com' }
    });
    ws.on('unexpected-response', () => {
      t2Rejected = true;
      resolve(true);
    });
    ws.on('close', (code) => {
      if (code === 1008) t2Rejected = true;
      resolve(true);
    });
    ws.on('error', () => {
      t2Rejected = true;
      resolve(true);
    });
    setTimeout(() => {
      ws.terminate();
      resolve(true);
    }, 2000);
  });
  if (!t2Rejected) throw new Error("Security Failure: Gateway accepted startsWith spoofed origin!");
  console.log("  -> PASS: startsWith spoofing rejected!");

  // Test 3: Accept legitimate authorized origin (http://localhost:3000)
  console.log("\n[Test 3] Testing legitimate origin: http://localhost:3000 ...");
  let t3Accepted = false;
  await new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: { Origin: 'http://localhost:3000' }
    });
    ws.on('open', () => {
      // Send Handshake Request (-27)
      ws.send(Buffer.from([-27, 0, 0]));
    });
    ws.on('message', (data) => {
      const buf = Buffer.from(data);
      if (buf.length > 0 && buf[0] === 229) { // -27 is 229 in uint8
        t3Accepted = true;
        ws.close();
        resolve(true);
      }
    });
    ws.on('error', reject);
    setTimeout(() => {
      ws.terminate();
      resolve(true);
    }, 3000);
  });
  if (!t3Accepted) throw new Error("Gateway rejected legitimate origin http://localhost:3000!");
  console.log("  -> PASS: Legitimate origin accepted and handshake completed!");

  console.log("\n=== ALL GATEWAY SECURITY AUDIT TESTS PASSED 100%! ===");
}

testGatewaySecurity().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

import { GameMidlet } from './core/GameMidlet.js';
import { NetworkSession } from './network/NetworkSession.js';
import { GameWorldScreen } from './gameplay/GameWorldScreen.js';

declare global {
  interface Window {
    __READY?: boolean;
    __SCENE?: string;
    gameMidlet?: GameMidlet;
    networkSession?: NetworkSession;
    gameWorldScreen?: GameWorldScreen;
    loginWithCredentials?: (u: string, p: string) => void;
  }
}

async function startWebClient() {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas #gameCanvas not found!');
    return;
  }

  const ctx = canvas.getContext('2d') as unknown as any;
  ctx.imageSmoothingEnabled = false;

  const midlet = new GameMidlet(ctx);
  window.gameMidlet = midlet;

  // Initialize Network Session (WS Gateway on port 19129)
  const wsHost = window.location.hostname || '127.0.0.1';
  const gatewayUrl = `ws://${wsHost}:19129`;
  const network = new NetworkSession(gatewayUrl);
  window.networkSession = network;

  // Load assets from public/assets
  try {
    const [logoRes, fontMetaRes, fontPngRes] = await Promise.all([
      fetch('/assets/normal/lg.png').then((r) => r.arrayBuffer()),
      fetch('/assets/normal/font/normal').then((r) => r.arrayBuffer()),
      fetch('/assets/font/0.png').then((r) => r.arrayBuffer())
    ]);

    await midlet.initAssets(
      new Uint8Array(logoRes),
      new Uint8Array(fontMetaRes),
      new Uint8Array(fontPngRes)
    );
  } catch (err) {
    console.warn('Assets loading warning:', err);
  }

  // Create GameWorldScreen
  const worldScreen = new GameWorldScreen(network, midlet.skinPainter, midlet.font);
  window.gameWorldScreen = worldScreen;

  // Start with Login Screen
  midlet.canvas.setCurrentScreen(midlet.loginScreen);
  window.__SCENE = 'login';

  // Network Event Handlers
  network.on('login_success', (userData: any) => {
    console.log('[WebClient] Logged in successfully!', userData);
    worldScreen.localPlayer.id = userData.id;
    worldScreen.localPlayer.name = (document.getElementById('usernameInput') as HTMLInputElement)?.value || 'Tôi';
    worldScreen.localPlayer.gender = userData.gender;
    worldScreen.localPlayer.wearing = userData.wearing || [];

    // Switch to World Screen
    midlet.canvas.setCurrentScreen(worldScreen);
    window.__SCENE = 'world';

    // Hide login modal overlay and show floating chat bar
    const loginOverlay = document.getElementById('login-overlay');
    if (loginOverlay) loginOverlay.style.display = 'none';

    const chatOverlay = document.getElementById('chat-overlay-bar');
    if (chatOverlay) chatOverlay.style.display = 'flex';

    // Automatically enter Park Map 11, Zone 0
    network.sendJoinPark(11, 0, 120, 200);

    // Update UI status
    const statusEl = document.getElementById('login-status') || document.getElementById('gamePlayerInfo');
    if (statusEl) {
      statusEl.textContent = `Người chơi: ${worldScreen.localPlayer.name} | Bản đồ: Công viên | Xu: ${Number(userData.xu || 0).toLocaleString('vi-VN')}`;
      statusEl.style.color = '#38bdf8';
    }
  });

  network.on('login_fail', (reason: string) => {
    alert(`Đăng nhập thất bại: ${reason}`);
    const statusEl = document.getElementById('login-status');
    if (statusEl) {
      statusEl.textContent = `Thất bại: ${reason}`;
      statusEl.style.color = '#FF4444';
    }
  });

  network.on('disconnect', () => {
    const statusEl = document.getElementById('login-status');
    if (statusEl) {
      statusEl.textContent = 'Mất kết nối máy chủ! Đang tự động kết nối lại...';
      statusEl.style.color = '#FFA500';
    }
    // Reconnect after 2 seconds
    setTimeout(() => {
      network.connect().catch(() => {});
    }, 2000);
  });

  // Connect to Gateway
  try {
    await network.connect();
    console.log('[WebClient] Gateway connection established!');
  } catch (err) {
    console.warn('[WebClient] Gateway connect pending:', err);
  }

  // Login helper function
  window.loginWithCredentials = (username: string, pass: string) => {
    const statusEl = document.getElementById('login-status') || document.getElementById('gamePlayerInfo');
    worldScreen.localPlayer.name = username;

    const doSend = () => {
      if (statusEl) {
        statusEl.textContent = `Đang gửi đăng nhập tài khoản "${username}"...`;
        statusEl.style.color = '#00E5FF';
      }
      network.sendLogin(username, pass);
    };

    if (!network.isConnected) {
      if (statusEl) {
        statusEl.textContent = 'Đang kết nối tới máy chủ...';
        statusEl.style.color = '#FFA500';
      }
      network.connect().then(() => {
        if (network.isHandshakeDone) {
          doSend();
        } else {
          network.on('handshake_done', () => doSend());
        }
      }).catch((err) => {
        if (statusEl) {
          statusEl.textContent = 'Không thể kết nối WebSocket Gateway!';
          statusEl.style.color = '#FF4444';
        }
        console.error('[WebClient] Connect error:', err);
      });
      return;
    }

    if (!network.isHandshakeDone) {
      if (statusEl) {
        statusEl.textContent = 'Đang hoàn tất bắt tay mã hóa...';
        statusEl.style.color = '#FFA500';
      }
      network.on('handshake_done', () => doSend());
      return;
    }

    doSend();
  };

  // Responsive Fullscreen Canvas Sizing
  function resizeCanvas() {
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // Authentic retro pixel art density: target logical height ~320-360px
    const scale = Math.max(1, Math.round(winH / 340));
    const logicalW = Math.round(winW / scale);
    const logicalH = Math.round(winH / scale);

    canvas.width = logicalW;
    canvas.height = logicalH;

    midlet.canvas.resize(logicalW, logicalH);
    ctx.imageSmoothingEnabled = false;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Fullscreen toggle helper
  (window as any).toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Canvas Mouse & Touch pointer navigation with dynamic scaling
  function getCanvasCoords(clientX: number, clientY: number): { x: number; y: number } {
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

  canvas.addEventListener('pointerdown', (e) => {
    canvas.focus();
    const coords = getCanvasCoords(e.clientX, e.clientY);
    midlet.canvas.pointerPressed(coords.x, coords.y);
  });

  canvas.addEventListener('pointermove', (e) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    if (e.buttons > 0) {
      midlet.canvas.pointerDragged(coords.x, coords.y);
    } else {
      midlet.canvas.pointerMoved(coords.x, coords.y);
    }
  });

  canvas.addEventListener('pointerup', (e) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    midlet.canvas.pointerReleased(coords.x, coords.y);
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    // If user is typing in HTML text input, ignore game canvas key capture
    if (document.activeElement && document.activeElement.tagName === 'INPUT') {
      if (e.key === 'Enter') {
        const btn = document.getElementById('loginBtn');
        if (btn) btn.click();
      }
      return;
    }

    let keyCode = 0;
    switch (e.key) {
      case 'ArrowUp':
      case '2':
      case 'w':
      case 'W':
        keyCode = 50; // UP
        break;
      case 'ArrowDown':
      case '8':
      case 's':
      case 'S':
        keyCode = 56; // DOWN
        break;
      case 'ArrowLeft':
      case '4':
      case 'a':
      case 'A':
        keyCode = 52; // LEFT
        break;
      case 'ArrowRight':
      case '6':
      case 'd':
      case 'D':
        keyCode = 54; // RIGHT
        break;
      case 'Enter':
      case '5':
        keyCode = 13; // FIRE / SELECT
        break;
      case 'c':
      case 'C':
        keyCode = 67; // CHAT
        break;
      case 'q':
      case 'Q':
        keyCode = -6; // Left softkey (Chat)
        break;
      case 'e':
      case 'E':
        keyCode = -7; // Right softkey (Leave)
        break;
    }
    if (keyCode !== 0) {
      midlet.canvas.keyPressed(keyCode);
    }
  });

  // Start 20 FPS loop
  midlet.start();
  window.__READY = true;
  console.log('[WebClient] Avatar 258 WebGL Native Client running at 20 FPS.');
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', startWebClient);
} else {
  startWebClient();
}

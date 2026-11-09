import { Graphics, Image } from '@avatar/j2me-compat';
import { GameScreen } from '../ui/GameScreen.js';
import { UISkinPainter } from '../ui/UISkinPainter.js';
import { IFont } from '../renderer/BitmapFont.js';
import { NetworkSession, RemotePlayer } from '../network/NetworkSession.js';
import { TilemapRenderer, MapObjectInstance } from '../maps/TilemapRenderer.js';
import { AvatarRenderer } from '../characters/AvatarRenderer.js';

export class GameWorldScreen extends GameScreen {
  public localPlayer = {
    id: 0,
    name: 'Tôi',
    x: 120,
    y: 200,
    direct: 0, // 0: Down, 1: Up, 2: Left, 3: Right
    gender: 0,
    wearing: [] as number[],
    chatMessage: '',
    chatTimer: 0,
    feelId: -1,
    feelTimer: 0,
    isMoving: false,
    frame: 0
  };

  public remotePlayers = new Map<number, RemotePlayer & {
    lastX?: number;
    lastY?: number;
    frame?: number;
    feelId?: number;
    feelTimer?: number;
  }>();

  public currentMapId = 11;
  public currentAreaId = 0;

  public skinPainter: UISkinPainter;
  public font?: IFont;
  public networkSession: NetworkSession;
  public tilemapRenderer: TilemapRenderer;

  public MOVE_SPEED = 4;
  public isRunningFast = false;
  private lastMoveSentTime = 0;
  private animTick = 0;

  // Mouse click-to-move and drag navigation
  public targetMoveX?: number;
  public targetMoveY?: number;
  public clickEffect?: { x: number; y: number; tick: number };
  public isMouseDown = false;

  // Top marquee announcement ticker
  public tickerText = 'Chào mừng bạn đến với Avatar Teamobi WebGL Native! Di chuyển mượt mà bằng chuột | Click Menu hoặc phím C để chat';
  public tickerX = 400;

  // In-game HUD popups
  public isMenuOpen = false;
  public isEmoteOpen = false;
  public img12Plus?: Image;

  public menuOptions = [
    'Rương đồ (Inventory)',
    'Đổi khu',
    'Xem thông tin',
    'Chạy nhanh (Bật/Tắt)',
    'Toàn màn hình',
    'Đóng Menu'
  ];

  // Authentic NPCs definition per Map ID from avatar_2x.npc database
  public static readonly ALL_MAP_NPCS: Record<number, Array<{
    id: number;
    targetId: number;
    name: string;
    x: number;
    y: number;
    wearing: number[];
    chatMessage: string;
    chatTimer: number;
    chatList?: string[];
  }>> = {
    9: [
      {
        id: 185,
        targetId: 2000000185,
        name: 'Quay số',
        x: 514,
        y: 48,
        wearing: [3379, 310, 309, 0, 82, 201, 523, 313, 528],
        chatMessage: '',
        chatTimer: 0,
        chatList: ['Quay số may mắn đây', 'Bạn có thể trúng những món quà độc đáo', 'Hãy tham gia ngay nào']
      },
      {
        id: 186,
        targetId: 2000000186,
        name: 'Đấu giá',
        x: 410,
        y: 48,
        wearing: [598, 597, 0, 82, 308, 595, 313],
        chatMessage: '',
        chatTimer: 0,
        chatList: ['Chào các bạn đã đến với đấu giá', 'Hiện chưa có thông tin phiên tiếp theo']
      }
    ],
    11: [
      {
        id: 864,
        targetId: 2000000864,
        name: 'Thần Tài Xỉu',
        x: 80,
        y: 50,
        wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312],
        chatMessage: '',
        chatTimer: 0
      },
      {
        id: 860,
        targetId: 2000000860,
        name: 'Tiên tri Lovanga',
        x: 250,
        y: 64,
        wearing: [89, 88, 0, 2044, 3299],
        chatMessage: '',
        chatTimer: 0
      },
      {
        id: 465,
        targetId: 2000000465,
        name: 'Vé số',
        x: 638,
        y: 68,
        wearing: [89, 88, 0, 33, 49, 328],
        chatMessage: '',
        chatTimer: 0
      }
    ],
    13: [
      {
        id: 430,
        targetId: 2000000430,
        name: 'Thợ câu',
        x: 326,
        y: 64,
        wearing: [3387, 3386, 0, 82, 3385, 3384, 442],
        chatMessage: '',
        chatTimer: 0
      }
    ],
    17: [
      {
        id: 863,
        targetId: 2000000863,
        name: 'Chạy To Win',
        x: 54,
        y: 48,
        wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312],
        chatMessage: '',
        chatTimer: 0,
        chatList: ['Shop cày chay đây']
      },
      {
        id: 862,
        targetId: 2000000862,
        name: 'Pay To Win',
        x: 173,
        y: 48,
        wearing: [2440, 2441, 0, 4338, 608, 3484, 3854, 5312, 5455, 2310],
        chatMessage: '',
        chatTimer: 0,
        chatList: ['Chỉ có thể PayToWin = )))']
      }
    ],
    20: [
      {
        id: 335,
        targetId: 2000000335,
        name: 'Phi hành gia',
        x: 40,
        y: 49,
        wearing: [75, 56, 0, 516, 55, 2042],
        chatMessage: '',
        chatTimer: 0
      }
    ],
    21: [
      {
        id: 857,
        targetId: 2000000857,
        name: 'Chủ đầu tư',
        x: 598,
        y: 24,
        wearing: [2403],
        chatMessage: '',
        chatTimer: 0
      }
    ],
    23: [
      {
        id: 95,
        targetId: 2000000095,
        name: 'Thợ kim hoàn',
        x: 686,
        y: 52,
        wearing: [4205, 3378, 63, 62, 87, 90, 2073, 291, 616],
        chatMessage: '',
        chatTimer: 0
      }
    ],
    25: [
      {
        id: 850,
        targetId: 2000000850,
        name: 'Lái buôn',
        x: 70,
        y: 45,
        wearing: [273, 326, 0, 82, 73, 297, 442],
        chatMessage: '',
        chatTimer: 0
      }
    ]
  };

  public mapNpcs: Array<{
    id: number;
    targetId: number;
    name: string;
    x: number;
    y: number;
    wearing: number[];
    chatMessage: string;
    chatTimer: number;
    chatList?: string[];
  }> = [];

  // Active NPC Dialogue State
  public activeDialog: {
    userId: number;
    menuId: number;
    options: string[];
    title?: string;
  } | null = null;

  // Active Chest Inventory State
  public isChestOpen = false;
  public chestItems: Array<{ id: number; reliability: number; expired: string }> = [];

  // Active Player-to-Player Action Menu
  public selectedTargetPlayer: { id: number; name: string } | null = null;
  public activeActionAnimation: { fromId: number; toId: number; action: number; tick: number } | null = null;

  // Live Wallet Currency
  public userXu = 0;
  public userLuong = 0;

  public emoteOptions = [
    { id: 0, icon: '😊', name: 'Cười' },
    { id: 1, icon: '😢', name: 'Khóc' },
    { id: 2, icon: '😡', name: 'Giận' },
    { id: 3, icon: '❤️', name: 'Yêu' },
    { id: 4, icon: '💋', name: 'Hôn' },
    { id: 5, icon: '😉', name: 'Nháy mắt' }
  ];

  constructor(networkSession: NetworkSession, skinPainter: UISkinPainter, font?: IFont) {
    super();
    this.networkSession = networkSession;
    this.skinPainter = skinPainter;
    this.font = font;
    this.tilemapRenderer = new TilemapRenderer();

    this.leftCmd = { caption: 'Chat', actionId: 0 };
    this.centerCmd = { caption: 'Chọn', actionId: 1 };
    this.rightCmd = { caption: 'Rời khu', actionId: 2 };

    this.setupNetworkHandlers();
    AvatarRenderer.init().catch(console.error);
    this.mapNpcs = (GameWorldScreen.ALL_MAP_NPCS[this.currentMapId] || []).map(n => ({ ...n }));
    for (const npc of this.mapNpcs) {
      AvatarRenderer.preloadWearing(npc.wearing);
    }
    this.tilemapRenderer.loadMap(this.currentMapId).catch(console.error);

    // Load 12+ badge
    Image.createImage('/assets/normal/12Plus.png')
      .then((img) => (this.img12Plus = img))
      .catch(() => {});
  }

  public onResize(_width: number, _height: number): void {
    // Layout automatically adapts in paint()
  }

  private setupNetworkHandlers(): void {
    this.networkSession.on('join_park', (data: { mapId: number; areaId: number; x: number; y: number; players?: RemotePlayer[] }) => {
      this.currentMapId = data.mapId;
      this.currentAreaId = data.areaId;
      if (data.x > 0 && data.y > 0) {
        this.localPlayer.x = data.x;
        this.localPlayer.y = data.y;
      }
      this.mapNpcs = (GameWorldScreen.ALL_MAP_NPCS[this.currentMapId] || []).map(n => ({ ...n }));
      for (const npc of this.mapNpcs) {
        AvatarRenderer.preloadWearing(npc.wearing);
      }
      this.tilemapRenderer.loadMap(this.currentMapId);
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

    this.networkSession.on('farm_join', () => {
      this.currentMapId = 18;
      this.tilemapRenderer.loadMap(18);
      console.log('[World] Entered Farm (Map 18)');
    });

    this.networkSession.on('player_join_park', (player: RemotePlayer) => {
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

    this.networkSession.on('player_leave_park', (playerId: number) => {
      this.remotePlayers.delete(playerId);
      console.log(`[World] Removed remote player ${playerId}`);
    });

    this.networkSession.on('player_move', (data: { id: number; x: number; y: number; direct: number }) => {
      const p = this.remotePlayers.get(data.id);
      if (p) {
        p.lastX = p.x;
        p.lastY = p.y;
        p.x = data.x;
        p.y = data.y;
        p.direct = data.direct;
        p.frame = ((p.frame || 0) % 4) + 1;
      }
    });

    this.networkSession.on('player_chat', (data: { id: number; message: string }) => {
      if (data.id === this.localPlayer.id) {
        this.localPlayer.chatMessage = data.message;
        this.localPlayer.chatTimer = 100; // 5 seconds at 20 FPS
      } else {
        const p = this.remotePlayers.get(data.id);
        if (p) {
          p.chatMessage = data.message;
          p.chatTimer = 100;
        }
      }
    });

    this.networkSession.on('player_feel', (data: { id: number; feelId: number }) => {
      if (data.id === this.localPlayer.id) {
        this.localPlayer.feelId = data.feelId;
        this.localPlayer.feelTimer = 60; // 3 seconds
      } else {
        const p = this.remotePlayers.get(data.id);
        if (p) {
          p.feelId = data.feelId;
          p.feelTimer = 60;
        }
      }
    });

    // NPC Dialog Menu Options (-59)
    this.networkSession.on('menu_option', (data: { userId: number; menuId: number; options: string[] }) => {
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

    // Personal Chest Inventory (-47)
    this.networkSession.on('view_chest', (items: Array<{ id: number; reliability: number; expired: string }>) => {
      console.log(`[World] Chest items received: ${items.length}`);
      this.chestItems = items;
      this.isChestOpen = true;
      this.isMenuOpen = false;
      this.activeDialog = null;
    });

    // Live Equipment change (-48)
    this.networkSession.on('player_using_part', (data: { userId: number; itemId: number }) => {
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

    // Live Equipment unequip (-36)
    this.networkSession.on('player_remove_item', (data: { userId: number; itemId: number }) => {
      if (data.userId === this.localPlayer.id) {
        this.localPlayer.wearing = this.localPlayer.wearing.filter(id => id !== data.itemId);
      } else {
        const p = this.remotePlayers.get(data.userId);
        if (p) {
          p.wearing = p.wearing.filter(id => id !== data.itemId);
        }
      }
    });

    // Realtime Money update (-33)
    this.networkSession.on('update_money', (data: { xu: number; luong: number }) => {
      this.userXu = data.xu;
      this.userLuong = data.luong;
    });

    // Player-to-Player Action (59: Kiss, Hug, etc.)
    this.networkSession.on('player_action', (data: { userId: number; idTo: number; action: number }) => {
      console.log(`[World] Player Action: ${data.userId} -> ${data.idTo} (Action ${data.action})`);
      this.activeActionAnimation = {
        fromId: data.userId,
        toId: data.idTo,
        action: data.action,
        tick: 40 // 2 seconds
      };
    });

    // Server Info / Announcements (-8, -9)
    this.networkSession.on('server_info', (info: string) => {
      this.tickerText = info;
      this.tickerX = 500;
    });
    this.networkSession.on('server_message', (msg: string) => {
      this.tickerText = `[Thông báo]: ${msg}`;
      this.tickerX = 500;
    });
  }

  public update(): void {
    this.animTick++;

    // 1. Ticker text scroll animation
    this.tickerX -= 1;
    const tickerWidth = this.tickerText.length * 7;
    if (this.tickerX < -tickerWidth) {
      const screenW = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.width) || 640;
      this.tickerX = screenW;
    }

    // 2. Click ripple effect decay
    if (this.clickEffect && this.clickEffect.tick > 0) {
      this.clickEffect.tick--;
    }

    // 3. Smooth Step-by-Step Mouse Walking
    const speed = this.isRunningFast ? 6 : this.MOVE_SPEED;

    if (this.targetMoveX !== undefined && this.targetMoveY !== undefined) {
      const dx = this.targetMoveX - this.localPlayer.x;
      const dy = this.targetMoveY - this.localPlayer.y;
      const dist = Math.hypot(dx, dy);

      if (dist <= speed) {
        // Arrived at destination
        this.localPlayer.x = this.targetMoveX;
        this.localPlayer.y = this.targetMoveY;
        this.targetMoveX = undefined;
        this.targetMoveY = undefined;
        this.localPlayer.isMoving = false;
        this.networkSession.sendMove(this.localPlayer.x, this.localPlayer.y, this.localPlayer.direct);
      } else {
        const angle = Math.atan2(dy, dx);
        const stepX = Math.cos(angle) * speed;
        const stepY = Math.sin(angle) * speed;

        // Face towards moving direction
        if (Math.abs(dx) > Math.abs(dy)) {
          this.localPlayer.direct = dx > 0 ? 3 : 2; // Right : Left
        } else {
          this.localPlayer.direct = dy > 0 ? 0 : 1; // Down : Up
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
          // Obstacle blocked
          this.targetMoveX = undefined;
          this.targetMoveY = undefined;
        }

        this.localPlayer.isMoving = true;

        const now = Date.now();
        if (now - this.lastMoveSentTime > 100) {
          this.lastMoveSentTime = now;
          this.networkSession.sendMove(this.localPlayer.x, this.localPlayer.y, this.localPlayer.direct);
        }
      }
    }

    // 4. Character Animation Walking Frame
    if (this.localPlayer.isMoving) {
      this.localPlayer.frame = (Math.floor(this.animTick / 2) % 4) + 1; // frames 1..4
      if (this.targetMoveX === undefined && !this.isMouseDown) {
        this.localPlayer.isMoving = false;
      }
    } else {
      this.localPlayer.frame = 0; // idle frame
    }

    // 5. Timers for chat & feel
    if (this.localPlayer.chatTimer > 0) {
      this.localPlayer.chatTimer--;
      if (this.localPlayer.chatTimer === 0) {
        this.localPlayer.chatMessage = '';
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
          player.chatMessage = '';
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

  public keyPressed(keyCode: number): void {
    let moved = false;
    let newX = this.localPlayer.x;
    let newY = this.localPlayer.y;
    let newDirect = this.localPlayer.direct;
    const speed = this.isRunningFast ? 6 : this.MOVE_SPEED;

    // Up
    if (keyCode === 50 || keyCode === -1 || keyCode === 87 || keyCode === 119) {
      newY -= speed;
      newDirect = 1;
      moved = true;
    }
    // Down
    else if (keyCode === 56 || keyCode === -2 || keyCode === 83 || keyCode === 115) {
      newY += speed;
      newDirect = 0;
      moved = true;
    }
    // Left
    else if (keyCode === 52 || keyCode === -3 || keyCode === 65 || keyCode === 97) {
      newX -= speed;
      newDirect = 2;
      moved = true;
    }
    // Right
    else if (keyCode === 54 || keyCode === -4 || keyCode === 68 || keyCode === 100) {
      newX += speed;
      newDirect = 3;
      moved = true;
    }
    // Chat trigger: 'c' or 'C' or Enter
    else if (keyCode === 67 || keyCode === 99 || keyCode === 13) {
      this.promptChat();
      return;
    }
    // Menu trigger: 'q' or 'Q'
    else if (keyCode === 81 || keyCode === 113) {
      this.isMenuOpen = !this.isMenuOpen;
      return;
    }

    if (moved) {
      this.targetMoveX = undefined;
      this.targetMoveY = undefined;

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

  public pointerPressed(x: number, y: number): void {
    const screenW = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.width) || 640;
    const screenH = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.height) || 360;

    // 1. In-game Menu Popup interaction
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

    // 1b. Active NPC Dialog Options interaction
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

    // 1c. Active Chest Inventory interaction
    if (this.isChestOpen) {
      const cw = 250;
      const ch = 180;
      const cx = Math.floor((screenW - cw) / 2);
      const cy = Math.floor((screenH - ch) / 2);

      // Close button
      if (x >= cx + cw - 26 && x <= cx + cw && y >= cy && y <= cy + 24) {
        this.isChestOpen = false;
        return;
      }

      // Click on item in chest grid
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

    // 1d. Active Player-to-Player Action Menu
    if (this.selectedTargetPlayer) {
      const tw = 150;
      const th = 105;
      const tx = Math.floor((screenW - tw) / 2);
      const ty = Math.floor((screenH - th) / 2);

      if (x >= tx && x <= tx + tw && y >= ty && y <= ty + th) {
        const actionIdx = Math.floor((y - (ty + 26)) / 24);
        const target = this.selectedTargetPlayer;
        this.selectedTargetPlayer = null;
        if (actionIdx === 0) { // Hôn
          this.networkSession.sendAction(target.id, 102);
        } else if (actionIdx === 1) { // Ôm
          this.networkSession.sendAction(target.id, 101);
        } else if (actionIdx === 2) { // Bắt tay
          this.networkSession.sendAction(target.id, 103);
        }
      } else {
        this.selectedTargetPlayer = null;
      }
      return;
    }

    // 2. In-game Emotion Wheel interaction
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

    // 3. Top HUD Buttons
    if (y <= 26) {
      // [ MENU ] button: x=6..50
      if (x >= 6 && x <= 50) {
        this.isMenuOpen = !this.isMenuOpen;
        this.isEmoteOpen = false;
        return;
      }
      // [ ✉ ] Mail button: x=54..76
      if (x >= 54 && x <= 76) {
        alert('Hộp thư: Bạn không có thư mới nào từ Thị Trưởng.');
        return;
      }
      // [ 💬 ] Chat button: x=80..102
      if (x >= 80 && x <= 102) {
        this.promptChat();
        return;
      }
      // [ 🧭 ] Area switch button: x=screenW-80..screenW-58
      if (x >= screenW - 80 && x <= screenW - 58) {
        const nextArea = (this.currentAreaId + 1) % 10;
        this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
        return;
      }
      // [ 🏃 ] Speed toggle button: x=screenW-54..screenW-32
      if (x >= screenW - 54 && x <= screenW - 32) {
        this.isRunningFast = !this.isRunningFast;
        return;
      }
      // [ 😊 ] Emote button: x=screenW-28..screenW-6
      if (x >= screenW - 28 && x <= screenW - 6) {
        this.isEmoteOpen = !this.isEmoteOpen;
        this.isMenuOpen = false;
        return;
      }
      return;
    }

    // 4. Bottom Bar & Softkeys
    if (y >= screenH - 24) {
      // Left softkey: Chat
      if (x <= 80) {
        this.promptChat();
      }
      // Right softkey: Rời khu / Đổi khu
      else if (x >= screenW - 140 && x <= screenW - 40) {
        const nextArea = (this.currentAreaId + 1) % 10;
        this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
      }
      // Fullscreen toggle: x >= screenW - 40
      else if (x > screenW - 40) {
        if (typeof window !== 'undefined' && (window as any).toggleFullscreen) {
          (window as any).toggleFullscreen();
        }
      }
      return;
    }

    // 5. World Interaction Check (NPCs & Remote Players)
    const worldTargetX = x + this.tilemapRenderer.cameraX;
    const worldTargetY = y + this.tilemapRenderer.cameraY;

    // 5a. Check if clicked on an NPC
    for (const npc of this.mapNpcs) {
      const dx = Math.abs(worldTargetX - npc.x);
      const dy = Math.abs(worldTargetY - npc.y);
      if (dx < 26 && dy < 36) {
        console.log(`[World] Clicked NPC: ${npc.name} (ID: ${npc.targetId})`);
        this.networkSession.sendCommunicate(npc.targetId);
        return;
      }
    }

    // 5b. Check if clicked on a Remote Player
    for (const rp of this.remotePlayers.values()) {
      const dx = Math.abs(worldTargetX - rp.x);
      const dy = Math.abs(worldTargetY - rp.y);
      if (dx < 24 && dy < 34) {
        console.log(`[World] Clicked Player: ${rp.name} (ID: ${rp.id})`);
        this.selectedTargetPlayer = { id: rp.id, name: rp.name };
        return;
      }
    }

    // 5c. Otherwise: World Mouse Click-to-Move
    this.targetMoveX = worldTargetX;
    this.targetMoveY = worldTargetY;
    this.clickEffect = { x: worldTargetX, y: worldTargetY, tick: 16 };
    this.isMouseDown = true;
  }

  public pointerDragged(x: number, y: number): void {
    if (this.isMouseDown && y > 26 && y < ((typeof window !== 'undefined' && window.gameMidlet?.canvas?.height) || 360) - 24) {
      this.targetMoveX = x + this.tilemapRenderer.cameraX;
      this.targetMoveY = y + this.tilemapRenderer.cameraY;
    }
  }

  public pointerReleased(_x: number, _y: number): void {
    this.isMouseDown = false;
  }

  public onSelectMenuItem(index: number): void {
    this.isMenuOpen = false;
    switch (index) {
      case 0: { // Rương đồ (Inventory)
        this.networkSession.sendViewChest(this.localPlayer.id);
        break;
      }
      case 1: { // Đổi khu
        const nextArea = (this.currentAreaId + 1) % 10;
        this.networkSession.sendJoinPark(this.currentMapId, nextArea, this.localPlayer.x, this.localPlayer.y);
        break;
      }
      case 2: { // Xem thông tin
        const u = this.localPlayer.name;
        alert(`Nhân vật: ${u} | ID: ${this.localPlayer.id} | Xu: ${this.userXu} | Lượng: ${this.userLuong} | Bản đồ: ${this.currentMapId} - Khu: ${this.currentAreaId}`);
        break;
      }
      case 3: { // Chạy nhanh
        this.isRunningFast = !this.isRunningFast;
        break;
      }
      case 4: { // Toàn màn hình
        if (typeof window !== 'undefined' && (window as any).toggleFullscreen) {
          (window as any).toggleFullscreen();
        }
        break;
      }
      case 5: { // Đóng menu
        break;
      }
    }
  }

  public promptChat(): void {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
      chatInput.focus();
    } else {
      const text = window.prompt('Nhập nội dung chat:');
      if (text && text.trim().length > 0) {
        this.networkSession.sendChat(text.trim());
      }
    }
  }

  public paint(g: Graphics): void {
    const screenW = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.width) || 640;
    const screenH = (typeof window !== 'undefined' && window.gameMidlet?.canvas?.height) || 360;

    // 1. Update Camera centering on local player
    this.tilemapRenderer.updateCamera(this.localPlayer.x, this.localPlayer.y, screenW, screenH);
    const camX = this.tilemapRenderer.cameraX;
    const camY = this.tilemapRenderer.cameraY;

    // 2. Render Tilemap & Landscape
    this.tilemapRenderer.paint(g, screenW, screenH);

    // 3. Render Click Target Ripple Animation
    if (this.clickEffect && this.clickEffect.tick > 0) {
      const effX = this.clickEffect.x - camX;
      const effY = this.clickEffect.y - camY;
      const radius = (16 - this.clickEffect.tick) * 1.5;

      g.setColor(0x00E5FF);
      g.drawArc(effX - radius, effY - radius * 0.6, radius * 2, radius * 1.2, 0, 360);
      g.setColor(0xFFD700);
      g.drawArc(effX - radius * 0.5, effY - radius * 0.3, radius, radius * 0.6, 0, 360);
    }

    // 4. Collect and 2.5D Depth-Sort Characters & Map Objects (Y-Sort Painter's Algorithm)
    const entities: Array<{
      type?: 'avatar' | 'object';
      id?: number;
      name?: string;
      x: number;
      y: number;
      wearing?: number[];
      direct?: number;
      frame?: number;
      isLocal?: boolean;
      chatMessage?: string;
      feelId?: number;
      mapObject?: MapObjectInstance;
    }> = [];

    // Local player
    entities.push({
      type: 'avatar',
      id: this.localPlayer.id,
      name: this.localPlayer.name,
      x: this.localPlayer.x,
      y: this.localPlayer.y,
      wearing: this.localPlayer.wearing,
      direct: this.localPlayer.direct,
      frame: this.localPlayer.frame,
      isLocal: true,
      chatMessage: this.localPlayer.chatMessage,
      feelId: this.localPlayer.feelId
    });

    const seenIds = new Set<number>();
    seenIds.add(this.localPlayer.id);

    // Remote players from Java Server (Deduplicated)
    for (const rp of this.remotePlayers.values()) {
      if (!seenIds.has(rp.id)) {
        seenIds.add(rp.id);
        let displayName = rp.name;
        if (displayName.includes('Lovanga')) {
          displayName = 'Tiên tri Lovanga';
        }
        entities.push({
          id: rp.id,
          name: displayName,
          x: rp.x,
          y: rp.y,
          wearing: rp.wearing,
          direct: rp.direct,
          frame: rp.frame || 0,
          isLocal: false,
          chatMessage: rp.chatMessage,
          feelId: rp.feelId
        });
      }
    }

    // Map NPCs: Only add if not already sent by server
    for (const npc of this.mapNpcs) {
      if (!seenIds.has(npc.id) && !seenIds.has(npc.targetId)) {
        const alreadyPresent = entities.some(
          e => e.name && e.name.toLowerCase().replace(/[^a-z0-9]/g, '') === npc.name.toLowerCase().replace(/[^a-z0-9]/g, '')
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

    // Map Objects (Buildings, Trees, Windmills, Shops from special markers)
    if (this.tilemapRenderer && this.tilemapRenderer.mapObjects) {
      for (const obj of this.tilemapRenderer.mapObjects) {
        if (obj.image) {
          entities.push({
            type: 'object',
            x: obj.x,
            y: obj.y,
            mapObject: obj
          });
        }
      }
    }

    entities.sort((a, b) => a.y - b.y);

    // 5. Render All Characters & Map Objects in Y-sorted depth order
    for (const ent of entities) {
      if (ent.type === 'object' && ent.mapObject && ent.mapObject.image) {
        const img = ent.mapObject.image;
        const imgW = img.getWidth();
        const imgH = img.getHeight();
        // Anchor 33 (HCENTER | BOTTOM) as in ks.java line 34-35
        const screenX = ent.x - Math.floor(imgW / 2) - camX;
        const screenY = ent.y - imgH - camY;

        if (screenX + imgW >= -50 && screenX <= screenW + 50 && screenY + imgH >= -50 && screenY <= screenH + 50) {
          g.drawImage(img, screenX, screenY, 0);
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
          ent.name || '',
          !!ent.isLocal,
          this.font,
          ent.chatMessage
        );

        // Render Emotion Feel Balloon above character
        if (ent.feelId !== undefined && ent.feelId >= 0 && ent.feelId < this.emoteOptions.length) {
          const emote = this.emoteOptions[ent.feelId];
          const bx = screenX - 12;
          const by = screenY - 65;

          g.setColor(0xFFFFFF);
          g.fillRoundRect(bx, by, 24, 20, 6);
          g.setColor(0x0088CC);
          g.drawRoundRect(bx, by, 24, 20, 6);

          if (this.font) {
            this.font.drawString(g, emote.icon, screenX, by + 3, 2);
          }
        }
      }
    }

    // 6. Top Bar matching the user's reference screenshot
    g.setColor(0x0f172a); // Slate 900
    g.fillRect(0, 0, screenW, 26);
    g.setColor(0x1e293b);
    g.drawLine(0, 26, screenW, 26);

    // Left Buttons:
    // [ MENU ] button
    g.setColor(0x1565C0);
    g.fillRoundRect(6, 3, 44, 20, 4);
    g.setColor(0x90CAF9);
    g.drawRoundRect(6, 3, 44, 20, 4);
    if (this.font) {
      this.font.drawString(g, 'MENU', 28, 7, 2);
    }

    // [ ✉ ] Mail button
    g.setColor(0x0284c7);
    g.fillRoundRect(54, 3, 22, 20, 4);
    g.setColor(0x7dd3fc);
    g.drawRoundRect(54, 3, 22, 20, 4);
    if (this.font) {
      this.font.drawString(g, '✉', 65, 6, 2);
    }
    // Notification red badge
    g.setColor(0xef4444);
    g.fillArc(70, 2, 6, 6, 0, 360);

    // [ 💬 ] Chat button
    g.setColor(0x1E88E5);
    g.fillRoundRect(80, 3, 22, 20, 4);
    g.setColor(0xBBDEFB);
    g.drawRoundRect(80, 3, 22, 20, 4);
    if (this.font) {
      this.font.drawString(g, '💬', 91, 6, 2);
    }

    // Right Buttons:
    // [ 🧭 ] Area/Map button
    g.setColor(0x0f766e);
    g.fillRoundRect(screenW - 80, 3, 22, 20, 4);
    g.setColor(0x5eead4);
    g.drawRoundRect(screenW - 80, 3, 22, 20, 4);
    if (this.font) {
      this.font.drawString(g, '🧭', screenW - 69, 6, 2);
    }

    // [ 🏃 ] Speed run button
    g.setColor(this.isRunningFast ? 0xF57C00 : 0x334155);
    g.fillRoundRect(screenW - 54, 3, 22, 20, 4);
    g.setColor(this.isRunningFast ? 0xFFE082 : 0x64748b);
    g.drawRoundRect(screenW - 54, 3, 22, 20, 4);
    if (this.font) {
      this.font.drawString(g, '🏃', screenW - 43, 6, 2);
    }

    // [ 😊 ] Emote button
    g.setColor(0xd97706);
    g.fillRoundRect(screenW - 28, 3, 22, 20, 4);
    g.setColor(0xfde68a);
    g.drawRoundRect(screenW - 28, 3, 22, 20, 4);
    if (this.font) {
      this.font.drawString(g, '😊', screenW - 17, 6, 2);
    }

    // Center Marquee News Ticker - Inset Dark Slot with High Contrast Gold Text
    const tickerClipX = 108;
    const tickerClipW = Math.max(40, screenW - 196);
    g.setColor(0x020617);
    g.fillRect(tickerClipX, 3, tickerClipW, 20);
    g.setColor(0x1e293b);
    g.drawRect(tickerClipX, 3, tickerClipW, 20);

    const ctx = g.ctx as CanvasRenderingContext2D | undefined;
    if (ctx) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(tickerClipX + 2, 3, tickerClipW - 4, 20);
      ctx.clip();
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillStyle = '#fde047'; // Bright gold for 100% readability
      ctx.textBaseline = 'middle';
      ctx.fillText(this.tickerText, this.tickerX, 13);
      ctx.restore();
    }

    // 7. Bottom-Left 12+ Badge
    if (this.img12Plus) {
      g.drawImage(this.img12Plus, 6, screenH - 24, 0);
    } else {
      g.setColor(0x212121);
      g.fillRoundRect(6, screenH - 22, 28, 18, 3);
      g.setColor(0xFFFFFF);
      g.drawRoundRect(6, screenH - 22, 28, 18, 3);
      if (this.font) {
        this.font.drawString(g, '12+', 20, screenH - 19, 2);
      }
    }

    // 8. Bottom Bar & Softkeys
    g.setColor(0x0f172a);
    g.fillRect(40, screenH - 24, screenW - 40, 24);
    g.setColor(0x1e293b);
    g.drawLine(0, screenH - 24, screenW, screenH - 24);

    if (ctx) {
      ctx.save();
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.textBaseline = 'middle';

      // Chat (C)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Chat (C)', 46, screenH - 12);

      // Area & online counter
      ctx.textAlign = 'center';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Khu ${this.currentAreaId} | ${this.remotePlayers.size + 1} online`, Math.floor(screenW / 2), screenH - 12);

      // Rời khu
      ctx.textAlign = 'right';
      ctx.fillStyle = '#f87171';
      ctx.fillText('Rời khu', screenW - 32, screenH - 12);

      // Fullscreen ⛶
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('⛶', screenW - 12, screenH - 12);
      ctx.restore();
    }

    // 9. In-game Menu Popup
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

    // 10. In-game Emotion Wheel Popup
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

    // 11. NPC Dialog Menu Window
    if (this.activeDialog) {
      const dw = 250;
      const dh = this.activeDialog.options.length * 24 + 36;
      const dx = Math.floor((screenW - dw) / 2);
      const dy = Math.floor((screenH - dh) / 2);

      this.skinPainter.paintWindow(g, dx, dy, dw, dh);
      if (this.font) {
        this.font.drawString(g, '--- HỘI THOẠI NPC ---', Math.floor(screenW / 2), dy + 8, 2);
        for (let i = 0; i < this.activeDialog.options.length; i++) {
          const iy = dy + 28 + i * 24;
          g.setColor(0x005577);
          g.fillRoundRect(dx + 10, iy, dw - 20, 20, 3);
          this.font.drawString(g, `[${i + 1}] ${this.activeDialog.options[i]}`, dx + 16, iy + 3, 0);
        }
      }
    }

    // 12. Personal Chest Inventory Window
    if (this.isChestOpen) {
      const cw = 250;
      const ch = 180;
      const cx = Math.floor((screenW - cw) / 2);
      const cy = Math.floor((screenH - ch) / 2);

      this.skinPainter.paintWindow(g, cx, cy, cw, ch);
      if (this.font) {
        this.font.drawString(g, `RƯƠNG ĐỒ (${this.chestItems.length} MÓN)`, Math.floor(screenW / 2), cy + 8, 2);
        g.setColor(0xE53935);
        this.font.drawString(g, '[X]', cx + cw - 18, cy + 8, 0);

        for (let i = 0; i < Math.min(15, this.chestItems.length); i++) {
          const it = this.chestItems[i];
          const col = i % 5;
          const row = Math.floor(i / 5);
          const bx = cx + 12 + col * 44;
          const by = cy + 28 + row * 44;

          g.setColor(0x223344);
          g.fillRoundRect(bx, by, 38, 38, 4);
          g.setColor(0x4488AA);
          g.drawRoundRect(bx, by, 38, 38, 4);

          this.font.drawString(g, `#${it.id}`, bx + 4, by + 4, 0);
          this.font.drawString(g, `${it.reliability}%`, bx + 4, by + 22, 0);
        }
      }
    }

    // 13. Target Player Action Menu
    if (this.selectedTargetPlayer) {
      const tw = 150;
      const th = 105;
      const tx = Math.floor((screenW - tw) / 2);
      const ty = Math.floor((screenH - th) / 2);

      this.skinPainter.paintWindow(g, tx, ty, tw, th);
      if (this.font) {
        this.font.drawString(g, this.selectedTargetPlayer.name, Math.floor(screenW / 2), ty + 6, 2);
        const actions = ['💋 Hôn', '🤗 Ôm', '🤝 Bắt tay'];
        for (let i = 0; i < actions.length; i++) {
          const ay = ty + 26 + i * 24;
          g.setColor(0x334455);
          g.fillRoundRect(tx + 8, ay, tw - 16, 20, 3);
          this.font.drawString(g, actions[i], tx + 14, ay + 3, 0);
        }
      }
    }

    // 14. Floating Action Animation (Kiss, Hug, Hearts)
    if (this.activeActionAnimation && this.activeActionAnimation.tick > 0) {
      this.activeActionAnimation.tick--;
      const targetP = this.remotePlayers.get(this.activeActionAnimation.toId);
      if (targetP) {
        const tx = targetP.x - camX;
        const ty = targetP.y - camY - 60 - (40 - this.activeActionAnimation.tick);
        if (this.font) {
          this.font.drawString(g, '💖 ❤️ 💋 ❤️ 💖', tx, ty, 2);
        }
      }
    }
  }
}

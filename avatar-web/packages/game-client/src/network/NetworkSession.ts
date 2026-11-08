import { Message, SessionCipher, PacketStreamDecoder, Cmd } from '@avatar/protocol';

export interface RemotePlayer {
  id: number;
  name: string;
  x: number;
  y: number;
  direct: number;
  wearing: number[];
  feelId?: number;
  feelTimer?: number;
  actionId?: number;
  chatMessage?: string;
  chatTimer?: number;
  lastX?: number;
  lastY?: number;
  frame?: number;
}

export interface ChestItem {
  id: number;
  reliability: number;
  expired: string;
}

export interface HouseFurniture {
  itemId: number;
  x: number;
  y: number;
  rotate: number;
}

type Listener = (...args: any[]) => void;

export class NetworkSession {
  public ws: WebSocket | null = null;
  public cipher: SessionCipher;
  public isConnected = false;
  public isHandshakeDone = false;

  private decoder: PacketStreamDecoder;
  private listeners: { [event: string]: Listener[] } = {};
  private lastLoginCredentials: { u: string; p: string; v: string } | null = null;

  constructor(public gatewayUrl: string = 'ws://localhost:19129') {
    this.cipher = new SessionCipher();
    this.decoder = new PacketStreamDecoder(this.cipher);
  }

  public on(event: string, listener: Listener): this {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    return this;
  }

  public off(event: string, listener: Listener): this {
    if (!this.listeners[event]) return this;
    this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    return this;
  }

  public emit(event: string, ...args: any[]): boolean {
    if (!this.listeners[event]) return false;
    for (const listener of this.listeners[event]) {
      try {
        listener(...args);
      } catch (err) {
        console.error(`[Network] Error in listener for "${event}":`, err);
      }
    }
    return true;
  }

  public async connect(): Promise<void> {
    if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    return new Promise((resolve, reject) => {
      console.log(`[Network] Connecting to WebSocket Gateway at ${this.gatewayUrl}...`);
      this.ws = new WebSocket(this.gatewayUrl);
      this.ws.binaryType = 'arraybuffer';

      this.ws.onopen = () => {
        this.isConnected = true;
        console.log('[Network] WebSocket connected to Gateway. Sending handshake request (-27)...');
        // Send unencrypted handshake request: Cmd -27
        const handshakeReq = new Message(Cmd.HANDSHAKE);
        const wire = this.cipher.encodePacket(handshakeReq);
        this.ws!.send(wire);
        resolve();
      };

      this.ws.onmessage = (event: MessageEvent) => {
        const rawData = new Uint8Array(event.data as ArrayBuffer);
        this.onRawDataReceived(rawData);
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.isHandshakeDone = false;
        console.warn('[Network] WebSocket connection closed.');
        this.emit('disconnect');
      };

      this.ws.onerror = (err) => {
        console.error('[Network] WebSocket error:', err);
        reject(err);
      };
    });
  }

  private onRawDataReceived(data: Uint8Array): void {
    const messages = this.decoder.push(data);
    for (const msg of messages) {
      this.processIncomingMessage(msg);
    }
  }

  private processIncomingMessage(msg: Message): void {
    const cmd = msg.command;

    // Command -27: Key handshake from Java Server
    if (cmd === Cmd.HANDSHAKE) {
      const reader = msg.reader();
      const keyLength = reader.readByte();
      const rawKeys: number[] = [keyLength];
      for (let i = 0; i < keyLength; i++) {
        rawKeys.push(reader.readByte());
      }
      this.cipher.initHandshake(new Uint8Array(rawKeys));
      this.isHandshakeDone = true;
      console.log(`[Network] Key exchange handshake (-27) success! Key len: ${keyLength}`);
      this.emit('handshake_done');
      return;
    }

    // Command -4: LOGIN_SUCESS
    if (cmd === Cmd.LOGIN_SUCESS) {
      const r = msg.reader();
      const userId = r.readInt();
      const wearCount = r.readByte();
      const wearing: number[] = [];
      for (let i = 0; i < wearCount; i++) {
        wearing.push(r.readShort());
      }
      const gender = r.readByte();
      const levelMain = r.readByte();
      const levelMainPercen = r.readByte();
      const xu = r.readInt();
      const friendly = r.readByte();
      const crazy = r.readByte();
      const stylish = r.readByte();
      const happy = r.readByte();
      const hunger = r.readByte();
      const luong = r.readInt();
      const star = r.readByte();

      console.log(`[Network] Login Success! UserID=${userId}, Xu=${xu}, Luong=${luong}`);
      this.lastLoginCredentials = null;
      this.emit('login_success', {
        id: userId,
        wearing,
        gender,
        levelMain,
        xu,
        luong,
        star
      });
      return;
    }

    // Command -5: LOGIN_FAIL
    if (cmd === Cmd.LOGIN_FAIL) {
      const r = msg.reader();
      const reason = r.available() > 0 ? r.readUTF() : 'Đăng nhập thất bại!';
      console.warn(`[Network] Login failed: ${reason}`);
      this.emit('login_fail', reason);
      return;
    }

    // Command -9: SERVER_MESSAGE
    if (cmd === Cmd.SERVER_MESSAGE) {
      const r = msg.reader();
      const message = r.readUTF();
      console.log(`[Network] Server Message: "${message}"`);
      this.emit('server_message', message);
      if (message.includes('đăng nhập') && this.lastLoginCredentials) {
        console.log('[Network] Account unlocked by server. Auto-retrying login in 600ms...');
        setTimeout(() => {
          if (this.lastLoginCredentials) {
            this.sendLogin(this.lastLoginCredentials.u, this.lastLoginCredentials.p, this.lastLoginCredentials.v);
          }
        }, 600);
      }
      return;
    }

    // Command -8: SERVER_INFO
    if (cmd === Cmd.SERVER_INFO) {
      const r = msg.reader();
      const info = r.readUTF();
      console.log(`[Network] Server Info: "${info}"`);
      this.emit('server_info', info);
      return;
    }

    // Command -35: CRE_CHARACTER
    if (cmd === Cmd.CRE_CHARACTER) {
      const r = msg.reader();
      const success = r.readBoolean();
      console.log(`[Network] Character Creation Result: ${success}`);
      this.emit('create_character', success);
      return;
    }

    // Command -33: UPDATE_MONEY
    if (cmd === Cmd.UPDATE_MONEY) {
      const r = msg.reader();
      const xeng = r.readInt();
      const type = r.readByte();
      const xu = r.readInt();
      const luong = r.readInt();
      const luongKhoa = r.readInt();
      console.log(`[Network] Update Money: Xu=${xu}, Luong=${luong}, LuongKhoa=${luongKhoa}, Xeng=${xeng}`);
      this.emit('update_money', { xeng, type, xu, luong, luongKhoa });
      return;
    }

    // Command -47: CONTAINER (Personal Chest / Inventory)
    if (cmd === Cmd.CONTAINER) {
      const r = msg.reader();
      const count = r.readShort();
      const items: ChestItem[] = [];
      for (let i = 0; i < count; i++) {
        const id = r.readShort();
        const reliability = r.readByte();
        const expired = r.readUTF();
        items.push({ id, reliability, expired });
      }
      console.log(`[Network] Chest inventory received: ${items.length} items`);
      this.emit('view_chest', items);
      return;
    }

    // Command -48: USING_PART (Equip Item / Part)
    if (cmd === Cmd.USING_PART) {
      const r = msg.reader();
      const userId = r.readInt();
      const itemId = r.readShort();
      console.log(`[Network] Player ${userId} equipped item ${itemId}`);
      this.emit('player_using_part', { userId, itemId });
      return;
    }

    // Command -36: REMOVE_ITEM (Unequip Item / Part)
    if (cmd === Cmd.REMOVE_ITEM) {
      const r = msg.reader();
      const userId = r.readInt();
      const itemId = r.readShort();
      console.log(`[Network] Player ${userId} unequipped item ${itemId}`);
      this.emit('player_remove_item', { userId, itemId });
      return;
    }

    // Command -49: OPEN_SHOP
    if (cmd === Cmd.OPEN_SHOP) {
      const r = msg.reader();
      const shopId = r.readByte();
      const shopName = r.readUTF();
      const count = r.readShort();
      const itemIds: number[] = [];
      for (let i = 0; i < count; i++) {
        itemIds.push(r.readShort());
      }
      console.log(`[Network] Shop Opened: ID=${shopId}, Name="${shopName}", Items=${itemIds.length}`);
      this.emit('open_shop', { id: shopId, name: shopName, itemIds });
      return;
    }

    // Command -59: MENU_OPTION (NPC Dialog Options)
    if (cmd === Cmd.MENU_OPTION) {
      const r = msg.reader();
      const userId = r.readInt();
      const menuId = r.readByte();
      const count = r.readByte();
      const options: string[] = [];
      for (let i = 0; i < count; i++) {
        options.push(r.readUTF());
      }
      console.log(`[Network] Menu Option from ${userId} (MenuID=${menuId}): [${options.join(', ')}]`);
      this.emit('menu_option', { userId, menuId, options });
      return;
    }

    // Command -60: TEXT_BOX (Popup Prompt Input)
    if (cmd === Cmd.TEXT_BOX) {
      const r = msg.reader();
      const userId = r.readInt();
      const menuId = r.readByte();
      const title = r.readUTF();
      const type = r.readByte();
      console.log(`[Network] Text Box Prompt: "${title}" (Type=${type})`);
      this.emit('text_box', { userId, menuId, title, type });
      return;
    }

    // Command -65: JOIN_HOUSE
    if (cmd === Cmd.JOIN_HOUSE) {
      const r = msg.reader();
      const houseType = r.readByte();
      const houseUserId = r.readInt();
      const mapLen = r.readShort();
      const mapData = new Uint8Array(mapLen);
      for (let i = 0; i < mapLen; i++) {
        mapData[i] = r.readByte();
      }
      const unk = r.readByte();
      const count = r.readShort();
      const furniture: HouseFurniture[] = [];
      for (let i = 0; i < count; i++) {
        const itemId = r.readShort();
        const x = r.readByte();
        const y = r.readByte();
        const rotate = r.readByte();
        furniture.push({ itemId, x, y, rotate });
      }
      console.log(`[Network] Joined House: UserID=${houseUserId}, Furniture=${furniture.length}`);
      this.emit('join_house', { houseType, userId: houseUserId, mapData, furniture });
      return;
    }

    // Command 50: AVATAR_JOIN_PARK
    if (cmd === Cmd.AVATAR_JOIN_PARK) {
      const r = msg.reader();
      const mapId = r.readByte();
      const areaId = r.readByte();
      const x = r.readShort();
      const y = r.readShort();
      console.log(`[Network] Joined Park: Map=${mapId}, Area=${areaId}, Pos=(${x}, ${y})`);

      const existingPlayers: RemotePlayer[] = [];
      if (r.available() > 0) {
        const numUser = r.readByte();
        for (let i = 0; i < numUser; i++) {
          const plId = r.readInt();
          const plName = r.readUTF();
          const wearCount = r.readByte();
          const plWearing: number[] = [];
          for (let w = 0; w < wearCount; w++) {
            plWearing.push(r.readShort());
          }
          const plX = r.readShort();
          const plY = r.readShort();
          const plRole = r.readByte();
          existingPlayers.push({
            id: plId,
            name: plName,
            x: plX,
            y: plY,
            direct: 0,
            wearing: plWearing
          });
        }
        for (let i = 0; i < numUser && r.available() > 0; i++) {
          existingPlayers[i].direct = r.readByte();
        }
      }

      this.emit('join_park', { mapId, areaId, x, y, players: existingPlayers });
      return;
    }

    // Command 51: PLAYER_JOIN_PARK
    if (cmd === Cmd.PLAYER_JOIN_PARK) {
      const r = msg.reader();
      const playerId = r.readInt();
      const name = r.readUTF();
      const wearCount = r.readByte();
      const wearing: number[] = [];
      for (let i = 0; i < wearCount; i++) {
        wearing.push(r.readShort());
      }
      const x = r.readShort();
      const y = r.readShort();
      const role = r.available() > 0 ? r.readByte() : 0;
      console.log(`[Network] Remote Player Joined: ID=${playerId}, Name=${name}, Pos=(${x}, ${y})`);
      this.emit('player_join_park', { id: playerId, name, x, y, direct: 0, wearing });
      return;
    }

    // Command 53: PLAYER_LEAVE_PARK
    if (cmd === Cmd.PLAYER_LEAVE_PARK) {
      const r = msg.reader();
      const playerId = r.readInt();
      console.log(`[Network] Remote Player Left: ID=${playerId}`);
      this.emit('player_leave_park', playerId);
      return;
    }

    // Command 54: MOVE_PARK
    if (cmd === Cmd.MOVE_PARK) {
      const r = msg.reader();
      const playerId = r.readInt();
      const x = r.readShort();
      const y = r.readShort();
      const direct = r.available() > 0 ? r.readByte() : 0;
      this.emit('player_move', { id: playerId, x, y, direct });
      return;
    }

    // Command 55: CHAT_PARK
    if (cmd === Cmd.CHAT_PARK) {
      const r = msg.reader();
      const playerId = r.readInt();
      const message = r.readUTF();
      console.log(`[Network] Chat from Player ${playerId}: ${message}`);
      this.emit('player_chat', { id: playerId, message });
      return;
    }

    // Command 57: AVATAR_FEEL
    if (cmd === Cmd.AVATAR_FEEL) {
      const r = msg.reader();
      const playerId = r.readInt();
      const feelId = r.readByte();
      console.log(`[Network] Player Feel: ID=${playerId}, Feel=${feelId}`);
      this.emit('player_feel', { id: playerId, feelId });
      return;
    }

    // Command 59: ACTION (Kiss, Hug, etc.)
    if (cmd === Cmd.ACTION) {
      const r = msg.reader();
      const userId = r.readInt();
      const idTo = r.readInt();
      const action = r.readShort();
      let customText = '';
      if (action === -1 && r.available() > 0) {
        customText = r.readUTF();
      }
      console.log(`[Network] Player Action: ${userId} -> ${idTo}, Action=${action}`);
      this.emit('player_action', { userId, idTo, action, customText });
      return;
    }

    // Default message handler
    this.emit('message', msg);
  }

  public sendMessage(msg: Message): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('[Network] Cannot send message: WebSocket not open!');
      return;
    }

    const wireData = this.cipher.encodePacket(msg);
    this.ws.send(wireData);
  }

  // --- High-level Gameplay Packet Dispatchers ---

  public sendLogin(username: string, password: string, version = '2.5.8'): void {
    this.lastLoginCredentials = { u: username, p: password, v: version };
    const msg = new Message(Cmd.LOGIN);
    msg.writer().writeUTF(username);
    msg.writer().writeUTF(password);
    msg.writer().writeUTF(version);

    console.log(`[Network] Sending Login for username: "${username}"`);
    this.sendMessage(msg);
  }

  public sendCreateCharacter(gender: number, numItem = 5): void {
    const msg = new Message(Cmd.CRE_CHARACTER);
    msg.writer().writeByte(gender);
    msg.writer().writeByte(numItem);

    console.log(`[Network] Sending Create Character: Gender=${gender}, Items=${numItem}`);
    this.sendMessage(msg);
  }

  public sendJoinPark(mapId = 11, areaId = 0, x = 200, y = 150): void {
    const msg = new Message(Cmd.AVATAR_JOIN_PARK);
    msg.writer().writeByte(mapId);
    msg.writer().writeByte(areaId);
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);

    console.log(`[Network] Sending Join Park: Map=${mapId}, Area=${areaId}`);
    this.sendMessage(msg);
  }

  public sendMove(x: number, y: number, direct = 0): void {
    const msg = new Message(Cmd.MOVE_PARK);
    msg.writer().writeShort(x);
    msg.writer().writeShort(y);
    msg.writer().writeByte(direct);

    this.sendMessage(msg);
  }

  public sendChat(message: string): void {
    const msg = new Message(Cmd.CHAT_PARK);
    msg.writer().writeUTF(message);

    console.log(`[Network] Sending Chat: "${message}"`);
    this.sendMessage(msg);
  }

  public sendAvatarFeel(feelId: number): void {
    const msg = new Message(Cmd.AVATAR_FEEL);
    msg.writer().writeByte(feelId);

    console.log(`[Network] Sending Avatar Feel: ${feelId}`);
    this.sendMessage(msg);
  }

  public sendAction(idTo: number, actionId: number): void {
    const msg = new Message(Cmd.ACTION);
    msg.writer().writeInt(idTo);
    msg.writer().writeShort(actionId);

    console.log(`[Network] Sending Action to Player ${idTo}: Action=${actionId}`);
    this.sendMessage(msg);
  }

  public sendCommunicate(targetId: number): void {
    const msg = new Message(Cmd.COMMUNICATE);
    msg.writer().writeInt(targetId);

    console.log(`[Network] Sending Communicate with target ID: ${targetId}`);
    this.sendMessage(msg);
  }

  public sendMenuSelect(userId: number, menuId: number, selectIndex: number): void {
    const msg = new Message(Cmd.MENU_OPTION);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(menuId);
    msg.writer().writeByte(selectIndex);

    console.log(`[Network] Sending Menu Select: User=${userId}, Menu=${menuId}, Select=${selectIndex}`);
    this.sendMessage(msg);
  }

  public sendTextBoxReply(userId: number, menuId: number, text: string): void {
    const msg = new Message(Cmd.TEXT_BOX);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(menuId);
    msg.writer().writeUTF(text);

    console.log(`[Network] Sending TextBox Reply: User=${userId}, Menu=${menuId}, Text="${text}"`);
    this.sendMessage(msg);
  }

  public sendViewChest(userId: number): void {
    const msg = new Message(Cmd.CONTAINER);
    msg.writer().writeInt(userId);

    console.log(`[Network] Requesting Chest for User: ${userId}`);
    this.sendMessage(msg);
  }

  public sendUsingPart(itemId: number, type = 1): void {
    const msg = new Message(Cmd.USING_PART);
    msg.writer().writeShort(itemId);
    msg.writer().writeByte(type);

    console.log(`[Network] Sending Using Part: Item=${itemId}, Type=${type}`);
    this.sendMessage(msg);
  }

  public sendRemoveItem(itemId: number, type = 0): void {
    const msg = new Message(Cmd.REMOVE_ITEM);
    msg.writer().writeShort(itemId);
    msg.writer().writeByte(type);

    console.log(`[Network] Sending Remove Item: Item=${itemId}, Type=${type}`);
    this.sendMessage(msg);
  }

  public sendBuyItemShop(partId: number, type = 1): void {
    const msg = new Message(Cmd.AVATAR_BUY_ITEM);
    msg.writer().writeShort(partId);
    msg.writer().writeByte(type);

    console.log(`[Network] Sending Buy Item: Part=${partId}, CurrencyType=${type}`);
    this.sendMessage(msg);
  }

  public sendJoinHouse(userId: number): void {
    const msg = new Message(Cmd.JOIN_HOUSE);
    msg.writer().writeInt(userId);

    console.log(`[Network] Sending Join House: UserID=${userId}`);
    this.sendMessage(msg);
  }
}

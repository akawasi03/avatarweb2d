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

export interface MapItemType {
  id: number;
  imgID: number;
  iconID: number;
  dx: number;
  dy: number;
  positions: Array<{ x: number; y: number }>;
}

export interface DynamicMapItem {
  type: number;
  typeID: number;
  tileX: number;
  tileY: number;
}

type Listener = (...args: any[]) => void;

export class NetworkSession {
  public ws: WebSocket | null = null;
  public cipher: SessionCipher;
  public isConnected = false;
  public isHandshakeDone = false;
  public myUserId = 0;

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

  public disconnect(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {
        // ignore
      }
      this.ws = null;
    }
    this.isConnected = false;
    this.isHandshakeDone = false;
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
      this.myUserId = userId;
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

    // Command -10: SET_MONEY_ERROR (Server Dialog Modal)
    if (cmd === Cmd.SET_MONEY_ERROR) {
      const r = msg.reader();
      const message = r.readUTF();
      console.log(`[Network] Server Dialog: "${message}"`);
      this.emit('server_dialog', message);
      return;
    }

    // Command -1: GET_HANDLER
    if (cmd === Cmd.GET_HANDLER) {
      const r = msg.reader();
      const handlerId = r.readByte();
      console.log(`[Network] Server Switched Handler to ID: ${handlerId}`);
      this.emit('get_handler', handlerId);
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
      let numUser = 0;
      if (r.available() > 0) {
        numUser = r.readByte();
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

        // Skip per-user trailers: byte 101, short -1, plus two trailing 0 bytes
        for (let i = 0; i < numUser && r.available() > 0; i++) {
          r.readByte();
        }
        for (let i = 0; i < numUser && r.available() >= 2; i++) {
          r.readShort();
        }
        if (r.available() > 0) r.readByte();
        if (r.available() > 0) r.readByte();
      }

      // Read Dynamic Map Items from server (AvatarService.java:549-572)
      const mapItemTypes: MapItemType[] = [];
      const mapItems: DynamicMapItem[] = [];
      if (r.available() >= 2) {
        const mapItemsSize = r.readShort();
        if (mapItemsSize > 0 && r.available() > 0) {
          const typesCount = r.readByte();
          for (let i = 0; i < typesCount && r.available() >= 7; i++) {
            const id = r.readByte();
            const imgID = r.readShort();
            const iconID = r.readByte();
            const dx = r.readShort();
            const dy = r.readShort();
            const posCount = r.available() > 0 ? r.readByte() : 0;
            const positions: Array<{ x: number; y: number }> = [];
            for (let p = 0; p < posCount && r.available() >= 2; p++) {
              positions.push({ x: r.readByte(), y: r.readByte() });
            }
            mapItemTypes.push({ id, imgID, iconID, dx, dy, positions });
          }

          if (r.available() > 0) {
            const itemsCount = r.readByte();
            for (let i = 0; i < itemsCount && r.available() >= 4; i++) {
              const type = r.readByte();
              const typeID = r.readByte();
              const tileX = r.readByte();
              const tileY = r.readByte();
              mapItems.push({ type, typeID, tileX, tileY });
            }
          }
        }
      }

      this.emit('join_park', {
        mapId,
        areaId,
        x,
        y,
        players: existingPlayers,
        mapItemTypes,
        mapItems
      });
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

    // Command 61: FARM JOIN
    if (cmd === Cmd.JOIN) {
      const r = msg.reader();
      const userId = r.readInt();
      const landSize = r.readByte();
      const landItems: Array<{
        type: number;
        plantedMinutes?: number;
        sucKhoe?: number;
        isWatered?: boolean;
        isFertilized?: boolean;
        isHarvestable?: boolean;
      }> = [];

      for (let i = 0; i < landSize; i++) {
        const type = r.readByte();
        if (type >= 0) {
          const plantedMinutes = r.readShort();
          const sucKhoe = r.readByte();
          const heo = r.readByte();
          const isWatered = r.readBoolean();
          const isFertilized = r.readBoolean();
          const isHarvestable = r.readBoolean();
          landItems.push({ type, plantedMinutes, sucKhoe, isWatered, isFertilized, isHarvestable });
        } else {
          landItems.push({ type: -1 });
        }
      }

      const animalSize = r.readByte();
      const animals: Array<{
        id: number;
        health: number;
        level: number;
        resourceCount: number;
        nextProductionTime: number;
        isAlive: boolean;
        isReadyForBreeding: boolean;
        isHarvestable: boolean;
      }> = [];
      for (let i = 0; i < animalSize; i++) {
        const id = r.readByte();
        const health = r.readInt();
        const level = r.readByte();
        const resourceCount = r.readByte();
        const nextProductionTime = r.readByte();
        const isAlive = r.readBoolean();
        const isReadyForBreeding = r.readBoolean();
        const isHarvestable = r.readBoolean();
        animals.push({ id, health, level, resourceCount, nextProductionTime, isAlive, isReadyForBreeding, isHarvestable });
      }

      const barnSize = r.available() > 0 ? r.readByte() : 0;
      const fishPondSize = r.available() > 0 ? r.readByte() : 0;
      let starFruitLevel = 0;
      let starFruitFruit = 0;
      if (r.available() >= 8) {
        starFruitLevel = r.readShort();
        r.readShort();
        r.readShort();
        starFruitFruit = r.readShort();
      }

      console.log(`[Network] Joined Farm: User=${userId}, Lands=${landSize}, Animals=${animalSize}`);
      this.emit('farm_join', {
        userId,
        landItems,
        animals,
        barnSize,
        fishPondSize,
        starFruit: { level: starFruitLevel, fruit: starFruitFruit }
      });
      return;
    }

    // Command 60: FARM INVENTORY
    if (cmd === Cmd.INVENTORY) {
      const r = msg.reader();
      const numSeeds = r.readByte();
      const seeds: Array<{ id: number; quantity: number }> = [];
      for (let i = 0; i < numSeeds; i++) {
        seeds.push({ id: r.readByte(), quantity: r.readShort() });
      }

      const numCrops = r.readByte();
      const crops: Array<{ id: number; quantity: number }> = [];
      for (let i = 0; i < numCrops; i++) {
        crops.push({ id: r.readByte(), quantity: r.readShort() });
      }

      const xu = r.readInt();
      const farmLevel = r.readByte();
      const farmPercent = r.readByte();

      const numFertilizers = r.readByte();
      const fertilizers: Array<{ id: number; quantity: number }> = [];
      for (let i = 0; i < numFertilizers; i++) {
        fertilizers.push({ id: r.readByte(), quantity: r.readShort() });
      }

      const numSpecial = r.available() > 0 ? r.readByte() : 0;
      const specialCrops: Array<{ id: number; quantity: number }> = [];
      for (let i = 0; i < numSpecial; i++) {
        specialCrops.push({ id: r.readShort(), quantity: r.readInt() });
      }

      console.log(`[Network] Farm Inventory: Seeds=${seeds.length}, Crops=${crops.length}, Fertilizers=${fertilizers.length}`);
      this.emit('farm_inventory', { seeds, crops, xu, farmLevel, farmPercent, fertilizers, specialCrops });
      return;
    }

    // Command 64: PLANT_SEED
    if (cmd === Cmd.PLANT_SEED) {
      const r = msg.reader();
      const userId = r.readInt();
      const cellIndex = r.readByte();
      const seedId = r.readByte();
      console.log(`[Network] Plant Seed: User=${userId}, Cell=${cellIndex}, Seed=${seedId}`);
      this.emit('plant_seed', { userId, cellIndex, seedId });
      return;
    }

    // Command 66: TREE_HARVEST
    if (cmd === Cmd.TREE_HARVEST) {
      const r = msg.reader();
      const cellIndex = r.readByte();
      const yieldCount = r.available() > 0 ? r.readShort() : 0;
      console.log(`[Network] Harvest Crop: Cell=${cellIndex}, Yield=${yieldCount}`);
      this.emit('tree_harvest', { cellIndex, yieldCount });
      return;
    }

    // Command 70: OPEN_LAND
    if (cmd === Cmd.OPEN_LAND) {
      const r = msg.reader();
      const farmId = r.readInt();
      const slot = r.readInt();
      const typeBuy = r.readByte();
      const msgText = r.readUTF();
      const xu = r.available() > 0 ? r.readInt() : 0;
      const luong = r.available() > 0 ? r.readInt() : 0;
      console.log(`[Network] Open Land: Farm=${farmId}, Slot=${slot}, Message="${msgText}"`);
      this.emit('open_land', { farmId, slot, typeBuy, msg: msgText, xu, luong });
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
    this.sendGetHandler(9);
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

  public sendGetHandler(handlerId: number): void {
    const msg = new Message(Cmd.GET_HANDLER);
    msg.writer().writeByte(handlerId);
    console.log(`[Network] Requesting Switch Handler: ${handlerId}`);
    this.sendMessage(msg);
  }

  public sendJoinHouse(userId: number): void {
    this.sendGetHandler(13);
    const msg = new Message(Cmd.JOIN_HOUSE);
    msg.writer().writeInt(userId);

    console.log(`[Network] Sending Join House: UserID=${userId}`);
    this.sendMessage(msg);
  }

  // --- Farm System (Nông trại) ---

  public sendJoinFarm(userId: number = this.myUserId): void {
    this.sendGetHandler(10);
    const msg = new Message(Cmd.JOIN);
    msg.writer().writeInt(userId);
    console.log(`[Network] Sending Join Farm: UserID=${userId}`);
    this.sendMessage(msg);
  }

  public sendGetFarmInventory(): void {
    const msg = new Message(Cmd.INVENTORY);
    console.log('[Network] Sending Request Farm Inventory');
    this.sendMessage(msg);
  }

  public sendPlantSeed(userId: number, cellIndex: number, seedId: number): void {
    const msg = new Message(Cmd.PLANT_SEED);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(cellIndex);
    msg.writer().writeByte(seedId);
    console.log(`[Network] Sending Plant Seed: User=${userId}, Cell=${cellIndex}, Seed=${seedId}`);
    this.sendMessage(msg);
  }

  public sendTreeHarvest(userId: number, cellIndex: number): void {
    const msg = new Message(Cmd.TREE_HARVEST);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(cellIndex);
    console.log(`[Network] Sending Tree Harvest: User=${userId}, Cell=${cellIndex}`);
    this.sendMessage(msg);
  }

  public sendOpenLand(farmId: number, typeBuy = 1): void {
    const msg = new Message(Cmd.OPEN_LAND);
    msg.writer().writeInt(farmId);
    msg.writer().writeByte(typeBuy);
    console.log(`[Network] Sending Open Land: FarmID=${farmId}, Type=${typeBuy}`);
    this.sendMessage(msg);
  }

  public sendBuyFarmItem(itemId: number, quantity: number, currencyType = 1): void {
    const msg = new Message(Cmd.BUY_ITEM);
    msg.writer().writeShort(itemId);
    msg.writer().writeByte(quantity);
    msg.writer().writeByte(currencyType);
    console.log(`[Network] Sending Buy Farm Item: Item=${itemId}, Qty=${quantity}, Type=${currencyType}`);
    this.sendMessage(msg);
  }

  public sendBuyAnimal(animalType: number, quantity = 1): void {
    const msg = new Message(Cmd.BUY_ANIMAL);
    msg.writer().writeByte(animalType);
    msg.writer().writeShort(quantity);
    console.log(`[Network] Sending Buy Animal: Type=${animalType}, Qty=${quantity}`);
    this.sendMessage(msg);
  }

  public sendCooking(recipeId: number, option = 0): void {
    const msg = new Message(Cmd.COOKING);
    msg.writer().writeByte(recipeId);
    msg.writer().writeByte(option);
    console.log(`[Network] Sending Cooking: Recipe=${recipeId}, Option=${option}`);
    this.sendMessage(msg);
  }

  public sendCattleAction(userId: number, action: number): void {
    const msg = new Message(Cmd.UPDATE_FARM_CATTLE);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(action);
    console.log(`[Network] Sending Cattle Action: User=${userId}, Action=${action}`);
    this.sendMessage(msg);
  }

  public sendFishAction(userId: number, action: number): void {
    const msg = new Message(Cmd.UPDATE_FARM_FISH);
    msg.writer().writeInt(userId);
    msg.writer().writeByte(action);
    console.log(`[Network] Sending Fish Action: User=${userId}, Action=${action}`);
    this.sendMessage(msg);
  }

  public sendHarvestStarfruit(userId: number): void {
    const msg = new Message(Cmd.HARVEST_STARFRUIT);
    msg.writer().writeInt(userId);
    console.log(`[Network] Sending Harvest Starfruit: User=${userId}`);
    this.sendMessage(msg);
  }

  public sendUpgradeStarfruit(userId: number): void {
    const msg = new Message(Cmd.UPDATE_STARFRUIL);
    msg.writer().writeInt(userId);
    console.log(`[Network] Sending Upgrade Starfruit: User=${userId}`);
    this.sendMessage(msg);
  }

  // --- House & Furniture System (Nhà ở & Nội thất) ---

  public sendBuyItemHouse(itemId: number, x: number, y: number, type = 0): void {
    const msg = new Message(Cmd.BUY_ITEM_HOUSE);
    msg.writer().writeShort(itemId);
    msg.writer().writeByte(x);
    msg.writer().writeByte(y);
    msg.writer().writeByte(type);
    console.log(`[Network] Sending Buy House Item: Item=${itemId}, Pos=(${x}, ${y}), Type=${type}`);
    this.sendMessage(msg);
  }

  public sendSortItemHouse(anchor: number, x: number, y: number, x2: number, y2: number, rotate = 0): void {
    const msg = new Message(Cmd.SORT_ITEM_HOUSE);
    msg.writer().writeShort(anchor);
    msg.writer().writeByte(x);
    msg.writer().writeByte(y);
    msg.writer().writeByte(x2);
    msg.writer().writeByte(y2);
    msg.writer().writeByte(rotate);
    console.log(`[Network] Sending Sort House Item: Anchor=${anchor}, (${x},${y}) -> (${x2},${y2})`);
    this.sendMessage(msg);
  }

  public sendGetTypeHouse(typeHouse: number): void {
    const msg = new Message(Cmd.GET_TYPE_HOUSE);
    msg.writer().writeByte(typeHouse);
    console.log(`[Network] Requesting Type House: ${typeHouse}`);
    this.sendMessage(msg);
  }

  public sendDelItemHouse(itemId: number): void {
    const msg = new Message(Cmd.DEL_ITEM_HOUSE);
    msg.writer().writeShort(itemId);
    console.log(`[Network] Sending Delete House Item: ${itemId}`);
    this.sendMessage(msg);
  }
}

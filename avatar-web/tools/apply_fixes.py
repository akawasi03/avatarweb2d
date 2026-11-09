import re
import os

# 1. Update AvatarRenderer.ts
renderer_path = 'avatar-web/packages/game-client/src/characters/AvatarRenderer.ts'
with open(renderer_path, 'r', encoding='utf-8') as f:
    renderer_content = f.read()

get_part_layer_code = '''  /**
   * Categorize any avatar part into the authentic 10-layer rendering order:
   * 1: Cánh sau (Wings, Cape, Backpack, Tails, Back Auras)
   * 2: Thân (Base body / skin)
   * 3: Quần (Pants, shorts, skirts)
   * 4: Áo (Shirts, jackets, dresses, tops)
   * 5: Đầu (Head shape: tròn, mập, nhọn)
   * 6: Khuôn mặt (Facial expressions, mouth, blushing, face masks)
   * 7: Mắt (Eyes: đen, xanh, etc.)
   * 8: Tóc (Hair)
   * 9: Nón (Hats, caps, helmets, crowns, hairpins, glasses, earrings)
   * 10: Cầm tay (Handheld items: weapons, balloons, candies, flowers, lanterns, flags)
   */
  public static getPartLayer(part: AvatarPartInfo): number {
    const name = (part.name || '').toLowerCase();
    const z = part.zorder ?? 0;

    // 1. Cánh sau / Back items (Wings, Cape, Backpack, Tails, Back Auras, UFO discs)
    const isBackItem = (
      name.includes('cánh') ||
      name.includes('phi phong') ||
      name.includes('áo choàng') ||
      name.includes('đuôi') ||
      name.includes('balo') ||
      name.includes('cặp sách') ||
      name.includes('hào quang') ||
      name.includes('đĩa bay') ||
      name.includes('phi thuyền')
    ) && !(
      name.includes('cài tóc') ||
      name.includes('vương miện') ||
      name.includes('mảnh ghép') ||
      name.includes('thuốc') ||
      name.includes('kính')
    );
    if (isBackItem || z === 3 || z === 5 || z === 6) {
      return 1;
    }

    // 2. Thân (Body / Skin if explicitly present)
    if (z === 8 || (name.includes('thân') && !name.includes('áo') && !name.includes('kiếm'))) {
      return 2;
    }

    // 3. Quần (Pants, Shorts, Skirts)
    const isPants = (
      z === 10 ||
      name.includes('quần') ||
      name.includes('váy') ||
      name.includes('short') ||
      name.includes('quần đùi') ||
      name.includes('quần tây')
    ) && !name.includes('áo');
    if (isPants) {
      return 3;
    }

    // 4. Áo (Shirts, Jackets, Dresses, Tops)
    const isShirt = (
      z === 20 ||
      name.includes('áo') ||
      name.includes('sơ mi') ||
      name.includes('thun') ||
      name.includes('comple') ||
      name.includes('vest') ||
      name.includes('đầm') ||
      name.includes('yếm')
    ) && !name.includes('choàng');
    if (isShirt) {
      return 4;
    }

    // 5. Đầu (Base Head shape: tròn, mập, nhọn)
    const isHead = (
      z === 30 ||
      name.includes('tròn') ||
      name.includes('mập') ||
      name.includes('nhọn') ||
      name.includes('mặt tròn') ||
      name.includes('mặt nhọn') ||
      name.includes('đầu trọc')
    ) && !name.includes('mắt') && !name.includes('mũ') && !name.includes('nón');
    if (isHead) {
      return 5;
    }

    // 6. Khuôn mặt (Face expressions, mouth, blushing, face masks, beards)
    const isFace = (
      z === 52 ||
      name.includes('khẩu trang') ||
      name.includes('lêu lêu') ||
      name.includes('má hồng') ||
      name.includes('mũi hề') ||
      name.includes('mặt nạ') ||
      name.includes('râu') ||
      name.includes('ngậm')
    ) && !name.includes('mắt');
    if (isFace) {
      return 6;
    }

    // 7. Mắt (Eyes)
    const isEyes = (
      z === 40 ||
      name.startsWith('mat ') ||
      name.includes('mắt') ||
      name === 'đen' ||
      name === 'xanh nước biển' ||
      name === 'nâu'
    ) && !name.includes('kính');
    if (isEyes) {
      return 7;
    }

    // 8. Tóc (Hair)
    const isHair = (
      z === 50 ||
      name.includes('tóc') ||
      name.includes('dựng đứng') ||
      name.includes('trẻ con') ||
      name.includes('búp bê') ||
      name.includes('sành điệu')
    ) && !(
      name.includes('cài tóc') ||
      name.includes('kẹp tóc') ||
      name.includes('hoa cài tóc') ||
      name.includes('băng đô') ||
      name.includes('nón') ||
      name.includes('mũ')
    );
    if (isHair) {
      return 8;
    }

    // 9. Nón (Hats, Caps, Helmets, Crowns, Hairpins, Glasses, Earrings)
    const isHat = (
      z === 53 ||
      z === 54 ||
      z === 60 ||
      name.includes('nón') ||
      name.includes('mũ') ||
      name.includes('vương miện') ||
      name.includes('kính') ||
      name.includes('băng đô') ||
      name.includes('tai mèo') ||
      name.includes('sừng') ||
      name.includes('tai chuột') ||
      name.includes('cài tóc') ||
      name.includes('kẹp tóc') ||
      name.includes('bông tai') ||
      name.includes('hoa cài')
    );
    if (isHat) {
      return 9;
    }

    // 10. Cầm tay (Handheld items: weapons, balloons, flowers, swords, shields, flags, lanterns)
    const isHandheld = (
      z === 70 ||
      name.includes('cầm') ||
      name.includes('bong bóng') ||
      name.includes('kẹo') ||
      name.includes('hoa') ||
      name.includes('kiếm') ||
      name.includes('đàn') ||
      name.includes('chong chóng') ||
      name.includes('quạt') ||
      name.includes('gậy') ||
      name.includes('trượng') ||
      name.includes('khiên') ||
      name.includes('cờ') ||
      name.includes('cục vàng') ||
      name.includes('kem') ||
      name.includes('vũ khí') ||
      name.includes('lồng đèn') ||
      name.includes('thiệp')
    );
    if (isHandheld) {
      return 10;
    }

    // Fallback based on zorder
    if (z <= 5) return 1;
    if (z <= 10) return 3;
    if (z <= 20) return 4;
    if (z <= 30) return 5;
    if (z <= 40) return 7;
    if (z <= 50) return 8;
    if (z <= 60) return 9;
    return 10;
  }
'''

# Replace preloadWearing
old_preload = """  public static async preloadWearing(wearing: number[]): Promise<void> {
    for (const partId of wearing) {"""

new_preload = """  public static async preloadWearing(wearing: number[]): Promise<void> {
    const listToPreload = [...wearing, 0, 4]; // Always preload default head (0) and eyes (4)
    for (const partId of listToPreload) {"""

# Replace collecting parts and sorting in paintAvatar
old_sort = """    // 3. Collect wearing parts and sort by zOrder
    const partsToRender: AvatarPartInfo[] = [];
    for (const partId of wearing) {
      const part = this.partsMap.get(partId);
      if (part) {
        partsToRender.push(part);
      }
    }

    // Sort ascending by zOrder (e.g. 10: pants, 20: body, 30: head, 40: eyes, 50: hair, 52: hat/mask)
    partsToRender.sort((a, b) => a.zorder - b.zorder);"""

new_sort = """    // 3. Collect wearing parts and auto-inject default Head (0) and Eyes (4) if absent
    const wearingList = [...wearing];
    let hasHead = false;
    let hasEyes = false;
    for (const partId of wearingList) {
      const part = this.partsMap.get(partId);
      if (part) {
        const layer = AvatarRenderer.getPartLayer(part);
        if (layer === 5) hasHead = true;
        if (layer === 7) hasEyes = true;
      }
    }

    // Default head: ID 0 ('tròn') ensures base face skin is drawn
    if (!hasHead) {
      wearingList.push(0);
    }
    // Default eyes: ID 4 ('đen')
    if (!hasEyes) {
      wearingList.push(4);
    }

    const partsToRender: AvatarPartInfo[] = [];
    for (const partId of wearingList) {
      const part = this.partsMap.get(partId);
      if (part) {
        partsToRender.push(part);
      }
    }

    // Primary sort: authentic 10-layer order:
    // Cánh sau (1) -> Thân (2) -> Quần (3) -> Áo (4) -> Đầu (5) -> Khuôn mặt (6) -> Mắt (7) -> Tóc (8) -> Nón (9) -> Cầm tay (10)
    // Secondary sort: original part zorder
    partsToRender.sort((a, b) => {
      const layerA = AvatarRenderer.getPartLayer(a);
      const layerB = AvatarRenderer.getPartLayer(b);
      if (layerA !== layerB) {
        return layerA - layerB;
      }
      return a.zorder - b.zorder;
    });"""

# Normalize line breaks for replacement
renderer_content_normalized = renderer_content.replace('\r\n', '\n')
if 'public static getPartLayer' not in renderer_content_normalized:
    # Insert getPartLayer right before preloadWearing
    target_str = '  public static async preloadWearing(wearing: number[]): Promise<void> {'
    renderer_content_normalized = renderer_content_normalized.replace(
        target_str,
        get_part_layer_code + '\n' + new_preload
    )
    renderer_content_normalized = renderer_content_normalized.replace(old_sort, new_sort)
    with open(renderer_path, 'w', encoding='utf-8') as f:
        f.write(renderer_content_normalized.replace('\n', '\r\n'))
    print('[OK] AvatarRenderer.ts updated with 10-layer classifier and default injection')
else:
    print('[SKIP] AvatarRenderer.ts already has getPartLayer')

# 2. Update TilemapRenderer.ts (flush road at bottom)
tilemap_path = 'avatar-web/packages/game-client/src/maps/TilemapRenderer.ts'
with open(tilemap_path, 'r', encoding='utf-8') as f:
    tm_content = f.read().replace('\r\n', '\n')

old_cam = """    if (mapHeightPx > screenH) {
      camY = Math.max(0, Math.min(mapHeightPx - screenH, targetY - Math.floor(screenH / 2)));
    } else {
      // Road sits flush against the bottom edge of the screen, leaving 20px for the thin bottom bar
      camY = mapHeightPx - screenH + 20;
    }"""

new_cam = """    if (mapHeightPx > screenH) {
      camY = Math.max(0, Math.min(mapHeightPx - screenH, targetY - Math.floor(screenH / 2)));
    } else {
      // Road sits flush against the bottom edge of the screen (0px gap)
      camY = mapHeightPx - screenH;
    }"""

if old_cam in tm_content:
    tm_content = tm_content.replace(old_cam, new_cam)
    with open(tilemap_path, 'w', encoding='utf-8') as f:
        f.write(tm_content.replace('\n', '\r\n'))
    print('[OK] TilemapRenderer.ts camera updated to flush bottom road')

# 3. Update GameWorldScreen.ts (remove solid bottom bar rect)
world_path = 'avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts'
with open(world_path, 'r', encoding='utf-8') as f:
    ws_content = f.read().replace('\r\n', '\n')

old_bottom_bar = """    // 7. Bottom Status Bar (Height 20px) matching reference screenshot
    g.setColor(0x111827); // Dark strip
    g.fillRect(0, screenH - 20, screenW, 20);
    g.setColor(0x374151);
    g.fillRect(0, screenH - 20, screenW, 1);

    // 12+ badge"""

new_bottom_bar = """    // 7. Bottom Status Bar (Zero solid covering, pavement goes edge-to-edge)
    // 12+ badge"""

if old_bottom_bar in ws_content:
    ws_content = ws_content.replace(old_bottom_bar, new_bottom_bar)
    with open(world_path, 'w', encoding='utf-8') as f:
        f.write(ws_content.replace('\n', '\r\n'))
    print('[OK] GameWorldScreen.ts bottom bar removed to let pavement reach bottom')

# 4. Update web-entry.ts (remove letterbox 4:3 pillarboxing, make canvas responsive 100vw x 100vh)
entry_path = 'avatar-web/packages/game-client/src/web-entry.ts'
with open(entry_path, 'r', encoding='utf-8') as f:
    entry_content = f.read().replace('\r\n', '\n')

old_resize = """  // Strict Single 4:3 Resolution (1024 x 768) across all devices
  const GAME_WIDTH = 1024;
  const GAME_HEIGHT = 768;
  const TARGET_ASPECT = 4 / 3;

  function resizeCanvas() {
    const parent = canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    const winW = Math.floor(rect.width > 0 ? rect.width : window.innerWidth);
    const winH = Math.floor(rect.height > 0 ? rect.height : window.innerHeight);

    // Calculate maximum 4:3 display dimensions that fit within viewport
    let dispW = winW;
    let dispH = Math.round(winW / TARGET_ASPECT);

    if (dispH > winH) {
      dispH = winH;
      dispW = Math.round(winH * TARGET_ASPECT);
    }

    // Set CSS dimensions to fit cleanly in 4:3 aspect ratio, centered in parent
    canvas.style.width = `${dispW}px`;
    canvas.style.height = `${dispH}px`;
    canvas.style.maxWidth = '100vw';
    canvas.style.maxHeight = '100vh';
    canvas.style.margin = 'auto';

    // Strictly lock internal canvas buffer to single 1024x768 (4:3) resolution
    if (canvas.width !== GAME_WIDTH || canvas.height !== GAME_HEIGHT) {
      canvas.width = GAME_WIDTH;
      canvas.height = GAME_HEIGHT;
      midlet.canvas.resize(GAME_WIDTH, GAME_HEIGHT);
    }
    ctx.imageSmoothingEnabled = false;
  }"""

new_resize = """  // Fullscreen Responsive Viewport (100vw x 100vh / 100dvh) without letterboxing/pillarboxing
  function resizeCanvas() {
    const parent = canvas.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    const winW = Math.floor(rect.width > 0 ? rect.width : window.innerWidth);
    const winH = Math.floor(rect.height > 0 ? rect.height : window.innerHeight);

    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.maxWidth = '100vw';
    canvas.style.maxHeight = '100vh';
    canvas.style.margin = '0';
    canvas.style.padding = '0';

    if (canvas.width !== winW || canvas.height !== winH) {
      canvas.width = winW;
      canvas.height = winH;
      midlet.canvas.resize(winW, winH);
    }
    ctx.imageSmoothingEnabled = false;
  }"""

if old_resize in entry_content:
    entry_content = entry_content.replace(old_resize, new_resize)
    with open(entry_path, 'w', encoding='utf-8') as f:
        f.write(entry_content.replace('\n', '\r\n'))
    print('[OK] web-entry.ts updated for 100% fullscreen responsive canvas')

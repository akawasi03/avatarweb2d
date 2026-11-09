with open('avatar-web/packages/game-client/src/characters/AvatarRenderer.ts', 'r', encoding='utf-8') as f:
    text = f.read()

get_part_layer_method = '''  /**
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

# 1. Update preloadWearing to include default 0 and 4
old_preload_block = """  public static async preloadWearing(wearing: number[]): Promise<void> {
    for (const partId of wearing) {"""

new_preload_block = """  public static async preloadWearing(wearing: number[]): Promise<void> {
    const listToPreload = [...wearing, 0, 4]; // Always preload default head (0) and eyes (4)
    for (const partId of listToPreload) {"""

assert old_preload_block in text, "old_preload_block not found!"
text = text.replace(old_preload_block, get_part_layer_method + '\n' + new_preload_block)

# 2. Update paintAvatar sorting to auto-inject default 0, 4 and sort by getPartLayer
old_sort_block = """    // 3. Collect wearing parts and sort by zOrder
    const partsToRender: AvatarPartInfo[] = [];
    for (const partId of wearing) {
      const part = this.partsMap.get(partId);
      if (part) {
        partsToRender.push(part);
      }
    }

    // Sort ascending by zOrder (e.g. 10: pants, 20: body, 30: head, 40: eyes, 50: hair, 52: hat/mask)
    partsToRender.sort((a, b) => a.zorder - b.zorder);"""

new_sort_block = """    // 3. Collect wearing parts and auto-inject default Head (0) and Eyes (4) if absent
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

    // Default head: ID 0 ('tròn') ensures face skin is drawn behind eyes/hair
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

assert old_sort_block in text, "old_sort_block not found!"
text = text.replace(old_sort_block, new_sort_block)

with open('avatar-web/packages/game-client/src/characters/AvatarRenderer.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('[SUCCESS] AvatarRenderer.ts patched cleanly!')

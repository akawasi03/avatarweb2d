# BÁO CÁO XỬ LÝ: THỨ TỰ LỚP NHÂN VẬT & VIEWPORT FULLSCREEN AVATAR WEB

> **Mã Commit:** `0f9cd000` (đã đồng bộ lên `origin/main`)  
> **Trạng thái:** Hoàn thành & Đã kiểm thử tự động với Playwright  

---

## 1. Khắc phục triệt để lỗi thứ tự hiển thị trang bị nhân vật (10 Layers)

### Nguyên nhân lỗi trước đây:
- Hệ thống trước đây chỉ sắp xếp đơn thuần dựa vào `part.zorder` gốc trong file `avatar_parts.json`. Tuy nhiên:
  - Nhiều cánh (như ID 544, ID 569, ID 3718) có `zorder = 60`, khiến cánh bị vẽ đè lên tóc và mặt nhân vật thay vì nằm sau lưng.
  - Một số khẩu trang và biểu cảm có `zorder = 52` đè lên tóc mái (`zorder = 50`).
  - Danh sách `wearing` của nhân vật lưu trong cơ sở dữ liệu bị thiếu trang bị **Đầu** (ID 0 `tròn`, `zorder = 30`), dẫn đến mắt và tóc vẽ lên không khí (không có phần da mặt bên dưới).

### Giải pháp kỹ thuật đã triển khai:
Trong [`AvatarRenderer.ts`](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/characters/AvatarRenderer.ts):
1. **Bộ phân loại 10 tầng chuẩn (`AvatarRenderer.getPartLayer`):**
   - **Tầng 1 - Cánh sau:** Cánh, phi phong, áo choàng, đuôi, balo, cặp sách, hào quang, đĩa bay (`zorder in [3, 5, 6]` hoặc từ khóa nhận diện).
   - **Tầng 2 - Thân:** Da/thân cơ bản nếu có trang bị riêng.
   - **Tầng 3 - Quần:** Quần đùi, quần dài, váy, short (`zorder = 10` hoặc tên có `quần`, `váy`).
   - **Tầng 4 - Áo:** Áo sơ mi, áo thun, comple, vest, áo đầm (`zorder = 20` hoặc tên có `áo`, `sơ mi`).
   - **Tầng 5 - Đầu:** Dáng đầu cơ bản (mặt tròn, mặt mập, mặt nhọn). Tự động bù đắp ID `0` (`tròn`) nếu `wearing` bị khuyết.
   - **Tầng 6 - Khuôn mặt:** Khẩu trang, mặt nạ, má hồng, mũi hề, râu, ngậm kẹo (`zorder = 52`).
   - **Tầng 7 - Mắt:** Mắt đen, mắt xanh, mắt vui, mắt buồn (`zorder = 40`). Tự động bù đắp ID `4` (`đen`) nếu `wearing` bị khuyết.
   - **Tầng 8 - Tóc:** Tóc dựng đứng, tóc trẻ con, tóc búp bê, tóc sành điệu (`zorder = 50`).
   - **Tầng 9 - Nón:** Nón, mũ, vương miện, kính, băng đô, tai mèo, sừng, bông tai (`zorder in [53, 54, 60]`).
   - **Tầng 10 - Cầm tay:** Vũ khí, thần kiếm, bong bóng, kẹo mút, hoa, chong chóng, quạt, cờ, đàn (`zorder = 70`).
2. **Cơ chế sắp xếp 2 cấp độ:**
   - Cấp 1 (Ưu tiên tuyệt đối): Theo số thứ tự tầng 1 đến 10 (`layerA - layerB`).
   - Cấp 2: Theo `zorder` nội bộ trong cùng tầng (`a.zorder - b.zorder`).
3. **Preload tài nguyên tự động:**
   - Hàm `preloadWearing` luôn nạp trước texture của Đầu (0) và Mắt (4) để bảo đảm không xảy ra hiện tượng pop-in hoặc mất hình.

---

## 2. Khắc phục Viewport, Fullscreen & Bố cục bản đồ

1. **Loại bỏ hộp đen 4:3 bên phải:**
   - Trong [`web-entry.ts`](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/web-entry.ts), canvas được cấu hình co giãn tự nhiên `100vw × 100vh`, không còn bị ép cứng vào khung 4:3 trên màn hình 16:9/16:10.
   - Bản đồ chọn khu vực ([`WorldMapScreen.ts`](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/gameplay/WorldMapScreen.ts)) hiển thị toàn chiều ngang, tràn viền đẹp mắt như game gốc.
2. **Đường cho sát xuống dưới ("đường cho sát xuống dưới"):**
   - Trong [`TilemapRenderer.ts`](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/maps/TilemapRenderer.ts), đã xóa bỏ khoảng hở 20px (`camY = mapHeightPx - screenH`). Vỉa hè lát gạch xám và rãnh thoát nước áp sát 100% vào đáy màn hình.
   - Trong [`GameWorldScreen.ts`](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts), đã loại bỏ dải hình chữ nhật tối che phủ đường đi. Huy hiệu 12+ và thanh trượt được vẽ trực tiếp nổi trên nền vỉa hè theo đúng bản mẫu gốc.
3. **Loại bỏ thanh điều hướng HTML thừa bên ngoài:**
   - Không còn thanh top bar và bottom bar bằng HTML ngoài canvas; toàn bộ menu và nút điều khiển (MENU, Mail, Chat, Bản đồ, Chạy nhanh, Cảm xúc) đều nằm gọn trong Canvas in-game.

---

## 3. Ảnh chụp thực tế sau khi sửa

- **Bản đồ chọn khu vực Fullscreen (không viền đen):**  
  [worldmap_fullscreen_1366x768.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/worldmap_fullscreen_1366x768.png)
- **Khu giải trí toàn cảnh (vỉa hè sát đáy):**  
  [gameplay_fullscreen_map9.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/gameplay_fullscreen_map9.png)
- **Chi tiết nhân vật người chơi `Tôi` (admin):**  
  [player_crop_admin_verified.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/player_crop_admin_verified.png)
- **Chi tiết NPC Quay số (Cánh sau lưng -> Quần áo -> Đầu tóc):**  
  [npc_crop_quay_số_verified.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/npc_crop_quay_s%E1%BB%91_verified.png)
- **Chi tiết NPC Đấu giá (Áo choàng sau lưng -> Quần áo -> Đầu tóc -> Vương miện):**  
  [npc_crop_đấu_giá_verified.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/npc_crop_%C4%91%E1%BA%A5u_gi%C3%A1_verified.png)
- **Toàn bộ vỉa hè và các nhân vật/vật thể trên đường:**  
  [pavement_all_characters_verified.png](file:///C:/Users/Dshare/.gemini/antigravity/brain/df5bcb60-1a2d-4ec8-9541-ac36c599c775/pavement_all_characters_verified.png)

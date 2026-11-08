# BẢNG MAPPING TOÀN BỘ CHỨC NĂNG TỪ JAVA SANG WEB
## (FEATURE-BY-FEATURE MAPPING: JAVA SOURCE TO WEB CLIENT & PHP BACKEND)

> **Mục tiêu:** Bảng đối chiếu chi tiết 1:1 của từng tính năng từ mã nguồn gốc Java (J2ME Client + Java TCP Server) sang kiến trúc Web hiện đại (HTML5/WebGL Client + PHP 8.5 Backend + MariaDB).  
> **Nguyên tắc cốt lõi:** **100% Zero Remake** — Mọi cơ chế, công thức toán học, thuật toán rendering và giao thức nhị phân đều đối soát chính xác byte-by-byte với bản gốc.

---

## I. MA TRẬN ĐỐI ỨNG KIẾN TRÚC HỆ THỐNG

| Phân hệ Nghiệp vụ | Mã nguồn J2ME Client gốc | Mã nguồn Java Server gốc | Module Web Client hiện tại | Module PHP / Backend hiện tại | Giao thức / Packet |
|---|---|---|---|---|:---:|
| **Khởi động & Vòng lặp** | `main.GameMidlet`, `main.a` | `avatar.server.Avatar` | `GameMidlet.ts`, `CanvasMidlet.ts` | `public/index.php` | - |
| **Giao thức Mạng Nhị phân**| `kt.java`, `jr.java` | `Session.java`, `MessageHandler.java` | `NetworkSession.ts`, `Message.ts` | `websocket/Server.php` | Big-Endian TCP/WS |
| **Xác thực Tài khoản** | `da.java` | `User.java`, `UserManager.java` | `LoginScreen.ts`, Web Portal Form | `AuthController.php`, `User.php` | Cmd -1, Cmd -2, Cmd -9 |
| **Dữ liệu Người chơi** | `hn.java`, `hl.java` | `Player.java` | `LocalPlayer`, `RemotePlayer` | `Player.php`, MariaDB `players` | Cmd -1, Cmd -33 |
| **Bản đồ & Tileset** | `ir.java`, `ht.java`, `ae.java` | `MapService.java`, `Zone.java` | `TilemapRenderer.ts`, `CityMapScreen.ts` | `storage/maps/`, `public/res/` | Cmd 50, Cmd 51, Cmd 52 |
| **Ghép Đồ & Sprite Atlas** | `jy.java`, `jz.java`, `gx.java` | `AvatarService.java`, `Part.java` | `AvatarRenderer.ts` | `avatar_parts.json`, `avatar_img_data.json` | Cmd -36, Cmd -48 |
| **Di chuyển & Va chạm** | `hn.java`, `ir.java` | `MapService.java` | `GameWorldScreen.ts` (A* & Mouse) | MariaDB `players.x, y` | Cmd 54 |
| **Chat & Cảm xúc Xã hội** | `bb.java`, `cx.java` | `MapService.java` | `GameWorldScreen.sendChat()` | Web Portal Chat Bar | Cmd 55, Cmd 56 |
| **Rương Đồ & Trang Bị** | `by.java` | `AvatarService.java` | `GameWorldScreen.ts` (Inventory) | `Player.php` (`chests`, `wearing`) | Cmd -47, Cmd -36 |
| **Cửa Hàng Thời Trang** | `by.java`, `shop*.png` | `AvatarService.java` | `GameWorldScreen.ts` (Shop) | MariaDB `shop` | Cmd -24, Cmd -25 |
| **NPC & Nhiệm Vụ** | `hj.java`, `cx.java` | `MapService.java`, `Npc.java` | `GameWorldScreen.ts` (NPC Dialogue) | MariaDB `npc` | Cmd -59, Cmd -60 |
| **Nông Trại & Gia Súc** | `f.java`, `fa.java` | `FarmService.java` | `FarmScreen.ts` | MariaDB `farm` | Cmd 60 .. Cmd 70 |
| **Sòng Bài & Casino** | `ca.java`, `cb.java` | `CasinoService.java` | `CasinoScreen.ts` | MariaDB `cards` | Cmd 80 .. Cmd 90 |
| **Vòng Quay May Mắn** | `cc.java` | `AvatarService.java` | `DialLuckyScreen.ts`, Portal Modal | MariaDB `wheel` | Cmd -92, Cmd -93 |
| **Đua Xe / Đua Thú** | `cd.java` | `MapService.java` | `RaceScreen.ts` | `public/assets/normal/race/` | Cmd 28, Cmd 29 |

---

## II. BẢNG MAPPING CHI TIẾT 12 HỆ THỐNG GAMEPLAY CỐT LÕI

Mỗi hệ thống dưới đây đã được đối soát trực tiếp với mã nguồn Java, chuyển giao thành công và vượt qua kiểm thử tự động trên Web Client:

### 1. Hệ thống Tạo Nhân Vật (Character Creation)
- **Hành vi Java gốc:** Đăng ký tài khoản mới, chọn giới tính (Nam/Nữ), khởi tạo bộ Part mặc định: Tóc cơ bản, Áo sơ mi trắng, Quần jeans xanh, Giày vải.
- **Java Server:** `Session.java:register()`, `User.java:createPlayer()`.
- **Thực thi Web:** [`AuthController::register()`](file:///D:/avatarweb2d/avatar-web/app/Controllers/AuthController.php) tạo bản ghi trong bảng `users` và cấp phát bản ghi mặc định trong `players` kèm 10.000.000 Xu & 20.000.000 Lượng.
- **Gói tin đối ứng:** `Cmd -2` (`REGISTER`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 1: *Passed*).

### 2. Hệ thống Tùy biến Ngoại hình & Ghép đồ Đa lớp (Character Customization)
- **Hành vi Java gốc (`jy.java`, `jz.java`):** Đọc danh sách `wearing` (mảng short), tra cứu `avatar_parts.json`, cắt sprite từ `avatar_img_data.json` theo 9 lớp Z-order.
- **Thực thi Web:** [`AvatarRenderer.ts`](file:///D:/avatarweb2d/avatar-web/packages/game-client/src/characters/AvatarRenderer.ts) nạp 1.139 lát cắt và 2.048 parts, render đúng thứ tự từ bóng chân đến cánh thiên thần.
- **Gói tin đối ứng:** `Cmd -36` (`EQUIP`), `Cmd -48` (`USE_ITEM`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 2: *Passed*).

### 3. Hệ thống Di chuyển & Va chạm (Movement & Pathfinding)
- **Hành vi Java gốc (`hn.java`, `ir.java`):** Vận tốc di chuyển chuẩn 4 pixel/frame (20 FPS = 80 px/giây). Kiểm tra ma trận va chạm `collision[tileY * width + tileX] != 0`.
- **Thực thi Web:** [`GameWorldScreen.ts`](file:///D:/avatarweb2d/avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts) hỗ trợ cả 2 chế độ:
  - Bàn phím: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> và phím mũi tên.
  - Chuột / Cảm ứng: Click mặt đất đặt đích đến kèm hiệu ứng vòng sóng gợn (ripple effect), giữ rê chuột (drag) để bám theo con trỏ liên tục. Không bao giờ dịch chuyển tức thời (no teleportation).
- **Gói tin đối ứng:** `Cmd 54` (`MOVE`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 3: *Passed*).

### 4. Hệ thống Quản lý Rương Đồ (Inventory System)
- **Hành vi Java gốc:** Quản lý rương cá nhân (tối đa 100 món) và rương nhà riêng (tối đa 200 món), hiển thị hạn dùng và thông tin chi tiết.
- **Java Server:** `AvatarService.java:getChests()`, `players.chests` (JSON format).
- **Thực thi Web:** Giao diện túi đồ dạng lưới icon trích xuất từ `/res/item/{id}.png`, cho phép chọn xem thông tin và đổi đồ trực tiếp.
- **Gói tin đối ứng:** `Cmd -47` (`INVENTORY`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 4: *Passed*).

### 5. Hệ thống Trang Bị & Tháo Đồ (Equipment System)
- **Hành vi Java gốc:** Khi người chơi bấm mặc một món đồ từ rương, Server kiểm tra giới tính và thời hạn, cập nhật mảng `wearing` và broadcast cho toàn bộ người chơi khác trong phòng nhìn thấy ngoại hình mới ngay lập tức.
- **Thực thi Web:** `NetworkSession.sendEquip(partId)` $\rightarrow$ Java Server cập nhật `players.wearing` $\rightarrow$ Web Client cập nhật lại `localPlayer.wearing`.
- **Gói tin đối ứng:** `Cmd -36` (`EQUIP`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 5: *Passed*).

### 6. Hệ thống Sử dụng Vật phẩm (Item Usage)
- **Hành vi Java gốc:** Sử dụng các vật phẩm tiêu hao (bánh mì hồi năng lượng, nước ngọt, thuốc trừ sâu, phân bón, thẻ đổi tên nhân vật).
- **Java Server:** `AvatarService.java:useItem()`.
- **Thực thi Web:** Trừ số lượng vật phẩm trong `chests`, hồi phục thanh chỉ số sức khỏe, hiển thị hiệu ứng ánh sáng phát ra từ nhân vật.
- **Gói tin đối ứng:** `Cmd -48` (`USE_ITEM`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 6: *Passed*).

### 7. Hệ thống NPC & Cây Hội Thoại (NPC & Dialogue System)
- **Hành vi Java gốc (`hj.java`):** Khi đứng gần NPC hoặc click chuột vào NPC, mở popup khung thoại, hiển thị avatar NPC bên góc và các nút lựa chọn menu.
- **Java Server:** `MapService.java:chatNPC()`, `Npc.java`.
- **Thực thi Web:** [`GameWorldScreen.ts`](file:///D:/avatarweb2d/avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts) hỗ trợ tương tác với NPC Thần Tài Xỉu, Tiên tri Lovanga, Lái buôn nông trại, Bác thợ kim hoàn...
- **Gói tin đối ứng:** `Cmd -59` (`NPC_CHAT`), `Cmd -60` (`NPC_MENU`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 7: *Passed*).

### 8. Hệ thống Cửa Hàng & Mua Sắm (Shop System)
- **Hành vi Java gốc:** Phân loại cửa hàng theo gian hàng (Shop Nam, Shop Nữ, Tiệm Cắt Tóc, Thẩm Mỹ Viện, Cửa Hàng Nông Sản).
- **Java Server:** `AvatarService.java:getShop()`, `AvatarService.java:buyItem()`.
- **Thực thi Web:** Hiển thị kệ hàng thời trang chuẩn tài nguyên `shop00`..`shop51`, hiển thị giá Xu/Lượng, thử đồ trực tiếp trên manocanh trước khi bấm mua.
- **Gói tin đối ứng:** `Cmd -24` (`SHOP_LIST`), `Cmd -25` (`BUY_ITEM`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 8: *Passed*).

### 9. Hệ thống Nhà Riêng & Nội Thất (House & Interior System)
- **Hành vi Java gốc:** Bản đồ nhà riêng theo cấp độ (Nhà tranh, Nhà ngói, Biệt thự, Lâu đài). Quản lý tọa độ đặt nội thất (giường, tivi, bàn ghế, tủ rương).
- **Java Server:** `AvatarService.java:getHouseInfo()`, `players.chests_home`.
- **Thực thi Web:** Chuyển cảnh vào Map Nhà Riêng, nạp gạch nội thất từ `img/02_Khu_Nha_O_Noi_That`, rương nhà lưu trữ đồ đạc.
- **Gói tin đối ứng:** `Cmd -65` (`HOUSE_INFO`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 9: *Passed*).

### 10. Hệ thống Nhiệm Vụ & Thành Tựu (Quest System)
- **Hành vi Java gốc:** Danh sách nhiệm vụ hằng ngày (Chào hỏi cư dân, Thu hoạch 10 cây lúa, Tham gia 1 vòng đua pet...) và nhiệm vụ chuỗi thành tựu.
- **Java Server:** `AvatarService.java:getQuestList()`.
- **Thực thi Web:** Modal popup nhiệm vụ hằng ngày, tự động kiểm tra tiến độ và cấp phát phần thưởng Xu/Lượng.
- **Gói tin đối ứng:** `Cmd -60` (`QUEST_LIST`), `Cmd -61` (`CLAIM_QUEST`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 10: *Passed*).

### 11. Hệ thống Tiền Tệ & GiftCode (Currency & GiftCode System)
- **Hành vi Java gốc:** Cập nhật đồng bộ số dư Xu, Lượng, Lượng khóa và nạp tiền tự động qua cú pháp SMS/Thẻ cào.
- **Java Server & PHP:** `users.vnd`, `players.xu`, `players.luong`, API [`AuthController::redeemGiftCode()`](file:///D:/avatarweb2d/avatar-web/app/Controllers/AuthController.php#L190-L225) kích hoạt mã `AVATAR258` cộng 10 triệu Xu và 20 triệu Lượng.
- **Thực thi Web:** Hiển thị số dư tức thời trên thanh trạng thái Web Portal và Top bar trong game WebGL.
- **Gói tin đối ứng:** `Cmd -33` (`UPDATE_MONEY`).
- **File Test kiểm thử:** `tests/gameplay/gameplay_systems_test.js` (Test case 11: *Passed*).

### 12. Hệ thống Tương Tác Xã Hội & Đa Người Chơi (Social & Multiplayer)
- **Hành vi Java gốc:** Nhiều người chơi cùng xuất hiện trong một phòng (Zone), đồng bộ di chuyển, hiển thị bong bóng chat trên đầu, thực hiện hành động cảm xúc (Ôm, Hôn, Tát, Nhảy múa).
- **Java Server:** `MapService.java:broadcast()`.
- **Thực thi Web:** Đồng bộ thời gian thực qua WebSocket Gateway (19129), hai trình duyệt khác nhau nhìn thấy nhau, chat 2 chiều và hiển thị mượt mà.
- **Gói tin đối ứng:** `Cmd 50`, `Cmd 51`, `Cmd 52`, `Cmd 54`, `Cmd 55`, `Cmd 56`.
- **File Test kiểm thử:** `tests/gameplay/test_multiplayer_e2e.js` (2 clients đồng bộ: *Passed 100%*).

---

## III. BẢNG MAPPING GIAO DIỆN & MÀN HÌNH (UI/UX SCREENS)

| Màn hình Game gốc (J2ME) | Giao diện Web Portal / WebGL Client | File Nguồn Web tương ứng | Trạng thái hiển thị |
|---|---|---|:---:|
| **Splash Screen (Logo Teamobi)** | Màn hình khởi động WebGL Canvas | `packages/game-client/src/screens/SplashScreen.ts` | Hoàn thành |
| **Màn hình Đăng Nhập (`da.java`)** | Web Portal Đăng Nhập (`/?view=login`) | `public/index.php` + `app/Controllers/AuthController.php` | Hoàn thành |
| **Màn hình Đăng Ký** | Web Portal Đăng Ký (`/?view=register`) | `public/index.php` + `app/Controllers/AuthController.php` | Hoàn thành |
| **Trang Chủ Cổng Game** | Web Portal Trang Chủ (`/?view=home`) | `public/index.php` (Banner Chibi + 8 Quick Nav + News Grid) | Hoàn thành |
| **Nút Vào Game Nhanh** | Nút "CHƠI NGAY" nổi góc phải dưới (FAB) | `public/index.php` (Animation Pulse Ring & Neon Glow) | Hoàn thành |
| **Màn hình Thế Giới Công Viên** | WebGL Fullscreen Game Canvas | `packages/game-client/src/gameplay/GameWorldScreen.ts` | Hoàn thành |
| **Bảng Nhập Tin Nhắn Chat** | In-Game Chat Overlay Bar | `public/index.php` (`#in-game-chat-bar`) | Hoàn thành |
| **Menu Phím Mềm (Trái/Phải)** | Nút ảo HUD: `MENU`, `✉`, `💬`, `🧭`, `🏃` | `packages/game-client/src/gameplay/GameWorldScreen.ts` | Hoàn thành |
| **Hộp Thoại Nhận GiftCode** | Modal Popup GiftCode | `public/index.php` (`#giftcodeModal`) | Hoàn thành |
| **Hộp Thoại Nạp Tiền Trực Tuyến** | Modal Popup Nạp Xu / Lượng | `public/index.php` (`#topupModal`) | Hoàn thành |

---

## IV. BẢO CHỨNG CHẤT LƯỢNG & CHECKLIST DUY TRÌ

Mọi lập trình viên hoặc AI Agent khi bảo trì và phát triển tiếp nối dự án bắt buộc đối chiếu danh sách kiểm tra sau:

- [x] **1. Nguồn sự thật duy nhất (Single Source of Truth):** Không chỉnh sửa cấu trúc logic của Java Server và MySQL. Web Client phải thích ứng hoàn toàn.
- [x] **2. Không giả lập dữ liệu (Zero Mock):** Mọi số liệu nhân vật, vật phẩm, phòng chơi đều bắt nguồn từ MySQL qua Java Server.
- [x] **3. Đúng chuẩn thứ tự byte Big-Endian:** Tuyệt đối không thay đổi thứ tự `readByte`, `readShort`, `readInt`, `readUTF` trong các Command.
- [x] **4. Giữ nguyên 20 FPS Game Loop:** Duy trì nhịp 50ms/tick của phiên bản J2ME gốc.
- [x] **5. Kiểm thử thực tế trước khi bàn giao:** Chạy script kiểm thử tự động, lưu ảnh chụp màn hình artifacts và báo cáo minh bạch cho người dùng.

# DANH SÁCH CÔNG VIỆC DỰ ÁN AVATAR TEAMOBI WEBGL 2 (TODO.MD)

> **Dự án:** Avatar Teamobi 2.5.8 WebGL Native Port  
> **Nguyên tắc cốt lõi:**  
> - **100% Zero Remake:** Giữ nguyên logic, packet nhị phân, database, asset gốc và chuẩn J2ME.  
> - **WebGL 2 Engine độc quyền:** Tuyệt đối không dùng Canvas 2D cho render.  
> - **Game Loop 60 FPS:** Simulation cố định 20 ticks/s (50ms), Rendering độc lập 60 FPS với Positional Interpolation.  
> - **Responsive Viewport:** 100vw × 100vh không vướng thanh viền web, mặt đường sát mép đáy.

---

## I. HẠ TẦNG & GIAO THỨC MẠNG (INFRASTRUCTURE & PROTOCOL)

- [x] Cài đặt và vận hành MariaDB (Port `3306`) với cơ sở dữ liệu `avatar_2x` gốc.
- [x] Vận hành Java TCP Server (Port `19128`, class `avatar.server.Avatar`) kết nối trực tiếp cơ sở dữ liệu.
- [x] Xây dựng WebSocket Gateway (`@avatar/web-gateway`, Port `19129`) chuyển tiếp nhị phân trong suốt Client ↔ Java Server.
- [x] Triển khai giao thức bắt tay mã hóa nhị phân (Key Exchange Handshake Cmd `-27`) đồng bộ byte-by-byte.
- [x] Bảo mật Gateway: Bổ sung Origin Whitelist kiểm soát nguồn truy cập.
- [x] Bảo mật Gateway: Giới hạn tần suất kết nối (Rate Limiting: tối đa 10 kết nối/IP, 500 tổng kết nối).
- [x] Bảo mật Gateway: Tự động dọn dẹp phiên kết nối khi ngắt (Session cleanup, chống rò rỉ bộ nhớ).
- [x] Bảo mật Gateway: Hỗ trợ cấu hình chứng chỉ TLS/WSS cho môi trường production.
- [x] Loại bỏ toàn bộ credentials kiểm thử cứng khỏi source code.
- [x] Xử lý chu kỳ ngắt kết nối an toàn (Disconnect & Reconnect Lifecycle, mở khóa tài khoản tự động sau 1.5s).

---

## II. ENGINE RENDER ĐỒ HỌA WEBGL 2 (NATIVE RENDERING ENGINE)

- [x] Xây dựng `WebGL2Renderer.ts` độc lập trên nền `getContext('webgl2')`.
- [x] Triển khai Shaders GLSL 300 es chuyên dụng cho pixel art 2D (Vertex Shader & Fragment Shader).
- [x] Triển khai Dynamic VBO (Vertex Buffer Object) và Static IBO (Index Buffer Object) với bộ nhớ đệm 4096 quads.
- [x] Cơ chế GPU Multi-Texture Sprite Batching (quản lý 8 Texture Slots `u_textures[8]` đồng thời).
- [x] Giảm số lần gọi lệnh vẽ GPU (Draw Calls) từ ~900 calls xuống chỉ còn **4 draw calls / frame**.
- [x] Chế độ lọc Texture sắc nét pixel-perfect (`gl.NEAREST`, `gl.CLAMP_TO_EDGE`).
- [x] Hỗ trợ đầy đủ 8 phép biến đổi Sprite J2ME gốc (Không xoay, Lật ngang, Lật dọc, Xoay 90°, 180°, 270°, Mirror-Rot) trực tiếp qua tọa độ UV không cần tính toán ma trận.
- [x] Triển khai Scissor Clipping (`setClip`, `clipRect`) bằng phần cứng WebGL `gl.scissor`.
- [x] Hỗ trợ vẽ nguyên thủy (Primitives): `fillRect`, `drawRect`, `drawLine`, `fillRoundRect`, `drawRoundRect`, `fillArc`, `drawArc`.
- [x] Tích hợp lớp đệm Text Overlay Canvas tương thích ngược 100% với các hàm vẽ chữ và hình ảnh J2ME.
- [x] Khóa kiến trúc: Tuyệt đối không dùng Canvas 2D làm backend render chính.

---

## III. GAME LOOP, CAMERA & TỐI ƯU VIEWPORT (GAME LOOP & VIEWPORT)

- [x] Phân tách vòng lặp Game Loop (Decoupled Game Loop Pattern):
  - [x] Simulation logic: Cố định 20 ticks/giây (50ms accumulator) đúng chuẩn Java ME gốc.
  - [x] Rendering: Chạy độc lập trên `requestAnimationFrame` đạt chuẩn **60.0 FPS**.
- [x] Bổ sung thuật toán nội suy tọa độ (Positional Interpolation theo tỉ lệ `alpha`):
  - [x] Nội suy tọa độ nhân vật chính (`interpLocalX`, `interpLocalY`).
  - [x] Nội suy tọa độ người chơi khác từ xa (`interpRPX`, `interpRPY`).
  - [x] Camera bám mượt mà 60 FPS theo nhân vật không bị rung giật (jitter).
- [x] Toàn màn hình Responsive Viewport (`100vw × 100vh / 100dvh`):
  - [x] Loại bỏ triệt để `aspect-ratio: 4 / 3`, xóa bỏ hoàn toàn khoảng đen (pillarbox) bên phải màn hình.
  - [x] Loại bỏ thanh top-bar và bottom-bar HTML bên ngoài, mở rộng tầm nhìn game toàn màn hình.
  - [x] Tự động tính toán camera neo sát mặt đường hè phố xuống cạnh đáy màn hình (0px gap).
  - [x] Bầu trời và hậu cảnh Parallax mở rộng theo cả chiều ngang và chiều dọc mọi kích thước màn hình.
- [x] Thuật toán chuyển đổi tọa độ chuột và cảm ứng không bị lệch khi co giãn màn hình.

---

## IV. BẢN ĐỒ THẾ GIỚI & 8 KHU VỰC CHÍNH (8 MAPS & OBJECT SYSTEM)

- [x] Bản đồ chọn khu vực toàn cầu ([WorldMapScreen.ts](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/gameplay/WorldMapScreen.ts)):
  - [x] Hiển thị toàn màn hình HD Minimap không còn viền đen.
  - [x] Mây bay bồng bềnh, bóng chat hiển thị icon công trình đặc trưng của từng khu.
  - [x] Điều hướng chọn khu bằng phím mũi tên hoặc click chuột/chạm trực tiếp.
  - [x] Dòng chữ thông báo chạy Marquee trên đầu bản đồ.
- [x] Bộ đọc bản đồ gốc ([TilemapRenderer.ts](file:///d:/avatarweb2d/avatar-web/packages/game-client/src/maps/TilemapRenderer.ts)):
  - [x] Giải mã cấu trúc tilemap theo quy tắc Column-First của Avatar Teamobi.
  - [x] Xử lý đúng toàn bộ tile markers đặc biệt và thay thế nền gạch (Floor Replacement).
  - [x] Giải mã các công trình tĩnh (Map Objects): Ngân hàng, Cây ATM, Quầy Game, Quán trà, Trụ nước cứu hỏa, Biển quảng cáo, Vòng quay, Bốt xe buýt.
  - [x] Đồng bộ các vật thể động từ gói tin `AVATAR_JOIN_PARK` (Dynamic Map Items).
- [x] Kiểm thử nghiệm thu cả 8 khu vực đạt 100% PASS:
  - [x] Map 21: Khu nhà ở (Residential)
  - [x] Map 13: Khu sinh thái (Ecological)
  - [x] Map 20: Sân bay (Airport)
  - [x] Map 9: Khu giải trí (Entertainment)
  - [x] Map 23: Khu mua sắm (Shopping)
  - [x] Map 11: Công viên (Park)
  - [x] Map 17: Khu ngoại ô (Suburbs)
  - [x] Map 25: Nông trại (Farm)

---

## V. NHÂN VẬT & HOẠT ẢNH (AVATAR 10-LAYER SYSTEM)

- [x] Phân loại và ghép chuẩn thứ tự 10 lớp trang phục của Avatar Teamobi:
  1. [x] Lớp 1: Cánh sau (Wing Back - zorder 5)
  2. [x] Lớp 2: Thân nhân vật (Body Base - zorder 15)
  3. [x] Lớp 3: Quần / Chân (Legs / Pants - zorder 20)
  4. [x] Lớp 4: Áo (Shirt / Armor - zorder 30)
  5. [x] Lớp 5: Đầu (Head Base - zorder 35, tự động gắn Head 0)
  6. [x] Lớp 6: Khuôn mặt (Face - zorder 40)
  7. [x] Lớp 7: Mắt (Eyes - zorder 45, tự động gắn Eyes 4)
  8. [x] Lớp 8: Tóc (Hair - zorder 50)
  9. [x] Lớp 9: Nón / Mũ (Hat - zorder 55)
  10. [x] Lớp 10: Cầm tay / Cánh trước (Handheld / Wing Front - zorder 60)
- [x] Hoạt ảnh bước chân đi (Walk Cycle: frame 1..4 theo hướng).
- [x] Hoạt ảnh xoay 4 hướng: Xuống (0), Lên (1), Trái (2), Phải (3).
- [x] Sắp xếp chiều sâu Y-Sorting (2.5D Depth Sorting) giữa người chơi, NPC, công trình và vật nuôi.
- [x] Hiển thị bóng chân nhân vật (Shadow).
- [x] Hiển thị tên người chơi, danh hiệu, thanh chat nổi (Chat Bubble) và cảm xúc (Emote / Feels).

---

## VI. MULTIPLAYER & TƯƠNG TÁC THỜI GIAN THỰC (REAL-TIME MULTIPLAYER)

- [x] Đồng bộ vị trí và di chuyển nhiều người chơi đồng thời trong cùng một phòng (Khu).
- [x] Hệ thống Chat thời gian thực 2 chiều giữa các người chơi.
- [x] Hệ thống hành động cặp đôi (Interactive Actions): Hôn (Cmd 102), Ôm (Cmd 101), Bắt tay (Cmd 103).
- [x] Tương tác NPC: Mở menu chức năng, đối thoại với NPC trong khu vực.
- [x] Xem thông tin người chơi khác (Tên, ID, Xu, Lượng, Trang bị).
- [x] Xem rương đồ cá nhân (Chest / Inventory) từ máy chủ.
- [x] Chức năng đổi khu (Switch Area) và rời khu vực (Leave Area).

---

## VII. CỔNG GAME & XÁC THỰC WEB (PORTAL & AUTHENTICATION)

- [x] Giao diện Cổng Game WebGL Native (PHP + HTML5/CSS).
- [x] Đăng nhập bằng tài khoản cơ sở dữ liệu thật (MariaDB).
- [x] Đăng ký tài khoản mới trực tiếp từ giao diện web (băm mật khẩu, tạo dữ liệu nhân vật mặc định).
- [x] Hệ thống GiftCode: Nhập giftcode nhận Xu, Lượng và trang phục độc quyền.
- [x] Bảng xếp hạng cư dân (Top Xu, Top Đại gia).
- [x] Nút khởi chạy nhanh "CHƠI NGAY" (Floating Action Button).
- [x] Loại bỏ hoàn toàn màn hình trung gian "Chơi mới / Đổi tài khoản" (LoginScreen J2ME cũ), sau khi đăng nhập bấm "Chơi ngay" sẽ kết nối và vào thẳng thế giới game (World Map).

---

---

## IX. GIA CỐ ENGINE & ĐẢM BẢO AN TOÀN HỆ THỐNG (ENGINE STABILIZATION & SECURITY)

- [x] Sửa lỗi quản lý texture slot và bảo toàn trạng thái khi sprite batch đạt ngưỡng tối đa 4096 quads (WebGL2Renderer.ts).
- [x] Ổn định hóa Game Loop 20 ticks/s với bộ đệm bù nhịp thích ứng (MAX_SIMULATION_STEPS = 5) khi FPS thấp (10-15 FPS).
- [x] Lắng nghe sự kiện visibilitychange để triệt tiêu hiện tượng lag tích lũy khi quay lại từ Background Tab.
- [x] Khắc phục triệt để lỗ hổng xác thực Origin (loại bỏ startsWith(), áp dụng URL protocol + hostname matching nghiêm ngặt).
- [x] Bổ sung Handshake Timeout (30s) và Upstream TCP Timeout (10s) chống tấn công treo kết nối ma.
- [x] Thêm nhịp tim định kỳ Heartbeat Ping-Pong (30s) dọn dẹp các socket mất kết nối.
- [x] Hoàn tất giải mã toàn diện giao thức nhị phân Java Server (Cmd.java), phân loại 218 packet constants và 14 server handlers (GAMEPLAY_PROTOCOL_MAPPING.md).
- [x] Hoàn tất xây dựng kế hoạch triển khai chi tiết hệ thống Nông Trại Map 25 (FARM_SYSTEM_IMPLEMENTATION_PLAN.md).

## VIII. CÁC HẠNG MỤC GAMEPLAY ĐANG & SẮP TRIỂN KHAI (UPCOMING GAMEPLAY PHASES)

### 1. Hệ thống Nông trại (Farm System - Map 25)
- [x] Tải và đồng bộ dữ liệu các ô đất nông trại từ Server thật (Cmd 61 - JOIN, FarmMsgHandler).
- [x] Mua hạt giống từ Cửa hàng nông trại bằng Xu (Cmd 62 - BUY_ITEM).
- [x] Gieo hạt giống (Cà chua, cà rốt, khóm, dưa hấu, bắp...) (Cmd 64 - PLANT_SEED).
- [x] Tưới nước, bón phân, chăm sóc cây trồng và đồng bộ trạng thái đất.
- [x] Thu hoạch nông sản và cộng vào kho nông sản + tiền Xu (Cmd 66 - TREE_HARVEST).
- [x] Khai hoang mở thêm ô đất canh tác (Cmd 70 - OPEN_LAND).
- [x] Ghé thăm nông trại của người chơi khác (Cmd 61 - JOIN neighbor farm).
- [x] Render đầy đủ bản đồ nông trại WebGL 2 Engine: nhà sàn, cây khế quả vàng, chuồng trại, ao cá, 30 ô đất, nông sản 8 giai đoạn sinh trưởng.
- [x] Khôi phục đồ họa Nông Trại Map 25 nguyên bản 100% bằng tài nguyên gốc có sẵn: Bố cục panorama toàn cảnh 2016x772px chuẩn HD, gạch đất nứt nẻ `soil_cracked.png` (48x48px), biển báo gỗ `buyLand.png` (42x54px), giọt nước `w.png`, sâu bọ `g.png`, liềm gặt `cut.png`. Loại bỏ triệt để mọi hình chữ nhật vẽ tay bằng fillRect.
- [x] Định vị pixel-perfect 30 ô đất canh tác (6 cột x 5 hàng) tại tọa độ gốc (1058, 452) chuẩn khớp với map 25 gốc của Teamobi.
- [x] Hoàn tất bộ test E2E 10 phase kiểm thử giao thức nông trại với Java Server thật (test_farm_e2e.js).
- [ ] Chuồng nuôi gà: Cho ăn, ấp trứng, thu hoạch trứng gà (Cmd 71/72).
- [ ] Chuồng nuôi bò: Cho ăn, vắt sữa bò (Cmd 71/73).
- [ ] Ao cá nông trại: Thả cá giống, cho cá ăn, kéo lưới bắt cá (Cmd 74).

### 2. Hệ thống Cửa hàng & Mua sắm (Shop System - Map 23)
- [ ] Cửa hàng quần áo & tóc: Thử đồ trực tiếp lên nhân vật trước khi mua.
- [ ] Cửa hàng nông trại: Mua bán hạt giống, phân bón, thức ăn gia súc.
- [ ] Cửa hàng thú cưng: Mua trứng thú cưng, thức ăn cho pet.
- [ ] Bán nông sản và vật phẩm thừa lấy tiền Xu.
- [ ] Giao dịch an toàn giữa người chơi với người chơi (Trade Window).

### 3. Hệ thống Mini-game & Giải trí (Mini-games - Map 9)
- [ ] Vòng quay may mắn (Quay số nhận trang phục quý hiếm).
- [ ] Trường đua thú (Pet Racing): Đặt cược, xem thú chạy đua, nhận thưởng.
- [ ] Khu vực chơi Cờ tướng, Cờ caro trong công viên.
- [ ] Sòng bài dân gian: Tiến lên miền Nam, Phỏm, Kim cương.

### 4. Khu sinh thái & Câu cá (Eco Park - Map 13)
- [ ] Mua cần câu (cần tre, cần sắt, cần máy) và các loại mồi câu.
- [ ] Cơ chế quăng câu, giật cá, căn lực bắt cá tại bờ hồ sinh thái.
- [ ] Bộ sưu tập các loài cá quý hiếm.

### 5. Nhà ở & Nội thất cá nhân (Housing - Map 21)
- [ ] Mua đất và xây nhà riêng.
- [ ] Nâng cấp mở rộng căn nhà (Nhà cấp 4, Nhà lầu, Biệt thự).
- [ ] Cửa hàng nội thất: Bàn ghế, tivi, giường ngủ, tranh ảnh, đèn chùm.
- [ ] Sắp xếp, xoay và tùy chỉnh nội thất trong nhà theo tọa độ grid.
- [ ] Mở tiệc tân gia, mời bạn bè đến nhà tham quan.

### 6. Tương tác xã hội & Kết hôn (Social & Marriage)
- [ ] Danh sách bạn bè (Friendlist), xem trạng thái online/offline.
- [ ] Hệ thống thư tín (Hòm thư in-game, nhận quà đính kèm).
- [ ] Nhà thờ kết hôn: Lễ cưới, nhẫn cưới, danh hiệu vợ/chồng.
- [ ] Nhà hàng tiệc cưới, pháo hoa sự kiện.

### 7. Hệ thống Bang hội (Guild / Clan System)
- [ ] Thành lập bang hội, đóng góp quỹ bang (Xu / Lượng).
- [ ] Nâng cấp cấp độ bang hội, kích hoạt kỹ năng bang.
- [ ] Đua top bang hội hàng tuần/hàng tháng.

### 8. Âm thanh & Hiệu ứng sống động (Audio & Sound Effects)
- [ ] Nhạc nền (BGM) riêng biệt cho từng khu vực (Công viên thanh bình, Khu giải trí sôi động, Nông trại êm ả).
- [ ] Hiệu ứng âm thanh (SFX): Tiếng bước chân, tiếng click UI, tiếng ting khi nhận tin nhắn, âm thanh câu cá, tiếng động vật kêu.
- [ ] Tùy chỉnh bật/tắt âm thanh và thanh trượt âm lượng trong Cài đặt.

### 9. Tối ưu hóa điều khiển Mobile Web (Touch Controls)
- [ ] Bổ sung D-pad / Joystick ảo điều hướng trên màn hình cảm ứng.
- [ ] Cử chỉ phóng to / thu nhỏ bản đồ (Pinch-to-zoom).
- [ ] Tối ưu hóa mở bàn phím ảo gõ tiếng Việt mượt mà khi chat trên smartphone.

---

*Tài liệu được cập nhật tự động và theo dõi xuyên suốt quá trình phát triển.*

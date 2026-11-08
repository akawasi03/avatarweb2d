# MASTER PROMPT: HOÀN THIỆN AVATAR TEAMOBI WEBGL – FULL ORIGINAL GAMEPLAY PORT

## 1. MỤC TIÊU

Tiếp tục dự án Avatar Teamobi v2.5.8 đang được port từ Java ME sang TypeScript WebGL.

Mục tiêu cuối cùng: Người chơi có thể mở trình duyệt, đăng nhập và chơi Avatar Teamobi với gameplay, cơ chế hoạt động, dữ liệu, bản đồ, nhân vật và hệ thống multiplayer giống Client Java ME gốc.

Đây là dự án PORTING mã nguồn gốc, KHÔNG PHẢI remake hoặc xây dựng một game mới dựa trên Avatar.

## 2. NGUYÊN TẮC BẮT BUỘC

> [!IMPORTANT]
> **Quy chuẩn kỹ thuật bắt buộc:** Xem chi tiết 10 điều cấm và 7 nguyên tắc kỹ thuật tại [`PROJECT_RULES.md`](file:///d:/avatarweb2d/PROJECT_RULES.md).

- Giữ nguyên toàn bộ gameplay và logic của Avatar Teamobi v2.5.8.
- Port logic Java sang TypeScript theo từng class, từng module.
- Tận dụng toàn bộ asset gốc đã giải mã: PNG, DAT, sprite, map, font, âm thanh.
- Giữ nguyên tọa độ, animation, tốc độ di chuyển, va chạm và cơ chế tương tác.
- Giữ nguyên Binary Protocol và tương thích Java Server hiện tại.
- Không thay thế gameplay bằng mock data, fake API hoặc dữ liệu giả.
- Không tự sáng tạo tính năng, bản đồ, nhân vật hay giao diện mới.
- Không xóa hoặc sửa đổi mã nguồn Java Server và Database gốc.
- Không viết lại những module đã hoàn thành nếu không có lý do kỹ thuật rõ ràng.

## 3. HOÀN THIỆN TOÀN BỘ GAMEPLAY

Kiểm tra 320 class Java đã decompile, đối chiếu CLASS_MAPPING.md và xác định toàn bộ logic gameplay chưa được port.

Triển khai đầy đủ các hệ thống sau:

### A. Hệ thống khởi động và tài khoản
- Splash Screen.
- Login / Logout.
- Đăng ký nếu Client gốc hỗ trợ.
- Chọn nhân vật.
- Tạo nhân vật nếu Server hỗ trợ.
- Quản lý phiên đăng nhập.
- Kết nối lại khi mất mạng.

### B. Thế giới game
- World Map.
- Hệ thống bản đồ và tilemap.
- Các khu vực, vị trí và cổng di chuyển.
- NPC và tương tác NPC.
- Đối tượng và vật thể trong bản đồ.
- Hệ thống collision.
- Camera và giới hạn bản đồ.
- Chuyển khu vực và chuyển bản đồ.

### C. Nhân vật
- Render nhân vật nhiều lớp.
- Tóc, quần áo, phụ kiện và trang bị.
- Animation đứng, đi, chạy và các hành động gốc.
- Đồng bộ tọa độ và hướng di chuyển.
- Máu, năng lượng và các chỉ số nhân vật.
- Tương tác giữa các nhân vật.

### D. Hệ thống gameplay
Port đầy đủ các chức năng thực sự tồn tại trong Client gốc:

- Nông trại và trồng trọt.
- Tưới nước, chăm sóc và thu hoạch.
- Nông sản và vật phẩm.
- Cửa hàng và mua bán.
- Túi đồ và kho đồ.
- Trang bị và thay đổi ngoại hình.
- Nhiệm vụ và phần thưởng.
- Kỹ năng và hành động.
- Câu cá.
- Casino và trò chơi phụ.
- Chat và hệ thống giao tiếp.
- Các hoạt động xã hội và tương tác trong thế giới game.

Không tự bổ sung chức năng nếu không có trong phiên bản gốc.

### E. Hệ thống UI
- Menu chính.
- Menu tương tác.
- Inventory.
- Shop.
- Character Information.
- NPC Dialog.
- Chat Window.
- Các cửa sổ thông báo.
- Softkey và điều khiển gốc.
- Các hộp thoại và popup của Client.

Giữ nguyên phong cách UI và cách vận hành của Client Java ME.

## 4. KẾT NỐI SERVER VÀ MULTIPLAYER THỰC TẾ

Sử dụng Java Server hiện tại làm Backend chính.

Kiến trúc:

Browser WebGL Client
→ WebSocket Gateway
→ TCP Binary Protocol
→ Original Java Server
→ Original Database

Yêu cầu:

- Kết nối Server thật, không dùng Mock Server.
- Giữ nguyên cấu trúc packet và Binary Protocol.
- Giữ nguyên handshake và cơ chế mã hóa.
- Xử lý đúng thứ tự dữ liệu, phân mảnh TCP và nhiều packet liên tiếp.
- Quản lý session độc lập cho từng người chơi.
- Đồng bộ vị trí, chuyển động và trạng thái nhân vật.
- Đồng bộ chat và tương tác.
- Đồng bộ các hoạt động gameplay được Server hỗ trợ.
- Xử lý timeout, reconnect, disconnect và lỗi mạng.
- Không để dữ liệu của người chơi này ảnh hưởng session người chơi khác.

Kiểm thử tối thiểu bằng hai trình duyệt hoặc hai thiết bị với hai tài khoản riêng biệt.

## 5. ĐIỀU KHIỂN TRÊN WEB

Giữ nguyên cơ chế điều khiển của game gốc, đồng thời ánh xạ phù hợp với thiết bị:

- PC: Keyboard và Mouse.
- Mobile: Touch và Virtual Controls.
- Các thao tác di chuyển, chọn mục tiêu, tương tác, mở menu.
- Không để điều khiển web làm thay đổi logic gameplay gốc.

Ưu tiên trải nghiệm hiển thị theo tỷ lệ màn hình game gốc 240x320, scale nearest-neighbor, không làm méo hình ảnh pixel art.

## 6. HIỆU NĂNG VÀ TÍNH ỔN ĐỊNH

- Sử dụng WebGL Renderer.
- Giữ nguyên game loop và tốc độ logic theo Client gốc.
- Tối ưu sprite batching và texture atlas.
- Quản lý tài nguyên và giải phóng texture.
- Không tải lại asset liên tục.
- Không rò rỉ bộ nhớ khi chuyển màn hình hoặc bản đồ.
- Xử lý tab mất focus và quay lại game.
- Hỗ trợ trình duyệt desktop và mobile.
- Không đánh đổi độ chính xác gameplay để lấy FPS.

## 7. QUY TRÌNH TRIỂN KHAI

Không triển khai tất cả cùng lúc một cách thiếu kiểm soát.

Thực hiện theo thứ tự:

**Phase 1 – Core Runtime**
- Hoàn thiện J2ME Compatibility.
- Game Loop, Input, Renderer, Sprite, Font.
- Map và Character Engine.

**Phase 2 – Playable Core**
- Login.
- Character Selection.
- Vào thế giới game.
- Render bản đồ và nhân vật.
- Di chuyển và va chạm.
- Tương tác NPC.

**Phase 3 – Multiplayer**
- Kết nối Java Server thật.
- Đồng bộ hai người chơi.
- Chat.
- Chuyển bản đồ và đồng bộ trạng thái.

**Phase 4 – Full Gameplay**
- Inventory, Equipment, Shop.
- Farm, Fishing, Casino.
- Quest, Skill.
- Các chức năng còn lại trong Client gốc.

**Phase 5 – Final Verification**
- Kiểm thử toàn bộ chức năng.
- So sánh với Client Java ME gốc.
- Kiểm thử multiplayer.
- Kiểm thử hiệu năng.
- Kiểm tra lỗi và tính ổn định.

## 8. QUẢN LÝ TIẾN ĐỘ VÀ CHẤT LƯỢNG

Mỗi chức năng phải có:
- Class Java gốc liên quan.
- Class TypeScript tương ứng.
- Mô tả logic đã port.
- Packet liên quan nếu có.
- Unit Test.
- Integration Test.
- Bằng chứng chạy thực tế.

Trạng thái module:

- NOT_STARTED
- PORTING
- TESTING
- VERIFIED
- BLOCKED

Chỉ được chuyển sang VERIFIED khi chức năng đã hoạt động thực tế và có kiểm thử.

Không được đánh dấu toàn bộ dự án hoàn thành chỉ vì build thành công hoặc giao diện hiển thị đúng.

## 9. ĐIỀU KIỆN NGHIỆM THU CUỐI CÙNG

Bản WebGL chỉ được xem là hoàn thành khi:

1. Có thể đăng nhập bằng tài khoản thật.
2. Có thể chọn nhân vật và vào thế giới game.
3. Bản đồ, nhân vật, NPC và vật thể hoạt động đúng.
4. Nhân vật di chuyển và tương tác đúng logic gốc.
5. Các chức năng gameplay hoạt động với dữ liệu thật.
6. Hai người chơi có thể kết nối đồng thời và nhìn thấy nhau.
7. Chat và các tương tác multiplayer hoạt động.
8. Các hệ thống gameplay chính không còn dùng mock data.
9. Kết nối Java Server ổn định.
10. Có báo cáo kiểm thử đối chiếu với Client Java ME gốc.

## 10. YÊU CẦU ĐẦU TIÊN

Trước khi viết thêm code:

1. Đọc toàn bộ progress tracker và CLASS_MAPPING.md.
2. Audit mã nguồn TypeScript hiện tại.
3. Xác định chính xác chức năng nào đã hoàn thành, chức năng nào mới có giao diện, chức năng nào chưa được port.
4. Đối chiếu từng chức năng với mã nguồn Java gốc.
5. Lập danh sách công việc và dependency.
6. Xác định Vertical Gameplay Slice cần hoàn thiện trước.

Sau đó bắt đầu triển khai trực tiếp trên codebase hiện tại.

**YÊU CẦU QUAN TRỌNG NHẤT: Hãy làm cho Avatar Teamobi gốc thực sự chơi được trên trình duyệt. Không tạo một game khác có hình ảnh giống Avatar.**
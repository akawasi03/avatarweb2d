# QUY TẮC PHÁT TRIỂN & BẢO TOÀN DỰ ÁN AVATAR TEAMOBI WEBGL
## (ENGINEERING GUIDELINES: DOS AND DON'TS)

> **Dự án:** Native TypeScript WebGL Porting từ Avatar Teamobi Java ME (v2.5.8)  
> **Nguyên tắc cốt lõi:** **100% Zero Remake** — Giữ nguyên toàn bộ logic, asset, packet nhị phân, gameplay và UI gốc.  
> **Mục đích tài liệu:** Bản ghi nhớ bắt buộc cho mọi tác vụ (task) mới. Bất kỳ AI Agent hay lập trình viên nào tham gia dự án **BẮT BUỘC ĐỌC VÀ TUÂN THỦ TUYỆT ĐỐI**, không lặp lại bất kỳ lỗi kỹ thuật nào đã từng xảy ra.

---

## I. NHỮNG ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯỢC LÀM (STRICTLY FORBIDDEN - DON'TS)

### 1. KHÔNG giả lập dữ liệu (Zero Mock / No Fake Data)
- ❌ **CẤM:** Tự tạo dữ liệu JSON giả, mock danh sách phòng, mock người chơi, mock vật phẩm, mock nông trại hay mock tiền xu/lượng.
- ❌ **CẤM:** Dùng LocalStorage hay biến in-memory để giả lập trạng thái game thay cho việc giao tiếp với Server.
- ✅ **ĐÚNG:** Mọi dữ liệu phải bắt nguồn từ **MariaDB** (`avatar_2x`) thông qua **Java Server** (Port `19128`) và đi qua **WebSocket Gateway** (Port `19129`).

### 2. KHÔNG tự ý sáng tạo hay làm lại tính năng (Zero Remake / No Reinvention)
- ❌ **CẤM:** Không tự ý thay đổi màu sắc, font chữ, bố cục cửa sổ, phong cách đồ họa khác với phiên bản J2ME gốc.
- ❌ **CẤM:** Không tự vẽ lại icon, sprite mới khi tài nguyên gốc đã có trong các container `.av` và file `.dat`.
- ✅ **ĐÚNG:** Đối soát trực tiếp với 320 lớp mã nguồn Java decompiled trong `Avatar258.jar` và `CLASS_MAPPING.md`. Giữ nguyên từng công thức tính toán tọa độ, tỉ lệ scale, animation frame.

### 3. KHÔNG chỉnh sửa mã nguồn Java Server hay Schema Database
- ❌ **CẤM:** Sửa đổi logic trong thư mục `Avatar-Sv-master-master` hoặc chỉnh sửa bảng trong cơ sở dữ liệu `avatar_2x` để "chiều theo" lỗi của Client Web.
- ✅ **ĐÚNG:** Java Server và Database gốc là **Nguồn Sự Thật Duy Nhất (Single Source of Truth)**. Phía WebGL Client phải tuân thủ và thích ứng hoàn toàn với giao thức Server hiện hữu.

### 4. KHÔNG tự suy đoán thứ tự byte trong gói tin nhị phân (Binary Protocol)
- ❌ **CẤM:** Đoán thứ tự các trường `readByte`, `readShort`, `readInt`, `readUTF` trong các gói tin.
- ⚠️ **Lỗi thực tế đã mắc:** Trong Cmd 51 (`PLAYER_JOIN_PARK`), client tự ý đọc tọa độ `x, y` trước danh sách trang phục `wearing`, dẫn đến lỗi vỡ luồng `EOF reading short`.
- ✅ **ĐÚNG:** Trước khi viết code xử lý bất kỳ Command ID nào (Cmd 50, 51, 54, 55, 57, -4, -5, -92...), **BẮT BUỘC** mở file Java Server tương ứng (`MapService.java`, `AvatarService.java`, `MessageHandler.java`...) kiểm tra chính xác từng dòng `ds.write...` để viết `r.read...` đối ứng byte-by-byte.

### 5. KHÔNG gửi gói tin Message rỗng (Empty Payload Bug)
- ❌ **CẤM:** Khởi tạo `new Message(cmd, data)` mà không đảm bảo dữ liệu `data` được trả về khi gọi `msg.getData()`.
- ⚠️ **Lỗi thực tế đã mắc:** Trước đây constructor `Message.ts` chỉ lưu `data` vào luồng đọc `dis` mà không lưu vào `dos`, khiến `getData()` trả về mảng 0 byte, Java Server nhận gói tin rỗng và bỏ qua khiến giao diện bị treo ở *"Đang gửi thông tin đăng nhập..."*.
- ✅ **ĐÚNG:** Dùng trực tiếp `const msg = new Message(cmd); const w = msg.writer(); w.write...; network.sendMessage(msg);`.

### 6. KHÔNG dịch chuyển tức thời nhân vật (No Teleportation)
- ❌ **CẤM:** Gán trực tiếp `localPlayer.x = clickX, localPlayer.y = clickY` khi người dùng click chuột trên bản đồ.
- ✅ **ĐÚNG:** Đặt đích đến `targetMoveX, targetMoveY`. Trong mỗi tick của vòng lặp `update()`, nhân vật phải bước đi từng bước theo vận tốc `MOVE_SPEED`, đổi hướng `direct` (0: Xuống, 1: Lên, 2: Trái, 3: Phải), cập nhật hoạt ảnh chân đi (frame 1..4), và kiểm tra va chạm `isBlocked()`.

### 7. KHÔNG hardcode kích thước màn hình 240x320 vào logic tính toán chuột
- ❌ **CẤM:** Dùng hằng số `240` hoặc `320` để tính tỉ lệ click chuột: `scaleX = 240 / rect.width`.
- ⚠️ **Lỗi thực tế đã mắc:** Khi chuyển canvas sang Fullscreen Widescreen (ví dụ 640x360), việc hardcode 240x320 làm sai lệch toàn bộ vị trí click chuột, người dùng click một nơi nhân vật đi một nẻo hoặc không bấm được nút UI.
- ✅ **ĐÚNG:** Luôn tính toán tỉ lệ dựa trên kích thước thực tế của canvas buffer: `scaleX = canvas.width / rect.width`, `scaleY = canvas.height / rect.height`.

### 8. KHÔNG dùng thuật toán Row-First cho Tileset của Avatar
- ❌ **CẤM:** Tính tọa độ tile trên ảnh tileset theo kiểu hàng ngang thông thường `col = tileIdx % 7`, `row = Math.floor(tileIdx / 7)`.
- ⚠️ **Lỗi thực tế đã mắc:** Đọc sai thứ tự khiến gạch hoa công viên bị biến thành tán cây, bụi cây bị xé lẻ.
- ✅ **ĐÚNG:** Theo đúng mã gốc tại `ir.java` dòng 873 & `ht.java` dòng 21: Chiều cao ảnh tileset là 432px / 24px = 18 hàng (`ir.c.c = 18`). Thuật toán trích xuất tile của Avatar là **Column-First (Cột trước)**:
  $$\text{col} = \lfloor \text{tileIdx} / 18 \rfloor, \quad \text{row} = \text{tileIdx} \pmod{18}$$

### 9. KHÔNG dùng hàm `alert()` chặn luồng trình duyệt
- ❌ **CẤM:** Gọi `window.alert(...)` trong các luồng nhận gói tin mạng hoặc khi đăng nhập thất bại.
- ⚠️ **Lỗi thực tế đã mắc:** `alert()` làm dừng hoàn toàn luồng JavaScript của trình duyệt, đóng băng vòng lặp game loop, khiến WebSocket bị timeout hoặc disconnect ngầm.
- ✅ **ĐÚNG:** Hiển thị thông báo qua thanh trạng thái, popup in-game hoặc hộp thoại chat nổi của game.

### 10. KHÔNG báo cáo hoàn thành khi chưa chạy kiểm thử thực tế (No Blind Reporting)
- ❌ **CẤM:** Viết xong code rồi báo cáo đã xong mà không chạy thử.
- ✅ **ĐÚNG:** Bắt buộc phải chạy script kiểm thử tự động (`node avatar-web/tools/test_web_ui.js` hoặc `test_multiplayer_e2e.js`), chụp ảnh màn hình lưu vào thư mục artifacts, kiểm tra log trình duyệt và log server trước khi báo cáo cho người dùng.

---

## II. NHỮNG ĐIỀU BẮT BUỘC PHẢI LÀM (MANDATORY PRACTICES - DOS)

### 1. Luôn kiểm tra 3 dịch vụ nền trước khi thực hiện task
Trước khi kiểm thử bất kỳ tính năng nào, phải xác nhận:
1. **MariaDB:** Đang chạy trên port `3306` (database `avatar_2x`).
2. **Java TCP Server:** Đang lắng nghe trên `127.0.0.1:19128` (class `avatar.server.Avatar`).
3. **WebSocket Gateway:** Đang lắng nghe trên `ws://0.0.0.0:19129` (chuyển tiếp nhị phân trong suốt tới 19128).
4. **Web Client:** Đang phục vụ trên `http://localhost:3000`.

### 2. Luôn gắn tham số chống cache (Cache-Busting) khi build Web Client
- Mỗi khi biên dịch lại bundle `app.js` bằng `esbuild`, phải tăng phiên bản trong thẻ script của `packages/game-client/public/index.html`:
  ```html
  <script type="module" src="app.js?v=2.5.8.x"></script>
  ```
- Luôn hướng dẫn người dùng nhấn **`Ctrl + F5`** (hoặc `Ctrl + Shift + R`) để ép trình duyệt xóa sạch cache cũ.

### 3. Duy trì nhịp vòng lặp Game Loop chuẩn 20 FPS (50ms/frame)
- Giữ nguyên thiết kế của `main.a.run()`: 20 frame mỗi giây, mỗi frame đúng 50ms.
- Tách biệt rõ ràng giữa logic `update()` (tính toán vị trí, timer, frame animation) và `paint()` (vẽ canvas/WebGL).

### 4. Sắp xếp thứ tự vẽ theo trục Y (2.5D Depth Sorting)
- Mọi đối tượng xuất hiện trên bản đồ (người chơi, nhân vật khác, NPC, thú nuôi) phải được đưa vào mảng và sắp xếp tăng dần theo tọa độ Y trước khi render:
  ```typescript
  entities.sort((a, b) => a.y - b.y);
  ```
- Đối tượng có `y` nhỏ hơn (ở xa) được vẽ trước, đối tượng có `y` lớn hơn (ở gần) được vẽ đè lên trên.

### 5. Ghép nhân vật đa lớp chuẩn Avatar (`AvatarRenderer.ts`)
- Vẽ đúng thứ tự lớp từ dưới lên trên:
  1. Bóng chân (`s0.png` hoặc arc đổ bóng)
  2. Quần / Chân (`zorder = 10`)
  3. Áo / Thân (`zorder = 20`)
  4. Đầu / Mặt (`zorder = 30`)
  5. Mắt (`zorder = 40`)
  6. Tóc (`zorder = 50`)
  7. Nón, mặt nạ, cánh, phụ kiện (`zorder = 52..60`)
- Tọa độ sprite cắt từ `avatar_img_data` (1.139 mục) và các phần tử `part_*.dat`.

### 6. Xử lý đồng thời cả 2 chế độ điều khiển: Chuột & Bàn phím
- **Chuột / Cảm ứng:**
  - Click vào mặt đất: Đặt điểm đến và bước đi kèm hiệu ứng vòng sóng gợn (ripple effect).
  - Giữ và rê chuột (Drag): Nhân vật chạy bám theo con trỏ chuột liên tục.
  - Click các nút HUD: `MENU`, `✉` (Hộp thư), `💬` (Chat), `🧭` (Đổi khu), `🏃` (Chạy nhanh), `😊` (Cảm xúc), `⛶` (Toàn màn hình).
- **Bàn phím:**
  - Di chuyển: Mũi tên $\uparrow\downarrow\leftarrow\rightarrow$ hoặc phím <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>.
  - Phím mềm: <kbd>Q</kbd> (Menu), <kbd>E</kbd> (Rời khu), <kbd>C</kbd> / <kbd>Enter</kbd> (Mở ô chat).

### 7. Xử lý chu kỳ ngắt kết nối an toàn (Disconnect Lifecycle)
- Khi một client ngắt kết nối, Java Server mất khoảng 1 đến 2 giây để thực hiện `ServerManager.disconnect()` và ghi `Account unlocked successfully.`.
- Không gửi đăng nhập lại cùng một tài khoản ngay trong vòng 1 giây đó để tránh lỗi tài khoản đang bị khóa tạm thời.

---

## III. CHECKLIST KIỂM THỬ TRƯỚC KHI BÀN GIAO MỖI TASK (PRE-FLIGHT CHECKLIST)

Mỗi khi hoàn thành một task, **BẮT BUỘC** kiểm tra lần lượt danh sách sau:

- [ ] **1. Compile & Bundle Clean:** Chạy `npm run build` không có bất kỳ cảnh báo hoặc lỗi TypeScript (`tsc`) nào; `esbuild` ra file `app.js` thành công.
- [ ] **2. Services Health:** MariaDB (3306) và Java Server (19128) không bị crash, Gateway (19129) hoạt động bình thường.
- [ ] **3. Real Account Login:** Đăng nhập thành công với tài khoản thật `admin` / `123456` hoặc `ad` / `123456` (không dùng tài khoản mock).
- [ ] **4. Map & Assets Render:** Bản đồ hiển thị đầy đủ gạch, cây cối, nhà cửa đúng hướng, nhân vật có trang phục và hoạt ảnh đứng/bước đi.
- [ ] **5. Mouse & Touch Controls:** Click chuột nhân vật đi mượt mà, không bị teleport, không lệch tọa độ khi toàn màn hình.
- [ ] **6. Multiplayer Verification:** Chạy `node avatar-web/tools/test_multiplayer_e2e.js` xác nhận 2 client nhìn thấy nhau, đồng bộ di chuyển và nhận tin nhắn chat 2 chiều.
- [ ] **7. Visual Evidence:** Chụp ảnh màn hình thực tế lưu vào thư mục artifacts và nhúng đường dẫn vào báo cáo phản hồi người dùng.

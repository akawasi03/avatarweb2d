# AVATAR TEAMOBI ORIGINAL GAME REFERENCE SPECIFICATION

Tài liệu định lượng kích thước, bảng màu, bố cục giao diện và quy tắc render chuẩn mực của Avatar Teamobi Java ME.

---

## 1. THÔNG SỐ HIỂN THỊ CHUẨN (DISPLAY METRICS)

- **Độ phân giải gốc (Logical Resolution):**
  - Màn hình dọc chuẩn J2ME: **240 x 320** pixels.
  - Màn hình ngang (Landscape): **320 x 240** pixels.
  - Scale mode: Giữ nguyên tỷ lệ pixel art gốc (Pixel-Perfect 1:1, hỗ trợ Integer Scaling x2, x3, x4 hoặc Nearest-Neighbor WebGL filtering để không bị nhòe mờ).
- **FPS (Frame Rate):**
  - Cố định: **20 FPS** (`Thread.sleep(50 - elapsed)` trong `main.a`).

---

## 2. BẢNG MÀU GỐC (COLOR PALETTES)

Từ mã nguồn `hj.java`, `gw.java`, `je.java`:
- Nền Splash Screen: `#000000` (Đen tuyền).
- Viền cửa sổ / Border: `0x494949` (Xám đậm), `0x2F2F2F` (Xám tối).
- Thanh tiêu đề & khung: `14400144` (`#DBBA90`), `12689526` (`#C1A076`).
- Màu chữ Font:
  - Font 0 ("normal"): Chữ trắng bóng đen.
  - Font 1 ("border"): Chữ có viền nổi.
  - Font 2 ("arial"): Font phẳng hiện đại.
  - Font 3 ("black"): Chữ đen.
  - Font 4 ("number"): Chữ số hiển thị tiền tệ, chỉ số.
  - Font 5 ("smallRed"): Chữ đỏ thông báo lỗi/cảnh báo.
  - Font 6 ("smallYellow"): Chữ vàng nổi bật/chú ý.
  - Font 7 ("big"): Chữ to tiêu đề.

---

## 3. CÁC MÀN HÌNH CHÍNH (CORE SCREENS REFERENCE)

### 3.1 Splash Screen (`jv.java`)
- Nền đen (`#000000`).
- Logo TeaMobi `lg.png` căn giữa màn hình (`main.a.m >> 1, main.a.n >> 1`).
- Thời gian hiển thị: 52 frames (~2.6 giây ở 20 FPS).
- Tự động chuyển tiếp sang `es.java` (Login Screen).

### 3.2 Login Screen (`es.java`)
- Bối cảnh nền: Tải từ `normal/bg.av` (các layer mây, trời, cỏ).
- 4 trường nhập liệu (`dx` TextFields):
  1. Tài khoản (Username)
  2. Mật khẩu (Password)
  3. Mã bảo vệ / Số điện thoại đăng ký (nếu có)
  4. Máy chủ (Server selection)
- 3 tùy chọn nút chọn nhanh:
  - "Chơi mới"
  - "Chơi tiếp"
  - "Đổi tài khoản"
- Thanh softkey phía dưới:
  - Trái: "Menu"
  - Giữa: "Chọn"
  - Phải: "Đóng"

### 3.3 World Map / City Map (`ae.java`)
- Lưới bản đồ 26 dòng x 34 cột (884 bytes từ `normal/citiMap`).
- Tọa độ ô cửa vào (`tile == 69`):
  - Khu giải trí
  - Nông trại
  - Công viên
  - Khu dân cư
  - Sân bay
  - Khu ngoại ô

### 3.4 Room / Game Scene (`ir.java`)
- Ma trận Tilemap: `ir.g` (mảng short index tile).
- Lớp va chạm: `ir.h` (0: đi được, 1: tường/chướng ngại vật, 2: vùng nước, 3: lối chuyển map).
- Nhân vật trong phòng:
  - Sắp xếp thứ tự vẽ theo tọa độ Y tăng dần (`y` thấp vẽ trước, `y` cao vẽ đè lên trước mặt).
  - Tên nhân vật hiển thị trên đầu kèm thanh năng lượng / biểu cảm.

---

## 4. QUY TẮC RENDER NHÂN VẬT (AVATAR RENDERING ENGINE)

Nhân vật Avatar được cấu thành từ các phần (Part) lắp ghép:
1. **Thân / Body base:** Đầu, thân, tay, chân (giới tính nam / nữ).
2. **Trang bị (Equipment parts):**
   - Tóc / Nón (Mũ)
   - Áo (Áo ngắn/dài, áo khoác)
   - Quần
   - Giày / Dép
   - Phụ kiện cầm tay (kem, hoa, bóng bay, gậy)
   - Cánh / Hiệu ứng sau lưng
   - Thú cưng đi theo
3. **Thứ tự layer (`zOrder`):**
   - Layer 0: Phụ kiện lưng (cánh, hào quang)
   - Layer 1: Chân, quần
   - Layer 2: Thân, áo
   - Layer 3: Đầu, khuôn mặt, mắt
   - Layer 4: Tóc, mũ nón
   - Layer 5: Phụ kiện trước (vũ khí cầm tay, bóng bay)
4. **Bộ chuyển động (Animation - 15 frames):**
   - Frame 0: Đứng yên (Idle)
   - Frame 1 - 4: Bước đi (Walking cycle)
   - Frame 5 - 8: Ngồi (Sitting)
   - Frame 9 - 12: Hành động tương tác (vẫy tay, hôn, câu cá, tưới nước)
   - Frame 13 - 14: Biểu cảm đặc biệt (khóc, cười, tức giận)

# AVATAR TEAMOBI TCP PROTOCOL & WEBSOCKET GATEWAY SPECIFICATION

Tài liệu đặc tả toàn bộ giao thức mạng nhị phân giữa Avatar Client và Avatar Server (port 19128), cùng với kiến trúc WebSocket Gateway chuyển tiếp.

---

## 1. TỔNG QUAN GIAO THỨC

- **Transport gốc:** TCP Socket (Java `java.net.Socket`, MIDP 2.0 `javax.microedition.io.SocketConnection`).
- **Web Transport:** WebSocket (`ws://` hoặc `wss://`) chuyển tiếp qua WebSocket Gateway đến TCP Server 19128.
- **Port:** 19128.
- **Đóng gói packet:** Binary frame gồm `Command`, `Length`, `Payload`.
- **Mã hóa:** Đối xứng XOR luân phiên theo mảng `key` được bắt tay tại thời điểm kết nối ban đầu.

---

## 2. QUY TRÌNH BẮT TAY & MÃ HÓA (HANDSHAKE & KEY EXCHANGE)

### 2.1 Handshake Packet (-27)
Ngay sau khi client kết nối TCP đến Server:
1. Server khởi tạo mảng `key`:
   ```java
   private static final byte[] key = (System.currentTimeMillis() + "_kitakeyos").getBytes();
   ```
2. Server gửi packet **chưa mã hóa** với `command = -27`:
   - Byte 0: Độ dài của key (`key_len = key.length`).
   - Byte 1: `key[0]`.
   - Byte 2 .. `key_len`: `key[i] ^ key[i - 1]` (XOR chuỗi vi phân).
3. Client nhận packet `-27`:
   - Đọc `key_len = readByte()`.
   - Đọc toàn bộ các byte vào mảng `key`.
   - Khôi phục mảng key nguyên gốc:
     ```typescript
     for (let i = 0; i < key.length - 1; i++) {
         key[i + 1] = key[i + 1] ^ key[i];
     }
     ```
   - Thiết lập trạng thái `connected = true`, `curR = 0`, `curW = 0`.

---

## 3. CẤU TRÚC FRAME DỮ LIỆU ĐÃ KẾT NỐI

Sau khi đã hoàn tất bắt tay (`connected = true`), tất cả byte gửi và nhận đều được mã hóa bằng XOR với mảng `key`:

### 3.1 Hàm biến đổi Key:
```typescript
function readKey(b: number): number {
    const val = (key[curR] & 0xFF) ^ (b & 0xFF);
    curR = (curR + 1) % key.length;
    return val;
}

function writeKey(b: number): number {
    const val = (key[curW] & 0xFF) ^ (b & 0xFF);
    curW = (curW + 1) % key.length;
    return val;
}
```

### 3.2 Cấu trúc Packet trên đường truyền:
1. **Command Byte (1 byte):**
   `wire_cmd = writeKey(original_cmd)`
2. **Length (2 bytes Big-Endian):**
   - Ngoại lệ: Nếu `cmd == 90`, ghi độ dài 4 bytes `writeInt(size)`.
   - Thông thường (2 bytes):
     `b1 = writeKey((size >> 8) & 0xFF)`
     `b2 = writeKey(size & 0xFF)`
3. **Payload (N bytes):**
   - Từng byte dữ liệu trong payload được XOR với `writeKey(data[i])`.

---

## 4. BẢNG DANH MỤC COMMANDS CHÍNH (`Cmd.java`)

| Cmd ID (Hex/Dec) | Tên lệnh | Chiều | Mô tả |
|---|---|---|---|
| `-27` (`0xE5`) | `HANDSHAKE` | Server -> Client | Gửi khóa bí mật phiên |
| `-2` (`0xFE`) | `LOGIN` | Client -> Server | Gửi thông tin đăng nhập (username, pass, version) |
| `-4` (`0xFC`) | `LOGIN_SUCCESS` | Server -> Client | Đăng nhập thành công, trả về User ID |
| `-5` (`0xFB`) | `LOGIN_FAIL` | Server -> Client | Đăng nhập thất bại (kèm chuỗi lý do) |
| `-1` (`0xFF`) | `GET_HANDLER` | C <-> S | Chuyển đổi ngữ cảnh (3: Casino, 8: Avatar, 9: Park, 10: Farm, 11: Home) |
| `-94` (`0xA2`) | `REQUEST_TILE_MAP` | Client -> Server | Yêu cầu dữ liệu bản đồ phòng |
| `-92` (`0xA4`) | `REQUEST_CITY_MAP` | Client -> Server | Yêu cầu dữ liệu bản đồ thành phố |
| `-98` (`0x9E`) | `REQUEST_IMAGE_PART` | Client -> Server | Yêu cầu tải hình ảnh part |
| `-80` (`0xB0`) | `GET_IMG_ICON` | C <-> S | Tải icon item/object |
| `-16` (`0xF0`) | `GET_AVATAR_PART` | Server -> Client | Danh sách trang bị nhân vật |
| `-6` (`0xFA`) | `CHAT_TO` | C <-> S | Tin nhắn chat công khai hoặc riêng |
| `-28` (`0xE4`) | `USER_DATA` | Server -> Client | Dữ liệu nhân vật (xu, lượng, cấp, danh hiệu) |
| `-33` (`0xDF`) | `UPDATE_MONEY` | Server -> Client | Cập nhật số dư xu/lượng thời gian thực |

---

## 5. THIẾT KẾ WEBSOCKET GATEWAY (`packages/web-gateway`)

Do trình duyệt web bảo mật sandbox không thể mở trực tiếp kết nối TCP thô đến `127.0.0.1:19128`, **WebSocket Gateway** sẽ hoạt động như một proxy trong suốt (Transparent Protocol Bridge):

```mermaid
flowchart LR
    Browser["WebGL Client (Browser)"] <-->|WebSocket Binary Frame| Gateway["WebSocket Gateway (Node.js/TS)"]
    Gateway <-->|Raw TCP Socket (19128)| Server["Avatar Java Server"]
```

### Nguyên tắc của Gateway:
- **Transparent Bridging:** Gateway nhận frame nhị phân từ WebSocket và chuyển tiếp thẳng sang TCP Socket tới port 19128, và ngược lại.
- **Không can thiệp payload:** Gateway không chỉnh sửa, không giải mã lại packet để đảm bảo độ trễ thấp nhất và bảo toàn tính toàn vẹn 100% của server gốc.

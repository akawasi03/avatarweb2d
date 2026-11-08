# AVATAR TEAMOBI – NATIVE WEBGL PORT

Dự án chuyển đổi chính thức Client Java ME (MIDP 2.0 / CLDC 1.0) của Avatar Teamobi (v2.5.8) sang TypeScript WebGL bản địa.

Đây là dự án **PORT GAME GỐC 1:1**, bảo toàn nguyên vẹn gameplay, assets, animation, giao diện và giao thức mạng với Java Server hiện tại (port 19128).

---

## 1. CẤU TRÚC DỰ ÁN

```
avatar-web/
├── docs/
│   ├── reverse-engineering/         # Bản đồ 321 Class, định dạng DAT, phân tích decompile
│   │   ├── CLASS_MAPPING.md
│   │   ├── DAT_FORMAT.md
│   │   └── decompiled/             # 320 classes decompile từ Avatar258.jar
│   ├── protocol/                   # Đặc tả wire format, bắt tay key -27, danh mục Command
│   │   └── TCP_PROTOCOL.md
│   ├── original-game-reference/    # Kích thước chuẩn, bảng màu, animation 15 frame
│   │   └── REFERENCE_IMAGES.md
│   └── migration/                  # Kế hoạch và tiến độ chuyển đổi
│
├── tools/
│   ├── jar-decompiler/             # Phân tích & decompile JAR CFR
│   ├── dat-decoder/                # Giải mã binary stream các file .dat (parts, items, farm)
│   └── asset-extractor/            # Giải mã container .av với khóa 'NguyenVanMinh'
│
├── packages/
│   ├── j2me-compat/                # Tương thích LCDUI (Graphics, Image, Sprite, Canvas, RMS)
│   ├── protocol/                   # DataInputStream, DataOutputStream, Message, Cipher (-27)
│   ├── web-gateway/                # WebSocket <-> Java Server TCP (19128) transparent bridge
│   └── game-client/                # Engine game, Bitmap Font, FrameImage, Screens, Entities
│
├── assets/
│   ├── original/                   # Toàn bộ tài nguyên gốc trích xuất từ JAR & Server
│   │   └── jar_extracted/          # 40.456 PNG và 7.927 DAT được trích xuất
│   └── converted/                  # Texture atlases tối ưu hóa cho WebGL
│
├── MIGRATION_TRACKER.md            # Bảng theo dõi tiến độ chi tiết từng module
└── README.md
```

---

## 2. KẾT QUẢ TRIỂN KHAI BƯỚC ĐẦU (FIRST EXECUTION MILESTONES)

1. **Decompile & Khôi phục Class Map:**
   - Hoàn thành decompile **320/320 classes** từ `Avatar258.jar`.
   - Lập tài liệu `docs/reverse-engineering/CLASS_MAPPING.md` chi tiết 321 entries.
2. **Giải mã Asset Container `.av`:**
   - Phân tích lớp `c.java` và khôi phục thành công khóa XOR 13 byte: `NguyenVanMinh`.
   - Trích xuất 100% tài nguyên gốc từ `bg.av`, `main.av`, `farm.av`, `home.av`, `effect.av`, `font.av`, `dialLucky.av` với header PNG chuẩn.
3. **Phân tích Định dạng `.dat`:**
   - Đặc tả cấu trúc `part_*.dat` (bộ 15 frame chuyển động nhân vật), `map_item_type.dat`, `farm_info.dat`, `food.dat` trong `docs/reverse-engineering/DAT_FORMAT.md`.
4. **Giao thức Mạng & WebSocket Gateway:**
   - Hoàn thiện mô hình bắt tay `-27`, thuật toán khôi phục key XOR đối xứng `curR`/`curW`.
   - Xây dựng `@avatar/protocol` và `@avatar/web-gateway` chuyển tiếp nhị phân trong suốt.
5. **J2ME WebGL Compatibility Layer:**
   - Triển khai `@avatar/j2me-compat` hỗ trợ `drawRegion`, `Sprite.TRANS_*`, `setClip`, `translate`, anchors, và `Canvas` game action.
   - Triển khai `@avatar/game-client` với Bitmap Font (8 bộ font) và FrameImage.
6. **Kiểm thử tự động (Unit Tests):**
   - **11/11 tests pass** với thời gian chạy < 700ms.

---

## 3. HƯỚNG DẪN CHẠY DỰ ÁN

### Yêu cầu môi trường
- Node.js >= 20.x
- Java 17 (đã có tại `D:\Programs\jdk-17`)

### Chạy kiểm thử tự động
```bash
cd d:\avatarweb2d\avatar-web
node --test packages/*/dist/*.test.js
```

### Khởi động WebSocket Gateway
```bash
cd d:\avatarweb2d\avatar-web
npm run gateway
```
Gateway sẽ lắng nghe tại `ws://0.0.0.0:19129` và chuyển tiếp đến Java TCP Server tại `127.0.0.1:19128`.

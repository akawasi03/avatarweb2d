# DANH MỤC TOÀN DIỆN TÀI NGUYÊN GAME AVATAR 2.5.8
## (SPRITES, ITEMS, MAPS & ANIMATION SPECIFICATION)

> **Mục tiêu:** Kiểm kê chi tiết 100% tài nguyên đồ họa, trang phục, vật phẩm, bản đồ và hoạt ảnh để phục vụ việc chuyển đổi chính xác từ Java sang WebGL.  
> **Nguồn tài nguyên:** Thư mục `img/` (16 phân mục), `Avatar-Sv-master-master/res/`, và dữ liệu nhị phân đã giải mã trong `avatar-web/assets/`.  
> **Nguyên tắc kỹ thuật:** Bảo toàn nguyên vẹn tọa độ atlas, metadata lát cắt (slices), chỉ số Z-order và khung hình animation.

---

## I. HỆ THỐNG SPRITE & ATLAS ĐỒ HỌA

### 1. Cấu trúc Container và Thuật toán Giải nén (`c.java`)
- Game gốc Avatar sử dụng các container nén nhị phân có đuôi `.av` (hoặc nhúng trong `.jar`).
- **Thuật toán giải mã:** Mỗi byte dữ liệu trong container được mã hóa bằng khóa XOR đối xứng (theo class `c.java`).
- Sau khi giải mã, dữ liệu trích xuất thành 2 bảng tra cứu JSON chuẩn:
  1. `avatar_img_data.json`: Quản lý danh sách **1.139 lát cắt ảnh (slices)**.
  2. `avatar_parts.json`: Quản lý cấu trúc của **2.048 bộ phận nhân vật (parts)**.

### 2. Cấu trúc Lát cắt Ảnh (`avatar_img_data.json`)
Mỗi lát cắt đại diện cho một vùng chữ nhật được trích xuất từ các tấm atlas texture lớn (`/res/big/{id}.png`):
```json
{
  "id": 142,
  "x": 24,
  "y": 48,
  "w": 32,
  "h": 36,
  "dx": -16,
  "dy": -32
}
```
- `id`: Định danh lát cắt (Slice ID).
- `x, y`: Tọa độ góc trên bên trái của lát cắt trên tấm atlas.
- `w, h`: Chiều rộng và chiều cao vùng cắt.
- `dx, dy`: Khoảng dịch gốc tọa độ (anchor offset) so với vị trí tâm chân của nhân vật `(0, 0)`.

### 3. Phân loại 16 Thư mục Tài nguyên Gốc (`d:\avatarweb2d\Avatar-Sv-master-master\img\`)

| STT | Thư mục | Định dạng | Nội dung tài nguyên |
|:---:|---|:---:|---|
| 01 | `01_Khu_Nong_Trai` | HD / Medium PNG | 48 ô đất (`cell0`..`cell15`), chuồng bò, chuồng gà, kho lúa, ao cá, cây khế, máy ấp trứng. |
| 02 | `02_Khu_Nha_O_Noi_That` | HD / Medium PNG | Gạch lát sàn, giấy dán tường, bàn ghế, tủ lạnh, tivi, giường ngủ, tranh treo tường. |
| 03 | `03_Khu_Ban_Do_Dia_Diem` | HD / Medium PNG | 10 khu vực bản đồ: Công viên (Khu A-H), Phố thị, Nông trại, Hồ sông, Đám cưới, Shop, Nhà ở, Đường đua, Hawaii. |
| 04 | `04_Khu_Giai_Tri_Casino_Danh_Bai` | HD PNG | Bàn chơi bài 2-4-5 người (`imgban2`, `imgban4`), thanh tiền tệ (`barmoney`), 52 quân bài Tây, nút đặt cược. |
| 05 | `05_Khu_Giai_Tri_Vong_Quay_May_Man` | HD / Medium PNG | Bánh xe quay 8 màu (`spin_bg_color`), kim chỉ số, nút quay tự động (`bg_autospin`), tia hào quang. |
| 06 | `06_Khu_Giai_Tri_Dua_Xe` | HD / Medium PNG | Đường đua thú (`tileduaxe`), khán đài, hiệu ứng khói bụi (`d00`..`d04`, `w0`..`w2`), popup cược. |
| 07 | `07_Khu_Hon_Le_Dam_Cuoi` | HD / Medium PNG | Lễ đường thành hôn (`le_duong_hon_le`), cổng hoa cưới, thảm đỏ, bục tuyên thệ chú rể & cô dâu. |
| 08 | `08_Chuc_Nang_Shop_Cua_Hang` | HD / Medium PNG | Kệ hàng thời trang (`shop00`..`shop51`), manocanh, danh mục quần áo, nón tóc, phụ kiện. |
| 09 | `09_Chuc_Nang_Menu_Giao_Dien` | HD PNG | Khung menu popup (`00`..`51`), nút hành động (`action0`, `action1`), viền hộp thoại, nền cuộn. |
| 10 | `10_Chuc_Nang_Ho_So_Nhan_Vat` | HD / Medium PNG | Bảng hồ sơ (`back`), icon giới tính nam/nữ (`gender`), thanh chỉ số thân thiện, hạnh phúc, độ đói (`thanh0`..`thanh2`). |
| 11 | `11_Chuc_Nang_Dieu_Khien_Phim_Ao` | HD PNG | D-pad điều hướng cảm ứng, phím ảo OK, Menu trái, Thoát phải, nút Chat nhanh. |
| 12 | `12_Hieu_Ung_Va_Thong_Bao` | HD PNG | Pháo hoa sự kiện, tia sét, vòng sáng thiên thần, biểu tượng icon chat, dấu chấm than cảnh báo. |
| 13 | `13_Moi_Truong_Bau_Troi` | HD PNG | Bầu trời ban ngày (mây xanh), hoàng hôn (cam đỏ), ban đêm (sao & trăng), tán cây bóng mát. |
| 14 | `14_Man_Hinh_Splash_Logo_Banner` | HD / Exe Icons | Logo Teamobi (`lgyeah.png`), Logo Avatar (`l.png`), Banners (`1920x1080.png`), Huy hiệu 12+/18+. |
| 15 | `15_Font_Chu_He_Thong` | Bitmap / TTF | Bộ font chữ bitmap kẻ bóng gốc của Teamobi, tối ưu hiển thị không bị mờ ở độ phân giải pixel. |
| 16 | `16_Tai_Nguyen_Unity_Mac_Dinh` | Shaders / Assets | Shader đổ bóng, shader alpha blend và vật liệu render 2D. |

---

## II. HỆ THỐNG VẬT PHẨM & TRANG PHỤC (ITEM MASTER CATALOG)

### 1. Phân loại Bộ Phận Trang Phục (`avatar_parts.json`)
Mỗi bộ phận nhân vật (Part) bao gồm danh sách các lát cắt (slices) và thứ tự hiển thị:
```json
{
  "id": 55,
  "gender": 0,
  "zOrder": 50,
  "slices": [140, 141, 142, 143]
}
```
- **Quy tắc thứ tự hiển thị (Z-Order Stacking):**
  1. `zOrder = 0`: Đổ bóng chân (`assets/effect/s0.png`).
  2. `zOrder = 10`: Quần, váy, chân di chuyển.
  3. `zOrder = 20`: Áo, thân trên, áo khoác.
  4. `zOrder = 30`: Đầu, da mặt, cằm.
  5. `zOrder = 40`: Mắt (chớp mắt theo chu kỳ 3 giây).
  6. `zOrder = 50`: Tóc, râu, lông mày.
  7. `zOrder = 55`: Nón, vương miện, băng đô.
  8. `zOrder = 60`: Phụ kiện lưng (Cánh thiên thần, cánh tiểu tiên, ba lô).
  9. `zOrder = 70`: Thú cưng đi kèm (Pet chó, mèo, heo, rồng mini).

### 2. Danh mục Vật Phẩm Nông Trại
- **Hạt giống cây trồng:** Lúa nước, Cà rốt, Cà chua, Bắp (Ngô), Dâu tây, Dưa hấu, Hoa hướng dương, Hoa hồng.
- **Vật nuôi:** Gà con $\rightarrow$ Gà đẻ trứng; Heo con $\rightarrow$ Heo xuất chuồng; Bò sữa $\rightarrow$ Bò vắt sữa; Cá giống ao nhà.
- **Vật phẩm hỗ trợ:** Phân bón loại 1, Phân bón siêu tốc, Thuốc trừ sâu, Bình tưới nước, Thuốc bổ vật nuôi.
- **Cây đặc biệt:** Cây Khế (cho quả thu hoạch hàng ngày đổi Lượng).

### 3. Hệ thống Tiền Tệ Game
1. **Xu (Coin):**
   - Kiểu dữ liệu Server: `bigint(11)` trong bảng `players.xu`.
   - Lưu thông chính trong game: mua sắm quần áo thông thường, nông sản, đánh bài, cá cược đua thú.
2. **Lượng (Gem / Gold):**
   - Kiểu dữ liệu Server: `int(11)` trong bảng `players.luong`.
   - Tiền tệ cao cấp: nạp thẻ/chuyển khoản, mua cánh thời trang VIP, set đồ huyền thoại, mở rộng đất và rương nhà.
3. **Lượng Khóa (Bound Gem):**
   - Kiểu dữ liệu Server: `int(11)` trong bảng `players.luong_khoa`.
   - Phần thưởng từ nhiệm vụ, danh hiệu và sự kiện; dùng mua các vật phẩm cố định không thể giao dịch.
4. **Xèng (Casino Chips):**
   - Tiền tệ riêng biệt trong Khu Giải Trí dùng để tham gia Vòng Quay May Mắn và máy xèng.

---

## III. HỆ THỐNG BẢN ĐỒ (MAP ENGINE & SPATIAL LAYOUTS)

### 1. Danh mục 108 Bản Đồ Game (`assets/maps/<id>`)

Avatar chia thế giới thành 108 khu vực bản đồ chuyên biệt. Bảng dưới đây thể hiện các bản đồ trung tâm quan trọng nhất:

| Map ID | Tên Khu Vực | Kích thước (Tiles) | Kích thước (Pixels) | Chiều cao chuẩn (`htTiles`) | Đặc tả địa hình & Chức năng |
|:---:|---|:---:|:---:|:---:|---|
| `9` | Công Viên Trung Tâm (Park A) | $42 \times 8$ | $1.008 \times 192$ | 8 | Tượng đài trung tâm, ghế đá công viên, cây xanh, lối đi dạo. |
| `11` | Công Viên Sự Kiện (Park B) | $29 \times 9$ | $696 \times 216$ | 9 | NPC Thần Tài Xỉu, Tiên tri Lovanga, lối sang Hồ Nước. |
| `1` | Khu Ngoại Ô | $26 \times 8$ | $624 \times 192$ | 8 | Cây cầu gỗ, bãi cỏ hoang, khu câu cá ven sông. |
| `10` | Khu Phố Mua Sắm | $42 \times 8$ | $1.008 \times 192$ | 8 | Cửa hàng quần áo, tiệm cắt tóc, thẩm mỹ viện, ATM ngân hàng. |
| `21` | Khu Nhà Ở Dân Cư | $38 \times 7$ | $912 \times 168$ | 7 | Cửa vào các phòng trọ và biệt thự cá nhân của người chơi. |
| `25` | Phố Đi Bộ | $42 \times 7$ | $1.008 \times 168$ | 7 | Lòng đường lát đá, đèn đường cổ điển, biển quảng cáo Teamobi. |
| `55` | Khu Nghỉ Dưỡng Hawaii | $36 \times 11$ | $864 \times 264$ | 11 | Bờ biển nhiệt đới, rặng dừa, ghế tắm nắng, du thuyền sang trọng. |
| `88` | Trường Đua Thú (Pet Racing) | $48 \times 8$ | $1.152 \times 192$ | 8 | Khán đài cổ vũ, 5 làn đua thú cưng, bảng tỷ lệ cược thời gian thực. |
| `108` | Khu Nông Trại Tổng Hợp | $240 \times 16$ | $5.760 \times 384$ | 16 | Bản đồ đại nông trại: 48 ô đất, chuồng trại, hồ cá liên thông. |

### 2. Định dạng Tệp Nhị phân Bản đồ (`assets/maps/<id>`)
- Mỗi file map là một mảng nhị phân phẳng gồm các byte: `bytes[i]`.
- **Cách tính kích thước bản đồ:**
  $$\text{widthTiles} = \left\lfloor \frac{\text{bytes.length}}{\text{heightTiles}} \right\rfloor$$
- **Giải mã giá trị Tile:**
  - Nếu byte bằng `255`: Tile rỗng / không vẽ (`tileIdx = -1`).
  - Byte từ `0` đến `254`: Định danh tile trên ảnh tileset.
- **Ma trận va chạm (`collision`):**
  - Tile rỗng hoặc vật cản gạch xây, hàng rào: `collision = 1` (chặn bước đi).
  - Lòng đường, mặt cỏ, sàn nhà: `collision = 0` (cho phép bước đi tự do).

### 3. Thuật toán Trích xuất Tileset Column-First (18 Hàng)
- Ảnh tileset của Avatar (`tileset0.png` ban ngày, `tileset1.png` ban đêm) có kích thước: chiều rộng thay đổi, chiều cao cố định **$432\text{ px} / 24\text{ px} = 18\text{ hàng}$**.
- Theo đối soát mã nguồn gốc tại `ir.java` (dòng 873) và `ht.java` (dòng 21):
  $$\text{col} = \left\lfloor \frac{\text{tileIdx}}{18} \right\rfloor, \quad \text{row} = \text{tileIdx} \pmod{18}$$
  $$X_{\text{src}} = \text{col} \times 24\text{ px}, \quad Y_{\text{src}} = \text{row} \times 24\text{ px}$$

---

## IV. HỆ THỐNG HOẠT ẢNH (ANIMATION & SKELETAL SEQUENCING)

### 1. Chu kỳ Bước đi Nhân vật (Walking Cycle)
Nhân vật Avatar có 4 hướng nhìn chính và chu kỳ di chuyển gồm 5 trạng thái frame:
- **Mã hướng di chuyển (`direct`):**
  - `0`: Quay mặt xuống (Down / South)
  - `1`: Quay lưng lên (Up / North)
  - `2`: Quay sang trái (Left / West)
  - `3`: Quay sang phải (Right / East - lật ngang từ Frame Trái qua phép biến đổi `ctx.scale(-1, 1)`)

| Trạng thái | Frame Index | Mô tả cử động bộ xương 2D | Chu kỳ thời gian |
|---|:---:|---|:---:|
| **Đứng yên (Idle)** | `0` | Hai chân khép thẳng, hai tay buông tự nhiên, mắt chớp ngẫu nhiên. | Vô hạn |
| **Bước chân trái** | `1` | Chân trái nhấc lên về phía trước, tay phải đánh nhẹ về sau. | 100 ms |
| **Chân tiếp đất** | `2` | Thân hạ thấp 1 pixel tạo độ nảy tự nhiên khi bước đi. | 100 ms |
| **Bước chân phải** | `3` | Chân phải nhấc lên về phía trước, tay trái đánh nhẹ về sau. | 100 ms |
| **Chuẩn bị chu kỳ mới**| `4` | Thu chân về vị trí cân bằng, đầu nảy nhẹ. | 100 ms |

### 2. Hoạt ảnh Biểu Cảm & Tương Tác Xã Hội (Emotions & Actions)

| Mã Action | Tên Cảm Xúc / Hành Động | Chuỗi Khung hình Diễn hoạt | Hiệu ứng đính kèm |
|:---:|---|---|---|
| `1` | **Hôn (Kiss)** | Nghiêng đầu góc 15°, môi nhô về phía bạn diễn. | Trái tim màu hồng bay lên trên đỉnh đầu. |
| `2` | **Ôm (Hug)** | Hai tay mở rộng sau đó khép chặt vào đối phương. | Vòng sáng ấm áp phát xung quanh 2 nhân vật. |
| `3` | **Tát (Slap)** | Tay vung lên 90° và đánh nhanh về phía trước. | Dấu sao vàng xoay tròn trên đầu nạn nhân. |
| `4` | **Nhảy múa (Dance)** | Thân lắc trái phải, hai tay giơ cao vẫy liên tục. | Nốt nhạc nhiều màu sắc bay lên theo nhịp 120 BPM. |
| `5` | **Khóc (Cry)** | Cúi gập đầu, hai tay ôm mặt. | Hai dòng nước mắt xanh bắn thành vòng cung. |
| `6` | **Ngủ (Sleep)** | Nằm ngang trên mặt đất hoặc gối đầu lên ghế đá. | Biểu tượng `Zzz...` bay lên chầm chậm. |
| `7` | **Cười lớn (Laugh)** | Miệng há to, thân rung giật nhịp nhàng. | Bong bóng biểu cảm mặt cười toả sáng. |

### 3. Hoạt ảnh Hiệu Ứng Môi Trường & Minigame
- **Vòng Quay May Mắn:** Xoay tròn đều giảm tốc dần theo hàm ma sát $v(t) = v_0 \times (0.97)^t$. Kim chỉ số rung lắc nảy lên khi chạm vào chốt ngăn giữa các ô số.
- **Đua Thú Pet Racing:** 5 đường đua độc lập. Thú cưng có hoạt ảnh 4 frame chạy nước rút, hiệu ứng đám mây bụi (`d00`..`d04`) phun ra sau đuôi chân.
- **Hiệu ứng Cánh Thiên Thần:** 2 cánh tự do vẫy theo chu kỳ sóng Sin $y_{\text{wing}} = A \sin(\omega t)$, phát ra bụi sao lấp lánh (sparkles).

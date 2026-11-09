# BÁO CÁO KIỂM TOÁN CƠ CHẾ RENDER BẢN ĐỒ GỐC DÙNG CHUNG CHO 8 KHU VỰC
## AVATAR TEAMOBI 2.5.8 JAVA ME → WEB ENGINE

> **Mục tiêu kiểm toán:** Phân tích toàn bộ mã nguồn Java Client gốc (`ir.java`, `ae.java`, `ce.java`, `ht.java`, `ks.java`, `do.java`) và Java Server (`AvatarService.java`, `Zone.java`, `Map.java`) để xác định chính xác kiến trúc render bản đồ dùng chung cho cả 8 khu vực và nguyên nhân cốt lõi khiến WebGL hiển thị thiếu/sai bản đồ.

---

## 1. TỔNG QUAN CHUỖI XỬ LÝ (PIPELINE)
Quá trình hiển thị bản đồ trong Avatar Teamobi vận hành qua 7 mắt xích dùng chung:
```
Map ID ──> Map Data ──> Tileset ──> Tile Index ──> Object/Sprite ──> Render Layer ──> Camera
```

---

## 2. BẢNG CHI TIẾT 8 KHU VỰC: TỪ MAP ID ĐẾN TÀI NGUYÊN GỐC

| STT | Khu Vực | Map ID Server (`by2`) | File Map Client (`by2 + 1`) | Kích thước (Tiles: Rộng x Cao) | Chiều cao `f` (`ir.java`) | Background Parallax (`byte h[]`) | Đối tượng Object/Sprite chính (`ks.java`) |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | **Khu nhà ở** | `21` | `/assets/maps/22` | **50 x 7** (1200 x 168 px) | `7` | `0` (Phố thị) | Nhà dân (175, 176, 177), Hàng rào (835), Cây xanh (836, 837, 838), Biển báo (4) |
| **2** | **Khu sinh thái** | `13` | `/assets/maps/14` | **21 x 8** (504 x 192 px) | `8` | `3` (Rừng sinh thái) | Đài quan sát (831), Hàng rào sinh thái (835), Bến câu cá (186), Đài phun nước (848) |
| **3** | **Sân bay** | `20` | `/assets/maps/21` | **24 x 11** (576 x 264 px) | `11` | `-1` (Không dùng nền h) | Nhà ga sân bay (830), Cột radar / Tháp không lưu (834), Cây đường băng (837) |
| **4** | **Khu giải trí** | `9` | `/assets/maps/10` | **42 x 8** (1008 x 192 px) | `8` | `0` (Phố thị) | Cung điện Casino (830), Cổng vòm (828), Bàn chơi cờ/bài (1030, 1032, 1034), Vòng quay may mắn (1075) |
| **5** | **Khu mua sắm** | `23` | `/assets/maps/24` | **44 x 8** (1056 x 192 px) | `8` | `0` (Phố thị) | Trung tâm thương mại (829), Siêu thị (832, 833), Kệ hàng/quầy trưng bày (1033, 1035, 1037) |
| **6** | **Công viên** | `11` | `/assets/maps/12` | **44 x 8** (1056 x 192 px) | `8` | `1` (Công viên xanh) | Cổng chào công viên (204), Cầu dạo bộ (130), Ghế đá/Đèn công viên (840), Hàng rào hoa (835) |
| **7** | **Khu ngoại ô** | `17` | `/assets/maps/18` | **27 x 6** (648 x 144 px) | `6` | `2` (Ngoại ô ven sông) | Nhà tranh/Trang trại ngoại ô (836), Cây cổ thụ (837), Đèn đường (1031), Ghế nghỉ (1036) |
| **8** | **Nông trại** | `25` | `/assets/maps/26` | **27 x 7** (648 x 168 px) | `7` | `2` (Ngoại ô ven sông) | Cối xay gió (842), Chuồng gia súc/nhà kho (831, 843), Giếng nước (841), Cổng trại (828), Ao cá (848) |

---

## 3. PHÂN TÍCH TỪNG MẮT XÍCH TRONG ENGINE GỐC

### 3.1. Map ID & Cơ Chế Chuyển File (`ae.java` & `ce.java`)
- **Server:** Gửi packet `Cmd.AVATAR_JOIN_PARK` (opcode `50`) với `mapId` (giá trị byte từ `0` đến `108`).
- **Client Java ME (`ae.java` dòng 480):** 
  ```java
  ir.l.removeAllElements();
  main.a.x.e(by2 + 1); // by2 là mapId từ server, chuyển sang file index (by2 + 1)
  ```
- **Bộ đọc file (`ir.java` dòng 949):**
  Hàm `ir.d(n2)` mở entry `"" + n2` trong archive `/a.clazz`. Do đó, `Map ID` luôn lệch `+1` so với tên file nhị phân trên đĩa (`/assets/maps/10` cho Map 9, `/assets/maps/22` cho Map 21, v.v.).

---

### 3.2. Map Data & Kích Thước Bản Đồ (`ir.java` dòng 1050-1199)
- **Cấu trúc file:** File nhị phân thuần chứa một mảng bytes liên tục, mỗi byte đại diện cho 1 tile.
- **Công thức tính kích thước trong Java gốc:**
  - Chiều cao `f` (Height in Tiles) được quy định cứng theo `switch (mapId)` trong `ir.java` dòng 1050-1115 (ví dụ: Map 21 có `f = 7`, Map 9 có `f = 8`, Map 20 có `f = 11`, Map 17 có `f = 6`).
  - Chiều rộng `e` (Width in Tiles) được tính động:
    $$\text{Width (e)} = \frac{\text{file.available()}}{\text{Height (f)}}$$
  - Tổng số tile: $N = e \times f$.
  - Mảng tile thế giới: $d[n]$, với tọa độ pixel:
    $$X_{\text{px}} = (n \pmod e) \times 24, \quad Y_{\text{px}} = \lfloor n / e \rfloor \times 24$$

---

### 3.3. Tileset (`ir.java` & `ht.java`)
- **Asset gốc:** 
  - Ban ngày: `/assets/tileset/tileset0.png` (kèm palette `h0`).
  - Ban đêm: `/assets/tileset/tileset1.png` (kèm palette `h1`).
- **Kích thước ảnh Tileset:** `168 x 432 px`.
- **Kích thước mỗi tile:** `24 x 24 px` (`ir.i = 24`).
- **Bố cục Tileset:** Gồm đúng `7 cột` và `18 dòng` (tổng cộng $7 \times 18 = 126$ tiles, index từ `0` đến `125`).
- **Công thức tra cứu tọa độ cắt tile (`ht.java` dòng 21 & `ir.java` dòng 873-874):**
  Java client chia theo chiều dọc (18 dòng mỗi cột):
  $$\text{Cột (X index)} = \lfloor \text{tileIndex} / 18 \rfloor \implies \text{srcX} = \text{Cột} \times 24$$
  $$\text{Dòng (Y index)} = \text{tileIndex} \pmod{18} \implies \text{srcY} = \text{Dòng} \times 24$$

---

### 3.4. Tile Index & Mã Định Danh Đặc Biệt (`Tile Code >= 126`)
Trong file map nhị phân gốc, Avatar **không** nhúng thông tin đối tượng vào một file JSON hay XML riêng. Thay vào đó, lập trình viên Teamobi sử dụng các mã tile đặc biệt ($\ge 126$) làm **Marker Spawn**:

1. **Khi quét file map:** Nếu gặp mã $\ge 126$, engine sẽ:
   - Tạo mới một thực thể `ks` (Object lớn) với `partId` tương ứng.
   - Tính tọa độ chân thực thể: $X = (n \pmod e) \times 24 + \Delta X$, $Y = \lfloor n / e \rfloor \times 24 + 20$.
   - Thêm vào danh sách đối tượng thế giới `ir.l.addElement(ks)`.
   - **Ghi đè** mã tile $d[n]$ bằng mã tile nền mặt đất thực sự (ví dụ: gạch, cỏ, đường đi) để dưới chân công trình không bị lỗ hổng đen.

---

### 3.5. Đối Tượng Object / Sprite (`ks.java` & `/assets/home/`)
- Mọi công trình, cây cối, nhà cửa trong 8 khu vực đều là các sprite kích thước lớn được lưu trữ trong thư mục `/assets/home/${partId}.png` (trích xuất từ `home.av`):
  - `828.png`: Cổng rào, trụ đá lối vào.
  - `829.png`: Tòa nhà trung tâm thương mại / mua sắm.
  - `830.png`: Lâu đài giải trí Casino / Ga sân bay.
  - `831.png`: Nhà kho nông trại / Nhà mái ngói sinh thái.
  - `832.png`, `833.png`: Cửa hàng thời trang, siêu thị tiện lợi.
  - `835.png`: Dãy hàng rào gỗ trang trại / công viên.
  - `836.png`, `837.png`, `838.png`: Các loại cây xanh bóng mát (Cây rẻ quạt, cây cổ thụ, cây tỉa).
  - `840.png`: Ghế đá công viên, trụ đèn đường.
  - `841.png`: Bụi hoa trang trí, giếng nước.
  - `842.png`: Cối xay gió nông trại khổng lồ.
  - `848.png`: Đài phun nước công viên / hồ nước sinh thái.
  - `1030.png` - `1037.png`: Bàn cờ, ghế sofa, quầy bar, kệ trưng bày.
  - `1075.png`: Cây Vòng quay may mắn (Lucky Wheel).

---

### 3.6. Hệ Thống Render Layer (Thứ Tự Vẽ Các Lớp)
Trong Java client (`ir.java`), một khung hình bản đồ được dựng tuần tự qua 5 tầng:

```
┌────────────────────────────────────────────────────────┐
│  TẦNG 4: HUD, Chat Bar, Icon, Thông tin người chơi      │
├────────────────────────────────────────────────────────┤
│  TẦNG 3: Hiệu ứng thời tiết (mưa, lá rơi), Bong bóng chat│
├────────────────────────────────────────────────────────┤
│  TẦNG 2: THỰC THỂ SẮP XẾP THEO TRỤC Y (Y-SORTING)       │
│         - Object bản đồ (Nhà, cây, cối xay gió) [ir.l]  │
│         - NPC bản đồ (Bác tài, Thợ kim hoàn...) [ir.n] │
│         - Nhân vật người chơi (Players)         [ir.m] │
├────────────────────────────────────────────────────────┤
│  TẦNG 1: Tilemap nền mặt đất (Đường xá, thảm cỏ, gạch) │
├────────────────────────────────────────────────────────┤
│  TẦNG 0: Nền trời Parallax (Mây trôi, Dãy núi phía xa) │
└────────────────────────────────────────────────────────┘
```

> **Nguyên tắc Y-Sorting (Thuật toán Thợ vẽ - Painter's Algorithm dòng 885-917):**
> Ở Tầng 2, các đối tượng `l` (nhà, cây), `m` (người chơi) và `n` (NPC) được trộn và vẽ theo thứ tự tọa độ $Y$ tăng dần. Nhờ đó, khi người chơi đi phía sau ngôi nhà/cây ($Y_{\text{player}} < Y_{\text{house}}$), ngôi nhà sẽ che người chơi; khi người chơi đi ra phía trước ($Y_{\text{player}} > Y_{\text{house}}$), người chơi sẽ hiển thị đè lên ngôi nhà một cách tự nhiên.

---

### 3.7. Camera & Viewport (`do.java` & `TilemapRenderer.ts`)
- **Tâm camera:** Bám sát theo tọa độ người chơi:
  $$\text{camX} = \text{player.x} - \lfloor \text{screenW} / 2 \rfloor, \quad \text{camY} = \text{player.y} - \lfloor \text{screenH} / 2 \rfloor$$
- **Giới hạn biên (Clamping):**
  $$\text{camX} = \max\Big(0, \min(\text{mapWidthPx} - \text{screenW}, \text{camX})\Big)$$
  $$\text{camY} = \max\Big(0, \min(\text{mapHeightPx} - \text{screenH}, \text{camY})\Big)$$
- **Khi bản đồ nhỏ hơn màn hình:** Căn giữa bản đồ vào giữa viewport:
  $$\text{camX} = \lfloor (\text{mapWidthPx} - \text{screenW}) / 2 \rfloor$$

---

## 4. XÁC ĐỊNH CHÍNH XÁC NGUYÊN NHÂN WEBGL ĐANG HIỂN THỊ SAI BẢN ĐỒ

Qua kiểm tra toàn bộ mã nguồn của engine web hiện tại (`TilemapRenderer.ts` và `GameWorldScreen.ts`), chúng tôi phát hiện **3 nguyên nhân gốc rễ**:

1. **Chưa triển khai hệ thống Map Objects (Thiếu toàn bộ công trình/cây cối):**
   - Trong `TilemapRenderer.ts`, khi đọc tile marker $\ge 126$, engine chỉ thay thế nó bằng tile cỏ/đất nền để tránh lỗi gap đen, nhưng **hoàn toàn chưa khởi tạo và lưu trữ danh sách đối tượng `MapObject` (`ks.java`)**!
   - Hệ quả: Cả 8 khu vực đều bị "trơ trọi", chỉ thấy mặt đất trơn mà không có Casino (Map 9), không có Cối xay gió (Map 25), không có Nhà ga sân bay (Map 20), không có Dãy nhà ở (Map 21), không có Gian hàng mua sắm (Map 23), không có Đài phun nước (Map 11, 13)!

2. **Chưa đồng bộ lớp Y-Sorting giữa Map Objects và Characters/NPCs:**
   - Trong `GameWorldScreen.ts`, nhân vật và NPC đang được vẽ riêng biệt mà không gộp chung với các công trình/cây cối trên bản đồ để sort theo tọa độ $Y$.
   - Hệ quả: Nhân vật sẽ không thể đi xuyên qua sau các tán cây hay đứng trước bậc thềm cửa nhà đúng chiều sâu 2.5D của game gốc.

3. **Sai lệch thứ tự khởi tạo Map Items động từ Server:**
   - Packet `Cmd.AVATAR_JOIN_PARK` gửi kèm danh sách dynamic `MapItem` (ví dụ vị trí cá trong ao, vị trí cây trồng), engine hiện tại chỉ mới xử lý tĩnh mà chưa nạp danh sách `MapItem` này vào mảng đối tượng thế giới.

---

## 5. GIẢI PHÁP SỬA ĐỔI TẬN GỐC TRÊN ENGINE CHUNG

Sau khi đã xuất báo cáo kiểm toán đầy đủ, quy trình sửa engine sẽ được tiến hành đồng bộ như sau:

1. **Nâng cấp `TilemapRenderer.ts`:**
   - Bổ sung cấu trúc dữ liệu `MapObjectInstance { partId, x, y, layer, animTick }`.
   - Trong hàm `loadMap()`, khi gặp các mã $\ge 126$, tự động tạo thực thể `MapObjectInstance` tương ứng với tọa độ pixel chuẩn theo `ir.java`.
   - Nạp toàn bộ ảnh sprite từ `/assets/home/${partId}.png`.

2. **Nâng cấp cơ chế Render tại `GameWorldScreen.ts`:**
   - Triển khai thuật toán **Y-Sorting chung (Tầng 2)**: Gộp `localPlayer`, `remotePlayers`, `npcs`, và `mapObjects` vào một mảng duy nhất, sắp xếp theo thuộc tính `y` tăng dần trước khi gọi lệnh `paint()`.
   - Điểm neo vẽ công trình: Neo chân đế (`anchor = BOTTOM | HCENTER`).

3. **Kiểm thử nghiệm thu:**
   - Chạy test render tự động trên toàn bộ 8 khu vực và chụp ảnh kiểm chứng để đảm bảo công trình xuất hiện đầy đủ, đúng vị trí và đúng chiều sâu.

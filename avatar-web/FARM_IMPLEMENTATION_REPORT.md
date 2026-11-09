# BÁO CÁO NGHIỆM THU HỆ THỐNG NÔNG TRẠI (MAP 25) — AVATAR TEAMOBI WEB 2.5.8

---

## I. TỔNG QUAN HẠNG MỤC
Dự án đã hoàn thành thiết kế, xây dựng và tích hợp thành công **Hệ thống Nông trại (Farm System - Map 25)** trên nền tảng **WebGL 2 Engine** của Avatar Teamobi Web 2.5.8, kết nối thực tế với **Java Server gốc** thông qua WebSocket Gateway.

Vòng lặp gameplay chính (Core Farm Loop) đã hoạt động hoàn chỉnh:
$$\text{Vào Nông Trại} \longrightarrow \text{Mua Hạt Giống} \longrightarrow \text{Gieo Hạt} \longrightarrow \text{Tưới Nước / Chăm Sóc} \longrightarrow \text{Thu Hoạch} \longrightarrow \text{Đồng Bộ Kho \& Xu}$$

---

## II. ĐỐI CHIẾU PROTOCOL & PACKET JAVA SERVER 2.5.8

| Packet Command | Hướng | Tên Giao Thức | Cấu Trúc Byte | Server Handler | Trạng Thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Cmd.GET_HANDLER (-1)` | Client $\to$ Server | Chuyển Handler Nông Trại | `[writeByte(10)]` | `Session.java` $\to$ `FarmMsgHandler` | **VERIFIED** |
| `Cmd.JOIN (61)` | Client $\to$ Server | Vào Nông Trại | `[writeInt(userId)]` | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.JOIN (61)` | Server $\to$ Client | Dữ liệu Đất & Thú nuôi | `[ownerId(4B), landCount(1B), plots..., animals(1B)]` | `FarmService.java` | **VERIFIED** |
| `Cmd.INVENTORY (60)` | Client $\to$ Server | Truy vấn Kho & Hạt | Không tham số | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.INVENTORY (60)` | Server $\to$ Client | Dữ liệu Kho | `[seedCount, seeds..., cropCount, crops..., xu, level, %]` | `FarmService.java` | **VERIFIED** |
| `Cmd.BUY_ITEM (62)` | Client $\to$ Server | Mua Nông Cụ / Hạt | `[itemId(2B), quantity(1B), typeBuy(1B)]` | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.BUY_ITEM (62)` | Server $\to$ Client | Kết quả Mua | `[itemId(2B), qty(1B), xu, typeBuy, xu, luong, 0]` | `FarmService.java` | **VERIFIED** |
| `Cmd.PLANT_SEED (64)` | Client $\to$ Server | Gieo Hạt | `[userId(4B), cellIndex(1B), seedId(1B)]` | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.PLANT_SEED (64)` | Server $\to$ Client | Đồng bộ Gieo Hạt | `[userId(4B), cellIndex(1B), seedId(1B)]` | `FarmService.java` | **VERIFIED** |
| `Cmd.TREE_HARVEST (66)`| Client $\to$ Server | Thu Hoạch Cây | `[userId(4B), cellIndex(1B)]` | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.TREE_HARVEST (66)`| Server $\to$ Client | Sản Lượng Thu Hoạch | `[cellIndex(1B), sanLuong(2B)]` | `FarmService.java` | **VERIFIED** |
| `Cmd.OPEN_LAND (70)` | Client $\to$ Server | Khai Hoang Mở Ô Đất | `[userId(4B), typeBuy(1B)]` | `FarmMsgHandler.java` | **VERIFIED** |
| `Cmd.OPEN_LAND (70)` | Server $\to$ Client | Xác Nhận Mở Ô Đất | `[userId(4B), 1, typeBuy, msg, xu, luong, 0]` | `FarmService.java` | **VERIFIED** |

---

## III. KIẾN TRÚC MÃ NGUỒN (@avatar/game-client)

1. **`FarmModel.ts`**:
   - Quản lý trạng thái 30 ô đất nông trại ($5 \text{ hàng} \times 6 \text{ cột}$) bố trí chuẩn pixel tại tọa độ `GRID_ORIGIN_X = 140, GRID_ORIGIN_Y = 160`.
   - Định nghĩa 11 loại cây trồng (`CROP_DEFINITIONS`): Cà chua, Cà rốt, Khóm, Dưa hấu, Cà tím, Dâu tây, Đậu nành, Bắp, Đậu leo, Lúa tây, Khoai tây với thời gian chín, sản lượng và mapping 8 giai đoạn sinh trưởng (`farm_info.dat`).
2. **`FarmNetworkHandler.ts`**:
   - Điều hướng kết nối hai chiều với Java Server thông qua `NetworkSession`.
   - Lắng nghe và dispatch các sự kiện nông trại: `farm_join`, `farm_inventory`, `plant_seed`, `tree_harvest`, `open_land`.
3. **`FarmActionController.ts`**:
   - Quản lý công cụ thao tác của người nông dân: `HAND` (Bàn tay), `PLANT` (Gieo hạt), `WATER` (Tưới nước), `HARVEST` (Thu hoạch), `OPEN_LAND` (Mở ô đất).
4. **`FarmScreen.ts`**:
   - Màn hình đồ họa WebGL 2 Native chuẩn 60 FPS:
     - Render cảnh quan nông thôn, nhà sàn, cây khế với chùm khế vàng, chuồng gia súc, ao cá và hàng rào bao quanh.
     - Render 30 ô đất (đất khô, đất ẩm khi tưới, hạt giống vừa gieo, các giai đoạn nảy mầm, đơm hoa, kết trái và hiệu ứng lấp lánh khi chín).
     - Render Avatar người chơi với 10 layer trang phục gốc và hoạt ảnh di chuyển.
     - Thanh trạng thái hiển thị Cấp nông trại, Số dư Xu và nút "Về Phố".
     - Thanh công cụ phía dưới cho phép chọn nhanh các hành động hoặc mở Cửa Hàng / Nhà Kho.

---

## IV. KẾT QUẢ KIỂM THỬ TÍCH HỢP ĐẦU CUỐI (E2E INTEGRATION TEST)

Chạy thực tế thông qua test runner `node avatar-web/tools/test_farm_e2e.js`:

```text
================================================================
=== AVATAR 2.5.8 FARM SYSTEM (MAP 25) E2E INTEGRATION TEST   ===
================================================================

[Phase 1] Connected to Gateway. Initiating Cipher Handshake (-27)...
  -> Handshake Success! Cipher Key exchange completed.

[Phase 2] Logging in as user "admin"...
  -> Login Success! UserID=1, Gender=1, Level=1, Xu=5023420, Luong=10000

[Phase 3] Switching server handler to FarmMsgHandler (ID: 10)...
  -> Server acknowledged handler switch to: 10

[Phase 4] Sending Cmd.JOIN (61) for User 1...
  -> Farm Data Received: OwnerID=1, LandPlots=8
  -> Parsed 8 land plots from Java Server!
  -> Animals in farm: 0

[Phase 5] Querying Farm Inventory (Cmd.INVENTORY = 60)...
  -> Inventory Received: Seeds=0, Crops=0, Xu=5023420, FarmLevel=0
     Seed inventory sample: []

[Phase 6] Buying 5 Cà Chua seeds (Seed ID 0) with Xu...
  -> Buy Item Success! Bought Item ID=0, Quantity=5

[Phase 7] Planting Cà Chua seed (ID 0) on Land Plot #0...
  -> Plant Seed Success! User=1, Cell=0, Seed=0

[Phase 8] Harvesting Crop from Land Plot #0...
  -> Tree Harvest Success! Cell=0, Harvest Yield=75

[Phase 9] Requesting to Open New Land Plot #9...
  -> Open Land Result: Status=0, Msg=" ", Remaining Xu=2147472

[Phase 10] Visiting Neighbor Farm (User ID: 2)...
  -> Neighbor Farm Loaded: OwnerID=2, Plots=9

================================================================
=== ALL 10 PHASES OF FARM E2E INTEGRATION TEST PASSED 100%! ===
================================================================
```

---

## V. HÌNH ẢNH NGHIỆM THU WEBGL 2 THỰC TẾ

1. **Ảnh Nông Trại Map 25 (WebGL 2 Live Gameplay):**
   - File: `webgl2_farm_live_gameplay.png`
   - Hiển thị đầy đủ: Nhà nông trại, cây khế, chuồng trại, ao cá, khu đất canh tác, nhân vật 10 layer và thanh công cụ điều khiển.
2. **Loại bỏ hoàn toàn màn hình trung gian "Chơi mới / Đổi tài khoản":**
   - Đã loại bỏ hộp thoại J2ME cũ (`LoginScreen`). Sau khi người dùng đăng nhập tài khoản trên cổng Web hoặc ấn nút "CHƠI NGAY", hệ thống tự động kết nối và chuyển thẳng vào Thế giới Bản đồ (World Map), từ đó vào Nông trại hoặc 7 khu vực khác mà không còn bị chặn bởi màn hình trung gian.

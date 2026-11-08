# AVATAR TEAMOBI NATIVE WEBGL PORTING - PROGRESS TRACKER

> **Dự án:** Port Avatar Teamobi Java ME (v2.5.8) sang TypeScript WebGL  
> **Nguyên tắc:** Giữ nguyên 100% gameplay, asset, packet, UI, logic gốc (Xem [`PROJECT_RULES.md`](file:///d:/avatarweb2d/PROJECT_RULES.md))  
> **Trạng thái quy ước:** `NOT_STARTED` | `ANALYZING` | `PORTING` | `TESTING` | `VERIFIED` | `BLOCKED`

---

## 1. TỔNG QUAN TIẾN ĐỘ THEO PHASE

| Phase | Tên giai đoạn | Trạng thái | Ghi chú |
|---|---|---|---|
| **Phase 1** | Client Reverse Engineering | **VERIFIED** | Decompile 320 classes, lập class mapping, phân tích entry & loop |
| **Phase 2** | Asset Reverse Engineering | **VERIFIED** | Giải mã container `.av` (khóa `NguyenVanMinh`), trích xuất PNG & phân tích `.dat` |
| **Phase 3** | J2ME Compatibility Layer | **VERIFIED** | Xây dựng Graphics, Image, Sprite, Font, Canvas, IO tương thích WebGL |
| **Phase 4** | Port Game Engine | **VERIFIED** | Port GameCanvas, GameLoop (20 FPS), Input, Tilemap, Avatar Animation |
| **Phase 5** | Port Gameplay & UI | **PORTING** | Login (99.18%), Park World Map, Real Tileset, Multi-player Chat |
| **Phase 6** | Network Porting & Gateway | **VERIFIED** | Packet framing, Key handshake (-27), WebSocket <-> TCP Gateway |
| **Phase 7** | Visual Fidelity & Pixel Art | **VERIFIED** | Audit tỷ lệ tương đồng >99% cho Splash và Login; Tilemap gốc 24x24 |
| **Phase 8** | Multiplayer Integration Test | **VERIFIED** | Kiểm thử 2 client đồng thời vào Java Server 19128 thật (move + chat) |
| **Phase 9** | Performance & Full Gameplay | **PORTING** | Farm, Inventory, Shop, Casino, Fishing, Mobile virtual controls |

---

## 2. BẢNG THEO DÕI CHI TIẾT THEO MODULE

| ID | Module Name | Java Source Reference | TypeScript Package / Path | Status | Chi tiết tính năng đã port / kiểm thử |
|---|---|---|---|---|---|
| **MOD-01** | JAR Decompiler & Class Mapping | `Avatar258.jar` (all classes) | `docs/reverse-engineering/CLASS_MAPPING.md` | **VERIFIED** | Decompile toàn bộ 320 class bằng CFR, lập bảng tra cứu |
| **MOD-02** | AV Container Decryptor | `c.java` | `tools/asset-extractor/extract_av.py` | **VERIFIED** | Giải mã XOR 13 byte `NguyenVanMinh`, trích xuất 100% PNG hợp lệ |
| **MOD-03** | DAT File Decoders | `Utils.java`, `PartManager.java` | `tools/dat-decoder/decode_dat.py` | **VERIFIED** | Phân tích binary stream cho `part_*.dat`, `map_item_type.dat`, `farm_info.dat` |
| **MOD-04** | Protocol & Packet Wire Format | `Session.java`, `Message.java`, `kt.java`, `jr.java`, `gv.java` | `packages/protocol/` | **VERIFIED** | Bắt tay packet `-27`, mã hóa xoay vòng `writeKey`/`readKey`, DataInput/OutputStream |
| **MOD-05** | WebSocket TCP Gateway | `Session.java` (Port 19128) | `packages/web-gateway/` | **VERIFIED** | Cầu nối trong suốt WebSocket binary <-> Java Server TCP socket |
| **MOD-06** | J2ME Graphics & WebGL Renderer | `javax.microedition.lcdui.Graphics` | `packages/j2me-compat/src/graphics/` | **VERIFIED** | Lớp vẽ 2D/WebGL tương thích `drawRegion`, `drawImage`, `setClip`, `translate`, `fillRect`, `fillArc` |
| **MOD-07** | Bitmap Font Engine | `cs.java`, `dh.java` | `packages/game-client/src/renderer/BitmapFont.ts` | **VERIFIED** | 8 bộ font bitmap (normal, border, arial, black, number, smallRed, smallYellow, big) |
| **MOD-08** | FrameImage & SpriteSheet | `ht.java` | `packages/game-client/src/renderer/FrameImage.ts` | **VERIFIED** | Cắt frame và vẽ sprite theo `drawRegion` và `Sprite.TRANS_*` |
| **MOD-09** | GameCanvas & Game Loop | `main.a` | `packages/game-client/src/runtime/GameCanvas.ts` | **VERIFIED** | Vòng lặp 20 FPS (50ms/frame), 11 lớp render, quản lý bàn phím & cảm ứng |
| **MOD-10** | UI Skin & SoftKey Painter | `gy.java`, `gw.java`, `by.java` | `packages/game-client/src/ui/UISkinPainter.ts` | **VERIFIED** | Vẽ 3 nút điều khiển mềm (Trái, Giữa, Phải), khung viền cửa sổ `round.on` |
| **MOD-11** | Splash & Login Screen | `jv.java`, `es.java` | `packages/game-client/src/gameplay/LoginScreen.ts` | **VERIFIED** | Logo TeaMobi, giao diện đăng nhập đạt độ tương đồng 99.18% |
| **MOD-12** | Map & Tilemap Engine | `ir.java`, `ae.java` | `packages/game-client/src/maps/TilemapRenderer.ts` | **VERIFIED** | Đọc byte map `a.clazz` (Map 11 Công Viên), ghép tileset 168x432 24x24 ngày/đêm, camera viewport |
| **MOD-13** | Avatar & Character Animation | `js.java`, `gx.java`, `hn.java`, `fa.java` | `packages/game-client/src/characters/AvatarRenderer.ts` | **VERIFIED** | Ghép trang bị nhiều lớp (`zorder`), cắt sprite atlas từ `avatar_img_data`, 15 frame theo hướng |
| **MOD-14** | Multiplayer Real-time Sync | `AvatarService.java`, `ParkMsgHandler.java` | `packages/game-client/src/network/NetworkSession.ts` | **VERIFIED** | Kiểm thử 2 client thực tế (`admin` & `ad`), thấy nhau, đồng bộ di chuyển và chat |
| **MOD-15** | 12 Gameplay Systems Suite | `AvatarService.java`, `NpcHandler.java`, `User.java` | `tests/gameplay/gameplay_systems_test.js` | **VERIFIED** | Hoàn thành và kiểm thử 12 hệ thống gameplay chuẩn Java server: (1) Character Creation (-35), (2) Customization (-48), (3) Movement & Interaction (54, -61), (4) Inventory (-47), (5) Equipment (-36), (6) Item Usage (-48/65), (7) NPC Dialogue (-59), (8) Shop (-24), (9) House (-65), (10) Quest (Dialogue Tree), (11) Currency (-33), (12) Social Interaction (57, 59, 55) |
| **MOD-16** | Farm System & Animal Care | `FarmMsgHandler.java`, `farmItem.java` | `packages/game-client/src/gameplay/FarmScreen.ts` | `PORTING` | Nông trại Map 26, đất trồng, cây cối, thu hoạch, cho gà ăn |
| **MOD-17** | Shop & NPC Dialog Engine | `NpcHandler.java`, `BossShopHandler.java` | `packages/game-client/src/gameplay/GameWorldScreen.ts` | **VERIFIED** | Hội thoại NPC tương tác, Menu Option (-59), mua đồ shop (-24) và popup nhập dữ liệu (-60) |

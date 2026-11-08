# AVATAR TEAMOBI DAT FILE SPECIFICATION

Tài liệu đặc tả toàn bộ định dạng file nhị phân `.dat` được sử dụng trong Avatar 2.5.8 (Client và Server).

## 1. NGUYÊN TẮC CHUNG (JAVA BIG-ENDIAN DATASTREAM)

Mọi file `.dat` của Avatar Teamobi đều được đóng gói bằng `java.io.DataOutputStream` chuẩn MIDP 2.0 / Java SE:
- Thứ tự byte: **Big-Endian** (Most Significant Byte first).
- Kiểu dữ liệu nguyên thủy:
  - `byte` / `boolean`: 1 byte (signed `int8` / `uint8`).
  - `short`: 2 bytes signed (`int16`, `>h`).
  - `ushort`: 2 bytes unsigned (`uint16`, `>H`).
  - `int`: 4 bytes signed (`int32`, `>i`).
  - `long`: 8 bytes signed (`int64`, `>q`).
  - `UTF String`: 2 bytes độ dài unsigned (`ushort`), tiếp theo là mảng byte UTF-8 tương ứng.

---

## 2. CHI TIẾT CÁC ĐỊNH DẠNG DAT CHÍNH

### 2.1 Character Parts: `res/p/part_*.dat`
File mô tả từng món trang bị hoặc bộ phận nhân vật (tóc, áo, quần, mũ, cánh, phụ kiện...).

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `id` | `short` | ID duy nhất của part (trùng với số trên tên file) |
| `coin` | `int` | Giá tiền Xu (-1 nếu không bán bằng xu) |
| `gold` | `int` / `short` | Giá tiền Lượng (-1 nếu không bán bằng lượng) |
| `name` | `UTF String` | Tên trang bị (Tiếng Việt có dấu UTF-8) |
| `sell` | `byte` | Cờ cho phép bán lại (0 = không, 1 = có) |
| `icon` | `short` | ID icon hiển thị trong túi đồ / shop |
| `type` | `short` | Loại part (-2: body part, -1: regular cloth, >=0: specific slot) |
| `zOrder` | `byte` | Thứ tự vẽ (layer) khi render nhân vật |
| `gender` | `byte` | Giới tính (0: nam, 1: nữ, 2: chung) |
| `level` | `byte` | Cấp độ yêu cầu để mặc |
| `frames` | Mảng cố định 15 frame | Bộ chuyển động 15 frame của nhân vật: |
| `imgID[15]` | `short[15]` | ID ảnh cắt từ Big Image cho từng frame |
| `dx[15]` | `byte[15]` | Tọa độ lệch x tương đối so với gốc nhân vật |
| `dy[15]` | `byte[15]` | Tọa độ lệch y tương đối so với gốc nhân vật |

---

### 2.2 Map Item Types: `res/data/map_item_type.dat`
Mô tả các loại đồ đạc, kiến trúc, cây cối, chướng ngại vật đặt trên bản đồ.

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `numItem` | `short` | Tổng số lượng loại item trong file |
| **Vòng lặp mỗi item:** | | |
| `id` | `short` | ID loại item |
| `name` | `UTF String` | Tên đối tượng |
| `des` | `UTF String` | Mô tả chi tiết |
| `imgID` | `short` | ID ảnh lớn chứa sprite của item |
| `iconID` | `short` | ID icon |
| `dx` | `byte` | Tọa độ vẽ offset X |
| `dy` | `byte` | Tọa độ vẽ offset Y |
| `price_coin` | `short` | Giá mua bằng Xu |
| `price_gold` | `short` | Giá mua bằng Lượng |
| `buy` | `byte` | Cờ cho phép mua |
| `pn` | `byte` | Số lượng ô chiếm dụng trên ma trận bản đồ |
| `position[pn]` | `byte x, byte y` | Danh sách các ô chiếm dụng tương đối (collision) |

---

### 2.3 Map Items: `res/data/map_item.dat`
Tọa độ và vị trí cụ thể của các item được đặt cố định trên bản đồ thành phố / phòng.

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `numItem` | `short` | Số lượng item |
| **Vòng lặp mỗi item:** | | |
| `id` | `short` | ID của item instance |
| `typeID` | `short` | ID loại (tham chiếu tới `map_item_type`) |
| `type` | `byte` | Phân loại item |
| `x` | `byte` | Tọa độ ô lưới X |
| `y` | `byte` | Tọa độ ô lưới Y |

---

### 2.4 Farm Info: `res/data/farm_info.dat`
Dữ liệu nông trại: hạt giống, cây trồng, chu kỳ sinh trưởng, thời gian thu hoạch.

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `count` | `short` | Số loại cây trồng / hạt giống |
| **Vòng lặp mỗi loại cây:** | | |
| `id` | `short` | ID cây trồng |
| `name` | `UTF String` | Tên cây (Cà chua, Cà rốt, Lúa, Dưa hấu...) |
| `icon` | `short` | ID icon |
| `harvestTime` | `int` | Thời gian chín (tính bằng giây) |
| `exp` | `short` | Kinh nghiệm nhận được khi thu hoạch |
| `output` | `short` | Sản lượng nông sản mỗi ô |
| `buyCoin` | `int` | Giá mua hạt giống bằng Xu |
| `sellCoin` | `int` | Giá bán nông sản cho lái buôn |

---

### 2.5 Food Info: `res/data/food.dat`
Thức ăn chăn nuôi hoặc vật phẩm hồi phục sức khỏe.

| Trường | Kiểu dữ liệu | Mô tả |
|---|---|---|
| `numItem` | `short` | Số lượng món ăn |
| **Vòng lặp mỗi món:** | | |
| `id` | `short` | ID món |
| `name` | `UTF String` | Tên món ăn |
| `desc` | `UTF String` | Mô tả tác dụng |
| `price` | `int` | Giá mua |
| `shop` | `byte` | ID cửa hàng bán |
| `imgId` | `short` | ID ảnh hiển thị |

---

### 2.6 Effects: `res/data/effect/*.dat`
Dữ liệu hoạt cảnh động (hiệu ứng thời tiết, mưa, tuyết, pháo hoa, lên cấp, biểu cảm).
Chứa chuỗi các frame cắt từ các texture hiệu ứng trong `normal/effect.av`.

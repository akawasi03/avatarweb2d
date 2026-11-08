import os
import sys
import struct
import json

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass


class BinaryReader:
    def __init__(self, data: bytes):
        self.data = data
        self.pos = 0

    def has_more(self):
        return self.pos < len(self.data)

    def remaining(self):
        return len(self.data) - self.pos

    def read_byte(self) -> int:
        b = struct.unpack_from('>b', self.data, self.pos)[0]
        self.pos += 1
        return b

    def read_ubyte(self) -> int:
        b = self.data[self.pos]
        self.pos += 1
        return b

    def read_boolean(self) -> bool:
        return self.read_ubyte() != 0

    def read_short(self) -> int:
        val = struct.unpack_from('>h', self.data, self.pos)[0]
        self.pos += 2
        return val

    def read_ushort(self) -> int:
        val = struct.unpack_from('>H', self.data, self.pos)[0]
        self.pos += 2
        return val

    def read_int(self) -> int:
        val = struct.unpack_from('>i', self.data, self.pos)[0]
        self.pos += 4
        return val

    def read_utf(self) -> str:
        length = self.read_ushort()
        val = self.data[self.pos:self.pos+length].decode('utf-8', errors='replace')
        self.pos += length
        return val

    def read_bytes(self, length: int) -> bytes:
        val = self.data[self.pos:self.pos+length]
        self.pos += length
        return val


def decode_part_dat(file_path: str):
    with open(file_path, 'rb') as f:
        data = f.read()
    r = BinaryReader(data)
    part_id = r.read_short()
    coin = r.read_int()
    gold = r.read_int()
    name = r.read_utf()
    sell = r.read_byte() if r.remaining() > 0 else 0
    icon = r.read_short() if r.remaining() >= 2 else 0
    part_type = r.read_short() if r.remaining() >= 2 else -1
    z_order = r.read_byte() if r.remaining() > 0 else 0
    gender = r.read_byte() if r.remaining() > 0 else 0
    level = r.read_byte() if r.remaining() > 0 else 0
    
    # 15 animation frames
    img_ids = []
    dx = []
    dy = []
    if r.remaining() >= 15 * 4: # 15 shorts + 15 bytes + 15 bytes = 60 bytes
        for _ in range(15):
            img_ids.append(r.read_short())
        for _ in range(15):
            dx.append(r.read_byte())
        for _ in range(15):
            dy.append(r.read_byte())
            
    return {
        'id': part_id,
        'name': name,
        'coin': coin,
        'gold': gold,
        'sell': sell,
        'icon': icon,
        'type': part_type,
        'zOrder': z_order,
        'gender': gender,
        'level': level,
        'frames': {
            'imgIDs': img_ids,
            'dx': dx,
            'dy': dy
        }
    }


def decode_map_item_type(file_path: str):
    with open(file_path, 'rb') as f:
        data = f.read()
    r = BinaryReader(data)
    count = r.read_short()
    items = []
    for _ in range(count):
        item_id = r.read_short()
        name = r.read_utf()
        price = r.read_int()
        icon = r.read_short()
        type_val = r.read_byte()
        dx = r.read_byte()
        dy = r.read_byte()
        w = r.read_byte()
        h = r.read_byte()
        items.append({
            'id': item_id,
            'name': name,
            'price': price,
            'icon': icon,
            'type': type_val,
            'dx': dx,
            'dy': dy,
            'w': w,
            'h': h
        })
    return items


def main():
    test_part = r"d:\avatarweb2d\Avatar-Sv-master-master\res\p\part_6778.dat"
    if os.path.exists(test_part):
        decoded = decode_part_dat(test_part)
        print("Decoded part_6778:", json.dumps(decoded, ensure_ascii=False, indent=2))
        
    test_item = r"d:\avatarweb2d\Avatar-Sv-master-master\res\data\map_item_type.dat"
    if os.path.exists(test_item):
        items = decode_map_item_type(test_item)
        print(f"Decoded map_item_type.dat ({len(items)} items). First item:", json.dumps(items[0], ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()

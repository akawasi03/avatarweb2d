import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

def classify_part(p):
    name = (p.get('name') or '').lower()
    z = p.get('zorder', 0)
    
    # 1. Cánh sau / Back items / Halo / Tails
    if any(k in name for k in ['cánh', 'phi phong', 'áo choàng', 'đuôi', 'balo', 'cặp sách', 'hào quang', 'đĩa bay']) and not any(k in name for k in ['cài tóc', 'vương miện', 'mảnh ghép', 'thuốc']):
        return 1, "Cánh sau"
    if z == 3 or z == 5 or z == 6:
        return 1, "Cánh sau"
        
    # 2. Thân (Body)
    if 'thân' in name and z == 20:
        return 4, "Áo" # or 2 for Body
        
    # 3. Quần (Pants)
    if z == 10 or any(k in name for k in ['quần', 'váy', 'short', 'quần đùi', 'quần tây']):
        return 3, "Quần"
        
    # 4. Áo (Shirt)
    if z == 20 or any(k in name for k in ['áo', 'sơ mi', 'thun', 'comple', 'vest', 'đầm', 'yếm']):
        return 4, "Áo"
        
    # 5. Đầu (Head base shape)
    if z == 30 or any(k in name for k in ['tròn', 'mập', 'nhọn', 'mặt tròn', 'mặt nhọn', 'đầu trọc']):
        return 5, "Đầu"
        
    # 6. Khuôn mặt (Face expression / mouth / mask / blushing)
    if z == 52 or any(k in name for k in ['khẩu trang', 'lêu lêu', 'má hồng', 'mũi hề', 'mặt nạ', 'râu', 'ngậm']):
        return 6, "Khuôn mặt"
        
    # 7. Mắt (Eyes)
    if z == 40 or name.startswith('mat ') or any(k in name for k in ['mắt']):
        return 7, "Mắt"
        
    # 8. Tóc (Hair)
    if (z == 50 or 'tóc' in name) and not any(k in name for k in ['cài tóc', 'kẹp tóc', 'hoa cài tóc', 'băng đô']):
        return 8, "Tóc"
        
    # 9. Nón (Hats / Caps / Head accessories / Glasses / Earrings)
    if z in [53, 54, 60] or any(k in name for k in ['nón', 'mũ', 'vương miện', 'kính', 'băng đô', 'tai mèo', 'sừng', 'cài tóc', 'kẹp tóc', 'bông tai', 'hoa cài']):
        return 9, "Nón"
        
    # 10. Cầm tay (Handheld)
    if z == 70 or any(k in name for k in ['cầm', 'bong bóng', 'kẹo', 'hoa', 'kiếm', 'đàn', 'chong chóng', 'quạt', 'gậy', 'trượng', 'khiên', 'cờ', 'cục vàng', 'kem']):
        return 10, "Cầm tay"
        
    # Fallback to zorder based layer
    if z <= 5: return 1, "Cánh sau"
    if z <= 10: return 3, "Quần"
    if z <= 20: return 4, "Áo"
    if z <= 30: return 5, "Đầu"
    if z <= 40: return 7, "Mắt"
    if z <= 50: return 8, "Tóc"
    if z <= 60: return 9, "Nón"
    return 10, "Cầm tay"

layer_counts = {}
for pid, p in parts.items():
    l_num, l_name = classify_part(p)
    layer_counts[l_num] = layer_counts.get(l_num, 0) + 1

for l_num in sorted(layer_counts.keys()):
    print(f"Layer {l_num:2d}: count={layer_counts[l_num]:4d}")

import json
import os
from PIL import Image

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
web_dir = r"D:\avatarweb2d\avatar-web\public"

with open(os.path.join(web_dir, 'assets', 'data', 'avatar_parts.json'), 'r', encoding='utf-8') as f:
    parts = json.load(f)

with open(os.path.join(web_dir, 'assets', 'data', 'avatar_img_data.json'), 'r', encoding='utf-8') as f:
    slices = json.load(f)

def get_layer(p):
    name = (p.get('name') or '').lower()
    z = p.get('zorder', 0)
    
    # 1. Cánh sau
    if any(k in name for k in ['cánh', 'phi phong', 'áo choàng', 'đuôi', 'balo', 'cặp sách', 'hào quang', 'đĩa bay']) and not any(k in name for k in ['cài tóc', 'vương miện', 'mảnh ghép', 'thuốc']):
        return 1
    if z == 3 or z == 5 or z == 6:
        return 1
    # 3. Quần
    if z == 10 or any(k in name for k in ['quần', 'váy', 'short', 'quần đùi', 'quần tây']):
        return 3
    # 4. Áo
    if z == 20 or any(k in name for k in ['áo', 'sơ mi', 'thun', 'comple', 'vest', 'đầm', 'yếm']):
        return 4
    # 5. Đầu
    if z == 30 or any(k in name for k in ['tròn', 'mập', 'nhọn', 'mặt tròn', 'mặt nhọn', 'đầu trọc']):
        return 5
    # 6. Khuôn mặt
    if z == 52 or any(k in name for k in ['khẩu trang', 'lêu lêu', 'má hồng', 'mũi hề', 'mặt nạ', 'râu', 'ngậm']):
        return 6
    # 7. Mắt
    if z == 40 or name.startswith('mat ') or any(k in name for k in ['mắt']):
        return 7
    # 8. Tóc
    if (z == 50 or 'tóc' in name) and not any(k in name for k in ['cài tóc', 'kẹp tóc', 'hoa cài tóc', 'băng đô']):
        return 8
    # 9. Nón
    if z in [53, 54, 60] or any(k in name for k in ['nón', 'mũ', 'vương miện', 'kính', 'băng đô', 'tai mèo', 'sừng', 'cài tóc', 'kẹp tóc', 'bông tai', 'hoa cài']):
        return 9
    # 10. Cầm tay
    if z == 70 or any(k in name for k in ['cầm', 'bong bóng', 'kẹo', 'hoa', 'kiếm', 'đàn', 'chong chóng', 'quạt', 'gậy', 'trượng', 'khiên', 'cờ']):
        return 10
    
    if z <= 5: return 1
    if z <= 10: return 3
    if z <= 20: return 4
    if z <= 30: return 5
    if z <= 40: return 7
    if z <= 50: return 8
    if z <= 60: return 9
    return 10

def render_character(wearing_ids, frame_idx=0):
    # Ensure default head (0) and eyes (4) if missing
    wearing = list(wearing_ids)
    has_head = any(get_layer(parts.get(str(pid), {})) == 5 for pid in wearing)
    if not has_head:
        wearing.append(0) # Default head 'tròn'
    has_eyes = any(get_layer(parts.get(str(pid), {})) == 7 for pid in wearing)
    if not has_eyes:
        wearing.append(4) # Default eyes 'đen'

    # Collect and sort parts
    parts_list = []
    for pid in wearing:
        p = parts.get(str(pid))
        if p and p.get('animation'):
            parts_list.append(p)
            
    parts_list.sort(key=lambda p: (get_layer(p), p.get('zorder', 0)))

    # Canvas
    char_img = Image.new("RGBA", (120, 140), (0, 0, 0, 0))
    center_x = 60
    base_y = 100

    atlas_cache = {}
    item_cache = {}

    for p in parts_list:
        anim = p['animation']
        frame_data = anim[frame_idx % len(anim)]
        img_id = frame_data['img']
        dx = frame_data['dx']
        dy = frame_data['dy']

        if img_id >= 2000:
            item_path = os.path.join(web_dir, 'res', 'item', f"{img_id}.png")
            if os.path.exists(item_path):
                if img_id not in item_cache:
                    item_cache[img_id] = Image.open(item_path).convert("RGBA")
                src_img = item_cache[img_id]
                draw_x = center_x + dx
                draw_y = base_y + dy
                char_img.alpha_composite(src_img, (draw_x, draw_y))
        elif img_id >= 0:
            sl = slices.get(str(img_id))
            if sl:
                atlas_id = sl['image_id']
                atlas_path = os.path.join(web_dir, 'res', 'big', f"{atlas_id}.png")
                if os.path.exists(atlas_path):
                    if atlas_id not in atlas_cache:
                        atlas_cache[atlas_id] = Image.open(atlas_path).convert("RGBA")
                    atlas = atlas_cache[atlas_id]
                    slice_crop = atlas.crop((sl['x'], sl['y'], sl['x'] + sl['w'], sl['y'] + sl['h']))
                    draw_x = center_x + dx
                    draw_y = base_y + dy
                    char_img.alpha_composite(slice_crop, (draw_x, draw_y))

    return char_img

# Test 1: Admin player wearing [5760, 89, 88, 4, 14, 6314]
im_admin = render_character([5760, 89, 88, 4, 14, 6314])
im_admin.save(os.path.join(art_dir, "test_render_admin_layered.png"))

# Test 2: NPC Quay so [3379, 310, 309, 0, 82, 523, 313, 528]
im_npc = render_character([3379, 310, 309, 0, 82, 523, 313, 528])
im_npc.save(os.path.join(art_dir, "test_render_npc_quayso.png"))

# Test 3: Outfit with hat, hair, shirt, pants, wings, handheld
im_full = render_character([500, 3, 2, 0, 4, 1, 290, 17])
im_full.save(os.path.join(art_dir, "test_render_full_outfit.png"))

print("Successfully rendered test characters with new layered sorting!")

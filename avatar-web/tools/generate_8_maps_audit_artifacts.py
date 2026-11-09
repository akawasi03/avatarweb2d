import os
import sys
from PIL import Image, ImageChops, ImageDraw

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

ARTIFACT_DIR = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
ASSETS_DIR = r"d:\avatarweb2d\avatar-web\public\assets"

MAP_DEFS = [
    {"index": 0, "name": "Khu nhà ở", "mapId": 21, "fileId": 22, "h": 7, "spawn": (120, 72), "bg": 0, "key": "residential"},
    {"index": 1, "name": "Khu sinh thái", "mapId": 13, "fileId": 14, "h": 8, "spawn": (120, 72), "bg": 3, "key": "ecological"},
    {"index": 2, "name": "Sân bay", "mapId": 20, "fileId": 21, "h": 11, "spawn": (120, 144), "bg": -1, "key": "airport"},
    {"index": 3, "name": "Khu giải trí", "mapId": 9, "fileId": 10, "h": 8, "spawn": (120, 72), "bg": 0, "key": "entertainment"},
    {"index": 4, "name": "Khu mua sắm", "mapId": 23, "fileId": 24, "h": 8, "spawn": (120, 72), "bg": 0, "key": "shopping"},
    {"index": 5, "name": "Công viên", "mapId": 11, "fileId": 12, "h": 8, "spawn": (120, 72), "bg": 1, "key": "park"},
    {"index": 6, "name": "Khu ngoại ô", "mapId": 17, "fileId": 18, "h": 6, "spawn": (120, 72), "bg": 2, "key": "suburbs"},
    {"index": 7, "name": "Nông trại", "mapId": 25, "fileId": 26, "h": 7, "spawn": (120, 72), "bg": 2, "key": "farm"}
]

def render_java_map(mdef, tileset_img):
    file_id = mdef["fileId"]
    map_id = mdef["mapId"]
    h_tiles = mdef["h"]
    map_file_path = os.path.join(ASSETS_DIR, "maps", str(file_id))
    
    with open(map_file_path, "rb") as f:
        data = f.read()
    
    w_tiles = len(data) // h_tiles
    total_tiles = w_tiles * h_tiles
    tiles = list(data[:total_tiles])
    
    pixel_w = w_tiles * 24
    pixel_h = h_tiles * 24
    
    # Base sky canvas
    img = Image.new("RGBA", (pixel_w, pixel_h), (93, 190, 247, 255))
    if mdef["bg"] >= 0:
        bg_path = os.path.join(ASSETS_DIR, "bg", f"{mdef['bg']}0.png")
        if os.path.exists(bg_path):
            bg_img = Image.open(bg_path).convert("RGBA")
            for bx in range(0, pixel_w, bg_img.width):
                img.paste(bg_img, (bx, pixel_h - bg_img.height), bg_img)
            
    # Decode markers and collect MapObjects
    map_objects = []
    i = 0
    while i < total_tiles:
        t = tiles[i]
        col = i % w_tiles
        row = i // w_tiles
        px = col * 24
        py = row * 24
        
        if t in [127, 128, 129, 141, 143, 144, 147, 148, 149, 150, 151, 152, 159, 160, 161, 162, 172, 173, 174, 175, 176, 177, 178, 179, 186, 190, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 204, 98]:
            consecutive = 1
            while i + consecutive < total_tiles and (i + consecutive) // w_tiles == row and tiles[i + consecutive] == t:
                consecutive += 1
            span_px = consecutive * 24
            center_x = px + span_px // 2
            
            part_id = -1
            floor = 96
            obj_x = center_x
            obj_y = py + 20
            
            if t == 127: part_id, obj_x, obj_y, floor = 830, px + 36, py + 22, 96
            elif t == 128: part_id, floor = 828, (tiles[i + w_tiles] if i + w_tiles < total_tiles else 5)
            elif t in [129, 160]: part_id, floor = (836 if map_id == 17 else 829), 96
            elif t == 141: part_id, floor = 840, (tiles[i + w_tiles] if i + w_tiles < total_tiles else 5)
            elif t == 143: part_id, floor = 831, 51
            elif t == 144: part_id, floor = 841, 5
            elif t in [147, 161]: part_id, floor = 832, 96
            elif t in [148, 162]: part_id, obj_x, obj_y, floor = (836 if map_id == 17 else 833), px + 48, py + 22, 96
            elif t == 149: part_id, floor = 834, 4
            elif t == 150: part_id, floor = 842, (4 if map_id == 25 else 0)
            elif t == 151: part_id, floor = 843, 0
            elif t == 152: part_id, floor = 835, (55 if map_id == 25 else 0)
            elif t == 159: part_id, floor = 848, (5 if map_id == 25 else (0 if map_id == 13 else 4))
            elif t == 172: part_id, obj_x, obj_y, floor = 836, px + 37, py + 24, 96
            elif t in [173, 179]: part_id, obj_x, obj_y, floor = 837, px + 48, py + 24, 96
            elif t == 174: part_id, obj_x, obj_y, floor = 838, px + 48, py + 24, 96
            elif t == 175: part_id, obj_y, floor = 830, py + 22, 96
            elif t == 176: part_id, obj_y, floor = 829, py + 22, 96
            elif t == 177: part_id, obj_y, floor = 832, py + 22, 96
            elif t == 178: part_id, obj_x, obj_y, floor = 830, px + 24, py + 22, 96
            elif t == 186: part_id, obj_x, obj_y, floor = 974, px + 24, py + 24, 17
            elif t == 190: part_id, obj_x, obj_y, floor = 1029, px + 36, py + 20, 4
            elif t == 192: part_id, obj_x, obj_y, floor = 1034, px + 36, py + 24, 4
            elif t == 193: part_id, obj_x, obj_y, floor = 1032, px + 24, py + 24, 4
            elif t == 194: part_id, obj_x, obj_y, floor = 1030, px + 24, py + 24, 4
            elif t == 195: part_id, obj_x, obj_y, floor = 1037, px + 24, py + 24, 4
            elif t == 196: part_id, obj_x, obj_y, floor = 1035, px + 24, py + 24, 4
            elif t == 197: part_id, obj_x, obj_y, floor = 1033, px + 12, py + 24, 4
            elif t == 198: part_id, obj_x, obj_y, floor = 1036, px + 12, py + 20, 4
            elif t == 199: part_id, obj_x, obj_y, floor = 1031, px + 24, py + 24, 4
            elif t == 200: part_id, obj_x, obj_y, floor = 1075, px + 24, py + 24, 4
            elif t == 201: part_id, obj_x, obj_y, floor = 1094, px + 24, py + 20, 5
            elif t == 202: part_id, obj_x, obj_y, floor = 4, px + 24, py + 24, 96
            elif t in [98, 204]: part_id, obj_y, floor = 846, py + 24, 43
            
            if part_id > 0:
                map_objects.append({"part_id": part_id, "x": obj_x, "y": obj_y})
            for k in range(consecutive):
                tiles[i + k] = floor
            i += consecutive
            continue
        elif t == 139:
            tiles[i] = tiles[i + 1] if col == 0 else tiles[i - 1]
        elif t == 140:
            tiles[i] = 55
        elif t >= 126:
            tiles[i] = tiles[i - 1] if i > 0 and tiles[i - 1] < 126 else 0
        i += 1
        
    # Draw ground tiles
    for idx, t in enumerate(tiles):
        if t < 0: continue
        col = idx % w_tiles
        row = idx // w_tiles
        px = col * 24
        py = row * 24
        
        src_col = t // 18
        src_row = t % 18
        sx = src_col * 24
        sy = src_row * 24
        
        if sx + 24 <= tileset_img.width and sy + 24 <= tileset_img.height:
            tile_crop = tileset_img.crop((sx, sy, sx + 24, sy + 24))
            img.paste(tile_crop, (px, py), tile_crop)
            
    # Y-Sorted MapObjects
    map_objects.sort(key=lambda o: o["y"])
    for obj in map_objects:
        pid = obj["part_id"]
        obj_path = os.path.join(ASSETS_DIR, "home", f"{pid}.png")
        if os.path.exists(obj_path):
            sp_img = Image.open(obj_path).convert("RGBA")
            dx = obj["x"] - sp_img.width // 2
            dy = obj["y"] - sp_img.height
            img.paste(sp_img, (dx, dy), sp_img)
            
    return img, map_objects, w_tiles, h_tiles

def main():
    print("=== GENERATING 8 MAPS JAVA ME VS WEB COMPARISON & DIFF ARTIFACTS ===")
    tileset_path = os.path.join(ASSETS_DIR, "tileset", "tileset0.png")
    tileset_img = Image.open(tileset_path).convert("RGBA")
    
    audit_results = []
    
    for mdef in MAP_DEFS:
        idx = mdef["index"]
        name = mdef["name"]
        mid = mdef["mapId"]
        key = mdef["key"]
        
        print(f"\nProcessing Region {idx}: {name} (Map ID: {mid})...")
        
        # 1. Render Java ME authentic map
        java_full_map, map_objs, wt, ht = render_java_map(mdef, tileset_img)
        
        # Save full Java map
        java_full_path = os.path.join(ARTIFACT_DIR, f"java_ref_map{mid}_{key}.png")
        java_full_map.save(java_full_path)
        print(f"  Saved Java ME reference map: {java_full_path}")
        
        # 2. Load web screenshot
        web_shot_name = f"web_region_{idx}_{key}_map{mid}.png"
        web_shot_path = os.path.join(ARTIFACT_DIR, web_shot_name)
        
        if os.path.exists(web_shot_path):
            web_img = Image.open(web_shot_path).convert("RGBA")
            
            # Create comparison collage: [ Java ME Reference | WebGL Actual | Pixel Diff ]
            # Normalize sizes to 640x360 for side-by-side comparison
            comp_w = 400
            comp_h = 240
            
            j_crop = java_full_map.resize((comp_w, comp_h), Image.Resampling.NEAREST)
            w_crop = web_img.resize((comp_w, comp_h), Image.Resampling.BILINEAR)
            
            # Compute difference
            diff = ImageChops.difference(j_crop.convert("RGB"), w_crop.convert("RGB"))
            
            # Side-by-side collage
            collage = Image.new("RGB", (comp_w * 3, comp_h + 30), (20, 24, 33))
            collage.paste(j_crop, (0, 30))
            collage.paste(w_crop, (comp_w, 30))
            collage.paste(diff, (comp_w * 2, 30))
            
            draw = ImageDraw.Draw(collage)
            draw.text((10, 8), f"Java ME 2.5.8 Reference (Map {mid}: {name})", fill=(255, 255, 255))
            draw.text((comp_w + 10, 8), f"WebGL Live Render (Map {mid})", fill=(56, 189, 248))
            draw.text((comp_w * 2 + 10, 8), "Difference Map (Pixel Diff)", fill=(250, 204, 21))
            
            collage_path = os.path.join(ARTIFACT_DIR, f"comparison_map{mid}_{key}.png")
            collage.save(collage_path)
            print(f"  Saved Comparison Collage: {collage_path}")
            
            # Also save dedicated diff image
            diff_path = os.path.join(ARTIFACT_DIR, f"diff_map{mid}_{key}.png")
            diff.save(diff_path)
        
        audit_results.append({
            "mapId": mid,
            "name": name,
            "key": key,
            "widthTiles": wt,
            "heightTiles": ht,
            "pixelSize": f"{wt*24}x{ht*24} px",
            "objectCount": len(map_objs),
            "spawn": mdef["spawn"],
            "uniqueObjects": sorted(list(set(o["part_id"] for o in map_objs)))
        })
        
    print("\n=== MAP AUDIT RESULTS ===")
    for r in audit_results:
        print(f"Map {r['mapId']} ({r['name']}): Size {r['pixelSize']} ({r['widthTiles']}x{r['heightTiles']} tiles), Objects: {r['objectCount']}, Parts: {r['uniqueObjects']}, Spawn: {r['spawn']}")

if __name__ == "__main__":
    main()

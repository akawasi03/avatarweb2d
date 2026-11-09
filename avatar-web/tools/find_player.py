import os
from PIL import Image

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
gp = Image.open(os.path.join(art_dir, "fullscreen_gameplay_map9_1024x768_4x3.png"))

# Search for the gold nametag of admin
# Gold color is (253, 224, 71) or (250, 204, 21)
width, height = gp.size
admin_spots = []
for y in range(height):
    for x in range(width):
        r, g, b, *a = gp.getpixel((x, y))
        if r > 240 and g > 200 and b < 80: # yellow/gold text
            admin_spots.append((x, y))

if admin_spots:
    min_x = min(p[0] for p in admin_spots)
    max_x = max(p[0] for p in admin_spots)
    min_y = min(p[1] for p in admin_spots)
    max_y = max(p[1] for p in admin_spots)
    print(f"Found gold nametag around ({min_x}, {min_y}) to ({max_x}, {max_y})")
    
    # Crop the character below this nametag
    char_crop = gp.crop((min_x - 40, min_y - 10, max_x + 40, min_y + 80))
    char_crop.save(os.path.join(art_dir, "admin_character_detail.png"))
    print("Saved admin_character_detail.png")
else:
    print("Gold nametag not found directly")

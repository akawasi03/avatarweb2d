import os
from PIL import Image, ImageDraw, ImageFont

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"

devices = [
    {"name": "desktop_1920x1080_16x9", "title": "1. Desktop Full HD 16:9 (1920x1080)"},
    {"name": "laptop_1366x768_16x9", "title": "2. Laptop Widescreen 16:9 (1366x768)"},
    {"name": "tablet_1024x768_4x3", "title": "3. Tablet Chuẩn 4:3 (1024x768)"},
    {"name": "mobile_landscape_844x390", "title": "4. Mobile Landscape (844x390)"},
    {"name": "mobile_portrait_390x844", "title": "5. Mobile Portrait (390x844)"}
]

# Create collage of World Map across devices
thumb_w = 400
thumb_h = 240
canvas_w = thumb_w * 3 + 60
canvas_h = thumb_h * 2 + 160

canvas = Image.new("RGB", (canvas_w, canvas_h), (15, 23, 42))
draw = ImageDraw.Draw(canvas)

draw.rectangle([0, 0, canvas_w, 50], fill=(30, 41, 59))
draw.text((20, 16), "KIỂM THỬ KHÓA ĐỘ PHÂN GIẢI 4:3 (1024x768) TRÊN TẤT CẢ THIẾT BỊ", fill=(56, 189, 248))

for idx, dev in enumerate(devices):
    col = idx % 3
    row = idx // 3
    x = 20 + col * (thumb_w + 20)
    y = 70 + row * (thumb_h + 40)
    
    img_path = os.path.join(art_dir, f"device_{dev['name']}_gameplay.png")
    if os.path.exists(img_path):
        im = Image.open(img_path).convert("RGB")
        # Aspect fit into thumb_w x thumb_h with letterboxing
        scale = min(thumb_w / im.width, thumb_h / im.height)
        new_w = int(im.width * scale)
        new_h = int(im.height * scale)
        im_thumb = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Center in box
        box_x = x + (thumb_w - new_w) // 2
        box_y = y + (thumb_h - new_h) // 2
        
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(51, 65, 85), width=1)
        canvas.paste(im_thumb, (box_x, box_y))
        draw.text((x, y + thumb_h + 6), dev["title"], fill=(250, 204, 21))

out_path = os.path.join(art_dir, "device_4x3_multi_viewport_verification.png")
canvas.save(out_path)
print("Saved 4:3 device collage to:", out_path)

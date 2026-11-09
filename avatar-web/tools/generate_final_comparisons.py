import os
from PIL import Image, ImageDraw, ImageFont

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
target_wm_path = os.path.join(art_dir, ".user_uploaded", "media_1794184046941_ead83f64.jpg")
target_game_path = os.path.join(art_dir, ".user_uploaded", "media_1794218906578_f9d562f2.jpg")

web_wm_path = os.path.join(art_dir, "fullscreen_worldmap_1366x768_16x9.png")
web_game_path = os.path.join(art_dir, "fullscreen_gameplay_map9_1366x768_16x9.png")

def make_comparison(img1_path, img2_path, out_path, title1, title2, main_title):
    im1 = Image.open(img1_path).convert("RGB")
    im2 = Image.open(img2_path).convert("RGB")
    
    # Scale both to width 960 for comparison
    w = 960
    h1 = int(im1.height * w / im1.width)
    h2 = int(im2.height * w / im2.width)
    im1_scaled = im1.resize((w, h1), Image.Resampling.LANCZOS)
    im2_scaled = im2.resize((w, h2), Image.Resampling.LANCZOS)
    
    total_h = max(h1, h2) + 90
    total_w = w * 2 + 40
    
    canvas = Image.new("RGB", (total_w, total_h), (15, 23, 42))
    draw = ImageDraw.Draw(canvas)
    
    # Header
    draw.rectangle([0, 0, total_w, 48], fill=(30, 41, 59))
    draw.text((20, 14), main_title, fill=(56, 189, 248))
    
    # Titles
    draw.text((20, 56), title1, fill=(250, 204, 21))
    draw.text((w + 30, 56), title2, fill=(74, 222, 128))
    
    # Paste images
    canvas.paste(im1_scaled, (10, 80))
    canvas.paste(im2_scaled, (w + 30, 80))
    
    canvas.save(out_path)
    print(f"Generated comparison: {out_path}")

make_comparison(
    target_wm_path,
    web_wm_path,
    os.path.join(art_dir, "comparison_world_map_target_vs_web.png"),
    "TARGET (Unity / HD Reference Client - Attachment 2)",
    "CURRENT WEBGL (Full Viewport 1366x768 Native Resolution)",
    "AVATAR WEB - WORLD MAP SELECTION FULLSCREEN COMPARISON"
)

make_comparison(
    target_game_path,
    web_game_path,
    os.path.join(art_dir, "comparison_gameplay_map9_target_vs_web.png"),
    "TARGET (Unity WebGL Reference - Attachment 5)",
    "CURRENT WEBGL (Full Viewport 1366x768 Native 1:1 Resolution)",
    "AVATAR WEB - GAMEPLAY MAP 9 FULLSCREEN & AUTHENTIC HUD COMPARISON"
)

import os
from PIL import Image

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
target_wm_path = os.path.join(art_dir, ".user_uploaded", "media_1794184046941_ead83f64.jpg")
target_game_path = os.path.join(art_dir, ".user_uploaded", "media_1794218906578_f9d562f2.jpg")

web_wm_path = os.path.join(art_dir, "web_world_map_fullscreen_1366x768.png")
web_game_path = os.path.join(art_dir, "web_gameplay_fullscreen_1366x768.png")

# Compare World Map
if os.path.exists(target_wm_path) and os.path.exists(web_wm_path):
    twm = Image.open(target_wm_path).convert("RGB")
    wwm = Image.open(web_wm_path).convert("RGB")
    
    # Resize to standard width 1000 for side by side
    target_w = 900
    th1 = int(twm.height * target_w / twm.width)
    th2 = int(wwm.height * target_w / wwm.width)
    twm_resized = twm.resize((target_w, th1), Image.Resampling.LANCZOS)
    wwm_resized = wwm.resize((target_w, th2), Image.Resampling.LANCZOS)
    
    comp_h = max(th1, th2)
    comp_wm = Image.new("RGB", (target_w * 2 + 30, comp_h + 60), (20, 24, 33))
    
    comp_wm.paste(twm_resized, (10, 50))
    comp_wm.paste(wwm_resized, (target_w + 20, 50))
    
    comp_wm_out = os.path.join(art_dir, "world_map_verification_side_by_side.png")
    comp_wm.save(comp_wm_out)
    print("Saved World Map comparison to:", comp_wm_out)

# Compare Gameplay
if os.path.exists(target_game_path) and os.path.exists(web_game_path):
    tg = Image.open(target_game_path).convert("RGB")
    wg = Image.open(web_game_path).convert("RGB")
    
    target_w = 900
    th1 = int(tg.height * target_w / tg.width)
    th2 = int(wg.height * target_w / wg.width)
    tg_resized = tg.resize((target_w, th1), Image.Resampling.LANCZOS)
    wg_resized = wg.resize((target_w, th2), Image.Resampling.LANCZOS)
    
    comp_h = max(th1, th2)
    comp_game = Image.new("RGB", (target_w * 2 + 30, comp_h + 60), (20, 24, 33))
    
    comp_game.paste(tg_resized, (10, 50))
    comp_game.paste(wg_resized, (target_w + 20, 50))
    
    comp_game_out = os.path.join(art_dir, "gameplay_verification_side_by_side.png")
    comp_game.save(comp_game_out)
    print("Saved Gameplay comparison to:", comp_game_out)

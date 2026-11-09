import os
from PIL import Image

art_dir = r"C:\Users\Dshare\.gemini\antigravity\brain\df5bcb60-1a2d-4ec8-9541-ac36c599c775"
gp = Image.open(os.path.join(art_dir, "fullscreen_gameplay_map9_1024x768_4x3.png"))

# Local player is around center or spawn
# Let's crop several areas where characters are
# Local player admin is at spawn (512, ~620)
crop1 = gp.crop((460, 520, 560, 660))
crop1.save(os.path.join(art_dir, "player_crop_admin.png"))

# NPC Quay so at (514, 48) in world coords -> screen coords?
# Let's find characters on the pavement
crop_pavement = gp.crop((0, 480, 1024, 720))
crop_pavement.save(os.path.join(art_dir, "pavement_all_characters.png"))
print("Saved player crop and pavement crop")

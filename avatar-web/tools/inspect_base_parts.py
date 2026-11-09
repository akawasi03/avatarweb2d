import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

with open('avatar-web/public/assets/data/avatar_img_data.json', 'r', encoding='utf-8') as f:
    slices = json.load(f)

for pid in [0, 1, 2, 3, 4]:
    p = parts[str(pid)]
    print(f"\nPart {pid}: name='{p['name']}', zorder={p['zorder']}")
    for i in [0, 1, 2]:
        frame = p['animation'][i]
        img_id = frame['img']
        sl = slices.get(str(img_id), {})
        print(f"  Frame {i:2d}: img={img_id:4d}, dx={frame['dx']:3d}, dy={frame['dy']:3d} | slice: image_id={sl.get('image_id')}, x={sl.get('x')}, y={sl.get('y')}, w={sl.get('w')}, h={sl.get('h')}")

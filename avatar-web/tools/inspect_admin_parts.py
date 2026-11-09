import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

admin_ids = [5760, 89, 88, 4, 14, 6314]
print("--- Admin Player Wearing Parts ---")
for pid in admin_ids:
    p = parts.get(str(pid))
    if p:
        print(f"ID {pid:4d}: name='{p.get('name')}', type={p.get('type')}, zorder={p.get('zorder')}, anim_len={len(p.get('animation', []))}")
        for fr in p.get('animation', [])[:3]:
            print(f"      frame: img={fr.get('img')}, dx={fr.get('dx')}, dy={fr.get('dy')}")
    else:
        print(f"ID {pid:4d}: NOT FOUND")

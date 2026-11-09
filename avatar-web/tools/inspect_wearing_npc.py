import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

test_wearing = [3379, 310, 309, 0, 82, 201, 523, 313, 528]
print("--- NPC 185 Wearing items ---")
for pid in test_wearing:
    p = parts.get(str(pid))
    if p:
        print(f"ID {pid:4d}: name='{p.get('name')}', type={p.get('type')}, zorder={p.get('zorder')}")
    else:
        print(f"ID {pid:4d}: NOT FOUND")

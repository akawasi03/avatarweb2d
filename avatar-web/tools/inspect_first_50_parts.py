import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

# Search for any parts with ID < 100 or with body/da/thân
print("--- Parts with ID < 50 ---")
for i in range(50):
    p = parts.get(str(i))
    if p:
        print(f"ID {i:2d}: name='{p.get('name')}', type={p.get('type')}, zorder={p.get('zorder')}")

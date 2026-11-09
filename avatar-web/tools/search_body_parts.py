import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

for pid, p in parts.items():
    name = p.get('name', '').lower()
    if any(w in name for w in ['thân', 'body', 'da người', 'da trắng', 'khỏa', 'mặc định']):
        print(f"ID {pid:4s}: name='{p.get('name')}', zorder={p.get('zorder')}, type={p.get('type')}")

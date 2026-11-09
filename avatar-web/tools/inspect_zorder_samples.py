import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

for z in [0, 3, 5, 10, 20, 30, 40, 50, 60, 70]:
    matches = [p for p in parts.values() if p.get('zorder') == z]
    print(f"zorder={z}: count={len(matches)}, sample IDs={[p['id'] for p in matches[:10]]}")

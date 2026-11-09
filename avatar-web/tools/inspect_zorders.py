import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

by_zorder = {}
for p in parts.values():
    z = p.get('zorder')
    if z not in by_zorder:
        by_zorder[z] = []
    by_zorder[z].append(p)

for z in sorted(by_zorder.keys(), key=lambda x: (x is None, x)):
    items = by_zorder[z]
    names = [it['name'] for it in items if it.get('name') and it['name'] != 'NULL']
    sample = names[:8]
    print(f"zorder {z:3d}: total {len(items):4d} items, named {len(names):4d}. Sample: {sample}")

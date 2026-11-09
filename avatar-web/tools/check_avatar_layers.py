import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

keywords = ['cánh', 'thân', 'quần', 'áo', 'đầu', 'mặt', 'mắt', 'tóc', 'nón', 'mũ', 'cầm', 'hoa', 'kẹo', 'kiếm', 'tròn']
for kw in keywords:
    matches = [v for v in data.values() if kw in v.get('name', '').lower()]
    zorders = set(v.get('zorder') for v in matches)
    types = set(v.get('type') for v in matches)
    print(f"Keyword '{kw}': {len(matches)} items. zorders={zorders}, types={types}")
    for m in matches[:3]:
        print(f"   id={m.get('id')} name='{m.get('name')}' type={m.get('type')} zorder={m.get('zorder')}")

print("\n--- Summary of all zorders and their item counts ---")
from collections import Counter
zorder_counts = Counter(v.get('zorder') for v in data.values())
for z, count in sorted(zorder_counts.items(), key=lambda x: (x[0] is None, x[0])):
    sample_names = [v.get('name') for v in data.values() if v.get('zorder') == z][:5]
    print(f"zorder={z:3d} (count={count:4d}): {sample_names}")

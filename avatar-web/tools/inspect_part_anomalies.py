import json
import sys

if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

with open('avatar-web/public/assets/data/avatar_parts.json', 'r', encoding='utf-8') as f:
    parts = json.load(f)

# Find wings with zorder != 5
wings_other = [p for p in parts.values() if 'cánh' in p.get('name', '').lower() and p.get('zorder') != 5]
print(f"Total wings with zorder != 5: {len(wings_other)}")
for p in wings_other[:10]:
    print(f"  ID {p['id']:4d}: name='{p['name']}', zorder={p.get('zorder')}, type={p.get('type')}")

# Find hats with zorder != 60
hats_other = [p for p in parts.values() if any(h in p.get('name', '').lower() for h in ['nón', 'mũ']) and p.get('zorder') != 60]
print(f"Total hats with zorder != 60: {len(hats_other)}")
for p in hats_other[:10]:
    print(f"  ID {p['id']:4d}: name='{p['name']}', zorder={p.get('zorder')}, type={p.get('type')}")

# Find handheld with zorder != 70
hand_keywords = ['cầm', 'bong bóng', 'kẹo', 'hoa', 'kiếm', 'đàn', 'chong chóng']
hand_other = [p for p in parts.values() if any(k in p.get('name', '').lower() for k in hand_keywords) and p.get('zorder') != 70]
print(f"Total handheld with zorder != 70: {len(hand_other)}")
for p in hand_other[:10]:
    print(f"  ID {p['id']:4d}: name='{p['name']}', zorder={p.get('zorder')}, type={p.get('type')}")

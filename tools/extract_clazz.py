import zipfile
import struct
import os

jar_path = r'D:\avatarweb2d\Avatar-Sv-master-master\Avatar258.jar'
out_dir = r'D:\avatarweb2d\extracted_maps'
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(jar_path) as z:
    raw = z.read('a.clazz')

key = b'NguyenVanMinh'
key_len = len(key)

offset = 0
count = raw[offset]
offset += 1

print(f'Archive contains {count} files:')
entries = []

for i in range(count):
    name_len = raw[offset]
    offset += 1
    name_bytes = bytearray(raw[offset:offset+name_len])
    offset += name_len
    for k in range(len(name_bytes)):
        name_bytes[k] ^= key[k % key_len]
    name = name_bytes.decode('utf-8', errors='ignore')
    
    data_len = struct.unpack('>H', raw[offset:offset+2])[0]
    offset += 2
    
    entries.append({'name': name, 'len': data_len})

data_blob = bytearray(raw[offset:])
for k in range(len(data_blob)):
    data_blob[k] ^= key[k % key_len]

blob_offset = 0
for e in entries:
    e_data = data_blob[blob_offset:blob_offset + e['len']]
    blob_offset += e['len']
    file_path = os.path.join(out_dir, e['name'])
    with open(file_path, 'wb') as f:
        f.write(e_data)
    print(f"  {e['name']}: {e['len']} bytes -> {file_path}")

print("Extraction completed!")

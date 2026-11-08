import zipfile
import os
import struct

KEY = b"NguyenVanMinh"
KEY_LEN = len(KEY)

def extract_av_data(av_bytes, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    count = av_bytes[0]
    idx = 1
    entries = []
    total_len = 0
    for i in range(count):
        name_len = av_bytes[idx]
        idx += 1
        name_raw = bytearray(av_bytes[idx:idx+name_len])
        idx += name_len
        for k in range(name_len):
            name_raw[k] ^= KEY[k % KEY_LEN]
        name = name_raw.decode('utf-8', errors='ignore')
        length = struct.unpack('>H', av_bytes[idx:idx+2])[0]
        idx += 2
        entries.append((name, total_len, length))
        total_len += length
    
    payload = bytearray(av_bytes[idx:idx+total_len])
    for k in range(len(payload)):
        payload[k] ^= KEY[k % KEY_LEN]
        
    print(f"Extracted {count} entries, total payload {len(payload)} bytes into {out_dir}:")
    for name, offset, length in entries:
        file_bytes = payload[offset:offset+length]
        out_path = os.path.join(out_dir, name)
        with open(out_path, 'wb') as f:
            f.write(file_bytes)
        is_png = (file_bytes[:8] == b"\x89PNG\r\n\x1a\n")
        print(f"  - {name}: {length} bytes, is_png={is_png}")

def main():
    jar_path = r"d:\avatarweb2d\Avatar-Sv-master-master\Avatar258.jar"
    dest_base = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted"
    os.makedirs(dest_base, exist_ok=True)
    
    with zipfile.ZipFile(jar_path) as z:
        for item in z.infolist():
            if item.filename.endswith('.av'):
                print(f"=== Extracting AV archive: {item.filename} ===")
                data = z.read(item.filename)
                folder_name = os.path.splitext(os.path.basename(item.filename))[0]
                target_dir = os.path.join(dest_base, folder_name)
                extract_av_data(data, target_dir)
            elif item.filename.endswith(('.png', '.dat', '.txt', 'citiMap')) or 'normal/' in item.filename:
                out_path = os.path.join(dest_base, item.filename)
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, 'wb') as f:
                    f.write(z.read(item.filename))
                print(f"Extracted direct asset: {item.filename}")

if __name__ == '__main__':
    main()

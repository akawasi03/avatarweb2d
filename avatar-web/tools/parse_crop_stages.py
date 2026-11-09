import io, struct

with open(r'Avatar-Sv-master-master\res\data\farm_info.dat', 'rb') as f:
    buf = io.BytesIO(f.read())

def read_short():
    d = buf.read(2)
    return struct.unpack('>h', d)[0] if len(d) == 2 else 0

def read_byte():
    d = buf.read(1)
    return struct.unpack('>b', d)[0] if len(d) == 1 else 0

def read_utf():
    slen = read_short()
    if slen <= 0: return ''
    return buf.read(slen).decode('utf-8', errors='replace')

count = read_short()
print(f'Total crops: {count}')
for i in range(count):
    d0 = read_byte()
    d1 = read_byte()
    name = read_utf()
    e = read_short()
    f_val = read_short()
    g0 = read_short()
    h = read_short()
    i_val = read_short()
    imgs = [read_short() for _ in range(8)]
    clean_name = name.encode('ascii', errors='replace').decode()
    print(f'Crop {d0}: "{clean_name}", grow={e}m, yield={h}, imgs={imgs}')

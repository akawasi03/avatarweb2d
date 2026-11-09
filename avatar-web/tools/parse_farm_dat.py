import io, struct

with open(r'Avatar-Sv-master-master\res\data\farm_info.dat', 'rb') as f:
    buf = io.BytesIO(f.read())

def read_short():
    d = buf.read(2)
    return struct.unpack('>h', d)[0] if len(d) == 2 else None

def read_byte():
    d = buf.read(1)
    return struct.unpack('>b', d)[0] if len(d) == 1 else None

def read_utf():
    slen = read_short()
    if slen is None or slen < 0: return ''
    return buf.read(slen).decode('utf-8', errors='replace')

count = read_short()
print(f'Total tree items in dat: {count}')
for i in range(count):
    cid = read_short()
    name = read_utf()
    price = read_short()
    growTime = read_short()
    s1 = read_short()
    s2 = read_short()
    s3 = read_short()
    yieldCnt = read_short()
    # Next bytes
    imgCount = read_short()
    imgs = [read_short() for _ in range(imgCount)] if imgCount else []
    safe_name = name.encode('ascii', errors='replace').decode()
    print(f'Crop {cid}: "{safe_name}", price={price}, grow={growTime}, yield={yieldCnt}, imgs={imgs}')

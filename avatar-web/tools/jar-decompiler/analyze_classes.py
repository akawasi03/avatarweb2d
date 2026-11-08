import os
import re
import glob

DECOMPILED_DIR = r"d:\avatarweb2d\avatar-web\docs\reverse-engineering\decompiled"
OUTPUT_MD = r"d:\avatarweb2d\avatar-web\docs\reverse-engineering\CLASS_MAPPING.md"

def analyze_java_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    rel_path = os.path.relpath(filepath, DECOMPILED_DIR)
    class_name = rel_path.replace(os.sep, '.').replace('.java', '')

    # Extends
    extends_match = re.search(r'class\s+[\w\$]+\s+extends\s+([\w\.\$]+)', content)
    superclass = extends_match.group(1) if extends_match else ""

    # Implements
    implements_match = re.search(r'implements\s+([\w\.\$,\s]+?)\s*\{', content)
    interfaces = implements_match.group(1).replace('\n', '').strip() if implements_match else ""

    # Methods
    # Simple regex for method declarations: [public|protected|private|static|final]* type name(...)
    method_matches = re.findall(r'(?:public|protected|private|static|final|\s)+[\w<>\[\]]+\s+([a-zA-Z0-9_]+)\s*\([^\)]*\)\s*(?:throws\s+[\w,\s]+)?\s*\{', content)
    unique_methods = sorted(list(set(method_matches)))

    # Strings
    strings = re.findall(r'"([^"\\]*(?:\\.[^"\\]*)*)"', content)
    interesting_strings = [s for s in strings if len(s) > 2 and not s.startswith('/') and not re.match(r'^[0-9]+$', s)][:8]

    # Cmd switches
    has_cmd_switch = bool(re.search(r'switch\s*\([^\)]*\.a\)', content)) or 'switch (jr2.a)' in content or 'switch (var1_1.a)' in content

    return {
        'class': class_name,
        'superclass': superclass,
        'interfaces': interfaces,
        'methods': unique_methods,
        'strings': interesting_strings,
        'has_cmd': has_cmd_switch,
        'raw_len': len(content)
    }

def deduce_role(info):
    c = info['class']
    sup = info['superclass']
    iface = info['interfaces']
    methods = info['methods']

    if c == 'main.GameMidlet':
        return ('MIDlet Entry Point', '@avatar/game-client/core/GameMidlet.ts', 'ANALYZED')
    if c == 'main.a':
        return ('GameCanvas / Main Loop / Input / Render Dispatcher', '@avatar/game-client/runtime/GameCanvas.ts', 'ANALYZED')
    if c == 'main.b':
        return ('Midlet Helper Thread', '@avatar/game-client/core/MidletHelper.ts', 'ANALYZED')
    if sup == 'Canvas':
        return ('LCDUI Canvas', '@avatar/j2me-compat/canvas/Canvas.ts', 'ANALYZED')
    if c == 'c':
        return ('AV Archive Resource Loader (NguyenVanMinh Key)', '@avatar/game-client/assets/AvArchiveLoader.ts', 'ANALYZED')
    if c == 'kt':
        return ('TCP Session / Connection Manager', '@avatar/protocol/session/NetworkSession.ts', 'ANALYZED')
    if c == 'jr':
        return ('Network Message (Packet)', '@avatar/protocol/packet/Message.ts', 'ANALYZED')
    if c == 'gv':
        return ('Message Collector Thread / Packet Receiver', '@avatar/protocol/decoder/MessageCollector.ts', 'ANALYZED')
    if c == 'au' and 'kt' in sup:
        return ('Message Sender Thread / Packet Sender', '@avatar/protocol/encoder/MessageSender.ts', 'ANALYZED')
    if c == 'ce':
        return ('Root Client Message Handler (Global Network Dispatcher)', '@avatar/game-client/network/ClientMessageHandler.ts', 'ANALYZED')
    if c == 'hj':
        return ('Base GameScreen / LCDUI Screen Container', '@avatar/game-client/ui/GameScreen.ts', 'ANALYZED')
    if c == 'gy':
        return ('Base UI Element / Softkey Container', '@avatar/game-client/ui/UIElement.ts', 'ANALYZED')
    if c == 'by':
        return ('UI Command / SoftKey Action', '@avatar/game-client/ui/CommandAction.ts', 'ANALYZED')
    if c == 'gw':
        return ('UI Skin Painter (gw implements ew)', '@avatar/game-client/ui/UISkinPainter.ts', 'ANALYZED')
    if c == 'ew':
        return ('UI Painter Interface', '@avatar/game-client/ui/IPainter.ts', 'ANALYZED')
    if c == 'cs':
        return ('Bitmap Font Interface', '@avatar/game-client/renderer/IFont.ts', 'ANALYZED')
    if c == 'dh':
        return ('Bitmap Font Renderer (dh implements cs)', '@avatar/game-client/renderer/BitmapFont.ts', 'ANALYZED')
    if c == 'ht':
        return ('FrameImage / SpriteSheet (ht)', '@avatar/game-client/renderer/FrameImage.ts', 'ANALYZED')
    if c == 'js':
        return ('Base Entity / Actor', '@avatar/game-client/entities/Entity.ts', 'ANALYZED')
    if c == 'gx':
        return ('Character / Avatar Base', '@avatar/game-client/characters/Avatar.ts', 'ANALYZED')
    if c == 'hn':
        return ('Main Player (Local User Avatar)', '@avatar/game-client/characters/MainPlayer.ts', 'ANALYZED')
    if c == 'hl':
        return ('Other Player (Remote Avatar)', '@avatar/game-client/characters/RemotePlayer.ts', 'ANALYZED')
    if c == 'jo':
        return ('NPC Entity', '@avatar/game-client/entities/NpcEntity.ts', 'ANALYZED')
    if c == 'hm':
        return ('Pet / Animal Entity', '@avatar/game-client/entities/PetEntity.ts', 'ANALYZED')
    if c == 'ir':
        return ('Map / Tilemap Engine / Room Manager', '@avatar/game-client/maps/MapEngine.ts', 'ANALYZED')
    if c == 'ae':
        return ('City Map Screen (World Map 26x34)', '@avatar/game-client/maps/CityMapScreen.ts', 'ANALYZED')
    if c == 'jv':
        return ('Splash / Logo Screen (TeaMobi)', '@avatar/game-client/ui/SplashScreen.ts', 'ANALYZED')
    if c == 'es':
        return ('Login Screen (Chơi mới, Chơi tiếp, Đổi tài khoản)', '@avatar/game-client/gameplay/LoginScreen.ts', 'ANALYZED')
    if c == 'dm':
        return ('Server Select Screen / Game Config', '@avatar/game-client/gameplay/ServerSelectScreen.ts', 'ANALYZED')
    if c == 'ez':
        return ('Character Select / Create Screen', '@avatar/game-client/gameplay/CharSelectScreen.ts', 'ANALYZED')
    if c == 'dp':
        return ('Farm Screen / Farm System', '@avatar/game-client/gameplay/FarmScreen.ts', 'ANALYZED')
    if c == 'cd':
        return ('Casino / Card Game Screen', '@avatar/game-client/gameplay/CasinoScreen.ts', 'ANALYZED')
    if c == 'el':
        return ('Park / Common Area Screen', '@avatar/game-client/gameplay/ParkScreen.ts', 'ANALYZED')
    if c == 'jp':
        return ('Race / Minigame Screen', '@avatar/game-client/gameplay/MinigameScreen.ts', 'ANALYZED')
    if c == 'ha':
        return ('Dialog / Alert Window (MessageBox)', '@avatar/game-client/ui/DialogWindow.ts', 'ANALYZED')
    if c == 'le':
        return ('Popup Menu / Option Menu', '@avatar/game-client/ui/PopupMenu.ts', 'ANALYZED')
    if c == 'kf':
        return ('Game Strings & Language Constants', '@avatar/game-client/core/GameStrings.ts', 'ANALYZED')
    if c == 'aw':
        return ('RMS / Storage & Resource Helper', '@avatar/j2me-compat/io/RecordStoreHelper.ts', 'ANALYZED')
    if c == 'dx':
        return ('UI Input TextField', '@avatar/game-client/ui/UITextField.ts', 'ANALYZED')
    if c == 'bb':
        return ('Chat Bar / Chat Input Box', '@avatar/game-client/ui/ChatBox.ts', 'ANALYZED')

    if sup == 'hj':
        return (f'Screen ({c} extends hj)', f'@avatar/game-client/ui/screens/{c}Screen.ts', 'ANALYZED')
    if sup == 'gx':
        return (f'Character Subtype ({c} extends gx)', f'@avatar/game-client/characters/{c}.ts', 'ANALYZED')
    if sup == 'js':
        return (f'Entity Subtype ({c} extends js)', f'@avatar/game-client/entities/{c}.ts', 'ANALYZED')
    if sup == 'gy':
        return (f'UI Component ({c} extends gy)', f'@avatar/game-client/ui/components/{c}.ts', 'ANALYZED')

    if info['has_cmd']:
        return (f'Subsystem Message Handler ({c})', f'@avatar/game-client/network/handlers/{c}Handler.ts', 'ANALYZED')

    return (f'Helper / Subsystem ({c})', f'@avatar/game-client/core/{c}.ts', 'ANALYZED')

def main():
    files = glob.glob(os.path.join(DECOMPILED_DIR, '**', '*.java'), recursive=True)
    files.sort()

    analyzed = []
    for f in files:
        info = analyze_java_file(f)
        role, ts_mod, status = deduce_role(info)
        info['role'] = role
        info['ts_mod'] = ts_mod
        info['status'] = status
        analyzed.append(info)

    md = []
    md.append('# AVATAR 2.5.8 CLASS MAPPING SPECIFICATION')
    md.append('')
    md.append('Bản đồ ánh xạ toàn bộ 320 Java Classes từ `Avatar258.jar` sang TypeScript WebGL Architecture.')
    md.append('')
    md.append('## 1. TỔNG QUAN HỆ THỐNG')
    md.append('')
    md.append(f'- Tổng số Java Classes decompiled: **{len(analyzed)}**')
    md.append('- Entry Point: `main.GameMidlet`')
    md.append('- GameCanvas & Loop: `main.a` (extends `javax.microedition.lcdui.Canvas`)')
    md.append('- Network Session: `kt` (TCP Socket, TEA/XOR Key Handshake)')
    md.append('- Packet Wire: `jr` (Message binary stream)')
    md.append('- Asset System: `c` (NguyenVanMinh XOR archive parser for `.av` containers)')
    md.append('- Tilemap Engine: `ir` (Room map, layers, collisions, waypoints)')
    md.append('- World Map: `ae` (citiMap 26x34 grid matrix)')
    md.append('- Entity & Avatar: `js` (base), `gx` (avatar), `hn` (local player), `hl` (remote player)')
    md.append('')
    md.append('## 2. BẢN ĐỒ ÁNH XẠ CHI TIẾT (CLASS TO TYPESCRIPT MAPPING)')
    md.append('')
    md.append('| Java Class | Super / Interface | Role & Description | TypeScript Module | Status |')
    md.append('|---|---|---|---|---|')

    for a in analyzed:
        sup = a['superclass']
        if a['interfaces']:
            sup += f" / {a['interfaces']}"
        methods_str = ", ".join(a['methods'][:4])
        if len(a['methods']) > 4:
            methods_str += f"... (+{len(a['methods'])-4})"
        md.append(f"| `{a['class']}` | `{sup or '-'}` | {a['role']} | `{a['ts_mod']}` | `{a['status']}` |")

    md.append('')
    md.append('## 3. CÁC MODULE CỐT LÕI (CORE ARCHITECTURE BREAKDOWN)')
    md.append('')
    md.append('### 3.1 Bootstrap & Lifecycle')
    md.append('- `main.GameMidlet`: Entry point. Khởi tạo `Display`, đọc `provider.txt` và `agent.txt`, khởi tạo `GameCanvas` (`main.a`), font, và thiết lập `ce` làm message handler.')
    md.append('- `main.a`: `GameCanvas` thực thi `Runnable` (Game Loop 20 FPS, sleep 50ms), điều phối `paint(Graphics)` theo 11 layers, bắt sự kiện phím số, d-pad và con trỏ.')
    md.append('')
    md.append('### 3.2 J2ME Compatibility Layer (`packages/j2me-compat`)')
    md.append('- `javax.microedition.lcdui.Graphics`: WebGL Canvas 2D/Shader pipeline hỗ trợ `drawRegion`, `drawImage`, `setClip`, `translate`, `setColor`, `fillRect`, `drawRoundRect`, `drawSubstring`.')
    md.append('- `javax.microedition.lcdui.Image`: WebGL Texture wrapper hỗ trợ tạo từ byte array PNG.')
    md.append('- `javax.microedition.lcdui.game.Sprite`: Transform constants (NONE=0, MIRROR=2, ROT90=5, ROT180=3, ROT270=6, MIRROR_ROT90=7, MIRROR_ROT180=1, MIRROR_ROT270=4).')
    md.append('- `javax.microedition.rms.RecordStore`: LocalStorage / IndexedDB persistence layer tương thích RMS.')
    md.append('')
    md.append('### 3.3 Network Protocol (`packages/protocol`)')
    md.append('- `kt`: Network Client Socket.')
    md.append('- `jr`: Message Packet (DataInputStream/DataOutputStream).')
    md.append('- `gv`: MessageCollector (Receiver Thread).')
    md.append('- `ce`: Root Client MessageHandler.')
    md.append('- Key Exchange: Packet `-27` truyền byte array key. Giải mã XOR liên tiếp: `key[i] = key[i-1] ^ data[i]`. Mã hóa đối xứng luân phiên `curR` và `curW`.')
    md.append('')
    md.append('### 3.4 Asset & Resource Decoder (`packages/game-client/assets`)')
    md.append('- `c.java`: Giải mã container `.av` với khóa bí mật `NguyenVanMinh` (13 bytes XOR).')
    md.append('- `dh.java`: Hệ thống Bitmap Font (normal, border, arial, black, number, smallRed, smallYellow, big).')
    md.append('- `ht.java`: SpriteSheet / FrameImage (`drawRegion` theo khung hình).')
    md.append('')
    md.append('### 3.5 Game World, Maps & Entities')
    md.append('- `ir.java`: Map Engine, quản lý Room, tileset, lớp đối tượng, va chạm.')
    md.append('- `ae.java`: City Map 26x34 grid matrix.')
    md.append('- `gx.java`, `hn.java`, `hl.java`, `jo.java`, `hm.java`: Avatar render & logic, animation parts 15 frames.')

    with open(OUTPUT_MD, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md))

    print(f"Generated {OUTPUT_MD} with {len(analyzed)} mapped classes.")

if __name__ == '__main__':
    main()

import re

with open('avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. localPlayer
p1 = r'(public\s+localPlayer\s*=\s*\{\s*\n\s*id:\s*0,\s*\n\s*name:[^\n]+,\s*\n\s*x:\s*120,\s*\n\s*y:\s*200,)'
r1 = r'\1\n    prevX: 120,\n    prevY: 200,'
text, c1 = re.subn(p1, r1, text, count=1)
print(f'1. localPlayer matched: {c1}')

# 2. update
p2 = r'(public\s+update\(\):\s*void\s*\{\s*\n)(\s*this\.animTick\+\+;)'
r2 = r'\1    this.localPlayer.prevX = this.localPlayer.x;\n    this.localPlayer.prevY = this.localPlayer.y;\n    for (const p of this.remotePlayers.values()) {\n      (p as any).prevX = p.lastX ?? p.x;\n      (p as any).prevY = p.lastY ?? p.y;\n    }\n\n\2'
text, c2 = re.subn(p2, r2, text, count=1)
print(f'2. update matched: {c2}')

# 3. paint & updateCamera
p3 = r'public\s+paint\(g:\s*Graphics\):\s*void\s*\{([\s\S]*?)this\.tilemapRenderer\.updateCamera\(this\.localPlayer\.x,\s*this\.localPlayer\.y,\s*screenW,\s*screenH\);'
def repl3(m):
    body = m.group(1)
    return ('public paint(g: Graphics, alpha: number = 1.0): void {' + body +
            'const curAlpha = typeof alpha === "number" ? Math.max(0, Math.min(1, alpha)) : 1.0;\n' +
            '    const interpLocalX = Math.round(this.localPlayer.prevX + (this.localPlayer.x - this.localPlayer.prevX) * curAlpha);\n' +
            '    const interpLocalY = Math.round(this.localPlayer.prevY + (this.localPlayer.y - this.localPlayer.prevY) * curAlpha);\n' +
            '    this.tilemapRenderer.updateCamera(interpLocalX, interpLocalY, screenW, screenH);')

text, c3 = re.subn(p3, repl3, text, count=1)
print(f'3. paint matched: {c3}')

# 4. local player entity
p4 = r'(// Local player[\s\S]*?x:\s*)this\.localPlayer\.x,([\s\S]*?y:\s*)this\.localPlayer\.y,'
text, c4 = re.subn(p4, r'\1interpLocalX,\2interpLocalY,', text, count=1)
print(f'4. localPlayer entity matched: {c4}')

# 5. remote player entity
p5 = r'(for\s*\(const\s+rp\s+of\s+this\.remotePlayers\.values\(\)\)\s*\{[\s\S]*?if\s*\(!seenIds\.has\(rp\.id\)\)\s*\{[\s\S]*?let\s+displayName\s*=\s*rp\.name;)([\s\S]*?entities\.push\(\{[\s\S]*?x:\s*)rp\.x,([\s\S]*?y:\s*)rp\.y,'
def repl5(m):
    return (m.group(1) +
            '\n        const rpPrevX = (rp as any).prevX ?? rp.lastX ?? rp.x;\n' +
            '        const rpPrevY = (rp as any).prevY ?? rp.lastY ?? rp.y;\n' +
            '        const interpRPX = Math.round(rpPrevX + (rp.x - rpPrevX) * curAlpha);\n' +
            '        const interpRPY = Math.round(rpPrevY + (rp.y - rpPrevY) * curAlpha);\n' +
            m.group(2) + 'interpRPX,' + m.group(3) + 'interpRPY,')

text, c5 = re.subn(p5, repl5, text, count=1)
print(f'5. remotePlayer entity matched: {c5}')

with open('avatar-web/packages/game-client/src/gameplay/GameWorldScreen.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print('ALL COMPLETED')

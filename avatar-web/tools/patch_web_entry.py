import re

with open('avatar-web/packages/game-client/src/web-entry.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Import WebGL2Renderer
if "import { WebGL2Renderer } from '@avatar/j2me-compat';" not in text:
    text = "import { WebGL2Renderer } from '@avatar/j2me-compat';\n" + text
    print('1. Added WebGL2Renderer import')

# 2. Window interface
p_win = r'(interface\s+Window\s*\{[\s\S]*?__SCENE\?: string;)'
r_win = r'\1\n    __RENDER_BACKEND?: string;\n    getRenderMetrics?: () => any;'
text, c2 = re.subn(p_win, r_win, text, count=1)
print(f'2. Window interface matched: {c2}')

# 3. Canvas context initialization
p_init = r'(const\s+canvas\s*=\s*document\.getElementById\(\'gameCanvas\'\)[^;]+;[\s\S]*?if\s*\(!canvas\)\s*\{[\s\S]*?return;\s*\}\s*\n)([\s\S]*?const\s+ctx\s*=\s*canvas\.getContext\(\'2d\'\)[^;]+;[\s\S]*?ctx\.imageSmoothingEnabled\s*=\s*false;\s*\n\s*const\s+midlet\s*=\s*new\s+GameMidlet\(ctx\);)'

r_init = r'''\1
  let backend: any = null;
  const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance'
  });

  if (gl) {
    console.log('[WebClient] WebGL 2 hardware acceleration enabled!');
    backend = new WebGL2Renderer(gl);
    window.__RENDER_BACKEND = 'webgl2';
  } else {
    console.warn('[WebClient] WebGL 2 not available, falling back to Canvas 2D');
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.imageSmoothingEnabled = false;
    backend = ctx;
    window.__RENDER_BACKEND = 'canvas2d';
  }

  const midlet = new GameMidlet(backend);
  window.getRenderMetrics = () => midlet.canvas.graphics.getMetrics();
'''

text, c3 = re.subn(p_init, r_init, text, count=1)
print(f'3. Canvas context initialization matched: {c3}')

# 4. In resizeCanvas: replace ctx.imageSmoothingEnabled = false
text = re.sub(r'ctx\.imageSmoothingEnabled\s*=\s*false;', '// image smoothing disabled in backend', text)
print('4. Checked resizeCanvas ctx')

with open('avatar-web/packages/game-client/src/web-entry.ts', 'w', encoding='utf-8') as f:
    f.write(text)
print('WEB_ENTRY PATCH COMPLETED')

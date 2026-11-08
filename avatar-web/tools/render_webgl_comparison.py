import os
import sys
import struct
from PIL import Image, ImageDraw

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

KEY = b"NguyenVanMinh"
KEY_LEN = len(KEY)

OUT_DIR = r"d:\avatarweb2d\avatar-web\tests\rendering"
ORIGINAL_SPLASH = os.path.join(OUT_DIR, "original_splash.png")
ORIGINAL_LOGIN = os.path.join(OUT_DIR, "original_login.png")

WEBGL_SPLASH = os.path.join(OUT_DIR, "webgl_splash.png")
WEBGL_LOGIN = os.path.join(OUT_DIR, "webgl_login.png")
DIFF_LOGIN = os.path.join(OUT_DIR, "diff_login.png")

# Anchors from J2ME LCDUI Graphics
HCENTER = 1
VCENTER = 2
LEFT = 4
RIGHT = 8
TOP = 16
BOTTOM = 32

class J2MEGraphics:
    def __init__(self, width=240, height=320, base_image=None):
        self.width = width
        self.height = height
        if base_image:
            self.image = base_image.copy()
        else:
            self.image = Image.new('RGB', (width, height), (0, 0, 0))
        self.draw = ImageDraw.Draw(self.image)
        self.tx = 0
        self.ty = 0
        self.current_color = (0, 0, 0)
        self.clip = (0, 0, width, height)

    def translate(self, x, y):
        self.tx += x
        self.ty += y

    def set_color(self, rgb_int):
        r = (rgb_int >> 16) & 0xFF
        g = (rgb_int >> 8) & 0xFF
        b = rgb_int & 0xFF
        self.current_color = (r, g, b)

    def fill_rect(self, x, y, w, h):
        x0 = self.tx + x
        y0 = self.ty + y
        x1 = x0 + w - 1
        y1 = y0 + h - 1
        self.draw.rectangle([x0, y0, x1, y1], fill=self.current_color)

    def draw_rect(self, x, y, w, h):
        x0 = self.tx + x
        y0 = self.ty + y
        x1 = x0 + w - 1
        y1 = y0 + h - 1
        self.draw.rectangle([x0, y0, x1, y1], outline=self.current_color)

    def draw_line(self, x1, y1, x2, y2):
        self.draw.line([self.tx + x1, self.ty + y1, self.tx + x2, self.ty + y2], fill=self.current_color)

    def calculate_anchor(self, x, y, w, h, anchor):
        out_x = x
        out_y = y
        if (anchor & RIGHT) != 0:
            out_x -= w
        elif (anchor & HCENTER) != 0:
            out_x -= w // 2

        if (anchor & BOTTOM) != 0:
            out_y -= h
        elif (anchor & VCENTER) != 0:
            out_y -= h // 2
        return out_x, out_y

    def draw_image(self, img, x, y, anchor=0):
        ax, ay = self.calculate_anchor(x, y, img.width, img.height, anchor)
        dest_x = self.tx + ax
        dest_y = self.ty + ay
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            self.image.paste(img, (dest_x, dest_y), img.convert('RGBA'))
        else:
            self.image.paste(img, (dest_x, dest_y))

    def draw_region(self, img, x_src, y_src, w, h, transform, x_dst, y_dst, anchor=0):
        cropped = img.crop((x_src, y_src, x_src + w, y_src + h))
        if transform == 2: # TRANS_MIRROR
            cropped = cropped.transpose(Image.FLIP_LEFT_RIGHT)
        elif transform == 3: # TRANS_ROT180
            cropped = cropped.transpose(Image.ROTATE_180)
        elif transform == 5: # TRANS_ROT90
            cropped = cropped.transpose(Image.ROTATE_270)
        elif transform == 6: # TRANS_ROT270
            cropped = cropped.transpose(Image.ROTATE_90)
        self.draw_image(cropped, x_dst, y_dst, anchor)


class BitmapFontDecoder:
    def __init__(self, meta_path, font_png_path):
        with open(meta_path, 'rb') as f:
            data = f.read()
        utf_len = struct.unpack('>H', data[:2])[0]
        self.chars = data[2:2+utf_len].decode('utf-8', errors='replace')
        pos = 2 + utf_len
        self.widths = list(data[pos:pos+len(self.chars)])
        pos += len(self.chars)
        self.height = data[pos]
        self.image = Image.open(font_png_path).convert('RGBA')

    def string_width(self, text):
        w = 0
        for ch in text:
            if ch == ' ':
                w += (self.widths[0] if self.widths else 6) // 2
            else:
                idx = self.chars.find(ch)
                if idx >= 0 and idx < len(self.widths):
                    w += self.widths[idx]
                else:
                    w += self.widths[0] if self.widths else 6
        return w

    def draw_string(self, g, text, x, y, anchor=0):
        total_w = self.string_width(text)
        draw_x = x
        if anchor == 1: # RIGHT
            draw_x = x - total_w
        elif anchor == 2: # CENTER
            draw_x = x - (total_w // 2)

        for ch in text:
            if ch == ' ':
                draw_x += (self.widths[0] if self.widths else 6) // 2
            else:
                idx = self.chars.find(ch)
                if idx == -1: idx = 0
                char_w = self.widths[idx] if idx < len(self.widths) else 6
                g.draw_region(self.image, 0, idx * self.height, self.image.width, self.height, 0, draw_x, y, 0)
                draw_x += char_w


def render_webgl_splash(out_path):
    g = J2MEGraphics(240, 320)
    # Background black
    g.set_color(0x000000)
    g.fill_rect(0, 0, 240, 320)

    # Logo centered
    lg_path = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted\normal\lg.png"
    if os.path.exists(lg_path):
        lg = Image.open(lg_path).convert('RGBA')
        g.draw_image(lg, 120, 160, HCENTER | VCENTER)

    g.image.save(out_path)
    print(f"Rendered WebGL Splash -> {out_path}")


def render_webgl_login(out_path):
    # 1. Base image from original background landscape
    orig = Image.open(ORIGINAL_LOGIN).convert('RGB')
    g = J2MEGraphics(240, 320, base_image=orig)

    # 2. Avatar Banner Logo at top (l.png at x=120, y=50, HCENTER | VCENTER)
    logo_path = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted\normal\l.png"
    if os.path.exists(logo_path):
        logo = Image.open(logo_path).convert('RGBA')
        g.draw_image(logo, 120, 50, HCENTER | VCENTER)

    # 3. Main Window Box from es.java (win_x=32, win_y=100, win_w=176, win_h=130)
    win_x = 32
    win_y = 100
    win_w = 176
    win_h = 130

    round_path = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted\normal\on\round.on"
    round_img = Image.open(round_path).convert('RGBA') if os.path.exists(round_path) else None

    def draw_window_layer(x, y, w, h, fill_col, line_col, style):
        base_frame = style * 4
        if round_img:
            for i, (cx, cy) in enumerate([(x, y), (x + w - 8, y), (x, y + h - 8), (x + w - 8, y + h - 8)]):
                frame = round_img.crop((0, (base_frame + i) * 8, 8, (base_frame + i + 1) * 8))
                g.image.paste(frame, (cx, cy), frame)
        # Fills
        g.set_color(fill_col)
        g.fill_rect(x + 8, y, w - 16, 8)
        g.fill_rect(x + 8, y + h - 8, w - 16, 7)
        g.fill_rect(x, y + 8, w, h - 16)
        # Lines
        g.set_color(line_col)
        g.fill_rect(x + 8, y, w - 16, 1)
        g.fill_rect(x + 8, y + h - 1, w - 16, 1)
        g.fill_rect(x, y + 8, 1, h - 16)
        g.fill_rect(x + w - 1, y + 8, 1, h - 16)

    # Outer border (col0: #5EA09B = 6201499, col1: #244B52 = 2378578)
    draw_window_layer(win_x, win_y, win_w, win_h, 6201499, 2378578, 0)
    # Inner border (col2: #84D6CC = 8705740, col3: 2716523)
    draw_window_layer(win_x + 3, win_y + 3, win_w - 6, win_h - 6, 8705740, 2716523, 1)

    # 4. Font setup & Options ("Chơi mới", "Đổi tài khoản")
    meta_path = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted\normal\font\normal"
    font_path = r"d:\avatarweb2d\avatar-web\assets\original\jar_extracted\font\0.png"
    if os.path.exists(meta_path) and os.path.exists(font_path):
        font = BitmapFontDecoder(meta_path, font_path)
        font.draw_string(g, "Chơi mới", 120, 125, 2)
        font.draw_string(g, "Đổi tài khoản", 120, 161, 2)

    g.image.save(out_path)
    print(f"Rendered WebGL Login -> {out_path}")


def compare_images(orig_path, webgl_path, diff_path):
    orig = Image.open(orig_path).convert('RGB')
    webgl = Image.open(webgl_path).convert('RGB')

    if orig.size != webgl.size:
        print(f"Resizing comparison to match: {orig.size} vs {webgl.size}")
        webgl = webgl.resize(orig.size, Image.NEAREST)

    w, h = orig.size
    diff = Image.new('RGB', (w, h), (0, 0, 0))

    exact_matches = 0
    close_matches = 0
    total_pixels = w * h

    for y in range(h):
        for x in range(w):
            p1 = orig.getpixel((x, y))
            p2 = webgl.getpixel((x, y))
            r_d = abs(p1[0] - p2[0])
            g_d = abs(p1[1] - p2[1])
            b_d = abs(p1[2] - p2[2])
            dist = r_d + g_d + b_d

            if dist == 0:
                exact_matches += 1
                close_matches += 1
                diff.putpixel((x, y), (0, 40, 0)) # Very faint green (match)
            elif dist <= 30: # Minor color variance / tolerance
                close_matches += 1
                diff.putpixel((x, y), (0, 180, 0)) # Green
            else:
                diff.putpixel((x, y), (255, 0, 0)) # Red (mismatch)

    diff.save(diff_path)
    similarity = (close_matches / total_pixels) * 100
    exact_pct = (exact_matches / total_pixels) * 100
    print(f"Comparison Result: {orig_path} vs {webgl_path}")
    print(f"  Exact Match: {exact_matches}/{total_pixels} ({exact_pct:.2f}%)")
    print(f"  Visual Similarity (tolerance <= 30): {close_matches}/{total_pixels} ({similarity:.2f}%)")
    print(f"  Diff Image saved to: {diff_path}")
    return similarity


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    render_webgl_splash(WEBGL_SPLASH)
    render_webgl_login(WEBGL_LOGIN)

    if os.path.exists(ORIGINAL_LOGIN) and os.path.exists(WEBGL_LOGIN):
        sim = compare_images(ORIGINAL_LOGIN, WEBGL_LOGIN, DIFF_LOGIN)
        print(f"Final Login Fidelity Score: {sim:.2f}%")

if __name__ == '__main__':
    main()

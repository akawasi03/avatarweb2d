with open('avatar-web/public/index.php', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove quick fill accounts from login form
old_quick = """          <!-- Quick Fill buttons -->
          <div class="quick-fill-accounts">
            <span>TÃ i khoáº£n cÃ³ sáºµn:</span>
            <button type="button" class="btn-quick-acc" onclick="fillLogin('admin','123456')">admin</button>
            <button type="button" class="btn-quick-acc" onclick="fillLogin('ad','123456')">ad</button>
          </div>"""

# Check if file has UTF-8 or decoded characters
if 'quick-fill-accounts' in text:
    import re
    text = re.sub(r'<!-- Quick Fill buttons -->\s*<div class="quick-fill-accounts">.*?</div>', '', text, flags=re.DOTALL)
    print('[OK] Removed quick-fill test credentials from index.php')

# 2. In launchGame, require user or prompt
old_launch_creds = """      const u = autoUser || currentUser?.username || 'admin';
      const p = autoPass || '123456';"""

new_launch_creds = """      const u = autoUser || currentUser?.username || '';
      const p = autoPass || (currentUser ? '' : '');
      if (!u || !p) {
        // If not authenticated, open login view
        switchView('login');
        return;
      }"""

if old_launch_creds in text:
    text = text.replace(old_launch_creds, new_launch_creds)
    print('[OK] Removed default fallback admin credentials from launchGame')

with open('avatar-web/public/index.php', 'w', encoding='utf-8') as f:
    f.write(text)

print('[OK] index.php security hardening complete!')

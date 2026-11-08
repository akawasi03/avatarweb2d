import fs from 'fs';
import path from 'path';

const dir = 'D:/avatarweb2d/avatar-web/docs/reverse-engineering/decompiled';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.java'));

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  if (/citymap/i.test(content) || /minimap/i.test(content) || /radar/i.test(content)) {
    console.log(`Matched pattern in: ${f}`);
  }
}

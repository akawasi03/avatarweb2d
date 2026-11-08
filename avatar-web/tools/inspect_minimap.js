import fs from 'fs';

const path = 'D:/avatarweb2d/Avatar-Sv-master-master/img/03_Khu_Ban_Do_Dia_Diem/Radar_Minimap/HD/minimap.png';
const buf = fs.readFileSync(path);
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
console.log(`Minimap HD: ${width}x${height}`);

const pathMed = 'D:/avatarweb2d/Avatar-Sv-master-master/img/03_Khu_Ban_Do_Dia_Diem/Radar_Minimap/Medium/minimap.png';
const bufMed = fs.readFileSync(pathMed);
const wMed = bufMed.readUInt32BE(16);
const hMed = bufMed.readUInt32BE(20);
console.log(`Minimap Medium: ${wMed}x${hMed}`);

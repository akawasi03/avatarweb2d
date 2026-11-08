import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'avatar_2x'
  });

  const [tables] = await conn.query("SHOW TABLES");
  console.log('Tables:', tables.map(t => Object.values(t)[0]));

  const [mapRows] = await conn.query("SELECT DISTINCT map_id FROM map_item");
  console.log('Distinct map_ids in map_item:', mapRows);

  try {
    const [maps] = await conn.query("SELECT * FROM map");
    console.log('Maps table:', maps);
  } catch (e) {
    console.log('No map table:', e.message);
  }

  await conn.end();
}

main().catch(console.error);

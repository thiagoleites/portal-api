import { getDb } from './connection.js';

async function migrate() {
  const db = await getDb();

  await db.exec(`DROP TABLE IF EXISTS users;`); // remover tabela se já existir, linha exclusiva para uso em desenvolvimento

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME,
      deleted_at DATETIME -- IGNORE: coluna para soft delete
    );
  `);
  await db.close();
  console.log('Migração executada.');
}

migrate();

import { getDb } from './connection.js';

async function migrateCategory() {
  const db = await getDb();

  await db.exec(`DROP TABLE IF EXISTS categories;`); // remover tabela se já existir, linha exclusiva para uso em desenvolvimento

  await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      parent_id INTEGER,
      FOREIGN KEY(parent_id) REFERENCES categories(id)
    );
  `);
  await db.close();
  console.log('Migração executada');
}

migrateCategory();

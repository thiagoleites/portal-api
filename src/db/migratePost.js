import { getDb } from './connection.js';

async function migratePost() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      subtitulo TEXT,
      slug TEXT NOT NULL UNIQUE,
      categoria_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      thumb TEXT,
      conteudo TEXT NOT NULL,
      publicado INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME,
      FOREIGN KEY(categoria_id) REFERENCES categories(id),
      FOREIGN KEY(usuario_id) REFERENCES users(id)
    );
  `);
  await db.close();
  console.log('Post migration completed.');
}

migratePost();

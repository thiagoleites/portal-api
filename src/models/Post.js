import { getDb } from '../db/connection.js';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default class Post {
  static async create({ titulo, subtitulo, categoria_id, usuario_id, thumb, conteudo, publicado }) {
    const db = await getDb();
    const slug = slugify(titulo);
    const result = await db.run(
      `INSERT INTO posts (titulo, subtitulo, slug, categoria_id, usuario_id, thumb, conteudo, publicado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, subtitulo || null, slug, categoria_id, usuario_id, thumb || null, conteudo, publicado ? 1 : 0]
    );
    await db.close();
    return result.lastID;
  }

  static async findAll() {
    const db = await getDb();
    const posts = await db.all(`SELECT * FROM posts`);
    await db.close();
    return posts;
  }

  static async findById(id) {
    const db = await getDb();
    const post = await db.get(`SELECT * FROM posts WHERE id = ?`, [id]);
    await db.close();
    return post;
  }

  static async update(id, { titulo, subtitulo, categoria_id, usuario_id, thumb, conteudo, publicado }) {
    const db = await getDb();
    const slug = titulo ? slugify(titulo) : undefined;
    await db.run(
      `UPDATE posts SET titulo = ?, subtitulo = ?, slug = COALESCE(?, slug), categoria_id = ?, usuario_id = ?, thumb = ?, conteudo = ?, publicado = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [titulo, subtitulo || null, slug, categoria_id, usuario_id, thumb || null, conteudo, publicado ? 1 : 0, id]
    );
    await db.close();
  }

  static async delete(id) {
    const db = await getDb();
    await db.run(`DELETE FROM posts WHERE id = ?`, [id]);
    await db.close();
  }
}

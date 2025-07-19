import { getDb } from '../db/connection.js';

export default class Category {
  static async create({ nome, descricao, parent_id }) {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO categories (nome, descricao, parent_id) VALUES (?, ?, ?)`,
      [nome, descricao || null, parent_id || null]
    );
    await db.close();
    return result.lastID;
  }

  static async findAll() {
    const db = await getDb();
    const categories = await db.all(`SELECT * FROM categories`);
    await db.close();
    return categories;
  }

  static async findById(id) {
    const db = await getDb();
    const category = await db.get(`SELECT * FROM categories WHERE id = ?`, [id]);
    await db.close();
    return category;
  }

  static async update(id, { nome, descricao, parent_id }) {
    const db = await getDb();
    await db.run(
      `UPDATE categories SET nome = ?, descricao = ?, parent_id = ? WHERE id = ?`,
      [nome, descricao || null, parent_id || null, id]
    );
    await db.close();
  }

  static async delete(id) {
    const db = await getDb();
    await db.run(
      `DELETE FROM categories WHERE id = ?`,
      [id]
    );
    await db.close();
  }
}

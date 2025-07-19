import { getDb } from '../db/connection.js';

export default class User {
  static async create({ full_name, username, password, avatar }) {
    const db = await getDb();
    const result = await db.run(
      `INSERT INTO users (full_name, username, password, avatar) VALUES (?, ?, ?, ?)`,
      [full_name, username, password, avatar]
    );
    await db.close();
    return result.lastID;
  }

  static async findAll() {
    const db = await getDb();
    const users = await db.all(`SELECT * FROM users WHERE deleted_at IS NULL`);
    await db.close();
    return users;
  }

  static async findById(id) {
    const db = await getDb();
    const user = await db.get(`SELECT * FROM users WHERE id = ? AND deleted_at IS NULL`, [id]);
    await db.close();
    return user;
  }

  static async update(id, { full_name, username, password, avatar }) {
    const db = await getDb();
    await db.run(
      `UPDATE users SET full_name = ?, username = ?, password = ?, avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL`,
      [full_name, username, password, avatar, id]
    );
    await db.close();
  }

  static async delete(id) {
    const db = await getDb();
    await db.run(
      `UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [id]
    );
    await db.close();
  }
}

import pool from "../database/db.js";

export class PgUserRepository {
  async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1 LIMIT 1",
      [email]
    );
    return rows[0] || null;
  }

  async create({ name, email, password }) {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role, createddate`,
      [name, email, password]
    );
    return rows[0];
  }
}

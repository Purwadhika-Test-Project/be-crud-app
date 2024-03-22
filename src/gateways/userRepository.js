class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async create(user) {
    const { username, email, password } = user;
    const [result] = await this.db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );
    return result.insertId;
  }

  async findById(id) {
    const [rows] = await this.db.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async findByEmail(email) {
    const [rows] = await this.db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async update(user) {
    const { id, username, email, password } = user;
    await this.db.query(
      "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
      [username, email, password, id]
    );
  }

  async delete(id) {
    await this.db.query("DELETE FROM users WHERE id = ?", [id]);
  }
}

module.exports = UserRepository;

import { Database } from "config/database";

class UserRepository {
  constructor(private readonly db = new Database()) {}

  async findAll() {
    const query = "SELECT * FROM users";
    return await this.db.query(query);
  }

  async findById(id: number) {
    const query = "SELECT * FROM users WHERE id = $1";
    const params = [id];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async findByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const params = [email];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async insert(user: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    const query =
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *";
    const params = [user.name, user.email, user.password, user.role || "user"];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async update(
    id: number,
    user: { name: string; email: string; password?: string; role?: string }
  ) {
    let query: string;
    let params: any[];

    if (user.password) {
      query =
        "UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *";
      params = [user.name, user.email, user.password, user.role, id];
    } else {
      query =
        "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *";
      params = [user.name, user.email, user.role, id];
    }

    const result = await this.db.query(query, params);
    return result[0];
  }

  async delete(id: number) {
    const query = "DELETE FROM users WHERE id = $1";
    const params = [id];
    await this.db.query(query, params);
  }
}

export { UserRepository };

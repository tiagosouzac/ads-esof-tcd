import { Session } from "app/models/session.model";
import { Database } from "config/database";

class SessionRepository {
  constructor(private readonly db = new Database()) {}

  async findByToken(token: string) {
    const query = "SELECT * FROM sessions WHERE token = $1";
    const params = [token];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async findById(id: number) {
    const query = "SELECT * FROM sessions WHERE id = $1";
    const params = [id];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async insert(session: Session) {
    const query =
      "INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *";
    const params = [session.userId, session.token, session.expiresAt];
    const result = await this.db.query(query, params);
    return result[0];
  }

  async delete(sessionId: number) {
    const query = "DELETE FROM sessions WHERE id = $1";
    const params = [sessionId];
    await this.db.query(query, params);
  }
}

export { SessionRepository };

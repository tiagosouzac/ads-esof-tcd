import pg, { Query, QueryResult, QueryResultRow } from "pg";
import { env } from "config/env";

class Database {
  private client: pg.Client | null = null;

  async connect() {
    if (!this.client) {
      this.client = new pg.Client({
        host: env.get("DATABASE_HOST"),
        port: env.get("DATABASE_PORT"),
        database: env.get("DATABASE_NAME"),
        user: env.get("DATABASE_USERNAME"),
        password: env.get("DATABASE_PASSWORD"),
      });

      await this.client.connect();
    }
  }

  async query<T extends QueryResultRow>(
    query: string,
    params: unknown[] = []
  ): Promise<QueryResult<T>["rows"]> {
    try {
      await this.connect();
      const result = await this.client!.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    } finally {
      await this.client?.end();
      this.client = null;
    }
  }
}

export { Database };

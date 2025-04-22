import pg, { Pool, QueryResult, QueryResultRow } from "pg";
import { env } from "config/env";

class Database {
  private static pool: Pool | null = null;

  private getPool(): Pool {
    if (!Database.pool) {
      Database.pool = new pg.Pool({
        host: env.get("DATABASE_HOST"),
        port: env.get("DATABASE_PORT"),
        database: env.get("DATABASE_NAME"),
        user: env.get("DATABASE_USERNAME"),
        password: env.get("DATABASE_PASSWORD"),
        max: 20,
        idleTimeoutMillis: 30000,
      });

      Database.pool.on("error", (err) => {
        console.error("Unexpected error on idle client", err);
      });

      process.on("SIGINT", () => {
        this.closePool();
        process.exit(0);
      });
    }
    return Database.pool;
  }

  async query<T extends QueryResultRow>(
    query: string,
    params: unknown[] = []
  ): Promise<QueryResult<T>["rows"]> {
    const client = await this.getPool().connect();
    try {
      const result = await client.query<T>(query, params);
      return result.rows;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  async closePool(): Promise<void> {
    if (Database.pool) {
      await Database.pool.end();
      Database.pool = null;
    }
  }
}

export { Database };

import { DataSource } from "typeorm";
import { env } from "config/env";

class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: env.get("DATABASE_HOST"),
      port: env.get("DATABASE_PORT"),
      database: env.get("DATABASE_NAME"),
      username: env.get("DATABASE_USERNAME"),
      password: env.get("DATABASE_PASSWORD"),
      synchronize: false,
      logging: false,
      entities: ["app/entities/**/*.entity.ts"],
      migrations: ["infra/migrations/**/*.ts"],
    });
  }

  async initialize() {
    try {
      await this.dataSource.initialize();
      console.log("Database connected successfully! 🚀");
    } catch (error) {
      console.error("Error during database initialization:", error);
      throw error;
    }
  }

  getDataSource() {
    return this.dataSource;
  }
}

const database = new Database();

export { database };

// Used by TypeORM to perform migrations
export default database.getDataSource();

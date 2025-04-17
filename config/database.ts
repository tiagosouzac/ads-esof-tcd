import { DataSource } from "typeorm";

class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "local_user",
      password: "local_password",
      database: "local_db",
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

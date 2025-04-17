import { DataSource } from "typeorm";

class Database {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: "infra/db.sqlite",
      synchronize: false,
      logging: false,
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

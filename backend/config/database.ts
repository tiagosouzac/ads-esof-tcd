import { PrismaClient } from "../infra/database/prisma/generated/prisma";

class Database {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient();
    }

    return Database.instance;
  }

  static async connect() {
    const client = Database.getInstance();

    try {
      await client.$connect();
      console.log("🎲 Database connected!");
    } catch (error) {
      console.error("Error connecting to the database", error);
    }
  }

  static async disconnect() {
    if (Database.instance) {
      try {
        await Database.instance.$disconnect();
        console.log("Database disconnected");
      } catch (error) {
        console.error("Error disconnecting from the database", error);
      }
    }
  }
}

export { Database };

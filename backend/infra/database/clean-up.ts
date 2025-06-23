import { PrismaClient } from "./prisma/generated/prisma";

const prisma = new PrismaClient();

async function cleanUpDatabase() {
  await prisma.$transaction([
    prisma.$executeRawUnsafe(`DELETE FROM tasks;`),
    prisma.$executeRawUnsafe(`DELETE FROM prototypes;`),
    prisma.$executeRawUnsafe(`DELETE FROM requirements;`),
    prisma.$executeRawUnsafe(`DELETE FROM projects;`),
    prisma.$executeRawUnsafe(`DELETE FROM users;`),

    prisma.$executeRawUnsafe(`ALTER TABLE tasks AUTO_INCREMENT = 1;`),
    prisma.$executeRawUnsafe(`ALTER TABLE prototypes AUTO_INCREMENT = 1;`),
    prisma.$executeRawUnsafe(`ALTER TABLE requirements AUTO_INCREMENT = 1;`),
    prisma.$executeRawUnsafe(`ALTER TABLE projects AUTO_INCREMENT = 1;`),
    prisma.$executeRawUnsafe(`ALTER TABLE users AUTO_INCREMENT = 1;`),
  ]);
}

export { cleanUpDatabase };

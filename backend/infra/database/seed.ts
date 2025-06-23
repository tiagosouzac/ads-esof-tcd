import { cleanUpDatabase } from "./clean-up";
import { PrismaClient } from "./prisma/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seedDatabase() {
  await cleanUpDatabase();

  const hashedPassword = bcrypt.hashSync("12345678", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Manager",
        email: "manager@mail.com",
        password: hashedPassword,
        role: "MANAGER",
      },
      {
        name: "Architect",
        email: "architect@mail.com",
        password: hashedPassword,
        role: "ARCHITECT",
      },
      {
        name: "Designer",
        email: "designer@mail.com",
        password: hashedPassword,
        role: "DESIGNER",
      },
      {
        name: "Developer",
        email: "developer@mail.com",
        password: hashedPassword,
        role: "DEVELOPER",
      },
      {
        name: "Quality Analyst",
        email: "qa@mail.com",
        password: hashedPassword,
        role: "QUALITY_ANALYST",
      },
    ],
  });
}

seedDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export { seedDatabase };

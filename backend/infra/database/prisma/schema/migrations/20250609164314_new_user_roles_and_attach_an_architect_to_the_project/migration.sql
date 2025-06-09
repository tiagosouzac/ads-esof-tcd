/*
  Warnings:

  - The values [ADMIN,PO,PM,VIEWER] on the enum `users_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `userId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('MANAGER', 'ARCHITECT', 'DESIGNER', 'DEVELOPER', 'QUALITY_ANALYST') NOT NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

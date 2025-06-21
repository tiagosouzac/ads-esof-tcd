/*
  Warnings:

  - Added the required column `qualityAnalystId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `qualityAnalystId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_qualityAnalystId_fkey` FOREIGN KEY (`qualityAnalystId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

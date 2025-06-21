/*
  Warnings:

  - Added the required column `designerId` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developerId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` ADD COLUMN `designerId` INTEGER NOT NULL,
    ADD COLUMN `developerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_designerId_fkey` FOREIGN KEY (`designerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_developerId_fkey` FOREIGN KEY (`developerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

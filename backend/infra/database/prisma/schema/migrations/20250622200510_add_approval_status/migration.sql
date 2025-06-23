-- AlterTable
ALTER TABLE `prototypes` ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `requirements` ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false;

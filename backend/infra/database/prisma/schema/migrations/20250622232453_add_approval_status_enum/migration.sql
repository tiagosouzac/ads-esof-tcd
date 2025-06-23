/*
  Warnings:

  - You are about to alter the column `isApproved` on the `prototypes` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `isApproved` on the `requirements` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `isApproved` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `prototypes` MODIFY `isApproved` ENUM('PENDING', 'APPROVED', 'DISAPPROVED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `requirements` MODIFY `isApproved` ENUM('PENDING', 'APPROVED', 'DISAPPROVED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `tasks` MODIFY `isApproved` ENUM('PENDING', 'APPROVED', 'DISAPPROVED') NOT NULL DEFAULT 'PENDING';

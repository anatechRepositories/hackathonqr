/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `barcode` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_barcode_key` ON `User`(`barcode`);

/*
  Warnings:

  - A unique constraint covering the columns `[mobile_promptpay]` on the table `propertys` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile_promptpay` to the `propertys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `propertys` ADD COLUMN `mobile_promptpay` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `is_available` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `propertys_mobile_promptpay_key` ON `propertys`(`mobile_promptpay`);

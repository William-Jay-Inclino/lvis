/*
  Warnings:

  - You are about to alter the column `quantity` on the `item_transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "item_transaction" ALTER COLUMN "quantity" SET DATA TYPE INTEGER;

/*
  Warnings:

  - You are about to drop the column `average_price` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `initial_average_price` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `is_initial` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "average_price",
DROP COLUMN "initial_average_price",
DROP COLUMN "is_initial";

-- AlterTable
ALTER TABLE "item_transaction" ADD COLUMN     "is_initial" BOOLEAN NOT NULL DEFAULT false;

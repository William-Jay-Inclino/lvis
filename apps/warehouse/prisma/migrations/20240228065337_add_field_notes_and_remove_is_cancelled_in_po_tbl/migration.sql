/*
  Warnings:

  - You are about to drop the column `is_cancelled` on the `purchase_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "is_cancelled",
ADD COLUMN     "notes" TEXT;

/*
  Warnings:

  - You are about to drop the column `is_referenced` on the `purchase_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "is_referenced";

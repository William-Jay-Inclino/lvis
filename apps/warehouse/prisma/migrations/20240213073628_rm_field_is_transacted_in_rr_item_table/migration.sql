/*
  Warnings:

  - You are about to drop the column `is_transacted` on the `rr_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rr_item" DROP COLUMN "is_transacted";

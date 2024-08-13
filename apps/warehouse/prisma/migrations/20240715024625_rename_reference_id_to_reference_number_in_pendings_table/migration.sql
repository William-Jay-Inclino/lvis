/*
  Warnings:

  - You are about to drop the column `reference_id` on the `pending` table. All the data in the column will be lost.
  - Added the required column `reference_number` to the `pending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pending" DROP COLUMN "reference_id",
ADD COLUMN     "reference_number" TEXT NOT NULL;

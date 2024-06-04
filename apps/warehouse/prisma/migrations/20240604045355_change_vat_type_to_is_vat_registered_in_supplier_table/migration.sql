/*
  Warnings:

  - You are about to drop the column `vat_type` on the `supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "supplier" DROP COLUMN "vat_type",
ADD COLUMN     "is_vat_registered" BOOLEAN NOT NULL DEFAULT false;

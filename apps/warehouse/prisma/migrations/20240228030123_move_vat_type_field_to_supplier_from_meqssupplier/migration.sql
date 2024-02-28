/*
  Warnings:

  - You are about to drop the column `vat_type` on the `meqs_supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meqs_supplier" DROP COLUMN "vat_type";

-- AlterTable
ALTER TABLE "supplier" ADD COLUMN     "vat_type" INTEGER NOT NULL DEFAULT 1;

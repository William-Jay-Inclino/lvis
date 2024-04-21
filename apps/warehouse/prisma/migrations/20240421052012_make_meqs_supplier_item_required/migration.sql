/*
  Warnings:

  - Made the column `meqs_supplier_item_id` on table `rr_item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "rr_item" ALTER COLUMN "meqs_supplier_item_id" SET NOT NULL;

/*
  Warnings:

  - You are about to drop the column `rr_item_id` on the `meqs_supplier_item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "meqs_supplier_item" DROP CONSTRAINT "meqs_supplier_item_rr_item_id_fkey";

-- AlterTable
ALTER TABLE "meqs_supplier_item" DROP COLUMN "rr_item_id";

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_meqs_supplier_item_id_fkey" FOREIGN KEY ("meqs_supplier_item_id") REFERENCES "meqs_supplier_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

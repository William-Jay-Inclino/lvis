/*
  Warnings:

  - You are about to drop the column `supplier_id` on the `supplier_item` table. All the data in the column will be lost.
  - Added the required column `meqs_supplier_id` to the `supplier_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "canvass_item" DROP CONSTRAINT "canvass_item_canvass_id_fkey";

-- DropForeignKey
ALTER TABLE "canvass_item" DROP CONSTRAINT "canvass_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_item" DROP CONSTRAINT "supplier_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_item" DROP CONSTRAINT "supplier_item_supplier_id_fkey";

-- AlterTable
ALTER TABLE "supplier_item" DROP COLUMN "supplier_id",
ADD COLUMN     "meqs_supplier_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_item" ADD CONSTRAINT "supplier_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_item" ADD CONSTRAINT "supplier_item_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

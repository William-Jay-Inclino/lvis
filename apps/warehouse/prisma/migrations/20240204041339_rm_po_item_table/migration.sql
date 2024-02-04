/*
  Warnings:

  - You are about to drop the `POItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "POItem" DROP CONSTRAINT "POItem_meqs_supplier_item_id_fkey";

-- DropForeignKey
ALTER TABLE "POItem" DROP CONSTRAINT "POItem_po_id_fkey";

-- DropTable
DROP TABLE "POItem";

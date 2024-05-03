-- DropForeignKey
ALTER TABLE "rr_item" DROP CONSTRAINT "rr_item_meqs_supplier_item_id_fkey";

-- DropIndex
DROP INDEX "rr_item_meqs_supplier_item_id_key";

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_meqs_supplier_item_id_fkey" FOREIGN KEY ("meqs_supplier_item_id") REFERENCES "meqs_supplier_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

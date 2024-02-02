-- DropForeignKey
ALTER TABLE "meqs_supplier_item" DROP CONSTRAINT "meqs_supplier_item_meqs_supplier_id_fkey";

-- AddForeignKey
ALTER TABLE "meqs_supplier_item" ADD CONSTRAINT "meqs_supplier_item_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "meqs_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

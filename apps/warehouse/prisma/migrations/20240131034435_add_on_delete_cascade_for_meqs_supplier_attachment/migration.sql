-- DropForeignKey
ALTER TABLE "meqs_supplier_attachment" DROP CONSTRAINT "meqs_supplier_attachment_meqs_supplier_id_fkey";

-- AddForeignKey
ALTER TABLE "meqs_supplier_attachment" ADD CONSTRAINT "meqs_supplier_attachment_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "meqs_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

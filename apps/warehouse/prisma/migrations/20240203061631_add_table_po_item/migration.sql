-- DropForeignKey
ALTER TABLE "jo_approver" DROP CONSTRAINT "jo_approver_jo_id_fkey";

-- DropForeignKey
ALTER TABLE "meqs_approver" DROP CONSTRAINT "meqs_approver_meqs_id_fkey";

-- DropForeignKey
ALTER TABLE "meqs_supplier" DROP CONSTRAINT "meqs_supplier_meqs_id_fkey";

-- DropForeignKey
ALTER TABLE "po_approver" DROP CONSTRAINT "po_approver_po_id_fkey";

-- DropForeignKey
ALTER TABLE "spr_approver" DROP CONSTRAINT "spr_approver_spr_id_fkey";

-- CreateTable
CREATE TABLE "POItem" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "meqs_supplier_item_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "POItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "POItem_meqs_supplier_item_id_key" ON "POItem"("meqs_supplier_item_id");

-- AddForeignKey
ALTER TABLE "jo_approver" ADD CONSTRAINT "jo_approver_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver" ADD CONSTRAINT "spr_approver_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier" ADD CONSTRAINT "meqs_supplier_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver" ADD CONSTRAINT "meqs_approver_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "POItem" ADD CONSTRAINT "POItem_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "POItem" ADD CONSTRAINT "POItem_meqs_supplier_item_id_fkey" FOREIGN KEY ("meqs_supplier_item_id") REFERENCES "meqs_supplier_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver" ADD CONSTRAINT "po_approver_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

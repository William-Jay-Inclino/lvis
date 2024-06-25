/*
  Warnings:

  - A unique constraint covering the columns `[invoice_number]` on the table `receiving_report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "canvass_item_canvass_id_brand_id_unit_id_item_id_idx" ON "canvass_item"("canvass_id", "brand_id", "unit_id", "item_id");

-- CreateIndex
CREATE INDEX "item_item_type_id_unit_id_name_created_by_idx" ON "item"("item_type_id", "unit_id", "name", "created_by");

-- CreateIndex
CREATE INDEX "item_transaction_item_id_idx" ON "item_transaction"("item_id");

-- CreateIndex
CREATE INDEX "jo_approver_jo_id_idx" ON "jo_approver"("jo_id");

-- CreateIndex
CREATE INDEX "job_order_date_requested_idx" ON "job_order"("date_requested");

-- CreateIndex
CREATE INDEX "material_equipment_quotation_summary_meqs_date_idx" ON "material_equipment_quotation_summary"("meqs_date");

-- CreateIndex
CREATE INDEX "meqs_approver_meqs_id_idx" ON "meqs_approver"("meqs_id");

-- CreateIndex
CREATE INDEX "meqs_supplier_meqs_id_supplier_id_idx" ON "meqs_supplier"("meqs_id", "supplier_id");

-- CreateIndex
CREATE INDEX "meqs_supplier_attachment_meqs_supplier_id_idx" ON "meqs_supplier_attachment"("meqs_supplier_id");

-- CreateIndex
CREATE INDEX "meqs_supplier_item_meqs_supplier_id_canvass_item_id_idx" ON "meqs_supplier_item"("meqs_supplier_id", "canvass_item_id");

-- CreateIndex
CREATE INDEX "po_approver_po_id_idx" ON "po_approver"("po_id");

-- CreateIndex
CREATE INDEX "purchase_order_po_date_idx" ON "purchase_order"("po_date");

-- CreateIndex
CREATE UNIQUE INDEX "receiving_report_invoice_number_key" ON "receiving_report"("invoice_number");

-- CreateIndex
CREATE INDEX "receiving_report_po_id_rr_date_idx" ON "receiving_report"("po_id", "rr_date");

-- CreateIndex
CREATE INDEX "request_voucher_date_requested_idx" ON "request_voucher"("date_requested");

-- CreateIndex
CREATE INDEX "rr_approver_rr_id_idx" ON "rr_approver"("rr_id");

-- CreateIndex
CREATE INDEX "rr_item_rr_id_meqs_supplier_item_id_idx" ON "rr_item"("rr_id", "meqs_supplier_item_id");

-- CreateIndex
CREATE INDEX "rv_approver_rv_id_idx" ON "rv_approver"("rv_id");

-- CreateIndex
CREATE INDEX "spare_parts_request_date_requested_idx" ON "spare_parts_request"("date_requested");

-- CreateIndex
CREATE INDEX "spr_approver_spr_id_idx" ON "spr_approver"("spr_id");

-- CreateIndex
CREATE INDEX "supplier_name_idx" ON "supplier"("name");

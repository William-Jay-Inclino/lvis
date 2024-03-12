-- CreateTable
CREATE TABLE "canvass" (
    "id" TEXT NOT NULL,
    "rc_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "purpose" TEXT NOT NULL,
    "notes" TEXT,
    "requested_by_id" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "canvass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "canvass_item" (
    "id" TEXT NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "brand_id" TEXT,
    "unit_id" TEXT,
    "item_id" TEXT,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "canvass_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_voucher" (
    "id" TEXT NOT NULL,
    "rv_number" TEXT NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "classification_id" TEXT,
    "supervisor_id" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "work_order_no" TEXT,
    "work_order_date" TIMESTAMP(3),
    "date_cancelled" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "cancelled_by" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "request_voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rv_approver" (
    "id" TEXT NOT NULL,
    "rv_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rv_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_order" (
    "id" TEXT NOT NULL,
    "jo_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "classification_id" TEXT,
    "department_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "date_cancelled" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "cancelled_by" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jo_approver" (
    "id" TEXT NOT NULL,
    "jo_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "jo_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spare_parts_request" (
    "id" TEXT NOT NULL,
    "spr_number" TEXT NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "canvass_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "classification_id" TEXT,
    "supervisor_id" TEXT NOT NULL,
    "date_cancelled" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "cancelled_by" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spare_parts_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spr_approver" (
    "id" TEXT NOT NULL,
    "spr_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "spr_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_equipment_quotation_summary" (
    "id" TEXT NOT NULL,
    "jo_id" TEXT,
    "rv_id" TEXT,
    "spr_id" TEXT,
    "meqs_number" TEXT NOT NULL,
    "meqs_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cancelled_at" TIMESTAMP(3),

    CONSTRAINT "material_equipment_quotation_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_supplier" (
    "id" TEXT NOT NULL,
    "meqs_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "payment_terms" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meqs_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_supplier_item" (
    "id" TEXT NOT NULL,
    "meqs_supplier_id" TEXT NOT NULL,
    "canvass_item_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "notes" TEXT NOT NULL,
    "is_awarded" BOOLEAN NOT NULL DEFAULT false,
    "vat_type" INTEGER NOT NULL DEFAULT 1,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meqs_supplier_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_supplier_attachment" (
    "id" TEXT NOT NULL,
    "meqs_supplier_id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meqs_supplier_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meqs_approver" (
    "id" TEXT NOT NULL,
    "meqs_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meqs_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "id" TEXT NOT NULL,
    "meqs_supplier_id" TEXT NOT NULL,
    "po_number" TEXT NOT NULL,
    "po_date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "cancelled_by" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "po_approver" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "po_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receiving_report" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "rr_number" TEXT NOT NULL,
    "rr_date" TIMESTAMP(3) NOT NULL,
    "received_by_id" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "delivery_number" TEXT,
    "notes" TEXT NOT NULL,
    "delivery_charge" DOUBLE PRECISION NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "cancelled_by" TEXT,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "cancelled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receiving_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rr_approver" (
    "id" TEXT NOT NULL,
    "rr_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "rr_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rr_item" (
    "id" TEXT NOT NULL,
    "rr_id" TEXT NOT NULL,
    "meqs_supplier_item_id" TEXT,
    "quantity_accepted" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rr_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "item_type_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "total_quantity" INTEGER NOT NULL,
    "initial_quantity" INTEGER NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_transaction" (
    "id" SERIAL NOT NULL,
    "item_id" TEXT NOT NULL,
    "rr_item_id" TEXT,
    "type" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "is_initial" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "item_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "vat_type" INTEGER NOT NULL DEFAULT 1,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "deleted_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "canvass_rc_number_key" ON "canvass"("rc_number");

-- CreateIndex
CREATE UNIQUE INDEX "request_voucher_rv_number_key" ON "request_voucher"("rv_number");

-- CreateIndex
CREATE UNIQUE INDEX "request_voucher_canvass_id_key" ON "request_voucher"("canvass_id");

-- CreateIndex
CREATE UNIQUE INDEX "job_order_jo_number_key" ON "job_order"("jo_number");

-- CreateIndex
CREATE UNIQUE INDEX "job_order_canvass_id_key" ON "job_order"("canvass_id");

-- CreateIndex
CREATE UNIQUE INDEX "spare_parts_request_spr_number_key" ON "spare_parts_request"("spr_number");

-- CreateIndex
CREATE UNIQUE INDEX "spare_parts_request_canvass_id_key" ON "spare_parts_request"("canvass_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_jo_id_key" ON "material_equipment_quotation_summary"("jo_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_rv_id_key" ON "material_equipment_quotation_summary"("rv_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_spr_id_key" ON "material_equipment_quotation_summary"("spr_id");

-- CreateIndex
CREATE UNIQUE INDEX "material_equipment_quotation_summary_meqs_number_key" ON "material_equipment_quotation_summary"("meqs_number");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_supplier_meqs_id_supplier_id_key" ON "meqs_supplier"("meqs_id", "supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_meqs_supplier_id_key" ON "purchase_order"("meqs_supplier_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_po_number_key" ON "purchase_order"("po_number");

-- CreateIndex
CREATE UNIQUE INDEX "receiving_report_po_id_key" ON "receiving_report"("po_id");

-- CreateIndex
CREATE UNIQUE INDEX "receiving_report_rr_number_key" ON "receiving_report"("rr_number");

-- CreateIndex
CREATE UNIQUE INDEX "rr_item_meqs_supplier_item_id_key" ON "rr_item"("meqs_supplier_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_code_key" ON "item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "item_transaction_rr_item_id_key" ON "item_transaction"("rr_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_name_key" ON "unit"("name");

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_voucher" ADD CONSTRAINT "request_voucher_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver" ADD CONSTRAINT "rv_approver_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_order" ADD CONSTRAINT "job_order_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jo_approver" ADD CONSTRAINT "jo_approver_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_canvass_id_fkey" FOREIGN KEY ("canvass_id") REFERENCES "canvass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spare_parts_request" ADD CONSTRAINT "spare_parts_request_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver" ADD CONSTRAINT "spr_approver_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_jo_id_fkey" FOREIGN KEY ("jo_id") REFERENCES "job_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_equipment_quotation_summary" ADD CONSTRAINT "material_equipment_quotation_summary_spr_id_fkey" FOREIGN KEY ("spr_id") REFERENCES "spare_parts_request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier" ADD CONSTRAINT "meqs_supplier_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier" ADD CONSTRAINT "meqs_supplier_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier_item" ADD CONSTRAINT "meqs_supplier_item_canvass_item_id_fkey" FOREIGN KEY ("canvass_item_id") REFERENCES "canvass_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier_item" ADD CONSTRAINT "meqs_supplier_item_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "meqs_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier_attachment" ADD CONSTRAINT "meqs_supplier_attachment_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "meqs_supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver" ADD CONSTRAINT "meqs_approver_meqs_id_fkey" FOREIGN KEY ("meqs_id") REFERENCES "material_equipment_quotation_summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "meqs_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver" ADD CONSTRAINT "po_approver_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receiving_report" ADD CONSTRAINT "receiving_report_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_approver" ADD CONSTRAINT "rr_approver_rr_id_fkey" FOREIGN KEY ("rr_id") REFERENCES "receiving_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_rr_id_fkey" FOREIGN KEY ("rr_id") REFERENCES "receiving_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_meqs_supplier_item_id_fkey" FOREIGN KEY ("meqs_supplier_item_id") REFERENCES "meqs_supplier_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_transaction" ADD CONSTRAINT "item_transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_transaction" ADD CONSTRAINT "item_transaction_rr_item_id_fkey" FOREIGN KEY ("rr_item_id") REFERENCES "rr_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

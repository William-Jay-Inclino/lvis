-- CreateTable
CREATE TABLE "receiving_report" (
    "id" TEXT NOT NULL,
    "po_id" TEXT NOT NULL,
    "rr_number" TEXT NOT NULL,
    "rr_date" TIMESTAMP(3) NOT NULL,
    "received_by_id" TEXT NOT NULL,
    "canceller_id" TEXT,
    "date_cancelled" TIMESTAMP(3),
    "invoice_number" TEXT NOT NULL,
    "delivery_number" TEXT,
    "notes" TEXT,
    "delivery_charge" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "receiving_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rr_approver" (
    "id" TEXT NOT NULL,
    "rr_id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "approver_proxy_id" TEXT,
    "date_approval" TIMESTAMP(3),
    "notes" TEXT,
    "status" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rr_approver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rr_item" (
    "id" TEXT NOT NULL,
    "rr_id" TEXT NOT NULL,
    "item_id" TEXT,
    "item_brand_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "item_class" INTEGER NOT NULL,
    "quantity_delivered" INTEGER NOT NULL,
    "quantity_accepted" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "vat_type" INTEGER NOT NULL,
    "gross_price" DOUBLE PRECISION NOT NULL,
    "net_price" DOUBLE PRECISION NOT NULL,
    "freight_cost" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rr_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "item_type_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "initial_quantity" INTEGER NOT NULL,
    "average_price" DOUBLE PRECISION NOT NULL,
    "initial_average_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_transaction" (
    "id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,
    "rr_item_id" TEXT,
    "type" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "item_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "receiving_report_po_id_key" ON "receiving_report"("po_id");

-- CreateIndex
CREATE UNIQUE INDEX "receiving_report_rr_number_key" ON "receiving_report"("rr_number");

-- CreateIndex
CREATE UNIQUE INDEX "item_code_key" ON "item"("code");

-- CreateIndex
CREATE UNIQUE INDEX "item_transaction_rr_item_id_key" ON "item_transaction"("rr_item_id");

-- AddForeignKey
ALTER TABLE "receiving_report" ADD CONSTRAINT "receiving_report_po_id_fkey" FOREIGN KEY ("po_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_approver" ADD CONSTRAINT "rr_approver_rr_id_fkey" FOREIGN KEY ("rr_id") REFERENCES "receiving_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_rr_id_fkey" FOREIGN KEY ("rr_id") REFERENCES "receiving_report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_item_brand_id_fkey" FOREIGN KEY ("item_brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_item" ADD CONSTRAINT "rr_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_transaction" ADD CONSTRAINT "item_transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_transaction" ADD CONSTRAINT "item_transaction_rr_item_id_fkey" FOREIGN KEY ("rr_item_id") REFERENCES "rr_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

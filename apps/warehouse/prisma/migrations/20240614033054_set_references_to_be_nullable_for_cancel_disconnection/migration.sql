-- AlterTable
ALTER TABLE "job_order" ALTER COLUMN "canvass_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "purchase_order" ALTER COLUMN "meqs_supplier_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "receiving_report" ALTER COLUMN "po_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" ALTER COLUMN "canvass_id" DROP NOT NULL;

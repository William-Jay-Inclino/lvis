-- AlterTable
ALTER TABLE "job_order" ADD COLUMN     "date_cancelled" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ADD COLUMN     "date_cancelled" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "date_cancelled" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "request_voucher" ADD COLUMN     "date_cancelled" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "spare_parts_request" ADD COLUMN     "date_cancelled" TIMESTAMP(3);

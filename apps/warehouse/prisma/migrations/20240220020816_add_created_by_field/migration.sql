/*
  Warnings:

  - Added the required column `created_by_id` to the `canvass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `job_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `material_equipment_quotation_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `receiving_report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `request_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `spare_parts_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canvass" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_order" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receiving_report" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" ADD COLUMN     "created_by_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" ADD COLUMN     "created_by_id" TEXT NOT NULL;

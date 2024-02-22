/*
  Warnings:

  - You are about to drop the column `status` on the `job_order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `receiving_report` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `request_voucher` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `spare_parts_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job_order" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "receiving_report" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "spare_parts_request" DROP COLUMN "status",
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "LOG_OPERATION";

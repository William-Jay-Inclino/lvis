/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `canvass` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `job_order` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `material_equipment_quotation_summary` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `receiving_report` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `request_voucher` table. All the data in the column will be lost.
  - You are about to drop the column `created_by_id` on the `spare_parts_request` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `canvass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `job_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `material_equipment_quotation_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `purchase_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `receiving_report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `request_voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `spare_parts_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "canvass" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_order" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "material_equipment_quotation_summary" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "receiving_report" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "spare_parts_request" DROP COLUMN "created_by_id",
ADD COLUMN     "created_by" TEXT NOT NULL;

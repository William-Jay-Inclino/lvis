/*
  Warnings:

  - You are about to drop the column `date_cancelled` on the `job_order` table. All the data in the column will be lost.
  - You are about to drop the column `date_cancelled` on the `request_voucher` table. All the data in the column will be lost.
  - You are about to drop the column `date_cancelled` on the `spare_parts_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job_order" DROP COLUMN "date_cancelled";

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "date_cancelled";

-- AlterTable
ALTER TABLE "spare_parts_request" DROP COLUMN "date_cancelled";

/*
  Warnings:

  - You are about to drop the column `is_referenced` on the `canvass` table. All the data in the column will be lost.
  - You are about to drop the column `is_referenced` on the `request_voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "canvass" DROP COLUMN "is_referenced";

-- AlterTable
ALTER TABLE "request_voucher" DROP COLUMN "is_referenced";

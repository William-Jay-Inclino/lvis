/*
  Warnings:

  - You are about to drop the column `noted_by_id` on the `canvass` table. All the data in the column will be lost.
  - You are about to drop the column `approver_id` on the `jo_approver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "canvass" DROP COLUMN "noted_by_id";

-- AlterTable
ALTER TABLE "jo_approver" DROP COLUMN "approver_id",
ADD COLUMN     "approver_proxy_id" TEXT;

-- AlterTable
ALTER TABLE "meqs_approver" ADD COLUMN     "approver_proxy_id" TEXT;

-- AlterTable
ALTER TABLE "po_approver" ADD COLUMN     "approver_proxy_id" TEXT;

-- AlterTable
ALTER TABLE "rv_approver" ADD COLUMN     "approver_proxy_id" TEXT;

-- AlterTable
ALTER TABLE "spr_approver" ADD COLUMN     "approver_proxy_id" TEXT;

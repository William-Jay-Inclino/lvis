/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `jo_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `jo_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `meqs_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `meqs_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `po_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `po_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `rr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `rr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `rv_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `rv_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `spr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_by` on the `spr_approver_setting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "jo_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

-- AlterTable
ALTER TABLE "meqs_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

-- AlterTable
ALTER TABLE "po_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

-- AlterTable
ALTER TABLE "rr_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

-- AlterTable
ALTER TABLE "rv_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

-- AlterTable
ALTER TABLE "spr_approver_setting" DROP COLUMN "deleted_at",
DROP COLUMN "deleted_by";

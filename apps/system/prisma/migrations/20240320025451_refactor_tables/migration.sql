/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `classification` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `department` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `division` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `feature` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `jo_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `jo_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `meqs_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `meqs_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `module` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `po_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `po_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `rr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `rr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `rv_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `rv_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `approver_proxy_id` on the `spr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `spr_approver_setting` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `user_employee` table. All the data in the column will be lost.
  - You are about to drop the `user_permission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_by` to the `classification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `division` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `feature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `jo_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `meqs_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `po_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `rr_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `rv_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `spr_approver_setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `user_employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jo_approver_setting" DROP CONSTRAINT "jo_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "meqs_approver_setting" DROP CONSTRAINT "meqs_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "po_approver_setting" DROP CONSTRAINT "po_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "rr_approver_setting" DROP CONSTRAINT "rr_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "rv_approver_setting" DROP CONSTRAINT "rv_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "spr_approver_setting" DROP CONSTRAINT "spr_approver_setting_approver_proxy_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_submodule_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_user_id_fkey";

-- DropIndex
DROP INDEX "jo_approver_setting_approver_proxy_id_key";

-- DropIndex
DROP INDEX "meqs_approver_setting_approver_proxy_id_key";

-- DropIndex
DROP INDEX "po_approver_setting_approver_proxy_id_key";

-- DropIndex
DROP INDEX "rr_approver_setting_approver_proxy_id_key";

-- DropIndex
DROP INDEX "rv_approver_setting_approver_proxy_id_key";

-- DropIndex
DROP INDEX "spr_approver_setting_approver_proxy_id_key";

-- AlterTable
ALTER TABLE "classification" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "department" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "division" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "feature" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "jo_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "meqs_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "module" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "po_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "rr_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "rv_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "spr_approver_setting" DROP COLUMN "approver_proxy_id",
DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

-- AlterTable
ALTER TABLE "user_employee" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT;

-- DropTable
DROP TABLE "user_permission";

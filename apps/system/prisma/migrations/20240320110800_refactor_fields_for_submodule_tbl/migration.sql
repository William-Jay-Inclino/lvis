/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `submodule` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `submodule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submodule" DROP COLUMN "is_deleted",
ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "deleted_by" TEXT,
ADD COLUMN     "updated_by" TEXT;

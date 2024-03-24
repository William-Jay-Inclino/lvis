/*
  Warnings:

  - You are about to drop the `feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submodule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "feature" DROP CONSTRAINT "feature_service_id_fkey";

-- DropForeignKey
ALTER TABLE "module" DROP CONSTRAINT "module_feature_id_fkey";

-- DropForeignKey
ALTER TABLE "submodule" DROP CONSTRAINT "submodule_module_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "permissions" JSONB;

-- DropTable
DROP TABLE "feature";

-- DropTable
DROP TABLE "module";

-- DropTable
DROP TABLE "service";

-- DropTable
DROP TABLE "submodule";

/*
  Warnings:

  - You are about to drop the column `brand_id` on the `canvass_item` table. All the data in the column will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "canvass_item" DROP CONSTRAINT "canvass_item_brand_id_fkey";

-- DropIndex
DROP INDEX "canvass_item_canvass_id_brand_id_unit_id_item_id_idx";

-- AlterTable
ALTER TABLE "canvass_item" DROP COLUMN "brand_id";

-- DropTable
DROP TABLE "brand";

-- CreateIndex
CREATE INDEX "canvass_item_canvass_id_unit_id_item_id_idx" ON "canvass_item"("canvass_id", "unit_id", "item_id");

/*
  Warnings:

  - You are about to drop the column `item_id` on the `canvass_item` table. All the data in the column will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `canvass_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `canvass_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `canvass_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "canvass_item" DROP CONSTRAINT "canvass_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_item" DROP CONSTRAINT "supplier_item_item_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_item" DROP CONSTRAINT "supplier_item_meqs_supplier_id_fkey";

-- DropIndex
DROP INDEX "canvass_item_item_id_key";

-- AlterTable
ALTER TABLE "canvass_item" DROP COLUMN "item_id",
ADD COLUMN     "brand_id" TEXT,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unit_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "supplier_item";

-- CreateTable
CREATE TABLE "meqs_supplier_item" (
    "id" TEXT NOT NULL,
    "canvass_item_id" TEXT NOT NULL,
    "meqs_supplier_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "is_awarded" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "meqs_supplier_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "canvass_item" ADD CONSTRAINT "canvass_item_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier_item" ADD CONSTRAINT "meqs_supplier_item_canvass_item_id_fkey" FOREIGN KEY ("canvass_item_id") REFERENCES "canvass_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_supplier_item" ADD CONSTRAINT "meqs_supplier_item_meqs_supplier_id_fkey" FOREIGN KEY ("meqs_supplier_id") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

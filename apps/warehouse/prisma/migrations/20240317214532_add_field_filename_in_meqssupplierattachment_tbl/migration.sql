/*
  Warnings:

  - A unique constraint covering the columns `[src]` on the table `meqs_supplier_attachment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "meqs_supplier_attachment" ADD COLUMN     "filename" TEXT NOT NULL DEFAULT 'test';

-- CreateIndex
CREATE UNIQUE INDEX "meqs_supplier_attachment_src_key" ON "meqs_supplier_attachment"("src");

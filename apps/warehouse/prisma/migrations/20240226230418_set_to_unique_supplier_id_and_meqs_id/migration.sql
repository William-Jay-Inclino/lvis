/*
  Warnings:

  - A unique constraint covering the columns `[meqs_id,supplier_id]` on the table `meqs_supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "meqs_supplier_meqs_id_supplier_id_key" ON "meqs_supplier"("meqs_id", "supplier_id");

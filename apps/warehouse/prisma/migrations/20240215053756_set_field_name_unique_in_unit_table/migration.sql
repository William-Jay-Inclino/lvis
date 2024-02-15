/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `unit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unit_name_key" ON "unit"("name");

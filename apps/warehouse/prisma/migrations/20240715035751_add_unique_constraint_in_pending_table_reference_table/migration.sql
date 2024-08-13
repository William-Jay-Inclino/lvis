/*
  Warnings:

  - A unique constraint covering the columns `[approver_id,reference_number,reference_table]` on the table `pending` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "pending_approver_id_reference_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "pending_approver_id_reference_number_reference_table_key" ON "pending"("approver_id", "reference_number", "reference_table");

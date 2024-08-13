/*
  Warnings:

  - A unique constraint covering the columns `[approver_id,reference_number]` on the table `pending` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pending_approver_id_reference_number_key" ON "pending"("approver_id", "reference_number");

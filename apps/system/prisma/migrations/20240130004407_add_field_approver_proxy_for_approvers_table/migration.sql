/*
  Warnings:

  - A unique constraint covering the columns `[approver_proxy_id]` on the table `jo_approver_setting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_proxy_id]` on the table `meqs_approver_setting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_proxy_id]` on the table `po_approver_setting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_proxy_id]` on the table `rv_approver_setting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[approver_proxy_id]` on the table `spr_approver_setting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "rv_approver_setting" ADD COLUMN     "employeeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "jo_approver_setting_approver_proxy_id_key" ON "jo_approver_setting"("approver_proxy_id");

-- CreateIndex
CREATE UNIQUE INDEX "meqs_approver_setting_approver_proxy_id_key" ON "meqs_approver_setting"("approver_proxy_id");

-- CreateIndex
CREATE UNIQUE INDEX "po_approver_setting_approver_proxy_id_key" ON "po_approver_setting"("approver_proxy_id");

-- CreateIndex
CREATE UNIQUE INDEX "rv_approver_setting_approver_proxy_id_key" ON "rv_approver_setting"("approver_proxy_id");

-- CreateIndex
CREATE UNIQUE INDEX "spr_approver_setting_approver_proxy_id_key" ON "spr_approver_setting"("approver_proxy_id");

-- AddForeignKey
ALTER TABLE "jo_approver_setting" ADD CONSTRAINT "jo_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver_setting" ADD CONSTRAINT "rv_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rv_approver_setting" ADD CONSTRAINT "rv_approver_setting_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spr_approver_setting" ADD CONSTRAINT "spr_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meqs_approver_setting" ADD CONSTRAINT "meqs_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approver_setting" ADD CONSTRAINT "po_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

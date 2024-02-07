/*
  Warnings:

  - You are about to drop the column `employeeId` on the `rv_approver_setting` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rv_approver_setting" DROP CONSTRAINT "rv_approver_setting_employeeId_fkey";

-- AlterTable
ALTER TABLE "rv_approver_setting" DROP COLUMN "employeeId";

-- CreateTable
CREATE TABLE "rr_approver_setting" (
    "id" TEXT NOT NULL,
    "approver_id" TEXT NOT NULL,
    "approver_proxy_id" TEXT,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rr_approver_setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rr_approver_setting_approver_id_key" ON "rr_approver_setting"("approver_id");

-- CreateIndex
CREATE UNIQUE INDEX "rr_approver_setting_approver_proxy_id_key" ON "rr_approver_setting"("approver_proxy_id");

-- CreateIndex
CREATE UNIQUE INDEX "rr_approver_setting_order_key" ON "rr_approver_setting"("order");

-- AddForeignKey
ALTER TABLE "rr_approver_setting" ADD CONSTRAINT "rr_approver_setting_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rr_approver_setting" ADD CONSTRAINT "rr_approver_setting_approver_proxy_id_fkey" FOREIGN KEY ("approver_proxy_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

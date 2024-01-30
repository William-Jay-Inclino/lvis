-- DropForeignKey
ALTER TABLE "rv_approver" DROP CONSTRAINT "rv_approver_rv_id_fkey";

-- AddForeignKey
ALTER TABLE "rv_approver" ADD CONSTRAINT "rv_approver_rv_id_fkey" FOREIGN KEY ("rv_id") REFERENCES "request_voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

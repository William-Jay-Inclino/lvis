-- AlterTable
ALTER TABLE "jo_approver" ADD COLUMN     "is_supervisor" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "rv_approver" ADD COLUMN     "is_supervisor" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "spr_approver" ADD COLUMN     "is_supervisor" BOOLEAN NOT NULL DEFAULT false;

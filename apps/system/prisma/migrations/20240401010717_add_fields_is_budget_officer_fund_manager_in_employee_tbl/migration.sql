-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "is_budget_officer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_finance_manager" BOOLEAN NOT NULL DEFAULT false;

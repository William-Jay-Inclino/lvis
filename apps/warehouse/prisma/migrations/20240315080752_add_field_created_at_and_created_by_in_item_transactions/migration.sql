-- AlterTable
ALTER TABLE "item_transaction" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT NOT NULL DEFAULT 'admin';

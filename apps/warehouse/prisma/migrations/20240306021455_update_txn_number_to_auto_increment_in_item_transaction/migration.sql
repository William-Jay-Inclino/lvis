/*
  Warnings:

  - The `txn_number` column on the `item_transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "item_transaction" DROP COLUMN "txn_number",
ADD COLUMN     "txn_number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "item_transaction_txn_number_key" ON "item_transaction"("txn_number");

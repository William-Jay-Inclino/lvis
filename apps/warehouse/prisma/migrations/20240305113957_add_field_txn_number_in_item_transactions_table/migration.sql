/*
  Warnings:

  - A unique constraint covering the columns `[txn_number]` on the table `item_transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `txn_number` to the `item_transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "item_transaction" ADD COLUMN     "txn_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "item_transaction_txn_number_key" ON "item_transaction"("txn_number");

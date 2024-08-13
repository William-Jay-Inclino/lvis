-- CreateTable
CREATE TABLE "pending" (
    "id" SERIAL NOT NULL,
    "approver_id" INTEGER NOT NULL,
    "reference_id" INTEGER NOT NULL,
    "reference_table" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pending_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pending_approver_id_transaction_date_idx" ON "pending"("approver_id", "transaction_date");

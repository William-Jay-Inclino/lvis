-- CreateEnum
CREATE TYPE "LOG_OPERATION" AS ENUM ('CREATE', 'UPDATE');

-- CreateTable
CREATE TABLE "CanvassHistory" (
    "id" SERIAL NOT NULL,
    "rc_number" TEXT NOT NULL,
    "executed_by" TEXT NOT NULL,
    "operation" "LOG_OPERATION" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previous_data" JSONB NOT NULL,
    "new_data" JSONB NOT NULL,

    CONSTRAINT "CanvassHistory_pkey" PRIMARY KEY ("id")
);

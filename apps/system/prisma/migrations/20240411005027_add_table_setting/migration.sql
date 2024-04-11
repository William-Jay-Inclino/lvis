-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "position" TEXT;

-- CreateTable
CREATE TABLE "setting" (
    "id" TEXT NOT NULL,
    "name" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

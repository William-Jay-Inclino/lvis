-- AlterTable
ALTER TABLE "user" ADD COLUMN     "firstname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "middlename" TEXT;

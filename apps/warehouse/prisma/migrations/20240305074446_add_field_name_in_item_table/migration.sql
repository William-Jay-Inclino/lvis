-- AlterTable
ALTER TABLE "item" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'test name',
ALTER COLUMN "description" DROP NOT NULL;

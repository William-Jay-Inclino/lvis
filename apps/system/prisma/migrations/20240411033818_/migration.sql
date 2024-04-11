/*
  Warnings:

  - You are about to drop the column `general_manager_id` on the `setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `setting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `setting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "setting" DROP CONSTRAINT "setting_general_manager_id_fkey";

-- DropIndex
DROP INDEX "setting_general_manager_id_key";

-- AlterTable
ALTER TABLE "setting" DROP COLUMN "general_manager_id",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "setting_key_key" ON "setting"("key");

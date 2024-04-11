/*
  Warnings:

  - You are about to drop the column `name` on the `setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[general_manager_id]` on the table `setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `general_manager_id` to the `setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "setting" DROP COLUMN "name",
ADD COLUMN     "general_manager_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "setting_general_manager_id_key" ON "setting"("general_manager_id");

-- AddForeignKey
ALTER TABLE "setting" ADD CONSTRAINT "setting_general_manager_id_fkey" FOREIGN KEY ("general_manager_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

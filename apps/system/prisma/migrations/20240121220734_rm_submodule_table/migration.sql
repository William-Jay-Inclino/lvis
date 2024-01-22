/*
  Warnings:

  - You are about to drop the column `submodule_id` on the `user_permission` table. All the data in the column will be lost.
  - You are about to drop the `submodule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `module_id` to the `user_permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "submodule" DROP CONSTRAINT "submodule_module_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_submodule_id_fkey";

-- AlterTable
ALTER TABLE "user_permission" DROP COLUMN "submodule_id",
ADD COLUMN     "module_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "submodule";

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

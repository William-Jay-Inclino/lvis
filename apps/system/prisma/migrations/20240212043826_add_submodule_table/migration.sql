/*
  Warnings:

  - You are about to drop the column `module_id` on the `user_permission` table. All the data in the column will be lost.
  - Added the required column `submodule_id` to the `user_permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'IT';

-- DropForeignKey
ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_module_id_fkey";

-- AlterTable
ALTER TABLE "user_permission" DROP COLUMN "module_id",
ADD COLUMN     "submodule_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "submodule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "submodule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_submodule_id_fkey" FOREIGN KEY ("submodule_id") REFERENCES "submodule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submodule" ADD CONSTRAINT "submodule_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

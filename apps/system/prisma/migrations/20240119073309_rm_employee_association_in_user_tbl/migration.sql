/*
  Warnings:

  - You are about to drop the column `employee_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_employee_id_fkey";

-- DropIndex
DROP INDEX "user_employee_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "employee_id";

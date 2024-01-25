/*
  Warnings:

  - You are about to drop the column `department_id` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `employee_number` on the `employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee" DROP CONSTRAINT "employee_department_id_fkey";

-- DropIndex
DROP INDEX "employee_employee_number_key";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "department_id",
DROP COLUMN "employee_number";

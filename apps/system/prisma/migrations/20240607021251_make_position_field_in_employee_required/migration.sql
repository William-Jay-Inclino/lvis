/*
  Warnings:

  - Made the column `position_id` on table `employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "employee" ALTER COLUMN "position_id" SET NOT NULL;

/*
  Warnings:

  - You are about to drop the column `new_data` on the `CanvassHistory` table. All the data in the column will be lost.
  - You are about to drop the column `previous_data` on the `CanvassHistory` table. All the data in the column will be lost.
  - Added the required column `json_data` to the `CanvassHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CanvassHistory" DROP COLUMN "new_data",
DROP COLUMN "previous_data",
ADD COLUMN     "json_data" JSONB NOT NULL;

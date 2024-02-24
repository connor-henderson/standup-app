/*
  Warnings:

  - The `sections` column on the `Work` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Work" DROP COLUMN "sections",
ADD COLUMN     "sections" JSONB[];

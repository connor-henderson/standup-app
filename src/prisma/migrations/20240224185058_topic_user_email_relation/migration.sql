/*
  Warnings:

  - Added the required column `userEmail` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Made the column `topic` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "userEmail" TEXT NOT NULL,
ALTER COLUMN "topic" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

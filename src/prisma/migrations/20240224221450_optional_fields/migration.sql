/*
  Warnings:

  - Made the column `topicId` on table `Bit` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bitId` on table `Joke` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Bit" DROP CONSTRAINT "Bit_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Joke" DROP CONSTRAINT "Joke_bitId_fkey";

-- AlterTable
ALTER TABLE "Bit" ALTER COLUMN "topicId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Joke" ALTER COLUMN "bitId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "topic" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Joke" ADD CONSTRAINT "Joke_bitId_fkey" FOREIGN KEY ("bitId") REFERENCES "Bit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bit" ADD CONSTRAINT "Bit_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Work` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_authorId_fkey";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Work";

-- DropEnum
DROP TYPE "Medium";

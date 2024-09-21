/*
  Warnings:

  - You are about to drop the `DailyStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyStats" DROP CONSTRAINT "DailyStats_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyStats" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "DailyStats";

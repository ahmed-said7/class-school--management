/*
  Warnings:

  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,instructorId]` on the table `review` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "review" DROP CONSTRAINT "review_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "review_pkey" PRIMARY KEY ("userId", "instructorId");

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "ratingQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_instructorId_key" ON "review"("userId", "instructorId");

/*
  Warnings:

  - The primary key for the `subject_grade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `subject_grade` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetCodeVertified` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,subjectId]` on the table `subject_grade` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subject_grade" DROP CONSTRAINT "subject_grade_pkey",
DROP COLUMN "id",
ALTER COLUMN "grade" DROP NOT NULL,
ADD CONSTRAINT "subject_grade_pkey" PRIMARY KEY ("userId", "subjectId");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "passwordResetCodeVertified";

-- CreateIndex
CREATE UNIQUE INDEX "subject_grade_userId_subjectId_key" ON "subject_grade"("userId", "subjectId");

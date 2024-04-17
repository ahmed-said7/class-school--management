/*
  Warnings:

  - Added the required column `userId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "subject_grade" DROP CONSTRAINT "subject_grade_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "subject_grade" DROP CONSTRAINT "subject_grade_userId_fkey";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_grade" ADD CONSTRAINT "subject_grade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_grade" ADD CONSTRAINT "subject_grade_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

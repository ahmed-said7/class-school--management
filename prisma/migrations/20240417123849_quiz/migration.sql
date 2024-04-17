-- CreateTable
CREATE TABLE "quiz" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "grade" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

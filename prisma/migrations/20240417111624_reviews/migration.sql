-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "answers" TEXT[],

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

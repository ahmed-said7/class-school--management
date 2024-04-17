-- AlterTable
ALTER TABLE "user" ADD COLUMN     "passwordChangedAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetCode" TEXT,
ADD COLUMN     "passwordResetCodeExpiresIn" TIMESTAMP(3);

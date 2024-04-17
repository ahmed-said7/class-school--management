/*
  Warnings:

  - You are about to drop the `Facilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FunThings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomFacilities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stay` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('teacher', 'student', 'manager');

-- DropForeignKey
ALTER TABLE "Facilities" DROP CONSTRAINT "Facilities_stayId_fkey";

-- DropTable
DROP TABLE "Facilities";

-- DropTable
DROP TABLE "FunThings";

-- DropTable
DROP TABLE "Meals";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "RoomFacilities";

-- DropTable
DROP TABLE "Stay";

-- DropEnum
DROP TYPE "bedType";

-- DropEnum
DROP TYPE "stayType";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserType" NOT NULL DEFAULT 'student',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

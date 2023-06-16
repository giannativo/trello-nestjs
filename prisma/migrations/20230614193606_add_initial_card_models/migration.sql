-- CreateEnum
CREATE TYPE "CardCategory" AS ENUM ('maintenance', 'research', 'test');

-- CreateTable
CREATE TABLE "TaskCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "CardCategory" NOT NULL,

    CONSTRAINT "TaskCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BugCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "BugCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "IssueCard_pkey" PRIMARY KEY ("id")
);

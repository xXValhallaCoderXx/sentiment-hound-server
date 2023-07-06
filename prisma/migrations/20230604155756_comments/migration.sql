-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('TWITTER', 'YOUTUBE');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentComment" INTEGER,
ADD COLUMN     "platform" "Platform";

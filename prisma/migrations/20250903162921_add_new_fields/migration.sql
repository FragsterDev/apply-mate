/*
  Warnings:

  - The `status` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "currentRound" TEXT,
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "jobUrl" TEXT,
ADD COLUMN     "lastModifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "previousRounds" TEXT[],
ADD COLUMN     "salary" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'APPLIED';

-- DropEnum
DROP TYPE "public"."JobStatus";

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "public"."Job"("status");

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "public"."Job"("userId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

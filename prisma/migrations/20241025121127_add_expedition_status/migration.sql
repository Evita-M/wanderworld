-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "expedition" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';

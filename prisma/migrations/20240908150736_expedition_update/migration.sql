-- DropForeignKey
ALTER TABLE "expedition" DROP CONSTRAINT "expedition_guideId_fkey";

-- AlterTable
ALTER TABLE "expedition" ALTER COLUMN "guideId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "expedition" ADD CONSTRAINT "expedition_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

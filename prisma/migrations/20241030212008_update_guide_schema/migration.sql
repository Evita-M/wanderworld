/*
  Warnings:

  - The values [FIMALIZED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `phoneNumber` to the `guide` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'FINALIZED');
ALTER TABLE "expedition" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "expedition" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "expedition" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "guide" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://w7.pngwing.com/pngs/728/256/png-transparent-avatar-general-human-office-person-smile-user-general-office-icon.png',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

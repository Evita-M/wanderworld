/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `guide` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "guide" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "guide_email_key" ON "guide"("email");

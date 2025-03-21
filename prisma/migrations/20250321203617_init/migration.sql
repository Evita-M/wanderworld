-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'FINALIZED');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guide" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expedition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "activities" TEXT[],
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "minGroupSize" INTEGER NOT NULL,
    "maxGroupSize" INTEGER NOT NULL,
    "guideId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "expedition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpeditionCountries" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GuideLanguages" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ExpeditionLanguages" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "guide_email_key" ON "guide"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpeditionCountries_AB_unique" ON "_ExpeditionCountries"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpeditionCountries_B_index" ON "_ExpeditionCountries"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuideLanguages_AB_unique" ON "_GuideLanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_GuideLanguages_B_index" ON "_GuideLanguages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpeditionLanguages_AB_unique" ON "_ExpeditionLanguages"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpeditionLanguages_B_index" ON "_ExpeditionLanguages"("B");

-- AddForeignKey
ALTER TABLE "expedition" ADD CONSTRAINT "expedition_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionCountries" ADD CONSTRAINT "_ExpeditionCountries_A_fkey" FOREIGN KEY ("A") REFERENCES "Country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionCountries" ADD CONSTRAINT "_ExpeditionCountries_B_fkey" FOREIGN KEY ("B") REFERENCES "expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuideLanguages" ADD CONSTRAINT "_GuideLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuideLanguages" ADD CONSTRAINT "_GuideLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionLanguages" ADD CONSTRAINT "_ExpeditionLanguages_A_fkey" FOREIGN KEY ("A") REFERENCES "expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionLanguages" ADD CONSTRAINT "_ExpeditionLanguages_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

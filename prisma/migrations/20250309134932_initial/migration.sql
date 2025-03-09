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
CREATE TABLE "guide" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "languages" TEXT[],
    "description" TEXT,
    "avatar" TEXT NOT NULL DEFAULT 'https://w7.pngwing.com/pngs/728/256/png-transparent-avatar-general-human-office-person-smile-user-general-office-icon.png',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expedition" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "countries" TEXT[],
    "languages" TEXT[],
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
CREATE TABLE "_ExpeditionParticipant" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guide_email_key" ON "guide"("email");

-- CreateIndex
CREATE UNIQUE INDEX "participant_email_key" ON "participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpeditionParticipant_AB_unique" ON "_ExpeditionParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpeditionParticipant_B_index" ON "_ExpeditionParticipant"("B");

-- AddForeignKey
ALTER TABLE "expedition" ADD CONSTRAINT "expedition_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guide"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionParticipant" ADD CONSTRAINT "_ExpeditionParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionParticipant" ADD CONSTRAINT "_ExpeditionParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

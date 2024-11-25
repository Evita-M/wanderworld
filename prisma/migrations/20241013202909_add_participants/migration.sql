-- CreateTable
CREATE TABLE "participant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExpeditionParticipant" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "participant_email_key" ON "participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ExpeditionParticipant_AB_unique" ON "_ExpeditionParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpeditionParticipant_B_index" ON "_ExpeditionParticipant"("B");

-- AddForeignKey
ALTER TABLE "_ExpeditionParticipant" ADD CONSTRAINT "_ExpeditionParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "expedition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpeditionParticipant" ADD CONSTRAINT "_ExpeditionParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

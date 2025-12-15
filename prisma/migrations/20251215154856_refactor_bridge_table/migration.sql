/*
  Warnings:

  - You are about to drop the `EventPersons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventPersons" DROP CONSTRAINT "EventPersons_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventPersons" DROP CONSTRAINT "EventPersons_personId_fkey";

-- DropTable
DROP TABLE "EventPersons";

-- CreateTable
CREATE TABLE "EventParticipants" (
    "personId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventParticipants_pkey" PRIMARY KEY ("eventId","personId")
);

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipants" ADD CONSTRAINT "EventParticipants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

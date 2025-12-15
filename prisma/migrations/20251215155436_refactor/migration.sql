/*
  Warnings:

  - You are about to drop the `evp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "evp" DROP CONSTRAINT "evp_eventId_fkey";

-- DropForeignKey
ALTER TABLE "evp" DROP CONSTRAINT "evp_personId_fkey";

-- DropTable
DROP TABLE "evp";

-- CreateTable
CREATE TABLE "participants" (
    "personId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("eventId","personId")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

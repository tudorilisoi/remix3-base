/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "EventData" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventPersons" (
    "personId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventPersons_pkey" PRIMARY KEY ("eventId","personId")
);

-- AddForeignKey
ALTER TABLE "EventPersons" ADD CONSTRAINT "EventPersons_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventPersons" ADD CONSTRAINT "EventPersons_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "EventData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

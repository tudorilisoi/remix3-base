/*
  Warnings:

  - Added the required column `eventDate` to the `EventPersons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventPersons" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

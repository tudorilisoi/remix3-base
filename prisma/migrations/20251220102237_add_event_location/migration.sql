/*
  Warnings:

  - Added the required column `locationId` to the `EventData` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LocationConfidence" AS ENUM ('EXACT', 'APPROXIMATE', 'REGION_ONLY', 'COUNTRY_ONLY', 'UNKNOWN');

-- AlterTable
ALTER TABLE "EventData" ADD COLUMN     "locationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "locationRaw" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "locality" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "locationConfidence" "LocationConfidence",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventData" ADD CONSTRAINT "EventData_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `role` to the `evp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evp" ADD COLUMN     "role" TEXT NOT NULL;

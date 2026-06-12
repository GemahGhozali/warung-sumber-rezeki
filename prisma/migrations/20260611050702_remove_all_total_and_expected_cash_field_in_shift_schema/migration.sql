/*
  Warnings:

  - You are about to drop the column `expectedCash` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `totalChanges` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `totalIncomes` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `totalOutcomes` on the `shift` table. All the data in the column will be lost.
  - You are about to drop the column `totalTransactions` on the `shift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shift" DROP COLUMN "expectedCash",
DROP COLUMN "totalChanges",
DROP COLUMN "totalIncomes",
DROP COLUMN "totalOutcomes",
DROP COLUMN "totalTransactions";

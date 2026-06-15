-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_shiftId_fkey";

-- DropForeignKey
ALTER TABLE "outcome" DROP CONSTRAINT "outcome_shiftId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_shiftId_fkey";

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcome" ADD CONSTRAINT "outcome_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "shift"("id") ON DELETE CASCADE ON UPDATE CASCADE;

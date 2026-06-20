"use server";

import moment from "moment";
import prisma from "@/libs/prisma";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { formatIncomeCategory, formatOutcomeCategory } from "@/utils/cashflow-category-formatter";
import { ShiftStatus, PaymentMethod } from "@/generated/prisma/enums";

interface DateFilter {
  startDate?: Date;
  endDate?: Date;
}

export async function getAllShifts(filter?: DateFilter) {
  const startDate = filter?.startDate ? moment(filter.startDate).startOf("day").toDate() : moment().startOf("day").toDate();
  const endDate = filter?.endDate ? moment(filter.endDate).endOf("day").toDate() : moment().endOf("day").toDate();

  try {
    const shifts = await prisma.shift.findMany({
      select: {
        id: true,
        status: true,
        cashDifference: true,
        createdAt: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    return shifts.map((shift) => ({ ...shift, employee: shift.user?.name ?? "Tidak Diketahui" }));
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift");
  }
}

export async function getCurrentUserAndShiftId() {
  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShift = await prisma.shift.findFirst({
      where: { userId: user.id, status: ShiftStatus.OPEN },
      select: { id: true },
    });

    return { user, shiftId: activeShift?.id };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data pengguna dan shift");
  }
}

export async function getActiveShift() {
  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShift = await prisma.shift.findFirst({
      where: { userId: user.id, status: ShiftStatus.OPEN },
      include: { user: { select: { name: true } } },
    });

    if (!activeShift) return null;

    const financials = await getShiftFinancials(activeShift.id);
    const expectedCash = activeShift.initialCapital + financials.totalIncomes - financials.totalOutcomes;

    return {
      id: activeShift.id,
      employee: activeShift.user?.name ?? "Tidak Diketahui",
      status: activeShift.status,
      openingTime: activeShift.openingTime,
      initialCapital: activeShift.initialCapital,
      expectedCash,
      ...financials,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift aktif");
  }
}

export async function getLastTransactionsInActiveShift() {
  try {
    const { shiftId } = await getCurrentUserAndShiftId();
    if (!shiftId) return null;

    return prisma.transaction.findMany({
      where: { shiftId: shiftId },
      select: { id: true, paymentMethod: true, createdAt: true, totalPrice: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data riwayat terakhir transaksi");
  }
}

export async function getAllTransactionsInActiveShift() {
  try {
    const { shiftId } = await getCurrentUserAndShiftId();
    if (!shiftId) return null;

    return prisma.transaction.findMany({
      where: { shiftId },
      select: { id: true, paymentMethod: true, createdAt: true, totalPrice: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data riwayat transaksi");
  }
}

export async function getShiftCashflowHistory(shiftId: string) {
  try {
    const [transactions, incomes, outcomes] = await Promise.all([
      // Mendapatkan semua data transaksi
      prisma.transaction.findMany({ where: { shiftId }, select: { id: true, totalPayment: true, paymentMethod: true, totalChange: true, createdAt: true } }),

      // Mendapatkan semua data pemasukan
      prisma.income.findMany({ where: { shiftId }, select: { id: true, category: true, total: true, createdAt: true } }),

      // Mendapatkan semua data pengeluaran
      prisma.outcome.findMany({ where: { shiftId }, select: { id: true, category: true, total: true, createdAt: true } }),
    ]);

    // Format transaksi
    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.totalPayment - transaction.totalChange,
      type: "TRANSACTION" as const,
      label: `Transaksi ${transaction.paymentMethod === "TRANSFER" ? "Transfer" : "Tunai"}`,
      createdAt: transaction.createdAt,
    }));

    // Format pemasukan
    const formattedIncomes = incomes.map((income) => ({
      id: income.id,
      amount: income.total,
      type: "INCOME" as const,
      label: formatIncomeCategory(income.category),
      createdAt: income.createdAt,
    }));

    // Format pengeluaran
    const formattedOutcomes = outcomes.map((outcome) => ({
      id: outcome.id,
      amount: outcome.total,
      type: "OUTCOME" as const,
      label: formatOutcomeCategory(outcome.category),
      createdAt: outcome.createdAt,
    }));

    return [...formattedTransactions, ...formattedIncomes, ...formattedOutcomes].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift aktif");
  }
}

export async function getShiftById(id: string) {
  try {
    const shift = await prisma.shift.findUnique({
      where: { id },
      include: { user: { select: { name: true } } },
    });

    if (!shift) return null;

    const financials = await getShiftFinancials(shift.id);
    const expectedCash = shift.initialCapital + financials.totalIncomes - financials.totalOutcomes;

    return {
      id: shift.id,
      status: shift.status,
      employee: shift.user?.name ?? "Tidak Diketahui",
      openingTime: shift.openingTime,
      closingTime: shift.closingTime,
      initialCapital: shift.initialCapital,
      actualCash: shift.actualCash,
      cashDifference: shift.cashDifference,
      expectedCash,
      ...financials,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift");
  }
}

export async function getShiftFinancials(shiftId: string) {
  const [totalCashTransaction, totalTransferTransaction, totalTransactionPrice, income, outcome] = await prisma.$transaction([
    prisma.transaction.count({ where: { shiftId, paymentMethod: PaymentMethod.TUNAI } }),
    prisma.transaction.count({ where: { shiftId, paymentMethod: PaymentMethod.TRANSFER } }),
    prisma.transaction.aggregate({ where: { shiftId }, _sum: { totalPrice: true } }),
    prisma.income.aggregate({ where: { shiftId }, _sum: { total: true } }),
    prisma.outcome.aggregate({ where: { shiftId }, _sum: { total: true } }),
  ]);

  const totalTransactions = totalCashTransaction + totalTransferTransaction;
  const transactionIncome = totalTransactionPrice._sum.totalPrice ?? 0;
  const extraIncome = income._sum.total ?? 0;

  const totalIncomes = transactionIncome + extraIncome;
  const totalOutcomes = outcome._sum.total ?? 0;

  return { totalTransactions, totalCashTransaction, totalTransferTransaction, totalIncomes, totalOutcomes };
}

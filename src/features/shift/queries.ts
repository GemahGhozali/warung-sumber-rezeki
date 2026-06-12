"use server";

import prisma from "@/libs/prisma";
import { ShiftStatus, PaymentMethod } from "@/generated/prisma/enums";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";

export async function getActiveShiftId() {
  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShift = await prisma.shift.findFirst({ where: { userId: user.id, status: ShiftStatus.OPEN }, select: { id: true } });
    return activeShift?.id ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllShifts() {
  try {
    const shifts = await prisma.shift.findMany({
      select: { id: true, status: true, openingTime: true, closingTime: true, createdAt: true, user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return shifts.map((shift) => ({
      id: shift.id,
      status: shift.status,
      openingTime: shift.openingTime,
      closingTime: shift.closingTime,
      createdAt: shift.createdAt,
      employee: shift.user?.name ?? "Tidak Diketahui",
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift");
  }
}

export async function getActiveShiftCashflow() {
  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShift = await prisma.shift.findFirst({
      where: { userId: user.id, status: ShiftStatus.OPEN },
      include: { user: { select: { name: true } } },
      omit: { userId: true },
    });

    if (!activeShift) return null;

    const [totalPaymentsAndChangesAgg, incomeAgg, outcomeAgg] = await prisma.$transaction([
      // Hitung semua uang yang didapatkan dan semua uang kembalian dari transaction
      prisma.transaction.aggregate({ where: { shiftId: activeShift.id }, _sum: { totalPayment: true, totalChange: true } }),

      // Hitung total income
      prisma.income.aggregate({ where: { shiftId: activeShift.id }, _sum: { total: true } }),

      // Hitung total outcome
      prisma.outcome.aggregate({ where: { shiftId: activeShift.id }, _sum: { total: true } }),
    ]);

    const totalPayments = totalPaymentsAndChangesAgg._sum.totalPayment ?? 0;
    const totalChanges = totalPaymentsAndChangesAgg._sum.totalChange ?? 0;

    const totalIncomes = incomeAgg._sum.total ?? 0 + totalPayments;
    const totalOutcomes = outcomeAgg._sum.total ?? 0 + totalChanges;

    const totalCashIn = activeShift.initialCapital + totalIncomes;
    const totalCashOut = totalOutcomes;
    const expectedCash = totalCashIn - totalCashOut;

    return { expectedCash, totalIncomes, totalOutcomes };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data arus kas pada shift aktif");
  }
}

export async function getActiveShift() {
  const user = await getSession();
  if (!user) return redirect("/");

  try {
    const activeShift = await prisma.shift.findFirst({
      where: { userId: user.id, status: ShiftStatus.OPEN },
      include: { user: { select: { name: true } } },
      omit: { userId: true },
    });

    if (!activeShift) return null;

    const [totalTransactionsAgg, totalPaymentsAndChangesAgg, incomeAgg, outcomeAgg] = await prisma.$transaction([
      // Hitung semua total transaksi
      prisma.transaction.aggregate({ where: { shiftId: activeShift.id }, _count: { id: true } }),

      // Hitung semua uang yang didapatkan dan semua uang kembalian dari transaction
      prisma.transaction.aggregate({ where: { shiftId: activeShift.id }, _sum: { totalPayment: true, totalChange: true } }),

      // Hitung total income
      prisma.income.aggregate({ where: { shiftId: activeShift.id }, _sum: { total: true } }),

      // Hitung total outcome
      prisma.outcome.aggregate({ where: { shiftId: activeShift.id }, _sum: { total: true } }),
    ]);

    const totalTransactions = totalTransactionsAgg._count.id ?? 0;
    const totalPayments = totalPaymentsAndChangesAgg._sum.totalPayment ?? 0;
    const totalChanges = totalPaymentsAndChangesAgg._sum.totalChange ?? 0;
    const totalIncomes = incomeAgg._sum.total ?? 0;
    const totalOutcomes = outcomeAgg._sum.total ?? 0;

    const totalCashIn = activeShift.initialCapital + totalPayments + totalIncomes;
    const totalCashOut = totalChanges + totalOutcomes;
    const expectedCash = totalCashIn - totalCashOut;

    return {
      id: activeShift.id,
      employee: activeShift.user?.name ?? "Tidak Diketahui",
      status: activeShift.status,
      openingTime: activeShift.openingTime,
      initialCapital: activeShift.initialCapital,
      totalTransactions,
      totalIncomes,
      totalOutcomes,
      totalChanges,
      expectedCash,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift aktif");
  }
}

export async function getShiftById(id: string) {
  try {
    const shift = await prisma.shift.findUnique({ where: { id }, include: { user: { select: { name: true } } } });

    if (!shift) return null;

    const [totalCashTransaction, totalTransferTransaction, totalPaymentsAndChangesAgg, incomeAgg, outcomeAgg] = await prisma.$transaction([
      // Hitung semua total transaksi TUNAI
      prisma.transaction.count({ where: { shiftId: id, paymentMethod: PaymentMethod.TUNAI } }),

      // Hitung semua total transaksi TRANSFER
      prisma.transaction.count({ where: { shiftId: id, paymentMethod: PaymentMethod.TRANSFER } }),

      // Hitung semua uang yang didapatkan dan semua uang kembalian dari transaction
      prisma.transaction.aggregate({ where: { shiftId: id }, _sum: { totalPayment: true, totalChange: true } }),

      // Hitung total income
      prisma.income.aggregate({ where: { shiftId: id }, _sum: { total: true } }),

      // Hitung total outcome
      prisma.outcome.aggregate({ where: { shiftId: id }, _sum: { total: true } }),
    ]);

    const totalTransactions = totalCashTransaction + totalCashTransaction;
    const totalPayments = totalPaymentsAndChangesAgg._sum.totalPayment ?? 0;
    const totalChanges = totalPaymentsAndChangesAgg._sum.totalChange ?? 0;
    const totalIncomes = incomeAgg._sum.total ?? 0 + totalPayments;
    const totalOutcomes = outcomeAgg._sum.total ?? 0;

    const totalCashIn = shift.initialCapital + totalPayments + totalIncomes;
    const totalCashOut = totalChanges + totalOutcomes;
    const expectedCash = totalCashIn - totalCashOut;

    return {
      id: shift.id,
      status: shift.status,
      employee: shift.user?.name ?? "Tidak Diketahui",
      openingTime: shift.openingTime,
      closingTime: shift.closingTime,
      initialCapital: shift.initialCapital,
      expectedCash,
      actualCash: shift.actualCash,
      cashDifference: shift.cashDifference,
      totalTransactions,
      totalCashTransaction,
      totalTransferTransaction,
      totalChanges,
      totalIncomes,
      totalOutcomes,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data shift");
  }
}

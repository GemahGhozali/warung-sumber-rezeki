import prisma from "@/libs/prisma";
import { getActiveShiftId } from "../shift/queries";

export async function getAllTransactionsInActiveShift() {
  try {
    const activeShiftId = await getActiveShiftId();
    if (!activeShiftId) return null;

    return prisma.transaction.findMany({
      where: { shiftId: activeShiftId },
      select: { id: true, paymentMethod: true, createdAt: true, totalPrice: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data riwayat transaksi");
  }
}

export async function getLastTransactionsInActiveShift() {
  try {
    const activeShiftId = await getActiveShiftId();
    if (!activeShiftId) return null;

    return prisma.transaction.findMany({
      where: { shiftId: activeShiftId },
      select: { id: true, paymentMethod: true, createdAt: true, totalPrice: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan data riwayat transaksi");
  }
}

export async function getTransactionById(id: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: {
        id: true,
        paymentMethod: true,
        createdAt: true,
        totalPrice: true,
        totalPayment: true,
        totalChange: true,
        user: { select: { name: true } },
        transactionDetails: {
          select: { id: true, menuName: true, price: true, quantity: true, subtotal: true },
        },
        _count: {
          select: { transactionDetails: true },
        },
      },
    });

    if (!transaction) return null;

    return {
      id: transaction.id,
      paymentMethod: transaction.paymentMethod,
      employee: transaction.user?.name || "Tidak Diketahui",
      createdAt: transaction.createdAt,
      totalItem: transaction._count.transactionDetails,
      totalPrice: transaction.totalPrice,
      totalPayment: transaction.totalPayment,
      totalChange: transaction.totalChange,
      transactionDetails: transaction.transactionDetails,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Gagal mendapatkan detail transaksi");
  }
}

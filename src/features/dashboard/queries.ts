import moment from "moment";
import prisma from "@/libs/prisma";

interface ProfitLossFilter {
  startDate?: Date;
  endDate?: Date;
}

export async function getProfitLossReport(filter?: ProfitLossFilter) {
  const startDate = filter?.startDate ? moment(filter.startDate).startOf("day").toDate() : moment().startOf("day").toDate();

  const endDate = filter?.endDate ? moment(filter.endDate).endOf("day").toDate() : moment().endOf("day").toDate();

  try {
    // Hitung total omzet dari semua transaksi dan keseluruhan total transaksi
    const transactionAggregate = await prisma.transaction.aggregate({
      _sum: { totalPrice: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
      _count: { _all: true },
    });

    const totalOmzet = transactionAggregate._sum.totalPrice || 0;
    const totalTransaksi = transactionAggregate._count._all || 0;

    // Hitung pemasukan tambahan yang digrup berdasarkan kategori
    const incomeGrouped = await prisma.income.groupBy({
      by: ["category"],
      _sum: { total: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    const totalPemasukanLain = incomeGrouped.reduce((acc, item) => acc + (item._sum.total || 0), 0);

    // Mapping kategori pemasukan
    const rincianPemasukanLain = { MODAL_TAMBAHAN: 0, LAINNYA: 0 };
    incomeGrouped.forEach((item) => {
      if (item.category in rincianPemasukanLain) {
        rincianPemasukanLain[item.category as keyof typeof rincianPemasukanLain] = item._sum.total || 0;
      }
    });

    // Hitung total HPP yang dikeluarkan dari detail transaksi
    const transactionDetails = await prisma.transactionDetail.findMany({
      where: { createdAt: { gte: startDate, lte: endDate } },
      select: { hpp: true, quantity: true },
    });

    const totalHPP = transactionDetails.reduce((acc, item) => acc + item.hpp * item.quantity, 0);

    // Hitung total seluruh beban pengeluaran operasional
    const outcomeGrouped = await prisma.outcome.groupBy({
      by: ["category"],
      _sum: { total: true },
      where: { createdAt: { gte: startDate, lte: endDate } },
    });

    const totalBebanOperasional = outcomeGrouped.reduce((acc, item) => acc + (item._sum.total || 0), 0);

    // Mapping kategori pengeluaran
    const rincianBeban = { BIAYA_PRODUKSI: 0, BIAYA_OPERASIONAL: 0, PEMASARAN_PROMOSI: 0, PEMELIHARAAN: 0, LAINNYA: 0 };
    outcomeGrouped.forEach((item) => {
      if (item.category in rincianBeban) {
        rincianBeban[item.category as keyof typeof rincianBeban] = item._sum.total || 0;
      }
    });

    const totalPendapatanKotor = totalOmzet + totalPemasukanLain;
    const totalLabaKotor = totalPendapatanKotor - totalHPP;
    const totalLabaRugiBersih = totalLabaKotor - totalBebanOperasional;

    return {
      ringkasan: {
        totalPendapatanKotor,
        totalHPP,
        totalLabaKotor,
        totalBebanOperasional,
        totalLabaRugiBersih,
        totalTransaksi,
        status: totalLabaRugiBersih > 0 ? ("LABA" as const) : totalLabaRugiBersih < 0 ? ("RUGI" as const) : ("NETRAL" as const),
      },
      detail: {
        pendapatan: {
          omzetKasir: totalOmzet,
          ...rincianPemasukanLain,
        },
        bebanPengeluaran: rincianBeban,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Terjadi kesalahan saat mendapatkan laporan laba rugi");
  }
}

import { IncomeCategory, OutcomeCategory } from "@/generated/prisma/enums";

export function formatIncomeCategory(category: IncomeCategory): string {
  if (category === "MODAL_TAMBAHAN") return "Modal Tambahan";
  return "Lainnya";
}

export function formatOutcomeCategory(category: OutcomeCategory): string {
  if (category === "BIAYA_OPERASIONAL") return "Biaya Operasional";
  if (category === "BIAYA_PRODUKSI") return "Biaya Produksi";
  if (category === "PEMASARAN_PROMOSI") return "Pemasaran & Promosi";
  if (category === "PEMELIHARAAN") return "Pemeliharaan";
  return "Lainnya";
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCompact = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    notation: "compact",
    compactDisplay: "long",
  }).format(amount);
};

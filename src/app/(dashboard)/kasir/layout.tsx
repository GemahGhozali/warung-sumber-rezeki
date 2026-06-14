import CartProvider from "@/features/kasir/components/cart-provider";

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

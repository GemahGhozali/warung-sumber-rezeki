import MenuList from "@/features/kasir/components/menu-list";
import CartOverlay from "@/features/kasir/components/cart-overlay";
import KasirHeader from "@/features/kasir/components/kasir-header";
import { getMenusForCashier } from "@/features/menu/queries";

export default async function KasirPage() {
  const menus = await getMenusForCashier();

  return (
    <div className="h-full flex flex-col">
      <KasirHeader />
      <MenuList menus={menus} />
      <CartOverlay />
    </div>
  );
}

import MenuList from "@/features/kasir/components/menu-list";
import CartOverlay from "@/features/kasir/components/cart-overlay";
import CategoryTabFilters from "@/features/kasir/components/category-tab-filters";
import CustomMenuModalButton from "@/features/kasir/components/custom-menu-modal-button";
import { getCategoriesForCashier } from "@/features/category/queries";
import { getMenusForCashier } from "@/features/menu/queries";

export default async function KasirPage() {
  const [categories, menus] = await Promise.all([getCategoriesForCashier(), getMenusForCashier()]);

  return (
    <div>
      <div className="p-4 pb-0 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold">Daftar Menu</h1>
          <p className="text-sm text-neutral-500">Lihat semua daftar menu</p>
        </div>
        <CustomMenuModalButton />
      </div>
      <CategoryTabFilters categories={categories} />
      <MenuList menus={menus} />
      <CartOverlay />
    </div>
  );
}

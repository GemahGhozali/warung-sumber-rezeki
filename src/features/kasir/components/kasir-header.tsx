import { SearchBar } from "./search-bar";
import { getCategoriesForCashier } from "@/features/category/queries";
import CategoryTabFilters from "./category-tab-filters";

export default async function KasirHeader() {
  const categories = await getCategoriesForCashier();

  return (
    <>
      <div className="relative">
        <SearchBar />
        <img src="/images/kasir-banner-background.jpg" />
        <div className="p-4 pb-0 bg-white">
          <h1 className="text-xl font-semibold">Daftar Menu</h1>
          <p className="text-sm text-neutral-500">Lihat semua daftar menu</p>
        </div>
      </div>
      <CategoryTabFilters categories={categories} />
    </>
  );
}

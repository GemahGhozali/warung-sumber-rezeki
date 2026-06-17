import CategoryList from "@/features/category/components/category-list";
import CategoryHeader from "@/features/category/components/category-header";
import { getAllCategories } from "@/features/category/queries";

export default async function CategoryPage() {
  const categories = await getAllCategories();

  return (
    <div className="p-4 h-full flex flex-col">
      <CategoryHeader />
      <CategoryList categories={categories} />
    </div>
  );
}

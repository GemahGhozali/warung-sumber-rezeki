import CategoryCard from "./category-card";
import { getAllCategories } from "../queries";

export default async function CategoryList() {
  const categories = await getAllCategories();

  if (categories.length === 0) return <p className="text-neutral-500">Belum ada kategori apapun saat ini</p>;

  return (
    <ul className="space-y-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ul>
  );
}

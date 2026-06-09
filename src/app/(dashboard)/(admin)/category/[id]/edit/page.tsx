import CategoryForm from "@/features/category/components/category-form";
import { getCategoryById } from "@/features/category/queries";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) throw new Error("Data kategori tidak ditemukan");

  return <CategoryForm category={category} />;
}

import { getAllCategories } from "@/features/category/queries";
import MenuForm from "@/features/menu/components/menu-form";
import { getMenuById } from "@/features/menu/queries";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMenuPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const menu = await getMenuById(id);

  if (!menu) throw new Error("Data kategori tidak ditemukan");

  const categories = await getAllCategories();

  return <MenuForm categories={categories} menu={menu} />;
}

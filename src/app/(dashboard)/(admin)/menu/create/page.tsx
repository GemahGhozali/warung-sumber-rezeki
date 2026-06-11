import { getAllCategories } from "@/features/category/queries";
import MenuForm from "@/features/menu/components/menu-form";

export default async function CreateMenuForm() {
  const categories = await getAllCategories();

  return <MenuForm categories={categories} />;
}

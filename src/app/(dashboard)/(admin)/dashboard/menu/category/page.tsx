import Link from "next/link";
import CategoryList from "@/features/category/components/category-list";
import { Plus } from "lucide-react";

export default async function CategoryPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Category Page</h1>
      <CategoryList />
      <Link href="/dashboard/menu/category/create" className="fixed bottom-4 right-4 bg-teal-600 text-white rounded-full font-medium size-10 grid place-content-center">
        <Plus />
      </Link>
    </div>
  );
}

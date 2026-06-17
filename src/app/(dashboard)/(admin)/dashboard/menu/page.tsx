import MenuList from "@/features/menu/components/menu-list";
import MenuHeader from "@/features/menu/components/menu-header";
import { getAllMenus } from "@/features/menu/queries";

export default async function MenuPage() {
  const menus = await getAllMenus();

  return (
    <div className="p-4 h-full flex flex-col">
      <MenuHeader />
      <MenuList menus={menus} />
    </div>
  );
}

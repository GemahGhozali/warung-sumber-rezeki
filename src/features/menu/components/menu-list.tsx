import MenuCard from "./menu-card";
import { getAllMenus } from "../queries";

export default async function MenuList() {
  const menus = await getAllMenus();

  return (
    <ul className="space-y-4">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </ul>
  );
}

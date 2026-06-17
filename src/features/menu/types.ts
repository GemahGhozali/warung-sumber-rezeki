import { getAllMenus, getMenusForCashier } from "./queries";

export type MenuCatalog = NonNullable<Awaited<ReturnType<typeof getAllMenus>>>;
export type MenuCatalogItem = MenuCatalog[number];
export type CashierMenu = NonNullable<Awaited<ReturnType<typeof getMenusForCashier>>>[number];

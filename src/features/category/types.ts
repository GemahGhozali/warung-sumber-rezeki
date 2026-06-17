import { getAllCategories } from "./queries";

export type CategoryCatalog = NonNullable<Awaited<ReturnType<typeof getAllCategories>>>;
export type CategoryCatalogItem = CategoryCatalog[number];

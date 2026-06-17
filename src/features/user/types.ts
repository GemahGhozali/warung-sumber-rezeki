import { getAllUsers } from "./queries";

export type UserCatalog = NonNullable<Awaited<ReturnType<typeof getAllUsers>>>;
export type UserCatalogItem = UserCatalog[number];

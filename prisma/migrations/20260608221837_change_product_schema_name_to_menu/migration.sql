/*
  Warnings:

  - You are about to drop the column `productId` on the `transaction_detail` table. All the data in the column will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_detail" DROP CONSTRAINT "transaction_detail_productId_fkey";

-- AlterTable
ALTER TABLE "transaction_detail" DROP COLUMN "productId",
ADD COLUMN     "menuId" TEXT;

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" INTEGER NOT NULL,
    "hpp" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" VARCHAR(255),
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

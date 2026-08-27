/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `display_order` on table `productimages` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_category_id_store_id_status_idx";

-- AlterTable
ALTER TABLE "productimages" ADD COLUMN     "is_primary" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "display_order" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "slug" VARCHAR(255) NOT NULL,
ALTER COLUMN "category_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_store_id_status_idx" ON "products"("store_id", "status");

-- CreateIndex
CREATE INDEX "products_category_id_status_idx" ON "products"("category_id", "status");

-- DropForeignKey
ALTER TABLE "productimages" DROP CONSTRAINT "productimages_product_id_fkey";

-- AddForeignKey
ALTER TABLE "productimages" ADD CONSTRAINT "productimages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

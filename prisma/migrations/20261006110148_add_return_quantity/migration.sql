/*
  Warnings:

  - Added the required column `quantity` to the `returns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "returns" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- CreateIndex
CREATE INDEX "returns_order_item_id_idx" ON "returns"("order_item_id");

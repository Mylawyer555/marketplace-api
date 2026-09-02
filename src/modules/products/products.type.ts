import { z } from "zod";
import { createProductImageSchema, createProductSchema } from "./products.validation";

export type CreateProduct = z.infer<typeof createProductSchema>;

export interface CreateProductVariant {
  sku: string;
  color: string;
  variantStorage?: string;
  price: number;
  stockQuantity: number;
};

export interface updateInventory {
    stockQuantity: number;
}

export type CreateProductImages = z.infer<typeof createProductImageSchema>;

import { z } from "zod";
import { createProductImageSchema, createProductSchema, getProductschema, updateProductImageSchema, updateProductSchema, updateProductStatusSchema } from "./products.validation";

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

export type UpdateProductImages = z.infer<typeof updateProductImageSchema>;

export type ProductQuery = z.infer<typeof getProductschema>;

export type UpdateProduct = z.infer<typeof updateProductSchema>;

export type UpdateProductStatus = z.infer<typeof updateProductStatusSchema>;

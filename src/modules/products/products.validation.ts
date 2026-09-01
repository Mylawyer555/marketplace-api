import { z } from "zod";

export const createProductSchema = z.object({
  productName: z
    .string()
    .min(2, "product name must contain atleast 2 characters"),
  description: z.string().min(10, "description must be atleast 10 characters"),
  categoryId: z.number().int().positive("category ID must be a positive"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const createProductVariantSchema = z.object({
    sku: z.string().min(4, "SKU must be atleast 4 characters"),
    color: z.string().nonempty("color cannot be empty"),
    varaintStorage: z.string().optional(),
    price: z.number().nonnegative(),
    stockQuantity: z.number().int().nonnegative()
})

export const createUpdateInventorySchema = z.object({
    stockQuantity: z.number().int().nonnegative("Stock quantity must be a non-negative integer")
});


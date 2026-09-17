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
  stockQuantity: z.number().int().nonnegative(),
});

export const createUpdateInventorySchema = z.object({
  stockQuantity: z
    .number()
    .int()
    .nonnegative("Stock quantity must be a non-negative integer"),
});

export const createProductImageSchema = z.object({
  imageUrl: z.url("Invalid image url"),
  isPrimary: z.boolean().optional(),
  displayOrder: z.number().int().positive().optional(),
});

export const updateProductImageSchema = z
  .object({
    imageUrl: z.url("Invalid image url").optional(),
    isPrimary: z.boolean().optional(),
    displayOrder: z.number().int().positive().optional(),
  })
  .refine(
    (data) =>
      data.imageUrl !== undefined ||
      data.isPrimary !== undefined ||
      data.displayOrder !== undefined,
    {
      message: "Atleast one field is required!",
    }
  );

export const getProductschema = z.object({
  search: z.string().optional().describe("Search term must be a string"),
  categoryId: z.coerce.number().int().nonnegative().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(["price", "createdAt", "name"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export const updateProductSchema = z.object({
  productName: z
    .string()
    .min(2, "product name must contain atleast 2 characters").optional(),
  description: z.string().min(10, "description must be atleast 10 characters").optional(),
  categoryId: z.number().int().positive("category ID must be a positive").optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).refine(
  (data) => 
    data.productName !== undefined ||
  data.description !== undefined ||
  data.metadata !== undefined ||
  data.categoryId !== undefined,
  {
    message: "Atleast one field is required"
  }
)

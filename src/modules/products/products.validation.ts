import { z } from "zod";

export const createProductSchema = z.object({
  productName: z
    .string()
    .min(2, "product name must contain atleast 2 characters"),
  description: z.string().min(10, "description must be atleast 10 characters"),
  categoryId: z.number().int().positive("category ID must be a positive"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

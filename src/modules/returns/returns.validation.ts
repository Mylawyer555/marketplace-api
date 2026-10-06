import {z} from "zod";

export const returnSchema = z.object({
  quantity: z.number().int().positive(),
  reason: z.string().min(5, "Reason should be at least five characters"),
});
import { z } from "zod";

export const updateProfileSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "first name must be atleast 2 characters")
      .optional(),
    last_name: z
      .string()
      .min(2, "last name must be atleast 2 characters")
      .optional(),
    phone_number: z.string().optional(),
  })
  .refine(
    (data) =>
      data.first_name !== undefined ||
      data.last_name !== undefined ||
      data.phone_number !== undefined,
    {
      message: "At least one field is required",
    },
  );

import { z } from "zod";

export const checkoutSchema = z.object({
  shippingName: z
    .string()
    .min(3, "Shipping name must contain at least 3 characters"),

  shippingPhoneNumber: z
    .string()
    .regex(/^\+?[0-9]{7,20}$/, "Invalid phone number"),

  houseNumber: z
    .string()
    .max(20, "House number should be at most 20 characters")
    .optional(),

  apartmentNumber: z
    .string()
    .min(1, "Apartment number should be at least 1 character")
    .max(20, "Apartment number should be at most 20 characters")
    .optional(),

  street: z
    .string()
    .min(5, "Street should contain at least 5 characters"),

  city: z
    .string()
    .min(2, "City must contain at least 2 characters"),

  state: z
    .string()
    .min(2, "State must contain at least 2 characters"),

  country: z
    .string()
    .min(2, "Country must contain at least 2 characters"),

  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code should be at most 20 characters"),

  deliveryNote: z
    .string()
    .optional(),
});
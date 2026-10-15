"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutSchema = void 0;
const zod_1 = require("zod");
exports.checkoutSchema = zod_1.z.object({
    shippingName: zod_1.z
        .string()
        .min(3, "Shipping name must contain at least 3 characters"),
    shippingPhoneNumber: zod_1.z
        .string()
        .regex(/^\+?[0-9]{7,20}$/, "Invalid phone number"),
    houseNumber: zod_1.z
        .string()
        .max(20, "House number should be at most 20 characters")
        .optional(),
    apartmentNumber: zod_1.z
        .string()
        .min(1, "Apartment number should be at least 1 character")
        .max(20, "Apartment number should be at most 20 characters")
        .optional(),
    street: zod_1.z
        .string()
        .min(5, "Street should contain at least 5 characters"),
    city: zod_1.z
        .string()
        .min(2, "City must contain at least 2 characters"),
    state: zod_1.z
        .string()
        .min(2, "State must contain at least 2 characters"),
    country: zod_1.z
        .string()
        .min(2, "Country must contain at least 2 characters"),
    postalCode: zod_1.z
        .string()
        .min(1, "Postal code is required")
        .max(20, "Postal code should be at most 20 characters"),
    deliveryNote: zod_1.z
        .string()
        .optional(),
});
//# sourceMappingURL=checkout.validation.js.map
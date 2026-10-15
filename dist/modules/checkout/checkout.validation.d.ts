import { z } from "zod";
export declare const checkoutSchema: z.ZodObject<{
    shippingName: z.ZodString;
    shippingPhoneNumber: z.ZodString;
    houseNumber: z.ZodOptional<z.ZodString>;
    apartmentNumber: z.ZodOptional<z.ZodString>;
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    country: z.ZodString;
    postalCode: z.ZodString;
    deliveryNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=checkout.validation.d.ts.map
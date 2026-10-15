import { z } from 'zod';
export declare const createCartSchema: z.ZodObject<{
    variantId: z.ZodNumber;
    quantity: z.ZodNumber;
}, z.core.$strip>;
export declare const updateCartQuantitySchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=cart.valiadtion.d.ts.map
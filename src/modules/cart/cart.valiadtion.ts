import {z} from 'zod';


export const createCartSchema = z.object({
    variantId: z.number().int().positive("variantId must be a positive integer"),
    quantity: z.number().int().positive("quantity must be a positive integer")
})

export const updateCartQuantitySchema = z.object({
    quantity: z.number().int().positive(),
});


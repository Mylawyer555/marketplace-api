import {z} from 'zod';

export const addWishListSchema = z.object({
    productId: z.number().int().positive(),
});
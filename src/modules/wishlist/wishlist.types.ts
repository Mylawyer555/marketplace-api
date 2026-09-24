import {z} from 'zod';
import { addWishListSchema } from './wishlist.validation';


export type AddWishList = z.infer<typeof addWishListSchema>;
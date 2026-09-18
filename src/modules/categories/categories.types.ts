import {z} from 'zod';
import { createCategorySchema } from './categories.validation';


export type CreateCategory = z.infer<typeof createCategorySchema>;
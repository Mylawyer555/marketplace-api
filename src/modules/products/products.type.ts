import {z} from 'zod';
import { createProductSchema } from './products.validation';

export type CreateProduct = z.infer<typeof createProductSchema>;
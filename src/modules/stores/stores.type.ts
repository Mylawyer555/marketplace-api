import {z} from 'zod';
import { createStoreSchema, updateStoreSchema } from './stores.validation';

export type CreateStore = z.infer<typeof createStoreSchema>;

export type UpdateStore = z.infer<typeof updateStoreSchema>
import {z} from 'zod';
import { createStoreSchema } from './stores.validation';

export type CreateStore = z.infer<typeof createStoreSchema>;
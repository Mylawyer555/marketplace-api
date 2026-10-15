import { z } from 'zod';
import { createCategorySchema } from './categories.validation';
export type CreateCategory = z.infer<typeof createCategorySchema>;
//# sourceMappingURL=categories.types.d.ts.map
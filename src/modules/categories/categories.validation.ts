import {z} from 'zod';

export const createCategorySchema = z.object({
    categoryName : z.string().min(1, "cannot be empty minimum of one character").max(255, "Maximum of 255 characters for category name").nonempty().trim()
});
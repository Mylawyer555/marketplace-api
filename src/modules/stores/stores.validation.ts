import {z} from "zod";

export const createStoreSchema = z.object({
    storeName: z.string().min(2, "store name must be atleast two characters"),
    description: z.string().min(10, "atleast 10 characters required"),
    logo: z.url().optional(),
    socialMediaAccount: z.url().optional()
});
import {z} from "zod";

export const createStoreSchema = z.object({
    storeName: z.string().min(2, "store name must be atleast two characters"),
    description: z.string().min(10, "atleast 10 characters required"),
    logo: z.url().optional(),
    socialMediaAccount: z.url().optional()
});

export const updateStoreSchema = z.object({
    storeName: z.string().min(2, "store name must be atleast two characters").optional(),
    description: z.string().min(10, "atleast 10 characters required").optional(),
    logo: z.url().optional(),
    socialMediaAccount: z.url().optional()
}).refine(
    (data) => 
        data.storeName !== undefined || data.description !== undefined || data.logo !== undefined || data.socialMediaAccount !== undefined,
    {
        message: "Atleast one field is required!"
    }
);
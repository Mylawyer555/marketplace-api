import { z } from "zod";
export declare const createStoreSchema: z.ZodObject<{
    storeName: z.ZodString;
    description: z.ZodString;
    logo: z.ZodOptional<z.ZodURL>;
    socialMediaAccount: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
export declare const updateStoreSchema: z.ZodObject<{
    storeName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    logo: z.ZodOptional<z.ZodURL>;
    socialMediaAccount: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
//# sourceMappingURL=stores.validation.d.ts.map
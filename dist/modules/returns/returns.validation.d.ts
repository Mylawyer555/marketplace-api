import { z } from "zod";
export declare const returnSchema: z.ZodObject<{
    quantity: z.ZodNumber;
    reason: z.ZodString;
}, z.core.$strip>;
export declare const returnStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        COMPLETED: "COMPLETED";
        RECEIVED: "RECEIVED";
        REJECTED: "REJECTED";
        REQUESTED: "REQUESTED";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=returns.validation.d.ts.map
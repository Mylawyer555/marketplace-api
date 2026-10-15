import { z } from "zod";
export declare const orderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        DELIVERED: "DELIVERED";
        PAID: "PAID";
        PENDING: "PENDING";
        PROCESSING: "PROCESSING";
        REFUNDED: "REFUNDED";
        SHIPPED: "SHIPPED";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=orders.validation.d.ts.map
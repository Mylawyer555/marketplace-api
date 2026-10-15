import { z } from "zod";
export declare const paymentMethodSchema: z.ZodObject<{
    method: z.ZodEnum<{
        BANK_TRANSFER: "BANK_TRANSFER";
        CARD: "CARD";
        CASH_ON_DELIVERY: "CASH_ON_DELIVERY";
        WALLET: "WALLET";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=payments.validation.d.ts.map
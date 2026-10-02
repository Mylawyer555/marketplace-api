import {z} from "zod";

export const paymentMethodSchema = z.object({
    method : z.enum([
        "CARD",
        "BANK_TRANSFER",
        "WALLET",
        "CASH_ON_DELIVERY"
    ])
});
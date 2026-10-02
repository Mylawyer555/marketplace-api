import z from "zod";
import { paymentMethodSchema } from "./payments.validation";

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
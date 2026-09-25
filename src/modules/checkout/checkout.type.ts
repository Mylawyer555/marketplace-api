import {z} from "zod";
import { checkoutSchema } from "./checkout.validation";

export type Checkout = z.infer<typeof checkoutSchema>;

export type InventoryLock = {
  inventory_id: number;
  variant_id: number;
  stock_quantity: number;
  reserved_quantity: number;
  updated_at: Date | null;
};
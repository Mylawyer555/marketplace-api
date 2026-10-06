import z from "zod";
import { paymentMethodSchema } from "./payments.validation";
import { Decimal } from "../../generated/prisma/internal/prismaNamespace";
import {
  order_status,
  payment_method,
  payment_status,
  refund_status,
} from "../../generated/prisma/enums";

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export type PaymentLock = {
  payment_id: number;
  order_id: number;
  payment_reference: string;
  amount: Decimal;
  method: payment_method;
  status: payment_status;
  paid_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type OrderLock = {
  order_id: number;
  buyer_id: number;
  status: order_status;
};

export type InventoryLock = {
  inventory_id: number;
  variant_id: number;
  stock_quantity: number;
  reserved_quantity: number;
  updated_at: Date | null;
};

export type RefundLock = {
  refund_id: number;
  payment_id: number;
  amount: Decimal;
  status: refund_status;
  processed_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
};

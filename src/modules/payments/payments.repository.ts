import { Decimal } from "@prisma/client/runtime/client";
import { db } from "../../config/db";
import { InventoryLock, OrderLock, PaymentLock, PaymentMethod } from "./payments.types";
import { Prisma } from "../../generated/prisma/client";

export const findOrderForPayment = async (orderId: number) => {
  return db.order.findUnique({
    where: {
      order_id: orderId,
    },
  });
};

export const findPendingPayment = async (orderId: number) => {
  return db.payment.findFirst({
    where: {
      order_id: orderId,
      status: "PENDING",
    },
  });
};

export const createPayment = async (
  orderId: number,
  paymentReference: string,
  amount: Decimal,
  { method }: PaymentMethod,
) => {
  return db.payment.create({
    data: {
      order_id: orderId,
      payment_reference: paymentReference,
      amount,
      method,
      status: "PENDING",
    },
  });
};

export const findPaymentForProcessing = async (
  paymentId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.$queryRaw<PaymentLock[]>`
    SELECT *
    FROM payments 
    WHERE payment_id = ${paymentId}
    FOR UPDATE
    `;
};

export const findOrderForPaymentProcessing = async (
  orderId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.$queryRaw<OrderLock[]>`
    SELECT *
    FROM orders
    WHERE order_id = ${orderId}
    FOR UPDATE
    `;
};

export const findInventoryForPaymentProcessing = async (
  variantId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.$queryRaw <InventoryLock[]>`
       SELECT *
       FROM inventory
       WHERE variant_id = ${variantId}
       FOR UPDATE
    `;
};

export const markPaymentSuccess = async (
  paymentId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.payment.update({
    where: {
      payment_id: paymentId,
    },
    data: {
      status: "SUCCESS",
      paid_at: new Date
    },
  });
};

export const markOrderPaid = async (
  orderId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.order.update({
    where: {
      order_id: orderId,
    },
    data: {
      status: "PAID",
      
    },
  });
};


export const finalizeInventory = async (variantId: number, quantity:number, tx: Prisma.TransactionClient) => {
    return tx.inventory.update({
        where: {
            variant_id: variantId,
        },
        data: {
            stock_quantity: {
                decrement: quantity
            },
            reserved_quantity: {
                decrement: quantity
            }
        }
    })
}
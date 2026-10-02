import { Decimal } from "@prisma/client/runtime/client";
import { db } from "../../config/db"
import { PaymentMethod } from "./payments.types";

export const findOrderForPayment = async (orderId: number) => {
    return db.order.findUnique({
        where: {
            order_id: orderId,
        },
    });
}

export const findPendingPayment = async (orderId: number) => {
    return db.payment.findFirst({
        where: {
            order_id: orderId,
            status: "PENDING"
        }
    })
}

export const createPayment = async (
    orderId: number,
    paymentReference: string,
    amount: Decimal,
   { method}: PaymentMethod,
) => {
    return db.payment.create({
      data: {
        order_id: orderId,
        payment_reference: paymentReference,
        amount,
        method,
        status: "PENDING"

      }
    })
}
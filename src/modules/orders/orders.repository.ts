import { db } from "../../config/db";
import { Prisma } from "../../generated/prisma/client";
import { Order_Status } from "./orders.types";

export const findOrdersByUserId = async (userId: number) => {
  return db.order.findMany({
    where: {
      buyer_id: userId,
    },
    select: {
      order_id: true,
      order_number: true,
      status: true,
      total_amount: true,
      created_at: true,
      order_items: {
        select: {
          item_id: true,
          product_id: true,
          variant_id: true,
          quantity: true,
          price_at_purchase: true,
        },
      },
    },
  });
};

export const findOrderByOrderId = async (orderId: number) => {
  return db.order.findUnique({
    where: {
      order_id: orderId,
    },
    select: {
      order_id: true,
      order_number: true,
      buyer_id: true,
      total_amount: true,
      status: true,
      created_at: true,
      order_items: {
        select: {
          item_id: true,
          product_id: true,
          variant_id: true,
          quantity: true,
          price_at_purchase: true,
          variant: {
            select: {
              sku: true,
              color: true,
              variant_storage: true,
            },
          },
        },
      },
    },
  });
};

export const updateOrderStatus = async (
  orderId: number,
  data: Order_Status,
) => {
  return db.order.update({
    where: {
      order_id: orderId,
    },
    data: {
      status: data.status,
    },
  });
};

export const findOrderForCancellation = async (orderId: number, tx: Prisma.TransactionClient) => {
    return tx.order.findUnique({
        where: {
            order_id: orderId,
        },
        select: {
            order_id: true,
            buyer_id: true,
            order_number: true,
            status: true,
            order_items: {
                select: {
                    variant_id: true,
                    quantity: true
                }
            }
        }
    })
}

export const releaseReservedQuantity = async(variantId: number, quantity: number, tx: Prisma.TransactionClient) => {
    return tx.inventory.updateMany({
        where: {
            variant_id: variantId,
            reserved_quantity: {
                gte: quantity
            }
        }, 
        data: {
            reserved_quantity: {
                decrement: quantity
            }
        }
    })
}

export const updatecancellationStatus = async (orderId: number, tx:Prisma.TransactionClient)=> {
    return tx.order.update({
        where: {
            order_id: orderId,
        },
        data: {
            status: "CANCELLED",
        },
    });
}
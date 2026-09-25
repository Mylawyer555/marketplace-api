import { db } from "../../config/db";

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

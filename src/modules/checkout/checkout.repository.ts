import { StatusCodes } from "http-status-codes";
import { db } from "../../config/db";
import { Prisma } from "../../generated/prisma/client";
import { Decimal } from "../../generated/prisma/internal/prismaNamespace";
import { AppError } from "../../utils/AppError";
import { Checkout, InventoryLock } from "./checkout.type";

export const getCartByUserId = async (
  userId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.cart.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      cart_id: true,
      cart_items: {
        select: {
          cart_item_id: true,
          variant_id: true,
          price: true,
          quantity: true,
          variant: {
            select: {
              product_id: true,
              price: true,
              status: true,
              product: {
                select: {
                  status: true,
                },
              },
              inventory: {
                select: {
                  stock_quantity: true,
                  reserved_quantity: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

export const lockInventory = async (
  variantId: number,
  tx: Prisma.TransactionClient,
) => {
  return tx.$queryRaw<InventoryLock[]>`
        SELECT *
        FROM inventory 
        WHERE variant_id = ${variantId}
        FOR UPDATE
        `;
};

export const updateInventory = async (
  variantId: number,
  quantity: number,
  tx: Prisma.TransactionClient,
) => {
  const result = await tx.$executeRaw`
    UPDATE "inventory"
    SET "reserved_quantity" = "reserved_quantity" + ${quantity}
    WHERE "variant_id" = ${variantId}
      AND ${quantity} > 0
      AND "reserved_quantity" + ${quantity} <= "stock_quantity"
  `;

  if (result !== 1) {
    throw new AppError(
      "Inventory reservation failed",
      StatusCodes.CONFLICT,
    );
  }
};

export const createOrder = async (
    buyerId:number,
    orderNumber: string,
    totalAmount: Decimal,
    data: Checkout,
    tx: Prisma.TransactionClient
) => {
    return tx.order.create({
        data: {
            order_number: orderNumber,
            users: {
                connect: {
                    user_id: buyerId,
                },
            },
            total_amount: totalAmount,
            shipping_name: data.shippingName,
            shipping_phone_number: data.shippingPhoneNumber,
            shipping_street: data.street,
            shipping_apartment_number: data.apartmentNumber ?? null,
            shipping_house_number: data.houseNumber ?? null,
            shipping_city: data.city,
            shipping_state: data.state,
            shipping_country: data.country,
            shipping_postal_code: data.postalCode,
            delivery_note: data.deliveryNote ?? null
        }
    })
}

export const createOrderItem = async (
    orderId: number,
    productId: number,
    variantId: number,
    quantity: number,
    priceAtPurchase: Decimal,
    tx: Prisma.TransactionClient
) => {
    return tx.orderItem.create({
        data: {
            order_id: orderId,
            product_id: productId,
            variant_id: variantId,
            quantity,
            price_at_purchase: priceAtPurchase,
        }
    })
}


export const clearCart = async (cartId: number, tx:Prisma.TransactionClient) => {
  return tx.cartItem.deleteMany({
    where: {
      cart_id: cartId,
    },
  });
};


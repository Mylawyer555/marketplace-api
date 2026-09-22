import { db } from "../../config/db";
import { Prisma } from "../../generated/prisma/client";
import { AddToCart} from "./cart.types";

export const findVariantForCart = async (variantId: number) => {
  return db.productVariant.findUnique({
    where: {
      variant_id: variantId,
    },
    select: {
      price: true,
      product: {
        select: {
          product_id: true,
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
  });
};

export const findCartByUserId = async (userId: number) => {
  return db.cart.findUnique({
    where: {
      user_id: userId,
    },
  });
};

export const findCartItem = async (cartId: number, variantId: number) => {
  return db.cartItem.findUnique({
    where: {
      variant_id_cart_id: {
        cart_id: cartId,
        variant_id: variantId,
      },
    },
  });
};

export const createCart = async (userId: number) => {
  return db.cart.create({
    data: {
      user_id: userId,
    },
  });
};

export const createCartItem = async (
  data: AddToCart,
  cartId: number,
  price: Prisma.Decimal,
) => {
  return db.cartItem.create({
    data: {
      variant_id: data.variantId,
      quantity: data.quantity,
      cart_id: cartId,
      price,
    },
  });
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
  return db.cartItem.update({
    where: {
      cart_item_id: cartItemId,
    },
    data: {
      quantity,
    },
  });
};

export const findCartByUserWithItems = async (userId: number) => {
  return db.cart.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      cart_items: {
        select: {
           cart_id: true,
           cart_item_id: true,
           price: true,
           quantity: true,
           variant: {
            select: {
              variant_id: true,
              sku: true,
              color: true,
              variant_storage: true,
              product: {
                select: {
                  product_id: true,
                  product_name: true,
                  status: true,
                },
              },
            },
           },
        },
      },
    },
  });
};
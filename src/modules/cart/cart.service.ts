import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  createCart,
  createCartItem,
  findCartByUserId,
  findCartItem,
  findVariantForCart,
  updateCartItem,
} from "./cart.repository";
import { AddToCart } from "./cart.types";
import { findUserById } from "../auth/auth.repository";
import { Prisma } from "../../generated/prisma/client";

export const addToCart = async (data: AddToCart, userId: number) => {
  const variant = await findVariantForCart(data.variantId);
  if (!variant) {
    throw new AppError("Variant doesn't exist", StatusCodes.NOT_FOUND);
  }

  if (variant.product.status !== "ACTIVE") {
    throw new AppError("Product is not active", StatusCodes.BAD_REQUEST);
  }

  if (!variant.inventory) {
    throw new AppError("Inventory does not exist", StatusCodes.BAD_REQUEST);
  }

  const availableQuantity =
    variant.inventory.stock_quantity - variant.inventory.reserved_quantity;

  let cart = await findCartByUserId(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  const existingCartItem = await findCartItem(cart.cart_id, data.variantId);

  if (existingCartItem) {
    const newQuantity = existingCartItem.quantity + data.quantity;

    if (newQuantity > availableQuantity) {
      throw new AppError("Out of stock!", StatusCodes.BAD_REQUEST);
    } else {
      return await updateCartItem(existingCartItem.cart_item_id, newQuantity);
    }
  } else {
    if (data.quantity > availableQuantity) {
      throw new AppError("out of stock", StatusCodes.BAD_REQUEST);
    } else {
      return createCartItem(data, cart.cart_id, variant.price);
    }
  }
};



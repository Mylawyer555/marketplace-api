import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  createCart,
  createCartItem,
  findCartByUserId,
  findCartByUserWithItems,
  findCartItem,
  findCartItemById,
  findVariantForCart,
  updateCartItem,
  updateCartQuantity,
} from "./cart.repository";
import { AddToCart, UpdateCartQuantity } from "./cart.types";
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

export const getCartService = async (userId: number) => {
  const cart = await findCartByUserWithItems(userId);

  if (!cart) {
    throw new AppError("cart not found", StatusCodes.NOT_FOUND);
  }

  return cart;
};

export const updateCartQuantityService = async (
  cartItemId: number,
  data: UpdateCartQuantity,
  userId: number,
) => {
  const cartItem = await findCartItemById(cartItemId);

  if (!cartItem) {
    throw new AppError("Cart-item does not exist", StatusCodes.NOT_FOUND);
  }

  if (cartItem.carts.user_id !== userId) {
    throw new AppError(
      "You're not permitted to perform this action",
      StatusCodes.FORBIDDEN,
    );
  }

  const inventory = cartItem.variant.inventory;
  if (!inventory) {
    throw new AppError(
      "This product must have an inventory in other to update cart",
      StatusCodes.FORBIDDEN,
    );
  }

  const availableQuantity =
    inventory.stock_quantity - inventory.reserved_quantity;

  if (data.quantity > availableQuantity) {
    throw new AppError("Out of stock!", StatusCodes.BAD_REQUEST);
  };
  
  return await updateCartQuantity(cartItem.cart_item_id, data);
  
};


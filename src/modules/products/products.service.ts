import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findUserById } from "../auth/auth.repository";
import {
  CreateProduct,
  CreateProductImages,
  CreateProductVariant,
  updateInventory,
} from "./products.type";
import { findStoreBySellerId } from "../stores/stores.repository";
import {
  createProduct,
  createProductImage,
  createProductVariant,
  findCategoryById,
  findInventoryByVariantId,
  findProductById,
  findProductBySlug,
  findVariantWithProduct,
  updatedInventory,
} from "./products.repository";
import { generateSlug } from "../../utils/createSlug";

export const createProductService = async (
  sellerId: number,
  data: CreateProduct,
) => {
  //authenticate user
  const user = await findUserById(sellerId);

  if (!user) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  if (user.role !== "SELLER") {
    throw new AppError("User must be a seller", StatusCodes.FORBIDDEN);
  }

  const store = await findStoreBySellerId(user.user_id);

  if (!store) {
    throw new AppError(
      "oops!, seller must have a store in other to add products.",
      StatusCodes.FORBIDDEN,
    );
  }

  if (store.status !== "ACTIVE") {
    throw new AppError(
      "Store is inactive, please activate your store to proceed.",
      StatusCodes.FORBIDDEN,
    );
  }

  const isCategoryExist = await findCategoryById(data.categoryId);
  if (!isCategoryExist) {
    throw new AppError("Category does not exist", StatusCodes.NOT_FOUND);
  }

  const newSlug = generateSlug(data.productName);

  const uniqueSlug = await findProductBySlug(newSlug);

  if (uniqueSlug) {
    throw new AppError("Slug already exist", StatusCodes.BAD_REQUEST);
  }

  return await createProduct(store.store_id, data, newSlug);
};

export const createProductVariantService = async (
  sellerId: number,
  productId: number,
  data: CreateProductVariant,
) => {
  //verify user
  const user = await findUserById(sellerId);
  if (!user) {
    throw new AppError("User does not exist", StatusCodes.NOT_FOUND);
  }

  //check if user is seller
  if (user.role !== "SELLER") {
    throw new AppError("User must be a seller", StatusCodes.FORBIDDEN);
  }
  //check does seller store exist?
  const store = await findStoreBySellerId(sellerId);
  if (!store) {
    throw new AppError(
      "Seller must own a store to create product",
      StatusCodes.FORBIDDEN,
    );
  }

  if (store.status !== "ACTIVE") {
    throw new AppError(
      "store is inactive, activate your store to proceed",
      StatusCodes.FORBIDDEN,
    );
  }

  const product = await findProductById(productId);
  if (!product) {
    throw new AppError("Product does not exist", StatusCodes.NOT_FOUND);
  }

  if (product.store_id !== store.store_id) {
    throw new AppError(
      "You are not authorized to add a variant to this product",
      StatusCodes.FORBIDDEN,
    );
  }

  return await createProductVariant(product.product_id, data);
};

export const getInventoryService = async (
  sellerId: number,
  variantId: number,
) => {
  const user = await findUserById(sellerId);
  if (!user) {
    throw new AppError("User does not exist", StatusCodes.NOT_FOUND);
  }

  if (user.role !== "SELLER") {
    throw new AppError("user must be a seller", StatusCodes.FORBIDDEN);
  }

  const store = await findStoreBySellerId(sellerId);
  if (!store) {
    throw new AppError(
      "seller must have a store to view inventory",
      StatusCodes.FORBIDDEN,
    );
  }

  const variant = await findVariantWithProduct(variantId);
  if (!variant) {
    throw new AppError(
      "product and variant does not exist",
      StatusCodes.NOT_FOUND,
    );
  }

  if (store.store_id !== variant.product.store_id) {
    throw new AppError(
      "You are not authorized to view this variant's inventory",
      StatusCodes.FORBIDDEN,
    );
  }

  const inventory = await findInventoryByVariantId(variantId);
  if (!inventory) {
    throw new AppError("Inventory does not exist", StatusCodes.NOT_FOUND);
  }

  const availableQuantity =
    inventory.stock_quantity - inventory.reserved_quantity;

  return { ...inventory, availableQuantity };
};

export const updateInventoryService = async (
  sellerId: number,
  variantId: number,
  data: updateInventory,
) => {
  const user = await findUserById(sellerId);
  if (!user) {
    throw new AppError("User does not exist", StatusCodes.NOT_FOUND);
  }

  if (user.role !== "SELLER") {
    throw new AppError("user must be a seller", StatusCodes.FORBIDDEN);
  }

  const store = await findStoreBySellerId(sellerId);
  if (!store) {
    throw new AppError(
      "seller must have a store to update inventory",
      StatusCodes.FORBIDDEN,
    );
  }

  if (store.status !== "ACTIVE") {
    throw new AppError(
      "store must be active to update inventory",
      StatusCodes.FORBIDDEN,
    );
  }

  const variant = await findVariantWithProduct(variantId);
  if (!variant) {
    throw new AppError(
      "product and variant does not exist",
      StatusCodes.NOT_FOUND,
    );
  }

  if (variant.product.store_id !== store.store_id) {
    throw new AppError(
      "You're not authorized to update this variant's inventory",
      StatusCodes.FORBIDDEN,
    );
  }

  const inventory = await findInventoryByVariantId(variantId);
  if (!inventory) {
    throw new AppError("inventory does not exist", StatusCodes.NOT_FOUND);
  }

  if (data.stockQuantity < inventory.reserved_quantity) {
    throw new AppError(
      "stock quantity cannot be less than reserved quantity",
      StatusCodes.BAD_REQUEST,
    );
  }

  return await updatedInventory(variantId, data.stockQuantity);
};

export const createProductImageService = async (
  sellerId: number,
  productId: number,
  data: CreateProductImages,
) => {
  const user = await findUserById(sellerId);
  if (!user) {
    throw new AppError("user does not exist", StatusCodes.NOT_FOUND);
  }

  if (user.role !== "SELLER") {
    throw new AppError(
      "User must be a seller to add images",
      StatusCodes.FORBIDDEN,
    );
  }

  const store = await findStoreBySellerId(sellerId);
  if (!store) {
    throw new AppError(
      "Seller must have a store to add images",
      StatusCodes.FORBIDDEN,
    );
  }

  if (store.status !== "ACTIVE") {
    throw new AppError("seller's store must be active", StatusCodes.FORBIDDEN);
  }

  const product = await findProductById(productId);
  if (!product) {
    throw new AppError("Product does not exist", StatusCodes.NOT_FOUND);
  }

  if (product.store_id !== store.store_id) {
    throw new AppError(
      "You're not authorized to add product image",
      StatusCodes.FORBIDDEN,
    );
  }

  return await createProductImage(product.product_id, data)
  
};

import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findUserById } from "../auth/auth.repository";
import { CreateProduct, CreateProductVariant } from "./products.type";
import { findStoreBySellerId } from "../stores/stores.repository";
import {
  createProduct,
  createProductVariant,
  findCategoryById,
  findProductById,
  findProductBySlug,
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

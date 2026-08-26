import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findUserById } from "../auth/auth.repository";
import { CreateStore } from "./stores.type";
import { createStore, findStoreBySellerId } from "./stores.repository";

export const createStoreService = async (
  sellerId: number,
  data: CreateStore,
) => {
  const user = await findUserById(sellerId);
  if (!user) {
    throw new AppError("user not found", StatusCodes.NOT_FOUND);
  }

  if (user.role !== "SELLER") {
    throw new AppError("User must be a seller", StatusCodes.FORBIDDEN);
  }

  const isUserStoreExist = await findStoreBySellerId(user.user_id);
  if (isUserStoreExist) {
    throw new AppError("Seller already has a store", StatusCodes.FORBIDDEN);
  }

  const newStore = await createStore(user.user_id, data);

  return newStore;
};

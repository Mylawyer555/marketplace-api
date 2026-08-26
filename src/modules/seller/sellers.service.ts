import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findUserById } from "../auth/auth.repository";
import { makeUserSeller } from "./sellers.repository";

export const becomeSeller = async (userId: number) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("user does not exist", StatusCodes.NOT_FOUND);
  }

  if (user.account_status !== "ACTIVE") {
    throw new AppError("Account is not active", StatusCodes.FORBIDDEN);
  }

  if (user.role === "SELLER") {
    throw new AppError("Already a seller", StatusCodes.FORBIDDEN);
  }

  if (user.role === "ADMIN") {
    throw new AppError("Admin cannot become a seller", StatusCodes.FORBIDDEN);
  }

  return makeUserSeller(user.user_id);
};

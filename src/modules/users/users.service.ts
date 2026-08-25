import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  deactivateUser,
  findUserProfile,
  updateUserProfile,
} from "./users.repository";
import { UpdateProfile } from "./users.types";
import {
  findUserById,
  revokeAllUserRefreshToken,
} from "../auth/auth.repository";

export const getUserProfile = async (userId: number) => {
  const user = await findUserProfile(userId);
  if (!user) {
    throw new AppError("user does not exist", StatusCodes.NOT_FOUND);
  }

  return user;
};

export const updateProfile = async (userId: number, data: UpdateProfile) => {
  return await updateUserProfile(userId, data);
};

export const deactivateUserAccount = async (userId: number) => {
  //find user
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("user does not exist", StatusCodes.UNAUTHORIZED);
  }

  if (user.account_status === "DEACTIVATED") {
    throw new AppError(
      "Account has been deactivated already!",
      StatusCodes.FORBIDDEN,
    );
  }
  //deactivate user
  const result = await deactivateUser(user.user_id);

  //revoke all refresh token
  await revokeAllUserRefreshToken(user.user_id);

  return result;
};

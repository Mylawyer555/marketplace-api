import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser,
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
  findUserById,
  updateUserPassword,
  revokeAllUserRefreshToken,
  createResetToken,
  findResetTokenByHash,
  invalidateResetToken,
  reactivateAccount,
} from "./auth.repository";
import { RegisterInput } from "./auth.types";
import type { LoginInput } from "./auth.types";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../utils/jwt";
import { generateRefreshToken } from "../../utils/refreshToken";
import { hashRefreshToken } from "../../utils/hashRefreshToken";
import { generateRefreshExpiry } from "../../utils/refreshExpiry";
import { BCRYPT_SALT_ROUNDS } from "../../config/salt_rounds";
import { generateResetToken } from "../../utils/resetToken";
import { hashResetToken } from "../../utils/hashResetToken";

export const registerUser = async (data: RegisterInput) => {
  const isUserExist = await findUserByEmail(data.email);

  if (isUserExist) {
    throw new AppError("Email already exist", StatusCodes.CONFLICT);
  }

  const hashPassword = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS);

  const user = await createUser({
    ...data,
    password: hashPassword,
  });

  return user;
};

export const loginUser = async (data: LoginInput) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  const isCheckPass = await bcrypt.compare(data.password, user.hash_password);

  if (!isCheckPass) {
    throw new AppError("Invalid email or password", StatusCodes.UNAUTHORIZED);
  }

  //account status
  if (user.account_status === "DEACTIVATED") {

    const now = new Date();

    if(!user.deletion_at || user.deletion_at <= now){
      throw new AppError(
        "Account recovery period has expired",
        StatusCodes.FORBIDDEN
      )
    }

    await reactivateAccount(user.user_id)
  }

  const accessToken = generateAccessToken(user.user_id, user.role);

  const plainRefreshToken = generateRefreshToken();

  const tokenHash = hashRefreshToken(plainRefreshToken);

  const expiresAt = generateRefreshExpiry();

  await createRefreshToken(user.user_id, tokenHash, expiresAt);

  return { accessToken, refreshToken: plainRefreshToken };
};

export const refreshAccessToken = async (refreshToken: string) => {
  const tokenHash = hashRefreshToken(refreshToken);

  const token = await findRefreshTokenByHash(tokenHash);
  //isToken exist?
  if (!token) {
    throw new AppError("Invalid refresh token", StatusCodes.UNAUTHORIZED);
  }
  //check refresh revoked
  if (token.revoked_at !== null) {
    throw new AppError("Refresh token revoked", StatusCodes.UNAUTHORIZED);
  }

  //check refresh expiry
  const now = new Date();
  if (token.expires_at < now) {
    throw new AppError("Refresh token expired", StatusCodes.UNAUTHORIZED);
  }

  //get user
  const user = token.users;

  //generate accessToken
  const accessToken = generateAccessToken(user.user_id, user.role);

  //generate new plain refresh token
  const plainRefreshToken = generateRefreshToken();

  //hash refresh token
  const newTokenHash = hashRefreshToken(plainRefreshToken);

  // revoke current refresh token
  await revokeRefreshToken(token.refresh_token_id);

  //generate expiry
  const refreshExpiresAt = generateRefreshExpiry();

  //save to db
  await createRefreshToken(user.user_id, newTokenHash, refreshExpiresAt);

  return { accessToken, refreshToken: plainRefreshToken };
};

export const logOutUser = async (userId: number, refreshToken: string) => {
  //hash refresh token
  const hashedToken = hashRefreshToken(refreshToken);
  //find refresh token
  const token = await findRefreshTokenByHash(hashedToken);
  //check is token exist
  if (!token) {
    throw new AppError("Invalid refresh token", StatusCodes.UNAUTHORIZED);
  }
  //verify token belongs to userId
  if (userId !== token.user_id) {
    throw new AppError("Invalid user", StatusCodes.FORBIDDEN);
  }
  // verify revoke status
  if (token.revoked_at === null) {
    await revokeRefreshToken(token.refresh_token_id);
  }

  return {
    success: true,
  };
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string,
) => {
  //authenticate user
  const user = await findUserById(userId);
  if (!user) {
    throw new AppError("Invalid user", StatusCodes.FORBIDDEN);
  }

  //compare password
  const comparedPassword = await bcrypt.compare(
    currentPassword,
    user.hash_password,
  );
  if (!comparedPassword) {
    throw new AppError(
      "Current password is incorrect",
      StatusCodes.UNAUTHORIZED,
    );
  }

  //hash new password
  const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);

  //update db with new hashed password
  await updateUserPassword(user.user_id, hashedPassword);

  //revoke all refresh token
  await revokeAllUserRefreshToken(user.user_id);

  return {
    success: true,
  };
};

export const forgotPassword = async (email: string) => {
  //authenticate user
  const user = await findUserByEmail(email);
  if (!user) {
    return {
      success: true,
      message: "If the email exists, a password reset link has been sent.",
    };
  }

  const plainResetToken = generateResetToken();
  //hash token
  const hashedResetToken = hashResetToken(plainResetToken);

  //expiry date

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 5);

  //store hashtoken + expiry
  await createResetToken(user.user_id, hashedResetToken, expiresAt);
  return {
    success: true,
    resetToken: plainResetToken,
    message: "If the email exists, a password reset link has been sent.",
  };
};


export const resetPassword = async (resetToken:string, newPassword: string) => {
  //hash reset token
  const tokenHash = hashResetToken(resetToken);
  //find token in db
  const token = await findResetTokenByHash(tokenHash);
  if (!token) {
    throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
  };
  // check if token has been used or expired
  if (token.used_at !== null) {
    throw new AppError("token already used", StatusCodes.UNAUTHORIZED);
  };
  const now = new Date()
  if (token.expires_at < now) {
    throw new AppError("token expired!", StatusCodes.UNAUTHORIZED)
  };

  //get user
  const user = token.users;

  //hash new password
  const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);

  //update password
  await updateUserPassword(user.user_id, hashedPassword);

  //update reset used at
  await invalidateResetToken(token.reset_token_id);

  //revoke all refresh tokem
  await revokeAllUserRefreshToken(user.user_id);

  return {
    success: true,
    message: "Password reset successful",
  }
};
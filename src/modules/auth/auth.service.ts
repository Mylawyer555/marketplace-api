import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser,
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
} from "./auth.repository";
import { RegisterInput } from "./auth.types";
import type { LoginInput } from "./auth.types";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../../utils/jwt";
import { generateRefreshToken } from "../../utils/refreshToken";
import { hashRefreshToken } from "../../utils/hashRefreshToken";
import { generateRefreshExpiry } from "../../utils/refreshExpiry";

export const registerUser = async (data: RegisterInput) => {
  const isUserExist = await findUserByEmail(data.email);

  if (isUserExist) {
    throw new AppError("Email already exist", StatusCodes.CONFLICT);
  }

  const hashPassword = await bcrypt.hash(data.password, 12);

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

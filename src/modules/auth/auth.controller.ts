import { Request, Response, NextFunction } from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
  logOutUser,
  changePassword,
  forgotPassword,
  resetPassword,
} from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await registerUser(req.body);
  return res.status(201).json({
    message: "User successfully registered",
    user,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginUser(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Access token refreshed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Aunthentication required", StatusCodes.UNAUTHORIZED);
    }
    const userId = req.user.userId;
    const { refreshToken } = req.body;
    const result = await logOutUser(userId, refreshToken);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Logout successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
    const result = await changePassword(userId, currentPassword, newPassword);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Change of password successful!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "If the email exists, a password reset link has been sent.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { resetToken } = req.body;
    const {newPassword} = req.body;
    const result = await resetPassword(resetToken, newPassword);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "password reset successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

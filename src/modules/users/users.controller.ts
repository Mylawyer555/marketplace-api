import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { deactivateUserAccount, getUserProfile, updateProfile } from "./users.service";

export const getUserProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }
    const userId = req.user.userId;
    const profile = await getUserProfile(userId);
    res.status(StatusCodes.OK).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
export const updateProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }
    const userId = req.user.userId;
    const data = req.body
    const profile = await updateProfile(userId, data);
    res.status(StatusCodes.OK).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
export const deactivateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }
    const userId = req.user.userId;
    const user = await deactivateUserAccount(userId)
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Account deactivated successfully"
    });
  } catch (error) {
    next(error);
  }
};



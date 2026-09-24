import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { addWishListSchema } from "./wishlist.validation";
import { addWishlistService, deleteWishlistService, getWishLishService } from "./wishlist.service";

export const addWishListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const userId = Number(req.user.userId);
    const data = addWishListSchema.parse(req.body);
    const result = await addWishlistService(userId, data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "You have added to wishlist successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getWishListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const userId = Number(req.user.userId);
    
    const result = await getWishLishService(userId)
    res.status(StatusCodes.OK).json({
      success: true,
      message: "wishlist retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteWishListController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const userId = Number(req.user.userId);
    const wishlistId = Number(req.params.wishlistId)
    await deleteWishlistService(wishlistId, userId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product removed from wishlist!",
    });
  } catch (error) {
    next(error);
  }
};

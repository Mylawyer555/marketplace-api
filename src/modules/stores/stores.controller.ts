import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { createStoreService } from "./stores.service";

export const createStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate User", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const data = req.body;
    const result = await createStoreService(sellerId, data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Store successfully created!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

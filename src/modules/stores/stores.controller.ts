import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { createStoreService, getMyStore, updateStoreService } from "./stores.service";

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

export const getMyStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const store = await getMyStore(sellerId);
    res.status(StatusCodes.OK).json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStoreController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const data = req.body
    const store = await updateStoreService(sellerId, data);
    res.status(StatusCodes.OK).json({
      success: true,
      data: store,
    });
  } catch (error) {
    next(error);
  }
};



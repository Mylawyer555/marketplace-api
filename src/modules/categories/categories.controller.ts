import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import {
  createCategoryService,
  findCategoryByIdService,
} from "./categories.service";

export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("user must authenticate!", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = Number(req.user.userId);
    const data = req.body;
    const result = await createCategoryService(sellerId, data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "category created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryId = Number(req.params.categoryId);
    const result = await findCategoryByIdService(categoryId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "category retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

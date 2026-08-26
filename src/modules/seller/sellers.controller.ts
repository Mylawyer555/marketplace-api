import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { becomeSeller } from "./sellers.service";

export const becomeSellerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const userId = req.user.userId;
    const seller = await becomeSeller(userId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "congratulations you're now a seller.",
      data: seller,
    });
  } catch (error) {
    next(error);
  }
};

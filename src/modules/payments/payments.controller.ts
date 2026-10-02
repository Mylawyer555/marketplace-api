import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { paymentMethodSchema } from "./payments.validation";
import { createPaymentService } from "./payments.service";
export const createPaymentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Check authenticated user
    if (!req.user) {
      throw new AppError("authenticate user!", StatusCodes.UNAUTHORIZED);
    }

    // 2. Get userId
    const userId = req.user.userId
    const orderId = Number(req.params.orderId);
    if (Number.isNaN(orderId) || orderId <= 0) {
      throw new AppError("Invalid order ID", StatusCodes.BAD_REQUEST);
    }
    const data = paymentMethodSchema.parse(req.body);

    const result = await createPaymentService(orderId, userId, data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "payment created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

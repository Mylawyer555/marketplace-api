import {Request, Response, NextFunction} from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { returnSchema, returnStatusSchema } from "./returns.validation";
import { returnsService, returnStatusTransitionService } from "./returns.service";

export const returnsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
        };

        const userId = req.user.userId;
        const orderItemId = Number(req.params.orderItemId);
        if(Number.isNaN(orderItemId) || orderItemId <= 0){
            throw new AppError("Invalid Item ID", StatusCodes.BAD_REQUEST)
        }
        const data = returnSchema.parse(req.body);
        const result = await returnsService(userId, orderItemId, data);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Returns Request successfully, Pending response.",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const returnStatusTransitionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user){
        throw new AppError("Authenticate User", StatusCodes.UNAUTHORIZED)
    }
    const returnId = Number(req.params.returnId);
            if(Number.isNaN(returnId) || returnId <= 0){
            throw new AppError("Invalid return ID", StatusCodes.BAD_REQUEST)
        }
    const { status } = returnStatusSchema.parse(req.body);

    const result = await returnStatusTransitionService(
      returnId,
      status,
    );

    return res.status(StatusCodes.OK).json({
      message: "Return status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
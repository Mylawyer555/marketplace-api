import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { checkoutSchema } from "./checkout.validation";
import { checkoutService } from "./checkout.service";

export const checkoutController = async(
    req:Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user){
            throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
        };

        const userId = req.user.userId;
        const data = checkoutSchema.parse(req.body);
        const order = await checkoutService(userId, data);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Checkout successful!",
            data: order
        })
    } catch (error) {
        next(error)
    };
};
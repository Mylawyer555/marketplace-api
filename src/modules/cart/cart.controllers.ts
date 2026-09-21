import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { addToCart } from "./cart.service";
import { createCartSchema } from "./cart.valiadtion";

export const addToCartController = async(
    req:Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user){
            throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
        };

        const userId = Number(req.user.userId);
        const data = createCartSchema.parse( req.body);

        const cart = await addToCart(data, userId);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "You have successfully added to cart!",
            data: cart
        })

    } catch (error) {
        next(error)
    }
}
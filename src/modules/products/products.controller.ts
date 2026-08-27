import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import { createProductService } from "./products.service";

export const createProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
)=> {

    try {
            if (!req.user){
        throw new AppError("Authenticate user!", StatusCodes.UNAUTHORIZED);
    };

    const sellerId = req.user.userId;
    const data = req.body;
    const product = await createProductService(sellerId, data);
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Product created successfully",
        data: product
    });
    } catch (error) {
        next(error)
    }

};
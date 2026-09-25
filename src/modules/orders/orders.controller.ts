import {Request, Response, NextFunction} from 'express';
import { AppError } from '../../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { getMyOrdersService } from './orders.service';

export const getOrdersController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if(!req.user) {
            throw new AppError("Authenticate user!", StatusCodes.UNAUTHORIZED);
        };

        const userId = req.user.userId;
        const orders = await getMyOrdersService(userId);
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Orders retireved successfully",
            data: orders
        })
    } catch (error) {
        next(error)
    }
}
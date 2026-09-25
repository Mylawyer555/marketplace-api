import {Request, Response, NextFunction} from 'express';
import { AppError } from '../../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { getMyOrdersService, getOrderByIdService } from './orders.service';

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
            message: "Orders retrieved successfully",
            data: orders
        })
    } catch (error) {
        next(error)
    }
}
export const getOrdersByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if(!req.user) {
            throw new AppError("Authenticate user!", StatusCodes.UNAUTHORIZED);
        };

        const userId = req.user.userId;
        const orderId = Number(req.params.orderId);
        if(Number.isNaN(orderId) || orderId <= 0){
            throw new AppError("Invalid order ID", StatusCodes.BAD_REQUEST)
        }
        const order = await getOrderByIdService(orderId, userId)
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Order retrieved successfully",
            data: order
        })
    } catch (error) {
        next(error)
    }
}
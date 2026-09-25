import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findOrderByOrderId, findOrdersByUserId } from "./orders.repository"

export const getMyOrdersService = async (userId: number) => {
    const order = await findOrdersByUserId(userId);

    return order;
};

export const getOrderByIdService = async (orderId: number, userId: number) => {
    const order = await findOrderByOrderId(orderId);
    if (!order) {
        throw new AppError("Order does not exist", StatusCodes.NOT_FOUND);
    };

    if (order.buyer_id !== userId){
        throw new AppError("You're not permitted to perform this action", StatusCodes.FORBIDDEN);
    };

    return order;
}
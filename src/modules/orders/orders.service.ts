import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findOrdersByUserId } from "./orders.repository"

export const getMyOrdersService = async (userId: number) => {
    const order = await findOrdersByUserId(userId);

    return order;
};

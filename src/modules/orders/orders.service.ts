import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  findOrderByOrderId,
  findOrdersByUserId,
  updateOrderStatus,
} from "./orders.repository";
import { Order_Status } from "./orders.types";
import { order_status } from "../../generated/prisma/enums";

export const getMyOrdersService = async (userId: number) => {
  const order = await findOrdersByUserId(userId);

  return order;
};

export const getOrderByIdService = async (orderId: number, userId: number) => {
  const order = await findOrderByOrderId(orderId);
  if (!order) {
    throw new AppError("Order does not exist", StatusCodes.NOT_FOUND);
  }

  if (order.buyer_id !== userId) {
    throw new AppError(
      "You're not permitted to perform this action",
      StatusCodes.FORBIDDEN,
    );
  }

  return order;
};

export const orderStatusTransitionService = async (
  orderId: number,
  data: Order_Status,
  userId: number,
) => {
  const order = await findOrderByOrderId(orderId);

  if (!order) {
    throw new AppError("Orders does not exist", StatusCodes.NOT_FOUND);
  }

  if (order.buyer_id !== userId) {
    throw new AppError(
      "You're not permitted to perform this action",
      StatusCodes.FORBIDDEN,
    );
  }

  const allowedTransitions: Record<order_status, order_status[]> = {
    PENDING: ["PAID", "CANCELLED"],
    PAID: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: ["REFUNDED"],
    CANCELLED: [],
    REFUNDED: [],
  };

  const allowedStatuses = allowedTransitions[order.status];

  if (!allowedStatuses.includes(data.status)) {
    throw new AppError(
      `You cannot change ${order.status} to ${data.status} `,
      StatusCodes.BAD_REQUEST,
    );
  }

  const updatedOrder = await updateOrderStatus(order.order_id, data);

  return updatedOrder;
};

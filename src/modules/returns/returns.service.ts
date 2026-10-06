import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { createReturn, findOrderItemByItemId } from "./returns.repository";
import { Returns } from "./returns.types";
import { order_status } from "../../generated/prisma/enums";

export const returnsService = async (
  userId: number,
  itemId: number,
  data: Returns,
) => {
  const orderItem = await findOrderItemByItemId(itemId);

  if (!orderItem) {
    throw new AppError(
      "Order item does not exist",
      StatusCodes.NOT_FOUND,
    );
  }

  if (orderItem.orders.buyer_id !== userId) {
    throw new AppError(
      "You're not permitted to perform such action",
      StatusCodes.FORBIDDEN,
    );
  }

  const allowedStatuses: order_status[] = [
    "DELIVERED",
  ];

  if (!allowedStatuses.includes(orderItem.orders.status)) {
    throw new AppError(
      "Order is not eligible for return",
      StatusCodes.BAD_REQUEST,
    );
  }

  if (orderItem.quantity < data.quantity) {
    throw new AppError(
      "Requested quantity exceeded item quantity",
      StatusCodes.BAD_REQUEST,
    );
  }

  return await createReturn(orderItem.item_id, data);
};
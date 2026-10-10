import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  createReturn,
  findOrderItemByItemId,
  findReturnById,
  findReturnsByOrderItemId,
  updateReturnStatus,
} from "./returns.repository";
import { Returns } from "./returns.types";
import { order_status, returns_status } from "../../generated/prisma/enums";

export const returnsService = async (
  userId: number,
  itemId: number,
  data: Returns,
) => {
  const orderItem = await findOrderItemByItemId(itemId);

  if (!orderItem) {
    throw new AppError("Order item does not exist", StatusCodes.NOT_FOUND);
  }

  if (orderItem.orders.buyer_id !== userId) {
    throw new AppError(
      "You're not permitted to perform such action",
      StatusCodes.FORBIDDEN,
    );
  }

  const allowedStatuses: order_status[] = ["DELIVERED"];

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

  const existingReturns = await findReturnsByOrderItemId(orderItem.item_id);

  const previousClaim = existingReturns
    .filter((item) => item.status !== "REJECTED")
    .reduce((acc, cur) => acc + cur.quantity, 0);

  if (previousClaim + data.quantity > orderItem.quantity) {
    throw new AppError(
      "Requested quantity exceed the remaining allowance",
      StatusCodes.BAD_REQUEST,
    );
  }

  return await createReturn(orderItem.item_id, data);
};

export const returnStatusTransitionService = async (
  returnId: number,
  nextStatus: returns_status,
) => {
  const returns = await findReturnById(returnId);

  if (!returns) {
    throw new AppError("Return does not exist", StatusCodes.NOT_FOUND);
  }
const allowedTransitions: Record<returns_status, returns_status[]> = {
  REQUESTED: ["APPROVED", "REJECTED"],
  APPROVED: ["RECEIVED"],
  REJECTED: [],
  RECEIVED: ["COMPLETED"],
  COMPLETED: [],
};

  const allowedStatuses = allowedTransitions[returns.status];

  if (!allowedStatuses.includes(nextStatus)) {
    throw new AppError(
      `You cannot change ${returns.status} to ${nextStatus}`,
      StatusCodes.BAD_REQUEST,
    );
  }

  if (nextStatus === "COMPLETED"){
    throw new AppError("Return completion must use the inventory-restoration transaction", StatusCodes.BAD_REQUEST)
  }


  const updatedStatus = await updateReturnStatus(returnId, nextStatus);
  return updatedStatus;
};

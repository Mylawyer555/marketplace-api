import { db } from "../../config/db";
import { returns_status } from "../../generated/prisma/enums";
import { Returns } from "./returns.types";

export const findOrderItemByItemId = async (itemId: number) => {
  return db.orderItem.findUnique({
    where: {
      item_id: itemId,
    },
    include: {
      orders: {
        select: {
          buyer_id: true,
          status: true,
        },
      },
    },
  });
};

export const createReturn = async (itemId: number, data: Returns) => {
  return db.return.create({
    data: {
      order_item_id: itemId,
      quantity: data.quantity,
      reason: data.reason,
      status: "REQUESTED",
      requested_at: new Date(),
    },
  });
};

export const findReturnsByOrderItemId = async (itemId: number) => {
  return db.return.findMany({
    where: {
      order_item_id: itemId,
    },
    select: {
      quantity: true,
      status: true,
    },
  });
};

export const findReturnById = async (returnId: number) => {
  return db.return.findUnique({
    where: {
      return_id: returnId,
    },
    select: {
      status: true,
    },
  });
};

export const updateReturnStatus = async (
  returnId: number,
  nextStatus: returns_status,
) => {
  return db.return.update({
    where: {
      return_id: returnId,
    },
    data: {
      status: nextStatus,
      ...(nextStatus === "APPROVED" && {
        approved_at: new Date(),
      }),
    },
  });
};

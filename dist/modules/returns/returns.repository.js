"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReturnStatus = exports.findReturnById = exports.findReturnsByOrderItemId = exports.createReturn = exports.findOrderItemByItemId = void 0;
const db_1 = require("../../config/db");
const findOrderItemByItemId = async (itemId) => {
    return db_1.db.orderItem.findUnique({
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
exports.findOrderItemByItemId = findOrderItemByItemId;
const createReturn = async (itemId, data) => {
    return db_1.db.return.create({
        data: {
            order_item_id: itemId,
            quantity: data.quantity,
            reason: data.reason,
            status: "REQUESTED",
            requested_at: new Date(),
        },
    });
};
exports.createReturn = createReturn;
const findReturnsByOrderItemId = async (itemId) => {
    return db_1.db.return.findMany({
        where: {
            order_item_id: itemId,
        },
        select: {
            quantity: true,
            status: true,
        },
    });
};
exports.findReturnsByOrderItemId = findReturnsByOrderItemId;
const findReturnById = async (returnId) => {
    return db_1.db.return.findUnique({
        where: {
            return_id: returnId,
        },
        select: {
            status: true,
        },
    });
};
exports.findReturnById = findReturnById;
const updateReturnStatus = async (returnId, nextStatus) => {
    return db_1.db.return.update({
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
exports.updateReturnStatus = updateReturnStatus;
//# sourceMappingURL=returns.repository.js.map
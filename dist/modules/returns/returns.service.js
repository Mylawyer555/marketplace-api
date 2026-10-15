"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnStatusTransitionService = exports.returnsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const returns_repository_1 = require("./returns.repository");
const returnsService = async (userId, itemId, data) => {
    const orderItem = await (0, returns_repository_1.findOrderItemByItemId)(itemId);
    if (!orderItem) {
        throw new AppError_1.AppError("Order item does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (orderItem.orders.buyer_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform such action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const allowedStatuses = ["DELIVERED"];
    if (!allowedStatuses.includes(orderItem.orders.status)) {
        throw new AppError_1.AppError("Order is not eligible for return", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (orderItem.quantity < data.quantity) {
        throw new AppError_1.AppError("Requested quantity exceeded item quantity", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const existingReturns = await (0, returns_repository_1.findReturnsByOrderItemId)(orderItem.item_id);
    const previousClaim = existingReturns
        .filter((item) => item.status !== "REJECTED")
        .reduce((acc, cur) => acc + cur.quantity, 0);
    if (previousClaim + data.quantity > orderItem.quantity) {
        throw new AppError_1.AppError("Requested quantity exceed the remaining allowance", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    return await (0, returns_repository_1.createReturn)(orderItem.item_id, data);
};
exports.returnsService = returnsService;
const returnStatusTransitionService = async (returnId, nextStatus) => {
    const returns = await (0, returns_repository_1.findReturnById)(returnId);
    if (!returns) {
        throw new AppError_1.AppError("Return does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const allowedTransitions = {
        REQUESTED: ["APPROVED", "REJECTED"],
        APPROVED: ["RECEIVED"],
        REJECTED: [],
        RECEIVED: ["COMPLETED"],
        COMPLETED: [],
    };
    const allowedStatuses = allowedTransitions[returns.status];
    if (!allowedStatuses.includes(nextStatus)) {
        throw new AppError_1.AppError(`You cannot change ${returns.status} to ${nextStatus}`, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (nextStatus === "COMPLETED") {
        throw new AppError_1.AppError("Return completion must use the inventory-restoration transaction", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const updatedStatus = await (0, returns_repository_1.updateReturnStatus)(returnId, nextStatus);
    return updatedStatus;
};
exports.returnStatusTransitionService = returnStatusTransitionService;
//# sourceMappingURL=returns.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCancellationService = exports.orderStatusTransitionService = exports.getOrderByIdService = exports.getMyOrdersService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const orders_repository_1 = require("./orders.repository");
const db_1 = require("../../config/db");
const getMyOrdersService = async (userId) => {
    const order = await (0, orders_repository_1.findOrdersByUserId)(userId);
    return order;
};
exports.getMyOrdersService = getMyOrdersService;
const getOrderByIdService = async (orderId, userId) => {
    const order = await (0, orders_repository_1.findOrderByOrderId)(orderId);
    if (!order) {
        throw new AppError_1.AppError("Order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (order.buyer_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return order;
};
exports.getOrderByIdService = getOrderByIdService;
const orderStatusTransitionService = async (orderId, data, userId) => {
    const order = await (0, orders_repository_1.findOrderByOrderId)(orderId);
    if (!order) {
        throw new AppError_1.AppError("Orders does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (order.buyer_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const allowedTransitions = {
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
        throw new AppError_1.AppError(`You cannot change ${order.status} to ${data.status} `, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const updatedOrder = await (0, orders_repository_1.updateOrderStatus)(order.order_id, data);
    return updatedOrder;
};
exports.orderStatusTransitionService = orderStatusTransitionService;
const orderCancellationService = async (orderId, userId) => {
    return db_1.db.$transaction(async (tx) => {
        const order = await (0, orders_repository_1.findOrderForCancellation)(orderId, tx);
        if (!order) {
            throw new AppError_1.AppError("Order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (order.buyer_id !== userId) {
            throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        const cancellableStatuses = [
            "PENDING",
            "PAID",
            "PROCESSING"
        ];
        if (!cancellableStatuses.includes(order.status)) {
            throw new AppError_1.AppError(`You cannot cancel order with status ${order.status}`, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        for (const item of order.order_items) {
            const result = await (0, orders_repository_1.releaseReservedQuantity)(item.variant_id, item.quantity, tx);
            if (result.count !== 1) {
                throw new AppError_1.AppError("Unable to released reserved inventory", http_status_codes_1.StatusCodes.CONFLICT);
            }
        }
        const updatedOrder = await (0, orders_repository_1.updatecancellationStatus)(order.order_id, tx);
        return updatedOrder;
    });
};
exports.orderCancellationService = orderCancellationService;
//# sourceMappingURL=orders.service.js.map
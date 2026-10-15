"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderCancellationController = exports.orderStatusTransitionController = exports.getOrdersByIdController = exports.getOrdersController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const orders_service_1 = require("./orders.service");
const orders_validation_1 = require("./orders.validation");
const getOrdersController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const orders = await (0, orders_service_1.getMyOrdersService)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrdersController = getOrdersController;
const getOrdersByIdController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const orderId = Number(req.params.orderId);
        if (Number.isNaN(orderId) || orderId <= 0) {
            throw new AppError_1.AppError("Invalid order ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const order = await (0, orders_service_1.getOrderByIdService)(orderId, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Order retrieved successfully",
            data: order,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOrdersByIdController = getOrdersByIdController;
const orderStatusTransitionController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const orderId = Number(req.params.orderId);
        if (Number.isNaN(orderId) || orderId <= 0) {
            throw new AppError_1.AppError("Invalid order ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const data = orders_validation_1.orderStatusSchema.parse(req.body);
        const updatedOrderStatus = await (0, orders_service_1.orderStatusTransitionService)(orderId, data, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrderStatus,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.orderStatusTransitionController = orderStatusTransitionController;
const orderCancellationController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const orderId = Number(req.params.orderId);
        if (Number.isNaN(orderId) || orderId <= 0) {
            throw new AppError_1.AppError("Invalid order ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const updatedOrderCancellationStatus = await (0, orders_service_1.orderCancellationService)(orderId, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Order cancelled successfully",
            data: updatedOrderCancellationStatus,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.orderCancellationController = orderCancellationController;
//# sourceMappingURL=orders.controller.js.map
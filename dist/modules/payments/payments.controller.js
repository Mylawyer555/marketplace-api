"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPaymentController = exports.failPaymentController = exports.processPaymentController = exports.createPaymentController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const payments_validation_1 = require("./payments.validation");
const payments_service_1 = require("./payments.service");
const createPaymentController = async (req, res, next) => {
    try {
        // 1. Check authenticated user
        if (!req.user) {
            throw new AppError_1.AppError("authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        // 2. Get userId
        const userId = req.user.userId;
        const orderId = Number(req.params.orderId);
        if (Number.isNaN(orderId) || orderId <= 0) {
            throw new AppError_1.AppError("Invalid order ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const key = req.get("Idempotency-key")?.trim();
        if (!key || key.length > 100) {
            throw new AppError_1.AppError("A valid Idempotency-Key header is required (maximum 100 characters)", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const data = payments_validation_1.paymentMethodSchema.parse(req.body);
        const result = await (0, payments_service_1.createPaymentService)(orderId, userId, data, key);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "payment created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentController = createPaymentController;
const processPaymentController = async (req, res, next) => {
    try {
        const paymentId = Number(req.params.paymentId);
        if (!Number.isInteger(paymentId) || paymentId <= 0) {
            throw new AppError_1.AppError("Invalid payment ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const result = await (0, payments_service_1.processPaymentService)(paymentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Payment processed successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.processPaymentController = processPaymentController;
const failPaymentController = async (req, res, next) => {
    try {
        const paymentId = Number(req.params.paymentId);
        if (!Number.isInteger(paymentId) || paymentId <= 0) {
            throw new AppError_1.AppError("Invalid payment ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const result = await (0, payments_service_1.failPaymentService)(paymentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Payment Failed!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.failPaymentController = failPaymentController;
const refundPaymentController = async (req, res, next) => {
    try {
        const paymentId = Number(req.params.paymentId);
        if (!Number.isInteger(paymentId) || paymentId <= 0) {
            throw new AppError_1.AppError("Invalid payment ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const result = await (0, payments_service_1.refundPaymentService)(paymentId);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Payment refunded successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refundPaymentController = refundPaymentController;
//# sourceMappingURL=payments.controller.js.map
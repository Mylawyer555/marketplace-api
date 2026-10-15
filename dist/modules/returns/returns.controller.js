"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnStatusTransitionController = exports.returnsController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const returns_validation_1 = require("./returns.validation");
const returns_service_1 = require("./returns.service");
const returnsController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = req.user.userId;
        const orderItemId = Number(req.params.orderItemId);
        if (Number.isNaN(orderItemId) || orderItemId <= 0) {
            throw new AppError_1.AppError("Invalid Item ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const data = returns_validation_1.returnSchema.parse(req.body);
        const result = await (0, returns_service_1.returnsService)(userId, orderItemId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "Returns Request successfully, Pending response.",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.returnsController = returnsController;
const returnStatusTransitionController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate User", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const returnId = Number(req.params.returnId);
        if (Number.isNaN(returnId) || returnId <= 0) {
            throw new AppError_1.AppError("Invalid return ID", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const { status } = returns_validation_1.returnStatusSchema.parse(req.body);
        const result = await (0, returns_service_1.returnStatusTransitionService)(returnId, status);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Return status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.returnStatusTransitionController = returnStatusTransitionController;
//# sourceMappingURL=returns.controller.js.map
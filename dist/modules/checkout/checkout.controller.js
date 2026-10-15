"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const checkout_validation_1 = require("./checkout.validation");
const checkout_service_1 = require("./checkout.service");
const checkoutController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = req.user.userId;
        const data = checkout_validation_1.checkoutSchema.parse(req.body);
        const order = await (0, checkout_service_1.checkoutService)(userId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "Checkout successful!",
            data: order
        });
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.checkoutController = checkoutController;
//# sourceMappingURL=checkout.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeSellerController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const sellers_service_1 = require("./sellers.service");
const becomeSellerController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const seller = await (0, sellers_service_1.becomeSeller)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "congratulations you're now a seller.",
            data: seller,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.becomeSellerController = becomeSellerController;
//# sourceMappingURL=sellers.controller.js.map
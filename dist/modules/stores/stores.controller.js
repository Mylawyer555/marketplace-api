"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreController = exports.getMyStoreController = exports.createStoreController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const stores_service_1 = require("./stores.service");
const createStoreController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate User", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const data = req.body;
        const result = await (0, stores_service_1.createStoreService)(sellerId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "Store successfully created!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createStoreController = createStoreController;
const getMyStoreController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const store = await (0, stores_service_1.getMyStore)(sellerId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: store,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMyStoreController = getMyStoreController;
const updateStoreController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const data = req.body;
        const store = await (0, stores_service_1.updateStoreService)(sellerId, data);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            data: store,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateStoreController = updateStoreController;
//# sourceMappingURL=stores.controller.js.map
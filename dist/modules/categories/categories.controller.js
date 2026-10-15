"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryController = exports.createCategoryController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const categories_service_1 = require("./categories.service");
const createCategoryController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("user must authenticate!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = Number(req.user.userId);
        const data = req.body;
        const result = await (0, categories_service_1.createCategoryService)(sellerId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "category created successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createCategoryController = createCategoryController;
const getCategoryController = async (req, res, next) => {
    try {
        const categoryId = Number(req.params.categoryId);
        const result = await (0, categories_service_1.findCategoryByIdService)(categoryId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "category retrieved successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryController = getCategoryController;
//# sourceMappingURL=categories.controller.js.map
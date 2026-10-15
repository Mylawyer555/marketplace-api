"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishListController = exports.getWishListController = exports.addWishListController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_service_1 = require("./wishlist.service");
const addWishListController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = Number(req.user.userId);
        const data = wishlist_validation_1.addWishListSchema.parse(req.body);
        const result = await (0, wishlist_service_1.addWishlistService)(userId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "You have added to wishlist successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addWishListController = addWishListController;
const getWishListController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = Number(req.user.userId);
        const result = await (0, wishlist_service_1.getWishLishService)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "wishlist retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getWishListController = getWishListController;
const deleteWishListController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = Number(req.user.userId);
        const wishlistId = Number(req.params.wishlistId);
        await (0, wishlist_service_1.deleteWishlistService)(wishlistId, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Product removed from wishlist!",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteWishListController = deleteWishListController;
//# sourceMappingURL=wishlist.controller.js.map
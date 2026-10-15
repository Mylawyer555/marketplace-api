"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartController = exports.removeCartItemController = exports.updateCartQuantityController = exports.getCartController = exports.addToCartController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const cart_service_1 = require("./cart.service");
const cart_valiadtion_1 = require("./cart.valiadtion");
const addToCartController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = Number(req.user.userId);
        const data = cart_valiadtion_1.createCartSchema.parse(req.body);
        const cart = await (0, cart_service_1.addToCart)(data, userId);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "You have successfully added to cart!",
            data: cart
        });
    }
    catch (error) {
        next(error);
    }
};
exports.addToCartController = addToCartController;
const getCartController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = Number(req.user.userId);
        const cart = await (0, cart_service_1.getCartService)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Cart retrieved successfully!",
            data: cart
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCartController = getCartController;
const updateCartQuantityController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = Number(req.user.userId);
        const cartItemId = Number(req.params.cartItemId);
        const data = cart_valiadtion_1.updateCartQuantitySchema.parse(req.body);
        const updatedCartItem = await (0, cart_service_1.updateCartQuantityService)(cartItemId, data, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Cart updated successfully!",
            data: updatedCartItem
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateCartQuantityController = updateCartQuantityController;
const removeCartItemController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = Number(req.user.userId);
        const cartItemId = Number(req.params.cartItemId);
        const result = await (0, cart_service_1.removeCartItemService)(cartItemId, userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "CartItem deleted successfully!",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.removeCartItemController = removeCartItemController;
const clearCartController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        const userId = Number(req.user.userId);
        const result = await (0, cart_service_1.clearCartService)(userId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Cart is empty!",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.clearCartController = clearCartController;
//# sourceMappingURL=cart.controllers.js.map
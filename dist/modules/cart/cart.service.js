"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartService = exports.removeCartItemService = exports.updateCartQuantityService = exports.getCartService = exports.addToCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const cart_repository_1 = require("./cart.repository");
const addToCart = async (data, userId) => {
    const variant = await (0, cart_repository_1.findVariantForCart)(data.variantId);
    if (!variant) {
        throw new AppError_1.AppError("Variant doesn't exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (variant.product.status !== "ACTIVE") {
        throw new AppError_1.AppError("Product is not active", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    if (!variant.inventory) {
        throw new AppError_1.AppError("Inventory does not exist", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    const availableQuantity = variant.inventory.stock_quantity - variant.inventory.reserved_quantity;
    let cart = await (0, cart_repository_1.findCartByUserId)(userId);
    if (!cart) {
        cart = await (0, cart_repository_1.createCart)(userId);
    }
    const existingCartItem = await (0, cart_repository_1.findCartItem)(cart.cart_id, data.variantId);
    if (existingCartItem) {
        const newQuantity = existingCartItem.quantity + data.quantity;
        if (newQuantity > availableQuantity) {
            throw new AppError_1.AppError("Out of stock!", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        else {
            return await (0, cart_repository_1.updateCartItem)(existingCartItem.cart_item_id, newQuantity);
        }
    }
    else {
        if (data.quantity > availableQuantity) {
            throw new AppError_1.AppError("out of stock", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        else {
            return (0, cart_repository_1.createCartItem)(data, cart.cart_id, variant.price);
        }
    }
};
exports.addToCart = addToCart;
const getCartService = async (userId) => {
    const cart = await (0, cart_repository_1.findCartByUserWithItems)(userId);
    if (!cart) {
        throw new AppError_1.AppError("cart not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    return cart;
};
exports.getCartService = getCartService;
const updateCartQuantityService = async (cartItemId, data, userId) => {
    const cartItem = await (0, cart_repository_1.findCartItemById)(cartItemId);
    if (!cartItem) {
        throw new AppError_1.AppError("Cart-item does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (cartItem.carts.user_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const inventory = cartItem.variant.inventory;
    if (!inventory) {
        throw new AppError_1.AppError("This product must have an inventory in other to update cart", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const availableQuantity = inventory.stock_quantity - inventory.reserved_quantity;
    if (data.quantity > availableQuantity) {
        throw new AppError_1.AppError("Out of stock!", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    return await (0, cart_repository_1.updateCartQuantity)(cartItem.cart_item_id, data);
};
exports.updateCartQuantityService = updateCartQuantityService;
const removeCartItemService = async (cartItemId, userId) => {
    const cartItem = await (0, cart_repository_1.findCartItemById)(cartItemId);
    if (!cartItem) {
        throw new AppError_1.AppError("cart item does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (cartItem.carts.user_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform this operation", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return await (0, cart_repository_1.deleteCartItem)(cartItem.cart_item_id);
};
exports.removeCartItemService = removeCartItemService;
const clearCartService = async (userId) => {
    const cart = await (0, cart_repository_1.findCartByUserId)(userId);
    if (!cart) {
        throw new AppError_1.AppError("cart does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    return await (0, cart_repository_1.clearCart)(cart.cart_id);
};
exports.clearCartService = clearCartService;
//# sourceMappingURL=cart.service.js.map
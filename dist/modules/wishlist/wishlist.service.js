"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlistService = exports.getWishLishService = exports.addWishlistService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const wishlist_repository_1 = require("./wishlist.repository");
const addWishlistService = async (userId, data) => {
    const product = await (0, wishlist_repository_1.findProductById)(data.productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    ;
    if (product.status !== "ACTIVE") {
        throw new AppError_1.AppError("Product must be active to add to wishlist", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    ;
    const isProductInWishlist = await (0, wishlist_repository_1.findWishlist)(userId, data.productId);
    if (isProductInWishlist) {
        throw new AppError_1.AppError("Product already added to wishlist", http_status_codes_1.StatusCodes.CONFLICT);
    }
    ;
    return await (0, wishlist_repository_1.createWishList)(userId, data);
};
exports.addWishlistService = addWishlistService;
const getWishLishService = async (userId) => {
    const wishList = await (0, wishlist_repository_1.findWishListByUserId)(userId);
    if (!wishList) {
        return {
            data: [],
        };
    }
    return wishList;
};
exports.getWishLishService = getWishLishService;
const deleteWishlistService = async (wishlistId, userId) => {
    const isWishlistExist = await (0, wishlist_repository_1.findWishlistById)(wishlistId);
    if (!isWishlistExist) {
        throw new AppError_1.AppError("No record of wishlist found!", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    ;
    if (isWishlistExist.user_id !== userId) {
        throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    ;
    return await (0, wishlist_repository_1.deleteWishlist)(wishlistId);
};
exports.deleteWishlistService = deleteWishlistService;
//# sourceMappingURL=wishlist.service.js.map
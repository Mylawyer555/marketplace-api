"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishlist = exports.findWishlistById = exports.findWishListByUserId = exports.createWishList = exports.findWishlist = exports.findProductById = void 0;
const db_1 = require("../../config/db");
const findProductById = async (productId) => {
    return db_1.db.product.findUnique({
        where: {
            product_id: productId,
        },
        select: {
            status: true,
        },
    });
};
exports.findProductById = findProductById;
const findWishlist = async (userId, productId) => {
    return db_1.db.wishlist.findUnique({
        where: {
            user_id_product_id: {
                user_id: userId,
                product_id: productId,
            },
        },
    });
};
exports.findWishlist = findWishlist;
const createWishList = async (userId, data) => {
    return db_1.db.wishlist.create({
        data: {
            user_id: userId,
            product_id: data.productId,
        },
    });
};
exports.createWishList = createWishList;
const findWishListByUserId = async (userId) => {
    return db_1.db.user.findUnique({
        where: {
            user_id: userId,
        },
        select: {
            wishlists: {
                select: {
                    wishlist_id: true,
                    product_id: true,
                    products: {
                        select: {
                            product_id: true,
                            product_name: true,
                            status: true,
                            images: {
                                select: {
                                    productimage_id: true,
                                    image_url: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
exports.findWishListByUserId = findWishListByUserId;
const findWishlistById = async (wishlistId) => {
    return db_1.db.wishlist.findUnique({
        where: {
            wishlist_id: wishlistId
        }
    });
};
exports.findWishlistById = findWishlistById;
const deleteWishlist = async (wishlistId) => {
    return db_1.db.wishlist.delete({
        where: {
            wishlist_id: wishlistId,
        },
    });
};
exports.deleteWishlist = deleteWishlist;
//# sourceMappingURL=wishlist.repository.js.map
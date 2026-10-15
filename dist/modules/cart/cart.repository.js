"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.deleteCartItem = exports.updateCartQuantity = exports.findCartItemById = exports.findCartByUserWithItems = exports.updateCartItem = exports.createCartItem = exports.createCart = exports.findCartItem = exports.findCartByUserId = exports.findVariantForCart = void 0;
const db_1 = require("../../config/db");
const findVariantForCart = async (variantId) => {
    return db_1.db.productVariant.findUnique({
        where: {
            variant_id: variantId,
        },
        select: {
            price: true,
            product: {
                select: {
                    product_id: true,
                    status: true,
                },
            },
            inventory: {
                select: {
                    stock_quantity: true,
                    reserved_quantity: true,
                },
            },
        },
    });
};
exports.findVariantForCart = findVariantForCart;
const findCartByUserId = async (userId) => {
    return db_1.db.cart.findUnique({
        where: {
            user_id: userId,
        },
    });
};
exports.findCartByUserId = findCartByUserId;
const findCartItem = async (cartId, variantId) => {
    return db_1.db.cartItem.findUnique({
        where: {
            variant_id_cart_id: {
                cart_id: cartId,
                variant_id: variantId,
            },
        },
    });
};
exports.findCartItem = findCartItem;
const createCart = async (userId) => {
    return db_1.db.cart.create({
        data: {
            user_id: userId,
        },
    });
};
exports.createCart = createCart;
const createCartItem = async (data, cartId, price) => {
    return db_1.db.cartItem.create({
        data: {
            variant_id: data.variantId,
            quantity: data.quantity,
            cart_id: cartId,
            price,
        },
    });
};
exports.createCartItem = createCartItem;
const updateCartItem = async (cartItemId, quantity) => {
    return db_1.db.cartItem.update({
        where: {
            cart_item_id: cartItemId,
        },
        data: {
            quantity,
        },
    });
};
exports.updateCartItem = updateCartItem;
const findCartByUserWithItems = async (userId) => {
    return db_1.db.cart.findUnique({
        where: {
            user_id: userId,
        },
        select: {
            cart_items: {
                select: {
                    cart_id: true,
                    cart_item_id: true,
                    price: true,
                    quantity: true,
                    variant: {
                        select: {
                            variant_id: true,
                            sku: true,
                            color: true,
                            variant_storage: true,
                            product: {
                                select: {
                                    product_id: true,
                                    product_name: true,
                                    status: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
};
exports.findCartByUserWithItems = findCartByUserWithItems;
const findCartItemById = async (cartItemId) => {
    return db_1.db.cartItem.findUnique({
        where: {
            cart_item_id: cartItemId,
        },
        select: {
            cart_id: true,
            cart_item_id: true,
            variant_id: true,
            carts: {
                select: {
                    user_id: true,
                },
            },
            variant: {
                select: {
                    inventory: {
                        select: {
                            reserved_quantity: true,
                            stock_quantity: true,
                        },
                    },
                },
            },
        },
    });
};
exports.findCartItemById = findCartItemById;
const updateCartQuantity = async (cartItemId, data) => {
    return db_1.db.cartItem.update({
        where: {
            cart_item_id: cartItemId,
        },
        data: {
            quantity: data.quantity,
        },
    });
};
exports.updateCartQuantity = updateCartQuantity;
const deleteCartItem = async (cartItem) => {
    return db_1.db.cartItem.delete({
        where: {
            cart_item_id: cartItem,
        },
    });
};
exports.deleteCartItem = deleteCartItem;
const clearCart = async (cartId) => {
    return db_1.db.cartItem.deleteMany({
        where: {
            cart_id: cartId,
        },
    });
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.repository.js.map
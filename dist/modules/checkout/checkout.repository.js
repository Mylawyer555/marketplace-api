"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.createOrderItem = exports.createOrder = exports.updateInventory = exports.lockInventory = exports.getCartByUserId = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const getCartByUserId = async (userId, tx) => {
    return tx.cart.findUnique({
        where: {
            user_id: userId,
        },
        select: {
            cart_id: true,
            cart_items: {
                select: {
                    cart_item_id: true,
                    variant_id: true,
                    price: true,
                    quantity: true,
                    variant: {
                        select: {
                            product_id: true,
                            price: true,
                            status: true,
                            product: {
                                select: {
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
                    },
                },
            },
        },
    });
};
exports.getCartByUserId = getCartByUserId;
const lockInventory = async (variantId, tx) => {
    return tx.$queryRaw `
        SELECT *
        FROM inventory 
        WHERE variant_id = ${variantId}
        FOR UPDATE
        `;
};
exports.lockInventory = lockInventory;
const updateInventory = async (variantId, quantity, tx) => {
    const result = await tx.$executeRaw `
    UPDATE "inventory"
    SET "reserved_quantity" = "reserved_quantity" + ${quantity}
    WHERE "variant_id" = ${variantId}
      AND ${quantity} > 0
      AND "reserved_quantity" + ${quantity} <= "stock_quantity"
  `;
    if (result !== 1) {
        throw new AppError_1.AppError("Inventory reservation failed", http_status_codes_1.StatusCodes.CONFLICT);
    }
};
exports.updateInventory = updateInventory;
const createOrder = async (buyerId, orderNumber, totalAmount, data, tx) => {
    return tx.order.create({
        data: {
            order_number: orderNumber,
            users: {
                connect: {
                    user_id: buyerId,
                },
            },
            total_amount: totalAmount,
            shipping_name: data.shippingName,
            shipping_phone_number: data.shippingPhoneNumber,
            shipping_street: data.street,
            shipping_apartment_number: data.apartmentNumber ?? null,
            shipping_house_number: data.houseNumber ?? null,
            shipping_city: data.city,
            shipping_state: data.state,
            shipping_country: data.country,
            shipping_postal_code: data.postalCode,
            delivery_note: data.deliveryNote ?? null
        }
    });
};
exports.createOrder = createOrder;
const createOrderItem = async (orderId, productId, variantId, quantity, priceAtPurchase, tx) => {
    return tx.orderItem.create({
        data: {
            order_id: orderId,
            product_id: productId,
            variant_id: variantId,
            quantity,
            price_at_purchase: priceAtPurchase,
        }
    });
};
exports.createOrderItem = createOrderItem;
const clearCart = async (cartId, tx) => {
    return tx.cartItem.deleteMany({
        where: {
            cart_id: cartId,
        },
    });
};
exports.clearCart = clearCart;
//# sourceMappingURL=checkout.repository.js.map
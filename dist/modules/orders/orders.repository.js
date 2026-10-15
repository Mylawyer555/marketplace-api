"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecancellationStatus = exports.releaseReservedQuantity = exports.findOrderForCancellation = exports.updateOrderStatus = exports.findOrderByOrderId = exports.findOrdersByUserId = void 0;
const db_1 = require("../../config/db");
const findOrdersByUserId = async (userId) => {
    return db_1.db.order.findMany({
        where: {
            buyer_id: userId,
        },
        select: {
            order_id: true,
            order_number: true,
            status: true,
            total_amount: true,
            created_at: true,
            order_items: {
                select: {
                    item_id: true,
                    product_id: true,
                    variant_id: true,
                    quantity: true,
                    price_at_purchase: true,
                },
            },
        },
    });
};
exports.findOrdersByUserId = findOrdersByUserId;
const findOrderByOrderId = async (orderId) => {
    return db_1.db.order.findUnique({
        where: {
            order_id: orderId,
        },
        select: {
            order_id: true,
            order_number: true,
            buyer_id: true,
            total_amount: true,
            status: true,
            created_at: true,
            order_items: {
                select: {
                    item_id: true,
                    product_id: true,
                    variant_id: true,
                    quantity: true,
                    price_at_purchase: true,
                    variant: {
                        select: {
                            sku: true,
                            color: true,
                            variant_storage: true,
                        },
                    },
                },
            },
        },
    });
};
exports.findOrderByOrderId = findOrderByOrderId;
const updateOrderStatus = async (orderId, data) => {
    return db_1.db.order.update({
        where: {
            order_id: orderId,
        },
        data: {
            status: data.status,
        },
    });
};
exports.updateOrderStatus = updateOrderStatus;
const findOrderForCancellation = async (orderId, tx) => {
    return tx.order.findUnique({
        where: {
            order_id: orderId,
        },
        select: {
            order_id: true,
            buyer_id: true,
            order_number: true,
            status: true,
            order_items: {
                select: {
                    variant_id: true,
                    quantity: true
                }
            }
        }
    });
};
exports.findOrderForCancellation = findOrderForCancellation;
const releaseReservedQuantity = async (variantId, quantity, tx) => {
    return tx.inventory.updateMany({
        where: {
            variant_id: variantId,
            reserved_quantity: {
                gte: quantity
            }
        },
        data: {
            reserved_quantity: {
                decrement: quantity
            }
        }
    });
};
exports.releaseReservedQuantity = releaseReservedQuantity;
const updatecancellationStatus = async (orderId, tx) => {
    return tx.order.update({
        where: {
            order_id: orderId,
        },
        data: {
            status: "CANCELLED",
        },
    });
};
exports.updatecancellationStatus = updatecancellationStatus;
//# sourceMappingURL=orders.repository.js.map
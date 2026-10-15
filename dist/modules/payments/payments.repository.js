"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPaymentByIdempotencyKey = exports.markPaymentAsRefunded = exports.markOrderAsRefunded = exports.findPaymentForRefund = exports.markPaymentAsFailed = exports.releaseInventoryReservation = exports.findOrderItemsForProcessing = exports.finalizeInventory = exports.markOrderPaid = exports.markPaymentSuccess = exports.findInventoryForPaymentProcessing = exports.findOrderForPaymentProcessing = exports.findPaymentForProcessing = exports.createPayment = exports.findPendingPayment = exports.findOrderForPayment = void 0;
const db_1 = require("../../config/db");
const findOrderForPayment = async (orderId) => {
    return db_1.db.order.findUnique({
        where: {
            order_id: orderId,
        },
    });
};
exports.findOrderForPayment = findOrderForPayment;
const findPendingPayment = async (orderId) => {
    return db_1.db.payment.findFirst({
        where: {
            order_id: orderId,
            status: "PENDING",
        },
    });
};
exports.findPendingPayment = findPendingPayment;
const createPayment = async (orderId, paymentReference, amount, { method }, key) => {
    return db_1.db.payment.create({
        data: {
            order_id: orderId,
            payment_reference: paymentReference,
            amount,
            method,
            status: "PENDING",
            idempotency_key: key
        },
    });
};
exports.createPayment = createPayment;
const findPaymentForProcessing = async (paymentId, tx) => {
    return tx.$queryRaw `
    SELECT *
    FROM payments 
    WHERE payment_id = ${paymentId}
    FOR UPDATE
    `;
};
exports.findPaymentForProcessing = findPaymentForProcessing;
const findOrderForPaymentProcessing = async (orderId, tx) => {
    return tx.$queryRaw `
    SELECT *
    FROM orders
    WHERE order_id = ${orderId}
    FOR UPDATE
    `;
};
exports.findOrderForPaymentProcessing = findOrderForPaymentProcessing;
const findInventoryForPaymentProcessing = async (variantId, tx) => {
    return tx.$queryRaw `
       SELECT *
       FROM inventory
       WHERE variant_id = ${variantId}
       FOR UPDATE
    `;
};
exports.findInventoryForPaymentProcessing = findInventoryForPaymentProcessing;
const markPaymentSuccess = async (paymentId, tx) => {
    return tx.payment.update({
        where: {
            payment_id: paymentId,
        },
        data: {
            status: "SUCCESS",
            paid_at: new Date(),
        },
    });
};
exports.markPaymentSuccess = markPaymentSuccess;
const markOrderPaid = async (orderId, tx) => {
    return tx.order.update({
        where: {
            order_id: orderId,
        },
        data: {
            status: "PAID",
        },
    });
};
exports.markOrderPaid = markOrderPaid;
const finalizeInventory = async (variantId, quantity, tx) => {
    return tx.inventory.update({
        where: {
            variant_id: variantId,
        },
        data: {
            stock_quantity: {
                decrement: quantity,
            },
            reserved_quantity: {
                decrement: quantity,
            },
        },
    });
};
exports.finalizeInventory = finalizeInventory;
const findOrderItemsForProcessing = async (orderId, tx) => {
    return tx.orderItem.findMany({
        where: {
            order_id: orderId,
        },
        select: {
            variant_id: true,
            quantity: true,
        },
    });
};
exports.findOrderItemsForProcessing = findOrderItemsForProcessing;
const releaseInventoryReservation = async (variantId, quantity, tx) => {
    return tx.inventory.update({
        where: {
            variant_id: variantId,
        },
        data: {
            reserved_quantity: {
                decrement: quantity,
            },
        },
    });
};
exports.releaseInventoryReservation = releaseInventoryReservation;
const markPaymentAsFailed = async (paymentId, tx) => {
    return tx.payment.update({
        where: {
            payment_id: paymentId,
        },
        data: {
            status: "FAILED",
        },
    });
};
exports.markPaymentAsFailed = markPaymentAsFailed;
const findPaymentForRefund = async (paymentId, tx) => {
    return tx.$queryRaw `
  SELECT *
  FROM payments 
  WHERE payment_id = ${paymentId}
  FOR UPDATE 
  `;
};
exports.findPaymentForRefund = findPaymentForRefund;
const markOrderAsRefunded = async (orderId, tx) => {
    return tx.order.update({
        where: {
            order_id: orderId,
        },
        data: {
            status: "REFUNDED",
        },
    });
};
exports.markOrderAsRefunded = markOrderAsRefunded;
const markPaymentAsRefunded = async (paymentId, tx) => {
    return tx.payment.update({
        where: {
            payment_id: paymentId,
        },
        data: {
            status: "REFUNDED",
        },
    });
};
exports.markPaymentAsRefunded = markPaymentAsRefunded;
const findPaymentByIdempotencyKey = async (key) => {
    return db_1.db.payment.findUnique({
        where: {
            idempotency_key: key
        }
    });
};
exports.findPaymentByIdempotencyKey = findPaymentByIdempotencyKey;
//# sourceMappingURL=payments.repository.js.map
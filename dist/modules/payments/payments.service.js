"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPaymentService = exports.failPaymentService = exports.processPaymentService = exports.createPaymentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const payments_repository_1 = require("./payments.repository");
const payment_reference_generator_1 = require("../../utils/payment_reference_generator");
const db_1 = require("../../config/db");
const client_1 = require("../../generated/prisma/client");
const createPaymentService = async (orderId, userId, data, key) => {
    try {
        const order = await (0, payments_repository_1.findOrderForPayment)(orderId);
        if (!order) {
            throw new AppError_1.AppError("order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        if (order.buyer_id !== userId) {
            throw new AppError_1.AppError("You're not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        const existingPayment = await (0, payments_repository_1.findPaymentByIdempotencyKey)(key);
        if (existingPayment) {
            if (existingPayment.order_id !== orderId ||
                existingPayment.method !== data.method) {
                throw new AppError_1.AppError("Idempotency key was already used for a different request", http_status_codes_1.StatusCodes.CONFLICT);
            }
            return existingPayment;
        }
        if (order.status !== "PENDING") {
            throw new AppError_1.AppError(`Order must be PENDING to proceed`, http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const payment = await (0, payments_repository_1.findPendingPayment)(orderId);
        if (payment) {
            throw new AppError_1.AppError("Payment already exist for this order", http_status_codes_1.StatusCodes.CONFLICT);
        }
        const amount = order.total_amount;
        const payment_reference = (0, payment_reference_generator_1.generatePaymentReference)();
        const newPayment = await (0, payments_repository_1.createPayment)(orderId, payment_reference, amount, data, key);
        return newPayment;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            const existingPayment = await (0, payments_repository_1.findPaymentByIdempotencyKey)(key);
            if (existingPayment) {
                if (existingPayment.order_id !== orderId ||
                    existingPayment.method !== data.method) {
                    throw new AppError_1.AppError("Idempotency key was already used for a different request", http_status_codes_1.StatusCodes.CONFLICT);
                }
                return existingPayment;
            }
            // The unique constraint violation wasn't resolved by the idempotency lookup.
        }
        throw error;
    }
};
exports.createPaymentService = createPaymentService;
const processPaymentService = async (paymentId) => {
    return db_1.db.$transaction(async (tx) => {
        // 1. Lock payment row
        const payment = await (0, payments_repository_1.findPaymentForProcessing)(paymentId, tx);
        if (payment.length === 0) {
            throw new AppError_1.AppError("Payment does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const paymentRecord = payment[0];
        // 2. Prevent duplicate processing
        if (paymentRecord.status !== "PENDING") {
            throw new AppError_1.AppError("Payment should not be processed again", http_status_codes_1.StatusCodes.CONFLICT);
        }
        // 3. Lock order row
        const order = await (0, payments_repository_1.findOrderForPaymentProcessing)(paymentRecord.order_id, tx);
        if (order.length === 0) {
            throw new AppError_1.AppError("Order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const orderRecord = order[0];
        // 4. Order must still be pending
        if (orderRecord.status !== "PENDING") {
            throw new AppError_1.AppError("Order must be pending to proceed", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        // 5. Get all order items
        const orderItems = await (0, payments_repository_1.findOrderItemsForProcessing)(orderRecord.order_id, tx);
        if (orderItems.length === 0) {
            throw new AppError_1.AppError("Order has no items", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        // 6. Always lock inventory in deterministic order
        const sortedItems = [...orderItems].sort((a, b) => a.variant_id - b.variant_id);
        // 7. Convert reservations into sales
        for (const item of sortedItems) {
            const inventory = await (0, payments_repository_1.findInventoryForPaymentProcessing)(item.variant_id, tx);
            if (inventory.length === 0) {
                throw new AppError_1.AppError("Inventory does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const inventoryRecord = inventory[0];
            // Checkout should already have reserved this quantity.
            if (inventoryRecord.reserved_quantity < item.quantity) {
                throw new AppError_1.AppError(`Insufficient reserved inventory for ${item.variant_id}`, http_status_codes_1.StatusCodes.CONFLICT);
            }
            await (0, payments_repository_1.finalizeInventory)(item.variant_id, item.quantity, tx);
        }
        // 8. Mark payment successful
        const successfulPayment = await (0, payments_repository_1.markPaymentSuccess)(paymentRecord.payment_id, tx);
        // 9. Mark order as paid
        const paidOrder = await (0, payments_repository_1.markOrderPaid)(orderRecord.order_id, tx);
        return {
            payment: successfulPayment,
            order: paidOrder,
        };
    });
};
exports.processPaymentService = processPaymentService;
const failPaymentService = async (paymentId) => {
    return db_1.db.$transaction(async (tx) => {
        //lock payment
        const payment = await (0, payments_repository_1.findPaymentForProcessing)(paymentId, tx);
        if (payment.length === 0) {
            throw new AppError_1.AppError("Payment does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const paymentRecord = payment[0];
        if (paymentRecord.status !== "PENDING") {
            throw new AppError_1.AppError("Payment should not be processed again", http_status_codes_1.StatusCodes.CONFLICT);
        }
        const order = await (0, payments_repository_1.findOrderForPaymentProcessing)(paymentRecord.order_id, tx);
        if (order.length === 0) {
            throw new AppError_1.AppError("Order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const orderRecord = order[0];
        if (orderRecord.status !== "PENDING") {
            throw new AppError_1.AppError(`Order must be PENDING to proceed`, http_status_codes_1.StatusCodes.CONFLICT);
        }
        const orderItem = await (0, payments_repository_1.findOrderItemsForProcessing)(orderRecord.order_id, tx);
        if (orderItem.length === 0) {
            throw new AppError_1.AppError("Order Item not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const sortItems = [...orderItem].sort((a, b) => {
            return a.variant_id - b.variant_id;
        });
        // loop through
        for (const item of sortItems) {
            //lock each inventory row
            const inventory = await (0, payments_repository_1.findInventoryForPaymentProcessing)(item.variant_id, tx);
            if (inventory.length === 0) {
                throw new AppError_1.AppError("Inventory does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const inventoryRecord = inventory[0];
            //ensure checkout actually reserved the quantity
            if (inventoryRecord.reserved_quantity < item.quantity) {
                throw new AppError_1.AppError(`Insufficient reserved quantity for ${item.variant_id}`, http_status_codes_1.StatusCodes.CONFLICT);
            }
            //released reservation
            await (0, payments_repository_1.releaseInventoryReservation)(item.variant_id, item.quantity, tx);
        }
        const markedFailed = await (0, payments_repository_1.markPaymentAsFailed)(paymentRecord.payment_id, tx);
        return markedFailed;
    });
};
exports.failPaymentService = failPaymentService;
const refundPaymentService = async (paymentId) => {
    return db_1.db.$transaction(async (tx) => {
        // Lock payment
        const payment = await (0, payments_repository_1.findPaymentForRefund)(paymentId, tx);
        if (payment.length === 0) {
            throw new AppError_1.AppError("Payment does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const paymentRecord = payment[0];
        // Only successful payments can be refunded
        if (paymentRecord.status !== "SUCCESS") {
            throw new AppError_1.AppError("Only successful payments can be refunded", http_status_codes_1.StatusCodes.CONFLICT);
        }
        // Lock order
        const order = await (0, payments_repository_1.findOrderForPaymentProcessing)(paymentRecord.order_id, tx);
        if (order.length === 0) {
            throw new AppError_1.AppError("Order does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const orderRecord = order[0];
        // Only PAID orders can be refunded
        if (orderRecord.status !== "PAID") {
            throw new AppError_1.AppError("Order must be PAID before it can be refunded", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        // Payment → REFUNDED
        const paymentRefunded = await (0, payments_repository_1.markPaymentAsRefunded)(paymentId, tx);
        // Order → REFUNDED
        await (0, payments_repository_1.markOrderAsRefunded)(orderRecord.order_id, tx);
        return paymentRefunded;
    });
};
exports.refundPaymentService = refundPaymentService;
//# sourceMappingURL=payments.service.js.map
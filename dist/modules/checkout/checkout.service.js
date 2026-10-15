"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutService = void 0;
const http_status_codes_1 = require("http-status-codes");
const db_1 = require("../../config/db");
const AppError_1 = require("../../utils/AppError");
const checkout_repository_1 = require("./checkout.repository");
const client_1 = require("@prisma/client/runtime/client");
const generateOrderNumbers_1 = require("../../utils/generateOrderNumbers");
const checkoutService = async (userId, data) => {
    /*
     * CHECKOUT FLOW
     * -------------
     * Checkout converts the user's current cart into an order atomically.
     *
     * The entire operation runs inside ONE database transaction because
     * creating the order, creating order items, reserving inventory, and
     * clearing the cart must either ALL succeed or ALL fail.
     *
     * If any step throws an error, PostgreSQL rolls back every database
     * change made inside this transaction.
     *
     * High-level flow:
     *
     *   Cart
     *     ↓
     *   Validate cart/items
     *     ↓
     *   Lock inventory rows
     *     ↓
     *   Validate stock + product/variant status + price
     *     ↓
     *   Calculate total
     *     ↓
     *   Create Order
     *     ↓
     *   Create OrderItems
     *     ↓
     *   Reserve inventory
     *     ↓
     *   Clear cart
     *     ↓
     *   COMMIT
     */
    return await db_1.db.$transaction(async (tx) => {
        // Get the user's cart using the transaction client.
        // Every database operation belonging to checkout must use `tx`
        // so that all changes participate in the same transaction.
        const cart = await (0, checkout_repository_1.getCartByUserId)(userId, tx);
        // A user cannot checkout without a cart.
        if (!cart) {
            throw new AppError_1.AppError("Cart does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        // Prevent creating an empty order.
        if (cart.cart_items.length === 0) {
            throw new AppError_1.AppError("Cart has no item", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        /*
         * DEADLOCK PREVENTION
         * -------------------
         * Multiple cart items may require multiple inventory rows to be locked.
         *
         * We sort by variant_id so every checkout transaction attempts to acquire
         * inventory locks in the same deterministic order.
         *
         * Example:
         *
         * Checkout A needs variants: 5, 8
         * Checkout B needs variants: 8, 5
         *
         * Without a consistent order, both transactions could lock one row and
         * wait for the other, creating a deadlock.
         *
         * Sorting means both transactions lock:
         *
         *   5 → 8
         *
         * This greatly reduces the possibility of circular lock waiting.
         */
        const sortedItems = [...cart.cart_items].sort((a, b) => a.variant_id - b.variant_id);
        /*
         * MONEY CALCULATION
         * -----------------
         * Prisma Decimal is used instead of JavaScript Number because money
         * calculations should avoid floating-point precision problems.
         *
         * Decimal operations are immutable, so `.add()` returns a NEW Decimal.
         * Therefore we must assign the result back to totalAmount.
         */
        let totalAmount = new client_1.Decimal(0);
        /*
         * VALIDATE EVERY CART ITEM
         * ------------------------
         * Before creating the order, every cart item must still be valid.
         *
         * We cannot blindly trust the cart because the product, variant,
         * inventory, or price may have changed since the item was added.
         */
        for (const item of sortedItems) {
            /*
             * CONCURRENCY CONTROL
             * -------------------
             * Lock the inventory row using SELECT ... FOR UPDATE.
             *
             * The lock prevents another checkout transaction from modifying
             * this inventory row until our transaction commits or rolls back.
             *
             * This protects against the classic overselling race condition:
             *
             *   Stock = 1
             *
             *   Customer A reads available stock = 1
             *   Customer B reads available stock = 1
             *
             *   Without a lock, both could reserve the same item.
             *
             * With FOR UPDATE:
             *
             *   A locks the row
             *   B must wait
             *   A reserves the stock and commits
             *   B continues and sees the updated reservation.
             */
            const inventoryLock = await (0, checkout_repository_1.lockInventory)(item.variant_id, tx);
            // The product must still be available for purchase.
            if (item.variant.product.status !== "ACTIVE") {
                throw new AppError_1.AppError("Product must be active!", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            // The specific variant must also be active.
            if (item.variant.status !== "ACTIVE") {
                throw new AppError_1.AppError("Variant must be active", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            /*
             * PRICE VALIDATION
             * ----------------
             * CartItem.price is only a snapshot of the price when the item
             * was added to the cart.
             *
             * ProductVariant.price is the current authoritative catalog price.
             *
             * If the price changed, we stop checkout instead of silently
             * charging the customer a different amount.
             */
            if (!item.variant.price.equals(item.price)) {
                throw new AppError_1.AppError("There was a change in price", http_status_codes_1.StatusCodes.CONFLICT);
            }
            // Every purchasable variant must have an inventory record.
            if (inventoryLock.length === 0) {
                throw new AppError_1.AppError("Inventory not found", http_status_codes_1.StatusCodes.NOT_FOUND);
            }
            const inventory = inventoryLock[0];
            /*
             * AVAILABLE STOCK
             * ---------------
             * We do not use stock_quantity alone.
             *
             * Some stock may already be reserved by other unpaid orders.
             *
             * Available stock =
             *
             *   stock_quantity - reserved_quantity
             *
             * Example:
             *
             *   stock = 10
             *   reserved = 3
             *   available = 7
             */
            const availableQuantity = inventory.stock_quantity -
                inventory.reserved_quantity;
            // Prevent reserving more stock than is currently available.
            if (item.quantity > availableQuantity) {
                throw new AppError_1.AppError("Insufficient stock", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            /*
             * Calculate this item's subtotal using the CURRENT authoritative
             * variant price.
             */
            const itemSubtotal = item.variant.price.mul(item.quantity);
            // Decimal is immutable, so assign the returned Decimal.
            totalAmount = totalAmount.add(itemSubtotal);
        }
        /*
         * At this point:
         *
         * - Every product is active.
         * - Every variant is active.
         * - Every inventory row exists.
         * - Every inventory row has been locked.
         * - There is enough available stock.
         * - Cart prices still match current variant prices.
         * - totalAmount has been calculated server-side.
         *
         * Now it is safe to create the Order.
         */
        // Generate the customer-facing unique order reference.
        const orderNumber = (0, generateOrderNumbers_1.generateOrderNumber)();
        /*
         * CREATE ORDER
         * ------------
         * The order stores the calculated total and shipping information.
         *
         * The client does NOT provide or control totalAmount.
         * The server calculates it from database prices.
         */
        const order = await (0, checkout_repository_1.createOrder)(userId, orderNumber, totalAmount, data, tx);
        /*
         * CREATE ORDER ITEMS + RESERVE INVENTORY
         * --------------------------------------
         * OrderItems preserve the exact products, variants, quantities,
         * and prices that were purchased.
         *
         * `price_at_purchase` is important because product prices may change
         * later, but the historical order price must remain unchanged.
         *
         * We also increase reserved_quantity so this stock cannot be sold
         * to another customer while payment is pending.
         *
         * IMPORTANT:
         * We do NOT lock the inventory rows again here.
         *
         * The FOR UPDATE locks acquired above remain held until this
         * transaction commits or rolls back.
         */
        for (const itemOrder of sortedItems) {
            await (0, checkout_repository_1.createOrderItem)(order.order_id, itemOrder.variant.product_id, itemOrder.variant_id, itemOrder.quantity, itemOrder.variant.price, tx);
            /*
             * Reserve the quantity for this order.
             *
             * We increase reserved_quantity rather than immediately reducing
             * stock_quantity because the order has not necessarily been paid for.
             *
             * Payment handling will later determine whether the reservation
             * becomes a completed sale or is released.
             */
            await (0, checkout_repository_1.updateInventory)(itemOrder.variant_id, itemOrder.quantity, tx);
        }
        /*
         * CLEAR CART
         * ----------
         * The cart is cleared only after the Order, OrderItems, and inventory
         * reservations have all succeeded.
         *
         * Because this is still inside the same transaction, if clearing the
         * cart fails, the entire checkout is rolled back.
         */
        await (0, checkout_repository_1.clearCart)(cart.cart_id, tx);
        /*
         * RETURN ORDER
         * ------------
         * Returning the order from the transaction callback is safe.
         *
         * If the callback completes successfully, Prisma commits the
         * transaction and returns this order to the caller.
         *
         * If anything throws before this point, Prisma rolls everything back
         * and this value is never successfully returned to the client.
         */
        return order;
    });
};
exports.checkoutService = checkoutService;
//# sourceMappingURL=checkout.service.js.map
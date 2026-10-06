import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import {
  createPayment,
  finalizeInventory,
  findInventoryForPaymentProcessing,
  findOrderForPayment,
  findOrderForPaymentProcessing,
  findOrderItemsForProcessing,
  findPaymentForProcessing,
  findPaymentForRefund,
  findPendingPayment,
  markOrderAsRefunded,
  markOrderPaid,
  markPaymentAsFailed,
  markPaymentAsRefunded,
  markPaymentSuccess,
  releaseInventoryReservation,
} from "./payments.repository";
import { PaymentMethod } from "./payments.types";
import { generatePaymentReference } from "../../utils/payment_reference_generator";
import { db } from "../../config/db";

export const createPaymentService = async (
  orderId: number,
  userId: number,
  data: PaymentMethod,
) => {
  const order = await findOrderForPayment(orderId);
  if (!order) {
    throw new AppError("order does not exist", StatusCodes.NOT_FOUND);
  }

  if (order.buyer_id !== userId) {
    throw new AppError(
      "You're not permitted to perform this action",
      StatusCodes.FORBIDDEN,
    );
  }

  if (order.status !== "PENDING") {
    throw new AppError(
      `Order must be PENDING to proceed`,
      StatusCodes.BAD_REQUEST,
    );
  }

  const payment = await findPendingPayment(orderId);
  if (payment) {
    throw new AppError(
      "Payment already exist for this order",
      StatusCodes.CONFLICT,
    );
  }

  const amount = order.total_amount;

  const payment_reference = generatePaymentReference();

  const newPayment = await createPayment(
    orderId,
    payment_reference,
    amount,
    data,
  );

  return newPayment;
};

export const processPaymentService = async (paymentId: number) => {
  return db.$transaction(async (tx) => {
    // 1. Lock payment row
    const payment = await findPaymentForProcessing(paymentId, tx);

    if (payment.length === 0) {
      throw new AppError("Payment does not exist", StatusCodes.NOT_FOUND);
    }

    const paymentRecord = payment[0]!;

    // 2. Prevent duplicate processing
    if (paymentRecord.status !== "PENDING") {
      throw new AppError(
        "Payment should not be processed again",
        StatusCodes.CONFLICT,
      );
    }

    // 3. Lock order row
    const order = await findOrderForPaymentProcessing(
      paymentRecord.order_id,
      tx,
    );

    if (order.length === 0) {
      throw new AppError("Order does not exist", StatusCodes.NOT_FOUND);
    }

    const orderRecord = order[0]!;

    // 4. Order must still be pending
    if (orderRecord.status !== "PENDING") {
      throw new AppError(
        "Order must be pending to proceed",
        StatusCodes.BAD_REQUEST,
      );
    }

    // 5. Get all order items
    const orderItems = await findOrderItemsForProcessing(
      orderRecord.order_id,
      tx,
    );

    if (orderItems.length === 0) {
      throw new AppError("Order has no items", StatusCodes.NOT_FOUND);
    }

    // 6. Always lock inventory in deterministic order
    const sortedItems = [...orderItems].sort(
      (a, b) => a.variant_id - b.variant_id,
    );

    // 7. Convert reservations into sales
    for (const item of sortedItems) {
      const inventory = await findInventoryForPaymentProcessing(
        item.variant_id,
        tx,
      );

      if (inventory.length === 0) {
        throw new AppError("Inventory does not exist", StatusCodes.NOT_FOUND);
      }

      const inventoryRecord = inventory[0]!;

      // Checkout should already have reserved this quantity.
      if (inventoryRecord.reserved_quantity < item.quantity) {
        throw new AppError(
          `Insufficient reserved inventory for ${item.variant_id}`,
          StatusCodes.CONFLICT,
        );
      }

      await finalizeInventory(item.variant_id, item.quantity, tx);
    }

    // 8. Mark payment successful
    const successfulPayment = await markPaymentSuccess(
      paymentRecord.payment_id,
      tx,
    );

    // 9. Mark order as paid
    const paidOrder = await markOrderPaid(orderRecord.order_id, tx);

    return {
      payment: successfulPayment,
      order: paidOrder,
    };
  });
};

export const failPaymentService = async (paymentId: number) => {
  return db.$transaction(async (tx) => {
    //lock payment
    const payment = await findPaymentForProcessing(paymentId, tx);
    if (payment.length === 0) {
      throw new AppError("Payment does not exist", StatusCodes.NOT_FOUND);
    }

    const paymentRecord = payment[0]!;

    if (paymentRecord.status !== "PENDING") {
      throw new AppError(
        "Payment should not be processed again",
        StatusCodes.CONFLICT,
      );
    }

    const order = await findOrderForPaymentProcessing(
      paymentRecord.order_id,
      tx,
    );
    if (order.length === 0) {
      throw new AppError("Order does not exist", StatusCodes.NOT_FOUND);
    }

    const orderRecord = order[0]!;
    if (orderRecord.status !== "PENDING") {
      throw new AppError(
        `Order must be PENDING to proceed`,
        StatusCodes.CONFLICT,
      );
    }

    const orderItem = await findOrderItemsForProcessing(
      orderRecord.order_id,
      tx,
    );

    if (orderItem.length === 0) {
      throw new AppError("Order Item not found", StatusCodes.NOT_FOUND);
    }

    const sortItems = [...orderItem].sort((a, b) => {
      return a.variant_id - b.variant_id;
    });

    // loop through
    for (const item of sortItems) {
      //lock each inventory row
      const inventory = await findInventoryForPaymentProcessing(
        item.variant_id,
        tx,
      );

      if (inventory.length === 0) {
        throw new AppError("Inventory does not exist", StatusCodes.NOT_FOUND);
      }

      const inventoryRecord = inventory[0]!;
      //ensure checkout actually reserved the quantity
      if (inventoryRecord.reserved_quantity < item.quantity) {
        throw new AppError(
          `Insufficient reserved quantity for ${item.variant_id}`,
          StatusCodes.CONFLICT,
        );
      }
      //released reservation
      await releaseInventoryReservation(item.variant_id, item.quantity, tx);
    }

    const markedFailed = await markPaymentAsFailed(
      paymentRecord.payment_id,
      tx,
    );

    return markedFailed;
  });
};

export const refundPaymentService = async (paymentId: number) => {
  return db.$transaction(async (tx) => {
    // Lock payment
    const payment = await findPaymentForRefund(
      paymentId,
      tx,
    );

    if (payment.length === 0) {
      throw new AppError(
        "Payment does not exist",
        StatusCodes.NOT_FOUND,
      );
    }

    const paymentRecord = payment[0]!;

    // Only successful payments can be refunded
    if (paymentRecord.status !== "SUCCESS") {
      throw new AppError(
        "Only successful payments can be refunded",
        StatusCodes.CONFLICT,
      );
    }

    // Lock order
    const order = await findOrderForPaymentProcessing(
      paymentRecord.order_id,
      tx,
    );

    if (order.length === 0) {
      throw new AppError(
        "Order does not exist",
        StatusCodes.NOT_FOUND,
      );
    }

    const orderRecord = order[0]!;

    // Only PAID orders can be refunded
    if (orderRecord.status !== "PAID") {
      throw new AppError(
        "Order must be PAID before it can be refunded",
        StatusCodes.BAD_REQUEST,
      );
    }

    // Payment → REFUNDED
    const paymentRefunded = await markPaymentAsRefunded(
      paymentId,
      tx,
    );

    // Order → REFUNDED
    await markOrderAsRefunded(
      orderRecord.order_id,
      tx,
    );

    return paymentRefunded;
  });
};

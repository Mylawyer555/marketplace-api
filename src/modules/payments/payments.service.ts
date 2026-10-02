import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { createPayment, findOrderForPayment, findPendingPayment } from "./payments.repository";
import { PaymentMethod } from "./payments.types";
import { generatePaymentReference } from "../../utils/payment_reference_generator";

export const createPaymentService = async (orderId:number, userId:number, data:PaymentMethod) => {
    const order = await findOrderForPayment(orderId);
    if (!order) {
        throw new AppError("order does not exist", StatusCodes.NOT_FOUND)
    };

    if (order.buyer_id !== userId) {
        throw new AppError("You're not permitted to perform this action", StatusCodes.FORBIDDEN);
    };

    if (order.status !== "PENDING") {
        throw new AppError(`Order must be PENDING to proceed`, StatusCodes.BAD_REQUEST);
    };

    const payment = await findPendingPayment(orderId);
    if (payment) {
        throw new AppError("Payment already exist for this order", StatusCodes.CONFLICT)
    }

   

    const amount = order.total_amount;

    const payment_reference = generatePaymentReference();

    const newPayment = await createPayment(orderId, payment_reference, amount, data)

    return newPayment;
}